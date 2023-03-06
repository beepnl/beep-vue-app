<template>
  <Layout
    :title="`${$tc('device', 2)}`"
    :edited="
      deletedButNotSavedDevices || newButNotSavedSensorDefs || sensorDefEdited
    "
    :warning-message="
      deletedButNotSavedDevices
        ? $t('deleted_but_not_saved_devices_warning')
        : $t('new_or_edited_but_not_saved_sensor_defs_warning')
    "
  >
    <v-toolbar class="save-bar mt-0" dense light>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!mobile || ownedDevices.length === 0"
        tile
        outlined
        :class="mobile ? 'save-button-mobile-wide' : 'mr-3'"
        color="accent"
        @click="addDevice"
      >
        <v-icon left>mdi-plus</v-icon>{{ $t('add_own_device') }}
      </v-btn>
      <v-btn
        v-if="ownedDevices.length > 0"
        tile
        outlined
        class="save-button-mobile-wide mr-1"
        :color="deletedButNotSavedDevices ? 'red' : 'black'"
        :disabled="showLoadingIcon"
        @click="confirmSaveDevices"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="disabled"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
        {{
          deletedButNotSavedDevices ? $t('save_and_delete') : $t('save')
        }}</v-btn
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
            color="accent"
            class="save-button-mobile-wide mt-n4"
            @click="addDevice"
          >
            <v-icon left>mdi-plus</v-icon>{{ $t('add_own_device') }}
          </v-btn>
        </v-col>
      </v-row>
      <div class="mb-2">
        <div v-if="ownedDevices.length > 0" class="overline">
          {{ $tc('device', ownedDevices.length) }}
          <v-icon
            class="mdi mdi-information ml-1 icon-info cursor-pointer"
            dark
            small
            color="accent"
            @click="showInfo = !showInfo"
          ></v-icon>
        </div>

        <p v-if="showInfo" class="info-text">
          <em
            >{{ $t('devices_info_text') + ' '
            }}<a href="https://beep.nl/beep-base-app" target="_blank">{{
              $t('devices_url_text')
            }}</a></em
          >
        </p>
      </div>

      <v-row dense>
        <v-col v-if="ready && ownedDevices.length === 0" cols="12">
          <p v-text="$t('sensors') + ' ' + $t('not_available_yet')"></p>
          <div class="text-center">
            <img
              :src="assetsUrl + '/img/beep-base-small.jpg'"
              style=" width: 100%;max-width: 500px;"
            />
          </div>
          <div>{{ $t('beep_base_explanation') }}</div>
        </v-col>
        <v-col
          v-for="(ownedDevice, index) in ownedDevices"
          :key="ownedDevice.key"
          sm="auto"
          class="device-item"
          dense
        >
          <v-card
            outlined
            :class="
              `device-card ${
                ownedDevice.delete === true ? 'device-delete' : ''
              }`
            "
          >
            <div
              :class="
                `device-title-row d-flex flex-no-wrap justify-flex-start align-center ${
                  deviceExpanded(index) ? 'device-title-row--border-bottom' : ''
                }`
              "
              style="width: 100%;"
            >
              <v-row class="ml-0 my-0 pl-0 py-0" style="width:100%;">
                <v-col
                  cols="6"
                  md="3"
                  class="d-flex flex-no-wrap justify-flex-start"
                >
                  <div class="d-flex flex-column justify-center mr-3">
                    <v-icon
                      v-if="ownedDevice.type !== 'beep'"
                      light
                      large
                      color="accent"
                      class="text-center device-icon"
                    >
                      mdi-devices
                    </v-icon>
                    <v-avatar
                      v-else
                      height="auto"
                      tile
                      color="accent"
                      class="mt-n1"
                    >
                      <img
                        :src="assetsUrl + '/img/beep-base-small.jpg'"
                        alt="BEEP Base"
                      />
                    </v-avatar>
                  </div>
                  <div class="d-flex flex-column justify-flex-start">
                    <h4 class="device-title">{{ ownedDevice.name }}</h4>
                    <span v-if="ownedDevice.hive_name" class="beep-label"
                      >{{ ownedDevice.hive_name }} ({{
                        ownedDevice.location_name
                      }})</span
                    >
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  md="9"
                  class="d-flex flex-wrap justify-flex-start align-center"
                >
                  <div v-if="ownedDevice.id" class="mr-3">
                    <router-link
                      :to="{
                        name: 'measurements-id',
                        params: { id: ownedDevice.id },
                      }"
                    >
                      <v-icon small color="accent">
                        mdi-chart-line
                      </v-icon>
                    </router-link>
                  </div>

                  <v-tooltip bottom max-width="60%">
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <div
                          v-if="ownedDevice.battery_voltage !== undefined"
                          class="mr-3"
                        >
                          <v-icon small>
                            mdi-battery
                          </v-icon>
                          <span class="beep-label">{{
                            ownedDevice.battery_voltage !== null
                              ? ownedDevice.battery_voltage.toFixed(2) + ' V'
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
                          v-if="ownedDevice.last_message_received !== undefined"
                          class="mr-3"
                        >
                          <v-sheet
                            class="beep-icon beep-icon--small beep-icon-sensors--no-outline beep-icon-sensors--no-outline--small"
                          ></v-sheet>
                          <span class="beep-label">{{
                            ownedDevice.last_message_received !==
                            null /* eslint-disable vue/comma-dangle */
                              ? momentify(
                                  ownedDevice.last_message_received,
                                  true
                                )
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
                            ownedDevice.measurement_transmission_ratio !==
                              undefined
                          "
                          class="mr-3"
                        >
                          <v-icon small>
                            mdi-sync
                          </v-icon>
                          <span class="beep-label">
                            {{
                              ownedDevice.measurement_transmission_ratio !==
                              null
                                ? transmissionText(ownedDevice)
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
                      deviceExpanded(index) ? 'mdi-minus' : 'mdi-cog'
                    }`
                  "
                  @click="toggleDevice(index)"
                >
                </v-icon>
              </div>
            </div>

            <SlideYUpTransition v-if="deviceExpanded(index)" :duration="150">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6" class="pt-1 pb-0 py-sm-3">
                    <v-text-field
                      v-model="ownedDevice.name"
                      :label="$t('name')"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      v-model="ownedDevice.key"
                      :label="
                        $t('sensor_key') +
                          (ownedDevice.type === 'beep' ? '*' : '')
                      "
                      :disabled="ownedDevice.type === 'beep'"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      :value="
                        ownedDevice.hardware_id !== null &&
                        ownedDevice.hardware_id !== undefined
                          ? ownedDevice.hardware_id
                          : '-'
                      "
                      :label="
                        'Hardware ID' + (ownedDevice.type === 'beep' ? '*' : '')
                      "
                      :disabled="ownedDevice.type === 'beep'"
                      @input="updateDevice(ownedDevice, 'hardware_id', $event)"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0 pb-sm-3">
                    <v-text-field
                      :value="
                        ownedDevice.firmware_version !== null &&
                        ownedDevice.firmware_version !== undefined
                          ? ownedDevice.firmware_version
                          : '-'
                      "
                      :label="
                        'Firmware version' +
                          (ownedDevice.type === 'beep' ? ' BEEP base*' : '')
                      "
                      :disabled="ownedDevice.type === 'beep'"
                      @input="updateDevice(ownedDevice, 'firmware_id', $event)"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="beep-label" v-text="`${$t('Type')}`"></div>
                    <Treeselect
                      v-if="sensorTypesList.length > 0"
                      v-model="ownedDevice.type"
                      :normalizer="normalizerSensorTypes"
                      :options="sensorTypesList"
                      :placeholder="`${$t('Select')} ${$t('type')}`"
                      :no-results-text="`${$t('no_results')}`"
                      :disable-branch-nodes="true"
                      :default-expand-level="1"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="beep-label" v-text="`${$tc('Hive', 1)}`"></div>
                    <Treeselect
                      v-if="apiaries.length > 0"
                      v-model="ownedDevice.hive_id"
                      :options="apiaries"
                      :normalizer="normalizerHives"
                      :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
                      :no-results-text="`${$t('no_results')}`"
                      :disable-branch-nodes="true"
                      :default-expand-level="1"
                      search-nested
                      @select="addHiveName($event, ownedDevice)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div>
                      <div class="d-flex justify-space-between">
                        <div>
                          <div
                            v-if="ownedDevice.sensor_definitions.length > 0"
                            class="d-flex flex-row align-center mb-3 mr-3"
                          >
                            <div
                              class="overline"
                              v-text="
                                `${$tc(
                                  'sensor_definition',
                                  ownedDevice.sensor_definitions.length
                                )}`
                              "
                            ></div>
                            <a
                              ><v-icon
                                class="mdi mdi-information ml-1 icon-info"
                                dark
                                small
                                color="accent"
                                @click="showDescription = !showDescription"
                              ></v-icon
                            ></a>
                          </div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn
                          v-if="!mobile && ownedDevice.id"
                          tile
                          outlined
                          color="accent"
                          @click="addSensorDef(ownedDevice)"
                        >
                          <v-icon left>mdi-plus</v-icon>
                          {{ $t('Add_sensor_definition') }}
                        </v-btn>
                        <v-btn
                          v-if="mobile && ownedDevice.id"
                          tile
                          outlined
                          color="accent"
                          @click="addSensorDef(ownedDevice)"
                        >
                          <v-icon left>mdi-plus</v-icon>
                          {{
                            ownedDevice.sensor_definitions.length === 0
                              ? $t('Add_sensor_definition')
                              : $t('add')
                          }}
                        </v-btn>
                      </div>
                      <p v-if="showDescription" class="sensordef-description">
                        <em>{{ $t('sensordef_info') }}</em>
                      </p>
                    </div>
                    <div
                      v-if="ownedDevice.sensor_definitions.length > 0"
                      class="rounded-border"
                    >
                      <v-simple-table class="v-data-table--smallfont" dense>
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
                              <th class="text-left">
                                {{ $t('Updated_at') }}
                              </th>
                              <th class="text-left">
                                {{ $tc('Action', 2) }}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(sensorDef,
                              indexSensor) in sortedSensorDefinitions(
                                ownedDevice.sensor_definitions
                              )"
                              :key="indexSensor"
                              :class="
                                sensorDef.delete === true
                                  ? 'sensordef-delete'
                                  : ''
                              "
                            >
                              <td class="td--small">
                                <v-text-field
                                  v-model="sensorDef.name"
                                  :disabled="sensorDef.delete"
                                  :placeholder="`${$t('Name')}`"
                                  class="mt-2"
                                  dense
                                  @input="sensorDefEdited = true"
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
                                <el-input-number
                                  v-model="sensorDef.offset"
                                  :disabled="sensorDef.delete"
                                  size="small"
                                  @input.native="
                                    convertComma($event, sensorDef, 'offset')
                                    sensorDefEdited = true
                                  "
                                  @change="sensorDefEdited = true"
                                ></el-input-number>
                              </td>
                              <td>
                                <el-input-number
                                  v-model="sensorDef.multiplier"
                                  :disabled="sensorDef.delete"
                                  size="small"
                                  @input.native="
                                    convertComma(
                                      $event,
                                      sensorDef,
                                      'multiplier'
                                    ),
                                      (sensorDefEdited = true)
                                  "
                                  @change="sensorDefEdited = true"
                                ></el-input-number>
                              </td>
                              <td class="td--small">
                                <v-select
                                  v-model="sensorDef.input_measurement_id"
                                  :disabled="sensorDef.delete"
                                  :items="sortedSensorMeasurements"
                                  item-text="abbreviation"
                                  item-value="id"
                                  :label="
                                    `${$t('Select')} ${$tc(
                                      'measurement',
                                      1
                                    )} ...`
                                  "
                                  class="mt-2 mb-n5"
                                  solo
                                  @input="
                                    selectInputMeasurementId(sensorDef, $event)
                                  "
                                ></v-select>
                              </td>
                              <td class="td--small">
                                <v-select
                                  v-model="sensorDef.output_measurement_id"
                                  :disabled="sensorDef.delete"
                                  :items="sortedSensorMeasurements"
                                  item-text="abbreviation"
                                  item-value="id"
                                  :label="
                                    `${$t('Select')} ${$tc(
                                      'measurement',
                                      1
                                    )} ...`
                                  "
                                  class="mt-2 mb-n5"
                                  solo
                                  @input="sensorDefEdited = true"
                                ></v-select>
                              </td>
                              <td>
                                <span
                                  v-text="
                                    sensorDef.updated_at !== null
                                      ? momentify(sensorDef.updated_at, true)
                                      : $t('Not_yet_saved')
                                  "
                                ></span>
                              </td>
                              <td>
                                <div class="d-flex flex-no-wrap">
                                  <v-progress-circular
                                    v-if="
                                      showLoadingIconById.indexOf(
                                        sensorDef.id
                                      ) > -1
                                    "
                                    class="progress-icon mr-3"
                                    size="18"
                                    width="2"
                                    color="green"
                                    indeterminate
                                  />
                                  <v-tooltip
                                    v-if="
                                      showLoadingIconById.indexOf(
                                        sensorDef.id
                                      ) === -1
                                    "
                                    open-delay="500"
                                    bottom
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-icon
                                        dark
                                        class="mr-3"
                                        color="green"
                                        v-on="on"
                                        @click="updateSensorDef(sensorDef)"
                                        >mdi-check</v-icon
                                      >
                                    </template>
                                    <span>{{ $t('save') }}</span>
                                  </v-tooltip>
                                  <v-tooltip open-delay="500" bottom>
                                    <template v-slot:activator="{ on }">
                                      <v-icon
                                        dark
                                        color="red"
                                        v-on="on"
                                        @click="
                                          deleteSensorDef(
                                            ownedDevice,
                                            sensorDef
                                          )
                                        "
                                        >mdi-delete</v-icon
                                      >
                                    </template>
                                    <span>{{ $t('Delete') }}</span>
                                  </v-tooltip>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="d-flex align-end">
                    <div
                      v-if="ownedDevice.type === 'beep'"
                      class="beep-label mb-0"
                      ><sup>*</sup>{{ $t('disabled_settings') }}</div
                    >
                  </v-col>
                  <v-col cols="12" md="6" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn
                      tile
                      outlined
                      color="red"
                      class="save-button-mobile-wide"
                      @click="deleteDevice(ownedDevice, index)"
                    >
                      <v-icon left>{{
                        ownedDevice.delete ? 'mdi-refresh' : 'mdi-delete'
                      }}</v-icon
                      >{{
                        ownedDevice.delete
                          ? $t('Undelete')
                          : $t('remove_device')
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
import { mapGetters } from 'vuex'
import { momentify } from '@mixins/momentMixin'
import {
  convertComma,
  readApiariesAndGroups,
  readGeneralInspections,
  readTaxonomy,
} from '@mixins/methodsMixin'
import { SlideYUpTransition } from 'vue2-transitions'
import Treeselect from '@riophae/vue-treeselect'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  components: {
    Confirm,
    Layout,
    SlideYUpTransition,
    Treeselect,
    yesNoRating,
  },
  mixins: [
    convertComma,
    momentify,
    readApiariesAndGroups,
    readGeneralInspections,
    readTaxonomy,
  ],
  data() {
    return {
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
      showDevicesByIndex: [],
      showLoadingIcon: false,
      showLoadingIconById: [],
      showDescription: false,
      showInfo: true,
      sensorDefEdited: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList', 'sensorTypesList']),
    deletedButNotSavedDevices() {
      const unsavedDeletions = this.ownedDevices.filter((ownedDevice) => {
        return ownedDevice.delete
      })
      return unsavedDeletions.length > 0
    },
    newButNotSavedSensorDefs() {
      const unsavedChanges = this.ownedDevices.filter((ownedDevice) => {
        const unsavedSensorDefs = ownedDevice.sensor_definitions.filter(
          (sensorDef) => {
            return sensorDef.id === undefined
          }
        )
        return unsavedSensorDefs.length > 0
      })

      return unsavedChanges.length > 0
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    ownedDevices() {
      var ownedDevices = this.devices
      var sortedOwnedDevices = ownedDevices
        .filter((device) => device.owner)
        .slice()
        .sort(function(a, b) {
          if (a.id > b.id) {
            return -1
          }
          if (b.id > a.id) {
            return 1
          }
          return 0
        })
      return sortedOwnedDevices
    },
    sortedSensorMeasurements() {
      var sortedSMs = this.sensorMeasurementsList.slice().sort(function(a, b) {
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
    if (this.apiaries.length === 0 && this.groups.length === 0) {
      // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
      this.readApiariesAndGroups()
    }
    this.getDevicesForList().then(() => {
      this.readTaxonomy().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async getDevicesForList(save = false) {
      try {
        this.$store.commit('devices/setData', {
          prop: 'devicesChecked',
          value: true,
        })

        const response = await Api.readRequest('/devices')
        var devices = response.data

        if (save) {
          this.$store.commit('devices/setData', {
            prop: 'devices',
            value: devices,
          })
        }

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
        this.showDevicesByIndex = []
        // NB don't commit these devices to store as they contain extra delete property which will yield vuex mutation errors later
        return true
      } catch (error) {
        console.log('Error: ', error)
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
            this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
          this.showLoadingIcon = false
        }
        this.getDevicesForList(true).then(() => {
          this.showLoadingIcon = false
        })
        this.readGeneralInspections()
        this.readApiariesAndGroups() // to update hive.sensors
        return true
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          this.errorMessage = this.$i18n.tc('Error', 1)
        }
      }
    },
    async updateSensorDef(sensorDef) {
      this.errorMessage = null
      this.showLoadingIconById.push(sensorDef.id)
      var sensorDefId =
        typeof sensorDef.id !== 'undefined' ? sensorDef.id : null
      this.sensorDefEdited = false
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
            this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
          this.showLoadingIconById.splice(
            this.showLoadingIconById.indexOf(sensorDef.id),
            1
          )
        }
        this.getDevicesForList().then(() => {
          this.showLoadingIconById.splice(
            this.showLoadingIconById.indexOf(sensorDef.id),
            1
          )
        })
        // TODO: this.readApiaries() for latest measurement data? Groups as well??
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
          this.errorMessage = this.$i18n.tc('Error', 1)
        }
      }
    },
    addDevice() {
      var key = this.randomString(16).toLowerCase()
      this.devices.splice(0, 0, {
        name: 'Device ' + (this.ownedDevices.length + 1),
        key: key,
        owner: true,
        sensor_definitions: [],
      })
      if (this.showDevicesByIndex.length > 0) {
        var updatedIndexes = this.showDevicesByIndex.map(function(index) {
          return index + 1
        })
        this.showDevicesByIndex = updatedIndexes
      }
      this.toggleDevice(0)
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
        updated_at: null,
      })
    },
    confirmSaveDevices() {
      const warningMessage = this.$i18n.t(
        'new_or_edited_but_not_saved_sensor_defs_warning'
      )
      if (this.newButNotSavedSensorDefs || this.sensorDefEdited) {
        this.$refs.confirm
          .open(
            this.$i18n.t('save') + ' ' + this.$i18n.tc('device', 2),
            null,
            {
              color: 'red',
            },
            warningMessage
          )
          .then((confirm) => {
            this.saveDevices()
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.saveDevices()
      }
    },
    deleteDevice(device, index) {
      if (typeof device.id === 'undefined') {
        return this.removeDevice(device.key, index)
      }
      device.delete = !device.delete
    },
    deleteSensorDef(device, sensorDef) {
      if (typeof sensorDef.id === 'undefined') {
        this.removeSensorDef(device, sensorDef)
      } else {
        sensorDef.delete = !sensorDef.delete
        this.$refs.confirm
          .open(
            this.$i18n.t('delete_sensordef'),
            this.$i18n.t('delete_sensordef') + ' (' + sensorDef.name + ')?',
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            this.updateSensorDef(sensorDef)
          })
          .catch((reject) => {
            sensorDef.delete = !sensorDef.delete
            return true
          })
      }
    },
    deviceExpanded(index) {
      return this.showDevicesByIndex.length > 0
        ? this.showDevicesByIndex.indexOf(index) > -1
        : false
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
    removeDevice(key, showIndex) {
      var deviceIndex = null
      this.devices.map((device, index) => {
        if (device.key === key) {
          deviceIndex = index
        }
      })
      this.devices.splice(deviceIndex, 1)
      this.toggleDevice(showIndex)
      if (this.showDevicesByIndex.length > 0) {
        var updatedIndexes = this.showDevicesByIndex.map(function(index) {
          return index > showIndex ? index - 1 : index
        })
        this.showDevicesByIndex = updatedIndexes
      }
    },
    removeSensorDef(device, sensorDefinition) {
      this.sensorDefEdited = false
      var sensorDefIndex = device.sensor_definitions
        .map(function(sensorDef) {
          return sensorDef.id
        })
        .indexOf(sensorDefinition.id)
      if (device.sensor_definitions[sensorDefIndex] !== 'undefined') {
        device.sensor_definitions.splice(sensorDefIndex, 1)
      }
    },
    selectInputMeasurementId(sensorDef, $event) {
      sensorDef.output_measurement_id = $event
      this.sensorDefEdited = true
    },
    sortedSensorDefinitions(sensordefs) {
      // sort sensor_definitions: newly added first (if multiple new: sory by name), then first by output_abbr then input_abbr then updated_at
      const sortedSensorDefs = sensordefs.slice().sort(function(a, b) {
        if (a.updated_at === null && b.updated_at !== null) {
          return -1
        }
        if (b.updated_at === null && a.updated_at !== null) {
          return 1
        }
        if (b.updated_at === null && a.updated_at === null) {
          if (a.name > b.name) {
            return -1
          }
          if (b.name > a.name) {
            return 1
          }
        }
        if (a.updated_at !== null && b.updated_at !== null) {
          if (a.output_abbr > b.output_abbr) {
            return 1
          }
          if (b.output_abbr > a.output_abbr) {
            return -1
          }
          if (a.output_abbr === b.output_abbr) {
            if (a.input_abbr > b.input_abbr) {
              return 1
            }
            if (b.input_abbr > a.input_abbr) {
              return -1
            }
            if (a.input_abbr === b.input_abbr) {
              if (a.updated_at > b.updated_at) {
                return -1
              }
              if (b.updated_at < a.updated_at) {
                return 1
              }
              return 0
            }
          }
        }
      })
      return sortedSensorDefs
    },
    toggleDevice(index) {
      if (this.deviceExpanded(index)) {
        this.showDevicesByIndex.splice(
          this.showDevicesByIndex.indexOf(index),
          1
        )
      } else {
        this.showDevicesByIndex.push(index)
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
    updateDevice(device, prop, value) {
      device[prop] = value
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
    font-size: 12px;
    white-space: nowrap;
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
