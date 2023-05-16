<template>
  <div>
    <div
      :class="
        (pageImage === null ? 'd-flex flex-column justify-start ' : '') +
          'rounded-border upload-page-blob mr-4 mb-4'
      "
    >
      <div>
        <div class="float-left">
          <v-icon
            v-if="pageImage !== null"
            class="cursor-pointer"
            color="red"
            size="28"
            @click="confirmDeleteImage"
            >mdi-close</v-icon
          >
        </div>

        <div class="float-right pt-2 pr-1">
          <span class="page-number ">{{ pageNrText }}</span>

          <v-icon
            v-if="pageImageFile !== null"
            class="float-right mt-n2 ml-n4"
            small
            color="green"
            >mdi-check-circle</v-icon
          >
        </div>
      </div>
      <v-spacer v-if="pageImage === null" />
      <v-file-input
        v-if="pageImage === null"
        v-model="pageImageFile"
        class="pt-0 image-uploader mx-3"
        accept="image/png, image/jpeg, image/bmp"
        :placeholder="'Upload'"
        prepend-icon="mdi-camera"
        :error-messages="errorMessage"
        :disabled="disabled"
        :loading="showLoading ? 'primary' : false"
        @change="makeBlob($event)"
        @click:clear="errorMessage = null"
      ></v-file-input>

      <img
        v-if="pageImageFile !== null"
        :src="pageImage"
        class="grey lighten-2 page-blob-preview"
        aspect-ratio="1"
      />

      <Confirm ref="confirm"></Confirm>
    </div>
  </div>
</template>

<script>
import Confirm from '@components/confirm.vue'
// import imageOverlay from '@components/image-overlay.vue' // TODO nice to have: view as large overlay

export default {
  components: {
    Confirm,
  },
  props: {
    pageNrText: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false, // TODO disable input while sending JSON?
    },
  },
  data: () => ({
    // rules: [
    //   (value) =>
    //     !this.errorMessage ||
    //     'Image size should be less than 8 MB!',
    // ],
    pageImageFile: null,
    pageImage: null,
    errorMessage: null,
    showLoading: false,
  }),
  computed: {},
  created() {},
  methods: {
    async makeBlob(img) {
      const self = this
      self.showLoading = true
      var reader = new FileReader()
      reader.onloadend = function() {
        self.pageImage = reader.result
        self.$emit('set-page-blob', reader.result)
        self.showLoading = false
      }
      reader.readAsDataURL(img)
    },
    confirmDeleteImage(id) {
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete'),
          this.$i18n.t('remove_image') + ' "' + this.pageNrText + '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.removeBlob()
        })
        .catch((reject) => {
          return true
        })
    },
    removeBlob() {
      this.pageImageFile = null
      this.pageImage = null
      this.$emit('set-page-blob', null)
    },
    // setInspectionEdited(bool) {
    //   this.$store.commit('inspections/setInspectionEdited', bool) // TODO
    // },
  },
}
</script>

<style lang="scss" scoped>
.upload-page-blob {
  width: 140px;
  height: 198px;
  padding: 0px !important;
}

.v-input.image-uploader {
  max-width: 100%;
  max-height: 50px;
}

.page-number {
  background-color: $color-white;
  color: #000;
  opacity: 0.8;
  padding: 6px 8px;
  margin: 6px 2px 0 0;
  border-radius: 4px;
  max-width: 64px;
}
.page-blob-preview {
  object-fit: cover;
  width: 138px;
  height: 100%; // auto;
  max-height: 196px;
  margin-top: -32px;
}
</style>
