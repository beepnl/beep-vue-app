<template>
  <g>
    <g>
      <text
        :x="xMargin + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 9 + 'mm'"
        :style="svgTextSmall"
      >
        {{ checklistHeaderText + ' - p.' + pageNumber + ' / ' + totalPages }}
      </text>

      <text
        :x="pageWidth - (xMargin + 37) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 7 + 'mm'"
        :style="svgLabel"
      >
        {{ 'Print ID' }}
      </text>
      <rect
        data-type="number"
        data-label="Print ID"
        :data-parent-category-id="'svgid'"
        :x="pageWidth - (xMargin + 37) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 7.5 + 'mm'"
        width="16mm"
        height="5mm"
        stroke="black"
        fill="transparent"
        :stroke-width="strokeWidth"
      />
      <text
        :x="pageWidth - (xMargin + 36) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 11.5 + 'mm'"
        :style="svgText"
      >
        {{ checklistSvgId }}
      </text>
      <text
        :x="pageWidth - (xMargin + 18.8) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 7 + 'mm'"
        :style="svgLabel"
      >
        {{ 'Page' }}
      </text>
      <rect
        data-type="number"
        data-label="Page"
        :data-parent-category-id="'pagenr'"
        :data-category-id="pageNumber"
        :x="pageWidth - (xMargin + 18.8) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 7.5 + 'mm'"
        width="6mm"
        height="5mm"
        stroke="black"
        fill="transparent"
        :stroke-width="strokeWidth"
      />
      <text
        :x="pageWidth - (xMargin + (doubleDigits ? 18 : 17)) + 'mm'"
        :y="(pageNumber - 1) * pageHeight + 11.5 + 'mm'"
        :style="svgText"
      >
        {{ pageNumber }}
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
    checklistSvgId: {
      type: String,
      default: '',
      required: false,
    },
    pageNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  computed: {
    doubleDigits() {
      return this.pageNumber.toString().length > 1
    },
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
