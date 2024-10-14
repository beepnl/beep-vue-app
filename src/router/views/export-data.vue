<template>
  <Layout :title="`${$t('Data_export')}`">
    <v-container v-if="ready">
      <div class="text-overline mt-3 mb-2" v-text="$t('Data_export')"></div>
      <div class="rounded-border mb-6">
        <v-row>
          <v-col cols="12">
            <p v-text="$t('Export_your_data')"></p>
          </v-col>
          <v-col cols="12">
            <v-checkbox-btn
              v-model="includeGroupData"
              :label="$t('Include_group_data')"
              class="mt-1 mr-6"
              hide-details
            ></v-checkbox-btn>
            <v-checkbox-btn
              v-model="includeSensorData"
              :label="$t('Include_sensor_data')"
              class="mt-1"
              hide-details
            ></v-checkbox-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-space-between" cols="12">
            <v-spacer></v-spacer>
            <div
              style="width: 100%;"
              :class="'d-flex justify-end' + (mobile ? ' flex-column' : '')"
            >
              <v-btn
                color="accent"
                class="save-button-mobile-wide"
                :disabled="showEmailLoadingIcon"
                @click="exportData(0)"
              >
                <v-progress-circular
                  v-if="showEmailLoadingIcon"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="accent"
                  indeterminate
                />
                <v-icon v-if="!showEmailLoadingIcon" start color="accent"
                  >mdi-email-outline</v-icon
                >{{ $t('Email_export') }}</v-btn
              >
              <v-btn
                v-if="!(csvLink && browserDoesNotSupportDownloadTrick)"
                color="accent"
                :disabled="showDownloadLoadingIcon"
                class="mt-3 mt-sm-0 ml-sm-3 save-button-mobile-wide"
                @click="exportData(1)"
              >
                <v-progress-circular
                  v-if="showDownloadLoadingIcon"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="accent"
                  indeterminate
                />
                <v-icon v-if="!showDownloadLoadingIcon" start color="accent"
                  >mdi-download</v-icon
                >{{ $t('Download_csv') }}</v-btn
              >
              <v-btn
                v-if="csvLink && browserDoesNotSupportDownloadTrick"
                color="accent"
                class="mt-3 mt-sm-0 ml-sm-3 save-button-mobile-wide"
                :href="csvLink"
                target="_blank"
              >
                <v-icon start color="accent">mdi-export</v-icon
                >{{ $t('Open_csv') }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>

      <v-row v-if="showSuccessMessage">
        <v-col cols="12">
          <v-alert
            v-model="showSuccessMessage"
            closable
            type="success"
            color="green"
          >
            <template v-slot:prepend>
              <v-icon :icon="'mdi-check-circle'" class="text-green"> </v-icon>
            </template>
            {{ successMessage }}
            <template v-slot:close>
              <v-icon
                :icon="'mdi-close'"
                class="text-green mr-n2 cursor-pointer"
                @close="showSuccessMessage = false"
              >
              </v-icon>
            </template>
          </v-alert>
        </v-col>
      </v-row>

      <div v-if="devices.length > 0">
        <v-row v-if="errorMessage">
          <v-col cols="12">
            <v-alert type="error" color="red" class="mb-3">
              <template v-slot:prepend>
                <v-icon :icon="'mdi-alert'" class="text-red"> </v-icon>
              </template>
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>

        <div
          class="text-overline mb-2"
          v-text="$tc('device', 1) + ' ' + $t('Data_export')"
        ></div>
        <div class="rounded-border">
          <v-row>
            <v-col cols="12">
              <p v-text="$t('Export_sensor_data')"></p>
            </v-col>
          </v-row>
          <v-row v-if="devices.length > 0">
            <v-col cols="12" md="8" lg="6">
              <div class="beep-label" v-text="`${$tc('device', 1)}`"></div>
              <Treeselect
                v-if="devices.length > 0"
                v-model="selectedDeviceId"
                :options="devicesOptions"
                :placeholder="`${$t('Select')} ${$tc('device', 1)}`"
                :no-results-text="`${$t('no_results')}`"
                :disable-branch-nodes="true"
                :default-expand-level="1"
                search-nested
                allow-clearing-disabled
                @update:model-value="loadMeasurementTypesAvailable"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <div class="d-flex justify-flex-start align-center">
                <v-icon class="mt-4 mr-2" large>mdi-calendar-clock</v-icon>
                <div>
                  <div class="beep-label">
                    <span v-text="$t('period')"></span>
                  </div>

                  <VueDatePicker
                    :format="dateRangeText"
                    :model-value="dates"
                    :model-type="datePickerFormat"
                    hide-input-icon
                    range
                    min-range="1"
                    :clearable="false"
                    :enable-time-picker="false"
                    :placeholder="
                      dates.length === 0 ? $t('selection_placeholder') : null
                    "
                    :locale="locale"
                    :select-text="$t('ok')"
                    :cancel-text="$t('Cancel')"
                    class=" range-datepicker text-accent"
                    @update:model-value="updateDates($event)"
                  />
                </div>
              </div>
            </v-col>
          </v-row>

          <v-row v-if="dataAvailable">
            <v-col cols="12" md="9" lg="6">
              <div
                class="beep-label"
                v-text="`${$t('Sensor_measurements')}`"
              ></div>
              <Treeselect
                v-model="selectedMeasurementTypes"
                :options="measurementTypes"
                :normalizer="normalizerMeasurementTypes"
                :placeholder="
                  `${$t('Select')} ${$t(
                    // eslint-disable-next-line vue/comma-dangle
                    'Sensor_measurements'
                  ).toLowerCase()}`
                "
                :no-results-text="`${$t('no_results')}`"
                :max-height="mobile ? 120 : 180"
                :multiple="true"
              />
            </v-col>
            <v-col cols="12" md="3">
              <div
                class="beep-label"
                v-text="`${$t('CSV_export_separator')}`"
              ></div>
              <Treeselect
                v-model="selectedSeparator"
                :options="separators"
                :placeholder="`${$t('Select')} ${$t('CSV_export_separator')}`"
                :no-results-text="`${$t('no_results')}`"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-space-between" cols="12">
              <v-spacer></v-spacer>
              <v-btn
                v-if="
                  !(csvDeviceDataLink && browserDoesNotSupportDownloadTrick)
                "
                :disabled="
                  !dataAvailable ||
                    dates[0] === dates[1] ||
                    dates.length < 2 ||
                    showDeviceDataLoadingIcon
                "
                color="accent"
                class="save-button-mobile-wide"
                @click="exportDeviceData"
              >
                <v-progress-circular
                  v-if="showDeviceDataLoadingIcon"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="accent"
                  indeterminate
                />
                <v-icon v-if="!showDeviceDataLoadingIcon" start color="accent"
                  >mdi-download</v-icon
                >{{ $t('download') + ' ' + $t('Sensor_measurements') }}</v-btn
              >
              <v-btn
                v-if="csvDeviceDataLink && browserDoesNotSupportDownloadTrick"
                color="accent"
                class="mt-3 mt-sm-0 ml-sm-3 save-button-mobile-wide"
                :href="csvDeviceDataLink"
                target="_blank"
              >
                <v-icon start color="accent">mdi-export</v-icon
                >{{ $t('Open_csv') }}</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Treeselect from '@komgrip/vue3-treeselect' // original 'vue3-treeselect' does not support multiple values reactivity
import Layout from '@/src/router/layouts/back-layout.vue'
import { mapGetters } from 'vuex'
import { readDevicesIfNotChecked, sortedDevices } from '@mixins/methodsMixin'
import { momentFormat } from '@mixins/momentMixin'

export default {
  components: {
    Layout,
    Treeselect,
  },
  mixins: [momentFormat, readDevicesIfNotChecked, sortedDevices],
  data() {
    return {
      normalizerMeasurementTypes(node) {
        return {
          id: node.abbreviation,
        }
      },
      separators: [
        {
          id: ';',
          label: '; (semicollon)',
        },
        {
          id: ',',
          label: ', (comma)',
        },
        {
          id: '|',
          label: '| (pipe)',
        },
      ],
      selectedSeparator: ';',
      menu: false,
      dates: [
        this.$moment()
          .add(-1, 'weeks')
          .toISOString()
          .substr(0, 10),
        this.$moment()
          .toISOString()
          .substr(0, 10),
      ],
      measurementTypes: null,
      selectedMeasurementTypes: [],
      errorMessage: null,
      successMessage: null,
      showSuccessMessage: false,
      showEmailLoadingIcon: false,
      showDownloadLoadingIcon: false,
      showDeviceDataLoadingIcon: false,
      ready: false,
      baseApiUrl:
        process.env.VUE_APP_BASE_API_URL ||
        process.env.VUE_APP_BASE_API_URL_FALLBACK,
      includeGroupData: false,
      includeSensorData: false,
      csvLink: null,
      csvDeviceDataLink: null,
      datePickerFormat: 'yyyy-MM-dd',
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    browser() {
      const test = function(regexp) {
        return regexp.test(window.navigator.userAgent)
      }
      switch (true) {
        case test(/edg/i):
          return 'Microsoft Edge'
        case test(/trident/i):
          return 'Microsoft Internet Explorer'
        case test(/firefox|fxios/i):
          return 'Mozilla Firefox'
        case test(/opr\//i):
          return 'Opera'
        case test(/ucbrowser/i):
          return 'UC Browser'
        case test(/samsungbrowser/i):
          return 'Samsung Browser'
        case test(/chrome|chromium|crios/i):
          return 'Google Chrome'
        case test(/safari/i):
          return 'Apple Safari'
        default:
          return 'Other'
      }
      // return navigator.userAgent
    },
    browserDoesNotSupportDownloadTrick() {
      return this.browser === 'Apple Safari'
    },
    dataAvailable() {
      return this.measurementTypes !== null
        ? Object.keys(this.measurementTypes).length > 0
        : false
    },
    devicesOptions() {
      return this.sortedDevices()
    },
    mobile() {
      return this.$vuetify.display.xs
    },
    selectedDevice() {
      return this.devices.filter(
        (device) => device.id === this.selectedDeviceId
      )[0]
    },
    selectedDeviceId: {
      get() {
        return parseInt(this.$store.getters['devices/selectedDeviceId'])
      },
      set(value) {
        this.$store.commit('devices/setSelectedDeviceId', parseInt(value))
      },
    },
    requiredRules() {
      let laterEndDate = true
      this.dates.length === 2 && this.dates[0] > this.dates[1]
        ? (laterEndDate = false)
        : (laterEndDate = true)
      return [
        (v) => laterEndDate || this.$i18n.t('later_end_start'), // don't allow start date later than end date
        (v) =>
          this.dates[0] !== this.dates[1] ||
          this.$i18n.t('different_end_start'), // don't allow end date identical to start date
        (v) =>
          this.dates.length > 1 ||
          this.$i18n.t('end_date') + ' ' + this.$i18n.t('not_filled'), // don't allow start date only
      ]
    },
  },
  created() {
    this.readDevicesIfNotChecked()
      .then(() => {
        this.setInitialDeviceId()
      })
      .then(() => {
        this.loadMeasurementTypesAvailable()
      })
      .then(() => {
        this.ready = true
      })
  },
  methods: {
    async exportData(link = 0) {
      this.errorMessage = null
      this.csvLink = null
      this.showEmailLoadingIcon = link === 0
      this.showDownloadLoadingIcon = link === 1
      this.showSuccessMessage = false
      try {
        const response = await Api.readRequest(
          '/export?groupdata=' +
            (this.includeGroupData ? '1' : '0') +
            '&sensordata=' +
            (this.includeSensorData ? '1' : '0') +
            '&link=' +
            link
        )
        this.showEmailLoadingIcon = false
        this.showDownloadLoadingIcon = false

        if (response.data.link) {
          const responseLink = response.data.link
          this.csvLink =
            responseLink.indexOf('https://') > -1
              ? responseLink
              : this.baseApiUrl + responseLink
        }

        // trick to download returned csv link (doesn't work via v-btn because it has already been clicked)
        // does not work for safari
        if (response.data.link && !this.browserDoesNotSupportDownloadTrick) {
          const aLink = document.createElement('a')
          aLink.href = this.csvLink
          aLink.setAttribute('download', this.csvLink)
          document.body.appendChild(aLink)
          aLink.click()
          if (response.status === 200) {
            this.showSuccessMessage = true
            this.successMessage = this.$i18n.t('excel_file_saved')
          }
        } else if (response.data.email === 1) {
          this.showSuccessMessage = true
          this.successMessage = this.$i18n.t('export_email_sent')
        }
        return response
      } catch (error) {
        console.log('Error: ', error)
        this.errorMessage = this.$i18n.t('no_data')
        this.showEmailLoadingIcon = false
        this.showDownloadLoadingIcon = false
      }
    },
    async exportDeviceData() {
      this.errorMessage = null
      this.csvDeviceDataLink = null
      this.showDeviceDataLoadingIcon = true
      const payload = {
        device_id: this.selectedDeviceId,
        start: this.dates[0],
        end: this.dates[1],
        separator: this.selectedSeparator,
        measurements: this.selectedMeasurementTypes,
        link: 1,
      }
      try {
        const response = await Api.postRequest('/export/csv', payload)
        this.showDeviceDataLoadingIcon = false
        if (response.status === -1) {
          this.errorMessage = this.$i18n.t('too_much_data')
        }
        const responseLink = response.data.link
        this.csvDeviceDataLink =
          responseLink.indexOf('https://') > -1
            ? responseLink
            : this.baseApiUrl + responseLink
        // trick to download returned csv link (doesn't work via v-btn because it has already been clicked)
        // does not work for safari
        if (!this.browserDoesNotSupportDownloadTrick) {
          const link = document.createElement('a')
          link.href = this.csvDeviceDataLink
          link.setAttribute('download', this.csvDeviceDataLink)
          document.body.appendChild(link)
          link.click()
        }
        if (response.status === 200) {
          this.showSuccessMessage = true
          this.successMessage = this.$i18n.t('excel_file_saved')
        }
        return response
      } catch (error) {
        console.log('Error: ', error)
        this.errorMessage = this.$i18n.t('no_data')
        this.showDeviceDataLoadingIcon = false
      }
    },
    async loadMeasurementTypesAvailable() {
      this.errorMessage = null
      try {
        const response = await Api.readRequest(
          '/sensors/measurement_types_available?device_id=' +
            this.selectedDeviceId +
            '&start=' +
            this.dates[0] +
            '&end=' +
            this.dates[1]
        )
        const rawMeasurementTypes = Object.values(response.data)
        this.measurementTypes = this.generateMeasurementTypes(
          rawMeasurementTypes
        )
        return true
      } catch (error) {
        this.measurementTypes = null
        this.errorMessage = this.$i18n.t('no_chart_data')
        console.log('Error: ', error)
      }
    },
    dateRangeText(dates) {
      if (this.dates.length > 0) {
        const momentDates = [
          this.momentFormat(this.dates[0], 'll'),
          this.dates[1] !== undefined
            ? this.momentFormat(this.dates[1], 'll')
            : '',
        ]
        return momentDates.join(' - ')
      } else {
        return dates
      }
    },
    generateMeasurementTypes(rawMeasurementTypes) {
      // check if most recent sensordef of the selected device with same abbreviation as output_abbr has a name
      // if so: this will be the label. If not: set default translation as the label.
      const sortedSensorDefs = this.sortedSensorDefinitions(
        this.selectedDevice.sensor_definitions
      )
      const measurementTypesWithLabel = rawMeasurementTypes
      measurementTypesWithLabel.map((measurementType) => {
        let label = ''
        const match = sortedSensorDefs.filter(
          (sensorDef) => sensorDef.output_abbr === measurementType.abbreviation
        )
        if (match.length > 0 && match[0].name !== null) {
          label = match[0].name
        } else {
          label = this.$i18n.t(measurementType.abbreviation)
        }
        measurementType.label = label
        return measurementType
      })
      const sortedMeasurementTypes = measurementTypesWithLabel
        .slice()
        .sort(function(a, b) {
          if (a.label.toLowerCase() > b.label.toLowerCase()) {
            return 1
          }
          if (b.label.toLowerCase() > a.label.toLowerCase()) {
            return -1
          }
          return 0
        })

      return sortedMeasurementTypes
    },
    setInitialDeviceId() {
      if (isNaN(this.selectedDeviceId) && this.devices.length > 0) {
        this.selectedDeviceId = this.devices[0].id
      }
    },
    sortedSensorDefinitions(sensordefs) {
      // sort sensor_definitions: sort first by output_abbr then updated_at
      const sortedSensorDefs = sensordefs.slice().sort(function(a, b) {
        if (a.output_abbr > b.output_abbr) {
          return 1
        }
        if (b.output_abbr > a.output_abbr) {
          return -1
        }
        if (a.output_abbr === b.output_abbr) {
          if (a.updated_at > b.updated_at) {
            return -1
          }
          if (b.updated_at < a.updated_at) {
            return 1
          }
          return 0
        }
        return 0
      })
      return sortedSensorDefs
    },
    updateDates(dates) {
      this.dates = dates
      this.loadMeasurementTypesAvailable()
    },
  },
}
</script>
