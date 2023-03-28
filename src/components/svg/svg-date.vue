<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <g v-for="(item, index) in dateFormat" :key="item.title + index">
      <text :x="x + item.offset + 'mm'" :y="y + 4 + 'mm'" :style="svgTextSmall">
        {{ item.title }}
      </text>
      <text
        v-if="!item.first"
        :x="x + item.offset - 2 + 'mm'"
        :y="y + 10 + 'mm'"
        width="3mm"
        :style="svgText"
      >
        -
      </text>
      <g v-for="field in item.fields" :key="item.title + '-f-' + field">
        <svgNumberBox
          :x="x + item.offset + (field - 1) * numberBoxWidth + 'mm'"
          :y="y + 5 + 'mm'"
          :category-id="'date-field'"
          :parent-id="position.id"
        />
      </g>
    </g>
    <g v-if="time">
      <g v-for="(item, index) in timeFormat" :key="item.title + index">
        <text
          :x="x + timeXOffset(item) + 'mm'"
          :y="y + timeYOffset + 4 + 'mm'"
          :style="svgTextSmall"
        >
          {{ item.title }}
        </text>
        <text
          v-if="!item.first"
          :x="x + timeXOffset(item) - 2 + 'mm'"
          :y="y + timeYOffset + 10 + 'mm'"
          width="3mm"
          :style="svgText"
        >
          :
        </text>
        <g v-for="field in item.fields" :key="item.title + '-h-' + field">
          <svgNumberBox
            :x="x + timeXOffset(item) + (field - 1) * numberBoxWidth + 'mm'"
            :y="y + timeYOffset + 5 + 'mm'"
            :category-id="'time'"
            :parent-id="position.id"
          />
        </g>
      </g>
    </g>
  </g>
</template>

<script>
import svgLabel from '@/src/components/svg/svg-label.vue'
import svgNumberBox from '@/src/components/svg/svg-number-box.vue'
import { svgData, svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgLabel,
    svgNumberBox,
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
    time: {
      type: Boolean,
      required: false,
      default: false,
    },
    columns: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  computed: {
    dateFormat() {
      return [
        {
          title: this.$i18n.t('year'),
          fields: 4,
          offset: 0,
          first: true,
        },
        {
          title: this.$i18n.t('month'),
          fields: 2,
          offset: 4 * this.numberBoxWidth + this.spaceWidth,
        },
        {
          title: this.$i18n.tc('Day', 1),
          fields: 2,
          offset: 6 * this.numberBoxWidth + 2 * this.spaceWidth,
        },
      ]
    },
    timeFormat() {
      return [
        {
          title: this.$i18n.tc('Hour_short', 2) + ' (24)',
          fields: 2,
          offset: 8 * this.numberBoxWidth + 3 * this.spaceWidth,
          first: true,
          index: 0,
        },
        {
          title: this.$i18n.tc('Minute', 2),
          fields: 2,
          offset: 10 * this.numberBoxWidth + 4 * this.spaceWidth,
          index: 1,
        },
      ]
    },
    timeYOffset() {
      return this.columns === 1 ? 13 : 0
    },
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
  methods: {
    timeXOffset(item) {
      return this.columns === 1
        ? item.index * 2 * this.numberBoxWidth + item.index * this.spaceWidth
        : item.offset
    },
  },
}
</script>
