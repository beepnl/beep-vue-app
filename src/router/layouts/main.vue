<template>
  <div>
    <v-app-bar app light background-color="#000" color="primary" dense>
      <v-toolbar-title class="d-flex align-self-center"
        ><img src="@assets/img/beep-logo-black.svg"
      /></v-toolbar-title>
      <v-spacer></v-spacer>

      <LocaleChanger class="mr-1"></LocaleChanger>

      <!-- <HeaderMenu :menu-items="menuItems"></HeaderMenu> -->

      <v-app-bar-nav-icon
        class="ml-n3"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!-- <NavDrawer></NavDrawer> -->

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
// import HeaderMenu from '@components/header-menu.vue'
import LocaleChanger from '@components/locale-changer.vue'
import { mapGetters } from 'vuex'
import NavDrawer from '@components/nav-drawer.vue'

export default {
  components: {
    // HeaderMenu,
    LocaleChanger,
    NavDrawer,
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
      if (this.devicesPresent) {
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
          {
            title: this.$i18n.tc('alert', 2),
            icon: 'mdi-alert',
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
      }
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
