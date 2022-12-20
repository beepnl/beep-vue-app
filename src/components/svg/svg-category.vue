<template>
  <g>
    <svgDivider
      v-if="category.parent_id === null"
      :y="calcRowXY(category).y - 4"
    />

    <svgHeader
      v-if="category.parent_id === null"
      :position="calcRowXY(category)"
      :header="getHeader(category)"
    />

    <template v-for="(child, catIndex) in category.children">
      <svgFieldset :key="catIndex" :category="child" />
    </template>
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
import svgDivider from '@/src/components/svg/svg-divider.vue'
import svgFieldset from '@/src/components/svg/svg-fieldset.vue'
import svgHeader from '@components/svg/svg-header.vue'

export default {
  components: {
    svgDivider,
    svgFieldset,
    svgHeader,
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
      columnsPerRow: 4,
      xMargin: 13,
      yStart: 89,
      yMargin: 15,
      pageHeight: 297,
      pageWidth: 210,
      maxRowHeight: 41,
      headerHeight: 6.5,
    }
  },
  computed: {
    ...mapGetters('inspections', [
      'svgItemCounter',
      'svgColumnCounter',
      'svgPageNr',
      'svgPositionSet',
      'svgRowHeight',
      'svgY',
    ]),
    columnWidth() {
      return (this.pageWidth - 2 * this.xMargin) / 4
    },
    locale() {
      return this.$i18n.locale
    },
    yMax() {
      return this.pageHeight - this.yMargin - this.maxRowHeight
    },
  },
  methods: {
    getHeader(item) {
      return item.trans[this.locale] || item.name
    },
    calcRowXY(item) {
      if (this.svgPositionSet[item.id] === undefined) {
        var itemCounter = this.svgItemCounter + 1

        if (itemCounter === 1) {
          // init row height as first item height
          this.$store.commit('inspections/setRowHeight', this.headerHeight)
        }
        // for new row, set Y (height so far) as previous Y + row height of previous row
        this.$store.commit('inspections/setY', this.svgY + this.svgRowHeight)
        // set row height to category header item height
        this.$store.commit('inspections/setRowHeight', this.headerHeight)

        var x = this.xMargin
        var y =
          (this.svgPageNr === 1 ? this.yStart : this.yMargin) +
          (this.svgPageNr - 1) * this.pageHeight +
          this.svgY

        if (y % this.pageHeight >= this.yMax) {
          // push category to next page if the next row does not fit on current page
          this.$store.dispatch('inspections/nextPage')
          y = this.yMargin + (this.svgPageNr - 1) * this.pageHeight
          itemCounter = 1
          this.$store.commit('inspections/setRowHeight', this.headerHeight)
        }

        this.$store.commit('inspections/setItemCounter', itemCounter)
        this.$store.commit('inspections/setColumnCounter', this.columnsPerRow)
        this.$store.commit('inspections/setPosition', {
          id: item.id,
          x,
          y,
        })

        return { x, y }
      } else {
        return this.svgPositionSet[item.id]
      }
    },
  },
}
</script>
