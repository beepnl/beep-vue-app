<template>
  <rect
    data-type="single-digit"
    :x="x"
    :y="y"
    :data-category-id="categoryId"
    :data-parent-category-id="parentId"
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
    categoryId: {
      type: [String, Number],
      required: false,
      default: null,
    },
    parentId: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
}
</script>
