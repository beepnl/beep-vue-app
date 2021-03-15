<template>
  <Layout :title="$t('Apiary_management')">
    <h1 v-if="hiveNotEditable" class="unauthorized-title">
      {{
        $t('sorry') +
          ', ' +
          $tc('hive', 1) +
          ' ' +
          activeHive.name +
          ' ' +
          $t('not_editable')
      }}
    </h1>

    <v-form v-else-if="ready" ref="form" v-model="valid">
      <v-toolbar v-if="ready" class="save-bar zindex4" dense light>
        <v-spacer></v-spacer>
        <v-btn
          tile
          outlined
          color="black"
          class="save-button-mobile-wide mr-1"
          :disabled="
            !valid || (selectedHiveIds && selectedHiveIds.length === 0)
          "
          @click.prevent="updateHives(selectedHives)"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="black"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{
            $t('Move') +
              ' ' +
              selectedHives.length +
              ' ' +
              $tc('Hive_short', selectedHives.length)
          }}
        </v-btn>
      </v-toolbar>

      <v-container v-if="ready" class="content-container">
        <v-row>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12" sm="7" md="12">
                <div
                  class="beep-label mt-n3 mt-sm-0"
                  v-text="$t('Current_apiary')"
                ></div>
                <Treeselect
                  v-if="sortedApiaries && sortedApiaries.length > 0"
                  v-model="selectedApiaryId"
                  :options="sortedApiaries"
                  :normalizer="normalizerApiary"
                  :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
                  :no-results-text="`${$t('no_results')}`"
                  @input="selectApiary($event), setApiaryEdited(true)"
                />
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="12"
                class="py-0 py-sm-3 mb-n4 mb-sm-0 mt-n3 mt-sm-1 mt-md-n4"
              >
                <v-switch
                  v-if="selectedApiary"
                  v-model="selectAllHives"
                  :label="$t('select_all_hives')"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="7">
            <ApiaryPreviewHiveSelector
              v-if="selectedApiary && allHives.length > 0"
              :hives="selectedApiary.hives"
              :hives-selected="selectedHiveIds"
              :hives-editable="allHives"
              :inspection-mode="true"
              @select-hive="selectHive($event)"
            ></ApiaryPreviewHiveSelector>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <div
              class="beep-label mt-n3 mt-sm-0"
              v-text="$t('New') + ' ' + $tc('location', 1)"
            ></div>
            <Treeselect
              v-if="sortedApiaries && sortedApiaries.length > 0"
              v-model="newApiaryId"
              :options="sortedApiaries"
              :normalizer="normalizerApiary"
              :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
              :no-results-text="`${$t('no_results')}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

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
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
    Treeselect,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      normalizerApiary(node) {
        return {
          id: node.id,
          label: node.name,
        }
      },
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      showLoadingIcon: false,
      valid: false,
      ready: false,
      selectedApiaryId: null,
      selectedApiary: null,
      selectedHiveIds: [],
      activeHive: null,
      hiveNotEditable: false,
      newApiaryId: null,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    allHives() {
      var allHives = []
      this.selectedApiary.hives.map((hive) => {
        allHives.push(hive.id)
      })
      return allHives
    },
    apiaryId() {
      return parseInt(this.$route.params.id)
    },
    hiveId() {
      return parseInt(this.$route.query.hiveId) || null
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    newApiaryName() {
      return this.apiaries.filter((apiary) => {
        return apiary.id === this.newApiaryId
      })[0].name
    },
    selectAllHives: {
      get() {
        return this.selectedHiveIds.length === this.selectedApiary.hives.length
      },
      set(value) {
        if (value === false) {
          this.selectedHiveIds = []
        } else {
          this.selectedHiveIds = this.allHives
        }
      },
    },
    selectedHives() {
      return this.selectedApiary.hives.filter(
        (hive) => this.selectedHiveIds.indexOf(hive.id) > -1
      )
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
  },
  created() {
    // If hive id is specified, first check if hive is present / accessible and editable
    if (this.hiveId !== null) {
      this.getActiveHive(this.hiveId).then(() => {
        this.getApiary()
      })
    } else {
      this.getApiary()
    }
    this.ready = true
  },
  methods: {
    async getActiveHive(id) {
      try {
        const response = await Api.readRequest('/hives/', id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        this.activeHive = response.data.hives[0]
        this.$store.commit('hives/setActiveHive', this.activeHive)
        if (!this.activeHive.editable) {
          this.hiveNotEditable = true
        }
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
    async readApiaries() {
      try {
        const response = await Api.readRequest('/locations')
        this.$store.commit('locations/setApiaries', response.data.locations)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async updateHive(hive) {
      try {
        // var hiveWithNewApiaryId = hive
        // hiveWithNewApiaryId.location_id = this.newApiaryId
        // console.log('updating hive ', hive.id, hiveWithNewApiaryId)
        const response = await Api.updateRequest('/hives/', hive.id, hive)
        if (!response) {
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
        return true
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
        return false
      }
    },
    updateHives(hives) {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        hives.map((hive) => {
          var hiveWithNewApiaryId = hive
          hiveWithNewApiaryId.location_id = this.newApiaryId
          this.updateHive(hiveWithNewApiaryId)
        })
      } else {
        return false
      }
      this.$store.commit('locations/setData', {
        prop: 'hiveSearch',
        value: this.newApiaryName, // set search term via store instead of query to overrule possible stored search terms
      })
      setTimeout(() => {
        this.showLoadingIcon = false
        return this.readApiaries().then(() => {
          this.$router.push({
            name: 'home',
          })
        })
      }, 300) // wait for API to update locations/hives
    },
    getApiary() {
      if (this.apiaries.length === 0) {
        // if apiaries are not in store, in case view is opened directly without loggin in (via localstorage)
        this.readApiaries().then(() => {
          this.selectInitialApiary()
        })
      } else {
        this.selectInitialApiary()
      }
    },
    selectApiary(id) {
      this.selectedHiveIds = []
      const apiary = this.apiaries.filter((apiary) => {
        return apiary.id === id
      })[0]
      if (apiary) {
        apiary.hives.map((hive) => {
          this.selectedHiveIds.push(hive.id)
        })
        // only when selecting the apiary from the queried hive Id, select just that hive
        if (this.hiveId && apiary.id === this.activeHive.location_id) {
          this.selectedHiveIds = [this.hiveId]
        }
        this.selectedApiary = apiary
        // If apiary id doesn't exist return 404
      } else {
        this.$router.push({
          name: '404',
          params: { resource: 'location' },
        })
      }
    },
    selectHive(id) {
      if (!this.selectedHiveIds.includes(id)) {
        this.selectedHiveIds.push(id)
      } else {
        this.selectedHiveIds.splice(this.selectedHiveIds.indexOf(id), 1)
      }
    },
    selectFirstApiaryFromList() {
      this.selectedApiaryId = this.sortedApiaries[0].id
      this.newApiaryId = this.sortedApiaries[0].id
      this.selectApiary(this.selectedApiaryId)
    },
    selectInitialApiary() {
      if (this.apiaryId) {
        this.selectedApiaryId = this.apiaryId
        this.newApiaryId = this.apiaryId
        this.selectApiary(this.apiaryId)
      } else if (this.hiveId) {
        // if no apiary is specified, select apiary via hive
        this.apiaryId = this.activeHive.location_id
        this.selectedApiaryId = this.apiaryId
        this.newApiaryId = this.apiaryId
        this.selectApiary(this.apiaryId)
      } else {
        this.selectFirstApiaryFromList()
      }
    },
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
  },
}
</script>

<style lang="scss" scoped></style>
