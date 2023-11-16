<template>
  <Layout :title="getTitle()">
    <v-form ref="form" v-model="valid">
      <v-toolbar class="save-bar" density="compact" light>
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
          <v-icon v-if="!showLoadingIcon" start>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-toolbar>

      <v-container class="content-container">
        <div
          class="text-overline mb-2"
          v-text="$t('Alertrule_summary_title')"
        ></div>
        <em
          v-if="activeAlertRule && !activeAlertRule.active"
          class="text-red"
          >{{ $t('alertrule_not_active') }}</em
        >
        <v-alert
          v-if="activeAlertRule"
          variant="flat"
          :class="
            'alertrule-card alert mb-8 ' +
              (activeAlertRule.active ? 'active' : '')
          "
        >
          <span>{{ alertRuleSentence(activeAlertRule) }}</span>
        </v-alert>

        <div
          class="text-overline mb-2"
          v-text="$t('Alertrule_settings_title')"
        ></div>
        <div v-if="activeAlertRule" class="alertrule-card rounded-border mb-8">
          <v-row class="d-flex justify-space-between">
            <v-col cols="12" sm="7" lg="5" class="mobile-last">
              <div class="beep-label" v-text="$t('Name')"></div>
              <v-text-field
                :model-value="activeAlertRule.name"
                class="alertrule-edit-name mb-sm-3"
                counter="30"
                :rules="requiredRule"
                required
                @update:model-value="validateText($event, 'name', 30)"
              >
              </v-text-field>
            </v-col>

            <v-spacer />

            <div class="float-right mt-3 mr-3">
              <div>
                <div class="beep-label" v-text="$t('Active')"></div>
                <v-checkbox-btn
                  v-model="activeAlertRule.active"
                  :true-value="1"
                  :false-value="0"
                  class="ma-0 pt-0"
                  density="compact"
                  hide-details
                  @update:model-value="setAlertRuleEdited(true)"
                ></v-checkbox-btn>
              </div>
            </div>

            <div class="float-right mt-3 mr-3">
              <div>
                <div class="beep-label" v-text="$t('Alert_via_email')"></div>
                <v-checkbox-btn
                  v-model="activeAlertRule.alert_via_email"
                  :true-value="1"
                  :false-value="0"
                  class="ma-0 pt-0"
                  density="compact"
                  hide-details
                  @update:model-value="setAlertRuleEdited(true)"
                ></v-checkbox-btn>
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
                :model-value="activeAlertRule.description"
                :class="'pt-0' + (!mobile ? ' mb-sm-3 mt-0' : '')"
                :rows="!mobile ? '1' : '2'"
                auto-grow
                counter="250"
                bg-color="white"
                @update:model-value="validateText($event, 'description', 250)"
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
                :item-title="
                  (item) => momentHumanizeHours(item.label, true, true)
                "
                item-value="label"
                :placeholder="$t('Select') + '...'"
                class="pt-0"
                hide-details
                @update:model-value="
                  setAlertRuleEdited(true), checkCalculation($event)
                "
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
              <div class="d-flex justify-space-between align-center mb-n4">
                <div
                  class="beep-label mt-n5"
                  v-text="$tc('Measurement', 1)"
                ></div>
                <v-switch
                  v-model="showAllMeasurements"
                  class="mt-n6 d-flex justify-end"
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
                :item-title="getText"
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
                @update:model-value="setAlertRuleEdited(true)"
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
                item-title="full"
                item-value="short"
                :placeholder="`${$t('Select')} ${$t('calculation')} ...`"
                :label="$t('Calculation')"
                :rules="requiredRule"
                :disabled="activeAlertRule.calculation_minutes === 0"
                @update:model-value="setAlertRuleEdited(true)"
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
                :item-title="getComparisonText"
                item-value="short"
                :placeholder="`${$t('Select')} ${$t('comparison')} ...`"
                :label="$t('Comparison')"
                :rules="requiredRule"
                @update:model-value="setAlertRuleEdited(true)"
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
                item-title="short"
                item-value="short"
                :label="$t('Comparator')"
                :rules="requiredRule"
                @update:model-value="setAlertRuleEdited(true)"
              ></v-select>
            </v-col>

            <v-col cols="6" sm="3" md="2" class="d-flex justify-start">
              <div class="mt-n2">
                <div
                  :class="`beep-label ${thresholdValueIsNaN ? 'text-red' : ''}`"
                  v-text="$t('Threshold_value') + ' (' + measurementUnit + ')'"
                ></div>
                <ElInputNumber
                  v-model="activeAlertRule.threshold_value"
                  :step="activeAlertRule.calculation === 'cnt' ? 1 : 0.1"
                  :precision="activeAlertRule.calculation === 'cnt' ? 0 : 1"
                  :step-strictly="true"
                  @change="setAlertRuleEdited(true)"
                  @update:model-value="
                    convertComma($event, activeAlertRule, 'threshold_value', 1),
                      setAlertRuleEdited(true)
                  "
                ></ElInputNumber>
                <div
                  v-if="thresholdValueIsNaN"
                  class="v-text-field__details mt-1"
                  ><div class="v-messages theme--light text-error" role="alert"
                    ><div class="v-messages__wrapper"
                      ><div class="v-messages__message">{{
                        $t('this_field') + ' ' + $t('is_required')
                      }}</div></div
                    ></div
                  ></div
                >
              </div>
              <!-- <span class="ml-1 mt-6">{{ measurementUnit }}</span> -->
            </v-col>
          </v-row>
        </div>

        <div
          class="text-overline mb-2"
          v-text="$t('Alertrule_exclude_title')"
        ></div>
        <div v-if="activeAlertRule" class="alertrule-card rounded-border">
          <v-row>
            <v-col cols="12" sm="9" md="6" class="mt-2 mb-3">
              <!-- <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_months')"></div>
                <v-switch
                  v-model="allMonthsSelected"
                  class="pt-2 mt-n4 d-flex justify-end"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div> -->
              <Treeselect
                :model-value="activeAlertRule.exclude_months"
                class="color-red"
                :options="months"
                :placeholder="`${$t('Select')} ${$t('months')}`"
                :no-results-text="`${$t('no_results')}`"
                multiple
                @update:model-value="
                  ;(activeAlertRule.exclude_months = $event),
                    setAlertRuleEdited(true)
                "
              />
            </v-col>

            <v-col cols="12" sm="9" md="6" class="mt-2 mb-3">
              <!-- <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_hours')"></div>
                <v-switch
                  v-model="allHoursSelected"
                  class="pt-2 mt-n4 d-flex justify-end"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div> -->
              <Treeselect
                v-model="activeAlertRule.exclude_hours"
                class="color-red"
                :options="hours"
                :placeholder="`${$t('Select')} ${$t('hours')}`"
                :no-results-text="`${$t('no_results')}`"
                multiple
                @update:model-value="setAlertRuleEdited(true)"
              />
            </v-col>

            <v-col
              v-if="devices.length > 1"
              cols="12"
              sm="9"
              md="6"
              class="mb-2"
            >
              <!-- <div class="d-flex justify-space-between">
                <div class="beep-label" v-html="$t('Exclude_hives')"></div>
                <v-switch
                  v-if="numberOfSortedDevices > 2"
                  v-model="allDevicesSelected"
                  class="pt-2 mt-n4 d-flex justify-end"
                  :label="$t('select_all')"
                  hide-details
                ></v-switch>
              </div> -->
              <Treeselect
                v-model="activeAlertRule.exclude_hive_ids"
                class="color-red"
                :options="devicesOptions"
                :disable-branch-nodes="false"
                :default-expand-level="1"
                :placeholder="`${$t('Select')} ${$tc('hive', 2)}`"
                :no-results-text="`${$t('no_results')}`"
                :value-consists-of="'LEAF_PRIORITY'"
                multiple
                @update:model-value="setAlertRuleEdited(true)"
              />
              <div
                class="beep-label mt-1"
                v-text="
                  $t('Exclude_hives_details') +
                    (hasNonOwnedDevices
                      ? $t('Exclude_hives_collab_group_exp')
                      : '')
                "
              ></div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="accent " variant="text" @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Treeselect from 'vue3-treeselect'
import Confirm from '@/src/components/confirm-dialog.vue'
import { mapGetters } from 'vuex'
import Layout from '@/src/router/layouts/back-layout.vue'
import {
  convertComma,
  readAlertRules,
  readDevicesIfNotChecked,
  readTaxonomy,
  sortedDevices,
} from '@mixins/methodsMixin'
import { momentHumanizeHours } from '@mixins/momentMixin'
import { ElInputNumber } from 'element-plus'

export default {
  components: {
    Confirm,
    Layout,
    Treeselect,
    ElInputNumber,
  },
  mixins: [
    convertComma,
    momentHumanizeHours,
    readAlertRules,
    readDevicesIfNotChecked,
    readTaxonomy,
    sortedDevices,
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
    //   const occArray = []
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
    // allDevicesSelected: { // TODO-VUE3 re-enable when vue3-treeselect multiple reactivity bug has been fixed OR replace by Element Plus treeselect component
    //   get() {
    //     return (
    //       this.activeAlertRule.exclude_hive_ids.length ===
    //       this.numberOfSortedDevices
    //     )
    //   },
    //   set(value) {
    //     if (value === false) {
    //       this.activeAlertRule.exclude_hive_ids = []
    //     } else {
    //       this.activeAlertRule.exclude_hive_ids = []
    //       this.devicesOptions.map((apiary) => {
    //         apiary.children.map((device) => {
    //           this.activeAlertRule.exclude_hive_ids.push(device.id)
    //           return true
    //         })
    //         return true
    //       })
    //     }
    //   },
    // },
    // allHoursSelected: {
    //   get() {
    //     return this.activeAlertRule.exclude_hours.length === 24
    //   },
    //   set(value) {
    //     if (value === false) {
    //       this.activeAlertRule.exclude_hours = []
    //     } else {
    //       this.activeAlertRule.exclude_hours = this.hours.map(
    //         (month) => month.id
    //       )
    //     }
    //   },
    // },
    // allMonthsSelected: {
    //   get() {
    //     return this.activeAlertRule.exclude_months.length === 12
    //   },
    //   set(value) {
    //     if (value === false) {
    //       this.activeAlertRule.exclude_months = []
    //     } else {
    //       this.activeAlertRule.exclude_months = this.months.map(
    //         (month) => month.id
    //       )
    //     }
    //   },
    // },
    allSensorMeasurements() {
      let measurementTypes = JSON.parse(
        JSON.stringify(this.sensorMeasurementsList)
      ) // clone without v-bind to avoid vuex warning when mutating

      // check if measurement type is NOT a weather measurement and if translation exists, otherwise don't display the measurement type
      measurementTypes = measurementTypes.filter(
        (measurementType) =>
          measurementType.weather === 0 &&
          this.$i18n.te(measurementType.abbreviation) === true
      )

      // add translation as label property
      measurementTypes.map((measurementType) => {
        measurementType.label = this.$i18n.t(measurementType.abbreviation)
        return measurementType
      })

      // sort by label
      const sortedSMs = measurementTypes.slice().sort(function(a, b) {
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
      const translateTerm = this.alertRulesList.calculations[
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
        let intervalArray = []
        this.devices.map((device) => {
          if (
            this.activeAlertRule.exclude_hive_ids.indexOf(device.hive_id) === -1
          ) {
            intervalArray.push(
              device.measurement_interval_min *
                device.measurement_transmission_ratio
            )
          }
          return true
        })
        intervalArray = intervalArray.filter((e) => e !== 0)
        if (intervalArray.length > 0) {
          const minMaxArray = [
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
    devicesOptions() {
      return this.sortedDevices(true)
    },
    hasNonOwnedDevices() {
      return this.devices.filter((device) => !device.owner).length > 0
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
      return this.$vuetify.display.xs
    },
    months() {
      const monthsArray = []
      for (let i = 1; i < 13; i++) {
        monthsArray.push({
          id: i,
          label: this.$i18n.tm('monthsShort')[i - 1],
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
      return this.devicesOptions.reduce((acc, apiary) => {
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
    showCollabGroupWarning() {
      // show confirm popup with warning that alerts are sent for non-owned hives as well, but only when saving alert rule
      // - without any excluded hive ids (which could mean that user has missed this option)
      // - if non-owned devices (from collaboration groups) are present
      return (
        this.activeAlertRule.exclude_hive_ids.length === 0 &&
        this.hasNonOwnedDevices
      )
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
      let warningText = this.$i18n.t('In_case_of_good_connection_warning')
      if (
        this.devicesInterval !== null &&
        this.activeAlertRule.comparison.includes('dif')
      ) {
        const intervalWarning =
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
    this.readDevicesIfNotChecked()
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
    confirmCreateAlertRule() {
      if (this.showCollabGroupWarning) {
        this.$refs.confirm
          .open(
            this.$i18n.t('create_alertrule'),
            this.$i18n.t('Save_alertrule_ok'),
            {
              color: 'red',
            },
            this.$i18n.t('No_hives_excluded_warning')
          )
          .then((confirm) => {
            this.createAlertRule()
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.createAlertRule()
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
      const sentence = this.$i18n.t('alertrule_main_sentence')
      let replacedSentence = sentence

      const replaceWith = {
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
        return replacedSentence
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
        const monthsArray = []
        alertRule.exclude_months.map((month) => {
          monthsArray.push(this.$i18n.tm('monthsFull')[month - 1])
          return true
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

        const hoursArray = []
        alertRule.exclude_hours.map((hour) => {
          hoursArray.push(this.alertRulesList.exclude_hours[hour])
          return true
        })
        const hoursString = hoursArray.join(', ')

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
        const hivesArray = []
        alertRule.exclude_hive_ids.map((hiveId) => {
          let hiveName = hiveId + ' (' + this.$i18n.t('unknown') + ')'
          const filteredDevices = this.devices.filter(
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
          return true
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
        return this.$i18n.t('New_alertrule')
      } else if (this.activeAlertRule !== null) {
        return this.$i18n.t('Edit_alertrule')
      } else {
        return this.$i18n.t('edit') + '...'
      }
    },
    formatFromTaxonomyArray(array) {
      const formattedArray = []
      array.map((value, index) => {
        formattedArray.push({
          id: index,
          label: value,
        })
        return true
      })
      return formattedArray
    },
    formatFromTaxonomyObject(object) {
      const formattedArray = []
      Object.entries(object).map(([key, value]) => {
        formattedArray.push({
          short: key,
          full: this.$i18n.t(value),
        })
        return true
      })
      return formattedArray
    },
    saveAlertRule() {
      if (this.alertruleCreateMode) {
        this.confirmCreateAlertRule()
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

  &.alert {
    color: $color-white;
    background-color: $color-grey-medium;

    &.active {
      color: $color-black;
      background-color: $color-primary;
    }
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
