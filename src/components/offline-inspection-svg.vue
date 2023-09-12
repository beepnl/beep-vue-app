<template>
  <svg
    id="checklist-svg"
    xmlns="http://www.w3.org/2000/svg"
    x="0mm"
    y="0mm"
    :width="pageWidth + 'mm'"
    fill="#ffffff"
    :height="calcSvgHeight"
    :data-app-version="appVersion"
  >
    <rect v-if="!printMode" width="100%" height="100%" fill="#fff4dd" />

    <g v-for="pageNr in pages" :key="'page' + pageNr">
      <svgPrintCorners
        v-if="svgMaxPageNr === null || pageNr <= svgMaxPageNr"
        :pageNumber="pageNr"
        :checklist-header-text="svgChecklistName"
        :checklist-svg-id="
          !saveAsNewChecklistSvg
            ? checklistSvgAlreadySaved.id.toString()
            : checklistSvgId
            ? checklistSvgId.toString()
            : ''
        "
        :totalPages="totalPages"
      />
    </g>

    <svgOverall :position="{ x: 13, y: 15 }" />

    <g>
      <template v-for="(category, catIndex) in selectedChecklist.categories">
        <svgCategory :key="catIndex" :category="category" />
      </template>
    </g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'
import { svgData, svgStyles } from '@mixins/svgMixin'
import svgCategory from '@/src/components/svg/svg-category.vue'
import svgOverall from '@/src/components/svg/svg-overall.vue'
import svgPrintCorners from '@/src/components/svg/svg-print-corners.vue'

export default {
  components: {
    svgCategory,
    svgOverall,
    svgPrintCorners,
  },
  mixins: [svgData, svgStyles],
  props: {
    selectedChecklist: {
      type: Object,
      default: null,
      required: true,
    },
    checklistSvgAlreadySaved: {
      type: Object,
      default: null,
      required: false,
    },
    checklistSvgDifferentAppVersion: {
      type: Boolean,
      default: false,
    },
    checklistSvgId: {
      type: Number,
      default: null,
      required: false,
    },
    newSvgName: {
      type: String,
      default: null,
      required: false,
    },
    printMode: {
      type: Boolean,
      default: false,
    },
    selectedMode: {
      type: String,
      default: null,
      required: false,
    },
    totalPages: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters('inspections', [
      'svgMaxPageNr',
      'svgPageNr',
      'svgY',
      'svgWarnings',
    ]),
    calcSvgHeight() {
      var removePage =
        this.svgMaxPageNr && this.svgPageNr > this.svgMaxPageNr ? 1 : 0
      return (this.svgPageNr - removePage) * this.pageHeight + 'mm'
    },
    now() {
      return this.$moment().format('YYYY-MM-DD HH:mm')
    },
    pages() {
      return this.svgPageNr
    },
    saveAsNewChecklistSvg() {
      return (
        this.checklistSvgAlreadySaved === null ||
        this.checklistSvgDifferentAppVersion
      )
    },
    svgChecklistName() {
      return !this.saveAsNewChecklistSvg
        ? this.checklistSvgAlreadySaved.name
        : this.newSvgName
        ? this.newSvgName
        : this.selectedChecklist.name +
          ' (' +
          this.now +
          ') (v' +
          this.appVersion +
          ')'
    },
  },
  mounted() {
    console.log('svg mounted')
    this.$emit('done-loading')
  },
}
</script>
