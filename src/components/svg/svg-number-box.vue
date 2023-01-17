<template>
  <rect
    :x="x"
    :y="y"
    :width="numberBoxWidth + 'mm'"
    :height="numberBoxHeight + 'mm'"
    stroke="black"
    fill="transparent"
    :stroke-width="strokeWidth"
  />
</template>

<script>
import { svgData } from '@mixins/svgMixin'

export default {
  mixins: [svgData],
  props: {
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
  },
}
</script>
