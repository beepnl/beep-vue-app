<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="field in fields" :key="field + 1">
      <svgNumberBox :x="x + (field - 1) * 7 + 'mm'" :y="y + 3 + 'mm'" />
    </g>
    <g v-if="info">
      <text :x="x + 'mm'" :y="y + 15 + 'mm'" class="svg-text-small">
        {{ info }}
      </text>
      <text
        v-if="infoExtra"
        :x="x + 'mm'"
        :y="y + 19 + 'mm'"
        class="svg-text-small"
      >
        {{ infoExtra }}
      </text>
    </g>

    <g v-if="decimals > 0">
      <circle
        :cx="x + fieldOffset + 'mm'"
        :cy="y + 10 + 'mm'"
        r="2"
        fill="black"
      />

      <g v-for="decimal in decimals" :key="'d-' + decimal">
        <svgNumberBox
          :x="x + fieldOffset + 2 + (decimal - 1) * 7 + 'mm'"
          :y="y + 3 + 'mm'"
        />
      </g>
    </g>

    <g v-else-if="append">
      <text
        :x="x + fieldOffset - 1 + 'mm'"
        :y="y + 9 + 'mm'"
        class="svg-append"
      >
        {{ append }}
      </text>
    </g>
  </g>
</template>

<script>
import svgNumberBox from '@/src/components/svg/svg-number-box.vue'

export default {
  components: {
    svgNumberBox,
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    fields: {
      type: Number,
      required: false,
      default: 3,
    },
    label: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
    },
    append: {
      type: String,
      required: false,
      default: null,
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
  },
  computed: {
    fieldOffset() {
      return this.fields * 7
    },
  },
}
</script>
