<template>
  <div
    :class="
      `inspection-item ${
        item.input === 'text'
          ? 'col-xs-12'
          : 'col-xs-12 col-sm-6 col-md-4 col-lg-3'
      }`
    "
  >
    <yesNoRating
      v-if="item.input === 'boolean'"
      :object="object"
      :label="item.trans[locale]"
      :property="item.id"
    ></yesNoRating>
    <div v-else> {{ item.trans[locale] }}: {{ item.input }} </div>
  </div>
</template>

<script>
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  components: {
    yesNoRating,
  },
  props: {
    item: {
      type: Object,
      default: null,
      required: true,
    },
    object: {
      type: Object,
      default: null,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
  },
}
</script>

<style lang="scss"></style>
