<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'">
      <tspan :style="svgHeader">{{ header }}</tspan>
      <tspan v-if="subHeader" :style="svgText">{{ ' - ' + subHeader }}</tspan>
    </text>
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
