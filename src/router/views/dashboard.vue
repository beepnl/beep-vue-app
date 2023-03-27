<template>
  <div>
    <div class="d-flex justify-end dashboard-controls my-2 mx-4">
      <div v-if="showControls" class="d-flex">
        <LocaleChanger></LocaleChanger>
        <v-icon
          class="color-grey-filter ml-2 mr-4"
          @click="toggleDarkMode(!darkMode)"
        >
          mdi-theme-light-dark
        </v-icon>
        <v-icon
          class="color-grey-filter mr-4"
          @click="setLandscapeMode = !landscapeMode"
        >
          {{
            'mdi-phone-rotate-' + (!landscapeMode ? 'landscape' : 'portrait')
          }}
        </v-icon>
        <v-icon
          class="color-grey-filter mr-4"
          @click="toggleHiveTimer(!hiveTimerPaused)"
        >
          {{ 'mdi-' + (hiveTimerPaused ? 'play' : 'pause') }}
        </v-icon>
        <v-icon class="color-grey-filter mr-4" @click="dashboardSignOut"
          >mdi-logout</v-icon
        >
      </div>
      <v-icon class="color-grey-filter" @click="toggleShowControls">
        {{ showControls ? 'mdi-cog' : 'mdi-cog-off' }}
      </v-icon>
    </div>
    <v-container
      :class="'dashboard-container' + (landscapeMode ? ' --landscape' : '')"
    >
      <v-row :class="'dashboard-row' + (landscapeMode ? ' --landscape' : '')">
        <v-col cols="12" :class="tvAndUp ? 'mb-6' : ''">
          <div
            :class="
              'dashboard-header d-flex align-center justify-' +
                (landscapeMode ? 'left' : 'center mb-6')
            "
          >
            <div class="d-flex align-self-center"
              ><img
                class="dashboard-logo"
                :src="
                  assetsUrl +
                    '/img/dashboard/beep-icon-logo' +
                    (darkMode ? '-white-text' : '') +
                    '.svg'
                "
              />
            </div>

            <div
              :class="
                'text-h3 dashboard-title overline roboto-condensed' +
                  (!landscapeMode ? ' text-md-h2' : ' font-weight-light')
              "
              v-text="dashboard.name ? dashboard.name : $tc('Dashboard', 1)"
            ></div>
          </div>
        </v-col>

        <v-col
          v-if="!ready"
          class="d-flex align-center justify-center dashboard-loading --landscape"
          cols="12"
        >
          <v-progress-circular color="primary" size="50" indeterminate />
        </v-col>

        <v-col
          :cols="landscapeMode ? '6' : '12'"
          :md="landscapeMode ? '4' : '12'"
          :class="
            (ready && landscapeMode ? 'landscape-section --left' : '') +
              (darkMode ? ' sticky-dark-mode' : '')
          "
        >
          <DashboardSection
            :class="landscapeMode ? 'hide-landscape' : 'show-portrait'"
            :title="$tc('Location', 1)"
          >
            <div
              v-if="ready && selectedLocationName"
              class="dashboard-text"
              v-text="selectedLocationName"
            ></div>
            <div
              id="map"
              ref="map"
              :class="
                'map ' +
                  (ready && coordinatesPresent
                    ? '--portrait'
                    : ready
                    ? '--hide'
                    : '--loading')
              "
            >
            </div>
          </DashboardSection>

          <DashboardSection
            v-if="ready"
            :title="$tc('Colony', 2)"
            :landscape-mode="landscapeMode"
          >
            <div
              :class="
                'd-flex flex-column align-center hives-wrapper ' +
                  (landscapeMode ? '--landscape' : '--portrait') +
                  (darkMode ? ' --dark' : '')
              "
            >
              <div
                class="dashboard-text"
                v-text="selectedHiveDetails.name"
              ></div>
              <ApiaryPreviewHiveSelector
                class="mb-2"
                :hives="dashboardHives"
                :hives-selected="selectedHiveIds"
                :dashboard-mode="true"
                :disable-sort-hives="true"
                :large-size="
                  !smallScreen && (!landscapeMode || dashboardHives.length < 7)
                "
                @select-hive="selectHive($event)"
              ></ApiaryPreviewHiveSelector>
            </div>
          </DashboardSection>

          <DashboardSection
            v-if="
              ready && selectedHive && (showInspections || selectedLocationName)
            "
            :title="$tc('Inspection', 1)"
            :landscape-mode="landscapeMode"
          >
            <div v-if="!landscapeMode && showInspections" style="width: 100%;">
              <span
                class="dashboard-text mb-2"
                v-text="
                  $t('Last_check') +
                    ': ' +
                    momentFromNow(selectedHiveDetails.last_inspection_date)
                "
              ></span>
            </div>
            <div
              :class="
                'dashboard-inspection dashboard-text-small mb-lg-2 mx-3 ' +
                  (landscapeMode
                    ? '--landscape mt-0'
                    : '--portrait funky-border mt-3') +
                  (darkMode ? ' sticky-dark-mode' : '')
              "
            >
              <v-row v-if="landscapeMode" class="dashboard-sticky-row">
                <v-col cols="5" class="px-1 pt-0 pb-1 pa-xl-3"
                  ><span v-text="$tc('Location', 1) + ': '"></span
                ></v-col>
                <v-col cols="7" class="px-1 pt-1 pb-1 pa-xl-3">
                  <div
                    id="map"
                    ref="map"
                    :class="
                      'map ' +
                        (ready && coordinatesPresent
                          ? '--landscape'
                          : ready
                          ? '--hide'
                          : '--loading')
                    "
                  >
                  </div>
                  <span
                    v-if="ready && selectedLocationName && !coordinatesPresent"
                    v-text="selectedLocationName"
                  ></span>
                </v-col>
                <v-col v-if="showInspections" cols="5" class="pa-1 pa-xl-3"
                  ><span v-text="$t('Last_check') + ': '"></span
                ></v-col>
                <v-col v-if="showInspections" cols="7" class="pa-1 pa-xl-3"
                  ><span
                    v-text="
                      momentFromNow(selectedHiveDetails.last_inspection_date)
                    "
                  ></span
                ></v-col>
              </v-row>
              <v-row
                v-if="showInspections && selectedHiveDetails.impression"
                :class="
                  'dashboard-sticky-row ' + (!landscapeMode ? 'pa-3' : '')
                "
              >
                <v-col cols="5" class="pa-1 pa-xl-3"
                  ><span v-text="$t('positive_impression') + ': '"></span
                ></v-col>
                <v-col cols="7" class="pa-1 pa-xl-3">
                  <v-icon
                    v-if="selectedHiveDetails.impression === 1"
                    class="red--text"
                  >
                    mdi-emoticon-sad
                  </v-icon>
                  <v-icon
                    v-if="selectedHiveDetails.impression === 3"
                    class="green--text"
                  >
                    mdi-emoticon-happy
                  </v-icon>
                  <v-icon
                    v-if="selectedHiveDetails.impression === 2"
                    class="orange--text"
                  >
                    mdi-emoticon-neutral
                  </v-icon>
                </v-col>
              </v-row>
              <v-row
                v-if="showInspections && selectedHiveDetails.notes"
                :class="
                  'dashboard-sticky-row ' + (!landscapeMode ? 'pa-3' : '')
                "
              >
                <v-col cols="5" class="pa-1 pa-xl-3"
                  ><span v-text="$t('Note') + ': '"></span
                ></v-col>
                <v-col cols="7" class="pa-1 pb-2 pa-xl-3"
                  ><span
                    class="line-clamp-3"
                    v-text="selectedHiveDetails.notes"
                  ></span
                ></v-col>
              </v-row>
            </div>
          </DashboardSection>
        </v-col>

        <v-col
          :cols="landscapeMode ? '6' : '12'"
          :md="landscapeMode ? '8' : '12'"
          :class="landscapeMode ? 'landscape-section --right' : ''"
        >
          <DashboardSection
            v-if="
              ready &&
                selectedHive &&
                selectedHiveDetails.sensors &&
                selectedHiveDetails.sensors.length !== 0
            "
            :title="$tc('Measurement', 2)"
            :landscape-mode="landscapeMode"
          >
            <v-col
              v-if="loadingData"
              :class="
                'd-flex align-center justify-center dashboard-loading ' +
                  (landscapeMode ? '--landscape' : '')
              "
              cols="12"
            >
              <v-progress-circular color="primary" size="50" indeterminate />
            </v-col>
            <v-col
              v-if="(noChartData || !sensorsPresent) && !loadingData"
              cols="12"
              class="my-4"
            >
              {{ $t('no_chart_data_hive') }}
            </v-col>
            <template v-for="(sensorSet, index) in currentSensors">
              <v-col
                v-if="measurementData !== null && sensorSet.values.length > 0"
                :key="'sensor' + index"
                cols="12"
              >
                <div
                  class="dashboard-text mt-n3 mb-1"
                  v-text="$t(sensorSet.name)"
                ></div>
                <div
                  :class="
                    'chart-wrapper mb-2 ' + (!landscapeMode ? '--portrait' : '')
                  "
                >
                  <div :class="!landscapeMode ? 'chart-left' : ''">
                    <MeasurementsChartLine
                      :chart-data="chartjsDataSeries(sensorSet.values)"
                      :interval="'week'"
                      :start-time="periodStartString"
                      :end-time="periodEndString"
                      :chart-id="'chart-dashboard-' + index"
                      :location="'dashboard'"
                      :dark-mode="darkMode"
                    >
                    </MeasurementsChartLine>
                  </div>
                  <div
                    :class="
                      'd-flex flex-wrap mx-sm-8 ' +
                        (!landscapeMode ? 'chart-right' : '')
                    "
                  >
                    <template v-for="(exampleChart, i) in sensorSet.examples">
                      <div
                        :key="'ex-' + i"
                        class="example-chart d-flex align-center my-2"
                      >
                        <img
                          class="example-img"
                          :src="
                            assetsUrl +
                              '/img/dashboard/chart_' +
                              sensorSet.name +
                              '_' +
                              (i + 1) +
                              (darkMode ? '_dark' : '') +
                              '.svg'
                          "
                        />
                        <span
                          class="dashboard-text-small ml-1 ml-sm-2 mr-3 mr-sm-6"
                          v-text="
                            $t(sensorSet.name + '_example_chart_' + (i + 1))
                          "
                        ></span>
                      </div>
                    </template>
                  </div>
                </div>
              </v-col>
            </template>
          </DashboardSection>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import DashboardSection from '@components/dashboard-section.vue'
import languages from '@assets/js/languages'
import LocaleChanger from '@components/locale-changer.vue'
import MeasurementsChartLine from '@components/measurements-chart-line.vue'
import { mapGetters } from 'vuex'
import { readDashboard } from '@mixins/methodsMixin'
import { momentFromNow, timeZone } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    DashboardSection,
    LocaleChanger,
    MeasurementsChartLine,
  },
  mixins: [momentFromNow, readDashboard, sensorMixin, timeZone],
  data: function() {
    return {
      selectedHive: null,
      languages: languages.languageArray,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      ready: false,
      map: null,
      marker: null,
      noChartData: false,
      loadingData: true,
      measurementData: {},
      tempSensors: [],
      weightSensors: [],
      sensorsPresent: false,
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      showControls: false,
      hiveTimer: 0,
      dataTimer: 0,
      dashboardTimer: 0,
      dataIntervalMinutes: 60,
      hiveTimerPaused: false,
      currentHiveIndex: -1,
      currentHiveWithDataIndex: -1,
      darkMode: true,
      dashboardCode: null,
    }
  },
  computed: {
    ...mapGetters('dashboard', ['dashboard', 'landscapeMode']),
    code() {
      return this.$route.params.id
    },
    coordinatesPresent() {
      return this.selectedHive && this.lat !== null && this.lng !== null
    },
    currentSensors() {
      return [
        { name: 't', values: this.tempSensors, examples: 2 },
        { name: 'weight', values: this.weightSensors, examples: 4 },
      ]
    },
    dashboardHives() {
      return this.dashboard.hives
    },
    desktopAndUp() {
      return this.$vuetify.breakpoint.width >= 1200
    },
    hiveIntervalSeconds() {
      return this.dashboard.speed
    },
    hivesWithData() {
      // if show all is false (default), only enable hives with (possible) measurement data to be selected, otherwise all hives will be selected
      return this.dashboard.show_all === 0
        ? this.dashboardHives.filter((hive) => hive.sensors.length > 0)
        : this.dashboardHives
    },
    lat() {
      return this.selectedHive !== null ? this.selectedHiveDetails.lat : null
    },
    lng() {
      return this.selectedHive !== null ? this.selectedHiveDetails.lon : null
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    periodEndString() {
      return this.$moment().format(this.dateTimeFormat)
    },
    periodStartString() {
      return this.$moment()
        .subtract(1, 'weeks')
        .format(this.dateTimeFormat)
    },
    selectedHiveDetails() {
      return this.selectedHive ? this.selectedHive.hives[0] : {}
    },
    selectedHiveIds() {
      return this.selectedHive ? [this.selectedHiveDetails.id] : []
    },
    selectedLocationName() {
      return this.selectedHive &&
        this.selectedHiveDetails &&
        this.selectedHiveDetails.location_name
        ? this.selectedHiveDetails.location_name
        : null
    },
    sensorMeasurementsList() {
      return this.dashboard ? this.dashboard.sensormeasurements : []
    },
    setLandscapeMode: {
      get() {
        return this.landscapeMode
      },
      set(value) {
        localStorage.beepdashboardLandscapeMode = value.toString()
        this.$store.commit('dashboard/setData', {
          prop: 'landscapeMode',
          value,
        })
      },
    },
    showInspections() {
      return (
        this.dashboard.show_inspections === 1 &&
        this.selectedHive &&
        this.selectedHiveDetails.last_inspection_date !== null
      )
    },
    smallScreen() {
      return this.$vuetify.breakpoint.width < 960
    },
    svgMarker() {
      return {
        path:
          'M12,3L2,12H5V20H19V12H22M9,18H7V12H9M13,18H11V10H13M17,18H15V14H17',
        fillColor: '#f29100',
        fillOpacity: 0.9,
        strokeWeight: 0,
        rotation: 0,
        scale: 3,
        anchor: new window.google.maps.Point(12, 12),
      }
    },
    tvAndUp() {
      return this.$vuetify.breakpoint.width >= 2200
    },
  },
  watch: {
    ready() {
      if (this.ready && this.coordinatesPresent) {
        this.initMap()
      }
    },
    selectedLocationName() {
      if (this.coordinatesPresent) {
        this.initMap()
      }
    },
    landscapeMode() {
      if (this.coordinatesPresent) {
        this.initMap()
      }
    },
    desktopAndUp() {
      console.log('watch desktop size')
      this.setLandscapeMode = this.desktopAndUp
    },
  },
  mounted() {},
  created() {
    if (this.smallScreen) {
      this.setLandscapeMode = false
    }
    this.checkLocalStorage()

    this.readDashboard(this.dashboardCode).then(() => {
      this.nextHiveWithData()
      this.startTimer('hive')
    })
  },
  beforeDestroy() {
    this.stopAllTimers()
  },
  methods: {
    chartjsDataSeries(quantities) {
      var data = {
        labels: [],
        datasets: [],
      }
      // var sensorArray = this.getMeasurementTypesPresent(chartGroup.id)
      quantities.map((quantity, index) => {
        var mT = this.getSensorMeasurement(quantity)

        if (mT.show_in_charts === 1) {
          var sensorName =
            quantity === 'temperature'
              ? this.$i18n.t('outsideTemperature')
              : this.measurementData.sensorDefinitions[quantity] &&
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
            borderColor:
              quantity === 'temperature'
                ? this.darkMode
                  ? '#ff701e'
                  : '#242424'
                : '#' + mT.hex_color,
            backgroundColor:
              quantity === 'temperature'
                ? this.darkMode
                  ? '#ff701e'
                  : '#242424'
                : '#' + mT.hex_color,
            borderRadius: 2,
            label: sensorLabel.replace(/^0/, ''),
            name: sensorName,
            unit: mT.unit !== '-' && mT.unit !== null ? mT.unit : '',
            data: [],
            spanGaps: false,
          })
        }
      })

      if (
        typeof this.measurementData.measurements !== 'undefined' &&
        this.measurementData.measurements.length > 0
      ) {
        this.measurementData.measurements.map((measurement, index) => {
          data.datasets.map((dataset, index) => {
            var quantity = dataset.abbr
            dataset.data.push({
              x: measurement.time,
              y: measurement[quantity],
            })
          })
        })
      }

      return data
    },
    checkLocalStorage() {
      if (localStorage.beepdashboardLocale) {
        this.$i18n.locale = localStorage.beepdashboardLocale
      } else {
        this.$i18n.locale = languages.checkBrowserLanguage()
      }

      if (localStorage.beepdashboardDarkMode) {
        this.darkMode = localStorage.beepdashboardDarkMode === 'true'
        this.$vuetify.theme.dark = this.darkMode
      }
      if (localStorage.beepdashboardHiveTimerPaused) {
        this.hiveTimerPaused =
          localStorage.beepdashboardHiveTimerPaused === 'true'
      }
      if (localStorage.beepdashboardLandscapeMode) {
        this.setLandscapeMode =
          localStorage.beepdashboardLandscapeMode === 'true'
      }
      if (this.code) {
        // if code is in url overwrite localstorage code
        localStorage.beepdashboardCode = this.code
        this.dashboardCode = this.code
      } else if (localStorage.beepdashboardCode) {
        // else use local storage code
        this.dashboardCode = localStorage.beepdashboardCode
      } else {
        // else login is required
        this.$router.push({ name: 'dashboard-sign-in' })
      }
    },
    dashboardSignOut() {
      this.$refs.confirm
        .open(
          this.$i18n.t('Logout_dashboard'),
          this.$i18n.t('Logout_dashboard_check'),
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          // this.$store
          //   .dispatch('auth/signOut')
          //   .then(() =>
          this.$router.push({ name: 'dashboard-sign-in' })
          // )
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
        this.tempSensors = []
        this.weightSensors = []
        this.sensorsPresent = false
        Object.keys(this.measurementData.measurements[0]).map((quantity) => {
          if (this.DASHBOARD_TEMP_SENSORS.indexOf(quantity) > -1) {
            this.tempSensors.push(quantity)
            this.sensorsPresent = true
          } else if (this.DASHBOARD_WEIGHT_SENSORS.indexOf(quantity) > -1) {
            this.weightSensors.push(quantity)
            this.sensorsPresent = true
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
    initMap() {
      // var refMap = this.landscapeMode ? this.$refs.mapL : this.$refs.mapP
      // this.map = new window.google.maps.Map(refMap, {
      setTimeout(() => {
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: {
            lat: this.lat,
            lng: this.lng,
          },
          fullscreenControl: false,
          zoom: 9,
          mapTypeControl: false,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          streetViewControl: false,
          zoomControl: false,
        })

        this.marker = new window.google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          icon: this.svgMarker,
          map: this.map,
        })
      }, 100)
    },
    nextHiveWithData() {
      // fallback if no hives with data present
      if (this.hivesWithData.length === 0) {
        this.selectHive(this.dashboardHives[this.currentHiveIndex + 1].id)
      } else {
        this.currentHiveWithDataIndex += 1
        if (this.currentHiveWithDataIndex >= this.hivesWithData.length)
          this.currentHiveWithDataIndex = 0
        this.selectHive(this.hivesWithData[this.currentHiveWithDataIndex].id)
      }
    },
    redrawCharts() {
      const temp = this.measurementData
      this.measurementData = null
      setTimeout(() => {
        this.formatMeasurementData(temp)
      }, 10)
    },
    selectHive(id) {
      this.readDashboardHive(this.dashboardCode, id).then(() => {
        this.formatMeasurementData(this.selectedHiveDetails)
        this.ready = true
      })
    },
    startTimer(timer) {
      this.stopTimer(timer)
      // only start status timer if sensor has status and research is active, otherwise no need to keep updating status
      if (timer === 'hive' && !this.hiveTimerPaused) {
        this.hiveTimer = setInterval(
          this.nextHiveWithData,
          this.hiveIntervalSeconds * 1000
        )
      } else if (
        timer === 'data' &&
        this.selectedHive &&
        this.selectedHiveDetails.sensors.length !== 0
      ) {
        this.dataTimer = setInterval(
          this.sensorMeasurementRequest,
          this.dataIntervalMinutes * 60 * 1000
        )
        this.dashboardTimer = setInterval(
          this.readDashboard,
          this.dataIntervalMinutes * 60 * 1000
        )
      }
    },
    stopAllTimers() {
      this.stopTimer('hive')
      this.stopTimer('data')
    },
    stopTimer(timer) {
      if (timer === 'hive' && this.hiveTimer > 0) {
        clearInterval(this.hiveTimer)
        this.hiveTimer = 0
      } else if (timer === 'data' && this.dataTimer > 0) {
        clearInterval(this.dataTimer)
        clearInterval(this.dashboardTimer)
        this.dataTimer = 0
        this.dashboardTimer = 0
      }
    },
    toggleDarkMode(bool) {
      this.darkMode = bool
      this.$vuetify.theme.dark = bool
      localStorage.beepdashboardDarkMode = bool
      this.redrawCharts()
    },
    toggleHiveTimer(bool) {
      localStorage.beepdashboardHiveTimerPaused = bool
      this.hiveTimerPaused = bool
      if (this.hiveTimerPaused) {
        this.stopTimer('hive')
        if (this.selectedHiveDetails.sensors.length > 0) {
          this.startTimer('data') // if hive rotation is paused and current hive has device, check data every hour TODO check if this interval is ok?
        }
      } else {
        if (this.selectedHiveDetails.sensors.length > 0) {
          this.stopTimer('data')
        }
        this.nextHiveWithData()
        this.startTimer('hive')
      }
    },
    toggleShowControls() {
      this.showControls = !this.showControls
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-controls {
  height: 36px;
}

.dashboard-container {
  padding: 0px 10px 36px;

  @include for-tablet-landscape-up {
    max-width: 60% !important;
    padding: 50px 12px 72px;
  }

  &.--landscape {
    @include for-tablet-landscape-up {
      max-width: 100% !important;
      padding: 0 60px 52px;
    }
  }
}

.dashboard-logo {
  @include for-tablet-landscape-up {
    height: 68px;
    margin-top: -4px;
  }
}

.dashboard-row.--landscape {
  align-items: flex-start;
  .dashboard-header {
    margin-bottom: 10px !important;
  }
  .dashboard-logo {
    @include for-tablet-landscape-up {
      height: 52px;
      margin-top: -1px;
    }
  }
}

.dashboard-header {
  flex-direction: column;
  @include for-tablet-landscape-up {
    flex-direction: row;
  }
}

.dashboard-text {
  font-family: 'Roboto Condensed', 'Roboto', sans-serif !important;
  text-transform: uppercase;
  color: $color-accent;
  font-size: 1.9rem !important;
  font-weight: 400;
  line-height: 2.3rem;
  letter-spacing: 0.0075em !important;
  margin-bottom: 10px;
  text-align: center;

  @include for-phone-only {
    font-size: 1.5rem !important;
    line-height: 1.8rem;
    letter-spacing: 0.005em !important;
  }
}

.dashboard-text-small {
  font-family: 'Roboto Condensed', 'Roboto', sans-serif !important;
  text-transform: uppercase;
  text-align: left;
  font-weight: 500;
  // font-size: 0.8rem;
  @include for-tablet-landscape-up {
    font-size: 120%;
  }
  @include for-desktop-up {
    font-size: 100%;
  }
  @include for-big-desktop-up {
    font-size: 135%;
  }
  @include for-tv-up {
    font-size: 150%;
  }
  // @include for-tv-up {
  //   font-size: 1.5rem;
  // }
}

.landscape-section {
  padding: 20px;
  &.--left {
    margin-top: 30px;
    max-width: 80vw !important;
    height: 80vw !important;
    padding: 3vw; // 40px 60px;
    margin: 3vw auto;
    background-color: $color-orange-medium;
    // border-radius: 12px; // plain
    // border-radius: 96% 4% 92% 8% / 1% 92% 8% 99%; // left-tilted
    border-radius: 4% 96% 4% 96% / 97% 1% 99% 3%; // right-tilted
    @include for-tablet-portrait-up {
      max-width: 44vw !important;
      height: 55vw !important;
      padding: 2vw;
      margin: 0 0 0 3vw;
    }
    @include for-tablet-landscape-up {
      max-width: 40vw !important;
      height: 44vw !important;
      margin: 0;
    }
    @include for-desktop-up {
      max-width: 35vw !important;
      height: 36vw !important;
    }
    @include for-tv-up {
      max-width: 33vw !important;
      height: 33vw !important;
      padding: 2.5vw;
      margin-left: 40px;
    }
    &.sticky-dark-mode {
      background-color: #8e5000; // $color-accent;
      .dashboard-text,
      .dashboard-text-small {
        color: $color-white; // $color-grey-dark;
      }
    }
    .dashboard-section {
      margin-bottom: 6px;
      @include for-big-desktop-up {
        margin-bottom: 40px;
      }
    }
    .dashboard-sticky-row {
      margin-top: 2%;
    }
  }
  &.--right {
    max-width: 95vw !important;
    margin: 3vw auto;
    @include for-tablet-portrait-up {
      max-width: 44vw !important;
      margin: 0 0 0 2vw;
    }
    @include for-desktop-up {
      max-width: 50vw !important;
      margin: 0 0 0 6vw;
    }
  }
}

.map {
  display: flex;
  height: 330px;
  width: 330px;
  background: $color-primary;
  border: 4px solid $color-primary;
  &.--landscape,
  &.--portrait {
    height: 9vw;
    width: 9vw;
    min-height: 100px;
    min-width: 100px;
  }
  &.--loading {
    height: 1px;
    width: 1px;
  }
  &.--hide {
    display: none;
  }
}

.dashboard-inspection {
  text-align: left !important;
  @include for-tablet-landscape-up {
    width: 50%;
  }
  @include for-big-desktop-up {
    width: 40%;
  }
  &.--landscape {
    width: 100%;
    padding: 0 25px 0;
    @include for-desktop-up {
      padding: 0 35px 0;
    }
  }
}

.funky-border {
  padding: 12px 14px;
  background-color: $color-orange-medium;
  border-radius: 2% 98% 2% 98% / 98% 1% 99% 2%;
  &.dashboard-text-small {
    font-size: 110%;
  }
  &.sticky-dark-mode {
    background-color: #8e5000;
  }
}

.dashboard-loading {
  margin: 64px auto;

  &.--landscape {
    margin: 100px auto;
  }
}

// .chart-wrapper.--portrait {
//   display: block;
//   @include for-desktop-up {
//     display: flex;
//   }
// }

// .chart-left {
//   min-width: 100%;
//   @include for-desktop-up {
//     min-width: 70%;
//   }
// }

// .chart-right {
//   min-width: 100%;
//   @include for-desktop-up {
//     flex-direction: column !important;
//     min-width: 30%;
//   }
// }

.example-chart {
  max-width: 225px;
  @include for-phone-only {
    width: 165px;
  }
}

.example-img {
  height: 50px;
  width: 50px;
}

.hide-landscape {
  display: none; // instead of v-if="!landscapeMode" to initiate google map so that it can be rendered after switching to portait mode
}

.show-portrait {
  display: block;
}

.hives-wrapper {
  position: relative;
  top: -500px;
  margin-bottom: -500px;
  width: 100%;

  &::before {
    content: '';
    position: relative;
    height: 500px;
    top: 400px;
    z-index: 5;
    width: 100%;
  }

  &.--landscape {
    &::before {
      box-shadow: inset 0px 0px 22px 35px $color-orange-medium;
    }
    &.--dark::before {
      box-shadow: inset 0px 0px 22px 35px #8e5000; // $color-accent;
    }
  }

  &.--portrait {
    &::before {
      box-shadow: inset 0px 0px 35px 60px $color-white;
    }
    &.--dark::before {
      box-shadow: inset 0px 0px 35px 60px $color-black;
    }
  }
}
</style>
