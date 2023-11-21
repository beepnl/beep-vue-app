<template>
  <div class="inspection-item">
    <labelWithDescription
      v-if="item.input !== 'date'"
      :precision="precision"
      :item="item"
      :locale="locale"
      :parse-mode="parseMode"
      :parsed-images="parsedImages"
      :parsed-items="parsedItems"
      :check-answer="checkAnswer"
      :text-area="item.input === 'text'"
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
      <template v-for="(listItem, index) in item.children">
        <v-list-item
          :key="index"
          class="inspection-list-item"
          @click.capture.stop="toggleSelect(listItem.id, item.id)"
        >
          <v-list-item-action>
            <v-checkbox
              v-if="listItem.input === 'list_item'"
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

        <template v-if="listItem.children.length > 0">
          <v-list-item
            v-for="(nestedItem, n) in listItem.children"
            :key="'nest-' + n"
            class="inspection-list-item nested"
            @click.capture.stop="toggleSelect(nestedItem.id, item.id)"
          >
            <v-list-item-action>
              <v-checkbox
                v-if="nestedItem.input === 'list_item'"
                v-model="selectedArray"
                multiple
                :value="nestedItem.id.toString()"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{
                nestedItem.trans[locale] || nestedItem.name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
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
      :check-answer="checkAnswer"
    ></treeselect>

    <dateTimePicker
      v-if="item.input === 'date'"
      :object="object"
      :item="item"
      :locale="locale"
      :parse-mode="parseMode"
      :parsed-images="parsedImages"
      :parsed-items="parsedItems"
      :check-answer="checkAnswer"
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
      :precision="precision"
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
      :rows="getEnters(object[item.id])"
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
      v-show="object[item.id] === 1 || parseMode"
      class="mt-6"
      :category="item"
      :locale="locale"
      :object="object"
      :nested="true"
      :parse-mode="parseMode"
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
// import testOutput from '@components/svg/scan_results.json' // enable for debugging
import imageUploader from '@components/input-fields/image-uploader.vue'
import sampleCode from '@components/input-fields/sample-code.vue'
import selectHiveOrApiary from '@components/input-fields/select-hive-or-apiary.vue'
import slider from '@components/input-fields/slider.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import starRating from '@components/input-fields/star-rating.vue'
import treeselect from '@components/input-fields/treeselect.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import { mapGetters } from 'vuex'
import { parseDate } from '@mixins/methodsMixin'
import { svgData } from '@mixins/svgMixin'

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
  mixins: [parseDate, svgData],
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
    parseMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      savedNrOfDecimals: 0,
      checkAnswer: true,
      booleanDefault: [1, 0],
      // testOutput, // enable for debugging
      testOutput: null, // disable for debugging
      enableTestOutput: false, // true for debugging
    }
  },
  computed: {
    ...mapGetters('inspections', ['parsedOfflineInput']),
    flattenedItems() {
      return this.item.children !== null
        ? this.flattenItems([...this.item.children])
        : []
    },
    isSelectIdItem() {
      return (
        this.item.input === 'select' ||
        this.item.input === 'list' ||
        this.item.input === 'options'
      )
    },
    parsedItems() {
      return this.parsedAnswerRaw &&
        (Array.isArray(this.parsedAnswerRaw) ||
          this.parsedAnswerRaw.category_id.indexOf('boolean') === -1) &&
        // this.parsedAnswer.type === 'checkbox' &&
        this.flattenedItems.length <= this.maxNrOfItems
        ? this.flattenedItems
        : []
    },
    precision() {
      var dIndex = this.item.input.indexOf('_decimals')
      if (dIndex > -1) {
        var dec = parseInt(this.item.input.substr(dIndex - 1, 1))
      } else if (this.item.input === 'square_25cm2') {
        dec = 1
      } else {
        dec = 0
      }
      return dec
    },
    // for v-model of 'list' checkbox an array of value is needed instead of a string
    selectedArray() {
      if (this.item.input === 'list') {
        if (typeof this.object[this.item.id] === 'string') {
          return this.object[this.item.id].split(',')
        }
      }
      return []
    },
    parsedAnswer() {
      if (this.parseMode) {
        var answer = this.parsedAnswerRaw
        if (Array.isArray(this.parsedAnswerRaw)) {
          if (this.parsedAnswerRaw[0].type === 'checkbox') {
            var posAnswer = this.parsedAnswerRaw.filter(
              (answer) => answer.value[0] === 1
            )
            answer =
              posAnswer.length > 0
                ? this.item.input === 'list'
                  ? posAnswer
                  : posAnswer[0]
                : null
          }
          // else if ( // TODO remove if single-digits won't be used for sure
          //   this.parsedAnswerRaw[0].category_id === 'date-field' ||
          //   this.parsedAnswerRaw[0].type === 'single-digit'
          // ) {
          //   // merge items for date type items
          //   answer = this.parsedAnswerRaw[0]
          //   answer.value = answer.value.concat(this.parsedAnswerRaw[1].value)
          //   answer.image = answer.image.concat(this.parsedAnswerRaw[1].image)
          // }
          else {
            answer = this.parsedAnswerRaw[0]
          }
        }
        return answer
      } else {
        return null
      }
    },
    parsedAnswerRaw() {
      if (this.parseMode) {
        var parsedData =
          this.enableTestOutput && this.queriedParseMode
            ? this.testOutput
            : this.parsedOfflineInput
        var returnedItems = parsedData.scans
          .map((el) => {
            return el.scan.filter(
              (answer) =>
                answer.parent_category_id !== undefined &&
                parseInt(answer.parent_category_id) === this.item.id
            )
          })
          .filter((el) => el.length > 0)

        var answer = null

        if (returnedItems.length > 0) {
          if (returnedItems[0].length > 1) {
            answer = returnedItems[0]
          } else {
            answer = returnedItems[0][0]
          }
        }

        return answer
      } else {
        return null
      }
    },
    parsedImages() {
      if (Array.isArray(this.parsedAnswerRaw)) {
        var imgArr = []
        var i = 0
        if (this.parsedItems.length > 0) {
          this.parsedItems.map((it, j) => {
            if (it.hasChildren) {
              // make sure that items without children (= headers of nested sublist) do not get a matched image
              imgArr = imgArr.concat('')
            } else {
              if (
                this.parsedAnswerRaw[i] !== undefined &&
                this.parsedAnswerRaw[i].image !== undefined
              ) {
                imgArr = imgArr.concat(this.parsedAnswerRaw[i].image)
              }
              i++
            }
          })
        } else {
          // TODO check if this is needed
          // this.parsedAnswerRaw.map((ans) => {
          //   if (ans.image !== undefined) {
          //     imgArr = imgArr.concat(ans.image)
          //   }
          // })
          return this.parsedAnswer.image
        }
        return imgArr
      } else {
        return this.parsedAnswerRaw && this.parsedAnswerRaw.image !== undefined
          ? this.parsedAnswerRaw.image
          : []
      }
    },
    queriedParseMode() {
      return this.$route.query.mode === 'parse' // TODO remove when enableTestOutput is removed
    },
  },
  created() {
    if (this.parsedAnswer) {
      if (this.item.input === 'list') {
        this.parsedAnswer.map((answer) => {
          this.toggleSelect(answer.category_id, this.item.id)
        })
      } else {
        if (this.item.input === 'select' && this.parsedAnswer.type === 'text') {
          // in case answer is not a category id but a string (written text) instead, let the user check it instead of filling it in automatically
          var value = this.findCategoryId(this.parsedAnswer.value[0])
        } else if (this.parsedAnswer.type === 'checkbox') {
          if (this.parsedAnswer.value.length > 1) {
            var checkboxIndex = this.parsedAnswer.value.findIndex(
              (value) => value === 1
            )
            value =
              this.isSelectIdItem &&
              this.flattenedItems[checkboxIndex] !== undefined
                ? this.flattenedItems[checkboxIndex].id
                : (this.item.input === 'smileys_3' ||
                    this.item.input.indexOf('score') > -1 ||
                    this.item.input === 'grade') &&
                  checkboxIndex > -1
                ? checkboxIndex + 1
                : this.item.input.indexOf('boolean') > -1 && checkboxIndex > -1
                ? this.booleanDefault[checkboxIndex]
                : null
          } else {
            value =
              this.parsedAnswer.value[0] === 1
                ? this.parsedAnswer.category_id
                : null
          }
        } else if (this.parsedAnswer.category_id === 'date-field') {
          value = this.parseDate(this.parsedAnswer.value[0])
        } else if (
          this.parsedAnswer.type === 'text' ||
          this.parsedAnswer.type === 'number'
        ) {
          value =
            this.parsedAnswer.value[0] === ''
              ? null
              : this.parsedAnswer.type === 'text'
              ? this.parsedAnswer.value[0]
              : parseFloat(this.parsedAnswer.value[0])

          if (
            value !== null &&
            this.parsedAnswer.type === 'number' &&
            !isNaN(value) &&
            this.numberHasconstraints(this.item.input)
          ) {
            value = this.validateNumber(value, this.item.input)
          }
        }
        // else if (this.parsedAnswer.type === 'single-digit') { // TODO remove if single-digits won't be used for sure
        //   value = this.parseDigits(this.parsedAnswer.value)
        // }
        else {
          value = null
          console.log('else input', this.item, this.parsedAnswer)
        }

        if (value !== null) {
          this.checkAnswer = false // red eye only if answer is null / could not be parsed
        }

        if (
          this.item.input !== 'list' &&
          Array.isArray(this.parsedAnswerRaw) &&
          this.parsedAnswerRaw[0].type === 'checkbox'
        ) {
          var posAnswer = this.parsedAnswerRaw.filter(
            (answer) => answer.value[0] === 1
          )
          if (posAnswer.length > 1) {
            this.checkAnswer = true // if multiple answers are parsed for non-list checkbox, let user check answer via red eye
          }
        }

        this.updateInput(
          value, // this.flattenedItems[checkboxIndex].id, // this.parsedAnswer.value[0], // TODO: check if array is always length 1
          this.item.id,
          this.item.name,
          this.item.input
        )
      }
    }
  },
  methods: {
    checkNameForEmit(name) {
      if (name === 'pixels_with_bees' || name === 'pixels_total_top') {
        this.$emit('calculate-tpa-colony-size')
      }
      if (name === 'bees_squares_25cm2') {
        this.$emit('calculate-liebefeld-colony-size')
      }
    },
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
    findCategoryId(input) {
      if (typeof input === 'string') {
        var value = input.toLowerCase()
        var findItem = this.flattenedItems.filter(
          (item) =>
            Object.values(item.trans).filter(
              (item) => item.toLowerCase() === value
            ).length > 0 // no strict language check
        )
        var id = findItem.length > 0 ? findItem[0].id : null
        return id
      } else {
        return null
      }
    },
    flattenItems(data, depth = 0) {
      // eslint-disable-next-line camelcase
      return data.reduce((r, { children, id, trans, name }) => {
        const obj = {
          id,
          trans,
          name,
          depth,
          hasChildren: children.length > 0,
        }
        r.push(obj)

        if (children.length) {
          r.push(...this.flattenItems([...children], depth + 1))
        }

        return r
      }, [])
    },
    getEnters(string) {
      return string !== null && string.indexOf('\n') > -1
        ? string.match(/\n/g).length
        : 1
    },
    numberHasconstraints(inputType) {
      return inputType !== 'number' && inputType !== 'number_0_decimals' // only svgNumber items without min & max constraints
    },
    // parseDigits(value) { // TODO remove if single-digits won't be used for sure
    //   var number = value.slice(0, this.numberFields).join('')
    //   var dec = value.slice(this.numberFields).join('')
    //   var makesSense = // check if empty single-digit number boxes are either only at the start or at the end of the fields (before the decimals) (or is completely filled in)
    //     number !== '' &&
    //     dec !== '' &&
    //     (value[this.numberFields - number.length - 1] === '' ||
    //       value[0 + number.length] === '' ||
    //       number.length === this.numberFields) &&
    //     // + check if empty single-digit number boxes are either only at the start or at the end of the decimals (or is completely filled in)
    //     (value[value.length - dec.length - 1] === '' ||
    //       value[this.numberFields + dec.length] === '' ||
    //       value.length - dec.length === this.numberFields)

    //   return makesSense ? parseFloat(number + '.' + dec) : null
    // },
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
    toggleSelect(listItemId, listId) {
      var selectedArray = []
      if (typeof this.object[listId] === 'string') {
        selectedArray = this.object[listId].split(',')
      }
      if (selectedArray.indexOf(listItemId + '') > -1) {
        selectedArray.splice(selectedArray.indexOf(listItemId), 1)
      } else {
        selectedArray.push(listItemId + '')
      }
      var selectedArrayToString = selectedArray.join(',')
      this.object[listId] = selectedArrayToString
      this.setInspectionEdited(true)
    },
    updateInput(value, property, name = null, input = null) {
      this.checkNameForEmit(name)
      this.object[property] = value
      this.setInspectionEdited(true)
    },
    validateNumber(value, input) {
      this.checkAnswer = false
      switch (input) {
        case 'number_degrees':
          return value >= -180 && value <= 180 ? value : null
        case 'number_percentage' || 'slider':
          return value >= 0 && value <= 100 ? value : null
        case 'number_negative':
          return value <= 0 ? value : value > 0 ? -value : null
        case 'number_positive':
          return value >= 0 ? value : null
      }
      // else: not yet implemented
      return value
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
  &.nested {
    margin-left: 30px;
  }
}
.v-input--selection-controls.inspection-options-list {
  margin-top: 0 !important;
}
.v-list.inspection-checkbox-list {
  padding: 0 !important;
}
</style>
