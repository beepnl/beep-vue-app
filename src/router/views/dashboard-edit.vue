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
          @click="confirmDeleteDashboard(dashboard)"
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

          <v-col cols="12" md="6">
            <div class="overline mb-3">{{ '2. ' + $t('Settings') }}</div>

            <v-row>
              <v-col cols="12" xl="9">
                <v-row>
                  <v-col cols="12" sm="8" xl="8">
                    <v-text-field
                      v-model="dashboard.name"
                      :label="$t('Title')"
                      :placeholder="'Dashboard'"
                      :hint="$t('Dashboard_title_exp')"
                      persistent-hint
                      counter="30"
                      required
                      @input="validateText($event, 'name', 30)"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="10">
                    <v-text-field
                      v-model="dashboard.description"
                      :label="$t('Description')"
                      :hint="$t('Dashboard_description_exp')"
                      persistent-hint
                      counter="60"
                      required
                      @input="validateText($event, 'description', 60)"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="dashboard.speed"
                      :items="speedOptions"
                      :label="$t('Pace')"
                      :placeholder="$t('Select') + '...'"
                      :hint="$t('Dashboard_pace_exp')"
                      persistent-hint
                      class="mt-5"
                      @input="setDashboardEdited(true)"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="5">
                    <v-select
                      v-model="dashboard.interval"
                      :items="intervalOptions"
                      :label="$t('Interval')"
                      item-text="label"
                      item-value="id"
                      :placeholder="$t('Select') + '...'"
                      :hint="$t('Dashboard_interval_exp')"
                      persistent-hint
                      class="my-3"
                      @input="setDashboardEdited(true)"
                    ></v-select>
                  </v-col>
                </v-row>

                <MeasurementsDateSelection
                  v-if="dashboard.interval === 'selection'"
                  :interval="'selection'"
                  :relative-interval="false"
                  :show-as-column="8"
                  :dates="dates"
                  :date-range-text="dateRangeText"
                  @save-dates="dates = $event"
                />

                <v-row
                  :class="dashboard.interval !== 'selection' ? 'mt-5' : ''"
                >
                  <v-col cols="12" sm="8" md="6">
                    <div
                      class="beep-label"
                      v-text="$t('Show_inspections')"
                    ></div>
                    <yesNoRating
                      :object="dashboard"
                      property="show_inspections"
                    ></yesNoRating>
                    <div
                      class="beep-label"
                      v-text="$t('Show_inspections_exp')"
                    ></div>
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <div class="beep-label" v-text="$t('Show_all_hives')"></div>
                    <yesNoRating
                      :object="dashboard"
                      property="show_all"
                    ></yesNoRating>
                    <div
                      class="beep-label"
                      v-text="$t('Show_all_hives_exp')"
                    ></div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                v-if="!createMode"
                cols="12"
                xl="3"
                :class="xlScreen ? 'mt-n11' : 'mt-6'"
              >
                <div class="overline mb-3">{{
                  '3. ' + $t('Preview_share')
                }}</div>

                <v-row>
                  <v-col cols="12">
                    <div class="beep-label" v-text="$t('Code')"></div>
                    <a :href="dashboardUrl + dashboard.code" target="_blank">
                      <v-icon class="mr-2" color="accent">mdi-link</v-icon>
                      <span class="overline" v-text="dashboard.code"></span>
                    </a>
                  </v-col>

                  <v-col cols="12">
                    <v-btn tile outlined color="black" @click="copyUrl">
                      <v-icon left>mdi-content-copy</v-icon>
                      {{ $t('Copy_url') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
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
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import MeasurementsDateSelection from '@/src/components/measurements/measurements-date-selection.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import {
  deleteDashboard,
  readApiariesAndGroupsIfNotPresent,
  readDashboardGroups,
} from '@mixins/methodsMixin'
import { momentFormat } from '@mixins/momentMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
    MeasurementsDateSelection,
    yesNoRating,
  },
  mixins: [
    deleteDashboard,
    momentFormat,
    readApiariesAndGroupsIfNotPresent,
    readDashboardGroups,
  ],
  data: function() {
    return {
      dashboardUrl:
        process.env.VUE_APP_DASHBOARD_URL ||
        process.env.VUE_APP_DASHBOARD_URL_FALLBACK,
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
      maxNrOfHives: 10,
      speedOptions: [15, 30, 45, 60, 90, 120, 300],
      intervalOptions: [
        { id: 'hour', label: this.$i18n.t('Hour') },
        { id: 'day', label: this.$i18n.tc('Day', 1) },
        { id: 'week', label: this.$i18n.t('week') },
        { id: 'month', label: this.$i18n.t('month') },
        { id: 'year', label: this.$i18n.t('year') },
        // { id: 'selection', label: this.$i18n.t('selection') }, TODO: temp disabled because not implemented in api yet
      ],
      dates: [],
    }
  },
  computed: {
    ...mapGetters('groups', ['dashboardGroups', 'groups']),
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('locations', ['apiaries']),
    code() {
      return this.$route.params.id || null
    },
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
    dateRangeText() {
      if (this.dates.length > 0) {
        var momentDates = [
          this.momentFormat(this.dates[0], 'll'),
          this.dates[1] !== undefined
            ? this.momentFormat(this.dates[1], 'll')
            : '',
        ]
        return momentDates.join(' - ')
      } else {
        return this.$i18n.t('selection_placeholder')
      }
    },
    getTitle() {
      return this.createMode
        ? this.$i18n.t('New_dashboard')
        : this.$i18n.t('Edit_dashboard') +
            (this.dashboard !== null ? ' - ' + this.dashboard.name : '')
    },
    hiveSets() {
      return this.apiaries.concat(this.groups)
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
    xlScreen() {
      return this.$vuetify.breakpoint.xl
    },
  },
  created() {
    this.readDashboardGroupsIfNotChecked().then((response) => {
      this.readApiariesAndGroupsIfNotPresent().then((response) => {
        if (!this.createMode) {
          var filteredDashboards = this.dashboardGroups.filter(
            (dashboard) => dashboard.code === this.code
          )
          this.dashboard =
            filteredDashboards.length === 0
              ? null
              : { ...filteredDashboards[0] }
        }

        // If dashboard-create route is used, make empty dashboard object
        else if (this.createMode) {
          this.dashboard = {
            name: null,
            description: null,
            speed: 30,
            hive_ids: [],
            interval: 'week',
            show_inspections: true,
            show_all: false,
          }
        }
      })
    })
    this.setDashboardEdited(false)
  },
  methods: {
    async createDashboard() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest(
            '/dashboardgroups',
            this.dashboard
          )
          if (!response) {
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            return this.readDashboardGroups().then(() => {
              this.$router.push({
                name: 'dashboards',
              })
            })
          }, 50) // wait for API to update dashboards
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.error
            this.errorMessage = msg
            this.showLoadingIcon = false
            console.log(error.response)
          } else {
            this.showLoadingIcon = false
            console.log('Error: ', error)
          }
        }
      }
    },
    async updateDashboard() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.updateRequest(
            '/dashboardgroups/',
            this.dashboard.id,
            this.dashboard
          )
          if (!response) {
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
          }
          setTimeout(() => {
            return this.readDashboardGroups().then(() => {
              this.$router.push({
                name: 'dashboards',
              })
            })
          }, 50) // wait for API to update dashboards
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.error
            this.errorMessage = msg
            this.showLoadingIcon = false
            console.log(error.response)
          } else {
            this.showLoadingIcon = false
            console.log('Error: ', error)
          }
        }
      }
    },
    copyUrl() {
      var copyText = this.dashboardUrl + this.dashboard.code
      navigator.clipboard.writeText(copyText)
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
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.dashboard[property] = value
      }
      this.setDashboardEdited(true)
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
