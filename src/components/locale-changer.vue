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
            :src="`/img/flags/${selectedLanguage}.svg`"
          />
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="language in languages"
          :key="language.title"
          :value="language"
          @click="switchLocale(language.lang)"
        >
          <v-list-item-avatar>
            <img :src="`/img/flags/${language.lang}.svg`" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="language.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      this.$i18n.locale = languages.checkBrowserLanguage()
    }
    Settings.defaultLocale = this.$i18n.locale // for hive-inspect vue-datetime picker
  },
  methods: {
    switchLocale(language) {
      const email = this.userEmail
      Api.updateRequest('/user', '', { email, language })
      // .then(() => { // TODO: enable then block when user patch API is fixed
      this.$store.commit('auth/SET_LOCALE', language)
      this.$i18n.locale = language
      console.log(language)
      Settings.defaultLocale = language // for hive-inspect vue-datetime picker
      localStorage.beepLocale = language // remember language for sign-in
      // })
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
