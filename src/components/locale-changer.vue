<template>
  <v-menu class="locale-changer">
    <template v-slot:activator="{ props }">
      <v-btn
        class="locale-changer-button"
        variant="flat"
        color="transparent"
        size="small"
        v-bind="props"
      >
        <img
          style="width: 20px"
          :src="assetsUrl + `/img/flags/${selectedLanguage}.svg`"
        />
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.title"
        :value="language"
        :title="language.title"
        @click="switchLocale(language.lang)"
      >
        <template v-slot:prepend>
          <div class="beep-list-icon --small mr-4 mt-1 mb-n1">
            <img :src="assetsUrl + `/img/flags/${language.lang}.svg`" />
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Api from '@api/Api'
import languages from '@assets/js/languages'
import { Settings } from 'luxon' // for hive-inspect vue-datetime picker
import { mapGetters } from 'vuex'

export default {
  name: 'LocaleChanger',
  data() {
    return {
      languages: languages.languageArray,
      assetsUrl:
        import.meta.env.VITE_ASSETS_URL ||
        import.meta.env.VITE_ETS_URL_FALLBACK,
      mountedAndLoggedIn: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale', 'userEmail', 'loggedIn']),
    dashboardMode() {
      return this.$route.name === 'dashboard'
    },
    languageCodes() {
      return languages.languageArray.map((lang) => lang.lang)
    },
    selectedLanguage() {
      return this.$i18n.locale
    },
    queriedLanguage() {
      return this.$route.query.language || null
    },
  },
  created() {
    // for dashboard app, locale is initiated elsewhere (in dashboard.vue created), as locale changer is hidden there by default
    if (!this.dashboardMode) {
      // if locale is saved in database, use it
      if (this.userLocale !== null) {
        this.$i18n.locale = this.userLocale
        localStorage.beepLocale = this.userLocale
      } else {
        const newLocale = languages.checkBrowserLanguage()
        this.$i18n.locale = newLocale
        this.switchLocale(newLocale)
      }
      Settings.defaultLocale = this.$i18n.locale // for hive-inspect vue-datetime picker
    }
  },
  watch: {
    loggedIn() {
      this.mountedAndLoggedIn = true
    },
    userLocale() {
      if (this.mountedAndLoggedIn) {
        // only set locale again when it has changed and the 'logged in' locale changer has mounted
        if (
          (this.userLocale === null && localStorage.beepLocale) ||
          this.userLocale !== localStorage.beepLocale
        ) {
          // if beepLocale is set to something (different) via sign-in page
          this.switchLocale(localStorage.beepLocale)
        } else if (this.userLocale !== null) {
          // else if locale is saved in database, use it
          this.setLocale(this.userLocale)
        } else {
          // else base it on browser language
          const newLocale = languages.checkBrowserLanguage()
          this.$i18n.locale = newLocale
          this.$moment.locale(newLocale)
        }
      }
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.mountedAndLoggedIn = true
    }
  },
  created() {
    if (
      this.queriedLanguage &&
      this.languageCodes.includes(this.queriedLanguage)
    ) {
      // if locale is queried and exists, use it
      this.setLocale(this.queriedLanguage)
    }
  },
  methods: {
    async switchLocale(locale) {
      // for dashboard app users (who are not signed in) do not try to change the userlocale in database because not applicable
      if (!this.dashboardMode) {
        const email = this.userEmail
        if (email !== null) {
          // prevent extra call with email null when logging out
          try {
            const response = await Api.updateRequest('/userlocale', '', {
              email,
              locale,
            })
            if (!response) {
              console.log('error')
            }
            this.$store.commit('auth/SET_CURRENT_USER', response.data)
            this.setLocale(locale)
          } catch (error) {
            if (error.response) {
              console.log(error.response)
            } else {
              console.log('Error: ', error)
            }
          }
        }
      } else if (!this.loggedIn) {
        // if user is logged out and route has account layout, do not set userlocale yet
        this.setLocale(locale)
      }
    },
    updateLocale(locale) {
      this.$i18n.locale = locale
      console.log(locale)
      Settings.defaultLocale = locale // for hive-inspect vue-datetime picker
      if (this.dashboardMode) {
        localStorage.beepdashboardLocale = locale // remember language for sign-in
      } else {
        localStorage.beepLocale = locale // remember language for sign-in
        // this.$store.commit('auth/SET_CURRENT_USER', response.data)
        console.log('switch language to ', locale)
      }
    },
    setLocale(locale) {
      this.$i18n.locale = locale
      localStorage.beepLocale = locale // remember language for sign-in
      this.$moment.locale(locale)
      console.log('switch language to', locale)
      Settings.defaultLocale = locale // for hive-inspect vue-datetime picker
    },
  },
}
</script>

<style lang="scss" scoped>
.locale-changer {
  max-height: 96vh !important; // N.B. max-height prop for v-menu does not work with 'vh'
}

.v-avatar {
  width: 30px !important;
  min-width: 30px !important;
  height: 30px !important;
}
</style>
