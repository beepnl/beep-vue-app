<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        ><img src="@assets/images/beep-logo-black.svg"
      /></v-toolbar-title>
      <v-spacer></v-spacer>

      <HeaderMenu :menu-items="menuItems"></HeaderMenu>
      <template v-slot:extension>
        <v-tabs icons-and-text dark background-color="transparent">
          <v-tab
            v-for="(tab, i) in tabs"
            :key="i"
            :to="{ name: tab.route }"
            exact
          >
            <span v-if="tab.title">{{ tab.title }}</span>
            <v-icon v-if="tab.icon">{{ tab.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <slot></slot>
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
      default: () => [],
    },
  },
  data: function() {
    return {
      tabs: [
        {
          title: 'Apiaries',
          icon: 'mdi-beehive-outline',
          route: 'home',
        },
        { title: 'Diary', icon: 'mdi-calendar-edit', route: 'diary' },
        { title: 'Data', icon: 'mdi-chart-line', route: 'measurements' },
        { title: 'Photos', icon: 'mdi-image-multiple', route: 'photos' },
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
