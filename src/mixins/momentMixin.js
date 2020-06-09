export const momentMixin = {
  methods: {
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
  },
}
