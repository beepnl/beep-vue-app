export const momentAge = {
  methods: {
    momentAge(date) {
      const dateNow = this.$moment()
      const dateBirth = this.$moment(date)
      const yearsOld = dateNow.diff(dateBirth, 'years', true)
      const age = isNaN(yearsOld) ? 0 : Math.round(yearsOld * 10) / 10
      return age
    },
  },
}

export const momentCreatedAt = {
  methods: {
    momentCreatedAt(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('YYYY-MM-DD HH:mm:ss')
    },
  },
}

export const momentFromNow = {
  methods: {
    momentFromNow(date) {
      const moment = this.$moment(date)
        .locale(this.$i18n.locale)
        .fromNow()
      return moment.charAt(0).toUpperCase() + moment.slice(1)
    },
  },
}

export const momentify = {
  methods: {
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
  },
}

export const momentifyDayMonth = {
  methods: {
    momentifyDayMonth(date) {
      const currentYear = this.$moment(date).format('YYYY')
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
  },
}

export const momentifyRemoveTime = {
  methods: {
    momentifyRemoveTime(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('YYYY-MM-DD')
    },
  },
}

export const momentISO8601 = {
  methods: {
    momentISO8601(date) {
      if (date !== null) {
        return this.$moment(date)
          .locale(this.$i18n.locale)
          .format()
      } else {
        return null
      }
    },
  },
}

export const momentLastDigitOfYear = {
  methods: {
    momentLastDigitOfYear(date) {
      return this.$moment(date)
        .format('YY')
        .substr(1, 1)
    },
  },
}

export const momentUpdatedAt = {
  methods: {
    momentUpdatedAt(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
