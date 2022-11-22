<template>
  <div>
    <div class="d-flex justify-end dashboard-controls my-2 mx-4">
      <div v-if="showControls" class="d-flex">
        <LocaleChanger></LocaleChanger>
        <v-icon
          class="color-grey-filter ml-2 mr-4"
          @click="landscapeMode = !landscapeMode"
        >
          {{
            'mdi-phone-rotate-' + (!landscapeMode ? 'landscape' : 'portrait')
          }}
        </v-icon>
      </div>
      <v-icon
        :class="showControls ? 'color-grey-filter' : 'color-grey-light'"
        @click="showControls = !showControls"
      >
        {{ showControls ? 'mdi-cog' : 'mdi-cog-off' }}
      </v-icon>
    </div>
    <v-container
      :class="'dashboard-container' + (landscapeMode ? ' --landscape' : '')"
    >
      <v-row>
        <v-col cols="12" class="mb-6">
          <div class="d-flex justify-center align-center dashboard-header">
            <div class="d-flex align-self-center"
              ><img
                class="dashboard-logo"
                :src="assetsUrl + '/img/beep-icon-logo.svg'"
              />
            </div>

            <div
              class="text-h3 text-md-h2 dashboard-title overline roboto-condensed"
              v-text="$t('Dashboard')"
            ></div>
          </div>
        </v-col>

        <v-col
          :cols="landscapeMode ? '4' : '12'"
          :class="landscapeMode ? 'background-section' : ''"
        >
          <DashboardSection
            :class="landscapeMode ? 'hide-landscape' : 'show-portrait'"
            :title="$tc('Location', 1)"
          >
            <div
              v-if="ready"
              class="dashboard-text"
              v-text="selectedApiary.name"
            ></div>
            <div id="map" ref="map">
              <MapMarker :lat="lat" :lng="lng" />
            </div>
          </DashboardSection>

          <DashboardSection
            v-if="ready"
            :title="$tc('Colony', 2)"
            :landscape-mode="landscapeMode"
          >
            <div class="d-flex flex-column align-center">
              <div class="dashboard-text" v-text="selectedHive.name"></div>
              <ApiaryPreviewHiveSelector
                :hives="selectedApiary.hives"
                :hives-selected="selectedHiveIds"
                :dashboard-mode="true"
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
                class="dashboard-text"
                v-text="
                  $t('Last_check') +
                    ': ' +
                    momentFromNow(selectedHive.last_inspection_date)
                "
              ></span>
            </div>
            <div
              :class="
                'dashboard-inspection mt-1 ' +
                  (landscapeMode ? '--landscape' : 'rounded-border')
              "
            >
              <v-row v-if="landscapeMode">
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

        <v-col :cols="landscapeMode ? '8' : '12'">
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
                <div>
                  <MeasurementsChartLine
                    :chart-data="chartjsDataSeries(sensorSet.values)"
                    :interval="'week'"
                    :start-time="periodStartString"
                    :end-time="periodEndString"
                    :chart-id="'chart-dashboard-' + index"
                  >
                  </MeasurementsChartLine>
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
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    currentSensors() {
      return [
        { name: 't', values: this.tempSensors },
        { name: 'weight', values: this.weightSensors },
      ]
    },
    selectedApiary() {
      return this.apiaries.length > 0 ? this.apiaries[0] : null
    },
    lat() {
      return this.selectedApiary !== null
        ? this.selectedApiary.coordinate_lat
        : -25.344
    },
    lng() {
      return this.selectedApiary !== null
        ? this.selectedApiary.coordinate_lon
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
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    selectedApiary() {
      this.initMap()
    },
  },
  created() {
    this.readTaxonomy().then(() => {
      this.readApiariesAndGroups().then(() => {
        this.selectedHive = this.selectedApiary.hives[0]
        this.sensorMeasurementRequest().then(() => {
          this.ready = true
        })
      })
    })
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
              quantity === 'temperature' ? '#242424' : '#' + mT.hex_color,
            backgroundColor:
              quantity === 'temperature' ? '#242424' : '#' + mT.hex_color,
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
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        fullscreenControl: false,
        zoom: 9,
      })
    },
    selectHive(id) {
      this.selectedHive = this.selectedApiary.hives.filter(
        (hive) => hive.id === id
      )[0]
      this.sensorMeasurementRequest()
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-controls {
  height: 36px;
}

.dashboard-container {
  color: $color-grey-dark;
  padding: 0px 10px 36px;

  @include for-tablet-landscape-up {
    max-width: 60% !important;
    padding: 50px 12px 72px;
  }

  &.--landscape {
    @include for-tablet-landscape-up {
      max-width: 100% !important;
      padding: 30px 60px 52px;
    }
  }
}

.background-section {
  background-color: $color-orange-medium;
  border-radius: 8px;
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

.dashboard-logo {
  @include for-tablet-landscape-up {
    height: 68px;
    margin-top: -4px;
  }
}

#map {
  height: 330px;
  width: 330px;
  background: $color-primary;
  border: 4px solid $color-primary;
}

.dashboard-inspection {
  text-align: left !important;
  &.--landscape {
    padding: 0 10%;
  }
}

.dashboard-loading {
  margin: 64px auto;

  &.--landscape {
    margin: 100px auto;
  }
}

.hide-landscape {
  display: none; // instead of v-if="!landscapeMode" to initiate google map so that it can be rendered after switching to portait mode
}

.show-portrait {
  display: block;
}
</style>
