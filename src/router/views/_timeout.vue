<template>
  <Layout v-if="offlineConfirmed">
    <h1 class="unauthorized-title">
      The page timed out while loading. Are you sure you're still connected to
      the Internet?
    </h1>
  </Layout>
  <LoadingView v-else />
</template>

<script>
import Api from '@api/Api'
import LoadingView from './_loading.vue'
import Layout from '@/src/router/layouts/main-layout.vue'

export default {
  page: {
    title: 'Page timeout',
    meta: [
      { name: 'description', content: 'The page timed out while loading.' },
    ],
  },
  components: { Layout, LoadingView },
  data() {
    return {
      offlineConfirmed: false,
    }
  },
  beforeCreate() {
    Api.checkConnection()
      .then(() => {
        window.location.reload()
      })
      .catch(() => {
        this.offlineConfirmed = true
      })
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
