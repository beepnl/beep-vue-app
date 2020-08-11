<template>
  <div class="loading">
    <Transition appear>
      <v-progress-circular size="50" color="primary" indeterminate />
    </Transition>
  </div>
</template>

<script>
export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}
</style>
