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
                <v-icon dark>
                  {{ getLetter(index) }}
                </v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="10" sm="8" md="2">
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
              class="beep-label mt-n4 mb-3"
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
              @input="setAlertRuleEdited(true)"
            ></v-select>
            <div
              v-if="formula.comparison === 'abs_dif'"
              class="beep-label mt-n4 mb-3"
              v-text="$t('Absolute_value_of_dif_explanation')"
            ></div>
          </v-col>

          <v-col cols="12" sm="4" md="2" xl="1" class="d-flex justify-start">
            <div class="mt-3px">
              <div
                class="beep-label"
                v-text="$t('period') + ' (' + $tc('minute', 2) + ')'"
              ></div>
              <el-input-number
                v-model="formula.period_minutes"
                :step="1"
                :min="0"
                size="small"
                @change="setPeriodMinutesEdited(true)"
                @input.native="setPeriodMinutesEdited(true)"
              ></el-input-number>
              <div class="beep-label mt-1 mb-3"
                >{{ humanizeMinutes(formula.period_minutes, true) }}
              </div>
            </div>
          </v-col>

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
        <v-btn-toggle v-model="formula.logical" mandatory borderless dense>
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
    showAllMeasurements: false,
    periodMinutesEdited: false,
  }),
  computed: {
    ...mapGetters('taxonomy', ['alertRulesList']),
    calcPrefix() {
      var translateTerm = this.alertRulesList.calculations[
        this.formula.calculation
      ]
      return this.$i18n.t(translateTerm) + ' ' + this.$i18n.t('of') + ' '
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
    thresholdValueIsNaN() {
      return isNaN(this.formula.threshold_value)
    },
  },
  watch: {
    calculationMinutesValue() {
      if (!this.periodMinutesEdited) {
        this.formula.period_minutes = this.calculationMinutesValue // set period_minutes equal to calculation_minutes but ONLY if period_minutes has not yet been edited
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
    setPeriodMinutesEdited(bool) {
      this.periodMinutesEdited = bool // keep track if user has edited period_minutes, see calculation_minutes watcher
      this.setAlertRuleEdited(bool)
    },
  },
}
</script>

<style lang="scss" scoped></style>
