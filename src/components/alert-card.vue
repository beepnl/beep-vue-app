<template>
  <v-menu bottom left absolute offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-alert
        type="error"
        text
        prominent
        dense
        :color="
          alert.alert_function.indexOf('alert_rule') > -1
            ? 'primary'
            : alertRuleNotActive || alertRule === undefined
            ? 'grey'
            : 'red'
        "
        class="alert-card cursor-pointer mb-0 pa-2 pa-sm-3"
        outlined
        v-on="!mobile ? menu : null"
      >
        <template v-slot:prepend>
          <div class="d-flex flex-column justify-start align-center">
            <v-checkbox
              v-if="mobile"
              :input-value="isSelected"
              class="ma-0 pt-0"
              dense
              :ripple="false"
              hide-details
              @change="toggleCheckbox(alert.id)"
            />

            <div class="alert-icon d-flex align-center">
              <v-badge
                v-if="alert.count > 1"
                :offset-x="alert.count > 9 ? '23' : '20'"
                offset-y="20"
                color="transparent"
                :content="alert.count > 99 ? '99' : alert.count"
              >
                <v-icon color="red">mdi-bell</v-icon>
              </v-badge>
              <v-icon v-else color="red">
                mdi-bell
              </v-icon>
            </div>
          </div>
        </template>

        <div style="width: 100%;" v-on="mobile ? menu : null">
          <v-row class="ma-0 pl-0 py-0" style="width:100%;">
            <v-col cols="12" md="6" class="alert-details-item alert-meta pa-0">
              <v-row
                class="d-flex flex-row justify-space-between align-start ma-0 py-0 pr-1"
              >
                <v-col
                  v-if="alert.updated_at"
                  cols="8"
                  md="5"
                  class="alert-date-item d-flex flex-column align-start pa-0 mb-3"
                >
                  <div v-if="alert.count > 1">
                    <span
                      class="alert-date"
                      v-text="alert.locale_date_created_at"
                    >
                    </span>
                  </div>
                  <div>
                    <span
                      class="alert-date"
                      v-text="
                        alert.count > 1
                          ? alert.locale_date_updated_at
                          : alert.locale_date_single_count
                      "
                    >
                    </span>
                  </div>
                  <span
                    class="alert-text
                        last-visit"
                    v-text="alert.momentified"
                  >
                  </span>
                </v-col>

                <v-col
                  v-if="hives[alert.hive_id] !== undefined"
                  cols="4"
                  sm="3"
                  md="2"
                  class="hive-icon-wrapper mt-1 ml-lg-n2 mr-lg-n2 d-flex flex-column justify-end align-center pa-0"
                  style="width: 100%;"
                >
                  <HiveIcon
                    :hive="hives[alert.hive_id]"
                    :diary-view="true"
                  ></HiveIcon>
                  <div
                    v-if="mdScreen"
                    class="d-flex flex-column text-center"
                    style="width: 100%;"
                  >
                    <div v-if="alert.hive_name !== null" class="truncate-xs">
                      <span class="alert-label" v-text="alert.hive_name">
                      </span>
                    </div>
                    <div v-if="alert.device_name !== null" class="truncate-xs">
                      <span class="alert-label" v-text="alert.device_name">
                      </span>
                    </div>
                  </div>
                </v-col>

                <v-col
                  v-else-if="alert.hive_id !== null"
                  cols="3"
                  md="2"
                  class="ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex flex-column align-center pa-0"
                  ><span class="alert-label alert-label-break text-center"
                    ><i
                      >{{ $tc('Hive_short', 1) }}<br />
                      {{ $t('unknown') }}
                    </i></span
                  >
                </v-col>

                <v-col
                  v-if="!mdScreen"
                  cols="12"
                  md="4"
                  class="d-flex flex-column align-start pa-0"
                >
                  <div v-if="alert.hive_name !== null">
                    <v-tooltip
                      v-if="
                        alert.hive_name !== null && alert.hive_name.length >= 20
                      "
                      bottom
                      max-width="60%"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="alert-label"
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
                      <span class="alert-label" v-text="alert.hive_name">
                      </span>
                    </v-tooltip>
                    <span v-else class="alert-label" v-text="alert.hive_name">
                    </span>
                  </div>
                  <div v-if="alert.device_name !== null">
                    <v-tooltip
                      v-if="
                        alert.device_name !== null &&
                          alert.device_name.length >= 20
                      "
                      bottom
                      max-width="60%"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="alert-label"
                          v-bind="attrs"
                          v-on="on"
                          v-text="
                            alert.device_name.substring(
                              0,
                              // eslint-disable-next-line vue/comma-dangle
                              14
                            ) + '...'
                          "
                        >
                        </span>
                      </template>
                      <span class="alert-label" v-text="alert.device_name">
                      </span>
                    </v-tooltip>
                    <span v-else class="alert-label" v-text="alert.device_name">
                    </span>
                  </div>
                  <span
                    v-if="alert.hive_group_name || alert.location_name"
                    class="alert-text"
                    v-text="
                      alert.hive_group_name
                        ? alert.hive_group_name
                        : alert.location_name
                    "
                  >
                  </span>
                  <span
                    v-if="alert.hive_group_name && alert.location_name"
                    class="beep-label"
                    v-text="'(' + alert.location_name + ')'"
                  >
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="6" class="alert-content pa-0">
              <v-row class="my-0 py-0 ml-n7 ml-md-0 pr-3">
                <v-col
                  cols="12"
                  md="5"
                  class="alert-details-item d-flex flex-column align-start  pa-0"
                >
                  <div class="alert-content-item">
                    <div
                      class="d-flex flex-column justify-flex-start align-start mr-2"
                    >
                      <div class="d-flex flex-no-wrap">
                        <div class="mr-1 my-0">
                          <v-icon>
                            mdi-exclamation-thick
                          </v-icon>
                        </div>
                        <span
                          class="alert-label alert-label-break"
                          v-text="alert.alert_rule_name || '-'"
                        >
                        </span>
                      </div>
                      <span
                        v-if="alertRuleNotActive"
                        class="ml-7 alert-text font-small"
                        v-text="
                          '(' +
                            (!alertRule.active
                              ? $t('Alert_disabled')
                              : $t('Alert_disabled_for_this_hive')) +
                            ')'
                        "
                      >
                      </span>
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  md="7"
                  class="alert-details-item d-flex flex-column align-start  pa-0"
                >
                  <div
                    v-if="alert.alert_function !== null"
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
                          class="alert-label alert-label-break"
                          v-text="alertFunctionText"
                        >
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>

                <v-col
                  v-if="mdScreen"
                  cols="12"
                  md="7"
                  class="alert-details-item d-flex flex-column align-start  pa-0"
                >
                  <div
                    v-if="alert.hive_group_name || alert.location_name"
                    class="alert-content-item"
                  >
                    <v-icon
                      v-if="alert.hive_group_name"
                      class="icon-apiary-shared color-grey"
                    >
                      mdi-account-multiple
                    </v-icon>
                    <v-icon
                      v-else-if="alert.location_name"
                      class="icon-apiary-owned color-grey"
                    >
                      mdi-home-analytics
                    </v-icon>
                    <span
                      v-if="alert.hive_group_name || alert.location_name"
                      class="alert-label"
                      v-text="
                        alert.hive_group_name
                          ? alert.hive_group_name
                          : alert.location_name
                      "
                    >
                    </span>
                    <span
                      v-if="alert.hive_group_name && alert.location_name"
                      class="alert-label"
                      v-text="' (' + alert.location_name + ')'"
                    >
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-alert>
    </template>

    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-if="alert.alert_rule_name !== null"
          :to="{
            name: 'alertrule-edit',
            params: { id: alert.alert_rule_id },
          }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('Edit_alertrule') }} </v-list-item-title>
            <v-list-item-subtitle>
              {{ alert.alert_rule_name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else-if="alertRule === undefined" disabled>
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('alert_rule_deleted')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="alert.device_id !== null"
          :to="{
            name: 'measurements-id',
            params: { id: alert.device_id },
            query: {
              date: momentFormatUtcToLocal(alert.updated_at, 'YYYY-MM-DD'),
              relativeInterval: false,
            },
          }"
        >
          <v-list-item-icon class="mr-3">
            <div class="my-0">
              <v-sheet
                class="beep-icon beep-icon-sensors--no-outline"
              ></v-sheet>
            </div>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('View_measurements') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider class="my-1"></v-divider>

      <v-list-item-group>
        <v-list-item v-if="alertRuleNotActive" disabled>
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              !alertRule.active
                ? $t('Alert_disabled')
                : $t('Alert_disabled_for_this_hive')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-else-if="
            alertRule !== undefined &&
              alertRule.exclude_hive_ids.indexOf(alert.hive_id) === -1 &&
              alert.alert_function.indexOf('alert_rule') === -1
          "
          @click="disableAlertForHive"
        >
          <v-list-item-icon class="mr-3">
            <v-icon class="red--text">mdi-close</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="red--text">{{
              $t('Disable_alert_for_this_hive')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="deleteAlert(alert.id)">
          <v-list-item-icon class="mr-3">
            <v-icon class="red--text">mdi-delete</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="red--text">{{
              $t('remove_alert')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import Api from '@api/Api'
import HiveIcon from '@components/hive-icon.vue'
import { momentFormatUtcToLocal } from '@mixins/momentMixin'
import { mapGetters } from 'vuex'
import { readAlertRules } from '@mixins/methodsMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [momentFormatUtcToLocal, readAlertRules],
  props: {
    alert: {
      type: Object,
      default: null,
      required: true,
    },
    hives: {
      type: Object,
      default: null,
      required: true,
    },
    unit: {
      type: String,
      default: '',
      required: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: () => ({}),
  computed: {
    ...mapGetters('alerts', ['alertRules']),
    alertFunctionText() {
      return this.alert.alert_function.indexOf('alert_rule') > -1
        ? this.$i18n.t(this.alert.alert_function)
        : this.alert.alert_function
    },

    alertRule() {
      return this.alertRules.filter(
        (alertRule) => alertRule.id === this.alert.alert_rule_id
      )[0]
    },
    alertRuleNotActive() {
      return (
        this.alertRule !== undefined &&
        (!this.alertRule.active ||
          this.alertRule.exclude_hive_ids.indexOf(this.alert.hive_id) > -1)
      )
    },
    mdScreen() {
      return this.$vuetify.breakpoint.width < 961
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  methods: {
    async disableAlertForHive() {
      var updatedAlertRule = { ...this.alertRule }
      updatedAlertRule.exclude_hive_ids.push(this.alert.hive_id)
      try {
        const response = await Api.updateRequest(
          '/alert-rules/',
          updatedAlertRule.id,
          updatedAlertRule
        )
        if (response) {
          var disabledText =
            this.$i18n.tc('Alert', 1) +
            ' "' +
            updatedAlertRule.name +
            '" ' +
            this.$i18n.t('disabled_for_hive') +
            ' "' +
            this.alert.hive_name +
            '" '
          this.$emit('show-snackbar', disabledText)
        }
        setTimeout(() => {
          return this.readAlertRules()
        }, 150) // wait for API to update alertrules
      } catch (error) {
        this.$emit('show-snackbar', this.$i18n.t('something_wrong'))
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    deleteAlert(id) {
      this.$emit('delete-alert', id)
    },
    toggleCheckbox(id) {
      this.$emit('toggle-checkbox', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-card {
  height: 100%;
  min-width: calc(100% - 32px);
  padding: 10px;
  font-size: 0.8125rem !important;

  @include for-tablet-landscape-up {
    padding: 12px;
    font-size: 0.875rem !important;
  }
  .alert-label {
    font-size: 0.75rem !important;
    font-weight: 600;
    line-height: 20px !important;
    color: $color-grey;
    letter-spacing: 0.0333333333em !important;
    white-space: nowrap;
    @include for-phone-only {
      font-size: 0.7rem !important;
      line-height: 10px !important;
    }
  }
  .alert-label-break {
    margin-top: 5px;
    line-height: 14px !important;
    white-space: break-spaces;
  }
  .alert-details-item {
    // max-width: none;
    margin-bottom: 0;
    line-height: 1.1rem;
    @media (max-width: 960px) {
      min-width: 100%;
    }
  }
  .alert-meta {
    // max-width: 275px;
    @include for-tablet-landscape-up {
      max-width: none;
    }
  }
  .alert-date-item {
    // max-width: 150px;
    margin-bottom: 0;
    line-height: 1.1rem;
    @include for-phone-only {
      // max-width: 115px;
    }
  }
  .alert-date {
    margin-bottom: 0;
    font-size: 0.75rem !important;
    font-weight: 600;
    line-height: 20px;
    color: $color-grey-dark;
    letter-spacing: 0.0333333333em !important;
    white-space: nowrap;
    @include for-phone-only {
      font-size: 0.7rem !important;
      line-height: 10px;
      white-space: break-spaces;
    }
  }
  .alert-text {
    color: rgba(0, 0, 0, 0.87);
    @include for-tablet-portrait-up {
      margin-top: 2px;
    }
    @include for-phone-only {
      margin-top: 5px;
      word-break: break-all;
    }
  }

  .alert-content {
    .alert-content-item {
      margin-bottom: 4px;
      @media (min-width: 961px) {
        margin-bottom: 0 !important;
      }
    }
  }

  .alert-icon {
    min-width: 32px;
    @include for-tablet-landscape-up {
      min-width: 36px;
    }
  }

  .icon-apiary-owned,
  .icon-apiary-shared {
    margin-right: 6px !important;
    margin-left: 2px !important;
  }
}
</style>
