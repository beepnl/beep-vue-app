<template>
  <Layout :title="`${$t('settings_title')}`">
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon color="primary">mdi-nfc</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>BEEP HQ</v-list-item-title>
          <v-list-item-subtitle>Driebergen</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line flat>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        exact
        :to="{ name: item.route }"
      >
        <v-list-item-avatar>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'
export default {
  components: { Layout },
  data: () => ({
    settings: [],
  }),
  computed: {
    items: function() {
      return [
        {
          icon: 'mdi-key',
          title: this.$i18n.t('Profile'),
          route: 'profile',
        },
        {
          icon: 'mdi-share-variant',
          title: this.$i18n.t('research'),
          route: 'research',
          subtitle: 'research consent',
        },
        {
          icon: 'mdi-format-list-checks',
          title: this.$i18n.tc('Checklist_template', 2),
          subtitle: 'personal, shared, research',
        },
        {
          icon: 'mdi-cloud-download',
          title: this.$i18n.t('Data_export'),
          route: 'export',
        },
        {
          icon: 'mdi-help-circle-outline',
          title: this.$i18n.t('Help'),
          subtitle: 'FAQ, BEEP website, support ',
        },
      ]
    },
  },
}
</script>
