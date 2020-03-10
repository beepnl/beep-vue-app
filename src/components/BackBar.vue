<template>
  <v-app-bar app color="primary" dark>
    <slot name="icon">
      <v-btn icon @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </slot>
    <slot name="title">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </slot>

    <v-spacer></v-spacer>

    <HeaderMenu v-if="menuItems.length" :menu-items="menuItems"></HeaderMenu>
  </v-app-bar>
</template>

<script>
import HeaderMenu from '@components/HeaderMenu'
export default {
  components: {
    HeaderMenu,
  },
  props: {
    title: {
      type: String,
      default: 'Back',
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    back: function() {
      this.$router.go(-1)
    },
  },
}
</script>
