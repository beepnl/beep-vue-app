<template>
  <div>
    <div class="d-flex justify-end dashboard-controls my-2 mx-4">
      <div v-if="showControls" class="d-flex">
        <LocaleChanger></LocaleChanger>
        <v-icon
          class="color-grey-filter ml-2 mr-4"
          @click="toggleDarkMode(darkMode)"
        >
          mdi-theme-light-dark
        </v-icon>
        <v-icon class="color-grey-filter mr-4" @click="toggleLandscapeMode">
          {{
            'mdi-phone-rotate-' + (!landscapeMode ? 'landscape' : 'portrait')
          }}
        </v-icon>
        <v-icon class="color-grey-filter mr-4" @click="toggleHiveTimer">
          {{ 'mdi-' + (hiveTimerPaused ? 'play' : 'pause') }}
        </v-icon>
      </div>
      <v-icon class="color-grey-filter" @click="showControls = !showControls">
        {{ showControls ? 'mdi-cog' : 'mdi-cog-off' }}
      </v-icon>
    </div>
    <v-container
      :class="'dashboard-container' + (landscapeMode ? ' --landscape' : '')"
    >
      <v-row :class="'dashboard-row' + (landscapeMode ? ' --landscape' : '')">
        <v-col cols="12">
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
                    '/img/beep-icon-logo' +
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
              v-text="$t('Dashboard')"
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
          :cols="landscapeMode ? '4' : '12'"
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
              v-if="ready"
              class="dashboard-text"
              v-text="selectedLocation.name"
            ></div>
            <div id="map" ref="map" class="map">
              <MapMarker :lat="lat" :lng="lng" />
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
              <div class="dashboard-text" v-text="selectedHive.name"></div>
              <ApiaryPreviewHiveSelector
                class="mb-2"
                :hives="selectedGroup.hives"
                :hives-selected="selectedHiveIds"
                :dashboard-mode="true"
                :large-size="
                  !smallScreen && (!landscapeMode || sortedHives.length < 7)
                "
                @select-hive="selectHive($event)"
              ></ApiaryPreviewHiveSelector>
            </div>
          </DashboardSection>

          <DashboardSection
            v-if="ready && selectedHive && selectedHive.last_inspection_date"
            :title="$tc('Inspection', 1)"
            :landscape-mode="landscapeMode"
          >
            <div v-if="!landscapeMode" style="width: 100%;">
              <span
                class="dashboard-text mb-2"
                v-text="
                  $t('Last_check') +
                    ': ' +
                    momentFromNow(selectedHive.last_inspection_date)
                "
              ></span>
            </div>
            <div
              :class="
                'dashboard-inspection dashboard-text-small mt-2 mx-3 ' +
                  (landscapeMode ? '--landscape' : 'funky-border') +
                  (darkMode ? ' sticky-dark-mode' : '')
              "
            >
              <v-row v-if="landscapeMode">
                <v-col cols="5"
                  ><span v-text="$tc('Location', 1) + ' : '"></span
                ></v-col>
                <v-col cols="7">
                  <div id="map" ref="map" class="map --landscape">
                    <MapMarker :lat="lat" :lng="lng" />
                  </div>
                </v-col>
                <v-col cols="5"
                  ><span v-text="$t('Last_check') + ' : '"></span
                ></v-col>
                <v-col cols="7"
                  ><span
                    v-text="momentFromNow(selectedHive.last_inspection_date)"
                  ></span
                ></v-col>
              </v-row>
              <v-row v-if="selectedHive.impression">
                <v-col cols="5"
                  ><span v-text="$t('positive_impression') + ': '"></span
                ></v-col>
                <v-col cols="7">
                  <v-icon
                    v-if="selectedHive.impression === 1"
                    class="red--text"
                  >
                    mdi-emoticon-sad
                  </v-icon>
                  <v-icon
                    v-if="selectedHive.impression === 3"
                    class="green--text"
                  >
                    mdi-emoticon-happy
                  </v-icon>
                  <v-icon
                    v-if="selectedHive.impression === 2"
                    class="orange--text"
                  >
                    mdi-emoticon-neutral
                  </v-icon>
                </v-col>
              </v-row>
              <v-row v-if="selectedHive.notes">
                <v-col cols="5"><span v-text="$t('Note') + ': '"></span></v-col>
                <v-col cols="7"
                  ><span v-text="selectedHive.notes"></span
                ></v-col>
              </v-row>
            </div>
          </DashboardSection>
        </v-col>

        <v-col
          :cols="landscapeMode ? '8' : '12'"
          :class="landscapeMode ? 'landscape-section --right' : ''"
        >
          <DashboardSection
            v-if="ready && selectedHive && selectedHive.sensors.length !== 0"
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
            <v-col v-if="noChartData || !sensorsPresent" cols="12" class="my-4">
              {{ $t('no_chart_data_past_week') }}
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
                              '/img/chart_' +
                              sensorSet.name +
                              '_' +
                              (i + 1) +
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
  </div>
</template>

<script>
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import DashboardSection from '@components/dashboard-section.vue'
import LocaleChanger from '@components/locale-changer.vue'
import MapMarker from '@components/map-marker.vue'
import MeasurementsChartLine from '@components/measurements-chart-line.vue'
import { mapGetters } from 'vuex'
import { readApiariesAndGroups, readTaxonomy } from '@mixins/methodsMixin'
import { momentFromNow, timeZone } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    DashboardSection,
    LocaleChanger,
    MapMarker,
    MeasurementsChartLine,
  },
  mixins: [
    momentFromNow,
    readApiariesAndGroups,
    readTaxonomy,
    sensorMixin,
    timeZone,
  ],
  data: function() {
    return {
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      ready: false,
      map: null,
      selectedHive: null,
      noChartData: false,
      loadingData: true,
      measurementData: {},
      tempSensors: [],
      weightSensors: [],
      sensorsPresent: false,
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      showControls: false,
      landscapeMode: true,
      hiveTimer: 0,
      hiveIntervalMinutes: 0.5,
      dataTimer: 0,
      dataIntervalMinutes: 60,
      hiveTimerPaused: false,
      currentHiveIndex: -1,
      currentHiveWithDataIndex: -1,
      darkMode: true,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    currentSensors() {
      return [
        { name: 't', values: this.tempSensors, examples: 2 },
        { name: 'weight', values: this.weightSensors, examples: 4 },
      ]
    },
    selectedGroup() {
      return this.groups.length > 0 ? this.groups[7] : null // TODO: replace dummy data
    },
    selectedLocation() {
      if (this.selectedHive) {
        var findApiary = this.apiaries.filter(
          (apiary) => apiary.id === this.selectedHive.location_id
        )
        return findApiary.length > 0 ? findApiary[0] : null
      } else {
        return null
      }
    },
    sortedHives() {
      if (this.selectedGroup) {
        const sortedHives = this.selectedGroup.hives
          .slice()
          .sort(function(a, b) {
            // order = null comes last
            // if order is equal, sort by name with number sensitivity (10 comes after 2 instead of 1)
            return (
              (a.order === null) - (b.order === null) ||
              +(a.order > b.order) ||
              -(a.order < b.order) ||
              (a.order === b.order && a.name !== null && b.name !== null
                ? a.name.localeCompare(b.name, undefined, {
                    numeric: true,
                    sensitivity: 'base',
                  })
                : 0)
            )
          })
        return sortedHives
      } else {
        return []
      }
    },
    sortedHivesWithData() {
      return this.sortedHives.filter((hive) => hive.sensors.length > 0)
    },
    lat() {
      return this.selectedLocation !== null
        ? this.selectedLocation.coordinate_lat
        : -25.344
    },
    lng() {
      return this.selectedLocation !== null
        ? this.selectedLocation.coordinate_lon
        : 131.036
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
    selectedHiveIds() {
      return this.selectedHive ? [this.selectedHive.id] : []
    },
    smallScreen() {
      return this.$vuetify.breakpoint.width < 960
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    ready() {
      if (this.ready && this.selectedLocation) {
        this.initMap()
      }
    },
    selectedLocation() {
      this.initMap()
    },
  },
  mounted() {
    if (localStorage.beepdashboardDarkMode) {
      this.darkMode = localStorage.beepdashboardDarkMode === 'true'
      this.$vuetify.theme.dark = this.darkMode
    }
  },
  created() {
    if (this.smallScreen) {
      this.landscapeMode = false
    }
    this.readTaxonomy().then(() => {
      this.readApiariesAndGroups().then(() => {
        this.nextHiveWithData()
        this.startTimer('hive')
      })
    })
  },
  beforeDestroy() {
    this.stopAllTimers()
  },
  methods: {
    async sensorMeasurementRequest() {
      this.noChartData = false
      this.loadingData = true
      this.measurementData = null // needed to let chartjs redraw charts after interval switch
      try {
        const response = await Api.readRequest(
          '/sensors/measurements?id=' +
            this.selectedHive.sensors[0] +
            '&interval=week&index=0&timeGroup=week&timezone=' +
            this.timeZone +
            '&relative_interval=1'
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
        } else {
          console.log('Error: ', error)
        }
      }
    },
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
        })
      }, 100)
    },
    nextHiveWithData() {
      // fallback if no hives with data present
      if (this.sortedHivesWithData.length === 0) {
        this.selectHive(this.sortedHives[this.currentHiveIndex + 1].id)
      } else {
        this.currentHiveWithDataIndex += 1
        if (this.currentHiveWithDataIndex >= this.sortedHivesWithData.length)
          this.currentHiveWithDataIndex = 0
        this.selectHive(
          this.sortedHivesWithData[this.currentHiveWithDataIndex].id
        )
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
      this.currentHiveIndex = this.sortedHives.findIndex(
        (hive) => hive.id === id
      )
      this.selectedHive = this.sortedHives[this.currentHiveIndex]
      this.sensorMeasurementRequest().then(() => {
        this.ready = true
      })
    },
    startTimer(timer) {
      this.stopTimer(timer)
      // only start status timer if sensor has status and research is active, otherwise no need to keep updating status
      if (timer === 'hive' && !this.hiveTimerPaused) {
        this.hiveTimer = setInterval(
          this.nextHiveWithData,
          this.hiveIntervalMinutes * 60 * 1000
        )
      } else if (
        timer === 'data' &&
        this.selectedHive &&
        this.selectedHive.sensors.length !== 0
      ) {
        this.dataTimer = setInterval(
          this.sensorMeasurementRequest,
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
        this.dataTimer = 0
      }
    },
    toggleDarkMode(darkMode) {
      this.darkMode = !darkMode
      this.$vuetify.theme.dark = !darkMode
      localStorage.beepdashboardDarkMode = !darkMode
      this.redrawCharts()
    },
    toggleHiveTimer() {
      this.hiveTimerPaused = !this.hiveTimerPaused
      if (this.hiveTimerPaused) {
        this.stopTimer('hive')
        if (this.selectedHive.sensors.length > 0) {
          this.startTimer('data') // if hive rotation is paused and current hive has device, check data every hour
        }
      } else {
        if (this.selectedHive.sensors.length > 0) {
          this.stopTimer('data')
        }
        this.nextHiveWithData()
        this.startTimer('hive')
      }
    },
    toggleLandscapeMode() {
      this.landscapeMode = !this.landscapeMode
      this.initMap()
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
  font-size: 1rem;
  @include for-phone-only {
    font-size: 0.85rem;
  }
}

.landscape-section {
  padding: 20px;
  &.--left {
    margin-top: 30px;
    max-width: 35vw !important;
    height: 35vw !important;
    background-color: $color-orange-medium;
    // border-radius: 12px; // plain
    // border-radius: 96% 4% 92% 8% / 1% 92% 8% 99%; // left-tilted
    border-radius: 4% 96% 4% 96% / 97% 1% 99% 3%; // right-tilted
    @include for-tablet-landscape-up {
      padding: 2vw 3vw; // 40px 60px;
    }
    &.sticky-dark-mode {
      background-color: $color-accent;
      .dashboard-text,
      .dashboard-text-small {
        color: $color-grey-dark;
      }
    }
  }
  &.--right {
    max-width: 50vw !important;
    margin-left: 7vw;
  }
}

.map {
  height: 330px;
  width: 330px;
  background: $color-primary;
  border: 4px solid $color-primary;
  &.--landscape {
    height: 10vw;
    width: 10vw;
  }
}

.dashboard-inspection {
  text-align: left !important;
  @include for-tablet-landscape-up {
    width: 40%;
  }
  &.--landscape {
    width: 100%;
    padding: 0 35px 0;
  }
}

.funky-border {
  padding: 12px 14px;
  background-color: $color-grey-lightest;
  border-radius: 2% 98% 2% 98% / 98% 1% 99% 2%;

  &.sticky-dark-mode {
    background-color: $color-accent;
    color: $color-grey-dark;
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
  top: -400px;
  margin-bottom: -400px;

  &::before {
    content: '';
    position: relative;
    height: 400px;
    top: 350px;
    z-index: 999;
  }

  &.--landscape::before {
    width: calc(100% - 200px);
    box-shadow: inset 0px 0px 25px 30px #f29100;
  }

  &.--portrait::before {
    width: 100%;
    box-shadow: inset 0px 0px 25px 30px $color-black;
  }
}
</style>
