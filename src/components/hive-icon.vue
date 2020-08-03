<template>
  <v-sheet
    :class="
      `hive-icon d-flex flex-column justify-center align-center white--text text--small mr-1 ${
        hasQueenExcluder ? '--has-queen-excluder' : ''
      } ${apiaryView ? 'apiary-view' : ''}`
    "
    height="auto"
  >
    <div class="hive-icon-layers">
      <v-sheet
        v-for="(layer, l) in orderedLayers(hive)"
        :key="l"
        :color="checkColor(layer)"
        :class="[`layer ${layer.type}-layer`]"
        :width="`${hiveWidth(hive)}px`"
      >
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    ...mapGetters('locations', ['apiaryListView']),
    hasQueenExcluder() {
      return this.hive.layers.some((layer) => layer.type === 'queen_excluder')
    },
    apiaryView() {
      if (this.apiaryListView === 'apiaryView') {
        return true
      }
      return false
    },
  },
  methods: {
    hiveWidth: function(hive) {
      if (!this.apiaryView) {
        return hive.layers[0].framecount * 6
      } else {
        return hive.layers[0].framecount * 3.5
      }
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
    checkColor(layer) {
      if (layer.color !== null) {
        return layer.color
      } else if (this.hive.color !== null) {
        return this.hive.color
      } else {
        return '#ffa000'
      }
    },
  },
}
</script>

<style lang="scss">
.hive-icon {
  position: relative;
  min-width: 40px;
  padding: 0 8px;
  margin-bottom: 3px;
  border-bottom: 1px solid green !important;
  border-radius: 2px 2px 0 0;
  .hive-icon-layers {
    width: 100%;
    height: 100%;
  }
  &.apiary-view {
    margin-right: 0 !important;
  }
  &.--has-queen-excluder {
    padding-right: 12px;
  }
}

.layer {
  min-width: 40px;
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

.hive-icon {
  .honey-layer {
    height: 18px;
  }
  .brood-layer {
    height: 30px;
  }
  &.apiary-view {
    .honey-layer {
      height: 9px;
    }
    .brood-layer {
      height: 16px;
    }
  }
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
</style>