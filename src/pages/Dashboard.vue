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
        <v-tabs v-model="activeTab" grow dark background-color="transparent">
          <v-tab v-for="(tab, i) in tabs" :key="i" :to="tab.route">
            <span v-if="tab.title">{{ tab.title }}</span>
            <v-icon v-if="tab.icon">{{ tab.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items v-model="activeTab" @change="updateRoute">
        <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="tab.route">
          <router-view v-if="tab.route === $route.name" />
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </div>
</template>

<script>
import AppMenu from '@/components/header/AppMenu'

export default {
  components: {
    AppMenu,
  },

  data: () => ({
    loading: false,
    activeTab: null,
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
    updateRoute(val) {
      this.$router.push(val) // respond to tab swipes
    },
    showSearch() {
      this.searchShown = !this.searchShown
    },
  },
}
</script>

<style scoped lang="scss"></style>
