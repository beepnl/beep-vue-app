<template>
  <Layout :title="getTitle()">
    <v-form ref="form" v-model="valid">
      <v-toolbar class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-icon
          v-if="!alertruleCreateMode"
          dark
          class="mr-2"
          color="red"
          @click="confirmDeleteAlertRule"
          >mdi-delete</v-icon
        >
        <v-btn
          tile
          outlined
          color="primary"
          :class="
            `${alertruleCreateMode ? 'save-button-mobile-wide' : ''} mr-1`
          "
          @click.prevent="saveAlertRule"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') + ' ' + $tc('alertrule', 1) }}
        </v-btn>
      </v-toolbar>

      <v-container class="content-container">
        <v-row v-if="activeAlertRule">
          <v-col cols="12" sm="4" lg="5">
            <div class="beep-label" v-text="$t('Name')"></div>
            <v-text-field
              v-model="activeAlertRule.name"
              class="alertrule-edit-name mb-sm-3"
              counter="30"
              :rules="requiredRule"
              required
              @input="validateText($event, 'name', 30)"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="8" lg="7">
            <div class="beep-label" v-text="$t('Description')"></div>
            <v-text-field
              v-model="activeAlertRule.description"
              class="alertrule-edit-name mb-sm-3"
              counter="100"
              @input="validateText($event, 'description', 100)"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="activeAlertRule">
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="activeAlertRule.measurement_id"
              :items="sortedSensorMeasurements"
              :item-text="getText"
              item-value="id"
              :placeholder="
                `${$t('Select')} ${$tc(
                  'measurement',
                  // eslint-disable-next-line vue/comma-dangle
                  1
                )} ...`
              "
              :label="$tc('Measurement', 1)"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="activeAlertRule.calculation"
              :items="calculations"
              item-text="full"
              item-value="short"
              :placeholder="`${$t('Select')} ${$t('calculation')} ...`"
              :label="$t('Calculation')"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="activeAlertRule.comparison"
              :items="comparisons"
              item-text="full"
              item-value="short"
              :placeholder="`${$t('Select')} ${$t('comparison')} ...`"
              :label="$t('Comparison')"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="6" sm="3" md="1">
            <v-select
              v-model="activeAlertRule.comparator"
              :items="comparators"
              :label="$t('Comparator')"
              :rules="requiredRule"
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="6" sm="3" md="2">
            <div
              :class="`beep-label ${thresholdValueIsNaN ? 'red--text' : ''}`"
              v-text="$t('Threshold_value')"
            ></div>
            <VueNumericInput
              v-model="activeAlertRule.threshold_value"
              class="vue-numeric-input--small"
              :step="0.1"
              :precision="1"
              @input="setAlertRuleEdited(true)"
            >
            </VueNumericInput>
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
          </v-col>
        </v-row>

        <v-row v-if="activeAlertRule">
          <v-col cols="6" sm="4" md="3">
            <div class="beep-label" v-text="$t('Calculation_minutes')"></div>
            <VueNumericInput
              v-model="activeAlertRule.calculation_minutes"
              class="vue-numeric-input--small"
              @input="setAlertRuleEdited(true)"
            >
            </VueNumericInput>
            <div
              v-if="calculationMinutesIsNaN"
              class="v-text-field__details mt-1"
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
          </v-col>

          <v-col cols="12" sm="5" md="3">
            <div class="beep-label" v-text="$t('Alert_on_occurences')"></div>
            <v-select
              v-model="activeAlertRule.alert_on_occurences"
              :items="occurences"
              item-text="label"
              item-value="id"
              :placeholder="$t('Select') + '...'"
              :hint="$t('Alert_on_occurences_hint')"
              class="pt-0"
              persistent-hint
              @input="setAlertRuleEdited(true)"
            ></v-select>
          </v-col>

          <v-col cols="2" sm="1">
            <div class="beep-label" v-text="$t('Active')"></div>
            <v-checkbox
              v-model="activeAlertRule.active"
              color="primary"
              class="mt-1"
              @change="setAlertRuleEdited(true)"
            ></v-checkbox>
          </v-col>

          <v-col cols="4" sm="2">
            <div class="beep-label" v-text="$t('Alert_via_email')"></div>
            <v-checkbox
              v-model="activeAlertRule.alert_via_email"
              color="primary"
              class="mt-1"
              @change="setAlertRuleEdited(true)"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row v-if="activeAlertRule">
          <v-col cols="12" sm="6" lg="4">
            <div class="beep-label" v-text="$t('Exclude_months')"></div>
            <Treeselect
              v-model="activeAlertRule.exclude_months"
              :options="months"
              :placeholder="`${$t('Select')} ${$t('months')}`"
              :no-results-text="`${$t('no_results')}`"
              multiple
              @input="setAlertRuleEdited(true)"
            />
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <div class="beep-label" v-text="$t('Exclude_hours')"></div>
            <Treeselect
              v-model="activeAlertRule.exclude_hours"
              :options="hours"
              :placeholder="`${$t('Select')} ${$t('hours')}`"
              :no-results-text="`${$t('no_results')}`"
              multiple
              @input="setAlertRuleEdited(true)"
            />
          </v-col>

          <v-col v-if="devices.length > 1" cols="12" lg="4">
            <div class="beep-label" v-text="$t('Exclude_hives')"></div>
            <Treeselect
              v-model="activeAlertRule.exclude_hive_ids"
              :options="sortedApiaries"
              :disable-branch-nodes="true"
              :default-expand-level="1"
              :normalizer="normalizerApiary"
              :placeholder="`${$t('Select')} ${$tc('hive', 2)}`"
              :no-results-text="`${$t('no_results')}`"
              multiple
              @input="setAlertRuleEdited(true)"
            />
            <div
              class="beep-label mt-1"
              v-text="$t('Exclude_hives_details')"
            ></div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueNumericInput from 'vue-numeric-input'

export default {
  components: {
    Confirm,
    Layout,
    Treeselect,
    VueNumericInput,
  },
  data: function() {
    return {
      comparators: ['=', '<', '>', '<=', '>='],
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      normalizerApiary(node) {
        return {
          label: node.name,
        }
      },
      activeAlertRule: null,
      valid: false,
      showLoadingIcon: false,
      newAlertRuleNumber: 1,
      newAlertRuleLocation: null,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRules', 'alertRuleEdited']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    alertruleCreateMode() {
      return this.$route.name === 'alertrule-create'
    },
    calculations() {
      return [
        {
          short: 'min',
          full: this.$i18n.t('Minimum'),
        },
        {
          short: 'max',
          full: this.$i18n.t('Maximum'),
        },
        {
          short: 'ave',
          full: this.$i18n.t('Average'),
        },
        {
          short: 'der',
          full: this.$i18n.t('Derivative'),
        },
        {
          short: 'cnt',
          full: this.$i18n.t('Count'),
        },
      ]
    },
    calculationMinutesIsNaN() {
      return isNaN(this.activeAlertRule.calculation_minutes)
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
    hours() {
      var hoursArray = []
      for (var i = 0; i < 24; i++) {
        hoursArray.push({
          id: i,
          label: i,
        })
      }
      return hoursArray
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    months() {
      var monthsArray = []
      for (var i = 1; i < 13; i++) {
        monthsArray.push({
          id: i,
          label: this.$i18n.t('monthsShort')[i - 1],
        })
      }
      return monthsArray
    },
    occurences() {
      var occArray = []
      for (var i = 1; i < 11; i++) {
        occArray.push({
          id: i,
          label:
            i === 1
              ? this.$i18n.t('Direct')
              : this.$i18n.t('After') + ' ' + i + ' ' + this.$i18n.t('times'),
        })
      }
      return occArray
    },
    requiredRule: function() {
      return [
        (v) =>
          !!v || this.$i18n.t('this_field') + ' ' + this.$i18n.t('is_required'),
      ]
    },
    sortedApiaries() {
      var treeselectArray = []

      this.apiaries.map((apiary, index) => {
        var hivesWithSensors = apiary.hives.filter(
          (hive) => hive.sensors.length > 0
        )
        if (hivesWithSensors.length > 0) {
          treeselectArray.push({
            id: apiary.id,
            name: apiary.name,
            children: hivesWithSensors,
          })
        }
      })

      var sortedApiaries = treeselectArray.slice().sort(function(a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      return sortedApiaries
    },
    sortedSensorMeasurements() {
      var sortedSMs = this.sensorMeasurementsList.slice().sort(function(a, b) {
        if (a.pq_name_unit > b.pq_name_unit) {
          return 1
        }
        if (b.pq_name_unit > a.pq_name_unit) {
          return -1
        }
        return 0
      })
      return sortedSMs
    },
    thresholdValueIsNaN() {
      return isNaN(this.activeAlertRule.threshold_value)
    },
    unauthorizedText() {
      return (
        this.$i18n.t('sorry') +
        ', ' +
        this.$i18n.tc('alertrule', 1) +
        ' "' +
        this.activeAlertRule.name +
        '" ' +
        this.$i18n.t('not_editable')
      )
    },
  },
  created() {
    this.readApiariesAndGroupsIfNotPresent()
    this.readTaxonomy().then(() => {
      // If alertrule-create route is used, make empty alertrule object
      if (this.alertruleCreateMode) {
        this.activeAlertRule = {
          name:
            this.$i18n.tc('alertrule', 1) + ' ' + (this.alertRules.length + 1),
          description: '',
          measurement_id: this.sensorMeasurementsList[0].id,
          calculation: 'ave',
          calculation_minutes: 60,
          comparator: '<',
          comparison: 'val',
          threshold_value: 0,
          exclude_months: [],
          exclude_hours: [],
          exclude_hive_ids: [],
          active: 1,
          alert_via_email: 0,
          alert_on_occurences: 1,
        }
        // Else retrieve to-be-edited alertrule
      } else {
        this.readAlertRule()
      }
    })
  },
  methods: {
    async createAlertRule() {
      if (
        this.$refs.form.validate() &&
        !this.thresholdValueIsNaN &&
        !this.calculationMinutesIsNaN
      ) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest(
            '/alert-rules',
            this.activeAlertRule
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.readAlertRules().then(() => {
              this.$router.push({
                name: 'alerts',
                // query: { search: this.activeAlertRule.location }, TODO: query to open alertrule section!
              })
            })
          }, 50) // wait for API to update alertrules
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
            const msg = error.response.data.message
            this.snackbar.text = msg
          } else {
            console.log('Error: ', error)
            this.snackbar.text = this.$i18n.t('something_wrong')
          }
          this.snackbar.show = true
        }
      }
    },
    async deleteAlertRule() {
      try {
        const response = await Api.deleteRequest(
          '/alert-rules/',
          this.activeAlertRule.id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.readAlertRules().then(() => {
            this.$router.push({
              name: 'alerts',
              // query: { search: this.activeAlertRule.location }, TODO: query to open alertrule section!
            })
          })
        }, 50) // wait for API to update alertrules
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
      }
    },
    async readAlertRule() {
      try {
        const response = await Api.readRequest('/alert-rules/', this.id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'alertrule' } })
        }
        const alertrule = response.data
        this.activeAlertRule = alertrule
        this.setAlertRuleEdited(false)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 404) {
            this.$router.push({
              name: '404',
              params: { resource: 'alertrule' },
            })
          }
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
    async readApiariesAndGroupsIfNotPresent() {
      if (this.apiaries.length === 0 && this.groups.length === 0) {
        // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
        try {
          const responseApiaries = await Api.readRequest('/locations')
          const responseGroups = await Api.readRequest('/groups')
          this.$store.commit(
            'locations/setApiaries',
            responseApiaries.data.locations
          )
          this.$store.commit('groups/setGroups', responseGroups.data.groups)
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
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
    async updateAlertRule() {
      if (
        this.$refs.form.validate() &&
        !this.thresholdValueIsNaN &&
        !this.calculationMinutesIsNaN
      ) {
        this.showLoadingIcon = true
        try {
          const response = await Api.updateRequest(
            '/alert-rules/',
            this.activeAlertRule.id,
            this.activeAlertRule
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.readAlertRules().then(() => {
              this.$router.push({
                name: 'alerts',
                // query: { search: this.activeAlertRule.location }, TODO: query to open alertrule section!
              })
            })
          }, 50) // wait for API to update alertrules
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
            const msg = error.response.data.message
            this.snackbar.text = msg
          } else {
            console.log('Error: ', error)
            this.snackbar.text = this.$i18n.t('something_wrong')
          }
          this.snackbar.show = true
        }
      }
    },
    confirmDeleteAlertRule() {
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_alertrule'),
          this.$i18n.t('delete_alertrule') +
            ' "' +
            this.activeAlertRule.name +
            '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteAlertRule()
        })
        .catch((reject) => {
          return true
        })
    },
    getText(item) {
      return item.pq_name_unit + ' (' + item.abbreviation + ')'
    },
    getTitle() {
      if (this.alertruleCreateMode) {
        return this.$i18n.t('create_new') + ' ' + this.$i18n.tc('alertrule', 1)
      } else if (this.activeAlertRule !== null) {
        return this.$i18n.t('edit') + ' ' + this.$i18n.tc('alertrule', 1)
      } else {
        return this.$i18n.t('edit') + '...'
      }
    },
    saveAlertRule() {
      if (this.alertruleCreateMode) {
        this.createAlertRule()
      } else {
        this.updateAlertRule()
      }
    },
    setAlertRuleEdited(bool) {
      this.$store.commit('alerts/setData', {
        prop: 'alertRuleEdited',
        value: bool,
      })
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeAlertRule[property] = value
      }
      this.setAlertRuleEdited(true)
    },
  },
}
</script>

<style lang="scss">
.alertrule-edit-name {
  padding-top: 0 !important;
  font-size: 1.2rem;
  // @include for-tablet-portrait-up {
  //   margin-top: 19px;
  // }
  @include for-tablet-landscape-up {
    font-size: 1.5rem;
  }

  input {
    // min-height: 36px;
    padding-top: 0 !important;
  }
}
</style>
