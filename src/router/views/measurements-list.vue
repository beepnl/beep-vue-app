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
          <div
            class="overline mb-3 text-center"
            v-text="$t('last_measurement')"
          ></div>
          batterij: {{ lastSensorValues.bv }}, luchtdruk:
          {{ lastSensorValues.p }}, luchtvochtigheid: {{ lastSensorValues.h }},
          temp in kast: {{ lastSensorValues.t_i }}, temperatuur:
          {{ lastSensorValues.t }}, zendruis: {{ lastSensorValues.snr }},
          zendsterkte: {{ lastSensorValues.rssi }}
        </v-col>
        <v-col cols="12">
          <div class="overline mb-3 text-center" v-text="$t('sensor')"></div>
          <chartist
            :class="interval"
            ratio="ct-chart"
            type="Line"
            :data="chartDataSingleSeries('temperature', 't', '°C')"
            :options="chartOptions('°C')"
          >
          </chartist>

          <chartist
            :class="`${interval} mt-4`"
            ratio="ct-chart ct-series-b"
            type="Line"
            :data="chartDataSingleSeries('humidity', 'h', '%RH')"
            :options="chartOptions('%RH')"
          >
          </chartist>

          <chartist
            :class="`${interval} mt-4`"
            ratio="ct-chart ct-series-c"
            type="Line"
            :data="chartDataSingleSeries('air_pressure', 'p', 'mbar')"
            :options="chartOptions('mbar')"
          >
          </chartist>

          <chartist
            :class="`${interval} mt-4`"
            ratio="ct-chart ct-series-d"
            type="Line"
            :data="chartDataSingleSeries('t_i', 't_i', '°C')"
            :options="chartOptions('°C')"
          >
          </chartist>

          <chartist
            :class="`${interval} mt-4`"
            ratio="ct-chart ct-series-e"
            type="Line"
            :data="chartDataSingleSeries('weight', 'weight_kg', 'kg')"
            :options="chartOptions('kg')"
          >
          </chartist>

          <div
            class="overline mt-4 mb-3 text-center"
            v-text="$t('Sound_measurements')"
          ></div>
          <chartist
            :class="interval"
            ratio="ct-chart"
            type="Line"
            :data="chartDataSound"
            :options="chartOptions('')"
          >
          </chartist>

          <div
            class="overline mt-4 mb-3 text-center"
            v-text="$t('Sensor_info')"
          ></div>
          <chartist
            :class="interval"
            ratio="ct-chart ct-series-battery"
            type="Line"
            :data="chartDataSensorInfo"
            :options="chartOptions('V', true)"
          >
          </chartist>
          <chartist
            :class="interval"
            ratio="ct-chart ct-series-rssi"
            type="Line"
            :data="chartDataSingleSeries('rssi', 'rssi', 'dBm')"
            :options="chartOptionsRssi"
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
import 'chartist/dist/chartist.min.css'

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
      moduloNumber: 6,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    chartDataSensorInfo() {
      // TODO: enable dual / composite / compound y-axis
      var data = {
        labels: [],
        series: [
          { name: this.$i18n.t('bv') + ' (V)', data: [] },
          // { name: this.$i18n.t('rssi'), data: [] },
          { name: this.$i18n.t('snr') + ' (dB)', data: [] },
        ],
      }
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement) => {
          data.labels.push(measurement.time)
          data.series[0].data.push(measurement.bv)
          // data.series[1].data.push(measurement.rssi)
          data.series[1].data.push(measurement.snr)
        })
      }
      return data
    },
    chartDataSound() {
      var data = {
        labels: [],
        series: [
          { name: '071-122Hz', data: [] },
          { name: '122-173Hz', data: [] },
          { name: '173-224Hz', data: [] },
          { name: '224-276Hz', data: [] },
          { name: '276-327Hz', data: [] },
          { name: '327-378Hz', data: [] },
          { name: '378-429Hz', data: [] },
          { name: '429-480Hz', data: [] },
          { name: '480-532Hz', data: [] },
          { name: '532-583Hz', data: [] },
        ],
      }
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement) => {
          data.labels.push(measurement.time)
          data.series[0].data.push(measurement.s_bin_71_122)
          data.series[1].data.push(measurement.s_bin_122_173)
          data.series[2].data.push(measurement.s_bin_173_224)
          data.series[3].data.push(measurement.s_bin_224_276)
          data.series[4].data.push(measurement.s_bin_276_327)
          data.series[5].data.push(measurement.s_bin_327_378)
          data.series[6].data.push(measurement.s_bin_378_429)
          data.series[7].data.push(measurement.s_bin_429_480)
          data.series[8].data.push(measurement.s_bin_480_532)
          data.series[9].data.push(measurement.s_bin_532_583)
        })
      }
      return data
    },
    chartOptionsRssi() {
      return {
        fullWidth: true,
        height: '220px',
        chartPadding: {
          left: 50,
          right: -25,
        },
        plugins: [
          this.$chartist.plugins.legend({
            clickable: true, // Doesn't work yet with single series data
          }),
          this.$chartist.plugins.ctPointLabels({
            labelOffset: {
              x: 7,
              y: 0,
            },
            textAnchor: 'start',
            labelInterpolationFnc(value) {
              if (typeof value !== 'undefined') {
                return value
              } else {
                return '-'
              }
            },
          }),
        ],
        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: false,
        },
        axisY: {
          // On the y-axis start means left and end means right
          position: 'end',
        },
      }
    },
    // moduloNumber() {
    //   if (this.interval === 'day') {
    //     return 6
    //   }
    //   return 1
    // },
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
        // console.log(response)
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
    chartDataSingleSeries(legend, variable, unit) {
      var data = {
        labels: [],
        series: [
          {
            name: this.$i18n.t(legend) + ' (' + unit + ')',
            data: [],
          },
        ],
      }
      if (typeof this.measurementData.measurements !== 'undefined') {
        this.measurementData.measurements.map((measurement) => {
          data.labels.push(measurement.time)
          data.series[0].data.push(measurement[variable])
        })
      }
      return data
    },
    chartOptions(unit, battery = false) {
      const self = this
      return {
        fullWidth: true,
        height: '220px',
        plugins: [
          this.$chartist.plugins.legend(),
          this.$chartist.plugins.ctPointLabels({
            labelOffset: {
              x: 7,
              y: 0,
            },
            textAnchor: 'start',
            labelInterpolationFnc(value) {
              if (battery) {
                return value
              } else if (typeof value !== 'undefined' && !battery) {
                return value + ' ' + unit
              } else {
                return '-'
              }
            },
          }),
        ],
        showPoint: true,
        lineSmooth: this.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            if (index % self.moduloNumber === 0) {
              return self.momentFromISO8601(value)
            } else {
              return ''
            }
          },
        },
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
svg.ct-chart-bar,
svg.ct-chart-line {
  overflow: visible;
}
.ct-label.ct-label.ct-horizontal.ct-end {
  position: relative;
  justify-content: flex-end;
  text-align: right;
  white-space: nowrap;
  transform: translate(-100%) rotate(-45deg);
  transform-origin: 100% 0;
}

.ct-chart {
  &.day {
    .ct-grids {
      .ct-grid.ct-horizontal:not(:nth-child(6n + 1)) {
        stroke: none !important;
      }
    }
  }
}

.ct-series {
  .ct-point {
    stroke-width: 8px !important;
    @include for-phone-only {
      stroke-width: 6px !important;
    }
  }
  .ct-line {
    @include for-phone-only {
      stroke-width: 3px !important;
    }
  }
  .ct-label:not(:last-child) {
    display: none;
  }
}
.ct-labels {
  .ct-label.ct-horizontal.ct-end {
    font-size: 0.7rem !important;
    @include for-phone-only {
      font-size: 0.6rem !important;
    }
  }
}
.ct-legend {
  position: relative !important;
  text-align: center;
  list-style: none;

  li {
    position: relative !important;
    display: inline-block;
    padding-left: 23px !important;
    margin-right: 10px;
    margin-bottom: 3px;
    cursor: pointer;
  }

  li::before {
    position: absolute !important;
    top: 3px !important;
    left: 0 !important;
    width: 15px !important;
    height: 15px !important;
    content: '' !important;
    border: 3px solid transparent;
    border-radius: 2px !important;
  }

  li.inactive::before {
    background: transparent !important;
  }

  &.ct-legend-inside {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
  }

  @for $i from 0 to length($ct-series-colors) {
    .ct-series-#{$i} {
      color: nth($ct-series-colors, $i + 1);
      &::before {
        background-color: nth($ct-series-colors, $i + 1);
        border-color: nth($ct-series-colors, $i + 1);
      }
    }
  }
  .ct-legend-inside li {
    display: block;
    margin: 0;
  }
}
.ct-series-b .ct-legend {
  .ct-series-0 {
    color: nth($ct-series-colors, 2);
    &::before {
      background-color: nth($ct-series-colors, 2);
      border-color: nth($ct-series-colors, 2);
    }
  }
}

.ct-series-c .ct-legend {
  .ct-series-0 {
    color: nth($ct-series-colors, 3);
    &::before {
      background-color: nth($ct-series-colors, 3);
      border-color: nth($ct-series-colors, 3);
    }
  }
}

.ct-series-d .ct-legend {
  .ct-series-0 {
    color: nth($ct-series-colors, 4);
    &::before {
      background-color: nth($ct-series-colors, 4);
      border-color: nth($ct-series-colors, 4);
    }
  }
}

.ct-series-e .ct-legend {
  .ct-series-0 {
    color: nth($ct-series-colors, 5);
    &::before {
      background-color: nth($ct-series-colors, 5);
      border-color: nth($ct-series-colors, 5);
    }
  }
}

.ct-series-battery {
  .ct-legend {
    z-index: 1;
    margin-left: -160px;
    @include for-phone-only {
      margin-left: -130px;
    }
    .ct-series-0 {
      color: nth($ct-series-colors, 16) !important;
      &::before {
        background-color: nth($ct-series-colors, 16);
        border-color: nth($ct-series-colors, 16) !important;
      }
    }
    .ct-series-1 {
      color: nth($ct-series-colors, 17) !important;
      &::before {
        background-color: nth($ct-series-colors, 17);
        border-color: nth($ct-series-colors, 17) !important;
      }
    }
  }
  .ct-chart-line {
    @include for-phone-only {
      margin-left: -16px;
    }
  }
  .ct-series-a .ct-point,
  .ct-series-a .ct-line {
    stroke: nth($ct-series-colors, 16) !important;
  }
  .ct-series-b .ct-point,
  .ct-series-b .ct-line {
    stroke: nth($ct-series-colors, 17) !important;
  }
}
// hacky solution to show all battery info in 1 chart. TODO: implement dual y-axis in 1 chart when option is enabled in chartist
.ct-series-rssi {
  margin-top: -254px !important;
  .ct-legend {
    margin-left: 245px;
    @include for-phone-only {
      margin-left: 217px;
    }
    .ct-series-0 {
      color: nth($ct-series-colors, 12);
      &::before {
        background-color: nth($ct-series-colors, 12);
        border-color: nth($ct-series-colors, 12);
      }
      @include for-phone-only {
        line-height: 16px;
      }
    }
  }
  .ct-chart-line {
    @include for-phone-only {
      margin-top: -8px;
      margin-left: -16px;
    }
  }
  .ct-series-a .ct-point,
  .ct-series-a .ct-line {
    stroke: nth($ct-series-colors, 12) !important;
  }
  .ct-labels .ct-label.ct-horizontal.ct-end {
    display: none;
  }
}
</style>
