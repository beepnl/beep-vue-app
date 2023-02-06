<template>
  <v-row>
    <v-col v-if="multipleFormulas" cols="6" sm="1" md="1">
      <v-btn class="mx-2 cursor-default" fab small dark color="accent">
        <v-icon dark>
          {{ getLetter(index) }}
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <div class="d-flex justify-space-between">
        <div class="beep-label" v-html="$tc('Measurement', 1)"></div>
        <v-switch
          v-model="showAllMeasurements"
          class="pt-2 mt-n3"
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

    <v-col cols="12" sm="6" md="3">
      <v-select
        v-model="formula.calculation"
        :items="calculations"
        item-text="full"
        item-value="short"
        :placeholder="`${$t('Select')} ${$t('calculation')} ...`"
        :label="$t('Calculation')"
        :rules="requiredRule"
        :disabled="calculationMinutes === 0"
        @input="setAlertRuleEdited(true)"
      ></v-select>
      <div
        v-if="calculationMinutes === 0"
        class="beep-label mt-n4 mb-3"
        v-text="$t('not_relevant_for_immediate_calculation')"
      ></div>
      <div
        v-else
        class="beep-label mt-n4 mb-3"
        v-text="
          momentDurationInHours(calculationMinutes, 'minutes', calcPrefix)
        "
      ></div>
    </v-col>

    <v-col cols="12" sm="5" md="2">
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

    <v-col cols="6" sm="3" md="1">
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

    <v-col cols="6" sm="3" md="2" class="d-flex justify-start">
      <div>
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
                this.$i18n.t('this_field') + ' ' + this.$i18n.t('is_required')
              }}</div></div
            ></div
          ></div
        >
      </div>
      <!-- <span class="ml-1 mt-6">{{ measurementUnit }}</span> -->
    </v-col>

    <v-col v-if="notFinalFormula" cols="12" class="pt-0 mt-n4">
      <v-btn-toggle v-model="formula.logical" rounded dense>
        <v-btn value="and">
          {{ $t('and') }}
        </v-btn>
        <v-btn value="or">
          {{ $t('or') }}
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
import { momentHumanizeHours } from '@mixins/momentMixin'
import { mapGetters } from 'vuex'
import { convertComma } from '@mixins/methodsMixin'

export default {
  mixins: [convertComma, momentHumanizeHours],
  props: {
    formula: {
      type: Object,
      default: null,
      required: true,
    },
    calculationMinutes: {
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
  }),
  computed: {
    ...mapGetters('taxonomy', ['alertRulesList', 'sensorMeasurementsList']),
    allSensorMeasurements() {
      var measurementTypes = this.sensorMeasurementsList

      // check if measurement type is NOT a weather measurement and if translation exists, otherwise don't display the measurement type
      measurementTypes = measurementTypes.filter(
        (measurementType) =>
          measurementType.weather === 0 &&
          this.$i18n.te(measurementType.abbreviation) === true
      )

      // add translation as label property
      measurementTypes.map((measurementType) => {
        measurementType.label = this.$i18n.t(measurementType.abbreviation)
      })

      // sort by label
      var sortedSMs = measurementTypes.slice().sort(function(a, b) {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
          return 1
        }
        if (b.label.toLowerCase() > a.label.toLowerCase()) {
          return -1
        }
        return 0
      })
      return sortedSMs
    },
    calcPrefix() {
      var translateTerm = this.alertRulesList.calculations[
        this.formula.calculation
      ]
      return this.$i18n.t(translateTerm) + ' ' + this.$i18n.t('of') + ' '
    },
    calculations() {
      return this.formatFromTaxonomyObject(this.alertRulesList.calculations)
    },
    comparators() {
      return this.formatFromTaxonomyObject(this.alertRulesList.comparators)
    },
    comparisons() {
      return this.formatFromTaxonomyObject(this.alertRulesList.comparisons)
    },
    defaultSensorMeasurements() {
      // check if measurement type is a default measurement type for creating alert rules
      return this.allSensorMeasurements.filter(
        (measurementType) => measurementType.show_in_alerts
      )
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
    requiredRule: function() {
      return [
        (v) =>
          !!v || this.$i18n.t('this_field') + ' ' + this.$i18n.t('is_required'),
      ]
    },
    thresholdValueIsNaN() {
      return isNaN(this.formula.threshold_value)
    },
  },
  methods: {
    formatFromTaxonomyObject(object) {
      var formattedArray = []
      Object.entries(object).map(([key, value]) => {
        formattedArray.push({
          short: key,
          full: this.$i18n.t(value),
        })
      })
      return formattedArray
    },
    getComparisonText(item) {
      return item.full + (item.short === 'abs_dif' ? '**' : '')
    },
    getLetter(index) {
      var letters = ['A', 'B', 'C', 'D']
      return letters[index]
    },
    getText(item) {
      return item.label + ' (' + item.abbreviation + ')'
    },
    setAlertRuleEdited(bool) {
      this.$store.commit('alerts/setData', {
        prop: 'alertRuleEdited',
        value: bool,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
