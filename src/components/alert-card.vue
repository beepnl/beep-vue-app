<template>
  <v-menu bottom left absolute offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-alert
        type="error"
        text
        prominent
        dense
        color="red"
        class="alert-card cursor-pointer mb-0"
        outlined
        v-on="menu"
      >
        <template v-slot:prepend>
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
        </template>

        <div
          class="d-flex flex-no-wrap justify-flex-start align-start"
          style="width: 100%;"
        >
          <v-row class="ml-0 my-0 pl-0 py-0" style="width:100%;">
            <v-col
              cols="12"
              sm="4"
              md="5"
              class="alert-details-item alert-meta d-flex flex-row justify-flex-start pa-0"
            >
              <v-row class="my-0 py-0 pr-1">
                <v-col
                  v-if="alert.updated_at"
                  cols="5"
                  sm="6"
                  md="5"
                  class="alert-date-item d-flex flex-column align-start pa-0"
                >
                  <div>
                    <span class="alert-date" v-text="alert.locale_date"> </span>
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
                  cols="3"
                  sm="4"
                  md="3"
                  class="hive-icon-wrapper mt-1 ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex justify-center align-start pa-0"
                >
                  <HiveIcon
                    :hive="hives[alert.hive_id]"
                    :diary-view="true"
                  ></HiveIcon>
                </v-col>

                <v-col
                  v-else-if="alert.hive_id !== null"
                  cols="3"
                  sm="12"
                  md="3"
                  class="ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex flex-column align-center pa-0"
                  ><span class="alert-label alert-label-break text-center"
                    ><i
                      >{{ $tc('Hive_short', 1) }}<br />
                      {{ $t('unknown') }}
                    </i></span
                  >
                </v-col>

                <v-col
                  cols="3"
                  md="4"
                  class="d-flex flex-column align-start pa-0"
                >
                  <div v-if="alert.hive_name !== null">
                    <v-tooltip
                      v-if="
                        alert.hive_name !== null && alert.hive_name.length >= 15
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
                  <div v-else-if="alert.device_name !== null">
                    <v-tooltip
                      v-if="
                        alert.device_name !== null &&
                          alert.device_name.length >= 15
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

            <v-col cols="12" sm="8" md="7" class="alert-content pa-0">
              <v-row class="my-0 py-0 ml-n6 ml-sm-0 mr-sm-n4 pr-6 pr-sm-3">
                <v-col
                  cols="12"
                  sm="3"
                  class="alert-details-item d-flex flex-column align-start  pa-0"
                >
                  <div class="alert-content-item">
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-start mr-2"
                    >
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
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  sm="4"
                  class="alert-details-item d-flex flex-column align-start  pa-0"
                >
                  <div
                    class="d-flex flex-no-wrap justify-flex-start align-start mr-2"
                  >
                    <span class="mr-1 my-0">
                      <v-icon>
                        mdi-function
                      </v-icon>
                    </span>
                    <span
                      class="alert-label alert-label-break"
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
                          class="alert-label alert-label-break"
                          v-text="alertValueText"
                        >
                        </div>
                      </div>
                    </div>
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
            <v-list-item-title
              >{{ $t('edit') + ' ' + $tc('alertrule', 1) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ alert.alert_rule_name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="alert.device_id !== null"
          :to="{
            name: 'measurements-id',
            params: { id: alert.device_id },
            query: {
              date: alert.updated_at.substr(0, 10),
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
            <v-list-item-title
              >{{ $t('view') }} {{ $tc('measurement', 2) }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider v-if="alert.alert_rule_name !== null" class="my-1"></v-divider>

      <v-list-item-group>
        <v-list-item
          v-if="
            alertRule !== undefined &&
              (!alertRule.active ||
                alertRule.exclude_hive_ids.indexOf(alert.hive_id) > -1)
          "
          disabled
        >
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
              alertRule.exclude_hive_ids.indexOf(alert.hive_id) === -1
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
import { mapGetters } from 'vuex'
import { readAlertRules } from '@mixins/methodsMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [readAlertRules],
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
  },
  data: () => ({}),
  computed: {
    ...mapGetters('alerts', ['alertRules']),
    alertRule() {
      return this.alertRules.filter(
        (alertRule) => alertRule.id === this.alert.alert_rule_id
      )[0]
    },
    alertValueText() {
      if (this.alert !== null) {
        if (this.alert.alert_value !== null) {
          if (this.alert.alert_value.indexOf('alert_rule') > -1) {
            return this.$i18n.t(this.alert.alert_value)
          }
          var number = parseFloat(this.alert.alert_value)
          if (!isNaN(number)) {
            return number.toFixed(2) + this.unit
          } else {
            return this.alert.alert_value
          }
        } else {
          return null
        }
      } else {
        return null
      }
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
  },
}
</script>

<style lang="scss" scoped>
.alert-card {
  height: 100%;
  padding: 10px;
  font-size: 0.8125rem !important;

  @include for-tablet-landscape-up {
    padding: 12px;
    font-size: 0.875rem !important;
  }
  .alert-label {
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
  .alert-label-break {
    margin-top: 5px;
    line-height: 14px !important;
    white-space: break-spaces;
  }
  .alert-details-item {
    // max-width: none;
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
    max-width: 150px;
    margin-bottom: 0;
    line-height: 1.1rem;
    @include for-phone-only {
      max-width: 115px;
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

  .alert-icon {
    min-width: 44px;
    height: 44px;
  }
}
</style>
