<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-if="!presetItems">
      <template v-for="(item, index) in items">
        <svgCheckbox
          :key="'item-' + index"
          :x="x + 'mm'"
          :y="y + 3 + index * 7 + 'mm'"
        />
        <text
          :key="'text-' + index"
          :x="x + 6 + 'mm'"
          :y="y + 6 + index * 7 + 'mm'"
          class="svg-up"
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
          class="svg-up"
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
    itemText(item) {
      return item.trans !== null && item.trans[this.locale] !== undefined
        ? item.trans[this.locale]
        : item.name
    },
  },
}
</script>
