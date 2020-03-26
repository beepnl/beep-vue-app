<template>
  <Layout>
    <Transition appear>
      <v-progress-circular size="50" color="primary" indeterminate />
    </Transition>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
  components: { Layout },
}
</script>
