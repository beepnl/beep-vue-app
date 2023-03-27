<template>
  <span class="locale-changer">
    <v-menu>
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
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale', 'userEmail']),
    dashboardMode() {
      return this.$route.name === 'dashboard'
    },
    selectedLanguage() {
      return this.$i18n.locale
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
        var newLocale = languages.checkBrowserLanguage()
        this.$i18n.locale = newLocale
        this.switchLocale(newLocale)
      }
      Settings.defaultLocale = this.$i18n.locale // for hive-inspect vue-datetime picker
    }
  },
  methods: {
    async switchLocale(locale) {
      // for dashboard app users (who are not signed in) do not try to change the userlocale in database because not applicable
      if (!this.dashboardMode) {
        const email = this.userEmail
        try {
          const response = await Api.updateRequest('/userlocale', '', {
            email,
            locale,
          })
          if (!response) {
            console.log('error')
          }
          this.$store.commit('auth/SET_CURRENT_USER', response.data)
          this.updateLocale(locale)
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        this.updateLocale(locale)
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
      }
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
