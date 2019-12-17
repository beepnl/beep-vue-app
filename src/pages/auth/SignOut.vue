<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.signOut()
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('auth/signOut')
      await this.$router.push({ name: 'signIn' })
    },
  },
}
</script>

<style scoped></style>
