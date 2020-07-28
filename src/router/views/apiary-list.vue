<template>
  <Layout :menu-items="menuItems" :no-box-shadow="true">
    <div class="filter-bar-wrapper">
      <v-container>
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons d-flex flex-row justify-flex-start align-center"
          >
            <v-col cols="5" class="pr-1">
              <v-text-field
                v-model="search"
                :label="`${$t('Search')}`"
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
              <div class="mr-2 my-0" @click="filterByBase = !filterByBase">
                <v-sheet
                  class="beep-icon beep-icon-sensors"
                  :color="`${filterByBase ? 'green' : ''}`"
                >
                </v-sheet>
              </div>
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
          <v-card-actions class="view-buttons">
            <v-icon
              :class="`${gridView ? '' : 'color-primary'} mr-1`"
              @click="toggleGrid"
            >
              mdi-view-headline
            </v-icon>
            <v-icon
              :class="`${gridView ? 'color-primary' : ''}`"
              @click="toggleGrid"
            >
              mdi-view-grid-outline
            </v-icon>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row
        v-for="(hiveSet, j) in filteredHiveSets"
        :key="j"
        class="hive-set"
        dense
      >
        <div
          class="hive-set-title d-flex flex-row justify-flex-start align-center"
          :style="
            `color: ${
              hiveSet.hex_color ? hiveSet.hex_color : ''
            }; border-color: ${hiveSet.hex_color ? hiveSet.hex_color : ''};`
          "
        >
          <v-icon
            v-if="hiveSet.users && hiveSet.users.length"
            class="icon-apiary-shared ml-1 mr-2 my-0"
            :style="
              `background-color: ${hiveSet.hex_color}; border-color: ${hiveSet.hex_color};`
            "
          >
            mdi-account-multiple
          </v-icon>
          <v-icon v-else class="icon-apiary-owned ml-1 mr-2 my-0">
            mdi-home-analytics
          </v-icon>

          <h4 v-text="hiveSet.name"></h4>
          <pre
            v-if="!gridView && hiveSet.users && hiveSet.users.length"
            class="caption hive-set-caption"
            v-text="
              ` (${hiveSet.users.length} ${$tc(
                'member',
                // eslint-disable-next-line vue/comma-dangle
                hiveSet.users.length
              )})`
            "
          >
          </pre>
        </div>
        <v-col
          v-for="(hive, i) in sortedHives(hiveSet.hives)"
          :key="i"
          sm="auto"
          :class="`hive-item ${gridView ? 'grid-view' : 'list-view'}`"
        >
          <ScaleTransition :duration="400" group>
            <HiveCard
              :key="`${hive.id}`"
              :hive="hive"
              :hive-set="hiveSet"
              :grid-view="gridView"
            ></HiveCard>
          </ScaleTransition>
        </v-col>
      </v-row>
      <v-row
        v-if="sortedHiveSets.length && !filteredHiveSets.length"
        class="hive-set"
      >
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import HiveCard from '@components/hive-card.vue'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    HiveCard,
    Layout,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: () => ({
    search: null,
    filterByReminder: false,
    filterByBase: false,
    filterByImpression: [],
    gridView: false,
    settings: [],
    showApiaryWizard: false,
  }),
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    hiveSets() {
      return this.apiaries.concat(this.groups)
    },
    sortedHiveSets() {
      const sortedHiveSets = this.hiveSets
        .slice()
        .sort(function(a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        })
        .sort(function(a, b) {
          if ('type' in b) {
            return 1
          }
          if ('type' in a) {
            return -1
          }
          return 0
        })
      return sortedHiveSets
    },
    filteredHiveSets() {
      var textFilteredHiveSets = []
      if (this.search === null) {
        textFilteredHiveSets = this.sortedHiveSets
      } else {
        textFilteredHiveSets = this.sortedHiveSets.map((hiveSet) => {
          const hiveSetMatch = Object.entries(hiveSet).some(([key, value]) => {
            if (
              value !== null &&
              typeof value === 'string' &&
              key !== ('description' || 'type' || 'hex_color' || 'created_at')
            ) {
              return value.toLowerCase().includes(this.search.toLowerCase())
            }
          })
          if (hiveSetMatch) {
            return hiveSet
          } else {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter((hive) => {
                return Object.entries(hive).some(([key, value]) => {
                  if (value !== null && typeof value === 'string') {
                    return value
                      .toLowerCase()
                      .includes(this.search.toLowerCase())
                  } else if (key === 'queen' && value !== null) {
                    return Object.entries(value).some(([key, value]) => {
                      if (
                        value !== null &&
                        typeof value === 'string' &&
                        key !== ('color' || 'created_at')
                      ) {
                        return value
                          .toLowerCase()
                          .includes(this.search.toLowerCase())
                      }
                    })
                  }
                })
              }),
            }
          }
        })
      }

      var propertyFilteredHiveSets = textFilteredHiveSets
        .map((hiveSet) => {
          if (this.filterByReminder) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter(
                (hive) => hive.attention === 1 || hive.reminder !== null
              ),
            }
          } else {
            return hiveSet
          }
        })
        .map((hiveSet) => {
          if (this.filterByBase) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter((hive) => hive.sensors.length > 0),
            }
          } else {
            return hiveSet
          }
        })
        .map((hiveSet) => {
          if (this.filterByImpression.length > 0) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter((hive) =>
                this.filterByImpression.includes(hive.impression)
              ),
            }
          } else {
            return hiveSet
          }
        })
        .filter((x) => x.hives.length > 0)

      return propertyFilteredHiveSets
    },
    menuItems: function() {
      return [
        { title: this.$i18n.t('new_apiary'), route: 'apiary-create' },
        { title: this.$i18n.t('new_group') },
      ]
    },
  },
  mounted() {
    if (localStorage.gridView) {
      this.gridView = localStorage.gridView === 'true'
    }
  },
  created() {
    this.readApiariesAndGroups()
  },
  methods: {
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await this.$store.dispatch('locations/findAll')
        const responseGroups = await this.$store.dispatch('groups/findAll')
        if (
          responseApiaries.locations.length === 0 &&
          responseGroups.groups.length === 0
        ) {
          this.showApiaryWizard = true // TODO: make placeholder for no apiaries/groups situation
        }
        return true
      } catch (e) {
        console.log(e)
      }
    },
    inspectionsForHive(hive) {
      if (this.inspectionsForHives.length && hive.inspection_count > 0) {
        return this.inspectionsForHives.filter(
          (inspection) => inspection.hive_id === hive.id
        )
      } else {
        return []
      }
    },
    sortedHives(hives) {
      return hives.slice().sort((a, b) => a.order - b.order)
    },
    toggleGrid() {
      if (this.gridView) {
        localStorage.gridView = 'false'
        this.gridView = false
      } else {
        localStorage.gridView = 'true'
        this.gridView = true
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
  top: 108px;
  z-index: 1;
  width: 100%;
  margin-top: -4px;
  background-color: white;
  // border-bottom: 1px solid $color-grey;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.12),
    0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 1px 10px 0 rgba(0, 0, 0, 0.08);
  @include for-tablet-landscape-up {
    top: 116px;
  }
  .filter-bar {
    margin-top: -8px;
    margin-bottom: -8px;
    @include for-tablet-landscape-up {
      margin-top: -6px;
    }

    .v-input {
      @include for-phone-only {
        max-width: 106px;
        padding-right: 0 !important;
      }
    }
    .view-buttons {
      padding: 9px;
    }
  }
}

.hive-set {
  margin-bottom: 24px;
  &:first-child {
    margin-top: 80px;
  }
  .hive-set-title {
    width: 100%;
    padding-bottom: 8px;
    margin: 12px 0;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
    .hive-set-caption {
      font-weight: 600;
    }
  }
  .hive-item {
    flex-grow: 0 !important;
    &.list-view {
      @include xs-only {
        flex-grow: 1 !important;
        min-width: 100%;
      }
    }
  }
}

.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.2s ease;
}
.grid-fade-enter,
.grid-fade-leave-to {
  opacity: 0;
}
</style>
