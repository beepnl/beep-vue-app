<template>
  <div>
    <v-row class="hive-factory-wrapper my-0">
      <v-col cols="12" sm="7" md="12">
        <div class="beep-label" v-text="`${$t('drag_layers')}`"></div>
        <div
          :class="
            `hive-factory rounded-border d-flex flex-row align-center justify-flex-start ${
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
                <span class="beep-label" v-text="layerTypeText(layer)"></span>
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
            class="hive-icon d-flex flex-column justify-center align-center white--text text--small my-3"
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
                <v-icon
                  class="mr-1"
                  color="primary"
                  @click="updateHiveLayerColor"
                  >mdi-check</v-icon
                >
                <v-icon @click="cancelColorPicker">mdi-close</v-icon>
              </v-toolbar-items>
            </v-toolbar>

            <v-color-picker
              v-model="colorPicker"
              class="hive-color-picker flex-color-picker"
              :swatches="swatches"
              show-swatches
              hide-canvas
              light
              flat
            >
            </v-color-picker>

            <v-toolbar class="hive-color-picker-footer" dense light flat>
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
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: function() {
    return {
      swatches: [
        ['#e9eae1', '#EAD49E', '#F8B133'],
        ['#2dbde5', '#094da0', '#27820e'],
        ['#ffe900', '#d80d0d', '#754B1F'],
      ],
      overlay: false,
      currentLayer: null,
      layerColorPickerValue: '',
      layerColorPreview: false,
    }
  },
  computed: {
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
    hiveLayers: {
      get() {
        return this.orderedLayers(this.hive)
      },
      set(layers) {
        this.updateHiveLayerOrder(layers)
      },
    },
    layersToAdd: {
      get() {
        return this.generateLayersToAdd()
      },
      set(value) {
        return value
      },
    },
  },
  methods: {
    cancelColorPicker() {
      this.overlay = false
      this.layerColorPreview = false
      this.currentLayer = null
    },
    checkColor(layer) {
      if (this.colorPickerValue !== '' && this.colorPreview) {
        return this.colorPickerValue
      } else if (
        this.layerColorPreview &&
        ((layer.id && layer.id === this.currentLayer.id) ||
          (layer.key && layer.key === this.currentLayer.key))
      ) {
        return this.layerColorPickerValue
      } else if (layer.color !== null && !this.colorPreview) {
        return layer.color
      } else if (this.hive.color !== null && !this.colorPreview) {
        return this.hive.color
      } else {
        return '#F8B133'
      }
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
    deleteLayer() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('delete_layer') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          const layerId = this.currentLayer.id || 0
          const layerKey = this.currentLayer.key || 0
          var remainingLayers = this.hive.layers.filter(
            (layer) => !(layer.id === layerId || layer.key === layerKey)
          )
          this.hive.layers = remainingLayers
          this.hive.frames = this.hive.layers[0].framecount
          this.setHiveEdited(true)
          this.setApiaryEdited(true)

          this.cancelColorPicker()
        })
        .catch((reject) => {
          return true
        })
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
    hasLayer(type) {
      return this.hive.layers.some((layer) => layer.type === type)
    },
    hiveWidth: function(hive) {
      return hive.layers[0].framecount * 6
    },
    layerTypeText(layer) {
      return this.$i18n.tc('Hive_' + layer.type + '_layer', 1)
    },
    openOverlay(layer) {
      this.overlay = true
      this.currentLayer = layer
      this.layerColorPreview = true
      this.layerColorPickerValue = layer.color
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
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    setHiveEdited(bool) {
      this.$store.commit('hives/setHiveEdited', bool)
    },
    updateHiveLayerColor() {
      const layerId = this.currentLayer.id || 0
      const layerKey = this.currentLayer.key || 0

      const layerIndex = this.hive.layers.findIndex(
        (layer) => layer.id === layerId || layer.key === layerKey
      )
      this.hive.layers[layerIndex].color = this.layerColorPickerValue
      this.hive.frames = this.hive.layers[0].framecount
      this.setHiveEdited(true)
      this.setApiaryEdited(true)

      this.cancelColorPicker()
    },
    updateHiveLayerOrder(layers) {
      var i = layers.length
      layers.map((layer) => {
        layer.order = i
        i--
      })
      this.hive.layers = layers
      this.hive.frames = this.hive.layers[0].framecount
      this.setHiveEdited(true)
      this.setApiaryEdited(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-icon {
  padding: 0 16px;
  border-bottom: 1px solid green !important;
  border-radius: 2px 2px 0 0;
}

.hive-factory {
  &.has-queen-excluder {
    .draggable-layer-wrapper.queen_excluder-layer-wrapper {
      display: none;
    }
  }
  &.has-feeding-box {
    .draggable-layer-wrapper.feeding_box-layer-wrapper {
      display: none;
    }
    .hive-icon {
      margin-top: 20px !important;
    }
  }
}

.layer {
  min-width: 8px;
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
  height: 30px;
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

.draggable-layers {
  width: 150px;
  .sortable-drag {
    .beep-label {
      color: transparent;
    }
    .layer {
      border-radius: 0;
    }
  }
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
    .beep-label {
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
