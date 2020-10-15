<template>
  <Layout :menu-items="menuItems" :no-box-shadow="true">
    <div
      v-if="showApiaryPlaceholder"
      class="apiary-placeholder d-flex align-center"
    >
      <v-container class="d-flex flex-column align-center">
        <v-img
          class="apiary-placeholder-item"
          height="auto"
          src="~@assets/img/apiary-illustration.png"
        >
        </v-img>
        <h4 class="mt-5 mb-8">{{ $t('no_apiaries_yet') }}</h4>

        <router-link
          class="apiary-placeholder-item mt-10"
          :to="{
            name: `apiary-create`,
          }"
        >
          <div class="color-primary"
            ><v-icon class="color-primary" large left>mdi-plus-circle</v-icon
            >{{ $t('add') + ' ' + $tc('location', 1) }}</div
          >
        </router-link>

        <router-link
          class="apiary-placeholder-item mt-5"
          :to="{
            name: `support`,
          }"
        >
          <div class="color-grey-medium"
            ><v-icon class="color-grey-medium" large left
              >mdi-comment-question</v-icon
            >{{ $t('need_help') }}</div
          >
        </router-link>
      </v-container>
    </div>
    <div v-else-if="ready">
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
                      search !== null ? 'primary--text' : ''
                    } filter-text-field`
                  "
                  :autofocus="search !== null"
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
            <v-card-actions class="view-buttons">
              <v-icon
                :class="`${listView ? 'color-primary' : ''} mr-2`"
                @click="toggleGrid('listView')"
              >
                mdi-view-headline
              </v-icon>
              <v-icon
                :class="
                  `${gridView ? 'color-primary' : ''} hide-on-mobile mr-2`
                "
                @click="toggleGrid('gridView')"
              >
                mdi-view-grid-outline
              </v-icon>
              <v-icon
                :class="`${apiaryView ? 'color-primary' : ''}`"
                @click="toggleGrid('apiaryView')"
              >
                mdi-home-analytics
              </v-icon>
            </v-card-actions>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-row
          v-for="(hiveSet, j) in filteredHiveSets"
          :key="j"
          :class="`hive-set ${apiaryView ? 'apiary-view' : ''}`"
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
            <v-icon
              v-else
              class="icon-apiary-owned ml-1 mr-2 my-0"
              :style="
                `background-color: ${
                  hiveSet.hex_color ? hiveSet.hex_color : ''
                }; border-color: ${hiveSet.hex_color ? hiveSet.hex_color : ''};`
              "
            >
              mdi-home-analytics
            </v-icon>

            <h4 v-text="hiveSet.name"></h4>
            <pre
              v-if="listView && hiveSet.users && hiveSet.users.length"
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

            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  class="color-grey-light ml-2"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-cog</v-icon
                >
              </template>
              <v-list v-if="!hiveSet.users" dense>
                <v-list-item-group>
                  <v-list-item
                    :to="{
                      name: 'apiary-edit',
                      params: { id: hiveSet.id },
                    }"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('edit') + ' ' + $tc('location', 1)"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    :to="{
                      name: 'hive-create',
                      query: { locationId: hiveSet.id },
                    }"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon>mdi-plus</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('New') + ' ' + $tc('hive', 1)"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-divider v-if="hiveSet.owner" class="my-1"></v-divider>

                <v-list-item-group>
                  <v-list-item
                    v-if="hiveSet.owner"
                    @click="confirmDeleteApiary(hiveSet)"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon class="red--text">mdi-delete</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="red--text">{{
                        $t('remove_apiary')
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-list v-if="hiveSet.users" dense>
                <v-list-item-group>
                  <v-list-item
                    :to="{
                      name: 'group-edit',
                      params: { id: hiveSet.id },
                    }"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('edit') + ' ' + $tc('group', 1)"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>

                <v-divider class="my-1"></v-divider>

                <v-list-item-group>
                  <v-list-item
                    v-if="hiveSet.creator"
                    @click="confirmDeleteGroup(hiveSet)"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon class="red--text">mdi-delete</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="red--text">{{
                        $t('Remove_group')
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    v-if="!hiveSet.creator"
                    @click="confirmDetachGroup(hiveSet)"
                  >
                    <v-list-item-icon class="mr-3">
                      <v-icon class="red--text">mdi-delete</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="red--text">{{
                        $t('Detach_from_group')
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>
          <ScaleTransition
            :duration="300"
            group
            class="hive-item-transition-wrapper"
          >
            <v-col
              v-for="(hive, i) in sortedHives(hiveSet.hives)"
              :key="i"
              sm="auto"
              :class="
                `hive-item ${listView ? 'list-view' : ''} ${
                  apiaryView ? 'apiary-view' : ''
                }`
              "
            >
              <HiveCard
                :key="`${hive.id}`"
                :hive="hive"
                :hive-set="hiveSet"
                :list-view="listView"
                :grid-view="gridView"
                :apiary-view="apiaryView"
                @confirm-delete-hive="confirmDeleteHive($event)"
              ></HiveCard>
            </v-col>
          </ScaleTransition>
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
    </div>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import HiveCard from '@components/hive-card.vue'
import Layout from '@layouts/main.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
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
    listView: true,
    gridView: false,
    apiaryView: false,
    settings: [],
    showApiaryPlaceholder: false,
    ready: false,
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
              key !== ('description' || 'hex_color')
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
                  } else if (key === 'id') {
                    return value.toString().includes(this.search)
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
                (hive) =>
                  hive.attention === 1 ||
                  hive.reminder !== null ||
                  hive.reminder_date !== null
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
        { title: this.$i18n.t('new_group'), route: 'group-create' },
      ]
    },
  },
  mounted() {
    if (localStorage.listView) {
      this.listView = localStorage.listView === 'true'
      if (this.listView) {
        this.$store.commit('locations/setApiaryListView', 'listView')
      }
    }
    if (localStorage.gridView) {
      this.gridView = localStorage.gridView === 'true'
      if (this.gridView) {
        this.$store.commit('locations/setApiaryListView', 'gridView')
      }
    }
    if (localStorage.apiaryView) {
      this.apiaryView = localStorage.apiaryView === 'true'
      if (this.apiaryView) {
        this.$store.commit('locations/setApiaryListView', 'apiaryView')
      }
    }
  },
  created() {
    this.search = this.$route.query.search || null
    this.readApiariesAndGroups().then(() => {
      this.ready = true
    })
  },
  methods: {
    async deleteApiaryById(id) {
      try {
        const response = await this.$store.dispatch(
          'locations/deleteApiary',
          id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.$router.push({
            name: 'home',
          })
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async deleteGroupById(id) {
      console.log('delete Group By Id')
      console.log(id)
      // TODO: fix
    },
    async detachGroupById(id) {
      console.log('detach Group By Id')
      console.log(id)
      // TODO: fix
    },
    async deleteHiveById(id) {
      try {
        const response = await Api.deleteRequest('/hives/', id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          this.readApiariesAndGroups()
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await this.$store.dispatch('locations/findAll')
        const responseGroups = await this.$store.dispatch('groups/findAll')
        if (
          responseApiaries.locations.length === 0 &&
          responseGroups.groups.length === 0
        ) {
          this.showApiaryPlaceholder = true
        }
        return true
      } catch (e) {
        console.log(e)
      }
    },
    confirmDeleteApiary(hiveSet) {
      const warningMessage =
        hiveSet.hives.length > 0 ? this.$i18n.t('first_remove_hives') : null
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_apiary'),
          this.$i18n.t('remove_apiary') + ' "' + hiveSet.name + '"?',
          {
            color: 'red',
          },
          warningMessage
        )
        .then((confirm) => {
          this.deleteApiaryById(hiveSet.id)
        })
        .catch((reject) => {
          return true
        })
    },
    confirmDeleteGroup(hiveSet) {
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete') + ' ' + this.$i18n.tc('group', 1),
          this.$i18n.t('Remove_group') + '?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteGroupById(hiveSet.id)
        })
        .catch((reject) => {
          return true
        })
    },
    confirmDetachGroup(hiveSet) {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('Detach_from_group') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.detachGroupById(hiveSet.id)
        })
        .catch((reject) => {
          return true
        })
    },
    confirmDeleteHive(hive) {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_hive'),
          this.$i18n.t('remove_hive') + ' "' + hive.name + '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteHiveById(hive.id)
        })
        .catch((reject) => {
          return true
        })
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
      const sortedHives = hives.slice().sort(function(a, b) {
        if (a.order > b.order) {
          return 1
        }
        if (b.order > a.order) {
          return -1
        }
        if (a.order === b.order) {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        }
      })
      return sortedHives
    },
    toggleGrid(view) {
      if (view === 'listView') {
        localStorage.listView = 'true'
        this.listView = true
        localStorage.gridView = 'false'
        this.gridView = false
        localStorage.apiaryView = 'false'
        this.apiaryView = false
      } else if (view === 'gridView') {
        localStorage.gridView = 'true'
        this.gridView = true
        localStorage.listView = 'false'
        this.listView = false
        localStorage.apiaryView = 'false'
        this.apiaryView = false
      } else if (view === 'apiaryView') {
        localStorage.apiaryView = 'true'
        this.apiaryView = true
        localStorage.listView = 'false'
        this.listView = false
        localStorage.gridView = 'false'
        this.gridView = false
      }
      this.$store.commit('locations/setApiaryListView', view)
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
.apiary-placeholder {
  height: calc(100vh - 104px);

  .apiary-placeholder-item {
    width: 60%;
    max-width: 250px;
    font-weight: 600;
    text-align: center;
  }
}

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
    .view-buttons {
      padding: 9px;
    }
  }
}

.hive-set {
  margin-bottom: 24px;
  @include for-phone-only {
    margin-bottom: 18px;
  }
  &:first-child {
    margin-top: 70px;
    @include for-phone-only {
      margin-top: 48px;
    }
  }
  &:last-child {
    margin-bottom: 10px;
  }
  .hive-set-title {
    width: 100%;
    padding-bottom: 4px;
    margin: 10px 0 16px;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
    @include for-phone-only {
      padding-bottom: 2px;
      margin: 8px 0 10px;
    }
    .hive-set-caption {
      font-weight: 600;
    }
  }
  .hive-item-transition-wrapper {
    display: flex;
    flex-wrap: wrap;
    @include for-phone-only {
      min-width: 100%;
    }
  }
  .hive-item {
    flex-grow: 0 !important;
    padding: 4px;
    &.apiary-view {
      padding: 0 !important;
    }
    &.list-view {
      @include xs-only {
        flex-grow: 1 !important;
        min-width: 100%;
      }
    }
  }
}
</style>
