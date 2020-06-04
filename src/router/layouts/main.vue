<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        ><img src="@assets/img/beep-logo-black.svg"
      /></v-toolbar-title>
      <v-spacer></v-spacer>

      <LocaleChanger></LocaleChanger>

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

    <v-content class="overflow-y-auto overflow-x-hidden">
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
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data: function() {
    return {
      tabs: [
        {
          title: this.$i18n.tc('Location', 2),
          icon: 'mdi-beehive-outline',
          route: 'home',
        },
        {
          title: this.$i18n.t('diary'),
          icon: 'mdi-calendar-edit',
          route: 'diary',
        },
        {
          title: this.$i18n.t('data'),
          icon: 'mdi-chart-line',
          route: 'measurements',
        },
        {
          title: this.$i18n.tc('photo', 2),
          icon: 'mdi-image-multiple',
          route: 'photos',
        },
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

<style lang="scss">
.v-tabs-bar.v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows):not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none !important;
}
</style>
