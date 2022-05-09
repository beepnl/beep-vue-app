<template>
  <Layout :title="$t('login_title')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%"
      @submit.prevent="login"
    >
      <v-card-text>
        <v-alert
          v-if="msg || resentVerification"
          type="success"
          text
          prominent
          dense
          color="green"
        >
          {{ resentVerification ? $t('email_verification_resent') : $t(msg) }}
        </v-alert>
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
            v-if="error.verifyLink && !resentVerification"
            class="red--text alert-link"
            @click="resendEmailVerification"
            >{{ $t('email_new_verification') }}</a
          >
        </v-alert>
        <v-text-field
          v-model="credentials.email"
          :class="fieldErrors.email ? 'error--text' : ''"
          :label="`${$t('email')}`"
          type="email"
          :rules="[(v) => !!v || signinRules.email_required]"
          autocomplete="on"
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :class="fieldErrors.password ? 'error--text' : ''"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :label="`${$t('password')}`"
          :rules="[(v) => !!v || signinRules.password_required]"
          autocomplete="off"
          @click:append="show = !show"
        ></v-text-field>
        <router-link
          :to="{
            name: 'password-forgot',
            query: { email: credentials.email },
          }"
        >
          {{ $t('forgot_password') }}
        </router-link>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'sign-up' }">
          {{ $t('create_login_question') }}
        </router-link>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">{{ $t('login') }}</v-btn>
      </v-card-actions>
    </v-form>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import languages from '@assets/js/languages'
import Layout from '@layouts/account.vue'

export default {
  components: { Layout },
  props: {
    email: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      credentials: {
        email: this.email || '',
        password: '',
      },
      errors: [],
      show: false,
      valid: false,
      fieldErrors: {
        email: false,
        password: false,
      },
      resentVerification: false,
    }
  },
  computed: {
    signinRules: function() {
      return {
        email_required: this.$i18n.t('email_is_required'),
        password_required: this.$i18n.t('password_is_required'),
      }
    },
  },
  created() {
    // if locale is saved in localStorage, use it
    if (localStorage.beepLocale) {
      this.$i18n.locale = localStorage.beepLocale
    } else {
      this.$i18n.locale = languages.checkBrowserLanguage()
    }
  },
  methods: {
    async resendEmailVerification() {
      try {
        const response = await Api.postRequest(
          '/email/resend',
          this.credentials
        )
        this.resentVerification = true
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
      if (this.$refs.form.validate()) {
        this.clearErrors()
        this.$store
          .dispatch('auth/signIn', this.credentials)
          .then((token) => {
            this.$router.push(
              this.$route.query.redirectFrom || { name: 'home' }
            )
          })
          // Redirect to the originally requested page, or to the home page
          .catch((error) => {
            if (error.response) {
              console.log(error.response)
              if (
                typeof error.response.data !== 'undefined' &&
                typeof error.response.data.message !== 'undefined'
              ) {
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
              var verifyOn = false
              if (msg === 'email_not_verified') {
                verifyOn = true
              }
              this.errors.push({
                errorMessage: this.$i18n.t(msg),
                verifyLink: verifyOn,
              })
            } else {
              this.errors.push({
                errorMessage: this.$i18n.t('authentication_failed'),
              })
            }
          })
      }
    },

    clearErrors() {
      this.errors = []
      this.fieldErrors.email = false
      this.fieldErrors.password = false
      this.resentVerification = false
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-link {
  text-decoration: underline !important;
}
</style>
