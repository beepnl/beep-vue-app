<template>
  <v-card
    :class="
      `hive-card d-flex flex-column justify-end align-start ${
        apiaryView ? 'apiary-view' : ''
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
    <v-row v-if="!apiaryView" class="ml-0 mt-0 mb-3 pr-3">
      <h4
        v-if="gridView"
        class="hive-name truncate mb-3"
        style="max-width: 150px;"
        v-text="hive.name"
      >
      </h4>
      <div v-if="listView" class="d-flex flex-row">
        <h4
          class="hive-name truncate mb-3"
          style="max-width: 205px;"
          v-text="hive.name"
        >
        </h4>
        <pre
          v-if="hiveSet.users && hiveSet.users.length"
          class="caption hive-name-caption"
          v-text="` (${hive.location})`"
        >
        </pre>
      </div>
    </v-row>

    <div class="hive-details d-flex flex-no-wrap justify-flex-start align-end">
      <div class="hive-icon-wrapper d-flex flex-column align-center">
        <div
          v-if="apiaryView"
          :class="
            `red--text apiary-view-alert ${
              hasLayer('queen_excluder') ? 'mr-1' : ''
            }`
          "
        >
          <router-link
            :to="{
              name: 'hive-inspections',
              params: { id: hive.id },
              query: { search: hive.last_inspection_date },
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
              <v-list-item>
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
                    <v-list-item-title
                      >{{ $t('view') }}
                      {{ $tc('inspection', 2) }}</v-list-item-title
                    >
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
                    <v-list-item-title
                      >{{ $t('view') }}
                      {{ $tc('alert', alerts.length) }}</v-list-item-title
                    >
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
                    <v-list-item-title
                      >{{ $t('view') }}
                      {{ $tc('measurement', 2) }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <v-divider
                v-if="hive.editable || hive.owner"
                class="my-1"
              ></v-divider>

              <v-list-item-group>
                <v-list-item
                  v-if="hive.editable"
                  :to="{
                    name: `hive-edit`,
                    params: { id: hive.id },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      >{{ $t('edit') }} {{ $tc('hive', 1) }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  v-if="hive.editable"
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
                    <v-list-item-title
                      >{{ $t('edit') }} {{ $t('queen') }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <!-- <v-list-item v-if="hive.owner">
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-account-multiple-plus</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      >{{ $t('share') }} {{ $tc('hive', 1) }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item> -->
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

      <div v-if="!apiaryView" class="hive-details-icons-text pl-2 pr-0 py-0">
        <div
          v-if="hive.sensors.length !== 0 && alerts.length === 0"
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
        </div>
        <div
          v-else-if="alerts.length > 0"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link
              :to="{
                name: 'alerts',
                query: { search: hive.name },
              }"
            >
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
            </router-link>
          </div>
          <span
            v-if="listView"
            class="truncate"
            style="max-width: 224px;"
            v-text="alertRuleNamesText"
          ></span>
        </div>

        <div
          v-if="hive.queen !== null"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <router-link
              v-if="hive.editable"
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
            v-if="hive.queen.name && listView"
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
                mdi-pencil-circle
              </v-icon>
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
            v-if="listView"
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
              <v-icon>
                mdi-pencil-circle
              </v-icon>
            </router-link>
          </div>
          <span
            v-if="hive.notes && listView"
            class="truncate"
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
                query: { search: hive.last_inspection_date },
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
            v-text="momentifyDayMonth(hive.reminder_date)"
          >
          </span>
          <span
            v-if="hive.reminder && listView"
            class="truncate"
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
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [darkIconMixin, momentMixin],
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
    listView: {
      type: Boolean,
      default: false,
    },
    gridView: {
      type: Boolean,
      default: false,
    },
    apiaryView: {
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
  }),
  computed: {
    alertRuleNamesText() {
      var uniqueAlertRuleNames = []
      this.alerts.map((alert) => {
        if (uniqueAlertRuleNames.indexOf(alert.alert_rule_name) === -1) {
          uniqueAlertRuleNames.push(alert.alert_rule_name)
        }
      })
      return uniqueAlertRuleNames.join(', ')
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
        return {
          name: 'hive-inspections',
          params: { id: this.hive.id },
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
        return this.momentFromNow(hive.last_inspection_date)
      } else {
        return this.$i18n.t('no_inspections')
      }
    },
    showHiveMenu(e) {
      this.x = e.clientX
      this.y = e.clientY
      this.showMenu = true
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
  }
  &.apiary-view {
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
    .apiary-view-alert {
      margin-bottom: 2px;
    }

    .hive-icon-wrapper {
      cursor: pointer;
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
