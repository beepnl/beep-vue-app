<template>
  <Layout :menu-items="menuItems">
    <v-container>
      <v-card class="d-flex flex-row-reverse" flat>
        <v-card-actions>
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
        v-for="(hiveSet, j) in sortedHiveSets"
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
      // Returns 1 hiveSet!
      // return this.hiveSets.filter((hiveSet) => {
      //   return hiveSet.name.includes('Apiary 8')
      // })

      return this.hiveSets.filter((hiveSet) => {
        return hiveSet.hives.filter((hive) => {
          return hive.location.includes('Apiary 8')
        })
      })

      // FIXME: returns only hives, but we need to keep the same hiveSet structure
      // return this.hiveSets
      //   .map((hiveSet) => {
      //     return hiveSet.hives.filter((hive) => {
      //       return hive.location.includes('Apiary')
      //     })
      //   })
      //   .filter((x) => x.length > 0)
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
