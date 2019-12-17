<template>
  <v-card>
    <v-form @submit.prevent="signIn" ref="form" v-model="valid">
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-alert
          v-for="error in errors"
          :key="error.name"
          type="error"
          outlined
        >
          {{ error.type }}
        </v-alert>
        <v-text-field
          label="email"
          v-model="credentials.username"
          autocomplete="off"
          :rules="[v => !!v || 'error.email_required']"
        ></v-text-field>
        <v-text-field
          label="password"
          type="password"
          v-model="credentials.password"
          :rules="[v => !!v || 'error.password_required']"
        ></v-text-field>
        <router-link :to="{ name: 'forgotPassword' }">
          I forgot my password
        </router-link>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'createAccount' }">
          Create an account
        </router-link>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">Sign In</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['email'],
  methods: {
    async signIn() {
      this.clearErrors()
      try {
        await this.$store.dispatch('auth/signIn', this.credentials)
        await this.$router.push({ name: 'home' })
        this.clearCredentials()
      } catch (error) {
        switch (error.code) {
          case 'UserNotFoundException':
            this.errors.push({
              type: 'error.incorrect_username_or_password',
            })
            break
          case 'NotAuthorizedException':
            this.errors.push({
              type: 'error.incorrect_username_or_password',
            })
            break
          case 'LimitExceededException':
            this.errors.push({
              type: 'error.limit_exceeded_try_again_later',
            })
            break
          default:
            this.errors.push({
              type: 'error.unknown_error',
            })
        }
      }
    },
    clearErrors() {
      this.errors = []
    },
    clearCredentials() {
      this.credentials = {}
    },
  },
  data() {
    return {
      credentials: {
        username: this.email || '',
        password: '',
      },
      errors: [],
      valid: false,
    }
  },
}
</script>

<style scoped></style>
