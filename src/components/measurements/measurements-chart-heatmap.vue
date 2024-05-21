<template>
  <div>
    <div class="d-flex justify-end">
      <v-icon
        :color="showAutoScale ? 'accent' : 'grey'"
        @click="showAutoScale = !showAutoScale"
        >mdi-magnify</v-icon
      >
    </div>
    <div class="d-flex justify-center mt-n5">
      <table class="table-heatmap--legend mb-3">
        <tr>
          <td
            v-for="index in maxIndex"
            :key="'hsl-color ' + index"
            class="td--heatmap-legend"
            :style="`background-color: ` + calculateHeatmapColor(index, true)"
          ></td>
        </tr>
        <tr>
          <td v-for="index in maxIndex" :key="'hsl-text ' + index">
            <template v-for="labelIndex in indexesWithLabel">
              <span
                :key="'li-' + labelIndex"
                v-if="
                  (index === 1 && labelIndex === '1') ||
                    (index === maxIndex && labelIndex === maxIndex.toString())
                "
                v-text="indexLabels[index]"
              >
              </span>
              <span
                :key="'li-' + labelIndex"
                v-else-if="
                  scaleMax - labelIndex > minLabelDistance &&
                    index === indexLabels[labelIndex]
                "
                v-text="labelIndex"
              >
              </span>
            </template>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <v-simple-table
        :class="
          `table-heatmap ${
            interval === 'hour' || interval === 'day' || interval === 'week'
              ? 'table-heatmap--flex d-flex justify-start'
              : ''
          }`
        "
        dense
        light
      >
        <template v-slot>
          <tfoot>
            <tr>
              <td></td>
              <td
                v-for="(measurementTime, h) in data"
                :key="'measurement-time ' + h"
                class="tf--heatmap"
              >
                <div class="tf--heatmap-label ml-n8 mt-n3">
                  <span class="tf--heatmap-label-span">
                    {{
                      h % moduloNumber === 0
                        ? momentFromISO8601(measurementTime.time)
                        : ''
                    }}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>
            <tr
              v-for="(alert, a) in alertsForChartsMerged"
              :key="'alert' + a"
              class="tr--heatmap"
            >
              <td class="td--heatmap-label --alert">{{
                alert.alert_rule_name
              }}</td>

              <template v-for="(measurement, ai) in data">
                <td
                  :key="'alert-td' + ai"
                  :class="
                    `td--heatmap ${
                      isAlertIndex(alert, ai) ? '--pointer' : '--default'
                    }
                     ${ai % moduloNumber === 0 ? 'td-border' : ''} `
                  "
                  :style="`background-color: ${getAlertColor(alert, ai)};`"
                  @click.stop="confirmViewAlert(alert, ai)"
                >
                  <span
                    v-if="inspectionIndexes.indexOf(ai) > -1"
                    class="inspection-line --alert"
                    @click.stop="confirmViewInspection(ai)"
                  ></span>

                  <!-- <span
                    v-if="inspectionIndexes.indexOf(ai) > -1"
                    class="beep-tooltip heatmap-tooltip"
                    >{{ getInspectionByIndex(ai).date }} <br />{{
                      getInspectionText(ai)
                    }}
                  </span> -->

                  <span
                    v-if="isAlertIndex(alert, ai)"
                    class="beep-tooltip heatmap-tooltip"
                    >{{ alert.alert_rule_name }} <br />{{
                      findAlertInfo(alert, ai).alert_function
                    }}
                  </span>
                </td>
              </template>
            </tr>
            <tr
              v-for="(soundSensor, index) in yAxis"
              :key="soundSensor + index"
              class="tr--heatmap"
            >
              <td class="td--heatmap-label">{{ index }}</td>

              <td
                v-for="(measurement, i) in data"
                :key="'measurement ' + i"
                :class="
                  `td--heatmap ${i % moduloNumber === 0 ? 'td-border' : ''} ${
                    interval === 'hour' ? '--zoom-out' : ''
                  }`
                "
                :style="
                  `background-color: ${calculateHeatmapColor(
                    // eslint-disable-next-line vue/comma-dangle
                    measurement[soundSensor]
                  )}`
                "
                @click="setPeriodToDate(measurement.time)"
              >
                <span
                  v-if="inspectionIndexes.indexOf(i) > -1"
                  class="inspection-line"
                  @click.stop="confirmViewInspection(i)"
                >
                  <!-- <v-hover v-slot="{ hover }">
                    <span class="beep-tooltip" v-on="hover"
                      >{{ getInspectionByIndex(i).date }} <br />{{
                        getInspectionByIndex(i).text
                      }}
                    </span>
                  </v-hover> -->
                </span>

                <span
                  v-if="measurement[soundSensor] !== null"
                  class="hover-overlay"
                ></span>

                <span
                  v-if="measurement[soundSensor] !== null"
                  class="beep-tooltip"
                  >{{ momentAll(measurement.time) }}<br />{{ index }}:
                  {{ displayValue(measurement[soundSensor]) }}</span
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    alertsForCharts: {
      type: Array,
      default: () => [],
      required: false,
    },
    inspectionsForCharts: {
      type: Array,
      default: () => [],
      required: false,
    },
    maxValue: {
      type: Number,
      default: 1,
      required: true,
    },
    yAxis: {
      type: Object,
      default: () => {},
      required: true,
    },
    moduloNumber: {
      type: Number,
      default: 1,
      required: true,
    },
    interval: {
      type: String,
      default: 'day',
      required: true,
    },
  },
  data() {
    return {
      showAutoScale: false,
      fixedHeatmapMax: parseInt(process.env.VUE_APP_HEATMAP_MAX) || 500,
      maxIndex: 150,
      minLabelDistance: 50,
    }
  },
  computed: {
    alertsForChartsMerged() {
      var mergedAlerts = []

      // create an array with one alert for each alert_rule_id that is present in the current alertsForCharts
      // for each alert with the same alert_rule_id, add closest start and end indexes as sets to the indexes prop
      // now the alerts have been merged such that all alerts with the same alert_rule_id are shown on the same row, instead of a separate row for each separate alert
      this.alertsForCharts.map((alert, index) => {
        var alertInfo = {
          id: alert.id,
          alert_function: alert.alert_function,
          closestIndexEnd: alert.closestIndexEnd,
          closestIndexStart: alert.closestIndexStart,
        }
        var mergedAlert = mergedAlerts.filter(
          (mergedAlert) => mergedAlert.alert_rule_id === alert.alert_rule_id
        )
        if (mergedAlert.length > 0) {
          mergedAlert[0].indexes.push(alertInfo)
        } else {
          alert.indexes = [alertInfo]
          mergedAlerts.push(alert)
        }
      })

      return mergedAlerts
    },
    indexLabels() {
      var maxIndex = this.maxIndex
      var indexes = {
        1: 0,
        10: this.getIndexByValue(10),
        100: this.getIndexByValue(100),
        1000: this.getIndexByValue(1000),
      }
      indexes[maxIndex] = parseInt(this.scaleMax.toFixed(0))
      if (!this.showAutoScale) {
        indexes[250] = this.getIndexByValue(250)
      }
      return indexes
    },
    indexesWithLabel() {
      return Object.keys(this.indexLabels)
    },
    inspectionIndexes() {
      if (this.inspectionsForCharts.length > 0) {
        return this.inspectionsForCharts.map((inspection) => {
          return inspection.closestIndex
        })
      } else {
        return []
      }
    },
    locale() {
      return this.$i18n.locale
    },
    logMax() {
      return Math.log(this.scaleMax)
    },
    scaleMax() {
      return this.showAutoScale ? this.maxValue : this.fixedHeatmapMax
    },
  },
  methods: {
    calculateHeatmapColor(value, isIndex = false) {
      let logValue = 0

      if (isIndex) {
        value = this.getValueByIndex(value)
      }

      if (value !== 0) {
        logValue = Math.log(value)
      }

      if (logValue > this.logMax) {
        // cap color to max color
        logValue = this.logMax
      }

      return value !== null && value !== 0
        ? 'hsl(' +
            (235 + (logValue / this.logMax) * -235).toFixed(0) +
            ', 100%, 50%)'
        : 'hsl(360, 100%, 100%)'
    },
    displayValue(input) {
      return input !== undefined
        ? Math.round(input) !== input
          ? input.toFixed(2)
          : input
        : '-'
    },
    findAlertInfo(mergedAlert, index) {
      return mergedAlert.indexes.filter(
        (indexSet) =>
          index >= indexSet.closestIndexStart &&
          index <= indexSet.closestIndexEnd
      )[0]
    },
    getAlertColor(mergedAlert, index) {
      if (this.isAlertIndex(mergedAlert, index)) {
        return 'rgba(255, 0, 29, 0.15)'
      } else {
        return 'transparent'
      }
    },
    getIndexByValue(value) {
      return parseInt((Math.log(value) / this.logMax) * this.maxIndex)
    },
    getValueByIndex(index) {
      return Math.exp((index / this.maxIndex) * this.logMax)
    },
    getInspectionByIndex(index) {
      return this.inspectionsForCharts.find(
        (inspection) => inspection.closestIndex === index
      )
    },
    isAlertIndex(mergedAlert, index) {
      // is there a set of start and end alert indexes within which the current index falls
      return (
        mergedAlert.indexes.filter(
          (indexSet) =>
            index >= indexSet.closestIndexStart &&
            index <= indexSet.closestIndexEnd
        ).length > 0
      )
    },
    momentAll(date) {
      return this.$moment(date)
        .locale(this.locale)
        .format('llll')
    },
    momentFromISO8601(date) {
      if (this.interval === 'hour') {
        return this.$moment(date)
          .locale(this.locale)
          .format('LT')
      } else if (this.interval === 'day' || this.interval === 'week') {
        var unit = this.locale === 'nl' ? 'u' : 'h'
        return (
          this.$moment(date)
            .locale(this.locale)
            .format('ddd') +
          ' ' +
          this.$moment(date)
            .locale(this.locale)
            .format('H') +
          unit
        )
      } else {
        const currentYear = this.$moment(date).format('YYYY')
        const currentYearEn = ', ' + currentYear
        const currentYearEsPt = ' de ' + currentYear
        const currentYearNl = '. ' + currentYear
        return this.$moment(date)
          .locale(this.locale)
          .format('ll')
          .replace(currentYearNl, '')
          .replace(currentYearEn, '')
          .replace(currentYearEsPt, '')
          .replace(' ' + currentYear, '') // Remove year hardcoded per language, currently no other way to get rid of year whilst keeping localized time
      }
    },
    setPeriodToDate(date) {
      this.$emit('set-period-to-date', date)
    },
    confirmViewAlert(mergedAlert, index) {
      if (this.isAlertIndex(mergedAlert, index)) {
        var alertId = this.findAlertInfo(mergedAlert, index).id
        var alert = this.alertsForCharts.filter(
          (alert) => alert.id === alertId
        )[0]
        this.$emit('confirm-view-alert', alert)
      }
    },
    confirmViewInspection(index) {
      var inspection = this.getInspectionByIndex(index)
      this.$emit('confirm-view-inspection', {
        id: inspection.id,
        date: inspection.date,
      })
    },
  },
}
</script>

<style lang="scss">
.table-heatmap--legend {
  color: $color-grey-dark;
  border-spacing: 0;
  .td--heatmap-legend {
    width: 1px;
    height: 13px;
    padding: 0;
  }
}

.table-heatmap {
  font-size: 0.7rem !important;
  line-height: 13px !important;
  padding-right: 24px;
  @include for-phone-only {
    font-size: 0.6rem !important;
  }
}

.tr--heatmap {
  height: 13px !important;
  max-height: 13px !important;
  td:nth-child(2) {
    border-left: 1px solid #afafaf !important;
  }
  &:last-child {
    .td--heatmap {
      border-bottom: 1px solid #afafaf !important;
    }
  }
}

.tf--heatmap-label,
.td--heatmap-label {
  font-size: 0.7rem !important;
  font-weight: 400 !important;
  color: $color-grey-dark !important;
  white-space: inherit;
  @include for-phone-only {
    font-size: 0.6rem !important;
  }
}

.td--heatmap {
  width: 8px !important;
  max-width: 8px !important;
  height: 13px !important;
  padding: 0 !important;
  cursor: zoom-in;
  .beep-tooltip,
  .hover-overlay {
    display: none;
  }
  &.--zoom-out {
    cursor: zoom-out;
  }
  &.--pointer {
    cursor: pointer;
  }
  &.--default {
    cursor: default;
  }
  &:hover {
    .hover-overlay {
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0.5;
    }
    .beep-tooltip {
      position: absolute;
      display: block;
      width: 175px;
      padding: 4px 8px;
      margin-top: -65px;
      margin-left: -86px;
      line-height: 1rem;
      text-align: center;
      &::before {
        position: absolute;
        top: 100%;
        left: 50%;
        content: ' ';
      }
    }
  }
}

.table-heatmap--flex {
  .td--heatmap {
    width: 13px !important;
    max-width: 13px !important;
  }
}

.td--heatmap-label {
  width: 5px !important; // is rendered as 72px, but setting it wider will only add to 72
  min-width: 72px !important;
  max-width: 72px !important;
  height: 13px !important;
  padding: 0 8px 0 0 !important;
  overflow: hidden;
  text-align: right !important;
  white-space: nowrap;
  border-bottom: 0 !important;
  @include for-phone-only {
    width: 51px !important;
    min-width: 51px !important;
    max-width: 51px !important;
    padding: 0 2px 0 0 !important;
    font-size: 0.55rem !important;
    text-overflow: ellipsis;
  }
  &.--alert {
    font-size: 10px !important;
    color: $color-red !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.tf--heatmap-label {
  position: absolute;
  min-width: 42px;
  text-align: right;
  transform: rotate(-45deg);
}

.tf--heatmap-label-span {
  position: relative;
  justify-content: flex-end;
  text-align: right;
}

.tf--heatmap {
  width: 8px !important;
  max-width: 8px !important;
  padding: 0 !important;
  line-height: 42px;
}

.td-border {
  border-left: 1px solid rgb(0, 0, 0, 0.1);
}

tbody .tr--heatmap:first-child .td--heatmap {
  border-top: 1px solid rgb(0, 0, 0, 0.1);
}

.inspection-line {
  cursor: pointer;
  display: block;
  width: 3px;
  height: 60%;
  background-color: $color-accent !important;
  opacity: 0.87;

  &.--alert {
    margin-top: 0px;
  }
}
</style>
