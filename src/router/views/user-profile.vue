<template>
  <Layout title="User profile">
    <v-icon>mdi-account</v-icon>
    <h1>
      {{ user.name }}
    </h1>
    <pre>{{ user }}</pre>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'

export default {
  page() {
    return {
      title: this.user.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.user.name}.`,
        },
      ],
    }
  },
  components: { Layout },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
