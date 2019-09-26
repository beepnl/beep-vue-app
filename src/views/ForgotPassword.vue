<template>
  <v-card>
    <form @submit.prevent="forgotPassword">
      <v-card-title>Forgot password</v-card-title>
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
          label="email"
          v-model.trim="email"
          autocomplete="off"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text type="submit">Send email</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  methods: {
    async forgotPassword() {
      this.clearErrors()

      try {
        await this.$store.dispatch('user/forgotPassword', this.email)
        await this.$router.push({ name: 'resetPassword' })
      } catch (error) {
        switch (error.code) {
          case 'UserNotFoundException':
            this.errors.push({
              type: 'error.user_not_found',
            })
            break
          case 'LimitExceededException':
            this.errors.push({
              type: 'error.limit_exceeded_try_again_later',
            })
            break
          default:
            this.errors.push({
              type: 'error.email_cannot_be_empty',
            })
        }
      }
    },
    clearErrors() {
      this.errors = []
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
  },
  data() {
    return {
      email: '',
      errors: [],
    }
  },
}
</script>

<style scoped></style>
