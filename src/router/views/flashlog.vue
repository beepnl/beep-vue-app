<template>
  <Layout :title="pageTitle">
    <v-toolbar class="save-bar save-bar--back" dense light>
      <v-icon
        v-if="!noMatches"
        :large="smAndDown"
        :small="!smAndDown"
        dark
        :color="smAndDown ? 'accent' : 'black'"
        class="ml-n1 mr-1"
        :disabled="loading || blockDataIndex === 0"
        @click="changeBlockDataIndex(0)"
        >mdi-chevron-double-left</v-icon
      >
      <v-btn
        v-if="
          !smAndDown && !noMatches && blockDataIndex !== 0 && blockData !== null
        "
        tile
        outlined
        color="black"
        :disabled="loading"
        @click="changeBlockDataIndex(blockDataIndex - 1)"
      >
        <v-icon left>mdi-chevron-left</v-icon>
        {{ $t('prev_week') }}</v-btn
      >
      <v-icon
        v-if="smAndDown && !noMatches"
        large
        dark
        color="accent"
        class="ml-n2"
        :disabled="loading || blockDataIndex === 0"
        @click="changeBlockDataIndex(blockDataIndex - 1)"
        >mdi-chevron-left</v-icon
      >
      <v-spacer></v-spacer>
      <div
        v-if="blockData !== null"
        :class="
          'font-weight-bold ' +
            (smAndDown ? 'd-flex flex-column font-small' : 'overline')
        "
      >
        <div class="d-flex flex-row">
          <span
            :class="
              'mr-3 ' +
                (blockData.block_data_match_percentage >= thresholdMatches
                  ? 'green--text'
                  : 'red--text')
            "
            v-text="
              $tc('Match', 2) +
                ': ' +
                blockData.block_data_match_percentage +
                '%'
            "
          ></span>
          <span
            v-if="!smAndDown && blockData.block_data_match_errors !== ''"
            class="mr-3 red--text"
            v-text="$tc('Error', 2) + ': ' + blockData.block_data_match_errors"
          ></span>
          <span
            :class="
              Math.abs(blockData.block_data_flashlog_sec_diff) >=
                thresholdSecDiff ||
              blockData.block_data_flashlog_sec_diff === null
                ? 'red--text'
                : 'green--text'
            "
            v-text="
              $t('Time_diff') +
                ': ' +
                (blockData.block_data_flashlog_sec_diff !== null
                  ? blockData.block_data_flashlog_sec_diff + $t('seconds_short')
                  : $t('unknown'))
            "
          ></span>
        </div>
        <div
          v-if="smAndDown && blockData.block_data_match_errors !== ''"
          class="d-flex flex-row"
        >
          <span
            class="mr-3 red--text"
            v-text="$tc('Error', 2) + ': ' + blockData.block_data_match_errors"
          ></span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!smAndDown && !noMatches && !finalIndex"
        tile
        outlined
        color="black"
        :disabled="loading"
        @click="changeBlockDataIndex(blockDataIndex + 1)"
      >
        {{ $t('next_week') }}
        <v-icon right>mdi-chevron-right</v-icon>
      </v-btn>
      <v-icon
        v-if="smAndDown && !noMatches"
        large
        dark
        color="accent"
        class="mr-n2"
        :disabled="loading || finalIndex"
        @click="changeBlockDataIndex(blockDataIndex + 1)"
        >mdi-chevron-right</v-icon
      >
      <v-icon
        v-if="!noMatches"
        :large="smAndDown"
        :small="!smAndDown"
        dark
        :color="smAndDown ? 'accent' : 'black'"
        class="mr-n1 ml-1"
        :disabled="loading || finalIndex"
        @click="changeBlockDataIndex(blockDataIndexMax)"
        >mdi-chevron-double-right</v-icon
      >
    </v-toolbar>

    <v-container class="back-content">
      <v-row>
        <v-col cols="12" class="py-0">
          <span
            class="float-right mt-n1 font-small"
            v-text="paginationText"
          ></span>
        </v-col>
      </v-row>
      <v-row class="my-0">
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

        <v-col cols="12" class="py-0 py-sm-3">
          <div
            v-if="loading"
            class="d-flex align-center justify-center loading-wrapper"
          >
            <v-progress-circular color="primary" size="50" indeterminate />
          </div>

          <div v-if="blockData !== null" class="charts">
            <template v-for="(dataSet, index) in dataSets">
              <div :key="'dataSet' + index" class="pt-0 pb-6">
                <div
                  class="overline mt-0 mb-3 text-center"
                  v-text="dataSet"
                ></div>
                <chartist
                  v-if="measurements[dataSet] !== undefined"
                  :class="'modulo-' + moduloNr + ' mb-8 mb-sm-12'"
                  ratio="ct-chart"
                  type="Line"
                  :data="chartDataMultipleSeries(dataSet)"
                  :options="chartOptions(dataSet)"
                >
                </chartist>
                <div v-else class="text-center my-8">
                  {{ $t('no_chart_data') }}
                </div>
              </div>
            </template>
          </div>

          <v-row v-if="blockData !== null" class="my-4">
            <v-col cols="12" sm="6">
              <div>
                <div class="beep-label" v-text="$t('Fill_holes') + ': '"></div>
                <v-switch
                  v-model="fillHoles"
                  class="pt-0 mt-0 mr-2"
                  dense
                  hide-details
                ></v-switch>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-end">
              <v-btn
                tile
                outlined
                color="accent"
                class="save-button-mobile-wide mr-1"
                :disabled="showLoadingIcon || loading || importDisabled"
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
            </v-col>
          </v-row>
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
      loading: false,
      noChartData: false,
      blockData: null,
      errorMessage: null,
      measurements: {},
      blockDataIndex: 0,
      blockDataIndexMax: 0,
      showLoadingIcon: false,
      dataSets: ['flashlog', 'database'],
      thresholdSecDiff: 120,
      thresholdMatches: 99,
      deviceName: null,
      fillHoles: true,
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    blockId() {
      return parseInt(this.$route.query.blockId)
    },
    finalIndex() {
      return (
        (this.blockData !== null &&
          this.blockDataIndex === this.blockDataIndexMax) ||
        this.blockData === null
      )
    },
    flashLogId() {
      return parseInt(this.$route.params.id)
    },
    importDisabled() {
      return (
        Math.abs(this.blockData.block_data_flashlog_sec_diff) >=
          this.thresholdSecDiff ||
        this.blockData.block_data_flashlog_sec_diff === null ||
        this.blockData.block_data_match_percentage < this.thresholdMatches
      )
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
    moduloNr() {
      if (this.blockData.flashlog.length) {
        var entries = this.blockData.flashlog.length
        return entries > 2000
          ? 100
          : entries > 1000
          ? this.mobile
            ? 72
            : 36
          : entries > 500
          ? 12
          : 6
      } else {
        return 100
      }
    },
    noMatches() {
      return this.errorMessage !== null
        ? this.errorMessage.indexOf('no_matches') > -1
        : false
    },
    pageTitle() {
      return (
        (!this.mobile
          ? this.$i18n.t('Log_data') +
            ' - ' +
            (this.deviceName !== null ? this.deviceName + ' - ' : '')
          : '') + this.logDetails
      )
    },
    paginationText() {
      return (
        this.$i18n.tc('Page', 1) +
        ' ' +
        this.blockDataIndex +
        ' ' +
        this.$i18n.t('of') +
        ' ' +
        this.blockDataIndexMax
      )
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  watch: {
    fillHoles() {
      this.checkBlockData()
    },
  },
  created() {
    this.readTaxonomy().then(() => {
      this.checkBlockData().then(() => {
        this.blockDataIndexMax = this.blockData.block_data_index_max
      })
    })
  },
  methods: {
    async checkBlockData(changeIndex = false) {
      this.clearMessages()
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
        this.deviceName = response.data.device_name

        this.formatFlashlogData(this.blockData)
      } catch (error) {
        this.loading = false
        if (error.response) {
          console.log(error.response)
          this.deviceName = error.response.data.device_name
          this.errorMessage = this.$i18n.t(error.response.data.error)
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
        var importMessage = response.data
        this.showLoadingIcon = false
        return this.$router.push({
          name: 'import',
          params: {
            importMessage,
          },
        })
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log(error.response)
          this.errorMessage = this.$i18n.t(error.response.data.error)
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

      if (
        typeof this.measurements[dataSet] !== 'undefined' &&
        this.blockData !== null
      ) {
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
    chartOptions(dataSet) {
      const self = this
      return {
        fullWidth: true,
        height: '250px',
        plugins: [
          this.$chartist.plugins.tooltip({
            class: 'beep-tooltip',
            metaIsHTML: true,
          }),
          self.$chartist.plugins.beep(),
          self.$chartist.plugins.legendBeep({
            dataSet: dataSet,
            simpleToggle: true,
            inactiveByDefault: true,
            // N.B. active classes are now set inside legendBeep plugin for smooth performance
          }),
        ],
        showPoint: true,
        lineSmooth: self.$chartist.Interpolation.simple({
          divisor: 10,
          fillHoles: self.fillHoles,
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
      this.errorMessage = null
    },
    confirmImportBlockData() {
      this.$refs.confirm
        .open(
          this.$i18n.t('import_block_data_short'),
          this.$i18n.t('commit_block_data') +
            ' "' +
            (this.deviceName !== null ? this.deviceName + ' - ' : '') +
            this.logDetails +
            '"?',
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
