<template>
  <v-menu class="locale-changer">
    <template v-slot:activator="{ props }">
      <v-btn
        class="locale-changer-button"
        depressed
        color="transparent"
        v-bind="props"
      >
        <img
          style="width:20px;"
          :src="assetsUrl + `/img/flags/${selectedLanguage}.svg`"
        />
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <template v-for="language in languages" :key="language.title">
        <v-list-item
          :prepend-avatar="assetsUrl + `/img/flags/${language.lang}.svg`"
          :title="language.title"
          @click="switchLocale(language.lang)"
        >
        </v-list-item>
      </template>
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
  watch: {
    userLocale() {
      this.setLocale()
    },
  },
  mounted() {
    this.setLocale()
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
        console.log('switch language to ', locale)
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    setLocale() {
      // if locale is saved in database, use it
      if (this.userLocale !== null) {
        this.$i18n.locale = this.userLocale
        localStorage.beepLocale = this.userLocale
      } else {
        const newLocale = languages.checkBrowserLanguage()
        this.$i18n.locale = newLocale
      }
      Settings.defaultLocale = this.$i18n.locale // for hive-inspect vue-datetime picker
    },
  },
}
</script>

<style lang="scss" scoped>
.locale-changer {
  max-height: 96vh !important; // N.B. max-height prop for v-menu does not work with 'vh'
}

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
