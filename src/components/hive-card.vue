<template>
  <v-card
    :class="
      `hive-card d-flex flex-column justify-end align-start ${
        xsView ? 'xs-view' : ''
      }`
    "
    :style="
      `border-color: ${
        hiveSet.hex_color
          ? hiveSet.hex_color + ' !important'
          : '#F8B133 !important'
      };`
    "
    outlined
  >
    <v-row
      v-if="!xsView"
      class="ml-0 mt-0 mb-3 d-flex justify-space-between align-start"
      style="width: 100%;"
    >
      <v-col cols="11" class="pa-0">
        <h4
          v-if="mView"
          class="hive-name truncate-md mb-3"
          style="max-width: 120px;"
          v-text="hive.name"
        >
        </h4>
        <div v-if="xlView" class="d-flex flex-row">
          <h4 class="hive-name truncate-md mb-3" style="max-width: 250px;">
            {{ hive.name }}
            <span
              v-if="hiveSet.users && hiveSet.users.length"
              class="caption hive-name-caption"
              v-text="` (${hive.location})`"
            >
            </span>
          </h4>
        </div>
      </v-col>
      <v-col cols="1" class="pa-0">
        <div class="d-flex justify-end">
          <v-icon
            small
            class="color-black mr-n2 mt-0"
            @click="showHiveMenu($event, true)"
            >mdi-dots-vertical</v-icon
          >
        </div>
      </v-col>
    </v-row>

    <div class="hive-details d-flex flex-no-wrap justify-flex-start align-end">
      <div class="hive-icon-wrapper d-flex flex-column align-center">
        <div
          v-if="xsView"
          :class="
            `d-flex flex-row justify-center red--text xs-view-alert ${
              hasLayer('queen_excluder') ? 'mr-1' : ''
            }`
          "
        >
          <router-link
            :to="{
              name: 'hive-inspections',
              params: { id: hive.id },
              query: { search: hive.last_inspection_date_locale_date },
            }"
          >
            <v-icon v-if="hive.attention" class="red--text">
              mdi-clipboard-alert-outline
            </v-icon>
          </router-link>
          <router-link
            v-if="alerts.length > 0"
            :to="{
              name: 'alerts',
              query: { search: hive.name },
            }"
          >
            <v-tooltip bottom max-width="60%">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-badge
                    v-if="alerts.length > 1"
                    :offset-x="alerts.length > 9 ? '23' : '20'"
                    offset-y="20"
                    color="transparent"
                    :content="alerts.length > 99 ? '99' : alerts.length"
                  >
                    <v-icon color="red">mdi-bell</v-icon>
                  </v-badge>
                  <v-icon v-else color="red">
                    mdi-bell
                  </v-icon>
                </div>
              </template>
              <span v-text="alertRuleNamesText"> </span>
            </v-tooltip>
          </router-link>
        </div>

        <HiveIcon
          :hive="hive"
          :show-hive="showMenu"
          @show-hive-menu="showHiveMenu($event)"
        ></HiveIcon>

        <v-overlay :value="showMenu">
          <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
          >
            <v-list dense class="hive-menu-list">
              <v-list-item v-if="!hideHiveName">
                <v-list-item-content>
                  <v-list-item-title class="title">
                    {{ hive.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item-group>
                <v-list-item
                  v-if="hive.editable || hive.owner"
                  :to="inspectLink(false)"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-file-document-edit-outline</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="
                        `${
                          hive.last_inspection_date !== null
                            ? $t('New_inspection')
                            : $t('no_inspections')
                        }`
                      "
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="hive.last_inspection_date !== null"
                  :to="{
                    name: 'hive-inspections',
                    params: { id: hive.id },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-magnify</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      $tc('View_inspection', 2)
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="alerts.length > 0"
                  :to="{
                    name: 'alerts',
                    query: { search: hive.name },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-bell</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      $tc('View_alert', alerts.length)
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="hive.sensors.length !== 0"
                  :to="{
                    name: 'measurements-id',
                    params: { id: hive.sensors[0] },
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
                    <v-list-item-title>{{
                      $t('View_measurements')
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <v-divider
                v-if="hive.editable || hive.owner"
                class="my-1"
              ></v-divider>

              <v-list-item-group>
                <v-list-item
                  v-if="hive.editable || hive.owner"
                  :to="{
                    name: `hive-edit`,
                    params: { id: hive.id },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-archive</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ $t('Edit_hive') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  v-if="hive.editable || hive.owner"
                  :to="{
                    name: `queen-edit`,
                    params: { id: hive.id },
                    query: { queenEdit: true },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <div class="my-0">
                      <v-sheet
                        class="beep-icon beep-icon-queen--no-outline"
                      ></v-sheet>
                    </div>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      $t('Edit_queen')
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <v-divider v-if="hive.owner" class="my-1"></v-divider>

              <v-list-item-group>
                <v-list-item v-if="hive.owner" @click="confirmDeleteHive(hive)">
                  <v-list-item-icon class="mr-3">
                    <v-icon class="red--text">mdi-delete</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="red--text">{{
                      $t('remove_hive')
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-overlay>
      </div>

      <div v-if="!xsView" class="hive-details-icons-text pl-2 pr-0 py-0">
        <div
          v-if="alerts.length > 0"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link
              :to="{
                name: 'alerts',
                query: { search: hive.name },
              }"
            >
              <div v-if="xlView">
                <v-badge
                  v-if="alerts.length > 1"
                  :offset-x="alerts.length > 9 ? '23' : '20'"
                  offset-y="20"
                  color="transparent"
                  :content="alerts.length > 99 ? '99' : alerts.length"
                >
                  <v-icon color="red">mdi-bell</v-icon>
                </v-badge>
                <v-icon v-else color="red">
                  mdi-bell
                </v-icon>
              </div>

              <v-tooltip v-if="mView" bottom max-width="60%">
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                    <v-badge
                      v-if="alerts.length > 1"
                      :offset-x="alerts.length > 9 ? '23' : '20'"
                      offset-y="20"
                      color="transparent"
                      :content="alerts.length > 99 ? '99' : alerts.length"
                    >
                      <v-icon color="red">mdi-bell</v-icon>
                    </v-badge>
                    <v-icon v-else color="red">
                      mdi-bell
                    </v-icon>
                  </div>
                </template>
                <span v-text="alertRuleNamesText"> </span>
              </v-tooltip>
            </router-link>
          </div>
          <span
            v-if="xlView"
            class="truncate-md"
            style="max-width: 224px;"
            v-text="alertRuleNamesText"
          ></span>
        </div>
        <div
          v-if="hive.sensors.length !== 0"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <router-link
            :to="{
              name: 'measurements-id',
              params: { id: hive.sensors[0] },
            }"
          >
            <div class="mr-2 my-0">
              <v-sheet class="beep-icon beep-icon-sensors color-green">
              </v-sheet>
            </div>
          </router-link>
          <span
            v-if="xlView"
            v-text="hive.last_message_received_legible_date"
          ></span>
        </div>
        <div
          v-if="hive.queen !== null"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link
              v-if="hive.editable || hive.owner"
              :to="{
                name: `queen-edit`,
                params: { id: hive.id },
                query: { queenEdit: true },
              }"
            >
              <v-sheet
                :class="
                  `beep-icon beep-icon-queen  ${
                    darkIconColor(hive.queen.color) ? 'dark' : ''
                  }`
                "
                :color="hive.queen.color"
              >
              </v-sheet>
            </router-link>
            <v-sheet
              v-else
              :class="
                `beep-icon beep-icon-queen  ${
                  darkIconColor(hive.queen.color) ? 'dark' : ''
                }`
              "
              :color="hive.queen.color"
            >
            </v-sheet>
          </div>
          <span
            v-if="hive.queen.name && xlView"
            v-text="hive.queen.name"
          ></span>
        </div>

        <div
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link :to="inspectLink(true)">
              <v-icon
                v-if="hive.last_inspection_date === null"
                class="color-grey"
              >
                mdi-plus-circle
              </v-icon>
              <!-- <v-sheet v-if="hive.last_inspection_date === null" class="beep-icon beep-icon-note color-grey"> </v-sheet> -->
              <v-icon v-if="hive.attention" class="red--text">
                mdi-clipboard-alert-outline
              </v-icon>
              <v-icon v-if="hive.impression === 1" class="red--text">
                mdi-emoticon-sad
              </v-icon>
              <v-icon v-if="hive.impression === 3" class="green--text">
                mdi-emoticon-happy
              </v-icon>
              <v-icon v-if="hive.impression === 2" class="orange--text">
                mdi-emoticon-neutral
              </v-icon>
              <div
                v-if="
                  !hive.impression &&
                    !hive.attention &&
                    hive.last_inspection_date
                "
                class="my-0"
              >
                <v-sheet class="beep-icon beep-icon-magnify"></v-sheet>
              </div>
            </router-link>
          </div>
          <span
            v-if="xlView"
            :class="
              `${
                hive.last_inspection_date !== null ? '' : 'color-grey'
              } mr-2 last-visit`
            "
            v-text="lastVisit(hive)"
          >
          </span>
        </div>

        <div
          v-if="hive.notes"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link :to="inspectLink(true)">
              <v-sheet class="beep-icon beep-icon-note color-grey"> </v-sheet>
            </router-link>
          </div>
          <v-tooltip
            v-if="!mobile && hive.notes && hive.notes.length > 33 && xlView"
            bottom
            max-width="60%"
            open-delay="800"
          >
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                class="truncate-md"
                style="max-width: 224px;"
                v-on="on"
                v-text="hive.notes"
              >
              </span>
            </template>
            <span v-text="hive.notes"> </span>
          </v-tooltip>
          <span
            v-if="hive.notes && (mobile || hive.notes.length <= 33) && xlView"
            style="max-width: 224px;"
            v-text="hive.notes"
          >
          </span>
        </div>

        <div
          v-if="hive.reminder || hive.reminder_date"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link
              :to="{
                name: 'hive-inspections',
                params: { id: hive.id },
                query: { search: hive.last_inspection_date_locale_date },
              }"
            >
              <v-icon
                v-if="hive.reminder_date"
                :class="
                  `${
                    $moment(hive.reminder_date).isBefore()
                      ? 'red--text'
                      : 'green--text'
                  }`
                "
              >
                mdi-calendar-clock
              </v-icon>
              <v-icon v-if="!hive.reminder_date" class="color-grey">
                mdi-calendar-clock
              </v-icon>
            </router-link>
          </div>
          <span
            v-if="hive.reminder_date"
            :class="
              `to-do-date ${
                $moment(hive.reminder_date).isBefore()
                  ? 'red--text'
                  : 'green--text'
              } mr-2`
            "
            v-text="hive.reminder_date_day_month"
          >
          </span>
          <span
            v-if="hive.reminder && xlView"
            class="truncate-md"
            style="max-width: 164px;"
            v-text="hive.reminder"
          >
          </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { darkIconMixin } from '@mixins/darkIconMixin'
import HiveIcon from '@components/hive-icon.vue'

export default {
  components: {
    HiveIcon,
  },
  mixins: [darkIconMixin],
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
    xlView: {
      type: Boolean,
      default: false,
    },
    mView: {
      type: Boolean,
      default: false,
    },
    xsView: {
      type: Boolean,
      default: false,
    },
    hiveSet: {
      type: Object,
      default: null,
      required: true,
    },
    alerts: {
      type: Array,
      default: null,
      required: true,
    },
  },
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    hideHiveName: false,
  }),
  computed: {
    alertRuleNamesText() {
      var uniqueAlertRuleNames = []
      this.alerts.map((alert) => {
        var alertName =
          alert.alert_rule_name !== null
            ? alert.alert_rule_name
            : alert.alert_function !== null
            ? alert.alert_function
            : this.$i18n.t('Unknown')
        if (uniqueAlertRuleNames.indexOf(alertName) === -1) {
          uniqueAlertRuleNames.push(alertName)
        }
      })
      return uniqueAlertRuleNames.join(', ')
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  methods: {
    confirmDeleteHive(hive) {
      this.$emit('confirm-delete-hive', hive)
    },
    hasLayer(type) {
      return this.hive.layers.some((layer) => layer.type === type)
    },
    inspectLink(linkToInspections) {
      if (this.hive.last_inspection_date !== null && linkToInspections) {
        if (!this.hive.attention && !this.hive.impression) {
          return {
            name: 'hive-inspections',
            params: { id: this.hive.id },
          }
        } else {
          return {
            name: 'hive-inspections',
            params: { id: this.hive.id },
            query: { search: this.hive.last_inspection_date_locale_date },
          }
        }
      } else {
        if (this.hiveSet.users) {
          return {
            name: 'inspect',
            query: { hiveId: this.hive.id, groupId: this.hiveSet.id },
          }
        } else {
          return {
            name: 'inspect',
            query: { hiveId: this.hive.id, apiaryId: this.hiveSet.id },
          }
        }
      }
    },
    lastVisit(hive) {
      if (hive.last_inspection_date !== null) {
        return hive.last_inspection_date_moment_from_now
      } else {
        return this.$i18n.t('no_inspections')
      }
    },
    showHiveMenu(e, hideHiveName = false) {
      this.x = e.clientX
      this.y = e.clientY
      this.showMenu = true
      this.hideHiveName = hideHiveName
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-card {
  height: 100%;
  padding: 12px;
  font-size: 0.875rem !important;
  @include for-phone-only {
    padding: 10px;
    font-size: 0.8125rem !important;
    overflow: hidden;
  }
  &.xs-view {
    padding: 0 !important;
    border: none !important;
  }
  a {
    text-decoration: none;
  }

  .hive-name {
    line-height: 1rem;
  }

  .hive-name-caption {
    font-weight: 600;
    line-height: 1rem;
  }

  .hive-details {
    .xs-view-alert {
      margin-bottom: 2px;
    }

    .hive-icon-wrapper {
      cursor: pointer;
      margin-bottom: 3px;
    }

    .hive-details-item {
      margin-bottom: 8px;
      line-height: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .icon-wrapper {
      display: inline-block;
      white-space: nowrap;
    }
    .last-visit {
      white-space: nowrap;
    }
  }
}
.hive-menu-list {
  .v-list-item {
    padding-right: 24px !important;
  }
  .v-list-item__title {
    line-height: 1.5rem !important;
  }
}
</style>
