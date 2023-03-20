<template>
  <g>
    <svgText
      :position="{ id: 'location', pageY: y, x, y }"
      :label="$tc('Location', 1)"
      :line="true"
    />

    <svgText
      :position="{ id: 'hive', pageY: y, x: x + 46, y }"
      :label="$tc('Hive', 1)"
      :line="true"
    />

    <svgDate
      :position="{ id: 'inspection_date', pageY: y, x: x + 92, y }"
      :label="$t('Date_of_inspection')"
      :time="true"
    />

    <svgSmileRating
      :position="{ id: 'impression', pageY: y + 19, x, y: y + 19 }"
      :label="$t('positive_impression')"
    />

    <svgYesNoRating
      :position="{ id: 'attention', pageY: y + 19, x: x + 46, y: y + 19 }"
      :label="$t('needs_attention')"
    />

    <svgText
      :position="{ id: 'notes', pageY: y + 19, x: x + 92, y: y + 19 }"
      :width="'89mm'"
      :height="'22mm'"
      :double-width="true"
      :label="$t('notes')"
    />

    <svgDate
      :position="{ id: 'reminder_date', pageY: y + 49, x, y: y + 49 }"
      :label="$t('remind_date')"
      :time="true"
    />

    <svgText
      :position="{ id: 'reminder', pageY: y + 49, x: x + 92, y: y + 49 }"
      :width="'89mm'"
      :height="'22mm'"
      :double-width="true"
      :label="$t('notes_for_next_inspection')"
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
