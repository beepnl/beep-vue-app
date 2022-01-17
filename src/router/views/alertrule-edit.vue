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
        <div class="overline mb-2" v-text="$t('Alertrule_summary_title')"></div>
        <em
          v-if="activeAlertRule && !activeAlertRule.active"
          class="red--text"
          >{{ $t('alertrule_not_active') }}</em
        >
        <v-alert
          v-if="activeAlertRule"
          :color="activeAlertRule.active ? 'primary' : 'grey'"
          class="alertrule-card mb-8"
        >
          <span :class="!activeAlertRule.active ? 'color-white' : ''">{{
            alertRuleSentence(activeAlertRule)
          }}</span>
        </v-alert>

        <div
          class="overline mb-2"
          v-text="$t('Alertrule_settings_title')"
        ></div>
        <div v-if="activeAlertRule" class="alertrule-card rounded-border mb-8">
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="7" lg="5" class="mobile-last">
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

            <v-spacer />

            <div class="float-right mt-3 mr-3">
              <div>
                <div class="beep-label" v-text="$t('Active')"></div>
                <v-checkbox
                  v-model="activeAlertRule.active"
                  color="accent"
                  class="mt-1"
                  hide-details
                  @change="setAlertRuleEdited(true)"
                ></v-checkbox>
              </div>
            </div>

            <div class="float-right mt-3 mr-3">
              <div>
                <div class="beep-label" v-text="$t('Alert_via_email')"></div>
                <v-checkbox
                  v-model="activeAlertRule.alert_via_email"
                  color="accent"
                  class="mt-1"
                  hide-details
                  @change="setAlertRuleEdited(true)"
                ></v-checkbox>
              </div>
            </div>
          </v-row>

          <v-row>
            <v-col cols="12" lg="9">
              <div
                :class="'beep-label' + (!mobile ? ' mb-0' : '')"
                v-text="$t('Description')"
              ></div>
              <v-textarea
                v-model="activeAlertRule.description"
                :class="'pt-0' + (!mobile ? ' mb-sm-3 mt-0' : '')"
                :rows="!mobile ? '1' : '2'"
                row-height="24"
                auto-grow
                counter="250"
                @input="validateText($event, 'description', 250)"
              >
              </v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="9" class="mb-3">
              <div class="beep-label" v-text="$t('Calculation_minutes')"></div>
              <v-select
                v-model="activeAlertRule.calculation_minutes"
                :items="calculationMinutes"
                :item-text="
                  (item) => momentHumanizeHours(item.label, true, true)
                "
                item-value="label"
                :placeholder="$t('Select') + '...'"
                class="pt-0"
                hide-details
                @input="setAlertRuleEdited(true), checkCalculation($event)"
              ></v-select>
              <div
                v-if="activeAlertRule.calculation_minutes === 0"
                class="beep-label mt-1"
                v-text="warningText"
              ></div>
            </v-col>
          </v-row>

          <v-row>
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
                v-model="activeAlertRule.measurement_id"
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
                v-model="activeAlertRule.calculation"
                :items="calculations"
                item-text="full"
                item-value="short"
                :placeholder="`${$t('Select')} ${$t('calculation')} ...`"
                :label="$t('Calculation')"
                :rules="requiredRule"
                :disabled="activeAlertRule.calculation_minutes === 0"
                @input="setAlertRuleEdited(true)"
              ></v-select>
              <div
                v-if="activeAlertRule.calculation_minutes === 0"
                class="beep-label mt-n4 mb-3"
                v-text="$t('not_relevant_for_immediate_calculation')"
              ></div>
              <div
                v-else
                class="beep-label mt-n4 mb-3"
                v-text="
                  momentDurationInHours(
                    activeAlertRule.calculation_minutes,
                    'minutes',
                    calcPrefix
                  )
                "
              ></div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="activeAlertRule.comparison"
                :items="comparisons"
                :item-text="getComparisonText"
                item-value="short"
                :placeholder="`${$t('Select')} ${$t('comparison')} ...`"
                :label="$t('Comparison')"
                :rules="requiredRule"
                @input="setAlertRuleEdited(true)"
              ></v-select>
              <div
                v-if="activeAlertRule.comparison === 'abs_dif'"
                class="beep-label mt-n4 mb-3"
                v-text="$t('Absolute_value_of_dif_explanation')"
              ></div>
            </v-col>

            <v-col cols="6" sm="3" md="1">
              <v-select
                v-model="activeAlertRule.comparator"
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
                  :class="
                    `beep-label ${thresholdValueIsNaN ? 'red--text' : ''}`
                  "
                  v-text="$t('Threshold_value') + ' (' + measurementUnit + ')'"
                ></div>
                <el-input-number
                  v-model="activeAlertRule.threshold_value"
                  :step="activeAlertRule.calculation === 'cnt' ? 1 : 0.1"
                  :precision="activeAlertRule.calculation === 'cnt' ? 0 : 1"
                  :step-strictly="true"
                  size="small"
                  @change="setAlertRuleEdited(true)"
                  @input.native="
                    convertComma($event, activeAlertRule, 'threshold_value', 1),
                      setAlertRuleEdited(true)
                  "
                ></el-input-number>
                <div
                  v-if="thresholdValueIsNaN"
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
              </div>
              <!-- <span class="ml-1 mt-6">{{ measurementUnit }}</span> -->
            </v-col>
          </v-row>
        </div>

        <div class="overline mb-2" v-text="$t('Alertrule_exclude_title')"></div>
        <div v-if="activeAlertRule" class="alertrule-card rounded-border">
          <v-row>
            <v-col cols="12" sm="9" md="6" class="mt-2 mb-3">
              <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_months')"></div>
                <v-switch
                  v-model="allMonthsSelected"
                  class="pt-2 mt-n4"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div>
              <Treeselect
                v-model="activeAlertRule.exclude_months"
                class="color-red"
                :options="months"
                :placeholder="`${$t('Select')} ${$t('months')}`"
                :no-results-text="`${$t('no_results')}`"
                multiple
                @input="setAlertRuleEdited(true)"
              />
            </v-col>

            <v-col cols="12" sm="9" md="6" class="mt-2 mb-3">
              <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_hours')"></div>
                <v-switch
                  v-model="allHoursSelected"
                  class="pt-2 mt-n4"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div>
              <Treeselect
                v-model="activeAlertRule.exclude_hours"
                class="color-red"
                :options="hours"
                :placeholder="`${$t('Select')} ${$t('hours')}`"
                :no-results-text="`${$t('no_results')}`"
                multiple
                @input="setAlertRuleEdited(true)"
              />
            </v-col>

            <v-col
              v-if="devices.length > 1"
              cols="12"
              sm="9"
              md="6"
              class="mb-2"
            >
              <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_hives')"></div>
                <v-switch
                  v-if="numberOfSortedDevices > 2"
                  v-model="allDevicesSelected"
                  class="pt-2 mt-n4"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div>
              <Treeselect
                v-model="activeAlertRule.exclude_hive_ids"
                class="color-red"
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
        </div>
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
import { momentHumanizeHours } from '@mixins/momentMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Confirm,
    Layout,
    Treeselect,
  },
  mixins: [
    convertComma,
    momentHumanizeHours,
    readAlertRules,
    readDevicesIfNotPresent,
    readTaxonomy,
  ],
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
      showAllMeasurements: false,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRules', 'alertRuleEdited']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('taxonomy', ['alertRulesList', 'sensorMeasurementsList']),
    // alertOnOccurencesItems() {
    //   var occArray = []
    //   for (var i = 1; i < 11; i++) {
    //     occArray.push({
    //       id: i,
    //       label:
    //         i === 1
    //           ? this.$i18n.t('Direct')
    //           : this.$i18n.t('After') + ' ' + i + ' ' + this.$i18n.t('times'),
    //     })
    //   }
    //   return occArray
    // },
    alertruleCreateMode() {
      return this.$route.name === 'alertrule-create'
    },
    allDevicesSelected: {
      get() {
        return (
          this.activeAlertRule.exclude_hive_ids.length ===
          this.numberOfSortedDevices
        )
      },
      set(value) {
        if (value === false) {
          this.activeAlertRule.exclude_hive_ids = []
        } else {
          this.activeAlertRule.exclude_hive_ids = []
          this.sortedDevices.map((apiary) => {
            apiary.children.map((device) => {
              this.activeAlertRule.exclude_hive_ids.push(device.id)
            })
          })
        }
      },
    },
    allHoursSelected: {
      get() {
        return this.activeAlertRule.exclude_hours.length === 24
      },
      set(value) {
        if (value === false) {
          this.activeAlertRule.exclude_hours = []
        } else {
          this.activeAlertRule.exclude_hours = []
          this.hours.map((hour) => {
            this.activeAlertRule.exclude_hours.push(hour.id)
          })
        }
      },
    },
    allMonthsSelected: {
      get() {
        return this.activeAlertRule.exclude_months.length === 12
      },
      set(value) {
        if (value === false) {
          this.activeAlertRule.exclude_months = []
        } else {
          this.activeAlertRule.exclude_months = []
          this.months.map((month) => {
            this.activeAlertRule.exclude_months.push(month.id)
          })
        }
      },
    },
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
        this.activeAlertRule.calculation
      ]
      return this.$i18n.t(translateTerm) + ' ' + this.$i18n.t('of') + ' '
    },
    calculationMinutes() {
      return this.formatFromTaxonomyArray(this.alertRulesList.calc_minutes)
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
    devicesInterval() {
      if (this.numberOfSortedDevices !== null) {
        var intervalArray = []
        this.devices.map((device) => {
          if (
            this.activeAlertRule.exclude_hive_ids.indexOf(device.hive_id) === -1
          ) {
            intervalArray.push(
              device.measurement_interval_min *
                device.measurement_transmission_ratio
            )
          }
        })
        intervalArray = intervalArray.filter((e) => e !== 0)
        if (intervalArray.length > 0) {
          var minMaxArray = [
            Math.min(...intervalArray),
            Math.max(...intervalArray),
          ]
          if (minMaxArray[0] === minMaxArray[1]) {
            return [minMaxArray[0]]
          } else {
            return minMaxArray
          }
        } else {
          return null
        }
      } else {
        return null
      }
    },
    hours() {
      return this.formatFromTaxonomyArray(this.alertRulesList.exclude_hours)
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    measurement() {
      return this.allSensorMeasurements.filter(
        (measurement) => measurement.id === this.activeAlertRule.measurement_id
      )[0]
    },
    measurementUnit() {
      return this.activeAlertRule.calculation === 'cnt'
        ? this.$i18n.t('times')
        : this.measurement !== undefined
        ? this.measurement.unit
        : ''
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
    numberOfIncludedDevices() {
      return (
        this.numberOfSortedDevices -
        this.activeAlertRule.exclude_hive_ids.length
      )
    },
    numberOfSortedDevices() {
      return this.sortedDevices.reduce((acc, apiary) => {
        acc += apiary.children.length
        return acc
      }, 0)
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
            var deviceLabel = device.hive_name
              ? device.hive_name + ' - ' + device.name
              : device.name

            const interval =
              device.measurement_interval_min *
              device.measurement_transmission_ratio
            deviceLabel += interval
              ? ' (' +
                this.$i18n.t('measurement_interval') +
                ': ' +
                interval +
                ' ' +
                this.$i18n.tc('minute', interval) +
                ')'
              : ''

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
    defaultSensorMeasurements() {
      // check if measurement type is a default measurement type for creating alert rules
      return this.allSensorMeasurements.filter(
        (measurementType) => measurementType.show_in_alerts
      )
    },
    thresholdValueIsNaN() {
      return isNaN(this.activeAlertRule.threshold_value)
    },
    warningText() {
      var warningText = this.$i18n.t('In_case_of_good_connection_warning')
      if (
        this.devicesInterval !== null &&
        this.activeAlertRule.comparison.includes('dif')
      ) {
        var intervalWarning =
          this.devicesInterval.length > 1
            ? this.$i18n.t('upload_interval_warning_interval_range') +
              this.devicesInterval.join(' - ') +
              ' ' +
              this.$i18n.tc('minute', 2)
            : this.$i18n.tc(
                'upload_interval_warning_single_interval',
                this.numberOfIncludedDevices
              ) +
              ' ' +
              this.devicesInterval[0] +
              ' ' +
              this.$i18n.tc('minute', this.devicesInterval[0])
        warningText += ' ' + intervalWarning
      }
      return warningText
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
            measurement_id: this.defaultSensorMeasurements[0].id,
            calculation: 'ave',
            calculation_minutes: 0,
            comparator: '<',
            comparison: 'val',
            threshold_value: 0,
            exclude_months: [],
            exclude_hours: [],
            exclude_hive_ids: [],
            active: 1,
            alert_via_email: 0,
            // alert_on_occurences: 1,
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
      if (this.$refs.form.validate() && !this.thresholdValueIsNaN) {
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
      if (this.$refs.form.validate() && !this.thresholdValueIsNaN) {
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
    checkCalculation(calcMinValue) {
      if (calcMinValue === 0) {
        this.activeAlertRule.calculation = 'ave'
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

      var replaceWith = {
        calculation: this.$i18n.t(alertRule.calculation),
        comparison: this.comparisons
          .filter((comparison) => comparison.short === alertRule.comparison)[0]
          .full.toLowerCase(),
        measurement_quantity:
          this.measurement !== undefined ? this.measurement.label : '-',
        measurement_unit: this.measurementUnit,
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
      })

      if (alertRule.active) {
        alertRule.alert_via_email
          ? (replacedSentence +=
              this.$i18n.t('alertrule_active_email_sentence') + ' ')
          : (replacedSentence +=
              this.$i18n.t('alertrule_active_no_email_sentence') + ' ')
      } else {
        replacedSentence += '. '
      }

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

        var hoursArray = []
        alertRule.exclude_hours.map((hour) => {
          hoursArray.push(this.alertRulesList.exclude_hours[hour])
        })
        var hoursString = hoursArray.join(', ')

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
          var hiveName = hiveId + ' (' + this.$i18n.t('unknown') + ')'
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
    getComparisonText(item) {
      return item.full + (item.short === 'abs_dif' ? '**' : '')
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
    formatFromTaxonomyArray(array) {
      var formattedArray = []
      array.map((value, index) => {
        formattedArray.push({
          id: index,
          label: value,
        })
      })
      return formattedArray
    },
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
      } else {
        if (
          !this.defaultSensorMeasurements.some(
            (el) => el.id === this.activeAlertRule.measurement_id
          )
        ) {
          this.showAllMeasurements = true
        }
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
.mobile-last {
  @include for-phone-only {
    order: 2;
  }
}

.alertrule-card {
  max-width: 1200px;

  .color-white {
    color: $color-white;
  }
}

.alertrule-edit-name {
  padding-top: 0 !important;
  font-size: 1.5rem;
  @include for-phone-only {
    font-size: 1.2rem;
  }

  input {
    padding-top: 0 !important;
  }
}
</style>
