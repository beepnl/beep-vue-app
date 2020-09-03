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
    {{ item.trans[locale] }}: {{ item.input }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
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
