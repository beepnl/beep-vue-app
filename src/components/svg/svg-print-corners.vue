<template>
  <g>
    <g class="A">
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + cornerSize + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + 'mm'"
        stroke="black"
        stroke-width="1"
      />
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + cornerSize + 'mm'"
        stroke="black"
        stroke-width="1"
      />
    </g>

    <g class="B">
      <line
        :x1="xBD - cornerSize + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + 'mm'"
        stroke="black"
        stroke-width="1"
      />
      <line
        :x1="xBD + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yAB + 'mm'"
        :y2="yAB + cornerSize + 'mm'"
        stroke="black"
        stroke-width="1"
      />
    </g>

    <g class="C">
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + cornerSize + 'mm'"
        :y1="yCD + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        stroke-width="1"
      />
      <line
        :x1="xAC + 'mm'"
        :x2="xAC + 'mm'"
        :y1="yCD - cornerSize + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        stroke-width="1"
      />
    </g>

    <g class="D">
      <line
        :x1="xBD - cornerSize + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yCD + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        stroke-width="1"
      />
      <line
        :x1="xBD + 'mm'"
        :x2="xBD + 'mm'"
        :y1="yCD - cornerSize + 'mm'"
        :y2="yCD + 'mm'"
        stroke="black"
        stroke-width="1"
      />
    </g>
  </g>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  data() {
    return {
      pageHeight: 297,
      pageWidth: 210,
      cornerSize: 10,
    }
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
