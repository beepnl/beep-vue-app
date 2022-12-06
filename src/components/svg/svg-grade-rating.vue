<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>
    <g v-for="grade in 10" :key="'g' + grade">
      <text
        :x="x + (grade - 1) * 5 + (grade !== 10 ? 1 : 0) + 'mm'"
        :y="y + 5 + 'mm'"
        :style="svgText"
      >
        {{ grade }}
      </text>
      <svgCheckbox :x="x + (grade - 1) * 5 + 'mm'" :y="y + 6 + 'mm'" />
    </g>
    <g v-if="info">
      <text :x="x + 'mm'" :y="y + 15 + 'mm'" :style="svgTextSmall">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + 19 + 'mm'"
        :style="svgTextSmall"
      >
        {{ infoExtra }}
      </text>
    </g>
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
