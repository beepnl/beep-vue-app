<template>
  <div>
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

      <LocaleChanger></LocaleChanger>
      <HeaderMenu v-if="menuItems.length" :menu-items="menuItems"></HeaderMenu>
    </v-app-bar>
    <v-content>
      <slot></slot>
    </v-content>
  </div>
</template>

<script>
import HeaderMenu from '@components/header-menu.vue'
import LocaleChanger from '@components/locale-changer.vue'

export default {
  components: {
    HeaderMenu,
    LocaleChanger,
  },
  props: {
    title: {
      type: String,
      default: 'Back', // () => this.$i18n.t('back') werkt niet, ook niet via created hook,
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
