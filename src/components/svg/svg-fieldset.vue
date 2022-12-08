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
      <!-- <svgHeader
        :position="calcXY('header', category.id)"
        :header="label"
        :sub-header="category.description"
      /> -->

      <g v-if="category.children.length > 0">
        <g v-for="(item, index) in category.children" :key="index">
          <SvgInput
            v-if="item.input !== 'label'"
            :position="calcXY('1', item.id)"
            :header="label"
            :item="item"
          ></SvgInput>
          <g
            v-if="
              item.children.length > 0 &&
                (item.input === 'boolean' ||
                  item.input === 'boolean_yes_red' ||
                  item.input === 'list_item')
            "
          >
            <template v-for="child in item.children">
              <SvgInput
                :key="'c' + child.id"
                :position="calcXY('4', child.id)"
                :header="getHeader(item)"
                :item="child"
              ></SvgInput>
            </template>
          </g>

          <SvgFieldset
            v-else-if="item.input === 'label'"
            :category="item"
          ></SvgFieldset>
        </g>
      </g>

      <SvgInput
        v-if="category.children.length === 0"
        :position="calcXY('2', category.id)"
        :header="label"
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
      :position="calcXY('3', category.id)"
      :header="label"
      :item="category"
    ></SvgInput>
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
// import svgHeader from '@components/svg/svg-header.vue'
import SvgInput from '@components/svg/svg-input.vue'

export default {
  name: 'SvgFieldset',
  components: {
    SvgFieldset: () => import('@components/svg/svg-fieldset.vue'), // needed to fix Vue recursive component error
    // svgHeader,
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
      columnsPerRow: 4,
      rowsPerPage: 7,
      xMargin: 15,
      yStart: 103,
      yMargin: 16,
      pageHeight: 297,
      pageWidth: 210,
    }
  },
  computed: {
    ...mapGetters('inspections', [
      'svgItemCounter',
      'svgColumnCounter',
      'svgPositionSet',
      'svgPageNr',
    ]),
    columnWidth() {
      return (this.pageWidth - 2 * this.xMargin) / 4
    },
    label() {
      return this.getHeader(this.category)
    },
    locale() {
      return this.$i18n.locale
    },
    rowHeight() {
      var rH = (this.pageHeight - 2 * this.yMargin) / this.rowsPerPage
      return rH.toFixed(1)
    },
    yMax() {
      return this.yMargin + (this.rowsPerPage - 1) * this.rowHeight + 1
    },
  },
  methods: {
    getHeader(item) {
      return item.trans[this.locale] || item.name
    },
    calcXY(log = null, id) {
      if (this.svgPositionSet[id] === undefined) {
        var itemCounter = this.svgItemCounter + 1
        var columnCounter =
          this.svgColumnCounter >= this.columnsPerRow
            ? 1
            : this.svgColumnCounter + 1
        var rowCounter =
          itemCounter <= this.columnsPerRow
            ? 1
            : Math.ceil(itemCounter / this.columnsPerRow)

        var x = this.xMargin + (columnCounter - 1) * this.columnWidth
        var y =
          (this.svgPageNr === 1 ? this.yStart : this.yMargin) +
          (this.svgPageNr - 1) * this.pageHeight +
          (rowCounter - 1) * this.rowHeight

        this.$store.commit('inspections/setItemCounter', itemCounter)
        this.$store.commit('inspections/setColumnCounter', columnCounter)
        this.$store.commit('inspections/setPosition', {
          id,
          x,
          y,
        })

        if (
          y % this.pageHeight > this.yMax &&
          columnCounter === this.columnsPerRow
        ) {
          // go to next page
          this.$store.commit('inspections/setPageNr', this.svgPageNr + 1)
          this.$store.commit('inspections/setItemCounter', 0)
        }

        // console.log(
        //   'XY',
        //   itemCounter,
        //   // rowCounter,
        //   x,
        //   y,
        //   // this.category.name,
        //   log
        // )
        return { x, y }
      } else {
        return this.svgPositionSet[id]
      }
    },
  },
}
</script>
