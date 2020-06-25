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
        <div
          class="hive-set-title d-flex flex-row justify-flex-start align-center"
          :style="
            `color: ${hiveSet.hex_color}; border-color: ${hiveSet.hex_color};`
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

          <div v-text="hiveSet.name"></div>
          <pre
            v-if="!gridView && hiveSet.users && hiveSet.users.length"
            class="caption"
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
  margin-bottom: 24px;
  .hive-set-title {
    width: 100%;
    padding-bottom: 8px;
    margin: 12px 0;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
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
