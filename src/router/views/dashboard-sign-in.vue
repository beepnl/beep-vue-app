<template>
  <Layout :title="$t('Code')" :dashboard-mode="true">
    <v-form ref="form" style="width: 100%" @submit.prevent="login">
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

        <v-otp-input v-model="credentials.code"></v-otp-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!validCode" text type="submit">{{
          $t('login')
        }}</v-btn>
      </v-card-actions>

      <v-card-actions class="pa-3">
        <a :href="'https://app.beep.nl/dashboard/create'">
          {{ $t('create_dashboard_question') }}
        </a>
      </v-card-actions>
    </v-form>
  </Layout>
</template>

<script>
// import Api from '@api/Api'
import languages from '@assets/js/languages'
import Layout from '@layouts/account.vue'

export default {
  components: { Layout },
  props: {
    code: {
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
        code: this.code || '',
      },
      errors: [],
      fieldErrors: {
        code: false,
      },
      codeLength: 6,
      darkMode: true, // TODO enable lightMode if coming from light mode dashboard / stored in local storage?
    }
  },
  computed: {
    validCode() {
      return this.credentials.code.length === this.codeLength
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
        this.$router.push({
          name: 'dashboard',
          params: { id: this.credentials.code },
        })
        // TODO
        //   this.clearErrors()
        //   this.$store
        //     .dispatch('auth/signIn', this.credentials)
        //     .then((token) => {
        //       this.$router.push(
        //         this.$route.query.redirectFrom || { name: 'home' }
        //       )
        //     })
        //     // Redirect to the originally requested page, or to the home page
        //     .catch((error) => {
        //       if (error.response) {
        //         console.log(error.response)
        //         if (
        //           typeof error.response.data !== 'undefined' &&
        //           typeof error.response.data.message !== 'undefined'
        //         ) {
        //           var msg = error.response.data.message
        //         } else {
        //           msg = error.response.data
        //         }
        //         if (msg === 'invalid_user') {
        //           this.fieldErrors.id = true
        //           this.fieldErrors.code = true
        //         } else if (msg === 'invalid_code') {
        //           this.fieldErrors.code = true
        //         } else if (msg.indexOf('id') > -1) {
        //           this.fieldErrors.id = true
        //         }
        //         this.errors.push({
        //           errorMessage: this.$i18n.t(msg),
        //         })
        //       } else {
        //         this.errors.push({
        //           errorMessage: this.$i18n.t('authentication_failed'),
        //         })
        //       }
        //     })
      }
    },
    clearErrors() {
      this.errors = []
      this.fieldErrors.code = false
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-link {
  text-decoration: underline !important;
}
</style>
