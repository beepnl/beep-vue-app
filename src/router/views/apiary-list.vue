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
            <v-col :class="tinyScreen ? 'px-2 py-3' : 'pa-3'">
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
                  } ${tinyScreen ? 'mr-1' : 'mr-2'}`
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
              <v-icon
                :class="
                  `ml-sm-1 ${
                    dragHivesMode ? 'color-accent' : 'color-grey-filter'
                  }`
                "
                @click="dragHivesMode = !dragHivesMode"
              >
                mdi-pencil
              </v-icon>
            </v-card-actions>
          </div>
          <v-card-actions class="view-buttons mr-0">
            <div v-if="!mobile">
              <v-icon
                :class="`${xsView ? 'color-accent' : ''} mr-sm-2`"
                @click="toggleGrid('xsView')"
              >
                mdi-size-xs
              </v-icon>
              <v-icon
                :class="`${mView ? 'color-accent' : ''} mr-2`"
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
            </div>
            <v-icon v-else @click="toggleGrid(xsView ? 'xlView' : 'xsView')">
              {{ xsView ? 'mdi-size-xl' : 'mdi-size-xs' }}
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
            <!-- <v-btn
              v-if="!mobile"
              tile
              outlined
              class="red--text mb-1 mr-2"
              :disabled="showLoadingIconForId === invitation.id"
              @click="
                checkToken(
                  invitation.token,
                  invitation.id,
                  invitation.name,
                  // eslint-disable-next-line vue/comma-dangle
                  true
                )
              "
            >
              <v-progress-circular
                v-if="showLoadingIconForId === invitation.id"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="disabled"
                indeterminate
              />
              <v-icon v-if="showLoadingIconForId !== invitation.id" left
                >mdi-close</v-icon
              >
              {{ $t('Decline') }}
            </v-btn> -->
            <v-btn
              v-if="!mobile"
              tile
              outlined
              class="green--text mb-1"
              :disabled="showLoadingIconForId === invitation.id"
              @click="
                checkToken(invitation.token, invitation.id, invitation.name)
              "
            >
              <v-progress-circular
                v-if="showLoadingIconForId === invitation.id"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="disabled"
                indeterminate
              />
              <v-icon v-if="showLoadingIconForId !== invitation.id" left
                >mdi-check</v-icon
              >
              {{ $t('Accept') }}
            </v-btn>
            <v-progress-circular
              v-if="showLoadingIconForId === invitation.id && mobile"
              class="invitation-loading-icon mb-1"
              size="18"
              width="2"
              color="disabled"
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
              <pre
                v-if="xlView && hiveSet.users && hiveSet.users.length"
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
                          v-text="$t('view') + ' ' + $tc('inspection', 2)"
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
                        v-text="$t('view') + ' ' + $tc('inspection', 2)"
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
          <div v-if="!hideHiveSet(hiveSet)" :key="'HiveSet' + hiveSet.id">
            <ScaleTransition
              v-if="!dragHivesMode"
              :duration="300"
              group
              class="hive-item-transition-wrapper"
            >
              <template v-for="hive in hiveSet.hives">
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
            <draggable
              v-if="dragHivesMode"
              :list="hiveSet.hives"
              :disabled="!dragHivesMode || (hiveSet.users && !hiveSet.admin)"
              group="Test"
              :move="checkMove"
              delay="100"
              delay-on-touch-only="true"
              class="d-flex flex-wrap"
              @change="moved($event, hiveSet)"
            >
              <div
                v-for="hive in hiveSet.hives"
                :key="'Hive ' + hive.id"
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
                ></HiveCard>
              </div>
            </draggable>
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
import draggable from 'vuedraggable'
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
  readApiaries,
  readApiariesAndGroups,
  readDevices,
  readGeneralInspections,
  readGroups,
  toggleFilterByGroup,
} from '@mixins/methodsMixin'
import { ScaleTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    Confirm,
    draggable,
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
    readApiaries,
    readApiariesAndGroups,
    readDevices,
    readGeneralInspections,
    readGroups,
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
    showLoadingIconForId: null,
    ready: false,
    deviceIdArray: [],
    assetsUrl:
      process.env.VUE_APP_ASSETS_URL || process.env.VUE_APP_ASSETS_URL_FALLBACK,
    alertTimer: 0,
    alertInterval: 120000,
    hiddenApiaries: [],
    hiddenGroups: [],
  }),
  computed: {
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups', 'invitations']),
    dragHivesMode: {
      get() {
        return this.$store.getters['locations/dragHivesMode']
      },
      set(value) {
        this.$store.commit('locations/setData', {
          prop: 'dragHivesMode',
          value,
        })
      },
    },
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
    this.stopTimer()
  },
  methods: {
    async checkToken(token, groupId, groupName, decline = false) {
      this.showLoadingIconForId = groupId
      try {
        const response = await Api.postRequest('/groups/checktoken', {
          group_id: groupId,
          token: token,
          // accept: !decline,
        })
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
          this.showLoadingIconForId = null
        }
        this.snackbar.text = this.$i18n.t('Invitation_accepted')
        this.snackbar.show = true
        setTimeout(() => {
          this.readDevices().then(() => {
            this.readGroups().then(() => {
              this.hiveSearch = groupName
              this.showLoadingIconForId = null
            })
          })
        }, 300) // wait for API to update groups
      } catch (error) {
        this.showLoadingIconForId = null
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
          this.readGroups()
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
          this.readGroups()
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
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        this.handleError(error)
      }
    },
    async updateGroup(group) {
      // console.log('update Group', group.name)
      group.hives_editable = group.hives
        .filter((hive) => hive.editable === true)
        .map((hive) => {
          return hive.id
        })
      group.hives_selected = group.hives.map((hive) => {
        return hive.id
      })
      try {
        const response = await Api.updateRequest('/groups/', group.id, group)
        if (!response) {
          this.errorMessage =
            this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
        }
        setTimeout(() => {
          return this.readGroups()
        }, 50) // wait for API to update groups and for user to read success message
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.error
          this.errorMessage = msg
          console.log(error.response)
        } else {
          this.errorMessage = this.$i18n.t('empty_fields')
          console.log('Error: ', error)
        }
      }
    },
    async updateHiveOrder(hive, newOrder) {
      var updatedHive = { ...hive }
      updatedHive.order = newOrder
      updatedHive.frames = updatedHive.layers.length
        ? updatedHive.layers[0].framecount
        : 10
      // console.log('update hive order', updatedHive.id, newOrder)
      try {
        const response = await Api.updateRequest(
          '/hives/',
          updatedHive.id,
          updatedHive
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
        return false
      }
    },
    async updateHivesOrder(hives) {
      try {
        await Promise.all(
          hives.map(async (hive) => {
            // if hive order has changed, update hive
            if (
              hive.updated ||
              (hive.newOrder !== undefined && hive.order !== hive.newOrder)
            ) {
              await this.updateHiveOrder(hive, hive.newOrder)
            }
            // return true
          })
        )
        setTimeout(() => {
          this.readApiaries()
        }, 50) // wait for API to update locations/hives
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
        return false
      }
    },
    addDates(hive) {
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
    },
    alertsPerHive(hiveId) {
      if (this.alerts.filter((alert) => alert.hive_id === hiveId).length > 0) {
        return this.alerts.filter((alert) => alert.hive_id === hiveId)
      } else {
        return []
      }
    },
    checkMove: function(e) {
      // console.log('check move', e.draggedContext.futureIndex)
      // e.draggedContext.element.order = e.draggedContext.futureIndex
    },
    moved: function(e, hiveSet) {
      if (!hiveSet.users) {
        if (e.moved !== undefined) {
          // console.log('moved', e.moved.element.name, 'to', hiveSet.name, 'to index', e.moved.newIndex)
          const newIndex = e.moved.newIndex
          hiveSet.hives.map((hive, index) => {
            if (e.moved.element.id === hive.id) {
              // console.log('new index for', hive.id, hive.name, newIndex)
              hive.newOrder = newIndex
            } else if (
              index < newIndex ||
              (index >= newIndex && hive.order !== null)
            ) {
              hive.newOrder = index
            }
          })
        } else if (e.added !== undefined) {
          // console.log('added',e.added.element.name,'to',hiveSet.name,'to index',e.added.newIndex)
          const newIndex = e.added.newIndex
          hiveSet.hives.map((hive, index) => {
            if (e.added.element.id === hive.id) {
              // console.log('new index & hiveset for', hive.id, hive.name, newIndex)
              hive.location = hiveSet.name
              hive.location_id = hiveSet.id
              hive.newOrder = newIndex
              hive.updated = true
            } else if (
              index < newIndex ||
              (hive.order !== null && hive.order >= newIndex)
            ) {
              hive.newOrder = index
            }
          })
        } else if (e.removed !== undefined) {
          // console.log('removed',e.removed.element.name,'from',hiveSet.name,'from index',e.removed.oldIndex)
          const oldIndex = e.removed.oldIndex
          hiveSet.hives.map((hive, index) => {
            if (hive.order !== null && hive.order >= oldIndex) {
              hive.newOrder = hive.order - 1
            }
          })
        }
        this.updateHivesOrder(hiveSet.hives)
      } else {
        this.updateGroup(hiveSet)
      }
      // console.log(e, hiveSet.id)
      // console.log(e.moved.element.name, e.moved.element.order, e.moved.newIndex)
      // const newIndex = e.moved.newIndex
      // // temp set new order as newOrder prop
      // // this.sortedHives(hiveSet.hives).map((hive, index) => {
      // hiveSet.hives.map((hive, index) => {
      //   if (e.moved.element.id === hive.id) {
      //     console.log('new index for', hive.id, hive.name, newIndex)
      //     hive.newOrder = newIndex
      //   } else if (index < newIndex) {
      //     hive.newOrder = index
      //   } else if (index >= newIndex && hive.order !== null) {
      //     hive.newOrder = index + 1
      //   }
      // })
      // this.updateHivesOrder(hiveSet.hives)
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
        // var aOrder = a.newOrder !== undefined ? a.newOrder : a.order
        // var bOrder = b.newOrder !== undefined ? b.newOrder : b.order
        // return (
        //   (aOrder === null) - (bOrder === null) ||
        //   +(aOrder > bOrder) ||
        //   -(aOrder < bOrder) ||
        //   (aOrder === bOrder && a.name !== null && b.name !== null
        //     ? a.name.localeCompare(b.name, undefined, {
        //         numeric: true,
        //         sensitivity: 'base',
        //       })
        //     : 0)
        // )
      })
      return sortedHives
    },
    stopTimer() {
      clearInterval(this.alertTimer)
      this.alertTimer = 0
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
  .hive-set-title {
    width: 100%;
    padding-bottom: 4px;
    margin: 10px 0 16px;
    color: $color-accent;
    border-bottom: 1px solid $color-accent;
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

// .sortable-drag {
//   position: inherit;
//   background-color: green;
// }

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
