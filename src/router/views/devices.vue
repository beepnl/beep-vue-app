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
          :key="device.name + device.id"
          sm="auto"
          class="device-item"
          dense
        >
          <v-card outlined>
            <div
              :class="
                `device-title-row d-flex flex-no-wrap justify-flex-start ${
                  mobile ? 'align-start' : 'align-center'
                } ${
                  showDevicesById.includes(device.id)
                    ? 'device-title-row--border-bottom'
                    : ''
                }`
              "
              style="width: 100%;"
            >
              <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                <v-col cols="6" md="3">
                  <h4 class="device-title">{{ device.name }}</h4>
                  <span class="beep-label"
                    >{{ device.hive_name }} ({{ device.location_name }})</span
                  >
                </v-col>
                <v-col
                  cols="6"
                  md="9"
                  class="d-flex flex-wrap justify-flex-start align-center"
                >
                  <div class="mr-3">
                    <router-link
                      :to="{
                        name: 'measurements-id',
                        params: { id: device.id },
                      }"
                    >
                      <v-icon small color="primary">
                        mdi-chart-line
                      </v-icon>
                    </router-link>
                  </div>

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
                      class="beep-icon beep-icon--small beep-icon-sensors--no-outline beep-icon-sensors--no-outline--small"
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
                <v-icon
                  :class="
                    `color-grey-light ${mobile ? 'pr-2 pt-3' : 'pa-2'} mdi ${
                      showDevicesById.includes(device.id)
                        ? 'mdi-minus'
                        : 'mdi-cog'
                    }`
                  "
                  @click="toggleDevice(device.id)"
                >
                </v-icon>
              </div>
            </div>

            <SlideYUpTransition :duration="150">
              <v-card-text v-if="showDevicesById.includes(device.id)">
                <v-row>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="device.name"
                      :label="`${$t('name')}`"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="device.key"
                      :label="`${$t('sensor_key') + ' (DEV EUI)'}`"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <Treeselect
                      v-if="sensorTypes.length > 0"
                      v-model="device.type"
                      :normalizer="normalizerSensorTypes"
                      :options="sensorTypes"
                      :placeholder="`${$t('Select')} ${$t('type')}`"
                      :no-results-text="`${$t('no_results')}`"
                      :disable-branch-nodes="true"
                      :default-expand-level="1"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <Treeselect
                      v-if="apiaries.length > 0"
                      v-model="device.hive_id"
                      :options="apiaries"
                      :normalizer="normalizerHives"
                      :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
                      :no-results-text="`${$t('no_results')}`"
                      :disable-branch-nodes="true"
                      :default-expand-level="1"
                      search-nested
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div
                      class="overline mb-2"
                      v-text="`${$tc('sensor_definition', 2)}`"
                    ></div>
                    <div class="rounded-border">
                      <v-simple-table dense>
                        <template v-slot>
                          <thead>
                            <tr>
                              <th class="text-left">
                                {{ $t('Name') }}
                              </th>
                              <th class="text-left">
                                {{ $t('Inside') }}
                              </th>
                              <th class="text-left">
                                {{ $t('Offset') }}
                              </th>
                              <th class="text-left">
                                {{ $t('Multiplier') }}
                              </th>
                              <th class="text-left">
                                {{ $t('Input') }}
                              </th>
                              <th class="text-left">
                                {{ $t('Output') }}
                              </th>
                              <th class="text-center">
                                {{ $t('Actions') }}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(sensorDef,
                              index) in device.sensor_definitions"
                              :key="index"
                              :class="
                                sensorDef.delete === true ? 'user-delete' : ''
                              "
                            >
                              <td>
                                <v-text-field
                                  v-model="sensorDef.name"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Name')}`"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="sensorDef.inside"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="sensorDef.offset"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Offset')}`"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                                <!-- <VueNumberInput
                                  v-model="sensorDef.offset"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></VueNumberInput> -->
                              </td>
                              <td>
                                <v-text-field
                                  v-model="sensorDef.multiplier"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Multiplier')}`"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="sensorDef.input_measurement"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Input')}`"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="sensorDef.output_measurement"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Output')}`"
                                  class="device-input mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td class="text-center">
                                <v-icon
                                  dark
                                  color="red"
                                  @click="deleteSensorDef(sensorDef.id)"
                                  >mdi-delete</v-icon
                                >
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </SlideYUpTransition>
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
import { SlideYUpTransition } from 'vue2-transitions'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    Confirm,
    Layout,
    SlideYUpTransition,
    Treeselect,
    // VueNumberInput,
  },
  data() {
    return {
      apiaries: [],
      devices: [],
      normalizerHives(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.hives,
        }
      },
      normalizerSensorTypes(node) {
        return {
          id: node.name,
          label: node.name,
        }
      },
      sensorTypes: [],
      showDevicesById: [],
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
    this.readApiaries()
    this.readTaxonomy()
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
    async readApiaries() {
      try {
        const response = await Api.readRequest('/locations')
        this.apiaries = response.data.locations
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async readTaxonomy() {
      try {
        const response = await Api.readRequest('/taxonomy/lists')
        this.sensorTypes = response.data.sensortypes
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    deleteSensorDef(sensorDefId) {
      console.log('deleting: ', sensorDefId)
    },
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
    toggleDevice(deviceId) {
      if (this.showDevicesById.includes(deviceId)) {
        this.showDevicesById.splice(this.showDevicesById.indexOf(deviceId), 1)
      } else {
        this.showDevicesById.push(deviceId)
      }
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
    line-height: 1.2rem !important;
    &--border-bottom {
      border-bottom: 1px solid $color-grey-light;
    }
  }
  .device-title {
    @include for-phone-only {
      font-size: 12px;
    }
  }
  .device-input.v-text-field.v-text-field--solo .v-input__control {
    min-width: 160px !important;
  }
}
</style>
