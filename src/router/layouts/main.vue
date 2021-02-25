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
                src="@assets/img/beep-logo-black.svg"
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
            class="ml-n2"
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
          >
            <span v-if="tab.title">{{ tab.title }}</span>
            <v-icon v-if="tab.icon" size="20px">{{ tab.icon }}</v-icon>
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
  </div>
</template>

<script>
import Api from '@api/Api'
import LocaleChanger from '@components/locale-changer.vue'
import { mapGetters } from 'vuex'
import NavDrawer from '@components/nav-drawer.vue'
import PlusMenu from '@components/plus-menu.vue'

export default {
  components: {
    LocaleChanger,
    NavDrawer,
    PlusMenu,
  },
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data: function() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters('devices', ['devices', 'devicesPresent']),
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
            title: this.$i18n.t('diary'),
            icon: 'mdi-calendar-edit',
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
            title: this.$i18n.tc('alert', 2),
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
            title: this.$i18n.t('diary'),
            icon: 'mdi-calendar-edit',
            route: 'diary',
            exact: true,
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
    this.readDevices()
  },
  methods: {
    async readDevices() {
      // devicesPresent boolean prevents unnecessary API calls to read devices when user has none
      if (this.devicesPresent && this.devices.length === 0) {
        try {
          const response = await Api.readRequest('/devices')
          const devicesPresent = response.data.length > 0
          this.$store.commit('devices/setData', {
            prop: 'devices',
            value: response.data,
          })
          this.$store.commit('devices/setData', {
            prop: 'devicesPresent',
            value: devicesPresent,
          })
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
          if (error.response.data === 'no_devices_found') {
            this.$store.commit('devices/setData', {
              prop: 'devicesPresent',
              value: false,
            })
            this.$store.commit('devices/setData', {
              prop: 'devices',
              value: [],
            })
          }
        }
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
