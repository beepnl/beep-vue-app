<template>
  <div>
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      location="right"
      class="nav-drawer"
    >
      <div class="nav-drawer-wrapper d-flex flex-column justify-space-between">
        <div>
          <v-list variant="flat" density="default">
            <v-list-item
              class="text-black"
              prepend-icon="mdi-close"
              :title="$t('menu')"
              @click="showDrawer = false"
            >
            </v-list-item>
            <v-divider></v-divider>
            <div v-if="menuItems.length > 0">
              <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                exact
                :to="!item.external ? { name: item.route } : ''"
                :target="item.external ? '_blank' : '_self'"
                :title="item.title"
                class="text-black"
                @click="checkRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    v-if="!item.icon.includes('icon')"
                    :icon="item.icon"
                    class="text-accent"
                  ></v-icon>
                </template>
              </v-list-item>

              <v-divider></v-divider>
            </div>

            <template v-for="(item, i) in settingItems" :key="i">
              <v-list-item
                v-if="item.title && item.show"
                exact
                :to="!item.external ? { name: item.route } : ''"
                :href="item.external ? item.route : ''"
                :target="item.external ? '_blank' : '_self'"
                :title="item.title"
                class="text-black"
                @click="checkRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    v-if="!item.icon.includes('icon')"
                    :icon="item.icon"
                    class="text-accent"
                  >
                  </v-icon>
                  <div v-else class="beep-list-icon">
                    <v-sheet
                      :class="`beep-icon beep-${item.icon} text-accent`"
                    ></v-sheet>
                  </div>
                </template>
              </v-list-item>

              <v-divider v-else-if="item.divider" :key="`d-${i}`"></v-divider>
            </template>

            <v-list-item
              class="text-black"
              :title="$t('logout')"
              @click="signOut"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-logout-variant" class="text-accent"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <template v-slot:append>
        <!-- <div class="pa-2">
          <v-btn block prepend-icon="mdi-logout-variant" @click="signOut">
            {{ $t('logout') }}
          </v-btn>
        </div> -->
        <div class="d-flex justify-space-between version-number">
          <v-spacer></v-spacer>
          <span v-text="'v' + appVersion"></span>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { readDevicesIfNotChecked } from '@mixins/methodsMixin'

export default {
  mixins: [readDevicesIfNotChecked],
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    drawer: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('devices', ['devices', 'devicesPresent']),
    currentRoute() {
      return this.$route.name
    },
    settingItems() {
      return [
        {
          icon: 'mdi-account',
          title: this.$i18n.t('Profile'),
          route: 'profile',
          show: true,
        },
        {
          icon: 'icon-sensors--no-outline',
          title: this.$i18n.tc('device', 2),
          route: 'devices',
          show: true,
        },
        {
          icon: 'mdi-bell',
          title: this.$i18n.tc('Alertrule', 2),
          route: 'alertrules',
          show: true,
        },
        {
          icon: 'mdi-cloud-download',
          title: this.$i18n.t('Data_export'),
          route: 'export',
          show: true,
        },
        {
          icon: 'icon-beep-base',
          title: this.$i18n.t('Log_data_import'),
          route: 'import',
          show: this.userHasBeepBase,
        },
        {
          icon: 'mdi-format-list-checks',
          title: this.$i18n.tc('Checklist_template', 2),
          route: 'checklists',
          show: true,
        },
        {
          icon: 'mdi-qrcode',
          title: this.$i18n.tc('Hivetag', 2),
          route: 'hivetags',
          show: true,
        },
        {
          icon: 'mdi-monitor-dashboard',
          title: this.$i18n.tc('Dashboard', 2),
          route: 'dashboards',
          show: this.permissions.includes('dashboard'),
        },
        {
          icon: 'mdi-school',
          title: this.$i18n.t('research'),
          route: 'research',
          show: true,
        },
        {
          divider: true,
        },
        {
          icon: 'mdi-comment-question-outline',
          title: this.$i18n.t('Support'),
          external: true,
          route:
            this.locale !== 'sv'
              ? 'https://beepsupport.freshdesk.com/' +
                this.locale +
                (this.locale === 'pt' ? '-PT' : '') +
                '/support/solutions'
              : 'https://beepsupport.freshdesk.com/en/support/solutions',
          show: true,
        },
        {
          icon: 'mdi-new-box',
          title: this.$i18n.t('Whats_new'),
          route: 'new',
          show: true,
        },
        {
          icon: 'mdi-information-outline',
          title: 'BEEP ' + this.$i18n.t('Website'),
          external: true,
          route:
            this.locale === 'nl'
              ? 'https://beep.nl'
              : 'https://beep.nl/home-english',
          show: true,
        },
        {
          divider: true,
        },
      ]
    },
    // can't use drawer prop directly because v-model will mutate it directly which is not allowed
    showDrawer: {
      get() {
        return this.drawer
      },
      set(value) {
        this.$emit('update-drawer-value', value)
      },
    },
    userHasBeepBase() {
      if (this.devices.length > 0) {
        return (
          this.devices.filter((device) => device.type === 'beep').length > 0
        )
      } else {
        return false
      }
    },
    locale() {
      return this.$i18n.locale
    },
  },
  created() {
    this.readDevicesIfNotChecked()
  },
  methods: {
    checkRoute(routeName) {
      if (routeName === this.currentRoute) {
        this.showDrawer = false
      }
    },
    signOut() {
      this.$store
        .dispatch('auth/signOut')
        .then(() => this.$router.push({ name: 'sign-in' }))
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-drawer,
.nav-drawer-wrapper {
  height: 100% !important;
  top: 0 !important;
}
.version-number {
  width: calc(100% - 12px);
  margin-right: 12px;
  font-size: 11px !important;
}
</style>
