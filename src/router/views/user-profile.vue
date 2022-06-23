<template>
  <Layout :title="`${$t('User_data')}`">
    <v-form ref="form" v-model="valid" @submit.prevent="editUser">
      <v-toolbar class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!mobile"
          tile
          outlined
          color="red"
          class="mr-3"
          :disabled="showDeleteLoadingIcon"
          @click="confirmDeleteUser"
        >
          <v-progress-circular
            v-if="showDeleteLoadingIcon"
            class="mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showDeleteLoadingIcon" left>mdi-delete</v-icon>
          {{ $t('Delete') }}
        </v-btn>
        <v-progress-circular
          v-if="mobile && showDeleteLoadingIcon"
          class="ml-n1 mr-4"
          size="18"
          width="2"
          color="red"
          indeterminate
        />
        <v-icon
          v-if="mobile && !showDeleteLoadingIcon"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteUser"
          >mdi-delete</v-icon
        >

        <v-btn
          tile
          outlined
          class="mr-1"
          color="black"
          type="submit"
          :disabled="!valid || showLoadingIcon"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon
          >{{ $t('save') }}</v-btn
        >
      </v-toolbar>

      <v-container class="content-container">
        <v-row v-if="errors.length > 0">
          <v-col cols="12">
            <v-alert
              v-for="error in errors"
              :key="error.name"
              text
              prominent
              dense
              type="error"
              color="red"
            >
              {{ error.errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="successMessage !== null">
          <v-col cols="12">
            <v-alert text prominent dense type="success" color="green">
              {{ successMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <div class="overline mb-3" v-text="$t('User_data')"></div>
        <v-card outlined>
          <v-card-text>
            <v-text-field
              v-model="name"
              :label="`${$t('username')}`"
              autocomplete="off"
            />
            <v-text-field
              v-model="email"
              :class="fieldErrors.email ? 'error--text' : ''"
              :label="`${$t('email')}`"
              :rules="emailRules"
              required
              validate-on-blur
            />
            <v-text-field
              v-model="password"
              :class="fieldErrors.password ? 'error--text' : ''"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :label="`${$t('password')}`"
              :type="show1 ? 'text' : 'password'"
              :rules="passwordRules"
              required
              :error-messages="
                displayPasswordError ? $t('password_is_required') : null
              "
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-model="newPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :label="`${$t('new_password')}`"
              :type="show2 ? 'text' : 'password'"
              :rules="newPasswordRules"
              @keydown.enter="$event.target.blur"
              @click:append="show2 = !show2"
            />
            <v-text-field
              v-model="repeatPassword"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :label="`${$t('confirm_new_password')}`"
              :type="show3 ? 'text' : 'password'"
              :rules="repeatPasswordRules"
              @keydown.enter="$event.target.blur"
              @click:append="show3 = !show3"
            />
            <v-checkbox
              v-model="policyAccepted"
              :rules="termsRules"
              required
              class="keep-spaces"
            >
              <template slot="label"
                ><span class="checkbox-label"
                  >{{ $t('accept_policy_1')
                  }}<a :href="$t('policy_url')" target="_blank" @click.stop>{{
                    $t('terms_of_use')
                  }}</a
                  >{{ $t('accept_policy_2') }}
                </span></template
              >
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-container>
    </v-form>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'

export default {
  components: { Confirm, Layout },
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
      name: this.user.name,
      policyAccepted: true,
      password: '',
      newPassword: null,
      repeatPassword: null,
      successMessage: null,
      show1: false,
      show2: false,
      show3: false,
      showDeleteLoadingIcon: false,
      showLoadingIcon: false,
      valid: false,
      displayPasswordError: false,
      fieldErrors: {
        email: false,
        password: false,
      },
    }
  },
  computed: {
    edit() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        password_new: this.newPassword,
        password_confirmation: this.repeatPassword,
        policy_accepted: this.policyAccepted
          ? this.$i18n.t('policy_version')
          : '',
      }
    },
    emailRules: function() {
      return [
        (v) => !!v || this.$i18n.t('email_is_required'),
        (v) => /.+@.+\..+/.test(v) || this.$i18n.t('no_valid_email'),
      ]
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    passwordRules: function() {
      return [(v) => !!v || this.$i18n.t('password_is_required')]
    },
    newPasswordRules: function() {
      return [
        (v) =>
          v === null ||
          v === '' ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`])(?=.{8,98})/.test(
            v
          ) ||
          this.$i18n.t('invalid_password'),
      ]
    },
    repeatPasswordRules: function() {
      return [
        (v) =>
          v === this.edit.password_new || this.$i18n.t('no_password_match'),
      ]
    },
    termsRules: function() {
      return [(v) => !!v || this.$i18n.t('policy_accepted_is_required')]
    },
  },
  methods: {
    async deleteUser() {
      this.clearMessages()
      this.showDeleteLoadingIcon = true
      try {
        const response = await Api.deleteRequest('/user', '', {
          password: this.password,
        })
        if (!response) {
          this.errors.push({
            errorMessage: this.$i18n.tc('Error', 1),
          })
          this.showDeleteLoadingIcon = false
        }
        this.signOut()
      } catch (error) {
        this.showDeleteLoadingIcon = false
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
    },
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
            this.showLoadingIcon = false
          }
          this.$store.commit('auth/SET_CURRENT_USER', response.data)
          if (response.data.email_verified_at == null) {
            this.successMessage = this.$i18n.t('new_email_verification_sent')
          } else {
            this.successMessage =
              this.$i18n.t('User_data') + ' ' + this.$i18n.t('updated')
          }
          this.showLoadingIcon = false
          this.password = null
          this.newPassword = null
          this.repeatPassword = null
          this.$refs.form.resetValidation()
          // console.log(response)
        } catch (error) {
          this.showLoadingIcon = false
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
    clearMessages() {
      this.errors = []
      this.successMessage = null
      this.fieldErrors.email = false
      this.fieldErrors.password = false
    },
    confirmDeleteUser() {
      if (this.password === '' || this.password === null) {
        this.displayPasswordError = true
      } else {
        this.displayPasswordError = false
        const warningMessage = this.$i18n.t('delete_complete_account')
        this.$refs.confirm
          .open(
            this.$i18n.t('Delete') + ' ' + this.$i18n.t('user_data'),
            null,
            {
              color: 'red',
            },
            warningMessage
          )
          .then((confirm) => {
            this.deleteUser()
          })
          .catch((reject) => {
            return true
          })
      }
    },
    signOut() {
      this.$store
        .dispatch('auth/signOut')
        .then(() => this.$router.push({ name: 'sign-in' }))
    },
  },
}
</script>
