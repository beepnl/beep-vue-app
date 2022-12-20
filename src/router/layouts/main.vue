<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <v-app-bar app light background-color="#000" color="primary" dense>
      <div
        class="d-flex flex-row justify-space-between align-center"
        style="width:100%;"
      >
        <div
          class="d-flex flex-row justify-start align-center"
          style="width: 48%;"
        >
          <router-link :to="{ name: 'home' }">
            <v-toolbar-title class="d-flex align-self-center"
              ><img
                :src="assetsUrl + '/img/beep-logo-black.svg'"
                @click="clearHiveFilters"
            /></v-toolbar-title>
          </router-link>
        </div>

        <div class="d-flex justify-center" style="width: 4%">
          <PlusMenu></PlusMenu>
        </div>

        <div class="d-flex justify-end align-center mr-n3" style="width: 48%;">
          <LocaleChanger></LocaleChanger>

          <v-app-bar-nav-icon
            class="color-black ml-n2"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </div>

      <template v-slot:extension>
        <v-tabs
          icons-and-text
          dense
          light
          grow
          background-color="#F8B133"
          color="#000"
          height="48px"
        >
          <v-tab
            v-for="(tab, i) in tabs"
            :key="i"
            :to="{ name: tab.route }"
            :exact="tab.exact"
            @click="reloadData(tab.route)"
          >
            <span v-if="tab.title">{{ tab.title }}</span>
            <v-badge
              v-if="tab.route === 'alerts' && alerts.length > 0"
              overlap
              color="red"
              :content="alerts.length"
            >
              <v-icon v-if="tab.icon" size="20px">{{ tab.icon }}</v-icon>
            </v-badge>
            <v-icon v-else size="20px">{{ tab.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <NavDrawer
      :menu-items="menuItems"
      :drawer="drawer"
      @update-drawer-value="drawer = $event"
    ></NavDrawer>

    <v-main>
      <slot></slot>
    </v-main>

    <PWAPrompt
      :timesToShow="2"
      :copyTitle="$t('pwa_title')"
      :copyBody="$t('pwa_body')"
      :copyShareButtonLabel="$t('pwa_share_button_label')"
      :copyAddHomeButtonLabel="$t('pwa_addhome_button_label')"
      :copyClosePrompt="$t('Cancel')"
    />
  </div>
</template>

<script>
import LocaleChanger from '@components/locale-changer.vue'
import { mapGetters } from 'vuex'
import NavDrawer from '@components/nav-drawer.vue'
import PlusMenu from '@components/plus-menu.vue'
import {
  checkAlerts,
  readApiariesAndGroups,
  readDevicesIfNotPresent,
  readGeneralInspections,
} from '@mixins/methodsMixin'
import PWAPrompt from 'vue2-ios-pwa-prompt'

export default {
  components: {
    LocaleChanger,
    NavDrawer,
    PlusMenu,
    PWAPrompt,
  },
  mixins: [
    checkAlerts,
    readApiariesAndGroups,
    readDevicesIfNotPresent,
    readGeneralInspections,
  ],
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data: function() {
    return {
      drawer: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('devices', ['devices']),
    tabs: function() {
      if (this.devices.length > 0) {
        return [
          {
            title: this.$i18n.tc('Hive_short', 2),
            icon: 'mdi-home-analytics',
            route: 'home',
            exact: true,
          },
          {
            title: this.$i18n.tc('Inspection', 2),
            icon: 'mdi-file-document-edit-outline',
            route: 'diary',
            exact: false,
          },
          {
            title: this.$i18n.t('data'),
            icon: 'mdi-chart-line',
            route: 'measurements',
            exact: false,
          },
          {
            title: this.$i18n.tc('Alert', 2),
            icon: 'mdi-bell',
            route: 'alerts',
            exact: false,
          },
        ]
      } else {
        return [
          {
            title: this.$i18n.tc('Hive_short', 2),
            icon: 'mdi-home-analytics',
            route: 'home',
            exact: true,
          },
          {
            title: this.$i18n.tc('Inspection', 2),
            icon: 'mdi-file-document-edit-outline',
            route: 'diary',
            exact: false,
          },
          {
            title: this.$i18n.t('data'),
            icon: 'mdi-chart-line',
            route: 'measurements',
            exact: false,
          },
        ]
      }
    },
  },
  created() {
    this.readDevicesIfNotPresent()
  },
  methods: {
    reloadData(route) {
      if (route === 'alerts') {
        this.checkAlertRulesAndAlerts()
      } else if (route === 'diary') {
        this.readGeneralInspections()
      } else if (route === 'home') {
        this.checkAlertRulesAndAlerts()
        this.readApiariesAndGroups()
      }
    },
    clearHiveFilters() {
      this.$store.commit('locations/clearFilters')
    },
    updateRoute(val) {
      this.$router.push(val) // respond to tab swipes
    },
  },
}
</script>

<style lang="scss">
header.v-app-bar {
  z-index: 2;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

.v-toolbar__content {
  padding: 4px 10px !important;
}

.v-tabs-bar.v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows):not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none !important;
}
</style>
