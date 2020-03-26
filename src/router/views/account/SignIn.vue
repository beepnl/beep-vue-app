<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="signIn">
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
          v-model="credentials.username"
          label="email"
          autocomplete="off"
          :rules="[(v) => !!v || 'error.email_required']"
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          label="password"
          type="password"
          :rules="[(v) => !!v || 'error.password_required']"
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
        <v-btn text type="submit" :disabled="!valid || tryingToLogIn"
          >Sign In</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      credentials: {
        username: this.email || '',
        password: '',
      },
      errors: [],
      tryingToLogIn: false,
      valid: false,
    }
  },
  methods: {
    signIn() {
      this.tryingToLogIn = true
      this.clearErrors()
      this.$store
        .dispatch('auth/signIn', this.credentials)
        .then((token) => {
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
          this.clearCredentials()
        })
        // Redirect to the originally requested page, or to the home page
        .catch((error) => {
          this.tryingToLogIn = false
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
        })
    },

    clearErrors() {
      this.errors = []
    },
    clearCredentials() {
      this.credentials = {}
    },
  },
}
</script>
