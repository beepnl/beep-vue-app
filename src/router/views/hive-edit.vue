<template>
  <Layout :title="getTitle()">
    <h1
      v-if="
        locationId === null &&
          activeHive &&
          typeof activeHive.name !== 'undefined' &&
          !activeHive.editable &&
          !activeHive.owner
      "
      class="unauthorized-title"
      v-text="unauthorizedText"
    >
    </h1>

    <v-form ref="form" v-model="valid" @submit.prevent="saveHive">
      <v-toolbar
        v-if="
          activeHive &&
            ((activeHive.name !== undefined && activeHive.editable) ||
              locationId !== null)
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
          v-if="!queenEditMode"
          class="mr-n2"
          icon
          type="submit"
          :disabled="!valid"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" dark color="primary"
            >mdi-check</v-icon
          >
        </v-btn>

        <v-btn
          v-if="queenEditMode"
          tile
          outlined
          color="primary"
          class="save-button mr-1"
          type="submit"
          :disabled="!valid"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') + ' ' + $t('queen') }}
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="
          activeHive &&
            ((activeHive.name !== undefined && activeHive.editable) ||
              locationId !== null)
        "
        class="content-container"
      >
        <v-row v-if="!queenEditMode">
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

          <v-col
            v-if="
              activeHive &&
                (activeHive.owner || hiveCreateMode) &&
                apiaries !== null
            "
            cols="12"
            sm="6"
            md="4"
          >
            <div>
              <div class="beep-label" v-text="`${$tc('Location', 1)}`"></div>
              <Treeselect
                v-model="activeHive.location_id"
                :options="sortedApiaries"
                :normalizer="normalizerApiary"
                :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
                :no-results-text="`${$t('no_results')}`"
                :disabled="!activeHive.owner"
                @input="setHiveEdited(true)"
              />
              <p v-if="apiaries === null" class="color-grey-medium mt-3">{{
                $t('no_apiaries_yet')
              }}</p>
            </div>
          </v-col>

          <v-col
            v-if="activeHive && (activeHive.owner || hiveCreateMode)"
            cols="12"
            sm="6"
            md="4"
          >
            <div>
              <div class="beep-label" v-text="`${$t('Hive_order')}`"></div>
              <VueNumberInput
                :value="activeHive.order"
                class="hive-number-input"
                :step="1"
                inline
                controls
                @click="setHiveEdited(true)"
                @change="updateHiveProperties(parseInt($event), 'order')"
              ></VueNumberInput>
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
      <v-btn color="primary" text @click="snackbar.show = false">
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    Confirm,
    HiveEditDetails,
    Layout,
    QueenEditDetails,
    Treeselect,
    VueNumberInput,
  },
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
    }
  },
  computed: {
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
          this.$i18n.t('the field') +
            ' "' +
            this.$i18n.t('Name') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
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
    this.readApiariesIfNotPresent().then(() => {
      // If hive-create route is used, make empty hive object
      if (this.hiveCreateMode && this.locationId !== null) {
        if (this.apiaries.length > 0) {
          const apiary = this.apiaries.filter((apiary) => {
            return apiary.id === this.locationId
          })[0]
          this.newHiveNumber = apiary.hives.length + 1
        }
        this.activeHive = {
          location_id: this.locationId,
          hive_type_id: null,
          color: '#F8B133',
          name: this.$i18n.tc('Hive', 1) + ' ' + this.newHiveNumber,
          bb_width_cm: null,
          bb_depth_cm: null,
          bb_height_cm: null,
          fr_width_cm: null,
          fr_height_cm: null,
          order: null,
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
        // Else retrieve to-be-edited hive
      } else {
        this.readHive()
      }
    })
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
          }
          setTimeout(() => {
            return this.readApiariesOrGroups().then(() => {
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
          return this.readApiariesOrGroups().then(() => {
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
    async readApiariesIfNotPresent() {
      if (this.apiaries.length === 0) {
        try {
          const response = await Api.readRequest('/locations')
          this.$store.commit('locations/setApiaries', response.data.locations)
          return true
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.message
            console.log(msg)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    async readApiariesOrGroups() {
      try {
        if (this.activeHive.owner || this.hiveCreateMode) {
          const response = await Api.readRequest('/locations')
          this.$store.commit('locations/setApiaries', response.data.locations)
        } else {
          const response = await Api.readRequest('/groups')
          this.$store.commit('groups/setGroups', response.data.groups)
        }
        return true
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
        }
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
        console.log('Error: ', error)
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async updateHive() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
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
            return this.readApiariesOrGroups().then(() => {
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
      if (this.locationId) {
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
      if (this.locationId !== null) {
        this.createHive()
      } else {
        this.updateHive()
      }
    },
    setHiveEdited(bool) {
      this.$store.commit('hives/setHiveEdited', bool)
    },
    updateHiveProperties(event, property) {
      var value = null
      if (event === null) {
        value = null
      } else if (event.target !== undefined) {
        value = event.target.value
      } else {
        value = event
      }
      this.activeHive[property] = value
      this.activeHive.frames = this.activeHive.layers[0].framecount
      if (property !== 'order') {
        this.setHiveEdited(true) // NB edited tracking for vue-number-input component inputs happens only via @click event as it calls @change when component is initialized, before any changes are made
      }
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

.hive-number-input {
  max-width: 130px !important;
}
</style>
