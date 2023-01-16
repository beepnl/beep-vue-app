<template>
  <Layout :title="$t('login_title')" :dark-mode="darkMode">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%"
      @submit.prevent="login"
    >
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
          v-model="credentials.id"
          :class="fieldErrors.id ? 'error--text' : ''"
          :label="`${$t('id')}`"
          type="id"
          :rules="[(v) => !!v || signinRules.id_required]"
          autocomplete="on"
        ></v-text-field>
        <v-text-field
          v-model="credentials.code"
          :class="fieldErrors.code ? 'error--text' : ''"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :label="$t('Code')"
          :rules="[(v) => !!v || signinRules.code_required]"
          autocomplete="off"
          @click:append="show = !show"
        ></v-text-field>
        <!-- <router-link
          :to="{
            name: 'code-forgot',
            query: { id: credentials.id },
          }"
        >
          {{ $t('forgot_code') }}
        </router-link> -->
        <v-spacer></v-spacer>
        <a :href="'https://app.beep.nl/dashboard/create'">
          {{ $t('create_dashboard_question') }}
        </a>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">{{ $t('login') }}</v-btn>
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
    id: {
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
        id: this.id || '',
        code: '',
      },
      errors: [],
      show: true,
      valid: false,
      fieldErrors: {
        id: false,
        code: false,
      },
      darkMode: true, // TODO enable lightMode if coming from light mode dashboard / stored in local storage?
    }
  },
  computed: {
    signinRules: function() {
      return {
        id_required: this.$i18n.t('id_is_required'),
        code_required: this.$i18n.t('code_is_required'),
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
        this.$router.push({
          name: 'dashboard',
          params: { id: this.credentials.id },
          query: { code: this.credentials.code },
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
      this.fieldErrors.id = false
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
