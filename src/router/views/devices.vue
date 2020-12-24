<template>
  <Layout :title="`${$tc('device', 2)}`" :edited="deletedButNotSaved">
    <v-toolbar class="save-bar mt-0" dense light>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!mobile || ownedDevices.length === 0"
        tile
        outlined
        class="mr-3"
        color="primary"
        @click="addDevice"
      >
        <v-icon left>mdi-plus</v-icon>{{ $t('create_new') }}
        {{ $tc('device', 1) }}</v-btn
      >
      <v-btn
        v-if="ownedDevices.length > 0"
        tile
        outlined
        class="save-button mr-1"
        color="primary"
        @click="saveDevices"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="primary"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
        {{ $t('save') }}
        {{ $tc('device', ownedDevices.length) }}</v-btn
      >
    </v-toolbar>

    <v-container class="content-container">
      <v-row v-if="errorMessage">
        <v-col cols="12">
          <v-alert text prominent dense type="error" color="red">
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="mobile && ownedDevices.length > 0">
        <v-col cols="12">
          <v-btn
            tile
            outlined
            color="primary"
            class="save-button mt-n4"
            @click="addDevice"
          >
            <v-icon left>mdi-plus</v-icon>{{ $t('create_new') }}
            {{ $tc('device', 1) }}</v-btn
          >
        </v-col>
      </v-row>
      <div
        v-if="ownedDevices.length > 0"
        class="overline mb-2"
        v-text="$tc('device', ownedDevices.length)"
      ></div>
      <v-row dense>
        <v-col v-if="ready && ownedDevices.length === 0" cols="12">
          <p v-text="$t('sensors') + ' ' + $t('not_available_yet')"></p>
          <div class="text-center">
            <img
              src="@assets/img/beep-base-small.jpg"
              style=" width: 100%;max-width: 500px;"
            />
          </div>
          <div>{{ $t('beep_base_explanation') }}</div>
        </v-col>
        <v-col
          v-for="device in ownedDevices"
          :key="device.key"
          sm="auto"
          class="device-item"
          dense
        >
          <v-card
            outlined
            :class="
              `'device-card ${device.delete === true ? 'device-delete' : ''}`
            "
          >
            <div
              :class="
                `device-title-row d-flex flex-no-wrap justify-flex-start align-center ${
                  showDevicesByKey.includes(device.key)
                    ? 'device-title-row--border-bottom'
                    : ''
                }`
              "
              style="width: 100%;"
            >
              <v-row class="ml-0 pl-0 py-0" style="width:100%;">
                <v-col
                  cols="6"
                  md="3"
                  class="d-flex flex-no-wrap justify-flex-start"
                >
                  <div class="d-flex flex-column justify-center mr-3">
                    <v-icon
                      v-if="device.type !== 'beep'"
                      light
                      large
                      color="primary"
                      class="text-center device-icon"
                    >
                      mdi-devices
                    </v-icon>
                    <v-avatar
                      v-else
                      height="auto"
                      tile
                      color="primary"
                      class="mt-n1"
                    >
                      <img
                        src="@assets/img/beep-base-small.jpg"
                        alt="BEEP Base"
                      />
                    </v-avatar>
                  </div>
                  <div class="d-flex flex-column justify-flex-start">
                    <h4 class="device-title">{{ device.name }}</h4>
                    <span v-if="device.hive_name" class="beep-label"
                      >{{ device.hive_name }} ({{ device.location_name }})</span
                    >
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  md="9"
                  class="d-flex flex-wrap justify-flex-start align-center"
                >
                  <div v-if="device.id" class="mr-3">
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

                  <v-tooltip bottom max-width="60%">
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <div
                          v-if="device.battery_voltage !== undefined"
                          class="mr-3"
                        >
                          <v-icon small>
                            mdi-battery
                          </v-icon>
                          <span class="beep-label">{{
                            device.battery_voltage !== null
                              ? device.battery_voltage + ' V'
                              : '?'
                          }}</span>
                        </div>
                      </span>
                    </template>
                    <span v-text="$t('bat_volt')"> </span>
                  </v-tooltip>

                  <v-tooltip bottom max-width="60%">
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <div
                          v-if="device.last_message_received !== undefined"
                          class="mr-3"
                        >
                          <v-sheet
                            class="beep-icon beep-icon--small beep-icon-sensors--no-outline beep-icon-sensors--no-outline--small"
                          ></v-sheet>
                          <span class="beep-label">{{
                            device.last_message_received !== null
                              ? momentify(device.last_message_received)
                              : '?'
                          }}</span>
                        </div>
                      </span>
                    </template>
                    <span v-text="$t('last_message_received')"> </span>
                  </v-tooltip>

                  <v-tooltip bottom max-width="60%">
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <div
                          v-if="
                            device.measurement_transmission_ratio !== undefined
                          "
                          class="mr-3"
                        >
                          <v-icon small>
                            mdi-sync
                          </v-icon>
                          <span class="beep-label">
                            {{
                              device.measurement_transmission_ratio !== null
                                ? transmissionText(device)
                                : '?'
                            }}
                          </span>
                        </div>
                      </span>
                    </template>
                    <span v-text="$t('transmission_ratio')"> </span>
                  </v-tooltip>
                </v-col>
              </v-row>

              <div>
                <v-icon
                  :class="
                    `color-grey-light py-2 px-3 mdi ${
                      showDevicesByKey.includes(device.key)
                        ? 'mdi-minus'
                        : 'mdi-cog'
                    }`
                  "
                  @click="toggleDevice(device.key)"
                >
                </v-icon>
              </div>
            </div>

            <SlideYUpTransition :duration="150">
              <v-card-text v-if="showDevicesByKey.includes(device.key)">
                <v-row>
                  <v-col cols="12" md="6" class="pt-1 pb-0 py-sm-3">
                    <v-text-field v-model="device.name" :label="$t('name')" />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="device.key"
                      :label="`${$t('sensor_key') + ' (DEV EUI)'}`"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="device.hardware_id"
                      label="HW ID"
                      disabled
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="device.firmware_version"
                      label="FW v"
                      disabled
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
                      @select="addHiveName($event, device)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div>
                      <div class="d-flex justify-space-between">
                        <div>
                          <div
                            v-if="device.sensor_definitions.length > 0"
                            class="d-flex flex-row align-center mb-3"
                          >
                            <div
                              class="overline"
                              v-text="
                                `${$tc(
                                  'sensor_definition',
                                  // eslint-disable-next-line vue/comma-dangle
                                  device.sensor_definitions.length
                                )}`
                              "
                            ></div>
                            <a
                              ><v-icon
                                class="mdi mdi-information ml-1 icon-info"
                                dark
                                small
                                color="primary"
                                @click="showDescription = !showDescription"
                              ></v-icon
                            ></a>
                          </div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn
                          v-if="!mobile && device.id"
                          tile
                          outlined
                          color="primary"
                          @click="addSensorDef(device)"
                        >
                          <v-icon left>mdi-plus</v-icon>
                          {{ $t('add') + ' ' + $tc('sensor_definition', 1) }}
                        </v-btn>
                        <v-btn
                          v-if="mobile && device.id"
                          tile
                          outlined
                          color="primary"
                          @click="addSensorDef(device)"
                        >
                          <v-icon left>mdi-plus</v-icon>
                          {{ $t('add') }}
                          {{
                            device.sensor_definitions.length === 0
                              ? $tc('sensor_definition', 1)
                              : ''
                          }}
                        </v-btn>
                      </div>
                      <p v-if="showDescription" class="sensordef-description">
                        <em>{{ $t('sensordef_info') }}</em>
                      </p>
                    </div>
                    <div
                      v-if="device.sensor_definitions.length > 0"
                      class="rounded-border"
                    >
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
                                sensorDef.delete === true
                                  ? 'sensordef-delete'
                                  : ''
                              "
                            >
                              <td>
                                <v-text-field
                                  v-model="sensorDef.name"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Name')}`"
                                  class="mt-2 mb-n5"
                                  solo
                                ></v-text-field>
                              </td>
                              <td>
                                <yesNoRating
                                  v-if="sensorDef"
                                  :object="sensorDef"
                                  property="inside"
                                  :disabled="sensorDef.delete"
                                  :small="true"
                                  class="device-yes-no mt-n3 mb-n5"
                                ></yesNoRating>
                              </td>
                              <td>
                                <VueNumberInput
                                  v-model="sensorDef.offset"
                                  class="device-number-input"
                                  :disabled="sensorDef.delete"
                                  size="small"
                                  inline
                                  controls
                                  rounded
                                ></VueNumberInput>
                              </td>
                              <td>
                                <VueNumberInput
                                  v-model="sensorDef.multiplier"
                                  class="device-number-input"
                                  :disabled="sensorDef.delete"
                                  size="small"
                                  inline
                                  controls
                                ></VueNumberInput>
                              </td>
                              <td>
                                <v-select
                                  v-model="sensorDef.input_measurement_id"
                                  :disabled="sensorDef.delete"
                                  :items="sortedSensorMeasurements"
                                  item-text="abbreviation"
                                  item-value="id"
                                  :label="
                                    `${$t('Select')} ${$tc(
                                      'measurement',
                                      // eslint-disable-next-line vue/comma-dangle
                                      1
                                    )} ...`
                                  "
                                  class="mt-2 mb-n5"
                                  solo
                                ></v-select>
                              </td>
                              <td>
                                <v-select
                                  v-model="sensorDef.output_measurement_id"
                                  :disabled="sensorDef.delete"
                                  :items="sortedSensorMeasurements"
                                  item-text="abbreviation"
                                  item-value="id"
                                  :label="
                                    `${$t('Select')} ${$tc(
                                      'measurement',
                                      // eslint-disable-next-line vue/comma-dangle
                                      1
                                    )} ...`
                                  "
                                  class="mt-2 mb-n5"
                                  solo
                                ></v-select>
                              </td>
                              <td
                                class="text-center d-flex flex-no-wrap align-center button-wrapper"
                              >
                                <v-progress-circular
                                  v-if="
                                    showLoadingIconById.indexOf(sensorDef.id) >
                                      -1
                                  "
                                  class="progress-icon mr-3"
                                  size="18"
                                  width="2"
                                  color="green"
                                  indeterminate
                                />
                                <v-icon
                                  v-if="
                                    showLoadingIconById.indexOf(
                                      // eslint-disable-next-line vue/comma-dangle
                                      sensorDef.id
                                    ) === -1
                                  "
                                  dark
                                  class="mr-3"
                                  color="green"
                                  @click="updateSensorDef(sensorDef)"
                                  >mdi-check</v-icon
                                >
                                <v-tooltip
                                  v-if="sensorDef.delete"
                                  open-delay="500"
                                  bottom
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      dark
                                      color="red"
                                      v-on="on"
                                      @click="deleteSensorDef(device, index)"
                                      >mdi-refresh</v-icon
                                    >
                                  </template>
                                  <span v-if="sensorDef.delete">{{
                                    $t('Undelete')
                                  }}</span>
                                </v-tooltip>
                                <v-icon
                                  v-if="!sensorDef.delete"
                                  dark
                                  color="red"
                                  @click="deleteSensorDef(device, index)"
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
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn
                      tile
                      outlined
                      color="red"
                      class="save-button"
                      @click="deleteDevice(device)"
                    >
                      <v-icon left>{{
                        device.delete ? 'mdi-refresh' : 'mdi-delete'
                      }}</v-icon
                      >{{
                        device.delete ? $t('Undelete') : $t('remove_device')
                      }}
                    </v-btn>
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
import VueNumberInput from '@chenfengyuan/vue-number-input'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  components: {
    Confirm,
    Layout,
    SlideYUpTransition,
    Treeselect,
    yesNoRating,
    VueNumberInput,
  },
  data() {
    return {
      apiaries: [],
      devices: [],
      errorMessage: null,
      normalizerHives(node) {
        return {
          id: node.type === 'apiary' ? node.name + ' ' + node.id : node.id,
          label: node.name,
          children: node.hives,
        }
      },
      normalizerSensorTypes(node) {
        return {
          id: node.name,
          label: node.trans.en,
        }
      },
      ready: false,
      sensorTypes: [],
      sensorMeasurements: [],
      showDevicesByKey: [],
      showLoadingIcon: false,
      showLoadingIconById: [],
      showDescription: false,
    }
  },
  computed: {
    deletedButNotSaved() {
      const unsavedDeletions = this.ownedDevices.filter((ownedDevice) => {
        const unsavedSensorDefs = ownedDevice.sensor_definitions.filter(
          (sensorDef) => {
            return sensorDef.delete
          }
        )
        return unsavedSensorDefs.length > 0
          ? unsavedSensorDefs
          : ownedDevice.delete
      })
      return unsavedDeletions.length > 0
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    ownedDevices() {
      return this.devices.filter((device) => {
        return device.owner
      })
    },
    sortedSensorMeasurements() {
      var sortedSMs = this.sensorMeasurements.slice().sort(function(a, b) {
        if (a.abbreviation > b.abbrevation) {
          return 1
        }
        if (b.abbreviation > a.abbreviation) {
          return -1
        }
        return 0
      })
      return sortedSMs
    },
  },
  created() {
    this.getDevices()
    this.readApiaries()
    this.readTaxonomy().then(() => {
      this.ready = true
    })
  },
  methods: {
    async getDevices() {
      try {
        const response = await Api.readRequest('/devices')
        var devices = response.data

        devices.map((device) => {
          device.delete = false // otherwise Vue can't track the 'delete' property
          if (device.sensor_definitions.length > 0) {
            var sensorDefsWithDeleteProp = device.sensor_definitions
            sensorDefsWithDeleteProp.map((sensorDef) => {
              sensorDef.delete = false // otherwise Vue can't track the 'delete' property
            })
            device.sensor_definitions = sensorDefsWithDeleteProp
          }
        })

        this.devices = devices
        return true
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readApiaries() {
      try {
        const response = await Api.readRequest('/locations')
        this.apiaries = response.data.locations
        return true
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readTaxonomy() {
      try {
        const response = await Api.readRequest('/taxonomy/lists')
        this.sensorTypes = response.data.sensortypes
        this.sensorMeasurements = response.data.sensormeasurements
        return true
      } catch (error) {
        if (error.response) {
          const msg = error.response.data.message
          console.log(msg)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async saveDevices() {
      this.errorMessage = null
      this.showLoadingIcon = true
      try {
        const response = await Api.postRequest(
          '/devices/multiple',
          this.ownedDevices
        )
        if (!response) {
          this.errorMessage =
            this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
        }
        this.getDevices().then(() => {
          this.showLoadingIcon = false
        })
        return true
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          this.errorMessage = this.$i18n.t('Error')
        }
      }
    },
    async updateSensorDef(sensorDef) {
      this.errorMessage = null
      this.showLoadingIconById.push(sensorDef.id)
      var sensorDefId =
        typeof sensorDef.id !== 'undefined' ? sensorDef.id : null
      try {
        var response = false
        if (sensorDef.delete === true) {
          response = await Api.deleteRequest(
            '/sensordefinition/',
            sensorDefId,
            sensorDef
          )
        } else if (sensorDefId !== null) {
          response = await Api.putRequest(
            '/sensordefinition/' + sensorDefId,
            sensorDef
          )
        } else {
          response = await Api.postRequest('/sensordefinition', sensorDef)
        }
        if (!response) {
          this.errorMessage =
            this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
        }
        this.getDevices().then(() => {
          this.showLoadingIconById.splice(
            this.showLoadingIconById.indexOf(sensorDef.id),
            1
          )
        })
        return true
      } catch (error) {
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(sensorDef.id),
          1
        )
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          this.errorMessage = this.$i18n.t('Error')
        }
      }
    },
    addDevice() {
      var key = this.randomString(16).toLowerCase()
      this.devices.push({
        name: 'Device ' + (this.ownedDevices.length + 1),
        key: key,
        owner: true,
        sensor_definitions: [],
      })
      this.toggleDevice(key)
    },
    addHiveName(event, device) {
      device.hive_name = event.name
      device.location_name = event.location
    },
    addSensorDef(device) {
      device.sensor_definitions.push({
        device_id: device.id,
        name: 'Sensor ' + (device.sensor_definitions.length + 1),
        inside: null,
        offset: 0,
        multiplier: 1,
        input_measurement_id: null,
        output_measurement_id: null,
      })
    },
    deleteDevice(device) {
      if (typeof device.id === 'undefined') {
        return this.removeDevice(device.key)
      }
      device.delete = !device.delete
    },
    deleteSensorDef(device, index) {
      const sensorDef = device.sensor_definitions[index]
      if (typeof sensorDef.id === 'undefined') {
        return this.removeSensorDef(device, index)
      }
      sensorDef.delete = !sensorDef.delete
    },
    momentify(date) {
      return this.$moment(date)
        .locale(this.$i18n.locale)
        .format('lll')
    },
    randomString(length) {
      var text = ''
      var possible =
        'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz0123456789' // excluded o and O to avoid confusion with 0

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return text
    },
    removeDevice(key) {
      var deviceIndex = null
      this.devices.map((device, index) => {
        if (device.key === key) {
          deviceIndex = index
        }
      })
      this.devices.splice(deviceIndex, 1)
    },
    removeSensorDef(device, index) {
      return typeof device.sensor_definitions[index] !== 'undefined'
        ? device.sensor_definitions.splice(index, 1)
        : null
    },
    toggleDevice(key) {
      if (this.showDevicesByKey.includes(key)) {
        this.showDevicesByKey.splice(this.showDevicesByKey.indexOf(key), 1)
      } else {
        this.showDevicesByKey.push(key)
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
    @include for-phone-only {
      line-height: 1rem !important;
    }
    &--border-bottom {
      border-bottom: 1px solid $color-grey-light;
    }
  }
  .device-title {
    @include for-phone-only {
      font-size: 12px;
    }
  }
  .device-icon {
    width: 48px;
  }
  .device-yes-no {
    white-space: nowrap;
  }
  .device-number-input {
    margin-top: 6px !important;
  }
  .button-wrapper {
    height: 51px;
  }
  .progress-icon {
    margin-left: 6px;
  }
  .device-delete {
    background-color: rgba(255, 0, 0, 0.05);
    border-color: $color-red;
    .device-title-row--border-bottom {
      border-bottom: 1px solid $color-red;
    }
  }
  .sensordef-delete {
    background-color: rgba(255, 0, 0, 0.2);
  }
}
</style>
