<template>
  <span>
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn
          class="header-menu-button"
          depressed
          color="transparent"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in menuItems">
          <v-subheader
            v-if="item.header"
            :key="`h-${index}`"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="`d-${index}`"
            :inset="item.inset"
          ></v-divider>

          <v-list-item
            v-else
            :key="`i-${index}`"
            :disabled="item.disabled"
            :to="item.route ? { name: item.route } : null"
            exact
          >
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </template>
        <v-divider v-if="menuItems.length"></v-divider>
        <v-list-item :to="{ name: 'settings' }">{{
          $t('Settings')
        }}</v-list-item>
        <v-list-item :disabled="!loggedIn" @click="signOut">{{
          $t('logout')
        }}</v-list-item>
        <v-divider></v-divider>
        <v-list-item dense class="version-number">
          v3.0.1
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog.show">
      <v-card>
        <v-card-title class="headline" v-text="dialog.title" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.show = false">
            {{ $t('Close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data: function() {
    return {
      dialog: {
        show: false,
        title: 'notification',
      },
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
  methods: {
    signOut() {
      this.$store
        .dispatch('auth/signOut')
        .then(() => this.$router.push({ name: 'sign-in' }))
    },
  },
}
</script>

<style lang="scss" scoped>
.header-menu-button {
  min-width: 12px !important;
  padding: 0 4px !important;
}
.version-number {
  min-height: 20px !important;
  max-height: 20px !important;
  padding-top: 8px !important;
  font-size: 11px !important;
  color: $color-grey-light !important;
}
</style>
