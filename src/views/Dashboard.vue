<template>
  <v-card>
    Dashboard
    {{ accessToken }}
  </v-card>
</template>

<script>
export default {
  computed: {
    accessToken() {
      return this.$store.state.Auth.currentUser.signInUserSession.accessToken
    },
  },
}
</script>

<style scoped></style>
