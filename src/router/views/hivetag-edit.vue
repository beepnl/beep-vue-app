<template>
  <Layout :title="getTitle">
    <v-form ref="form" v-model="valid" @submit.prevent="saveHiveTag">
      <v-toolbar v-if="hiveTag" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-icon
          v-if="hiveTag && !createMode && !tabletLandscapeUp"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteHiveTag(hiveTag)"
          >mdi-delete</v-icon
        >

        <v-btn
          tile
          outlined
          color="black"
          :class="`mr-1 ${createMode ? 'save-button-mobile-wide' : ''}`"
          type="submit"
          :disabled="!valid || showLoadingIcon"
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

      <v-container class="group-edit content-container">
        <v-row v-if="errorMessage">
          <v-col cols="12">
            <v-alert text prominent dense type="error" color="red">
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="showSuccessMessage">
          <v-col cols="12">
            <v-alert
              v-model="showSuccessMessage"
              text
              prominent
              dense
              dismissible
              type="success"
              color="green"
            >
              {{ successMessage }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row v-if="hiveTag">
          <v-col cols="12">
            <div class="overline mb-3">{{ $t('Select_hive') }}</div>
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
                <div
                  class="beep-label mt-1 mb-3 mb-sm-4"
                  v-text="$t('Select_hive_for_hivetag_exp')"
                ></div>
                <div v-for="(hiveSet, i) in sortedHiveSets" :key="i">
                  <div
                    class="apiary-title d-flex flex-row justify-flex-start align-center"
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
                    :hives-selected="[hiveTag.hive_id]"
                    :hives-editable="getEditableHives(hiveSet)"
                    :inspection-mode="true"
                    @select-hive="selectHive($event)"
                  ></ApiaryPreviewHiveSelector>
                </div>
              </div>
            </div>
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
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import { readApiariesAndGroupsIfNotPresent } from '@mixins/methodsMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
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
      newGroupNumber: 1,
      overlay: false,
      showSuccessMessage: false,
      errorMessage: null,
      token: null,
      successMessage: null,
      hiveTag: null,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('hives', ['hiveTagEdited', 'hiveTags']),
    ...mapGetters('locations', ['apiaries']),
    createMode() {
      return this.$route.name === 'hivetag-create'
    },
    // filteredApiaries() {
    //   const sortedAndFilledApiaries = this.apiaries
    //     .slice()
    //     .sort(function(a, b) {
    //       if (a.name > b.name) {
    //         return 1
    //       }
    //       if (b.name > a.name) {
    //         return -1
    //       }
    //       return 0
    //     })
    //     .filter((x) => x.hives.length > 0)
    //   return sortedAndFilledApiaries
    // },
    getTitle() {
      return (
        this.$i18n.t('Edit_hivetag') +
        ' ' +
        (this.hiveTag !== null ? this.hiveTag.tag : '')
      )
    },
    hiveSets() {
      return this.apiaries.concat(this.groups)
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    showApiaryPlaceholder() {
      return this.apiaries.length === 0
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
    tag() {
      return this.$route.params.tag
    },
  },
  created() {
    this.readApiariesAndGroupsIfNotPresent().then((response) => {
      var filteredHiveTags = this.hiveTags
        .slice()
        .filter((hiveTag) => hiveTag.tag === this.tag)
      this.hiveTag = filteredHiveTags.length === 0 ? null : filteredHiveTags[0]

      // If Group-create route is used, make empty Group object
      // if (this.createMode) {
      //   if (this.groups.length > 0) {
      //     this.newGroupNumber = this.groups.length + 1
      //   }
      //   this.hiveTag = {
      //     hex_color: '#F8B133',
      //     name: this.$i18n.tc('Group', 1) + ' ' + this.newGroupNumber,
      //     description: '',
      //     hives_selected: [],
      //     hives_editable: [],
      //     users: [
      //       {
      //         name: this.userName,
      //         email: this.userEmail,
      //         admin: true,
      //         creator: true,
      //         invited: null,
      //       },
      //     ],
      //   }
      //   this.showGroupDetails = true
      //   // Else retrieve to-be-edited Group
      // } else if (this.acceptMode) {
      //   this.token = this.$route.params.token || null
      //   if (this.token) {
      //     this.checkToken(this.token, this.id).then(() => {
      //       if (this.errorMessage === null) {
      //         this.readGroup()
      //         this.showGroupDetails = true
      //       }
      //     })
      //   }
      // } else {
      //   this.readGroup()
      //   this.showGroupDetails = true
      // }
    })
    this.setHiveTagEdited(false)
  },
  methods: {
    // async createGroup() {
    //   if (this.$refs.form.validate()) {
    //     this.showLoadingIcon = true
    //     try {
    //       const response = await Api.postRequest('/groups', this.hiveTag)
    //       if (!response) {
    //         this.errorMessage =
    //           this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
    //         this.showLoadingIcon = false
    //       }
    //       setTimeout(() => {
    //         return this.readGroups().then(() => {
    //           this.$store.commit('locations/setData', {
    //             prop: 'hiveSearch',
    //             value: this.hiveTag.name, // set search term via store instead of query to overrule possible stored search terms
    //           })
    //           this.$router.push({
    //             name: 'home',
    //           })
    //         })
    //       }, 50) // wait for API to update groups
    //     } catch (error) {
    //       if (error.response) {
    //         const msg = error.response.data.error
    //         this.errorMessage = msg
    //         this.showLoadingIcon = false
    //         console.log(error.response)
    //       } else {
    //         this.errorMessage = this.$i18n.t('empty_fields')
    //         this.showLoadingIcon = false
    //         console.log('Error: ', error)
    //       }
    //     }
    //   }
    // },
    async deleteHiveTag() {
      console.log('delete hive tag') // TODO
      // try {
      //   const response = await Api.deleteRequest(
      //     '/groups/',
      //     this.hiveTag.id
      //   )
      //   if (!response) {
      //     this.snackbar.text = this.$i18n.t('something_wrong')
      //     this.snackbar.show = true
      //   }
      //   setTimeout(() => {
      //     return this.readGroups().then(() => {
      //       this.$router.push({
      //         name: 'home',
      //       })
      //     })
      //   }, 50) // wait for API to update groups
      // } catch (error) {
      //   if (error.response) {
      //     console.log('Error: ', error.response)
      //     const msg = error.response.data.message
      //     this.snackbar.text = msg
      //   } else {
      //     console.log('Error: ', error)
      //     this.snackbar.text = this.$i18n.t('something_wrong')
      //   }
      //   this.snackbar.show = true
      // }
    },
    // async readGroup() {
    //   try {
    //     const response = await Api.readRequest('/groups/', this.id)
    //     if (response.data.length === 0) {
    //       this.$router.push({ name: '404', params: { resource: 'group' } })
    //     }
    //     var group = response.data
    //     // eslint-disable-next-line camelcase
    //     var hives_selected = []
    //     // eslint-disable-next-line camelcase
    //     var hives_editable = []
    //     if (typeof group.hives !== 'undefined' && group.hives.length > 0) {
    //       group.hives.map((hive) => {
    //         if (hive.editable) {
    //           hives_editable.push(hive.id)
    //         }
    //         hives_selected.push(hive.id)
    //       })
    //     }
    //     // eslint-disable-next-line camelcase
    //     group.hives_selected = hives_selected
    //     // eslint-disable-next-line camelcase
    //     group.hives_editable = hives_editable
    //     var usersWithDeleteProp = group.users // otherwise Vue can't track the 'delete' property
    //     usersWithDeleteProp.map((user) => {
    //       user.delete = false
    //     })
    //     group.users = usersWithDeleteProp

    //     this.hiveTag = group
    //     return true
    //   } catch (error) {
    //     if (error.response) {
    //       console.log(error.response)
    //     } else {
    //       console.log('Error: ', error)
    //     }
    //     this.$router.push({ name: '404', params: { resource: 'group' } })
    //   }
    // },
    // async readGroups() {
    //   try {
    //     const response = await Api.readRequest('/groups')
    //     this.$store.commit('groups/setGroups', response.data.groups)
    //     this.$store.commit('groups/setInvitations', response.data.invitations)
    //     return true
    //   } catch (error) {
    //     if (error.response) {
    //       console.log(error.response)
    //     } else {
    //       console.log('Error: ', error)
    //     }
    //   }
    // },
    async updateHiveTag() {
      if (this.$refs.form.validate()) {
        console.log('update hive tag') // TODO
        // this.showLoadingIcon = true
        // var group = {
        //   description: this.hiveTag.description,
        //   hex_color: this.hiveTag.hex_color,
        //   hives_editable: this.hiveTag.hives_editable,
        //   hives_selected: this.hiveTag.hives_selected,
        //   name: this.hiveTag.name,
        //   users: this.hiveTag.users,
        // }
        // try {
        //   const response = await Api.updateRequest(
        //     '/groups/',
        //     this.hiveTag.id,
        //     group
        //   )
        //   if (!response) {
        //     this.errorMessage =
        //       this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
        //   }
        //   this.successMessage = response.data.message
        //   this.showSuccessMessage = true
        //   setTimeout(() => {
        //     return this.readGroups().then(() => {
        //       this.$store.commit('locations/setData', {
        //         prop: 'hiveSearch',
        //         value: this.hiveTag.name, // set search term via store instead of query to overrule possible stored search terms
        //       })
        //       this.showLoadingIcon = false
        //       this.$router.push({
        //         name: 'home',
        //       })
        //     })
        //   }, 800) // wait for API to update groups and for user to read success message
        // } catch (error) {
        //   if (error.response) {
        //     const msg = error.response.data.error
        //     this.errorMessage = msg
        //     this.showLoadingIcon = false
        //     console.log(error.response)
        //   } else {
        //     this.errorMessage = this.$i18n.t('empty_fields')
        //     this.showLoadingIcon = false
        //     console.log('Error: ', error)
        //   }
        // }
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
    getEditableHives(hiveSet) {
      return hiveSet.hives.map((hive) => hive.id)
      //       group.hives.map((hive) => {
      //   if (hive.editable || hive.owner) {
      //     this.selectedHives.push(hive.id)
      //     this.editableHives.push(hive.id)
      //   }
      // }) // TODO: show only editable hives if inspect route is selected??
    },
    saveHiveTag() {
      if (this.createMode) {
        this.createHiveTag()
      } else {
        this.updateHiveTag()
      }
    },
    selectHive(id) {
      this.hiveTag.hive_id = id
      this.setHiveTagEdited(true)
    },
    setHiveTagEdited(bool) {
      this.$store.commit('hives/setData', {
        prop: 'hiveTagEdited',
        value: bool,
      })
    },
  },
}
</script>

<style lang="scss">
.group-edit {
  .group-edit-name {
    padding-top: 12px;
    font-size: 1.6rem;
    @include for-tablet-landscape-up {
      font-size: 2rem;
    }

    &.v-text-field input {
      min-height: 45px !important;
    }
  }
  .apiary-title {
    width: 100%;
    padding-bottom: 4px;
    margin: 6px 0 16px;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
    @include for-phone-only {
      padding-bottom: 2px;
      margin: 4px 0 10px;
    }
  }
  .group-color {
    width: 35px;
    height: 35px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
  .user-label {
    font-size: 14px;
    @include for-phone-only {
      font-size: 12px;
    }
  }
  .user-delete {
    background-color: rgba(255, 0, 0, 0.2);
  }
}
</style>
