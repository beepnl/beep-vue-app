<template>
  <Layout :title="$t('password_recovery_title')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%"
      @submit.prevent="forgotPassword"
    >
      <div v-if="reminderSent">
        <v-card-text>
          <v-alert text prominent dense color="green">
            {{ $t('password_recovery_reminder_success') }}
          </v-alert>
        </v-card-text>
        <v-divider class="mx-3"></v-divider>
        <v-card-text>
          <router-link
            :to="{ name: 'password-forgot', query: { email: emailToSubmit } }"
          >
            {{ $t('password_recovery_code_not_received') }}
          </router-link>
        </v-card-text>
      </div>
      <div v-if="!reminderSent">
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
            {{ error.errorMessage }}
          </v-alert>
          <v-text-field
            v-model.trim="emailToSubmit"
            :class="fieldErrors.email ? 'error--text' : ''"
            :label="`${$t('email')}`"
            type="email"
            :rules="emailRules"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text type="submit">{{
            $t('password_recovery_send_mail')
          }}</v-btn>
        </v-card-actions>

        <v-divider class="mx-3"></v-divider>
        <v-card-text>
          <router-link
            :to="{ name: 'password-reset', query: { email: emailToSubmit } }"
          >
            {{ $t('password_recovery_enter_code') }}
          </router-link>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'sign-in', query: { email: emailToSubmit } }"
          >
            {{ $t('password_recovery_remembered') }}
          </router-link>
        </v-card-text>
      </div>
    </v-form>
  </Layout>
</template>

<script>
import Api from '@api/Api'
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
      valid: false,
      errors: [],
      emailToSubmit: this.email || '',
      reminderSent: false,
      fieldErrors: {
        email: false,
      },
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
  },
  methods: {
    async forgotPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()
        try {
          const response = await Api.postRequest('/user/reminder', {
            email: this.emailToSubmit,
          })
          if (response.data.message === 'reminder_sent') {
            this.reminderSent = true
          }
          return response
        } catch (error) {
          if (error.response) {
            console.log(error.response)
            const msg = error.response.data.message
            if (msg === 'invalid_user' || msg.indexOf('email') > -1) {
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
    clearErrors() {
      this.errors = []
      this.fieldErrors.email = false
    },
  },
}
</script>
