<template>
  <rect
    data-type="checkbox"
    :data-category-id="categoryId"
    :data-label="label"
    :data-parent-category-id="parentId"
    :x="x"
    :y="y"
    :width="checkBoxSize + 'mm'"
    :height="checkBoxSize + 'mm'"
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
    label: {
      type: String,
      required: false,
      default: '',
    },
    parentId: {
      type: [String, Number],
      required: false,
      default: '',
    },
  },
}
</script>
