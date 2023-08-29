<template>
  <Layout :title="$tc('Dashboard', 2)">
    <div v-if="ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row class="filter-bar d-flex align-center">
          <v-card-actions
            class="mr-1 d-flex justify-end align-center"
            style="width: 100%;"
          >
            <v-btn
              :to="{ name: 'dashboard-create' }"
              tile
              outlined
              color="black"
              :small="mobile"
              class="save-button-mobile-wide"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ $t('New_dashboard') }}
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container v-if="!ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <v-container v-if="ready" class="dashboards-content">
      <v-row>
        <v-col class="pb-2">
          <div
            v-if="!showDashboardPlaceholder"
            class="d-flex justify-start align-center"
          >
            <div class="overline ">{{ $tc('Dashboard', 2) }}</div>
            <v-icon
              class="mdi mdi-information icon-info cursor-pointer  ml-2"
              dark
              small
              :color="showExplanation ? 'accent' : 'grey'"
              @click="showExplanation = !showExplanation"
            ></v-icon>
          </div>
          <div v-if="showExplanation" class="d-flex justify-start align-start">
            <p class="beep-label">
              <em>{{ $t('Dashboard_exp') }} </em>
            </p>
          </div>
        </v-col>

        <v-col v-if="!showDashboardPlaceholder" cols="12" class="pt-0">
          <div class="rounded-border">
            <v-simple-table>
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $t('Code') }}
                    </th>
                    <th :class="mobile ? 'text-center' : 'text-left'">
                      {{ $tc('Hive', 2) }}
                    </th>
                    <th class="text-left">
                      {{ $t('Title') }}
                    </th>
                    <th class="text-left">
                      {{ $t('Description') }}
                    </th>
                    <th class="text-left">
                      {{ $t('edit') }}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(dashboardGroup, index) in sortedDashboardGroups"
                    :key="index"
                  >
                    <td>
                      <a
                        :href="dashboardUrl + dashboardGroup.code"
                        target="_blank"
                      >
                        <v-icon class="mr-2" color="accent">mdi-link</v-icon>
                        <span
                          class="overline"
                          v-text="dashboardGroup.code"
                        ></span>
                      </a>

                      <v-tooltip bottom max-width="60%">
                        <template v-slot:activator="{ on }">
                          <v-icon
                            small
                            class="ml-2"
                            v-on="on"
                            @click="copyUrl(dashboardGroup.code)"
                            >mdi-content-copy</v-icon
                          >
                        </template>
                        <span v-text="$t('Copy_url')"> </span>
                      </v-tooltip>
                    </td>
                    <td>
                      <ApiaryPreviewHiveSelector
                        class="mt-4 mb-3"
                        :hives="getHives(dashboardGroup)"
                        :hives-selected="[]"
                        :hives-editable="dashboardGroup.hive_ids"
                        :dashboard-edit-mode="true"
                        :disable-sort-hives="true"
                        :not-clickable="true"
                      ></ApiaryPreviewHiveSelector>
                    </td>
                    <td>
                      <span
                        class="overline"
                        v-text="dashboardGroup.name"
                      ></span>
                    </td>
                    <td>
                      <span v-text="dashboardGroup.description"></span>
                    </td>
                    <td>
                      <router-link
                        class="mr-1 mr-sm-2 mr-md-3"
                        :to="{
                          name: 'dashboard-edit',
                          params: { id: dashboardGroup.code },
                        }"
                      >
                        <v-icon dark color="accent">mdi-pencil</v-icon>
                      </router-link>
                      <v-icon
                        dark
                        color="red"
                        @click="confirmDeleteDashboard(dashboardGroup)"
                        >mdi-delete</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
// import HiveIcon from '@components/hive-icon.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import {
  deleteDashboard,
  readApiariesAndGroupsIfNotPresent,
  readDashboardGroups,
} from '@mixins/methodsMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    // HiveIcon,
    Layout,
  },
  mixins: [
    deleteDashboard,
    readApiariesAndGroupsIfNotPresent,
    readDashboardGroups,
  ],
  data: function() {
    return {
      dashboardUrl:
        process.env.VUE_APP_DASHBOARD_URL ||
        process.env.VUE_APP_DASHBOARD_URL_FALLBACK,
      ready: false,
      errors: [],
      showLoadingIconById: [],
      showExplanation: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('groups', ['dashboardGroups', 'groups']),
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('locations', ['apiaries']),
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showDashboardPlaceholder() {
      return this.dashboardGroups.length === 0
    },
    sortedDashboardGroups() {
      const sortedDashboardGroups = this.dashboardGroups
        .slice()
        .sort(function(a, b) {
          return a.name !== null && b.name !== null
            ? a.name.localeCompare(b.name, undefined, {
                numeric: true,
                sensitivity: 'base',
              })
            : 0
        })
      return sortedDashboardGroups
    },
  },
  created() {
    this.readDashboardGroupsIfNotChecked().then(() => {
      // get hivesObject
      this.readApiariesAndGroupsIfNotPresent().then(() => {
        if (this.dashboardGroups.length === 0) {
          this.showExplanation = true
        }
        this.ready = true
      })
    })
  },
  methods: {
    copyUrl(code) {
      var copyText = this.dashboardUrl + code // TODO get url via env settings
      navigator.clipboard.writeText(copyText)
    },
    getHives(dashboardGroup) {
      var hivesArray = []
      dashboardGroup.hive_ids.map((hiveId) => {
        hivesArray.push(this.hivesObject[hiveId])
      })
      return hivesArray
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  top: 52px;
  .filter-bar {
    .v-input:not(.v-input--switch) {
      background-color: $color-white;
    }
    .v-input--selection-controls {
      margin-top: 0;
    }
  }
}

.dashboards-content {
  margin-top: 50px;
  @include for-phone-only {
    margin-top: 45px;
  }
}

.dashboards-title-row {
  line-height: 1.2rem !important;
  @include for-phone-only {
    line-height: 1rem !important;
  }
  &--border-bottom {
    border-bottom: 1px solid $color-grey-light;
  }
}

.hive-icon-wrapper {
  max-width: 130px;
  @include for-phone-only {
    max-width: 100px;
  }
}
</style>
