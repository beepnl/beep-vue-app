<template>
  <MeasurementsCard
    :title="$t('Compare') + ': ' + selectedDeviceTitle"
    :mobile-title="$t('Compare')"
    :local-var="localVar"
    :show-chart-cols-icons="true"
    @set-chart-cols="chartCols = $event"
  >
    <v-row class="my-6">
      <v-col cols="12" class="d-flex justify-space-between flex-wrap">
        <v-btn
          tile
          outlined
          color="black"
          class="save-button-mobile-wide"
          @click.prevent="selectHivesOverlay = true"
        >
          {{ $tc('Select_hive', 2) }}
        </v-btn>
        <SelectHivesOverlay
          :show-overlay="selectHivesOverlay"
          :overlay="selectHivesOverlay"
          :compare-mode="true"
          :include-groups="true"
          @close-overlay="selectHivesOverlay = false"
          @select-hives="selectedHives = $event"
        />
        <ApiaryPreviewHiveSelector
          v-if="selectedHives.length > 0 && selectedHives.length < 16"
          class="ml-5 my-4 my-sm-0"
          :hives="getHives(selectedHives)"
          :hives-selected="[]"
          :hives-editable="selectedHives"
          :compare-mode="true"
          :disable-sort-hives="true"
          :not-clickable="true"
        ></ApiaryPreviewHiveSelector>
        <span
          v-else
          class="mx-3 beep-label"
          v-text="selectedHives.join(', ')"
        ></span>
        <v-spacer />
        <v-btn
          tile
          outlined
          color="black"
          class="save-button-mobile-wide"
          @click.prevent="loadCompareData(true)"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('Load') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-if="loadingCompareData"
        class="d-flex align-center justify-center my-16"
        cols="12"
      >
        <v-progress-circular color="primary" size="50" indeterminate />
      </v-col>
      <v-col v-if="noCompareChartData" cols="12" class="text-center my-16">
        {{ $t('no_chart_data') }}
      </v-col>
    </v-row>
    <v-row
      v-if="
        compareMeasurementData !== null &&
          compareMeasurementData.measurements &&
          compareMeasurementData.measurements.length > 0
      "
      class="charts mt-6 mb-2"
    >
      <template v-if="compareSensorsPresent">
        <v-col
          v-for="(sensor, index) in currentCompareSensors"
          :key="'sensor' + index"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="index === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="
              compareMeasurementData.resolution
                ? $tc('measurement', 2) +
                  ' (' +
                  $t('measurement_interval') +
                  ': ' +
                  compareMeasurementData.resolution +
                  ')'
                : $tc('measurement', 2)
            "
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div>
            <MeasurementsChartLine
              :chart-data="chartjsCompareDataSeries([sensor])"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'chart-compare-sensor-' + index"
              @confirm-view-alert="confirmViewAlert($event)"
              @confirm-view-inspection="
                confirmViewInspection($event.id, $event.date)
              "
              @set-period-to-date="setPeriodToDate($event)"
            >
            </MeasurementsChartLine>
          </div>
        </v-col>
      </template>

      <template v-if="compareSensorsPresent">
        <v-col
          v-for="(sensor, index) in currentCompareSensors"
          :key="'sensorbar' + index"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="index === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="
              compareMeasurementData.resolution
                ? $tc('measurement', 2) +
                  ' (' +
                  $t('measurement_interval') +
                  ': ' +
                  compareMeasurementData.resolution +
                  ')'
                : $tc('measurement', 2)
            "
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div>
            <MeasurementsChartBar
              :chart-data="chartjsCompareDataSeries([sensor])"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'chart-compare-sensor-barchart-' + index"
              @confirm-view-alert="confirmViewAlert($event)"
              @set-period-to-date="setPeriodToDate($event)"
            >
            </MeasurementsChartBar>
          </div>
        </v-col>
      </template>
    </v-row>

    <v-row class="text-row">
      <v-col
        v-if="
          ready &&
            (compareMeasurementData === null || noPeriodData) &&
            !loadingCompareData
        "
        cols="12"
        class="text-center my-10"
      >
        {{ noPeriodData ? $t('selection_placeholder') : $t('no_data') }}
      </v-col>
    </v-row>
  </MeasurementsCard>
</template>

<script>
import Api from '@api/Api'
import { mapGetters } from 'vuex'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import MeasurementsCard from '@components/measurements/measurements-card.vue'
import MeasurementsChartLine from '@/src/components/measurements/measurements-chart-line.vue'
import MeasurementsChartBar from '@/src/components/measurements/measurements-chart-bar.vue'
import SelectHivesOverlay from '@components/select-hives-overlay.vue'
import { readApiariesAndGroups } from '@mixins/methodsMixin'
import { timeZone } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    MeasurementsCard,
    MeasurementsChartLine,
    MeasurementsChartBar,
    SelectHivesOverlay,
  },
  mixins: [readApiariesAndGroups, sensorMixin, timeZone],
  props: {
    dates: {
      type: Array,
      default: () => [],
      required: false,
    },
    measurementData: {
      type: Object,
      default: () => {},
      required: false,
    },
    interval: {
      type: String,
      default: 'day',
      required: true,
    },
    periodEndString: {
      type: String,
      default: '',
      required: false,
    },
    periodStartString: {
      type: String,
      default: '',
      required: false,
    },
    relativeInterval: {
      type: Boolean,
      default: false,
      required: true,
    },
    selectedDeviceTitle: {
      type: String,
      default: '',
      required: false,
    },
    timeIndex: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      compareMeasurementData: {},
      currentCompareSensors: [],
      compareSensorsPresent: false,
      noCompareChartData: false,
      noPeriodData: false,
      selectedHives: [],
      loadingCompareData: false,
      showLoadingIcon: false,
      selectHivesOverlay: false,
      cardName: 'Compare',
      ready: false,
      comparingData: false,
      chartCols: 6,
    }
  },
  computed: {
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    locale() {
      return this.$i18n.locale
    },
    localVar() {
      return 'beepChartCols' + this.cardName
    },
  },
  created() {
    if (this.apiaries.length === 0 && this.groups.length === 0) {
      // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
      this.readApiariesAndGroups()
    }
  },
  methods: {
    async sensorCompareMeasurementRequest(interval) {
      var start = interval === 'selection' ? this.dates[0] : null
      var end = interval === 'selection' ? this.dates[1] : null
      var timeGroup =
        interval === 'hour' || interval === 'selection' ? null : interval
      this.noCompareChartData = false
      this.noPeriodData = false
      this.loadingCompareData = true
      this.compareMeasurementData = null // needed to let chartjs redraw charts after interval switch
      var hivecall = this.selectedHives.join('&hive_id[]=')
      try {
        const response = await Api.readRequest(
          '/sensors/comparemeasurements?hive_id[]=' +
            hivecall +
            '&interval=' +
            interval +
            '&index=' +
            this.timeIndex +
            '&timeGroup=' +
            timeGroup +
            '&timezone=' +
            this.timeZone +
            (start !== null ? '&start=' + start + ' 00:00' : '') +
            (end !== null ? '&end=' + end + ' 23:59' : '') +
            '&relative_interval=' +
            (this.relativeInterval ? '1' : '0')
        )
        this.compareMeasurementData = response.data
        this.formatCompareMeasurementData(response.data)
        this.ready = true
        return true
      } catch (error) {
        this.loadingCompareData = false
        if (error.response) {
          console.log(error.response)
          if (
            error.response.status === 500 ||
            error.response.status === 404 ||
            error.response.status === 422
          ) {
            this.noCompareChartData = true
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    getSensorMeasurement(abbr) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : null
    },
    chartjsCompareDataSeries(quantities, weather = false) {
      var data = {
        labels: [],
        datasets: [],
      }
      var SDdata = {
        labels: [],
        datasets: [],
      }

      quantities.map((compareQuantity, index) => {
        var compareMt = this.getSensorMeasurement(compareQuantity)
        var compareSD = this.COMPARE_SD[compareQuantity]

        if (compareMt === null || compareMt === undefined) {
          console.log('compareMt not found ', compareQuantity)
        } else if (compareMt.show_in_charts === 1) {
          // for data
          data.datasets.push({
            id: compareMt.id,
            abbr: compareMt.abbreviation,
            fill: false,
            borderColor: '#' + compareMt.hex_color,
            backgroundColor: '#' + compareMt.hex_color,
            borderRadius: 2,
            label: this.getSensorLabel(
              this.compareMeasurementData.sensorDefinitions,
              compareQuantity,
              compareMt.unit
            ),
            name: this.getSensorName(
              this.compareMeasurementData.sensorDefinitions,
              compareQuantity
            ),
            unit:
              compareMt.unit !== '-' && compareMt.unit !== null
                ? compareMt.unit
                : '',
            data: [],
            spanGaps:
              weather || this.interval === 'hour' || this.interval === 'day',
            mtType: 'compare',
          })

          // for sd
          SDdata.datasets.push({
            id: compareSD,
            abbr: compareSD + '-',
            fill: '+1',
            borderColor: '#' + compareMt.hex_color,
            backgroundColor: '#' + compareMt.hex_color + '80',
            borderRadius: 1,
            borderWidth: 1,
            hidden: true,
            // showLine: false,
            pointRadius: 0,
            label: 'mean - SD',
            name: 'mean - SD',
            unit: null,
            data: [],
            spanGaps:
              weather || this.interval === 'hour' || this.interval === 'day',
            mtType: 'compare',
          })

          SDdata.datasets.push({
            id: compareSD,
            abbr: compareSD + '+',
            fill: false,
            borderColor: '#' + compareMt.hex_color,
            backgroundColor: '#' + compareMt.hex_color,
            borderRadius: 1,
            borderWidth: 1,
            hidden: true,
            // showLine: false,
            pointRadius: 0,
            label: 'mean + SD',
            name: 'mean + SD',
            unit: null,
            data: [],
            spanGaps:
              weather || this.interval === 'hour' || this.interval === 'day',
            mtType: 'compare',
          })

          var quantity = this.COMPARE_SENSOR[compareQuantity]
          var mt = this.getSensorMeasurement(quantity)

          if (mt === null || mt === undefined) {
            console.log('mt not found ', quantity)
          } else if (mt.show_in_charts === 1) {
            data.datasets.push({
              id: mt.id,
              abbr: mt.abbreviation,
              fill: false,
              borderColor: '#' + mt.hex_color,
              backgroundColor: '#' + mt.hex_color,
              borderRadius: 2,
              label: this.getSensorLabel(
                this.measurementData.sensorDefinitions,
                quantity,
                mt.unit
              ),
              name: this.getSensorName(
                this.measurementData.sensorDefinitions,
                quantity
              ),
              unit: mt.unit !== '-' && mt.unit !== null ? mt.unit : '',
              data: [],
              spanGaps:
                weather || this.interval === 'hour' || this.interval === 'day',
              mtType: 'normal',
            })
          }
        }
      })

      if (
        typeof this.compareMeasurementData.measurements !== 'undefined' &&
        this.compareMeasurementData.measurements.length > 0
      ) {
        this.compareMeasurementData.measurements.map((measurement, index) => {
          if (
            (!this.relativeInterval &&
              (this.interval === 'hour' ||
                this.interval === 'day' ||
                this.interval === 'week' ||
                this.interval === 'year' ||
                // skip first value for month or selection interval (belongs to previous month/day) except when it's a relative interval
                index !== 0)) ||
            this.relativeInterval
          ) {
            data.datasets.map((dataset, index) => {
              if (dataset.mtType === 'compare') {
                var compareQuantity = dataset.abbr

                dataset.data.push({
                  x: measurement.time,
                  y: measurement[compareQuantity],
                })
                var compareSD = this.COMPARE_SD[compareQuantity]
                if (compareSD !== 'undefined' && compareSD !== null) {
                  SDdata.datasets.map((SDdataset, index) => {
                    if (SDdataset.abbr === compareSD + '-') {
                      SDdataset.data.push({
                        x: measurement.time,
                        y:
                          measurement[compareQuantity] - measurement[compareSD],
                      })
                    }
                    if (SDdataset.abbr === compareSD + '+') {
                      SDdataset.data.push({
                        x: measurement.time,
                        y:
                          measurement[compareQuantity] + measurement[compareSD],
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }

      if (
        typeof this.measurementData.measurements !== 'undefined' &&
        this.measurementData.measurements.length > 0
      ) {
        this.measurementData.measurements.map((measurement, index) => {
          if (
            (!this.relativeInterval &&
              (this.interval === 'hour' ||
                this.interval === 'day' ||
                this.interval === 'week' ||
                this.interval === 'year' ||
                // skip first value for month or selection interval (belongs to previous month/day) except when it's a relative interval
                index !== 0)) ||
            this.relativeInterval
          ) {
            data.datasets.map((dataset, index) => {
              if (dataset.mtType === 'normal') {
                var quantity = dataset.abbr

                dataset.data.push({
                  x: measurement.time,
                  y: measurement[quantity],
                })
              }
            })
          }
        })
      }

      // var otherData = []
      // quantities.map((quantity, index) => {
      //   otherData.push(this.chartjsDataSeries([this.COMPARE_SENSOR[quantity]]))
      // })

      // otherData.map((sd) => {
      //   data.labels.push(sd.labels)
      //   data.datasets.push.apply(data.datasets, sd.datasets)
      // })

      data.labels.push.apply(data.labels, SDdata.labels)
      data.datasets.push.apply(data.datasets, SDdata.datasets)

      return data
    },
    confirmViewAlert(alert) {
      // TODO: add alert lines to compare charts!
      this.$emit('confirm-view-alert', alert)
    },
    confirmViewInspection(inspectionId, inspectionDate) {
      this.$emit('confirm-view-inspection', {
        id: inspectionId,
        date: inspectionDate,
      })
    },
    formatCompareMeasurementData(compareMeasurementData) {
      if (
        compareMeasurementData &&
        compareMeasurementData.measurements &&
        compareMeasurementData.measurements.length > 0
      ) {
        this.compareMeasurementData = compareMeasurementData
        this.currentCompareSensors = []
        this.compareSensorsPresent = false
        // console.log(this.compareMeasurementData)
        Object.keys(this.compareMeasurementData.measurements[0]).map(
          (quantity) => {
            if (this.COMPARE.indexOf(quantity) > -1) {
              this.currentCompareSensors.push(quantity)
              this.compareSensorsPresent = true
            }
          }
        )
      } else {
        this.noCompareChartData = true
      }
      this.loadingCompareData = false
    },
    getHives(hiveIds) {
      var hivesArray = []
      hiveIds.map((hiveId) => {
        hivesArray.push(this.hivesObject[hiveId])
      })
      return hivesArray
    },
    getSensorLabel(sensordefs, quantity, unit) {
      var label =
        this.getSensorName(sensordefs, quantity) +
        (unit !== '-' && unit !== '' && unit !== null ? ' (' + unit + ')' : '')

      return label.replace(/^0/, '')
    },
    getSensorName(sensordefs, quantity) {
      return sensordefs[quantity] && sensordefs[quantity].name !== null
        ? sensordefs[quantity].name
        : this.$i18n.t(quantity)
    },
    loadCompareData(init = false) {
      if (init) {
        this.comparingData = true
      }
      if (this.comparingData) {
        this.sensorCompareMeasurementRequest(this.interval)
      }
    },
    redrawCharts(seamless = true) {
      if (this.comparingData) {
        const temp = this.compareMeasurementData
        if (!seamless) {
          this.resetCharts()
        }
        setTimeout(() => {
          this.formatCompareMeasurementData(temp)
        }, 10)
      }
    },
    resetCharts() {
      this.loadingCompareData = true
      this.compareMeasurementData = null // charts are redrawn when compareMeasurementData is null
    },
    setPeriodToDate(date) {
      this.$emit('set-period-to-date', date)
    },
  },
}
</script>
