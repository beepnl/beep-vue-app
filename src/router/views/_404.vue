<template>
  <Layout>
    <div class="main-content">
      <h1 class="unauthorized-title">
        {{ $t('sorry') + ', ' }}
        <span v-if="resource">
          {{ $tc(resource, 1) }}
        </span>
        <span v-else>
          {{ $tc('page', 1) }}
        </span>
        {{ $t('not_found') }}
      </h1>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/src/router/layouts/main-layout.vue'

export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  components: { Layout },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  margin: 100px 20px 0;
  text-align: center;
}
</style>
