<template>
  <Layout>
    <v-container v-if="showAlertPlaceholder && ready">
      <v-row>
        <v-col sm="auto" :cols="12">
          {{ $t('no_data') }}
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
              v-model="alert.show"
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
                <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                  <v-col
                    cols="12"
                    sm="4"
                    class="alert-details-item alert-meta d-flex flex-row justify-flex-start pa-0"
                  >
                    <v-row class="py-0">
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
                              : alert.hive_location
                          "
                        >
                        </span>
                        <span
                          v-if="alert.hive_group_name"
                          class="beep-label"
                          v-text="'(' + alert.hive_location + ')'"
                        >
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" sm="8" class="alert-content pa-0">
                    <v-row class="py-0 ml-n6 ml-sm-0 mr-sm-n4">
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
                        sm="1"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <v-tooltip
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
                        </v-tooltip>
                        <div
                          v-else
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
                        sm="7"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div
                          v-if="alert.alert_value.length > 0"
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
                                v-for="(alertValue, index) in alert.alert_value"
                                :key="`alertValue + ${index}`"
                                class="alerts-label"
                                v-text="alertValue"
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
      <v-row v-if="alerts.length === 0">
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
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

export default {
  components: {
    Confirm,
    Layout,
    HiveIcon,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      alerts: [],
      alertRules: [],
      alertsEnabled: true,
      ready: false,
      search: null,
      errors: [],
    }
  },
  computed: {
    ...mapGetters('devices', ['devices', 'devicesPresent']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsWithHiveAndRuleDetails() {
      var alertsWithHiveAndRuleDetails = this.alerts
      alertsWithHiveAndRuleDetails.map((alert) => {
        // FIXME: what if hive does not exist anymore?? display device name instead?
        if (
          this.hives.length === 0 ||
          typeof this.hives[alert.hive_id] === 'undefined'
        ) {
          var hiveName = 'unknown hive'
          var hiveLocation = 'unknown apiary'
          var hiveGroupName = null
        } else {
          hiveName = this.hives[alert.hive_id].name
          hiveLocation = this.hives[alert.hive_id].location
          hiveGroupName = this.hives[alert.hive_id].group_name || null
        }
        alert.hive_name = hiveName
        alert.hive_location = hiveLocation
        alert.hive_group_name = hiveGroupName
        const ruleName = this.alertRules.filter(
          (alertRule) => alertRule.id === alert.rule_id
        )[0].name
        alert.rule_name = ruleName
      })
      return alertsWithHiveAndRuleDetails
    },
    filteredAlerts() {
      var textFilteredAlerts = []
      if (this.search === null) {
        textFilteredAlerts = this.alertsWithHiveAndRuleDetails
      } else {
        textFilteredAlerts = this.alertsWithHiveAndRuleDetails.map((alert) => {
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
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      this.groups.forEach((group) => {
        group.hives.forEach((hive) => {
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
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showAlertPlaceholder() {
      return this.alerts.length === 0 || this.hives.length === 0
    },
    smallScreen() {
      return (
        this.$vuetify.breakpoint.width < 850 &&
        this.$vuetify.breakpoint.width > 500
      )
    },
    upTo850() {
      return this.$vuetify.breakpoint.width < 850
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent()
      .then(() => {
        this.readDevices()
      })
      .then(() => {
        this.readAlertRules()
      })
      .then(() => {
        this.readAlerts()
      })
      .then(() => {
        this.ready = true
      })
  },
  methods: {
    async deleteAlertRule(id) {
      console.log('Deleting alert rule ', id)
      // try {
      //   const response = await Api.deleteRequest('/alerts/', id)
      //   if (!response) {
      //     console.log('Error')
      //   }
      //   this.readAlerts() // update generalalerts in store
      //   this.readApiariesAndGroups() // update apiaries and groups so the latest alert will be displayed at apiary-list
      // } catch (error) {
      //   if (error.response) {
      //     console.log('Error: ', error.response)
      //   } else {
      //     console.log('Error: ', error)
      //   }
      // }
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
      // DUMMY DATA
      this.alerts = [
        {
          id: 1,
          created_at: '2021-01-04T09:07:36+00:00',
          rule_id: 1,
          alert_function: 'min. weight < 10kg in 15 minutes',
          alert_value: ['min. weight = 2kg in 15 minutes'],
          show: true,
          device_id: 257,
          hive_id: 121,
        },
        {
          id: 2,
          created_at: '2021-01-03T05:07:36+00:00',
          rule_id: 2,
          alert_function: 'min. temperature inside < 12C in 4 x 6 hours',
          alert_value: [
            'min. temperature inside = 11C',
            'min. temperature inside = 11C',
            'min. temperature inside = 10C',
            'min. temperature inside = 10C',
          ],
          show: true,
          device_id: 257,
          hive_id: 121,
        },
      ]
      // try {
      //   const response = await Api.readRequest('/alerts')
      //   if (response.data.length === 0) {
      //     this.showAlertPlaceholder = true
      //   }
      //   // this.$store.commit('alerts/setAlerts', response.data)
      //   return true
      // } catch (error) {
      //   if (error.response) {
      //     console.log('Error: ', error.response)
      //   } else {
      //     console.log('Error: ', error)
      //   }
      // }
    },
    async readAlertRules() {
      // DUMMY DATA
      this.alertRules = [
        {
          id: 1,
          name: 'Theft',
          description: 'Check if colony has been stolen or fallen over',
          measurement: 'weight_kg',
          active_hours: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
          ],
          active_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          period: 15,
          number_of_times: 1,
          calculation: 'min',
          comparator: '<',
          comparison_function: 'value',
          value: 10.0,
          active: true,
        },
        {
          id: 2,
          name: 'Winter survival',
          description: 'Check if colony is still alive',
          measurement: 't_0',
          active_hours: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
          ],
          active_months: [1, 2, 3, 4, 10, 11, 12],
          period: 360,
          number_of_times: 4,
          calculation: 'min',
          comparator: '<',
          comparison_function: 'value',
          value: 12.0,
          active: true,
        },
      ]
      // try {
      //   const response = await Api.readRequest('/alerts/rules')
      //   // this.$store.commit('alerts/setAlertRules', response.data)
      //   return true
      // } catch (error) {
      //   if (error.response) {
      //     console.log('Error: ', error.response)
      //   } else {
      //     console.log('Error: ', error)
      //   }
      // }
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
      alert.show = false
      console.log('toggle show boolean for alert ', alert.id)
      // TODO: async patch request to update show boolean
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
</style>
