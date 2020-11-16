<template>
  <Layout :title="`${$tc('device', 2)}`">
    <v-toolbar class="save-bar mt-0" dense light>
      <v-spacer></v-spacer>
      <v-btn tile outlined class="mr-1" color="primary">
        <v-icon left>mdi-plus</v-icon>{{ $t('create_new') }}
        {{ $tc('device', 1) }}</v-btn
      >
    </v-toolbar>

    <v-container class="content-container">
      <div class="overline mb-2" v-text="$tc('device', 2)"></div>
      <v-row dense>
        <v-col
          v-for="device in ownedDevices"
          :key="device.id"
          sm="auto"
          class="device-item"
          dense
        >
          <v-card outlined>
            <div
              class="device-title-row d-flex flex-no-wrap justify-flex-start align-start"
              style="width: 100%;"
            >
              <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                <v-col cols="6" md="3">
                  <h4 class="device-title">{{ device.name }}</h4>
                </v-col>
                <v-col
                  cols="6"
                  md="9"
                  class="d-flex flex-wrap justify-flex-start align-center"
                >
                  <div class="mr-3">
                    <v-icon small>
                      mdi-battery
                    </v-icon>
                    <span class="beep-label">{{
                      device.battery_voltage !== null
                        ? device.battery_voltage + ' V'
                        : '?'
                    }}</span>
                  </div>

                  <div class="mr-3">
                    <v-sheet
                      class="beep-icon beep-icon--small beep-icon-sensors--no-outline beep-icon-sensors--no-outline--small ma-0 mt-1"
                    ></v-sheet>
                    <span class="beep-label">{{
                      device.last_message_received !== null
                        ? momentify(device.last_message_received)
                        : '?'
                    }}</span>
                  </div>

                  <div class="mr-3">
                    <v-icon small>
                      mdi-send
                    </v-icon>
                    <span class="beep-label">
                      {{
                        device.measurement_transmission_ratio !== null
                          ? transmissionText(device)
                          : '?'
                      }}
                    </span>
                  </div>
                </v-col>
              </v-row>

              <div>
                <v-icon class="color-grey-light pr-2 pt-3">
                  mdi-cog
                </v-icon>
              </div>
            </div>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="device.name"
                    :label="`${$t('name')}`"
                  />
                  <v-text-field
                    v-model="device.key"
                    :label="`${$t('sensor_key') + '(DEV EUI)'}`"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
    transmissionText(device) {
      return device.measurement_transmission_ratio < 2
        ? device.measurement_interval_min + ' min'
        : device.measurement_interval_min +
            ' * ' +
            device.measurement_transmission_ratio +
            ' min'
    },
  },
}
</script>

<style lang="scss" scoped>
.device-item {
  flex-grow: 1 !important;
  min-width: 100%;
  padding: 4px;

  .device-title-row {
    border-bottom: 1px solid $color-grey-light;
  }
  .device-title {
    @include for-phone-only {
      font-size: 12px;
    }
  }
}
</style>
