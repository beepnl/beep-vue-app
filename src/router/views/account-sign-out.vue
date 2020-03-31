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
      this.$store
        .dispatch('auth/signOut')
        .then(() => this.$router.push({ name: 'sign-in' }))
    },
  },
}
</script>
