<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <g v-for="grade in 10" :key="'g' + grade">
      <text
        :x="x + (grade - 1) * 4.5 + (grade !== 10 ? 0.5 : -0.5) + 'mm'"
        :y="y + 5 + 'mm'"
        :style="svgText"
      >
        {{ grade }}
      </text>
      <svgCheckbox
        :x="x + (grade - 1) * 4.5 + 'mm'"
        :y="y + 6 + 'mm'"
        :category-id="'grade'"
        :parent-id="position.id"
      />
    </g>
    <g v-if="info">
      <text :x="x + 'mm'" :y="y + 14 + 'mm'" :style="svgTextSmall">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + 17.5 + 'mm'"
        :style="svgTextSmall"
      >
        {{ infoExtra }}
      </text>
    </g>
  </g>
</template>

<script>
import svgCheckbox from '@/src/components/svg/svg-checkbox.vue'
import svgLabel from '@/src/components/svg/svg-label.vue'
import { svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgCheckbox,
    svgLabel,
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
