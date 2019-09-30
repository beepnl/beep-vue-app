<template>
  <v-card>
    <v-form @submit.prevent="confirmSignup" ref="form" v-model="valid">
      <v-card-title>Confirm your email</v-card-title>
      <v-card-text>
        You've received a verification code in your email. Enter it below to
        verify your email adress
      </v-card-text>
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
          v-model.trim="email"
          autocomplete="off"
          disabled
        ></v-text-field>
        <v-text-field
          label="verification code"
          v-model.trim="code"
          autocomplete="off"
          :rules="[v => !!v || 'error.verification_code_required']"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">Send email</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['email'],
  methods: {
    async confirmSignup() {
      this.clearErrors()
      try {
        await this.$store.dispatch('Auth/confirmSignup', {
          username: this.email,
          code: this.code,
        })
        await this.$router.push({
          name: 'signIn',
          query: { email: this.email },
        })
      } catch (error) {
        switch (error.code) {
          case 'CodeMismatchException':
            this.errors.push({
              type: 'error.invalid_verification_code',
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
  },
  data() {
    return {
      code: '',
      errors: [],
      valid: false,
    }
  },
}
</script>

<style scoped></style>
