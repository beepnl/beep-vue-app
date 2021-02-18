Nav menu

<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    right
    class="nav-drawer"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    drawer: {
      type: Boolean,
      default: false,
      required: false, // TODO: change to true after it has been edited everywhere!
    },
  },
  data: function() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
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
.nav-drawer {
  height: 100vh !important;
}
.version-number {
  min-height: 20px !important;
  max-height: 20px !important;
  padding-top: 8px !important;
  font-size: 11px !important;
}
</style>
