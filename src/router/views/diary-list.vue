<template>
  <Layout :no-box-shadow="true">
    <v-container v-if="showDiaryPlaceholder">
      <v-row>
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
        </v-col>
      </v-row>
    </v-container>
    <div v-if="inspections">
      <div class="filter-bar-wrapper">
        <v-container class="filter-container">
          <v-row
            class="filter-bar d-flex flex-row justify-space-between align-center"
          >
            <div
              class="filter-buttons d-flex flex-row justify-flex-start align-center"
            >
              <v-col cols="5" class="hide-on-mobile pr-1">
                <v-text-field
                  ref="filter"
                  v-model="search"
                  :label="`${$t('Search')}`"
                  :class="
                    `${
                      search !== null ? 'v-input--is-focused primary--text' : ''
                    } filter-text-field`
                  "
                  height="36px"
                  clearable
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="show-on-mobile pr-0">
                <v-text-field
                  v-model="search"
                  :label="`${$t('Search')}`"
                  :class="
                    `${
                      search !== null ? 'v-input--is-focused primary--text' : ''
                    } filter-text-field`
                  "
                  height="30px"
                  clearable
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-card-actions>
                <v-icon
                  :class="
                    `${filterByReminder ? 'red--text' : 'color-grey'} mr-2`
                  "
                  @click="filterByReminder = !filterByReminder"
                >
                  mdi-alert-circle
                </v-icon>
                <v-icon
                  :class="
                    `${
                      filterByImpression.includes(3)
                        ? 'green--text'
                        : 'color-grey'
                    } mr-2`
                  "
                  @click="updateFilterByImpression(3)"
                >
                  mdi-emoticon-happy
                </v-icon>
                <v-icon
                  :class="
                    `${
                      filterByImpression.includes(2)
                        ? 'orange--text'
                        : 'color-grey'
                    } mr-2`
                  "
                  @click="updateFilterByImpression(2)"
                >
                  mdi-emoticon-neutral
                </v-icon>
                <v-icon
                  :class="
                    `${
                      filterByImpression.includes(1)
                        ? 'red--text'
                        : 'color-grey'
                    } mr-2`
                  "
                  @click="updateFilterByImpression(1)"
                >
                  mdi-emoticon-sad
                </v-icon>
              </v-card-actions>
            </div>
          </v-row>
        </v-container>
      </div>

      <v-container class="hive-inspections-content">
        <v-row>
          <ScaleTransition
            :duration="300"
            group
            class="diary-item-transition-wrapper"
          >
            <v-col
              v-for="(inspection, j) in filteredInspections"
              :key="j"
              sm="auto"
              class="diary-item"
              dense
            >
              <v-card
                class="diary-card d-flex flex-column justify-end align-start"
                outlined
              >
                <v-row class="ml-0 mb-3 mr-2">
                  <div
                    style="width: 100%;"
                    class="d-flex flex-column align-start"
                  >
                    <div class="beep-label">
                      {{ momentify(inspection.created_at) }}
                    </div>
                    <div class="d-flex flex-row mr-3">
                      <h4
                        class="hive-name mb-3"
                        v-text="
                          `${
                            hives[inspection.hive_id].name.length < 35
                              ? hives[inspection.hive_id].name
                              : hives[inspection.hive_id].name.substring(
                                  0,
                                  // eslint-disable-next-line vue/comma-dangle
                                  35
                                ) + '...'
                          }`
                        "
                      >
                      </h4>
                      <pre
                        class="caption hive-name-caption"
                        v-text="` (${hives[inspection.hive_id].location})`"
                      >
                      </pre>
                    </div>
                  </div>
                </v-row>
                <div class="d-flex flex-no-wrap justify-flex-start align-end">
                  <div
                    class="hive-icon-wrapper mr-2 d-flex flex-column align-center"
                  >
                    <HiveIcon
                      :hive="hives[inspection.hive_id]"
                      :diary-view="true"
                    ></HiveIcon>
                  </div>
                  <div class="hive-details-icons-text pl-2 pr-0 py-0">
                    <div
                      v-if="inspection.created_at"
                      class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
                    >
                      <div class="mr-2 my-0">
                        <v-sheet class="beep-icon beep-icon-magnify"></v-sheet>
                      </div>
                      <span
                        class="mr-2 last-visit"
                        v-text="momentFromNow(inspection.created_at)"
                      >
                      </span>
                    </div>

                    <div
                      v-if="inspection.impression"
                      class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
                    >
                      <div class="mr-2 my-0">
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
                      </div>
                    </div>

                    <div
                      v-if="
                        inspection.attention ||
                          inspection.reminder ||
                          inspection.reminder_date
                      "
                      class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
                    >
                      <div class="mr-2 my-0">
                        <v-icon
                          v-if="
                            inspection.attention ||
                              inspection.reminder ||
                              inspection.reminder_date
                          "
                          class="red--text"
                        >
                          mdi-alert-circle
                        </v-icon>
                      </div>
                      <span
                        v-if="inspection.reminder_date"
                        class="to-do-date mr-2"
                        v-text="momentifyDayMonth(inspection.reminder_date)"
                      >
                      </span>
                      <span
                        v-if="inspection.reminder"
                        v-text="inspection.reminder"
                      >
                      </span>
                    </div>

                    <div
                      v-if="inspection.notes"
                      class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
                    >
                      <div class="mr-2 my-0">
                        <v-icon class="color-grey">
                          mdi-pencil-circle
                        </v-icon>
                      </div>
                      <span class="mr-2" v-text="inspection.notes"> </span>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </ScaleTransition>
        </v-row>
      </v-container>
    </div>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'
import HiveIcon from '@components/hive-icon.vue'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    Layout,
    HiveIcon,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      search: null,
      filterByReminder: false,
      filterByBase: false,
      filterByImpression: [],
      inspections: null,
      hives: null,
      showDiaryPlaceholder: false,
    }
  },
  computed: {
    filteredInspectionsWithUndefined() {
      var textFilteredInspections = []
      if (this.search === null) {
        textFilteredInspections = this.inspections
      } else {
        textFilteredInspections = this.inspections.map((inspection) => {
          const inspectionMatch = Object.entries(inspection).some(
            ([key, value]) => {
              if (
                value !== null &&
                typeof value === 'string'
                // && key !== ('description' || 'type' || 'hex_color' || 'created_at')
              ) {
                return value.toLowerCase().includes(this.search.toLowerCase())
              }
            }
          )
          if (inspectionMatch) {
            return inspection
          }
        })
      }

      var propertyFilteredInspections = textFilteredInspections
        .map((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByReminder) {
            if (
              inspection.attention === 1 ||
              inspection.reminder !== null ||
              inspection.reminder_date !== null
            ) {
              return inspection
            }
          } else {
            return inspection
          }
        })
        .map((inspection) => {
          if (
            typeof inspection !== 'undefined' &&
            this.filterByImpression.length > 0
          ) {
            if (this.filterByImpression.includes(inspection.impression)) {
              return inspection
            }
          } else {
            return inspection
          }
        })

      return propertyFilteredInspections
    },
    filteredInspections() {
      return this.filteredInspectionsWithUndefined.filter(
        (x) => x !== undefined
      )
    },
    locale() {
      return this.$i18n.locale
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.getAllHivesAndIds().then((hiveIds) => {
      this.getInspectionsForHiveIds(hiveIds).then((inspections) => {
        this.inspections = inspections
      })
    })
  },
  methods: {
    async getAllHivesAndIds() {
      try {
        const ownHives = await this.$store.dispatch('hives/findAll')
        const sharedApiaries = await this.$store.dispatch('groups/findAll')
        if (ownHives.hives.length === 0 && sharedApiaries.groups.length === 0) {
          this.showDiaryPlaceholder = true
        } else {
          const ownHivesArray = []
          ownHives.hives.forEach((hive) => {
            ownHivesArray.push(hive)
          })

          const sharedHivesArray = []
          sharedApiaries.groups.forEach((group) => {
            group.hives.forEach((hive) => {
              sharedHivesArray.push(hive)
            })
          })

          const allHives = ownHivesArray.concat(sharedHivesArray)

          var uniqueHives = {}
          var uniqueHiveIds = []
          const map = new Map()
          for (const item of allHives) {
            if (!map.has(item.id)) {
              map.set(item.id, true) // set any value to Map
              uniqueHives[item.id] = item
              uniqueHiveIds.push(item.id)
            }
          }

          this.hives = uniqueHives

          return uniqueHiveIds
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getInspectionsForHiveIds(hiveIds) {
      try {
        const inspections = await this.$store.dispatch(
          'inspections/getInspectionsForHiveIds',
          hiveIds
        )
        if (inspections.length === 0) {
          this.showDiaryPlaceholder = true
        }
        return inspections
      } catch (e) {
        console.log(e)
      }
    },
    updateFilterByImpression(number) {
      if (this.filterByImpression.includes(number)) {
        this.filterByImpression.splice(
          this.filterByImpression.indexOf(number),
          1
        )
      } else {
        this.filterByImpression.push(number)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  position: fixed;
  top: 100px;
  z-index: 1;
  width: 100%;
  margin-top: -4px;
  background-color: $color-orange-light;
  border-bottom: 1px solid #fff5e2;
  .filter-container {
    @include for-phone-only {
      padding: 10px;
    }
  }
  .filter-bar {
    margin-top: -10px;
    margin-bottom: -10px;
    @include for-tablet-portrait-up {
      margin-top: -12px;
      margin-bottom: -12px;
    }
    .v-input {
      background-color: $color-white;
      @include for-phone-only {
        max-width: 115px;
      }
    }
    .hide-on-mobile {
      @include for-phone-only {
        display: none;
      }
    }
    .show-on-mobile {
      display: none;
      @include for-phone-only {
        display: flex;
      }
    }
  }
}

.hive-inspections-content {
  max-width: 100vw;
  margin-top: 61px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 55px;
  }

  .diary-item-transition-wrapper {
    display: flex;
    flex-wrap: wrap;
    @include for-phone-only {
      min-width: 100%;
    }
  }
  .diary-item {
    flex-grow: 0 !important;
    padding: 4px;

    @include xs-only {
      flex-grow: 1 !important;
      min-width: 100%;
    }
  }

  .diary-card {
    height: 100%;
    padding: 12px;
    font-size: 0.875rem !important;

    .hive-name {
      line-height: 1rem;
    }

    .hive-name-caption {
      font-weight: 600;
      line-height: 1rem;
    }
    .hive-details-item {
      max-width: 300px;
      margin-bottom: 8px;
      line-height: 1.1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .to-do-date {
      width: auto;
      padding: 2px 4px !important;
      font-weight: 600;
      line-height: 1rem;
      color: red;
      text-align: center;
      white-space: nowrap;
      border: 1px solid red;
      border-radius: 5px;
    }
  }
}
</style>
