<template>
  <v-card>
    <v-form @submit.prevent="forgotPassword" ref="form" v-model="valid">
      <v-card-title>Forgot password</v-card-title>
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
          :rules="emailRules"
          autocomplete="off"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">Send email</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  methods: {
    async forgotPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()

        try {
          await this.$store.dispatch('auth/forgotPassword', this.email)
          await this.$router.push({
            name: 'resetPassword',
            query: { email: this.email },
          })
        } catch (error) {
          switch (error.code) {
            case 'UserNotFoundException':
              this.errors.push({
                type: 'error.user_not_found',
              })
              break
            case 'LimitExceededException':
              this.errors.push({
                type: 'error.limit_exceeded_try_again_later',
              })
              break
            default:
              this.errors.push({
                type: 'error.email_cannot_be_empty',
              })
          }
        }
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
  data() {
    return {
      valid: false,
      errors: [],
      emailRules: [
        v => !!v || 'error.email_required',
        v => /.+@.+\..+/.test(v) || 'error.invalid_email',
      ],
      email: '',
    }
  },
}
</script>

<style scoped></style>
