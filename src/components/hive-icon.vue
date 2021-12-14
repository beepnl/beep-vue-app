<template>
  <v-sheet
    :class="
      `hive-icon d-flex flex-column justify-center align-center white--text text--small mr-1 ${
        hasLayer('queen_excluder') ? 'has-queen-excluder' : ''
      } ${hasLayer('feeding_box') ? 'has-feeding-box' : ''} ${
        xsView ? 'xs-view' : diaryView ? 'xs-view diary-view' : ''
      }`
    "
    height="auto"
    @click="showHiveMenu($event)"
  >
    <div
      :class="
        'hive-icon-layers' +
          (hive.layers.length === 0 ? ' hive-icon-layers--empty' : '')
      "
      :style="`${showHive ? 'z-index: 6;' : ''}`"
    >
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
import { orderedLayers } from '@mixins/methodsMixin'

export default {
  mixins: [orderedLayers],
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
    diaryView: {
      type: Boolean,
      default: false,
    },
    showHive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('locations', ['hiveView']),
    xsView() {
      if (this.hiveView === 'xsView') {
        return true
      }
      return false
    },
  },
  methods: {
    checkColor(layer) {
      if (layer.color !== null) {
        return layer.color
      } else if (this.hive.color !== null) {
        return this.hive.color
      } else {
        return '#F8B133'
      }
    },
    hasLayer(type) {
      return this.hive.layers.some((layer) => layer.type === type)
    },
    hiveWidth: function(hive) {
      if (hive.layers.length > 0) {
        if (this.xsView || this.diaryView) {
          return hive.layers[0].framecount * 3.5
        } else {
          return hive.layers[0].framecount * 6
        }
      } else {
        return 20
      }
    },
    showHiveMenu(event) {
      this.$emit('show-hive-menu', event)
    },
  },
}
</script>

<style lang="scss">
.hive-icon {
  position: relative;
  padding: 0 8px;
  margin-bottom: 3px;
  background-color: transparent !important;
  border-bottom: 1px solid #666 !important;
  border-radius: 2px 2px 0 0;
  .honey-layer {
    height: 18px;
  }
  .brood-layer {
    height: 30px;
  }
  .hive-icon-layers {
    width: 100%;
    height: 100%;
  }
  .hive-icon-layers--empty {
    min-width: 20px; // empty hive
  }
  &.xs-view {
    margin-right: 0 !important;
    &.has-feeding-box {
      margin-top: 12px;
    }
    .honey-layer {
      height: 9px;
    }
    .brood-layer {
      height: 16px;
    }
  }
  &.has-queen-excluder {
    padding-right: 12px;
    &.diary-view {
      margin-left: 4px !important;
    }
  }
}

.layer {
  min-width: 8px;
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
