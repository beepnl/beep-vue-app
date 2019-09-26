<template>
  <v-card>
    <form @submit.prevent="signIn">
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-text-field
          label="email"
          v-model="credentials.username"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          label="password"
          type="password"
          v-model="credentials.password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">Sign In</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('user/signIn', this.credentials)
      } catch (error) {
        console.log(error)
      }

      await this.$router.push({ name: 'dashboard' })
      this.credentials = {}
    },
  },
  data() {
    return {
      credentials: {},
    }
  },
}
</script>

<style scoped></style>
