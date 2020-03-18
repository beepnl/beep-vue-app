---
to: "src/router/views/<%= h.changeCase.pascal(name) %>.vue"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.pascal(fileName)
  const titleName = h.changeCase.title(name)
%><script>
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: '<%= titleName %>',
    meta: [{ name: 'description', content: 'The <%= titleName %> page.' }],
  },
  components: { Layout }
}
</script>

<template>
  <Layout>
    <%= titleName %>
  </Layout>
</template>
<%

<style lang="scss" module>
@import '@design';
</style>
