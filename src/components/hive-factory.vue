<template>
  <div>
    <v-row class="hive-factory-wrapper">
      <v-col cols="12" sm="6" md="4">
        <div class="hive-edit-label" v-text="`${$t('drag_layers')}`"></div>
        <div
          :class="
            `hive-factory d-flex flex-row align-center justify-flex-start ${
              hasLayer('queen_excluder') ? 'has-queen-excluder' : ''
            } ${hasLayer('feeding_box') ? 'has-feeding-box' : ''}`
          "
        >
          <div class="draggable-layers">
            <draggable
              v-model="layersToAdd"
              :group="{ name: 'layers', pull: 'clone', put: true }"
              :clone="cloneLayer"
              :sort="false"
              class="d-flex flex-column justify-flex-start"
            >
              <div
                v-for="layer in layersToAdd"
                :key="layer.key"
                :class="[`draggable-layer-wrapper ${layer.type}-layer-wrapper`]"
                :width="`${hiveWidth(hive)}px`"
              >
                <span
                  class="hive-edit-label"
                  v-text="layerTypeText(layer)"
                ></span>
                <v-sheet
                  :color="checkColor(layer)"
                  :class="[`layer draggable-layer ${layer.type}-layer`]"
                  :width="`${hiveWidth(hive)}px`"
                >
                </v-sheet>
              </div>
            </draggable>
          </div>

          <v-sheet
            class="hive-icon d-flex flex-column justify-center align-center white--text text--small"
            height="auto"
          >
            <div class="hive-icon-layers">
              <draggable
                v-model="hiveLayers"
                :group="{ name: 'layers', pull: 'sort' }"
              >
                <v-sheet
                  v-for="layer in hiveLayers"
                  :key="layer.key"
                  :color="checkColor(layer)"
                  :class="[`layer ${layer.type}-layer`]"
                  :width="`${hiveWidth(hive)}px`"
                  @click="openOverlay(layer)"
                >
                </v-sheet>
              </draggable>
            </div>
          </v-sheet>

          <v-overlay :value="overlay">
            <v-toolbar class="hive-color-picker-toolbar" dense light>
              <div
                class="hive-color-picker-title"
                v-text="
                  currentLayer !== null ? layerTypeText(currentLayer) : ''
                "
              ></div>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-icon class="mr-1" color="primary" @click="updateLayerColor"
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

            <v-toolbar class="hive-color-picker-footer" dense light>
              <v-spacer></v-spacer>
              <v-btn small tile outlined color="red" @click="deleteLayer">
                <v-icon left>mdi-delete</v-icon>
                {{ $t('Delete') }}
              </v-btn>
            </v-toolbar>
          </v-overlay>
        </div>
      </v-col>
    </v-row>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Confirm from '@components/confirm.vue'
var keyGlobal = 0

export default {
  components: {
    Confirm,
    draggable,
  },
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
    colorPreview: {
      type: Boolean,
      default: false,
      required: false,
    },
    colorPickerValue: {
      type: String,
      default: '',
      required: false,
    },
  },
  data: function() {
    return {
      swatches: [
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
      overlay: false,
      currentLayer: null,
      layerColorPickerValue: '',
      layerColorPreview: false,
    }
  },
  computed: {
    layersToAdd: {
      get() {
        return this.generateLayersToAdd()
      },
      set(value) {
        return value
      },
    },
    hiveLayers: {
      get() {
        return this.orderedLayers(this.hive)
        // return this.hive.layers
      },
      set(layers) {
        this.$store.commit('hives/updateHiveLayers', layers)
      },
    },
    colorPicker: {
      get() {
        if (this.currentLayer) {
          return this.currentLayer.color
        } else {
          return this.hive.color
        }
      },
      set(value) {
        this.layerColorPickerValue = value
      },
    },
  },
  methods: {
    openOverlay(layer) {
      this.overlay = true
      this.currentLayer = layer
      this.layerColorPreview = true
      this.layerColorPickerValue = layer.color
    },
    updateLayerColor() {
      const payload = {
        layerId: this.currentLayer.id || 0,
        layerKey: this.currentLayer.key || 0,
        layerColor: this.layerColorPickerValue,
      }
      this.$store.commit('hives/updateLayerColor', payload)
      this.cancelColorPicker()
    },
    deleteLayer() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('delete_layer') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          const payload = {
            layerId: this.currentLayer.id || 0,
            layerKey: this.currentLayer.key || 0,
          }
          this.$store.commit('hives/deleteLayer', payload)
          this.cancelColorPicker()
        })
        .catch((reject) => {
          return true
        })
    },
    cancelColorPicker() {
      this.overlay = false
      this.layerColorPreview = false
      this.currentLayer = null
    },
    hasLayer(type) {
      return this.hive.layers.some((layer) => layer.type === type)
    },
    cloneLayer({ key, order, color, type, framecount, newLayer }) {
      return {
        key: keyGlobal--,
        order: order,
        type: type,
        color: color,
        framecount: framecount,
      }
    },
    layerTypeText(layer) {
      return this.$i18n.tc('Hive_' + layer.type + '_layer', 1)
    },
    checkColor(layer) {
      if (this.colorPickerValue !== '' && this.colorPreview) {
        return this.colorPickerValue
      } else if (
        this.layerColorPreview &&
        layer.id &&
        layer.id === this.currentLayer.id
      ) {
        return this.layerColorPickerValue
      } else if (
        this.layerColorPreview &&
        layer.key &&
        layer.key === this.currentLayer.key
      ) {
        return this.layerColorPickerValue
      } else if (layer.color !== null && !this.colorPreview) {
        return layer.color
      } else if (this.hive.color !== null && !this.colorPreview) {
        return this.hive.color
      } else {
        return '#ffa000'
      }
    },
    generateLayersToAdd: function() {
      var arr = []
      const layerType = ['honey', 'brood', 'feeding_box', 'queen_excluder']
      for (var n = 0; n < 4; n++) {
        arr[n] = {
          key: keyGlobal--,
          order: 0,
          color: this.hive.color,
          type: layerType[n],
          framecount: this.hive.layers[0].framecount,
          newLayer: true,
        }
      }
      return arr
    },
    hiveWidth: function(hive) {
      return hive.layers[0].framecount * 6
    },
    orderedLayers: function(hive) {
      const orderedLayers = hive.layers.slice().sort(function(a, b) {
        if (a.type === 'feeding_box') {
          return -1
        }
        if (b.type === 'feeding_box') {
          return 1
        }
        if (a.order > b.order) {
          return -1
        }
        if (b.order > a.order) {
          return 1
        }
        return 0
      })
      return orderedLayers
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-factory {
  padding: 12px;
  border: 1px solid $color-grey-light;
  border-radius: 2px;
  &.has-queen-excluder {
    .draggable-layer-wrapper.queen_excluder-layer-wrapper {
      display: none;
    }
  }
  &.has-feeding-box {
    .draggable-layer-wrapper.feeding_box-layer-wrapper {
      display: none;
    }
  }
}

.layer {
  min-width: 40px;
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0.3) !important;
  border-radius: 0;
  &:first-child {
    border-radius: 2px 2px 0 0;
  }
  &:last-child:not(.queen_excluder-layer) {
    border-bottom: 0;
  }
}

.honey-layer {
  height: 18px;
}
.brood-layer {
  height: 27px;
}
.queen_excluder-layer,
.feeding_box-layer {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4px;
  border-radius: 0;
}
.queen_excluder-layer {
  justify-content: flex-end;
  &::after {
    margin-right: -16px;
    font-family: 'Material Design Icons';
    font-size: 18px;
    color: $color-grey;
    content: '\F004E';
  }
}
.feeding_box-layer {
  justify-content: center;
  &::after {
    margin-top: -16px;
    font-family: 'Material Design Icons';
    font-size: 18px;
    color: $color-grey;
    content: '\F0046';
  }
}

.hive-icon {
  padding: 0 16px;
  border-bottom: 1px solid green !important;
  border-radius: 2px 2px 0 0;
}

.draggable-layers {
  width: 150px;
  .draggable-layer-wrapper {
    .layer {
      border-radius: 0;
      &:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      }
    }
    .feeding_box-layer {
      margin-top: 16px;
    }
    .queen_excluder-layer {
      margin-top: 8px;
    }
  }
  .draggable-layer-wrapper:not(.sortable-drag) {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
}

.draggable-layers {
  .sortable-drag {
    .hive-edit-label {
      display: none;
      height: 0;
    }
    .layer {
      border-width: 2px;
      border-radius: 0;
    }
  }
  .layer.sortable-ghost:not(.feeding_box-layer):not(.queen_excluder-layer) {
    border: 0;
    border-radius: 0;
    &::before {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      content: '';
      background-color: red;
    }
  }
}
.hive-icon-layers {
  .sortable-ghost {
    .hive-edit-label {
      display: none;
      height: 0;
    }
    .layer:not(.feeding_box-layer):not(.queen_excluder-layer),
    &.layer {
      &::before {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        content: '';
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.filler {
  padding: 0;
}
</style>
