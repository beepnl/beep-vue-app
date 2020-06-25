<template>
  <v-sheet
    :class="
      `hive-icon d-flex justify-center align-center white--text text--small mr-1 ${
        hasQueenExcluder ? '--has-queen-excluder' : ''
      }`
    "
    height="auto"
    :width="`${hiveWidth(hive)}px`"
  >
    <div class="layer-wrapper">
      <v-sheet
        v-for="(layer, l) in orderedLayers(hive)"
        :key="l"
        :color="`${layer.color ? layer.color : '#d6cdc0'}`"
        :class="[`layer ${layer.type}-layer`]"
      >
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    hasQueenExcluder() {
      return this.hive.layers.some((layer) => layer.type === 'queen_excluder')
    },
  },
  methods: {
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
        if (a.order > b.order) {
          return -1
        }
        if (b.order > a.order) {
          return 1
        }
        return 0
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 0, 0, 0.3) !important;
    border-bottom: 0;
    border-radius: 0;
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
    justify-content: flex-start;
    height: 2px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 0, 0, 0.3) !important;
    &::before {
      font-family: 'Material Design Icons';
      font-size: 18px;
      color: $color-grey;
    }
  }
  .queen_excluder-layer {
    &::before {
      margin-left: -16px;
      content: '\F0055';
    }
  }
  .feeding_box-layer {
    justify-content: center;
    &::before {
      margin-top: -16px;
      content: '\F0046';
    }
  }
  &.--has-queen-excluder {
    margin-left: 12px;
  }
}
</style>
