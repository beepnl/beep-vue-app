<template>
  <v-container class="dashboard-container">
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

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Location', 1)"
        ></div>
        <div class="d-flex flex-column align-center mt-2">
          <div id="map" ref="map">
            <MapMarker :lat="lat" :lng="lng" />
          </div>
          <div
            v-if="ready"
            class="text-h4 color-accent overline roboto-condensed mt-1"
            v-text="selectedApiary.name"
          ></div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Colony', 2)"
        ></div>
        <div v-if="ready" class="d-flex flex-column align-center">
          <ApiaryPreviewHiveSelector
            :hives="selectedApiary.hives"
            :hives-selected="selectedHiveIds"
            :dashboard-mode="true"
            @select-hive="selectHive($event)"
          ></ApiaryPreviewHiveSelector>
          <div
            class="text-h4 color-accent overline roboto-condensed mt-2"
            v-text="selectedHive.name"
          ></div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Inspection', 1)"
        ></div>
        <div
          v-if="ready && selectedHive"
          class="dashboard-inspection rounded-border"
        >
          <v-row v-if="selectedHive.last_inspection_date">
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
              ><span v-text="$t('positive_impression') + ' : '"></span
            ></v-col>
            <v-col cols="7">
              <v-icon v-if="selectedHive.impression === 1" class="red--text">
                mdi-emoticon-sad
              </v-icon>
              <v-icon v-if="selectedHive.impression === 3" class="green--text">
                mdi-emoticon-happy
              </v-icon>
              <v-icon v-if="selectedHive.impression === 2" class="orange--text">
                mdi-emoticon-neutral
              </v-icon>
            </v-col>
          </v-row>
          <v-row v-if="selectedHive.notes">
            <v-col cols="5"><span v-text="$t('Note') + ' : '"></span></v-col>
            <v-col cols="7"><span v-text="selectedHive.notes"></span></v-col>
          </v-row>
        </div>
      </v-col>

      <v-col
        v-if="ready && selectedHive.sensors.length !== 0"
        class="dashboard-section"
        cols="12"
      >
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Measurement', 2)"
        ></div>
        <v-row>
          <v-col
            v-if="loadingData"
            class="d-flex align-center justify-center my-16"
            cols="12"
          >
            <v-progress-circular color="primary" size="50" indeterminate />
          </v-col>
          <v-col v-if="noChartData || !sensorsPresent" cols="12" class="my-4">
            {{ $t('no_chart_data_past_week') }}
          </v-col>
        </v-row>
        <template v-if="sensorsPresent">
          <v-col
            v-for="(sensorSet, index) in currentSensors"
            :key="'sensor' + index"
            cols="12"
          >
            <div
              v-if="measurementData !== null && sensorSet.values.length > 0"
              class="text-h6 overline roboto-condensed my-2"
              v-text="$t(sensorSet.name)"
            ></div>
            <div>
              <MeasurementsChartLine
                v-if="measurementData !== null"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import MapMarker from '@components/map-marker.vue'
import MeasurementsChartLine from '@components/measurements-chart-line.vue'
import { mapGetters } from 'vuex'
import { readApiariesAndGroups, readTaxonomy } from '@mixins/methodsMixin'
import { momentFromNow, timeZone } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
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
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    currentSensors() {
      return [
        { name: 'temperature', values: this.tempSensors },
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
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        fullscreenControl: false,
        zoom: 9,
      })
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
    getMap(callback) {
      const self = this
      function checkForMap() {
        if (self.ready && self.map) callback(self.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
    getSensorMeasurement(abbr) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : null
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
.dashboard-container {
  color: $color-grey-dark;
  margin-top: 20px;
  padding: 20px;

  @include for-tablet-landscape-up {
    margin-top: 60px;
    max-width: 60% !important;
    padding: 12px;
  }
}

.dashboard-header {
  flex-direction: column;
  @include for-tablet-landscape-up {
    flex-direction: row;
  }
}

.dashboard-logo {
  @include for-tablet-landscape-up {
    height: 68px;
    margin-top: -4px;
  }
}

.dashboard-section {
  text-align: center !important;
  margin-bottom: 20px;
  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }
}

.dashboard-section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    min-width: 18vw;
  }

  &::before {
    background: linear-gradient(to right, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to right, #fff, rgba(242, 145, 0, 0.7));
    margin-right: 12px;
    @include for-tablet-landscape-up {
      margin-right: 24px;
    }
  }

  &::after {
    background: linear-gradient(to left, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to left, #fff, rgba(242, 145, 0, 0.7));
    margin-left: 12px;
    @include for-tablet-landscape-up {
      margin-left: 24px;
    }
  }
}

#map {
  margin: 6px 0;
  height: 330px;
  width: 330px;
  background: $color-primary;
  border: 4px solid $color-primary;
}

.dashboard-inspection {
  text-align: left !important;
}
</style>
