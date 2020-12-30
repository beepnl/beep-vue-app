<template>
  <Layout>
    <v-container v-if="showDiaryPlaceholder && ready">
      <v-row>
        <v-col sm="auto" :cols="12">
          {{ $t('no_data') }}
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!showDiaryPlaceholder && ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons d-flex flex-row justify-flex-start align-center"
          >
            <v-col cols="5" :class="mobile ? 'pr-0' : 'pr-1'">
              <v-text-field
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field`
                "
                :height="mobile ? '30px' : '36px'"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-icon
                :class="`${filterByReminder ? 'red--text' : 'color-grey'} mr-2`"
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
                    filterByImpression.includes(1) ? 'red--text' : 'color-grey'
                  } mr-2`
                "
                @click="updateFilterByImpression(1)"
              >
                mdi-emoticon-sad
              </v-icon>
            </v-card-actions>
          </div>
          <v-card-actions class="mr-1">
            <v-btn
              v-if="!mobile"
              :to="{ name: 'inspect' }"
              medium
              tile
              outlined
              color="primary"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ $t('New_inspection') }}
            </v-btn>
            <router-link v-if="mobile" :to="{ name: 'inspect' }">
              <v-icon dark color="primary">mdi-plus-circle</v-icon></router-link
            >
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

    <v-container
      v-if="!showDiaryPlaceholder && ready"
      class="diary-inspections-content"
    >
      <v-row dense>
        <ScaleTransition
          :duration="500"
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
            <v-card class="diary-card" outlined>
              <div
                class="d-flex flex-no-wrap justify-flex-start align-start"
                style="width: 100%;"
              >
                <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                  <v-col
                    cols="12"
                    sm="5"
                    class="diary-details-item diary-inspection-meta d-flex flex-row justify-flex-start pa-0"
                  >
                    <v-row class="pl-3 py-0">
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
                        <HiveIcon
                          :hive="hives[inspection.hive_id]"
                          :diary-view="true"
                        ></HiveIcon>
                      </v-col>

                      <v-col
                        cols="4"
                        class="diary-inspection-date-item d-flex flex-column align-start pa-0 pr-3"
                      >
                        <div>
                          <v-tooltip
                            v-if="
                              hives[inspection.hive_id].name.length >= 15 &&
                                !smallScreen
                            "
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
                                  hives[inspection.hive_id].name.substring(
                                    0,
                                    // eslint-disable-next-line vue/comma-dangle
                                    14
                                  ) + '...'
                                "
                              >
                              </span>
                            </template>
                            <span
                              class="diary-label"
                              v-text="hives[inspection.hive_id].name"
                            >
                            </span>
                          </v-tooltip>
                          <span
                            v-else
                            class="diary-label"
                            v-text="hives[inspection.hive_id].name"
                          >
                          </span>
                        </div>
                        <span
                          class="diary-inspection-text"
                          v-text="hives[inspection.hive_id].location"
                        >
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" sm="7" class="diary-inspection-content pa-0">
                    <v-row class="py-0 ml-sm-0">
                      <v-col
                        cols="12"
                        sm="1"
                        md="3"
                        lg="2"
                        class="diary-details-item d-flex flex-column align-start pa-0"
                      >
                        <div
                          v-if="inspection.impression"
                          class="diary-content-item d-flex flex-no-wrap justify-flex-start align-center mr-2"
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
                          </div>
                          <span
                            class="diary-label hide-md"
                            v-text="`${$t('positive_impression')}`"
                          >
                          </span>
                        </div>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="5"
                        class="diary-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div
                          v-if="
                            inspection.attention ||
                              inspection.reminder ||
                              inspection.reminder_date
                          "
                          class="diary-content-item"
                        >
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon class="red--text">
                                mdi-alert-circle
                              </v-icon>
                            </div>
                            <span
                              v-if="inspection.reminder_date"
                              class="to-do-date mr-2"
                              v-text="
                                momentifyDayMonth(inspection.reminder_date)
                              "
                            >
                            </span>
                            <span
                              class="diary-label"
                              v-text="`${$t('needs_attention')}`"
                            >
                            </span>
                          </div>
                          <div class="ml-7 diary-inspection-text">
                            <v-tooltip
                              v-if="
                                inspection.reminder &&
                                  inspection.reminder.length > 30 &&
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
                              <span
                                class="reminder"
                                v-text="inspection.reminder"
                              >
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

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        lg="5"
                        class="diary-details-item d-flex flex-column align-start  pa-0"
                      >
                        <div v-if="inspection.notes" class="diary-content-item">
                          <div
                            class="d-flex flex-no-wrap justify-flex-start align-center mr-2"
                          >
                            <div class="mr-1 my-0">
                              <v-icon class="color-grey">
                                mdi-pencil-circle
                              </v-icon>
                            </div>
                            <span class="diary-label" v-text="`${$t('notes')}`">
                            </span>
                          </div>
                          <div class="ml-7 diary-inspection-text mr-2">
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
                              <span class="notes" v-text="inspection.notes">
                              </span>
                            </v-tooltip>
                            <span
                              v-else
                              class="notes"
                              v-text="inspection.notes"
                            >
                            </span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <div class="flex-column justify-space-between align-start">
                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="diary-menu-button pa-0"
                        depressed
                        color="transparent"
                        v-on="on"
                      >
                        <v-icon class="color-grey">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item-group>
                        <v-list-item
                          :to="{
                            name: 'hive-inspections',
                            params: { id: inspection.hive_id },
                            query: { search: inspection.id.toString() },
                          }"
                        >
                          <v-list-item-icon class="mr-3">
                            <v-icon>mdi-magnify</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title
                              >{{ $t('view') }}
                              {{ $tc('inspection', 1) }}</v-list-item-title
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
                            <v-icon>mdi-pencil</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title
                              v-text="`${$t('Edit_inspection')}`"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>

                      <v-divider
                        v-if="inspection.owner"
                        class="my-1"
                      ></v-divider>

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
                </div>
              </div>
            </v-card>
          </v-col>
        </ScaleTransition>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/main.vue'
import HiveIcon from '@components/hive-icon.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
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
      ready: false,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('inspections', ['generalInspections']),
    hives() {
      const ownHivesArray = []
      this.apiaries.forEach((apiary) => {
        apiary.hives.forEach((hive) => {
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      this.groups.forEach((group) => {
        group.hives.forEach((hive) => {
          sharedHivesArray.push(hive)
        })
      })

      const allHives = ownHivesArray.concat(sharedHivesArray)

      var uniqueHives = {}
      const map = new Map()
      for (const item of allHives) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          uniqueHives[item.id] = item
        }
      }
      return uniqueHives
    },
    // make inspections filterable by hive name and location
    inspectionsWithHiveDetails() {
      var inspectionsWithHiveDetails = this.generalInspections
      inspectionsWithHiveDetails.map((inspection) => {
        const name = this.hives[inspection.hive_id].name
        const location = this.hives[inspection.hive_id].location
        inspection.hive_name = name
        inspection.hive_location = location
      })
      return inspectionsWithHiveDetails
    },
    filteredInspectionsWithUndefined() {
      var textFilteredInspections = []
      if (this.search === null) {
        textFilteredInspections = this.inspectionsWithHiveDetails
      } else {
        textFilteredInspections = this.inspectionsWithHiveDetails.map(
          (inspection) => {
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
          }
        )
      }

      var propertyFilteredInspections = textFilteredInspections
        .slice()
        .sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        })
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
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showDiaryPlaceholder() {
      return this.apiaries.length === 0 && this.groups.length === 0
    },
    smallScreen() {
      return (
        this.$vuetify.breakpoint.width < 850 &&
        this.$vuetify.breakpoint.width > 500
      )
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.readGeneralInspectionsIfNotPresent().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async deleteInspection(id) {
      try {
        const response = await Api.deleteRequest('/inspections/', id)
        if (!response) {
          console.log('Error')
        }
        this.readGeneralInspections() // update generalInspections in store
        this.readApiariesAndGroups() // update apiaries and groups so the latest inspection will be displayed at apiary-list
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        // no placeholder needed when response is empty because this page won't be accesible without any hives
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readApiariesAndGroupsIfNotPresent() {
      if (this.apiaries.length === 0 && this.groups.length === 0) {
        // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
        try {
          const responseApiaries = await Api.readRequest('/locations')
          const responseGroups = await Api.readRequest('/groups')
          this.$store.commit(
            'locations/setApiaries',
            responseApiaries.data.locations
          )
          this.$store.commit('groups/setGroups', responseGroups.data.groups)
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    async readGeneralInspections() {
      try {
        const response = await Api.readRequest('/inspections')
        if (response.data.length === 0) {
          this.showDiaryPlaceholder = true
        }
        this.$store.commit('inspections/setGeneralInspections', response.data)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readGeneralInspectionsIfNotPresent() {
      if (this.generalInspections.length === 0) {
        try {
          const response = await Api.readRequest('/inspections')
          if (response.data.length === 0) {
            this.showDiaryPlaceholder = true
          }
          this.$store.commit('inspections/setGeneralInspections', response.data)
          return true
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    confirmDeleteInspection(inspection) {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_inspection'),
          this.$i18n.t('remove_inspection') +
            ' (' +
            this.$i18n.t('Date').toLocaleLowerCase() +
            ': ' +
            this.momentify(inspection.created_at) +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteInspection(inspection.id)
        })
        .catch((reject) => {
          return true
        })
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
  }
}

.hide-md {
  display: flex;
  @media (min-width: 850px) {
    display: none;
  }
  @include for-tablet-landscape-up {
    display: flex;
  }
}

.diary-inspections-content {
  margin-top: 61px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 55px;
  }

  .diary-item-transition-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    @media (max-width: 849px) {
      max-width: 580px;
    }
  }
  .diary-item {
    flex-grow: 1 !important;
    min-width: 100%;
    padding: 4px;
  }

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
  }
}
</style>
