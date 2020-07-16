<template>
  <Layout>
    <h1 :class="$style.title">
      {{ $t('sorry') + ', ' }}
      <span v-if="resource">
        {{ $tc(resource, 1) }}
      </span>
      <span v-else>
        {{ $tc('page', 1) }}
      </span>
      {{ $t('not_found') }}
    </h1>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'

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

<style lang="scss" module>
.title {
  padding-top: 40px;
  text-align: center;
}
</style>
