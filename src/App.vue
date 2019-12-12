<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        Beep App
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="userIsLoggedIn" text @click="signOut">Sign out</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    signOut() {
      console.log('test')
      this.$router.push({ name: 'signOut' })
    },
  },
  computed: {
    ...mapGetters(['userIsLoggedIn']),
  },
}
</script>

<style lang="scss"></style>
