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

    <!-- <svgDate
      :position="{ id: 'date', pageY: y, x: x + 92, y }"  // TODO: remove when single-digits won't be used anymore for sure
      :label="$t('Date_of_inspection')"
      :time="true"
    /> -->

    <svgNumber
      :position="{ id: 'date', pageY: y, x: x + 92, y }"
      :label="$t('Datetime_of_inspection')"
      :double-width="true"
      :input-type="'date'"
    />

    <svgSmileRating
      :position="{ id: 'impression', pageY: y + 16, x, y: y + 16 }"
      :label="$t('positive_impression')"
    />

    <svgYesNoRating
      :position="{ id: 'attention', pageY: y + 16, x: x + 46, y: y + 16 }"
      :label="$t('needs_attention')"
    />

    <svgText
      :position="{ id: 'notes', pageY: y + 16, x: x + 92, y: y + 16 }"
      :height="22"
      :double-width="true"
      :label="$t('notes')"
    />

    <!-- <svgDate
      :position="{ id: 'reminder_date', pageY: y + 49, x, y: y + 49 }" // TODO: remove when single-digits won't be used anymore for sure
      :label="$t('remind_date')"
      :time="true"
    /> -->

    <svgNumber
      :position="{ id: 'reminder_date', pageY: y + 46, x, y: y + 46 }"
      :label="$t('remind_datetime')"
      :double-width="true"
      :input-type="'date'"
    />

    <svgText
      :position="{ id: 'reminder', pageY: y + 46, x: x + 92, y: y + 46 }"
      :height="22"
      :double-width="true"
      :label="$t('notes_for_next_inspection')"
    />
  </g>
</template>

<script>
// import svgDate from '@/src/components/svg/svg-date.vue'  // TODO: remove when single-digits won't be used anymore for sure
import svgNumber from '@/src/components/svg/svg-number.vue'
import svgSmileRating from '@/src/components/svg/svg-smile-rating.vue'
import svgText from '@/src/components/svg/svg-text.vue'
import svgYesNoRating from '@/src/components/svg/svg-yes-no-rating.vue'

export default {
  components: {
    // svgDate,  // TODO: remove when single-digits won't be used anymore for sure
    svgNumber,
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
