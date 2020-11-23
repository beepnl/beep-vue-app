<template>
  <Layout :title="`${$t('Data_export')}`">
    <v-container v-if="ready">
      <div class="overline mt-3 mb-2" v-text="$t('Data_export')"></div>
      <div class="rounded-border">
        <v-row>
          <v-col cols="12">
            <p v-text="$t('Export_your_data')"></p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-space-between" cols="12">
            <v-spacer></v-spacer>
            <v-btn
              tile
              outlined
              color="primary"
              class="save-button"
              @click="exportData"
            >
              <v-progress-circular
                v-if="showLoadingIcon"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="primary"
                indeterminate
              />
              <v-icon v-if="!showLoadingIcon" left>mdi-export-variant</v-icon
              >{{ $t('Data_export') }}</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <v-row v-if="errorMessage">
        <v-col cols="12">
          <v-alert text prominent dense type="error" color="red">
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/back.vue'
// import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    Layout,
    // Treeselect,
  },
  mixins: [sensorMixin],
  data() {
    return {
      // lastSensorDate: null,
      // measurementData: {},
      devices: [],
      errorMessage: null,
      // interval: 'day',
      // timeIndex: 0,
      // moduloNumber: 6,
      // periodTitle: '',
      // timeFormat: 'ddd D MMM YYYY',
      // currentWeatherSensors: {},
      // currentSensors: [],
      // currentSoundSensors: {},
      // currentDebugSensors: [],
      // weatherSensorsPresent: false,
      // sensorsPresent: false,
      // soundSensorsPresent: false,
      // debugSensorsPresent: false,
      // noChartData: false,
      // currentLastSensorValues: [],
      // showMeasurements: true,
      // showLastSensorValues: true,
      showLoadingIcon: false,
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
      .then(() => {
        this.setInitialDeviceId()
      })
      // .then(() => {
      //   this.loadData()
      // })
      .then(() => {
        this.ready = true
      })
  },
  methods: {
    async exportData() {
      this.showLoadingIcon = true
      try {
        const response = await Api.readRequest('/export')
        this.showLoadingIcon = false
        return response
      } catch (error) {
        console.log('Error: ', error)
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
    setInitialDeviceId() {
      if (this.$route.name === 'measurements-id') {
        this.selectedDeviceId = parseInt(this.$route.params.id)
      } else if (this.selectedDeviceId === null) {
        this.selectedDeviceId = this.devices[0].id
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
