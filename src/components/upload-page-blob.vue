<template>
  <div class="upload-page-blob-wrapper d-flex flex-column mr-4 mb-4'">
    <div
      :class="
        (pageImage === null ? 'float-right' : 'rounded-border') +
          ' upload-page-blob'
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

      <v-file-input
        v-if="pageImage === null"
        ref="fileInput"
        v-model="pageImageFile"
        class="pt-0 mt-n8 image-uploader-page-blob float-right cursor-pointer"
        accept="image/png, image/jpeg, image/bmp"
        :placeholder="uploadText"
        :prepend-icon="false"
        outlined
        hide-details
        :error-messages="errorMessage"
        :height="'100%'"
        :loading="showLoading ? 'primary' : false"
        @change="$event !== null ? makeBlob($event) : ''"
        @click:clear="errorMessage = null"
      >
        <template v-slot:prepend-inner>
          <v-icon large>mdi-camera</v-icon>
        </template>
      </v-file-input>
      <img
        v-if="pageImageFile !== null"
        :src="pageImage"
        class="grey lighten-2 page-blob-preview"
        aspect-ratio="1"
      />

      <Confirm ref="confirm"></Confirm>
    </div>

    <span v-if="errorMessage" class="hcs-label red--text mt-1">
      {{ errorMessage }}
    </span>

    <!-- <v-alert
      v-if="errorMessage"
      type="error"
      text
      prominent
      dense
      color="red"
      dismissible
    >
      {{ errorMessage }}
    </v-alert> -->
  </div>
</template>

<script>
import Confirm from '@components/confirm.vue'

export default {
  components: {
    Confirm,
  },
  props: {
    pageNr: {
      type: Number,
      required: true,
    },
    pageNrText: {
      type: String,
      required: true,
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
  computed: {
    uploadText() {
      return this.$i18n.te('Upload_pagenr')
        ? this.$i18n.t('Upload_pagenr').replace('[pagenr]', this.pageNr)
        : 'Upload page ' + this.pageNr + ' here'
    },
  },
  created() {},
  methods: {
    async makeBlob(img) {
      const self = this
      self.errorMessage = null
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
  },
}
</script>

<style lang="scss" scoped>
.upload-page-blob-wrapper {
  width: 140px;
}

.upload-page-blob {
  width: 140px;
  height: 198px;
  padding: 0px !important;
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
  width: 136px;
  height: 100%;
  max-height: 194px;
  margin: -31px 0 0 1px;
}
</style>
