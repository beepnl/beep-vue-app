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
              label="enable Alerts"
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
              type="error"
              text
              prominent
              dense
              color="red"
              class="alerts-card"
              outlined
            >
              <div
                class="d-flex flex-no-wrap justify-flex-start align-start"
                style="width: 100%;"
              >
                <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                  <v-col
                    cols="12"
                    sm="5"
                    class="alert-details-item alert-meta d-flex flex-row justify-flex-start pa-0"
                  >
                    <v-row class="pl-3 py-0">
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
                        class="hive-icon-wrapper mt-1 ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex justify-center align-end pa-0"
                      >
                        <HiveIcon
                          :hive="hives[alert.hive_id]"
                          :diary-view="true"
                        ></HiveIcon>
                      </v-col>

                      <v-col
                        cols="4"
                        class="d-flex flex-column align-start pa-0 pr-3"
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

                  <v-col cols="12" sm="7" class="alert-content pa-0">
                    <v-row class="py-0 ml-sm-0 mr-sm-n4">
                      <v-col
                        cols="12"
                        sm="1"
                        lg="3"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div
                          v-if="alert.alert_function"
                          class="alert-content-item"
                        >
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon class="red--text">
                                mdi-clipboard-alert-outline
                              </v-icon>
                            </div>
                            <span
                              class="alerts-label hide-md"
                              v-text="alert.alert_function"
                            >
                            </span>
                          </div>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="1"
                        lg="3"
                        class="alert-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div
                          v-if="alert.alert_value"
                          class="alert-content-item"
                        >
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon class="red--text">
                                mdi-clipboard-alert-outline
                              </v-icon>
                            </div>
                            <span
                              class="alerts-label hide-md"
                              v-text="alert.alert_value"
                            >
                            </span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
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
      alertsEnabled: true,
      ready: false,
      search: null,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices', 'devicesPresent']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsWithHiveDetails() {
      var alertsWithHiveDetails = this.alerts
      alertsWithHiveDetails.map((alert) => {
        const name = this.hives[alert.hive_id].name // FIXME: what if hive does not exist anymore??
        const location = this.hives[alert.hive_id].location
        const groupName = this.hives[alert.hive_id].group_name || null
        alert.hive_name = name
        alert.hive_location = location
        alert.hive_group_name = groupName
      })
      return alertsWithHiveDetails
    },
    filteredAlerts() {
      var textFilteredAlerts = []
      if (this.search === null) {
        textFilteredAlerts = this.alertsWithHiveDetails
      } else {
        textFilteredAlerts = this.alertsWithHiveDetails.map((alert) => {
          const alertMatch = Object.entries(alert).some(([key, value]) => {
            if (value !== null && typeof value === 'string') {
              return value.toLowerCase().includes(this.search.toLowerCase())
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
      return this.alerts.length === 0
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.readDevices().then(() => {
        this.readAlerts().then(() => {
          this.ready = true
        })
      })
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
          created_at: '2021-01-04T09:07:36+00:00',
          rule_id: 1,
          alert_function:
            'weight_kg < -10% in 15 minutes OR t_0 < 10% in 15 minutes',
          alert_value: 'weight_kg < -12% in 15 minutes',
          read: false,
          device_id: 257,
          hive_id: 121,
        },
        {
          created_at: '2021-01-03T05:07:36+00:00',
          rule_id: 2,
          alert_function: 't_0 < 12C in 24 hours',
          alert_value: 't_0 = 11C, t_0=11C, t_0=10C, t_0=10C',
          read: false,
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
      this.alertRules = []
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
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      }
    },
    confirmDeleteAlert(alert) {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_alert'),
          this.$i18n.t('remove_alert') + ' (' + alert.title + ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteAlert(alert.id)
        })
        .catch((reject) => {
          return true
        })
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
      max-width: 330px;
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
        max-width: 120px;
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

    .hide-md {
      display: flex;
      @media (min-width: 851px) and (max-width: 1264px) {
        display: none;
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
