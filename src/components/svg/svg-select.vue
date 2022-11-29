<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-if="!presetItems">
      <template v-for="(item, index) in flattenedItems">
        <svgCheckbox
          v-if="!item.hasChildren"
          :key="'item-' + index"
          :x="x + item.depth * 5 + 'mm'"
          :y="y + 3 + index * 7 + 'mm'"
        />
        <text
          :key="'text-' + index"
          :x="x + item.depth * 5 + (!item.hasChildren ? 6 : 0) + 'mm'"
          :y="y + 6 + index * 7 + 'mm'"
          class="svg-input-text"
        >
          {{ itemText(item) }}
        </text>
      </template>
    </g>

    <g v-else>
      <template v-for="(item, index) in presetItems">
        <svgCheckbox
          :key="'item-' + index"
          :x="x + 'mm'"
          :y="y + 3 + index * 7 + 'mm'"
        />
        <text
          :key="'text-' + index"
          :x="x + 6 + 'mm'"
          :y="y + 6 + index * 7 + 'mm'"
          class="svg-input-text"
        >
          {{ item }}
        </text>
      </template>
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
      required: false,
      default: null,
    },
    scoreAmount: {
      type: Boolean,
      required: false,
      default: false,
    },
    scoreQuality: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    flattenedItems() {
      return this.items !== null ? this.flattenItems(this.items) : []
    },
    presetItems() {
      return this.scoreAmount
        ? this.scoreAmountItems
        : this.scoreQuality
        ? this.scoreQualityItems
        : false
    },
    scoreAmountItems() {
      return [
        this.$i18n.t('Low'),
        this.$i18n.t('Medium'),
        this.$i18n.t('High'),
        this.$i18n.t('Extreme'),
      ]
    },
    scoreQualityItems() {
      return [
        this.$i18n.t('Poor'),
        this.$i18n.t('Fair'),
        this.$i18n.t('Good'),
        this.$i18n.t('Excellent'),
      ]
    },
  },
  methods: {
    flattenItems(data, depth = 0) {
      return data.reduce((r, { children, trans, name }) => {
        const obj = { trans, name, depth, hasChildren: children.length > 0 }
        r.push(obj)

        if (children.length) {
          r.push(...this.flattenItems(children, depth + 1))
        }

        return r
      }, [])
    },
    itemText(item) {
      return item.trans !== null && item.trans[this.locale] !== undefined
        ? item.trans[this.locale]
        : item.name
    },
  },
}
</script>
