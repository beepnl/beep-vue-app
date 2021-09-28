<template>
  <v-overlay :value="overlay">
    <v-toolbar dense light flat class="image-overlay-toolbar">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-icon color="accent" dark class="close-icon" @click="closeOverlay"
          >mdi-close</v-icon
        >
      </v-toolbar-items>
    </v-toolbar>
    <div class="px-3 pb-1 image-wrapper">
      <v-img
        :src="fullUrl ? imageUrl : baseApiUrl + imageUrl"
        class="grey lighten-2 image-overlay-content"
      >
      </v-img>
    </div>
    <v-toolbar
      dense
      light
      outline
      flat
      height="40px"
      class="image-overlay-toolbar-footer"
    >
      <span>{{ date ? momentify(date) : ' ' }}</span>
    </v-toolbar>
  </v-overlay>
</template>

<script>
import { momentify } from '@mixins/momentMixin'

export default {
  mixins: [momentify],
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
  data() {
    return {
      baseApiUrl:
        process.env.VUE_APP_BASE_API_URL ||
        process.env.VUE_APP_BASE_API_URL_FALLBACK,
    }
  },
  computed: {
    imageUrl() {
      return this.thumburl.replace('/thumbs/', '/images/')
    },
    fullUrl() {
      return this.thumburl.indexOf('https://') > -1
    },
  },
  methods: {
    closeOverlay() {
      this.$emit('close-overlay')
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
  @media (max-height: 450px) {
    max-width: 120vh;
    max-height: 90vh;
  }
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
