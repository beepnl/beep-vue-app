<template>
  <v-col
    class="inspection-item"
    cols="12"
    :sm="cols || item.input === 'text' ? '12' : '6'"
    :md="cols || item.input === 'text' ? '12' : '4'"
    :lg="cols || item.input === 'text' ? '12' : '3'"
  >
    <yesNoRating
      v-if="item.input === 'boolean'"
      :object="object"
      :label="item.trans[locale]"
      :property="item.id"
    ></yesNoRating>
    <!-- of boolean_yes_red of list_item? -->
    <ChecklistInput
      v-if="item.children.length > 0 && item.input === 'boolean'"
      v-show="object[item.id] === 1"
      :object="object"
      :item="item.children[0]"
      :locale="locale"
      :cols="true"
    ></ChecklistInput>

    <div v-if="item.input !== 'boolean'">
      {{ item.trans[locale] }}: {{ item.input }}
    </div>
  </v-col>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  name: 'ChecklistInput',
  components: {
    ChecklistInput,
    yesNoRating,
  },
  props: {
    cols: {
      type: Boolean,
      default: false,
      required: false,
    },
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
