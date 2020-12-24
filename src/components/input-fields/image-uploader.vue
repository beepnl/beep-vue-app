<template>
  <div>
    <v-file-input
      v-if="object[item.id] === null"
      ref="image"
      class="pt-0 image-uploader"
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
      <span>
        <v-img
          v-if="object[item.id] !== null"
          :src="baseApiUrl + object[item.id]"
          class="grey lighten-2 image-thumb"
          aspect-ratio="1"
          @click="setActiveImage(object[item.id])"
        >
        </v-img>
      </span>
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
  },
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Image size should be less than 2 MB!',
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
        // empty input field even if deleting image gives error
        this.object[id] = null
        const response = await Api.deleteRequest('/images', '', data)
        if (!response) {
          console.log('error')
        }
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
        }
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
            this.object[this.item.id] = response.data.thumb_url
            this.setInspectionEdited(true)

            this.readImages()
          }
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.message
            console.log(msg)
          } else {
            console.log('Error: ', error)
          }
        }
      }
    },
    async readImages() {
      try {
        const response = await Api.readRequest('/images')
        this.images = response.data
        return true
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
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
