<template>
  <v-card>
    <v-form @submit.prevent="resetPassword" ref="form" v-model="valid">
      <v-card-title>Reset password</v-card-title>
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
          v-model="resetPasswordRequest.email"
          :rules="emailRules"
          autocomplete="off"
          disabled
        ></v-text-field>
        <v-text-field
          label="verification code"
          v-model="resetPasswordRequest.verificationCode"
          :rules="verificationCodeRules"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          label="new password"
          v-model="resetPasswordRequest.newPassword"
          :rules="passwordRules"
          autocomplete="off"
          type="password"
        ></v-text-field>
        <v-text-field
          label="repeat new password"
          v-model="newPasswordRepeated"
          :rules="repeatPasswordRules"
          autocomplete="off"
          type="password"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" text type="submit">
          Reset password
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['email', 'code'],
  methods: {
    async resetPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        try {
          await this.$store.dispatch(
            'auth/forgotPasswordSubmit',
            this.resetPasswordRequest
          )
          await this.$router.push({ name: 'signIn' })
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
            case 'CodeMismatchException':
              this.errors.push({
                type: 'error.invalid_verification_code',
              })
              break
            default:
              this.errors.push({
                type: 'error.unknown_error',
              })
          }
        }
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
  data() {
    return {
      resetPasswordRequest: {
        email: this.email,
        verificationCode: this.code,
        newPassword: '',
      },
      newPasswordRepeated: '',
      valid: false,
      errors: [],
      emailRules: [
        v => !!v || 'error.email_required',
        v => /.+@.+\..+/.test(v) || 'error.invalid_email',
      ],
      verificationCodeRules: [v => !!v || 'error.verification_code_required'],
      passwordRules: [
        v => !!v || 'error.password_required',
        // FIXME: don't impose and expose password requirements besides minimum length
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{6,98})/.test(
            v
          ) || 'error.password_does_not_match_policy',
      ],
      repeatPasswordRules: [
        v => !!v || 'error.field_required',
        v =>
          v === this.resetPasswordRequest.newPassword ||
          'error.passwords_do_not_match',
      ],
    }
  },
}
</script>

<style scoped></style>
