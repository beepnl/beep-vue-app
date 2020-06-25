<template>
  <Layout :menu-items="menuItems">
    <v-container>
      <v-card class="d-flex flex-row justify-space-between align-center" flat>
        <div class="d-flex flex-row justify-flex-start align-center">
          <v-col cols="8" class="pl-0">
            <v-text-field
              v-model="search"
              label="Search"
              clearable
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-card-actions>
            <v-icon
              :class="
                `${filterByReminder ? 'color-primary' : 'color-grey'} mr-2`
              "
              @click="filterByReminder = !filterByReminder"
            >
              mdi-alert-circle
            </v-icon>
          </v-card-actions>
        </div>
        <v-card-actions class="pr-0">
          <v-icon
            :class="`${gridView ? '' : 'color-primary'} mr-2`"
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
      </v-card>

      <v-row
        v-for="(hiveSet, j) in filteredHiveSets"
        :key="j"
        class="hive-set"
        dense
      >
        <v-col
          v-for="(hive, i) in sortedHives(hiveSet.hives)"
          :key="i"
          sm="auto"
          :class="`hive-item ${gridView ? 'grid-view' : 'list-view'}`"
          :cols="12"
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
    // filterKeys: ['city', 'country_code', 'name', 'postal_code', 'street'],
    gridView: false,
    settings: [],
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
      if (this.search === null && !this.filterByReminder) {
        return this.sortedHiveSets
      } else if (this.filterByReminder) {
        return this.sortedHiveSets
          .map((hiveSet) => {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter(
                (hive) => hive.attention === 1 || hive.reminder !== null
              ),
            }
          })
          .filter((x) => x.hives.length > 0)
      } else {
        return this.sortedHiveSets
          .map((hiveSet) => {
            const hiveSetMatch = Object.entries(hiveSet).some(
              ([key, value]) => {
                if (
                  value !== null &&
                  typeof value === 'string' &&
                  key !==
                    ('description' || 'type' || 'hex_color' || 'created_at')
                ) {
                  return value.toLowerCase().includes(this.search.toLowerCase())
                }
              }
            )
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
          .filter((x) => x.hives.length > 0)
      }

      // WORKING ATTENTION FILTER
      // const filtered = this.hiveSets
      // return filtered
      //   .map((hiveSet) => {
      //     return {
      //       ...hiveSet,
      //       hives: hiveSet.hives.filter((hive) => hive.attention === 1),
      //     }
      //   })
      //   .filter((x) => x.hives.length > 0)

      // Returns 1 hiveSet!
      // return this.hiveSets.filter((hiveSet) => {
      // return hiveSet.city.toLowerCase().includes(this.search.toLowerCase())
      // })
    },
    menuItems: function() {
      return [
        { title: this.$i18n.t('new_apiary') },
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
    this.$store.dispatch('locations/findAll')
    this.$store.dispatch('groups/findAll')
  },
  methods: {
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
      console.log(this.gridView)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  height: 40px !important;
}
.hive-set {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid $color-primary;
  &:last-child {
    border-bottom: 0;
  }
}

.hive-item.list-view {
  min-width: 100%;
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
