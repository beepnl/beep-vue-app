<template>
  <Layout :title="$tc('Hivetag', 2)">
    <div v-if="ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row class="filter-bar d-flex align-center">
          <v-card-actions
            class="mr-1 d-flex justify-end align-center"
            style="width: 100%;"
          >
            <v-btn
              v-if="!mobile"
              color="accent"
              class="mr-3"
              :href="assetsUrl + pdfPath"
              target="_blank"
            >
              <v-icon color="accent" start>mdi-download</v-icon>
              {{ $t('Download_hivetags') }}
            </v-btn>
            <v-btn
              :to="{ name: 'hivetag-create' }"
              color="black"
              :small="mobile"
              class="save-button-mobile-wide"
            >
              <v-icon start>mdi-plus</v-icon>
              {{ $t('Add_hivetag') }}
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

    <v-container v-if="ready" class="hivetags-content">
      <v-row>
        <v-col class="pb-2">
          <v-btn
            v-if="mobile"
            color="accent"
            small
            class="save-button-mobile-wide mb-3"
            :href="assetsUrl + pdfPath"
            target="_blank"
          >
            <v-icon color="accent" start>mdi-download</v-icon>
            {{ $t('Download_hivetags') }}
          </v-btn>
          <div
            v-if="!showHiveTagPlaceholder"
            class="d-flex justify-start align-center"
          >
            <div class="text-overline ">{{ $tc('Hivetag', 2) }}</div>
            <v-icon
              class="icon-info cursor-pointer  ml-2"
              size="small"
              :color="showExplanation ? 'accent' : 'grey'"
              @click="showExplanation = !showExplanation"
              >mdi-information</v-icon
            >
          </div>
          <div v-if="showExplanation" class="d-flex justify-start align-start">
            <p class="beep-label">
              <em
                >{{ $t('Hivetag_exp_1') }}
                <a :href="assetsUrl + pdfPath" target="_blank">{{
                  $t('Hivetag_download_text')
                }}</a
                >{{ $t('Hivetag_exp_2') }}
                <!-- <a :href="$t('Hivetag_support_url')" target="_blank"
                    ><v-icon size="small" color="accent">mdi-arrow-right</v-icon
                    >{{ $t('Hivetags_url_text') }}</a
                  > -->
              </em>
            </p>
          </div>
        </v-col>

        <v-col v-if="!showHiveTagPlaceholder" cols="12" class="pt-0">
          <div class="rounded-border">
            <v-table>
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $tc('qrcode', 1) }}
                    </th>
                    <th :class="mobile ? 'text-center' : 'text-left'">
                      {{ $tc('Hive', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $tc('Action', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $t('edit') }}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hiveTag, index) in sortedHiveTags" :key="index">
                    <td>
                      <qrCodeIcon :text="hiveTag.tag" />
                    </td>
                    <td>
                      <!-- <span v-text="hiveTag.hive_id"></span> -->
                      <div
                        v-if="hivesObject[hiveTag.hive_id]"
                        class="hive-icon-wrapper d-flex flex-column justify-center align-center mt-3 mb-1"
                      >
                        <HiveIcon
                          :hive="hivesObject[hiveTag.hive_id]"
                          :diary-view="true"
                        ></HiveIcon>
                        <span
                          class="name-label text-center"
                          v-text="hivesObject[hiveTag.hive_id].name"
                        ></span>
                      </div>
                    </td>
                    <td>
                      <router-link :to="hiveTag.router_link">
                        <span v-text="getDescription(hiveTag.action_id)"></span>
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        class="mr-1 mr-sm-2 mr-md-3"
                        :to="{
                          name: 'hivetag-edit',
                          params: { id: hiveTag.tag },
                        }"
                      >
                        <v-icon dark color="accent">mdi-pencil</v-icon>
                      </router-link>
                      <v-icon
                        dark
                        color="red"
                        @click="
                          confirmDeleteHiveTag(
                            hiveTag,
                            // eslint-disable vue/comma-dangle
                            hivesObject[hiveTag.hive_id]
                              ? hivesObject[hiveTag.hive_id].name
                              : ''
                          )
                        "
                        >mdi-delete</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-table>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
// import Api from '@api/Api'
import qrCodeIcon from '@components/qrcode-icon.vue'
import Confirm from '@/src/components/confirm-dialog.vue'
import HiveIcon from '@components/hive-icon.vue'
import Layout from '@/src/router/layouts/back-layout.vue'
import { mapGetters } from 'vuex'
import {
  deleteHiveTag,
  readApiariesAndGroupsIfNotPresent,
  readHiveTags,
} from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    HiveIcon,
    Layout,
    qrCodeIcon,
  },
  mixins: [deleteHiveTag, readApiariesAndGroupsIfNotPresent, readHiveTags],
  data: function() {
    return {
      ready: false,
      errors: [],
      showLoadingIconById: [],
      showExplanation: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      pdfPath: '/img/beep-hivetags-A6.pdf',
    }
  },
  computed: {
    ...mapGetters('hives', [
      'hivesObject',
      'hiveTagActionDescriptions',
      'hiveTags',
    ]),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    mobile() {
      return this.$vuetify.display.mobile
    },
    showHiveTagPlaceholder() {
      return this.hiveTags.length === 0
    },
    sortedHiveTags() {
      const sortedHiveTags = this.hiveTags.slice().sort(function(a, b) {
        if (a.tag.toLowerCase() > b.tag.toLowerCase()) {
          return 1
        }
        if (b.tag.toLowerCase() > a.tag.toLowerCase()) {
          return -1
        }
        return 0
      })
      return sortedHiveTags
    },
  },
  created() {
    this.readHiveTagsIfNotChecked().then(() => {
      this.readApiariesAndGroupsIfNotPresent().then(() => {
        if (this.hiveTags.length === 0) {
          this.showExplanation = true
        }
        this.ready = true
      })
    })
  },
  methods: {
    getDescription(actionId) {
      return this.$i18n.t(this.hiveTagActionDescriptions[actionId])
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

.hivetags-content {
  margin-top: 50px;
  @include for-phone-only {
    margin-top: 45px;
  }
}

.hivetags-title-row {
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
