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
            <v-alert
              v-if="alert.show === 1"
              type="error"
              text
              prominent
              dense
              color="red"
              class="alerts-card mb-0"
              outlined
            >
              <div
                class="d-flex flex-no-wrap justify-flex-start align-start"
                style="width: 100%;"
              >
                <v-row class="ml-0 my-0 pl-0 py-0" style="width:100%;">
                  <v-col
                    cols="12"
                    sm="4"
                    class="alert-details-item alert-meta d-flex flex-row justify-flex-start pa-0"
                  >
                    <v-row class="my-0 py-0">
                      <v-col
                        v-if="alert.created_at"
                        cols="5"
                        class="alert-date-item d-flex flex-column align-start pa-0"
                      >
                        <div>
                          <span
                            class="alert-date"
                            v-text="momentify(alert.created_at)"
                          >
                          </span>
                        </div>
                        <span
                          class="alert-text
                        last-visit"
                          v-text="momentFromNow(alert.created_at)"
                        >
                        </span>
                      </v-col>

                      <v-col
                        cols="3"
                        class="hive-icon-wrapper mt-1 ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex justify-center align-start pa-0"
                      >
                        <HiveIcon
                          v-if="typeof hives[alert.hive_id] !== 'undefined'"
                          :hive="hives[alert.hive_id]"
                          :diary-view="true"
                        ></HiveIcon>
                        <span v-else>{{ alert.device_id }}</span>
                      </v-col>

                      <v-col
                        cols="3"
                        sm="4"
                        class="d-flex flex-column align-start pa-0"
                      >
                        <div>
                          <v-tooltip
                            v-if="alert.hive_name.length >= 15 && !smallScreen"
                            bottom
                            max-width="60%"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                class="alerts-label"
                                v-bind="attrs"
                                v-on="on"
                                v-text="
                                  alert.hive_name.substring(
                                    0,
                                    // eslint-disable-next-line vue/comma-dangle
                                    14
                                  ) + '...'
                                "
                              >
                              </span>
                            </template>
                            <span class="alerts-label" v-text="alert.hive_name">
                            </span>
                          </v-tooltip>
                          <span
                            v-else
                            class="alerts-label"
                            v-text="alert.hive_name"
                          >
                          </span>
                        </div>
                        <span
                          class="alert-text"
                          v-text="
                            alert.hive_group_name
                              ? alert.hive_group_name
                              : alert.location_name
                          "
                        >
                        </span>
                        <span
                          v-if="alert.hive_group_name"
                          class="beep-label"
                          v-text="'(' + alert.location_name + ')'"
                        >
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" sm="8" class="alert-content pa-0">
                    <v-row class="my-0 py-0 ml-n6 ml-sm-0 mr-sm-n4">
                      <v-col
                        cols="12"
                        sm="3"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div v-if="alert.rule_name" class="alert-content-item">
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-start mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon>
                                mdi-exclamation-thick
                              </v-icon>
                            </div>
                            <span class="alerts-label" v-text="alert.rule_name">
                            </span>
                          </div>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="3"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <!-- <v-tooltip
                          v-if="alert.alert_function && !upTo850"
                          bottom
                          max-width="60%"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" class="mr-1 my-0" v-on="on">
                              <v-icon>
                                mdi-function
                              </v-icon>
                            </span>
                          </template>
                          <span
                            class="alerts-label"
                            v-text="alert.alert_function"
                          >
                          </span>
                        </v-tooltip> -->
                        <div
                          class="d-flex flex-no-wrap justify-flex-start align-start mr-2"
                        >
                          <span class="mr-1 my-0">
                            <v-icon>
                              mdi-function
                            </v-icon>
                          </span>
                          <span
                            class="alerts-label"
                            v-text="alert.alert_function"
                          >
                          </span>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="4"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div
                          v-if="alert.alert_value !== null"
                          class="alert-content-item"
                        >
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-start mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon>
                                mdi-calculator
                              </v-icon>
                            </div>
                            <div class="d-flex flex-column">
                              <div
                                class="alerts-label"
                                v-text="alert.alert_value"
                              >
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <div class="float-right">
                  <button
                    type="button"
                    class="v-alert__dismissible v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small red--text"
                    aria-label="Close"
                    @click="confirmHideAlert(alert)"
                    ><span class="v-btn__content">
                      <v-icon class="red--text">mdi-delete</v-icon></span
                    ></button
                  >
                </div>
              </div>
            </v-alert>
          </v-col>
        </ScaleTransition>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <div>
            <div class="d-flex justify-space-between">
              <div>
                <div
                  v-if="alertRules.length > 0"
                  class="d-flex flex-row align-center mb-3"
                >
                  <div
                    class="overline"
                    v-text="
                      `${$tc(
                        'alert_rule',
                        // eslint-disable-next-line vue/comma-dangle
                        alertRules.length
                      )}`
                    "
                  ></div>
                  <a
                    ><v-icon
                      class="mdi mdi-information ml-1 icon-info"
                      dark
                      small
                      color="primary"
                      @click="showDescription = !showDescription"
                    ></v-icon
                  ></a>
                </div>
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
            <p v-if="showDescription && ready" class="alertrule-description">
              <em
                >{{ $t('alertrule_info') + ' '
                }}<a :href="$t('alertrule_url')">{{
                  $t('alertrule_url_text')
                }}</a></em
              >
            </p>
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
                        v-if="showLoadingIconById.indexOf(alertRule.id) > -1"
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
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/main.vue'
import HiveIcon from '@components/hive-icon.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'
import VueNumericInput from 'vue-numeric-input'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Confirm,
    Layout,
    HiveIcon,
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
  margin-top: 61px;
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

  .alerts-card {
    height: 100%;
    padding: 10px;
    font-size: 0.8125rem !important;

    @include for-tablet-landscape-up {
      padding: 12px;
      font-size: 0.875rem !important;
    }
    .alerts-label {
      font-size: 0.75rem !important;
      font-weight: 600;
      line-height: 24px !important;
      color: $color-grey;
      letter-spacing: 0.0333333333em !important;
      white-space: nowrap;
      @include for-phone-only {
        font-size: 0.7rem !important;
      }
    }
    .alert-details-item {
      max-width: none;
      margin-bottom: 0;
      line-height: 1.1rem;
      @media (max-width: 849px) {
        min-width: 100%;
      }
    }
    .alert-meta {
      max-width: 275px;
      @include for-tablet-landscape-up {
        max-width: none;
      }
      @media (max-width: 849px) {
        margin-right: -8px;
      }
    }
    .alert-date-item {
      max-width: 130px;
      margin-bottom: 0;
      line-height: 1.1rem;
      @include for-phone-only {
        max-width: 110px;
      }
    }
    .alert-date {
      margin-bottom: 0;
      font-size: 0.75rem !important;
      font-weight: 600;
      line-height: 24px;
      color: $color-grey-dark;
      letter-spacing: 0.0333333333em !important;
      white-space: nowrap;
      @include for-phone-only {
        font-size: 0.7rem !important;
      }
    }
    .alert-text {
      color: rgba(0, 0, 0, 0.87);
      @include for-tablet-portrait-up {
        margin-top: 2px;
      }
    }

    .alert-content {
      margin-top: 10px !important;
      margin-left: 10px !important;
      @include for-tablet-portrait-up {
        margin-left: 0 !important;
      }
      @media (min-width: 850px) {
        margin-top: 0 !important;
      }
      .alert-content-item {
        margin-bottom: 4px;
        @media (min-width: 850px) {
          margin-bottom: 0 !important;
        }
      }
    }
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
