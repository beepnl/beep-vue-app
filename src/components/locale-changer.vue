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
          v-for="lang in langs"
          :key="lang.title"
          :value="lang"
          @click="switchLocale(lang.lang)"
        >
          <v-list-item-avatar>
            <img :src="`/img/flags/${lang.lang}.svg`" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="lang.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>

<script>
export default {
  name: 'LocaleChanger',
  data() {
    return {
      // langs: ['de', 'en', 'es', 'fr', 'nl', 'pt', 'ro'],
      langs: [
        { lang: 'nl', title: 'Nederlands' },
        { lang: 'de', title: 'Deutsch' },
        { lang: 'en', title: 'English' },
        { lang: 'fr', title: 'Français' },
        { lang: 'pt', title: 'Português' },
        { lang: 'ro', title: 'Română' },
        { lang: 'es', title: 'Spanish' },
      ],
    }
  },
  computed: {
    selectedLanguage() {
      return this.$i18n.locale
    },
  },
  methods: {
    switchLocale(lang) {
      this.$i18n.locale = lang
      this.$moment.locale(lang)
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
