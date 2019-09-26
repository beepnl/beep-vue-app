<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.signOut()
  },
  methods: {
    signOut() {
      this.$store.dispatch('user/signOut').then(() => {
        this.$router.push({ name: 'signIn' })
      })
    },
  },
}
</script>

<style scoped></style>
