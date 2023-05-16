<template>
  <v-row class="mx-0 mx-sm-4">
    <v-col cols="12">
      <div class="beep-label" v-text="$tc('Select_input_language')"></div>
      <Treeselect
        class="lang-treeselect"
        :value="uploadLanguage"
        :options="languages"
        :normalizer="normalizer"
        :placeholder="$t('Select')"
        @input="updateLanguage($event)"
      >
        <div
          slot="value-label"
          slot-scope="{ node }"
          class="d-flex justify-start align-center"
        >
          <img
            class="lang-icon"
            :src="assetsUrl + `/img/flags/${node.id}.svg`"
          />
          {{ node.label }}
        </div>

        <label
          slot="option-label"
          slot-scope="{ node }"
          class="d-flex justify-start align-center"
        >
          <img
            class="lang-icon"
            :src="assetsUrl + `/img/flags/${node.id}.svg`"
          />
          {{ node.label }}
        </label>
      </Treeselect>
    </v-col>
    <v-col cols="12" class="d-flex flex-column">
      <div class="d-flex justify-start align-center">
        <div class="beep-label">{{ $t('Upload_images') }}</div>
        <v-icon
          class="mdi mdi-information icon-info cursor-pointer ml-2"
          dark
          small
          :color="showExplanation ? 'accent' : 'grey'"
          @click="showExplanation = !showExplanation"
        ></v-icon>
      </div>
      <p v-if="showExplanation" class="beep-label">
        <em>{{ $t('Upload_images_exp') }} </em>
      </p>
      <div class="d-flex flex-wrap">
        <UploadPageBlob
          v-for="(pageNr, i) in selectedChecklistSvg.pages"
          :key="'p-' + pageNr"
          :page-nr-text="'p.' + pageNr + ' / ' + selectedChecklistSvg.pages"
          :disabled="loading"
          @set-page-blob="setPageBlob($event, i)"
        />
      </div>
    </v-col>
    <v-overlay
      :absolute="true"
      :value="loading"
      :opacity="0.5"
      color="white"
      z-index="3"
      class="input-disabled-overlay"
    >
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-overlay>
  </v-row>
</template>

<script>
import languages from '@assets/js/languages'
import Treeselect from '@riophae/vue-treeselect'
import UploadPageBlob from '@components/upload-page-blob.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Treeselect,
    UploadPageBlob,
  },
  props: {
    selectedChecklistSvg: {
      type: Object,
      default: null,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      uploadLanguage: null,
      languages: languages.languageArray,
      normalizer(node) {
        return {
          id: node.lang,
          label: node.title,
        }
      },
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      showExplanation: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['userLocale']),
    uploadInspectionPayload: {
      get() {
        return this.$store.getters['inspections/uploadInspectionPayload']
      },
      set(value) {
        this.$store.commit('inspections/setData', {
          prop: 'uploadInspectionPayload',
          value,
        })
      },
    },
  },
  created() {
    this.$store.commit(
      'inspections/resetUploadInspectionPayload',
      this.userLocale
    )
  },
  methods: {
    findImageIndex(pageNr) {
      return this.uploadInspectionPayload.images.findIndex(
        (item) => item.page === pageNr
      )
    },
    setPageBlob(blob, index) {
      var pageNr = index + 1

      var payload = { ...this.uploadInspectionPayload }

      payload.svg = this.selectedChecklistSvg.svg
      payload['data-user-locale'] = [this.uploadLanguage]

      var imageIndex = this.findImageIndex(pageNr)
      // jpeg gives "Invalid image geometry" error -> TODO let Pensoft add jpeg as valid mimetype
      if (blob !== null) {
        blob = blob.replace('data:image/jpeg', 'data:image/JPG')
      }

      if (imageIndex === -1) {
        var imgJson = {
          page: pageNr,
          image: blob,
        }

        payload.images.push(imgJson)
      } else {
        if (blob !== null) {
          payload.images[imageIndex].image = blob
          console.log(blob)
        } else {
          payload.images.splice(imageIndex, 1)
        }
      }

      this.uploadInspectionPayload = payload
    },
    updateLanguage(lang) {
      console.log('TODO update lang', lang)
      this.uploadLanguage = lang
      var payload = { ...this.uploadInspectionPayload }
      payload['data-user-locale'] = [lang]
      this.uploadInspectionPayload = payload
    },
  },
}
</script>

<style lang="scss" scoped>
.lang-treeselect {
  max-width: 300px;
}
.lang-icon {
  width: 20px;
  margin-right: 8px;
}
</style>