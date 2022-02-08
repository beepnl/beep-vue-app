<template>
  <div class="d-flex align-end apiary-preview">
    <div
      v-for="(hive, j) in sortedHives"
      :key="j"
      class="hive-icon-wrapper d-flex flex-column align-center"
      @click="selectHive(hive.id)"
    >
      <div v-if="groupMode" class="hive-in-group">
        <v-icon v-if="hivesEditable.includes(hive.id)" class="green--text">
          mdi-pencil-circle
        </v-icon>
        <v-icon v-else-if="hivesSelected.includes(hive.id)" class="green--text">
          mdi-eye-circle
        </v-icon>
      </div>

      <div v-if="inspectionMode" class="hive-in-inspection">
        <v-icon v-if="hivesSelected.includes(hive.id)" class="green--text">
          mdi-check-circle
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
        <div
          :class="
            'hive-icon-layers' +
              (hive.layers.length === 0 ? ' hive-icon-layers--empty' : '')
          "
        >
          <div
            :class="
              `selectable-wrapper ${
                hivesSelected.includes(hive.id) ? '--selected' : ''
              } ${
                inspectionMode && hivesEditable.indexOf(hive.id) === -1
                  ? '--not-editable'
                  : ''
              }`
            "
          >
            <v-sheet
              v-for="(layer, l) in orderedLayers(hive)"
              :key="l"
              :class="[
                `layer ${layer.type}-layer ${
                  inspectionMode && hivesEditable.indexOf(hive.id) === -1
                    ? '--not-editable'
                    : ''
                }`,
              ]"
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
import { orderedLayers } from '@mixins/methodsMixin'

export default {
  mixins: [orderedLayers],
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
    groupMode: {
      type: Boolean,
      default: false,
      required: false,
    },
    inspectionMode: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    sortedHives() {
      const sortedHives = this.hives.slice().sort(function(a, b) {
        // order = null comes last
        // if order is equal, sort by name with number sensitivity (10 comes after 2 instead of 1)
        return (
          (a.order === null) - (b.order === null) ||
          +(a.order > b.order) ||
          -(a.order < b.order) ||
          (a.order === b.order && a.name !== null && b.name !== null
            ? a.name.localeCompare(b.name, undefined, {
                numeric: true,
                sensitivity: 'base',
              })
            : 0)
        )
      })
      return sortedHives
    },
  },
  methods: {
    hasLayer(hive, type) {
      return hive.layers.some((layer) => layer.type === type)
    },
    hiveWidth: function(hive) {
      return hive.layers.length > 0 ? hive.layers[0].framecount * 3.5 : 20
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
  overflow-y: hidden;
}

.hive-in-group,
.hive-in-inspection {
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
    width: auto;
    height: 100%;
    padding: 0 10px;
    margin-bottom: 3px;
    border-bottom: 1px solid #666 !important;
  }
  .hive-icon-layers--empty {
    padding: 0 20px;
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
  &.--not-editable {
    &::before {
      position: absolute;
      display: block;
      width: inherit;
      height: inherit;
      min-height: 2px;
      margin-top: -1px;
      margin-left: -1px;
      content: '';
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}

.selectable-wrapper {
  margin-top: 2px;
  cursor: pointer;
  &.--selected {
    box-shadow: 0 0 0 2px yellow;
  }
  &.--not-editable {
    cursor: not-allowed;
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

.queen_excluder-layer,
.feeding_box-layer {
  &.--not-editable {
    &::before {
      margin-right: -1px;
    }
    &::after {
      color: #bbbbbb;
    }
  }
}

.hive-caption {
  height: 54px;
  line-height: 0.9rem;
  color: $color-grey-dark;
  text-align: center;
  text-overflow: ellipsis;
  word-break: break-word;
}
</style>
