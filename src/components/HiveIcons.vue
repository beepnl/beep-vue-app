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
      :class="
        `hive-icon d-flex justify-center align-end white--text text--small mr-1 ${
          hive.selected ? '--selected' : ''
        }`
      "
      :key="j"
      :height="`${hiveHeight(hive)}%`"
      :width="`${hiveWidth(hive)}%`"
      :color="hive.color"
      @click="editable ? selectHive(hive) : null"
    >
      <v-sheet
        class="honey-layer"
        width="100%"
        :height="`${(hive.honey / (hive.brood + hive.honey)) * 100}%`"
      ></v-sheet>
      <span class="hive-caption caption">
        {{ j + 1 }}
      </span>
    </v-sheet>
    <v-btn v-if="editable" icon slot="footer" @click="addHive">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </draggable>
</template>

<script>
// FIXME: change the hive :key to a unique hive id instead of array index,
// see https://github.com/SortableJS/Vue.Draggable#gotchas
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    draggable,
  },
  props: {
    editable: {
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
    ...mapGetters('apiaries', ['highestHive', 'widestApiary']),
    dragOptions() {
      return {
        animation: 200,
        disabled: !this.editable,
      }
    },
    hives: {
      get() {
        return this.apiary.hives
      },
      set(hives) {
        this.$store.commit('apiaries/setHives', {
          apiary: this.apiary,
          hives: hives,
        })
      },
    },
  },
  methods: {
    ...mapActions('apiaries', ['addHive', 'selectHive']),
    hiveHeight: function(hive) {
      return ((hive.honey + hive.brood) / this.highestHive) * 100
    },
    hiveWidth: function(hive) {
      return (hive.frames / this.widestApiary) * 90
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-line {
  height: 30px;
  border-bottom: 1px solid green;
  .hive-icon {
    position: relative;
    .honey-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.--selected {
      box-shadow: 0 0 0 2px yellow;
    }
  }
  .hive-caption {
    z-index: 1;
    color: white;
    text-shadow: 1px 1px black;
    line-height: 0.9rem;
  }
}
</style>
