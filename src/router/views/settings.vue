<template>
  <Layout title="Settings">
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
    items: [
      {
        icon: 'mdi-key',
        title: 'Profile',
        route: 'profile',
        subtitle: 'email, research consent, privacy',
      },
      {
        icon: 'mdi-account-multiple',
        title: 'Collaboration Groups',
        subtitle: 'members and sharing',
      },
      {
        icon: 'mdi-format-list-checks',
        title: 'Checklist templates',
        subtitle: 'personal, shared, research',
      },
      {
        icon: 'mdi-cloud-download',
        title: 'Data export',
        subtitle: 'JSON, CSV',
      },
      {
        icon: 'mdi-help-circle-outline',
        title: 'Help',
        subtitle: 'FAQ, BEEP website, support ',
      },
    ],
  }),
}
</script>
