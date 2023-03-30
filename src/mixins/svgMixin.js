import { mapGetters } from 'vuex'

export const svgComputed = {
  computed: {
    ...mapGetters('inspections', [
      'svgItemCounter',
      'svgColumnCounter',
      'svgPageNr',
      'svgPositionSet',
      'svgRowHeight',
      'svgY',
    ]),
    absoluteY() {
      return (
        (this.svgPageNr === 1 ? this.yStart : this.yMargin) +
        (this.svgPageNr - 1) * this.pageHeight +
        this.svgY
      )
    },
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
}

export const svgData = {
  data() {
    return {
      columnsPerRow: 4,
      xMargin: 13,
      yStart: 89,
      yMargin: 15,
      pageHeight: 296.82,
      pageWidth: 210,
      maxRowHeight: 40, // 41
      headerHeight: 6.5,
      numberBoxWidth: 4.65,
      numberBoxHeight: 8,
      spaceWidth: 3,
      inputHeight: {
        label: 4,
        select_item: 5,
        date: 32,
        grade: 23,
        image: 16,
        number_info: 21,
        number: 16.5,
        boolean: 12,
        text: 35,
        text_line: 19,
        smileys_3: 21,
      },
      maxNrOfItems: 10,
      maxItemLength: 29,
      textFieldWidth: 25,
      cornerSize: 10,
      checkBoxSize: 3.5,
      checkBoxSpace: 5,
      maxStars: 5,
      strokeWidth: 0.5,
      strokeWidthCorners: 1,
    }
  },
}

export const svgStyles = {
  data() {
    return {
      colorGrey: '#606060; ',
      colorGreyDark: '#242424; ',
      fontSize: 'font: 3.8mm ',
      fontSizeHeader: 'font: 600 4mm ',
      fontSizeHeaderSmall: 'font: 600 2.8mm ',
      fontSizeSmall: 'font: 2.8mm ',
      fontSizeLarge: 'font: 5mm ',
      fontFamily: 'Helvetica, Arial, sans-serif; ',
    }
  },
  computed: {
    fillColor() {
      return 'fill: ' + this.colorGrey
    },
    fillColorGrey() {
      return this.fillColor
    },
    svgAppend() {
      return this.fontSizeLarge + this.fontFamily + this.textColor
    },
    svgHeader() {
      return this.fontSizeHeader + this.fontFamily + this.textColor
    },
    svgHeaderSmall() {
      return this.fontSizeHeaderSmall + this.fontFamily + this.textColor
    },
    svgInputText() {
      return this.fontSizeSmall + this.fontFamily + this.textColor
    },
    svgLabel() {
      return this.fontSizeSmall + this.fontFamily + this.textColor
    },
    svgText() {
      return this.fontSize + this.fontFamily + this.textColor
    },
    svgTextSmall() {
      return this.fontSizeSmall + this.fontFamily + this.textColor
    },
    textColor() {
      return 'fill: ' + this.colorGreyDark
    },
  },
}
