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
        v-if="category.input === 'label'"
        :position="calcXY(category, true)"
        :header="getHeader(category)"
        :small="true"
      />

      <g v-if="category.children.length > 0">
        <g v-for="(item, index) in category.children" :key="index">
          <SvgInput
            v-if="item.input !== 'label'"
            :position="calcXY(item)"
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
                :position="calcXY(child)"
                :header="getHeader(item, child)"
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
        :position="calcXY(category)"
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
      :position="calcXY(category)"
      :header="label"
      :item="category"
    ></SvgInput>
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgInput from '@components/svg/svg-input.vue'
import svgHeader from '@components/svg/svg-header.vue'

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
      columnsPerRow: 4,
      xMargin: 13,
      yStart: 89,
      yMargin: 15,
      pageHeight: 297,
      pageWidth: 210,
      maxRowHeight: 40,
      inputHeight: {
        label: 4,
        select_item: 5,
        date: 32,
        grade: 23,
        number_info: 21,
        number: 16.5,
        boolean: 12,
        text: 35,
        text_line: 19,
        smileys_3: 21,
      },
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
    label() {
      return '' // this.getHeader(this.category)
    },
    locale() {
      return this.$i18n.locale
    },
    yMax() {
      return this.pageHeight - this.yMargin - this.maxRowHeight
    },
  },
  methods: {
    getHeader(item, child = null) {
      return child === null || child.parent_id === item.id
        ? item.trans[this.locale] || item.name
        : ''
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
          var nrOfItems = this.countChildren(item)
          return this.calcSelectHeight(nrOfItems)
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
      if (children > 5) {
        height = this.inputHeight.grade + this.inputHeight.label // 27
      } else {
        height = children * this.inputHeight.select_item + 8
      }
      return height
    },
    calcXY(item, fullRowItem = false) {
      if (this.svgPositionSet[item.id] === undefined) {
        var itemCounter = this.svgItemCounter + 1
        var itemHeight = this.calcHeight(item)
        if (itemCounter === 1) {
          // init row height as first item height
          this.$store.commit('inspections/setRowHeight', itemHeight)
        }
        if (fullRowItem || this.svgColumnCounter >= this.columnsPerRow) {
          var columnCounter = 1
          // for new row, set Y (height so far) as previous Y + row height of previous row
          this.$store.commit(
            'inspections/setY',
            this.svgY + this.svgRowHeight - (fullRowItem ? 1 : 0)
          )
          // reset row height to current item height for new row
          this.$store.commit('inspections/setRowHeight', itemHeight)
        } else {
          columnCounter = this.svgColumnCounter + 1
          if (itemHeight > this.svgRowHeight) {
            // if item is higher than stored row height, update row height
            this.$store.commit('inspections/setRowHeight', itemHeight)
          }
        }

        var x = this.xMargin + (columnCounter - 1) * this.columnWidth
        var y =
          (this.svgPageNr === 1 ? this.yStart : this.yMargin) +
          (this.svgPageNr - 1) * this.pageHeight +
          this.svgY

        if (fullRowItem) {
          columnCounter = this.columnsPerRow
          if (y % this.pageHeight >= this.yMax) {
            // push item to next page if the next row does not fit on current page
            this.$store.dispatch('inspections/nextPage')
            y = this.yMargin + (this.svgPageNr - 1) * this.pageHeight
            itemCounter = 1
            this.$store.commit('inspections/setRowHeight', itemHeight)
          }
        }

        this.$store.commit('inspections/setItemCounter', itemCounter)
        this.$store.commit('inspections/setColumnCounter', columnCounter)
        this.$store.commit('inspections/setPosition', {
          id: item.id,
          x,
          y,
        })

        if (
          !fullRowItem &&
          y % this.pageHeight >= this.yMax &&
          columnCounter === this.columnsPerRow
        ) {
          // go to next page (for next row)
          this.$store.dispatch('inspections/nextPage')
        }

        return { x, y }
      } else {
        return this.svgPositionSet[item.id]
      }
    },
    countChildren(child) {
      return (
        child.children.length +
        child.children.reduce((acc, c) => acc + this.countChildren(c), 0)
      )
    },
  },
}
</script>