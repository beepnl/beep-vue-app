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
    position: {
      type: Object,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
}
</script>
