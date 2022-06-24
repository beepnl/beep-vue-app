<template>
  <div class="d-flex align-center">
    <v-icon
      class="qrcode-icon"
      :size="xLarge ? (mobile ? 150 : 200) : mobile ? 40 : 60"
      >mdi-qrcode
    </v-icon>
    <span
      :class="'qrcode-id text-center' + (xLarge ? ' --xlarge' : '')"
      v-text="text"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    xLarge: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
}
</script>

<style lang="scss" scoped>
.qrcode-icon {
  z-index: 0;
  color: $color-beige !important;
  caret-color: $color-beige !important;
}

.qrcode-id {
  font-family: monospace, 'Roboto', sans-serif !important;
  font-size: 35px;
  font-weight: bold;
  color: $color-accent;
  z-index: 1;
  margin-left: -60px;
  width: 60px;
  &.--xlarge {
    font-size: 110px;
    margin-left: -200px;
    width: 200px;
  }
  @include for-phone-only {
    font-size: 23px;
    margin-left: -40px;
    width: 40px;
    &.--xlarge {
      font-size: 82px;
      margin-left: -150px;
      width: 150px;
    }
  }
}
</style>
