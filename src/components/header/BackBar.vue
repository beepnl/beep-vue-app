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
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Back',
    },
  },
  methods: {
    back: function() {
      this.$router.go(-1)
    },
  },
}
</script>
