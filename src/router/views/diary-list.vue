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
            <v-col class="pa-3">
              <v-text-field
                v-model="diarySearch"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    diarySearch !== null ? 'v-input--is-focused' : ''
                  } filter-text-field`
                "
                :style="'height: ' + (mobile ? '30px;' : '36px;')"
                color="accent"
                clearable
                :clear-icon="'mdi-close'"
                persistent-clear
                variant="outlined"
                density="compact"
                hide-details
                @click:clear="diarySearch = null"
              >
              </v-text-field>
            </v-col>
            <v-card-actions class="pl-0">
              <v-icon
                v-if="groups.length > 0"
                :class="
                  `${
                    filterByGroupStatus === 'off' ? 'color-grey-filter' : ''
                  } ${
                    filterByGroupStatus === 'owned'
                      ? 'icon-apiary-owned'
                      : 'icon-apiary-shared'
                  } mr-2`
                "
                @click="toggleFilterByGroup"
              >
                {{
                  filterByGroupStatus === 'owned'
                    ? 'mdi-home-analytics'
                    : 'mdi-account-multiple'
                }}
              </v-icon>
              <v-icon
                :class="
                  `${filterByAttention ? 'text-red' : 'color-grey-filter'} mr-2`
                "
                @click="filterByAttention = !filterByAttention"
              >
                mdi-clipboard-alert-outline
              </v-icon>
              <v-icon
                :class="
                  `${filterByReminder ? 'text-red' : 'color-grey-filter'} mr-2`
                "
                @click="filterByReminder = !filterByReminder"
              >
                mdi-calendar-clock
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(3)
                      ? 'text-green'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByImpression = 3"
              >
                mdi-emoticon-happy
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(2)
                      ? 'text-orange'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByImpression = 2"
              >
                mdi-emoticon-neutral
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(1)
                      ? 'text-red'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByImpression = 1"
              >
                mdi-emoticon-sad
              </v-icon>
            </v-card-actions>
          </div>
          <v-card-actions v-if="!mobile && !smallScreen" class="mr-1">
            <v-btn
              :to="{ name: 'inspect' }"
              medium
              variant="outlined"
              color="black"
            >
              <v-icon start>mdi-plus</v-icon>
              {{ $t('New_inspection') }}
            </v-btn>
            <!-- <router-link v-if="mobile" :to="{ name: 'inspect' }">
              <v-icon dark color="primary">mdi-plus-circle</v-icon></router-link
            > -->
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="!ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <div v-if="ready" class="diary-inspections-content">
      <DynamicScroller
        v-if="!showDiaryPlaceholder && filteredInspections.length > 0"
        :items="filteredInspections"
        :min-item-size="90"
        :class="
          'scroller pl-6' +
            (filteredInspections.length <= paginationItems
              ? ' --single-page'
              : '')
        "
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          >
            <div class="diary-item">
              <DiaryCard
                :inspection="item"
                :hive="hivesObject[item.hive_id]"
                @confirm-delete-inspection="confirmDeleteInspection($event)"
              ></DiaryCard>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
      <v-row v-if="!showDiaryPlaceholder && filteredInspections.length === 0">
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
        </v-col>
      </v-row>
    </div>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@/src/components/confirm-dialog.vue'
import DiaryCard from '@components/diary-card.vue'
import Layout from '@/src/router/layouts/main-layout.vue'
import { mapGetters } from 'vuex'
import {
  momentFromNow,
  momentify,
  momentifyDayMonth,
} from '@mixins/momentMixin'
import {
  checkAlerts,
  readApiariesAndGroups,
  readApiariesAndGroupsIfNotPresent,
  readGeneralInspections,
  readGeneralInspectionsIfNotPresent,
  toggleFilterByGroup,
} from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    DiaryCard,
    Layout,
  },
  mixins: [
    checkAlerts,
    momentFromNow,
    momentify,
    momentifyDayMonth,
    readApiariesAndGroups,
    readApiariesAndGroupsIfNotPresent,
    readGeneralInspections,
    readGeneralInspectionsIfNotPresent,
    toggleFilterByGroup,
  ],
  data: function() {
    return {
      ready: false,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('inspections', ['generalInspections']),
    diarySearch: {
      get() {
        return this.$store.getters['inspections/diarySearch']
      },
      set(value) {
        this.$store.commit('inspections/setData', {
          prop: 'diarySearch',
          value,
        })
      },
    },
    filterByAttention: {
      get() {
        return this.$store.getters['inspections/diaryFilterByAttention']
      },
      set(value) {
        this.$store.commit('inspections/setFilter', {
          filter: 'diaryFilterByAttention',
          value,
        })
      },
    },
    filterByGroupStatus: {
      get() {
        return this.$store.getters['inspections/diaryFilterByGroup']
      },
      set(value) {
        this.$store.commit('inspections/setFilter', {
          filter: 'diaryFilterByGroup',
          value,
        })
      },
    },
    filterByImpression: {
      get() {
        return this.$store.getters['inspections/diaryFilterByImpression']
      },
      set(value) {
        this.$store.commit('inspections/setFilterByImpression', value)
      },
    },
    filterByReminder: {
      get() {
        return this.$store.getters['inspections/diaryFilterByReminder']
      },
      set(value) {
        this.$store.commit('inspections/setFilter', {
          filter: 'diaryFilterByReminder',
          value,
        })
      },
    },
    // make inspections filterable by hive name and location
    inspectionsWithDatesAndHiveDetails() {
      if (this.generalInspections.length > 0) {
        const inspectionsWithDatesAndHiveDetails = JSON.parse(
          JSON.stringify(this.generalInspections)
        ) // clone without v-bind to avoid vuex warning when mutating
        inspectionsWithDatesAndHiveDetails.map((inspection) => {
          inspection.created_at_locale_date = this.momentify(
            inspection.created_at
          )
          inspection.created_at_moment_from_now = this.momentFromNow(
            inspection.created_at
          )
          inspection.reminder_date !== null
            ? (inspection.reminder_date_locale_date = this.momentify(
                inspection.reminder_date
              ))
            : (inspection.reminder_date_locale_date = null)
          inspection.reminder_date !== null
            ? (inspection.reminder_date_day_month = this.momentifyDayMonth(
                inspection.reminder_date
              ))
            : (inspection.reminder_date_day_month = null)
          if (this.hivesObject[inspection.hive_id] !== undefined) {
            const name = this.hivesObject[inspection.hive_id].name
            const location = this.hivesObject[inspection.hive_id].location
            inspection.hive_name = name
            inspection.hive_location = location
            let groupName =
              this.hivesObject[inspection.hive_id].group_name || null
            const isOwnedAndInGroup =
              this.hivesObject[inspection.hive_id].group_ids.length > 0 &&
              groupName === null
            if (isOwnedAndInGroup) {
              inspection.owned_and_group = true
              const groupNamesArray = []
              this.hivesObject[inspection.hive_id].group_ids.map((groupId) => {
                groupNamesArray.push(
                  this.groups.filter((group) => group.id === groupId)[0].name
                )
                return true // TODO-VUE3 check
              })
              groupName = groupNamesArray.join(', ')
            }
            inspection.hive_group_name = groupName
          }
          return inspection // TODO-VUE3 check
        })
        return inspectionsWithDatesAndHiveDetails
      } else {
        return []
      }
    },
    filteredInspectionsWithUndefined() {
      let textFilteredInspections = []
      if (this.diarySearch === null) {
        textFilteredInspections = this.inspectionsWithDatesAndHiveDetails
      } else {
        textFilteredInspections = this.inspectionsWithDatesAndHiveDetails.map(
          (inspection) => {
            const inspectionMatch = Object.entries(inspection).some(
              ([key, value]) => {
                if (
                  value !== null &&
                  typeof value === 'string' &&
                  key !== ('created_at' || 'reminder_date') &&
                  this.diarySearch.substring(0, 3) !== 'id='
                ) {
                  return value
                    .toLowerCase()
                    .includes(this.diarySearch.toLowerCase())
                } else if (key === 'searchable' && Array.isArray(value)) {
                  return (
                    value.filter((val) =>
                      val.toLowerCase().includes(this.diarySearch.toLowerCase())
                    ).length > 0
                  )
                } else if (
                  key === 'id' &&
                  this.diarySearch.substring(0, 3) === 'id='
                ) {
                  return (
                    value.toString() ===
                    this.diarySearch.substring(3, this.diarySearch.length)
                  )
                }
                return false // TODO-VUE3 check
              }
            )
            if (inspectionMatch) {
              return inspection
            }
            return false // TODO-VUE3 check
          }
        )
      }

      const propertyFilteredInspections = textFilteredInspections
        .slice()
        .sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        })
        .filter((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByAttention) {
            if (inspection.attention === 1) {
              return inspection
            }
          } else {
            return inspection
          }
          return false // TODO-VUE3 check
        })
        .filter((inspection) => {
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
          return false // TODO-VUE3 check
        })
        .filter((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByReminder) {
            if (
              inspection.reminder !== null ||
              inspection.reminder_date !== null
            ) {
              return inspection
            }
          } else {
            return inspection
          }
          return false // TODO-VUE3 check
        })
        .filter((inspection) => {
          if (
            typeof inspection !== 'undefined' &&
            this.filterByGroupStatus === 'group'
          ) {
            if (inspection.hive_group_name !== null) {
              return inspection
            }
          } else if (
            typeof inspection !== 'undefined' &&
            this.filterByGroupStatus === 'owned'
          ) {
            if (
              inspection.hive_group_name === null ||
              inspection.owned_and_group
            ) {
              return inspection
            }
          } else {
            return inspection
          }
          return false // TODO-VUE3 check
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
      return this.$vuetify.display.mobile
    },
    paginationItems() {
      // overestimation of how many inspection items fit in clients window
      return Math.ceil(window.innerHeight / 75)
    },
    showDiaryPlaceholder() {
      return (
        (this.apiaries.length === 0 && this.groups.length === 0) ||
        this.generalInspections.length === 0
      )
    },
    smallScreen() {
      return (
        this.$vuetify.display.width < 910 && this.$vuetify.display.width > 500
      )
    },
  },
  mounted() {
    this.checkAlertRulesAndAlerts() // for alerts-tab badge
    if (
      this.$route.query.search !== null &&
      this.$route.query.search !== undefined
    ) {
      this.diarySearch = this.$route.query.search
    }
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
  },
}
</script>

<style lang="scss" scoped>
.diary-inspections-content {
  margin-top: 61px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 55px;
  }
}

.diary-item {
  padding: 4px;
  width: 100%;
  max-width: 1200px;
  @media (max-width: 909px) {
    max-width: 580px;
  }
  &:first-child {
    margin-top: 12px;
  }
}

.scroller {
  height: calc(100vh - 156px);
  width: 100%;
}
</style>
