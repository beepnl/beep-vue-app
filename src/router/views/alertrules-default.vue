<template>
  <Layout :title="$tc('alertrule_default', 2)">
    <v-toolbar class="save-bar save-bar--back" density="compact" light>
      <v-spacer></v-spacer>
      <v-btn
        color="black"
        class="save-button-mobile-wide mr-1"
        :disabled="numberOfSelectedRules === 0 || showLoadingIcon"
        @click.prevent="copySelectedAlertRules"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="disabled"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" start>mdi-content-copy</v-icon>
        {{
          $t('copy') +
            ' ' +
            numberOfSelectedRules +
            ' ' +
            $tc('alertrule', numberOfSelectedRules)
        }}
      </v-btn>
    </v-toolbar>

    <v-container v-if="!ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <v-container v-if="ready" class="back-content">
      <v-row v-if="alertRulesDefault.length > 0" density="compact">
        <v-scale-transition group style="width:100%;">
          <v-col
            v-for="(alertRule, j) in alertRulesDefault"
            :key="j"
            cols="12"
            class="alerts-item"
            density="compact"
          >
            <v-card>
              <v-row class="ma-2 d-flex align-center">
                <v-col cols="2" sm="1" class="mr-n2 mr-md-n4 mr-lg-n10">
                  <v-checkbox-btn v-model="alertRule.selected"></v-checkbox-btn>
                </v-col>
                <v-col cols="10" sm="5" md="4">
                  <div class="d-flex flex-column">
                    <span class="alertrule-label">{{
                      getTranslation(alertRule.name)
                    }}</span>
                    <span class="alertrule-text">{{
                      getTranslation(alertRule.description)
                    }}</span>
                  </div>
                </v-col>
                <v-col
                  v-if="alertRule"
                  cols="12"
                  sm="6"
                  md="7"
                  class="pt-0 pa-sm-2"
                >
                  <div class="d-flex flex-column">
                    <span class="alertrule-text">{{
                      alertRuleSentence(alertRule)
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-scale-transition>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import { readAlertRules, readTaxonomy } from '@mixins/methodsMixin'
import Confirm from '@/src/components/confirm-dialog.vue'
import Layout from '@/src/router/layouts/back-layout.vue'
import { mapGetters } from 'vuex'
import { momentHumanizeHours } from '@mixins/momentMixin'

export default {
  components: {
    Confirm,
    Layout,
  },
  mixins: [momentHumanizeHours, readAlertRules, readTaxonomy],
  data: function() {
    return {
      alertRulesDefault: [],
      ready: false,
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['alertRulesList', 'sensorMeasurementsList']),
    comparators() {
      return this.formatFromTaxonomy(this.alertRulesList.comparators)
    },
    comparisons() {
      return this.formatFromTaxonomy(this.alertRulesList.comparisons)
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.display.mobile
    },
    numberOfSelectedRules() {
      return this.alertRulesDefault.filter((alertRule) => alertRule.selected)
        .length
    },
  },
  created() {
    this.readDefaultAlertRules().then(() => {
      this.readTaxonomy().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async copyAlertRule(alertRule) {
      this.showLoadingIcon = true
      // translate alert rule name & description if translation is present. (performed here instead of after reading, to keep displayed translation reactive to locale changes)
      alertRule.name = this.getTranslation(alertRule.name)
      alertRule.description = this.getTranslation(alertRule.description)
      try {
        await Api.postRequest('/alert-rules', alertRule)
        this.showLoadingIcon = false
        return true
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readDefaultAlertRules() {
      try {
        const response = await Api.readRequest('/alert-rules-default')
        const alertRulesDefault = response.data['alert-rules']
        alertRulesDefault.map((alertRuleDefault) => {
          alertRuleDefault.default_rule = 0
          alertRuleDefault.selected = false
          return alertRuleDefault // TODO-VUE3 check
        })
        this.alertRulesDefault = alertRulesDefault
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    alertRuleSentence(alertRule) {
      const sentence = this.$i18n.t('alertrule_main_sentence')
      let replacedSentence = sentence

      const measurement = this.sensorMeasurementsList.filter(
        (measurement) => measurement.id === alertRule.measurement_id
      )[0]

      const replaceWith = {
        calculation: this.$i18n.t(alertRule.calculation),
        comparison: this.comparisons
          .filter((comparison) => comparison.short === alertRule.comparison)[0]
          .full.toLowerCase(),
        measurement_quantity:
          measurement !== undefined
            ? this.$i18n.t(measurement.abbreviation)
            : '-',
        measurement_unit:
          alertRule.calculation === 'cnt'
            ? this.$i18n.t('times')
            : measurement !== undefined
            ? measurement.unit
            : '',
        comparator: this.comparators.filter(
          (comparator) => comparator.short === alertRule.comparator
        )[0].short,
        threshold_value: alertRule.threshold_value,
        calculation_minutes: this.momentHumanizeHours(
          alertRule.calculation_minutes,
          false,
          false
        ),
      }

      Object.entries(replaceWith).map(([key, value]) => {
        replacedSentence = replacedSentence.replace('[' + key + ']', value)
        return replacedSentence // TODO-VUE3 check
      })

      replacedSentence += '. ' // alertrule_active_email and no_email_sentence are omitted here

      // if (alertRule.alert_on_occurences === 1) {
      //   replacedSentence += this.$i18n.t('alertrule_occurences_direct_sentence')
      // } else {
      //   replacedSentence += this.$i18n.t(
      //     'alertrule_occurences_indirect_sentence'
      //   )
      //   replacedSentence = replacedSentence.replace(
      //     '[alert_on_occurences]',
      //     alertRule.alert_on_occurences
      //   )
      // }

      if (alertRule.exclude_months.length > 0) {
        replacedSentence += this.$i18n.t('alertrule_exclude_months_sentence')
        const monthsArray = []
        alertRule.exclude_months.map((month) => {
          monthsArray.push(this.$i18n.tm('monthsFull')[month - 1])
          return true // TODO-VUE3 check
        })
        replacedSentence = replacedSentence.replace(
          '[exclude_months]',
          monthsArray.join(', ')
        )
      }

      if (alertRule.exclude_hours.length > 0) {
        replacedSentence += this.$i18n.t('alertrule_exclude_hours_sentence')

        const hoursArray = []
        alertRule.exclude_hours.map((hour) => {
          hoursArray.push(this.alertRulesList.exclude_hours[hour])
          return true // TODO-VUE3 check
        })
        const hoursString = hoursArray.join(', ')

        replacedSentence = replacedSentence.replace(
          '[exclude_hours]',
          hoursString
        )
      }

      return replacedSentence
    },
    async copySelectedAlertRules() {
      await Promise.all(
        this.alertRulesDefault.map(async (alertRuleDefault) => {
          if (alertRuleDefault.selected) {
            await this.copyAlertRule(alertRuleDefault)
            return true
          }
          return true // TODO-VUE3 check
        })
      )

      this.showLoadingIcon = false
      setTimeout(() => {
        return this.readAlertRules().then(() => {
          this.$router.push({
            name: 'alertrules',
          })
        })
      }, 150) // wait for API to update alertrules
    },
    formatFromTaxonomy(array) {
      const formattedArray = []
      Object.entries(array).map(([key, value]) => {
        formattedArray.push({
          short: key,
          full: this.$i18n.t(value),
        })
        return [key, value] // TODO-VUE3 check
      })
      return formattedArray
    },
    getTranslation(term) {
      // check if translation is present, otherwise replace underscores by spaces and return untranslated
      return this.$i18n.te(term)
        ? this.$i18n.t(term)
        : term.replaceAll('_', ' ')
    },
    getText(item) {
      return item.abbreviation + ' (' + item.pq_name_unit + ')'
    },
  },
}
</script>

<style lang="scss" scoped>
.alertrule-label {
  margin-bottom: 8px;
  font-size: 0.875rem !important;
  font-weight: 600;
  color: $color-grey;
  letter-spacing: 0.0333333333em !important;
  @include for-phone-only {
    font-size: 0.75rem !important;
  }
}

.alertrule-text {
  font-size: 0.8125rem !important;
  color: rgba(0, 0, 0, 0.87);
  @include for-phone-only {
    font-size: 0.75rem !important;
  }
}
</style>
