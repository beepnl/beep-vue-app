<template>
  <Layout :no-box-shadow="true">
    <v-container>
      <v-row>
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
        <v-col cols="12">
          last sensor values:
          {{ lastSensorValues }}
        </v-col>
        <v-col cols="12">
          <chartist
            ratio="ct-chart"
            type="Line"
            :data="chartDataTemp"
            :options="chartOptions"
          >
          </chartist>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Layout, Treeselect },
  mixins: [momentMixin],
  data() {
    return {
      selectedSensorId: 257,
      lastSensorValues: {},
      measurementData: {},
      interval: 'day',
      timeIndex: 0,
      timeGroup: 'day',
      timeZone: 'Europe/Amsterdam',
      chartData: {
        labels: ['A', 'B', 'C'],
        series: [
          [1, 3, 2],
          [4, 6, 5],
        ],
      },
      chartOptions: {
        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.cardinal({
          fillHoles: true,
        }),
        axisX: {
          // type: this.$chartist.AutoScaleAxis,
          // type: this.$chartist.FixedScaleAxis,
          // divisor: 4,
          // ticks: [
          //   '2020-10-21T23:40:00Z',
          //   '2020-10-22T02:10:00Z',
          //   '2020-10-22T06:20:00Z',
          //   '2020-10-22T10:30:00Z',
          // ],
          showGrid: false,
          labelInterpolationFnc(value, index) {
            if (index % 8 === 0) {
              // const date = new Date(value)
              // return this.$moment(date).format('HH')
              return value.charAt(11) + value.charAt(12)
            } else {
              return ''
            }
          },
        },
        axisY: {
          offset: 19,
        },
      },
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    chartDataTemp() {
      var data = {
        labels: [],
        series: [[]],
      }
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement) => {
          data.labels.push(measurement.time)
          data.series[0].push(measurement.t_i)
        })
      }
      return data
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
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async sensorMeasurementRequest() {
      try {
        const response = await Api.readRequest(
          '/sensors/measurements?id=' +
            this.selectedSensorId +
            '&interval=' +
            this.interval +
            '&index=' +
            this.timeIndex +
            '&timeGroup=' +
            this.timeGroup +
            '&timezone=' +
            this.timeZone
        )
        console.log(response)
        this.measurementData = response.data
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
    loadData() {
      this.loadLastSensorValues()
      this.sensorMeasurementRequest()
      // this.loadRemoteSensorMeasurements(this.activePeriod, this.periodIndex, this.timeGroup, this.timeZone, id)
    },
    momentifyDayMonth(date) {
      const currentYear = new Date().getFullYear()
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
    },
  },
}
</script>
