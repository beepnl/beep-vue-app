<template>
  <div class="inspection-item">
    <smileRating
      v-if="item.input === 'smileys_3'"
      :label="item.trans[locale]"
      :object="object"
      :property="item.id"
    ></smileRating>

    <yesNoRating
      v-if="item.input === 'boolean' || item.input === 'boolean_yes_red'"
      :label="item.trans[locale]"
      :object="object"
      :property="item.id"
      :yes-red="item.input === 'boolean_yes_red'"
    ></yesNoRating>
    <!-- or list_item? -->
    <ChecklistInput
      v-if="
        item.children.length > 0 &&
          (item.input === 'boolean' || item.input === 'boolean_yes_red')
      "
      v-show="object[item.id] === 1"
      :item="item.children[0]"
      :locale="locale"
      :object="object"
    ></ChecklistInput>

    <div
      v-if="
        item.input !== 'boolean' &&
          item.input !== 'boolean_yes_red' &&
          item.input !== 'smileys_3'
      "
    >
      {{ item.trans[locale] }}: {{ item.input }}
    </div>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  name: 'ChecklistInput',
  components: {
    ChecklistInput,
    smileRating,
    yesNoRating,
  },
  props: {
    item: {
      type: Object,
      default: null,
      required: true,
    },
    object: {
      type: Object,
      default: null,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
  },
}
</script>

<style lang="scss"></style>
