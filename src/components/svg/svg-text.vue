<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>

    <rect
      v-if="!line"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="width"
      :height="height"
      stroke="black"
      fill="transparent"
      stroke-width="1"
    />

    <line
      v-if="line"
      :x1="x + 'mm'"
      :x2="x + 45 + 'mm'"
      :y1="y + 8 + 'mm'"
      :y2="y + 8 + 'mm'"
      stroke="black"
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
    line: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
