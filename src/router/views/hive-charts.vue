<template>
  <div>
    <v-container>
      <v-card class>
        <v-card-title>Weight (kg)</v-card-title>
        <chartist
          ratio="ct-perfect-fourth"
          type="Line"
          :data="weightData"
          :options="weightOptions"
        ></chartist>
      </v-card>
      <v-card class="mt-1">
        <v-card-title>Humidity (%)</v-card-title>
        <chartist
          ratio="ct-perfect-fourth"
          type="Line"
          :data="humidityData"
          :options="humidityOptions"
        ></chartist>
      </v-card>
      <v-card class="mt-1">
        <v-card-title>Log entries</v-card-title>
        <chartist
          ratio="ct-double-octave"
          type="Line"
          :data="logbookData"
          :options="logbookOptions"
        ></chartist>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      chartOptions: {
        lineSmooth: true,
      },
    }
  },
  computed: {
    xLabels() {
      return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    },
    crosshair() {
      return 'Mo'
    },
    weightOptions() {
      return this.chartOptions
    },
    weightData() {
      return {
        labels: this.xLabels,
        series: [
          [3.5, NaN, 3.4, 3.2, 3.6, 3.5, 3.8],
          [3.0, 2.9, 3.1, NaN, 3.2, 3.3, 3.4],
        ],
      }
    },
    humidityOptions() {
      return {
        lineSmooth: true,
        series: {
          filled: {
            lineSmooth: false,
            showArea: true,
          },
        },
      }
    },
    humidityData() {
      return {
        labels: this.xLabels,
        series: [
          {
            name: 'filled',
            data: [87, 88, 91, 72, 82, 77, 90],
          },
          [86, 87, 90, 89, 89, 88, 91],
          [89, 87, 86, 89, 84, 83, 89],
        ],
      }
    },
    logbookOptions() {
      return this.chartOptions
    },
    logbookData() {
      return {
        labels: this.xLabels,
        series: [
          [0, 0, 0, 1, 0, 0, 2],
          [0, 1, 0, 1, 0, 1, 3],
        ],
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ct-series-a .ct-line {
  stroke: blue;
  stroke-dasharray: 5px;
}
</style>
