<template>
  <g>
    <!-- <selectHiveOrApiary
      v-if="item.input === 'select_hive' || item.input === 'select_location'"
      :object="object"
      :item="item"
    ></selectHiveOrApiary> -->

    <!-- <imageUploader
      v-if="item.input === 'image'"
      :object="object"
      :item="item"
      :input-disabled="disabled"
    ></imageUploader> -->

    <!-- <v-list v-if="item.input === 'list'" class="inspection-checkbox-list">
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
    </v-list> -->

    <svgSelect
      v-if="item.input === 'select' || item.input === 'options'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :items="item.children"
    />

    <svgDate
      v-if="item.input === 'date'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :time="true"
    />

    <svgGradeRating
      v-if="item.input === 'grade'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :info="'Grade between 1 and 10'"
      :info-extra="'(1 = Poor, 10 = Excellent)'"
    />

    <svgNumber
      v-if="item.input === 'number_percentage'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :append="'%'"
      :info="'Percentage between 0 and 100'"
    />

    <svgNumber
      v-if="item.input === 'number_degrees'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :append="'°'"
      :info="'Number of degrees between -180° and 180°'"
    />

    <svgNumber
      v-if="
        item.input === 'number' ||
          item.input === 'number_0_decimals' ||
          item.input === 'number_positive' ||
          item.input === 'slider'
      "
      :x="nextX"
      :y="nextY"
      :label="label"
    />

    <svgNumber
      v-if="
        item.input === 'number_1_decimals' ||
          item.input === 'number_2_decimals' ||
          item.input === 'square_25cm2' ||
          item.input === 'number_3_decimals'
      "
      :x="nextX"
      :y="nextY"
      :label="label"
      :decimals="
        item.input === 'number_2_decimals'
          ? 2
          : item.input === 'number_3_decimals'
          ? 3
          : 1
      "
    />

    <svgNumber
      v-if="item.input === 'number_negative'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :prepend="'_'"
      :info="'Negative number (below 0)'"
    />

    <svgSelect
      v-if="item.input === 'score_amount'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :score-amount="true"
    />

    <svgSelect
      v-if="item.input === 'score_quality'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :score-quality="true"
    />

    <svgSelect
      v-if="item.input === 'score'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :stars="true"
    />

    <svgText
      v-if="item.input === 'text'"
      :x="nextX"
      :y="nextY"
      :label="label"
      :line="false"
    />

    <svgSmileRating
      v-if="item.input === 'smileys_3'"
      :x="nextX"
      :y="nextY"
      :label="label"
    />

    <svgYesNoRating
      v-if="
        item.input === 'boolean' ||
          item.input === 'boolean_yes_red' ||
          item.input === 'list_item'
      "
      :x="nextX"
      :y="nextY"
      :label="label"
    />

    <SvgFieldset
      v-if="
        item.children.length > 0 &&
          (item.input === 'boolean' ||
            item.input === 'boolean_yes_red' ||
            item.input === 'list_item')
      "
      class="mt-6"
      :category="item"
    />

    <svgText
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
          item.input !== 'list_item' &&
          item.input !== 'date'
      "
      :x="nextX"
      :y="nextY"
      :label="label + ' (' + item.input + ')'"
      :input-type-not-present="true"
    />
  </g>
</template>

<script>
import svgDate from '@components/svg/svg-date.vue'
// import imageUploader from '@components/svg/image-uploader.vue'
// import sampleCode from '@components/svg/sample-code.vue'
// import selectHiveOrApiary from '@components/svg/select-hive-or-apiary.vue'
import svgGradeRating from '@components/svg/svg-grade-rating.vue'
import svgNumber from '@components/svg/svg-number.vue'
import svgSelect from '@components/svg/svg-select.vue'
import svgSmileRating from '@components/svg/svg-smile-rating.vue'
import svgText from '@components/svg/svg-text.vue'
import svgYesNoRating from '@components/svg/svg-yes-no-rating.vue'

export default {
  name: 'SvgInput',
  components: {
    SvgFieldset: () => import('@components/svg/svg-fieldset.vue'), // needed to fix Vue recursive component error
    svgDate,
    // imageUploader,
    // labelWithDescription,
    // sampleCode,
    // selectHiveOrApiary,
    svgGradeRating,
    svgNumber,
    svgSelect,
    svgSmileRating,
    svgText,
    svgYesNoRating,
  },
  props: {
    item: {
      type: Object,
      default: null,
      required: true,
    },
    nextX: {
      type: Number,
      required: true,
    },
    nextY: {
      type: Number,
      required: true,
    },
  },
  computed: {
    label() {
      return this.item.trans[this.locale] || this.item.name
    },
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>
