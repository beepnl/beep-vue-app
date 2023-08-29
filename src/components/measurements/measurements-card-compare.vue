<template>
  <MeasurementsCard
    :title="$t('Compare') + ': ' + selectedDeviceTitle"
    :mobile-title="$t('Compare')"
    :local-var="localVar"
    :show-chart-cols-icons="true"
    @set-chart-cols="chartCols = $event"
    @show-card-content="toggleCardExpanded($event)"
  >
    <v-row class="my-4">
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-row>
          <v-col>
            <div>
              <div class="mb-2">
                <div class="beep-label">
                  {{ $t('Compare_hives') }}
                  <v-icon
                    class="mdi mdi-information ml-1 icon-info cursor-pointer"
                    dark
                    small
                    :color="showInfo ? 'accent' : 'grey'"
                    @click="showInfo = !showInfo"
                  ></v-icon>
                </div>
              </div>

              <p v-if="showInfo" class="info-text">
                <em
                  >{{ $t('compare_hives_exp') + ' '
                  }}<a :href="$t('compare_support_url')" target="_blank">{{
                    $t('compare_url_text')
                  }}</a></em
                >
              </p>
            </div>

            <v-btn
              tile
              outlined
              color="black"
              class="save-button-mobile-wide"
              @click.prevent="selectHivesOverlay = true"
            >
              {{ $tc('Select_hive', 2) }}
            </v-btn>
            <SelectHivesOverlay
              :show-overlay="selectHivesOverlay"
              :overlay="selectHivesOverlay"
              :compare-mode="true"
              :include-groups="true"
              @close-overlay="selectHivesOverlay = false"
              @select-hives="selectHives($event)"
            />
          </v-col>
          <v-col
            v-if="initSelectedHives.length > 0"
            cols="12"
            sm="5"
            md="12"
            class="py-0 py-sm-3 mb-n2 mb-sm-0 mt-sm-3 mt-md-0 d-flex align-center"
          >
            <v-switch
              v-model="allHivesSelected"
              :label="$t('select_all_hives')"
              :disabled="loadingCompareData || loadingData"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6" md="8" lg="10">
        <ApiaryPreviewHiveSelector
          v-if="initSelectedHives.length > 0 && initSelectedHives.length < 16"
          class="ml-lg-5 my-4 my-sm-2 compare-hives"
          :hives="getHives(initSelectedHives)"
          :hives-selected="selectedHives"
          :hives-editable="initSelectedHives"
          :inspection-mode="true"
          :compare-mode="true"
          :disable-sort-hives="true"
          @select-hive="selectHive($event)"
        ></ApiaryPreviewHiveSelector>
        <span
          v-else-if="initSelectedHives.length > 0"
          class="mx-3 beep-label"
          v-text="initSelectedHives.join(', ')"
        ></span>
        <!-- <v-btn
          tile
          outlined
          color="black"
          class="save-button-mobile-wide"
          :disabled="initSelectedHives.length === 0 || loadingCompareData"
          @click.prevent="loadCompareData(true)"
        >
          <v-progress-circular
            v-if="loadingCompareData"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!loadingCompareData" left>mdi-check</v-icon>
          {{ $t('Load') }}
        </v-btn> -->
      </v-col>
    </v-row>

    <v-overlay
      :absolute="true"
      :value="
        (compareMeasurementData !== null && loadingCompareData) ||
          (loadingData && initMultiple)
      "
      :opacity="0.5"
      color="white"
      class="mt-12"
      z-index="1"
    >
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-overlay>

    <v-row
      v-if="
        (compareMeasurementData === null && loadingCompareData) ||
          noCompareChartData
      "
      class="mt-n6"
    >
      <v-col
        v-if="compareMeasurementData === null && loadingCompareData"
        class="d-flex align-center justify-center my-12"
        cols="12"
      >
        <v-progress-circular color="primary" size="50" indeterminate />
      </v-col>
      <v-col
        v-else-if="noCompareChartData"
        cols="12"
        class="d-flex align-center justify-center my-16"
      >
        {{ $t('compare_no_chart_data') }}
      </v-col>
    </v-row>

    <v-row
      v-if="
        selectedHives.length > 0 &&
          measurementData !== null &&
          compareMeasurementData !== null &&
          compareMeasurementData.measurements &&
          compareMeasurementData.measurements.length > 0
      "
      :class="
        'charts mt-n6 mt-sm-n3 mb-4' +
          (multipleSections ? ' expandable-section' : '')
      "
    >
      <div
        v-if="multipleSections"
        class="expandable-section-bar d-flex align-center"
      >
        <v-spacer />
        <div class="overline ml-7" v-text="$t('Compare_with_mean')"></div>
        <v-spacer />
        <v-icon
          class="mb-1 mr-1"
          color="grey"
          @click="showCompareSection = !showCompareSection"
          >mdi-minus</v-icon
        >
      </div>

      <template v-if="showCompareSection && compareSensorsPresent">
        <v-col
          v-for="(sensor, index) in currentCompareSensors"
          :key="'c-' + index"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="!multipleSections && index === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$t('Compare_with_mean')"
          ></div>
          <div
            v-if="index === 0"
            class="overline mb-3 text-center"
            v-text="
              compareMeasurementData.resolution
                ? $tc('measurement', 2) +
                  ' (' +
                  $t('measurement_interval') +
                  ': ' +
                  compareMeasurementData.resolution +
                  ')'
                : $tc('measurement', 2)
            "
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div class="d-flex justify-center align-center">
            <div
              class="overline mt-0 mt-sm-3 mb-3 text-center"
              v-text="$t(COMPARE_SENSOR[sensor])"
            ></div>
            <v-icon
              class="mdi mdi-information ml-1 icon-info cursor-pointer"
              dark
              size="14"
              :color="chartInfo.indexOf(index) > -1 ? 'accent' : 'grey'"
              @click="toggleChartInfo(index)"
            ></v-icon>
          </div>

          <p
            v-if="chartInfo.indexOf(index) > -1"
            class="text-center mt-n3 mb-1"
          >
            <em
              >{{ compareChartExpText
              }}<a :href="$t('compare_support_url')" target="_blank">{{
                $t('compare_url_text')
              }}</a></em
            >
          </p>
          <div>
            <MeasurementsChartLine
              :chart-data="chartjsCompareDataSeries([sensor])"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'compare-' + index"
              :location="'compare'"
              :inspections-for-charts="inspectionsForCharts"
              @confirm-view-alert="confirmViewAlert($event)"
              @confirm-view-inspection="
                confirmViewInspection($event.id, $event.date)
              "
              @set-period-to-date="setPeriodToDate($event)"
            >
            </MeasurementsChartLine>
          </div>
        </v-col>
      </template>

      <template v-if="showCompareSection && compareSensorsPresent">
        <v-col
          v-for="(sensor, j) in currentCompareSensors"
          :key="'b-' + j"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="j === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$tc('overall_intake_loss')"
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div class="d-flex justify-center align-center">
            <div
              class="overline mt-0 mt-sm-3 mb-3 text-center"
              v-text="$t(COMPARE_SENSOR[sensor])"
            ></div>
            <v-icon
              class="mdi mdi-information ml-1 icon-info cursor-pointer"
              dark
              size="14"
              :color="chartInfo.indexOf('b-' + j) > -1 ? 'accent' : 'grey'"
              @click="toggleChartInfo('b-' + j)"
            ></v-icon>
          </div>

          <p
            v-if="chartInfo.indexOf('b-' + j) > -1"
            class="text-center mt-n3 mb-1"
          >
            <em
              >{{ compareChartExpText
              }}<a :href="$t('compare_support_url')" target="_blank">{{
                $t('compare_url_text')
              }}</a></em
            >
          </p>
          <div>
            <MeasurementsChartBar
              :chart-data="chartjsCompareDataSeries([sensor], true)"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'bar-' + j"
              :location="'compare'"
            >
            </MeasurementsChartBar>
          </div>
        </v-col>
      </template>
    </v-row>

    <v-row
      v-if="
        (!loadingCompareData && !initMultiple && loadingData) ||
          (!loadingData && multipleHivesNoChartData)
      "
      class="mt-n6"
    >
      <v-col
        v-if="!loadingCompareData && !initMultiple && loadingData"
        class="d-flex align-center justify-center my-12"
        cols="12"
      >
        <v-progress-circular color="primary" size="50" indeterminate />
      </v-col>
      <v-col
        v-else-if="!loadingData && multipleHivesNoChartData"
        cols="12"
        class="d-flex align-center justify-center my-16"
      >
        {{ $t('multiple_hives_no_chart_data') }}
      </v-col>
    </v-row>

    <v-row
      v-if="
        selectedHives.length > 0 &&
          multipleHivesDataPresent &&
          !(!loadingData && multipleHivesNoChartData)
      "
      :class="
        // eslint-disable vue/comma-dangle
        'charts mt-4 mb-2' +
          (multipleSections ? ' expandable-section mb-4' : '')
      "
    >
      <div
        v-if="multipleSections"
        class="expandable-section-bar d-flex align-center"
      >
        <v-spacer />
        <div class="overline ml-7" v-text="$t('Multiple_hives_charts')"></div>
        <v-spacer />
        <v-icon
          class="mb-1 mr-1"
          color="grey"
          @click="showMultipleSection = !showMultipleSection"
          >mdi-minus</v-icon
        >
      </div>

      <template v-if="showMultipleSection && currentSensors.length > 0">
        <v-col
          v-for="(sensor, index) in currentSensors"
          :key="'mc-' + index"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="!multipleSections && index === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$t('Multiple_hives_charts')"
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$t(SENSOR_NAMES[sensor])"
          ></div>
          <div>
            <MeasurementsChartLine
              :chart-data="chartjsMultipleHivesDataSeries(sensor)"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'mh-' + index"
              :inspections-for-charts="inspectionsForCharts"
              @confirm-view-alert="confirmViewAlert($event)"
              @confirm-view-inspection="
                confirmViewInspection($event.id, $event.date)
              "
              @set-period-to-date="setPeriodToDate($event)"
            >
            </MeasurementsChartLine>
          </div>
        </v-col>
      </template>

      <template v-if="showMultipleSection && currentDebugSensors.length > 0">
        <v-col
          v-for="(sensor, index) in currentDebugSensors"
          :key="'mc-debug-' + index"
          cols="12"
          :md="chartCols"
        >
          <div
            v-if="index === 0"
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$tc('device', 1) + ' ' + $t('info').toLocaleLowerCase()"
          ></div>
          <div v-else-if="chartCols !== 12" class="header-filler my-3"></div>
          <div
            class="overline mt-0 mt-sm-3 mb-3 text-center"
            v-text="$t(SENSOR_NAMES[sensor])"
          ></div>
          <div>
            <MeasurementsChartLine
              :chart-data="chartjsMultipleHivesDataSeries(sensor)"
              :interval="interval"
              :start-time="periodStartString"
              :end-time="periodEndString"
              :chart-id="'mh-debug-' + index"
              :inspections-for-charts="inspectionsForCharts"
              @confirm-view-alert="confirmViewAlert($event)"
              @confirm-view-inspection="
                confirmViewInspection($event.id, $event.date)
              "
              @set-period-to-date="setPeriodToDate($event)"
            >
            </MeasurementsChartLine>
          </div>
        </v-col>
      </template>
    </v-row>
  </MeasurementsCard>
</template>

<script>
import Api from '@api/Api'
import { mapGetters } from 'vuex'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import MeasurementsCard from '@components/measurements/measurements-card.vue'
import MeasurementsChartLine from '@/src/components/measurements/measurements-chart-line.vue'
import MeasurementsChartBar from '@/src/components/measurements/measurements-chart-bar.vue'
import SelectHivesOverlay from '@components/select-hives-overlay.vue'
import {
  lightenColor,
  readApiariesAndGroupsIfNotPresent,
} from '@mixins/methodsMixin'
import { timeZone } from '@mixins/momentMixin'
import { sensorMixin } from '@mixins/sensorMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    MeasurementsCard,
    MeasurementsChartLine,
    MeasurementsChartBar,
    SelectHivesOverlay,
  },
  mixins: [
    lightenColor,
    readApiariesAndGroupsIfNotPresent,
    sensorMixin,
    timeZone,
  ],
  props: {
    dates: {
      type: Array,
      default: () => [],
      required: false,
    },
    defaultHiveId: {
      type: Number,
      default: null,
      required: false,
    },
    measurementData: {
      type: Object,
      default: () => {},
      required: false,
    },
    interval: {
      type: String,
      default: 'day',
      required: true,
    },
    inspectionsForCharts: {
      type: Array,
      default: () => [],
      required: false,
    },
    periodEndString: {
      type: String,
      default: '',
      required: false,
    },
    periodStartString: {
      type: String,
      default: '',
      required: false,
    },
    relativeInterval: {
      type: Boolean,
      default: false,
      required: true,
    },
    selectedDeviceTitle: {
      type: String,
      default: '',
      required: false,
    },
    timeIndex: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  data() {
    return {
      compareMeasurementData: null,
      currentCompareSensors: [],
      compareSensorsPresent: false,
      noCompareChartData: false,
      initSelectedHives: [],
      initMultiple: false,
      loadingCompareData: false,
      selectHivesOverlay: false,
      cardName: 'Compare',
      ready: false,
      comparingData: false,
      chartCols: 6,
      SDsigns: ['-', '+'],
      showInfo: false,
      selectedHives: [],
      multipleHivesMeasurementData: {},
      multipleHivesWithData: [],
      loadingData: false,
      currentSensors: [],
      currentDebugSensors: [],
      multipleHivesNoChartData: false,
      fallbackColor: '#d6d6d6',
      cardExpanded: false,
      showCompareSection: true,
      showMultipleSection: true,
      chartInfo: [],
    }
  },
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    allHivesSelected: {
      get() {
        return this.selectedHives.length === this.initSelectedHives.length
      },
      set(value) {
        if (value === false) {
          this.selectedHives = []
        } else {
          this.selectedHives = [...this.initSelectedHives]
        }
      },
    },
    compareChartExpText() {
      var expText = this.$i18n.te('compare_chart_exp')
        ? this.$i18n
            .t('compare_chart_exp')
            .replace('[hivename]', '"' + this.defaultHiveName + '"')
        : 'Please note: "' +
          this.defaultHiveName +
          '" will not be included in the mean weight calculation. '
      return this.defaultHiveIsSelected ? expText : '' // if the default hive is selected, add text that it will not be included in the mean calculation to the compare chart info text
    },
    compareHives() {
      var selectedHives = [...this.selectedHives]
      if (this.defaultHiveIsSelected) {
        selectedHives.splice(selectedHives.indexOf(this.defaultHiveId), 1) // always remove default hive id from list of hive ids that are included in the sensorCompareMeasurementRequest because you don't want to included it in the mean you are comparing the default hive against
      }
      return selectedHives
    },
    defaultHiveName() {
      return this.hivesObject[this.defaultHiveId] !== undefined
        ? this.hivesObject[this.defaultHiveId].name
        : ''
    },
    defaultHiveIsSelected() {
      return this.selectedHives.indexOf(this.defaultHiveId) > -1
    },
    locale() {
      return this.$i18n.locale
    },
    localVar() {
      return 'beepChartCols' + this.cardName
    },
    multipleHivesDataPresent() {
      return this.multipleHivesWithData.length > 0 // Object.keys(this.multipleHivesMeasurementData) somehow does not work
    },
    multipleSections() {
      return (
        this.permissions.includes('multiple-hives-charts') &&
        this.permissions.includes('hive-compare')
      ) // TODO adapt when permissions setup is changed
    },
  },
  watch: {
    showCompareSection() {
      if (
        this.showCompareSection &&
        this.permissions.includes('hive-compare')
      ) {
        this.sensorCompareMeasurementRequest(
          this.interval,
          this.timeIndex,
          this.relativeInterval
        )
      }
    },
    showMultipleSection() {
      if (
        this.showMultipleSection &&
        this.permissions.includes('multiple-hives-charts')
      ) {
        this.getMultipleHivesMeasurements(
          this.interval,
          this.timeIndex,
          this.relativeInterval
        )
      }
    },
  },
  created() {
    // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
    this.readApiariesAndGroupsIfNotPresent()
  },
  methods: {
    async getMultipleHivesMeasurements(interval, timeIndex, relativeInterval) {
      this.loadingData = true
      this.multipleHivesNoChartData = true
      await Promise.all(
        this.selectedHives.map(async (hiveId) => {
          await this.sensorMeasurementRequest(
            interval,
            timeIndex,
            relativeInterval,
            hiveId
          )
          return true
        })
      )
      this.loadingData = false
      this.initMultiple = true
    },
    async sensorMeasurementRequest(
      interval,
      timeIndex,
      relativeInterval,
      hiveId
    ) {
      var start = interval === 'selection' ? this.dates[0] : null
      var end = interval === 'selection' ? this.dates[1] : null
      var timeGroup =
        interval === 'hour' || interval === 'selection' ? null : interval

      try {
        const response = await Api.readRequest(
          '/sensors/measurements?hive_id=' +
            hiveId +
            '&interval=' +
            interval +
            '&index=' +
            timeIndex +
            '&timeGroup=' +
            timeGroup +
            '&timezone=' +
            this.timeZone +
            (start !== null ? '&start=' + start + ' 00:00' : '') +
            (end !== null ? '&end=' + end + ' 23:59' : '') +
            '&relative_interval=' +
            (relativeInterval ? '1' : '0')
        )
        this.formatMeasurementData(response.data, hiveId)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async sensorCompareMeasurementRequest(
      interval,
      timeIndex,
      relativeInterval
    ) {
      var start = interval === 'selection' ? this.dates[0] : null
      var end = interval === 'selection' ? this.dates[1] : null
      var timeGroup =
        interval === 'hour' || interval === 'selection' ? null : interval
      this.noCompareChartData = false
      this.loadingCompareData = true
      var hivecall = this.compareHives.join('&hive_id[]=')
      if (this.selectedHives.length > 0) {
        try {
          const response = await Api.readRequest(
            '/sensors/comparemeasurements?hive_id[]=' +
              hivecall +
              '&interval=' +
              interval +
              '&index=' +
              timeIndex +
              '&timeGroup=' +
              timeGroup +
              '&timezone=' +
              this.timeZone +
              (start !== null ? '&start=' + start + ' 00:00' : '') +
              (end !== null ? '&end=' + end + ' 23:59' : '') +
              '&relative_interval=' +
              (relativeInterval ? '1' : '0')
          )
          this.formatCompareMeasurementData(response.data)
          this.ready = true
          return true
        } catch (error) {
          this.loadingCompareData = false
          this.compareMeasurementData = null
          if (error.response) {
            console.log(error.response)
            if (
              error.response.status === 500 ||
              error.response.status === 404 ||
              error.response.status === 422
            ) {
              this.noCompareChartData = true
            }
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    getSensorMeasurement(abbr) {
      var smFilter = this.sensorMeasurementsList.filter(
        (measurementType) => measurementType.abbreviation === abbr
      )
      return smFilter.length > 0 ? smFilter[0] : null
    },
    chartjsCompareDataSeries(quantities, bar = false) {
      var data = {
        labels: [],
        datasets: [],
      }
      if (!bar) {
        var SDdata = {
          labels: [],
          datasets: [],
        }
      }

      quantities.map((compareQuantity, index) => {
        var compareMt = this.getSensorMeasurement(compareQuantity)
        var compareSD = this.COMPARE_SD[compareQuantity]

        if (compareMt === null || compareMt === undefined) {
          console.log('compareMt not found ', compareQuantity)
        } else if (compareMt.show_in_charts === 1) {
          // for data
          data.datasets.push({
            id: compareMt.id,
            abbr: compareMt.abbreviation,
            fill: false,
            borderColor: '#' + compareMt.hex_color,
            backgroundColor: '#' + compareMt.hex_color,
            borderRadius: 2,
            label: this.getSensorLabel(
              this.compareMeasurementData.sensorDefinitions,
              compareQuantity,
              compareMt.unit
            ),
            name: this.getSensorName(
              this.compareMeasurementData.sensorDefinitions,
              compareQuantity
            ),
            unit:
              compareMt.unit !== '-' && compareMt.unit !== null
                ? compareMt.unit
                : '',
            data: [],
            spanGaps: this.interval === 'hour' || this.interval === 'day',
            mtType: 'compare',
          })

          if (!bar) {
            // for sd
            this.SDsigns.map((sign) => {
              SDdata.datasets.push({
                id: compareSD,
                abbr: compareSD + sign,
                fill: 0,
                borderColor: '#' + compareMt.hex_color,
                backgroundColor: this.lightenColor(
                  compareMt.hex_color,
                  8,
                  0.15
                ),
                borderRadius: 1,
                borderWidth: 0,
                hidden: false,
                // showLine: false,
                pointRadius: 0,
                label: 'mean ' + sign + ' SD',
                name: 'mean ' + sign + ' SD',
                unit: '',
                data: [],
                spanGaps: this.interval === 'hour' || this.interval === 'day',
                mtType: 'compareSD',
              })
            })
          }

          var quantity = this.COMPARE_SENSOR[compareQuantity]
          var mt = this.getSensorMeasurement(quantity)

          if (mt === null || mt === undefined) {
            console.log('mt not found ', quantity)
          } else if (mt.show_in_charts === 1) {
            data.datasets.push({
              id: mt.id,
              abbr: mt.abbreviation,
              fill: false,
              borderColor: '#' + mt.hex_color,
              backgroundColor: '#' + mt.hex_color,
              borderRadius: 2,
              label: this.getSensorLabel(
                this.measurementData.sensorDefinitions,
                quantity,
                mt.unit
              ),
              name: this.getSensorName(
                this.measurementData.sensorDefinitions,
                quantity
              ),
              unit: mt.unit !== '-' && mt.unit !== null ? mt.unit : '',
              data: [],
              spanGaps: this.interval === 'hour' || this.interval === 'day',
              mtType: 'normal',
            })
          }
        }
      })

      if (
        typeof this.compareMeasurementData.measurements !== 'undefined' &&
        this.compareMeasurementData.measurements.length > 0
      ) {
        this.compareMeasurementData.measurements.map((measurement, index) => {
          if (
            (!this.relativeInterval &&
              (this.interval === 'hour' ||
                this.interval === 'day' ||
                this.interval === 'week' ||
                this.interval === 'year' ||
                // skip first value for month or selection interval (belongs to previous month/day) except when it's a relative interval
                index !== 0)) ||
            this.relativeInterval
          ) {
            data.datasets.map((dataset, index) => {
              if (dataset.mtType === 'compare') {
                var compareQuantity = dataset.abbr

                dataset.data.push({
                  x: measurement.time,
                  y: measurement[compareQuantity],
                })

                if (!bar) {
                  var compareSD = this.COMPARE_SD[compareQuantity]
                  if (compareSD !== 'undefined' && compareSD !== null) {
                    this.SDsigns.map((sign) => {
                      var abbr = compareSD + sign
                      var dataset = SDdata.datasets.filter(
                        (dataset) => dataset.abbr === abbr
                      )[0]

                      dataset.data.push({
                        x: measurement.time,
                        y:
                          sign === '-'
                            ? measurement[compareQuantity] -
                              measurement[compareSD]
                            : measurement[compareQuantity] +
                              measurement[compareSD],
                      })
                    })
                  }
                }
              }
            })
          }
        })
      }

      if (
        typeof this.measurementData.measurements !== 'undefined' &&
        this.measurementData.measurements.length > 0
      ) {
        this.measurementData.measurements.map((measurement, index) => {
          if (
            (!this.relativeInterval &&
              (this.interval === 'hour' ||
                this.interval === 'day' ||
                this.interval === 'week' ||
                this.interval === 'year' ||
                // skip first value for month or selection interval (belongs to previous month/day) except when it's a relative interval
                index !== 0)) ||
            this.relativeInterval
          ) {
            data.datasets.map((dataset, index) => {
              if (dataset.mtType === 'normal') {
                var quantity = dataset.abbr

                dataset.data.push({
                  x: measurement.time,
                  y: measurement[quantity],
                })
              }
            })
          }
        })
      }

      // console.log('bar')
      // console.log(bar)
      if (bar) {
        data.datasets.map((barset, index) => {
          // console.log(barset.name)
          var allData = barset.data
          var barData = allData.reduce((resultArray, item, index) => {
            if (!resultArray[0]) {
              resultArray[0] = item // save at least something
            }
            if (item.y !== null && resultArray[0].y === null) {
              // save first item that is not null
              resultArray[0].y = item.y
            }
            if (item.y !== null) {
              // save last item that is not null
              resultArray[1] = item
            }
            return resultArray
          }, [])
          // console.log(barData)
          var bdy1 = barData[0] && barData[0].y ? barData[0].y : null
          var bdy2 = barData[1] && barData[1].y ? barData[1].y : null
          var barDiffData = { x: this.$i18n.tc(this.interval, 1), y: null }
          if (bdy1 !== null && bdy2 !== null) {
            barDiffData.y = bdy2 - bdy1
          }
          // console.log(barDiffData)
          barset.data = [barDiffData]
        })
      }

      if (!bar) {
        data.datasets.push.apply(data.datasets, SDdata.datasets)
      }

      return data
    },
    chartjsMultipleHivesDataSeries(quantity) {
      var data = {
        labels: [],
        datasets: [],
      }

      var mT = this.getSensorMeasurement(quantity)

      if (mT === null || mT === undefined) {
        console.log('mT not found ', quantity)
      } else if (mT.show_in_charts === 1) {
        this.selectedHives.map((hiveId) => {
          var hiveData = []
          if (
            typeof this.multipleHivesMeasurementData[hiveId] !== 'undefined' &&
            typeof this.multipleHivesMeasurementData[hiveId].measurements !==
              'undefined' &&
            this.multipleHivesMeasurementData[hiveId].measurements.length > 0
          ) {
            this.multipleHivesMeasurementData[hiveId].measurements.map(
              (measurement, index) => {
                if (
                  (!this.relativeInterval &&
                    (this.interval === 'hour' ||
                      this.interval === 'day' ||
                      this.interval === 'week' ||
                      this.interval === 'year' ||
                      // skip first value for month or selection interval (belongs to previous month/day) except when it's a relative interval
                      index !== 0)) ||
                  this.relativeInterval
                ) {
                  if (measurement[quantity] !== undefined) {
                    hiveData.push({
                      x: measurement.time,
                      y: measurement[quantity],
                    })
                  }
                }
              }
            )

            var hiveColor =
              this.hivesObject[hiveId].layers[0].color !== null
                ? this.hivesObject[hiveId].layers[0].color
                : this.fallbackColor

            data.datasets.push({
              id: mT.id + '_' + hiveId,
              abbr: mT.abbreviation,
              fill: false,
              borderColor: hiveColor,
              backgroundColor: hiveColor,
              borderRadius: 2,
              label: this.hivesObject[hiveId].name,
              name: this.hivesObject[hiveId].name,
              unit: mT.unit !== '-' && mT.unit !== null ? mT.unit : '',
              data: hiveData,
              spanGaps: this.interval === 'hour' || this.interval === 'day', // false,
            })
          }
        })
      }

      return data
    },
    confirmViewAlert(alert) {
      // TODO: add alert lines to compare charts!
      this.$emit('confirm-view-alert', alert)
    },
    confirmViewInspection(inspectionId, inspectionDate) {
      this.$emit('confirm-view-inspection', {
        id: inspectionId,
        date: inspectionDate,
      })
    },
    formatCompareMeasurementData(compareMeasurementData) {
      if (
        compareMeasurementData &&
        compareMeasurementData.measurements &&
        compareMeasurementData.measurements.length > 0
      ) {
        compareMeasurementData.measurements.sort(function(a, b) {
          if (a.time < b.time) {
            return -1
          }
          if (a.time > b.time) {
            return 1
          }
          return 0
        })

        this.compareMeasurementData = compareMeasurementData
        this.currentCompareSensors = []
        this.compareSensorsPresent = false
        // console.log(this.compareMeasurementData)
        Object.keys(this.compareMeasurementData.measurements[0])
          .sort(function(a, b) {
            if (a > b) {
              return -1
            }
            if (a < b) {
              return 1
            }
            return a < b
          })
          .map((quantity) => {
            if (this.COMPARE.indexOf(quantity) > -1) {
              this.currentCompareSensors.push(quantity)
              this.compareSensorsPresent = true
            }
          })
      } else {
        this.compareMeasurementData = null
        this.noCompareChartData = true
      }
      this.loadingCompareData = false
    },
    formatMeasurementData(measurementData, hiveId) {
      if (
        measurementData &&
        measurementData.measurements &&
        measurementData.measurements.length > 0
      ) {
        this.multipleHivesNoChartData = false
        measurementData.measurements.sort(function(a, b) {
          if (a.time < b.time) {
            return -1
          }
          if (a.time > b.time) {
            return 1
          }
          return 0
        })
        this.multipleHivesMeasurementData[hiveId] = measurementData
        if (!this.multipleHivesWithData.includes(hiveId)) {
          this.multipleHivesWithData.push(hiveId) // keep track of for which hiveId data is included, as Object.keys() does not work
        }

        Object.keys(measurementData.measurements[0]).map((quantity) => {
          if (
            this.SENSORS.indexOf(quantity) > -1 &&
            this.currentSensors.indexOf(quantity) === -1
          ) {
            this.currentSensors.push(quantity)
          } else if (
            this.DEBUG.indexOf(quantity) > -1 &&
            this.currentDebugSensors.indexOf(quantity) === -1
          ) {
            this.currentDebugSensors.push(quantity)
          }
        })
      } else if (this.multipleHivesWithData.includes(hiveId)) {
        // if previous data contains measurements for this hiveId, but not for the current measurements request, delete it from the data
        delete this.multipleHivesMeasurementData[hiveId]
        this.multipleHivesWithData.splice(
          this.multipleHivesWithData.indexOf(hiveId),
          1
        )
      }
    },
    getHives(hiveIds) {
      var hivesArray = []
      hiveIds.map((hiveId) => {
        hivesArray.push(this.hivesObject[hiveId])
      })
      return hivesArray
    },
    getSensorLabel(sensordefs, quantity, unit) {
      var label =
        this.getSensorName(sensordefs, quantity) +
        (unit !== '-' && unit !== '' && unit !== null ? ' (' + unit + ')' : '')

      return label.replace(/^0/, '')
    },
    getSensorName(sensordefs, quantity) {
      var trans =
        sensordefs[quantity] && sensordefs[quantity].name !== null
          ? sensordefs[quantity].name
          : this.$i18n.t(quantity)

      var hive =
        ' (' +
        (quantity.indexOf('mean_') === -1
          ? this.defaultHiveName
          : this.$i18n.tc('selected_hive', this.initSelectedHives.length)) +
        ')'
      return trans + hive
    },
    loadCompareData(
      init = false,
      interval = null,
      timeIndex = null,
      relativeInterval = null
    ) {
      if (init) {
        this.comparingData = true
      }
      if (this.comparingData && this.cardExpanded) {
        var i = interval !== null ? interval : this.interval
        var t = timeIndex !== null ? timeIndex : this.timeIndex
        var r =
          relativeInterval !== null ? relativeInterval : this.relativeInterval
        if (
          this.showCompareSection &&
          this.permissions.includes('hive-compare')
        ) {
          this.sensorCompareMeasurementRequest(i, t, r)
        }
        if (
          this.showMultipleSection &&
          this.permissions.includes('multiple-hives-charts')
        ) {
          this.getMultipleHivesMeasurements(i, t, r)
        }
      }
    },
    selectHive(id) {
      if (!this.selectedHives.includes(id)) {
        this.selectedHives.push(id)
      } else {
        this.selectedHives.splice(this.selectedHives.indexOf(id), 1)
      }
      this.loadCompareData(true)
    },
    selectHives(hives) {
      this.initSelectedHives = [...hives]
      this.selectedHives = [...hives]
      this.loadCompareData(true)
    },
    setPeriodToDate(date) {
      this.$emit('set-period-to-date', date)
    },
    toggleCardExpanded(bool) {
      this.cardExpanded = bool
      if (this.cardExpanded) {
        this.loadCompareData()
      }
    },
    toggleChartInfo(index) {
      if (this.chartInfo.indexOf(index) > -1) {
        this.chartInfo.splice(this.chartInfo.indexOf(index), 1)
      } else {
        this.chartInfo.push(index)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.compare-hives {
  width: 100%;
}

.expandable-section-bar {
  width: 100%;
}

.expandable-section {
  @extend .rounded-border;
  border: thin solid rgba(0, 0, 0, 0.12);
  padding: 4px;
  margin-left: 4px;
  margin-right: 4px;
}
</style>
