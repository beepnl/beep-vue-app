<template>
  <v-card>
    Dashboard
    {{ jwt }}
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ jwt: 'Auth/jwt' }),
  },
}
</script>

<style scoped></style>
