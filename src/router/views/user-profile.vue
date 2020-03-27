<template>
  <Layout>
    <h1>
      <v-icon name="mdi-account" />
      {{ user.name }}
      Profile
    </h1>
    <pre>{{ user }}</pre>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

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
