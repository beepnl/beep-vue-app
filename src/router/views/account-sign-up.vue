<template>
  <Layout :title="$t('create_login')">
    <v-form ref="form" v-model="valid" @submit.prevent="createAccount">
      <v-card-text v-if="registered">
        <v-alert text prominent dense color="green">
          {{ $t('email_verification_sent') }}
        </v-alert>
        <p>{{ $t('succesfully_registered') }}</p>
        <a @click="sendEmailVerification">{{ $t('email_new_verification') }}</a>
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
          {{ error.type }}
        </v-alert>
        <v-text-field
          v-model="name"
          :label="`${$t('username') + ' (' + $t('optional') + ')'}`"
        />
        <v-text-field
          v-model="email"
          :label="`${$t('email')}`"
          type="email"
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          :label="`${$t('password')}`"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rules="passwordRules"
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
        <v-btn text type="submit" :disabled="!valid">{{
          $t('create_login_summary')
        }}</v-btn>
      </v-card-actions>

      <v-divider v-if="!registered" class="mx-3"></v-divider>
      <v-card-text v-if="!registered">
        <router-link :to="{ name: 'sign-in' }">
          {{ $t('already_registered') }}
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
    repeatPasswordRules: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('confirm_password') +
            '" ' +
            this.$i18n.t('is_required'),
        (v) => v === this.password || this.$i18n.t('no_password_match'),
      ]
    },
    termsRules: function() {
      return [(v) => !!v || this.$i18n.t('policy_accepted_is_required')]
    },
  },
  methods: {
    async createAccount() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        try {
          const response = await Api.postRequest('/register', this.credentials)
          this.registered = true
          return response
        } catch (error) {
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
        }
      }
    },
    async sendEmailVerification() {
      try {
        const response = await Api.postRequest(
          '/email/resend',
          this.credentials
        )
        return response
      } catch (error) {
        this.errorMessage =
          error.status === 422
            ? this.$i18n.t('Error') +
              ': ' +
              Object.values(error.message).join(', ')
            : this.$i18n.t('empty_fields') + '.'
        console.log('Error: ', this.errorMessage)
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
}
</script>
