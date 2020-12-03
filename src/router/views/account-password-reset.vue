<template>
  <Layout :title="$t('password_recovery_reset_password')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%;"
      @submit.prevent="resetPassword"
    >
      <div v-if="passwordReset">
        <v-card-text>
          <v-alert text prominent dense color="green">
            {{ $t('password_recovery_reset_success') }}
          </v-alert>
          <a @click="login">{{ $t('go_to_dashboard') }}</a>
        </v-card-text>
      </div>
      <div v-if="!passwordReset">
        <v-card-text>
          {{ apiToken }}
          <v-alert
            v-for="error in errors"
            :key="error.name"
            type="error"
            text
            prominent
            dense
            color="red"
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
            v-model="resetPasswordRequest.token"
            :label="`${$t('verification_code')}`"
            :rules="verificationCodeRules"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="resetPasswordRequest.password"
            :label="`${$t('new_password')}`"
            :rules="passwordRules"
            autocomplete="off"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="resetPasswordRequest.password_confirmation"
            :label="`${$t('confirm_new_password')}`"
            :rules="repeatPasswordRules"
            autocomplete="off"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" text type="submit">
            {{ $t('password_recovery_reset_password') }}
          </v-btn>
        </v-card-actions>

        <v-divider class="mx-3"></v-divider>
        <v-card-text>
          <router-link
            :to="{ name: 'password-forgot', query: { email: email } }"
          >
            {{ $t('password_recovery_code_not_received') }}
          </router-link>
          <v-spacer></v-spacer>
        </v-card-text>
      </div>
    </v-form>
  </Layout>
</template>

<script>
import Api from '@api/Api'
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
        email: this.email || '',
        token: this.code || '',
        password: '',
        password_confirmation: '',
      },
      valid: false,
      errors: [],
      show1: false,
      show2: false,
      passwordReset: false,
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
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{8,98})/.test(
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
          v === this.resetPasswordRequest.password ||
          this.$i18n.t('no_password_match'),
      ]
    },
  },
  methods: {
    async resetPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        try {
          const response = await Api.postRequest(
            '/user/reset',
            this.resetPasswordRequest
          )
          console.log(response.data.data)
          this.passwordReset = true

          return response
        } catch (error) {
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
        }
      }
    },
    login() {
      this.$store
        .dispatch('auth/signIn', {
          email: this.resetPasswordRequest.email,
          password: this.resetPasswordRequest.password,
        })
        .then((token) => {
          this.$router.push({ name: 'home' })
          this.clearResetPasswordRequest()
        })
        .catch((error) => {
          this.tryingToLogIn = false
          switch (error.code) {
            case 'UserNotFoundException':
              this.errors.push({
                type: this.$i18n.t('invalid_user'),
              })
              break
            case 'NotAuthorizedException':
              this.errors.push({
                type: this.$i18n.t('authentication_failed'),
              })
              break
            case 'LimitExceededException':
              this.errors.push({
                type: this.$i18n.t('limit_exceeded'),
              })
              break
            default:
              this.errors.push({
                type: this.$i18n.t('authentication_failed'),
              })
          }
        })
    },
    clearErrors() {
      this.errors = []
    },
    clearResetPasswordRequest() {
      this.resetPasswordRequest = {}
    },
  },
}
</script>
