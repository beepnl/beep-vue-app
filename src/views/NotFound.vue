<template>
  <div>No route found for path {{ requestedRoute }}</div>
</template>

<script>
export default {
  computed: {
    requestedRoute() {
      return this.$route.fullPath
    },
  },
}
</script>

<style scoped></style>
