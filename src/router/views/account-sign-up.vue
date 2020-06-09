<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-card-title>{{ $t('create_login') }}</v-card-title>
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
          v-model="credentials.username"
          :label="`${$t('email')}`"
          autocomplete="off"
          :rules="emailRules"
        />
        <v-text-field
          v-model="credentials.password"
          :label="`${$t('password')}`"
          type="password"
          :rules="passwordRules"
        />
        <v-text-field
          v-model="repeatedPassword"
          :label="`${$t('confirm_password')}`"
          type="password"
          :rules="repeatPasswordRules"
        />
        <v-checkbox
          v-model="credentials.policyAccepted"
          :rules="termsRules"
          :label="`${$t('accept_policy')}`"
          required
        ></v-checkbox>
        <a href="https://test.beep.nl/terms-of-service">{{
          $t('Terms_of_use')
        }}</a>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">{{
          $t('create_login_summary')
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      credentials: {},
      valid: false,
      repeatedPassword: '',
      agreeToTerms: false,
      errors: [],
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
    emailRules: function() {
      return [
        (v) => !!v || this.$i18n.t('email_is_required'),
        (v) => /.+@.+\..+/.test(v) || this.$i18n.t('no_valid_email'),
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
        (v) => !!v || this.$i18n.t('is_required'),
        (v) =>
          v === this.resetPasswordRequest.newPassword ||
          this.$i18n.t('no_password_match'),
      ]
    },
    termsRules: function() {
      return [(v) => !!v || this.$i18n.t('policy_accepted_is_required')]
    },
  },
  methods: {
    createAccount() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        this.$store
          .dispatch('auth/signUp', this.credentials)
          .then(() =>
            // FIXME: the backend returns a 400 Bad Request that should be 200 Accepted,
            // so this block never gets executed
            this.$router.push({
              name: 'sign-up-confirm',
              query: { email: this.credentials.username },
            })
          )
          .catch((error) => {
            switch (error.code) {
              case 'UsernameExistsException':
                this.errors.push({
                  type: this.$i18n.t('username_already_exists'),
                })
                break
              case 'LimitExceededException':
                this.errors.push({
                  type: this.$i18n.t('limit_exceeded'),
                })
                break
              case 'ResourceNotFoundException':
                this.errors.push({
                  type: this.$i18n.t('error'),
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
