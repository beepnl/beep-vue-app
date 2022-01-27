<template>
  <Layout :title="$t('Log_data_import')">
    <v-toolbar
      v-if="!mobile && flashLogs.length > 0"
      class="save-bar save-bar--back"
      dense
      light
    >
      <v-spacer></v-spacer>
      <div class="beep-label mr-1" v-text="$t('From_cache') + ': '"></div>
      <v-switch
        v-model="fromCache"
        class="pt-0 mt-0 mr-2"
        dense
        hide-details
      ></v-switch>
      <div class="beep-label" v-text="$t('Nr_of_match_props') + ': '"></div>
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
        style="max-width: 200px;"
      >
      </v-slider>
    </v-toolbar>

    <v-container v-if="ready" :class="mobile ? '' : 'back-content'">
      <v-row>
        <v-col v-if="importMessage" cols="12">
          <v-alert
            text
            prominent
            dense
            type="success"
            color="green"
            class="mt-3 mb-n4"
          >
            {{ importSentence }}
          </v-alert>
        </v-col>

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
            <v-data-table
              :headers="logFileHeaders"
              :items="flashLogs"
              :items-per-page="mobile ? 1 : 5"
              :item-class="rowClassLogFile"
              :search="logFileSearch"
              :no-data-text="$t('no_data')"
              :no-results-text="$t('no_results')"
              multi-sort
              class="elevation-0"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="logFileSearch"
                  :label="$t('Search')"
                  class="mx-1 mx-sm-4"
                ></v-text-field>
              </template>

              <template v-slot:[`item.created_at`]="{ item }">
                <span v-text="momentify(item.created_at, true)"></span>
              </template>

              <template v-slot:[`item.device_name`]="{ item }">
                <span
                  v-text="
                    item.device_name !== null ? item.device_name : $t('unknown')
                  "
                ></span>
              </template>

              <template v-slot:[`item.hive_name`]="{ item }">
                <span
                  v-text="
                    item.hive_name !== null ? item.hive_name : $t('unknown')
                  "
                ></span>
              </template>

              <template v-slot:[`item.log_has_timestamps`]="{ item }">
                <v-sheet
                  v-if="item.log_has_timestamps === 1"
                  class="beep-icon beep-icon-text color-green text-center"
                >
                  {{ $t('yes') }}
                </v-sheet>
                <v-sheet
                  v-if="item.log_has_timestamps === 0"
                  class="beep-icon beep-icon-text color-red text-center"
                >
                  {{ $t('no') }}
                </v-sheet>
              </template>

              <template v-slot:[`item.bytes_received`]="{ item }">
                <span v-text="fileSizeText(item)"></span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <div class="d-flex flex-no-wrap py-2">
                  <v-btn
                    tile
                    small
                    outlined
                    class="mr-1"
                    color="accent"
                    :disabled="showLoadingIconById.indexOf(item.id) > -1"
                    @click="checkFlashLog(item.id)"
                  >
                    <v-progress-circular
                      v-if="showLoadingIconById.indexOf(item.id) > -1"
                      class="ml-n1 mr-2"
                      size="18"
                      width="2"
                      color="disabled"
                      indeterminate
                    />
                    <v-icon
                      v-if="
                        // eslint-disable vue/comma-dangle
                        showLoadingIconById.indexOf(item.id) === -1
                      "
                      left
                      >mdi-check</v-icon
                    >
                    {{ $t('check_log_data') }}</v-btn
                  >

                  <v-tooltip v-if="item.delete" open-delay="500" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        dark
                        color="red"
                        v-on="on"
                        @click="confirmDeleteFlashLog(item)"
                        >mdi-refresh</v-icon
                      >
                    </template>
                    <span v-if="item.delete">{{ $t('Undelete') }}</span>
                  </v-tooltip>
                  <v-icon
                    v-if="!item.delete"
                    dark
                    color="red"
                    @click="confirmDeleteFlashLog(item)"
                    >mdi-delete</v-icon
                  >
                </div>
              </template>
            </v-data-table>
          </div>

          <div v-if="mobile" class="mt-4 mt-sm-2 d-flex flex-row">
            <div class="mr-6">
              <div class="beep-label ml-1 mb-4" v-text="$t('From_cache')"></div>
              <v-switch
                v-model="fromCache"
                class="pt-0 mt-0"
                dense
                hide-details
              ></v-switch>
            </div>
            <div>
              <div class="beep-label" v-text="$t('Nr_of_match_props')"></div>
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

        <v-col
          v-if="selectedFlashLog && selectedFlashLog.log !== undefined"
          ref="log-data"
          cols="12"
        >
          <div
            class="overline primary--text mt-0 mt-sm-3 mb-3"
            v-text="selectedFlashLogHeader"
          ></div>

          <div class="rounded-border primary-border">
            <v-data-table
              :headers="logDataHeaders"
              :items="selectedFlashLog.log"
              :items-per-page="5"
              :item-class="rowClassLogData"
              :no-data-text="$t('no_data')"
              :no-results-text="$t('no_results')"
              multi-sort
              class="elevation-0"
            >
              <template v-slot:[`item.matches`]="{ item }">
                <span
                  v-if="
                    item.matches === undefined && item.no_matches !== undefined
                  "
                  v-text="
                    // eslint-disable vue/no-v-html
                    item.no_matches.message
                  "
                ></span>
                <span
                  v-if="item.matches !== undefined"
                  class="cursor-pointer"
                  @click="matchesOverlay = item.block"
                  v-text="matchesText(item)"
                ></span>

                <v-overlay
                  v-if="
                    item.matches !== undefined && item.block === matchesOverlay
                  "
                >
                  <v-toolbar class="hive-color-picker-toolbar" dense light flat>
                    <div
                      class="hive-color-picker-title ml-1"
                      v-text="matchesHeader(item)"
                    ></div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-icon class="mr-1" @click="matchesOverlay = null"
                        >mdi-close</v-icon
                      >
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-container class="matches-container">
                    <v-row>
                      <v-col
                        v-for="(match, i) in item.matches.matches"
                        :key="'match ' + i"
                        :cols="mobile ? 6 : 3"
                        class="text-left"
                      >
                        <span v-text="matchText(match, i)"></span>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-overlay>
              </template>

              <template v-slot:[`item.duration_hours`]="{ item }">
                <span v-html="sizeText(item)"></span>
              </template>

              <template v-slot:[`item.dbCount`]="{ item }">
                <span
                  v-if="item.matches !== undefined"
                  v-html="missingDataText(item)"
                ></span>
              </template>

              <template v-slot:[`item.time_end`]="{ item }">
                <span
                  v-if="item.matches !== undefined"
                  v-html="periodText(item)"
                ></span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <router-link
                  v-if="item.matches !== undefined && selectedFlashLog !== null"
                  :to="{
                    name: `flashlog`,
                    params: { id: selectedFlashLog.flashlog_id },
                    query: { blockId: item.block },
                  }"
                >
                  <v-btn :small="smAndDown" tile outlined color="accent">
                    <v-icon left>mdi-chart-line</v-icon>
                    {{ $t('View_data') }}
                  </v-btn>
                </router-link>
              </template>
            </v-data-table>
          </div>
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
  props: {
    importMessage: {
      type: Object,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      errorMessage: null,
      showLoadingIconById: [],
      ready: false,
      flashLogs: [],
      showInfo: false,
      matchProps: 9,
      logDataHeaders: [
        { text: this.$i18n.t('Block'), value: 'block' },
        { text: this.$i18n.tc('Match', 2), value: 'matches' },
        {
          text: this.$i18n.t('Size'),
          value: 'duration_hours',
        },
        {
          text: this.$i18n.t('Missing_data'),
          value: 'dbCount',
        },
        {
          text: this.$i18n.t('period'),
          value: 'time_end',
        },
        {
          text: this.$i18n.t('Firmware_version'),
          value: 'fw_version',
        },
        {
          text: this.$i18n.t('Interval') + ' (min)',
          value: 'interval_min',
        },
        { text: this.$i18n.t('Actions'), sortable: false, value: 'actions' },
      ],
      logFileSearch: null,
      logFileHeaders: [
        { text: 'ID', value: 'id' },
        { text: this.$i18n.t('Upload_date'), value: 'created_at' },
        {
          text: this.$i18n.tc('device', 1),
          value: 'device_name',
        },
        {
          text: this.$i18n.tc('Hive', 1),
          value: 'hive_name',
        },
        {
          text: this.$i18n.t('Messages'),
          value: 'log_messages',
        },
        {
          text: this.$i18n.t('persisted_measurements'),
          value: 'persisted_measurements',
        },

        {
          text: this.$i18n.t('Log_time'),
          value: 'log_has_timestamps',
        },
        {
          text: this.$i18n.t('File_size'),
          value: 'bytes_received',
        },
        { text: this.$i18n.t('Actions'), sortable: false, value: 'actions' },
      ],
      fromCache: true,
      matchesOverlay: null,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    importSentence() {
      return this.importMessage !== null && this.importMessage.data_stored
        ? this.$i18n.t('data_stored_for_log') +
            this.importMessage.flashlog_id +
            ' - ' +
            this.importMessage.device_name +
            ' - ' +
            this.$i18n.t('Block') +
            ' ' +
            this.importMessage.block_id +
            '. ' +
            this.$i18n.t('persisted_measurements') +
            ': ' +
            this.importMessage.persisted_measurements +
            ', ' +
            this.$i18n.t('persisted_days') +
            ': ' +
            this.importMessage.persisted_days
        : this.$i18n.t('no_data_stored') +
            '. ' +
            JSON.stringify(this.importMessage)
    },
    selectedFlashLog: {
      get() {
        return this.$store.getters['devices/selectedFlashLog']
      },
      set(value) {
        this.$store.commit('devices/setData', {
          prop: 'selectedFlashLog',
          value,
        })
      },
    },
    selectedFlashLogHeader() {
      return this.selectedFlashLog !== null &&
        this.selectedFlashLog.log !== undefined
        ? 'Log ID: ' +
            this.selectedFlashLog.flashlog_id +
            ', ' +
            this.$i18n.tc('device', 1) +
            ': ' +
            this.selectedFlashLog.device_name +
            ', Time match: ' +
            this.selectedFlashLog.time_percentage +
            ', Weight match: ' +
            this.selectedFlashLog.weight_percentage +
            ', On/off blocks: ' +
            this.selectedFlashLog.log.length +
            ', Lines: ' +
            this.selectedFlashLog.lines_received +
            ', Messages: ' +
            this.selectedFlashLog.records_flashlog
        : ''
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
        if (
          localStorage.beepPreviousRoute === 'flashlog' &&
          this.selectedFlashLog !== null &&
          this.importMessage === null
        ) {
          // update flashlog result if coming from the flashlog view & flashlog has previously been selected (= saved in store) and has not just been imported
          this.checkFlashLog(this.selectedFlashLog.flashlog_id)
        } else {
          this.selectedFlashLog = null
        }
        this.ready = true
      })
    })
  },
  methods: {
    async deleteFlashLog(id) {
      this.clearMessages()
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
    async checkFlashLog(flashLogId) {
      this.clearMessages()
      this.selectedFlashLog = null
      this.showLoadingIconById.push(flashLogId)
      try {
        const response = await Api.readRequest(
          '/flashlogs/' +
            flashLogId +
            '?match_props=' +
            this.matchProps +
            '&from_cache=' +
            (this.fromCache ? '1' : '0')
        )
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(flashLogId),
          1
        )
        this.selectedFlashLog = response.data

        if (this.selectedFlashLog.log !== undefined) {
          setTimeout(() => {
            this.scrollTo('log-data')
          }, 100)
        } else {
          this.errorMessage = this.$i18n.t('no_flashlog_data')
        }
      } catch (error) {
        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(flashLogId),
          1
        )
        this.selectedFlashLog = null
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
          this.$i18n.t('delete_log_file') + ' - ' + flashLog.hive_name,
          this.$i18n.t('delete_log_file') +
            ' "' +
            flashLog.hive_name +
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
    clearMessages() {
      this.importMessage = null
      this.errorMessage = null
    },
    fileSizeText(item) {
      var nrOfMB = (item.bytes_received / 1024 / 1024).toFixed(2)
      return (
        nrOfMB +
        'MB (' +
        (item.log_size_bytes !== null
          ? ((item.bytes_received / item.log_size_bytes) * 100).toFixed(1) + '%'
          : this.$i18n.t('unknown')) +
        ')'
      )
    },
    matchText(match, index) {
      var text = index + ': '
      Object.entries(match).map(([key, value]) => {
        if (key !== 'flashlog_index' && key !== 'minute_interval') {
          text += key + ': ' + value + ', '
        }
      })
      return text
    },
    matchesHeader(log) {
      return (
        this.matchesText(log) +
        ' (Log ' +
        this.selectedFlashLog.flashlog_id +
        ', ' +
        this.$i18n.t('Block') +
        ' ' +
        log.block +
        ')'
      )
    },
    matchesText(log) {
      var nrOfMatches = Object.keys(log.matches.matches).length
      return this.$i18n.t('Matches_found') + ': ' + nrOfMatches
    },
    missingDataText(log) {
      var ptNotInDb = this.percentageNotInDB(log)
      return (
        ptNotInDb +
        '% ' +
        this.$i18n.t('not_yet_in_db') +
        '<br>' +
        '(' +
        this.momentHumanizeDuration(
          log.duration_hours * (ptNotInDb / 100),
          'hours'
        ) +
        ')'
      )
    },
    percentageNotInDB(log) {
      return (100 * (1 - log.dbCount / log.setCount)).toFixed(1)
    },
    periodText(log) {
      return (
        this.momentify(log.time_start, true, this.smAndDown ? 'll' : 'lll') +
        ' -<br>' +
        this.momentify(log.time_end, true, this.smAndDown ? 'll' : 'lll')
      )
    },
    rowClassLogData(item) {
      return item.matches === undefined
        ? 'no-match-block'
        : 'match-block ' +
            (this.percentageNotInDB(item) > 10 ? 'much-missing' : 'few-missing')
    },
    rowClassLogFile(item) {
      return this.selectedFlashLog !== null &&
        item.id === this.selectedFlashLog.flashlog_id
        ? 'flashlog-selected'
        : '' + (item.delete === true ? 'flashlog-delete' : '')
    },
    scrollTo(refName) {
      var element = this.$refs[refName]
      var offset = this.mobile ? 54 : 60
      var top = element.offsetTop

      window.scrollTo(0, top - offset)
    },
    sizeText(log) {
      return (
        this.momentHumanizeDuration(
          log.duration_hours,
          'hours',
          this.$i18n.t('Length')
        ) +
        '<br>' +
        this.$i18n.t('Messages') +
        ': ' +
        (log.end_i - log.start_i).toString()
      )
    },
  },
}
</script>

<style lang="scss">
.progress-icon {
  margin-left: 6px;
}
.flashlog-delete {
  background-color: rgba(255, 0, 0, 0.2);
}
.flashlog-selected {
  background-color: $color-orange-light;
}
.match-block {
  // background-color: $color-orange-medium !important;
  &.much-missing {
    color: $color-green !important;
  }
  &.few-missing {
    color: $color-red !important;
  }
}
.no-match-block {
  color: $color-grey-medium !important;
}
.matches-container {
  font-size: 0.7rem;
  line-height: 1;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  color: $color-black;
  background-color: $color-white;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  margin-top: -4px;
}
</style>
