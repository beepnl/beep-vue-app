<template>
  <v-row class="hive-edit-details-wrapper">
    <v-col cols="12">
      <div
        class="overline mb-3"
        v-text="`${$tc('Hive', 1) + ' ' + $t('configuration')}`"
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
                  :color="hive.color !== null ? hive.color : '#ffa000'"
                  @click="overlay = !overlay"
                ></v-sheet>
              </v-col>

              <v-col cols="12" md="5">
                <div class="beep-label" v-text="`${$t('Hive_frames')}`"></div>
                <VueNumberInput
                  v-if="hive && hive.layers"
                  :value="hive.layers[0].framecount"
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
                    @click="updateHiveLayers(colorPickerValue, 'color')"
                    >mdi-check</v-icon
                  >
                  <v-icon @click="cancelColorPicker">mdi-close</v-icon>
                </v-toolbar-items>
              </v-toolbar>

              <v-color-picker
                v-model="colorPicker"
                class="hive-color-picker flex-color-picker"
                :swatches="swatchesHive"
                show-swatches
                hide-canvas
                light
                flat
              >
              </v-color-picker>
            </v-overlay>

            <HiveFactory
              v-if="hive && hive.layers"
              :hive="hive"
              :color-preview="colorPreview"
              :color-picker-value="colorPickerValue"
            ></HiveFactory>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-row>
              <v-col cols="12" sm="7" md="12">
                <div class="beep-label" v-text="`${$t('Hive_type')}*`"></div>
                <Treeselect
                  :value="hive.hive_type_id"
                  :options="treeselectHiveTypes"
                  :disable-branch-nodes="true"
                  :no-results-text="`${$t('no_results')}`"
                  :default-expand-level="1"
                  :label="`${$t('Select')} ${$t('Hive_type')}`"
                  :placeholder="`${$t('Select')} ${$t('Hive_type')}`"
                  search-nested
                  @input="updateHiveType($event)"
                />
              </v-col>
            </v-row>

            <v-row class="hive-dimensions-wrapper">
              <v-col cols="12" sm="7" md="12">
                <div
                  class="beep-label"
                  v-text="`${$t('Brood_box_and_frame')} ${$t('dimensions')}`"
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
                            hive[bbDimension]
                              ? parseFloat(hive[bbDimension])
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
                            hive[frDimension]
                              ? parseFloat(hive[frDimension])
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
</template>

<script>
import HiveFactory from '@components/hive-factory.vue'
import { mapGetters } from 'vuex'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    HiveFactory,
    VueNumberInput,
    Treeselect,
  },
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
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
      bbDimensions: ['bb_width_cm', 'bb_height_cm', 'bb_depth_cm'],
      frDimensions: ['fr_width_cm', 'fr_height_cm'],
      overlay: false,
      colorPreview: false,
      colorPickerValue: '',
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['hiveDimensionsList', 'hiveTypesList']),
    locale() {
      return this.$i18n.locale
    },
    colorPicker: {
      get() {
        if (this.hive) {
          return this.hive.color
        } else {
          return ''
        }
      },
      set(value) {
        this.colorPreview = true
        this.colorPickerValue = value
      },
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
  },
  created() {
    this.readTaxonomy()
  },
  methods: {
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
    cancelColorPicker() {
      this.colorPreview = false
      this.overlay = false
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
      this.hive[property] = value
      this.hive.frames = this.hive.layers[0].framecount
      if (
        property !== 'bb_width_cm' &&
        property !== 'bb_height_cm' &&
        property !== 'bb_depth_cm' &&
        property !== 'fr_width_cm' &&
        property !== 'fr_height_cm'
      ) {
        this.$store.commit('hives/setEdited', true) // NB edited tracking has been disabled for vue-number-input component inputs as it calls @input when hive-edit.vue is initialized, before any changes are made
      }
    },
    updateHiveLayers(value, property) {
      this.hive.layers.forEach((layer) => {
        layer[property] = value
      })
      if (property === 'framecount') {
        this.hive.frames = value // NB edited tracking has been disabled vue-number-input component inputs as it calls @input when hive-edit.vue is initialized, before any changes are made
      } else {
        this.hive.frames = this.hive.layers[0].framecount
        this.$store.commit('hives/setEdited', true)
      }
      if (property === 'color') {
        this.hive[property] = value
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
.hive-dimensions-details {
  padding: 0 12px !important;
}
</style>
