<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>
    <!-- <text
      v-if="label.length > maxLabelLength"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :style="svgLabel"
    >
      {{ label.substring(maxLabelLength) }}
    </text> -->
  </g>
</template>

<script>
import { svgStyles } from '@mixins/svgMixin'

export default {
  mixins: [svgStyles],
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
