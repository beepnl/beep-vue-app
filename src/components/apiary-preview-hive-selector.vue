<template>
  <div class="d-flex align-end apiary-preview">
    <div
      v-for="(hive, j) in sortedHives"
      :key="j"
      class="hive-icon-wrapper d-flex flex-column align-center"
      @click="selectHive(hive.id)"
    >
      <div v-if="showIcons" class="hive-in-group">
        <v-icon v-if="hivesEditable.includes(hive.id)" class="green--text">
          mdi-pencil-circle
        </v-icon>
        <v-icon v-else-if="hivesSelected.includes(hive.id)" class="green--text">
          mdi-eye-circle
        </v-icon>
      </div>

      <v-sheet
        :class="
          `hive-icon hive-icon-preview d-flex flex-column justify-center align-center white--text text--small mr-1 ${
            hasLayer(hive, 'queen_excluder') ? 'has-queen-excluder' : ''
          } ${hasLayer(hive, 'feeding_box') ? 'has-feeding-box' : ''}`
        "
        height="auto"
      >
        <div class="hive-icon-layers">
          <div
            :class="
              `selectable-wrapper ${
                hivesSelected.includes(hive.id) ? '--selected' : ''
              }`
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
        </div>
        <span
          :style="`width: ${hiveWidth(hive) + 16}px;`"
          class="hive-caption caption"
          >{{ hive.name }}</span
        >
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hives: {
      type: Array,
      default: null,
      required: true,
    },
    hivesEditable: {
      type: Array,
      default: () => [],
      required: false,
    },
    hivesSelected: {
      type: Array,
      default: () => [],
      required: false,
    },
    showIcons: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    sortedHives() {
      const sortedHives = this.hives.slice().sort(function(a, b) {
        if (a.order > b.order) {
          return 1
        }
        if (b.order > a.order) {
          return -1
        }
        if (a.order === b.order) {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        }
      })
      return sortedHives
    },
  },
  methods: {
    hasLayer(hive, type) {
      return hive.layers.some((layer) => layer.type === type)
    },
    hiveWidth: function(hive) {
      return hive.layers[0].framecount * 3.5
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
    selectHive(id) {
      this.$emit('select-hive', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-preview {
  overflow-x: auto;
}

.hive-in-group {
  height: 24px;
  margin-bottom: 1px;
  cursor: pointer;
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
    padding: 0 10px;
    margin-bottom: 3px;
    border-bottom: 1px solid green !important;
  }
  &.has-queen-excluder {
    .hive-icon-layers {
      padding: 0 14px !important;
    }
  }
  &.has-feeding-box {
    margin-top: 12px !important;
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

.selectable-wrapper {
  margin-top: 2px;
  cursor: pointer;
  &.--selected {
    box-shadow: 0 0 0 2px yellow;
  }
}

.honey-layer {
  height: 9px !important;
}
.brood-layer {
  height: 16px !important;
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
  height: 42px;
  line-height: 0.9rem;
  color: $color-grey-dark;
  text-align: center;
  word-break: break-word;
}
</style>
