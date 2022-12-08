<template>
  <g>
    <svgText :position="{ x, y }" :label="$tc('Location', 1)" :line="true" />

    <svgText
      :position="{ x: x + 45, y }"
      :label="$tc('Hive', 1)"
      :line="true"
    />

    <svgDate
      :position="{ x: x + 90, y }"
      :label="$t('Date_of_inspection')"
      :time="true"
    />

    <svgSmileRating
      :position="{ x, y: y + 19 }"
      :label="$t('positive_impression')"
    />

    <svgYesNoRating
      :position="{ x: x + 45, y: y + 19 }"
      :label="$t('needs_attention')"
    />

    <svgText
      :position="{ x: x + 90, y: y + 19 }"
      :width="'84mm'"
      :height="'22mm'"
      :label="$t('notes')"
    />

    <svgDate
      :position="{ x, y: y + 49 }"
      :label="$t('reminder') + ' - ' + $t('remind_date')"
      :time="true"
    />

    <svgText
      :position="{ x: x + 90, y: y + 49 }"
      :width="'84mm'"
      :height="'22mm'"
      :label="$t('reminder')"
    />
  </g>
</template>

<script>
import svgDate from '@/src/components/svg/svg-date.vue'
import svgSmileRating from '@/src/components/svg/svg-smile-rating.vue'
import svgText from '@/src/components/svg/svg-text.vue'
import svgYesNoRating from '@/src/components/svg/svg-yes-no-rating.vue'

export default {
  components: {
    svgDate,
    svgSmileRating,
    svgText,
    svgYesNoRating,
  },
  props: {
    position: {
      type: Object,
      required: true,
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
