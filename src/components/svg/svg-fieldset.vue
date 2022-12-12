<template>
  <g>
    <g v-if="category.children.length > 0">
      <g v-for="(item, index) in category.children" :key="index">
        <SvgInput
          v-if="item.input !== 'label'"
          :position="calcXY(item.id)"
          :header="label + ' ' + calcHeight(item)"
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
              :position="calcXY(child.id)"
              :header="getHeader(item) + ' ' + calcHeight(child)"
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
      :position="calcXY(category.id)"
      :header="label + ' ' + calcHeight(category)"
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
      inputHeight: {
        label: 6,
        select_item: 5,
        date: 32,
        grade: 27,
        number_info: 22,
        number: 17,
        boolean: 13,
        text: 37,
        text_line: 19,
        smileys_3: 21,
      },
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
      return this.yMargin + (this.rowsPerPage - 1) * this.rowHeight - 1
    },
  },
  methods: {
    getHeader(item) {
      return item.trans[this.locale] || item.name
    },
    calcHeight(item) {
      switch (true) {
        case item.input.includes('select_'):
          return this.inputHeight.text_line
        case item.input.includes('boolean') || item.input === 'list_item':
          return this.inputHeight.boolean
        case item.input === 'number_percentage' ||
          item.input === 'number_degrees' ||
          item.input === 'number_negative':
          return this.inputHeight.number_info
        case item.input.includes('number') || item.input.includes('square'):
          return this.inputHeight.number
        case item.input === 'select' ||
          item.input === 'options' ||
          item.input === 'list':
          return this.calcSelectHeight(item.children.length)
        case item.input === 'score_amount' || item.input === 'score_quality':
          return this.calcSelectHeight(4)
        case item.input === 'score':
          return this.calcSelectHeight(5)
        case item.input === 'label' ||
          item.input === 'date' ||
          item.input === 'grade' ||
          item.input === 'text' ||
          item.input === 'smileys_3':
          return this.inputHeight[item.input]
      }
      // else: not yet implemented
      return this.inputHeight.number_info
    },
    calcSelectHeight(children) {
      var height = 10
      if (children > 6) {
        height = this.inputHeight.date // 29
      } else {
        height = children * this.inputHeight.select_item + 7
      }
      return height
    },
    calcXY(id) {
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
          Math.floor(y) % this.pageHeight >= this.yMax &&
          columnCounter === this.columnsPerRow
        ) {
          // go to next page
          this.$store.commit('inspections/setPageNr', this.svgPageNr + 1)
          this.$store.commit('inspections/setItemCounter', 0)
        }

        // console.log(
        //   'XY',
        //   itemCounter,
        //   x,
        //   y,
        //   // this.category.name,
        // )
        return { x, y }
      } else {
        return this.svgPositionSet[id]
      }
    },
  },
}
</script>
