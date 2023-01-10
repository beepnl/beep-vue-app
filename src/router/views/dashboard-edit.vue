<template>
  <Layout :title="getTitle">
    <v-form ref="form" v-model="valid" @submit.prevent="saveDashboard">
      <v-toolbar v-if="dashboard" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-icon
          v-if="dashboard && !createMode"
          dark
          class="mr-4"
          color="red"
          @click="
            confirmDeleteDashboard(
              dashboard,
              // eslint-disable vue/comma-dangle
              dashboard.name
            )
          "
          >mdi-delete</v-icon
        >

        <v-btn
          tile
          outlined
          color="black"
          :class="`mr-1 ${createMode ? 'save-button-mobile-wide' : ''}`"
          type="submit"
          :disabled="!valid || dashboardNotValid || showLoadingIcon"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-toolbar>

      <v-container class="content-container">
        <v-row v-if="errorMessage">
          <v-col cols="12">
            <v-alert text prominent dense type="error" color="red">
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row v-if="dashboard">
          <v-col cols="12" md="6" xl="5">
            <div class="overline mb-3">{{ '1. ' + $tc('Select_hive', 2) }}</div>
            <div v-if="!showApiaryPlaceholder" class="beep-label mb-3">
              <span v-text="$t('Select_hives_for_dashboard_exp')"></span>
              <span
                v-if="showMaxWarning"
                class="red--text"
                v-text="
                  ' ' + $t('Max_hives_warning') + ' (' + maxNrOfHives + ')'
                "
              ></span>
            </div>
            <div class="rounded-border">
              <div
                v-if="showApiaryPlaceholder"
                class="apiary-placeholder d-flex flex-column align-start"
              >
                <div class="beep-label mt-3 mt-sm-1 mb-3 mb-sm-4">{{
                  $t('no_apiaries_yet')
                }}</div>

                <router-link
                  class="apiary-placeholder-item mb-3"
                  :to="{
                    name: `apiary-create`,
                  }"
                >
                  <div class="color-accent"
                    ><v-icon color="accent" left>mdi-plus-circle</v-icon
                    >{{ $t('Add_apiary') }}</div
                  >
                </router-link>
              </div>
              <div v-if="!showApiaryPlaceholder">
                <div v-for="(hiveSet, i) in sortedHiveSets" :key="i">
                  <div
                    class="hive-set-title d-flex flex-row justify-flex-start align-center"
                    :style="
                      `color: ${
                        hiveSet.hex_color ? hiveSet.hex_color : ''
                      }; border-color: ${
                        hiveSet.hex_color ? hiveSet.hex_color : ''
                      };`
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
                        }; border-color: ${
                          hiveSet.hex_color ? hiveSet.hex_color : ''
                        };`
                      "
                    >
                      mdi-home-analytics
                    </v-icon>

                    <h4 v-text="hiveSet.name"></h4>
                  </div>

                  <ApiaryPreviewHiveSelector
                    class="mb-3"
                    :hives="hiveSet.hives"
                    :hives-selected="dashboard.hive_ids"
                    :hives-editable="getOwnedHives(hiveSet)"
                    :dashboard-edit-mode="true"
                    :inspection-mode="true"
                    @select-hive="selectHive($event)"
                  ></ApiaryPreviewHiveSelector>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" xl="4">
            <div class="overline mb-3">{{ '2. ' + $t('Settings') }}</div>

            <v-row>
              <v-col cols="12" sm="8" xl="7">
                <v-text-field
                  v-if="dashboard"
                  v-model="dashboard.name"
                  :label="$t('Name')"
                  :hint="$t('Dashboard_name_exp')"
                  persistent-hint
                  counter="30"
                  required
                  @input="setDashboardEdited(true)"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="10" xl="9">
                <v-text-field
                  v-if="dashboard"
                  v-model="dashboard.description"
                  :label="$t('Description')"
                  :hint="$t('Dashboard_description_exp')"
                  persistent-hint
                  counter="60"
                  required
                  @input="setDashboardEdited(true)"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  v-if="dashboard"
                  v-model="dashboard.speed"
                  :label="$t('Pace')"
                  :hint="$t('Pace_exp')"
                  persistent-hint
                  type="number"
                  required
                  @input="setDashboardEdited(true)"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="8" md="5">
                <div
                  class="beep-label mt-5"
                  v-text="$t('Show_inspections')"
                ></div>
                <yesNoRating
                  v-if="dashboard"
                  :object="dashboard"
                  property="show_inspections"
                ></yesNoRating>
                <div
                  class="beep-label"
                  v-text="$t('Show_inspections_exp')"
                ></div>
              </v-col>
              <v-col cols="12" sm="8" md="5">
                <div
                  class="beep-label mt-5"
                  v-text="$t('Show_all_hives')"
                ></div>
                <yesNoRating
                  v-if="dashboard"
                  :object="dashboard"
                  property="show_all"
                ></yesNoRating>
                <div class="beep-label" v-text="$t('Show_all_hives_exp')"></div>
              </v-col>
            </v-row>
          </v-col>

          <!-- <v-col cols="12" sm="6" md="3">
            <div class="overline mb-3">{{
              '2. ' + $t('Select_dashboard_action')
            }}</div>
            <div
              class="beep-label mb-3"
              v-text="$t('Select_dashboard_action_exp')"
            ></div>
            <div class="rounded-border">
              <v-radio-group
                :value="dashboard.action_id"
                hide-details
                class="mt-0"
                @change="selectAction($event)"
              >
                <template v-for="(dashboardAction, index) in dashboardActions">
                  <div
                    :key="index"
                    class="d-flex align-center justify-start mb-1"
                  >
                    <v-radio
                      class="mt-2"
                      :disabled="!enableAction(dashboardAction)"
                      :value="dashboardAction.id"
                    ></v-radio>
                    <router-link
                      v-if="
                        dashboard.hive_id !== null && enableAction(dashboardAction)
                      "
                      :to="dashboardAction.routerLink"
                    >
                      <span v-text="$t(dashboardAction.description)"></span>
                    </router-link>
                    <span
                      v-else
                      :class="!enableAction(dashboardAction) ? 'color-grey' : ''"
                      v-text="$t(dashboardAction.description)"
                    ></span>
                  </div>
                </template>
              </v-radio-group>
            </div>
          </v-col> -->
        </v-row>
      </v-container>
    </v-form>

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
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import {
  // deleteDashboard,
  readApiariesAndGroupsIfNotPresent,
  // readDashboards,
} from '@mixins/methodsMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
    yesNoRating,
  },
  mixins: [readApiariesAndGroupsIfNotPresent],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      valid: false,
      showLoadingIcon: false,
      errorMessage: null,
      dashboard: null,
      showMaxWarning: false,
      maxNrOfHives: 12,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('locations', ['apiaries']),
    createMode() {
      return this.$route.name === 'dashboard-create'
    },
    dashboardNotValid() {
      return (
        this.dashboard === null ||
        // this.dashboard.name === null ||
        // this.dashboard.interval === null ||
        this.dashboard.hive_ids.length === 0
        // || this.dashboard.show_inspections === null
      )
    },
    getTitle() {
      return (
        (this.createMode
          ? this.$i18n.t('New_dashboard')
          : this.$i18n.t('Edit_dashboard')) +
        (this.dashboard !== null && this.dashboard.name !== null
          ? ' - ' + this.dashboard.name
          : '')
      )
    },
    hiveSets() {
      return this.apiaries.concat(this.groups)
    },
    id() {
      return this.$route.params.id || null
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showApiaryPlaceholder() {
      return this.hiveSets.length === 0
    },
    sortedHiveSets() {
      const sortedHiveSets = this.hiveSets
        .slice()
        .filter((hiveSet) => hiveSet.hives.length > 0)
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
  created() {
    // this.readDashboards().then((response) => { TODO
    this.readApiariesAndGroupsIfNotPresent().then((response) => {
      if (!this.createMode) {
        var filteredDashboards = this.dashboards.filter(
          (dashboard) => dashboard.id === this.id
        )
        this.dashboard =
          filteredDashboards.length === 0 ? null : { ...filteredDashboards[0] }
      }

      // If dashboard-create route is used, make empty dashboard object
      else if (this.createMode) {
        this.dashboard = {
          id: null,
          name: null,
          description: null,
          speed: null,
          hive_ids: [],
          interval: null,
          show_inspections: true,
          show_all: false,
        }
      }
    })
    // })
    this.setDashboardEdited(false)
  },
  methods: {
    async createDashboard() {
      if (this.$refs.form.validate()) {
        console.log('TODO create dashboard', this.dashboard)
        // this.showLoadingIcon = true
        // try {
        //   const response = await Api.postRequest('/dashboards', this.dashboard)
        //   if (!response) {
        //     this.errorMessage =
        //       this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
        //     this.showLoadingIcon = false
        //   }
        //   setTimeout(() => {
        //     return this.readDashboards().then(() => {
        //       // this.$router.push({
        //       //   name: 'home',
        //       // })
        //       this.$router.push({
        //         name: 'dashboards',
        //       })
        //     })
        //   }, 50) // wait for API to update hive ids
        // } catch (error) {
        //   if (error.response) {
        //     const msg = error.response.data.error
        //     this.errorMessage = msg
        //     this.showLoadingIcon = false
        //     console.log(error.response)
        //   } else {
        //     this.showLoadingIcon = false
        //     console.log('Error: ', error)
        //   }
        // }
      }
    },
    async updateDashboard() {
      if (this.$refs.form.validate()) {
        console.log('TODO update dashboard', this.dashboard)
        // this.showLoadingIcon = true
        // try {
        //   const response = await Api.updateRequest(
        //     '/dashboards/',
        //     this.dashboard.id,
        //     this.dashboard
        //   )
        //   if (!response) {
        //     this.errorMessage =
        //       this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
        //   }
        //   setTimeout(() => {
        //     return this.readDashboards().then(() => {
        //       this.$router.push({
        //         name: 'dashboards',
        //       })
        //     })
        //   }, 50) // wait for API to update hive ids
        // } catch (error) {
        //   if (error.response) {
        //     const msg = error.response.data.error
        //     this.errorMessage = msg
        //     this.showLoadingIcon = false
        //     console.log(error.response)
        //   } else {
        //     this.showLoadingIcon = false
        //     console.log('Error: ', error)
        //   }
        // }
      }
    },
    getOwnedHives(hiveSet) {
      return hiveSet.hives.filter((hive) => hive.owner).map((hive) => hive.id)
    },
    saveDashboard() {
      if (this.createMode) {
        this.createDashboard()
      } else {
        this.updateDashboard()
      }
    },
    selectHive(id) {
      if (this.hivesObject[id].owner) {
        if (!this.dashboard.hive_ids.includes(id)) {
          if (this.dashboard.hive_ids.length < this.maxNrOfHives) {
            this.dashboard.hive_ids.push(id)
          }
        } else {
          this.dashboard.hive_ids.splice(this.dashboard.hive_ids.indexOf(id), 1)
        }
        this.showMaxWarning =
          this.dashboard.hive_ids.length >= this.maxNrOfHives
        this.setDashboardEdited(true)
      }
    },
    // selectAction(actionId) {
    //   this.dashboard.action_id = actionId
    //   this.dashboard.router_link = this.selectedAction.routerLink
    //   this.setDashboardEdited(true)
    // },
    setDashboardEdited(bool) {
      this.$store.commit('groups/setData', {
        prop: 'dashboardEdited', // TODO
        value: bool,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  width: 180px;
  @include for-phone-only {
    width: 135px;
  }
}

.tr--active {
  background-color: $color-orange-light;
}
</style>
