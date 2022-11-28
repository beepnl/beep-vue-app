<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <svgCheckbox :x="x + 'mm'" :y="y + 3 + 'mm'" />
    <text :x="x + 6 + 'mm'" :y="y + 7 + 'mm'" class="svg-up">
      {{ $t('yes') }}
    </text>

    <svgCheckbox :x="x + 18 + 'mm'" :y="y + 3 + 'mm'" />
    <text :x="x + 24 + 'mm'" :y="y + 7 + 'mm'" class="svg-up">
      {{ $t('no') }}
    </text>
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
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
