<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>
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
          :x="x + item.offset + (field - 1) * 5 + 'mm'"
          :y="y + 5 + 'mm'"
        />
      </g>
    </g>
    <g v-if="time">
      <g v-for="(item, index) in timeFormat" :key="item.title + index">
        <text
          :x="x + item.offset + 'mm'"
          :y="y + 4 + 'mm'"
          :style="svgTextSmall"
        >
          {{ item.title }}
        </text>
        <text
          v-if="!item.first"
          :x="x + item.offset - 2 + 'mm'"
          :y="y + 10 + 'mm'"
          width="3mm"
          :style="svgText"
        >
          :
        </text>
        <g v-for="field in item.fields" :key="item.title + '-h-' + field">
          <svgNumberBox
            :x="x + item.offset + (field - 1) * 5 + 'mm'"
            :y="y + 5 + 'mm'"
          />
        </g>
      </g>
    </g>
  </g>
</template>

<script>
import svgNumberBox from '@/src/components/svg/svg-number-box.vue'
import { svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgNumberBox,
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
    time: {
      type: Boolean,
      required: false,
      default: false,
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
          offset: 23,
        },
        {
          title: this.$i18n.tc('Day', 1),
          fields: 2,
          offset: 36,
        },
      ]
    },
    timeFormat() {
      return [
        {
          title: this.$i18n.tc('Hour', 2) + ' (24)',
          fields: 2,
          offset: 50,
          first: true,
        },
        {
          title: this.$i18n.tc('Minute', 2),
          fields: 2,
          offset: 63,
        },
      ]
    },
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
}
</script>
