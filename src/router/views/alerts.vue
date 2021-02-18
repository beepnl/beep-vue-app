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
                  } filter-text-field--large`
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
              @change="toggleAlerts"
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
            <div class="overline" v-text="$tc('alertrule', 2)"></div>
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
              <v-row>
                <v-col
                  cols="12"
                  lg="10"
                  class="d-flex justify-start align-start pb-0 mb-lg-3"
                >
                  <v-icon
                    v-if="showAlertRules"
                    class="mdi mdi-information icon-info cursor-pointer mr-2"
                    dark
                    small
                    color="primary"
                    @click="showDescription = !showDescription"
                  ></v-icon>
                  <p v-if="showDescription && ready" class="mt-n1 mb-0">
                    <em
                      >{{ $t('alertrule_info') + ' '
                      }}<router-link :to="{ name: 'alertrules-default' }">{{
                        $t('alertrules_default_url_text')
                      }}</router-link></em
                    >
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  lg="2"
                  class="d-flex justify-end align-center mb-3"
                >
                  <router-link
                    :to="{
                      name: 'alertrule-create',
                    }"
                  >
                    <v-btn tile outlined color="primary">
                      <v-icon left>mdi-plus</v-icon>
                      {{ $t('add') + ' ' + $tc('alertrule', 1) }}
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
              <div v-if="alertRules.length > 0" class="rounded-border">
                <v-simple-table class="v-data-table--smallfont">
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
                          {{ $t('Actions') }}
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(alertRule, index) in alertRules" :key="index">
                        <td>
                          <v-progress-circular
                            v-if="
                              showLoadingIconById.active.indexOf(alertRule.id) >
                                -1
                            "
                            class="progress-icon"
                            size="18"
                            width="2"
                            :color="alertRule.active ? 'red' : 'green'"
                            indeterminate
                          />
                          <v-icon
                            v-if="
                              showLoadingIconById.active.indexOf(
                                // eslint-disable-next-line vue/comma-dangle
                                alertRule.id
                              ) === -1
                            "
                            dark
                            :color="alertRule.active ? 'green' : 'red'"
                            @click="toggleAlertRule(alertRule, 'active')"
                            >{{
                              alertRule.active ? 'mdi-check' : 'mdi-close'
                            }}</v-icon
                          >
                        </td>
                        <td>
                          <v-progress-circular
                            v-if="
                              showLoadingIconById.alert_via_email.indexOf(
                                // eslint-disable-next-line vue/comma-dangle
                                alertRule.id
                              ) > -1
                            "
                            class="progress-icon"
                            size="18"
                            width="2"
                            :color="alertRule.alert_via_email ? 'red' : 'green'"
                            indeterminate
                          />
                          <v-icon
                            v-if="
                              showLoadingIconById.alert_via_email.indexOf(
                                // eslint-disable-next-line vue/comma-dangle
                                alertRule.id
                              ) === -1
                            "
                            dark
                            :color="alertRule.alert_via_email ? 'green' : 'red'"
                            @click="
                              toggleAlertRule(alertRule, 'alert_via_email')
                            "
                            >{{
                              alertRule.alert_via_email
                                ? 'mdi-check'
                                : 'mdi-close'
                            }}</v-icon
                          >
                        </td>
                        <td>
                          <span v-text="alertRule.name"></span>
                        </td>
                        <td>
                          <span v-text="alertRule.description"></span>
                        </td>
                        <td>
                          <router-link
                            :to="{
                              name: 'alertrule-edit',
                              params: { id: alertRule.id },
                            }"
                          >
                            <v-icon dark color="primary">mdi-pencil</v-icon>
                          </router-link>
                        </td>
                        <td>
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

export default {
  components: {
    AlertCard,
    Confirm,
    Layout,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      alerts: [],
      ready: false,
      search: null,
      errors: [],
      showDescription: true,
      showLoadingIconById: {
        active: [],
        alert_via_email: [],
      },
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRules']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsEnabled() {
      if (this.alertRules.length > 0) {
        return (
          this.alertRules.filter((alertRule) => alertRule.active === 1).length >
          0
        )
      } else {
        return false
      }
    },
    alertsWithRuleDetails() {
      var alertsWithRuleDetails = this.alerts
      alertsWithRuleDetails.map((alert) => {
        var hiveGroupName = null
        if (
          this.hives[alert.hive_id] !== undefined &&
          this.hives[alert.hive_id].group_name !== undefined
        ) {
          hiveGroupName = this.hives[alert.hive_id].group_name
        }
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
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showAlertPlaceholder() {
      return this.alerts.length === 0
    },
    showAlertRules: {
      get() {
        return this.$store.getters['alerts/showAlertRules']
      },
      set(value) {
        this.$store.commit('alerts/setData', {
          prop: 'showAlertRules',
          value,
        })
      },
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.readAlerts().then(() => {
        if (this.alertRules.length === 0) {
          this.readAlertRules().then(() => {
            this.ready = true
          })
        } else {
          this.ready = true
        }
      })
    })
  },
  methods: {
    async deleteAlertRule(id) {
      console.log('Deleting alert rule ', id)
      try {
        const response = await Api.deleteRequest('/alert-rules/', id)
        if (!response) {
          console.log('Error')
        }
        this.readAlertRules() // update alertRules in store
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async hideAlert(alert) {
      alert.show = 0
      try {
        const response = await Api.updateRequest('/alerts/', alert.id, alert)
        if (response) {
          this.readAlerts()
        }
      } catch (error) {
        alert.show = 1
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
    async toggleAlertRule(alertRule, property) {
      this.showLoadingIconById[property].push(alertRule.id)
      alertRule[property] = !alertRule[property] // NB yields vuex strict error but can be ignored here because the property value will be changed in the store directly after triggering this error
      try {
        const response = await Api.updateRequest(
          '/alert-rules/',
          alertRule.id,
          alertRule
        )
        if (response) {
          this.readAlertRules().then(() => {
            this.showLoadingIconById[property].splice(
              this.showLoadingIconById[property].indexOf(alertRule.id),
              1
            )
          })
        }
      } catch (error) {
        alertRule[property] = !alertRule[property]
        this.showLoadingIconById[property].splice(
          this.showLoadingIconById[property].indexOf(alertRule.id),
          1
        )
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    confirmDeleteAlertRule(alertRule, index) {
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
    getText(item) {
      return item.abbreviation + ' (' + item.pq_name_unit + ')'
    },
    toggleAlerts() {
      this.alertRules.map((alertRule) => {
        if (alertRule.active !== this.alertsEnabled) {
          this.toggleAlertRule(alertRule, 'active')
        }
      })
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
</style>
