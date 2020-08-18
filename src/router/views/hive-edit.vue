<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`" :no-box-shadow="true">
    <h1
      v-if="activeHive && activeHive.name !== undefined && !activeHive.editable"
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
          activeHive && activeHive.name !== undefined && activeHive.editable
        "
        class="hive-edit-bar"
        dense
        light
      >
        <v-spacer></v-spacer>
        <v-icon
          v-if="activeHive.owner"
          dark
          class="mr-4"
          color="red"
          @click="deleteHive"
          >mdi-delete</v-icon
        >
        <v-btn icon type="submit" :disabled="!valid">
          <v-icon dark color="primary">mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="
          activeHive && activeHive.name !== undefined && activeHive.editable
        "
        class="hive-edit-content"
      >
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-if="activeHive"
                  :value="activeHive.name"
                  class="hive-edit-name mb-3"
                  counter="30"
                  :rules="requiredRule"
                  required
                  @input="updateHive($event, 'name')"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <HiveEditDetails :hive="activeHive"></HiveEditDetails>

            <v-row class="queen-details-wrapper">
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
                          :value="
                            activeHive.queen ? activeHive.queen.name : null
                          "
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
                        <div
                          class="beep-label"
                          v-text="`${$t('Bee_race')}`"
                        ></div>
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
                            <v-btn
                              text
                              color="primary"
                              @click="cancelDatePicker"
                              >{{ $t('Cancel') }}</v-btn
                            >
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
                            activeHive.queen
                              ? activeHive.queen.description
                              : null
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
                        :value="
                          activeHive.queen ? activeHive.queen.clipped : false
                        "
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
                              class="flex-color-picker"
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
          </v-card-text>
        </v-card>
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

export default {
  components: {
    Confirm,
    HiveEditDetails,
    Layout,
    Treeselect,
  },
  mixins: [darkIconMixin, momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
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
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['beeRacesList']),
    queen() {
      return this.activeHive.queen
    },
    id() {
      return parseInt(this.$route.params.id)
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
    this.readHive()
    this.readTaxonomy()
  },
  methods: {
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
    async delete() {
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
    async saveHive() {
      if (this.$refs.form.validate()) {
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
    deleteHive() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('remove_hive') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.delete()
        })
        .catch((reject) => {
          return true
        })
    },
    updateQueenBirthDate() {
      this.$refs.dialog.save(this.queenBirthDate)
      if (this.activeHive.queen.color) {
        this.updateQueen(this.queenMarkColor, 'color')
      }
    },
    updateHive(event, property) {
      var value = null
      if (event === null) {
        value = null
      } else if (event.target !== undefined) {
        value = event.target.value
      } else {
        value = event
      }
      if (property === 'name' && value !== null && value.length > 31) {
        value = value.substring(0, 30)
      }
      this.activeHive[property] = value
      this.activeHive.frames = this.activeHive.layers[0].framecount
      this.$store.commit('hives/setEdited', true)
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
      this.$store.commit('hives/setEdited', true)
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
  },
}
</script>

<style lang="scss">
.unauthorized-title {
  padding-top: 40px;
  text-align: center;
}

.hive-edit-bar {
  position: fixed;
  z-index: 2;
  width: 100%;
  margin-top: -56px;
  background-color: $color-orange-light !important;
  border-bottom: 1px solid #fff5e2 !important;
  box-shadow: none !important;
}
.hive-edit-content {
  margin-top: 56px;
}
.hive-edit-name {
  padding-top: 0 !important;
  font-size: 2rem;

  input {
    min-height: 36px;
    padding-top: 0 !important;
  }
}

.flex-color-picker {
  display: flex;
  flex-direction: column;
  .v-color-picker__controls {
    order: 2;
  }
  .v-color-picker__swatches {
    margin-top: 10px;
    .v-color-picker__swatch:nth-child(2) {
      .v-color-picker__color > div {
        border: 1px solid $color-grey-light;
      }
    }
  }
}

.queen-details {
  padding: 0 12px;
}
</style>
