<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel v-if="!doubleWidth" :x="x" :y="y" :label="label" />

    <text v-if="doubleWidth" :x="x + 'mm'" :y="y + 'mm'" :style="svgLabel">
      {{ label }}
    </text>

    <text v-if="textOnly" :x="x + 'mm'" :y="y + 5 + 'mm'" :style="svgTextSmall">
      {{ extraText1 }}
    </text>

    <text
      v-if="textOnly"
      :x="x + 'mm'"
      :y="y + 8.5 + 'mm'"
      :style="svgTextSmall"
    >
      {{ extraText2 }}
    </text>

    <line
      v-if="inputTypeNotPresent"
      data-type="text"
      :x1="x + 'mm'"
      :x2="x + maxFieldWidth + 'mm'"
      :y1="y + 10 + 'mm'"
      :y2="y + 10 + 'mm'"
      stroke="black"
      :stroke-width="strokeWidth"
    />

    <text
      v-if="inputTypeNotPresent"
      :x="x + 'mm'"
      :y="y + 14 + 'mm'"
      :style="svgTextSmall"
    >
      {{ $t('Not_implemented_yet') }}
    </text>

    <rect
      v-else-if="!line && !textOnly"
      data-type="text"
      :data-label="label"
      :data-parent-category-id="position.id"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="(doubleWidth ? doubleFieldWidth : maxFieldWidth) + 'mm'"
      :height="height + 'mm'"
      stroke="black"
      fill="transparent"
      :stroke-width="strokeWidth"
    />

    <rect
      v-else-if="line && !textOnly"
      data-type="text"
      :data-label="label"
      :data-parent-category-id="position.id"
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      :width="(doubleWidth ? doubleFieldWidth : maxFieldWidth) + 'mm'"
      height="8mm"
      stroke="black"
      fill="transparent"
      :stroke-width="strokeWidth"
    />
  </g>
</template>

<script>
import svgLabel from '@/src/components/svg/svg-label.vue'
import { svgData, svgStyles } from '@mixins/svgMixin'

export default {
  components: {
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
    doubleWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: Number,
      required: false,
      default: 27,
    },
    line: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputTypeNotPresent: {
      type: Boolean,
      required: false,
      default: false,
    },
    textOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    extraText1: {
      type: String,
      required: false,
      default: '',
    },
    extraText2: {
      type: String,
      required: false,
      default: '',
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
