<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <svgCheckbox
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :category-id="'boolean'"
      :parent-id="position.id"
    />
    <text :x="x + 5 + 'mm'" :y="y + 5 + 'mm'" :style="svgInputText">
      {{ $t('yes') }}
    </text>

    <svgCheckbox
      :x="x + 17 + 'mm'"
      :y="y + 2 + 'mm'"
      :category-id="'boolean'"
      :parent-id="position.id"
    />
    <text :x="x + 22 + 'mm'" :y="y + 5 + 'mm'" :style="svgInputText">
      {{ $t('no') }}
    </text>
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
