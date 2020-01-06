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

    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="orange darken-2 accent-4"
    ></v-progress-linear>

    <v-spacer></v-spacer>

    <HeaderMenu v-if="menuItems.length" :menu-items="menuItems"></HeaderMenu>
  </v-app-bar>
</template>

<script>
import HeaderMenu from '@/components/header/HeaderMenu'
export default {
  components: {
    HeaderMenu,
  },
  data: function() {
    return {
      // TODO: move to prop and activate via global router hooks
      loading: true,
    }
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
  mounted() {
    this.loading = false
  },
  methods: {
    back: function() {
      this.$router.go(-1)
    },
  },
}
</script>
