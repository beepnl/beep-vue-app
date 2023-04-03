<template>
  <g>
    <g>
      <text
        :x="xMargin + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 9 + 'mm'"
        :style="svgTextSmall"
      >
        {{ checklistHeaderText }}
      </text>
      <text
        :x="pageWidth - (xMargin + 5) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 9 + 'mm'"
        :style="svgTextSmall"
      >
        {{ 'p.' + pageNumber }}
      </text>
    </g>

    <g class="A">
      <rect
        data-type="marker"
        data-type-mark="top-left"
        :x="xAC + 'mm'"
        :y="yAB + 'mm'"
        :width="cornerBoxSize + 'mm'"
        :height="cornerBoxSize + 'mm'"
        fill="black"
      />
    </g>

    <g class="B">
      <rect
        data-type="marker"
        data-type-mark="top-right"
        :x="xBD + 'mm'"
        :y="yAB + 'mm'"
        :width="cornerBoxSize + 'mm'"
        :height="cornerBoxSize + 'mm'"
        fill="black"
      />
    </g>

    <g class="C">
      <rect
        data-type="marker"
        data-type-mark="bottom-left"
        :x="xAC + 'mm'"
        :y="yCD + 'mm'"
        :width="cornerBoxSize + 'mm'"
        :height="cornerBoxSize + 'mm'"
        fill="black"
      />
    </g>

    <g class="D">
      <rect
        data-type="marker"
        data-type-mark="bottom-right"
        :x="xBD + 'mm'"
        :y="yCD + 'mm'"
        :width="cornerBoxSize + 'mm'"
        :height="cornerBoxSize + 'mm'"
        fill="black"
      />
    </g>
  </g>
</template>

<script>
import { svgData, svgStyles } from '@mixins/svgMixin'

export default {
  mixins: [svgData, svgStyles],
  props: {
    checklistHeaderText: {
      type: String,
      required: true,
      default: '',
    },
    pageNumber: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  computed: {
    height() {
      return (this.pageNumber - 1) * this.pageHeight
    },
    xAC() {
      return this.cornerMargin
    },
    xBD() {
      return this.pageWidth - this.cornerMargin - this.cornerBoxSize
    },
    yAB() {
      return this.height + this.cornerMargin
    },
    yCD() {
      return (
        this.height + this.pageHeight - this.cornerMargin - this.cornerBoxSize
      )
    },
  },
}
</script>
