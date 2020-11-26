<template>
  <Layout :title="$t('password_recovery_reset_password')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%;"
      @submit.prevent="resetPassword"
    >
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
          v-model="resetPasswordRequest.email"
          :label="`${$t('email')}`"
          :rules="emailRules"
          autocomplete="off"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="resetPasswordRequest.verificationCode"
          :label="`${$t('verification_code')}`"
          :rules="verificationCodeRules"
          autocomplete="off"
        ></v-text-field>
        <v-text-field
          v-model="resetPasswordRequest.newPassword"
          :label="`${$t('new_password')}`"
          :rules="passwordRules"
          autocomplete="off"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="newPasswordRepeated"
          :label="`${$t('confirm_new_password')}`"
          :rules="repeatPasswordRules"
          autocomplete="off"
          type="password"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" text type="submit">
          {{ $t('password_recovery_reset_password') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </Layout>
</template>

<script>
import Layout from '@layouts/account.vue'

export default {
  components: { Layout },
  props: {
    email: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
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
    }
  },
  computed: {
    emailRules: function() {
      return [
        (v) => !!v || this.$i18n.t('email_is_required'),
        (v) => /.+@.+\..+/.test(v) || this.$i18n.t('no_valid_email'),
      ]
    },
    verificationCodeRules: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('verification_code') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
    passwordRules: function() {
      return [
        (v) => !!v || this.$i18n.t('password_is_required'),
        // FIXME: don't impose and expose password requirements besides minimum length
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{6,98})/.test(
            v
          ) || this.$i18n.t('invalid_password'),
      ]
    },
    repeatPasswordRules: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('confirm_new_password') +
            '" ' +
            this.$i18n.t('is_required'),
        (v) =>
          v === this.resetPasswordRequest.newPassword ||
          this.$i18n.t('no_password_match'),
      ]
    },
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        this.$store
          .dispatch('auth/forgotPasswordSubmit', this.resetPasswordRequest)
          .then(() => this.$router.push({ name: 'sign-in' }))
          .catch((error) => {
            switch (error.code) {
              case 'UserNotFoundException':
                this.errors.push({
                  type: this.$i18n.t('invalid_user'),
                })
                break
              case 'LimitExceededException':
                this.errors.push({
                  type: this.$i18n.t('limit_exceeded'),
                })
                break
              case 'CodeMismatchException':
                this.errors.push({
                  type: this.$i18n.t('invalid_token'),
                })
                break
              default:
                this.errors.push({
                  type: this.$i18n.t('error'),
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
