<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="forgotPassword">
      <v-card-title>{{ $t('password_recovery_title') }}</v-card-title>
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
          :rules="emailRules"
          autocomplete="off"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit" :disabled="!valid">{{
          $t('password_recovery_send_mail')
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      errors: [],
      email: '',
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
    forgotPassword() {
      if (this.$refs.form.validate()) {
        this.clearErrors()

        this.$store
          .dispatch('auth/forgotPassword', this.email)
          .then(() =>
            this.$router.push({
              name: 'password-reset',
              query: { email: this.email },
            })
          )
          .catch((error) => {
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
          })
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
}
</script>
