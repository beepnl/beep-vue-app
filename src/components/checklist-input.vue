<template>
  <div class="inspection-item">
    <labelWithDescription
      v-if="item.input !== 'date'"
      :item="item"
      :locale="locale"
    ></labelWithDescription>

    <selectHiveOrApiary
      v-if="item.input === 'select_hive' || item.input === 'select_location'"
      :object="object"
      :item="item"
    ></selectHiveOrApiary>

    <imageUploader
      v-if="item.input === 'image'"
      :object="object"
      :item="item"
      :input-disabled="disabled"
    ></imageUploader>

    <v-list v-if="item.input === 'list'" class="inspection-checkbox-list">
      <v-list-item
        v-for="(listItem, index) in item.children"
        :key="index"
        class="inspection-list-item"
        @click.capture.stop="toggleSelect(listItem, item.id)"
      >
        <v-list-item-action>
          <v-checkbox
            v-model="selectedArray"
            multiple
            :value="listItem.id.toString()"
          />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{
            listItem.trans[locale] || listItem.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-radio-group
      v-if="item.input === 'options'"
      :value="parseInt(object[item.id])"
      class="inspection-options-list"
    >
      <v-radio
        v-for="(listItem, index) in item.children"
        :key="index"
        :label="listItem.trans[locale] || listItem.name"
        :value="listItem.id"
        @click="toggleRadio(listItem.id, item.id)"
      ></v-radio>
    </v-radio-group>

    <treeselect
      v-if="item.input === 'select'"
      :object="object"
      :item="item"
      :locale="locale"
    ></treeselect>

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

    <el-input-number
      v-if="item.input === 'number' || item.input === 'number_0_decimals'"
      :value="object[item.id] === null ? 0 : object[item.id]"
      :step="1"
      :precision="0"
      :step-strictly="true"
      :disabled="disabled"
      size="medium"
      @change="updateInput($event, item.id, item.name, item.input)"
      @input.native="convertComma($event, item.name, 0)"
    ></el-input-number>

    <el-input-number
      v-if="
        item.input === 'number_1_decimals' ||
          item.input === 'number_2_decimals' ||
          item.input === 'square_25cm2'
      "
      :value="object[item.id] === null ? 0 : object[item.id]"
      :step="item.input === 'number_2_decimals' ? 0.01 : 0.1"
      :precision="item.input === 'number_2_decimals' ? 2 : 1"
      :disabled="disabled"
      size="medium"
      @change="updateInput($event, item.id, item.name, item.input)"
      @input.native="
        convertComma(
          $event,
          item.name,
          // eslint-disable-next-line vue/comma-dangle
          item.input === 'number_2_decimals' ? 2 : 1
        )
      "
    ></el-input-number>

    <el-input-number
      v-if="item.input === 'number_3_decimals'"
      :value="object[item.id] === null ? 0 : object[item.id]"
      :step="0.001"
      :precision="3"
      :disabled="disabled"
      size="medium"
      @change="updateInput($event, item.id, item.name, item.input)"
      @input.native="convertComma($event, item.name, 3)"
    ></el-input-number>

    <el-input-number
      v-if="item.input === 'number_negative'"
      :value="object[item.id] === null ? 0 : object[item.id]"
      :max="0"
      :step="1"
      :precision="0"
      :step-strictly="true"
      :disabled="disabled"
      size="medium"
      @change="updateInput($event, item.id, item.name, item.input)"
      @input.native="convertComma($event, item.name, 0)"
    ></el-input-number>

    <el-input-number
      v-if="item.input === 'number_positive'"
      :value="object[item.id] === null ? 0 : object[item.id]"
      :min="0"
      :step="1"
      :precision="0"
      :step-strictly="true"
      :disabled="item.name === 'colony_size' || disabled"
      size="medium"
      @change="updateInput($event, item.id, item.name, item.input)"
      @input.native="convertComma($event, item.name, 0)"
    ></el-input-number>

    <starRating
      v-if="item.input === 'score'"
      :object="object"
      :property="item.id"
    ></starRating>

    <v-textarea
      v-if="item.input === 'text'"
      v-model="object[item.id]"
      class="inspection-text-area"
      :placeholder="item.trans[locale] || item.name"
      counter="2500"
      rows="1"
      auto-grow
      clearable
      @input="validateText($event, item.id, 2500)"
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
    <ChecklistFieldset
      v-if="
        item.children.length > 0 &&
          (item.input === 'boolean' ||
            item.input === 'boolean_yes_red' ||
            item.input === 'list_item')
      "
      v-show="object[item.id] === 1"
      class="mt-6"
      :category="item"
      :locale="locale"
      :object="object"
      :nested="true"
    ></ChecklistFieldset>

    <sampleCode
      v-if="item.input === 'sample_code'"
      :item="item"
      :object="object"
    />

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
          item.input !== 'select' &&
          item.input !== 'options' &&
          item.input !== 'list' &&
          item.input !== 'image' &&
          item.input !== 'select_hive' &&
          item.input !== 'select_location' &&
          item.input !== 'sample_code'
      "
    >
      {{ $t('Not_implemented_yet') }}
    </div>
  </div>
</template>

<script>
import labelWithDescription from '@components/input-fields/label-with-description.vue'
import dateTimePicker from '@components/input-fields/date-time-picker.vue'
import imageUploader from '@components/input-fields/image-uploader.vue'
import sampleCode from '@components/input-fields/sample-code.vue'
import selectHiveOrApiary from '@components/input-fields/select-hive-or-apiary.vue'
import slider from '@components/input-fields/slider.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import starRating from '@components/input-fields/star-rating.vue'
import treeselect from '@components/input-fields/treeselect.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  name: 'ChecklistInput',
  components: {
    ChecklistFieldset: () => import('@components/checklist-fieldset.vue'), // needed to fix Vue recursive component error
    dateTimePicker,
    imageUploader,
    labelWithDescription,
    sampleCode,
    selectHiveOrApiary,
    slider,
    smileRating,
    starRating,
    treeselect,
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
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      savedNrOfDecimals: 0,
    }
  },
  computed: {
    // for v-model of 'list' checkbox an array of value is needed instead of a string
    selectedArray() {
      if (this.item.input === 'list') {
        if (typeof this.object[this.item.id] === 'string') {
          return this.object[this.item.id].split(',')
        }
      }
      return []
    },
  },
  methods: {
    convertComma(event, name = null, precision = 1) {
      // console.log('convert comma ', event.target.value)
      var value = event.target.value
      // if user inputs a value with a comma followed by at least one decimal, convert it to a dot
      if (value.toString().indexOf(',') > -1) {
        if (
          precision <= 1 &&
          value.length > value.toString().indexOf(',') + precision
        ) {
          value = parseFloat(value.toString().replace(',', '.'))
          this.object[this.item.id] = value
        } else if (precision > 1) {
          // wait for user to stop typing if precision > 1
          setTimeout(() => {
            value = parseFloat(value.toString().replace(',', '.'))
            this.object[this.item.id] = value
          }, 1200)
        }
      }

      this.checkNameForEmit(name)
      this.setInspectionEdited(true)
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    toggleRadio(value, id) {
      if (this.object[id] === value) {
        this.object[id] = null // allow to toggle if value has been set already
      } else {
        this.object[id] = value
      }
      this.setInspectionEdited(true)
    },
    toggleSelect(listItem, listId) {
      var selectedArray = []
      if (typeof this.object[listId] === 'string') {
        selectedArray = this.object[listId].split(',')
      }
      if (selectedArray.indexOf(listItem.id + '') > -1) {
        selectedArray.splice(selectedArray.indexOf(listItem.id), 1)
      } else {
        selectedArray.push(listItem.id + '')
      }
      var selectedArrayToString = selectedArray.join(',')
      this.object[listId] = selectedArrayToString
      this.setInspectionEdited(true)
    },
    checkNameForEmit(name) {
      if (name === 'pixels_with_bees' || name === 'pixels_total_top') {
        this.$emit('calculate-tpa-colony-size')
      }
      if (name === 'bees_squares_25cm2') {
        this.$emit('calculate-liebefeld-colony-size')
      }
    },
    updateInput(value, property, name = null, input = null) {
      this.checkNameForEmit(name)
      this.object[property] = value
      this.setInspectionEdited(true)
    },
    inputNative(event, property, name = null) {
      const val = event.target.value

      var pointVal = val.replace(',', '.')
      if (pointVal.indexOf('.0.') > -1) {
        pointVal = pointVal.replace('.0.', '.')
      }

      this.checkName(name)

      this.object[property] = pointVal
      this.setInspectionEdited(true)
    },
    validateText(value, id, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.object[id] = value
      }
      this.setInspectionEdited(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.checklist-number-input {
  max-width: 150px !important;
}
.v-text-field.inspection-text-area {
  padding-top: 0 !important;
}
.v-list-item.inspection-list-item {
  height: 35px;
  min-height: 35px;
  padding: 0 !important;
  .v-list-item__action {
    margin-right: 12px !important;
  }
  .v-list-item__content {
    padding: 0 !important;
  }
}
.v-input--selection-controls.inspection-options-list {
  margin-top: 0 !important;
}
.v-list.inspection-checkbox-list {
  padding: 0 !important;
}
</style>
