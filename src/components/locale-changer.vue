<template>
  <span class="locale-changer">
    <v-menu max-height="96vh">
      <template v-slot:activator="{ on }">
        <v-btn
          class="locale-changer-button"
          depressed
          color="transparent"
          v-on="on"
        >
          <img
            style="width:20px;"
            :src="assetsUrl + `/img/flags/${selectedLanguage}.svg`"
          />
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-for="language in languages">
          <v-list-item
            :key="language.title"
            :value="language"
            @click="switchLocale(language.lang)"
          >
            <v-list-item-avatar>
              <img :src="assetsUrl + `/img/flags/${language.lang}.svg`" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="language.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </span>
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
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      mountedAndLoggedIn: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale', 'userEmail', 'loggedIn']),
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
  watch: {
    loggedIn() {
      this.mountedAndLoggedIn = true
    },
    userLocale() {
      if (this.mountedAndLoggedIn) {
        // only set locale again when it has changed and the 'logged in' locale changer has mounted
        this.setLocale()
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
      this.$i18n.locale = this.queriedLanguage
      localStorage.beepLocale = this.queriedLanguage
    }
  },
  methods: {
    async switchLocale(locale) {
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
          localStorage.beepLocale = locale
          console.log('switch language to ', locale)
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else if (!this.loggedIn) {
        // if user is logged out and route has account layout, do not set userlocale yet
        this.$i18n.locale = locale
        localStorage.beepLocale = locale
      }
    },
    setLocale() {
      if (
        (this.userLocale === null && localStorage.beepLocale) ||
        this.userLocale !== localStorage.beepLocale
      ) {
        // if beepLocale is set to something (different) via sign-in page
        this.switchLocale(localStorage.beepLocale)
      } else if (this.userLocale !== null) {
        // else if locale is saved in database, use it
        this.$i18n.locale = this.userLocale
        localStorage.beepLocale = this.userLocale
      } else {
        // else base it on browser language
        var newLocale = languages.checkBrowserLanguage()
        this.$i18n.locale = newLocale
        // this.switchLocale(newLocale)
      }
      Settings.defaultLocale = this.$i18n.locale // for hive-inspect vue-datetime picker
    },
  },
}
</script>

<style lang="scss" scoped>
.locale-changer-button {
  min-width: 48px !important;
  padding: 0 0 0 4px !important;
}
.v-avatar {
  width: 30px !important;
  min-width: 30px !important;
  height: 30px !important;
}
</style>
