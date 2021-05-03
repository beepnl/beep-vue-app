<template>
  <div>
    <v-navigation-drawer
      v-model="showDrawer"
      fixed
      temporary
      right
      class="nav-drawer"
    >
      <div class="nav-drawer-wrapper d-flex flex-column justify-space-between">
        <div>
          <v-list flat dense>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="black" @click="showDrawer = false"
                  >mdi-close</v-icon
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('menu') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <div v-if="menuItems.length > 0">
              <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                exact
                :to="!item.external ? { name: item.route } : ''"
                :target="item.external ? '_blank' : '_self'"
                :disabled="item.authRequired && !loggedIn"
              >
                <v-list-item-avatar>
                  <v-icon color="accent">{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </div>

            <template v-for="(item, i) in settingItems">
              <v-list-item
                v-if="item.title"
                :key="i"
                exact
                :to="!item.external ? { name: item.route } : ''"
                :href="item.external ? item.route : ''"
                :target="item.external ? '_blank' : '_self'"
                :disabled="item.authRequired && !loggedIn"
              >
                <v-list-item-avatar>
                  <v-icon v-if="!item.icon.includes('icon')" color="accent">{{
                    item.icon
                  }}</v-icon>
                  <div v-else>
                    <v-sheet
                      :class="`beep-icon beep-${item.icon} primary--text`"
                    ></v-sheet>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider v-else-if="item.divider" :key="`d-${i}`"></v-divider>
            </template>

            <v-list-item :disabled="!loggedIn" @click="signOut">
              <v-list-item-avatar>
                <v-icon color="accent">mdi-logout-variant</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <div class="d-flex flex-row align-end version-number mt-n2 mr-1">
          <v-spacer></v-spacer>
          v3.0.10
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
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
  computed: {
    settingItems() {
      return [
        {
          icon: 'mdi-account',
          title: this.$i18n.t('Profile'),
          route: 'profile',
          authRequired: true,
        },
        {
          icon: 'icon-sensors--no-outline',
          title: this.$i18n.tc('device', 2),
          route: 'devices',
          authRequired: true,
        },
        {
          icon: 'mdi-bell',
          title: this.$i18n.t('alertrule_pagetitle'),
          route: 'alertrules',
          authRequired: true,
        },
        {
          icon: 'mdi-cloud-download',
          title: this.$i18n.t('Data_export'),
          route: 'export',
          authRequired: true,
        },
        {
          icon: 'mdi-format-list-checks',
          title: this.$i18n.tc('Checklist_template', 2),
          route: 'checklists',
          authRequired: true,
        },
        {
          icon: 'mdi-school',
          title: this.$i18n.t('research'),
          route: 'research',
          authRequired: true,
        },
        {
          divider: true,
        },
        {
          icon: 'mdi-comment-question-outline',
          title: this.$i18n.t('Support'),
          route: 'support',
          authRequired: true,
        },
        {
          icon: 'mdi-new-box',
          title: this.$i18n.t('Whats_new'),
          route: 'new',
          authRequired: false,
        },
        {
          icon: 'mdi-information-outline',
          title: 'BEEP ' + this.$i18n.t('Website'),
          external: true,
          route:
            this.locale === 'nl'
              ? 'https://beep.nl'
              : 'https://beep.nl/home-english',
          authRequired: false,
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
    locale() {
      return this.$i18n.locale
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
  methods: {
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
  height: 100vh !important;
}
.version-number {
  font-size: 11px !important;
}
</style>
