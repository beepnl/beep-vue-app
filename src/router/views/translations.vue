<template>
  <Layout :title="$t('Translations')">
    <v-container>
      <v-row class="my=0">
        <v-col cols="12">
          <p class="mt-3">{{ $t('translation_exp') }} </p>
        </v-col>
        <v-col cols="12" sm="8" md="4">
          <div class="d-flex flex-column">
            <v-btn
              v-for="(language, i) in languages"
              :key="i"
              outlined
              tile
              class="mb-3"
            >
              <a
                class="color-black"
                :href="'./js/lang/' + language.lang + '.js'"
                download
                v-text="
                  'Download ' + language.lang + '.js (' + language.title + ')'
                "
              ></a>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="my=0">
        <v-col cols="12">
          <p class="mt-3">{{ $t('unpublished_exp') }} </p>
        </v-col>
        <v-col cols="12" sm="8" md="4">
          <div class="d-flex flex-column">
            <v-btn
              v-for="(language, i) in unpublished"
              :key="i"
              outlined
              tile
              class="mb-3"
            >
              <a
                class="color-black"
                :href="'./js/lang/' + language.lang + '.js'"
                download
                v-text="
                  'Download ' + language.lang + '.js (' + language.title + ')'
                "
              ></a>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'
import languages from '@assets/js/languages'
// import en from '@assets/js/lang/en'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      languages: languages.languageArray,
      unpublished: languages.unpublishedLanguageArray,
    }
  },
}
</script>
