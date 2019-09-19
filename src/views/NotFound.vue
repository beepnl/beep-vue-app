<template>
  <div>No route found for path {{ requestedRoute }}ss</div>
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
