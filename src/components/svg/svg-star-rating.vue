<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="star in [0, 1, 2, 3, 4]" :key="star + 1">
      <svg
        :x="x + star * 7 + 'mm'"
        :y="y + 2 + 'mm'"
        width="6mm"
        height="6mm"
        viewBox="0 0 24 24"
      >
        <path
          class="f-color-grey"
          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
        />
      </svg>
      <svgCheckbox :x="x + 1 + star * 7 + 'mm'" :y="y + 9 + 'mm'" />
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
  },
}
</script>
