<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'">
      <tspan :style="svgHeader">{{ header }}</tspan>
      -
      <tspan :style="svgText">{{ subHeader }}</tspan>
    </text>
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
    header: {
      type: String,
      required: true,
    },
    subHeader: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
