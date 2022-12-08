<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>

    <text v-if="prepend" :x="x + 'mm'" :y="y + 6 + 'mm'" :style="svgAppend">
      {{ prepend }}
    </text>

    <g v-if="decimals === 0">
      <rect
        :x="x + prependOffset + 'mm'"
        :y="y + 3 + 'mm'"
        :width="textFieldWidth + 'mm'"
        height="8mm"
        stroke="black"
        fill="transparent"
        stroke-width="1"
      />
      <text
        v-if="append"
        :x="x + prependOffset + textFieldWidth + 1 + 'mm'"
        :y="y + 9 + 'mm'"
        :style="svgAppend"
      >
        {{ append }}
      </text>
    </g>

    <g v-else-if="decimals > 0">
      <svgNumberBox
        v-for="field in fields"
        :key="field + 1"
        :x="x + (field - 1) * 5 + 'mm'"
        :y="y + 3 + 'mm'"
      />

      <circle
        :cx="x + fieldOffset + 1 + 'mm'"
        :cy="y + 10 + 'mm'"
        r="2"
        fill="black"
      />

      <svgNumberBox
        v-for="decimal in decimals"
        :key="'d-' + decimal"
        :x="x + fieldOffset + 2 + (decimal - 1) * 5 + 'mm'"
        :y="y + 3 + 'mm'"
      />
    </g>

    <g v-if="info">
      <text :x="x + 'mm'" :y="y + 15 + 'mm'" :style="svgTextSmall">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + 19 + 'mm'"
        :style="svgTextSmall"
      >
        {{ infoExtra }}
      </text>
    </g>
  </g>
</template>

<script>
import svgNumberBox from '@/src/components/svg/svg-number-box.vue'
import { svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgNumberBox,
  },
  mixins: [svgStyles],
  props: {
    position: {
      type: Object,
      required: true,
    },

    fields: {
      type: Number,
      required: false,
      default: 3,
    },
    label: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
    },
    append: {
      type: String,
      required: false,
      default: null,
    },
    info: {
      type: String,
      required: false,
      default: null,
    },
    infoExtra: {
      type: String,
      required: false,
      default: null,
    },
    prepend: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      textFieldWidth: 25,
    }
  },
  computed: {
    fieldOffset() {
      return this.fields * 5
    },
    prependOffset() {
      return this.prepend ? 5 : 0
    },
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
}
</script>
