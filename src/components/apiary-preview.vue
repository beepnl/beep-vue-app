<template>
  <div class="d-flex align-end apiary-preview">
    <v-sheet
      v-for="(hive, j) in hives"
      :key="j"
      :class="
        `hive-icon hive-icon-preview d-flex flex-column justify-center align-center white--text text--small mr-1 ${
          hasLayer(hive, 'queen_excluder') ? 'has-queen-excluder' : ''
        } ${hasLayer(hive, 'feeding_box') ? 'has-feeding-box' : ''}`
      "
      height="auto"
    >
      <div
        :class="
          'hive-icon-layers' +
            (hive.layers.length === 0 ? ' hive-icon-layers--empty' : '')
        "
      >
        <v-sheet
          v-for="(layer, l) in orderedLayers(hive)"
          :key="l"
          :class="[`layer ${layer.type}-layer`]"
          :width="`${hiveWidth(hive)}px`"
          :color="layer.color"
        >
        </v-sheet>
      </div>
      <span class="hive-caption caption">
        {{ hive.prefix }} {{ j + hive.offset }}
      </span>
    </v-sheet>
  </div>
</template>

<script>
import { orderedLayers } from '@mixins/methodsMixin'

export default {
  mixins: [orderedLayers],
  props: {
    newHive: {
      type: Object,
      default: null,
      required: true,
    },
    numberOfHives: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  computed: {
    hasQueenExcluder(hive) {
      return this.newHive.layers.some(
        (layer) => layer.type === 'queen_excluder'
      )
    },
    hives() {
      var array = []
      for (var n = 0; n < this.numberOfHives; n++) {
        array.push(this.newHive)
      }
      return array
    },
  },
  methods: {
    hasLayer(hive, type) {
      return hive.layers.some((layer) => layer.type === type)
    },
    hiveWidth: function(hive) {
      return hive.layers.length > 0 ? hive.layers[0].framecount * 6 : 16
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-preview {
  overflow-x: auto;
}

.hive-icon-preview {
  position: relative;
  padding: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  border-bottom: 0 !important;
  border-radius: 2px 2px 0 0;
  .hive-icon-layers {
    width: 100%;
    height: 100%;
    padding: 0 8px;
    border-bottom: 1px solid #666 !important;
  }
  .hive-icon-layers--empty {
    padding: 0 16px;
  }
  &.has-queen-excluder {
    .hive-icon-layers {
      padding: 0 14px !important;
    }
  }
  &.has-feeding-box {
    margin-top: 20px !important;
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
.hive-caption {
  z-index: 1;
  max-width: 64px;
  margin-top: 3px;
  min-height: 30px;
  line-height: 0.9rem;
  color: $color-grey-dark;
  text-align: center;
  word-break: break-word;
}
</style>
