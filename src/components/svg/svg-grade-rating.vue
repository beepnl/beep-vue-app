<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="grade in 10" :key="'g' + grade">
      <text
        :x="x + (grade - 1) * 5 + (grade !== 10 ? 1 : 0) + 'mm'"
        :y="y + 5 + 'mm'"
        class="svg-text"
      >
        {{ grade }}
      </text>
      <svgCheckbox :x="x + (grade - 1) * 5 + 'mm'" :y="y + 6 + 'mm'" />
    </g>
    <g v-if="info">
      <text :x="x + 'mm'" :y="y + 15 + 'mm'" class="svg-text-small">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + 19 + 'mm'"
        class="svg-text-small"
      >
        {{ infoExtra }}
      </text>
    </g>
  </g>
</template>

<script>
import svgCheckbox from '@/src/components/svg/svg-checkbox.vue'

export default {
  components: {
    svgCheckbox,
  },
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
    info: {
      type: String,
      required: false,
      default: null,
    },
    infoExtra: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>
