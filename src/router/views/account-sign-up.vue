<template>
  <Layout :title="$t('create_login')">
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-card-text v-if="registered">
        <v-alert text prominent dense color="green">
          {{
            resentVerification
              ? $t('email_verification_resent')
              : $t('email_verification_sent')
          }}
        </v-alert>
        <p>{{ $t('succesfully_registered') }}</p>
        <a @click="resendEmailVerification">{{
          $t('email_new_verification')
        }}</a>
      </v-card-text>
      <v-card-text v-if="!registered">
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
          v-model="name"
          :label="`${$t('username') + ' (' + $t('optional') + ')'}`"
        />
        <v-text-field
          v-model="email"
          :class="fieldErrors.email ? 'error--text' : ''"
          :label="`${$t('email')}`"
          type="email"
          :rules="emailRules"
          validate-on-blur
        />
        <v-text-field
          v-model="password"
          :class="fieldErrors.password ? 'error--text' : ''"
          :label="`${$t('password')}`"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rules="passwordRules"
          validate-on-blur
          @click:append="show1 = !show1"
        />
        <v-text-field
          v-model="passwordConfirmation"
          :label="`${$t('confirm_password')}`"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :rules="repeatPasswordRules"
          @click:append="show2 = !show2"
        />
        <v-checkbox
          v-model="policyAccepted"
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

      <v-card-actions v-if="!registered">
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="disabled">{{
          $t('create_login_summary')
        }}</v-btn>
      </v-card-actions>

      <v-divider class="mx-3"></v-divider>
      <v-card-text>
        <router-link :to="{ name: 'sign-in' }">
          {{ !registered ? $t('already_registered') : $t('already_verified') }}
        </router-link>
        <v-spacer></v-spacer>
      </v-card-text>
    </v-form>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/account.vue'

export default {
  components: { Layout },
  data() {
    return {
      name: null,
      email: '',
      password: '',
      passwordConfirmation: '',
      policyAccepted: false,
      valid: false,
      errors: [],
      show1: false,
      show2: false,
      registered: false,
      fieldErrors: {
        email: false,
        password: false,
      },
      disabled: false,
      resentVerification: false,
    }
  },
  computed: {
    credentials() {
      if (this.name) {
        return {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          policy_accepted: this.policyAccepted
            ? this.$i18n.t('policy_version')
            : '',
        }
      } else {
        return {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          policy_accepted: this.policyAccepted
            ? this.$i18n.t('policy_version')
            : '',
        }
      }
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
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{8,98})/.test(
            v
          ) || this.$i18n.t('invalid_password'),
      ]
    },
    repeatPasswordRules() {
      if (!this.passwordConfirmation) {
        return [
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('confirm_password') +
            '" ' +
            this.$i18n.t('is_required'),
        ]
      } else if (this.passwordConfirmation !== this.password) {
        return [this.$i18n.t('no_password_match')]
      } else {
        return []
      }
    },
    termsRules: function() {
      return [(v) => !!v || this.$i18n.t('policy_accepted_is_required')]
    },
  },
  methods: {
    async createAccount() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        this.disabled = true
        try {
          const response = await Api.postRequest('/register', this.credentials)
          this.registered = true
          return response
        } catch (error) {
          this.disabled = false
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
              errorMessage: this.$i18n.tc('Error', 1),
            })
          }
        }
      }
    },
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
    clearErrors() {
      this.errors = []
      this.fieldErrors.email = false
      this.fieldErrors.password = false
      this.resentVerification = false
    },
  },
}
</script>
