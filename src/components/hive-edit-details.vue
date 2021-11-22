<template>
  <v-row v-if="ready" class="hive-edit-details-wrapper">
    <v-col cols="12">
      <div
        class="overline mb-3"
        v-text="`${$tc('Hive', 1) + ' ' + $t('configuration')}`"
      ></div>

      <div class="hive-edit-details rounded-border">
        <v-row class="my-0">
          <v-col cols="12" md="6" lg="4">
            <v-row class="my-0">
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
                  class="hive-color cursor-pointer"
                  dark
                  :color="hive.color !== null ? hive.color : '#F8B133'"
                  @click="openColorPicker"
                ></v-sheet>
              </v-col>

              <v-col cols="12" md="5">
                <div class="beep-label" v-text="`${$t('Hive_frames')}`"></div>
                <el-input-number
                  v-if="hive && hive.layers"
                  :value="
                    hive.layers.length > 0
                      ? hive.layers[0].framecount
                      : defaultFrameCount
                  "
                  :min="1"
                  :max="24"
                  :step="1"
                  :precision="0"
                  :disabled="hive.layers.length === 0"
                  size="medium"
                  @change="
                    updateHiveLayers(
                      parseInt($event),
                      // eslint-disable-next-line vue/comma-dangle
                      'framecount'
                    )
                  "
                ></el-input-number>
              </v-col>
            </v-row>

            <v-overlay :value="overlay">
              <v-toolbar class="hive-color-picker-toolbar" dense light flat>
                <div
                  class="hive-color-picker-title ml-1"
                  v-text="`${$t('Hive_color')}`"
                ></div>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-icon class="mr-1" @click="cancelColorPicker"
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
                flat
              >
              </v-color-picker>

              <v-toolbar class="hive-color-picker-footer" dense light flat>
                <v-spacer></v-spacer>
                <v-icon
                  class="mr-1"
                  color="accent"
                  @click="updateHiveLayers(colorPickerValue, 'color')"
                  >mdi-check</v-icon
                >
              </v-toolbar>
            </v-overlay>

            <HiveFactory
              v-if="hive && hive.layers"
              :hive="hive"
              :color-preview="colorPreview"
              :color-picker-value="colorPickerValue"
              @update-defaultframecount="defaultFrameCount = $event"
            ></HiveFactory>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-row class="my-0">
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
                  required
                  @input="updateHiveType($event)"
                />
              </v-col>
            </v-row>

            <v-row class="hive-dimensions-wrapper my-0">
              <v-col cols="12" sm="7" md="12">
                <div
                  class="beep-label"
                  v-text="`${$t('Brood_box_and_frame')} ${$t('dimensions')}`"
                ></div>
                <div class="hive-dimensions-details rounded-border">
                  <v-row class="my-0">
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
                        <el-input-number
                          :value="
                            hive[bbDimension]
                              ? parseFloat(hive[bbDimension])
                              : 0
                          "
                          :min="0"
                          :max="100"
                          :step="0.1"
                          :precision="1"
                          size="medium"
                          @change="
                            updateHive(
                              $event.toString(),
                              // eslint-disable-next-line vue/comma-dangle
                              bbDimension
                            )
                          "
                          @input.native="
                            convertComma($event, hive, bbDimension, 1),
                              setHiveEdited(true),
                              setApiaryEdited(true)
                          "
                        ></el-input-number>
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
                        <el-input-number
                          :value="
                            hive[frDimension]
                              ? parseFloat(hive[frDimension])
                              : 0
                          "
                          :min="0"
                          :max="100"
                          :step="0.1"
                          :precision="1"
                          size="medium"
                          @change="
                            updateHive(
                              $event.toString(),
                              // eslint-disable-next-line vue/comma-dangle
                              frDimension
                            )
                          "
                          @input.native="
                            convertComma($event, hive, frDimension, 1),
                              setHiveEdited(true),
                              setApiaryEdited(true)
                          "
                        ></el-input-number>
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
import { convertComma, readTaxonomy } from '@mixins/methodsMixin'
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: {
    HiveFactory,
    Treeselect,
  },
  mixins: [convertComma, readTaxonomy],
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: function() {
    return {
      swatchesHive: [
        ['#e9eae1', '#EAD49E', '#F8B133'],
        ['#2dbde5', '#094da0', '#27820e'],
        ['#ffe900', '#d80d0d', '#754B1F'],
      ],
      bbDimensions: ['bb_width_cm', 'bb_height_cm', 'bb_depth_cm'],
      frDimensions: ['fr_width_cm', 'fr_height_cm'],
      overlay: false,
      colorPreview: false,
      colorPickerValue: '',
      ready: false,
      defaultFrameCount: 10,
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
          return this.hive.color !== null ? this.hive.color : '#F8B133'
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
        var treeselectArray = []
        sortedGroups.forEach((sortedGroup, index) => {
          const sortedGroupObject = {
            id: -(index + 1),
            label: sortedGroup,
            children: hiveTypePerGroup[sortedGroup],
          }
          treeselectArray.push(sortedGroupObject)
        })
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
    this.readTaxonomy().then(() => {
      this.ready = true
    })
  },
  methods: {
    cancelColorPicker() {
      this.colorPreview = false
      this.overlay = false
    },
    openColorPicker() {
      this.overlay = true
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
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    setHiveEdited(bool) {
      this.$store.commit('hives/setHiveEdited', bool)
    },
    updateHive(event, property) {
      // console.log(event)
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
      this.setHiveEdited(true)
      this.setApiaryEdited(true)
    },
    updateHiveLayers(value, property) {
      this.hive.layers.forEach((layer) => {
        layer[property] = value
      })
      this.hive.frames = this.hive.layers[0].framecount
      this.setHiveEdited(true)
      this.setApiaryEdited(true)
      if (property === 'color') {
        this.hive[property] = value
        this.cancelColorPicker()
      }
    },
    updateHiveType(event) {
      if (event === undefined) {
        event = 63 // Default to custom hive
      }
      this.updateHive(event, 'hive_type_id')

      const hiveTypeIndex = this.hiveTypesList.findIndex(
        (hiveType) => hiveType.id === event
      )
      const hiveTypeName = this.hiveTypesList[hiveTypeIndex].name

      if (
        this.hiveDimensionsList &&
        this.hiveDimensionsList[hiveTypeName] !== undefined
      ) {
        var hiveDimensions = {
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
      } else {
        hiveDimensions = {
          bb_width_cm: 0,
          bb_depth_cm: 0,
          bb_height_cm: 0,
          fr_width_cm: 0,
          fr_height_cm: 0,
        }
      }
      var i = 0
      for (i in hiveDimensions) {
        this.updateHive(hiveDimensions[i], i)
        i++
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

.hive-dimensions-wrapper {
  margin-top: 6px;
}
.hive-edit-details,
.hive-dimensions-details {
  padding: 0 12px !important;
}
</style>
