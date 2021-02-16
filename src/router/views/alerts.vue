<template>
  <Layout>
    <v-container v-if="showAlertPlaceholder && ready">
      <v-row>
        <v-col sm="auto" :cols="12">
          {{ $t('no_alerts') }}
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!showAlertPlaceholder && ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons d-flex flex-row justify-flex-start align-center"
          >
            <v-col cols="7" :class="mobile ? 'pr-0' : 'pr-1'">
              <v-text-field
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field`
                "
                :height="mobile ? '30px' : '36px'"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </div>
          <v-card-actions class="mr-1">
            <v-switch
              v-model="alertsEnabled"
              :label="
                alertsEnabled ? $t('alerts_enabled') : $t('alerts_disabled')
              "
              hide-details
              @click="toggleAlerts"
            ></v-switch>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

    <v-container v-if="ready" class="alerts-content">
      <v-alert
        v-for="error in errors"
        :key="error.errorMessage"
        type="error"
        text
        prominent
        dense
        color="red"
      >
        {{ error.errorMessage }}
      </v-alert>

      <v-row v-if="!showAlertPlaceholder && alerts.length > 0" dense>
        <ScaleTransition
          :duration="500"
          group
          class="alerts-item-transition-wrapper"
        >
          <v-col
            v-for="(alert, j) in filteredAlerts"
            :key="j"
            sm="auto"
            class="alerts-item"
            dense
          >
            <AlertCard
              :alert="alert"
              :hives="hives"
              @confirm-hide-alert="confirmHideAlert($event)"
            ></AlertCard>
          </v-col>
        </ScaleTransition>
      </v-row>
    </v-container>

    <v-container>
      <v-card outlined>
        <div
          :class="
            `alertrules-title-row d-flex flex-no-wrap justify-flex-start align-center ${
              showAlertRules ? 'alertrules-title-row--border-bottom' : ''
            }`
          "
          style="width: 100%;"
        >
          <v-row class="ml-0 my-0 pa-3" style="width:100%;">
            <div class="overline" v-text="$tc('alert_rule', 2)"></div>
          </v-row>
          <div>
            <v-icon
              :class="
                `color-grey-light py-2 px-3 mdi ${
                  showAlertRules ? 'mdi-minus' : 'mdi-plus'
                }`
              "
              @click="showAlertRules = !showAlertRules"
            >
            </v-icon>
          </div>
        </div>

        <v-card-text v-if="showAlertRules">
          <v-row>
            <v-col cols="12">
              <div class="d-flex justify-space-between mb-3">
                <div class="d-flex justify-start align-center mb-3">
                  <v-icon
                    v-if="showAlertRules"
                    class="mdi mdi-information ml-1 icon-info cursor-pointer mr-2"
                    dark
                    small
                    color="primary"
                    @click="showDescription = !showDescription"
                  ></v-icon>
                  <p v-if="showDescription && ready" class="mb-0">
                    <em
                      >{{ $t('alertrule_info') + ' '
                      }}<a :href="$t('alertrule_url')">{{
                        $t('alertrule_url_text')
                      }}</a></em
                    >
                  </p>
                </div>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!mobile"
                  tile
                  outlined
                  color="primary"
                  @click="addAlertRule"
                >
                  <v-icon left>mdi-plus</v-icon>
                  {{ $t('add') + ' ' + $tc('alert_rule', 1) }}
                </v-btn>
                <v-btn
                  v-if="mobile"
                  tile
                  outlined
                  color="primary"
                  @click="addAlertRule"
                >
                  <v-icon left>mdi-plus</v-icon>
                  {{ $t('add') }}
                  {{ alertRules.length === 0 ? $tc('alert_rule', 1) : '' }}
                </v-btn>
              </div>
              <div v-if="alertRules.length > 0" class="rounded-border">
                <v-simple-table dense class="alertrule-table">
                  <template v-slot>
                    <thead>
                      <tr>
                        <th class="text-left">
                          {{ $t('Active') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Alert_via_email') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Name') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Description') }}
                        </th>
                        <th class="text-left">
                          {{ $tc('Measurement', 1) }}
                        </th>
                        <th class="text-left">
                          {{ $t('Calculation') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Calculation_minutes') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Comparator') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Comparison') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Threshold_value') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Exclude') + ' ' + $t('months') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Exclude') + ' ' + $t('hours') }}
                        </th>
                        <th class="text-left">
                          {{ $t('Exclude') + ' ' + $tc('hive', 2) }}
                        </th>
                        <th class="text-left">
                          {{ $t('Webhook_url') }}
                        </th>
                        <th class="text-center">
                          {{ $t('Actions') }}
                        </th>
                        <th class="text-center"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(alertRule, index) in alertRules" :key="index">
                        <td>
                          <v-checkbox
                            v-model="alertRule.active"
                            color="primary"
                          ></v-checkbox>
                        </td>
                        <td>
                          <v-checkbox
                            v-model="alertRule.alert_via_email"
                            color="primary"
                          ></v-checkbox>
                        </td>
                        <td class="td--small pb-5">
                          <v-text-field
                            v-model="alertRule.name"
                            :placeholder="`${$t('Name')}`"
                            class="mt-2 mb-n5"
                            dense
                          ></v-text-field>
                        </td>
                        <td class="td--medium pb-5">
                          <v-text-field
                            v-model="alertRule.description"
                            :placeholder="`${$t('Description')}`"
                            class="mt-2 mb-n5"
                            dense
                          ></v-text-field>
                        </td>
                        <td class="td--medium">
                          <v-select
                            v-model="alertRule.measurement_id"
                            :items="sortedSensorMeasurements"
                            :item-text="getText"
                            item-value="id"
                            :label="
                              `${$t('Select')} ${$tc(
                                'measurement',
                                // eslint-disable-next-line vue/comma-dangle
                                1
                              )} ...`
                            "
                            class="mt-2 mb-n5"
                            solo
                          ></v-select>
                        </td>
                        <td class="td--small">
                          <v-select
                            v-model="alertRule.calculation"
                            :items="calculations"
                            item-text="full"
                            item-value="short"
                            :label="`${$t('Select')} ${$t('calculation')} ...`"
                            class="mt-2 mb-n5"
                            solo
                          ></v-select>
                        </td>
                        <td>
                          <VueNumericInput
                            v-model="alertRule.calculation_minutes"
                            class="vue-numeric-input--xsmall"
                          >
                          </VueNumericInput>
                        </td>
                        <td class="td--xsmall">
                          <v-select
                            v-model="alertRule.comparator"
                            :items="comparators"
                            :label="`${$t('Select')} ${$t('comparator')} ...`"
                            class="select-xsmall mt-2 mb-n5"
                            solo
                          ></v-select>
                        </td>
                        <td class="td--small">
                          <v-select
                            v-model="alertRule.comparison"
                            :items="comparisons"
                            item-text="full"
                            item-value="short"
                            :label="`${$t('Select')} ${$t('comparison')} ...`"
                            class="mt-2 mb-n5"
                            solo
                          ></v-select>
                        </td>
                        <td>
                          <VueNumericInput
                            v-model="alertRule.threshold_value"
                            class="vue-numeric-input--xsmall"
                            :step="0.1"
                            :precision="1"
                          >
                          </VueNumericInput>
                        </td>
                        <td class="td--treeselect">
                          <Treeselect
                            v-model="alertRule.exclude_months"
                            :options="months"
                            :placeholder="`${$t('Select')} ${$t('months')}`"
                            :no-results-text="`${$t('no_results')}`"
                            multiple
                          />
                        </td>
                        <td class="td--treeselect">
                          <Treeselect
                            v-model="alertRule.exclude_hours"
                            :options="hours"
                            :placeholder="`${$t('Select')} ${$t('hours')}`"
                            :no-results-text="`${$t('no_results')}`"
                            multiple
                          />
                        </td>
                        <td class="td--treeselect">
                          <Treeselect
                            v-model="alertRule.exclude_hive_ids"
                            :options="hivesArray"
                            :placeholder="`${$t('Select')} ${$tc('hive', 2)}`"
                            :no-results-text="`${$t('no_results')}`"
                            multiple
                          />
                        </td>
                        <td class="td--small pb-5">
                          <v-text-field
                            v-model="alertRule.webhook_url"
                            :placeholder="`${$t('Webhook_url')}`"
                            class="mt-2 mb-n5"
                            dense
                          ></v-text-field>
                        </td>
                        <td class="pr-0">
                          <v-progress-circular
                            v-if="
                              showLoadingIconById.indexOf(alertRule.id) > -1
                            "
                            class="progress-icon mr-3"
                            size="18"
                            width="2"
                            color="green"
                            indeterminate
                          />
                          <v-icon
                            v-if="
                              showLoadingIconById.indexOf(
                                // eslint-disable-next-line vue/comma-dangle
                                alertRule.id
                              ) === -1
                            "
                            dark
                            class="mr-3"
                            color="green"
                            @click="saveAlertRule(alertRule)"
                            >mdi-check</v-icon
                          >
                        </td>
                        <td class="px-0">
                          <v-icon
                            dark
                            color="red"
                            @click="confirmDeleteAlertRule(alertRule, index)"
                            >mdi-delete</v-icon
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import AlertCard from '@components/alert-card.vue'
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'
import VueNumericInput from 'vue-numeric-input'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    AlertCard,
    Confirm,
    Layout,
    ScaleTransition,
    VueNumericInput,
    Treeselect,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      comparators: ['=', '<', '>', '<=', '>='],
      alerts: [],
      alertRules: [],
      alertsEnabled: true,
      ready: false,
      search: null,
      errors: [],
      showDescription: true,
      sensorMeasurements: [],
      showLoadingIconById: [],
      showAlertRules: false,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices', 'devicesPresent']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsWithRuleDetails() {
      var alertsWithRuleDetails = this.alerts
      alertsWithRuleDetails.map((alert) => {
        // if (
        //   this.hives.length === 0 ||
        //   typeof this.hives[alert.hive_id] === 'undefined'
        // ) {
        // var hiveName = 'unknown hive'
        // var hiveLocation = 'unknown apiary'
        //   var hiveGroupName = null
        // } else {
        // hiveName = this.hives[alert.hive_id].name
        // hiveLocation = this.hives[alert.hive_id].location
        //   hiveGroupName = this.hives[alert.hive_id].group_name || null
        // }
        var hiveGroupName = null
        if (this.hives[alert.hive_id].group_name !== undefined) {
          hiveGroupName = this.hives[alert.hive_id].group_name
        }
        // alert.hive_name = hiveName
        // alert.location_name = hiveLocation
        alert.hive_group_name = hiveGroupName
        var ruleExists = this.alertRules.filter(
          (alertRule) => alertRule.id === alert.alert_rule_id
        )
        var ruleName = 'unknown rule'
        if (ruleExists.length > 0) {
          ruleName = ruleExists[0].name
        }
        alert.rule_name = ruleName
      })
      return alertsWithRuleDetails
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
    filteredAlerts() {
      var textFilteredAlerts = []
      if (this.search === null) {
        textFilteredAlerts = this.alertsWithRuleDetails
      } else {
        textFilteredAlerts = this.alertsWithRuleDetails.map((alert) => {
          const alertMatch = Object.entries(alert).some(([key, value]) => {
            if (value !== null && typeof value === 'string') {
              return value.toLowerCase().includes(this.search.toLowerCase())
            } else if (value !== null && key === 'alert_value') {
              return (
                value.filter((val) => {
                  return val.toLowerCase().includes(this.search.toLowerCase())
                }).length > 0
              )
            }
          })
          if (alertMatch) {
            return alert
          }
        })
      }
      return textFilteredAlerts.filter((x) => x !== undefined)
    },
    hives() {
      const ownHivesArray = []
      this.apiaries.forEach((apiary) => {
        apiary.hives.forEach((hive) => {
          hive.label = hive.name
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      this.groups.forEach((group) => {
        group.hives.forEach((hive) => {
          hive.label = hive.name
          hive.group_name = group.name
          sharedHivesArray.push(hive)
        })
      })

      const allHives = ownHivesArray.concat(sharedHivesArray)

      var uniqueHives = {}
      const map = new Map()
      for (const item of allHives) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          uniqueHives[item.id] = item
        }
      }
      return uniqueHives
    },
    hivesArray() {
      return Object.values(this.hives)
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
    locale() {
      return this.$i18n.locale
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
    showAlertPlaceholder() {
      return this.alerts.length === 0
    },
    smallScreen() {
      return (
        this.$vuetify.breakpoint.width < 850 &&
        this.$vuetify.breakpoint.width > 500
      )
    },
    sortedSensorMeasurements() {
      var sortedSMs = this.sensorMeasurements.slice().sort(function(a, b) {
        if (a.abbreviation > b.abbreviation) {
          return 1
        }
        if (b.abbreviation > a.abbreviation) {
          return -1
        }
        return 0
      })
      return sortedSMs
    },
    upTo850() {
      return this.$vuetify.breakpoint.width < 850
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.readDevices().then(() => {
        this.readTaxonomy()
        this.readAlertRules()
        this.readAlerts().then(() => {
          this.ready = true
        })
      })
    })
  },
  methods: {
    async deleteAlertRule(id) {
      console.log('Deleting alert rule ', id)
      try {
        const response = await Api.deleteRequest('/alert-rules/', id) // FIXME: of hele alert-rule??
        if (!response) {
          console.log('Error')
        }
        this.readAlertRules() // update generalalerts in store
        // this.readApiariesAndGroups() // TODO: update apiaries and groups so the latest alert will be displayed at apiary-list
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        // no placeholder needed when response is empty because this page won't be accesible without any hives
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
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
    async readAlerts() {
      try {
        const response = await Api.readRequest('/alerts')
        if (response.data.length === 0) {
          this.showAlertPlaceholder = true
        }
        // TODO: ? this.$store.commit('alerts/setAlerts', response.data.alerts)
        this.alerts = response.data.alerts
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
        // TODO: ? this.$store.commit('alerts/setAlertRules', response.data.alert_rules)
        this.alertRules = response.data.alert_rules
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readDevices() {
      if (this.devicesPresent && this.devices.length === 0) {
        try {
          const response = await Api.readRequest('/devices')
          const devicesPresent = response.data.length > 0
          this.$store.commit('devices/setData', {
            prop: 'devices',
            value: response.data,
          })
          this.$store.commit('devices/setData', {
            prop: 'devicesPresent',
            value: devicesPresent,
          })
          return true
        } catch (error) {
          if (error.response) {
            if (typeof error.response.data.message !== 'undefined') {
              var msg = error.response.data.message
            } else {
              msg = error.response.data
            }
            this.errors.push({
              errorMessage: this.$i18n.t(msg),
            })
            if (error.response.data === 'no_devices_found') {
              this.$store.commit('devices/setData', {
                prop: 'devicesPresent',
                value: false,
              })
              this.$store.commit('devices/setData', {
                prop: 'devices',
                value: [],
              })
            }
          } else {
            this.errors.push({
              errorMessage: this.$i18n.t('Error'),
            })
          }
        }
      }
    },
    async readTaxonomy() {
      try {
        const response = await Api.readRequest('/taxonomy/lists')
        this.sensorMeasurements = response.data.sensormeasurements
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async saveAlertRule(alertRule) {
      this.errorMessage = null
      this.showLoadingIconById.push(alertRule.id)
      try {
        var response = false
        if (alertRule.id !== undefined) {
          response = await Api.updateRequest(
            '/alert-rules/',
            alertRule.id,
            alertRule
          )
        } else {
          // const formData = new FormData()
          // formData.append('name', alertRule.name)
          // formData.append('measurement_id', alertRule.measurement_id)
          // formData.append('calculation', alertRule.calculation)
          // formData.append('comparator', alertRule.comparator)
          // formData.append('comparison', alertRule.comparison)
          // formData.append('threshold_value', alertRule.threshold_value)

          // const headers = {
          //   'Content-Type': 'multipart/form-data; boundary=XXX',
          // }

          // response = await Api.postRequestWithHeaders(
          //   '/alert-rules',
          //   formData,
          //   headers
          // )
          response = await Api.postRequest('/alert-rules', alertRule)
        }
        if (!response) {
          this.errorMessage =
            this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
        }
        this.readAlertRules().then(() => {
          this.showLoadingIconById.splice(
            this.showLoadingIconById.indexOf(alertRule.id),
            1
          )
        })
        // TODO: this.readApiaries() for latest measurement data? Groups as well??
        return true
      } catch (error) {
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(alertRule.id),
          1
        )
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          this.errorMessage = this.$i18n.t('Error')
        }
      }
    },
    addAlertRule() {
      this.alertRules.push({
        name: '',
        description: '',
        measurement_id: null,
        calculation: null,
        calculation_minutes: null,
        comparator: null,
        comparison: null,
        threshold_value: null,
        exclude_months: [],
        exclude_hours: [],
        exclude_hive_ids: [],
        default_rule: 0,
        active: 1,
        alert_via_email: 0,
        webhook_url: '',
      })
    },
    confirmDeleteAlertRule(alertRule, index) {
      if (alertRule.id !== undefined) {
        this.$refs.confirm
          .open(
            this.$i18n.t('delete_alertrule'),
            this.$i18n.t('delete_alertrule') +
              ' (' +
              alertRule.name +
              ' - ' +
              alertRule.description +
              ')?',
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            this.deleteAlertRule(alertRule.id)
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.alertRules.splice(index, 1)
      }
    },
    confirmHideAlert(alert) {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_alert'),
          this.$i18n.t('remove_alert') +
            ' (' +
            alert.rule_name +
            ', ' +
            this.$i18n.t('Date').toLowerCase() +
            ': ' +
            this.momentify(alert.created_at) +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.hideAlert(alert)
        })
        .catch((reject) => {
          return true
        })
    },
    deviceName(id) {
      return this.devices.filter((device) => device.id === id)[0].name
    },
    hideAlert(alert) {
      alert.show = 0
      console.log('toggle show boolean for alert ', alert.id)
      // TODO: async patch request to update show boolean
    },
    getText(item) {
      return item.abbreviation + ' (' + item.pq_name_unit + ')'
    },
    toggleAlerts() {
      this.alertsEnabled = !this.alertsEnabled
      console.log('toggle alerts...') // TODO: dis- or enable all alerts
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  position: fixed;
  top: 100px;
  z-index: 1;
  width: 100%;
  margin-top: -4px;
  background-color: $color-orange-light;
  border-bottom: 1px solid #fff5e2;
  .filter-container {
    @include for-phone-only {
      padding: 10px;
    }
  }
  .filter-bar {
    margin-top: -10px;
    margin-bottom: -10px;
    @include for-tablet-portrait-up {
      margin-top: -12px;
      margin-bottom: -12px;
    }
    .v-input:not(.v-input--switch) {
      background-color: $color-white;
    }
    .v-input--selection-controls {
      padding-top: 0;
      margin-top: 0;
    }
  }
}

.alerts-content {
  margin-top: 80px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 55px;
  }

  .alerts-item-transition-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    @media (max-width: 849px) {
      max-width: 580px;
    }
  }
  .alerts-item {
    flex-grow: 1 !important;
    min-width: 100%;
    padding: 4px;
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
  .td--treeselect {
    min-width: 140px;
    padding: 6px 2px;
  }
}
</style>
