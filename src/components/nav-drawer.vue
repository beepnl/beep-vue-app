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
            <v-list-item class="text-black ml-2" @click="showDrawer = false">
              <template v-slot:prepend>
                <div class="beep-list-icon">
                  <v-icon color="black"> mdi-close</v-icon>
                </div>
              </template>
              <v-list-item-title
                ><span class="menu-header top">{{
                  $t('menu')
                }}</span></v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
          </v-list>

          <v-expansion-panels v-model="panel" multiple variant="accordion" flat>
            <v-expansion-panel v-for="(item, i) in panelItems" :key="i" static>
              <v-expansion-panel-title
                v-if="item.children.length === 0 && item.route && item.show"
                :hide-actions="true"
              >
                <v-list variant="flat" density="compact" class="py-0">
                  <v-list-item
                    v-if="item.route !== 'signOut'"
                    :key="'pir' + i"
                    :to="{ name: item.route }"
                    :input-value="false"
                    class="pa-0"
                    @click="checkRoute(item.route)"
                  >
                    <template v-slot:prepend>
                      <div class="beep-list-icon">
                        <v-icon
                          v-if="!item.icon.includes('icon')"
                          color="accent"
                          >{{ item.icon }}</v-icon
                        >
                        <v-sheet
                          v-else
                          :class="`beep-icon beep-${item.icon}`"
                        ></v-sheet>
                      </div>
                    </template>
                    <v-list-item-title
                      ><span class="menu-header">{{
                        item.title
                      }}</span></v-list-item-title
                    >
                  </v-list-item>

                  <v-list-item
                    v-else
                    :key="'ps' + i"
                    class="pa-0"
                    @click="signOut"
                  >
                    <template v-slot:prepend>
                      <div class="beep-list-icon">
                        <v-icon color="accent">{{ item.icon }}</v-icon>
                      </div>
                    </template>
                    <v-list-item-title
                      ><span class="menu-header">{{
                        item.title
                      }}</span></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-expansion-panel-title>

              <v-expansion-panel-title v-else-if="item.title && item.show">
                <div class="beep-list-icon">
                  <v-icon v-if="!item.icon.includes('icon')" color="accent">{{
                    item.icon
                  }}</v-icon>
                  <v-sheet
                    v-else
                    :class="`beep-icon beep-${item.icon}`"
                  ></v-sheet>
                </div>
                <div><span class="menu-header" v-text="item.title"></span></div>
              </v-expansion-panel-title>

              <v-expansion-panel-text
                v-if="item.children.length > 0 && item.show"
              >
                <v-list variant="flat" density="default">
                  <template v-for="(child, c) in item.children">
                    <v-list-item
                      v-if="child.feedback"
                      :key="'feedback item' + c"
                      class="menu-item-nested"
                      :prepend-icon="child.icon"
                      :title="child.title"
                      @click="sendFeedbackMail"
                    >
                    </v-list-item>

                    <v-list-item
                      v-else-if="child.title && child.show"
                      :key="c"
                      class="menu-item-nested"
                      :to="!child.external ? { name: child.route } : ''"
                      :href="child.external ? child.route : ''"
                      :target="child.external ? '_blank' : '_self'"
                      @click="checkRoute(child.route)"
                    >
                      <template v-slot:prepend>
                        <div class="beep-list-icon">
                          <v-icon
                            v-if="!child.icon.includes('icon')"
                            color="accent"
                            >{{ child.icon }}</v-icon
                          >
                          <v-sheet
                            v-else
                            :class="`beep-icon beep-${child.icon}`"
                          ></v-sheet>
                        </div>
                      </template>
                      <v-list-item-title
                        ><span class="menu-child-header">{{
                          child.title
                        }}</span></v-list-item-title
                      >
                    </v-list-item>
                  </template>
                </v-list>
              </v-expansion-panel-text>

              <v-divider
                v-else-if="item.divider && item.show"
                :key="`d-${i}`"
              ></v-divider>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <template v-slot:append>
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
    drawer: {
      type: Boolean,
      compact: false,
      required: true,
    },
  },
  emits: ['update-drawer-value'],
  data() {
    return {
      panel: [],
      appVersion: process.env.VUE_APP_VERSION,
    }
  },
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('devices', ['devices', 'devicesPresent']),
    currentRoute() {
      return this.$route.name
    },
    panelItems() {
      return [
        {
          title: this.$i18n.tc('Hive_short', 2),
          icon: 'mdi-home-analytics',
          route: 'home',
          show: true,
          children: [],
        },
        {
          title: this.$i18n.tc('Inspection', 2),
          icon: 'mdi-file-document-edit-outline',
          show: true,
          children: [
            {
              title: this.$i18n.tc('Inspection', 2),
              icon: 'mdi-file-document-edit-outline',
              route: 'diary',
              show: true,
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
          ],
        },
        {
          title: this.$i18n.t('data'),
          icon: 'mdi-chart-line',
          show: true,
          children: [
            {
              title: this.$i18n.t('data'),
              icon: 'mdi-chart-line',
              route: 'measurements',
              show: true,
            },
            {
              icon: 'mdi-cloud-download',
              title: this.$i18n.t('Data_export'),
              route: 'export',
              show: true,
            },
            {
              icon: 'icon-beep-base ml-n1',
              title: this.$i18n.t('Log_data_import'),
              route: 'import',
              show: this.userHasBeepBase,
            },
            {
              icon: 'icon-sensors--no-outline --accent',
              title: this.$i18n.tc('device', 2),
              route: 'devices',
              show: true,
            },
          ],
        },
        {
          title: this.$i18n.tc('Alert', 2),
          icon: 'mdi-bell',
          show: this.devices.length > 0,
          children: [
            {
              title: this.$i18n.tc('Alert', 2),
              icon: 'mdi-bell',
              route: 'alerts',
              show: true,
            },
            {
              icon: 'mdi-cog',
              title: this.$i18n.tc('Alertrule', 2),
              route: 'alertrules',
              show: true,
            },
          ],
        },
        {
          divider: true,
          children: [],
          show: this.permissions.includes('dashboard'),
        },
        {
          icon: 'mdi-monitor-dashboard',
          title: this.$i18n.tc('Dashboard', 2),
          route: 'dashboards',
          show: this.permissions.includes('dashboard'),
          children: [],
        },
        {
          divider: true,
          children: [],
          show: true,
        },
        {
          icon: 'mdi-school',
          title: this.$i18n.t('research'),
          route: 'research',
          show: true,
          children: [],
        },
        {
          divider: true,
          children: [],
          show: true,
        },
        {
          icon: 'mdi-information',
          title: this.$i18n.t('info'),
          show: true,
          children: [
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
          ],
        },
        {
          divider: true,
          children: [],
          show: true,
        },
        {
          icon: 'mdi-account',
          title: this.$i18n.t('Profile'),
          route: 'profile',
          show: true,
          children: [],
        },
        {
          divider: true,
          children: [],
          show: true,
        },
        {
          icon: 'mdi-logout-variant',
          title: this.$i18n.t('logout'),
          route: 'signOut',
          show: true,
          children: [],
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

.menu-header {
  font-size: 14px !important;
  font-weight: bold;
  color: $color-black;

  &.top {
    color: $color-black;
  }
}

.menu-child-header {
  color: $color-black;
}

.menu-item-nested {
  padding: 0 4px !important;
}

.version-number {
  width: calc(100% - 12px);
  margin-right: 12px;
  font-size: 11px !important;
}
</style>
