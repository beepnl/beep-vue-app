<template>
  <Layout :title="`${$t('User_data')}`">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="editUser">
        <v-card-title>{{ $t('User_data') }}</v-card-title>
        <v-card-text>
          <v-alert
            v-for="error in errors"
            :key="error.name"
            text
            prominent
            dense
            type="error"
            color="red"
          >
            {{ errorMessage }}
          </v-alert>
          <v-alert
            v-if="successMessage !== null"
            text
            prominent
            dense
            type="success"
            color="green"
          >
            {{ successMessage }}
          </v-alert>
          <v-text-field
            v-model="user.name"
            :label="`${$t('name')}`"
            autocomplete="off"
            disabled
          />
          <v-text-field
            v-model="email"
            :label="`${$t('email')}`"
            autocomplete="off"
            :rules="emailRules"
          />
          <v-text-field
            v-model="password"
            :label="`${$t('new_password')}`"
            type="password"
            :rules="passwordRules"
          />
          <v-text-field
            v-model="repeatPassword"
            :label="`${$t('confirm_new_password')}`"
            type="password"
            :rules="repeatPasswordRules"
            @keydown.enter="$event.target.blur"
          />
          <v-checkbox v-model="policyAccepted" :rules="termsRules" required>
            <template slot="label" class="keep-spaces">
              {{ $t('accept_policy_1') }}
              <a :href="$t('policy_url')">{{ $t('terms_of_use') }}</a>
              {{ $t('accept_policy_2') }}
            </template>
          </v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn tile outlined color="primary" type="submit" :disabled="!valid">
            <v-progress-circular
              v-if="showLoadingIcon"
              class="mr-2"
              size="18"
              width="2"
              color="primary"
              indeterminate
            />
            <v-icon v-if="!showLoadingIcon" dark color="primary"
              >mdi-check</v-icon
            >{{ $t('save') }}</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/back.vue'

export default {
  components: { Layout },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      email: this.user.email,
      policyAccepted: true,
      password: '',
      repeatPassword: '',
      successMessage: null,
      showLoadingIcon: false,
      valid: false,
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_URL
    },
    edit() {
      return {
        email: this.email,
        password: this.password,
        password_confirmation: this.repeatPassword,
        policy_accepted: this.policyAccepted ? this.user.policy_accepted : '',
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
            this.$i18n.t('confirm_new_password') +
            '" ' +
            this.$i18n.t('is_required'),
        (v) => v === this.edit.password || this.$i18n.t('no_password_match'),
      ]
    },
    termsRules: function() {
      return [(v) => !!v || this.$i18n.t('policy_accepted_is_required')]
    },
  },
  methods: {
    async editUser() {
      if (this.$refs.form.validate()) {
        this.clearMessages()
        this.showLoadingIcon = true
        try {
          const response = await Api.updateRequest('/user', '', this.edit)
          if (!response) {
            this.errors.push({
              errorMessage: this.$i18n.t('not_saved_error'),
            })
          }
          this.valid = false
          this.successMessage =
            this.$i18n.t('User_data') + ' ' + this.$i18n.t('updated')
          this.showLoadingIcon = false
        } catch (error) {
          this.valid = false
          this.showLoadingIcon = false
          if (error.message !== undefined) {
            this.errors.push({ errorMessage: error.message })
            console.log('Error: ', error.message)
          } else {
            this.errors.push({
              errorMessage: this.$i18n.t('error'),
            })
            console.log('Error: ', error)
          }
        }
      }
    },
    clearMessages() {
      this.errors = []
      this.successMessage = null
    },
  },
}
</script>

<style lang="scss" scoped>
.keep-spaces {
  white-space: pre-wrap;
}
</style>
