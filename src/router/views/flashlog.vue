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
        {{ $t('prev') }}</v-btn
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
                  ? blockData.block_data_flashlog_sec_diff +
                    ' ' +
                    $t('seconds_short')
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
        {{ $t('next') }}
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

    <div class="period-bar-wrapper">
      <v-container class="period-container">
        <v-row class="period-bar">
          <v-col
            cols="12"
            class="d-flex flex-wrap justify-space-between align-center pa-0"
          >
            <div v-for="period in periods" :key="period.minutes">
              <v-btn
                :class="
                  `grey--text ${
                    period.minutes === currentMinutes ? 'accent--text' : ''
                  }`
                "
                text
                @click="setPeriodDataMinutes(period.minutes)"
              >
                {{ period.name }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="flashlog-content">
      <v-row>
        <v-col cols="12" class="py-0 mb-1">
          <v-slider
            v-show="!loading && blockData !== null && blockDataIndexMax !== 0"
            v-model="blockDataIndex"
            class="slider--large d-flex align-center"
            color="accent"
            track-color="accent"
            :max="blockDataIndexMax"
            validate-on-blur
            hide-details
            @change="checkBlockDataWithDelay(true)"
          >
            <template v-slot:append>
              <span
                class="font-small"
                style="width: 110px;"
                v-text="paginationText"
              ></span>
            </template>
          </v-slider>
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

        <v-col cols="12" class="py-0 pt-sm-3">
          <v-overlay
            :absolute="true"
            :value="loading"
            :opacity="0.5"
            color="white"
            z-index="3"
          >
            <v-progress-circular color="primary" size="50" indeterminate />
          </v-overlay>

          <div class="charts">
            <template v-for="(dataSet, index) in dataSets">
              <div :key="'dataSet' + index" class="chart-wrapper pt-0 pb-5">
                <div
                  class="overline mt-0 mb-2 text-center"
                  v-text="dataSet"
                ></div>
                <MeasurementsChartLine
                  v-if="measurements[dataSet] !== undefined"
                  :chart-data="chartjsDataSeries(dataSet)"
                  :interval="'week'"
                  location="flashlog"
                  :start-time="getMoment(blockData.start_date)"
                  :end-time="getMoment(blockData.end_date)"
                  :chart-id="'chart-' + dataSet"
                  size="large"
                  @legend-clicked="
                    toggleMeasurement(
                      $event.abbr,
                      $event.hidden,
                      // eslint-disable-next-line vue/comma-dangle
                      dataSet
                    )
                  "
                >
                </MeasurementsChartLine>

                <div
                  v-if="!loading && measurements[dataSet] === undefined"
                  class="text-center my-8"
                >
                  {{ $t('no_chart_data') }}
                </div>
              </div>
            </template>
          </div>

          <v-row v-if="blockData !== null" class="mt-4">
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
import MeasurementsChartLine from '@components/measurements-chart-line.vue'
import { mapGetters } from 'vuex'
import { momentFormat } from '@mixins/momentMixin'
import { readTaxonomy } from '@mixins/methodsMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    Confirm,
    Layout,
    MeasurementsChartLine,
  },
  mixins: [momentFormat, readTaxonomy, sensorMixin],
  data() {
    return {
      loading: true,
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
      fillHoles: false,
      shownMeasurements: {
        flashlog: ['t_0', 't_i', 't_1', 'weight_kg'],
        database: ['t_0', 't_i', 't_1', 'weight_kg'],
      },
      currentMinutes: 1440,
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
        (this.blockDataIndex + 1) +
        ' ' +
        this.$i18n.t('of') +
        ' ' +
        (this.blockDataIndexMax + 1)
      )
    },
    periods() {
      return [
        { name: this.$i18n.tc('day', 1), minutes: 1440 },
        { name: this.$i18n.t('week'), minutes: 10080 },
        { name: this.$i18n.t('month'), minutes: 43200 },
        { name: this.$i18n.t('year'), minutes: 525600 },
      ]
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  watch: {
    fillHoles() {
      this.checkBlockData(true)
    },
  },
  created() {
    this.readTaxonomy().then(() => {
      this.checkBlockData()
    })
  },
  methods: {
    async checkBlockData(changeIndex = false) {
      this.clearMessages()
      this.loading = true
      // this.blockData = null commented out because annotation plugin is disabled for the flashlog view which makes multiple charts reactive again
      // see https://vue-chartjs.org/guide/#chartjs-plugin-annotation
      try {
        const response = await Api.readRequest(
          '/flashlogs/' +
            this.flashLogId +
            '?block_id=' +
            this.blockId +
            (changeIndex ? '&block_data_index=' + this.blockDataIndex : '') +
            '&data_minutes=' +
            this.currentMinutes
        )
        this.blockData = response.data
        this.blockDataIndex = response.data.block_data_index
        this.blockDataIndexMax = this.blockData.block_data_index_max
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
      this.loading = true
      try {
        const response = await Api.postRequest(
          '/flashlogs/' + this.flashLogId + '?block_id=' + this.blockId
        )
        var importMessage = response.data
        this.showLoadingIcon = false
        this.loading = false
        return this.$router.push({
          name: 'import',
          params: {
            importMessage,
          },
        })
      } catch (error) {
        this.showLoadingIcon = false
        this.loading = false
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
    chartjsDataSeries(dataSet) {
      var data = {
        labels: [],
        datasets: [],
      }

      if (
        typeof this.measurements[dataSet] !== 'undefined' &&
        this.blockData !== null
      ) {
        this.measurements[dataSet].map((quantity, index) => {
          if (
            quantity.indexOf('time') === -1 &&
            quantity.indexOf('minute') === -1 &&
            quantity !== 'i'
          ) {
            var mT = this.getSensorMeasurement(quantity)

            if (mT === null || mT === undefined) {
              console.log('mT not found ', quantity)
            } else if (mT.show_in_charts === 1) {
              var sensorName = this.$i18n.t(quantity)
              var sensorLabel =
                sensorName +
                (mT.unit !== '-' && mT.unit !== '' && mT.unit !== null
                  ? ' (' + mT.unit + ')'
                  : '')

              data.datasets.push({
                id: mT.id,
                fill: false,
                borderColor: '#' + mT.hex_color,
                backgroundColor: '#' + mT.hex_color,
                borderRadius: 2,
                label: sensorLabel.replace(/^0/, ''),
                name: sensorName,
                abbr: mT.abbreviation,
                unit: mT.unit !== '-' && mT.unit !== null ? mT.unit : '',
                data: [],
                hidden:
                  this.shownMeasurements[dataSet].indexOf(mT.abbreviation) ===
                  -1,
                spanGaps: this.fillHoles,
              })
            }
          }
        })

        this.blockData[dataSet].map((measurement, index) => {
          data.datasets.map((dataset, i) => {
            var quantity = dataset.abbr
            // if (
            //   measurement[quantity] !== null &&
            //   typeof measurement[quantity] === 'number'
            // ) {
            dataset.data.push({
              x: measurement.time,
              y: measurement[quantity],
            })
            // }
          })
        })
      }

      return data
    },
    checkBlockDataWithDelay(bool) {
      setTimeout(() => {
        return this.checkBlockData(bool)
      }, 200) // wait for user to read slider value
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
    getSensorMeasurement(abbr) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : null
    },
    getMoment(date) {
      return this.$moment.utc(date)
    },
    setPeriodDataMinutes(newMinutes) {
      // calculate new block data index
      var currentIndexPerc = this.blockDataIndex / this.blockDataIndexMax
      var newMaxIndex =
        (this.blockDataIndexMax * this.currentMinutes) / newMinutes
      var newIndex = Math.floor(currentIndexPerc * newMaxIndex)

      this.blockDataIndex = newIndex
      this.currentMinutes = newMinutes
      this.checkBlockData(true)
    },
    toggleMeasurement(abbr, hidden, dataSet) {
      // add measurement abbreviation to list of showMeasurements per dataset, if it was hidden when clicked
      if (hidden === true && !this.shownMeasurements[dataSet].includes(abbr)) {
        this.shownMeasurements[dataSet].push(abbr)
        // otherwise remove it from that list
      } else if (
        hidden === false &&
        this.shownMeasurements[dataSet].includes(abbr)
      ) {
        this.shownMeasurements[dataSet].splice(
          this.shownMeasurements[dataSet].indexOf(abbr),
          1
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.flashlog-content {
  margin-top: 90px;
}

.chart-wrapper {
  min-height: 400px;
  @include for-phone-only {
    min-height: 200px;
  }
}
</style>
