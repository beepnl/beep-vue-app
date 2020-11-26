<template>
  <Layout :title="$t('create_login')">
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
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
          class="keep-spaces"
        >
          <template slot="label"
            ><span class="checkbox-label"
              >{{ $t('accept_policy_1')
              }}<a :href="$t('policy_url')">{{ $t('terms_of_use') }}</a
              >{{ $t('accept_policy_2') }}
            </span></template
          >
        </v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">{{
          $t('create_login_summary')
        }}</v-btn>
      </v-card-actions>

      <v-divider class="mx-3"></v-divider>
      <v-card-actions>
        <router-link :to="{ name: 'sign-in' }">
          <span class="sign-in-link">{{ $t('already_registered') }}</span>
        </router-link>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-form>
  </Layout>
</template>

<script>
import Layout from '@layouts/account.vue'

export default {
  components: { Layout },
  data() {
    return {
      credentials: {},
      valid: false,
      repeatedPassword: '',
      errors: [],
    }
  },
  computed: {
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
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('confirm_password') +
            '" ' +
            this.$i18n.t('is_required'),
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

<style lang="scss" scoped>
.sign-in-link {
  font-size: 14px;
}
</style>
