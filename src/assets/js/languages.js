const languages = {
  languageArray: [
    { lang: 'nl', title: 'Nederlands' },
    { lang: 'cs', title: 'Čeština' },
    { lang: 'de', title: 'Deutsch' },
    { lang: 'en', title: 'English' },
    { lang: 'fr', title: 'Français' },
    { lang: 'el', title: 'Ελληνικά' },
    { lang: 'it', title: 'Italiano' },
    { lang: 'nb', title: 'Norsk bokmål' },
    // { lang: 'pl', title: 'Polski' },
    { lang: 'pt', title: 'Português' },
    { lang: 'ro', title: 'Română' },
    { lang: 'es', title: 'Spanish' },
    { lang: 'fi', title: 'Suomi' },
    { lang: 'sv', title: 'Svenska' },
  ],
  unpublishedLanguageArray: [
    { lang: 'bg', title: 'Български' },
    { lang: 'pl', title: 'Polski' },
    // { lang: 'en-US', title: 'English US' },
  ],
  checkBrowserLanguage() {
    let matched = 'en' // fallback
    const navLanguage = navigator.language
    if (navLanguage) {
      const languagePartials = navLanguage.split('-')[0]
      this.languageArray.map((language) => {
        if (language.lang === navigator.language) {
          matched = language.lang
        } else if (language.lang === languagePartials) {
          matched = language.lang
        } else if (language.lang.split('-')[0] === languagePartials) {
          matched = language.lang
        }
        return matched
      })
      return matched
    } else {
      return matched // fallback
    }
  },
}

export default languages
