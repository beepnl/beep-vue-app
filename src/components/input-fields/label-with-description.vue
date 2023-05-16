<template>
  <div>
    <div class="beep-label">
      <span
        v-text="
          plainText !== null
            ? plainText
            : getText(item) +
              (item.unit !== null ? ' (' + item.unit + ')' : '') +
              (item.required === 1 ? '*' : '')
        "
      ></span>
      <a
        v-if="
          plainText === null &&
            (item.description !== null || item.source !== null)
        "
        ><v-icon
          class="mdi mdi-information ml-1 icon-info"
          dark
          small
          color="accent"
          @click="showDescription = !showDescription"
        ></v-icon
      ></a>
      <v-icon
        v-if="parseMode && parsedImages.length > 0"
        class="ml-1"
        dark
        small
        color="red"
        @click="showImages = !showImages"
      >
        {{ showImages ? 'mdi-eye' : 'mdi-eye-off' }}
      </v-icon>
    </div>

    <p v-if="showDescription" class="info-text">
      <em v-if="item.description !== null">{{ item.description }}<br /></em>
      <a v-if="item.source !== null" :href="item.source" target="_blank">{{
        item.source
      }}</a>
    </p>

    <div
      v-if="showImages && parsedItems.length > 0"
      class="info-text d-flex flex-column"
    >
      <div v-for="(image, j) in parsedImages" :key="'i' + j" class="d-flex">
        <img :src="image" style="max-width: 20px; max-height: 20px;" />
        <span
          v-if="parsedItems.length >= j + 1"
          class="ml-1"
          v-text="getText(parsedItems[j])"
        ></span>
      </div>
    </div>

    <div v-else-if="showImages" class="info-text d-flex align-center">
      <template v-for="(image, j) in parsedImages">
        <img
          :key="'i' + j"
          :src="image"
          :style="
            parsedImages.length > 1 ? 'max-width: 20px;' : 'max-width: 100%;'
          "
        />
        <div v-if="parsedDate && j !== 1 && (j - 3) % 2 === 0" :key="'d' + j">
          <div v-if="j === 7" class="mr-3"></div>
          <div
            v-else
            class="date-helper"
            v-text="j === 3 || j === 5 ? '-' : j === 9 ? ':' : ''"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
    parsedDate: {
      type: Boolean,
      default: false,
      required: false,
    },
    parsedItems: {
      type: Array,
      default: () => [],
      required: false,
    },
    parsedImages: {
      type: Array,
      default: () => [],
      required: false,
    },
    parseMode: {
      type: Boolean,
      default: false,
      required: false,
    },
    plainText: {
      type: String,
      default: null,
      required: false,
    },
    checkAnswer: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: function() {
    return {
      showDescription: false,
      showImages: false,
    }
  },
  created() {
    // if answer needs to be actively checked in order to be filled in, always show image by default
    if (this.checkAnswer) {
      this.showImages = true
    }
  },
  methods: {
    getText(item) {
      return item.trans[this.locale] || item.name
    },
  },
}
</script>

<style lang="scss" scoped>
.date-helper {
  text-align: center;
  min-width: 6px;
}
</style>
