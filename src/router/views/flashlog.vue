<template>
  <Layout :title="pageTitle">
    <v-toolbar class="save-bar save-bar--back" dense light>
      <v-spacer></v-spacer>
      <v-btn
        tile
        outlined
        color="black"
        class="save-button-mobile-wide mr-1"
        :disabled="showLoadingIcon || !ready || blockData === null"
        @click.prevent="confirmImportBlockData"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="disabled"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-import</v-icon>
        {{ $t('import_block_data_short') }}
      </v-btn>
    </v-toolbar>

    <v-container class="back-content">
      <v-row v-if="userIsAdmin">
        <v-col v-if="showCommitMessage" cols="12">
          <v-alert
            v-model="showCommitMessage"
            text
            prominent
            dense
            dismissible
            type="success"
            color="green"
            class="mt-3 mb-n4"
          >
            {{ commitMessage }}
          </v-alert>
        </v-col>

        <v-col v-if="errorMessage" cols="12">
          <v-alert
            text
            prominent
            dense
            type="error"
            color="red"
            class="mt-3 mb-n4"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
        <v-col cols="12">
          <div
            v-if="!ready || blockData === null"
            class="d-flex align-center justify-center loading-wrapper"
          >
            <v-progress-circular color="primary" size="50" indeterminate />
          </div>
          <div v-else-if="blockData !== null" class="charts">
            <template v-for="(dataSet, index) in dataSets">
              <div
                v-if="measurements[dataSet] !== undefined"
                :key="'dataSet' + index"
                class="pt-0 pt-sm-2 pb-5"
              >
                <div
                  class="overline mt-0 mb-3 text-center"
                  v-text="dataSet"
                ></div>
                <chartist
                  :class="'modulo-' + moduloNr + ' mb-8 mb-sm-12'"
                  ratio="ct-chart"
                  type="Line"
                  :data="chartDataMultipleSeries(dataSet)"
                  :options="chartOptions()"
                >
                </chartist>
              </div>
            </template>

            <div class="mt-6 d-flex justify-space-between" style="width:100%">
              <v-btn
                v-if="blockDataIndex !== 0"
                tile
                outlined
                color="accent"
                :disabled="loading"
                @click="changeBlockDataIndex(blockDataIndex - 1)"
              >
                <v-progress-circular
                  v-if="loading"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="disabled"
                  indeterminate
                />
                <v-icon v-if="!loading" left>mdi-chevron-left</v-icon>
                {{
                  mobile ? $t('view_prev_week_short') : $t('view_prev_week')
                }}</v-btn
              >
              <v-spacer />
              <v-btn
                v-if="blockDataIndex !== blockData.block_data_index_max"
                tile
                outlined
                color="accent"
                :disabled="loading"
                @click="changeBlockDataIndex(blockDataIndex + 1)"
              >
                <v-progress-circular
                  v-if="loading"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="disabled"
                  indeterminate
                />
                {{ mobile ? $t('view_next_week_short') : $t('view_next_week') }}
                <v-icon v-if="!loading" right>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center my-10">
          {{ $t('no_admin') }}
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentFormat } from '@mixins/momentMixin'
import { readTaxonomy } from '@mixins/methodsMixin'
import { sensorMixin } from '@mixins/sensorMixin'
import 'chartist/dist/chartist.min.css'
import '@plugins/chartist-plugin-beep.js'
import '@plugins/chartist-plugin-legend-beep.js'
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
      ready: false,
      loading: false,
      noChartData: false,
      blockData: null,
      errorMessage: null,
      measurements: {},
      moduloNr: 100,
      blockDataIndex: 0,
      commitMessage: '',
      showCommitMessage: false,
      showLoadingIcon: false,
      dataSets: ['flashlog', 'database'],
    }
  },
  computed: {
    ...mapGetters('auth', ['userIsAdmin']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    blockId() {
      return parseInt(this.$route.query.blockId)
    },
    flashLogId() {
      return parseInt(this.$route.params.id)
    },
    locale() {
      return this.$i18n.locale
    },
    logDetails() {
      return (
        this.$i18n.t('Flashlog') +
        ' ' +
        this.flashLogId +
        ' - ' +
        this.$i18n.t('Block') +
        ' ' +
        this.blockId
      )
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    pageTitle() {
      return (
        (!this.mobile ? this.$i18n.t('Log_data') + ' - ' : '') + this.logDetails
      )
    },
  },
  created() {
    this.readTaxonomy().then(() => {
      this.checkBlockData()
    })
  },
  methods: {
    async checkBlockData(changeIndex = false) {
      this.loading = true
      this.blockData = null
      try {
        const response = await Api.readRequest(
          '/flashlogs/' +
            this.flashLogId +
            '?block_id=' +
            this.blockId +
            (changeIndex ? '&block_data_index=' + this.blockDataIndex : '')
        )
        this.blockData = response.data
        this.blockDataIndex = response.data.block_data_index

        if (this.blockData.flashlog.length) {
          var entries = this.blockData.flashlog.length
          this.moduloNr =
            entries > 2000 ? 100 : entries > 1000 ? 36 : entries > 500 ? 12 : 1
        }

        this.formatFlashlogData(this.blockData)
      } catch (error) {
        this.loading = false
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.error
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    async importBlockData() {
      this.clearMessages()
      this.showLoadingIcon = true
      try {
        const response = await Api.postRequest(
          '/flashlogs/' + this.flashLogId + '?block_id=' + this.blockId
        )
        this.commitMessage = response.data.message
        this.showCommitMessage = true
        this.showLoadingIcon = false
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.error
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    changeBlockDataIndex(newIndex) {
      this.blockDataIndex = newIndex
      this.checkBlockData(true)
    },
    chartDataMultipleSeries(dataSet) {
      var data = {
        labels: [],
        series: [],
      }

      if (typeof this.measurements[dataSet] !== 'undefined') {
        this.measurements[dataSet].map((sensorName, index) => {
          if (
            sensorName.indexOf('time') === -1 &&
            sensorName.indexOf('minute') === -1 &&
            sensorName !== 'i'
          ) {
            data.series.push({
              // color: '#' + this.findMeasurementType(sensorName).hex_color,
              color: this.SENSOR_COLOR[sensorName],
              name: this.$i18n.t(sensorName),
              data: [],
              className: sensorName,
            })
          }
        })

        this.blockData[dataSet].map((measurement, index) => {
          data.labels.push(measurement.time)
          data.series.map((serie, index) => {
            var currentSensor = serie.className
            if (measurement[currentSensor] !== undefined) {
              serie.data.push({
                meta: this.getMetaText(measurement, currentSensor, data.series),
                // +
                // this.findMeasurementType(currentSensor).unit,
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
    chartOptions() {
      const self = this
      return {
        fullWidth: true,
        height: '400px',
        plugins: [
          this.$chartist.plugins.tooltip({
            class: 'beep-tooltip',
            metaIsHTML: true,
          }),
          self.$chartist.plugins.beep(),
          self.$chartist.plugins.legendBeep({
            simpleToggle: true,
            inactiveByDefault: true,
            activeClasses: ['t_i', 't_0'],
          }),
        ],
        showPoint: true,
        lineSmooth: self.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: true,
        }),
        axisX: {
          showGrid: true,
          labelInterpolationFnc(value, index) {
            if (index % self.moduloNr === 0) {
              return self.momentFormat(value, 'llll')
            } else {
              return ''
            }
          },
        },
      }
    },
    clearMessages() {
      this.showCommitMessage = false
      this.commitMessage = null
      this.errorMessage = null
    },
    confirmImportBlockData() {
      this.$refs.confirm
        .open(
          this.$i18n.t('import_block_data_short'),
          this.$i18n.t('commit_log_data') + ' "' + this.logDetails + '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.importBlockData()
        })
        .catch((reject) => {
          return true
        })
    },
    findMeasurementType(abbr) {
      var mT = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )[0]
      return mT
    },
    formatFlashlogData(blockData) {
      this.measurements = {}

      this.dataSets.map((dataSet) => {
        if (blockData[dataSet] !== undefined && blockData[dataSet].length > 0) {
          this.measurements[dataSet] = Object.keys(
            blockData[dataSet].reduce(function(result, obj) {
              return Object.assign(result, obj)
            }, {})
          ).sort()
        }
      })

      this.loading = false
      this.ready = true
    },
    getMetaText(measurement, currentSensor, dataSeries) {
      var otherMeasurements = ''
      dataSeries.map((dataSerie, index) => {
        if (
          dataSerie.className !== currentSensor &&
          measurement[dataSerie.className] !== null &&
          measurement[dataSerie.className] !== undefined
        ) {
          otherMeasurements +=
            dataSerie.name +
            ': ' +
            (dataSerie.className.indexOf('weight_kg') > -1
              ? measurement[dataSerie.className].toFixed(3)
              : measurement[dataSerie.className]) +
            (index !== dataSeries.length - 1 ? '<br>' : '')
        }
      })
      return (
        this.momentFormat(measurement.time, 'llll') +
        '<br>' +
        this.$i18n.t(currentSensor) +
        ': ' +
        measurement[currentSensor] +
        '<br>' +
        otherMeasurements
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-wrapper {
  height: 90vh;
  @include for-phone-only {
    height: 80vh;
  }
}
</style>
