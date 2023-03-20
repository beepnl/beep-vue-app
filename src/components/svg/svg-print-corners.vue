<template>
  <g>
    <g class="A" data-type-mark="top-left">
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + cornerSize + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + cornerSize + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
    </g>

    <g class="B" data-type-mark="top-right">
      <line
        :x1="xBD - cornerSize + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
      <line
        :x1="xBD + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + cornerSize + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
    </g>

    <g class="C" data-type-mark="bottom-left">
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + cornerSize + 'mm'"
        :y1="yCD + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + 'mm'"
        :y1="yCD - cornerSize + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
    </g>

    <g class="D" data-type-mark="bottom-right">
      <line
        :x1="xBD - cornerSize + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yCD + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
      <line
        :x1="xBD + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yCD - cornerSize + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        :stroke-width="strokeWidthCorners"
      />
    </g>
  </g>
</template>

<script>
import { svgData } from '@mixins/svgMixin'

export default {
  mixins: [svgData],
  props: {
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
      return this.cornerSize
    },
    xBD() {
      return this.pageWidth - this.cornerSize
    },
    yAB() {
      return this.height + this.cornerSize
    },
    yCD() {
      return this.height + this.pageHeight - this.cornerSize
    },
  },
}
</script>
