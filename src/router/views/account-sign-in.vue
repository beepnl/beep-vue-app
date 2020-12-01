<template>
  <Layout :title="$t('login_title')">
    <v-form ref="form" v-model="valid" @submit.prevent="login">
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
          {{ error.type }}
        </v-alert>
        <v-text-field
          v-model="credentials.username"
          :label="`${$t('email')}`"
          :rules="[(v) => !!v || signinRules.email_required]"
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :label="`${$t('password')}`"
          :rules="[(v) => !!v || signinRules.password_required]"
          @click:append="show = !show"
        ></v-text-field>
        <router-link :to="{ name: 'password-forgot' }">
          {{ $t('forgot_password') }}
        </router-link>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'sign-up' }">
          {{ $t('create_login_question') }}
        </router-link>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid || tryingToLogIn">{{
          $t('login')
        }}</v-btn>
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
  },
  data() {
    return {
      credentials: {
        username: this.email || '',
        password: '',
      },
      errors: [],
      show: false,
      tryingToLogIn: false,
      valid: false,
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
  methods: {
    login() {
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
    clearCredentials() {
      this.credentials = {}
    },
  },
}
</script>
