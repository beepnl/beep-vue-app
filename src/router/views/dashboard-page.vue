<!-- eslint-disable vue/comma-dangle -->
<template>
  <v-theme-provider :theme="themeName">
    <div :class="darkMode ? 'dark-mode' : ''">
      <div
        class="d-flex justify-space-between align-center dashboard-controls my-2 mx-4"
      >
        <span
          v-if="showControls"
          :class="'font-small color-grey' + (!darkMode ? '-light' : '')"
          v-text="'v1.6'"
        ></span>
        <v-spacer />
        <div class="d-flex justify-end align-center">
          <div v-if="showControls" class="d-flex align-center">
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
                'mdi-phone-rotate-' +
                  (!landscapeMode ? 'landscape' : 'portrait')
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
            {{ showControls ? 'mdi-cog' : 'mdi-cog-outline' }}
          </v-icon>
        </div>
      </div>
      <v-container
        :class="'dashboard-container' + (landscapeMode ? ' --landscape' : '')"
      >
        <v-row class="dashboard-row">
          <v-col class="col-header" cols="12">
            <div class="dashboard-header d-flex align-center justify-center">
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
                  'dashboard-title --header font-weight-light overline' +
                    (!landscapeMode ? ' --portrait' : '')
                "
                v-text="
                  ready
                    ? dashboard.name
                      ? dashboard.name
                      : $tc('Dashboard', 1)
                    : ''
                "
              ></div>
            </div>
          </v-col>

          <v-col :class="'col-content' + (landscapeMode ? ' pa-0' : '')">
            <v-row :class="landscapeMode ? 'd-flex justify-space-between' : ''">
              <v-overlay
                :model-value="!ready"
                contained
                :scrim="darkMode ? 'black' : 'white'"
                z-index="3"
                class="d-flex align-center justify-center "
              >
                <div class="loading">
                  <v-progress-circular
                    color="primary"
                    size="50"
                    indeterminate
                  />
                </div>
              </v-overlay>

              <v-col
                :cols="landscapeMode ? '6' : '12'"
                :md="landscapeMode ? '5' : '12'"
                :class="
                  ready && landscapeMode ? 'landscape-section --left' : ''
                "
              >
                <DashboardSection
                  :class="landscapeMode ? 'hide-landscape' : 'show-portrait'"
                  :title="$tc('Location', 1)"
                >
                  <div
                    v-if="ready && selectedLocationName"
                    class="dashboard-title"
                    v-text="selectedLocationName"
                  ></div>
                  <div
                    id="map"
                    ref="mapP"
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
                        (landscapeMode ? '--landscape' : '--portrait')
                    "
                  >
                    <div
                      v-if="selectedHive"
                      class="dashboard-title line-clamp --1"
                      style="width: 86%"
                      v-text="selectedHiveMeta.name"
                    ></div>
                    <ApiaryPreviewHiveSelector
                      class="mb-2 mt-sm-6"
                      :hives="dashboardHives"
                      :hives-selected="selectedHiveIds"
                      :dashboard-mode="true"
                      :disable-sort-hives="true"
                      :size="whichSizeFits"
                      @select-hive="selectHive($event)"
                    ></ApiaryPreviewHiveSelector>
                  </div>
                </DashboardSection>

                <DashboardSection
                  v-if="
                    ready &&
                      selectedHive &&
                      (showInspections || selectedLocationName)
                  "
                  :title="$tc('Inspection', 1)"
                  :landscape-mode="landscapeMode"
                >
                  <div
                    v-if="!landscapeMode && showInspections"
                    style="width: 100%;"
                  >
                    <span
                      class="dashboard-title mb-2"
                      v-text="
                        $t('Last_check') +
                          ': ' +
                          momentFromNow(selectedHive.last_inspection_date)
                      "
                    ></span>
                  </div>
                  <div
                    :class="
                      'dashboard-inspection dashboard-text-small ' +
                        (landscapeMode
                          ? '--landscape'
                          : '--portrait round-border ma-6 mt-3 pa-6')
                    "
                  >
                    <v-row v-if="landscapeMode" class="dashboard-sticky-row">
                      <v-col
                        :cols="colsProp"
                        sm="5"
                        class="hive-prop i-col pa-3 pl-0"
                        ><span v-text="$tc('Location', 1) + ': '"></span
                      ></v-col>
                      <v-col :cols="colsValue" sm="7" class="i-col py-3 px-0">
                        <span
                          v-if="ready && selectedLocationName"
                          v-text="selectedLocationName"
                        ></span>
                        <div
                          id="map"
                          ref="mapL"
                          :class="
                            'mt-2 map ' +
                              (ready && coordinatesPresent
                                ? '--landscape'
                                : ready
                                ? '--hide'
                                : '--loading')
                          "
                        >
                        </div>
                      </v-col>
                      <v-col
                        v-if="showInspections"
                        :cols="colsProp"
                        sm="5"
                        class="hive-prop i-col pa-3 pl-0"
                        ><span v-text="$t('Last_check') + ': '"></span
                      ></v-col>
                      <v-col
                        v-if="showInspections"
                        :cols="colsValue"
                        sm="7"
                        class="i-col py-3 px-0"
                        ><span
                          v-text="
                            momentFromNow(selectedHive.last_inspection_date)
                          "
                        ></span
                      ></v-col>
                    </v-row>
                    <v-row
                      v-if="showInspections && selectedHive.impression"
                      :class="
                        'dashboard-sticky-row ' + (!landscapeMode ? 'pa-3' : '')
                      "
                    >
                      <v-col
                        :cols="colsProp"
                        sm="5"
                        class="hive-prop i-col pa-3 pl-0"
                        ><span v-text="$t('positive_impression') + ': '"></span
                      ></v-col>
                      <v-col :cols="colsValue" sm="7" class="i-col py-3 px-0">
                        <v-icon
                          v-if="selectedHive.impression === 1"
                          class="text-red"
                        >
                          mdi-emoticon-sad
                        </v-icon>
                        <v-icon
                          v-if="selectedHive.impression === 3"
                          class="text-green"
                        >
                          mdi-emoticon-happy
                        </v-icon>
                        <v-icon
                          v-if="selectedHive.impression === 2"
                          class="text-orange"
                        >
                          mdi-emoticon-neutral
                        </v-icon>
                      </v-col>
                    </v-row>
                    <v-row
                      v-if="showInspections && selectedHive.notes"
                      :class="
                        'dashboard-sticky-row ' + (!landscapeMode ? 'pa-3' : '')
                      "
                    >
                      <v-col
                        :cols="colsProp"
                        sm="5"
                        class="hive-prop i-col pa-3 pl-0"
                        ><span v-text="$t('Note') + ': '"></span
                      ></v-col>
                      <v-col :cols="colsValue" sm="7" class="i-col py-3 pl-0"
                        ><span
                          class="line-clamp --3"
                          v-text="selectedHive.notes"
                        ></span
                      ></v-col>
                    </v-row>
                  </div>
                </DashboardSection>
              </v-col>

              <v-col
                :cols="landscapeMode ? '6' : '12'"
                :md="landscapeMode ? '7' : '12'"
                :class="landscapeMode ? 'landscape-section --right' : ''"
              >
                <DashboardSection
                  v-if="
                    (ready &&
                      selectedHive &&
                      selectedHiveMeta.sensors &&
                      selectedHiveMeta.sensors.length !== 0) ||
                      showNoHivesWithDataPlaceholder
                  "
                  :title="$tc('Measurement', 2)"
                  :landscape-mode="landscapeMode"
                  :class="landscapeMode ? 'mb-0' : ''"
                >
                  <v-col
                    v-if="showNoHivesWithDataPlaceholder"
                    cols="12"
                    class="my-4"
                  >
                    {{ $t('no_hive_with_data') }}
                  </v-col>
                  <v-col
                    v-else-if="measurementData === null && loadingData"
                    :class="
                      'd-flex align-center justify-center dashboard-loading ' +
                        (landscapeMode ? '--landscape' : '')
                    "
                    cols="12"
                  >
                    <v-progress-circular
                      color="primary"
                      size="50"
                      indeterminate
                    />
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
                      v-if="
                        measurementData !== null &&
                          sensorSet.values.length > 0 &&
                          chartjsDataSeries(sensorSet.values).datasets.length >
                            0
                      "
                      :key="'sensor' + index"
                      cols="12"
                      :class="
                        'dashboard-chart' + (landscapeMode ? ' pa-0' : '')
                      "
                    >
                      <div
                        class="dashboard-title mb-1"
                        v-text="$t(sensorSet.name)"
                      ></div>
                      <div
                        :class="
                          'chart-wrapper ' +
                            (!landscapeMode ? '--portrait' : '')
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
                            'd-flex flex-wrap mx-sm-3 mt-2 ' +
                              (!landscapeMode ? 'chart-right' : '')
                          "
                        >
                          <template
                            v-for="(exampleChart, i) in sensorSet.examples"
                            :key="'ex-' + i"
                          >
                            <div
                              class="example-chart d-flex align-center my-2 mr-3 mr-sm-6"
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
                                class="dashboard-text-small --chart ml-1 ml-sm-2"
                                v-text="
                                  $t(
                                    sensorSet.name + '_example_chart_' + (i + 1)
                                  )
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
          </v-col>
        </v-row>
      </v-container>

      <Confirm ref="confirm"></Confirm>
    </div>
  </v-theme-provider>
</template>

<script>
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm-dialog.vue'
import DashboardSection from '@components/dashboard-section.vue'
import languages from '@assets/js/languages'
import LocaleChanger from '@components/locale-changer.vue'
import MeasurementsChartLine from '@components/measurements/measurements-chart-line.vue'
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
      languages: languages.languageArray,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      ready: false,
      map: null,
      marker: null,
      noChartData: false,
      loadingData: true,
      measurementData: null,
      tempSensors: [],
      weightSensors: [],
      sensorsPresent: false,
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      showControls: false,
      hiveTimer: 0,
      dataTimer: 0,
      dashboardTimer: 0,
      dataIntervalMinutes: 10,
      dashboardIntervalMinutes: 60,
      hiveTimerPaused: false,
      currentHiveIndex: -1,
      currentHiveWithDataIndex: -1,
      darkMode: true,
      themeName: 'beepDarkTheme',
      dashboardCode: null,
      selectedHiveId: null,
      showNoHivesWithDataPlaceholder: false,
    }
  },
  computed: {
    ...mapGetters('dashboard', ['dashboard', 'landscapeMode', 'selectedHive']),
    code() {
      return this.$route.params.id
    },
    colsProp() {
      return !this.landscapeMode && this.mobile ? 6 : 5
    },
    colsValue() {
      return !this.landscapeMode && this.mobile ? 6 : 7
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
      return this.$vuetify.display.width >= 1200
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
    whichSizeFits() {
      const largeHiveWidth = 90
      const mediumHiveWidth = 70
      const apiaryWidth = this.landscapeMode
        ? this.stickyWidth * 0.78
        : this.screenSize * (this.tabletLandscapeAndUp ? 0.5 : 0.9)
      const requiredWidthLarge = this.dashboardHives.length * largeHiveWidth
      const requiredWidthMedium = this.dashboardHives.length * mediumHiveWidth
      return this.screenSize >= 1630 && requiredWidthLarge <= apiaryWidth
        ? 'large'
        : requiredWidthMedium <= apiaryWidth
        ? 'medium'
        : null
    },
    lat() {
      return this.selectedHive !== null ? this.selectedHive.lat : null
    },
    lng() {
      return this.selectedHive !== null ? this.selectedHive.lon : null
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.display.xs
    },
    periodEndString() {
      return this.$moment(this.selectedHive.end).format(this.dateTimeFormat)
    },
    periodStartString() {
      return this.$moment(this.selectedHive.start).format(this.dateTimeFormat)
    },
    screenSize() {
      return this.$vuetify.display.width
    },
    selectedHiveMeta() {
      return this.dashboardHives.filter(
        (hive) => hive.id === this.selectedHiveId
      )[0]
    },
    selectedHiveIds() {
      return this.selectedHive ? [this.selectedHiveId] : []
    },
    selectedLocationName() {
      return this.selectedHive &&
        this.selectedHive &&
        this.selectedHive.location_name
        ? this.selectedHive.location_name
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
        this.selectedHive.last_inspection_date !== null
      )
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
    stickyWidth() {
      const perc = this.tvAndUp
        ? 0.33
        : this.desktopAndUp
        ? 0.38
        : this.tabletLandscapeAndUp
        ? 0.4
        : this.screenSize >= 600
        ? 0.44
        : 0.8
      return this.screenSize * perc
    },
    tabletLandscapeAndUp() {
      return this.$vuetify.display.width >= 960
    },
    tvAndUp() {
      return this.$vuetify.display.width >= 2200
    },
  },
  watch: {
    ready() {
      if (this.ready && this.coordinatesPresent) {
        setTimeout(() => {
          return this.initMap()
        }, 50)
      }
    },
    selectedLocationName() {
      if (this.ready && this.coordinatesPresent) {
        this.initMap()
      }
    },
    landscapeMode() {
      if (this.coordinatesPresent) {
        setTimeout(() => {
          return this.initMap()
        }, 50)
      }
    },
    desktopAndUp() {
      this.setLandscapeMode = this.desktopAndUp
    },
  },
  created() {
    if (!this.desktopAndUp) {
      this.setLandscapeMode = false
    }
    this.checkLocalStorage()

    this.readDashboard().then(() => {
      this.nextHiveWithData()
      this.startTimer('hive')
      this.startTimer('dashboard')
    })
  },
  beforeUnmount() {
    this.stopAllTimers()
  },
  methods: {
    chartjsDataSeries(quantities) {
      const data = {
        labels: [],
        datasets: [],
      }
      // var sensorArray = this.getMeasurementTypesPresent(chartGroup.id)
      quantities.map((quantity, index) => {
        const mT = this.getSensorMeasurement(quantity)

        if (mT.show_in_charts === 1) {
          const sensorName =
            quantity === 'temperature'
              ? this.$i18n.t('outsideTemperature')
              : this.measurementData.sensorDefinitions[quantity] &&
                this.measurementData.sensorDefinitions[quantity].name !== null
              ? this.measurementData.sensorDefinitions[quantity].name
              : this.$i18n.t(quantity)
          const sensorLabel =
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
            spanGaps:
              this.dashboard.interval === 'hour' ||
              this.dashboard.interval === 'day',
          })
        }

        return true
      })

      if (
        typeof this.measurementData.measurements !== 'undefined' &&
        this.measurementData.measurements.length > 0
      ) {
        this.measurementData.measurements.map((measurement, index) => {
          data.datasets.map((dataset, index) => {
            const quantity = dataset.abbr
            return dataset.data.push({
              x: measurement.time,
              y: measurement[quantity],
            })
          })
          return true
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
      }
      this.toggleDarkMode(this.darkMode)
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
        measurementData.measurements !== undefined &&
        measurementData.measurements.length > 0
      ) {
        this.measurementData = measurementData
        this.tempSensors = []
        this.weightSensors = []
        this.sensorsPresent = false
        this.noChartData = false
        Object.keys(this.measurementData.measurements[0]).map((quantity) => {
          if (this.DASHBOARD_TEMP_SENSORS.indexOf(quantity) > -1) {
            this.tempSensors.push(quantity)
            this.sensorsPresent = true
          } else if (this.DASHBOARD_WEIGHT_SENSORS.indexOf(quantity) > -1) {
            this.weightSensors.push(quantity)
            this.sensorsPresent = true
          }
          return true
        })
      } else {
        this.noChartData = true
        this.measurementData = null
      }
      this.loadingData = false
    },
    getSensorMeasurement(abbr) {
      const smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : {}
    },
    initMap() {
      const refMap = this.landscapeMode ? this.$refs.mapL : this.$refs.mapP
      // this.map = new window.google.maps.Map(refMap, {
      setTimeout(() => {
        this.map = new window.google.maps.Map(refMap, {
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
          cursor: 'grab',
        })
      }, 100)
    },
    nextHiveWithData() {
      // fallback if no hives with data present
      if (this.hivesWithData.length === 0) {
        this.showNoHivesWithDataPlaceholder = true
        this.selectHive(null)
      } else {
        this.showNoHivesWithDataPlaceholder = false
        this.currentHiveWithDataIndex += 1
        if (this.currentHiveWithDataIndex >= this.hivesWithData.length)
          this.currentHiveWithDataIndex = 0
        this.selectHive(this.hivesWithData[this.currentHiveWithDataIndex].id)
      }
    },
    selectHive(id) {
      // console.log('select hive', id)
      if (id) {
        this.readDashboardHive(id).then((data) => {
          this.selectedHiveId = id
          this.formatMeasurementData(data)
          this.ready = true
        })
      } else {
        this.ready = true
      }
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
        this.selectedHiveMeta.sensors.length !== 0
      ) {
        this.dataTimer = setInterval(
          this.readDashboardHive,
          this.dataIntervalMinutes * 60 * 1000
        )
      } else if (timer === 'dashboard') {
        this.dashboardTimer = setInterval(
          this.readDashboard,
          this.dashboardIntervalMinutes * 60 * 1000
        )
      }
    },
    stopAllTimers() {
      this.stopTimer('hive')
      this.stopTimer('data')
      this.stopTimer('dashboard')
    },
    stopTimer(timer) {
      if (timer === 'hive' && this.hiveTimer > 0) {
        clearInterval(this.hiveTimer)
        this.hiveTimer = 0
      } else if (timer === 'data' && this.dataTimer > 0) {
        clearInterval(this.dataTimer)
        this.dataTimer = 0
      } else if (timer === 'dashboard') {
        clearInterval(this.dashboardTimer)
        this.dashboardTimer = 0
      }
    },
    toggleDarkMode(bool) {
      this.darkMode = bool
      localStorage.beepdashboardDarkMode = bool
      this.themeName = bool ? 'beepDarkTheme' : 'beepLightTheme'
      this.$vuetify.theme.global.name = this.themeName
    },
    toggleHiveTimer(bool) {
      localStorage.beepdashboardHiveTimerPaused = bool
      this.hiveTimerPaused = bool
      if (this.hiveTimerPaused) {
        this.stopTimer('hive')
        if (this.selectedHiveMeta.sensors.length > 0) {
          this.startTimer('data') // if hive rotation is paused and current hive has device, check data every 10 minutes TODO check if this interval is ok?
        }
      } else {
        if (this.selectedHiveMeta.sensors.length > 0) {
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
  padding: 0px 10px 36px !important;

  @include for-tablet-landscape-up {
    max-width: 60% !important;
    padding: 50px 12px 72px !important;
  }

  &.--landscape {
    height: 95vh;
    display: flex;
    .dashboard-row {
      margin: auto;
      .col-header {
        height: 13vh;
      }
      .col-content {
        height: 75vh;
      }
    }
    @include for-tablet-landscape-up {
      max-width: 100% !important;
      padding: 0 6vw 0 !important;
    }
    @include for-tv-up {
      padding: 0 8vw 0 !important;
    }
  }
}

.dashboard-logo {
  @include for-tablet-landscape-up {
    height: 68px;
    margin-top: -4px;
  }
}

.dashboard-container.--landscape {
  .dashboard-header {
    margin-bottom: 12px !important;
    @include for-tablet-landscape-up {
      margin-bottom: 24px !important;
    }
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

.dashboard-title {
  font-family: 'Roboto Condensed', 'Roboto', sans-serif !important;
  text-transform: uppercase;
  color: $color-accent;
  font-size: 1.6rem !important;
  font-weight: 300;
  line-height: 2.3rem;
  letter-spacing: 0.0075em !important;
  margin-bottom: 10px;
  text-align: center;

  @include for-phone-only {
    font-size: 1.5rem !important;
    line-height: 1.8rem;
    letter-spacing: 0.005em !important;
  }
  @include for-tablet-landscape-up {
    font-size: 1.9rem !important;
  }

  &.--header {
    font-size: 45px !important;
    margin-bottom: 0;
    margin-top: 1px;
    line-height: 1.1;
    &.--portrait {
      font-size: 60px !important;
      margin-top: -3px;
    }
  }
}

.dashboard-text-small {
  font-family: 'Roboto Condensed', 'Roboto', sans-serif !important;
  // text-transform: uppercase;
  text-align: left;
  font-weight: 400;
  font-size: 0.8rem;
  color: $color-grey-dark;
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
  &.--chart {
    font-size: 0.8rem;
    @include for-tablet-landscape-up {
      font-size: 90%;
    }
    @include for-desktop-up {
      font-size: 15px;
    }
    @include for-big-desktop-up {
      font-size: 105%;
    }
    @include for-tv-up {
      font-size: 120%;
    }
  }
}

.landscape-section {
  padding: 20px;
  &.--left {
    margin-top: 30px;
    max-width: 80vw !important;
    // height: 80vw !important;
    padding: 3vw;
    margin: 3vw auto;
    background-color: $color-orange-medium;
    // border-radius: 96% 4% 92% 8% / 1% 92% 8% 99%; // left-tilted
    // border-radius: 4% 96% 4% 96% / 97% 1% 99% 3%; // right-tilted
    // border-radius: 1% 99% 2% 96% / 100% 1% 96% 3%; // latest
    border-radius: 24px;
    @include for-tablet-portrait-up {
      max-width: 44vw !important;
      // height: 55vw !important;
      padding: 4vh 2vw 2vh;
    }
    @include for-tablet-landscape-up {
      max-width: 40vw !important;
      // height: 44vw !important;
      margin: 0;
    }
    @include for-desktop-up {
      max-width: 38vw !important;
      // height: 36vw !important;
    }
    @include for-tv-up {
      max-width: 33vw !important;
      // height: 33vw !important;
      padding: 4.5vh 2.5vw 3.8vh;
    }
    .dashboard-section {
      margin-bottom: 12px;
      @include for-tablet-landscape-up {
        margin-bottom: 3vh;
      }
    }
    .dashboard-sticky-row {
      margin-top: 1vh;
    }
  }
  &.--right {
    max-width: 95vw !important;
    padding: 0; // 2vw 0 0;
    @include for-tablet-portrait-up {
      max-width: 44vw !important;
    }
    @include for-desktop-up {
      max-width: 50vw !important;
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
    width: 60%;
  }
  @include for-big-desktop-up {
    width: 50%;
  }
  &.--landscape {
    width: 100%;
    // padding: 0 25px 0;
    // @include for-desktop-up {
    //   padding: 0 35px 0;
    // }
  }
}

.round-border {
  padding: 12px 14px;
  background-color: $color-orange-medium;
  // border-radius: 2% 98% 2% 98% / 98% 1% 99% 2%;
  border-radius: 24px;
  &.dashboard-text-small {
    font-size: 110%;
  }
}

.hive-prop {
  text-align: right;
}

.i-col {
  min-width: 120px;
}

.dashboard-loading {
  margin: 64px auto;

  &.--landscape {
    margin: -100px auto 100px;
  }
}

.dashboard-chart:first-child {
  margin-bottom: 3vh !important;
}

.example-chart {
  width: calc(25% - 24px);
  min-width: 148px;
  // max-width: 225px;
  // @include for-phone-only {
  //   width: 165px;
  // }
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
    pointer-events: none; // enable clicking hives with lower z-index
  }

  &.--landscape {
    &::before {
      box-shadow: inset 0px 0px 22px 35px $color-orange-medium;
    }
  }

  &.--portrait {
    &::before {
      box-shadow: inset 0px 0px 35px 60px $color-white;
    }
  }
}

.dark-mode {
  .dashboard-title,
  .dashboard-text-small {
    color: $color-white;
    &.--chart {
      color: $color-off-white;
    }
  }

  .landscape-section.--left,
  .round-border {
    background-color: #8e5000; // $color-accent;
  }

  .hives-wrapper {
    &.--landscape {
      &::before {
        box-shadow: inset 0px 0px 22px 35px #8e5000; // $color-accent;
      }
    }

    &.--portrait {
      &::before {
        box-shadow: inset 0px 0px 35px 60px #121212;
      }
    }
  }
}
</style>
