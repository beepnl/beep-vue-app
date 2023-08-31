<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <text v-if="prepend" :x="x + 'mm'" :y="y + 5 + 'mm'" :style="svgAppend">
      {{ prepend }}
    </text>

    <g>
      <rect
        :data-type="inputType === 'date' ? 'text' : 'number'"
        :data-category-id="inputType === 'date' ? 'date-field' : ''"
        :data-label="label"
        :data-parent-category-id="position.id"
        :x="x + prependOffset + 'mm'"
        :y="y + 2 + 'mm'"
        :width="rectWidth + 'mm'"
        :height="height + 'mm'"
        stroke="black"
        fill="transparent"
        :stroke-width="strokeWidth"
      />
      <text
        v-if="append"
        :x="x + prependOffset + textFieldWidth + 1 + 'mm'"
        :y="y + height + 'mm'"
        :style="svgAppend"
      >
        {{ append }}
      </text>
    </g>
    <!--
    <g v-else-if="decimals > 0"> //  TODO remove if single-digits won't be used for sure NB: <g> above has v-if="decimals === 0" when this is uncommented
      <svgNumberBox
        v-for="field in numberFields"
        :key="field + 1"
        :x="x + (field - 1) * numberBoxWidth + 'mm'"
        :y="y + 2 + 'mm'"
        :category-id="'number'"
        :parent-id="position.id"
      />

      <circle
        :cx="x + fieldOffset + 1 + 'mm'"
        :cy="y + 9 + 'mm'"
        r="2"
        fill="black"
      />

      <svgNumberBox
        v-for="decimal in decimals"
        :key="'d-' + decimal"
        :x="x + fieldOffset + 2 + (decimal - 1) * numberBoxWidth + 'mm'"
        :y="y + 2 + 'mm'"
        :category-id="'decimals'"
        :parent-id="position.id"
      />
    </g> -->

    <g v-if="info">
      <text :x="x + 'mm'" :y="y + height + 5 + 'mm'" :style="svgTextSmall">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + height + 9 + 'mm'"
        :style="svgTextSmall"
      >
        {{ infoExtra }}
      </text>
    </g>
  </g>
</template>

<script>
import svgLabel from '@/src/components/svg/svg-label.vue'
// import svgNumberBox from '@/src/components/svg/svg-number-box.vue'
import { svgData, svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgLabel,
    // svgNumberBox,
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
    decimals: {
      type: Number, // TODO remove if single-digits won't be used for sure
      required: false,
      default: 0,
    },
    append: {
      type: String,
      required: false,
      default: null,
    },
    doubleWidth: {
      type: Boolean,
      required: false,
      default: false,
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
    inputType: {
      type: String,
      required: false,
      default: null,
    },
    prepend: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      height: 8,
    }
  },
  computed: {
    // fieldOffset() {
    //   return this.numberFields * this.numberBoxWidth // // TODO remove if single-digits won't be used for sure
    // },
    prependOffset() {
      return this.prepend ? 5 : 0
    },
    rectWidth() {
      var width =
        this.inputType === 'date' ? this.maxFieldWidth : this.textFieldWidth
      return this.doubleWidth ? this.doubleFieldWidth : width
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
