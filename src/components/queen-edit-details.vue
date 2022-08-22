<template>
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
                :value="queen ? queen.name : null"
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
                :value="queen ? queen.race_id : null"
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
                    clearable
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
                  <v-btn text color="accent" @click="cancelDatePicker">{{
                    $t('Cancel')
                  }}</v-btn>
                  <v-btn text color="accent" @click="updateQueenBirthDate">{{
                    $t('ok')
                  }}</v-btn>
                </v-date-picker>
              </v-dialog>
            </div>

            <div>
              <div class="beep-label" v-text="`${$t('Age')}`"></div>
              <p
                v-text="
                  queen
                    ? momentAge(queen.birth_date)
                    : `0` + ` ${$t('years_old')}`
                "
              >
              </p>
            </div>
          </v-col>
          <v-col cols="12" sm="7" md="6" lg="4">
            <div>
              <v-text-field
                :value="queen ? queen.description : null"
                :label="`${$t('Queen')} ${$t('queen_description')}`"
                height="36px"
                counter="100"
                clearable
                @input="updateQueen($event, 'description')"
              >
              </v-text-field>
            </div>

            <v-switch
              v-model="queenClipped"
              :label="`${$t('Queen_clipped')}`"
            ></v-switch>

            <v-switch
              v-model="queenFertilized"
              :label="`${$t('Queen_fertilized')}`"
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
</template>

<script>
import { darkIconMixin } from '@mixins/darkIconMixin'
import { mapGetters } from 'vuex'
import {
  momentAge,
  momentLastDigitOfYear,
  momentifyRemoveTime,
} from '@mixins/momentMixin'
import { readTaxonomy } from '@mixins/methodsMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    Treeselect,
  },
  mixins: [
    darkIconMixin,
    momentAge,
    momentLastDigitOfYear,
    momentifyRemoveTime,
    readTaxonomy,
  ],
  props: {
    queen: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: function() {
    return {
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
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['beeRacesList']),
    locale() {
      return this.$i18n.locale
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
      if (this.queen && this.queen.birth_date) {
        const lastDigit = this.momentLastDigitOfYear(this.queen.birth_date)
        return this.queen_colors[lastDigit]
      } else {
        const lastDigit = this.momentLastDigitOfYear(new Date())
        return this.queen_colors[lastDigit]
      }
    },
    queenBirthDate: {
      get() {
        if (this.queen && this.queen.birth_date !== null) {
          return this.momentifyRemoveTime(this.queen.birth_date)
        } else {
          return ''
        }
      },
      set(value) {
        this.updateQueen(value, 'birth_date')
      },
    },
    queenClipped: {
      get() {
        return this.queen.clipped === 1
      },
      set(value) {
        var setValue = value === true ? 1 : 0
        this.updateQueen(setValue, 'clipped')
      },
    },
    queenColor: {
      get() {
        if (this.queenHasColor && !this.useQueenMarkColor) {
          return this.queen.color
        } else {
          return this.queenMarkColor
        }
      },
      set(value) {
        this.updateQueen(value, 'color')
      },
    },
    queenFertilized: {
      get() {
        return this.queen.fertilized === 1
      },
      set(value) {
        var setValue = value === true ? 1 : 0
        this.updateQueen(setValue, 'fertilized')
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
    this.queenHasColor = this.queen.color !== null
  },
  methods: {
    cancelDatePicker() {
      this.useQueenMarkColor = false
      this.modal = false
      this.queenColor = this.queen.color
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
    toBoolean(int) {
      return int === 1
    },
    updateQueenBirthDate() {
      this.$refs.dialog.save(this.queenBirthDate)
      if (this.queen.color) {
        this.updateQueen(this.queenMarkColor, 'color')
      }
    },
    updateQueen(event, property) {
      var value = null
      if (event === null || typeof event === 'undefined') {
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
      if (property === 'birth_date') {
        this.useQueenMarkColor = true
      } else if (property === 'color') {
        this.useQueenMarkColor = false
      }
      this.queen[property] = value
      this.setHiveEdited(true)
    },
  },
}
</script>

<style lang="scss">
.queen-details {
  padding: 0 12px;
}
</style>
