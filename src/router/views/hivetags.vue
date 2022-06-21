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

    <v-container v-if="ready" class="hivetags-content">
      <v-row>
        <v-col cols="12">
          <div class="overline mb-3">{{ $tc('Hivetag', 2) }}</div>
          <div class="rounded-border">
            <v-simple-table>
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
                        class="hive-icon-wrapper d-flex flex-column justify-center align-center mt-3 mb-1"
                      >
                        <HiveIcon
                          :hive="hivesObject[hiveTag.hive_id]"
                          :diary-view="true"
                        ></HiveIcon>
                        <span
                          class="name-label"
                          v-text="hivesObject[hiveTag.hive_id].name"
                        ></span>
                      </div>
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
                          params: { id: hiveTag.tag },
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
import HiveIcon from '@components/hive-icon.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { readApiariesAndGroupsIfNotPresent } from '@mixins/methodsMixin'
import qrCodeIcon from '@components/qrcode-icon.vue'
// import { readHiveTags } from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    HiveIcon,
    Layout,
    qrCodeIcon,
  },
  mixins: [readApiariesAndGroupsIfNotPresent],
  // mixins: [readHiveTags],
  data: function() {
    return {
      ready: false,
      errors: [],
      showLoadingIconById: [],
    }
  },
  computed: {
    ...mapGetters('hives', ['hivesObject', 'hiveTags']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    // showHiveTagPlaceholder() {
    //   return this.hiveTags.length === 0
    // },
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
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.ready = true
    })
    // if (this.hiveTags.length === 0) {
    //   this.readHiveTags().then(() => {
    //     if (this.hiveTags.length === 0) {
    //       this.showExplanation = true
    //     }
    //     this.ready = true
    //   })
    // } else {
    // this.ready = true
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
            hiveTag.tag +
            (hiveTag.description ? ' - ' + hiveTag.description : '') +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteHiveTag(hiveTag.tag)
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
    margin-top: 50px;
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
  max-width: 200px;
  @include for-phone-only {
    max-width: 100px;
  }
}
// .td--not-active {
//   opacity: 0.5;
// }
</style>
