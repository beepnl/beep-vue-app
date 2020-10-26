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
          last sensor values: batterij: {{ lastSensorValues.bv }}, luchtdruk:
          {{ lastSensorValues.p }}, luchtvochtigheid: {{ lastSensorValues.h }},
          temp in kast: {{ lastSensorValues.t_i }}, temperatuur:
          {{ lastSensorValues.t }}, zendruis: {{ lastSensorValues.snr }},
          zendsterkte: {{ lastSensorValues.rssi }}
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Layout, Treeselect },
  data() {
    return {
      selectedSensorId: 257,
      lastSensorValues: {},
      measurementData: {},
      interval: 'day',
      timeIndex: 0,
      timeGroup: 'day',
      timeZone: 'Europe/Amsterdam',
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
          data.series[0].push(measurement.t)
        })
      }
      return data
    },
    chartOptions() {
      const self = this
      return {
        fullWidth: true,

        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            if (index % 6 === 0) {
              // return value.charAt(11) + value.charAt(12)
              return self.momentFromISO8601(value)
            } else {
              return ''
            }
          },
        },
      }
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
    momentFromISO8601(date) {
      return this.$moment(date)
        .utc()
        .locale(this.$i18n.locale)
        .format('LT')
    },
  },
}
</script>

<style lang="scss">
.ct-grids {
  .ct-grid.ct-horizontal:not(:nth-child(6n + 1)) {
    stroke: none !important;
  }
}
.ct-series {
  .ct-point {
    stroke-width: 8px !important;
  }
}
.ct-labels {
  .ct-label.ct-horizontal.ct-end {
    font-size: 0.7rem !important;
  }
}
</style>
