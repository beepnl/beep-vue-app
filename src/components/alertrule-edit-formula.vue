<!-- eslint-disable vue/camelcase -->
<template>
  <div class="mb-4">
    <v-row class="mx-0">
      <v-col cols="12" class="rounded-border accent-border">
        <v-icon
          v-if="multipleFormulas"
          class="accent--text float-right mr-n1"
          @click="deleteFormula(index)"
          >mdi-close</v-icon
        >
        <v-row>
          <v-col
            v-if="multipleFormulas"
            :class="'d-flex ' + (mobile ? 'align-start' : 'align-center')"
            cols="2"
            sm="1"
          >
            <div>
              <v-btn
                class="ml-n2 mr-sm-3 mx-md-1 cursor-default"
                fab
                small
                dark
                color="accent"
              >
                <v-icon class="ml-n1" dark>
                  {{ getLetter(index) }}
                </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col
            cols="10"
            :sm="multipleFormulas ? 12 : 8"
            :md="multipleFormulas ? 2 : 3"
          >
            <div class="d-flex justify-space-between">
              <div
                class="beep-label mb-0 mt-3px"
                v-html="$tc('Measurement', 1)"
              ></div>
              <v-switch
                v-model="showAllMeasurements"
                class="pt-3 mt-n3"
                :label="$t('show_all') + (showAllMeasurements ? '*' : '')"
                hide-details
              ></v-switch>
            </div>
            <v-select
              v-model="formula.measurement_id"
              :items="
                showAllMeasurements
                  ? allSensorMeasurements
                  : defaultSensorMeasurements
              "
              :item-text="getText"
              item-value="id"
              :placeholder="
                `${$t('Select')} ${$tc(
                  'measurement',
                  // eslint-disable vue/comma-dangle
                  1
                )} ...`
              "
              class="pt-0 mt-n1"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
            <div
              v-if="showAllMeasurements"
              class="beep-label mt-n4 mb-3"
              v-text="$t('only_active_if_measurement_present')"
            ></div>
            <div
              v-if="measurement.data_source_type !== defaultSourceType"
              class="font-small mt-n4"
            >
              {{ $t('Source') + ': ' + $t(measurement.data_source_type) }}
              <v-icon
                class="mdi mdi-information ml-1"
                dark
                small
                :color="showSourceLink ? 'accent' : 'grey'"
                @click="showSourceLink = !showSourceLink"
              ></v-icon>
            </div>
            <span v-if="showSourceLink" class="font-small color-accent">
              <a :href="measurement.data_repository_url" target="_blank">{{
                measurement.data_repository_url
              }}</a></span
            >
          </v-col>

          <v-col cols="6" sm="4" md="2">
            <v-select
              v-model="formula.calculation"
              :items="calculations"
              item-text="full"
              item-value="short"
              :placeholder="`${$t('Select')} ${$t('calculation')} ...`"
              :label="$t('Calculation')"
              :rules="requiredRule"
              :disabled="formula.period_minutes === 0"
              @input="setAlertRuleEdited(true)"
            ></v-select>
            <div
              v-if="formula.period_minutes === 0"
              class="font-small mt-n3 mb-3"
              v-text="$t('Not_relevant_for_period_zero')"
            ></div>
            <!-- <div
              v-else
              class="beep-label mt-n4 mb-3"
              v-text="
                momentHumanizeDuration(
                  formula.period_minutes,
                  'minutes',
                  calcPrefix
                )
              "
            ></div> -->
          </v-col>

          <v-col cols="6" sm="4" md="2">
            <v-select
              v-model="formula.comparison"
              :items="comparisons"
              :item-text="getComparisonText"
              item-value="short"
              :placeholder="`${$t('Select')} ${$t('comparison')} ...`"
              :label="$t('Comparison')"
              :rules="requiredRule"
              :disabled="measurement.data_source_type !== defaultSourceType"
              @input="setAlertRuleEdited(true)"
            ></v-select>
            <div
              v-if="measurement.data_source_type !== defaultSourceType"
              class="font-small mt-n3 mb-3"
              v-text="$t('Only_comparison_available_for_source_type')"
            ></div>
            <div
              v-if="formula.comparison === 'abs_dif'"
              class="font-small mt-n4 mb-3"
              v-text="$t('Absolute_value_of_dif_explanation')"
            ></div>
          </v-col>

          <v-col cols="12" sm="4" md="2" class="d-flex justify-start">
            <div class="d-flex flex-column mt-3px">
              <div class="d-flex">
                <div
                  class="beep-label"
                  v-text="$t('period') + ' (' + $tc('minute', 2) + ')'"
                ></div>
                <v-icon
                  class="ml-3 mb-1"
                  color="accent"
                  small
                  @click="showPeriodOverlay = true"
                  >mdi-calculator</v-icon
                >
              </div>
              <el-input-number
                v-model="formula.period_minutes"
                :step="1"
                :min="0"
                size="small"
                @change="setPeriodMinutesEdited(true)"
                @input.native="setPeriodMinutesEdited(true)"
              ></el-input-number>

              <v-radio-group
                v-if="hasFutureProp"
                v-model="formula.future"
                :disabled="formula.period_minutes === 0"
                class="mt-1 ml-n1"
                dense
              >
                <v-radio
                  v-for="(item, i) in futureItems"
                  :key="'f-' + i"
                  :label="item.label"
                  :value="item.value"
                >
                  <template v-slot:label>
                    <span
                      class="ml-n1 beep-label mb-0"
                      v-text="item.label"
                    ></span>
                  </template>
                </v-radio>
              </v-radio-group>

              <div
                :class="'font-small mb-3 ' + (hasFutureProp ? 'mt-n2' : 'mt-1')"
                >{{
                  humanizeMinutes(
                    formula.period_minutes,
                    true,
                    hasFutureProp && formula.future
                  )
                }}
              </div>
            </div>
          </v-col>

          <v-overlay :value="showPeriodOverlay">
            <v-container class="minutes-calculator">
              <v-row>
                <v-col cols="12">
                  <v-toolbar dense light flat>
                    <div
                      class="font-weight-bold mr-8"
                      v-text="$t('Minutes_calculator')"
                    ></div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-icon class="mr-1" @click="showPeriodOverlay = false"
                        >mdi-close</v-icon
                      >
                    </v-toolbar-items>
                  </v-toolbar>

                  <div class="d-flex flex-column pa-3">
                    <div
                      v-for="(period, k) in periods"
                      :key="'p-' + k"
                      class="d-flex align-center mb-1"
                    >
                      <el-input-number
                        v-model="periodValues[period.term]"
                        :step="1"
                        :min="0"
                        size="small"
                      ></el-input-number>
                      <div
                        class="ml-2"
                        v-text="$tc(period.term, periodValues[period.term])"
                      ></div>
                    </div>
                  </div>

                  <v-toolbar dense light flat>
                    <div
                      class="font-weight-bold color-accent"
                      v-text="totalPeriodMinutes + ' ' + $tc('minute', 2)"
                    ></div>
                    <v-spacer></v-spacer>
                    <v-icon
                      class="mr-1"
                      color="accent"
                      @click="
                        ;(formula.period_minutes = totalPeriodMinutes),
                          (showPeriodOverlay = false)
                      "
                      >mdi-check</v-icon
                    >
                  </v-toolbar>
                </v-col>
              </v-row>
            </v-container>
          </v-overlay>

          <v-col cols="6" sm="4" md="1">
            <v-select
              v-model="formula.comparator"
              :items="comparators"
              item-text="short"
              item-value="short"
              :label="$t('Comparator')"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="6" sm="4" md="2" xl="1" class="d-flex justify-start">
            <div class="mt-3px">
              <div
                :class="`beep-label ${thresholdValueIsNaN ? 'red--text' : ''}`"
                v-text="$t('Threshold_value') + ' (' + measurementUnit + ')'"
              ></div>
              <el-input-number
                v-model="formula.threshold_value"
                :step="formula.calculation === 'cnt' ? 1 : 0.1"
                :precision="formula.calculation === 'cnt' ? 0 : 1"
                :step-strictly="true"
                size="small"
                @change="setAlertRuleEdited(true)"
                @input.native="
                  convertComma($event, formula, 'threshold_value', 1),
                    setAlertRuleEdited(true)
                "
              ></el-input-number>
              <div v-if="thresholdValueIsNaN" class="v-text-field__details mt-1"
                ><div class="v-messages theme--light error--text" role="alert"
                  ><div class="v-messages__wrapper"
                    ><div class="v-messages__message">{{
                      this.$i18n.t('this_field') +
                        ' ' +
                        this.$i18n.t('is_required')
                    }}</div></div
                  ></div
                ></div
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="notFinalFormula" class="text-center">
      <v-col cols="12" class="ml-1 mb-n1">
        <v-btn-toggle
          v-model="formula.logical"
          mandatory
          borderless
          dense
          @change="toggleAllLogicals($event)"
        >
          <v-btn value="and">
            {{ $t('and') }}
          </v-btn>
          <v-btn value="or">
            {{ $t('or') }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { momentHumanize } from '@mixins/momentMixin'
import { mapGetters } from 'vuex'
import { alertRuleEditHelpers, convertComma } from '@mixins/methodsMixin'

export default {
  mixins: [alertRuleEditHelpers, convertComma, momentHumanize],
  props: {
    formula: {
      type: Object,
      default: null,
      required: true,
    },
    calculationMinutesValue: {
      type: Number,
      default: null,
      required: false,
    },
    index: {
      type: Number,
      default: null,
      required: false,
    },
    nrOfFormulas: {
      type: Number,
      default: null,
      required: false,
    },
  },
  data: () => ({
    defaultSourceType: 'db_influx',
    showAllMeasurements: false,
    showPeriodOverlay: false,
    periodValues: {
      hour: 0,
      day: 0,
      week: 0,
      month: 0,
    },
    showSourceLink: false,
  }),
  computed: {
    ...mapGetters('alerts', ['periodMinutesEdited']),
    ...mapGetters('taxonomy', ['alertRulesList']),
    calcPrefix() {
      var translateTerm = this.alertRulesList.calculations[
        this.formula.calculation
      ]
      return this.$i18n.t(translateTerm) + ' ' + this.$i18n.t('of') + ' '
    },
    futureItems() {
      return [
        {
          label: this.$i18n.t('Period_past'),
          value: false,
        },
        {
          label: this.$i18n.t('Period_future'),
          value: true,
        },
      ]
    },
    measurement() {
      return this.allSensorMeasurements.filter(
        (measurement) => measurement.id === this.formula.measurement_id
      )[0]
    },
    measurementUnit() {
      return this.formula.calculation === 'cnt'
        ? this.$i18n.t('times')
        : this.measurement !== undefined
        ? this.measurement.unit
        : ''
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    multipleFormulas() {
      return this.nrOfFormulas > 1
    },
    notFinalFormula() {
      return this.index !== this.nrOfFormulas - 1
    },
    periodMinutes() {
      // make formula.period_minutes interpretable for watch hook
      return this.formula.period_minutes
    },
    periods() {
      return [
        { term: 'hour', minutes: 60 },
        { term: 'day', minutes: 1440 },
        { term: 'week', minutes: 10080 },
        { term: 'month', minutes: 43200 },
      ]
    },
    hasFutureProp() {
      return this.measurement.future === 1
    },
    thresholdValueIsNaN() {
      return isNaN(this.formula.threshold_value)
    },
    totalPeriodMinutes() {
      var total = 0
      this.periods.map((period) => {
        total += period.minutes * this.periodValues[period.term]
      })
      return total
    },
  },
  watch: {
    calculationMinutesValue() {
      if (!this.periodMinutesEdited) {
        this.formula.period_minutes = this.calculationMinutesValue // set period_minutes equal to calculation_minutes but ONLY if period_minutes has not yet been edited
      }
    },
    measurement() {
      if (this.measurement.data_source_type !== this.defaultSourceType) {
        this.formula.comparison = 'val'
      }
    },
    periodMinutes() {
      if (this.periodMinutes === 0) {
        this.formula.calculation = 'ave'
        this.formula.future = false
      }
    },
  },
  methods: {
    deleteFormula(index) {
      this.$emit('delete-formula', index)
    },
    getComparisonText(item) {
      return item.full + (item.short === 'abs_dif' ? '**' : '')
    },
    getText(item) {
      return item.label + ' (' + item.abbreviation + ')'
    },
    toggleAllLogicals(value) {
      this.$emit('toggle-all-logicals', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.minutes-calculator {
  background-color: $color-white;
  color: $color-grey-dark;
  border-radius: 4px;
  max-width: 90vw !important;
}
</style>
