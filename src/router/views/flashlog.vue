<template>
  <Layout :title="$t('Log_data_import')">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-progress-circular
            v-if="loading"
            color="primary"
            size="50"
            indeterminate
          />
          <div v-else class="charts">
            <!-- <span>{{ databaseMeasurements }}</span>
            <span>{{ flashlogMeasurements }}</span> -->
            <chartist
              :class="`mb-4 mb-sm-6`"
              ratio="ct-chart"
              type="Line"
              :data="
                chartDataMultipleSeries(
                  databaseMeasurements,
                  // eslint-disable vue/comma-dangle
                  flashlogMeasurements
                )
              "
              :options="chartOptions('')"
            >
            </chartist>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import { dummyDataShort } from '@assets/js/dummy.js'
// import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentFormat } from '@mixins/momentMixin'
import { readTaxonomy } from '@mixins/methodsMixin'
import { sensorMixin } from '@mixins/sensorMixin'
import 'chartist/dist/chartist.min.css'
import '@plugins/chartist-plugin-beep.js'
import '@plugins/chartist-plugin-legend-beep.js'
// import 'chartist-plugin-pointlabels'
import 'chartist-plugin-tooltips-updated'
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'

export default {
  components: {
    Confirm,
    Layout,
  },
  mixins: [momentFormat, readTaxonomy, sensorMixin],
  data() {
    return {
      loading: false,
      noChartData: false,
      blockData: null,
      databaseMeasurements: [],
      flashlogMeasurements: [],
      dummyDataShort,
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    blockId() {
      return parseInt(this.$route.query.blockId) || null
    },
    flashLogId() {
      return parseInt(this.$route.params.id)
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  created() {
    this.readTaxonomy().then(() => {
      this.checkBlockData(this.flashLogId, this.blockId)
    })
  },
  methods: {
    async checkBlockData(flashLogId, blockId) {
      this.loading = true
      try {
        // const response = await Api.readRequest(
        //   '/flashlogs/' +
        //     flashLogId +
        //     '?block_id=' +
        //     blockId +
        //     '?data_minutes=240' // TODO: remove / tweak?
        // )
        // this.blockData = response.data
        this.formatFlashlogData(dummyDataShort)
      } catch (error) {
        this.loading = false
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    chartDataMultipleSeries(dbMts, flMts) {
      var data = {
        labels: [],
        series: [],
      }

      // if (typeof this.dummyDataShort.database !== 'undefined') {
      //   Object.keys(dbMts)
      //     .sort()
      //     .map((sensorName, index) => {
      //       data.series.push({
      //         color: '#bbbbbb',
      //         name: sensorName,
      //         data: [],
      //       })
      //     })

      //   this.dummyDataShort.database.map((measurement, index) => {
      //     data.labels.push(measurement.time)
      //     data.series.map((serie, index) => {
      //       var currentSensor = dbMts[serie.name]
      //       serie.data.push({
      //         meta:
      //           this.momentFormat(measurement.time, 'llll') +
      //           '<br>' +
      //           serie.name +
      //           ': ' +
      //           (measurement[currentSensor] !== null
      //             ? measurement[currentSensor].toFixed(1)
      //             : measurement[currentSensor]) +
      //           'unit',
      //         value: measurement[currentSensor],
      //       })
      //     })
      //   })
      // }

      if (typeof this.dummyDataShort.flashlog !== 'undefined') {
        dbMts.map((sensorName, index) => {
          if (!sensorName.includes('time')) {
            data.series.push({
              // color: '#' + this.findMeasurementType(sensorName).hex_color,
              color: this.SENSOR_COLOR[sensorName],
              name: sensorName,
              data: [],
            })
          }
        })

        this.dummyDataShort.flashlog.map((measurement, index) => {
          data.labels.push(measurement.time)
          data.series.map((serie, index) => {
            var currentSensor = serie.name
            if (measurement[currentSensor] !== undefined) {
              serie.data.push({
                meta:
                  this.momentFormat(measurement.time, 'llll') +
                  '<br>' +
                  this.$i18n.t(currentSensor) +
                  ': ' +
                  (measurement[currentSensor] !== null
                    ? measurement[currentSensor].toFixed(1)
                    : measurement[currentSensor]) +
                  this.findMeasurementType(currentSensor).unit,
                value: measurement[currentSensor],
              })
            }
          })
        })
      }

      data.series.map((serie) => {
        serie.name = serie.name.replace(/^0/, '') // remove first zero for legend legibility (esp with sound sensor s_bin_201_402 and further)
      })
      return data
    },
    chartOptions(unit = '') {
      const self = this
      return {
        fullWidth: true,
        height: '800px',
        plugins: [
          this.$chartist.plugins.tooltip({
            class: 'beep-tooltip',
            metaIsHTML: true,
          }),
          self.$chartist.plugins.beep(),
          self.$chartist.plugins.legendBeep({
            simpleToggle: true,
          }),
          // self.$chartist.plugins.ctPointLabels({
          //   labelOffset: {
          //     x: 7,
          //     y: 0,
          //   },
          //   textAnchor: 'start',
          //   labelInterpolationFnc(value) {
          //     if (
          //       typeof value !== 'undefined' &&
          //       (unit === 'kg' || unit === 'mbar')
          //     ) {
          //       return value.toFixed(2) + ' ' + unit
          //     } else if (typeof value !== 'undefined') {
          //       return value.toFixed(1) + ' ' + unit
          //     } else {
          //       return '-'
          //     }
          //   },
          // }),
        ],
        showPoint: true,
        lineSmooth: self.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            return self.momentFormat(value, 'llll')
          },
        },
      }
    },
    findMeasurementType(abbr) {
      var mT = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )[0]
      console.log(mT.abbreviation, mT.hex_color)
      return mT
    },
    formatFlashlogData(blockData) {
      // this.measurementData = measurementData
      this.databaseMeasurements = []
      this.flashlogMeasurements = []

      if (blockData.database && blockData.database.length > 0) {
        this.databaseMeasurements = Object.keys(
          blockData.database.reduce(function(result, obj) {
            return Object.assign(result, obj)
          }, {})
        )
        // allDatabaseMeasurements.map(measurement => {
        //   var mT = this.sensorMeasurementsList.filter(
        //       (measurementType) => measurementType.abbreviation === measurement
        //     )[0]

        //     this.databaseMeasurements[mT.]
        // })
        // this.currentWeatherSensors[weatherSensorName] = quantity
      }

      if (blockData.flashlog && blockData.flashlog.length > 0) {
        this.flashlogMeasurements = Object.keys(
          blockData.flashlog.reduce(function(result, obj) {
            return Object.assign(result, obj)
          }, {})
        )
      } else {
        this.noChartData = true
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
