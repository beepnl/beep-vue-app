<template>
  <Layout>
    <div v-if="!showApiaryPlaceholder && ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons filter-buttons--has-max d-flex flex-row justify-flex-start align-center"
          >
            <v-col class="pa-3">
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
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
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
                  `${
                    filterByAttention ? 'red--text' : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByAttention = !filterByAttention"
              >
                mdi-clipboard-alert-outline
              </v-icon>
              <v-icon
                :class="
                  `${filterByReminder ? 'red--text' : 'color-grey-filter'} mr-2`
                "
                @click="filterByReminder = !filterByReminder"
              >
                mdi-calendar-clock
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(3)
                      ? 'green--text'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByImpression = 3"
              >
                mdi-emoticon-happy
              </v-icon>
              <v-icon
                v-if="!tinyScreen"
                :class="
                  `${
                    filterByImpression.includes(2)
                      ? 'orange--text'
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
                      ? 'red--text'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="filterByImpression = 1"
              >
                mdi-emoticon-sad
              </v-icon>
              <div
                v-if="devices.length > 0 && screenSize > 390"
                class="my-0 mr-2"
                @click="filterByBase = !filterByBase"
              >
                <v-sheet
                  class="beep-icon beep-icon-filter beep-icon-sensors cursor-pointer"
                  :color="`${filterByBase ? 'green' : ''}`"
                >
                </v-sheet>
              </div>
              <v-icon
                v-if="devices.length > 0 && screenSize > 418"
                :class="`${filterByAlert ? 'red--text' : 'color-grey-filter'}`"
                @click="filterByAlert = !filterByAlert"
              >
                mdi-bell
              </v-icon>
            </v-card-actions>
          </div>
          <v-card-actions class="view-buttons mr-0">
            <v-icon
              :class="`${xsView ? 'color-accent' : ''} mr-sm-1`"
              @click="toggleGrid('xsView')"
            >
              mdi-size-xs
            </v-icon>
            <v-icon
              v-if="!mobile"
              :class="`${mView ? 'color-accent' : ''} mr-1`"
              @click="toggleGrid('mView')"
            >
              mdi-size-m
            </v-icon>
            <v-icon
              :class="`${xlView ? 'color-accent' : ''}`"
              @click="toggleGrid('xlView')"
            >
              mdi-size-xl
            </v-icon>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="!ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <v-container v-if="ready">
      <v-row
        v-for="invitation in invitations"
        :key="'Invitation ' + invitation.id"
        :class="
          `hive-set ${xsView ? 'xs-view' : ''} ${
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
              class="mb-1 mr-2"
              color="red"
              :disabled="invitationButtonsDisabled(invitation.id)"
              @click="confirmDeclineInvitation(invitation)"
            >
              <v-progress-circular
                v-if="showLoadingIcon(invitation.id, true)"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="disabled"
                indeterminate
              />
              <v-icon v-if="!showLoadingIcon(invitation.id, true)" left
                >mdi-close</v-icon
              >
              {{ $t('Decline') }}
            </v-btn>
            <v-progress-circular
              v-if="showLoadingIcon(invitation.id, true) && mobile"
              class="invitation-loading-icon mb-1 mr-2"
              size="18"
              width="2"
              color="disabled"
              indeterminate
            />
            <v-icon
              v-if="!showLoadingIcon(invitation.id, true) && mobile"
              dark
              :disabled="invitationButtonsDisabled(invitation.id)"
              class="mb-1 mr-2"
              color="red"
              @click="confirmDeclineInvitation(invitation)"
            >
              mdi-close</v-icon
            >
            <v-btn
              v-if="!mobile"
              tile
              outlined
              class="green--text mb-1"
              :disabled="invitationButtonsDisabled(invitation.id)"
              @click="
                checkToken(invitation.token, invitation.id, invitation.name)
              "
            >
              <v-progress-circular
                v-if="showLoadingIcon(invitation.id, false)"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="disabled"
                indeterminate
              />
              <v-icon v-if="!showLoadingIcon(invitation.id, false)" left
                >mdi-check</v-icon
              >
              {{ $t('Accept') }}
            </v-btn>
            <v-progress-circular
              v-if="showLoadingIcon(invitation.id, false) && mobile"
              class="invitation-loading-icon mb-1"
              size="18"
              width="2"
              color="disabled"
              indeterminate
            />
            <v-icon
              v-if="!showLoadingIcon(invitation.id, false) && mobile"
              dark
              :disabled="invitationButtonsDisabled(invitation.id)"
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
                        ? momentify(invitation.invited, true)
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

      <v-row
        v-for="hiveSet in filteredHiveSets"
        :key="'hiveSet ' + hiveSet.name + ' ' + hiveSet.id"
        :class="`hive-set ${xsView ? 'xs-view' : ''}`"
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
          <div
            class="d-flex justify-space-between align-end"
            style="width: 100%;"
          >
            <div class="d-flex justify-start align-center">
              <div
                :class="
                  'd-flex ' + (mobile ? 'flex-column' : 'flex-row align-center')
                "
              >
                <div class="d-flex justify-start align-center">
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
                      }; border-color: ${
                        hiveSet.hex_color ? hiveSet.hex_color : ''
                      };`
                    "
                  >
                    mdi-home-analytics
                  </v-icon>

                  <h4 v-text="hiveSet.name"></h4>
                </div>
                <pre
                  v-if="xlView && hiveSet.users && hiveSet.users.length"
                  :class="'caption hive-set-caption' + (mobile ? ' ml-7' : '')"
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
                          v-text="$t('edit_apiary')"
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
                          v-text="$t('New_inspection')"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      @click="setDiaryGroupFilterAndGo(hiveSet.name)"
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon>mdi-magnify</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="$tc('View_inspection', 2)"
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
                        <v-icon>mdi-archive</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="$t('New_hive')"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      :to="{
                        name: 'apiary-management',
                        params: { id: hiveSet.id },
                      }"
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon>mdi-home-export-outline</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="$t('Move') + ' ' + $tc('hive', 2)"
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
                          v-text="$t('edit_group')"
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
                        v-text="$t('New_inspection')"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item @click="setDiaryGroupFilterAndGo(hiveSet.name)">
                    <v-list-item-icon class="mr-3">
                      <v-icon>mdi-magnify</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$tc('View_inspection', 2)"
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

            <span class="text-right ml-2">
              <v-icon
                :style="
                  `color: ${hiveSet.hex_color ? hiveSet.hex_color : '#f29100'};`
                "
                :class="hideHiveSet(hiveSet) ? 'mdi-plus' : 'mdi-minus'"
                @click="toggleHiveSet(hiveSet)"
                >mdi-minus</v-icon
              >
            </span>
          </div>
        </div>
        <SlideYUpTransition :duration="300">
          <div
            v-if="!hideHiveSet(hiveSet)"
            :key="'HiveSet' + hiveSet.id"
            style="width: 100%;"
          >
            <ScaleTransition
              :duration="300"
              group
              class="hive-item-transition-wrapper"
            >
              <template v-for="hive in sortedHives(hiveSet.hives)">
                <v-col
                  :key="'Hive ' + hive.id"
                  sm="auto"
                  :class="
                    `hive-item ${xlView ? 'xl-view' : ''} ${
                      xsView ? 'xs-view' : ''
                    }`
                  "
                >
                  <HiveCard
                    :key="`${hive.id}`"
                    :hive="hive"
                    :hive-set="hiveSet"
                    :alerts="alertsPerHive(hive.id)"
                    :xl-view="xlView"
                    :m-view="mView"
                    :xs-view="xsView"
                    @confirm-delete-hive="confirmDeleteHive($event)"
                  ></HiveCard>
                </v-col>
              </template>
            </ScaleTransition>
          </div>
        </SlideYUpTransition>
      </v-row>

      <div
        v-if="showApiaryPlaceholder"
        :class="
          `apiary-placeholder d-flex align-center ${
            invitations.length > 0 ? 'apiary-placeholder--with-invitations' : ''
          }`
        "
      >
        <v-container class="d-flex flex-column align-center">
          <v-img
            class="apiary-placeholder-item apiary-placeholder-image"
            height="auto"
            :src="assetsUrl + '/img/apiary-illustration.png'"
          >
          </v-img>
          <h4 class="mt-5 mb-8">{{ $t('no_apiaries_yet') }}</h4>

          <router-link
            class="apiary-placeholder-item mt-10"
            :to="{
              name: `apiary-create`,
            }"
          >
            <div class="color-accent"
              ><v-icon color="accent" large left>mdi-plus-circle</v-icon
              >{{ $t('Add_apiary') }}</div
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
        v-else-if="sortedHiveSets.length && !filteredHiveSets.length"
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
      <v-btn color="accent" text @click="snackbar.show = false">
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
import {
  momentFromNow,
  momentify,
  momentifyDayMonth,
} from '@mixins/momentMixin'
import {
  checkAlerts,
  readApiariesAndGroups,
  readDevices,
  readGeneralInspections,
  readHiveTags,
  toggleFilterByGroup,
} from '@mixins/methodsMixin'
import { ScaleTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
    HiveCard,
    Layout,
    ScaleTransition,
    SlideYUpTransition,
  },
  mixins: [
    checkAlerts,
    momentFromNow,
    momentify,
    momentifyDayMonth,
    readApiariesAndGroups,
    readDevices,
    readGeneralInspections,
    readHiveTags,
    toggleFilterByGroup,
  ],
  data: () => ({
    snackbar: {
      show: false,
      timeout: 2000,
      text: 'notification',
    },
    xlView: true,
    mView: false,
    xsView: false,
    settings: [],
    showAcceptLoadingIconById: [],
    showDeclineLoadingIconById: [],
    ready: false,
    deviceIdArray: [],
    assetsUrl:
      process.env.VUE_APP_ASSETS_URL || process.env.VUE_APP_ASSETS_URL_FALLBACK,
    alertTimer: 0,
    alertInterval: 120000,
    deviceTimer: 0,
    deviceInterval: 600000,
    hiddenApiaries: [],
    hiddenGroups: [],
  }),
  computed: {
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups', 'invitations']),
    ...mapGetters('hives', ['hiveTags']),
    filterByAlert: {
      get() {
        return this.$store.getters['locations/hiveFilterByAlert']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveFilterByAlert',
          value,
        })
      },
    },
    filterByAttention: {
      get() {
        return this.$store.getters['locations/hiveFilterByAttention']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveFilterByAttention',
          value,
        })
      },
    },
    filterByBase: {
      get() {
        return this.$store.getters['locations/hiveFilterByBase']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveFilterByBase',
          value,
        })
      },
    },
    filterByGroupStatus: {
      get() {
        return this.$store.getters['locations/hiveFilterByGroup']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveFilterByGroup',
          value,
        })
      },
    },
    filterByImpression: {
      get() {
        return this.$store.getters['locations/hiveFilterByImpression']
      },
      set(value) {
        this.$store.commit('locations/setFilterByImpression', value)
      },
    },
    filterByReminder: {
      get() {
        return this.$store.getters['locations/hiveFilterByReminder']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'hiveFilterByReminder',
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
              key !==
                ('description' ||
                  'hex_color' ||
                  'type' ||
                  'created_at' ||
                  'last_weather_time') &&
              this.hiveSearch.substring(0, 3) !== 'id='
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
                  if (
                    value !== null &&
                    typeof value === 'string' &&
                    key !==
                      ('color' ||
                        'last_inspection_date' ||
                        'created_at' ||
                        'reminder_date' ||
                        'last_inspection_date_locale_date')
                  ) {
                    return value
                      .toLowerCase()
                      .includes(this.hiveSearch.toLowerCase())
                  } else if (
                    key === 'id' &&
                    this.hiveSearch.substring(0, 3) === 'id='
                  ) {
                    return (
                      value.toString() ===
                      this.hiveSearch.substring(3, this.hiveSearch.length)
                    )
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
          if (this.filterByAlert) {
            return {
              ...hiveSet,
              hives: hiveSet.hives.filter(
                (hive) => this.alertsPerHive(hive.id).length > 0
              ),
            }
          } else {
            return hiveSet
          }
        })
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
        .filter((hiveSet) => {
          if (this.filterByGroupStatus === 'group') {
            if (hiveSet.users !== undefined) {
              return { ...hiveSet }
            }
          } else if (this.filterByGroupStatus === 'owned') {
            if (hiveSet.users === undefined) {
              return { ...hiveSet }
            }
          } else {
            return { ...hiveSet }
          }
        })

      if (
        (this.hiveSearch !== null && this.hiveSearch !== '') ||
        this.filterByAlert ||
        this.filterByAttention ||
        this.filterByBase ||
        // this.filterByGroup ||
        this.filterByImpression.length > 0 ||
        this.filterByReminder
      ) {
        propertyFilteredHiveSets = propertyFilteredHiveSets.filter(
          (x) => x.hives.length > 0 // exclude hiveSets without search results (but include empty hiveSets in apiary overview & groups overview (filterByGroup) for housekeeping purposes)
        )
      }

      return propertyFilteredHiveSets
    },
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
    hiveSets() {
      var apiariesWithDates = this.apiaries

      apiariesWithDates.map((apiary) => {
        apiary.hives.map((hive) => {
          this.addDates(hive)
        })
      })
      var groupsWithDatesAndEditableHivesProp = this.groups
      groupsWithDatesAndEditableHivesProp.map((group) => {
        group.hives.map((hive) => {
          this.addDates(hive)
        })
        var hasEditableHive =
          group.hives.filter((hive) => {
            return hive.editable || hive.owner
          }).length > 0
        hasEditableHive
          ? (group.hasEditableHive = true)
          : (group.hasEditableHive = false)
      })
      return apiariesWithDates.concat(groupsWithDatesAndEditableHivesProp)
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    screenSize() {
      return this.$vuetify.breakpoint.width
    },
    showApiaryPlaceholder() {
      return this.apiaries.length === 0 && this.groups.length === 0
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
    tinyScreen() {
      return this.$vuetify.breakpoint.width < 373
    },
    today() {
      return new Date()
    },
  },
  mounted() {
    if (localStorage.xlView) {
      this.xlView = localStorage.xlView === 'true'
      if (this.xlView) {
        this.$store.commit('locations/setHiveView', 'xlView')
      }
    }
    if (localStorage.mView) {
      this.mView = localStorage.mView === 'true'
      if (this.mView) {
        this.$store.commit('locations/setHiveView', 'mView')
      }
    }
    if (localStorage.xsView) {
      this.xsView = localStorage.xsView === 'true'
      if (this.xsView) {
        this.$store.commit('locations/setHiveView', 'xsView')
      }
    }
  },
  created() {
    if (this.$route.query.hive_index !== undefined) {
      this.readHiveTagsIfNotChecked().then((hivetags) => {
        this.hiveTagRedirect(hivetags)
      })
    }
    if (localStorage.beepHiddenApiaries) {
      this.hiddenApiaries = JSON.parse(localStorage.beepHiddenApiaries)
    }
    if (localStorage.beepHiddenGroups) {
      this.hiddenGroups = JSON.parse(localStorage.beepHiddenGroups)
    }
    // set query search term as hiveSearch only if no stored hiveSearch is present
    if (
      this.hiveSearch === null &&
      this.$route.query.search !== null &&
      this.$route.query.search !== undefined
    ) {
      this.hiveSearch = this.$route.query.search
    }
    this.readDevices().then(() => {
      this.deviceTimer = setInterval(this.readDevices, this.deviceInterval)
    })
    this.checkAlertRulesAndAlerts().then(() => {
      if (this.apiaries.length === 0 && this.groups.length === 0) {
        // in case user is freshly logged in or in case of hard refresh
        this.readApiariesAndGroups().then(() => {
          this.ready = true
        })
      } else {
        this.ready = true
      }
      this.alertTimer = setInterval(this.readAlerts, this.alertInterval)
    })
  },
  beforeDestroy() {
    this.stopTimers()
  },
  methods: {
    async checkToken(token, groupId, groupName, decline = false) {
      if (decline) {
        this.showDeclineLoadingIconById.push(groupId)
      } else {
        this.showAcceptLoadingIconById.push(groupId)
      }
      try {
        const response = await Api.postRequest('/groups/checktoken', {
          group_id: groupId,
          token: token,
          decline,
        })
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
          this.stopLoadingIcon(groupId, decline)
        }
        this.snackbar.text = this.$i18n.t(response.data.message)
        this.snackbar.show = true
        setTimeout(() => {
          this.readDevices().then(() => {
            this.readApiariesAndGroups().then(() => {
              this.stopLoadingIcon(groupId, decline)
              if (!decline) {
                this.hiveSearch = groupName
              }
            })
          })
        }, 300) // wait for API to update groups
      } catch (error) {
        this.stopLoadingIcon(groupId, decline)
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
          this.readGeneralInspections()
          this.readDevices()
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
          this.readGeneralInspections()
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
          this.readGeneralInspections()
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
          this.readGeneralInspections()
          this.readDevices()
          this.checkAlertRules() // update alert rules if present (or not checked yet)
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        this.handleError(error)
      }
    },
    addDates(hive) {
      // add converted dates as hive props to make them searchable by all visible properties
      if (hive.last_inspection_date !== null) {
        hive.last_inspection_date_moment_from_now = this.momentFromNow(
          hive.last_inspection_date
        )
        hive.last_inspection_date_locale_date = this.momentify(
          hive.last_inspection_date
        )
      } else {
        hive.last_inspection_date_moment_from_now = null
        hive.last_inspection_date_locale_date = null
      }
      if (hive.reminder_date !== null) {
        hive.reminder_date_day_month = this.momentifyDayMonth(
          hive.reminder_date
        )
        hive.reminder_date_locale_date = this.momentify(hive.reminder_date)
      } else {
        hive.reminder_date_day_month = null
        hive.reminder_date_locale_date = null
      }
      var device =
        hive.sensors.length !== 0 ? this.findDeviceById(hive.sensors[0]) : null
      if (device !== null) {
        var isToday = this.$moment
          .utc(device.last_message_received)
          .isSame(this.today, 'day')
      }
      hive.last_message_received_legible_date =
        device === null
          ? null
          : isToday
          ? this.momentFromNow(device.last_message_received, true)
          : this.momentify(device.last_message_received, true)
    },
    alertsPerHive(hiveId) {
      return this.alerts.filter((alert) => alert.hive_id === hiveId)
    },
    confirmDeclineInvitation(invitation) {
      this.$refs.confirm
        .open(
          this.$i18n.t('Decline_invitation'),
          this.$i18n.t('Decline_invitation_sure'),
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.checkToken(
            invitation.token,
            invitation.id,
            invitation.name,
            true
          )
        })
        .catch((reject) => {
          return true
        })
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
    invitationButtonsDisabled(invitationId) {
      return (
        this.showDeclineLoadingIconById
          .concat(this.showAcceptLoadingIconById)
          .indexOf(invitationId) > -1
      )
    },
    findDeviceById(id) {
      return (
        this.devices.filter((device) => {
          return device.id === id
        })[0] || null
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
    hideHiveSet(hiveSet) {
      return !hiveSet.users
        ? this.hiddenApiaries.includes(hiveSet.id)
        : this.hiddenGroups.includes(hiveSet.id)
    },
    hiveTagRedirect(hivetags) {
      var filteredHiveTags = hivetags.filter(
        (hiveTag) => hiveTag.tag === this.$route.query.hive_index
      )
      var hiveTag = filteredHiveTags.length === 0 ? null : filteredHiveTags[0]

      if (hiveTag) {
        this.$router.push(hiveTag.router_link)
      } else {
        this.$router.push({
          name: 'hivetag-create-id',
          params: {
            id: this.$route.query.hive_index,
          },
        })
      }
    },
    setDiaryGroupFilterAndGo(searchTerm) {
      this.$store.commit('inspections/setFilter', {
        filter: 'diaryFilterByGroup',
        value: 'off', // in case it was filtering by owned hives or group hives
      })
      this.$router.push({
        name: 'diary',
        query: { search: searchTerm },
      })
    },
    sortedHives(hives) {
      const sortedHives = hives.slice().sort(function(a, b) {
        // order = null comes last
        // if order is equal, sort by name with number sensitivity (10 comes after 2 instead of 1)
        return (
          (a.order === null) - (b.order === null) ||
          +(a.order > b.order) ||
          -(a.order < b.order) ||
          (a.order === b.order && a.name !== null && b.name !== null
            ? a.name.localeCompare(b.name, undefined, {
                numeric: true,
                sensitivity: 'base',
              })
            : 0)
        )
      })
      return sortedHives
    },
    showLoadingIcon(invitationId, decline) {
      return decline
        ? this.showDeclineLoadingIconById.indexOf(invitationId) > -1
        : this.showAcceptLoadingIconById.indexOf(invitationId) > -1
    },
    stopLoadingIcon(groupId, decline) {
      if (decline) {
        this.showDeclineLoadingIconById.splice(
          this.showDeclineLoadingIconById.indexOf(groupId),
          1
        )
      } else {
        this.showAcceptLoadingIconById.splice(
          this.showAcceptLoadingIconById.indexOf(groupId),
          1
        )
      }
    },
    stopTimers() {
      clearInterval(this.alertTimer)
      this.alertTimer = 0
      clearInterval(this.deviceTimer)
      this.deviceTimer = 0
    },
    toggleGrid(view) {
      if (view === 'xlView') {
        localStorage.xlView = 'true'
        this.xlView = true
        localStorage.mView = 'false'
        this.mView = false
        localStorage.xsView = 'false'
        this.xsView = false
      } else if (view === 'mView') {
        localStorage.mView = 'true'
        this.mView = true
        localStorage.xlView = 'false'
        this.xlView = false
        localStorage.xsView = 'false'
        this.xsView = false
      } else if (view === 'xsView') {
        localStorage.xsView = 'true'
        this.xsView = true
        localStorage.xlView = 'false'
        this.xlView = false
        localStorage.mView = 'false'
        this.mView = false
      }
      this.$store.commit('locations/setHiveView', view)
    },
    toggleHiveSet(hiveSet) {
      var toggleArray = !hiveSet.users ? this.hiddenApiaries : this.hiddenGroups
      if (toggleArray.includes(hiveSet.id)) {
        toggleArray.splice(toggleArray.indexOf(hiveSet.id), 1)
      } else {
        toggleArray.push(hiveSet.id)
      }
      !hiveSet.users
        ? (localStorage.beepHiddenApiaries = JSON.stringify(toggleArray))
        : (localStorage.beepHiddenGroups = JSON.stringify(toggleArray))
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-placeholder {
  margin-top: 120px;
  @include for-phone-only {
    margin-top: 80px;
  }
  &.apiary-placeholder--with-invitations {
    margin-top: 64px;
  }
  .apiary-placeholder-item {
    max-width: 250px;
    font-weight: 600;
    text-align: center;
  }
  .apiary-placeholder-image {
    width: 60%;
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
    &.xs-view {
      padding: 0 !important;
    }
    &.xl-view {
      @include for-phone-only {
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
