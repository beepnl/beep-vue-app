<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-btn icon :loading="loading">
        <v-icon>mdi-nfc</v-icon>
      </v-btn>

      <template v-if="!searchShown">
        <v-toolbar-title>BEEP</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>

      <v-text-field
        v-else
        autofocus
        clearable
        light
        solo
        flat
        hide-details
        placeholder="Search for hives, actions..."
        @blur="searchShown = false"
      ></v-text-field>

      <AppMenu></AppMenu>

      <template v-slot:extension>
        <TabBar :tabs="tabs"></TabBar>
      </template>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
import AppMenu from '@/components/header/AppMenu'
import TabBar from '@/components/header/TabBar'

export default {
  components: {
    AppMenu,
    TabBar,
  },

  data: () => ({
    loading: false,
    tabs: [
      {
        title: 'Apiaries',
        route: 'apiaries',
      },
      { title: 'Logbook', route: 'logbook' },
      { title: 'Sensors', route: 'sensors' },
      { icon: 'mdi-image-multiple', route: 'photos' },
    ],

    searchShown: false,
  }),
  methods: {
    showSearch() {
      this.searchShown = !this.searchShown
    },
  },
}
</script>

<style scoped lang="scss"></style>
