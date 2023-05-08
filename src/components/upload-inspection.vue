<template>
  <v-row class="mx-0 mx-sm-4">
    <v-col class="d-flex flex-wrap">
      <template v-for="(pageNr, i) in totalPages">
        <UploadPageBlob
          :key="'p-' + pageNr"
          :page-nr-text="'p.' + pageNr + ' / ' + totalPages"
          :disabled="loading"
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
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      errorMessage: null,
      // showLoading: [], // TODO             :loading="showLoading[i] ? 'primary' : false"
    }
  },
  computed: {
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
  methods: {
    findImageIndex(pageNr) {
      return this.uploadInspectionPayload.images.findIndex(
        (item) => item.page === pageNr
      )
    },
    setPageBlob(blob, index) {
      var pageNr = index + 1

      var payload = Object.freeze(this.uploadInspectionPayload)

      var imageIndex = this.findImageIndex(pageNr)

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
  },
}
</script>

<style lang="scss" scoped></style>
