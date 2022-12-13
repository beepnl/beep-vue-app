<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>

    <line
      v-if="inputTypeNotPresent"
      :x1="x + 'mm'"
      :x2="x + 43 + 'mm'"
      :y1="y + 10 + 'mm'"
      :y2="y + 10 + 'mm'"
      stroke="black"
      stroke-width="0.5"
    />

    <text
      v-if="inputTypeNotPresent"
      :x="x + 'mm'"
      :y="y + 14 + 'mm'"
      :style="svgTextSmall"
    >
      {{ $t('Not_implemented_yet') }}
    </text>

    <rect
      v-else-if="!line"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="width"
      :height="height"
      stroke="black"
      fill="transparent"
      stroke-width="0.5"
    />

    <rect
      v-else-if="line"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="width"
      height="11mm"
      stroke="black"
      fill="transparent"
      stroke-width="0.5"
    />
  </g>
</template>

<script>
import { svgStyles } from '@mixins/svgMixin'

export default {
  mixins: [svgStyles],
  props: {
    position: {
      type: Object,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '43mm',
    },
    height: {
      type: String,
      required: false,
      default: '27mm',
    },
    line: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputTypeNotPresent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
}
</script>
