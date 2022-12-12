<template>
  <g>
    <svgDivider
      v-if="category.parent_id === null"
      :y="calcRowXY(category).y - 5"
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
      xMargin: 15,
      yStart: 91,
      yMargin: 16,
      pageHeight: 297,
      pageWidth: 210,
      maxRowHeight: 8,
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
      return this.pageHeight - this.yMargin - this.maxRowHeight - 1
    },
  },
  methods: {
    getHeader(item) {
      return item.trans[this.locale] || item.name
    },
    calcRowXY(item, fullRowItem = false) {
      if (this.svgPositionSet[item.id] === undefined) {
        var itemCounter = this.svgItemCounter + 1
        var itemHeight = 8
        if (itemCounter === 1) {
          // init row height as first item height
          this.$store.commit('inspections/setRowHeight', itemHeight)
        }
        // for new row, set Y (height so far) as previous Y + row height of previous row
        this.$store.commit('inspections/setY', this.svgY + this.svgRowHeight)
        // set row height to category header item height
        this.$store.commit('inspections/setRowHeight', itemHeight)

        var x = this.xMargin
        var y =
          (this.svgPageNr === 1 ? this.yStart : this.yMargin) +
          (this.svgPageNr - 1) * this.pageHeight +
          this.svgY

        this.$store.commit('inspections/setItemCounter', itemCounter)
        this.$store.commit('inspections/setColumnCounter', this.columnsPerRow)
        this.$store.commit('inspections/setPosition', {
          id: item.id,
          x,
          y,
        })

        if (Math.floor(y) % this.pageHeight >= this.yMax) {
          // go to next page
          this.$store.commit('inspections/setPageNr', this.svgPageNr + 1)
          this.$store.commit('inspections/setItemCounter', 0)
          this.$store.commit('inspections/setRowHeight', 0)
          this.$store.commit('inspections/setY', 0)
        }

        return { x, y }
      } else {
        return this.svgPositionSet[item.id]
      }
    },
  },
}
</script>
