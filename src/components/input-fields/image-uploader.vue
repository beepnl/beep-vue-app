<template>
  <div>
    <v-file-input
      v-if="object[item.id] === null"
      ref="image"
      class="pt-0 image-uploader"
      accept="image/png, image/jpeg, image/bmp"
      :placeholder="`${$t('Select')} ${$tc('Image', 1).toLowerCase()}`"
      prepend-icon="mdi-camera"
      :error-messages="errorMessage"
      :disabled="inputDisabled"
      :loading="showLoading ? 'primary' : false"
      @change="onUpload"
      @click:clear="errorMessage = null"
    ></v-file-input>
    <div class="image-preview">
      <v-icon
        v-if="object[item.id] !== null"
        class="mt-n1 clear-icon"
        right
        color="accent"
        @click="confirmDeleteImage(item.id)"
        >mdi-close</v-icon
      >
      <span>
        <v-img
          v-if="object[item.id] !== null"
          :src="imageLink"
          class="grey lighten-2 image-thumb"
          aspect-ratio="1"
          @click="activeImage = thumbUrl"
        >
        </v-img>
      </span>
    </div>
    <imageOverlay
      v-if="object[item.id] !== null"
      :thumburl="object[item.id]"
      :overlay="activeImage !== null && activeImage === object[item.id]"
      @close-overlay="activeImage = null"
    ></imageOverlay>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import imageOverlay from '@components/image-overlay.vue'

export default {
  components: {
    Confirm,
    imageOverlay,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    inputDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: () => ({
    // rules: [
    //   (value) =>
    //     !this.errorMessage ||
    //     'Image size should be less than 8 MB!',
    // ],
    images: null,
    activeImage: null,
    errorMessage: null,
    thumbUrl: '',
    showLoading: false,
    baseApiUrl:
      process.env.VUE_APP_BASE_API_URL ||
      process.env.VUE_APP_BASE_API_URL_FALLBACK,
  }),
  computed: {
    fullUrl() {
      return this.thumbUrl.indexOf('https://') > -1
    },
    imageLink() {
      return this.fullUrl ? this.thumbUrl : this.baseApiUrl + this.thumbUrl
    },
  },
  created() {
    if (this.object[this.item.id] !== null) {
      this.thumbUrl = this.object[this.item.id]
    }
  },
  methods: {
    async deleteImage(id) {
      try {
        const imageUrl = this.object[id]
        const data = {
          image_url: imageUrl,
        }
        // empty input field even if deleting image gives error
        this.object[id] = null
        const response = await Api.deleteRequest('/images', '', data)
        if (!response) {
          console.log('error')
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async onUpload() {
      const file = this.$refs.image.internalValue

      if (typeof file !== 'undefined' && (file !== null) & !file.$error) {
        this.showLoading = true
        const userId = this.$store.getters['auth/userId']
        const hiveId =
          this.$store.getters['hives/activeHive'] !== null
            ? this.$store.getters['hives/activeHive'].id
            : ''
        const inspection =
          this.$store.getters['inspections/selectedInspectionId'] !== null
            ? this.$store.getters['inspections/selectedInspectionId']
            : ''
        const formData = new FormData()
        formData.append('file', file)
        formData.append('user_id', userId)
        formData.append('hive_id', hiveId)
        formData.append('inspection', inspection)
        formData.append('category_id', this.item.id)

        const headers = { 'Content-Type': 'multipart/form-data; boundary=XXX' }

        this.errorMessage = null

        try {
          const response = await Api.postRequestWithHeaders(
            '/images',
            formData,
            headers
          )
          if (!response) {
            console.log('error')
          }
          if (
            response &&
            typeof response.data !== 'undefined' &&
            response.data.thumb_url
          ) {
            this.thumbUrl = response.data.thumb_url
            this.object[this.item.id] = response.data.thumb_url
            this.setInspectionEdited(true)
          }
          this.showLoading = false
        } catch (error) {
          this.showLoading = false
          if (error.response) {
            console.log(error.response)
            this.errorMessage = this.$i18n.t('something_wrong')
          } else {
            console.log('Error: ', error)
            this.errorMessage = this.$i18n.t('something_wrong')
          }
        }
      }
    },
    confirmDeleteImage(id) {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('remove_image') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.deleteImage(id)
        })
        .catch((reject) => {
          return true
        })
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input.image-uploader {
  max-width: 280px;
}
.image-preview {
  max-width: 100px;
  max-height: 120px;
}
.image-thumb {
  max-width: 80px;
  max-height: 120px;
  cursor: zoom-in;
  border: 1px solid $color-grey;
  border-radius: 4px;
}
.clear-icon {
  float: right;
  cursor: pointer;
}
</style>
