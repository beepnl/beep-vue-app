export const momentMixin = {
  methods: {
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
    momentifyDayMonth(date) {
      const currentYear = new Date().getFullYear()
      const currentYearEn = ', ' + currentYear
      const currentYearEsPt = ' de ' + currentYear
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('ll')
        .replace(currentYearEn, '')
        .replace(currentYearEsPt, '')
        .replace(' ' + currentYear, '') // Remove year hardcoded per language, currently no other way to get rid of year whilst keeping localized time
    },
    momentFromNow(date) {
      const moment = this.$moment(date)
        .locale(this.$i18n.locale)
        .fromNow()
      return moment.charAt(0).toUpperCase() + moment.slice(1)
    },
  },
}
