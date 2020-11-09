<template>
  <Layout :no-box-shadow="true">
    <div v-if="devices.length > 0" class="period-bar-wrapper">
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
              @click="setPeriodInterval(period.interval, period.moduloNumber)"
            >
              {{ period.name }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </div>
    <v-container
      v-if="ready"
      :class="devices.length > 0 ? 'measurements-content' : ''"
    >
      <v-row>
        <v-col v-if="devices.length > 0" cols="12">
          <div class="d-flex align-center justify-center">
            <v-icon class="color-grey-dark" @click="setTimeIndex(1)">
              mdi-chevron-left
            </v-icon>
            <span class="period-title">{{ periodTitle }}</span>
            <v-icon
              v-if="timeIndex !== 0"
              class="color-grey-dark"
              @click="setTimeIndex(-1)"
            >
              mdi-chevron-right
            </v-icon>
          </div>
        </v-col>
        <v-col class="d-flex justify-space-between" cols="12">
          <Treeselect
            v-if="devices.length > 0"
            v-model="selectedDeviceId"
            class="mr-3"
            :options="sortedDevices"
            :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
            :no-results-text="`${$t('no_results')}`"
            :disable-branch-nodes="true"
            :default-expand-level="1"
            search-nested
            @input="loadData"
          />
          <v-spacer></v-spacer>
          <v-btn
            tile
            outlined
            :small="mobile && devices.length > 0"
            href="/devices"
            class="edit-button"
            color="primary"
          >
            <v-icon :left="!mobile">mdi-pencil</v-icon>
            {{
              mobile && devices.length > 0
                ? ''
                : $t('edit') + ' ' + $tc('device', 2)
            }}
          </v-btn>
        </v-col>
      </v-row>

      <div v-if="devices.length > 0">
        <v-card v-if="lastSensorDate" outlined class="mt-3">
          <v-card-title
            :class="
              `measurements-card-title ${
                showLastSensorValues
                  ? 'measurements-card-title--border-bottom'
                  : ''
              }`
            "
          >
            <v-row>
              <v-col cols="12" class="py-0">
                <span
                  v-text="
                    mobile
                      ? $t('Last') + ': ' + momentAll(lastSensorDate)
                      : $t('last_measurement') +
                        ': ' +
                        momentAll(lastSensorDate)
                  "
                ></span>
                <div class="float-right">
                  <v-icon
                    :class="
                      `toggle-icon mdi ${
                        showLastSensorValues ? 'mdi-minus' : 'mdi-plus'
                      }`
                    "
                    @click="showLastSensorValues = !showLastSensorValues"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-title>

          <SlideYUpTransition :duration="150">
            <v-card-text v-if="showLastSensorValues">
              <v-row>
                <v-col v-if="currentLastSensorValues.length > 0" cols="12">
                  <div class="d-flex flex-wrap justify-center mt-5 mt-sm-7">
                    <vue-ellipse-progress
                      v-for="(sensorData, index) in currentLastSensorValues"
                      :key="sensorData + index"
                      class="mr-2"
                      :progress="
                        calculateProgress(
                          SENSOR_MIN[sensorData.name],
                          SENSOR_MAX[sensorData.name],
                          // eslint-disable-next-line vue/comma-dangle
                          sensorData.value
                        )
                      "
                      :legend-value="sensorData.value"
                      :color="
                        sensorData.value < SENSOR_LOW[sensorData.name]
                          ? '#ffcc66'
                          : sensorData.value > SENSOR_HIGH[sensorData.name]
                          ? '#f00'
                          : '#417505'
                      "
                      :size="mobile ? 75 : 100"
                      empty-color="#eee"
                      :thickness="4"
                      :empty-thickness="3"
                      half
                      :angle="0"
                    >
                      <template v-slot="{ counterTick }">
                        <v-sheet
                          :class="
                            `beep-icon beep-icon-${sensorData.name} mt-3 mb-n1 mt-sm-1 mb-sm-n1`
                          "
                        ></v-sheet>
                        <div
                          :style="
                            `color: ${
                              sensorData.value < SENSOR_LOW[sensorData.name]
                                ? '#ffcc66'
                                : sensorData.value >
                                  SENSOR_HIGH[sensorData.name]
                                ? '#f00'
                                : '#417505'
                            };
                  font-size: ${mobile ? '14px' : '16px'}
                  ;`
                          "
                        >
                          {{ counterTick.currentValue
                          }}<span style="font-size: 0.75rem;">{{
                            SENSOR_UNITS[sensorData.name]
                          }}</span></div
                        >
                        <div class="gauge-label">{{
                          $t(SENSOR_NAMES[sensorData.name])
                        }}</div>
                      </template>
                    </vue-ellipse-progress>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>

        <v-card v-if="lastSensorDate" outlined class="mt-3">
          <v-card-title
            :class="
              `measurements-card-title ${
                showMeasurements ? 'measurements-card-title--border-bottom' : ''
              }`
            "
          >
            <v-row>
              <v-col cols="12" class="py-0">
                <span>{{
                  selectedDevice && !mobile
                    ? $t('measurements') +
                      ': ' +
                      selectedDevice.hive_name +
                      ' - ' +
                      selectedDevice.name
                    : $t('measurements')
                }}</span>
                <div class="float-right">
                  <v-icon
                    :class="
                      `toggle-icon mdi ${
                        showMeasurements ? 'mdi-minus' : 'mdi-plus'
                      }`
                    "
                    @click="showMeasurements = !showMeasurements"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-title>

          <SlideYUpTransition :duration="150">
            <v-card-text v-if="showMeasurements">
              <v-row>
                <v-col
                  v-if="measurementData === null && !noChartData"
                  class="d-flex align-center justify-center my-16"
                  cols="12"
                >
                  <v-progress-circular
                    color="primary"
                    size="50"
                    indeterminate
                  />
                </v-col>
                <v-col v-if="noChartData" cols="12" class="text-center my-16">
                  {{ $t('no_chart_data') }}
                </v-col>
              </v-row>
              <v-row v-if="measurementData !== null" class="charts">
                <v-col v-if="weatherSensorsPresent" cols="12">
                  <div
                    v-if="selectedDevice"
                    class="overline mt-n4 mt-sm-3 mb-3 text-center"
                    v-text="
                      !mobile
                        ? $t('weather') +
                          ' @ ' +
                          selectedDevice.location_name +
                          ' (' +
                          $t('from_weather_service') +
                          ')'
                        : $t('weather') + ' @ ' + selectedDevice.location_name
                    "
                  ></div>
                  <chartist
                    :class="`${interval} mb-4 mb-sm-6`"
                    ratio="ct-chart"
                    type="Line"
                    :data="chartDataMultipleSeries(currentWeatherSensors, true)"
                    :options="chartOptions()"
                  >
                  </chartist>
                </v-col>
                <v-col v-if="sensorsPresent" cols="12">
                  <div
                    class="overline mt-n4 mt-sm-3 mb-3 text-center"
                    v-text="
                      measurementData.resolution
                        ? $t('measurements') +
                          ' (' +
                          $t('measurement_interval') +
                          ': ' +
                          measurementData.resolution +
                          ')'
                        : $t('measurements')
                    "
                  ></div>
                  <chartist
                    v-for="(sensor, index) in currentSensors"
                    :key="index"
                    :class="`${interval} mb-4 mb-sm-6`"
                    :ratio="`ct-chart ct-series-${index}`"
                    type="Line"
                    :data="chartDataSingleSeries(sensor, SENSOR_UNITS[sensor])"
                    :options="chartOptions(SENSOR_UNITS[sensor])"
                  >
                  </chartist>
                </v-col>
                <v-col v-if="soundSensorsPresent" cols="12">
                  <div
                    class="overline mt-n4 mt-sm-3 mb-3 text-center"
                    v-text="$t('Sound_measurements')"
                  ></div>
                  <chartist
                    :class="`${interval} mb-4 mb-sm-6`"
                    ratio="ct-chart"
                    type="Line"
                    :data="chartDataMultipleSeries(currentSoundSensors)"
                    :options="chartOptions()"
                  >
                  </chartist>
                </v-col>
                <v-col v-if="debugSensorsPresent" cols="12" class="mb-sm-4">
                  <div
                    class="overline mt-n4 mt-sm-3 mb-3 text-center"
                    v-text="
                      $tc('device', 1) + ' ' + $t('info').toLocaleLowerCase()
                    "
                  ></div>
                  <v-row>
                    <v-col
                      v-for="(sensor, index) in currentDebugSensors"
                      :key="index"
                      cols="12"
                      lg="4"
                      class="pt-lg-0"
                    >
                      <chartist
                        :class="`${interval} mt-n2 mt-sm-0`"
                        :ratio="`ct-chart ct-chart-debug ct-chart-${index}`"
                        type="Line"
                        :data="
                          chartDataSingleSeries(sensor, SENSOR_UNITS[sensor])
                        "
                        :options="chartOptions(SENSOR_UNITS[sensor], true)"
                      >
                      </chartist>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>
        <v-row>
          <v-col v-if="!lastSensorDate" cols="12" class="text-center my-10">
            {{ $t('no_data') }}
          </v-col>
        </v-row>
      </div>

      <v-row v-if="devices.length === 0">
        <v-col cols="12" class="text-center my-10">
          {{ $t('sensors_na') }}
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/main.vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import 'chartist/dist/chartist.min.css'
import { sensorMixin } from '@mixins/sensorMixin'
import { SlideYUpTransition } from 'vue2-transitions'
import '@plugins/chartist-plugin-legend-beep.js'
import 'chartist-plugin-pointlabels'
import 'chartist-plugin-tooltips-updated'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'

export default {
  components: { Layout, SlideYUpTransition, Treeselect },
  mixins: [sensorMixin],
  data() {
    return {
      lastSensorDate: null,
      measurementData: {},
      devices: [],
      interval: 'day',
      timeIndex: 0,
      moduloNumber: 6,
      periodTitle: '',
      timeFormat: 'ddd D MMM YYYY',
      currentWeatherSensors: {},
      currentSensors: [],
      currentSoundSensors: {},
      currentDebugSensors: [],
      weatherSensorsPresent: false,
      sensorsPresent: false,
      soundSensorsPresent: false,
      debugSensorsPresent: false,
      noChartData: false,
      currentLastSensorValues: [],
      showMeasurements: true,
      showLastSensorValues: true,
      ready: false,
    }
  },
  computed: {
    timeZone() {
      return this.$moment.tz.guess()
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
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
    selectedDevice() {
      return (
        this.devices.filter((device) => {
          return device.id === this.selectedDeviceId
        })[0] || null
      )
    },
    selectedDeviceId: {
      get() {
        return this.$store.getters['devices/selectedDeviceId']
      },
      set(value) {
        this.$store.commit('devices/setSelectedDeviceId', parseInt(value))
      },
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
  watch: {
    locale() {
      const temp = this.measurementData
      this.measurementData = null // charts are redrawn when measurementData is null
      setTimeout(() => {
        this.formatMeasurementData(temp)
      }, 10)
    },
  },
  created() {
    clearInterval(this.timer)
    this.readDevices()
      .then(() => {
        this.setInitialDeviceId()
      })
      .then(() => {
        this.loadData()
        this.ready = true
      })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async loadLastSensorValuesFunc() {
      try {
        const response = await Api.readRequest(
          '/sensors/lastvalues?id=' + this.selectedDeviceId
        )
        this.currentLastSensorValues = []
        const allLastSensorValues = response.data
        Object.entries(allLastSensorValues).map(([key, value]) => {
          if (value !== null && key === 'weight_kg') {
            const roundedValue = Math.round(value * 1e4) / 1e4
            this.currentLastSensorValues.push({
              value: roundedValue,
              name: key,
            })
          } else if (
            value !== null &&
            key !== 'time' &&
            (this.SENSORS.indexOf(key) > -1 || this.DEBUG.indexOf(key) > -1)
          ) {
            this.currentLastSensorValues.push({ value: value, name: key })
          }
        })

        const self = this
        var sortedArray = this.currentLastSensorValues
          .slice()
          .sort(function(a, b) {
            const compareA = self.$i18n.t(a.name)
            const compareB = self.$i18n.t(b.name)
            if (compareA < compareB) {
              return -1
            }
            if (compareA > compareB) {
              return 1
            }
            return 0
          })
        this.currentLastSensorValues = sortedArray
        this.lastSensorDate = response.data.time
        return true
      } catch (error) {
        console.log('Error: ', error)
        if (error.response.status === 404 || error.response.status === 500) {
          this.lastSensorDate = null
        }
      }
    },
    async sensorMeasurementRequest(interval) {
      var timeGroup = interval === 'hour' ? null : interval
      this.noChartData = false
      this.measurementData = null // needed to let chartist redraw charts after interval switch, otherwise there's a bug in chartist-plugin-legend where old data is loaded after legend click see https://github.com/CodeYellowBV/chartist-plugin-legend/issues/48
      try {
        const response = await Api.readRequest(
          '/sensors/measurements?id=' +
            this.selectedDeviceId +
            '&interval=' +
            interval +
            '&index=' +
            this.timeIndex +
            '&timeGroup=' +
            timeGroup +
            '&timezone=' +
            this.timeZone
        )
        this.formatMeasurementData(response.data)
        return true
      } catch (error) {
        console.log('Error: ', error)
        if (error.response.status === 404 || error.response.status === 500) {
          this.noChartData = true
        }
      }
    },
    async readDevices() {
      try {
        const response = await Api.readRequest('/devices')
        // this.$store.commit('devices/setDevices', response.data)
        this.devices = response.data
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    calculateProgress(min, max, value) {
      if (value > max) {
        return 100
      } else {
        return ((value - min) / (max - min)) * 100
      }
    },
    chartDataSingleSeries(quantity, unit) {
      var data = {
        labels: [],
        series: [
          {
            name: this.measurementData.sensorDefinitions[quantity]
              ? this.measurementData.sensorDefinitions[quantity].name +
                ' (' +
                unit +
                ')'
              : this.$i18n.t(quantity) + ' (' + unit + ')',
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
            data.series[0].data.push({
              meta:
                this.momentAll(measurement.time) +
                '<br>' +
                this.$i18n.t(quantity) +
                ': ' +
                measurement[quantity] +
                unit,
              value: measurement[quantity],
            })
          }
        })
      }
      return data
    },
    chartDataMultipleSeries(sensorObject, weather = false) {
      var data = {
        labels: [],
        series: [],
      }
      Object.keys(sensorObject)
        .sort()
        .map((sensorName, index) => {
          data.series.push({
            name: sensorName,
            data: [],
          })
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
              serie.data.push({
                meta:
                  this.momentAll(measurement.time) +
                  '<br>' +
                  (weather ? this.$i18n.t(currentSensor) : serie.name) +
                  ': ' +
                  measurement[currentSensor] +
                  this.SENSOR_UNITS[currentSensor],
                value: measurement[currentSensor],
              })
            })
          }
        })
      }
      data.series.map((serie) => {
        serie.name = serie.name.replace(/^0/, '') // remove first zero for legend legibility (esp with sound sensor s_bin_201_402 and further)
      })
      return data
    },
    chartOptions(unit = '', low = false) {
      const self = this
      return {
        fullWidth: true,
        height: low ? '150px' : '220px',
        plugins: [
          this.$chartist.plugins.tooltip({
            class: 'beep-tooltip',
            metaIsHTML: true,
          }),
          this.$chartist.plugins.legendBeep(),
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
              } else if (typeof value !== 'undefined') {
                return value.toFixed(1) + ' ' + unit
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
    formatMeasurementData(measurementData) {
      if (
        measurementData &&
        measurementData.measurements &&
        measurementData.measurements.length > 0
      ) {
        this.measurementData = measurementData
        this.currentWeatherSensors = {}
        this.currentSensors = []
        this.currentSoundSensors = {}
        this.currentDebugSensors = []
        this.weatherSensorsPresent = false
        this.sensorsPresent = false
        this.soundSensorsPresent = false
        this.debugSensorsPresent = false
        Object.keys(this.measurementData.measurements[0]).map((quantity) => {
          if (this.WEATHER.indexOf(quantity) > -1) {
            var weatherSensorName = this.SENSOR_NAMES[quantity]
            var weatherSensorUnit = this.SENSOR_UNITS[quantity]
            weatherSensorName =
              this.$i18n.t(weatherSensorName) + ' (' + weatherSensorUnit + ')'
            this.currentWeatherSensors[weatherSensorName] = quantity
            this.weatherSensorsPresent = true
          } else if (this.SENSORS.indexOf(quantity) > -1) {
            this.currentSensors.push(quantity)
            this.sensorsPresent = true
          } else if (this.SOUND.indexOf(quantity) > -1) {
            var soundSensorName = this.measurementData.sensorDefinitions[
              quantity
            ]
              ? this.measurementData.sensorDefinitions[quantity].name
              : this.SENSOR_NAMES[quantity]
            this.currentSoundSensors[soundSensorName] = quantity
            this.soundSensorsPresent = true
          } else if (this.DEBUG.indexOf(quantity) > -1) {
            this.currentDebugSensors.push(quantity)
            this.debugSensorsPresent = true
          }
        })
      } else {
        this.noChartData = true
      }
    },
    loadData() {
      this.setDataTitle()
      this.loadLastSensorValuesTimer()
      this.sensorMeasurementRequest(this.interval)
    },
    loadLastSensorValuesTimer() {
      if (
        this.timeIndex === 0 &&
        (this.interval === 'hour' || this.interval === 'day')
      ) {
        this.loadLastSensorValuesFunc()
        this.timer = setInterval(this.loadLastSensorValuesFunc, 60 * 1000) // NB timer var not added to data on purpose, otherwise clearInterval stops working
      } else {
        clearInterval(this.timer)
        this.timer = false
        this.loadLastSensorValuesFunc()
      }
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
    setDataTitle() {
      var p = this.interval
      var d = p + 's'
      var i = this.timeIndex
      var startTimeFormat = this.timeFormat
      var endTimeFormat = this.timeFormat

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

      var s = pStaTime.locale(this.locale).format(startTimeFormat)
      var e = pEndTime.locale(this.locale).format(endTimeFormat)

      this.periodTitle = s + '' + (endTimeFormat !== null ? ' - ' + e : '')
    },
    setInitialDeviceId() {
      if (this.selectedDeviceId === null) {
        if (this.$route.name === 'measurements-id') {
          this.selectedDeviceId = parseInt(this.$route.params.id)
        } else {
          this.selectedDeviceId = this.devices[0].id
        }
      }
    },
    setPeriodInterval(interval, modulonr) {
      this.timeIndex = 0
      this.interval = interval
      this.moduloNumber = modulonr
      this.loadData()
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

.period-title {
  margin-top: 1px;
  margin-left: 2px;
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1666666667em !important;
  @include for-phone-only {
    margin-top: 0;
    margin-left: 1px;
    font-size: 14px !important;
    letter-spacing: 0.15em !important;
  }
}

.measurements-card-title {
  line-height: 1.5rem !important;
  &.measurements-card-title--border-bottom {
    border-bottom: 1px solid $color-grey-light;
  }
}

.edit-button {
  @include for-phone-only {
    &.v-btn:not(.v-btn--round).v-size--small {
      height: 36px !important;
    }
  }
}

.measurements-content {
  margin-top: 40px;
}
.ep-legend--value {
  margin-top: -24px !important;
}
.gauge-label {
  max-width: 75px;
  font-size: 0.6rem !important;
  line-height: 1 !important;
  word-break: break-word;
}

.charts {
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
      stroke-width: 6px !important;
      @include for-phone-only {
        stroke-width: 4px !important;
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
      &.ct-legend--no-pointer {
        cursor: none;
      }
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
          color: nth($ct-series-colors, length($ct-series-colors) - $i);
          &::before {
            background-color: nth(
              $ct-series-colors,
              length($ct-series-colors) - $i
            );
            border-color: nth(
              $ct-series-colors,
              length($ct-series-colors) - $i
            );
          }
        }
      }
      .ct-series-a .ct-point,
      .ct-series-a .ct-line {
        stroke: nth(
          $ct-series-colors,
          length($ct-series-colors) - $i
        ) !important;
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

  .ct-chart-debug {
    &.ct-chart-0 {
      .ct-series-0 {
        color: nth($ct-series-colors, 16) !important;
        &::before {
          background-color: nth($ct-series-colors, 16);
          border-color: nth($ct-series-colors, 16) !important;
        }
      }
      .ct-series-a .ct-point,
      .ct-series-a .ct-line {
        stroke: nth($ct-series-colors, 16) !important;
      }
    }

    &.ct-chart-1 {
      .ct-series-0 {
        color: nth($ct-series-colors, 17) !important;
        &::before {
          background-color: nth($ct-series-colors, 17);
          border-color: nth($ct-series-colors, 17) !important;
        }
      }
      .ct-series-a .ct-point,
      .ct-series-a .ct-line {
        stroke: nth($ct-series-colors, 17) !important;
      }
    }

    &.ct-chart-2 {
      .ct-series-0 {
        color: nth($ct-series-colors, 12) !important;
        &::before {
          background-color: nth($ct-series-colors, 12);
          border-color: nth($ct-series-colors, 12) !important;
        }
      }
      .ct-series-a .ct-point,
      .ct-series-a .ct-line {
        stroke: nth($ct-series-colors, 12) !important;
      }
    }
  }
}

.beep-tooltip {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.8rem;
  font-weight: 500 !important;
  color: $color-grey-dark !important;
  background-color: rgba(255, 160, 0, 0.87) !important;
  border-radius: 4px;
  &::before {
    margin-left: -5px !important;
    border: 5px solid transparent !important;
    border-top-color: rgba(255, 160, 0, 0.87) !important;
  }
}

.chartist-tooltip-value {
  display: none !important;
}
</style>
