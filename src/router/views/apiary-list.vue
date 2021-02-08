<template>
  <Layout :menu-items="menuItems">
    <div v-if="!showApiaryPlaceholder && ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons d-flex flex-row justify-flex-start align-center"
          >
            <v-col cols="4" sm="5" :class="mobile ? 'pr-0' : 'pr-1'">
              <v-text-field
                v-model="hiveSearch"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    hiveSearch !== null
                      ? 'v-input--is-focused primary--text'
                      : ''
                  } filter-text-field`
                "
                :height="mobile ? '30px' : '36px'"
                :autofocus="hiveSearch !== null"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-card-actions>
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
              <div class="my-0" @click="filterByBase = !filterByBase">
                <v-sheet
                  class="beep-icon beep-icon-sensors cursor-pointer"
                  :color="`${filterByBase ? 'green' : ''}`"
                >
                </v-sheet>
              </div>
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
              v-if="!mobile"
              :class="`${gridView ? 'color-primary' : ''} mr-2`"
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

    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

    <v-container v-if="ready">
      <v-row
        v-for="invitation in invitations"
        :key="'Invitation ' + invitation.id"
        :class="
          `hive-set ${apiaryView ? 'apiary-view' : ''} ${
            showApiaryPlaceholder ? 'mt-2' : ''
          }`
        "
        dense
      >
        <div
          class="hive-set-title mt-0 d-flex flex-row justify-space-between align-end"
        >
          <div
            class="d-flex flex-row justify-flex-start align-center"
            :style="
              `color: ${
                invitation.color ? invitation.color : ''
              }; border-color: ${invitation.color ? invitation.color : ''};`
            "
          >
            <v-icon
              class="icon-apiary-shared ml-1 mr-2 my-0"
              :style="
                `background-color: ${
                  invitation.color ? invitation.color : ''
                }; border-color: ${invitation.color ? invitation.color : ''};`
              "
            >
              mdi-account-multiple
            </v-icon>
            <h4 v-text="$tc('Invitation', 1) + ': ' + invitation.name"></h4>
          </div>
          <div>
            <v-btn
              v-if="!mobile"
              tile
              outlined
              class="green--text mb-1"
              @click="
                checkToken(invitation.token, invitation.id, invitation.name)
              "
            >
              <v-progress-circular
                v-if="showLoadingIconForId === invitation.id"
                class="green--text ml-n1 mr-2"
                size="18"
                width="2"
                indeterminate
              />
              <v-icon v-if="showLoadingIconForId !== invitation.id" left
                >mdi-check</v-icon
              >
              {{ $t('Accept') }}
            </v-btn>
            <v-progress-circular
              v-if="showLoadingIconForId === invitation.id && mobile"
              class="invitation-loading-icon green--text mb-1"
              size="18"
              width="2"
              indeterminate
            />
            <v-icon
              v-if="showLoadingIconForId !== invitation.id && mobile"
              dark
              class="green--text mb-1"
              @click="
                checkToken(invitation.token, invitation.id, invitation.name)
              "
            >
              mdi-check</v-icon
            >
          </div>
        </div>
        <div
          class="rounded-border invitation-wrapper ma-1"
          :style="
            `border-color: ${invitation.color ? invitation.color : '#F8B133'};`
          "
        >
          <v-simple-table dense>
            <template v-slot>
              <thead>
                <tr>
                  <th class="text-left invitation-description">
                    {{ $t('Description') }}
                  </th>
                  <th class="text-left">
                    {{ $t('Date') }}
                  </th>
                  <th class="text-left">
                    {{ $tc('Member', 2) }}
                  </th>
                  <th class="text-left">
                    {{ $tc('Hive', 2) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>{{ invitation.description }}</span>
                  </td>
                  <td>
                    <span>{{
                      tabletLandscapeUp
                        ? momentify(invitation.invited)
                        : momentifyDayMonth(invitation.invited)
                    }}</span>
                  </td>
                  <td>
                    <span>{{ invitation.usercount }}</span>
                  </td>
                  <td>
                    <span>{{ invitation.hivecount }}</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-row>

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
                >mdi-comment-question-outline</v-icon
              >{{ $t('need_help') }}</div
            >
          </router-link>
        </v-container>
      </div>

      <v-row
        v-for="hiveSet in filteredHiveSets"
        :key="'hiveSet ' + hiveSet.name + ' ' + hiveSet.id"
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
                    <v-icon>mdi-home-edit</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t('edit') + ' ' + $tc('location', 1)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="{
                    name: 'inspect',
                    query: { apiaryId: hiveSet.id },
                  }"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>mdi-file-document-edit-outline</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t('New') + ' ' + $tc('inspection', 1)"
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
                    <v-icon>mdi-account-multiple-plus</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t('edit') + ' ' + $tc('group', 1)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

              <v-list-item
                v-if="hiveSet.hasEditableHive"
                :to="{
                  name: 'inspect',
                  query: { groupId: hiveSet.id },
                }"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="$t('New') + ' ' + $tc('inspection', 1)"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

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
                      $t('remove_group_short')
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
            v-for="hive in sortedHives(hiveSet.hives)"
            :key="'Hive ' + hive.id"
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
        dense
        class="hive-set"
      >
        <v-col sm="auto" :cols="12">
          {{ $t('no_results') }}
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

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
    snackbar: {
      show: false,
      timeout: 2000,
      text: 'notification',
    },
    filterByAttention: false,
    filterByBase: false,
    filterByImpression: [],
    filterByReminder: false,
    listView: true,
    gridView: false,
    apiaryView: false,
    settings: [],
    showLoadingIconForId: null,
    showApiaryPlaceholder: false,
    ready: false,
    allLastSensorValues: {},
    deviceIdArray: [],
  }),
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups', 'invitations']),
    hiveSearch: {
      get() {
        return this.$store.getters['locations/hiveSearch']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveSearch',
          value,
        })
      },
    },
    filteredHiveSets() {
      var textFilteredHiveSets = []
      if (this.hiveSearch === null) {
        textFilteredHiveSets = this.sortedHiveSets
      } else {
        textFilteredHiveSets = this.sortedHiveSets.map((hiveSet) => {
          const hiveSetMatch = Object.entries(hiveSet).some(([key, value]) => {
            if (
              value !== null &&
              typeof value === 'string' &&
              key !== ('description' || 'hex_color')
            ) {
              return value.toLowerCase().includes(this.hiveSearch.toLowerCase())
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
                      .includes(this.hiveSearch.toLowerCase())
                  } else if (key === 'id') {
                    return value.toString().includes(this.hiveSearch)
                  } else if (key === 'queen' && value !== null) {
                    return Object.entries(value).some(([key, value]) => {
                      if (
                        value !== null &&
                        typeof value === 'string' &&
                        key !== ('color' || 'created_at')
                      ) {
                        return value
                          .toLowerCase()
                          .includes(this.hiveSearch.toLowerCase())
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
          if (this.filterByAttention) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter((hive) => hive.attention === 1),
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
        .map((hiveSet) => {
          if (this.filterByReminder) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter(
                (hive) => hive.reminder !== null || hive.reminder_date !== null
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

      if (
        this.hiveSearch !== null ||
        this.filterByAttention ||
        this.filterByBase ||
        this.filterByImpression.length > 0 ||
        this.filterByReminder
      ) {
        propertyFilteredHiveSets = propertyFilteredHiveSets.filter(
          (x) => x.hives.length > 0 // exclude hiveSets without search results (but include empty hiveSets in overall overview for housekeeping purposes)
        )
      }

      return propertyFilteredHiveSets
    },
    hiveSets() {
      var groupsWithEditableHivesProp = this.groups
      groupsWithEditableHivesProp.map((group) => {
        var hasEditableHive =
          group.hives.filter((hive) => {
            return hive.editable
          }).length > 0
        hasEditableHive
          ? (group.hasEditableHive = true)
          : (group.hasEditableHive = false)
      })
      return this.apiaries.concat(groupsWithEditableHivesProp)
    },
    menuItems: function() {
      return [
        { title: this.$i18n.t('new_apiary'), route: 'apiary-create' },
        { title: this.$i18n.t('new_group'), route: 'group-create' },
      ]
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
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
    tabletLandscapeUp() {
      return this.$vuetify.breakpoint.mdAndUp
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
    if (
      this.$route.query.search !== null &&
      this.$route.query.search !== undefined
    ) {
      this.hiveSearch = this.$route.query.search
    }
    if (this.apiaries.length === 0 && this.groups.length === 0) {
      // in case user is freshly logged in or in case of hard refresh
      this.readApiariesAndGroups().then(() => {
        this.ready = true
      })
    } else {
      this.ready = true
    }
    // this.getDeviceIds().then(() => {
    //   this.getAllLastSensorValues()
    // })
  },
  methods: {
    async checkToken(token, groupId, groupName) {
      this.showLoadingIconForId = groupId
      try {
        const response = await Api.postRequest('/groups/checktoken', {
          group_id: groupId,
          token: token,
        })
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        this.snackbar.text = this.$i18n.t('Invitation_accepted')
        this.snackbar.show = true
        setTimeout(() => {
          this.readApiariesAndGroups().then(() => {
            this.hiveSearch = groupName
            this.showLoadingIconForId = null
          })
        }, 300) // wait for API to update groups
      } catch (error) {
        this.handleError(error)
      }
    },
    async deleteApiaryById(id) {
      try {
        const response = await Api.deleteRequest('/locations/', id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          this.readApiariesAndGroups()
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        this.handleError(error)
      }
    },
    async deleteGroupById(id) {
      try {
        const response = await Api.deleteRequest('/groups/', id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          this.readApiariesAndGroups()
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        this.handleError(error)
      }
    },
    async detachGroupById(id) {
      try {
        const response = await Api.deleteRequest('/groups/detach/', id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          this.readApiariesAndGroups()
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        this.handleError(error)
      }
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
        this.handleError(error)
      }
    },
    // async getDeviceIds() {
    //   try {
    //     const response = await Api.readRequest('/devices')
    //     const devices = response.data
    //     // var deviceIdArray = []
    //     var allLastSensorValues = {}
    //     devices.map((device) => {
    //       allLastSensorValues[device.id] = {}
    //       // deviceIdArray.push(device.id)
    //     })
    //     this.allLastSensorValues = allLastSensorValues
    //     this.deviceIdArray = Object.keys(allLastSensorValues)
    //     return true
    //   } catch (error) {
    //     if (error.response) {
    // console.log(error.response)
    //     } else {
    //       console.log('Error: ', error)
    //     }
    //   }
    // },
    // async loadLastSensorValues(id) {
    //   try {
    //     const response = await Api.readRequest('/sensors/lastvalues?id=' + id)
    //     return response.data
    //   } catch (error) {
    //     if (error.response) {
    // console.log(error.response)
    //     } else {
    //       console.log('Error: ', error)
    //     }
    //   }
    // },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        if (
          responseApiaries.data.locations.length === 0 &&
          responseGroups.data.groups.length === 0
        ) {
          this.showApiaryPlaceholder = true
        } else {
          this.showApiaryPlaceholder = false
        }
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
        this.$store.commit(
          'groups/setInvitations',
          responseGroups.data.invitations
        )
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
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
    getAllLastSensorValues() {
      this.deviceIdArray.map((deviceId) =>
        this.loadLastSensorValues(deviceId).then((response) => {
          this.allLastSensorValues[deviceId] = response
        })
      )
    },
    handleError(error) {
      if (error.response) {
        console.log('Error: ', error.response)
        const msg = error.response.data.message
        this.snackbar.text = msg
      } else {
        console.log('Error: ', error)
        this.snackbar.text = this.$i18n.t('something_wrong')
      }
      this.snackbar.show = true
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

.hive-set {
  margin-bottom: 24px;
  @include for-phone-only {
    margin-bottom: 18px;
  }
  &:first-child {
    margin-top: 70px;
    @include for-phone-only {
      margin-top: 56px;
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

.invitation-loading-icon {
  margin-top: 6px;
}

.invitation-wrapper {
  width: 100%;
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    @include for-phone-only {
      padding: 0 8px !important;
    }
  }
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    @include for-phone-only {
      padding: 4px 8px !important;
      font-size: 0.8125rem !important;
    }
  }
  .invitation-description {
    width: 25vw;
    @include for-tablet-landscape-up {
      width: 40vw;
    }
  }
}
</style>
