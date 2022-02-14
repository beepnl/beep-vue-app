<template>
  <div>
    <div class="d-flex justify-center">
      <table class="table-heatmap--legend mb-3">
        <tr>
          <td
            v-for="index in 118"
            :key="'hsl-color ' + index"
            class="td--heatmap-legend"
            :style="`background-color:hsl(${236 - index * 2},100%,50%);`"
          ></td>
        </tr>
        <tr>
          <td v-for="index in 118" :key="'hsl-text ' + index">
            <span
              v-if="index === 1 || index === 118"
              v-text="index === 118 ? maxValue.toFixed(0) : '0'"
            >
            </span>
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
              v-for="(soundSensor, index) in yAxis"
              :key="soundSensor + index"
              class="tr--heatmap"
            >
              <td class="td--heatmap-label">{{ index }}</td>

              <td
                v-for="(measurement, i) in data"
                :key="'measurement ' + i"
                :class="
                  `td--heatmap ${i % moduloNumber === 0 ? 'td-border' : ''}`
                "
                :style="
                  `background-color: ${calculateHeatmapColor(
                    // eslint-disable-next-line vue/comma-dangle
                    measurement[soundSensor]
                  )}`
                "
              >
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
  computed: {
    locale() {
      return this.$i18n.locale
    },
  },
  methods: {
    calculateHeatmapColor(value) {
      const max = this.maxValue
      return value !== null
        ? 'hsl(' + (235 + (value / max) * -235).toFixed(0) + ', 100%, 50%)'
        : 'hsl(360, 100%, 100%)'
    },
    displayValue(input) {
      return Math.round(input) !== input ? input.toFixed(2) : input
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
  cursor: auto !important;
  .beep-tooltip,
  .hover-overlay {
    display: none;
  }
  &:hover {
    cursor: pointer;
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
</style>
