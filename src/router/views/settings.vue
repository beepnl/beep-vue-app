<template>
  <Layout :title="`${$t('settings_title')}`">
    <v-list two-line flat>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        exact
        :href="item.external ? item.route : ''"
        :to="!item.external ? { name: item.route } : ''"
        :target="item.external ? '_blank' : '_self'"
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
          route: 'checklists',
          subtitle: 'personal, shared, research',
        },
        {
          icon: 'mdi-cloud-download',
          title: this.$i18n.t('Data_export'),
          route: 'export',
        },
        {
          icon: 'mdi-comment-question-outline',
          title: this.$i18n.t('Support'),
          route: 'support',
          subtitle: 'Helpdesk',
        },
        {
          icon: 'mdi-new-box',
          title: this.$i18n.t('Whats_new'),
          route: 'new',
          subtitle: 'Changelog',
        },
        {
          icon: 'mdi-information-outline',
          title: 'Beep ' + this.$i18n.t('Website'),
          external: true,
          route:
            this.locale === 'nl'
              ? 'https://beep.nl'
              : 'https://beep.nl/home-english',
        },
      ]
    },
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>
