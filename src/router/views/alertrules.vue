<template>
  <Layout :title="this.$i18n.tc('Alertrule', 2)">
    <div v-if="ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row class="filter-bar d-flex align-center">
          <v-card-actions
            :class="
              `${
                showAlertRulePlaceholder ? 'save-button-mobile-wide' : 'mr-1'
              } d-flex ${
                mobile || showAlertRulePlaceholder
                  ? 'justify-end'
                  : 'justify-space-between'
              } align-center`
            "
            style="width: 100%;"
          >
            <div
              v-if="!showAlertRulePlaceholder"
              class="d-flex justify-start align-center"
            >
              <v-switch
                v-model="alertsEnabled"
                :label="
                  alertsEnabled ? $t('alerts_enabled') : $t('alerts_disabled')
                "
                hide-details
                class="pt-0"
                @change="toggleAlerts"
              ></v-switch>
              <v-icon
                class="mdi mdi-information icon-info cursor-pointer ml-2"
                dark
                small
                :color="showExplanation ? 'accent' : 'grey'"
                @click="showExplanation = !showExplanation"
              ></v-icon>
            </div>
            <v-menu v-if="showAlertRulePlaceholder || !mobile" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  tile
                  outlined
                  color="black"
                  class="save-button-mobile-wide"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-plus</v-icon>
                  {{ $t('Add_alertrule') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in buttonMenuItems"
                  :key="index"
                  :to="item.route ? { name: item.route } : null"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="ready && showAlertRulePlaceholder" class="mb-n12 mt-12">
      <v-row>
        <v-col>
          <div class="text-center">
            <img
              :src="assetsUrl + '/img/BEEP-alert-rule.png'"
              style="max-width: 180px;"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="!ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <v-container class="alertrules-content">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              v-if="showExplanation && ready"
              cols="12"
              xl="9"
              class="d-flex justify-start align-start"
            >
              <p :class="`beep-label mb-2 ${mobile ? 'mb-n2' : 'mt-n6'}`">
                <em
                  >{{
                    $t('alert_explanation_1') + ' ' + $t('alert_explanation_2')
                  }}
                  <a :href="$t('alerts_support_url')" target="_blank"
                    ><v-icon small color="accent">mdi-arrow-right</v-icon
                    >{{ $t('alerts_url_text') }}</a
                  ></em
                >
              </p>
            </v-col>
            <v-col
              v-if="mobile"
              cols="12"
              xl="3"
              class="d-flex justify-end align-end mb-3"
            >
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    outlined
                    small
                    color="accent"
                    class="save-button-mobile-wide"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('Add_alertrule') }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in buttonMenuItems"
                    :key="index"
                    :to="item.route ? { name: item.route } : null"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <div v-if="!showAlertRulePlaceholder" class="rounded-border">
            <v-simple-table class="v-data-table--smallfont">
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $t('Active') }}
                    </th>
                    <th class="text-left">
                      {{ mobile ? $t('email') : $t('Alert_via_email') }}
                    </th>
                    <th class="text-left">
                      {{ $t('Name') }}
                    </th>
                    <th v-if="!mobile" class="text-left">
                      {{ $t('Calculation_minutes_short') }}
                    </th>
                    <th class="text-left">
                      {{ $tc('Action', 2) }}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(alertRule, index) in sortedAlertRules"
                    :key="index"
                  >
                    <td>
                      <v-progress-circular
                        v-if="
                          showLoadingIconById.active.indexOf(alertRule.id) > -1
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
                            // eslint-disable vue/comma-dangle
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
                    <td :class="!alertRule.active ? 'td--not-active' : ''">
                      <v-progress-circular
                        v-if="
                          showLoadingIconById.alert_via_email.indexOf(
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
                            alertRule.id
                          ) === -1
                        "
                        dark
                        :color="alertRule.alert_via_email ? 'green' : 'red'"
                        @click="toggleAlertRule(alertRule, 'alert_via_email')"
                        >{{
                          alertRule.alert_via_email ? 'mdi-check' : 'mdi-close'
                        }}</v-icon
                      >
                    </td>
                    <td :class="!alertRule.active ? 'td--not-active' : ''">
                      <span v-text="alertRule.name"></span>
                    </td>
                    <!-- <td :class="!alertRule.active ? 'td--not-active' : ''">
                      <span v-text="alertRule.description"></span>
                    </td> -->
                    <td
                      v-if="!mobile"
                      :class="!alertRule.active ? 'td--not-active' : ''"
                    >
                      <span
                        v-text="
                          momentHumanizeHours(
                            alertRule.calculation_minutes,
                            true,
                            false
                          )
                        "
                      ></span>
                    </td>
                    <td :class="!alertRule.active ? 'td--not-active' : ''">
                      <router-link
                        :to="{
                          name: 'alertrule-edit',
                          params: { id: alertRule.id },
                        }"
                      >
                        <v-icon dark color="accent">mdi-pencil</v-icon>
                      </router-link>
                    </td>
                    <td :class="!alertRule.active ? 'td--not-active' : ''">
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
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentHumanizeHours } from '@mixins/momentMixin'
import { readAlertRules } from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    Layout,
  },
  mixins: [momentHumanizeHours, readAlertRules],
  data: function() {
    return {
      ready: false,
      errors: [],
      showExplanation: false,
      showLoadingIconById: {
        active: [],
        alert_via_email: [],
      },
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRules']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    alertsEnabled: {
      get() {
        if (this.alertRules.length > 0) {
          return (
            this.alertRules.filter((alertRule) => alertRule.active === 1)
              .length > 0
          )
        } else {
          return false
        }
      },
      set(value) {
        return null
      },
    },
    buttonMenuItems() {
      return [
        {
          icon: 'mdi-plus',
          title: this.$i18n.t('New_alertrule'),
          route: 'alertrule-create',
        },
        {
          icon: 'mdi-content-copy',
          title: this.$i18n.t('Select_default_alertrule'),
          route: 'alertrules-default',
        },
      ]
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showAlertRulePlaceholder() {
      return this.alertRules.length === 0
    },
    sortedAlertRules() {
      const sortedAlertRules = this.alertRules.slice().sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1
        }
        return 0
      })
      return sortedAlertRules
    },
  },
  created() {
    if (this.alertRules.length === 0) {
      this.readAlertRules().then(() => {
        if (this.alertRules.length === 0) {
          this.showExplanation = true
        }
        this.ready = true
      })
    } else {
      this.ready = true
    }
  },
  methods: {
    async deleteAlertRule(id) {
      console.log('Deleting alert rule ', id)
      try {
        const response = await Api.deleteRequest('/alert-rules/', id)
        if (!response) {
          console.log('Error')
        }
        // update alertRules in store
        this.readAlertRules().then(() => {
          if (this.alertRules.length === 0) {
            this.showExplanation = true
          }
        })
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
      var alertRuleNew = { ...alertRule }
      alertRuleNew[property] = !alertRuleNew[property] // NB yields vuex strict error but can be ignored here because the property value will be changed in the store directly after triggering this error
      try {
        const response = await Api.updateRequest(
          '/alert-rules/',
          alertRule.id,
          alertRuleNew
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
            (alertRule.description ? ' - ' + alertRule.description : '') +
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
    toggleAlerts() {
      if (this.alertsEnabled) {
        // disable active alerts
        this.alertRules.map((alertRule) => {
          if (alertRule.active) {
            this.toggleAlertRule(alertRule, 'active')
          }
        })
      } else {
        // enable inactive alerts
        this.alertRules.map((alertRule) => {
          if (!alertRule.active) {
            this.toggleAlertRule(alertRule, 'active')
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  top: 52px;
  .filter-bar {
    .v-input:not(.v-input--switch) {
      background-color: $color-white;
    }
    .v-input--selection-controls {
      margin-top: 0;
    }
  }
}

.alertrules-content {
  margin-top: 75px;
  @include for-phone-only {
    margin-top: 40px;
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

.td--not-active {
  opacity: 0.5;
}
</style>
