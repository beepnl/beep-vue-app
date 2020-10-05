<template>
  <Layout
    :title="
      locationId
        ? `${$t('create_new')} ${$tc('hive', 1)}`
        : `${$t('edit')} ${$tc('hive', 1)}`
    "
    :no-box-shadow="true"
  >
    <h1
      v-if="
        locationId === null &&
          activeHive &&
          typeof activeHive.name !== 'undefined' &&
          !activeHive.editable &&
          !activeHive.owner
      "
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('hive', 1) +
          ' "' +
          activeHive.name +
          '" ' +
          $t('not_editable')
      }}
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
          v-if="activeHive.owner"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteHive"
          >mdi-delete</v-icon
        >
        <v-btn class="mr-n2" icon type="submit" :disabled="!valid">
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
      </v-toolbar>

      <v-container
        v-if="
          activeHive &&
            ((activeHive.name !== undefined && activeHive.editable) ||
              locationId !== null)
        "
        class="content-container"
      >
        <v-row>
          <v-col cols="12" sm="6" md="4">
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
              <div class="beep-label" v-text="`${$tc('Location', 1)}`"></div>
              <Treeselect
                v-if="apiaries !== null"
                v-model="activeHive.location_id"
                :options="apiaries"
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

          <v-col cols="12" sm="6" md="4">
            <div>
              <div class="beep-label" v-text="`${$t('Hive_order')}`"></div>
              <VueNumberInput
                v-if="activeHive"
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

        <HiveEditDetails :hive="activeHive"></HiveEditDetails>

        <v-row id="queen-details" class="queen-details-wrapper">
          <v-col cols="12">
            <div
              class="overline mb-3"
              v-text="`${$t('Queen') + ' ' + $t('details')}`"
            ></div>
            <div class="queen-details rounded-border">
              <v-row>
                <v-col cols="12" sm="7" md="6" lg="4">
                  <div>
                    <v-text-field
                      :value="activeHive.queen ? activeHive.queen.name : null"
                      :label="`${$t('Queen')} ${$t('name')}`"
                      :placeholder="`${$t('Queen')} ${$t('name')}`"
                      height="36px"
                      class="queen-name"
                      counter="30"
                      clearable
                      @input="updateQueen($event, 'name')"
                    >
                    </v-text-field>
                  </div>

                  <div>
                    <div class="beep-label" v-text="`${$t('Bee_race')}`"></div>
                    <Treeselect
                      :value="
                        activeHive.queen ? activeHive.queen.race_id : null
                      "
                      :options="treeselectBeeRaces"
                      :no-results-text="`${$t('no_results')}`"
                      :label="`${$t('Select')} ${$t('Bee_race')}`"
                      :placeholder="`${$t('Select')} ${$t('Bee_race')}`"
                      search-nested
                      @input="updateQueen($event, 'race_id')"
                    />
                  </div>

                  <div class="mt-5">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="queenBirthDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="queenBirthDate"
                          :label="
                            `${$t('Birth_date')} ${
                              showQueenColorPicker
                                ? '(' + $t('changes_queen_color') + ')'
                                : ''
                            }`
                          "
                          height="36px"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="queenBirthDate"
                        :first-day-of-week="1"
                        :locale="locale"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="cancelDatePicker">{{
                          $t('Cancel')
                        }}</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="updateQueenBirthDate"
                          >{{ $t('ok') }}</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>
                  </div>

                  <div>
                    <div class="beep-label" v-text="`${$t('Age')}`"></div>
                    <p
                      v-text="
                        activeHive.queen
                          ? momentAge(activeHive.queen.created_at)
                          : `0` + ` ${$t('years_old')}`
                      "
                    >
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="7" md="6" lg="4">
                  <div>
                    <v-text-field
                      :value="
                        activeHive.queen ? activeHive.queen.description : null
                      "
                      :label="`${$t('Queen')} ${$t('queen_description')}`"
                      height="36px"
                      counter="100"
                      clearable
                      @input="updateQueen($event, 'description')"
                    >
                    </v-text-field>
                  </div>

                  <v-switch
                    :value="activeHive.queen ? activeHive.queen.clipped : false"
                    :label="`${$t('Queen_clipped')}`"
                    @change="updateQueen($event, 'clipped')"
                  ></v-switch>

                  <v-switch
                    :value="
                      activeHive.queen ? activeHive.queen.fertilized : false
                    "
                    :label="`${$t('Queen_fertilized')}`"
                    @change="updateQueen($event, 'fertilized')"
                  ></v-switch>

                  <v-switch
                    v-model="showQueenColorPicker"
                    :label="`${$t('Queen_colored')}`"
                  ></v-switch>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <div v-if="showQueenColorPicker">
                    <div
                      class="beep-label"
                      v-text="`${$t('Queen')} ${$t('color')}`"
                    ></div>
                    <div>
                      <div>
                        <div class="mr-2 mb-2">
                          <v-sheet
                            :class="
                              `beep-icon beep-icon-queen beep-icon-queen--large ${
                                darkIconColor(queenColor) ? 'dark' : ''
                              }`
                            "
                            :color="queenColor"
                          >
                          </v-sheet>
                        </div>
                        <v-color-picker
                          v-model="queenColor"
                          class="flex-color-picker queen-color-picker"
                          :swatches="swatchesQueen"
                          show-swatches
                          canvas-height="120"
                        ></v-color-picker>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import { darkIconMixin } from '@mixins/darkIconMixin'
import HiveEditDetails from '@components/hive-edit-details.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    Confirm,
    HiveEditDetails,
    Layout,
    Treeselect,
    VueNumberInput,
  },
  mixins: [darkIconMixin, momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      apiaries: null,
      normalizerApiary(node) {
        return {
          id: node.id,
          label: node.name,
        }
      },
      queen_colors: [
        '#4A90E2',
        '#F4F4F4',
        '#F8DB31',
        '#D0021B',
        '#7ED321',
        '#4A90E2',
        '#F4F4F4',
        '#F8DB31',
        '#D0021B',
        '#7ED321',
      ], // year ending of birth year is index
      swatchesQueen: [
        ['#4A90E2'],
        ['#F4F4F4'],
        ['#F8DB31'],
        ['#D0021B'],
        ['#7ED321'],
      ],
      modal: false,
      useQueenMarkColor: false,
      queenHasColor: false,
      activeHive: null,
      valid: false,
      showLoadingIcon: false,
      newHiveNumber: 1,
    }
  },
  computed: {
    ...mapGetters('hives', ['hiveEdited']),
    ...mapGetters('taxonomy', ['beeRacesList']),
    queen() {
      return this.activeHive.queen
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    locationId() {
      return parseInt(this.$route.query.locationId) || null
    },
    locale() {
      return this.$i18n.locale
    },
    requiredRule: function() {
      return [
        (v) => !!v || this.$i18n.t('Name') + ' ' + this.$i18n.t('is_required'),
      ]
    },
    treeselectBeeRaces() {
      if (this.beeRacesList.length) {
        const locale = this.selectLocale(this.beeRacesList)
        var treeselectArray = this.beeRacesList
        treeselectArray.map((beeRace) => {
          beeRace.label = beeRace.trans[locale]
        })
        const sortedTreeselectArray = treeselectArray
          .slice()
          .sort(function(a, b) {
            if (a.label < b.label) {
              return -1
            }
            if (a.label > b.label) {
              return 1
            }
            return 0
          })
        treeselectArray = sortedTreeselectArray
        return treeselectArray
      } else {
        return []
      }
    },
    queenMarkColor() {
      if (
        this.activeHive &&
        this.activeHive.queen &&
        this.activeHive.queen.created_at
      ) {
        const lastDigit = this.momentLastDigitOfYear(
          this.activeHive.queen.created_at
        )
        return this.queen_colors[lastDigit]
      } else {
        const lastDigit = this.momentLastDigitOfYear(new Date())
        return this.queen_colors[lastDigit]
      }
    },
    queenBirthDate: {
      get() {
        if (
          this.activeHive &&
          this.activeHive.queen &&
          this.activeHive.queen.created_at
        ) {
          return this.momentifyRemoveTime(this.activeHive.queen.created_at)
        } else if (this.activeHive) {
          return this.momentifyRemoveTime(new Date())
        } else {
          return ''
        }
      },
      set(value) {
        this.updateQueen(value, 'created_at')
      },
    },
    queenColor: {
      get() {
        if (this.queenHasColor && !this.useQueenMarkColor) {
          return this.activeHive.queen.color
        } else {
          return this.queenMarkColor
        }
      },
      set(value) {
        this.updateQueen(value, 'color')
      },
    },
    showQueenColorPicker: {
      get() {
        return this.queenHasColor
      },
      set(value) {
        if (value === false) {
          this.updateQueen(null, 'color')
          this.queenHasColor = false
        } else {
          this.updateQueen(this.queenMarkColor, 'color')
          this.queenHasColor = true
        }
      },
    },
  },
  created() {
    this.readTaxonomy()
    this.readApiaries().then((response) => {
      // If hive-create route is used, make empty hive object
      if (this.locationId !== null) {
        if (this.apiaries.length > 0) {
          const apiary = this.apiaries.filter((apiary) => {
            return apiary.id === this.locationId
          })[0]
          console.log(apiary)
          this.newHiveNumber = apiary.hives.length + 1
        }
        this.activeHive = {
          location_id: this.locationId,
          hive_type_id: null,
          color: '#F29100',
          name: this.$i18n.tc('Hive', 1) + ' ' + this.newHiveNumber,
          bb_width_cm: null,
          bb_depth_cm: null,
          bb_height_cm: null,
          fr_width_cm: null,
          fr_height_cm: null,
          order: null,
          layers: [
            {
              color: '#ffa000',
              type: 'honey',
              order: 3,
              framecount: 10,
              key: 3,
            },
            {
              color: '#ffa000',
              type: 'brood',
              order: 2,
              framecount: 10,
              key: 2,
            },
            {
              color: '#ffa000',
              type: 'brood',
              order: 1,
              framecount: 10,
              key: 1,
            },
          ],
          queen: {
            clipped: null,
            color: null,
            created_at: null,
            description: null,
            fertilized: null,
            name: null,
          },
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
          const response = await this.$store.dispatch(
            'hives/createHive',
            this.activeHive
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
            })
          }, 300) // wait for API to update locations/hives
        } catch (error) {
          console.log(error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
      }
    },
    async deleteHive() {
      try {
        const response = await this.$store.dispatch(
          'hives/deleteHive',
          this.activeHive.id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.$router.push({
            name: 'home',
          })
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async readApiaries() {
      try {
        const response = await this.$store.dispatch('locations/findAll')
        this.apiaries = response.locations
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async readHive() {
      try {
        const response = await this.$store.dispatch('hives/findById', this.id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.hives[0]
        if (hive.queen && hive.queen.color && hive.queen.color !== null) {
          this.queenHasColor = true
        } else if (hive.queen === null) {
          hive.queen = {
            clipped: null,
            color: null,
            created_at: null,
            description: null,
            fertilized: null,
            name: null,
          }
        }
        this.activeHive = hive
        this.setHiveEdited(false)
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async readTaxonomy() {
      try {
        const response = await this.$store.dispatch('taxonomy/index')
        if (response.length === 0) {
          this.$router.push({ name: '404' })
        }
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404' })
      }
    },
    async updateHive() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await this.$store.dispatch(
            'hives/saveHiveSettings',
            this.activeHive
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
            })
          }, 300) // wait for API to update locations/hives
        } catch (error) {
          console.log(error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
      }
    },
    cancelDatePicker() {
      this.useQueenMarkColor = false
      this.modal = false
      this.queenColor = this.activeHive.queen.color
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
    saveHive() {
      if (this.locationId !== null) {
        this.createHive()
      } else {
        this.updateHive()
      }
    },
    selectLocale(array) {
      if (array.length) {
        const locale = this.$i18n.locale
        if (array[0].trans[locale] === undefined) {
          return 'en'
        } else {
          return locale
        }
      } else {
        return 'en'
      }
    },
    setHiveEdited(bool) {
      this.$store.commit('hives/setHiveEdited', bool)
    },
    updateQueenBirthDate() {
      this.$refs.dialog.save(this.queenBirthDate)
      if (this.activeHive.queen.color) {
        this.updateQueen(this.queenMarkColor, 'color')
      }
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
    updateQueen(event, property) {
      var value = null
      if (event === null) {
        value = null
      } else if (event.target !== undefined) {
        value = event.target.value
      } else {
        value = event
      }
      if (property === 'description' && value !== null && value.length > 101) {
        value = value.substring(0, 100)
      }
      if (property === 'name' && value !== null && value.length > 31) {
        value = value.substring(0, 30)
      }
      if (property === 'created_at') {
        this.useQueenMarkColor = true
      } else if (property === 'color') {
        this.useQueenMarkColor = false
      }
      this.activeHive.queen[property] = value
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
  font-size: 2rem;
  @include for-tablet-portrait-up {
    margin-top: 19px;
  }

  input {
    min-height: 36px;
    padding-top: 0 !important;
  }
}

.hive-number-input {
  max-width: 130px !important;
}

.queen-details {
  padding: 0 12px;
}
</style>
