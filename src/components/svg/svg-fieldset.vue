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
            :header="label + ': '"
            :item="item"
          ></SvgInput>
          <SvgFieldset
            v-if="item.input === 'label'"
            :category="item"
          ></SvgFieldset>
        </g>
      </g>

      <SvgInput
        v-if="category.children.length === 0"
        :position="calcXY('2', category.id)"
        :header="label + ': '"
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
      :header="label + ': '"
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
      xStart: 15,
      xWidth: 45,
      yStart: 44,
      yHeight: 44,
      yMax: 281,
      pageNr: 1,
      pageHeight: 297,
      columnsPerRow: 4,
    }
  },
  computed: {
    ...mapGetters('inspections', [
      'svgItemCounter',
      'svgColumnCounter',
      'svgPositionSet',
    ]),
    label() {
      return this.category.trans[this.locale] || this.category.name
    },
    locale() {
      return this.$i18n.locale
    },
    // rowCounter() {
    //   return Math.ceil(this.svgItemCounter / 4)
    // },
  },
  created() {
    console.log('created ', this.category.id)
  },
  methods: {
    // calcX(log = null) {
    //   if (this.svgPositionSet[this.category.id] === undefined) {
    //     var itemCounter = this.svgItemCounter + 1
    //     var columnCounter =
    //       this.svgColumnCounter >= 4 ? 1 : this.svgColumnCounter + 1
    //     var newX = this.xStart + (columnCounter - 1) * this.xWidth
    //     this.$store.commit('inspections/setItemCounter', itemCounter)
    //     this.$store.commit('inspections/setColumnCounter', columnCounter)
    //     var newY = this.calcY('hi')
    //     this.$store.commit('inspections/setPosition', {
    //       id: this.category.id,
    //       x: newX,
    //       y: newY,
    //     })
    //     console.log('X', itemCounter, columnCounter, newX, this.category.name)
    //     return newX
    //   } else {
    //     return this.svgPositionSet[this.category.id].x
    //   }
    // },
    // calcY(log = null) {
    //   if (this.svgPositionSet[this.category.id] === undefined) {
    //     var newY = this.yStart + (this.rowCounter - 1) * this.yHeight
    //     console.log('Y', this.rowCounter, newY, this.category.name)
    //     console.log(log)
    //     return newY
    //   } else {
    //     return this.svgPositionSet[this.category.id].y
    //   }
    // },
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

        var x = this.xStart + (columnCounter - 1) * this.xWidth
        var y = this.yStart + (rowCounter - 1) * this.yHeight

        this.$store.commit('inspections/setItemCounter', itemCounter)
        this.$store.commit('inspections/setColumnCounter', columnCounter)
        this.$store.commit('inspections/setPosition', {
          id,
          x,
          y,
        })
        console.log(
          'XY',
          itemCounter,
          // rowCounter,
          // newX,
          // newY,
          this.category.name,
          log
        )
        return { x, y }
      } else {
        return this.svgPositionSet[id]
      }
    },
  },
}
</script>
