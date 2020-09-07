<template>
  <div class="inspection-item">
    <starRating
      v-if="item.input === 'score'"
      :description="item.description"
      :label="item.trans[locale]"
      :object="object"
      :property="item.id"
    ></starRating>

    <v-textarea
      v-if="item.input === 'text'"
      v-model="object[item.id]"
      :label="`${$t('notes')}`"
      counter="250"
      rows="1"
      auto-grow
      clearable
      @input="validateText($event, 'notes', 250)"
    ></v-textarea>

    <smileRating
      v-if="item.input === 'smileys_3'"
      :description="item.description"
      :label="item.trans[locale]"
      :object="object"
      :property="item.id"
    ></smileRating>

    <yesNoRating
      v-if="item.input === 'boolean' || item.input === 'boolean_yes_red'"
      :description="item.description"
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
          item.input !== 'smileys_3' &&
          item.input !== 'text' &&
          item.input !== 'score'
      "
    >
      {{ item.trans[locale] }}: {{ item.input }}
    </div>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import starRating from '@components/input-fields/star-rating.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  name: 'ChecklistInput',
  components: {
    ChecklistInput,
    smileRating,
    starRating,
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
  methods: {
    consoleLog(event) {
      console.log(event)
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.newInspection[property] = value
      }
    },
  },
}
</script>

<style lang="scss"></style>
