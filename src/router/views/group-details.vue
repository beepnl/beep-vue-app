<template>
  <Layout :title="`${$t('group_details')}`" :menu-items="menuItems">
    <v-card tile class="sticky">
      <v-img
        v-if="group"
        class="align-end"
        height="180px"
        gradient="to bottom, rgba(255,255,255,.5), rgba(255,255,255,.9), rgba(255,255,255,.95)"
        :src="
          group.photo
            ? '' // TODO: insert actual photo (reversed this for demo purpose)
            : `https://picsum.photos/500/300?image=${group.id * 5 + 10}`
        "
        :lazy-src="
          group.photo
            ? '' // TODO: insert actual photo (reversed this for demo purpose)
            : `https://picsum.photos/10/6?image=${group.id * 5 + 10}`
        "
      >
        <template v-if="group.photo" v-slot:placeholder>
          <v-row class="ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-container class="apiary-info">
          <div class="d-flex">
            <span class="display-1" v-text="group.name" />
            <v-spacer></v-spacer>
            <v-tooltip v-if="group.warning" left>
              <template v-slot:activator="{ on }">
                <v-icon class="notification warning" v-on="on">
                  mdi-alert-circle
                </v-icon>
              </template>
              <span>This apiary has issues</span>
            </v-tooltip>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon class="notification shared" v-on="on">
                  mdi-account-multiple
                </v-icon>
              </template>
              <span v-text="`This apiary is shared with you`" />
            </v-tooltip>
          </div>
          <div class="subtitle-1 d-flex">
            <v-icon class="shared">
              mdi-account-multiple
            </v-icon>
            {{ group.users.length }}
            <v-spacer></v-spacer>
            <span class="float-right caption grey--text">
              {{ $t('last_visit') }}: {{ lastVisit }}
            </span>
          </div>
          <div class="hives">
            <HiveIcons v-if="group.id" :apiary="group"></HiveIcons>
          </div>
        </v-container>
      </v-img>
    </v-card>

    <v-list class="inspection-list">
      <v-subheader v-if="selectedHives.length">
        {{ filteredInspections.length }}
        {{ $tc('inspection', filteredInspections.length) }} {{ $t('for') }}
        <ScaleTransition appear>
          <v-chip outlined close class="mx-2" @click:close="unselectHives">
            {{ selectedHives.length }} {{ $tc('hive', selectedHives.length) }}
          </v-chip>
        </ScaleTransition>
      </v-subheader>
      <v-subheader v-else>
        {{ inspectionsForApiary.length }}
        {{ $tc('inspection', filteredInspections.length) }}.
        {{ $t('click_hives_to_filter') }}.
      </v-subheader>

      <ScaleTransition group>
        <template v-for="item in filteredInspections">
          <v-list-item :key="`i-${item.id}`" two-line class="inspection-entry">
            <v-row ma-0>
              <v-col>
                <v-list-item-title v-text="momentify(item.created_at)" />
                <v-list-item-subtitle
                  v-if="item.hive"
                  v-text="`hive ${item.hive}`"
                />
              </v-col>
              <v-col>
                {{ item.notes }}
              </v-col>
              <v-col cols="1">
                <v-icon v-if="item.impression === 1" class="red--text">
                  mdi-emoticon-sad-outline
                </v-icon>
                <v-icon v-if="item.impression === 3" class="green--text">
                  mdi-emoticon-happy-outline
                </v-icon>
                <v-icon v-if="item.impression === 2" class="orange--text">
                  mdi-emoticon-neutral-outline
                </v-icon>
              </v-col>
              <v-col cols="1" class="mr-2">
                <v-icon v-if="item.attention" class="red--text">
                  mdi-alert
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider :key="`div-${item.id}`"></v-divider>
        </template>
      </ScaleTransition>
    </v-list>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import HiveIcons from '@components/hive-icons.vue'
import { ScaleTransition } from 'vue2-transitions'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    HiveIcons,
    ScaleTransition,
    Layout,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      inspectionsForApiary: [],
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    id() {
      return parseInt(this.$route.params.id)
    },
    group() {
      return this.groups.find((group) => group.id === this.id)
    },
    selectedHives() {
      const hiveIds =
        (this.group &&
          this.group.hives.reduce((hiveIds, hive) => {
            if (hive.selected) {
              hiveIds.push(hive.id)
            }
            return hiveIds
          }, [])) ||
        []
      return hiveIds
    },
    filteredInspections() {
      if (this.selectedHives.length) {
        return this.inspectionsForApiary.filter((inspection) => {
          return this.selectedHives.includes(inspection.hive_id)
        })
      } else {
        return this.inspectionsForApiary
      }
    },
    lastVisit() {
      if (this.inspectionsForApiary.length) {
        const sortedInspectionsByDate = this.inspectionsForApiary
          .slice()
          .sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at)
          })
        return this.momentify(sortedInspectionsByDate[0].created_at)
      } else {
        return ''
      }
    },
    menuItems: function() {
      const items = [
        {
          title: this.$i18n.t('delete_group'),
        },
      ]
      if (this.editing) {
        items.unshift({
          title: this.$i18n.t('add_hive'),
          action: 'locations/addHive',
        })
      } else {
        items.unshift({
          title: this.$i18n.t('edit_group'),
          action: 'locations/editOn',
        })
      }
      return items
    },
  },
  created() {
    this.$store
      .dispatch('groups/findAll') // in case of direct link / page reload
      // find hives via hives endpoint? Or directly via groups (see below)
      // this.$store
      //   .dispatch('hives/findAll') // find hives via groups.hives is quicker??
      //   .then((data) => {
      //     return data.hives.filter((hive) => hive.group_ids.includes(this.id))
      //   })
      .then((data) => {
        const group = data.groups.find((group) => group.id === this.id)
        this.$store
          .dispatch('inspections/getInspectionsForHives', group.hives)
          .then((data) => {
            this.inspectionsForApiary = data
          })
      })
  },
  methods: {
    unselectHives: function() {
      this.group.hives.forEach((hive) =>
        this.$store.commit('locations/unselectHive', hive)
      )
    },
    notify: function(text) {
      this.snackbar.text = text
      this.snackbar.show = true
    },
  },
}
</script>

<style lang="scss" scoped>
.subtitle-1 {
  margin-left: 5px;
  font-weight: 600;
  color: black;
  .shared {
    color: black;
  }
  .v-icon {
    margin-right: 4px;
  }
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: -45px;
  z-index: 1;
}

.notification {
  &.warning {
    color: red;
  }
  &.shared {
    color: gray;
  }
}
</style>
