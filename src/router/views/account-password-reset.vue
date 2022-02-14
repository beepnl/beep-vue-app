<template>
  <Layout :title="$t('password_recovery_reset_password')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%"
      @submit.prevent="resetPassword"
    >
      <div v-if="passwordReset">
        <v-card-text v-if="errors.length === 0">
          <v-alert text prominent dense color="green">
            {{ $t('password_recovery_reset_success') }}
          </v-alert>
          <a @click="login">{{ $t('go_to_dashboard') }}</a>
        </v-card-text>
        <v-card-text v-if="errors.length > 0">
          <v-alert
            v-for="error in errors"
            :key="error.name"
            type="error"
            text
            prominent
            dense
            color="red"
          >
            {{ error.errorMessage }}
            <a
              v-if="error.verifyLink"
              class="red--text alert-link"
              @click="sendEmailVerification"
              >{{ $t('email_new_verification') }}</a
            >
          </v-alert>
          <router-link :to="{ name: 'sign-up' }">
            {{ $t('create_login_question') }}
          </router-link>
        </v-card-text>
      </div>
      <div v-if="!passwordReset">
        <v-card-text>
          <v-alert
            v-for="error in errors"
            :key="error.name"
            type="error"
            text
            prominent
            dense
            color="red"
          >
            {{ error.errorMessage }}
            <span v-if="error.passwordForgotLink" class="alert-link">
              <br />
              <router-link
                class="red--text"
                :to="{ name: 'password-forgot', query: { email: email } }"
              >
                {{ $t('password_recovery_resend_mail') }}
              </router-link>
            </span>
          </v-alert>
          <v-text-field
            v-model="resetPasswordRequest.email"
            :class="fieldErrors.email ? 'error--text' : ''"
            :label="`${$t('email')}`"
            :rules="emailRules"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="resetPasswordRequest.token"
            :class="fieldErrors.token ? 'error--text' : ''"
            :label="`${$t('verification_code')}`"
            :rules="verificationCodeRules"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="resetPasswordRequest.password"
            :class="fieldErrors.password ? 'error--text' : ''"
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
          <v-btn text type="submit">
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
      fieldErrors: {
        email: false,
        password: false,
        token: false,
      },
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
          if (response.data.data.api_token !== null) {
            this.passwordReset = true
          }
          return response
        } catch (error) {
          if (error.response) {
            console.log(error.response)
            var verifyLink = false
            var passwordForgotLink = false

            if (typeof error.response.data.message !== 'undefined') {
              var msg = error.response.data.message
            } else {
              msg = error.response.data
            }
            if (msg === 'invalid_user') {
              this.fieldErrors.email = true
              this.fieldErrors.password = true
            } else if (msg === 'invalid_password') {
              this.fieldErrors.password = true
            } else if (msg === 'invalid_token') {
              this.fieldErrors.token = true
              passwordForgotLink = true
            }
            if (msg === 'email_not_verified') {
              verifyLink = true
            }
            this.errors.push({
              errorMessage: this.$i18n.t(msg),
              verifyLink,
              passwordForgotLink,
            })
          } else {
            this.errors.push({
              errorMessage: this.$i18n.tc('Error', 1),
            })
          }
        }
      }
    },
    async sendEmailVerification() {
      try {
        const response = await Api.postRequest('/email/resend', {
          email: this.email,
        })
        return response
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.message
          this.errors.push({
            errorMessage: this.$i18n.t(msg),
          })
        } else {
          this.errors.push({
            errorMessage: this.$i18n.tc('Error', 1),
          })
        }
      }
    },
    login() {
      this.clearErrors()
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
          if (error.response) {
            console.log(error.response)
            var verifyLink = false
            if (typeof error.response.data.message !== 'undefined') {
              var msg = error.response.data.message
            } else {
              msg = error.response.data
            }
            if (msg === 'invalid_user') {
              this.fieldErrors.email = true
              this.fieldErrors.password = true
            } else if (msg === 'invalid_password') {
              this.fieldErrors.password = true
            } else if (msg.indexOf('email') > -1) {
              this.fieldErrors.email = true
            }

            if (msg === 'email_not_verified') {
              verifyLink = true
            }
            this.errors.push({
              errorMessage: this.$i18n.t(msg),
              verifyLink,
            })
          } else {
            this.errors.push({
              errorMessage: this.$i18n.t('authentication_failed'),
            })
          }
        })
    },
    clearErrors() {
      this.errors = []
      this.fieldErrors.email = false
      this.fieldErrors.password = false
      this.fieldErrors.token = false
    },
    clearResetPasswordRequest() {
      this.resetPasswordRequest = {}
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-link {
  text-decoration: underline !important;
}
</style>
