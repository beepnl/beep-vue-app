<template>
  <Layout :title="$tc('alertrule_default', 2)">
    <v-toolbar class="save-bar" dense light>
      <v-spacer></v-spacer>
      <v-btn
        tile
        outlined
        color="black"
        class="save-button-mobile-wide mr-1"
        :disabled="numberOfSelectedRules === 0"
        @click.prevent="copySelectedAlertRules"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="black"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-content-copy</v-icon>
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
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

    <v-container v-if="ready" class="alertrules-default-content">
      <v-row v-if="alertRulesDefault.length > 0" dense>
        <ScaleTransition :duration="500" group style="width:100%;">
          <v-col
            v-for="(alertRule, j) in alertRulesDefault"
            :key="j"
            cols="12"
            class="alerts-item"
            dense
          >
            <v-card outlined>
              <v-row class="ma-2 d-flex align-center">
                <v-col cols="2" sm="1" class="mr-n2 mr-md-n4 mr-lg-n10">
                  <v-checkbox v-model="alertRule.selected"></v-checkbox>
                </v-col>
                <v-col cols="10" sm="5" md="4">
                  <div class="d-flex flex-column">
                    <span class="alertrule-label">{{ alertRule.name }}</span>
                    <span class="alertrule-text">{{
                      alertRule.description
                    }}</span>
                  </div>
                </v-col>
                <v-col v-if="alertRule" cols="12" sm="6" md="7">
                  <div class="d-flex flex-column">
                    <span class="alertrule-text">{{
                      alertRuleSentence(alertRule)
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </ScaleTransition>
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
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
    Layout,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      alertRulesDefault: [],
      ready: false,
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    comparators() {
      return [
        {
          short: '=',
          full: this.$i18n.t('equal_to'),
        },
        {
          short: '<',
          full: this.$i18n.t('less_than'),
        },
        {
          short: '>',
          full: this.$i18n.t('greater_than'),
        },
        {
          short: '<=',
          full: this.$i18n.t('less_than_or_equal'),
        },
        {
          short: '>=',
          full: this.$i18n.t('greater_than_or_equal'),
        },
      ]
    },
    comparisons() {
      return [
        {
          short: 'val',
          full: this.$i18n.t('Value'),
        },
        {
          short: 'dif',
          full: this.$i18n.t('Difference'),
        },
        {
          short: 'abs',
          full: this.$i18n.t('Absolute_value'),
        },
        {
          short: 'abs_dif',
          full: this.$i18n.t('Absolute_value_of_dif'),
        },
      ]
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
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
      try {
        await Api.postRequest('/alert-rules', alertRule)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readAlertRules() {
      try {
        const response = await Api.readRequest('/alert-rules')
        this.$store.commit('alerts/setData', {
          prop: 'alertRules',
          value: response.data.alert_rules,
        })
        return true
      } catch (error) {
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
        var alertRulesDefault = response.data['alert-rules']
        alertRulesDefault.map((alertRuleDefault) => {
          alertRuleDefault.default_rule = 0
          alertRuleDefault.selected = false
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
    async readTaxonomy() {
      if (this.sensorMeasurementsList.length === 0) {
        try {
          const response = await Api.readRequest('/taxonomy/lists')
          this.$store.commit('taxonomy/setData', {
            prop: 'taxonomyLists',
            value: response.data,
          })
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      }
    },
    alertRuleSentence(alertRule) {
      var sentence = this.$i18n.t('alertrule_main_sentence')
      var replacedSentence = sentence

      var measurement = this.sensorMeasurementsList.filter(
        (measurement) => measurement.id === alertRule.measurement_id
      )[0]

      var replaceWith = {
        calculation: this.$i18n.t(alertRule.calculation),
        comparison: this.comparisons
          .filter((comparison) => comparison.short === alertRule.comparison)[0]
          .full.toLowerCase(),
        measurement_quantity: measurement.pq,
        measurement_unit: measurement.unit,
        comparator: this.comparators.filter(
          (comparator) => comparator.short === alertRule.comparator
        )[0].full,
        threshold_value: alertRule.threshold_value,
        calculation_minutes: parseFloat(
          this.$moment
            .duration(alertRule.calculation_minutes, 'minutes')
            .asHours()
            .toFixed(2)
        ),
      }

      Object.entries(replaceWith).map(([key, value]) => {
        replacedSentence = replacedSentence.replace('[' + key + ']', value)
      })

      if (alertRule.alert_on_occurences === 1) {
        replacedSentence += this.$i18n.t('alertrule_occurences_direct_sentence')
      } else {
        replacedSentence += this.$i18n.t(
          'alertrule_occurences_indirect_sentence'
        )
        replacedSentence = replacedSentence.replace(
          '[alert_on_occurences]',
          alertRule.alert_on_occurences
        )
      }

      if (alertRule.exclude_months !== null) {
        replacedSentence += this.$i18n.t('alertrule_exclude_months_sentence')
        var monthsArray = []
        alertRule.exclude_months.map((month) => {
          monthsArray.push(this.$i18n.t('monthsFull')[month - 1])
        })
        replacedSentence = replacedSentence.replace(
          '[exclude_months]',
          monthsArray.join(', ')
        )
      }

      if (alertRule.exclude_hours !== null) {
        replacedSentence += this.$i18n.t('alertrule_exclude_hours_sentence')
        var hoursString = alertRule.exclude_hours.join(', ')
        replacedSentence = replacedSentence.replace(
          '[exclude_hours]',
          hoursString
        )
      }

      return replacedSentence
    },
    copySelectedAlertRules() {
      this.alertRulesDefault.map((alertRuleDefault) => {
        if (alertRuleDefault.selected) {
          this.copyAlertRule(alertRuleDefault)
        }
      })
      this.showLoadingIcon = false
      setTimeout(() => {
        return this.readAlertRules().then(() => {
          this.$router.push({
            name: 'alerts',
          })
        })
      }, 250) // wait for API to update alertrules
    },
    getText(item) {
      return item.abbreviation + ' (' + item.pq_name_unit + ')'
    },
  },
}
</script>

<style lang="scss" scoped>
.save-bar {
  margin-top: 0 !important;
}

.alertrules-default-content {
  margin-top: 56px;
}

.alertrule-label {
  margin-bottom: 8px;
  font-size: 0.75rem !important;
  font-weight: 600;
  color: $color-grey;
  letter-spacing: 0.0333333333em !important;
  @include for-phone-only {
    font-size: 0.7rem !important;
  }
}

.alertrule-text {
  font-size: 0.75rem !important;
  color: rgba(0, 0, 0, 0.87);
  @include for-tablet-portrait-up {
    font-size: 0.7rem !important;
  }
}

.alertrules-title-row {
  line-height: 1.2rem !important;
  @include for-phone-only {
    line-height: 1rem !important;
  }
  &--border-bottom {
    border-bottom: 1px solid $color-grey-light;
  }
}

.alertrule-table {
  input {
    font-size: 14px !important;
    @include for-phone-only {
      font-size: 12px !important;
    }
  }
}
</style>