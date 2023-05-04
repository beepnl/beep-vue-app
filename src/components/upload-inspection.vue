<template>
  <v-row class="mx-0 mx-sm-4">
    <v-col class="d-flex flex-wrap">
      <template v-for="(pageNr, i) in totalPages">
        <UploadPageBlob
          :key="'p-' + pageNr"
          :page-nr-text="'p.' + pageNr + ' / ' + totalPages"
          :disabled="false"
          @set-page-blob="setPageBlob($event, i)"
        />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import UploadPageBlob from '@components/upload-page-blob.vue'

export default {
  components: {
    UploadPageBlob,
  },
  props: {
    selectedChecklist: {
      type: Object,
      default: null,
      required: true,
    },
    totalPages: {
      type: Number,
      default: 4, // TODO: remove dummy pages nr
      required: false,
    },
  },
  data() {
    return {
      errorMessage: null,
      payload: {
        svg: '',
        images: [],
        settings: {
          return_blob: ['text', 'single-digit', 'checkbox'],
        },
        'data-user-locale': ['en'],
      },
      // showLoading: [], // TODO             :loading="showLoading[i] ? 'primary' : false"
    }
  },
  computed: {},
  methods: {
    findImageIndex(pageNr) {
      return this.payload.images.findIndex((item) => item.page === pageNr)
    },
    setPageBlob(blob, index) {
      var pageNr = index + 1

      var imageIndex = this.findImageIndex(pageNr)

      if (imageIndex === -1) {
        var imgJson = {
          page: pageNr,
          image: blob,
        }

        this.payload.images.push(imgJson)
      } else {
        if (blob !== null) {
          this.payload.images[imageIndex].image = blob
        } else {
          this.payload.images.splice(imageIndex, 1)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
