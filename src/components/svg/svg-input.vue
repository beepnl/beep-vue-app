<template>
  <g>
    <svgHeader
      v-if="item.input === 'label'"
      :position="position"
      :header="label"
      :sub-header="item.description"
    />

    <svgSelect
      v-if="
        item.input === 'select' ||
          item.input === 'options' ||
          item.input === 'list'
      "
      :position="position"
      :label="labelWithHeader"
      :items="item.children"
    />

    <!-- <svgDate
      v-if="item.input === 'date'" // TODO: remove when single-digits won't be used anymore for sure
      :position="position"
      :label="labelWithHeader"
      :time="true"
      :columns="1"
    /> -->

    <svgGradeRating
      v-if="item.input === 'grade'"
      :position="position"
      :label="labelWithHeader"
      :info="$t('Grade_exp_1')"
      :info-extra="$t('Grade_exp_2')"
    />

    <svgNumber
      v-if="item.input === 'number_percentage'"
      :position="position"
      :label="labelWithHeader"
      :append="'%'"
      :info="$t('Percentage_exp')"
    />

    <svgNumber
      v-if="item.input === 'number_degrees'"
      :position="position"
      :label="labelWithHeader"
      :append="'°'"
      :info="$t('Degrees_exp_1')"
      :info-extra="$t('Degrees_exp_2')"
    />

    <svgNumber
      v-if="
        item.input === 'number' ||
          item.input === 'number_0_decimals' ||
          item.input === 'number_positive' ||
          item.input === 'slider' ||
          item.input === 'date'
      "
      :position="position"
      :label="labelWithHeader"
      :input-type="item.input"
    />

    <svgNumber
      v-if="
        item.input === 'number_1_decimals' ||
          item.input === 'number_2_decimals' ||
          item.input === 'square_25cm2' ||
          item.input === 'number_3_decimals'
      "
      :position="position"
      :label="labelWithHeader"
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
      :position="position"
      :label="labelWithHeader"
      :prepend="'_'"
      :info="$t('Negative_exp')"
    />

    <svgSelect
      v-if="item.input === 'score_amount'"
      :position="position"
      :label="labelWithHeader"
      :score-amount="true"
    />

    <svgSelect
      v-if="item.input === 'score_quality'"
      :position="position"
      :label="labelWithHeader"
      :score-quality="true"
    />

    <svgSelect
      v-if="item.input === 'score'"
      :position="position"
      :label="labelWithHeader"
      :star-rating="true"
    />

    <svgText
      v-if="item.input === 'text'"
      :position="position"
      :label="labelWithHeader"
      :line="false"
    />

    <svgText
      v-if="item.input === 'select_hive' || item.input === 'select_location'"
      :position="position"
      :label="labelWithHeader"
      :line="true"
    />

    <svgSmileRating
      v-if="item.input === 'smileys_3'"
      :position="position"
      :label="labelWithHeader"
    />

    <svgYesNoRating
      v-if="
        item.input === 'boolean' ||
          item.input === 'boolean_yes_red' ||
          item.input === 'list_item'
      "
      :position="position"
      :label="labelWithHeader"
    />

    <svgText
      v-if="item.input === 'image' || item.input === 'sample_code'"
      :label="label"
      :text-only="true"
      :extra-text1="
        $t((item.input === 'image' ? 'Image' : 'Samplecode') + '_placeholder_1')
      "
      :extra-text2="
        $t((item.input === 'image' ? 'Image' : 'Samplecode') + '_placeholder_2')
      "
      :position="position"
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
          item.input !== 'list' &&
          item.input !== 'list_item' &&
          item.input !== 'date' &&
          item.input !== 'select_hive' &&
          item.input !== 'select_location' &&
          item.input !== 'image' &&
          item.input !== 'sample_code'
      "
      :position="position"
      :label="label + ' (' + item.input + ')'"
      :input-type-not-present="true"
    />
  </g>
</template>

<script>
// import svgDate from '@components/svg/svg-date.vue' // TODO remove when single-digits won't be used for sure
// import imageUploader from '@components/svg/image-uploader.vue'
// import sampleCode from '@components/svg/sample-code.vue'
import svgGradeRating from '@components/svg/svg-grade-rating.vue'
import svgHeader from '@components/svg/svg-header.vue'
import svgNumber from '@components/svg/svg-number.vue'
import svgSelect from '@components/svg/svg-select.vue'
import svgSmileRating from '@components/svg/svg-smile-rating.vue'
import svgText from '@components/svg/svg-text.vue'
import svgYesNoRating from '@components/svg/svg-yes-no-rating.vue'

export default {
  name: 'SvgInput',
  components: {
    // SvgFieldset: () => import('@components/svg/svg-fieldset.vue'), // needed to fix Vue recursive component error
    // svgDate, // TODO remove when single-digits won't be used for sure
    // imageUploader,
    // labelWithDescription,
    // sampleCode,
    svgGradeRating,
    svgHeader,
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
    header: {
      type: String,
      default: '',
      required: false,
    },
    position: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    label() {
      var label =
        (this.item.trans[this.locale] || this.item.name) +
        (this.item.unit !== null ? ' (' + this.item.unit + ')' : '')
      return label
    },
    labelWithHeader() {
      const maxLabelLength = 32
      var addHeader = this.header !== '' && this.header !== this.label
      var labelText = (addHeader ? this.header + ': ' : '') + this.label
      var suffix = !addHeader && this.item.suffix ? '_' + this.item.suffix : '' // only add suffix if label has no extra header (label with header is unlikely to be identical to other label with header)

      var label = labelText + suffix

      if (label.length > maxLabelLength) {
        label =
          labelText.substring(0, maxLabelLength - suffix.length) + // ensure that suffix is printed for shortened labels as well
          suffix +
          '...'
      }

      return label
    },
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>
