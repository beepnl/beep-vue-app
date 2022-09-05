<template>
  <Layout :title="$t('Apiary_management')">
    <v-form v-if="ready" ref="form" v-model="valid">
      <v-toolbar v-if="ready" class="save-bar zindex4" dense light>
        <v-spacer></v-spacer>
        <v-btn
          tile
          outlined
          color="black"
          class="save-button-mobile-wide mr-1"
          :disabled="
            !valid ||
              (selectedHiveIds && selectedHiveIds.length === 0) ||
              newApiaryId === undefined ||
              showLoadingIcon
          "
          @click.prevent="updateHives(selectedHives)"
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
                  @input="selectAllHives(), setApiaryEdited(true)"
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
                  v-model="allHivesSelected"
                  :label="$t('select_all_hives')"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="7">
            <ApiaryPreviewHiveSelector
              v-if="selectedApiary && allHiveIds.length > 0"
              :hives="selectedApiary.hives"
              :hives-selected="selectedHiveIds"
              :hives-editable="allHiveIds"
              :inspection-mode="true"
              @select-hive="selectHive($event), setApiaryEdited(true)"
            ></ApiaryPreviewHiveSelector>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <div
              class="beep-label mt-n3 mt-sm-0"
              v-text="$t('new_apiary')"
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
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

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
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { readGeneralInspections } from '@mixins/methodsMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
    Treeselect,
  },
  mixins: [readGeneralInspections],
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
      selectedHiveIds: [],
      newApiaryId: null,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    allHiveIds() {
      return this.getHiveIds(this.selectedApiary.hives)
    },
    apiaryId() {
      return parseInt(this.$route.params.id)
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
    allHivesSelected: {
      get() {
        return this.selectedHiveIds.length === this.allHiveIds.length
      },
      set(value) {
        if (value === false) {
          this.selectedHiveIds = []
        } else {
          this.selectedHiveIds = this.getHiveIds(this.selectedApiary.hives)
        }
      },
    },
    selectedApiary() {
      return this.apiaries.filter((apiary) => {
        return apiary.id === this.selectedApiaryId
      })[0]
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
    this.setApiaryEdited(false)
    if (this.apiaries.length === 0) {
      // if apiaries are not in store, in case view is opened directly without loggin in (via localstorage)
      this.readApiaries().then(() => {
        this.selectInitialApiaries()
        this.ready = true
      })
    } else {
      this.selectInitialApiaries()
      this.ready = true
    }
  },
  methods: {
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
    getHiveIds(hives) {
      return hives.map((hive) => hive.id)
    },
    selectAllHives() {
      this.selectedHiveIds = this.getHiveIds(this.selectedApiary.hives)
    },
    selectHive(id) {
      if (!this.selectedHiveIds.includes(id)) {
        this.selectedHiveIds.push(id)
      } else {
        this.selectedHiveIds.splice(this.selectedHiveIds.indexOf(id), 1)
      }
    },
    selectInitialApiaries() {
      this.selectedApiaryId = this.apiaryId
      this.newApiaryId = this.apiaryId
      this.selectAllHives()
    },
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    updateHives(hives) {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        hives.map((hive) => {
          var hiveWithNewApiaryId = { ...hive }
          hiveWithNewApiaryId.location_id = this.newApiaryId
          this.updateHive(hiveWithNewApiaryId)
        })
      } else {
        return false
      }
      // enable to filter by apiary hives were moved to (disabled on request because user wants to see apiary where hives were moved from as well)
      // this.$store.commit('locations/setData', {
      //   prop: 'hiveSearch',
      //   value: this.newApiaryName, // set search term via store instead of query to overrule possible stored search terms
      // })
      setTimeout(() => {
        return this.readApiaries().then(() => {
          this.readGeneralInspections()
          this.showLoadingIcon = false
          this.$router.push({
            name: 'home',
          })
        })
      }, 500) // wait for API to update locations/hives
    },
  },
}
</script>
