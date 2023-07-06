<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!warningMessage"
        class="pa-4 pb-0 red--text"
        v-text="warningMessage"
      ></v-card-text>
      <v-card-text
        v-show="!!message && !messageAsHtml"
        class="pa-4"
        v-text="message"
      ></v-card-text>
      <v-card-text
        v-show="!!message && messageAsHtml"
        class="pa-4"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="accent" text @click.native="agree">{{ $t('ok') }}</v-btn>
        <v-btn color="grey" text @click.native="cancel">{{
          $t('Cancel')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * <confirm ref="confirm"></confirm>
 *
 * Call it:
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * Or use await:
 * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 *
 * Alternatively you can place it in main App component and access it globally via this.$root.$confirm
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open
 * }
 */
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    warningMessage: null,
    message: null,
    messageAsHtml: false,
    title: null,
    options: {
      color: 'primary',
      width: 320,
      zIndex: 200,
    },
  }),
  methods: {
    open(
      title,
      message,
      options,
      warningMessage = null,
      messageAsHtml = false
    ) {
      this.dialog = true
      this.title = title
      this.warningMessage = warningMessage
      this.message = message
      this.options = Object.assign(this.options, options)
      this.messageAsHtml = messageAsHtml
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.reject(true)
      this.dialog = false
    },
  },
}
</script>
