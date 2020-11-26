<template>
  <Layout :title="$t('Support')">
    <v-container>
      <iframe
        v-if="locale === 'en'"
        class="support-iframe"
        src="https://beepsupport.freshdesk.com/en/support/solutions"
      ></iframe>
      <iframe
        v-else-if="locale === 'nl'"
        src="https://beepsupport.freshdesk.com/nl/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'fr'"
        src="https://beepsupport.freshdesk.com/fr/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'es'"
        src="https://beepsupport.freshdesk.com/es/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'pt'"
        src="https://beepsupport.freshdesk.com/pt-PT/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'ro'"
        src="https://beepsupport.freshdesk.com/ro/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'de'"
        src="https://beepsupport.freshdesk.com/de/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else-if="locale === 'it'"
        src="https://beepsupport.freshdesk.com/en/support/solutions"
        class="support-iframe"
      ></iframe>
      <iframe
        v-else
        src="https://beepsupport.freshdesk.com/en/support/solutions"
        class="support-iframe"
      ></iframe>
    </v-container>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'

export default {
  components: {
    Layout,
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>

<style lang="scss" scoped>
.support-iframe {
  width: 100%;
  height: 90vh;
  overflow: none;
  border: none;
  scroll-behavior: none;
}
</style>
