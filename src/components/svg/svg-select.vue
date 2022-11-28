<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="(item, index) in items" :key="'item-' + index">
      <svgCheckbox :x="x + 'mm'" :y="y + 3 + index * 7 + 'mm'" />
      <text :x="x + 6 + 'mm'" :y="y + 6 + index * 7 + 'mm'" class="svg-up">
        {{ itemText(item) }}
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
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
  },
  methods: {
    itemText(item) {
      return item.trans !== null && item.trans[this.locale] !== undefined
        ? item.trans[this.locale]
        : item.name
    },
  },
}
</script>
