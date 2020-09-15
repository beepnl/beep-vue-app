<template>
  <v-overlay :value="overlay">
    <v-toolbar dense light flat class="image-overlay-toolbar">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon color="primary" dark class="close-icon" @click="closeOverlay"
          >mdi-close</v-icon
        >
      </v-toolbar-items>
    </v-toolbar>
    <div class="px-3 pb-1 image-wrapper">
      <v-img
        :src="baseApiUrl + getImageUrl(thumburl)"
        class="grey lighten-2 image-overlay-content"
      >
      </v-img>
    </div>
    <v-toolbar
      v-if="date"
      dense
      light
      outline
      flat
      class="image-overlay-toolbar-footer"
    >
      <span>{{ momentify(date) }}</span>
    </v-toolbar>
  </v-overlay>
</template>

<script>
import { momentMixin } from '@mixins/momentMixin'

export default {
  mixins: [momentMixin],
  props: {
    date: {
      type: String,
      required: false,
      default: null,
    },
    thumburl: {
      type: String,
      required: true,
    },
    overlay: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    baseApiUrl() {
      var baseUrl = process.env.VUE_APP_API_URL
      baseUrl = baseUrl.replace('/api/', '')
      return baseUrl
    },
  },
  methods: {
    closeOverlay() {
      this.$emit('close-overlay')
    },
    getImageUrl(thumburl) {
      var imageUrl = thumburl.replace('thumbs', 'images')
      return imageUrl
    },
  },
}
</script>

<style lang="scss" scoped>
.image-overlay-toolbar {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.image-overlay-toolbar-footer {
  margin-top: -3px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  span {
    width: 100%;
    text-align: center;
  }
}
.image-wrapper {
  background-color: $color-white;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
.image-overlay-content {
  max-width: 80vw;
  max-height: 80vh;
  margin-top: -2px;
  border: 1px solid $color-grey;
  border-radius: 4px;
}
.close-icon {
  float: right;
  cursor: pointer;
}
</style>
