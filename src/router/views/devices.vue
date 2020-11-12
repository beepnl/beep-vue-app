<template>
  <Layout :title="`${$tc('device', 2)}`">
    <v-toolbar class="save-bar" dense light>
      <v-spacer></v-spacer>
      <v-btn tile outlined class="mr-1" color="primary">
        <v-icon left>mdi-cog</v-icon>{{ $t('edit') }}</v-btn
      >
    </v-toolbar>

    <v-container class="content-container">
      <div class="overline mb-3" v-text="$tc('device', 2)"></div>
      <v-card v-for="device in ownedDevices" :key="device" outlined>
        <v-card-text>{{ device }}</v-card-text>
      </v-card>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'

export default {
  components: { Confirm, Layout },
  data() {
    return {
      devices: [],
    }
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    ownedDevices() {
      return this.devices.filter((device) => {
        return device.owner
      })
    },
  },
  created() {
    this.getDevices()
  },
  methods: {
    async getDevices() {
      try {
        const response = await Api.readRequest('/devices')
        this.devices = response.data
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
