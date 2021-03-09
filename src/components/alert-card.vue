<template>
  <v-menu bottom left absolute offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-alert
        v-if="alert.show === 1"
        type="error"
        text
        prominent
        dense
        icon="mdi-bell"
        color="red"
        class="alert-card cursor-pointer mb-0"
        outlined
        v-on="menu"
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
                      <span
                        class="alert-label alert-label-break"
                        v-text="alert.rule_name"
                      >
                      </span>
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  sm="3"
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
        </div>
      </v-alert>
    </template>

    <v-list dense>
      <v-list-item-group>
        <v-list-item
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
              {{ alert.rule_name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider class="my-1"></v-divider>

      <v-list-item-group>
        <v-list-item @click="confirmHideAlert(alert)">
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
import HiveIcon from '@components/hive-icon.vue'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [momentMixin],
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
  },
  data: () => ({}),
  methods: {
    confirmHideAlert(alert) {
      this.$emit('confirm-hide-alert', alert)
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
</style>
