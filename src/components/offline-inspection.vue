<template>
  <v-row class="ma-0">
    <v-col v-if="svgWarnings.length > 0 && !printMode" cols="12">
      <v-row :justify="'center'">
        <v-col cols="12" class="svg-warnings no-print">
          <v-alert
            v-for="(warning, index) in svgWarnings"
            :key="warning + index"
            type="error"
            text
            prominent
            dense
            dismissible
            color="red"
          >
            {{ warning }}
          </v-alert>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" :class="!printMode ? 'd-flex justify-center' : 'pa-0'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0mm"
        y="0mm"
        :width="pageWidth + 'mm'"
        fill="#ffffff"
        :height="calcSvgHeight"
        :data-app-version="appVersion"
        :data-svg-created="now"
        :data-user-locale="userLocale"
      >
        <rect v-if="!printMode" width="100%" height="100%" fill="#fff4dd" />

        <g v-for="pageNr in pages" :key="'page' + pageNr">
          <svgPrintCorners
            v-if="svgMaxPageNr === null || pageNr <= svgMaxPageNr"
            :pageNumber="pageNr"
          />
        </g>

        <svgOverall :position="{ x: 13, y: 15 }" />

        <g>
          <template
            v-for="(category, catIndex) in selectedChecklist.categories"
          >
            <svgCategory :key="catIndex" :category="category" />
          </template>
        </g>
      </svg>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { svgData } from '@mixins/svgMixin'
import svgCategory from '@/src/components/svg/svg-category.vue'
import svgOverall from '@/src/components/svg/svg-overall.vue'
import svgPrintCorners from '@/src/components/svg/svg-print-corners.vue'

export default {
  components: {
    svgCategory,
    svgOverall,
    svgPrintCorners,
  },
  mixins: [svgData],
  props: {
    selectedChecklist: {
      type: Object,
      default: null,
      required: true,
    },
    printMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale']),
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
  },
  updated() {
    this.$emit('updated')
  },
}
</script>

<style lang="scss" scoped>
.svg-warnings {
  max-width: 210mm;
  padding: 0;
}
</style>
