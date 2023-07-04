<!-- eslint-disable vue/comma-dangle -->
<template>
  <div v-if="pageNrs.length > 0">
    <div class="beep-label mt-n3 mt-sm-0" v-text="$t('Parsed_pages')"></div>
    <div class="rounded-border primary-border font-weight-bold">
      <div class="d-flex align-center">
        <span class="mr-1" v-text="$t('Number_of_processed_pages')"></span>
        <span
          :class="(correctPageNrs.length > 0 ? 'green' : 'red') + '--text mr-1'"
          v-text="correctPageNrs.length"
        ></span>
        <span
          v-if="selectedChecklistSvg"
          :class="(allPagesParsed ? 'green' : 'red') + '--text'"
          v-text="' / ' + selectedChecklistSvg.pages"
        ></span>
        <v-icon v-if="allPagesParsed" class="ml-1" size="18" color="green"
          >mdi-check-circle</v-icon
        >
      </div>

      <div v-if="incorrectPageNrs.length > 0">
        <span v-text="$t('Incorrectly_uploaded_pages')"></span>
        <span class="red--text" v-text="incorrectPageNrs.join(', ')"></span>
      </div>

      <div v-if="missingPages.length > 0" class="red--text">
        <span v-text="$tc('Missing_page', missingPages.length) + ': '"></span>
        <span v-text="missingPages.join(', ')"></span>
      </div>

      <div
        v-if="selectedChecklistSvg.id && wrongSvgIds.length > 0"
        class="d-flex align-center"
      >
        <span
          class="mr-1 red--text"
          v-text="
            !svgIdsAllWrong
              ? $tc('Check_svg_id_for_page', wrongSvgIds.length) + ': '
              : $t('All_svg_ids_incorrect')
          "
        ></span>
        <v-icon v-if="svgIdsAllWrong" class="mr-1" size="18" color="red"
          >mdi-close-circle</v-icon
        >

        <span
          v-if="!svgIdsAllWrong"
          class="red--text mr-1"
          v-text="wrongSvgIds.join(', ')"
        ></span>
        <span
          class="beep-label mb-0 mr-1"
          v-text="
            ' (' + $t('correct_svg_id') + ': ' + selectedChecklistSvg.id + ')'
          "
        ></span>
        <v-icon
          class="mdi mdi-information icon-info cursor-pointer"
          dark
          small
          :color="showExplanation ? 'accent' : 'grey'"
          @click="showExplanation = !showExplanation"
        ></v-icon>
      </div>

      <div v-if="showExplanation" class="beep-label">
        <em>{{ $t('Svg_id_exp') }} </em>
      </div>

      <div
        v-if="selectedChecklistSvg.id && wrongSvgIds.length === 0"
        class="d-flex align-center"
      >
        <span class="green--text" v-text="$t('All_svg_ids_correct')"></span>
        <v-icon class="ml-1" size="18" color="green">mdi-check-circle</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    selectedChecklistSvg: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      showExplanation: false,
    }
  },
  computed: {
    ...mapGetters('inspections', ['parsedOfflineInput']),
    allPagesParsed() {
      return (
        this.selectedChecklistSvg &&
        this.correctPageNrs.length === this.selectedChecklistSvg.pages
      )
    },
    correctPageNrs() {
      var hasPageNrs = this.pageNrs.length > 0

      var correctPageNrs = this.pageNrs
        .filter((item) => item.value[0].indexOf(item.category_id) > -1)
        .map((item) => parseInt(item.category_id))

      return hasPageNrs ? correctPageNrs : false
    },
    incorrectPageNrs() {
      var hasPageNrs = this.pageNrs.length > 0

      var incorrectPageNrs = this.pageNrs
        .filter((item) => item.value[0].indexOf(item.category_id) === -1)
        .map((item) => parseInt(item.category_id))

      return hasPageNrs ? incorrectPageNrs : false
    },
    missingPages() {
      var missingPages = []
      if (this.selectedChecklistSvg) {
        for (var i = 1; i <= this.selectedChecklistSvg.pages; i++) {
          if (
            !this.correctPageNrs.includes(i) &&
            !this.incorrectPageNrs.includes(i)
          ) {
            missingPages.push(i)
          }
        }
      }
      return missingPages
    },
    pageNrs() {
      var returnedPageNrs = this.parsedOfflineInput.scans
        .map((el) => {
          return el.scan.filter(
            (answer) =>
              answer.parent_category_id !== undefined &&
              answer.parent_category_id === 'pagenr'
          )
        })
        .filter((el) => el.length > 0)
        .map((el) => el[0])

      return returnedPageNrs
    },
    wrongSvgIds() {
      var pagesWrongSvgIds = []
      if (this.selectedChecklistSvg) {
        this.parsedOfflineInput.scans.map((el) => {
          return el.scan.map((answer) => {
            if (
              answer.parent_category_id !== undefined &&
              answer.parent_category_id === 'svgid' &&
              answer.value[0].indexOf(
                this.selectedChecklistSvg.id.toString()
              ) === -1
            ) {
              pagesWrongSvgIds.push(el.page)
            }
          })
        })
      }
      return pagesWrongSvgIds
    },
    svgIdsAllWrong() {
      return this.wrongSvgIds.length === this.pageNrs.length
    },
  },
}
</script>
