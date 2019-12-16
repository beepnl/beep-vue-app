<template>
  <v-tabs grow dark background-color="transparent">
    <v-tab v-for="(tab, i) in tabs" :key="i" :to="{ name: tab.route }">
      <span v-if="tab.title">{{ tab.title }}</span>
      <v-icon v-if="tab.icon">{{ tab.icon }}</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [
        {
          title: 'Home',
          route: { name: 'home' },
        },
      ],
    },
  },
}
</script>
