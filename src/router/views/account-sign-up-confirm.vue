<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="confirmSignup">
      <v-card-title>{{ $t('confirm_email_title') }}</v-card-title>
      <v-card-text>
        {{ $t('confirm_email_summary') }}
      </v-card-text>
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
          v-model.trim="email"
          :label="`${$t('email')}`"
          autocomplete="off"
          disabled
        ></v-text-field>
        <v-text-field
          v-model.trim="code"
          :label="`${$t('verification_code')}`"
          autocomplete="off"
          :rules="verificationCodeRules"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">{{ $t('confirm') }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      code: '',
      errors: [],
      valid: false,
    }
  },
  computed: {
    verificationCodeRules: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('verification_code') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
  },
  methods: {
    confirmSignup() {
      this.clearErrors()
      this.$store
        .dispatch('auth/confirmSignup', {
          username: this.email,
          code: this.code,
        })
        .then(() =>
          this.$router.push({
            name: 'signIn',
            query: { email: this.email },
          })
        )
        .catch((error) => {
          switch (error.code) {
            case 'CodeMismatchException':
              this.errors.push({
                type: this.$i18n.t('invalid_token'),
              })
              break
            case 'LimitExceededException':
              this.errors.push({
                type: this.$i18n.t('limit_exceeded'),
              })
              break
            default:
              this.errors.push({
                type: this.$i18n.t('error'),
              })
          }
        })
    },
    clearErrors() {
      this.errors = []
    },
  },
}
</script>
