<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`">
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
                  v-model="hiveName"
                  hide-details
                  class="hive-edit-name"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="3">
                <div
                  class="hive-edit-label"
                  v-text="`${$t('Hive_type')}*`"
                ></div>
                <Treeselect
                  v-model="hiveType"
                  :options="treeselectHiveTypes"
                  :disable-branch-nodes="true"
                  :no-results-text="`${$t('no_results')}`"
                  :default-expand-level="1"
                  :label="`${$t('Select')} ${$t('Hive_type')}`"
                  search-nested
                />
              </v-col>

              <v-col cols="12" sm="4" md="2">
                <div
                  class="hive-edit-label"
                  v-text="`${$t('Brood_box_and_frame')} ${$t('dimensions')}`"
                ></div>
                <VueNumberInput
                  v-if="activeHive"
                  v-model="hiveDimensions.bb_width_cm"
                  class="hive-number-frame-input"
                  :min="10"
                  :max="100"
                  inline
                  controls
                  rounded
                ></VueNumberInput>
              </v-col>

              <v-col cols="12" sm="4" md="2">
                <div
                  class="hive-edit-label"
                  v-text="`${$t('Hive_frames')}*`"
                ></div>
                <VueNumberInput
                  v-if="activeHive && activeHive.layers"
                  v-model="hiveFrames"
                  class="hive-number-frame-input"
                  :min="1"
                  :max="20"
                  inline
                  controls
                  rounded
                ></VueNumberInput>
              </v-col>

              <v-col cols="12">
                <div
                  class="hive-edit-label"
                  v-text="
                    `${$t('Hive_color')} (${$t('overrides_layer_colors')})`
                  "
                ></div>
                <v-sheet
                  class="hive-color"
                  dark
                  :color="
                    activeHive.color !== null ? activeHive.color : '#ffa000'
                  "
                  @click="overlay = !overlay"
                ></v-sheet>
                <v-overlay :value="overlay">
                  <v-toolbar class="hive-color-picker-toolbar" dense light>
                    <div
                      class="hive-color-picker-title"
                      v-text="`${$t('Hive_color')}`"
                    ></div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-icon
                        class="mr-1"
                        color="primary"
                        @click="updateHiveColor"
                        >mdi-check</v-icon
                      >
                      <v-icon @click="cancelColorPicker">mdi-close</v-icon>
                    </v-toolbar-items>
                  </v-toolbar>

                  <v-color-picker
                    v-model="colorPicker"
                    class="hive-color-picker"
                    :swatches="swatches"
                    show-swatches
                    hide-canvas
                    light
                  >
                  </v-color-picker>
                </v-overlay>
              </v-col>
            </v-row>

            <HiveFactory
              v-if="activeHive && activeHive.layers"
              :hive="activeHive"
              :color-preview="colorPreview"
              :color-picker-value="colorPickerValue"
            ></HiveFactory>

            <v-row class="queen-details-wrapper">
              <v-col cols="12">
                <div
                  class="hive-edit-label"
                  v-text="`${$t('Queen') + ' ' + $t('details')}`"
                ></div>
                <div class="queen-details">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <div>
                        <v-text-field
                          v-model="queenName"
                          :label="`${$t('Queen')} ${$t('name')}`"
                          class="queen-name"
                        >
                        </v-text-field>
                      </div>

                      <div>
                        <div
                          class="hive-edit-label"
                          v-text="`${$t('Bee_race')}`"
                        ></div>
                        <Treeselect
                          v-model="queenRace"
                          :options="treeselectBeeRaces"
                          :no-results-text="`${$t('no_results')}`"
                          :label="`${$t('Select')} ${$t('Bee_race')}`"
                          search-nested
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
                              :label="`${$t('Birth_date')}`"
                              :first-day-of-week="1"
                              :locale="locale"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="queenBirthDate" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(queenBirthDate)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-dialog>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <div>
                        <v-text-field
                          v-model="queenDescription"
                          :label="`${$t('Queen')} ${$t('queen_description')}`"
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

                    <v-col cols="12" sm="6" md="4">
                      <div v-if="showQueenColorPicker">
                        <div
                          class="hive-edit-label"
                          v-text="`${$t('Queen')} ${$t('color')}`"
                        ></div>
                        <div>
                          <div>
                            <div class="mr-2 mb-2">
                              <v-sheet
                                class="beep-icon beep-icon-queen--large"
                                :color="activeHive.queen.color"
                              >
                              </v-sheet>
                            </div>
                            <v-color-picker
                              v-model="queenColor"
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
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      swatches: [
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
      overlay: false,
      modal: false,
      colorPreview: false,
      colorPickerValue: '',
    }
  },
  computed: {
    ...mapGetters('hives', ['activeHive']),
    ...mapGetters('taxonomy', ['beeRaces', 'hiveDimensions', 'hiveTypes']),
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
    hiveDimensions: {
      get() {
        if (this.activeHive) {
          return {
            bb_width_cm: this.activeHive.bb_width_cm,
            bb_depth_cm: this.activeHive.bb_depth_cm,
            bb_height_cm: this.activeHive.bb_height_cm,
            fr_width_cm: this.activeHive.fr_width_cm,
            fr_height_cm: this.activeHive.fr_height_cm,
          }
        } else {
          return {
            bb_width_cm: null,
            bb_depth_cm: null,
            bb_height_cm: null,
            fr_width_cm: null,
            fr_height_cm: null,
          }
        }
      },
      set(value) {
        console.log(value) // TODO: pass to updateHiveDimensions function
      },
    },
    hiveFrames: {
      get() {
        if (this.activeHive.layers) {
          return this.activeHive.layers[0].framecount
        } else {
          return 10
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveFrames', parseInt(value))
      },
    },
    hiveName: {
      get() {
        if (this.activeHive) {
          return this.activeHive.name
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'name',
          value: value,
        }
        this.$store.commit('hives/updateHive', payload)
      },
    },
    hiveType: {
      get() {
        if (this.activeHive) {
          return this.activeHive.hive_type_id
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'hive_type_id',
          value: value,
        }
        this.$store.commit('hives/updateHive', payload)

        const hiveTypeIndex = this.hiveTypes.findIndex(
          (hiveType) => hiveType.id === value
        )
        const hiveTypeName = this.hiveTypes[hiveTypeIndex].name

        if (
          this.hiveDimensions &&
          this.hiveDimensions[hiveTypeName] !== undefined
        ) {
          const hiveDimensions = {
            bb_width_cm: this.hiveDimensions[hiveTypeName].bb_width_cm,
            bb_depth_cm: this.hiveDimensions[hiveTypeName].bb_depth_cm,
            bb_height_cm: this.hiveDimensions[hiveTypeName].bb_height_cm,
            fr_width_cm: this.hiveDimensions[hiveTypeName].fr_width_cm,
            fr_height_cm: this.hiveDimensions[hiveTypeName].fr_height_cm,
          }
          console.log(hiveDimensions) // TODO: pass to updateHiveDimensions function
        }
      },
    },
    treeselectBeeRaces() {
      if (this.beeRaces.length) {
        const locale = this.selectLocale(this.beeRaces)
        var treeselectArray = this.beeRaces
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
      if (this.hiveTypes.length) {
        const locale = this.selectLocale(this.hiveTypes)
        var hiveTypePerGroup = this.hiveTypes.reduce(function(r, a) {
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
    queenBirthDate: {
      get() {
        if (this.activeHive) {
          return this.momentifyRemoveTime(this.activeHive.queen.created_at)
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'created_at',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenClipped: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.clipped
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'clipped',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenColor: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.color
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'color',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenDescription: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.description
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'description',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenFertilized: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.fertilized
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'fertilized',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenName: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.name
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'name',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    queenRace: {
      get() {
        if (this.activeHive) {
          return this.activeHive.queen.race_id
        } else {
          return ''
        }
      },
      set(value) {
        const payload = {
          key: 'race_id',
          value: value,
        }
        this.$store.commit('hives/updateQueen', payload)
      },
    },
    showQueenColorPicker: {
      get() {
        if (this.activeHive) {
          if (this.activeHive.queen.color !== null) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      set(value) {
        if (value === false) {
          const payload = {
            key: 'color',
            value: null,
          }
          this.$store.commit('hives/updateQueen', payload)
        } else {
          const payload = {
            key: 'color',
            value: '#dddddd',
          }
          this.$store.commit('hives/updateQueen', payload)
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
    updateHiveColor() {
      this.$store.commit('hives/updateHiveColor', this.colorPickerValue)
      this.cancelColorPicker()
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
  z-index: 1;
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

.hive-edit-label {
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: 0.0333333333em !important;
}

.vue-treeselect__control {
  border-radius: 2px;
}

.vue-treeselect--focused:not(.vue-treeselect--open) .vue-treeselect__control {
  border-color: $color-primary;
  box-shadow: none;
}

.hive-color {
  width: 35px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
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
  input.number-input__input {
    padding-top: 5px;
    padding-right: 3.175rem;
    padding-bottom: 5px;
    padding-left: 3.175rem;
    border-color: $color-grey-light;
    border-radius: 2px;
  }
  button.number-input__button {
    font-size: 24px;
    &::before {
      position: relative;
      top: 0;
      left: 0;
      height: 0;
      margin-left: 2px;
      font-family: 'Material Design Icons';
      background: none !important;
      background-color: transparent;
      transform: none;
    }
    &--plus::before {
      content: '\F0415';
    }
    &--plus::after {
      height: 0;
    }
    &--minus::before {
      content: '\F0374';
    }
    &:hover {
      &::before {
        color: $color-primary;
      }
    }
  }
}

.queen-details {
  padding: 0 12px;
  border: 1px solid $color-grey-light;
  border-radius: 2px;
}
</style>
