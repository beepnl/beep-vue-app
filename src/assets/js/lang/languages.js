const languages = {
  languageArray: [
    { lang: 'nl', title: 'Nederlands' },
    { lang: 'de', title: 'Deutsch' },
    { lang: 'en', title: 'English' },
    { lang: 'fr', title: 'Français' },
    { lang: 'pt', title: 'Português' },
    { lang: 'ro', title: 'Română' },
    { lang: 'es', title: 'Spanish' },
    // { lang: 'en-US', title: 'English US' },
  ],
  checkBrowserLanguage() {
    var matched = null
    var languagePartials = navigator.language.split('-')[0]
    this.languageArray.map((language) => {
      if (language.lang === navigator.language) {
        matched = language.lang
      }
    })
    if (!matched) {
      this.languageArray.map((language) => {
        if (language.lang === languagePartials) {
          matched = language.lang
        }
      })
    }
    if (!matched) {
      this.languageArray.map((language) => {
        if (language.lang.split('-')[0] === languagePartials) {
          matched = language.lang
        }
      })
    }
    return matched
  },
}

export default languages
