<template>
  <v-menu location="bottom-right">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" icon v-bind="props">
        <v-icon class="color-black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <template v-for="(item, index) in plusItems">
        <v-list-item
          v-if="item.show"
          :key="`i-${index}`"
          :to="item.route ? { name: item.route } : null"
          :title="item.title"
          @click="item.clickEvent ? item.clickEvent : null"
        >
          <template v-slot:prepend>
            <div class="beep-list-icon">
              <v-icon v-if="!item.icon.includes('icon')">{{
                item.icon
              }}</v-icon>
              <v-sheet v-else :class="`beep-icon beep-${item.icon}`"></v-sheet>
            </div>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
import { nativeAppMethods } from '@mixins/methodsMixin'
import { mapGetters } from 'vuex'

export default {
  mixins: [nativeAppMethods],
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('devices', ['devices']),
    plusItems() {
      return [
        {
          icon: 'mdi-file-document-edit-outline',
          title: this.$i18n.t('New_inspection'),
          route: 'inspect',
          show: true,
        },
        {
          icon: 'mdi-archive',
          title: this.$i18n.t('New_hive'),
          route: 'hive-create',
          show: true,
        },
        {
          icon: 'icon-beep-base --grey ml-n1',
          title: this.$i18n.t('New_beep_base'),
          show: this.appIsNative,
          clickEvent: this.postNativeAppMessage('NewBeepBase'),
        },
        {
          icon: 'mdi-home-analytics',
          title: this.$i18n.t('new_apiary'),
          route: 'apiary-create',
          show: true,
        },
        {
          icon: 'mdi-account-multiple',
          title: this.$i18n.t('new_group'),
          route: 'group-create',
          show: true,
        },
        {
          icon: 'mdi-monitor-dashboard',
          title: this.$i18n.t('New_dashboard'),
          route: 'dashboard-create',
          show: this.permissions.includes('dashboard'),
        },
        {
          icon: 'mdi-bell',
          title: this.$i18n.t('New_alertrule'),
          route: 'alertrule-create',
          show: this.devices.length > 0,
        },
      ]
    },
  },
  methods: {},
}
</script>
