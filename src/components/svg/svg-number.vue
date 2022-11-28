<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="field in fields" :key="field + 1">
      <rect
        :x="x + (field - 1) * 7 + 'mm'"
        :y="y + 3 + 'mm'"
        width="5mm"
        height="8mm"
        stroke="black"
        fill="transparent"
        stroke-width="1"
      />
    </g>

    <circle
      v-if="decimals > 0"
      :cx="x + fieldOffset + 'mm'"
      :cy="y + 10 + 'mm'"
      r="2"
      fill="black"
    />

    <g v-for="decimal in decimals" :key="decimal + 1">
      <rect
        :x="x + fieldOffset + 2 + (decimal - 1) * 7 + 'mm'"
        :y="y + 3 + 'mm'"
        width="5mm"
        height="8mm"
        stroke="black"
        fill="transparent"
        stroke-width="1"
      />
    </g>
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
    fields: {
      type: Number,
      required: false,
      default: 3,
    },
    label: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    fieldOffset() {
      return this.fields * 7
    },
  },
}
</script>
