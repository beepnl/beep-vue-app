<template>
  <div class="d-flex align-end apiary-line">
    <v-sheet
      v-for="(hive, j) in hives"
      :key="j"
      :class="
        `hive-icon d-flex flex-column justify-center align-center white--text text--small mr-1`
      "
      height="auto"
    >
      <div class="hive-icon-layers">
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
        {{ hive.prefix }}
      </span>
    </v-sheet>
  </div>
</template>

<script>
export default {
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
    // hasQueenExcluder(hive) {
    //   return hive.layers.some((layer) => layer.type === 'queen_excluder')
    // },
    hives() {
      var array = []
      for (var n = 0; n < this.numberOfHives; n++) {
        array.push(this.newHive)
      }
      return array // TODO: get hives from hives endpoint? return this.$store.getters['hives/getHivesForApiary'](this.apiary.id)
    },
    // highestHive() {
    //   return Math.max(
    //     ...this.apiaries.map((apiary) =>
    //       Math.max(...apiary.hives.map((hive) => hive.layers.length))
    //     )
    //   )
    // },
    // widestApiary() {
    //   return Math.max(
    //     ...this.apiaries.map((apiary) =>
    //       apiary.hives.reduce(
    //         (framecount, hive) => framecount + hive.layers[0].framecount,
    //         0
    //       )
    //     )
    //   )
    // },
  },
  methods: {
    // hiveHeight: function(hive) {
    //   return ((this.totalLayers(hive)) / this.highestHive) * 100
    // },
    // TODO: reconsider height and width calculation
    // Now hiveWidth is static value + overflow-x auto if too many hives in apiary
    // What to do with differing bb width & height?
    // Now apiary height is set to 78px. If hive is too high it just pokes out except with overflow-x auto it is cut off anyway
    // Maybe calculate max hiveHeight in px and when it's higher than 78, set this value as apiary height?
    hiveWidth: function(hive) {
      const orderedLayers = this.orderedLayers(hive)
      return orderedLayers[orderedLayers.length - 1].framecount * 4 // hive.layers[0].framecount * 4
    },
    orderedLayers: function(hive) {
      return hive.layers.slice().sort(function(a, b) {
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
// .apiary-line {
//   height: 78px;
//   overflow-x: auto;
//   border-bottom: 1px solid green;
.hive-icon {
  position: relative;
  min-width: 40px;
  margin-right: 0 !important;
  border-radius: 2px 2px 0 0;
  .hive-icon-layers {
    width: 100%;
    height: 100%;
    padding: 0 8px;
    margin-bottom: 3px;
    border-bottom: 1px solid green !important;
  }
  &.--has-queen-excluder {
    margin-right: 10px !important;
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
.hive-caption {
  z-index: 1;
  line-height: 0.9rem;
  color: white;
  text-shadow: 1px 1px black;
}
// }
</style>
