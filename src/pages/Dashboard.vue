<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-progress-linear
        :indeterminate="$store.state.isLoading"
        :active="$store.state.isLoading"
        absolute
        top
        color="white"
      ></v-progress-linear>
      <v-btn icon :loading="loading">
        <v-icon>mdi-nfc</v-icon>
      </v-btn>

      <v-toolbar-title>BEEP</v-toolbar-title>
      <v-spacer></v-spacer>

      <HeaderMenu :menu-items="menuItems"></HeaderMenu>

      <template v-slot:extension>
        <v-tabs
          v-model="activeTab"
          icons-and-text
          dark
          background-color="transparent"
        >
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
import HeaderMenu from '@/components/header/HeaderMenu'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeaderMenu,
  },

  data: function() {
    return {
      loading: false,
      activeTab: null,
      tabs: [
        {
          title: 'Apiaries',
          icon: 'mdi-beehive-outline',
          route: 'apiaries',
        },
        { title: 'Plan', icon: 'mdi-calendar-edit', route: 'plan' },
        { title: 'Log', icon: 'mdi-chart-line', route: 'log' },
        { title: 'Photos', icon: 'mdi-image-multiple', route: 'photos' },
      ],
      menuItems: [
        { title: 'Add apiary', route: false },
        { divider: true },
        { title: 'Settings', route: 'settings' },
        {
          title: 'Sign out',
          route: 'signOut',
          disabled: !this.userIsLoggedIn,
        },
      ],
      searchShown: false,
    }
  },
  computed: {
    ...mapGetters({
      userIsLoggedIn: 'auth/userIsLoggedIn',
    }),
  },
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
