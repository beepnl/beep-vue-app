<template>
  <v-menu bottom left absolute offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-card class="diary-card" outlined v-on="menu">
        <div style="width: 100%;">
          <v-row
            class="d-flex justify-space-between align-start mx-0"
            style="width:100%;"
          >
            <v-col
              cols="12"
              sm="5"
              class="diary-details-item diary-inspection-meta d-flex flex-row justify-flex-start px-0"
            >
              <div
                v-if="inspection.created_at"
                class="diary-inspection-date-item d-flex flex-column align-start"
              >
                <div>
                  <span
                    class="diary-inspection-date"
                    v-text="inspection.created_at_locale_date"
                  >
                  </span>
                </div>
                <span
                  class="diary-inspection-text
                        last-visit"
                  v-text="inspection.created_at_moment_from_now"
                >
                </span>
              </div>

              <v-row class="d-flex justify-start">
                <v-col
                  v-if="hive !== null"
                  cols="5"
                  class="hive-icon-wrapper d-flex flex-row justify-center align-end mt-6 mt-sm-4 mb-1"
                >
                  <HiveIcon :hive="hive" :diary-view="true"></HiveIcon>
                </v-col>

                <v-col v-else cols="5" class="d-flex flex-row justify-center">
                  <span
                    class="diary-inspection-date d-flex flex-column text-center font-italic"
                  >
                    <span>{{ $tc('Hive_short', 1) }}</span>
                    <span>{{ $t('unknown') }}</span>
                  </span>
                </v-col>

                <v-col cols="7" class="d-flex flex-column align-start">
                  <div class="diary-label">
                    {{ inspection.hive_name }}
                    <small
                      v-if="
                        diaryFilterByGroup === 'group' &&
                          inspection.owned_and_group
                      "
                      class="beep-label mb-0"
                      v-text="' (' + $t('my_hive') + ')'"
                    >
                    </small>
                  </div>
                  <span
                    class="diary-inspection-text diary-inspection-text--truncate"
                    v-text="
                      (inspection.hive_group_name &&
                        !inspection.owned_and_group) ||
                      (diaryFilterByGroup === 'group' &&
                        inspection.owned_and_group)
                        ? inspection.hive_group_name
                        : inspection.hive_location
                    "
                  >
                  </span>
                  <span
                    v-if="
                      (inspection.hive_group_name &&
                        !inspection.owned_and_group) ||
                        (diaryFilterByGroup === 'group' &&
                          inspection.owned_and_group)
                    "
                    class="beep-label"
                    v-text="'(' + inspection.hive_location + ')'"
                  >
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="7" class="diary-inspection-content pr-0">
              <v-row class="d-flex justify-start">
                <v-col
                  cols="12"
                  sm="1"
                  lg="3"
                  class="diary-details-item diary-details-item--padding d-flex flex-column align-start"
                >
                  <div v-if="inspection.attention" class="diary-content-item">
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center"
                    >
                      <div class="mr-1 my-0">
                        <v-icon class="red--text">
                          mdi-clipboard-alert-outline
                        </v-icon>
                      </div>
                      <span
                        class="diary-label hide-md"
                        v-text="`${$t('needs_attention')}`"
                      >
                      </span>
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  sm="5"
                  lg="4"
                  class="diary-details-item diary-details-item--padding d-flex flex-column align-start"
                >
                  <div
                    v-if="inspection.impression || inspection.notes"
                    class="diary-content-item"
                  >
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center"
                    >
                      <div class="mr-1 my-0">
                        <v-icon
                          v-if="inspection.impression === 1"
                          class="red--text"
                        >
                          mdi-emoticon-sad
                        </v-icon>
                        <v-icon
                          v-if="inspection.impression === 3"
                          class="green--text"
                        >
                          mdi-emoticon-happy
                        </v-icon>
                        <v-icon
                          v-if="inspection.impression === 2"
                          class="orange--text"
                        >
                          mdi-emoticon-neutral
                        </v-icon>
                        <div
                          v-if="!inspection.impression && !smallScreen"
                          class="no-icon"
                        >
                        </div>
                        <v-sheet
                          v-else-if="!inspection.impression"
                          class="beep-icon beep-icon-note color-grey"
                        >
                        </v-sheet>
                      </div>
                      <span
                        v-if="!inspection.impression"
                        class="diary-label"
                        v-text="`${$t('notes')}`"
                      >
                      </span>
                      <span
                        v-else
                        class="diary-label"
                        v-text="`${$t('positive_impression')}`"
                      >
                      </span>
                    </div>

                    <div
                      v-if="inspection.notes"
                      class="diary-inspection-text ml-7"
                    >
                      <v-tooltip
                        v-if="inspection.notes.length > 35 && !smallScreen"
                        class="diary-tooltip"
                        bottom
                        max-width="60%"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            v-bind="attrs"
                            class="notes"
                            v-on="on"
                            v-text="inspection.notes"
                          >
                          </span>
                        </template>
                        <span class="notes" v-text="inspection.notes"> </span>
                      </v-tooltip>
                      <span v-else class="notes" v-text="inspection.notes">
                      </span>
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  sm="5"
                  lg="4"
                  class="diary-details-item diary-details-item--padding d-flex flex-column align-start"
                >
                  <div
                    v-if="inspection.reminder || inspection.reminder_date"
                    class="diary-content-item"
                  >
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center"
                    >
                      <div class="mr-1 my-0">
                        <v-icon
                          v-if="inspection.reminder_date"
                          :class="
                            `${
                              $moment(
                                // eslint-disable-next-line vue/comma-dangle
                                inspection.reminder_date
                              ).isBefore()
                                ? 'red--text'
                                : 'green--text'
                            }`
                          "
                        >
                          mdi-calendar-clock
                        </v-icon>
                        <v-icon
                          v-if="!inspection.reminder_date"
                          class="color-grey"
                        >
                          mdi-calendar-clock
                        </v-icon>
                      </div>
                      <span
                        v-if="inspection.reminder_date"
                        :class="
                          `to-do-date ${
                            $moment(
                              // eslint-disable-next-line vue/comma-dangle
                              inspection.reminder_date
                            ).isBefore()
                              ? 'red--text'
                              : 'green--text'
                          } mr-2`
                        "
                        v-text="inspection.reminder_date_day_month"
                      >
                      </span>
                      <span
                        v-if="!inspection.reminder_date"
                        class="diary-label"
                        v-text="`${$t('reminder')}`"
                      >
                      </span>
                    </div>
                    <div class="diary-inspection-text ml-7">
                      <v-tooltip
                        v-if="
                          inspection.reminder &&
                            inspection.reminder.length > 35 &&
                            !smallScreen
                        "
                        class="diary-tooltip"
                        bottom
                        max-width="60%"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            v-bind="attrs"
                            class="reminder"
                            v-on="on"
                            v-text="inspection.reminder"
                          >
                          </span>
                        </template>
                        <span class="reminder" v-text="inspection.reminder">
                        </span>
                      </v-tooltip>
                      <span
                        v-else-if="inspection.reminder"
                        class="reminder"
                        v-text="inspection.reminder"
                      >
                      </span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </template>

    <v-list dense>
      <v-list-item-group>
        <v-list-item
          :to="{
            name: 'hive-inspections',
            params: { id: inspection.hive_id },
            query: { search: 'id=' + inspection.id.toString() },
          }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              >{{ $t('view') }} {{ $tc('inspection', 1) }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="inspection.owner || inspection.owned_and_group"
          :to="{
            name: 'hive-inspect-edit',
            params: {
              id: inspection.hive_id,
              inspection: inspection.id,
            },
          }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              v-text="`${$t('Edit_inspection')}`"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider
        v-if="inspection.owner || inspection.owned_and_group"
        class="my-1"
      ></v-divider>

      <v-list-item-group>
        <v-list-item
          v-if="inspection.owner || inspection.owned_and_group"
          @click="confirmDeleteInspection(inspection)"
        >
          <v-list-item-icon class="mr-3">
            <v-icon class="red--text">mdi-delete</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="red--text">{{
              $t('remove_inspection')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import HiveIcon from '@components/hive-icon.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    HiveIcon,
  },
  props: {
    inspection: {
      type: Object,
      default: null,
      required: true,
    },
    hive: {
      type: Object,
      default: null,
      required: false,
    },
  },
  computed: {
    ...mapGetters('inspections', ['diaryFilterByGroup']),
    smallScreen() {
      return this.$vuetify.breakpoint.width < 910
    },
  },
  methods: {
    confirmDeleteInspection(inspection) {
      this.$emit('confirm-delete-inspection', inspection)
    },
  },
}
</script>

<style lang="scss" scoped>
.diary-card {
  height: 100%;
  padding: 10px;
  font-size: 0.8125rem !important;

  @include for-tablet-landscape-up {
    padding: 12px;
    font-size: 0.875rem !important;
  }
  .diary-menu-button {
    left: 10px;
    min-width: 24px !important;
    max-width: 24px !important;
    height: 24px !important;
  }
  .diary-label {
    width: 100%;
    overflow: hidden;
    font-size: 0.75rem !important;
    font-weight: 600;
    line-height: 24px !important;
    color: $color-grey;
    text-overflow: ellipsis;
    letter-spacing: 0.0333333333em !important;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    @include for-phone-only {
      font-size: 0.7rem !important;
    }
  }
  .diary-details-item {
    min-width: 28px;
    max-width: none;
    margin-bottom: 0;
    line-height: 1.1rem;
    @media (max-width: 909px) {
      min-width: 100%;
    }
    &.diary-details-item--padding {
      @media (max-width: 909px) {
        padding: 0 12px 0 0 !important;
      }
    }
  }
  .diary-inspection-meta {
    padding-right: -0;
    @include for-tablet-landscape-up {
      padding-right: 12px;
    }
  }
  .diary-inspection-date-item {
    width: 130px;
    min-width: 130px;
    margin-bottom: 0;
    line-height: 1.1rem;
    @include for-phone-only {
      width: 120px;
      min-width: 120px;
    }
    @media (max-width: 373px) {
      width: 90px;
      min-width: 90px;
    }
  }
  .diary-inspection-date {
    margin-bottom: 0;
    font-size: 0.75rem !important;
    font-weight: 600;
    line-height: 24px;
    color: $color-grey-dark;
    white-space: nowrap;
    @include for-phone-only {
      font-size: 0.7rem !important;
    }
  }
  .diary-inspection-text {
    @include for-tablet-portrait-up {
      margin-top: 2px;
    }
    &.diary-inspection-text--truncate {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }

  .hide-md {
    display: flex;
    @media (min-width: 910px) and (max-width: 1264px) {
      display: none;
    }
  }

  .diary-inspection-content {
    margin-top: 10px !important;
    margin-left: 10px !important;
    @media (max-width: 909px) {
      margin: 10px 0 !important;
    }
    @include for-tablet-portrait-up {
      margin-left: 0 !important;
    }
    @media (min-width: 910px) {
      margin-top: 0 !important;
    }
    .diary-content-item {
      margin-bottom: 4px;
      @media (min-width: 910px) {
        margin-bottom: 0 !important;
      }
    }
  }
  .notes,
  .reminder {
    display: inline-block;
    max-height: 33px;
    overflow: hidden;
    line-height: 1.1rem;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @include for-phone-only {
      line-height: 1rem;
    }
  }
  .no-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
