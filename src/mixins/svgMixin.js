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
