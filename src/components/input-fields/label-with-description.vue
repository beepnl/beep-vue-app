<template>
  <div>
    <div class="beep-label">
      <span
        v-text="
          plainText !== null
            ? plainText
            : getText(item) +
              (item.unit !== null ? ' (' + item.unit + ')' : '') +
              (item.required === 1 ? '*' : '')
        "
      ></span>
      <a
        v-if="
          plainText === null &&
            (item.description !== null || item.source !== null)
        "
        ><v-icon
          class="mdi mdi-information ml-1 icon-info"
          dark
          small
          color="accent"
          @click="showDescription = !showDescription"
        ></v-icon
      ></a>
      <v-icon
        v-if="parseMode && parsedImages.length > 0"
        class="ml-1"
        dark
        small
        :color="checkAnswer ? 'red' : 'grey'"
        @click="showImages = !showImages"
      >
        {{ showImages ? 'mdi-eye' : 'mdi-eye-off' }}
      </v-icon>
    </div>

    <p v-if="showDescription" class="info-text">
      <em v-if="item.description !== null">{{ item.description }}<br /></em>
      <a v-if="item.source !== null" :href="item.source" target="_blank">{{
        item.source
      }}</a>
    </p>

    <div
      v-if="showImages && parsedItems.length > 0"
      class="info-text parsed-images d-flex flex-column"
    >
      <div v-for="(it, j) in parsedItems" :key="'i' + j" class="d-flex pa-1">
        <div
          v-if="it.depth > 0"
          :style="'width: ' + 20 * it.depth + 'px;'"
        ></div>
        <img
          v-if="!it.hasChildren"
          :src="parsedImages[j]"
          class="parsed-checkbox"
        />
        <span class="ml-1" v-text="getText(it)"></span>
      </div>
    </div>

    <div
      v-else-if="showImages && parsedImages.length > 0"
      class="info-text parsed-images"
    >
      <div
        :class="
          'd-flex pa-1 ' +
            (columnItems ? 'flex-column align-start' : 'align-center')
        "
      >
        <div
          v-for="(image, j) in parsedImages"
          :key="'pi-' + j"
          :class="
            'd-flex ' +
              (itemIsCheckbox
                ? 'checkbox-div' + (itemIsCheckboxList ? ' mb-1' : '')
                : 'text-div' +
                  (textArea ? ' --area' : '') +
                  (wideNote ? ' --wide-note' : '') +
                  (parsedDate ? ' --double' : ''))
          "
        >
          <div v-if="gradeItem" class="d-flex flex-column align-center">
            <div>
              <span v-text="j + 1"></span>
            </div>

            <img :src="image" class="parsed-checkbox" />
          </div>

          <img
            v-else
            :src="image"
            :class="parsedImages.length > 1 ? 'parsed-checkbox' : 'parsed-else'"
          />

          <div
            v-if="checkboxExtraSpace(j)"
            :class="item.input === 'smileys_3' ? 'pr-3' : 'pr-1'"
          >
          </div>

          <div
            v-if="booleanItem"
            :class="'ml-1 mt-1' + (j === 0 ? ' mr-5' : '')"
          >
            <span v-text="j === 0 ? $t('yes') : $t('no')"></span>
          </div>

          <div v-if="scoreItem" class="mb-1">
            <v-icon
              v-for="star in j + 1"
              :key="star + 1"
              class="color-grey-medium"
              >mdi-star</v-icon
            >
          </div>

          <div v-if="presetItems" class="ml-1 mb-1">
            <span v-text="presetItems[j]"></span>
          </div>

          <!-- <div v-if="precision > 0 && j === 2"> // TODO remove if single-digits won't be used for sure
            <div class="img-helper dot" v-text="'.'"></div>
          </div> -->

          <!-- <div v-else-if="parsedDate && j !== 1 && (j - 3) % 2 === 0"> // TODO remove if single-digits won't be used for sure
            <div v-if="j === 7" class="mr-3"></div>
            <div
              v-else
              class="img-helper"
              v-text="j === 3 || j === 5 ? '-' : j === 9 ? ':' : ''"
            ></div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { svgData } from '@mixins/svgMixin'

export default {
  mixins: [svgData],
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
    parsedDate: {
      type: Boolean,
      default: false,
      required: false,
    },
    parsedItems: {
      type: Array,
      default: () => [],
      required: false,
    },
    parsedImages: {
      type: Array,
      default: () => [],
      required: false,
    },
    parseMode: {
      type: Boolean,
      default: false,
      required: false,
    },
    plainText: {
      type: String,
      default: null,
      required: false,
    },
    precision: {
      type: Number,
      default: 0,
      required: false,
    },
    checkAnswer: {
      type: Boolean,
      default: false,
      required: false,
    },
    textArea: {
      type: Boolean,
      default: false,
      required: false,
    },
    wideNote: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: function() {
    return {
      showDescription: false,
      showImages: false,
      showRedEye: false,
    }
  },
  computed: {
    booleanItem() {
      return this.item && this.item.input.indexOf('boolean') > -1
    },
    columnItems() {
      return this.item && this.item.input.indexOf('score') > -1
    },
    gradeItem() {
      return this.item && this.item.input === 'grade'
    },
    itemIsCheckbox() {
      return (
        this.booleanItem ||
        this.gradeItem ||
        this.smileyItem ||
        this.itemIsCheckboxList
      )
    },
    itemIsCheckboxList() {
      return this.presetItems || this.scoreItem || this.columnItems
    },
    presetItems() {
      return this.scoreAmount
        ? this.scoreAmountItems
        : this.scoreQuality
        ? this.scoreQualityItems
        : false
    },
    scoreAmount() {
      return this.item && this.item.input === 'score_amount'
    },
    scoreItem() {
      return this.item && this.item.input === 'score'
    },
    scoreQuality() {
      return this.item && this.item.input === 'score_quality'
    },
    smileyItem() {
      return this.item && this.item.input === 'smileys_3'
    },
  },
  created() {
    if (this.parseMode) {
      this.showImages = true
    }
  },
  methods: {
    checkboxExtraSpace(index) {
      return (
        (this.smileyItem || this.gradeItem) &&
        index < this.parsedImages.length - 1
      )
    },
    getText(item) {
      return item.trans[this.locale] || item.name
    },
  },
}
</script>

<style lang="scss" scoped>
.parsed-images {
  position: relative;
  display: inline-block;
  &:before {
    // this way width of the border is not wider than images total
    content: '';
    border: 1px $color-grey-light dashed;
    border-radius: 3px;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.parsed-checkbox {
  width: 24px;
  height: 24px;
}

.img-helper {
  text-align: center;
  min-width: 6px;
  &.dot {
    font-weight: bold;
    margin-top: 6px;
  }
}

.checkbox-div {
  height: 24px;
  width: auto;
}

.text-div {
  max-height: 50px;
  width: auto;
  max-width: 100%;

  &.--area {
    max-height: 250px;
  }

  &.--double {
    max-height: 30px;
  }

  &.--wide-note {
    max-height: 120px;
  }

  img {
    max-width: 100%;
  }
}
</style>
