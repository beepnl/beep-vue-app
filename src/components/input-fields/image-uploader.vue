<template>
  <div>
    <v-file-input
      v-if="object[item.id] === null"
      ref="image"
      class="pt-0"
      :rules="rules"
      accept="image/png, image/jpeg, image/bmp"
      :placeholder="`${$t('Select')} ${$tc('Image', 1).toLocaleLowerCase()}`"
      prepend-icon="mdi-camera"
      @change="onUpload"
    ></v-file-input>
    <div class="image-preview">
      <v-icon
        v-if="object[item.id] !== null"
        class="mt-n1 clear-icon"
        right
        color="primary"
        @click="confirmDeleteImage(item.id)"
        >mdi-close</v-icon
      >
      <v-img
        v-if="object[item.id] !== null"
        :src="baseApiUrl + object[item.id]"
        class="grey lighten-2 image-thumb"
        aspect-ratio="1"
        @click="setActiveImage(object[item.id])"
      >
      </v-img>
    </div>
    <imageOverlay
      v-if="object[item.id] !== null"
      :date="activeImage ? activeImage.date : null"
      :thumburl="object[item.id]"
      :overlay="
        activeImage !== null && activeImage.thumb_url === object[item.id]
      "
      @close-overlay="activeImage = null"
    ></imageOverlay>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
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
  },
  data: () => ({
    snackbar: {
      show: false,
      timeout: 2000,
      text: 'notification',
    },
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
    images: null,
    activeImage: null,
  }),
  computed: {
    baseApiUrl() {
      var baseUrl = process.env.VUE_APP_API_URL
      baseUrl = baseUrl.replace('/api/', '')
      return baseUrl
    },
  },
  created() {
    this.readImages()
  },
  methods: {
    async deleteImage(id) {
      try {
        const imageUrl = this.object[id]
        const data = {
          image_url: imageUrl,
        }
        const response = await this.$store.dispatch('images/deleteImage', data)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        this.object[id] = null
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async onUpload() {
      const file = this.$refs.image.internalValue

      if (typeof file !== 'undefined' && !file.$error) {
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

        try {
          const response = await this.$store.dispatch(
            'images/saveImage',
            formData,
            headers
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          if (
            response &&
            typeof response.data !== 'undefined' &&
            typeof response.data.thumb_url
          ) {
            this.object[this.item.id] = response.data.thumb_url
            // console.log('Thumb url: ', response.data.thumb_url)

            this.readImages()
          }
        } catch (error) {
          console.log('Image upload error: ', error)
          if (
            typeof error.data !== 'undefined' &&
            typeof error.data.message !== 'undefined'
          ) {
            this.snackbar.text = error.data.message
            this.snackbar.show = true
          }
        }
      }
    },
    async readImages() {
      try {
        const response = await this.$store.dispatch('images/findAll')
        this.images = response
        return true
      } catch (e) {
        console.log(e)
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
    setActiveImage(thumburl) {
      if (this.images !== null) {
        this.images.forEach((image) => {
          if (image.thumb_url === thumburl) {
            this.activeImage = image
          }
        })
      } else {
        this.activeImage = null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.image-preview {
  max-width: 120px;
  max-height: 100px;
}
.image-thumb {
  max-width: 100px;
  max-height: 100px;
  cursor: zoom-in;
  border: 1px solid $color-grey;
  border-radius: 4px;
}
.clear-icon {
  float: right;
  cursor: pointer;
}
</style>
