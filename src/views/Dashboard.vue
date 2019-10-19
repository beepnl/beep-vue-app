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
      return this.$store.state.Auth.currentSession.accessToken.jwtToken
    },
  },
}
</script>

<style scoped></style>
