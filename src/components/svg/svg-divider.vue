<template>
  <line
    x1="12mm"
    x2="198mm"
    :y1="y + 'mm'"
    :y2="y + 'mm'"
    stroke="black"
    :stroke-width="strokeWidth"
  />
</template>

<script>
import { svgData } from '@mixins/svgMixin'

export default {
  mixins: [svgData],
  props: {
    y: {
      type: Number,
      required: true,
    },
  },
}
</script>
