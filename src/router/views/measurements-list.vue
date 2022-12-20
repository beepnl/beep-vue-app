<template>
  <Layout>
    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

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
            v-model="setRelativeInterval"
            :label="`${$t('Relative_startpoint')}`"
            class="pt-0 mt-0"
            :disabled="interval === 'selection'"
            dense
            hide-details
            @change="loadData(false, false)"
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
                  v-model="setRelativeInterval"
                  :label="`${$t('Relative_startpoint')}`"
                  class="pt-0 mt-0"
                  :disabled="interval === 'selection'"
                  dense
                  hide-details
                  @change="loadData(false, false)"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>

    <v-app-bar
      v-if="!hideScrollBar && ready && !noChartData"
      fixed
      inverted-scroll
      :dense="smAndDown"
      class="sticky-header"
    >
      <MeasurementsDateSelection
        :interval="interval"
        :period-title="periodTitle"
        :relative-interval="relativeInterval"
        :selected-date="selectedDate"
        :time-index="timeIndex"
        :dates="dates"
        :date-range-text="dateRangeText"
        :sticky="true"
        :selected-device-title="selectedDeviceTitle"
        @load-data="loadData"
        @save-dates="dates = $event"
        @set-time-index="setTimeIndex($event)"
        @select-date="selectDate($event)"
      />

      <div v-if="mobile" class="float-right mr-n1">
        <v-icon class="grey--text" @click="hideScrollBar = true">
          mdi-close
        </v-icon>
      </div>
    </v-app-bar>

    <v-container
      v-if="ready"
      :class="
        (devices.length > 0 ? 'measurements-content' : '') +
          (touchDevice ? ' --touch-device' : '')
      "
    >
      <MeasurementsDateSelection
        :interval="interval"
        :period-title="periodTitle"
        :relative-interval="relativeInterval"
        :selected-date="selectedDate"
        :time-index="timeIndex"
        :dates="dates"
        :date-range-text="dateRangeText"
        @load-data="loadData"
        @save-dates="dates = $event"
        @set-time-index="setTimeIndex($event)"
        @select-date="selectDate($event)"
      />

      <v-row class="my-0">
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
            {{ mobile && devices.length > 0 ? '' : $t('Edit_devices') }}
          </v-btn>
        </v-col>
      </v-row>

      <div v-if="devices.length > 0">
        <v-card v-if="lastSensorDate" outlined class="mt-3 mb-6">
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
          class="mt-3 mb-6"
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
                      ? $tc('Measurement', 2) + ': ' + selectedDeviceTitle
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
                class="charts mt-6 mb-2"
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
                    <MeasurementsChartLine
                      :chart-data="
                        chartjsDataSeries(currentWeatherSensors, true)
                      "
                      :interval="interval"
                      :start-time="periodStartString"
                      :end-time="periodEndString"
                      :chart-id="'chart-weather'"
                      :alerts-for-charts="
                        alertsForCharts(currentWeatherSensors)
                      "
                      :inspections-for-charts="inspectionsForCharts"
                      @confirm-view-alert="confirmViewAlert($event)"
                      @confirm-view-inspection="
                        confirmViewInspection($event.id, $event.date)
                      "
                      @set-period-to-date="setPeriodToDate($event)"
                    >
                    </MeasurementsChartLine>
                  </div>
                </v-col>
                <template v-if="sensorsPresent">
                  <v-col
                    v-for="(sensor, index) in currentSensors"
                    :key="'sensor' + index"
                    cols="12"
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
                    <div
                      v-else-if="chartCols !== 12"
                      class="header-filler my-3"
                    ></div>
                    <div>
                      <MeasurementsChartLine
                        :chart-data="chartjsDataSeries([sensor])"
                        :interval="interval"
                        :start-time="periodStartString"
                        :end-time="periodEndString"
                        :chart-id="'chart-sensor-' + index"
                        :alerts-for-charts="alertsForCharts([sensor])"
                        :inspections-for-charts="inspectionsForCharts"
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
                      :alerts-for-charts="
                        alertsForCharts(Object.values(currentSoundSensors))
                      "
                      :inspections-for-charts="inspectionsForCharts"
                      @confirm-view-alert="confirmViewAlert($event)"
                      @confirm-view-inspection="
                        confirmViewInspection($event.id, $event.date)
                      "
                      @set-period-to-date="setPeriodToDate($event)"
                    >
                    </MeasurementsChartHeatmap>
                  </div>
                </v-col>
                <template v-if="debugSensorsPresent">
                  <v-col
                    v-for="(sensor, index) in currentDebugSensors"
                    :key="'debug' + index"
                    cols="12"
                    :md="chartCols"
                  >
                    <div
                      v-if="index === 0"
                      class="overline mt-n4 mt-sm-3 mb-3 text-center"
                      v-text="
                        $tc('device', 1) + ' ' + $t('info').toLocaleLowerCase()
                      "
                    ></div>
                    <div
                      v-else-if="chartCols !== 12"
                      class="header-filler my-3"
                    ></div>
                    <div>
                      <MeasurementsChartLine
                        :chart-data="chartjsDataSeries([sensor])"
                        :interval="interval"
                        :start-time="periodStartString"
                        :end-time="periodEndString"
                        :chart-id="'chart-debug-' + index"
                        :alerts-for-charts="alertsForCharts([sensor])"
                        :inspections-for-charts="inspectionsForCharts"
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
import MeasurementsChartLine from '@components/measurements-chart-line.vue'
import MeasurementsDateSelection from '@components/measurements-date-selection.vue'
import Treeselect from '@riophae/vue-treeselect'
import {
  checkAlerts,
  readDevicesIfNotPresent,
  readGeneralInspectionsIfNotPresent,
  readTaxonomy,
} from '@mixins/methodsMixin'
import {
  momentifyDayMonth,
  momentFormat,
  momentFormatUtcToLocal,
  momentFromNow,
  timeZone,
} from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
    Layout,
    MeasurementsChartHeatmap,
    MeasurementsChartLine,
    MeasurementsDateSelection,
    SlideYUpTransition,
    Treeselect,
  },
  mixins: [
    checkAlerts,
    momentifyDayMonth,
    momentFormat,
    momentFormatUtcToLocal,
    momentFromNow,
    readDevicesIfNotPresent,
    readGeneralInspectionsIfNotPresent,
    readTaxonomy,
    sensorMixin,
    timeZone,
  ],
  data() {
    return {
      initLocale: 'nl',
      lastSensorDate: null,
      measurementData: {},
      noPeriodData: false,
      interval: 'day',
      timeIndex: 0,
      timeFormat: 'ddd D MMM YYYY',
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      currentWeatherSensors: [],
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
      periodTitle: null,
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
      dates: [],
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      periodStart: null,
      periodEnd: null,
      loadingData: false,
      relativeInterval: true,
      hideScrollBar: false,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('auth', ['userLocale']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('inspections', ['generalInspections']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    alertsForDeviceAndPeriod() {
      var alertsForDevice = [...this.alerts].filter(
        (alert) => alert.device_id === this.selectedDeviceId
      )

      var alertsForDeviceAndPeriod = alertsForDevice.filter((alert) =>
        this.alertInPeriod(alert)
      )

      alertsForDeviceAndPeriod.map((alert) => {
        alert.min = !this.dateWithinPeriod(alert, 'created_at')
          ? this.periodStartString
          : this.momentFormatUtcToLocal(alert.created_at, this.dateTimeFormat)
        alert.max = !this.dateWithinPeriod(alert, 'updated_at')
          ? this.periodEndString
          : this.momentFormatUtcToLocal(alert.updated_at, this.dateTimeFormat)
      })

      return alertsForDeviceAndPeriod
    },
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
    inspectionsWithDates() {
      if (this.generalInspections.length > 0) {
        var inspectionsWithDates = this.generalInspections
        inspectionsWithDates.map((inspection) => {
          inspection.created_at_locale_date = this.momentFormat(
            inspection.created_at,
            'lll'
          )
          inspection.created_at_moment_from_now = this.momentFromNow(
            inspection.created_at
          )
          inspection.reminder_date_locale_date = this.momentFormat(
            inspection.reminder_date,
            'lll'
          )
          inspection.reminder_date_day_month = this.momentifyDayMonth(
            inspection.reminder_date
          )
        })
        return inspectionsWithDates
      } else {
        return []
      }
    },
    inspectionsForCharts() {
      var inspectionsForChartsArray = []

      if (this.timeArray.length > 0) {
        // for each inspection, find its position on the current chart
        this.inspectionsForPeriod.map((inspection) => {
          var inspectionDateInUtc = this.$moment(inspection.created_at)
            .tz(this.timeZone)
            .utc()

          var closestTime = this.momentTimeArray.reduce((prev, curr) => {
            return Math.abs(curr - inspectionDateInUtc) <
              Math.abs(prev - inspectionDateInUtc)
              ? curr
              : prev
          })

          var closestIndex = this.timeArray.findIndex(
            (time) =>
              time === closestTime.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
          )

          var inspectionTimestamp = inspectionDateInUtc.valueOf()

          // and add position and meta data for charts
          var inspectionForChart = {
            id: inspection.id,
            closestIndex,
            xValue: inspectionTimestamp,
            date: this.momentFormat(inspection.created_at, 'llll'),
            text: inspection.notes,
          }

          inspectionsForChartsArray.push(inspectionForChart)
        })
      }

      return inspectionsForChartsArray
    },
    inspectionsForPeriod() {
      var inspections = []
      if (this.selectedDevice.hive_id !== null) {
        inspections = this.inspectionsWithDates.filter(
          (inspection) =>
            inspection.hive_id === this.selectedDevice.hive_id &&
            this.dateWithinPeriod(inspection, 'created_at')
        )
      }
      return inspections
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
    mdScreen() {
      return this.$vuetify.breakpoint.width < 960
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
    momentTimeArray() {
      if (this.timeArray.length > 0) {
        return this.timeArray.map((time) => {
          return this.$moment(time)
        })
      } else {
        return []
      }
    },
    periods() {
      return [
        { name: this.$i18n.t('Hour'), interval: 'hour' },
        { name: this.$i18n.tc('day', 1), interval: 'day' },
        { name: this.$i18n.t('week'), interval: 'week' },
        { name: this.$i18n.t('month'), interval: 'month' },
        { name: this.$i18n.t('year'), interval: 'year' },
        { name: this.$i18n.t('selection'), interval: 'selection' },
      ]
    },
    periodEndString() {
      return this.periodEnd.format(this.dateTimeFormat)
    },
    periodStartString() {
      return this.periodStart.format(this.dateTimeFormat)
    },
    queriedChartCols() {
      var queriedValue = parseInt(this.$route.query.chartCols)
      var valid =
        queriedValue === 12 || queriedValue === 6 || queriedValue === 4
      return valid ? queriedValue : null
    },
    queriedDate() {
      return this.$route.query.date || null
    },
    queriedInterval() {
      return this.$route.query.interval
    },
    queriedTimeIndex() {
      return parseInt(this.$route.query.timeIndex) || 0
    },
    queriedStart() {
      return this.$route.query.start || null
    },
    queriedEnd() {
      return this.$route.query.end || null
    },
    queriedRelativeInterval() {
      return this.$route.query.relativeInterval
    },
    setRelativeInterval: {
      get() {
        return this.relativeInterval
      },
      set(value) {
        localStorage.beepRelativeInterval = value.toString()
        this.relativeInterval = value
      },
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
        return parseInt(this.$store.getters['devices/selectedDeviceId'])
      },
      set(value) {
        this.$store.commit('devices/setSelectedDeviceId', value)
        localStorage.beepSelectedDeviceId = value
      },
    },
    selectedDeviceTitle() {
      return this.selectedDevice.hive_name + ' - ' + this.selectedDevice.name
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
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
    timeArray() {
      return this.measurementData !== null
        ? this.measurementData.measurements.map(
            (measurement) => measurement.time
          )
        : []
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    locale() {
      if (this.locale !== this.initLocale) {
        this.redrawCharts(false)
        this.setPeriodTitle() // translate period title
      }
    },
  },
  created() {
    this.initLocale = this.userLocale
    this.readTaxonomy()
    if (this.queriedChartCols !== null) {
      this.chartCols = this.queriedChartCols
    } else if (localStorage.beepChartCols) {
      this.chartCols = parseInt(localStorage.beepChartCols)
    }
    if (this.queriedRelativeInterval !== undefined) {
      this.relativeInterval = this.queriedRelativeInterval === 'true'
    } else if (localStorage.beepRelativeInterval) {
      this.setRelativeInterval = localStorage.beepRelativeInterval === 'true'
    }
    this.preselectedDeviceId = parseInt(this.$route.params.id) || null
    // if selected device id is saved in localStorage, and there is no preselected device id, use it
    if (
      this.preselectedDeviceId === null &&
      localStorage.beepSelectedDeviceId
    ) {
      this.selectedDeviceId = localStorage.beepSelectedDeviceId
    } else if (this.preselectedDeviceId !== null) {
      this.selectedDeviceId = this.preselectedDeviceId
    }
    this.stopTimer()
    this.checkAlertRulesAndAlerts() // for alerts-tab badge AND alert-lines
      .then(() => {
        this.readGeneralInspectionsIfNotPresent().then(() => {
          this.readDevicesIfNotPresent()
            .then(() => {
              if (
                this.queriedDate !== null &&
                this.queriedDate.length === 10 &&
                !isNaN(this.preselectedDeviceId)
              ) {
                this.selectDate(this.queriedDate)
              } else if (this.devices.length > 0) {
                if (this.queriedInterval !== undefined) {
                  this.interval = this.queriedInterval
                  this.timeIndex = this.queriedTimeIndex
                  this.dates =
                    this.queriedStart && this.queriedEnd
                      ? [this.queriedStart, this.queriedEnd]
                      : []
                }

                this.setInitialDeviceIdAndLoadData()
              }
            })
            .then(() => {
              this.ready = true
            })
        })
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
            var mT = this.getSensorMeasurement(key)
            if (value !== null && key === 'weight_kg') {
              const roundedValue = Math.round(value * 1e4) / 1e4
              this.currentLastSensorValues.push({
                value: roundedValue,
                name: key,
              })
            } else if (
              value !== null &&
              mT !== undefined &&
              mT !== null &&
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
      this.measurementData = null // needed to let chartjs redraw charts after interval switch
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
    alertsForCharts(sensorArray) {
      var alertsForCharts = this.alertsForDeviceAndPeriod.filter((alert) =>
        // DEBUG MOGE: alert.measurement_id === 20
        sensorArray.includes(
          this.getSensorMeasurementAbbrById(alert.measurement_id)
        )
      )

      if (this.timeArray.length > 0) {
        // for each alert, find its position on the current chart
        alertsForCharts.map((alert) => {
          var alertMinMoment = this.$moment(alert.min)
          var alertMaxMoment = this.$moment(alert.max)

          var closestTimeStart = this.momentTimeArray.reduce((prev, curr) => {
            return Math.abs(curr - alertMinMoment) <
              Math.abs(prev - alertMinMoment)
              ? curr
              : prev
          })

          var closestIndexStart = this.timeArray.findIndex(
            (time) =>
              time === closestTimeStart.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
          )

          var closestIndexEnd = closestIndexStart

          if (alert.min !== alert.max) {
            var closestTimeEnd = this.momentTimeArray.reduce((prev, curr) => {
              return Math.abs(curr - alertMaxMoment) <
                Math.abs(prev - alertMaxMoment)
                ? curr
                : prev
            })

            closestIndexEnd = this.timeArray.findIndex(
              (time) =>
                time === closestTimeEnd.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
            )
          }

          // and add position and meta data for chart components
          Object.assign(alert, {
            closestIndexStart,
            closestIndexEnd,
            date: this.momentFormatUtcToLocal(alert.created_at, 'lll'),
          })
        })
      }

      return alertsForCharts
    },
    calculateProgress(min, max, value) {
      if (value > max) {
        return 100
      } else {
        return ((value - min) / (max - min)) * 100
      }
    },
    calculateTimeIndex(newPeriod, startDate, zoom = false, fromPeriod = null) {
      var todayEnd = this.$moment().endOf(newPeriod)

      var endOfPeriod = this.$moment(startDate).endOf(fromPeriod)

      var halfPeriodInDays = 0

      if (fromPeriod === 'week' || fromPeriod === 'month')
        halfPeriodInDays = Math.floor(
          Math.abs(this.$moment(startDate).diff(endOfPeriod, 'days')) / 2
        )
      else if (fromPeriod === 'year') halfPeriodInDays = 182

      var middleDatePeriod = endOfPeriod.subtract(halfPeriodInDays, 'days')

      var newIndex = todayEnd.diff(middleDatePeriod, newPeriod + 's')

      if (this.relativeInterval && !zoom) newIndex -= 1

      if (!zoom && newPeriod === 'hour') newIndex += 10

      return !isNaN(newIndex) && newIndex > 0 ? newIndex : 0
    },
    chartjsDataSeries(quantities, weather = false) {
      var data = {
        labels: [],
        datasets: [],
      }
      // var sensorArray = this.getMeasurementTypesPresent(chartGroup.id)
      quantities.map((quantity, index) => {
        var mT = this.getSensorMeasurement(quantity)

        if (mT === null || mT === undefined) {
          console.log('mT not found ', quantity)
        } else if (mT.show_in_charts === 1) {
          var sensorName =
            this.measurementData.sensorDefinitions[quantity] &&
            this.measurementData.sensorDefinitions[quantity].name !== null
              ? this.measurementData.sensorDefinitions[quantity].name
              : this.$i18n.t(quantity)
          var sensorLabel =
            sensorName +
            (mT.unit !== '-' && mT.unit !== '' && mT.unit !== null
              ? ' (' + mT.unit + ')'
              : '')

          data.datasets.push({
            id: mT.id,
            abbr: mT.abbreviation,
            fill: false,
            borderColor: '#' + mT.hex_color,
            backgroundColor: '#' + mT.hex_color,
            borderRadius: 2,
            label: sensorLabel.replace(/^0/, ''),
            name: sensorName,
            unit: mT.unit !== '-' && mT.unit !== null ? mT.unit : '',
            data: [],
            spanGaps:
              weather || this.interval === 'hour' || this.interval === 'day', // false,
          })
        }
      })

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
            // && index < this.measurementData.measurements.length - 3
          ) {
            data.datasets.map((dataset, index) => {
              var quantity = dataset.abbr
              // if (
              //   measurement[quantity] !== null && // previously this was enabled (do not push null values, otherwise datalabels plugin won't work) but now disabled again to make spanGaps work + added workaround for datalabels plugin
              //   typeof measurement[quantity] === 'number'
              // ) {
              dataset.data.push({
                x: measurement.time,
                y: measurement[quantity],
              })
              // }
            })
          }
        })
      }

      return data
    },
    checkDateOrder(dates) {
      if (dates[1] < dates[0]) {
        this.dates = [dates[1], dates[0]]
      }
    },
    confirmViewAlert(alert) {
      // TODO: finetune message, add date?
      this.$refs.confirm
        .open(
          this.$i18n.t('view') + ' ' + this.$i18n.tc('alert', 1),
          this.$i18n.t('View_alert_confirm') + alert.alert_rule_name + '"?',
          {
            color: 'red',
          },
          alert.alert_rule_name + ' (' + alert.alert_function + ')'
        )
        .then((confirm) => {
          return this.$router.push({
            name: 'alerts',
            query: {
              search: alert.date,
            },
          })
        })
        .catch((reject) => {
          return true
        })
    },
    confirmViewInspection(inspectionId, inspectionDate) {
      this.$refs.confirm
        .open(
          this.$i18n.tc('View_inspection', 1),
          this.$i18n.t('View_inspection_confirm') + inspectionDate + '?',
          {
            color: 'primary',
          }
        )
        .then((confirm) => {
          var query = {
            search: 'id=' + inspectionId.toString(),
            interval: this.interval,
            relativeInterval: this.relativeInterval,
            chartCols: this.chartCols,
          }
          if (this.interval === 'selection' && this.dates.length > 0) {
            query.start = this.dates[0]
            query.end = this.dates[1]
          } else {
            query.timeIndex = this.timeIndex
          }

          return this.$router.push({
            name: 'hive-inspections',
            params: { id: this.selectedDevice.hive_id },
            query,
          })
        })
        .catch((reject) => {
          return true
        })
    },
    formatMeasurementData(measurementData) {
      if (
        measurementData &&
        measurementData.measurements &&
        measurementData.measurements.length > 0
      ) {
        this.measurementData = measurementData
        this.currentWeatherSensors = []
        this.currentSensors = []
        this.currentSoundSensors = {}
        this.currentDebugSensors = []
        this.weatherSensorsPresent = false
        this.sensorsPresent = false
        this.soundSensorsPresent = false
        this.debugSensorsPresent = false
        Object.keys(this.measurementData.measurements[0]).map((quantity) => {
          if (this.WEATHER.indexOf(quantity) > -1) {
            // var weatherSensorName = this.SENSOR_NAMES[quantity]
            // var weatherSensorUnit = this.SENSOR_UNITS[quantity]
            // weatherSensorName =
            //   this.$i18n.t(weatherSensorName) + ' (' + weatherSensorUnit + ')'
            this.currentWeatherSensors.push(quantity)
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
    getSensorMeasurement(abbr) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : null
    },
    getSensorMeasurementAbbrById(id) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.id === id
      )
      return smFilter.length > 0 ? smFilter[0].abbreviation : null
    },
    alertInPeriod(alert) {
      const created = this.momentFormatUtcToLocal(
        alert.created_at,
        this.dateTimeFormat
      )
      const updated = this.momentFormatUtcToLocal(
        alert.updated_at,
        this.dateTimeFormat
      )

      const periodLongerThanAlert =
        this.dateWithinPeriod(alert, 'created_at') ||
        (created !== updated && this.dateWithinPeriod(alert, 'updated_at'))
      const alertLongerThanPeriod =
        created !== updated &&
        created <= this.periodStartString &&
        updated >= this.periodEndString

      return periodLongerThanAlert || alertLongerThanPeriod
    },

    dateWithinPeriod(item, dateProp) {
      const date = this.momentFormatUtcToLocal(
        item[dateProp],
        this.dateTimeFormat
      )
      return date <= this.periodEndString && date >= this.periodStartString
    },
    invalidDates(dates) {
      return (
        (dates.length === 2 && dates[0] > dates[1]) ||
        dates[0] === dates[1] ||
        dates.length === 1
      )
    },
    loadData(loadLastSensorValues = true, skipTitle = false) {
      if (!skipTitle) {
        this.setPeriodTitle()
      }
      if (loadLastSensorValues) {
        this.loadLastSensorValuesTimer()
      }
      this.sensorMeasurementRequest(this.interval)
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
    redrawCharts(seamless = true) {
      const temp = this.measurementData
      if (!seamless) {
        this.resetCharts()
      }
      setTimeout(() => {
        this.formatMeasurementData(temp)
      }, 10)
    },
    resetCharts() {
      this.loadingData = true
      this.measurementData = null // charts are redrawn when measurementData is null
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

      if (this.touchDevice) {
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
            this.zoomTo(period, date)
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.zoomTo(period, date)
      }
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
        if (prevInterval === interval) {
          // set index to 0 if if clicked interval is same as already selected
          this.timeIndex = 0
        } else if (this.timeIndex !== 0) {
          // change period around the same date instead of resetting to timeIndex 0
          this.timeIndex = this.calculateTimeIndex(
            interval,
            this.selectedDate,
            false,
            prevInterval
          )
        }
        this.loadData()
      }
    },
    setTimeIndex(offset) {
      this.resetCharts() // show loading icon instead of still try to render charts
      var timeIndexWhenClicked = this.timeIndex
      this.timeIndex += offset
      this.setPeriodTitle()
      setTimeout(() => {
        // only load data when user is done clicking through periods, so when intended timeIndex has been reached
        if (timeIndexWhenClicked + offset === this.timeIndex) {
          this.loadData(true, true)
        }
      }, 600)
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
    zoomTo(period, date) {
      this.timeIndex = this.calculateTimeIndex(period, date, true)
      this.interval = period
      this.loadData()
    },
  },
}
</script>

<style lang="scss">
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
  &.--touch-device {
    user-select: none; // prevent text selection on mobile drag on chart
    -webkit-touch-callout: none; // Safari
    -webkit-user-select: none; // Chrome
    -moz-user-select: none; // Firefox
    -ms-user-select: none; // Internet Explorer/Edge
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
  @include for-phone-only {
    display: none;
  }
}

.date-picker {
  max-width: 300px;
}

.sticky-header {
  top: 153px !important;
  z-index: 1 !important;
  background-color: $color-orange-light !important;
  border-bottom: 1px solid $color-orange-border;
  @include for-phone-only {
    top: 148px !important;
  }
  @include for-tablet-landscape-up {
    top: 130px !important;
  }
}
</style>
