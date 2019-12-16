<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item :to="{ name: 'settings' }">
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list-item href="https://beep.nl/support" target="blank">
        <v-list-item-title>Support</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item :to="{ name: 'signOut' }" :disabled="!userIsLoggedIn">
        <v-list-item-title>Sign out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
