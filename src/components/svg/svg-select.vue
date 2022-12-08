<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>
    <g v-if="items && flattenedItems.length <= 6">
      <template v-for="(item, index) in flattenedItems">
        <svgCheckbox
          v-if="!item.hasChildren"
          :key="'item-' + index"
          :x="x + item.depth * checkBoxSpace + 'mm'"
          :y="y + 3 + index * checkBoxSpace + 'mm'"
        />
        <text
          :key="'text-' + index"
          :x="
            x + item.depth * checkBoxSpace + (!item.hasChildren ? 6 : 0) + 'mm'
          "
          :y="y + 6 + index * checkBoxSpace + 'mm'"
          :style="svgInputText"
        >
          {{ itemText(item) }}
        </text>
      </template>
    </g>

    <g v-else-if="flattenedItems.length > 6">
      <rect
        :x="x + 'mm'"
        :y="y + 3 + 'mm'"
        width="42mm"
        height="11mm"
        stroke="black"
        fill="transparent"
        stroke-width="1"
      />
      <text :x="x + 'mm'" :y="y + 18 + 'mm'" :style="svgTextSmall">
        {{ $t('Too_many_items_exp_1') }}
      </text>
      <text :x="x + 'mm'" :y="y + 22 + 'mm'" :style="svgTextSmall">
        {{ $t('Too_many_items_exp_2') }}
      </text>
    </g>

    <g v-else-if="starRating">
      <template v-for="(stars, index) in maxStars">
        <svgCheckbox
          :key="'stc-' + stars"
          :x="x + 'mm'"
          :y="y + 3 + index * checkBoxSpace + 'mm'"
        />
        <template v-for="star in stars">
          <svg
            :key="'sc' + index + star"
            :x="x + star * 5.2 + 'mm'"
            :y="y + 2 + index * checkBoxSpace + 'mm'"
            width="5mm"
            height="5mm"
            viewBox="0 0 24 24"
          >
            <path
              :style="fillColorGrey"
              d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
            />
          </svg>
        </template>
      </template>
    </g>

    <g v-else>
      <template v-for="(item, index) in presetItems">
        <svgCheckbox
          :key="'item-' + index"
          :x="x + 'mm'"
          :y="y + 3 + index * checkBoxSpace + 'mm'"
        />
        <text
          :key="'text-' + index"
          :x="x + checkBoxSpace + 'mm'"
          :y="y + 6 + index * checkBoxSpace + 'mm'"
          :style="svgInputText"
        >
          {{ item }}
        </text>
      </template>
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
    position: {
      type: Object,
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
    starRating: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      checkBoxSpace: 5,
      maxStars: 5,
    }
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
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
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
