<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-card-title>Create account</v-card-title>
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
          label="email"
          autocomplete="off"
          :rules="emailRules"
        />
        <v-text-field
          v-model="credentials.password"
          label="password"
          type="password"
          :rules="passwordRules"
        />
        <v-text-field
          v-model="repeatedPassword"
          label="repeat password"
          type="password"
          :rules="repeatPasswordRules"
        />
        <v-checkbox
          v-model="credentials.policyAccepted"
          :rules="termsRules"
          label="I accept the BEEP terms of service, that are compatible with the new European privacy law"
          required
        ></v-checkbox>
        <a href="https://test.beep.nl/terms-of-service">Terms of service</a>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">Create account</v-btn>
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
      emailRules: [
        (v) => !!v || 'error.email_required',
        (v) => /.+@.+\..+/.test(v) || 'error.invalid_email',
      ],
      passwordRules: [
        (v) => !!v || 'error.password_required',
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{6,98})/.test(
            v
          ) || 'error.password_does_not_match_policy',
      ],
      repeatPasswordRules: [
        (v) => !!v || 'error.field_required',
        (v) =>
          v === this.credentials.password || 'error.passwords_do_not_match',
      ],
      termsRules: [(v) => !!v || 'error.field_required'],
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
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
                  type: 'error.user_already_exists',
                })
                break
              case 'LimitExceededException':
                this.errors.push({
                  type: 'error.limit_exceeded_try_again_later',
                })
                break
              case 'ResourceNotFoundException':
                this.errors.push({
                  type: 'error.user_pool_client_not_found',
                })
                break
              default:
                this.errors.push({
                  type: 'error.unknown_error',
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
