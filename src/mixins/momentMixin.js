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
      const currentYearNl = '. ' + currentYear
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('ll')
        .replace(currentYearNl, '')
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
    momentifyRemoveTime(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('YYYY-MM-DD')
    },
    momentLastDigitOfYear(date) {
      return this.$moment(date)
        .format('YY')
        .substr(1, 1)
    },
    momentAge(date) {
      const dateNow = this.$moment()
      const dateBirth = this.$moment(date)
      const yearsOld = dateNow.diff(dateBirth, 'years', true)
      const age = isNaN(yearsOld) ? 0 : Math.round(yearsOld * 10) / 10
      return age
    },
  },
}
