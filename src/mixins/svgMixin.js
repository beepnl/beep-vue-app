export const svgStyles = {
  data() {
    return {
      colorGrey: '#606060; ',
      colorGreyDark: '#242424; ',
      fontSize: 'font: 4mm ',
      fontSizeSmall: 'font: 3mm ',
      fontSizeLarge: 'font: 6mm ',
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
      return this.fontSize + this.fontFamily + 'text-decoration: underline;'
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
