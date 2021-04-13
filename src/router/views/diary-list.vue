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
                v-model="diarySearch"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    diarySearch !== null
                      ? 'v-input--is-focused primary--text'
                      : ''
                  } filter-text-field`
                "
                :height="mobile ? '30px' : '36px'"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-card-actions class="pl-1 pl-sm-2">
              <v-icon
                v-if="groups.length > 0"
                :class="
                  `icon-apiary-shared mr-2 my-0 ${
                    filterByGroup ? '' : 'color-grey'
                  }`
                "
                @click="filterByGroup = !filterByGroup"
              >
                mdi-account-multiple
              </v-icon>
              <v-icon
                :class="
                  `${filterByAttention ? 'red--text' : 'color-grey'} mr-2`
                "
                @click="filterByAttention = !filterByAttention"
              >
                mdi-clipboard-alert-outline
              </v-icon>
              <v-icon
                :class="`${filterByReminder ? 'red--text' : 'color-grey'} mr-2`"
                @click="filterByReminder = !filterByReminder"
              >
                mdi-calendar-clock
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(3)
                      ? 'green--text'
                      : 'color-grey'
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
                      ? 'orange--text'
                      : 'color-grey'
                  } mr-2`
                "
                @click="filterByImpression = 2"
              >
                mdi-emoticon-neutral
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(1) ? 'red--text' : 'color-grey'
                  } mr-2`
                "
                @click="filterByImpression = 1"
              >
                mdi-emoticon-sad
              </v-icon>
            </v-card-actions>
          </div>
          <v-card-actions class="mr-1">
            <v-btn
              v-if="!mobile && !smallScreen"
              :to="{ name: 'inspect' }"
              medium
              tile
              outlined
              color="black"
            >
              <v-icon left>mdi-plus</v-icon>
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
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

    <v-container v-if="ready" class="diary-inspections-content">
      <v-row
        v-if="!showDiaryPlaceholder && filteredInspections.length > 0"
        dense
      >
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
            <DiaryCard
              :inspection="inspection"
              :hive="hives[inspection.hive_id]"
              @confirm-delete-inspection="confirmDeleteInspection($event)"
            ></DiaryCard>
          </v-col>
        </ScaleTransition>
      </v-row>
      <v-row v-if="!showDiaryPlaceholder && filteredInspections.length === 0">
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import DiaryCard from '@components/diary-card.vue'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import { readAlerts } from '@mixins/methodsMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
    DiaryCard,
    Layout,
    ScaleTransition,
  },
  mixins: [readAlerts],
  data: function() {
    return {
      ready: false,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
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
    filterByGroup: {
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
          hive.group_name = group.name
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
    inspectionsWithDatesAndHiveDetails() {
      if (this.generalInspections.length > 0) {
        var inspectionsWithDatesAndHiveDetails = this.generalInspections
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
          if (this.hives[inspection.hive_id] !== undefined) {
            const name = this.hives[inspection.hive_id].name
            const location = this.hives[inspection.hive_id].location
            inspection.hive_name = name
            inspection.hive_location = location
            var groupName = this.hives[inspection.hive_id].group_name || null
            const isOwnedAndInGroup =
              this.hives[inspection.hive_id].group_ids.length > 0 &&
              groupName === null
            if (isOwnedAndInGroup) {
              inspection.owned_and_group = true
              var groupNamesArray = []
              this.hives[inspection.hive_id].group_ids.map((groupId) => {
                groupNamesArray.push(
                  this.groups.filter((group) => group.id === groupId)[0].name
                )
              })
              groupName = groupNamesArray.join(', ')
            }
            inspection.hive_group_name = groupName
          }
        })
        return inspectionsWithDatesAndHiveDetails
      } else {
        return []
      }
    },
    filteredInspectionsWithUndefined() {
      var textFilteredInspections = []
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
                } else if (
                  key === 'id' &&
                  this.diarySearch.substring(0, 3) === 'id='
                ) {
                  return value
                    .toString()
                    .includes(
                      this.diarySearch.substring(3, this.diarySearch.length)
                    )
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
        .filter((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByAttention) {
            if (inspection.attention === 1) {
              return inspection
            }
          } else {
            return inspection
          }
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
        })
        .filter((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByGroup) {
            if (inspection.hive_group_name !== null) {
              return inspection
            }
          } else if (
            inspection.hive_group_name === null ||
            inspection.owned_and_group
          ) {
            // hide hives from groups when filter is off
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
      return (
        (this.apiaries.length === 0 && this.groups.length === 0) ||
        this.generalInspections.length === 0
      )
    },
    smallScreen() {
      return (
        this.$vuetify.breakpoint.width < 910 &&
        this.$vuetify.breakpoint.width > 500
      )
    },
  },
  created() {
    this.readAlerts() // for alerts-tab badge
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
    momentFromNow(date) {
      const moment = this.$moment(date)
        .locale(this.$i18n.locale)
        .fromNow()
      return moment.charAt(0).toUpperCase() + moment.slice(1)
    },
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
    momentifyDayMonth(date) {
      const currentYear = this.$moment(date).format('YYYY')
      const currentYearEn = ', ' + currentYear
      const currentYearEsPt = ' de ' + currentYear
      const currentYearNl = '. ' + currentYear
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('ll')
        .replace(currentYearNl, '')
        .replace(currentYearEn, '')
        .replace(currentYearEsPt, '')
        .replace(' ' + currentYear, '') // Remove year hardcoded per language, currently no other way to get rid of year whilst keeping localized time
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

  .diary-item-transition-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    @media (max-width: 909px) {
      max-width: 580px;
    }
  }
  .diary-item {
    flex-grow: 1 !important;
    min-width: 100%;
    padding: 4px;
  }
}
</style>
