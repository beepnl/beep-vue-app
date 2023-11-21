<template>
  <Layout :title="$t('Code')" :dashboard-mode="true" :set-dark-mode="darkMode">
    <v-form ref="form" style="width: 100%" @submit.prevent="login">
      <v-card-text>
        <v-alert
          v-if="msg"
          type="success"
          variant="text"
          prominent
          density="compact"
          color="green"
        >
          {{ $t(msg) }}
        </v-alert>
        <v-alert
          v-for="error in errors"
          :key="error.name"
          type="error"
          variant="text"
          prominent
          density="compact"
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
import Layout from '@layouts/account-layout.vue'

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
      darkMode: true,
    }
  },
  computed: {
    validCode() {
      return this.credentials.code.length === this.codeLength
    },
  },
  created() {
    this.checkLocalStorage()
  },
  methods: {
    checkLocalStorage() {
      // if locale and darkmode is saved in localStorage, use it
      if (localStorage.beepdashboardLocale) {
        this.$i18n.locale = localStorage.beepdashboardLocale
      } else {
        this.$i18n.locale = languages.checkBrowserLanguage()
      }

      if (localStorage.beepdashboardDarkMode) {
        this.darkMode = localStorage.beepdashboardDarkMode === 'true'
      }
      this.$vuetify.theme.dark = this.darkMode
    },
    login() {
      if (this.$refs.form.validate()) {
        this.$router.push({
          name: 'dashboard',
          params: { id: this.credentials.code },
        })
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
