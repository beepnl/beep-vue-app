<template>
  <Layout :title="$t('Log_data_import')">
    <v-container v-if="ready">
      <v-row v-if="userIsAdmin">
        <v-col v-if="errorMessage" cols="12">
          <v-alert
            text
            prominent
            dense
            type="error"
            color="red"
            class="mt-3 mb-n4"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>

        <v-col v-if="flashLogs.length > 0" cols="12">
          <div class="d-flex justify-space-between align-end">
            <div class="mb-2">
              <div class="overline mt-0 mt-sm-3">
                {{ $t('Log_files') }}
                <v-icon
                  class="mdi mdi-information ml-1 icon-info cursor-pointer"
                  dark
                  small
                  color="accent"
                  @click="showInfo = !showInfo"
                ></v-icon>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div v-if="!mobile">
              <div
                class="beep-label"
                v-text="$t('Nr_of_match_props') + matchProps"
              ></div>
              <v-slider
                v-model="matchProps"
                class="slider--default"
                track-color="#b0b0b0"
                min="5"
                max="12"
                step="1"
                :tick-labels="['5', '6', '7', '8', '9', '10', '11', '12']"
                ticks="always"
                tick-size="4"
              >
              </v-slider>
            </div>
          </div>

          <p v-if="showInfo" class="info-text">
            <em
              >{{ $t('import_log_data_explanation') + ' '
              }}<a :href="$t('import_log_data_support_url')" target="_blank">{{
                $t('import_log_data_url_text')
              }}</a></em
            >
          </p>

          <div class="rounded-border">
            <v-simple-table class="v-data-table--smallfont" dense>
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      ID
                    </th>
                    <th class="text-left">
                      {{ $t('Upload_date') }}
                    </th>
                    <th class="text-left">
                      {{ $tc('device', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $tc('Hive', 1) }}
                    </th>
                    <th class="text-left">
                      {{ $t('Messages') }}
                    </th>
                    <th class="text-left">
                      {{ $t('Log_time') }}
                    </th>
                    <th class="text-left">
                      {{ $t('File_size') }}
                    </th>
                    <th class="text-left">
                      {{ $t('Actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(flashLog, index) in flashLogs"
                    :key="index"
                    :class="
                      (flashLog.id === currentLogId
                        ? 'flashlog-selected'
                        : '') +
                        (flashLog.delete === true ? 'flashlog-delete' : '')
                    "
                  >
                    <td>
                      <span v-text="flashLog.id"></span>
                    </td>
                    <td>
                      <span
                        v-text="momentify(flashLog.created_at, true)"
                      ></span>
                    </td>
                    <td>
                      <span v-text="deviceNameById(flashLog.device_id)"></span>
                    </td>
                    <td>
                      <span v-text="hiveName(flashLog.hive_id)"></span>
                    </td>
                    <td class="td--small">
                      <span v-text="flashLog.log_messages"></span>
                    </td>
                    <td class="td--small">
                      <v-sheet
                        v-if="flashLog.log_has_timestamps === 1"
                        class="beep-icon beep-icon-text color-green text-center"
                      >
                        {{ $t('yes') }}
                      </v-sheet>
                      <v-sheet
                        v-if="flashLog.log_has_timestamps === 0"
                        class="beep-icon beep-icon-text color-red text-center"
                      >
                        {{ $t('no') }}
                      </v-sheet>
                    </td>
                    <td class="td--small">
                      <span
                        v-text="
                          (flashLog.log_size_bytes / 1024 / 1024).toFixed(2) +
                            'MB (' +
                            (
                              (flashLog.bytes_received /
                                flashLog.log_size_bytes) *
                              100
                            ).toFixed(1) +
                            '%)'
                        "
                      ></span>
                    </td>
                    <td>
                      <div class="d-flex flex-no-wrap py-2">
                        <v-btn
                          tile
                          small
                          outlined
                          class="mr-1"
                          color="primary"
                          :disabled="
                            showLoadingIconById.indexOf(flashLog.id) > -1
                          "
                          @click="checkFlashLog(flashLog)"
                        >
                          <v-progress-circular
                            v-if="showLoadingIconById.indexOf(flashLog.id) > -1"
                            class="ml-n1 mr-2"
                            size="18"
                            width="2"
                            color="disabled"
                            indeterminate
                          />
                          <v-icon
                            v-if="
                              // eslint-disable vue/comma-dangle
                              showLoadingIconById.indexOf(flashLog.id) === -1
                            "
                            left
                            >mdi-check</v-icon
                          >
                          {{ $t('check_log_data') }}</v-btn
                        >

                        <v-tooltip
                          v-if="flashLog.delete"
                          open-delay="500"
                          bottom
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon
                              dark
                              color="red"
                              v-on="on"
                              @click="confirmDeleteFlashLog(flashLog)"
                              >mdi-refresh</v-icon
                            >
                          </template>
                          <span v-if="flashLog.delete">{{
                            $t('Undelete')
                          }}</span>
                        </v-tooltip>
                        <v-icon
                          v-if="!flashLog.delete"
                          dark
                          color="red"
                          @click="confirmDeleteFlashLog(flashLog)"
                          >mdi-delete</v-icon
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>

          <div v-if="mobile" class="mt-4 mt-sm-2">
            <div
              class="beep-label"
              v-text="$t('Nr_of_match_props') + matchProps"
            ></div>
            <v-slider
              v-model="matchProps"
              class="slider--default"
              track-color="#b0b0b0"
              min="5"
              max="12"
              step="1"
              :tick-labels="['5', '6', '7', '8', '9', '10', '11', '12']"
              ticks="always"
              tick-size="4"
            >
            </v-slider>
          </div>
        </v-col>
        <v-col v-if="flashLogs.length === 0" cols="12">
          <span>
            <em
              >{{ $t('import_log_data_explanation') + ' '
              }}<a :href="$t('import_log_data_support_url')" target="_blank">{{
                $t('import_log_data_url_text')
              }}</a></em
            >
          </span>
        </v-col>
        <v-col v-if="currentLog" cols="12">
          <div
            class="overline mt-0 mt-sm-3 mb-3"
            v-text="currentLogHeader"
          ></div>
          <div>
            <template v-for="(log, i) in currentLog.log">
              <v-card
                :key="'log' + i"
                :class="
                  'log-panel mb-3 ' +
                    (log.matches !== undefined ? 'log-panel--matches' : '')
                "
                :disabled="log.no_matches !== undefined"
                outlined
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="6" sm="2" md="1">
                      {{ $t('Block') + ': ' + log.block }}
                    </v-col>
                    <v-col cols="6" sm="2" lg="1">
                      {{
                        log.no_matches !== undefined
                          ? log.no_matches.message
                          : log.matches !== undefined
                          ? $t('Matches_found')
                          : ''
                      }}
                    </v-col>
                    <v-col cols="6" sm="3">
                      {{ lengthText(log) }}
                    </v-col>
                    <v-col cols="6" sm="2" md="3">
                      {{
                        momentify(
                          log.time_start,
                          true,
                          smAndDown ? 'll' : 'lll'
                        ) +
                          ' - ' +
                          momentify(
                            log.time_end,
                            true,
                            smAndDown ? 'll' : 'lll'
                          )
                      }}
                    </v-col>
                    <v-col v-if="lgAndUp" cols="1">
                      {{ $t('Firmware_version') + log.fw_version }}
                    </v-col>
                    <v-col v-if="lgAndUp" cols="1">
                      {{ $t('Interval') + log.interval_min }}
                    </v-col>
                    <v-col
                      v-if="log.matches !== undefined"
                      cols="12"
                      sm="3"
                      lg="2"
                    >
                      <div class="d-flex justify-end">
                        <router-link
                          :to="{
                            name: `flashlog`,
                            params: { id: currentLogId },
                            query: { blockId: log.block },
                          }"
                        >
                          <v-btn :small="smAndDown" tile outlined color="black">
                            <v-icon left>mdi-chart-line</v-icon>
                            {{ $t('View_data') }}
                          </v-btn>
                        </router-link>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center my-10">
          {{ $t('no_admin') }}
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
import { momentHumanizeDuration, momentify } from '@mixins/momentMixin'
import { readApiariesAndGroupsIfNotPresent } from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    Layout,
  },
  mixins: [
    momentHumanizeDuration,
    momentify,
    readApiariesAndGroupsIfNotPresent,
  ],
  data() {
    return {
      errorMessage: null,
      showLoadingIconById: [],
      ready: false,
      flashLogs: [],
      showInfo: false,
      currentLogId: null,
      currentLog: null,
      matchProps: 9,
    }
  },
  computed: {
    ...mapGetters('auth', ['userIsAdmin']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    currentLogHeader() {
      return this.currentLog !== null
        ? 'Log ID: ' +
            this.currentLogId +
            ', Time match: ' +
            this.currentLog.time_percentage +
            ', Weight match: ' +
            this.currentLog.weight_percentage +
            ', On/off blocks: ' +
            this.currentLog.log.length +
            ', Lines: ' +
            this.currentLog.lines_received +
            ', Messages: ' +
            this.currentLog.records_flashlog
        : ''
    },
    hives() {
      const ownHivesArray = []
      this.apiaries.forEach((apiary) => {
        apiary.hives.forEach((hive) => {
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      this.groups.forEach((group) => {
        group.hives.forEach((hive) => {
          sharedHivesArray.push(hive)
        })
      })

      const allHives = ownHivesArray.concat(sharedHivesArray)

      var uniqueHives = {}
      const map = new Map()
      for (const item of allHives) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          uniqueHives[item.id] = item
        }
      }
      return uniqueHives
    },
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  created() {
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.readFlashLogs().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async deleteFlashLog(id) {
      this.errorMessage = null
      try {
        await Api.deleteRequest('/flashlogs/', id)
        setTimeout(() => {
          this.readFlashLogs()
        }, 100) // wait for API to update flashlogs
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.error
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    async checkFlashLog(flashLog) {
      this.currentLog = null
      this.errorMessage = null
      this.showLoadingIconById.push(flashLog.id)
      try {
        const response = await Api.readRequest(
          '/flashlogs/' + flashLog.id + '?match_props=' + this.matchProps
        )
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(flashLog.id),
          1
        )
        this.currentLog = response.data
        this.currentLogId = flashLog.id
        // this.confirmCommitFlashLog(flashLog)
      } catch (error) {
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(flashLog.id),
          1
        )
        this.currentLog = null
        this.currentLogId = null
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.error
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    async readFlashLogs() {
      try {
        const response = await Api.readRequest('/flashlogs')
        this.flashLogs = response.data
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          const msg = error.response.data.error
          this.errorMessage = this.$i18n.t(msg)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
    confirmDeleteFlashLog(flashLog) {
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_log_file') +
            ' - ' +
            this.hiveName(flashLog.hive_id),
          this.$i18n.t('delete_log_file') +
            ' "' +
            this.hiveName(flashLog.hive_id) +
            ' - ' +
            this.momentify(flashLog.created_at, true) +
            '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteFlashLog(flashLog.id)
        })
        .catch((reject) => {
          return true
        })
    },
    deviceNameById(id) {
      const deviceByIdArray = this.devices.filter((device) => device.id === id)
      return deviceByIdArray.length > 0 ? deviceByIdArray[0].name : null
    },
    hiveName(hiveId) {
      return this.hives[hiveId] !== undefined && this.hives[hiveId] !== null
        ? this.hives[hiveId].name
        : this.$i18n.tc('Hive_short', 1) + ' ' + this.$i18n.t('unknown')
    },
    lengthText(log) {
      return (
        this.momentHumanizeDuration(
          log.duration_hours,
          'hours',
          this.$i18n.t('Length')
        ) +
        ', ' +
        this.$i18n.t('Messages') +
        ': ' +
        (log.end_i - log.start_i).toString()
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.progress-icon {
  margin-left: 6px;
}
.flashlog-delete {
  background-color: rgba(255, 0, 0, 0.2);
}
.flashlog-selected {
  background-color: $color-orange-light;
}
.log-panel {
  &.log-panel--matches {
    background-color: $color-orange-medium;
  }
  &[aria-expanded='true'] {
    height: auto !important;
  }
}
</style>
