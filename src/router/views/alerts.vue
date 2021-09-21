<template>
  <Layout>
    <div
      v-if="ready || (alertsLoading && alertRules.length > 0)"
      class="filter-bar-wrapper"
    >
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons filter-buttons--has-max d-flex flex-row justify-flex-start align-center"
          >
            <v-col class="pa-3">
              <v-text-field
                v-if="!showAlertPlaceholder"
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field--alerts`
                "
                :height="mobile ? '30px' : '36px'"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </div>
          <v-card-actions class="pl-0 mr-1">
            <v-btn
              v-if="alerts.length > 1 && !mobile"
              tile
              outlined
              class="mr-3"
              color="red"
              @click="confirmDeleteAlerts"
            >
              <v-progress-circular
                v-if="showLoadingIcon"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="disabled"
                indeterminate
              />
              <v-icon v-if="!showLoadingIcon" left>mdi-delete</v-icon>
              {{ !smallScreen ? $t('delete_all_alerts') : $t('Delete') }}</v-btn
            >
            <v-btn
              :to="{ name: 'alertrules' }"
              tile
              outlined
              color="black"
              :small="tinyScreen"
            >
              <v-icon left>mdi-pencil</v-icon>
              {{ $t('alertrule_pagetitle') }}
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="!ready || alertsLoading" class="alerts-content">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <v-container v-if="showAlertPlaceholder && ready" class="alerts-content">
      <v-row>
        <v-col>
          <div class="text-center">
            <router-link
              :to="{
                name: 'alertrules',
              }"
            >
              <img
                src="@assets/img/BEEP-alert-rule.png"
                style="max-width: 180px;"
              />
            </router-link>
          </div>
          <p class="beep-label"
            ><em
              >{{
                $t('alert_explanation_1') +
                  ' ' +
                  $t('alert_explanation_2') +
                  ''
              }}<router-link
                :to="{
                  name: 'alertrules',
                }"
              >
                {{ $t('alertrules_url_text') }}
              </router-link></em
            ></p
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="!showAlertPlaceholder && ready" class="alerts-content">
      <v-btn
        v-if="alerts.length > 1 && mobile"
        tile
        outlined
        class="save-button-mobile-wide mb-3"
        color="red"
        @click="confirmDeleteAlerts"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="disabled"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-delete</v-icon>
        {{ $t('delete_all_alerts') }}</v-btn
      >

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

      <v-row v-if="alerts.length > 0" dense>
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
              @delete-alert="deleteAlert($event)"
            ></AlertCard>
          </v-col>
        </ScaleTransition>
      </v-row>

      <v-row v-if="alerts.length === 0 && !alertsLoading">
        <v-col sm="auto" :cols="12">
          {{ $t('no_alerts') }}
        </v-col>
      </v-row>
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
import { momentFromNow, momentify } from '@mixins/momentMixin'
import {
  checkAlerts,
  readApiariesAndGroupsIfNotPresent,
} from '@mixins/methodsMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    AlertCard,
    Confirm,
    Layout,
    ScaleTransition,
  },
  mixins: [
    checkAlerts,
    momentFromNow,
    momentify,
    readApiariesAndGroupsIfNotPresent,
  ],
  data: function() {
    return {
      ready: false,
      search: null,
      errors: [],
      showDescription: true,
      showLoadingIconById: {
        active: [],
        alert_via_email: [],
      },
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRules', 'alerts', 'alertsLoading']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsWithRuleDetails() {
      var alertsWithRuleDetails = this.alerts
      alertsWithRuleDetails.map((alert) => {
        alert.locale_date = this.momentify(alert.created_at, true)
        alert.moment_from_now = this.momentFromNow(alert.created_at, true)
        var hiveGroupName = null
        if (
          this.hives[alert.hive_id] !== undefined &&
          this.hives[alert.hive_id].group_name !== undefined
        ) {
          hiveGroupName = this.hives[alert.hive_id].group_name
        }
        alert.hive_group_name = hiveGroupName
      })

      var sortedAlerts = alertsWithRuleDetails.slice().sort(function(a, b) {
        if (a.created_at > b.created_at) {
          return -1
        }
        if (b.created_at < a.created_at) {
          return 1
        }
        return 0
      })
      return sortedAlerts
    },
    filteredAlerts() {
      var textFilteredAlerts = []
      if (this.search === null) {
        textFilteredAlerts = this.alertsWithRuleDetails
      } else {
        textFilteredAlerts = this.alertsWithRuleDetails.map((alert) => {
          const alertMatch = Object.entries(alert).some(([key, value]) => {
            if (
              value !== null &&
              typeof value === 'string' &&
              key !== 'created_at'
            ) {
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
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showAlertPlaceholder() {
      if (this.ready) {
        return this.alertRules.length === 0
      } else {
        return false
      }
    },
    smallScreen() {
      return this.$vuetify.breakpoint.width < 960
    },
    tinyScreen() {
      return this.$vuetify.breakpoint.width < 373
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.checkAlertRulesAndAlerts().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async deleteAlert(id) {
      try {
        const response = await Api.deleteRequest('/alerts/', id)
        if (!response) {
          console.log('Error')
        }
        this.readAlerts() // update alerts in store
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async deleteAllAlerts() {
      this.showLoadingIcon = true
      try {
        const response = await Api.deleteRequest('/alerts/', 'all')
        if (!response) {
          console.log('Error')
        }
        this.readAlerts().then(() => {
          this.showLoadingIcon = false
        }) // update alerts in store
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    confirmDeleteAlerts() {
      const warningMessage =
        this.search !== null && this.search !== ''
          ? this.$i18n.t('delete_all_alerts_warning_filter_active')
          : this.$i18n.t('delete_all_alerts_warning')
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_all_alerts'),
          null,
          {
            color: 'red',
          },
          warningMessage
        )
        .then((confirm) => {
          this.deleteAllAlerts()
        })
        .catch((reject) => {
          return true
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  .filter-bar {
    .filter-buttons {
      @include for-phone-only {
        max-width: 130px;
      }
      @media (max-width: 350px) {
        max-width: 70px;
      }
    }
  }
}

.alerts-content {
  margin-top: 68px;
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
</style>
