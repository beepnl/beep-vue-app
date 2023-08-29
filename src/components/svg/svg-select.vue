<!-- eslint-disable camelcase -->
<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <g v-if="items && flattenedItems.length <= maxNrOfItems">
      <template v-for="(item, index) in flattenedItems">
        <svgCheckbox
          v-if="!item.hasChildren"
          :key="'item-' + index"
          :x="x + item.depth * checkBoxSpace + 'mm'"
          :y="y + 2 + index * checkBoxSpace + 'mm'"
          :category-id="item.id"
          :label="label"
          :parent-id="item.parent_id"
        />
        <text
          :key="'text-' + index"
          :x="
            x + item.depth * checkBoxSpace + (!item.hasChildren ? 6 : 0) + 'mm'
          "
          :y="y + 5 + index * checkBoxSpace + 'mm'"
          :style="svgInputText"
        >
          {{ itemText(item) }}
        </text>
      </template>
    </g>

    <g v-else-if="flattenedItems.length > maxNrOfItems">
      <rect
        data-type="text"
        :data-label="label"
        :data-parent-category-id="position.id"
        :x="x + 'mm'"
        :y="y + 2 + 'mm'"
        :width="maxFieldWidth + 'mm'"
        height="11mm"
        stroke="black"
        fill="transparent"
        :stroke-width="strokeWidth"
      />
      <text :x="x + 'mm'" :y="y + 17 + 'mm'" :style="svgTextSmall">
        {{ $t('Too_many_items_exp_1') }}
      </text>
      <text :x="x + 'mm'" :y="y + 20.5 + 'mm'" :style="svgTextSmall">
        {{ $t('Too_many_items_exp_2') }}
      </text>
    </g>

    <g v-else-if="starRating">
      <template v-for="(stars, index) in maxStars">
        <svgCheckbox
          :key="'stc-' + stars"
          :x="x + 'mm'"
          :category-id="'stars'"
          :label="label"
          :parent-id="position.id"
          :y="y + 2 + index * checkBoxSpace + 'mm'"
        />
        <template v-for="star in stars">
          <svg
            :key="'sc' + index + star"
            :x="x + star * 5.2 + 'mm'"
            :y="y + 1 + index * checkBoxSpace + 'mm'"
            width="5mm"
            height="5mm"
            viewBox="0 0 24 24"
          >
            <path
              :style="fillColorGrey"
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
            />
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
          :y="y + 2 + index * checkBoxSpace + 'mm'"
          :category-id="'score'"
          :label="label"
          :parent-id="position.id"
        />
        <text
          :key="'text-' + index"
          :x="x + checkBoxSpace + 'mm'"
          :y="y + 5 + index * checkBoxSpace + 'mm'"
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
import svgLabel from '@/src/components/svg/svg-label.vue'
import { svgData, svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgCheckbox,
    svgLabel,
  },
  mixins: [svgData, svgStyles],
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
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
  created() {
    this.checkListLengthWarning()
  },
  methods: {
    checkListLengthWarning() {
      if (this.flattenedItems.length > this.maxNrOfItems) {
        var warning =
          this.$i18n.t('Too_long_list_present') +
          ' "' +
          this.label +
          '". ' +
          this.$i18n.t('Too_long_list_present_fix_1') +
          ' ' +
          this.maxNrOfItems +
          ' ' +
          this.$i18n.t('Too_long_list_present_fix_2')
        this.$store.commit('inspections/addWarning', {
          id: this.position.id,
          warning,
        })
      } else {
        this.$store.commit('inspections/removeWarning', this.position.id)
      }
    },
    flattenItems(data, depth = 0) {
      // eslint-disable-next-line camelcase
      return data.reduce((r, { children, id, parent_id, trans, name }) => {
        const obj = {
          id,
          parent_id: this.items[0].parent_id, // always use parent_id from highest level because otherwise parsed results for each checkbox item cannot be related back to the parent item
          trans,
          name,
          depth,
          hasChildren: children.length > 0,
        }
        r.push(obj)

        if (children.length) {
          r.push(...this.flattenItems(children, depth + 1))
        }

        return r
      }, [])
    },
    itemText(item) {
      var text =
        item.trans !== null && item.trans[this.locale] !== undefined
          ? item.trans[this.locale]
          : item.name
      var maxLength = this.maxItemLength - item.depth * 4
      return text.substring(0, maxLength)
    },
  },
}
</script>
