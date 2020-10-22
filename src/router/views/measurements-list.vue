<template>
  <Layout :no-box-shadow="true">
    <v-container>
      <v-row>
        <v-col sm="auto" :cols="12">
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
        <v-col sm="auto" :cols="12">
          last sensor values:
          {{ lastSensorValues }}
        </v-col>
        <hr />
        <v-col sm="auto" :cols="12">
          measurement data:
          {{ measurementData }}
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
  },
}
</script>
