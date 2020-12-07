<template>
  <Layout :title="$t('login_title')">
    <v-form ref="form" v-model="valid" @submit.prevent="login">
      <v-card-text>
        <v-alert v-if="msg" type="success" text prominent dense color="green">
          {{ $t(msg) }}
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
        </v-alert>
        <v-text-field
          v-model="credentials.email"
          :class="fieldErrors.email ? 'error--text' : ''"
          :label="`${$t('email')}`"
          type="email"
          :rules="[(v) => !!v || signinRules.email_required]"
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :class="fieldErrors.password ? 'error--text' : ''"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :label="`${$t('password')}`"
          :rules="[(v) => !!v || signinRules.password_required]"
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
        <v-btn text type="submit" :disabled="!valid">{{ $t('login') }}</v-btn>
      </v-card-actions>
    </v-form>
  </Layout>
</template>

<script>
import languages from '@assets/js/lang/languages'
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
    login() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        this.$store
          .dispatch('auth/signIn', this.credentials)
          .then((token) => {
            this.$router.push(
              this.$route.query.redirectFrom || { name: 'home' }
            )
            this.clearCredentials()
          })
          // Redirect to the originally requested page, or to the home page
          .catch((error) => {
            if (error.response) {
              console.log(error.response)
              const msg = error.response.data.message
              if (msg === 'invalid_user') {
                this.fieldErrors.email = true
                this.fieldErrors.password = true
              } else if (msg === 'invalid_password') {
                this.fieldErrors.password = true
              } else if (msg.indexOf('email') > -1) {
                this.fieldErrors.email = true
              }
              this.errors.push({
                errorMessage: this.$i18n.t(msg),
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
    },
    clearCredentials() {
      this.credentials = {}
    },
  },
}
</script>
