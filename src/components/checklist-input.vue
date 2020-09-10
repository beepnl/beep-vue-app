<template>
  <div class="inspection-item">
    <labelWithDescription
      v-if="item.input !== 'text' && item.input !== 'date'"
      :description="item.description"
      :label="item.trans[locale] || item.name"
    ></labelWithDescription>

    <v-select
      v-if="item.input === 'select'"
      v-model="object[item.id]"
      class="checklist-select-input"
      :items="item.children"
      :item-text="getText"
      item-value="id"
      :placeholder="`${$t('Select') + ' ' + (item.trans[locale] || item.name)}`"
      solo
    >
      <template slot="item" slot-scope="data">
        {{ data.item.trans[locale] || data.item.name }}
      </template>
      ></v-select
    >

    <dateTimePicker
      v-if="item.input === 'date'"
      :object="object"
      :item="item"
      :locale="locale"
    ></dateTimePicker>

    <slider
      v-if="
        item.input === 'grade' ||
          item.input === 'number_degrees' ||
          item.input === 'number_percentage' ||
          item.input === 'score_amount' ||
          item.input === 'score_quality' ||
          item.input === 'slider'
      "
      :item="item"
      :object="object"
    ></slider>

    <VueNumberInput
      v-if="item.input === 'number' || item.input === 'number_0_decimals'"
      :value="object[item.id]"
      class="checklist-number-input"
      :step="1"
      controls
      @change="updateNumber($event, item.id)"
    ></VueNumberInput>

    <VueNumberInput
      v-if="
        item.input === 'number_1_decimals' ||
          item.input === 'number_2_decimals' ||
          item.input === 'square_25cm2'
      "
      :value="object[item.id]"
      class="checklist-number-input"
      :step="item.input === 'number_2_decimals' ? 0.01 : 0.1"
      controls
      @change="updateNumber($event, item.id)"
    ></VueNumberInput>

    <VueNumberInput
      v-if="item.input === 'number_3_decimals'"
      :value="object[item.id]"
      class="checklist-number-input"
      :step="0.001"
      controls
      @change="updateNumber($event, item.id)"
    ></VueNumberInput>

    <VueNumberInput
      v-if="item.input === 'number_negative'"
      :value="object[item.id]"
      class="checklist-number-input"
      :max="0"
      :step="1"
      controls
      @change="updateNumber($event, item.id)"
    ></VueNumberInput>

    <VueNumberInput
      v-if="item.input === 'number_positive'"
      :value="object[item.id]"
      class="checklist-number-input"
      :min="0"
      :step="1"
      controls
      @change="updateNumber($event, item.id)"
    ></VueNumberInput>

    <starRating
      v-if="item.input === 'score'"
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
      :object="object"
      :property="item.id"
    ></smileRating>

    <yesNoRating
      v-if="
        item.input === 'boolean' ||
          item.input === 'boolean_yes_red' ||
          item.input === 'list_item'
      "
      :object="object"
      :property="item.id"
      :yes-red="item.input === 'boolean_yes_red'"
    ></yesNoRating>
    <ChecklistInput
      v-if="
        item.children.length > 0 &&
          (item.input === 'boolean' ||
            item.input === 'boolean_yes_red' ||
            item.input === 'list_item')
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
          item.input !== 'score' &&
          item.input !== 'number' &&
          item.input !== 'number_0_decimals' &&
          item.input !== 'number_1_decimals' &&
          item.input !== 'number_2_decimals' &&
          item.input !== 'number_3_decimals' &&
          item.input !== 'number_negative' &&
          item.input !== 'number_positive' &&
          item.input !== 'square_25cm2' &&
          item.input !== 'score_amount' &&
          item.input !== 'score_quality' &&
          item.input !== 'number_percentage' &&
          item.input !== 'grade' &&
          item.input !== 'number_degrees' &&
          item.input !== 'slider' &&
          item.input !== 'date' &&
          item.input !== 'select'
      "
    >
      {{ item.trans[locale] }}: {{ item.input }}
    </div>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import labelWithDescription from '@components/input-fields/label-with-description.vue'
import dateTimePicker from '@components/input-fields/date-time-picker.vue'
import slider from '@components/input-fields/slider.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import starRating from '@components/input-fields/star-rating.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  name: 'ChecklistInput',
  components: {
    ChecklistInput,
    dateTimePicker,
    VueNumberInput,
    labelWithDescription,
    slider,
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
    getText(item) {
      return item.trans[this.locale] || item.name
    },
    updateNumber(value, property) {
      if (value === 0) {
        value = null
      }
      this.object[property] = value
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

<style lang="scss" scoped>
.checklist-number-input {
  max-width: 150px !important;
}
</style>
