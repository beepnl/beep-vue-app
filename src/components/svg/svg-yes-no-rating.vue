<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>
    <svgCheckbox :x="x + 'mm'" :y="y + 3 + 'mm'" />
    <text :x="x + 6 + 'mm'" :y="y + 7 + 'mm'" :style="svgInputText">
      {{ $t('yes') }}
    </text>

    <svgCheckbox :x="x + 18 + 'mm'" :y="y + 3 + 'mm'" />
    <text :x="x + 24 + 'mm'" :y="y + 7 + 'mm'" :style="svgInputText">
      {{ $t('no') }}
    </text>
  </g>
</template>

<script>
import svgCheckbox from '@/src/components/svg/svg-checkbox.vue'
import { svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgCheckbox,
  },
  mixins: [svgStyles],
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
