<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <text :x="x + 'mm'" :y="y + 'mm'">
      <tspan :style="small ? svgHeaderSmall : svgHeader">{{ header }}</tspan>
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
    small: {
      type: Boolean,
      required: false,
      default: false,
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
