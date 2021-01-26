<template>
  <Layout :title="`${$t('Data_export')}`">
    <v-container v-if="ready">
      <div class="overline mt-3 mb-2" v-text="$t('Data_export')"></div>
      <div class="rounded-border mb-6">
        <v-row>
          <v-col cols="12">
            <p v-text="$t('Export_your_data')"></p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-space-between" cols="12">
            <v-spacer></v-spacer>
            <v-btn
              tile
              outlined
              color="primary"
              class="save-button"
              @click="exportData"
            >
              <v-progress-circular
                v-if="showDataLoadingIcon"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="primary"
                indeterminate
              />
              <v-icon v-if="!showDataLoadingIcon" left>mdi-download</v-icon
              >{{ $t('Data_export') }}</v-btn
            >
          </v-col>
        </v-row>
      </div>

      <v-row v-if="errorMessage">
        <v-col cols="12">
          <v-alert text prominent dense type="error" color="red" class="mb-0">
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>

      <div
        class="overline mb-2"
        v-text="$tc('device', 1) + ' ' + $t('Data_export')"
      ></div>
      <div class="rounded-border">
        <v-row>
          <v-col cols="12">
            <p v-text="$t('Export_sensor_data')"></p>
          </v-col>
        </v-row>
        <v-row v-if="devices.length > 0">
          <v-col cols="12" md="9" lg="6">
            <div class="beep-label" v-text="`${$tc('device', 1)}`"></div>
            <Treeselect
              v-if="devices.length > 0"
              v-model="selectedDeviceId"
              :options="sortedDevices"
              :placeholder="`${$t('Select')} ${$tc('device', 1)}`"
              :no-results-text="`${$t('no_results')}`"
              :disable-branch-nodes="true"
              :default-expand-level="1"
              search-nested
              allow-clearing-disabled
              @input="loadMeasurementTypesAvailable"
            />
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  :rules="requiredRules"
                  :label="$t('period')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                :first-day-of-week="1"
                :locale="locale"
                range
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  {{ $t('Cancel') }}
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                  {{ $t('ok') }}
                </v-btn>
              </v-date-picker>
            </v-menu>
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
              multiple
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
              :disabled="
                !dataAvailable || dates[0] === dates[1] || dates.length < 2
              "
              tile
              outlined
              color="primary"
              class="save-button"
              @click="exportDeviceData"
            >
              <v-progress-circular
                v-if="showDeviceDataLoadingIcon"
                class="ml-n1 mr-2"
                size="18"
                width="2"
                color="primary"
                indeterminate
              />
              <v-icon v-if="!showDeviceDataLoadingIcon" left
                >mdi-download</v-icon
              >{{ $t('download') + ' ' + $t('Sensor_measurements') }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="devices.length === 0">
          <v-col cols="12">
            <p v-text="$t('no_chart_data')"></p>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Layout from '@layouts/back.vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Layout,
    Treeselect,
  },
  data() {
    return {
      normalizerMeasurementTypes(node) {
        return {
          id: node.abbreviation,
          label: node.pq_name_unit,
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
      devices: [],
      errorMessage: null,
      showDataLoadingIcon: false,
      showDeviceDataLoadingIcon: false,
      ready: false,
    }
  },
  computed: {
    baseApiUrl() {
      var baseUrl = process.env.VUE_APP_API_URL
      baseUrl = baseUrl.replace('/api/', '')
      return baseUrl
    },
    dataAvailable() {
      return this.measurementTypes !== null
        ? Object.keys(this.measurementTypes).length > 0
        : false
    },
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    selectedDeviceId: {
      get() {
        return this.$store.getters['devices/selectedDeviceId']
      },
      set(value) {
        this.$store.commit('devices/setSelectedDeviceId', parseInt(value))
      },
    },
    sortedDevices() {
      var apiaryArray = []
      this.devices.map((device, index) => {
        apiaryArray.push({
          id: -(index + 1), // random because it has to have an id for Treeselect but won't be used later
          label: device.location_name,
          children: [],
        })
        device.label = device.hive_name
          ? device.hive_name + ' - ' + device.name
          : device.name
      })
      var uniqueApiaries = []
      const map = new Map()
      for (const item of apiaryArray) {
        if (!map.has(item.label)) {
          map.set(item.label, true) // set any value to Map
          uniqueApiaries.push(item)
        }
      }
      uniqueApiaries.slice().sort(function(a, b) {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })
      this.devices.map((device) => {
        uniqueApiaries.map((apiary) => {
          if (apiary.label === device.location_name) {
            apiary.children.push(device)
          }
        })
      })
      uniqueApiaries.map((apiary) => {
        var sortedChildren = apiary.children.slice().sort(function(a, b) {
          if (a.label < b.label) {
            return -1
          }
          if (a.label > b.label) {
            return 1
          }
          return 0
        })
        apiary.children = sortedChildren
      })
      return uniqueApiaries
    },
    requiredRules() {
      return [
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
    this.readDevices()
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
    async exportData() {
      this.errorMessage = null
      this.showDataLoadingIcon = true
      try {
        const response = await Api.readRequest('/export')
        this.showDataLoadingIcon = false
        return response
      } catch (error) {
        console.log('Error: ', error)
        this.errorMessage = this.$i18n.t('no_data')
        this.showDeviceDataLoadingIcon = false
      }
    },
    async exportDeviceData() {
      this.errorMessage = null
      this.showDeviceDataLoadingIcon = true
      var payload = {
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
        const csvLink = this.baseApiUrl + response.data.link
        // trick to download returned csv link (doesn't work via v-btn because it has already been clicked)
        var link = document.createElement('a')
        link.href = csvLink
        link.setAttribute('download', csvLink)
        document.body.appendChild(link)
        link.click()
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
        this.measurementTypes = Object.values(response.data)
        return true
      } catch (error) {
        this.measurementTypes = null
        this.errorMessage = this.$i18n.t('no_chart_data')
        console.log('Error: ', error)
      }
    },
    async readDevices() {
      try {
        const response = await Api.readRequest('/devices')
        this.devices = response.data
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    setInitialDeviceId() {
      if (this.selectedDeviceId === null) {
        this.selectedDeviceId = this.devices[0].id
      }
    },
  },
}
</script>
