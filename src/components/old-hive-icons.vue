<template>
  <draggable
    v-model="hives"
    draggable=".hive-icon"
    v-bind="dragOptions"
    class="d-flex align-end apiary-line"
    @start="drag = true"
    @end="drag = false"
  >
    <v-sheet
      v-for="(hive, j) in hives"
      :key="j"
      :class="
        `hive-icon d-flex justify-center align-end white--text text--small mr-1 ${
          hive.selected ? '--selected' : ''
        }`
      "
      height="auto"
      :width="`${hiveWidth(hive)}px`"
      :color="hive.color"
      @click="selectHive(hive)"
    >
      <div
        v-for="(layer, l) in orderedLayers(hive)"
        :key="l"
        :class="[`${layer.type}-layer`]"
      >
      </div>
      <!-- <span class="hive-caption caption">
        {{ hive.name }}
      </span> -->
    </v-sheet>
    <div slot="footer">
      <div v-if="!hives.length">
        No hives in this apiary
      </div>
      <v-btn v-if="!disabled || !hives.length" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </draggable>
</template>

<script>
// FIXME: change the hive :key to a unique hive id instead of array index,
// see https://github.com/SortableJS/Vue.Draggable#gotchas
import draggable from 'vuedraggable'
// import { mapGetters } from 'vuex'

export default {
  components: {
    draggable,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    apiary: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: function() {
    return {
      drag: false,
    }
  },
  computed: {
    // ...mapGetters('locations', ['apiaries']),
    hives() {
      return this.apiary.hives // TODO: get hives from hives endpoint? return this.$store.getters['hives/getHivesForApiary'](this.apiary.id)
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
    dragOptions() {
      return {
        animation: 200,
        disabled: this.disabled,
      }
    },
  },
  methods: {
    selectHive: function(hive) {
      this.$store.dispatch('locations/selectHive', hive) // Or this.$set(hive, 'selected', !hive.selected)
    },
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
.apiary-line {
  height: 78px;
  overflow-x: auto;
  border-bottom: 1px solid green;
  .hive-icon {
    position: relative;
    flex-direction: column;
    min-width: 35px;
    margin-right: 6px !important; // overwrites vuetify
    overflow: hidden;
    border-radius: 2px 2px 0 0;
    .honey-layer,
    .brood-layer {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-bottom: 0;
    }
    .honey-layer {
      height: 12px;
    }
    .brood-layer {
      height: 18px;
    }
    &.--selected {
      box-shadow: 0 0 0 2px yellow;
    }
  }
  .hive-caption {
    z-index: 1;
    line-height: 0.9rem;
    color: white;
    text-shadow: 1px 1px black;
  }
}
</style>
