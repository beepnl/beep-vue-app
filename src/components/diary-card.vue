<template>
  <v-menu bottom left absolute offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-card class="diary-card" outlined v-on="menu">
        <div
          class="d-flex flex-no-wrap justify-flex-start align-start"
          style="width: 100%;"
        >
          <v-row class="ml-0 my-0 pl-0 py-0" style="width:100%;">
            <v-col
              cols="12"
              sm="5"
              class="diary-details-item diary-inspection-meta d-flex flex-row justify-flex-start pa-0"
            >
              <v-row class="my-0 pl-3 py-0">
                <v-col
                  v-if="inspection.created_at"
                  cols="5"
                  class="diary-inspection-date-item d-flex flex-column align-start pa-0"
                >
                  <div>
                    <span
                      class="diary-inspection-date"
                      v-text="momentify(inspection.created_at)"
                    >
                    </span>
                  </div>
                  <span
                    class="diary-inspection-text
                        last-visit"
                    v-text="momentFromNow(inspection.created_at)"
                  >
                  </span>
                </v-col>

                <v-col
                  cols="3"
                  class="hive-icon-wrapper mt-1 ml-1 ml-md-0 ml-lg-n2 mr-1 mr-md-0 mr-lg-n2 d-flex justify-center align-end pa-0"
                >
                  <HiveIcon :hive="hive" :diary-view="true"></HiveIcon>
                </v-col>

                <v-col
                  cols="4"
                  class="d-flex flex-column align-start pa-0 pr-3"
                >
                  <div>
                    <v-tooltip
                      v-if="inspection.hive_name.length >= 15 && !smallScreen"
                      class="diary-tooltip"
                      bottom
                      max-width="60%"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="diary-label"
                          v-bind="attrs"
                          v-on="on"
                          v-text="
                            inspection.hive_name.substring(
                              0,
                              // eslint-disable-next-line vue/comma-dangle
                              14
                            ) + '...'
                          "
                        >
                        </span>
                      </template>
                      <span class="diary-label" v-text="inspection.hive_name">
                      </span>
                    </v-tooltip>
                    <span
                      v-else
                      class="diary-label"
                      v-text="inspection.hive_name"
                    >
                    </span>
                  </div>
                  <span
                    class="diary-inspection-text"
                    v-text="
                      inspection.hive_group_name && !inspection.owned_and_group
                        ? inspection.hive_group_name
                        : inspection.hive_location
                    "
                  >
                  </span>
                  <span
                    v-if="
                      inspection.hive_group_name && !inspection.owned_and_group
                    "
                    class="beep-label"
                    v-text="'(' + inspection.hive_location + ')'"
                  >
                  </span>
                  <span
                    v-if="diaryFilterByGroup && inspection.owned_and_group"
                    class="beep-label"
                    v-text="'(' + inspection.hive_group_name + ')'"
                  >
                  </span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="7" class="diary-inspection-content pa-0">
              <v-row class="my-0 py-0 ml-sm-0 mr-sm-n4">
                <v-col
                  cols="12"
                  sm="1"
                  lg="3"
                  class="diary-details-item d-flex flex-column align-start  pa-0"
                >
                  <div v-if="inspection.attention" class="diary-content-item">
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
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
                  class="diary-details-item d-flex flex-column align-start pa-0"
                >
                  <div
                    v-if="inspection.impression || inspection.notes"
                    class="diary-content-item"
                  >
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
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
                        <div v-if="!inspection.impression" class="no-icon">
                        </div>
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
                      class="ml-7 diary-inspection-text"
                    >
                      <v-tooltip
                        v-if="
                          inspection.notes.length > 35 &&
                            !mobile &&
                            !smallScreen
                        "
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
                  class="diary-details-item d-flex flex-column align-start  pa-0"
                >
                  <div
                    v-if="inspection.reminder || inspection.reminder_date"
                    class="diary-content-item"
                  >
                    <div
                      class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
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
                        v-text="momentifyDayMonth(inspection.reminder_date)"
                      >
                      </span>
                      <span
                        v-if="!inspection.reminder_date"
                        class="diary-label"
                        v-text="`${$t('reminder')}`"
                      >
                      </span>
                    </div>
                    <div class="ml-7 diary-inspection-text mr-2">
                      <v-tooltip
                        v-if="
                          inspection.reminder &&
                            inspection.reminder.length > 35 &&
                            !mobile &&
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
          v-if="inspection.owner"
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

      <v-divider v-if="inspection.owner" class="my-1"></v-divider>

      <v-list-item-group>
        <v-list-item
          v-if="inspection.owner"
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
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [momentMixin],
  props: {
    inspection: {
      type: Object,
      default: null,
      required: true,
    },
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    ...mapGetters('inspections', ['diaryFilterByGroup']),
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    smallScreen() {
      return (
        this.$vuetify.breakpoint.width < 850 &&
        this.$vuetify.breakpoint.width > 500
      )
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
  .diary-details-item {
    max-width: none;
    margin-bottom: 0;
    line-height: 1.1rem;
    @media (max-width: 849px) {
      min-width: 100%;
    }
  }
  .diary-inspection-meta {
    max-width: 330px;
    @include for-tablet-landscape-up {
      max-width: none;
    }
    @media (max-width: 849px) {
      margin-right: -8px;
    }
  }
  .diary-inspection-date-item {
    max-width: 130px;
    margin-bottom: 0;
    line-height: 1.1rem;
    @include for-phone-only {
      max-width: 120px;
    }
  }
  .diary-inspection-date {
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
  .diary-inspection-text {
    @include for-tablet-portrait-up {
      margin-top: 2px;
    }
  }

  .hide-md {
    display: flex;
    @media (min-width: 851px) and (max-width: 1264px) {
      display: none;
    }
  }

  .diary-inspection-content {
    margin-top: 10px !important;
    margin-left: 10px !important;
    @include for-tablet-portrait-up {
      margin-left: 0 !important;
    }
    @media (min-width: 850px) {
      margin-top: 0 !important;
    }
    .diary-content-item {
      margin-bottom: 4px;
      @media (min-width: 850px) {
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
