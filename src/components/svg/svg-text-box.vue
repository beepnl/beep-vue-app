<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <rect
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="width"
      :height="height"
      stroke="black"
      fill="transparent"
      stroke-width="1"
    />
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
    label: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '80mm',
    },
    height: {
      type: String,
      required: false,
      default: '30mm',
    },
  },
}
</script>
