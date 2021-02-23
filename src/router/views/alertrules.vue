<template>
  <Layout :title="this.$i18n.t('alertrule_pagetitle')">
    <v-container v-if="ready">
      <v-row>
        <v-col sm="auto" :cols="12">
          {{ $t('no_alerts') }}
        </v-col>
      </v-row>
    </v-container>

    <div v-if="ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row class="filter-bar d-flex flex-row justify-end align-center">
          <v-card-actions class="mr-1">
            <v-switch
              v-model="alertsEnabled"
              :label="
                alertsEnabled ? $t('alerts_enabled') : $t('alerts_disabled')
              "
              hide-details
              class="filter-text-field--large"
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

    <v-container class="alertrules-content">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              cols="12"
              lg="10"
              class="d-flex justify-start align-start pb-0 mb-lg-3"
            >
              <v-icon
                class="mdi mdi-information icon-info cursor-pointer mr-2"
                dark
                small
                color="primary"
                @click="showDescription = !showDescription"
              ></v-icon>
              <p v-if="showDescription && ready" class="mt-n1 mb-0">
                <em>{{ $t('alertrule_info') }}</em>
              </p>
            </v-col>
            <v-col
              cols="12"
              lg="2"
              class="d-flex justify-end align-center mb-3"
            >
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    outlined
                    color="primary"
                    class="save-button-mobile-wide"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('add') + ' ' + $tc('alertrule', 1) }}
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
                        @click="toggleAlertRule(alertRule, 'alert_via_email')"
                        >{{
                          alertRule.alert_via_email ? 'mdi-check' : 'mdi-close'
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
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Confirm,
    Layout,
  },
  data: function() {
    return {
      ready: false,
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
    buttonMenuItems() {
      return [
        {
          icon: 'mdi-plus',
          title: this.$i18n.t('New') + ' ' + this.$i18n.tc('alertrule', 1),
          route: 'alertrule-create',
        },
        {
          icon: 'mdi-content-copy',
          title: this.$i18n.t('Select_default_alertrule'),
          route: 'alertrules-default',
        },
      ]
    },
  },
  created() {
    if (this.alertRules.length === 0) {
      this.readAlertRules().then(() => {
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
        this.readAlertRules() // update alertRules in store
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
  top: 48px;
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
  margin-top: 55px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 0;
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
