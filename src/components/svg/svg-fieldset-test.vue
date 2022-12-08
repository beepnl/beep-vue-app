<template>
  <g>
    <!-- <g
      v-if="
        category.children.length > 0 &&
          (category.input === 'label' ||
            (category.input !== 'list' &&
              category.input !== 'select' &&
              category.input !== 'options'))
      "
    >
      <svgHeader
        :x="calcX('header')"
        :y="calcY('header')"
        :header="label"
        :sub-header="category.description"
      /> -->

    <svgHeader
      v-if="category.input === 'label'"
      :x="calcX('header')"
      :y="calcY('header')"
      :header="label"
      :sub-header="category.description"
    />

    <g v-if="category.children.length > 0">
      <g v-for="(item, index) in category.children" :key="index">
        <SvgInput
          v-if="item.input !== 'label'"
          :next-x="calcX('1')"
          :next-y="calcY('1')"
          :item="item"
        ></SvgInput>
        <SvgFieldset
          v-if="item.input === 'label'"
          :category="item"
        ></SvgFieldset>
      </g>
    </g>

    <SvgInput
      v-if="category.input !== 'label' && category.children.length === 0"
      :next-x="calcX('2')"
      :next-y="calcY('2')"
      :item="category"
    ></SvgInput>

    <!-- <SvgInput
      v-if="category.children.length === 0"
      :next-x="calcX('2')"
      :next-y="calcY('2')"
      :item="category"
    ></SvgInput> -->
  </g>

  <!-- <SvgInput
      v-if="
        category.input !== 'label' &&
          (category.children.length === 0 ||
            category.input === 'list' ||
            category.input === 'select' ||
            category.input === 'options')
      "
      :next-x="calcX('3')"
      :next-y="calcY('3')"
      :item="category"
    ></SvgInput>
  </g> -->
</template>

<script>
import { mapGetters } from 'vuex'
import svgHeader from '@components/svg/svg-header.vue'
import SvgInput from '@components/svg/svg-input.vue'

export default {
  name: 'SvgFieldset',
  components: {
    SvgFieldset: () => import('@components/svg/svg-fieldset.vue'), // needed to fix Vue recursive component error
    svgHeader,
    SvgInput,
  },
  props: {
    category: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      xStart: 15,
      xWidth: 45,
      yStart: 44,
      yHeight: 44,
      yMax: 281,
      pageNr: 1,
      pageHeight: 297,
    }
  },
  computed: {
    ...mapGetters('inspections', ['svgItemCounter', 'svgColumnCounter']),
    label() {
      return this.category.trans[this.locale] || this.category.name
    },
    locale() {
      return this.$i18n.locale
    },
    rowCounter() {
      return Math.ceil(this.svgItemCounter / 4)
    },
  },
  created() {
    console.log('created ', this.category.id)
  },
  methods: {
    calcX(log = null) {
      var itemCounter = this.svgItemCounter + 1
      var columnCounter =
        this.svgColumnCounter >= 4 ? 1 : this.svgColumnCounter + 1
      var newX = this.xStart + (columnCounter - 1) * this.xWidth
      this.$store.commit('inspections/setItemCounter', itemCounter)
      this.$store.commit('inspections/setColumnCounter', columnCounter)
      // console.log('X', itemCounter, columnCounter, newX, this.category.name)
      return newX
    },
    calcY(log = null) {
      var newY = this.yStart + (this.rowCounter - 1) * this.yHeight
      // console.log('Y', this.rowCounter, newY, this.category.name)
      console.log(log)
      return newY
    },
  },
}
</script>
