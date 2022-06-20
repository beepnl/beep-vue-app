<template>
  <Layout :title="this.$i18n.tc('Hivetag', 2)">
    <div v-if="ready" class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row class="filter-bar d-flex align-center">
          <v-card-actions
            class="mr-1 d-flex justify-end align-center"
            style="width: 100%;"
          >
            <v-btn
              tile
              outlined
              color="black"
              class="save-button-mobile-wide"
              @click="downloadHiveTags"
            >
              <v-icon left>mdi-download</v-icon>
              {{ $t('Download_hivetags') }}
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

    <v-container class="hivetags-content">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              v-if="mobile"
              cols="12"
              xl="3"
              class="d-flex justify-end align-end mb-3"
            >
              <v-btn
                tile
                outlined
                color="black"
                class="save-button-mobile-wide"
                @click="downloadHiveTags"
              >
                <v-icon left>mdi-download</v-icon>
                {{ $t('Download_hivetags') }}
              </v-btn>
            </v-col>
          </v-row>
          <div class="rounded-border">
            <v-simple-table class="v-data-table--smallfont">
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $tc('qrcode', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $tc('Hive', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $t('Description') }}
                    </th>
                    <th class="text-left">
                      {{ $t('Actions') }}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hiveTag, index) in sortedHiveTags" :key="index">
                    <td class="d-flex align-center">
                      <v-icon class="hivetag-icon" large>mdi-qrcode </v-icon>
                      <span class="hivetag-id" v-text="hiveTag.id"></span>
                    </td>
                    <td>
                      <span v-text="hiveTag.hive_id"></span>
                      <!-- <HiveIcon :hive="hive" :diary-view="true"></HiveIcon> -->
                    </td>
                    <td>
                      <router-link :to="hiveTag.url">
                        <span v-text="hiveTag.description"></span>
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        :to="{
                          name: 'hivetag-edit',
                          params: { id: hiveTag.id },
                        }"
                      >
                        <v-icon dark color="accent">mdi-pencil</v-icon>
                      </router-link>
                    </td>
                    <td>
                      <v-icon
                        dark
                        color="red"
                        @click="confirmDeleteHiveTag(hiveTag)"
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
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
// import HiveIcon from '@components/hive-icon.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
// import { readHiveTags } from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    // HiveIcon,
    Layout,
  },
  // mixins: [readHiveTags],
  data: function() {
    return {
      ready: false,
      errors: [],
      showLoadingIconById: [],
    }
  },
  computed: {
    ...mapGetters('hives', ['hiveTags']),
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    // showHiveTagPlaceholder() {
    //   return this.hiveTags.length === 0
    // },
    sortedHiveTags() {
      const sortedHiveTags = this.hiveTags.slice().sort(function(a, b) {
        if (a.id.toLowerCase() > b.id.toLowerCase()) {
          return 1
        }
        if (b.id.toLowerCase() > a.id.toLowerCase()) {
          return -1
        }
        return 0
      })
      return sortedHiveTags
    },
  },
  created() {
    // if (this.hiveTags.length === 0) {
    //   this.readHiveTags().then(() => {
    //     if (this.hiveTags.length === 0) {
    //       this.showExplanation = true
    //     }
    //     this.ready = true
    //   })
    // } else {
    this.ready = true
    // }
  },
  methods: {
    async deleteHiveTag(id) {
      console.log('Deleting hive tag ', id)
      try {
        const response = await Api.deleteRequest('/hive-tags/', id)
        if (!response) {
          console.log('Error')
        }
        // update hiveTags in store
        // this.readHiveTags().then(() => {
        //   if (this.hiveTags.length === 0) {
        //     this.showExplanation = true
        //   }
        // })
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    confirmDeleteHiveTag(hiveTag) {
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_hivetag'),
          this.$i18n.t('delete_hivetag') +
            ' (' +
            hiveTag.id +
            (hiveTag.description ? ' - ' + hiveTag.description : '') +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteHiveTag(hiveTag.id)
        })
        .catch((reject) => {
          return true
        })
    },
    downloadHiveTags() {
      // TODO
      console.log('download hive tags')
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
  margin-top: 75px;
  @include for-phone-only {
    margin-top: 40px;
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

.hivetag-icon {
  z-index: 0;
  color: $color-beige !important;
  caret-color: $color-beige !important;
}

.hivetag-id {
  font-size: 19px;
  font-weight: bold;
  color: $color-accent;
  z-index: 1;
  margin-left: -29px;
}

// .td--not-active {
//   opacity: 0.5;
// }
</style>
