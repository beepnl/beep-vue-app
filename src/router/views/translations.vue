<template>
  <Layout :title="$t('Translations')">
    <v-container>
      <v-row
        v-for="(section, s) in sections"
        :key="'section ' + s"
        class="my=0"
      >
        <v-col cols="12">
          <p class="mt-3">{{ $t(section.header) }} </p>
        </v-col>
        <v-col cols="12" sm="10" md="5">
          <div class="d-flex flex-column">
            <div
              v-for="(language, i) in section.languages"
              :key="i"
              :class="!mobile ? 'd-flex justify-start' : ''"
            >
              <v-btn
                :min-width="!smAndDown ? '350px' : !mobile ? '300px' : '100%'"
                outlined
                tile
                :small="smAndDown && !mobile"
                class="mb-3"
              >
                <a
                  class="color-black"
                  :href="'./js/lang/' + language.lang + '.js'"
                  download
                  v-text="
                    $t('download') +
                      ' ' +
                      language.lang +
                      '.js (' +
                      language.title +
                      ')'
                  "
                ></a>
              </v-btn>
              <v-btn
                :min-width="!smAndDown ? '350px' : !mobile ? '240px' : '100%'"
                :href="'/js/lang/' + language.lang + '.js'"
                target="_blank"
                outlined
                tile
                class="ml-0 ml-sm-3 mb-3"
                color="accent"
                :small="smAndDown && !mobile"
                v-text="
                  (!smAndDown || mobile ? $t('view') + ' ' : '') +
                    language.lang +
                    '.js ' +
                    $t('as_plain_text')
                "
              >
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'
import languages from '@assets/js/languages'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      sections: [
        {
          header: 'translation_exp',
          languages: languages.languageArray,
        },
        {
          header: 'unpublished_exp',
          languages: languages.unpublishedLanguageArray,
        },
      ],
    }
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>
