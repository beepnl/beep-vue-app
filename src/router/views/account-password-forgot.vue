<template>
  <Layout :title="$t('password_recovery_title')">
    <v-form
      ref="form"
      v-model="valid"
      style="width: 100%;"
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
            {{ error.type }}
          </v-alert>
          <v-text-field
            v-model.trim="emailToSubmit"
            :label="`${$t('email')}`"
            :rules="emailRules"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text type="submit" :disabled="!valid">{{
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
          // if (response === 'reminder_sent') { TODO: enable when 400 errors are changed into 500 errors
          this.reminderSent = true
          // }
          return response
        } catch (error) {
          switch (error.code) {
            case 'UserNotFoundException':
              this.errors.push({
                type: this.$i18n.t('invalid_user'),
              })
              break
            case 'LimitExceededException':
              this.errors.push({
                type: this.$i18n.t('limit_exceeded'),
              })
              break
            default:
              this.errors.push({
                type: this.$i18n.t('email_is_required'),
              })
          }
        }
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
}
</script>
