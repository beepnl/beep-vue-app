<template>
  <Layout>
    <div v-if="devices.length > 0 && ready" class="period-bar-wrapper">
      <v-container class="period-container">
        <v-row
          v-if="!smAndDown"
          class="period-bar d-flex flex-wrap justify-space-between align-center"
        >
          <div v-for="period in periods" :key="period.interval">
            <v-btn
              :class="
                `grey--text ${
                  period.interval === interval ? 'accent--text' : ''
                }`
              "
              text
              @click="setPeriodInterval(period.interval)"
            >
              {{ period.name }}
            </v-btn>
          </div>
          <v-switch
            v-model="relativeInterval"
            :label="`${$t('Relative_startpoint')}`"
            class="pt-0 mt-0"
            :disabled="interval === 'selection'"
            dense
            hide-details
          ></v-switch>
        </v-row>
        <div v-if="smAndDown" class="period-bar">
          <v-row class="d-flex flex-row justify-space-between align-center">
            <div v-for="period in periods.slice(0, -2)" :key="period.interval">
              <v-btn
                :class="
                  `grey--text ${
                    period.interval === interval ? 'accent--text' : ''
                  }`
                "
                small
                text
                @click="setPeriodInterval(period.interval)"
              >
                {{ period.name }}
              </v-btn>
            </div>
          </v-row>
          <v-row class="d-flex flex-row justify-space-around align-center">
            <v-col
              v-for="period in periods.slice(-2)"
              :key="period.interval"
              cols="3"
              sm="4"
              class="pa-0 d-flex justify-center"
            >
              <v-btn
                :class="
                  `grey--text ${
                    period.interval === interval ? 'accent--text' : ''
                  }`
                "
                small
                text
                @click="setPeriodInterval(period.interval)"
              >
                {{ period.name }}
              </v-btn>
            </v-col>
            <v-col cols="5" sm="4" class="pa-0">
              <div class="d-flex justify-center">
                <v-switch
                  v-model="relativeInterval"
                  :label="`${$t('Relative_startpoint')}`"
                  class="pt-0 mt-0"
                  :disabled="interval === 'selection'"
                  dense
                  hide-details
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>

    <v-container
      v-if="ready"
      :class="devices.length > 0 ? 'measurements-content' : ''"
    >
      <v-row>
        <v-col v-if="devices.length > 0 && interval !== 'selection'" cols="12">
          <div class="d-flex align-center justify-center">
            <v-icon class="color-grey-dark" @click="setTimeIndex(1)">
              mdi-chevron-left
            </v-icon>

            <span class="period-title">{{ periodTitle }}</span>

            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="selectedDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-icon small class="color-grey-light ml-1" v-on="on">
                  mdi-pencil
                </v-icon>
              </template>
              <v-date-picker
                v-model="selectedDate"
                :first-day-of-week="1"
                :locale="locale"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="modal = false">
                  {{ $t('Cancel') }}
                </v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="
                    $refs.dialog.save(selectedDate), selectDate(selectedDate)
                  "
                >
                  {{ $t('ok') }}
                </v-btn>
              </v-date-picker>
            </v-dialog>

            <v-icon
              v-if="timeIndex !== 0"
              class="color-grey-dark"
              @click="setTimeIndex(-1)"
            >
              mdi-chevron-right
            </v-icon>
          </div>
        </v-col>

        <v-col
          v-if="interval === 'selection'"
          cols="12"
          sm="4"
          md="3"
          :class="mobile ? 'py-0' : 'mx-auto'"
        >
          <div class="d-flex align-center justify-center mr-3 mr-sm-0">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  :rules="requiredRules"
                  :label="$t('period')"
                  prepend-icon="mdi-calendar"
                  class="date-picker"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                :first-day-of-week="1"
                :locale="locale"
                range
                no-title
                scrollable
                @change="checkDateOrder($event)"
              >
                <v-spacer></v-spacer>
                <v-btn text color="secondary" @click="menu = false">
                  {{ $t('Cancel') }}
                </v-btn>
                <v-btn
                  :disabled="invalidDates(dates)"
                  text
                  color="secondary"
                  @click="$refs.menu.save(dates), loadData()"
                >
                  {{ $t('ok') }}
                </v-btn>
              </v-date-picker>
            </v-menu>
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
            @input="selectDevice($event)"
          />
          <v-spacer></v-spacer>
          <v-btn
            tile
            outlined
            :small="mobile && devices.length > 0"
            :to="{ name: 'devices' }"
            class="edit-button"
            color="accent"
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
              <v-col cols="12" class="my-0">
                <span
                  v-text="
                    mobile
                      ? $t('Last') + ': ' + momentFormat(lastSensorDate, 'llll')
                      : $t('last_measurement') +
                        ': ' +
                        momentFormat(lastSensorDate, 'llll')
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
                    <template v-for="sensorData in currentLastSensorValues">
                      <vue-ellipse-progress
                        :key="sensorData.name + sensorData.value"
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
                              `color: #242424;
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
                    </template>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>

        <v-card
          v-if="(measurementData !== null && !noPeriodData) || loadingData"
          outlined
          class="mt-3 mb-3"
        >
          <v-card-title
            :class="
              `measurements-card-title ${
                showMeasurements ? 'measurements-card-title--border-bottom' : ''
              }`
            "
          >
            <v-row>
              <v-col cols="12" class="my-0">
                <div class="d-flex justify-space-between align-center">
                  <span>{{
                    selectedDevice && !mobile
                      ? $tc('Measurement', 2) +
                        ': ' +
                        selectedDevice.hive_name +
                        ' - ' +
                        selectedDevice.name
                      : $tc('Measurement', 2)
                  }}</span>
                  <v-spacer></v-spacer>
                  <div class="d-flex justify-end align-center">
                    <template v-for="(icon, n) in chartColsIcons">
                      <v-icon
                        v-if="!mdScreen"
                        :key="'icon' + n"
                        class="mr-2"
                        :color="chartCols === icon.value ? 'primary' : 'grey'"
                        @click="updateChartCols(icon.value)"
                        >{{ icon.name }}</v-icon
                      >
                    </template>
                    <v-icon
                      :class="
                        `toggle-icon mdi ${
                          showMeasurements ? 'mdi-minus' : 'mdi-plus'
                        }`
                      "
                      @click="showMeasurements = !showMeasurements"
                    ></v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-title>

          <SlideYUpTransition :duration="150">
            <v-card-text v-if="showMeasurements">
              <v-row>
                <v-col
                  v-if="loadingData"
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
              <v-row
                v-if="
                  measurementData !== null &&
                    measurementData.measurements &&
                    measurementData.measurements.length > 0
                "
                class="charts mt-6"
              >
                <v-col v-if="weatherSensorsPresent" cols="12" :md="chartCols">
                  <div
                    v-if="selectedDevice"
                    class="overline mt-0 mt-sm-3 mb-3 text-center"
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
                  <div>
                    <chartist
                      :class="
                        `${interval} ${'modulo-' + moduloNr} mb-4 mb-sm-6`
                      "
                      ratio="ct-chart"
                      type="Line"
                      :data="
                        chartDataMultipleSeries(currentWeatherSensors, true)
                      "
                      :options="chartOptions('', false, currentWeatherSensors)"
                    >
                    </chartist>
                  </div>
                </v-col>
                <template v-if="sensorsPresent">
                  <v-col
                    v-for="(sensor, index) in currentSensors"
                    :key="'sensor' + index"
                    cols="12"
                    class="mb-6"
                    :md="chartCols"
                  >
                    <div
                      v-if="index === 0"
                      class="overline mt-0 mt-sm-3 mb-3 text-center"
                      v-text="
                        measurementData.resolution
                          ? $tc('measurement', 2) +
                            ' (' +
                            $t('measurement_interval') +
                            ': ' +
                            measurementData.resolution +
                            ')'
                          : $tc('measurement', 2)
                      "
                    ></div>
                    <div v-else class="header-filler my-3"></div>
                    <div>
                      <chartist
                        :class="
                          `${interval} ${'modulo-' + moduloNr} mb-4 mb-sm-6`
                        "
                        :ratio="`ct-chart ct-series-${index}`"
                        type="Line"
                        :data="
                          chartDataSingleSeries(sensor, SENSOR_UNITS[sensor])
                        "
                        :options="
                          chartOptions(SENSOR_UNITS[sensor], false, sensor)
                        "
                      >
                      </chartist>
                    </div>
                  </v-col>
                </template>
                <v-col
                  v-if="soundSensorsPresent"
                  cols="12"
                  class="mb-6"
                  :md="chartCols"
                >
                  <div
                    class="overline mt-0 mt-sm-3 mb-3 text-center"
                    v-text="$t('Sound_measurements')"
                  ></div>
                  <div>
                    <MeasurementsChartHeatmap
                      :data="measurementsForHeatmap"
                      :max-value="maxSoundSensorValue"
                      :y-axis="sortedCurrentSoundSensors"
                      :modulo-number="moduloNr"
                      :interval="interval"
                    >
                    </MeasurementsChartHeatmap>
                  </div>
                </v-col>
                <template v-if="debugSensorsPresent">
                  <v-col
                    v-for="(sensor, index) in currentDebugSensors"
                    :key="'debug' + index"
                    cols="12"
                    class="mb-sm-4"
                    :md="chartCols"
                  >
                    <div
                      v-if="index === 0"
                      class="overline mt-n4 mt-sm-3 mb-3 text-center"
                      v-text="
                        $tc('device', 1) + ' ' + $t('info').toLocaleLowerCase()
                      "
                    ></div>
                    <div v-else class="header-filler my-3"></div>
                    <div>
                      <chartist
                        :class="
                          `${interval} ${'modulo-' + moduloNr} mt-n2 mt-sm-3`
                        "
                        :ratio="`ct-chart ct-chart-debug ct-chart-${index}`"
                        type="Line"
                        :data="
                          chartDataSingleSeries(sensor, SENSOR_UNITS[sensor])
                        "
                        :options="
                          chartOptions(SENSOR_UNITS[sensor], true, sensor)
                        "
                      >
                      </chartist>
                    </div>
                  </v-col>
                </template>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>
        <v-row class="text-row">
          <v-col
            v-if="
              ready &&
                (measurementData === null || noPeriodData) &&
                !loadingData
            "
            cols="12"
            class="text-center my-10"
          >
            {{ noPeriodData ? $t('selection_placeholder') : $t('no_data') }}
          </v-col>
        </v-row>
      </div>

      <v-row v-if="devices.length === 0">
        <v-col cols="12">
          <p v-text="$t('sensors') + ' ' + $t('not_available_yet')"></p>
          <div class="text-center">
            <img
              :src="assetsUrl + '/img/beep-base-small.jpg'"
              style=" width: 100%;max-width: 500px;"
            />
          </div>
          <div>{{ $t('beep_base_explanation') }}</div>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import MeasurementsChartHeatmap from '@components/measurements-chart-heatmap.vue'
import Treeselect from '@riophae/vue-treeselect'
import 'chartist/dist/chartist.min.css'
import {
  checkAlerts,
  readDevicesIfNotPresent,
  readTaxonomy,
} from '@mixins/methodsMixin'
import { momentFormat } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'
import { SlideYUpTransition } from 'vue2-transitions'
import '@plugins/chartist-plugin-beep.js'
import '@plugins/chartist-plugin-legend-beep.js'
import 'chartist-plugin-pointlabels'
import 'chartist-plugin-tooltips-updated'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'

export default {
  components: {
    Confirm,
    Layout,
    MeasurementsChartHeatmap,
    SlideYUpTransition,
    Treeselect,
  },
  mixins: [
    checkAlerts,
    momentFormat,
    readDevicesIfNotPresent,
    readTaxonomy,
    sensorMixin,
  ],
  data() {
    return {
      lastSensorDate: null,
      measurementData: {},
      noPeriodData: false,
      interval: 'day',
      timeIndex: 0,
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
      timer: 0,
      selectedDate: '',
      modal: false,
      periodTitle: null,
      preselectedDate: null,
      preselectedDeviceId: null,
      chartCols: 6,
      chartColsIcons: [
        { value: 12, name: 'mdi-format-align-justify' },
        { value: 6, name: 'mdi-grid-large' },
        { value: 4, name: 'mdi-grid' },
      ],
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      menu: false,
      dates: [],
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      periodStart: null,
      periodEnd: null,
      loadingData: false,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    dateRangeText() {
      if (this.dates.length > 0) {
        var momentDates = [
          this.momentFormat(this.dates[0], 'll'),
          this.dates[1] !== undefined
            ? this.momentFormat(this.dates[1], 'll')
            : '',
        ]
        return momentDates.join(' - ')
      } else {
        return this.$i18n.t('selection_placeholder')
      }
    },
    timeZone() {
      return this.$moment.tz.guess()
    },
    locale() {
      return this.$i18n.locale
    },
    measurementsForHeatmap() {
      // remove first value for month and year interval (belongs to previous month/year) (can't be skipped in v-for loop as v-if is not possible there)
      var data = this.measurementData.measurements
      if (
        (this.interval === 'month' || this.interval === 'year') &&
        !this.relativeInterval
      ) {
        data = data.slice(1)
        return data
      } else {
        return data
      }
    },
    maxSoundSensorValue() {
      var allSoundSensorValues = []
      const soundSensors = Object.values(this.currentSoundSensors)
      this.measurementsForHeatmap.map((measurement) =>
        soundSensors.map((soundSensor) => {
          allSoundSensorValues.push(measurement[soundSensor])
        })
      )
      return Math.max(...allSoundSensorValues)
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    moduloFactor() {
      switch (this.screenSize) {
        case 'md':
          return this.chartCols === 6 ? 2 : this.chartCols === 4 ? 3 : 1
        case 'lg':
          return this.chartCols === 4 ? 3 : 1
        case 'xl':
          return 1
      }
      return 1
    },

    moduloNr() {
      switch (this.interval) {
        case 'hour':
          if (this.resolutionUnit === 'm' && this.resolutionNr === 1) {
            return 2 * this.moduloFactor
          } else {
            return 1 * this.moduloFactor
          }
        case 'week':
          if (this.resolutionUnit === 'm' && this.resolutionNr !== null) {
            if (this.resolutionNr < 720) {
              return (360 / this.resolutionNr) * this.moduloFactor
            } else {
              return 1 * this.moduloFactor
            }
          } else {
            return 6 * this.moduloFactor
          }
        case 'month':
          if (this.resolutionUnit === 'm' && this.resolutionNr !== null) {
            return (1440 / this.resolutionNr) * this.moduloFactor
          } else {
            return 8 * this.moduloFactor
          }

        case 'year':
          if (
            this.resolutionUnit === 'd' &&
            this.resolutionNr !== null &&
            this.resolutionNr > 1
          ) {
            return (12 / this.resolutionNr) * this.moduloFactor
          } else {
            return 11 * this.moduloFactor
          }
        case 'day':
          if (this.resolutionUnit === 'm' && this.resolutionNr !== null) {
            if (this.resolutionNr < 60) {
              return (60 / this.resolutionNr) * this.moduloFactor
            } else {
              return 1 * this.moduloFactor
            }
          } else {
            return 6 * this.moduloFactor
          }
      }
      return 6 * this.moduloFactor
    },
    periods() {
      return [
        { name: this.$i18n.t('Hour'), interval: 'hour' },
        { name: this.$i18n.t('day'), interval: 'day' },
        { name: this.$i18n.t('week'), interval: 'week' },
        { name: this.$i18n.t('month'), interval: 'month' },
        { name: this.$i18n.t('year'), interval: 'year' },
        { name: this.$i18n.t('selection'), interval: 'selection' },
      ]
    },
    relativeInterval: {
      get() {
        if (localStorage.beepRelativeInterval) {
          return localStorage.beepRelativeInterval === 'true'
        } else {
          return true
        }
      },
      set(value) {
        localStorage.beepRelativeInterval = value
      },
    },
    requiredRules() {
      var laterEndDate = true
      this.dates.length === 2 && this.dates[0] > this.dates[1]
        ? (laterEndDate = false)
        : (laterEndDate = true)
      return [
        (v) => laterEndDate || this.$i18n.t('later_end_start'), // don't allow start date later than end date
        (v) =>
          this.dates[0] !== this.dates[1] ||
          this.$i18n.t('different_end_start'), // don't allow end date identical to start date
        (v) =>
          this.dates.length > 1 ||
          this.$i18n.t('end_date') + ' ' + this.$i18n.t('not_filled'), // don't allow start date only
      ]
    },
    resolutionNr() {
      return this.measurementData !== null
        ? parseInt(this.measurementData.resolution.slice(0, -1))
        : null
    },
    resolutionUnit() {
      return this.measurementData !== null
        ? this.measurementData.resolution.slice(-1)
        : null
    },
    screenSize() {
      return this.$vuetify.breakpoint.width < 1300
        ? 'md'
        : this.$vuetify.breakpoint.width > 1900
        ? 'xl'
        : 'lg'
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
        this.$store.commit('devices/setSelectedDeviceId', value)
        localStorage.beepSelectedDeviceId = value
      },
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    mdScreen() {
      return this.$vuetify.breakpoint.width < 960
    },
    sortedCurrentSoundSensors() {
      var sorted = Object.keys(this.currentSoundSensors)
        .sort(function(a, b) {
          var firstNumberA = parseInt(a.substring(0, a.indexOf('-')))
          var firstNumberB = parseInt(b.substring(0, b.indexOf('-')))

          if (firstNumberA < firstNumberB) {
            return 1
          }
          if (firstNumberA > firstNumberB) {
            return -1
          }
          return 0
        })
        .reduce(
          (acc, key) => ({
            ...acc,
            [key.replace(/^0/, '')]: this.currentSoundSensors[key], // remove first zero for legend legibility (esp with sound sensor s_bin_201_402 and further)
          }),
          {}
        )
      return sorted
    },
    sortedDevices() {
      var apiaryArray = []
      this.devices.map((device, index) => {
        apiaryArray.push({
          id: -(index + 1), // random because it has to have an id for Treeselect but won't be used later
          label:
            device.location_name !== ''
              ? device.location_name
              : this.$i18n.t('Unknown'),
          children: [],
        })
        device.label = device.hive_name
          ? device.hive_name + ' - ' + device.name
          : device.name
      })
      var uniqueApiaries = []
      const map = new Map()
      for (const item of apiaryArray) {
        if (!map.has(item.label)) {
          map.set(item.label, true) // set any value to Map
          uniqueApiaries.push(item)
        }
      }
      uniqueApiaries = uniqueApiaries.slice().sort(function(a, b) {
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
          if (
            apiary.label === device.location_name ||
            (apiary.label === this.$i18n.t('Unknown') &&
              device.location_name === '')
          ) {
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
      this.setPeriodTitle() // translate period title
      const temp = this.measurementData
      this.measurementData = null // charts are redrawn when measurementData is null
      setTimeout(() => {
        this.formatMeasurementData(temp)
      }, 10)
    },
    relativeInterval() {
      this.loadData()
    },
  },
  created() {
    // if selected device id is saved in localStorage, use it
    if (localStorage.beepSelectedDeviceId) {
      this.selectedDeviceId = localStorage.beepSelectedDeviceId
    }
    this.readTaxonomy()
    if (localStorage.beepChartCols) {
      this.chartCols = parseInt(localStorage.beepChartCols)
    }
    this.preselectedDate = this.$route.query.date || null
    this.preselectedDeviceId = parseInt(this.$route.params.id) || null
    this.checkAlertRulesAndAlerts() // for alerts-tab badge
    this.stopTimer()
    this.readDevicesIfNotPresent()
      .then(() => {
        if (
          this.preselectedDate !== null &&
          this.preselectedDate.length === 10 &&
          !isNaN(this.preselectedDeviceId)
        ) {
          this.selectedDeviceId = this.preselectedDeviceId
          this.selectDate(this.preselectedDate)
        } else if (this.devices.length > 0) {
          this.setInitialDeviceIdAndLoadData()
        }
      })
      .then(() => {
        this.ready = true
      })
  },
  beforeDestroy() {
    if (this.timer > 0) {
      clearInterval(this.timer)
      this.timer = 0
    }
  },
  methods: {
    async loadLastSensorValuesFunc() {
      if (this.selectedDeviceId) {
        try {
          const response = await Api.readRequest(
            '/sensors/lastvalues?id=' + this.selectedDeviceId
          )
          this.currentLastSensorValues = []
          const allLastSensorValues = response.data
          Object.entries(allLastSensorValues).map(([key, value]) => {
            var mT = this.sensorMeasurementsList.filter(
              (measurementType) => measurementType.abbreviation === key
            )[0]
            if (value !== null && key === 'weight_kg') {
              const roundedValue = Math.round(value * 1e4) / 1e4
              this.currentLastSensorValues.push({
                value: roundedValue,
                name: key,
              })
            } else if (
              value !== null &&
              mT !== undefined &&
              mT.show_in_dials === 1
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
          this.stopTimer()
          if (error.response) {
            console.log(error.response)
            if (error.response.status === 500) {
              this.lastSensorDate = null
            }
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    async sensorMeasurementRequest(interval) {
      var start = interval === 'selection' ? this.dates[0] : null
      var end = interval === 'selection' ? this.dates[1] : null
      var timeGroup =
        interval === 'hour' || interval === 'selection' ? null : interval
      this.noChartData = false
      this.noPeriodData = false
      this.loadingData = true
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
            this.timeZone +
            (start !== null ? '&start=' + start + ' 00:00' : '') +
            (end !== null ? '&end=' + end + ' 23:59' : '') +
            '&relative_interval=' +
            (this.relativeInterval ? '1' : '0')
        )
        this.formatMeasurementData(response.data)
        return true
      } catch (error) {
        this.loadingData = false
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 500) {
            this.noChartData = true
          }
          if (error.response.status === 404 || error.response.status === 422) {
            this.selectedDeviceId = parseInt(this.devices[0].id) // overwrite value in store with valid device id
            this.$router.push({ name: '404', params: { resource: 'device' } })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    calculateProgress(min, max, value) {
      if (value > max) {
        return 100
      } else {
        return ((value - min) / (max - min)) * 100
      }
    },
    calculateTimeIndex(period, date, zoom = false, from = null) {
      var newPeriodIndex = 0
      var todayEnd = this.$moment().endOf(period)
      var endOfPeriod = this.$moment.parseZone(date, this.photoParseFormat)
      var periodDiff = todayEnd.diff(endOfPeriod, period + 's')
      if (!isNaN(periodDiff)) newPeriodIndex = periodDiff
      if (!zoom && period === 'hour') newPeriodIndex -= 12
      if (!zoom && period === 'day')
        from !== 'hour'
          ? this.relativeInterval
            ? (newPeriodIndex -= 4)
            : (newPeriodIndex -= 3)
          : this.relativeInterval
          ? (newPeriodIndex -= 1)
          : (newPeriodIndex -= 0)

      return !isNaN(newPeriodIndex) && newPeriodIndex > 0 ? newPeriodIndex : 0
    },
    chartDataSingleSeries(quantity, unit) {
      var data = {
        labels: [],
        series: [
          {
            color: this.SENSOR_COLOR[quantity],
            name:
              this.measurementData.sensorDefinitions[quantity] &&
              this.measurementData.sensorDefinitions[quantity].name !== null
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
            this.interval === 'hour' ||
            this.interval === 'day' ||
            this.interval === 'week' ||
            // skip first value for month and year interval (belongs to previous month/year) except when it's a relative interval
            index !== 0 ||
            this.relativeInterval
          ) {
            data.labels.push(measurement.time)
            data.series[0].data.push({
              meta:
                this.momentFormat(measurement.time, 'llll') +
                '<br>' +
                this.$i18n.t(quantity) +
                ': ' +
                (measurement[quantity] !== null
                  ? measurement[quantity].toFixed(2)
                  : measurement[quantity]) +
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
            color: this.SENSOR_COLOR[sensorObject[sensorName]],
            name: sensorName,
            data: [],
          })
        })
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement, index) => {
          if (
            this.interval === 'hour' ||
            this.interval === 'day' ||
            this.interval === 'week' ||
            // skip first value for month and year interval (belongs to previous month/year) except when it's a relative interval
            index !== 0 ||
            this.relativeInterval
          ) {
            data.labels.push(measurement.time)
            data.series.map((serie, index) => {
              var currentSensor = sensorObject[serie.name]
              serie.data.push({
                meta:
                  this.momentFormat(measurement.time, 'llll') +
                  '<br>' +
                  (weather ? this.$i18n.t(currentSensor) : serie.name) +
                  ': ' +
                  (measurement[currentSensor] !== null
                    ? measurement[currentSensor].toFixed(1)
                    : measurement[currentSensor]) +
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
    chartOptions(unit = '', low = false, sensor) {
      const self = this
      return {
        fullWidth: true,
        height: low ? '150px' : '220px',
        plugins: [
          this.$chartist.plugins.tooltip({
            class: 'beep-tooltip',
            metaIsHTML: true,
          }),
          self.$chartist.plugins.beep({
            onClick: function(date) {
              self.setPeriodToDate(date)
            },
          }),
          self.$chartist.plugins.legendBeep({
            simpleToggle: false,
            inactiveByDefault: false,
          }),
          self.$chartist.plugins.ctPointLabels({
            labelOffset: {
              x: 7,
              y: 0,
            },
            textAnchor: 'start',
            labelInterpolationFnc(value) {
              if (
                typeof value !== 'undefined' &&
                (unit === 'kg' || unit === 'mbar')
              ) {
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
        lineSmooth: self.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            if (index % self.moduloNr === 0) {
              return self.momentFromISO8601(value)
            } else {
              return ''
            }
          },
        },
      }
    },
    checkDateOrder(dates) {
      if (dates[1] < dates[0]) {
        this.dates = [dates[1], dates[0]]
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
      this.loadingData = false
    },
    invalidDates(dates) {
      return (
        (dates.length === 2 && dates[0] > dates[1]) ||
        dates[0] === dates[1] ||
        dates.length === 1
      )
    },
    loadData() {
      this.loadLastSensorValuesTimer()
      this.sensorMeasurementRequest(this.interval)
      this.setPeriodTitle()
    },
    loadLastSensorValuesTimer() {
      if (
        this.timeIndex === 0 &&
        (this.interval === 'hour' || this.interval === 'day')
      ) {
        this.loadLastSensorValuesFunc()
        this.startTimer()
      } else {
        this.stopTimer()
        this.loadLastSensorValuesFunc()
      }
    },
    momentFromISO8601(date) {
      // automagically converted from utc time to users timezone because moment guesses (and then sets its) timezone in this view
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
    selectDate(date) {
      var p = this.interval
      var d = p + 's'

      var selectedMoment = this.$moment(date)
      var currentMoment = this.$moment()
      var periodeDiff = currentMoment.diff(selectedMoment, d)

      if (!isNaN(periodeDiff)) {
        this.timeIndex = periodeDiff
        this.loadData()
      } else {
        console.log('Error selectDate: ' + date)
      }
    },
    selectDevice(event) {
      if (event === undefined) {
        this.selectedDeviceId = null
        this.lastSensorDate = null
        this.stopTimer()
      } else {
        this.loadData()
      }
    },
    setPeriodTitle() {
      var p = this.interval
      var d = p + 's'
      var i = this.timeIndex
      var startTimeFormat = this.timeFormat
      var endTimeFormat = this.timeFormat

      if (p === 'selection') {
        this.periodTitle = this.dateRangeText
        this.periodStart = this.$moment.utc(this.dates[0]) // FIXME: results in previous day if time = 00:00
        this.periodEnd = this.$moment.utc(this.dates[1]) // FIXME: results in previous day if time = 00:00
      } else {
        if (p === 'hour') {
          endTimeFormat = 'HH:mm'
          startTimeFormat += ' ' + endTimeFormat
        } else if (p === 'day') {
          !this.relativeInterval
            ? (endTimeFormat = null)
            : (endTimeFormat = this.timeFormat)
        } else if (p === 'week') {
          !this.relativeInterval ? (p = 'isoweek') : (p = 'week')
        }

        var ep = p

        if (!this.relativeInterval) {
          this.periodStart = this.$moment()
            .subtract(i, d)
            .startOf(p)
          this.periodEnd = this.$moment()
            .subtract(i, d)
            .endOf(ep)
        } else {
          this.periodStart = this.$moment().subtract(i + 1, d)
          this.periodEnd = this.$moment().subtract(i, d)
        }

        var formatStart = this.momentFormat(this.periodStart, startTimeFormat)
        var formatEnd = this.momentFormat(this.periodEnd, endTimeFormat)

        this.periodTitle =
          formatStart + '' + (endTimeFormat !== null ? ' - ' + formatEnd : '')
        this.selectedDate = this.periodStart.format('YYYY-MM-DD')
      }
    },
    setPeriodToDate(date, period = null) {
      if (period === null) {
        if (this.interval === 'day')
          // switch period zoom levels
          period = 'hour'
        else period = 'day'
      }
      var format = period === 'hour' ? 'lll' : 'll'

      this.$refs.confirm
        .open(
          this.$i18n.t('data_zoom'),
          (this.interval !== 'hour'
            ? this.$i18n.t('data_zoom_ok')
            : this.$i18n.t('data_zoom_out_ok')) +
            this.momentFormat(date, format) +
            '?',
          {
            color: 'primary',
          }
        )
        .then((confirm) => {
          this.timeIndex = this.calculateTimeIndex(period, date, true)
          this.interval = period
          this.loadData()
        })
        .catch((reject) => {
          return true
        })
    },
    setInitialDeviceIdAndLoadData() {
      if (this.$route.name === 'measurements-id') {
        this.selectedDeviceId = parseInt(this.$route.params.id)
      } else if (this.selectedDeviceId === null && this.devices.length > 0) {
        this.selectedDeviceId = parseInt(this.devices[0].id)
      }
      this.loadData()
      return true
    },
    setPeriodInterval(interval, modulonr) {
      var prevInterval = this.interval
      this.interval = interval
      if (interval === 'selection' && this.dates.length === 0) {
        this.noPeriodData = true
      } else {
        // change period around the same date instead of resetting to timeIndex 0
        if (this.timeIndex !== 0)
          this.timeIndex = this.calculateTimeIndex(
            interval,
            this.selectedDate,
            false,
            prevInterval
          )
        this.loadData()
      }
    },
    setTimeIndex(offset) {
      this.timeIndex += offset
      this.loadData()
    },
    startTimer() {
      this.stopTimer()
      this.timer = setInterval(this.loadLastSensorValuesFunc, 60 * 1000)
    },
    stopTimer() {
      if (this.timer > 0) {
        clearInterval(this.timer)
        this.timer = 0
      }
    },
    updateChartCols(value) {
      this.chartCols = value
      localStorage.beepChartCols = value
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
  margin-top: 58px;
  @include for-tablet-landscape-up {
    margin-top: 40px;
  }
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

.header-filler {
  height: 32px;
}

.date-picker {
  max-width: 300px;
}
</style>
