<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        Beep
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="user" text @click="signOut">Sign out</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style lang="scss"></style>
