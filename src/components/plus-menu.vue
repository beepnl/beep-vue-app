<template>
  <span>
    <v-menu bottom right>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon class="color-black">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in plusItems">
          <v-list-item
            :key="`i-${index}`"
            :to="item.route ? { name: item.route } : null"
            :disabled="!loggedIn"
            exact
          >
            <v-list-item-icon class="mr-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import { readDevicesIfNotPresent } from '@mixins/methodsMixin'

export default {
  mixins: [readDevicesIfNotPresent],
  computed: {
    ...mapGetters('devices', ['devices']),
    plusItems() {
      if (this.devices.length > 0) {
        return [
          {
            icon: 'mdi-file-document-edit-outline',
            title: this.$i18n.t('New') + ' ' + this.$i18n.tc('inspection', 1),
            route: 'inspect',
          },
          {
            icon: 'mdi-archive',
            title: this.$i18n.t('New') + ' ' + this.$i18n.tc('hive', 1),
            route: 'hive-create',
          },
          {
            icon: 'mdi-home-analytics',
            title: this.$i18n.t('new_apiary'),
            route: 'apiary-create',
          },
          {
            icon: 'mdi-account-multiple',
            title: this.$i18n.t('new_group'),
            route: 'group-create',
          },
          {
            icon: 'mdi-bell',
            title: this.$i18n.t('New') + ' ' + this.$i18n.tc('alertrule', 1),
            route: 'alertrule-create',
          },
        ]
      } else {
        return [
          {
            icon: 'mdi-file-document-edit-outline',
            title: this.$i18n.t('New') + ' ' + this.$i18n.tc('inspection', 1),
            route: 'inspect',
          },
          {
            icon: 'mdi-archive',
            title: this.$i18n.t('New') + ' ' + this.$i18n.tc('hive', 1),
            route: 'hive-create',
          },
          {
            icon: 'mdi-home-analytics',
            title: this.$i18n.t('new_apiary'),
            route: 'apiary-create',
          },
          {
            icon: 'mdi-account-multiple',
            title: this.$i18n.t('new_group'),
            route: 'group-create',
          },
        ]
      }
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
  },
  created() {
    this.readDevicesIfNotPresent()
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
