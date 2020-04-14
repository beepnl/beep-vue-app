<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="forgotPassword">
      <v-card-title>Send me a password reset link</v-card-title>
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
          v-model.trim="email"
          label="email"
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
  data() {
    return {
      valid: false,
      errors: [],
      emailRules: [
        (v) => !!v || 'error.email_required',
        (v) => /.+@.+\..+/.test(v) || 'error.invalid_email',
      ],
      email: '',
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
  methods: {
    forgotPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()

        this.$store
          .dispatch('auth/forgotPassword', this.email)
          .then(() =>
            this.$router.push({
              name: 'password-reset',
              query: { email: this.email },
            })
          )
          .catch((error) => {
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
          })
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
}
</script>
