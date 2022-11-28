<template>
  <g>
    <text :x="x + 'mm'" :y="y + 'mm'" class="svg-label">
      {{ label }}
    </text>
    <g v-for="(item, index) in dateFormat" :key="item.title + index">
      <text
        :x="x + item.offset + 'mm'"
        :y="y + 4 + 'mm'"
        class="svg-text-small"
      >
        {{ item.title }}
      </text>
      <text
        v-if="!item.first"
        :x="x + item.offset - 3 + 'mm'"
        :y="y + 10 + 'mm'"
        width="6mm"
        class="svg-text"
      >
        -
      </text>
      <g v-for="field in item.fields" :key="item.title + '-f-' + field">
        <svgNumberBox
          :x="x + item.offset + (field - 1) * 7 + 'mm'"
          :y="y + 5 + 'mm'"
        />
      </g>
    </g>
    <g v-if="time">
      <g v-for="(item, index) in timeFormat" :key="item.title + index">
        <text
          :x="x + item.offset + 'mm'"
          :y="y + 4 + 'mm'"
          class="svg-text-small"
        >
          {{ item.title }}
        </text>
        <text
          v-if="!item.first"
          :x="x + item.offset - 3 + 'mm'"
          :y="y + 10 + 'mm'"
          width="6mm"
          class="svg-text"
        >
          :
        </text>
        <g v-for="field in item.fields" :key="item.title + '-h-' + field">
          <svgNumberBox
            :x="x + item.offset + (field - 1) * 7 + 'mm'"
            :y="y + 5 + 'mm'"
          />
        </g>
      </g>
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
  data() {
    return {}
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
          offset: 31,
        },
        {
          title: this.$i18n.tc('Day', 1),
          fields: 2,
          offset: 48,
        },
      ]
    },
    timeFormat() {
      return [
        {
          title: this.$i18n.tc('Hour', 2) + ' (24)',
          fields: 2,
          offset: 65,
          first: true,
        },
        {
          title: this.$i18n.tc('Minute', 2),
          fields: 2,
          offset: 82,
        },
      ]
    },
  },
}
</script>
