<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'">
      <tspan class="svg-header">{{ header }}</tspan>
      -
      <tspan class="svg-text">{{ subHeader }}</tspan>
    </text>
  </g>
</template>

<script>
export default {
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
