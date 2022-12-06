<template>
  <g>
    <g
      v-if="
        category.children.length > 0 &&
          (category.input === 'label' ||
            (category.input !== 'list' &&
              category.input !== 'select' &&
              category.input !== 'options'))
      "
    >
      <svgHeader
        :x="nextX"
        :y="nextY"
        :header="label"
        :sub-header="category.description"
      />

      <!-- <topPhotoAnalysis
      ></topPhotoAnalysis>

      <liebefelderMethod
      ></liebefelderMethod> -->

      <g
        v-if="
          category.children.length > 0 &&
            category.name !== 'liebefelder_method' &&
            category.name !== 'top_photo_analysis'
        "
      >
        <g v-for="(item, index) in category.children" :key="index">
          <SvgInput
            v-if="item.input !== 'label'"
            :next-x="nextX"
            :next-y="nextY"
            :item="item"
          ></SvgInput>
          <SvgFieldset
            v-if="item.input === 'label'"
            :category="item"
          ></SvgFieldset>
        </g>
      </g>

      <SvgInput
        v-if="category.children.length === 0"
        :next-x="nextX"
        :next-y="nextY"
        :item="category"
      ></SvgInput>
    </g>

    <SvgInput
      v-if="
        category.input !== 'label' &&
          (category.children.length === 0 ||
            category.input === 'list' ||
            category.input === 'select' ||
            category.input === 'options')
      "
      :next-x="nextX"
      :next-y="nextY"
      :item="category"
    ></SvgInput>
  </g>
</template>

<script>
import SvgInput from '@components/svg/svg-input.vue'

export default {
  name: 'SvgFieldset',
  components: {
    SvgFieldset: () => import('@components/svg/svg-fieldset.vue'), // needed to fix Vue recursive component error
    SvgInput,
  },
  props: {
    category: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    label() {
      return this.category.trans[this.locale] || this.category.name
    },
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>
