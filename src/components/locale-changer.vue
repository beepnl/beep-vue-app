<template>
  <span class="locale-changer">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn depressed color="transparent" v-on="on">
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
import languages from '@assets/js/lang/languages'
import { mapGetters, mapActions } from 'vuex' // FIXME: this does not fix vuex strict mode warnings

export default {
  name: 'LocaleChanger',
  data() {
    return {
      languages: languages.languageArray,
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale']),
    selectedLanguage() {
      return this.$i18n.locale
    },
  },
  created() {
    // if locale is saved in database, use it
    if (this.userLocale !== null) {
      this.$i18n.locale = this.userLocale
    } else {
      this.$i18n.locale = languages.checkBrowserLanguage()
    }
  },
  methods: {
    ...mapActions({ setLocale: 'auth/setLocale' }),
    switchLocale(language) {
      this.setLocale(language)
      this.$i18n.locale = language
    },
  },
}
</script>

<style lang="scss" scoped>
.v-avatar {
  width: 30px !important;
  min-width: 30px !important;
  height: 30px !important;
}
</style>
