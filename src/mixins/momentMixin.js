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

export const momentDurationDays = {
  methods: {
    momentDurationDays(input, unit, prefix = '') {
      const durationInDays = this.$moment
        .duration(input, unit)
        .asDays()
        .toFixed(0)

      return (
        prefix + durationInDays + ' ' + this.$i18n.tc('day', durationInDays)
      )
    },
  },
}

export const momentFormat = {
  methods: {
    momentFormat(date, format) {
      if (date !== null) {
        return (
          this.$moment(date)
            // .utc(date) // date is in utc, will be converted to users timezone
            // .local() // date is in utc, will be converted to users timezone
            .locale(this.$i18n.locale)
            .format(format)
        )
      } else {
        return null
      }
    },
  },
}

export const momentFullDateTime = {
  methods: {
    momentFullDateTime(date, toUtcTime = false) {
      // return this.$moment(date)
      //   .locale(this.$i18n.locale)
      //   .format('YYYY-MM-DD HH:mm:ss')
      var time = null
      if (toUtcTime) {
        time = this.$moment.utc(date)
      } else {
        time = this.$moment(date)
      }
      return time.locale(this.$i18n.locale).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}

export const momentFromNow = {
  methods: {
    momentFromNow(date, inUtcTime = false) {
      var inLocalTime = null
      if (inUtcTime) {
        inLocalTime = this.$moment.utc(date).local()
      } else {
        inLocalTime = this.$moment(date)
      }
      const moment = inLocalTime.locale(this.$i18n.locale).fromNow()
      return moment.charAt(0).toUpperCase() + moment.slice(1)
    },
  },
}

export const momentHumanizeDuration = {
  methods: {
    momentHumanizeDuration(input, unit, prefix = '') {
      return (
        prefix +
        this.$moment
          .duration(input, unit)
          .locale(this.$i18n.locale)
          .humanize()
      )
    },
  },
}

export const momentHumanizeHours = {
  methods: {
    momentDurationInHours(input, unit, prefix = '') {
      var numberOfHours = this.$moment.duration(input, unit).asHours()
      return (
        prefix +
        numberOfHours +
        ' ' +
        this.$i18n.tc('hour', Math.ceil(numberOfHours))
      )
    },
    momentHumanizeDuration(input, unit, prefix = '') {
      return (
        prefix +
        this.$moment
          .duration(input, unit)
          .locale(this.$i18n.locale)
          .humanize()
      )
    },
    momentHumanizeHours(value, capitalsOn = false, asteriskOn = false) {
      var prefix = capitalsOn
        ? this.$i18n.t('Every')
        : this.$i18n.t('Every').toLowerCase()
      switch (true) {
        case value === 0:
          return (
            (capitalsOn
              ? this.$i18n.t('Immediately')
              : this.$i18n.t('Immediately').toLowerCase()) +
            (asteriskOn ? '*' : '')
          )
        case value === 60:
          return capitalsOn
            ? this.$i18n.t('Every_hour')
            : this.$i18n.t('every_hour')
        case value > 1440:
          return this.momentHumanizeDuration(
            value,
            'minutes',
            // eslint-disable-next-line vue/comma-dangle
            prefix
          )
      }
      return this.momentDurationInHours(
        value,
        'minutes',
        // eslint-disable-next-line vue/comma-dangle
        prefix
      )
    },
  },
}

export const momentify = {
  methods: {
    momentify(date, inUtcTime = false, format = 'lll') {
      if (date !== null) {
        var inLocalTime = null
        if (inUtcTime) {
          inLocalTime = this.$moment.utc(date).local()
        } else {
          inLocalTime = this.$moment(date)
        }
        return inLocalTime.locale(this.$i18n.locale).format(format)
      } else {
        return null
      }
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
