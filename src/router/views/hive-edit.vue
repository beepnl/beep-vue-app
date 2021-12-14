<template>
  <Layout :title="getTitle()">
    <h1
      v-if="
        !hiveCreateMode &&
          activeHive &&
          typeof activeHive.name !== 'undefined' &&
          !activeHive.editable &&
          !activeHive.owner
      "
      class="unauthorized-title"
      v-text="unauthorizedText"
    >
    </h1>

    <v-form ref="form" v-model="valid">
      <v-toolbar
        v-if="
          activeHive &&
            ((activeHive.name !== undefined &&
              (activeHive.editable || activeHive.owner)) ||
              hiveCreateMode)
        "
        class="save-bar"
        dense
        light
      >
        <v-spacer></v-spacer>
        <v-icon
          v-if="activeHive.owner && !queenEditMode"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteHive"
          >mdi-delete</v-icon
        >
        <v-btn
          tile
          outlined
          color="black"
          :class="
            `${
              queenEditMode || hiveCreateMode ? 'save-button-mobile-wide' : ''
            } mr-1`
          "
          :disabled="
            !valid ||
              typeof activeHive.location_id === 'undefined' ||
              showLoadingIcon
          "
          @click.prevent="saveHive"
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

      <v-container
        v-if="
          activeHive &&
            ((activeHive.name !== undefined &&
              (activeHive.editable || activeHive.owner)) ||
              hiveCreateMode)
        "
        class="content-container"
      >
        <v-row v-if="!queenEditMode">
          <v-col
            v-if="
              activeHive.location === null &&
                (apiaries === null || apiaries.length === 0)
            "
            cols="12"
          >
            <p class="red--text mt-3"
              >{{ $t('no_apiaries_yet') }}
              <router-link
                :to="{
                  name: `apiary-create`,
                }"
              >
                <div class="color-accent"
                  ><v-icon color="accent" left>mdi-plus-circle</v-icon
                  >{{ $t('first_create_apiary') }}</div
                >
              </router-link>
            </p>
          </v-col>

          <v-col cols="12" sm="8" md="6" lg="5">
            <v-text-field
              v-if="activeHive"
              v-model="activeHive.name"
              class="hive-edit-name mb-sm-3"
              counter="30"
              :rules="requiredRule"
              required
              @input="validateText($event, 'name', 30)"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <div>
              <div
                :class="
                  `beep-label ${
                    isNaN(activeHive.location_id) ? 'red--text' : ''
                  }`
                "
                v-text="$tc('Location', 1) + '*'"
              ></div>
              <Treeselect
                v-if="
                  activeHive &&
                    (activeHive.owner || hiveCreateMode) &&
                    apiaries !== null
                "
                v-model="activeHive.location_id"
                :options="sortedApiaries"
                :normalizer="normalizerApiary"
                :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
                :no-results-text="`${$t('no_results')}`"
                @input="setHiveEdited(true)"
              />

              <v-select
                v-if="!activeHive.owner && !hiveCreateMode"
                v-model="activeHive.location"
                class="pt-1"
                :items="singleLocationArray"
                disabled
              />

              <div
                v-if="isNaN(activeHive.location_id)"
                class="v-text-field__details mt-1"
                ><div class="v-messages theme--light error--text" role="alert"
                  ><div class="v-messages__wrapper"
                    ><div class="v-messages__message">{{
                      this.$i18n.t('this_field') +
                        ' ' +
                        this.$i18n.t('is_required')
                    }}</div></div
                  ></div
                ></div
              >
            </div>
          </v-col>

          <v-col
            v-if="activeHive || (activeHive && hiveCreateMode)"
            cols="12"
            sm="6"
            md="4"
          >
            <div>
              <div class="beep-label" v-text="$t('Hive_order')"></div>
              <el-input-number
                :value="activeHive.order === null ? 0 : activeHive.order"
                size="medium"
                @change="updateOrder($event)"
              ></el-input-number>
            </div>
          </v-col>
        </v-row>

        <HiveEditDetails
          v-if="!queenEditMode"
          :hive="activeHive"
        ></HiveEditDetails>

        <QueenEditDetails
          v-if="queenEditMode || hiveCreateMode"
          :queen="activeHive.queen"
        ></QueenEditDetails>
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
import Confirm from '@components/confirm.vue'
import HiveEditDetails from '@components/hive-edit-details.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import QueenEditDetails from '@components/queen-edit-details.vue'
import {
  readApiariesAndGroups,
  readApiariesAndGroupsIfNotPresent,
  readDevices,
  readGeneralInspections,
} from '@mixins/methodsMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Confirm,
    HiveEditDetails,
    Layout,
    QueenEditDetails,
    Treeselect,
  },
  mixins: [
    readApiariesAndGroups,
    readApiariesAndGroupsIfNotPresent,
    readDevices,
    readGeneralInspections,
  ],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      normalizerApiary(node) {
        return {
          id: node.id,
          label: node.name,
        }
      },
      activeHive: null,
      emptyQueen: {
        clipped: null,
        color: null,
        created_at: null,
        description: null,
        fertilized: null,
        name: null,
      },
      valid: false,
      showLoadingIcon: false,
      newHiveNumber: 1,
      newHiveLocation: null,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('hives', ['hiveEdited']),
    ...mapGetters('locations', ['apiaries']),
    hiveCreateMode() {
      return this.$route.name === 'hive-create'
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    locationId() {
      return parseInt(this.$route.query.locationId) || null
    },
    queenEditMode() {
      return this.$route.name === 'queen-edit' || this.$route.query.queenEdit
    },
    requiredRule: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('Name') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
    singleLocationArray() {
      return this.activeHive !== null ? [this.activeHive.location] : []
    },
    sortedApiaries() {
      var sortedApiaries = this.apiaries.slice().sort(function(a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      return sortedApiaries
    },
    unauthorizedText() {
      if (this.queenEditMode) {
        return (
          this.$i18n.t('sorry') +
          ', ' +
          this.$i18n.t('queen') +
          ' ' +
          this.$i18n.t('not_editable')
        )
      } else {
        return (
          this.$i18n.t('sorry') +
          ', ' +
          this.$i18n.tc('hive', 1) +
          ' "' +
          this.activeHive.name +
          '" ' +
          this.$i18n.t('not_editable')
        )
      }
    },
  },
  created() {
    // If hive-create route is used, make empty hive object
    if (this.hiveCreateMode) {
      this.readApiariesAndGroupsIfNotPresent().then(() => {
        if (this.apiaries.length > 0) {
          var selectedApiary = this.sortedApiaries[0]
          var selectedLocationId = selectedApiary.id
          this.newHiveLocation = null
          if (this.locationId !== null) {
            selectedLocationId = this.locationId
            selectedApiary = this.apiaries.filter((apiary) => {
              return apiary.id === this.locationId
            })[0]
            this.newHiveLocation = selectedApiary.name
          }
          this.newHiveNumber = selectedApiary.hives.length + 1
        }
        this.activeHive = {
          location_id: selectedLocationId,
          location: this.newHiveLocation,
          hive_type_id: null,
          color: '#F8B133',
          name: this.$i18n.tc('Hive', 1) + ' ' + this.newHiveNumber,
          bb_width_cm: null,
          bb_depth_cm: null,
          bb_height_cm: null,
          fr_width_cm: null,
          fr_height_cm: null,
          order: this.newHiveNumber,
          layers: [
            {
              color: '#F8B133',
              type: 'honey',
              order: 3,
              framecount: 10,
              key: 3,
            },
            {
              color: '#F8B133',
              type: 'brood',
              order: 2,
              framecount: 10,
              key: 2,
            },
            {
              color: '#F8B133',
              type: 'brood',
              order: 1,
              framecount: 10,
              key: 1,
            },
          ],
          queen: this.emptyQueen,
        }
      })
      // Else retrieve to-be-edited hive
    } else {
      this.readHive().then(() => {
        if (this.activeHive.owner) {
          this.readApiariesAndGroupsIfNotPresent()
        }
      })
    }
  },
  methods: {
    async createHive() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest('/hives', this.activeHive)
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            const location = response.data.hives[0].location
            return this.readApiariesAndGroups().then(() => {
              this.$store.commit('locations/setData', {
                prop: 'hiveFilterByGroup',
                value: 'off',
              })
              this.$store.commit('locations/setData', {
                prop: 'hiveSearch',
                value: location, // set search term via store instead of query to overrule possible stored search terms
              })
              this.$router.push({
                name: 'home',
              })
            })
          }, 50) // wait for API to update locations/hives
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
          this.showLoadingIcon = false
        }
      }
    },
    async deleteHive() {
      try {
        const response = await Api.deleteRequest('/hives/', this.activeHive.id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.readApiariesAndGroups().then(() => {
            this.readGeneralInspections() // update inspections to exclude those from deleted hive
            this.readDevices() // update devices to remove deleted hives coupled to devices
            this.$store.commit('locations/setData', {
              prop: 'hiveFilterByGroup',
              value: 'off',
            })
            this.$store.commit('locations/setData', {
              prop: 'hiveSearch',
              value: this.activeHive.location, // set search term via store instead of query to overrule possible stored search terms
            })
            this.$router.push({
              name: 'home',
            })
          })
        }, 50) // wait for API to update locations/hives
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
      }
    },
    async readHive() {
      try {
        const response = await Api.readRequest('/hives/', this.id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.data.hives[0]
        if (hive.queen && hive.queen.color && hive.queen.color !== null) {
          this.queenHasColor = true
        } else if (hive.queen === null) {
          hive.queen = this.emptyQueen
        }
        this.activeHive = hive
        this.setHiveEdited(false)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 404) {
            this.$router.push({ name: '404', params: { resource: 'hive' } })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async updateHive() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        this.activeHive.frames =
          this.activeHive.layers.length > 0
            ? this.activeHive.layers[0].framecount
            : 10
        try {
          const response = await Api.updateRequest(
            '/hives/',
            this.activeHive.id,
            this.activeHive
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.readApiariesAndGroups().then(() => {
              this.readGeneralInspections() // retrieve hive action inspections
              this.readDevices() // update devices to reflect updated hive names for example
              this.$router.push({
                name: 'home',
              })
            })
          }, 50) // wait for API to update locations/hives
        } catch (error) {
          console.log('update hive', error)
          if (error.response) {
            console.log('Error: ', error.response)
            const msg = error.response.data.message
            this.snackbar.text = msg
          } else {
            console.log('Error: ', error)
            this.snackbar.text = this.$i18n.t('something_wrong')
          }
          this.snackbar.show = true
        }
      }
    },
    confirmDeleteHive() {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_hive'),
          this.$i18n.t('remove_hive') + ' "' + this.activeHive.name + '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteHive()
        })
        .catch((reject) => {
          return true
        })
    },
    getTitle() {
      if (this.hiveCreateMode) {
        return this.$i18n.t('create_new') + ' ' + this.$i18n.tc('hive', 1)
      } else if (this.queenEditMode && this.activeHive !== null) {
        const queenName = this.activeHive.queen.name || ''
        return (
          this.$i18n.t('edit') +
          ' ' +
          this.$i18n.t('queen') +
          ' ' +
          queenName +
          ' - ' +
          this.activeHive.name
        )
      } else if (this.activeHive !== null) {
        return this.$i18n.t('edit') + ' ' + this.$i18n.tc('hive', 1)
      } else {
        return this.$i18n.t('edit') + '...'
      }
    },
    saveHive() {
      if (this.hiveCreateMode) {
        this.createHive()
      } else {
        this.updateHive()
      }
    },
    setHiveEdited(bool) {
      this.$store.commit('hives/setHiveEdited', bool)
    },
    updateOrder(value) {
      this.activeHive.order = value
      this.setHiveEdited(true)
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeHive[property] = value
      }
      this.setHiveEdited(true)
    },
  },
}
</script>

<style lang="scss">
.hive-edit-name {
  padding-top: 0 !important;
  font-size: 1.6rem;
  @include for-tablet-portrait-up {
    margin-top: 19px;
  }
  @include for-tablet-landscape-up {
    font-size: 2rem;
  }

  input {
    min-height: 36px;
    padding-top: 0 !important;
  }
}
</style>
