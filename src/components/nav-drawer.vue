Nav menu

<template>
  <div>
    <v-navigation-drawer
      v-model="showDrawer"
      absolute
      temporary
      right
      class="nav-drawer"
    >
      <div class="nav-drawer-wrapper d-flex flex-column justify-space-between">
        <div>
          <!-- <div class="d-flex flex-row align-end">
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon class="color-grey-medium" @click="showDrawer = false"
                >mdi-close</v-icon
              >
            </v-btn>
          </div> -->
          <v-list two-line flat dense>
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
                  <v-icon color="primary">{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.subtitle
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </div>

            <v-list-item
              v-for="(item, i) in settingItems"
              :key="i"
              exact
              :to="!item.external ? { name: item.route } : ''"
              :target="item.external ? '_blank' : '_self'"
              :disabled="item.authRequired && !loggedIn"
            >
              <v-list-item-avatar>
                <v-icon color="primary">{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item :disabled="!loggedIn" @click="signOut">
              <v-list-item-avatar>
                <v-icon color="primary">mdi-logout-variant</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <div class="d-flex flex-row align-end version-number mt-n2 mr-1">
          <v-spacer></v-spacer>
          v3.0.1
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters('auth', ['userName']),
    settingItems() {
      return [
        {
          icon: 'mdi-key',
          title: this.$i18n.t('Profile'),
          route: 'profile',
          subtitle: this.userName,
          authRequired: true,
        },
        {
          icon: 'mdi-share-variant',
          title: this.$i18n.t('research'),
          route: 'research',
          subtitle: this.$i18n.t('research_consent'),
          authRequired: true,
        },
        {
          icon: 'mdi-format-list-checks',
          title: this.$i18n.tc('Checklist_template', 2),
          route: 'checklists',
          subtitle: this.$i18n.t('checklist_types'),
          authRequired: true,
        },
        {
          icon: 'mdi-cloud-download',
          title: this.$i18n.t('Data_export'),
          route: 'export',
          authRequired: true,
        },
        {
          icon: 'mdi-comment-question-outline',
          title: this.$i18n.t('Support'),
          route: 'support',
          subtitle: 'Helpdesk',
          authRequired: true,
        },
        {
          icon: 'mdi-new-box',
          title: this.$i18n.t('Whats_new'),
          route: 'new',
          subtitle: 'Changelog',
          authRequired: false,
        },
        {
          icon: 'mdi-information-outline',
          title: 'Beep ' + this.$i18n.t('Website'),
          external: true,
          route:
            this.locale === 'nl'
              ? 'https://beep.nl'
              : 'https://beep.nl/home-english',
          authRequired: false,
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
  color: $color-grey-light;
}
</style>
