<template>
  <div
    :class="
      `hive-factory d-flex flex-column align-center ${
        hasLayer('queen_excluder') ? 'has-queen-excluder' : ''
      } ${hasLayer('feeding_box') ? 'has-feeding-box' : ''}`
    "
  >
    <v-sheet height="auto" width="100%">
      <div class="draggable-layers">
        <draggable
          v-model="layersToAdd"
          :group="{ name: 'layers', pull: 'clone', put: true }"
          :clone="cloneLayer"
          class="d-flex flex-row justify-center"
        >
          <v-sheet
            v-for="layer in layersToAdd"
            :key="layer.id"
            :color="`${hive.color ? hive.color : '#d6cdc0'}`"
            :class="[`layer draggable-layer ${layer.type}-layer`]"
            :width="`${hiveWidth(hive)}px`"
          ></v-sheet>
        </draggable>
      </div>
    </v-sheet>

    <v-sheet
      class="hive-icon d-flex justify-center align-center white--text text--small mr-1"
      height="auto"
      :width="`${hiveWidth(hive)}px`"
    >
      <div class="layer-wrapper">
        <draggable v-model="hiveLayers" group="layers">
          <v-sheet
            v-for="layer in hiveLayers"
            :key="layer.id"
            :color="`${hive.color ? hive.color : '#d6cdc0'}`"
            :class="[`layer ${layer.type}-layer`]"
          ></v-sheet>
        </draggable>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
let idGlobal = 8

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
  },
  data: function() {
    return {
      generatedIDs: [1, 2, 3, 4],
    }
  },
  computed: {
    layersToAdd: {
      get() {
        return [
          {
            id: this.generatedIDs[0],
            order: 0,
            type: 'honey',
          },
          {
            id: this.generatedIDs[1],
            order: 0,
            type: 'brood',
          },
          {
            id: this.generatedIDs[2],
            order: 0,
            type: 'feeding_box',
          },
          {
            id: this.generatedIDs[3],
            order: 0,
            type: 'queen_excluder',
          },
        ]
      },
      set(value) {
        this.generateIDs()
        return value
      },
    },
    hiveLayers: {
      get() {
        return this.orderedLayers(this.hive)
      },
      set(layers) {
        // FIXME: update layer order elsewhere (after drop), here it gives vuex mutation strict warnings
        // var i = 0
        // layers.map((layer) => {
        //   layer.order = i
        //   i++
        // })
        this.$store.commit('hives/updateHiveLayers', layers)
      },
    },
  },
  methods: {
    // checkMove: function(e) {
    //   console.log('Future index: ' + e.draggedContext.futureIndex)
    //   console.log('Dragged element: ' + e.draggedContext.element.id)
    //   console.log('Related element: ' + e.relatedContext.element.id)
    // },
    hasLayer(type) {
      return this.hive.layers.some((layer) => layer.type === type)
    },
    cloneLayer({ id, order, type }) {
      return {
        id: idGlobal++,
        order: order,
        type: type,
      }
    },
    generateIDs: function() {
      const generatedIDs = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 1000)
      )
      this.generatedIDs = generatedIDs
    },
    hiveWidth: function(hive) {
      const orderedLayers = this.orderedLayers(hive)
      return orderedLayers[orderedLayers.length - 1].framecount * 6 // hive.layers[0].framecount * 4
    },
    orderedLayers: function(hive) {
      return hive.layers.slice().sort(function(a, b) {
        if (a.type === 'feeding_box') {
          return -1
        }
        if (b.type === 'feeding_box') {
          return 1
        }
        // if (a.order > b.order) {
        //   return -1
        // }
        // if (b.order > a.order) {
        //   return 1
        // }
        return 0
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-factory {
  margin-top: 24px;
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

.layer {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0.3) !important;
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
  margin-bottom: 40px;
  .draggable-layer {
    margin-right: 4px;
    border-radius: 0;
    &.queen_excluder-layer,
    &.feeding_box-layer {
      margin-left: 2px;
    }
  }
}

.hive-icon {
  position: relative;
  flex-direction: column;
  min-width: 40px;
  margin-bottom: 3px;
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
