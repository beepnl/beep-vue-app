<template>
  <Layout :title="getTitle">
    <v-form ref="form" v-model="valid" @submit.prevent="saveHiveTag">
      <v-toolbar v-if="hiveTag" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-icon
          v-if="hiveTag && !createMode"
          dark
          class="mr-4"
          color="red"
          @click="
            confirmDeleteHiveTag(
              hiveTag,
              // eslint-disable vue/comma-dangle
              selectedHive.name
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
          :disabled="!valid || hiveTagNotValid || showLoadingIcon"
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

        <v-row v-if="hiveTag">
          <v-col cols="12" sm="6" md="3">
            <div class="overline mb-3">{{ '1. ' + $tc('Hivetag', 1) }}</div>

            <v-select
              v-if="createMode && tag === null && possibleHiveTags.length > 0"
              v-model="hiveTag.tag"
              :items="possibleHiveTags"
              :placeholder="$t('Select_hivetag_number') + '...'"
              class="mb-3 pt-0"
              hide-details
            ></v-select>

            <div
              v-if="possibleHiveTags.length === 0"
              class="beep-label red--text mb-3"
              v-text="$t('No_hivetags_left')"
            ></div>

            <div v-if="hiveTag.tag !== null">
              <div
                class="beep-label mb-3"
                v-text="$t('Qrcode_exp1') + hiveTag.tag + $t('Qrcode_exp2')"
              ></div>
              <div class="hivetag-wrapper">
                <div
                  class="rounded-border d-flex align-center justify-center pa-0"
                >
                  <qrCodeIcon :text="hiveTag.tag" :x-large="true" />
                </div>
              </div>
              <div class="beep-label my-3" v-text="$t('Qrcode_note')"></div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="overline mb-3">{{
              '2. ' + $t('Select_hivetag_action')
            }}</div>
            <div
              class="beep-label mb-3"
              v-text="$t('Select_hivetag_action_exp')"
            ></div>
            <div class="rounded-border">
              <v-radio-group
                :value="hiveTag.action_id"
                hide-details
                class="mt-0"
                @change="selectAction($event)"
              >
                <template v-for="(hiveTagAction, index) in hiveTagActions">
                  <div
                    :key="index"
                    class="d-flex align-center justify-start mb-1"
                  >
                    <v-radio
                      class="mt-2"
                      :disabled="!enableAction(hiveTagAction)"
                      :value="hiveTagAction.id"
                    ></v-radio>
                    <router-link
                      v-if="
                        hiveTag.hive_id !== null && enableAction(hiveTagAction)
                      "
                      :to="hiveTagAction.routerLink"
                    >
                      <span v-text="$t(hiveTagAction.description)"></span>
                    </router-link>
                    <span
                      v-else
                      :class="!enableAction(hiveTagAction) ? 'color-grey' : ''"
                      v-text="$t(hiveTagAction.description)"
                    ></span>
                  </div>
                </template>
              </v-radio-group>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="my-3 mt-md-0">
            <div class="overline mb-3">{{ '3. ' + $t('Select_hive') }}</div>
            <div
              v-if="!showApiaryPlaceholder"
              class="beep-label mb-3"
              v-text="$t('Select_hive_for_hivetag_exp')"
            ></div>
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
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import {
  deleteHiveTag,
  readApiariesAndGroupsIfNotPresent,
  readHiveTags,
} from '@mixins/methodsMixin'
import qrCodeIcon from '@components/qrcode-icon.vue'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
    qrCodeIcon,
  },
  mixins: [deleteHiveTag, readApiariesAndGroupsIfNotPresent, readHiveTags],
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
      errorMessage: null,
      token: null,
      hiveTag: null,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('hives', [
      'hiveTagActionDescriptions',
      'hiveTagEdited',
      'hiveTags',
      'hivesObject',
      'tempSavedHiveTag',
    ]),
    ...mapGetters('locations', ['apiaries']),
    createMode() {
      return (
        this.$route.name === 'hivetag-create' ||
        this.$route.name === 'hivetag-create-id'
      )
    },
    getTitle() {
      return (
        (this.createMode
          ? this.$i18n.t('Add_hivetag')
          : this.$i18n.t('Edit_hivetag')) +
        (' ' +
          (this.hiveTag !== null && this.hiveTag.tag !== null
            ? this.hiveTag.tag
            : ''))
      )
    },
    hiveSets() {
      return this.apiaries.concat(this.groups)
    },
    hiveTagNotValid() {
      return (
        this.hiveTag === null ||
        this.hiveTag.tag === null ||
        this.hiveTag.hive_id === null ||
        this.hiveTag.router_link === null ||
        this.hiveTag.action_id === null
      )
    },
    hiveTagActions() {
      return [
        {
          id: 1,
          routerLink: {
            name: 'home',
            query: {
              search: 'id=' + this.hiveTag.hive_id,
            },
          },
          description: this.hiveTagActionDescriptions[1],
          deviceRequired: false,
          editableHiveRequired: false,
        },
        {
          id: 2,
          routerLink: {
            name: 'inspect',
            query: {
              hiveId: this.hiveTag.hive_id,
            },
          },
          description: this.hiveTagActionDescriptions[2],
          deviceRequired: false,
          editableHiveRequired: true,
        },
        {
          id: 3,
          routerLink: {
            name: 'hive-inspections',
            params: {
              id: this.hiveTag.hive_id,
            },
          },
          description: this.hiveTagActionDescriptions[3],
          deviceRequired: false,
          editableHiveRequired: false,
        },
        {
          id: 4,
          routerLink: {
            name: 'hive-edit',
            params: {
              id: this.hiveTag.hive_id,
            },
          },
          description: this.hiveTagActionDescriptions[4],
          deviceRequired: false,
          editableHiveRequired: true,
        },
        {
          id: 5,
          routerLink: {
            name: 'measurements-id',
            params: {
              id:
                this.selectedHive !== null &&
                this.selectedHive.sensors.length > 0
                  ? this.selectedHive.sensors[0]
                  : null,
            },
          },
          description: this.hiveTagActionDescriptions[5],
          deviceRequired: true,
          editableHiveRequired: false,
        },
      ]
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    possibleHiveTags() {
      var possibleHiveTags = []
      for (var i = 1; i < 41; i++) {
        possibleHiveTags.push((i < 10 ? '0' : '') + i.toString())
      }

      const existingHiveTags = this.hiveTags.map((hiveTag) => hiveTag.tag)

      possibleHiveTags = possibleHiveTags.filter(
        (el) => !existingHiveTags.includes(el)
      )

      return possibleHiveTags
    },
    selectedAction() {
      return this.hiveTag !== null && this.hiveTag.action_id !== null
        ? this.hiveTagActions.filter(
            (action) => action.id === this.hiveTag.action_id
          )[0]
        : null
    },
    selectedHive() {
      return this.hiveTag.hive_id !== null
        ? this.hivesObject[this.hiveTag.hive_id]
        : null
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
    tag() {
      return this.$route.params.id || null
    },
  },
  created() {
    this.readHiveTagsIfNotChecked().then((response) => {
      this.readApiariesAndGroupsIfNotPresent().then((response) => {
        if (
          this.tempSavedHiveTag !== null &&
          this.tag === this.tempSavedHiveTag.tag
        ) {
          this.hiveTag = { ...this.tempSavedHiveTag }
        } else if (!this.createMode) {
          this.setTempSavedHiveTag(null)

          var filteredHiveTags = this.hiveTags.filter(
            (hiveTag) => hiveTag.tag === this.tag
          )
          this.hiveTag =
            filteredHiveTags.length === 0 ? null : { ...filteredHiveTags[0] }
        }

        // If hivetag-create route is used, make empty hiveTag object
        else if (this.createMode) {
          this.setTempSavedHiveTag(null)
          this.hiveTag = {
            tag: this.tag,
            router_link: null,
            hive_id: null,
            action_id: null,
          }

          // if (this.tag === null && this.hiveTags.length > 0) {
          //   this.hiveTag.tag = this.possibleHiveTags[0]
          // }
        }
      })
    })
    this.setHiveTagEdited(false)
  },
  methods: {
    async createHiveTag() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest('/hive-tags', this.hiveTag)
          if (!response) {
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            return this.readHiveTags().then(() => {
              // this.$router.push({
              //   name: 'home',
              // })
              this.$router.push({
                name: 'hivetags',
              })
            })
          }, 50) // wait for API to update hive tags
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
    async updateHiveTag() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.updateRequest(
            '/hive-tags/',
            this.hiveTag.tag,
            this.hiveTag
          )
          if (!response) {
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
          }
          setTimeout(() => {
            return this.readHiveTags().then(() => {
              this.$router.push({
                name: 'hivetags',
              })
            })
          }, 50) // wait for API to update hive tags
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
    enableAction(hiveTagAction) {
      return (
        this.selectedHive === null ||
        ((!hiveTagAction.deviceRequired ||
          (hiveTagAction.deviceRequired &&
            this.selectedHive !== null &&
            this.selectedHive.sensors.length > 0)) &&
          (!hiveTagAction.editableHiveRequired ||
            (hiveTagAction.editableHiveRequired &&
              this.selectedHive !== null &&
              (this.selectedHive.editable || this.selectedHive.owner))))
      )
    },
    getEditableHives(hiveSet) {
      // var allHives = hiveSet.hives.map((hive) => hive.id)
      if (this.selectedAction !== null) {
        if (this.selectedAction.deviceRequired) {
          return hiveSet.hives
            .filter((hive) => hive.sensors.length > 0)
            .map((hive) => hive.id)
        } else if (this.selectedAction.editableHiveRequired && hiveSet.users) {
          return hiveSet.hives
            .filter((hive) => hive.editable || hive.owner)
            .map((hive) => hive.id)
        } else {
          return hiveSet.hives.map((hive) => hive.id)
        }
      } else {
        return hiveSet.hives.map((hive) => hive.id)
      }
    },
    saveHiveTag() {
      if (this.createMode) {
        this.createHiveTag()
      } else {
        this.updateHiveTag()
      }
    },
    selectHive(id) {
      this.hiveTag.hive_id = this.hiveTag.hive_id !== id ? id : null
      this.hiveTag.router_link = this.selectedAction.routerLink // re-set router link as it is now filled with a (different) hive id
      this.setHiveTagEdited(true)
    },
    selectAction(actionId) {
      this.hiveTag.action_id = actionId
      this.hiveTag.router_link = this.selectedAction.routerLink
      this.setHiveTagEdited(true)
    },
    setHiveTagEdited(bool) {
      this.$store.commit('hives/setData', {
        prop: 'hiveTagEdited',
        value: bool,
      })
      if (bool === true) {
        this.setTempSavedHiveTag(this.hiveTag)
      }
    },
    setTempSavedHiveTag(hivetag) {
      this.$store.commit('hives/setData', {
        prop: 'tempSavedHiveTag',
        value: hivetag,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.hivetag-wrapper {
  width: 180px;
  @include for-phone-only {
    width: 135px;
  }
}

.tr--active {
  background-color: $color-orange-light;
}
</style>
