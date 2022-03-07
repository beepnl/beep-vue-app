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
import languages from '@assets/js/lang/languages'
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
    selectedLanguage() {
      return this.$i18n.locale
    },
  },
  created() {
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
  },
  methods: {
    async switchLocale(locale) {
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
        this.$i18n.locale = locale
        console.log(locale)
        Settings.defaultLocale = locale // for hive-inspect vue-datetime picker
        localStorage.beepLocale = locale // remember language for sign-in
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
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
