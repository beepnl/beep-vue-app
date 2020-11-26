<template>
  <div>
    <v-card class="account-card d-flex flex-column align-center">
      <div class="mt-4">
        <a href="/"
          ><img
            v-cloak
            class="account-logo ml-n1"
            src="@assets/img/beep-icon-logo.svg"
        /></a>
      </div>
      <v-card-title class="account-title">{{ title }}</v-card-title>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.account-card {
  width: 90%;
  margin: 50px auto;
  overflow: hidden;
  @include for-tablet-portrait-up {
    width: 380px;
    margin: 10% auto;
  }
}
.account-logo {
  width: 300px;
}
.account-title {
  width: 100%;
  @include for-phone-only {
    font-size: 18px;
  }
}
</style>
