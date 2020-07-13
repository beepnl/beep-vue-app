<template>
  <v-row class="hive-factory-wrapper d-flex flex-column">
    <v-col cols="12" sm="6" md="4">
      <div class="hive-edit-caption" v-text="`${$t('drag_layers')}`"></div>
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
            class="d-flex flex-column justify-flex-start"
          >
            <v-sheet
              v-for="layer in layersToAdd"
              :key="layer.key"
              :color="checkedColor(layer)"
              :class="[`layer draggable-layer ${layer.type}-layer`]"
              :width="`${hiveWidth(hive)}px`"
            >
            </v-sheet>
          </draggable>
        </div>

        <v-sheet
          class="hive-icon d-flex justify-center align-center white--text text--small"
          height="auto"
        >
          <div class="layer-wrapper">
            <draggable v-model="hiveLayers" group="layers">
              <v-sheet
                v-for="layer in hiveLayers"
                :key="layer.key"
                :color="checkedColor(layer)"
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
            <div v-text="layerTypeText"></div>
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
        </v-overlay>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
// const idGlobal = 8
var keyGlobal = 0

export default {
  components: {
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
      currentLayer: {},
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
    layerTypeText() {
      if (this.currentLayer.type) {
        return this.$i18n.tc('Hive_' + this.currentLayer.type + '_layer', 1)
      } else {
        return ''
      }
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
    cancelColorPicker() {
      this.overlay = false
      this.layerColorPreview = false
      this.currentLayer = {}
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
    checkedColor(layer) {
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
      } else if (layer.color && !this.colorPreview) {
        return layer.color
      } else if (!layer.color && !this.colorPreview) {
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
.hive-factory-wrapper {
  margin-top: 24px;
}
.layer {
  min-width: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0.3) !important;
  &.sortable-ghost {
    border: 2px solid rgba(0, 0, 0, 0.3);
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
  height: 2px;
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
  &::before {
    margin-top: -16px;
    font-family: 'Material Design Icons';
    font-size: 18px;
    color: $color-grey;
    content: '\F0046';
  }
}

.draggable-layers {
  width: 150px;
  .draggable-layer {
    margin-bottom: 20px;
    border-radius: 0;
    &.queen_excluder-layer,
    &.feeding_box-layer {
      margin-top: 16px;
    }
    &:last-child {
      margin-bottom: 10px;
    }
  }
}

.hive-factory {
  padding: 12px;
  margin-top: 8px;
  border: 1px solid $color-grey;
  border-radius: 2px;
  &.has-queen-excluder {
    .draggable-layer {
      &.queen_excluder-layer {
        display: none;
      }
    }
  }
  &.has-feeding-box {
    .draggable-layer {
      &.feeding_box-layer {
        display: none;
      }
    }
  }
}

.hive-icon {
  position: relative;
  flex-direction: column;
  // min-width: 40px;
  padding: 0 16px;
  margin-bottom: 3px;
  border-bottom: 1px solid green;
  border-radius: 2px 2px 0 0;
  .layer-wrapper {
    width: 100%;
    height: 100%;
    .layer:first-child {
      border-radius: 2px 2px 0 0;
    }
    .layer:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
  }
  .honey-layer,
  .brood-layer {
    width: 100%;
    border-bottom: 0;
    border-radius: 0;
  }
}
</style>
