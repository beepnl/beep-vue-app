<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`" :no-box-shadow="true">
    <h1
      v-if="activeHive.name !== undefined && !activeHive.editable"
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

    <v-toolbar
      v-if="activeHive.name !== undefined && activeHive.editable"
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
      <v-icon dark color="primary" @click="save">mdi-check</v-icon>
    </v-toolbar>

    <v-container
      v-if="activeHive.name !== undefined && activeHive.editable"
      class="hive-edit-content"
    >
      <v-form ref="form">
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :value="activeHive.name"
                  hide-details
                  class="hive-edit-name"
                  @input="updateHive($event, 'name')"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row class="hive-edit-details-wrapper">
              <v-col cols="12">
                <div
                  class="beep-label"
                  v-text="`${$tc('Hive', 1) + ' ' + $t('details')}`"
                ></div>

                <div class="hive-edit-details rounded-border">
                  <v-row>
                    <v-col cols="12" md="6" lg="4">
                      <v-row>
                        <v-col cols="12" md="7">
                          <div
                            class="beep-label"
                            v-text="
                              `${$t('Hive_color')} (${$t(
                                // eslint-disable-next-line vue/comma-dangle
                                'overrides_layer_colors'
                              )})`
                            "
                          ></div>
                          <v-sheet
                            class="hive-color"
                            dark
                            :color="
                              activeHive.color !== null
                                ? activeHive.color
                                : '#ffa000'
                            "
                            @click="overlay = !overlay"
                          ></v-sheet>
                        </v-col>

                        <v-col cols="12" md="5">
                          <div
                            class="beep-label"
                            v-text="`${$t('Hive_frames')}`"
                          ></div>
                          <VueNumberInput
                            v-if="activeHive && activeHive.layers"
                            :value="activeHive.layers[0].framecount"
                            class="hive-number-frame-input"
                            :min="1"
                            :max="20"
                            inline
                            controls
                            rounded
                            @change="
                              updateHiveLayers(
                                parseInt($event),
                                // eslint-disable-next-line vue/comma-dangle
                                'framecount'
                              )
                            "
                          ></VueNumberInput>
                        </v-col>
                      </v-row>

                      <v-overlay :value="overlay">
                        <v-toolbar
                          class="hive-color-picker-toolbar"
                          dense
                          light
                        >
                          <div
                            class="hive-color-picker-title"
                            v-text="`${$t('Hive_color')}`"
                          ></div>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-icon
                              class="mr-1"
                              color="primary"
                              @click="
                                updateHiveLayers(colorPickerValue, 'color')
                              "
                              >mdi-check</v-icon
                            >
                            <v-icon @click="cancelColorPicker"
                              >mdi-close</v-icon
                            >
                          </v-toolbar-items>
                        </v-toolbar>

                        <v-color-picker
                          v-model="colorPicker"
                          class="hive-color-picker flex-color-picker"
                          :swatches="swatchesHive"
                          show-swatches
                          hide-canvas
                          light
                        >
                        </v-color-picker>
                      </v-overlay>

                      <HiveFactory
                        v-if="activeHive && activeHive.layers"
                        :hive="activeHive"
                        :color-preview="colorPreview"
                        :color-picker-value="colorPickerValue"
                      ></HiveFactory>
                    </v-col>

                    <v-col cols="12" md="6" lg="4">
                      <v-row>
                        <v-col cols="12" sm="7" md="12">
                          <div
                            class="beep-label"
                            v-text="`${$t('Hive_type')}*`"
                          ></div>
                          <Treeselect
                            :value="activeHive.hive_type_id"
                            :options="treeselectHiveTypes"
                            :disable-branch-nodes="true"
                            :no-results-text="`${$t('no_results')}`"
                            :default-expand-level="1"
                            :label="`${$t('Select')} ${$t('Hive_type')}`"
                            search-nested
                            @input="updateHiveType($event)"
                          />
                        </v-col>
                      </v-row>

                      <v-row class="hive-dimensions-wrapper">
                        <v-col cols="12" sm="7" md="12">
                          <div
                            class="beep-label"
                            v-text="
                              `${$t('Brood_box_and_frame')} ${$t('dimensions')}`
                            "
                          ></div>
                          <div class="hive-dimensions-details rounded-border">
                            <v-row>
                              <v-col cols="12" md="6">
                                <div
                                  v-for="(bbDimension, b) in bbDimensions"
                                  :key="b"
                                  class="mt-1 mb-2"
                                >
                                  <div
                                    class="beep-label"
                                    v-text="`${$t(bbDimension)}`"
                                  ></div>
                                  <VueNumberInput
                                    :value="
                                      activeHive[bbDimension]
                                        ? parseFloat(activeHive[bbDimension])
                                        : 0
                                    "
                                    class="hive-number-frame-input"
                                    :min="0"
                                    :max="100"
                                    :step="0.1"
                                    inline
                                    controls
                                    @change="
                                      updateHive(
                                        $event.toString(),
                                        // eslint-disable-next-line vue/comma-dangle
                                        bbDimension
                                      )
                                    "
                                  ></VueNumberInput>
                                </div>
                              </v-col>

                              <v-col cols="12" md="6">
                                <div
                                  v-for="(frDimension, f) in frDimensions"
                                  :key="f"
                                  class="mt-1 mb-2"
                                >
                                  <div
                                    class="beep-label"
                                    v-text="`${$t(frDimension)}`"
                                  ></div>
                                  <VueNumberInput
                                    :value="
                                      activeHive[frDimension]
                                        ? parseFloat(activeHive[frDimension])
                                        : 0
                                    "
                                    class="hive-number-frame-input"
                                    :min="0"
                                    :max="100"
                                    :step="0.1"
                                    inline
                                    controls
                                    @change="
                                      updateHive(
                                        $event.toString(),
                                        // eslint-disable-next-line vue/comma-dangle
                                        frDimension
                                      )
                                    "
                                  ></VueNumberInput>
                                </div>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

            <v-row class="queen-details-wrapper">
              <v-col cols="12">
                <div
                  class="beep-label"
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
                          class="queen-name"
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
      </v-form>
    </v-container>

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
import HiveFactory from '@components/hive-factory.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Confirm,
    HiveFactory,
    Layout,
    VueNumberInput,
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
      swatchesHive: [
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
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
      bbDimensions: ['bb_width_cm', 'bb_height_cm', 'bb_depth_cm'],
      frDimensions: ['fr_width_cm', 'fr_height_cm'],
      overlay: false,
      modal: false,
      colorPreview: false,
      colorPickerValue: '',
      useQueenMarkColor: false,
      queenHasColor: false,
    }
  },
  computed: {
    ...mapGetters('hives', ['activeHive']),
    ...mapGetters('taxonomy', [
      'beeRacesList',
      'hiveDimensionsList',
      'hiveTypesList',
    ]),
    queen() {
      return this.activeHive.queen
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    locale() {
      return this.$i18n.locale
    },
    colorPicker: {
      get() {
        if (this.activeHive) {
          return this.activeHive.color
        } else {
          return ''
        }
      },
      set(value) {
        this.colorPreview = true
        this.colorPickerValue = value
      },
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
    treeselectHiveTypes() {
      if (this.hiveTypesList.length) {
        const locale = this.selectLocale(this.hiveTypesList)
        var hiveTypePerGroup = this.hiveTypesList.reduce(function(r, a) {
          r[a.group[locale]] = r[a.group[locale]] || []
          r[a.group[locale]].push(a)
          return r
        }, {})
        const sortedGroups = Object.keys(hiveTypePerGroup)
          .slice()
          .sort(function(a, b) {
            if (a < b) {
              return -1
            }
            if (a > b) {
              return 1
            }
            return 0
          })
        var treeselectArray = [
          {
            id: -1,
            label: sortedGroups[0],
            children: hiveTypePerGroup[sortedGroups[0]],
          },
          {
            id: -2,
            label: sortedGroups[1],
            children: hiveTypePerGroup[sortedGroups[1]],
          },
          {
            id: -3,
            label: sortedGroups[2],
            children: hiveTypePerGroup[sortedGroups[2]],
          },
        ]
        treeselectArray.map((groupObject) => {
          groupObject.children.map((child) => {
            child.label = child.trans[locale]
          })
          const sortedTreeselectArray = groupObject.children
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
          groupObject.children = sortedTreeselectArray
        })
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
        this.$store.commit('hives/setActiveHive', hive)
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
    async save() {
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
    },
    cancelColorPicker() {
      this.colorPreview = false
      this.overlay = false
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
      // this.updateQueen(this.queenBirthDate, 'created_at')
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
      const payload = {
        key: property,
        value: value,
      }
      this.$store.commit('hives/updateHive', payload)
    },
    updateHiveLayers(event, property) {
      const payload = {
        key: property,
        value: event,
      }
      this.$store.commit('hives/updateHiveLayers', payload)
      if (property === 'color') {
        this.cancelColorPicker()
      }
    },
    updateHiveType(event) {
      this.updateHive(event, 'hive_type_id')

      const hiveTypeIndex = this.hiveTypesList.findIndex(
        (hiveType) => hiveType.id === event
      )
      const hiveTypeName = this.hiveTypesList[hiveTypeIndex].name

      if (
        this.hiveDimensionsList &&
        this.hiveDimensionsList[hiveTypeName] !== undefined
      ) {
        const hiveDimensions = {
          bb_width_cm: parseFloat(
            this.hiveDimensionsList[hiveTypeName].bb_width_cm
          ),
          bb_depth_cm: parseFloat(
            this.hiveDimensionsList[hiveTypeName].bb_depth_cm
          ),
          bb_height_cm: parseFloat(
            this.hiveDimensionsList[hiveTypeName].bb_height_cm
          ),
          fr_width_cm: parseFloat(
            this.hiveDimensionsList[hiveTypeName].fr_width_cm
          ),
          fr_height_cm: parseFloat(
            this.hiveDimensionsList[hiveTypeName].fr_height_cm
          ),
        }

        var i = 0
        for (i in hiveDimensions) {
          this.updateHive(hiveDimensions[i], i)
          i++
        }
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
      if (property === 'created_at') {
        this.useQueenMarkColor = true
      } else if (property === 'color') {
        this.useQueenMarkColor = false
      }
      const payload = {
        key: property,
        value: value,
      }
      this.$store.commit('hives/updateQueen', payload)
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
  @include for-phone-only {
    top: 56px;
  }
}
.hive-edit-content {
  margin-top: 56px;
}
.hive-edit-name {
  font-size: 2rem;
  @include for-phone-only {
    padding-top: 0;
  }
  @include for-tablet-landscape-up {
    max-width: 500px;
  }

  input {
    margin-bottom: 2px;
  }
}

.hive-color {
  width: 35px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
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
.hive-color-picker {
  margin-top: -10px;
}

.hive-color-picker-toolbar,
.hive-color-picker-footer {
  border-radius: 4px;
}

.hive-color-picker-title {
  font-weight: 500;
}

.hive-color-picker-footer {
  margin-top: -5px;
  .v-toolbar__content {
    padding: 0 10px;
  }
}

.hive-number-frame-input {
  max-width: 130px;
}

.hive-dimensions-wrapper {
  margin-top: 6px;
}
.hive-edit-details,
.hive-dimensions-details,
.queen-details {
  padding: 0 12px;
}
</style>
