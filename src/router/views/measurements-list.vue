<template>
  <Layout :no-box-shadow="true">
    <div class="period-bar-wrapper">
      <v-container class="period-container">
        <v-row
          class="period-bar d-flex flex-row justify-space-between align-center"
        >
          <div v-for="period in periods" :key="period.interval">
            <v-btn
              :class="
                `grey--text ${
                  period.interval === interval ? 'primary--text' : ''
                }`
              "
              text
              @click="setInterval(period.interval, period.moduloNumber)"
            >
              {{ period.name }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </div>
    <v-container class="measurements-content">
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center justify-center">
            <v-icon class="color-grey-dark" @click="setTimeIndex(1)">
              mdi-chevron-left
            </v-icon>
            <span
              class="overline--big"
              style="margin-top: 1px; margin-left: 2px;"
              >{{ chartTitle }}</span
            >
            <v-icon
              v-if="timeIndex !== 0"
              class="color-grey-dark"
              @click="setTimeIndex(-1)"
            >
              mdi-chevron-right
            </v-icon>
          </div>
        </v-col>
        <v-col cols="12">
          <Treeselect
            v-if="devices"
            v-model="selectedSensorId"
            :options="sortedDevices"
            :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
            :no-results-text="`${$t('no_results')}`"
            :disable-branch-nodes="true"
            :default-expand-level="1"
            search-nested
            @input="loadData"
          />
        </v-col>
        <v-col v-if="!lastSensorDate" cols="12" class="text-center mt-10">
          {{ $t('no_data') }}
        </v-col>
        <v-col cols="12">
          <div
            class="overline mb-3 text-center"
            v-text="$t('last_measurement')"
          ></div>
          batterij: {{ lastSensorValues.bv }}, luchtdruk:
          {{ lastSensorValues.p }}, luchtvochtigheid: {{ lastSensorValues.h }},
          temp in kast: {{ lastSensorValues.t_i }}, temperatuur:
          {{ lastSensorValues.t }}, zendruis: {{ lastSensorValues.snr }},
          zendsterkte: {{ lastSensorValues.rssi }}
        </v-col>
        <v-col
          v-if="measurementData === null"
          class="d-flex align-center justify-center"
          style="margin-top: 20vh;"
          cols="12"
        >
          <v-progress-circular color="primary" size="50" indeterminate />
        </v-col>
        <v-col
          v-if="
            measurementData !== null &&
              measurementData.measurements.length === 0
          "
          cols="12"
          class="text-center mt-10"
        >
          {{ $t('no_chart_data') }}
        </v-col>
        <v-col
          v-if="
            measurementData !== null && measurementData.measurements.length > 0
          "
          cols="12"
        >
          <div v-if="sensorsPresent">
            <div class="overline mb-3 text-center" v-text="$t('sensor')"></div>
            <chartist
              v-for="(sensor, index) in currentSensors"
              :key="index"
              :class="`${interval} mb-4`"
              :ratio="`ct-chart ct-series-${index}`"
              type="Line"
              :data="chartDataSingleSeries(sensor, SENSOR_UNITS[sensor])"
              :options="chartOptions(SENSOR_UNITS[sensor])"
            >
            </chartist>
          </div>

          <div v-if="soundSensorsPresent">
            <div
              class="overline mt-4 mt-sm-6 mb-3 text-center"
              v-text="$t('Sound_measurements')"
            ></div>
            <chartist
              :class="`${interval} mb-4`"
              ratio="ct-chart"
              type="Line"
              :data="chartDataMultipleSeries(currentSoundSensors)"
              :options="chartOptions()"
            >
            </chartist>
          </div>

          <div v-if="rssiSensorPresent || debugSensorsPresent">
            <div
              class="overline mt-4 mt-sm-6 mb-3 text-center"
              v-text="$t('Sensor_info')"
            ></div>
            <chartist
              v-if="debugSensorsPresent"
              :class="interval"
              ratio="ct-chart ct-series-battery"
              type="Line"
              :data="chartDataMultipleSeries(currentDebugSensors)"
              :options="chartOptions('', true)"
            >
            </chartist>
            <chartist
              v-if="rssiSensorPresent"
              :class="
                `${interval} ${
                  debugSensorsPresent ? 'rssi-chart-overlapping' : ''
                }`
              "
              ratio="ct-chart ct-series-rssi"
              type="Line"
              :data="chartDataSingleSeries('rssi', 'dBm')"
              :options="
                debugSensorsPresent ? chartOptionsYaxisEnd : chartOptions('dBm')
              "
            >
            </chartist>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import 'chartist/dist/chartist.min.css'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: { Layout, Treeselect },
  mixins: [sensorMixin],
  data() {
    return {
      selectedSensorId: 257, // 257 60
      lastSensorDate: null,
      lastSensorValues: {},
      measurementData: {},
      interval: 'day',
      timeIndex: 0,
      timeZone: 'Europe/Amsterdam',
      moduloNumber: 6,
      chartTitle: '',
      startTime: '',
      endTime: '',
      dateFormat: 'yyyy-MM-dd',
      selectedDate: '',
      currentSensors: [],
      currentSoundSensors: {},
      currentDebugSensors: {},
      sensorsPresent: false,
      soundSensorsPresent: false,
      debugSensorsPresent: false,
      rssiSensorPresent: false,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    chartOptionsYaxisEnd() {
      return {
        fullWidth: true,
        height: '220px',
        chartPadding: {
          left: 50,
          right: -25,
        },
        plugins: [
          this.$chartist.plugins.legend({
            clickable: true, // Doesn't work yet with single series data
          }),
          this.$chartist.plugins.ctPointLabels({
            labelOffset: {
              x: 7,
              y: 0,
            },
            textAnchor: 'start',
            labelInterpolationFnc(value) {
              if (typeof value !== 'undefined') {
                return value.toFixed(1)
              } else {
                return '-'
              }
            },
          }),
        ],
        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: false,
        },
        axisY: {
          // On the y-axis start means left and end means right
          position: 'end',
        },
      }
    },
    periods() {
      return [
        { name: this.$i18n.t('hour'), interval: 'hour', moduloNumber: 1 },
        { name: this.$i18n.t('day'), interval: 'day', moduloNumber: 6 },
        { name: this.$i18n.t('week'), interval: 'week', moduloNumber: 6 },
        { name: this.$i18n.t('month'), interval: 'month', moduloNumber: 8 },
        { name: this.$i18n.t('year'), interval: 'year', moduloNumber: 11 },
      ]
    },
    sortedDevices() {
      var apiaryArray = []
      this.devices.map((device, index) => {
        apiaryArray.push({
          id: -(index + 1), // random because it has to have an id for Treeselect but won't be used later
          label: device.location_name,
          children: [],
        })
        device.label = device.hive_name + ' - ' + device.name
      })
      var uniqueApiaries = []
      const map = new Map()
      for (const item of apiaryArray) {
        if (!map.has(item.label)) {
          map.set(item.label, true) // set any value to Map
          uniqueApiaries.push(item)
        }
      }
      uniqueApiaries.slice().sort(function(a, b) {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
      this.devices.map((device) => {
        uniqueApiaries.map((apiary) => {
          if (apiary.label === device.location_name) {
            apiary.children.push(device)
          }
        })
      })
      uniqueApiaries.map((apiary) => {
        var sortedChildren = apiary.children.slice().sort(function(a, b) {
          if (a.label < b.label) {
            return -1
          }
          if (a.label > b.label) {
            return 1
          }
          return 0
        })
        apiary.children = sortedChildren
      })
      return uniqueApiaries
    },
  },
  created() {
    this.readDevices()
    this.loadData()
  },
  methods: {
    async loadLastSensorValues() {
      try {
        const response = await Api.readRequest(
          '/sensors/lastvalues?id=' + this.selectedSensorId
        )
        this.lastSensorValues = response.data
        this.lastSensorDate = response.data.time
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async sensorMeasurementRequest(interval) {
      var timeGroup = interval === 'hour' ? null : interval
      this.measurementData = null // needed to let chartist redraw charts after interval switch, otherwise there's a bug in chartist-plugin-legend where old data is loaded after legend click see https://github.com/CodeYellowBV/chartist-plugin-legend/issues/48
      try {
        const response = await Api.readRequest(
          '/sensors/measurements?id=' +
            this.selectedSensorId +
            '&interval=' +
            interval +
            '&index=' +
            this.timeIndex +
            '&timeGroup=' +
            timeGroup +
            '&timezone=' +
            this.timeZone
        )
        // console.log(response)
        this.measurementData = response.data
        this.currentSensors = []
        this.currentSoundSensors = {}
        this.currentDebugSensors = {}
        this.sensorsPresent = false
        this.soundSensorsPresent = false
        this.debugSensorsPresent = false
        this.rssiSensorPresent = false
        Object.keys(this.measurementData.measurements[0]).map((quantity) => {
          if (this.SENSORS.indexOf(quantity) > -1) {
            this.currentSensors.push(quantity)
            this.sensorsPresent = true
          } else if (this.SOUND.indexOf(quantity) > -1) {
            var soundSensorName = this.SENSOR_NAMES[quantity]
            this.currentSoundSensors[soundSensorName] = quantity
            this.soundSensorsPresent = true
          } else if (this.DEBUG.indexOf(quantity) > -1) {
            if (quantity === 'bv' || quantity === 'snr') {
              var debugSensorName =
                this.$i18n.t(quantity) +
                ' (' +
                this.SENSOR_UNITS[quantity] +
                ')'
              this.currentDebugSensors[debugSensorName] = quantity
              this.debugSensorsPresent = true
            } else if (quantity === 'rssi') {
              this.rssiSensorPresent = true
            }
          }
        })

        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async readDevices() {
      try {
        const response = await Api.readRequest('/devices')
        this.$store.commit('devices/setDevices', response.data)
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    chartDataSingleSeries(quantity, unit) {
      var data = {
        labels: [],
        series: [
          {
            name: this.$i18n.t(quantity) + ' (' + unit + ')',
            data: [],
          },
        ],
      }
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement, index) => {
          if (
            ((this.interval === 'month' || this.interval === 'year') &&
              index !== 0) || // skip first value for month and year interval (belongs to previous month/year)
            this.interval === 'hour' ||
            this.interval === 'day' ||
            this.interval === 'week'
          ) {
            data.labels.push(measurement.time)
            data.series[0].data.push(measurement[quantity])
          }
        })
      }
      return data
    },
    chartDataMultipleSeries(sensorObject) {
      var data = {
        labels: [],
        series: [],
      }
      Object.keys(sensorObject)
        .sort()
        .map((sensorName) => {
          data.series.push({ name: sensorName, data: [] })
        })
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement, index) => {
          if (
            ((this.interval === 'month' || this.interval === 'year') &&
              index !== 0) || // skip first value for month and year interval (belongs to previous month/year)
            this.interval === 'hour' ||
            this.interval === 'day' ||
            this.interval === 'week'
          ) {
            data.labels.push(measurement.time)
            data.series.map((serie, index) => {
              var currentSensor = sensorObject[serie.name]
              serie.data.push(measurement[currentSensor])
            })
          }
        })
      }
      data.series.map((serie) => {
        serie.name = serie.name.replace(/^0/, '') // remove first zero for legend legibility (esp with sound sensor s_bin_201_402 and further)
      })
      return data
    },
    chartOptions(unit = '', battery = false) {
      const self = this
      return {
        fullWidth: true,
        height: '220px',
        plugins: [
          this.$chartist.plugins.legend(),
          this.$chartist.plugins.ctPointLabels({
            labelOffset: {
              x: 7,
              y: 0,
            },
            textAnchor: 'start',
            labelInterpolationFnc(value) {
              if (typeof value !== 'undefined' && unit === 'mbar') {
                return value + ' ' + unit
              } else if (typeof value !== 'undefined' && unit === 'kg') {
                return value.toFixed(2) + ' ' + unit
              } else if (typeof value !== 'undefined' && !battery) {
                return value.toFixed(1) + ' ' + unit
              } else if (typeof value !== 'undefined' && battery) {
                return value.toFixed(1)
              } else {
                return '-'
              }
            },
          }),
        ],
        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            if (index % self.moduloNumber === 0) {
              return self.momentFromISO8601(value)
            } else {
              return ''
            }
          },
        },
      }
    },
    loadData() {
      this.setDataTitle()
      this.loadLastSensorValues()
      this.sensorMeasurementRequest(this.interval)
      // this.loadRemoteSensorMeasurements(this.activePeriod, this.periodIndex, this.timeGroup, this.timeZone, id)
    },
    momentFromISO8601(date) {
      if (this.interval === 'hour') {
        return this.$moment(date)
          .locale(this.$i18n.locale)
          .format('LT')
      } else if (this.interval === 'day' || this.interval === 'week') {
        var unit = this.$i18n.locale === 'nl' ? 'u' : 'h'
        return (
          this.$moment(date)
            .locale(this.$i18n.locale)
            .format('ddd') +
          ' ' +
          this.$moment(date)
            .locale(this.$i18n.locale)
            .format('H') +
          unit
        )
      } else {
        const currentYear = this.$moment(date).format('YYYY')
        const currentYearEn = ', ' + currentYear
        const currentYearEsPt = ' de ' + currentYear
        const currentYearNl = '. ' + currentYear
        return this.$moment(date)
          .locale(this.$i18n.locale)
          .format('ll')
          .replace(currentYearNl, '')
          .replace(currentYearEn, '')
          .replace(currentYearEsPt, '')
          .replace(' ' + currentYear, '') // Remove year hardcoded per language, currently no other way to get rid of year whilst keeping localized time
      }
    },
    setDataTitle() {
      var p = this.interval
      var d = p + 's'
      var i = this.timeIndex
      var startTimeFormat = 'ddd D MMM YYYY'
      var endTimeFormat = 'ddd D MMM YYYY'

      if (p === 'hour') {
        endTimeFormat = 'HH:mm'
        startTimeFormat += ' ' + endTimeFormat
      } else if (p === 'day') {
        endTimeFormat = null
      } else if (p === 'week') {
        p = 'isoweek'
      }

      var ep = p

      var pStaTime = this.$moment()
        .subtract(i, d)
        .startOf(p)
      var pEndTime = this.$moment()
        .subtract(i, d)
        .endOf(ep)

      var s = pStaTime.format(startTimeFormat)
      var e = pEndTime.format(endTimeFormat)

      this.chartTitle = s + '' + (endTimeFormat !== null ? ' - ' + e : '')

      this.startTime = pStaTime
      this.endTime = pEndTime

      this.selectedDate = pStaTime.format(this.dateFormat.toUpperCase())
    },
    setInterval(interval, modulonr) {
      this.timeIndex = 0
      this.sensorMeasurementRequest(interval)
      this.interval = interval
      this.moduloNumber = modulonr
      this.setDataTitle()
    },
    setTimeIndex(offset) {
      this.timeIndex += offset
      this.loadData()
    },
  },
}
</script>

<style lang="scss">
.period-bar-wrapper {
  position: fixed;
  top: 100px;
  z-index: 1;
  width: 100%;
  margin-top: -4px;
  background-color: $color-orange-light;
  border-bottom: 1px solid #fff5e2;
  .period-container {
    padding-right: 80px;
    padding-left: 80px;
    @include for-phone-only {
      padding: 10px;
    }
  }
  .period-bar {
    margin-top: -10px;
    margin-bottom: -10px;
    @include for-tablet-portrait-up {
      margin-top: -12px;
      margin-bottom: -12px;
    }
  }
}

.measurements-content {
  margin-top: 40px;
}

svg.ct-chart-bar,
svg.ct-chart-line {
  overflow: visible;
}
.ct-label.ct-label.ct-horizontal.ct-end {
  position: relative;
  justify-content: flex-end;
  text-align: right;
  white-space: nowrap;
  transform: translate(-100%) rotate(-45deg);
  transform-origin: 100% 0;
}
.ct-label.ct-vertical.ct-end {
  margin-left: -5px;
}
.ct-chart {
  &.day,
  &.week {
    .ct-grids {
      .ct-grid.ct-horizontal:not(:nth-child(6n + 1)) {
        stroke: none !important;
      }
    }
  }
  &.month {
    .ct-grids {
      .ct-grid.ct-horizontal:not(:nth-child(8n + 1)) {
        stroke: none !important;
      }
    }
  }
  &.year {
    .ct-grids {
      .ct-grid.ct-horizontal:not(:nth-child(11n + 1)) {
        stroke: none !important;
      }
    }
  }
}

.ct-series {
  .ct-point {
    stroke-width: 8px !important;
    @include for-phone-only {
      stroke-width: 6px !important;
    }
  }
  .ct-line {
    @include for-phone-only {
      stroke-width: 3px !important;
    }
  }
  .ct-label:not(:last-child) {
    display: none;
  }
}
.ct-labels {
  .ct-label.ct-horizontal.ct-end {
    font-size: 0.7rem !important;
    @include for-phone-only {
      font-size: 0.6rem !important;
    }
  }
}
.ct-legend {
  position: relative !important;
  text-align: center;
  list-style: none;

  li {
    position: relative !important;
    display: inline-block;
    padding-left: 23px !important;
    margin-right: 10px;
    margin-bottom: 3px;
    cursor: pointer;
  }

  li::before {
    position: absolute !important;
    top: 3px !important;
    left: 0 !important;
    width: 15px !important;
    height: 15px !important;
    content: '' !important;
    border: 3px solid transparent;
    border-radius: 2px !important;
  }

  li.inactive::before {
    background: transparent !important;
  }

  &.ct-legend-inside {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
  }

  @for $i from 0 to length($ct-series-colors) {
    .ct-series-#{$i} {
      color: nth($ct-series-colors, $i + 1);
      &::before {
        background-color: nth($ct-series-colors, $i + 1);
        border-color: nth($ct-series-colors, $i + 1);
      }
    }
  }
  .ct-legend-inside li {
    display: block;
    margin: 0;
  }
}

@for $i from 0 to length($ct-series-colors) {
  .ct-series-#{$i} {
    .ct-legend {
      .ct-series-0 {
        color: nth($ct-series-colors, $i + 1);
        &::before {
          background-color: nth($ct-series-colors, $i + 1);
          border-color: nth($ct-series-colors, $i + 1);
        }
      }
    }
    .ct-series-a .ct-point,
    .ct-series-a .ct-line {
      stroke: nth($ct-series-colors, $i + 1) !important;
    }
  }
}

.ct-series-i .ct-point,
.ct-series-i .ct-line {
  stroke: nth(
    $ct-series-colors,
    9
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-p .ct-point,
.ct-series-p .ct-line {
  stroke: nth(
    $ct-series-colors,
    16
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-q .ct-point,
.ct-series-q .ct-line {
  stroke: nth(
    $ct-series-colors,
    17
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-r .ct-point,
.ct-series-r .ct-line {
  stroke: nth(
    $ct-series-colors,
    18
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-s .ct-point,
.ct-series-s .ct-line {
  stroke: nth(
    $ct-series-colors,
    19
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-t .ct-point,
.ct-series-t .ct-line {
  stroke: nth(
    $ct-series-colors,
    20
  ) !important; // use different color than chartist.css as color i is identical to color b there
}

.ct-series-battery {
  .ct-legend {
    z-index: 1;
    margin-bottom: 27px;
    .ct-series-0 {
      color: nth($ct-series-colors, 16) !important;
      &::before {
        background-color: nth($ct-series-colors, 16);
        border-color: nth($ct-series-colors, 16) !important;
      }
    }
    .ct-series-1 {
      color: nth($ct-series-colors, 17) !important;
      &::before {
        background-color: nth($ct-series-colors, 17);
        border-color: nth($ct-series-colors, 17) !important;
      }
    }
  }
  .ct-chart-line {
    @include for-phone-only {
      margin-left: -16px;
    }
  }
  .ct-series-a .ct-point,
  .ct-series-a .ct-line {
    stroke: nth($ct-series-colors, 16) !important;
  }
  .ct-series-b .ct-point,
  .ct-series-b .ct-line {
    stroke: nth($ct-series-colors, 17) !important;
  }
}
// hacky solution to show all battery info in 1 chart. TODO: implement dual y-axis in 1 chart when option is enabled in chartist
.ct-series-rssi {
  &.rssi-chart-overlapping {
    margin-top: -254px !important;
    .ct-chart-line {
      @include for-phone-only {
        margin-top: -8px;
        margin-left: -16px;
      }
    }
  }
  .ct-legend {
    .ct-series-0 {
      color: nth($ct-series-colors, 12);
      &::before {
        background-color: nth($ct-series-colors, 12);
        border-color: nth($ct-series-colors, 12);
      }
    }
  }
  .ct-series-a .ct-point,
  .ct-series-a .ct-line {
    stroke: nth($ct-series-colors, 12) !important;
  }
  .ct-labels .ct-label.ct-horizontal.ct-end {
    display: none;
  }
}
</style>
