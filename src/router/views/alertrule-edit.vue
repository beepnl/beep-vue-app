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
          color="black"
          :class="
            `${alertruleCreateMode ? 'save-button-mobile-wide' : ''} mr-1`
          "
          :disabled="showLoadingIcon"
          @click.prevent="saveAlertRule"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-toolbar>

      <v-container class="content-container">
        <v-row v-if="activeAlertRule">
          <v-col cols="12">
            <em v-if="!activeAlertRule.active" class="red--text">{{
              $t('alertrule_not_active')
            }}</em>
            <p
              :class="!activeAlertRule.active ? 'color-grey-light' : 'strong'"
              >{{ alertRuleSentence(activeAlertRule) }}</p
            >
          </v-col>
        </v-row>
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

          <v-col cols="12" sm="6" md="2">
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

          <v-col cols="6" sm="3" md="2">
            <v-select
              v-model="activeAlertRule.comparator"
              :items="comparators"
              item-text="full"
              item-value="short"
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
            <el-input-number
              v-model="activeAlertRule.threshold_value"
              :step="0.1"
              :precision="1"
              :step-strictly="true"
              size="small"
              @change="setAlertRuleEdited(true)"
              @input.native="
                convertComma($event, activeAlertRule, 'threshold_value', 1),
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
          </v-col>
        </v-row>

        <v-row v-if="activeAlertRule">
          <v-col cols="6" sm="3">
            <div class="beep-label" v-text="$t('Calculation_minutes')"></div>
            <el-input-number
              v-model="activeAlertRule.calculation_minutes"
              :precision="0"
              :min="15"
              :step-strictly="true"
              size="small"
              @change="setAlertRuleEdited(true)"
              @input.native="
                convertComma($event, activeAlertRule, 'calculation_minutes', 0),
                  setAlertRuleEdited(true)
              "
            ></el-input-number>
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
              color="accent"
              class="mt-1"
              @change="setAlertRuleEdited(true)"
            ></v-checkbox>
          </v-col>

          <v-col cols="6" sm="3" md="2">
            <div class="beep-label" v-text="$t('Alert_via_email')"></div>
            <v-checkbox
              v-model="activeAlertRule.alert_via_email"
              color="accent"
              class="mt-1"
              @change="setAlertRuleEdited(true)"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row v-if="activeAlertRule">
          <v-col cols="12" sm="6" lg="4">
            <div class="beep-label" v-html="$t('Exclude_months')"
              ><span>{{}}</span
            ></div>
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
            <div class="beep-label" v-html="$t('Exclude_hours')"></div>
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
            <div class="beep-label" v-html="$t('Exclude_hives')"></div>
            <Treeselect
              v-model="activeAlertRule.exclude_hive_ids"
              :options="sortedDevices"
              :disable-branch-nodes="true"
              :default-expand-level="1"
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
      <v-btn color="accent" text @click="snackbar.show = false">
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
import {
  convertComma,
  readAlertRules,
  readDevicesIfNotPresent,
  readTaxonomy,
} from '@mixins/methodsMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Confirm,
    Layout,
    Treeselect,
  },
  mixins: [convertComma, readAlertRules, readDevicesIfNotPresent, readTaxonomy],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
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
    sortedDevices() {
      var apiaryArray = []
      this.devices.map((device, index) => {
        if (device.hive_id !== null) {
          // exclude devices without coupled hive id because hive id is required value for exclude_hive_ids array
          apiaryArray.push({
            id: -(index + 1), // random because it has to have an id for Treeselect but won't be used later
            label:
              device.location_name !== ''
                ? device.location_name
                : this.$i18n.t('Unknown'),
            children: [],
          })
        }
      })
      var uniqueApiaries = []
      const map = new Map()
      for (const item of apiaryArray) {
        if (!map.has(item.label)) {
          map.set(item.label, true) // set any value to Map
          uniqueApiaries.push(item)
        }
      }
      uniqueApiaries = uniqueApiaries.slice().sort(function(a, b) {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
      this.devices.map((device) => {
        uniqueApiaries.map((apiary) => {
          if (
            device.hive_id !== null &&
            (apiary.label === device.location_name ||
              (apiary.label === this.$i18n.t('Unknown') &&
                device.location_name === ''))
          ) {
            const deviceLabel = device.hive_name
              ? device.hive_name + ' - ' + device.name
              : device.name
            apiary.children.push({
              id: device.hive_id,
              label: deviceLabel,
            })
          }
        })
      })
      uniqueApiaries.map((apiary) => {
        var sortedChildren = apiary.children.slice().sort(function(a, b) {
          if (a.label < b.label) {
            return -1
          }
          if (a.label > b.label) {
            return 1
          }
          return 0
        })
        apiary.children = sortedChildren
      })
      return uniqueApiaries
    },
    sortedSensorMeasurements() {
      var measurementTypes = this.sensorMeasurementsList

      // check if translation exists, if not don't display the measurement type
      measurementTypes = measurementTypes.filter(
        (measurementType) =>
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
    thresholdValueIsNaN() {
      return isNaN(this.activeAlertRule.threshold_value)
    },
  },
  created() {
    this.readDevicesIfNotPresent()
    this.readAlertRulesIfNotPresent().then(() => {
      this.readTaxonomy().then(() => {
        // If alertrule-create route is used, make empty alertrule object
        if (this.alertruleCreateMode) {
          this.activeAlertRule = {
            name:
              this.$i18n.tc('alertrule', 1) +
              ' ' +
              (this.alertRules.length + 1),
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
          this.setActiveAlertRule(this.id)
        }
      })
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
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            return this.readAlertRules().then(() => {
              this.$router.push({
                name: 'alertrules',
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
          this.showLoadingIcon = false
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
            this.nextRoute()
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
    async readAlertRulesIfNotPresent() {
      if (this.alertRules.length === 0) {
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
      } else {
        return true
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
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            return this.readAlertRules().then(() => {
              this.nextRoute()
            })
          }, 150) // wait for API to update alertrules
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
          this.showLoadingIcon = false
        }
      }
    },
    nextRoute() {
      if (localStorage.beepPreviousRoute === 'alerts') {
        this.$router.push({
          name: 'alerts',
        })
      } else {
        this.$router.push({
          name: 'alertrules',
        })
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
    alertRuleSentence(alertRule) {
      var sentence = this.$i18n.t('alertrule_main_sentence')
      var replacedSentence = sentence

      var measurement = this.sortedSensorMeasurements.filter(
        (measurement) => measurement.id === alertRule.measurement_id
      )[0]

      var replaceWith = {
        calculation: this.$i18n.t(alertRule.calculation),
        comparison: this.comparisons
          .filter((comparison) => comparison.short === alertRule.comparison)[0]
          .full.toLowerCase(),
        measurement_quantity: measurement.label,
        measurement_unit: measurement.unit,
        comparator: this.comparators.filter(
          (comparator) => comparator.short === alertRule.comparator
        )[0].full,
        threshold_value: alertRule.threshold_value,
        calculation_minutes: parseFloat(
          (alertRule.calculation_minutes / 60).toFixed(2)
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

      if (
        alertRule.exclude_months !== null &&
        alertRule.exclude_months.length > 0
      ) {
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

      if (
        alertRule.exclude_hours !== null &&
        alertRule.exclude_hours.length > 0
      ) {
        replacedSentence += this.$i18n.t('alertrule_exclude_hours_sentence')
        var hoursString = alertRule.exclude_hours.join(', ')
        replacedSentence = replacedSentence.replace(
          '[exclude_hours]',
          hoursString
        )
      }

      if (
        alertRule.exclude_hive_ids !== null &&
        alertRule.exclude_hive_ids.length > 0
      ) {
        replacedSentence += this.$i18n.t('alertrule_exclude_hives_sentence')
        var hivesArray = []
        alertRule.exclude_hive_ids.map((hiveId) => {
          var hiveName = hiveId + ' (unknown)'
          var filteredDevices = this.devices.filter(
            (device) => device.hive_id === hiveId
          )
          if (
            filteredDevices !== undefined &&
            filteredDevices.length > 0 &&
            filteredDevices[0].hive_name !== ''
          ) {
            hiveName = filteredDevices[0].hive_name
          }
          hivesArray.push(hiveName)
        })
        replacedSentence = replacedSentence.replace(
          '[exclude_hive_ids]',
          hivesArray.join(', ')
        )
      }

      return replacedSentence
    },
    getText(item) {
      return item.label + ' (' + item.abbreviation + ')'
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
    setActiveAlertRule(id) {
      this.activeAlertRule = {
        ...this.alertRules.filter((alertRule) => alertRule.id === id)[0],
      }
      if (this.activeAlertRule === undefined) {
        this.$router.push({
          name: '404',
          params: { resource: 'alertrule' },
        })
      }
      this.setAlertRuleEdited(false)
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
  @include for-tablet-landscape-up {
    font-size: 1.5rem;
  }

  input {
    padding-top: 0 !important;
  }
}
</style>
