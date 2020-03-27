<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        ><img src="@assets/images/beep-logo-black.svg"
      /></v-toolbar-title>
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
          <slot>
            <router-view v-if="tab.route === $route.name" />
          </slot>
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </div>
</template>

<script>
import HeaderMenu from '@components/header-menu.vue'

export default {
  components: {
    HeaderMenu,
  },
  props: {
    menuItems: {
      type: Array,
      default: () => [
        {
          title: 'settings',
          to: '/settings',
        },
      ],
    },
  },
  data: function() {
    return {
      activeTab: null,
      tabs: [
        {
          title: 'Apiaries',
          icon: 'mdi-beehive-outline',
          to: '/apiaries',
        },
        { title: 'Diary', icon: 'mdi-calendar-edit', to: '/diary' },
        { title: 'Data', icon: 'mdi-chart-line', to: '/measurements' },
        { title: 'Photos', icon: 'mdi-image-multiple', to: '/photos' },
      ],
    }
  },
  methods: {
    updateRoute(val) {
      this.$router.push(val) // respond to tab swipes
    },
  },
}
</script>
