<!-- eslint-disable vue/comma-dangle -->
<template>
  <div v-if="offlineInputPageNrs.length > 0">
    <div class="beep-label mt-n3 mt-sm-0" v-text="$t('Parsed_pages')"></div>
    <div class="rounded-border primary-border font-weight-bold">
      <div>
        <span v-text="$t('Number_of_processed_pages')"></span>
        <span
          :class="
            (offlineInputCorrectPageNrs.length > 0 ? 'green' : 'red') + '--text'
          "
          v-text="offlineInputCorrectPageNrs.length"
        ></span>
        <span
          v-if="selectedChecklistSvg"
          :class="(offlineInputAllPagesParsed ? 'green' : 'red') + '--text'"
          v-text="' / ' + selectedChecklistSvg.pages"
        ></span>
      </div>

      <div v-if="offlineInputIncorrectPageNrs.length > 0">
        <span v-text="$t('Incorrectly_uploaded_pages')"></span>
        <span
          class="red--text"
          v-text="offlineInputIncorrectPageNrs.join(', ')"
        ></span>
      </div>

      <div v-if="offlineInputMissingPages.length > 0">
        <span
          v-text="$tc('Missing_page', offlineInputMissingPages.length) + ': '"
        ></span>
        <span
          class="red--text"
          v-text="offlineInputMissingPages.join(', ')"
        ></span>
      </div>

      <div v-if="selectedChecklistSvg.id && offlineInputWrongSvgIds.length > 0">
        <span
          v-text="
            $tc('Check_svg_id_for_page', offlineInputWrongSvgIds.length) + ': '
          "
        ></span>
        <span
          class="red--text"
          v-text="offlineInputWrongSvgIds.join(', ')"
        ></span>
        <span
          class="beep-label"
          v-text="
            ' (' + $t('correct_svg_id') + ': ' + selectedChecklistSvg.id + ')'
          "
        ></span>
        <v-icon
          class="mdi mdi-information icon-info cursor-pointer ml-1"
          dark
          small
          :color="showExplanation ? 'accent' : 'grey'"
          @click="showExplanation = !showExplanation"
        ></v-icon>

        <div v-if="showExplanation" class="beep-label">
          <em>{{ $t('Svg_id_exp') }} </em>
        </div>
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
    offlineInputAllPagesParsed() {
      return (
        this.selectedChecklistSvg &&
        this.offlineInputCorrectPageNrs.length ===
          this.selectedChecklistSvg.pages
      )
    },
    offlineInputCorrectPageNrs() {
      var hasPageNrs = this.offlineInputPageNrs.length > 0

      var correctPageNrs = this.offlineInputPageNrs
        .filter((item) => item.value[0].indexOf(item.category_id) > -1)
        .map((item) => parseInt(item.category_id))

      return hasPageNrs ? correctPageNrs : false
    },
    offlineInputIncorrectPageNrs() {
      var hasPageNrs = this.offlineInputPageNrs.length > 0

      var incorrectPageNrs = this.offlineInputPageNrs
        .filter((item) => item.value[0].indexOf(item.category_id) === -1)
        .map((item) => parseInt(item.category_id))

      return hasPageNrs ? incorrectPageNrs : false
    },
    offlineInputMissingPages() {
      var missingPages = []
      if (this.selectedChecklistSvg) {
        for (var i = 1; i <= this.selectedChecklistSvg.pages; i++) {
          if (
            !this.offlineInputCorrectPageNrs.includes(i) &&
            !this.offlineInputIncorrectPageNrs.includes(i)
          ) {
            missingPages.push(i)
          }
        }
      }
      return missingPages
    },
    offlineInputPageNrs() {
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
    offlineInputWrongSvgIds() {
      var pagesWrongSvgIds = []
      this.parsedOfflineInput.scans.map((el) => {
        return el.scan.map((answer) => {
          if (
            answer.parent_category_id !== undefined &&
            answer.parent_category_id === 'svgid' &&
            answer.value[0].indexOf(answer.category_id) === -1
          ) {
            pagesWrongSvgIds.push(el.page)
          }
        })
      })
      return pagesWrongSvgIds
    },
  },
}
</script>
