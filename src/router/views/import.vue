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
            :type="importMessage.data_stored ? 'success' : 'error'"
            :color="importMessage.data_stored ? 'green' : 'red'"
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
              :headers="userIsAdmin ? logFileHeadersAdmin : logFileHeaders"
              :items="flashLogs"
              :items-per-page="mobile ? 1 : 5"
              :item-class="rowClassLogFile"
              :search="logSearch"
              :no-data-text="$t('no_data')"
              :no-results-text="$t('no_results')"
              multi-sort
              class="elevation-0"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="logSearch"
                  :label="$t('Search')"
                  class="mx-1 mx-sm-4"
                ></v-text-field>
              </template>

              <template v-slot:[`item.created_at`]="{ item }">
                <span
                  v-text="momentify(item.created_at, true, dateFormatLong)"
                ></span>
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

              <template v-slot:[`item.log_erased`]="{ item }">
                <v-sheet
                  v-if="item.log_erased === 1"
                  class="beep-icon beep-icon-text color-green text-center"
                >
                  {{ $t('yes') }}
                </v-sheet>
                <v-sheet
                  v-if="item.log_erased === 0"
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

        <v-col v-if="undoMessage" cols="12">
          <v-alert
            text
            prominent
            dense
            :type="undoMessage.data_deleted ? 'success' : 'error'"
            :color="undoMessage.data_deleted ? 'green' : 'red'"
            class="mt-3 mb-n4 break-all"
          >
            {{ undoSentence }}
          </v-alert>
        </v-col>

        <v-col v-if="showSuccessMessage" cols="12">
          <v-alert
            text
            prominent
            dense
            type="info"
            color="accent"
            class="mt-3 mb-n4"
          >
            {{ successMessage }}
          </v-alert>
        </v-col>

        <v-col
          v-if="selectedFlashLog && selectedFlashLog.log !== undefined"
          ref="log-data"
          cols="12"
        >
          <div
            class="overline mt-0 mt-sm-3 mb-3 d-flex justify-space-between align-center"
          >
            <span v-text="selectedFlashLogHeader"></span>
            <v-spacer />
            <div v-if="selectedFlashLog !== null" class="d-flex align-right">
              <v-tooltip v-if="lgAndUp" open-delay="500" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    tile
                    outlined
                    color="accent"
                    class="mx-2"
                    :disabled="showExportLoadingById.indexOf('csv') > -1"
                    v-on="on"
                    @click="
                      exportBlockData(
                        selectedFlashLog.flashlog_id,
                        '',
                        true,
                        'csv'
                      )
                    "
                  >
                    <v-progress-circular
                      v-if="showExportLoadingById.indexOf('csv') > -1"
                      class="ml-n1 mr-2"
                      size="18"
                      width="2"
                      color="disabled"
                      indeterminate
                    />
                    <v-icon
                      v-if="showExportLoadingById.indexOf('csv') === -1"
                      left
                      >mdi-file-export</v-icon
                    >
                    {{ $t('Export_full_csv') }}
                  </v-btn>
                </template>
                <span>{{ $t('Export_as_csv') }}</span>
              </v-tooltip>

              <v-tooltip v-if="lgAndUp" open-delay="500" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    tile
                    outlined
                    color="accent"
                    :disabled="showExportLoadingById.indexOf('json') > -1"
                    v-on="on"
                    @click="
                      exportBlockData(
                        selectedFlashLog.flashlog_id,
                        '',
                        false,
                        'json'
                      )
                    "
                  >
                    <v-progress-circular
                      v-if="showExportLoadingById.indexOf('json') > -1"
                      class="ml-n1 mr-2"
                      size="18"
                      width="2"
                      color="disabled"
                      indeterminate
                    />
                    <v-icon
                      v-if="showExportLoadingById.indexOf('json') === -1"
                      left
                      >mdi-download</v-icon
                    >
                    {{ $t('Export_full_json') }}
                  </v-btn>
                </template>
                <span>{{ $t('Export_as_json') }}</span>
              </v-tooltip>

              <v-tooltip
                v-if="!lgAndUp && showExportLoadingById.indexOf('csv') === -1"
                open-delay="500"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    color="accent"
                    class="mx-2"
                    v-on="on"
                    @click="
                      exportBlockData(
                        selectedFlashLog.flashlog_id,
                        '',
                        true,
                        'csv'
                      )
                    "
                    >mdi-file-export</v-icon
                  >
                </template>
                <span>{{ $t('Export_as_csv') }}</span>
              </v-tooltip>

              <v-progress-circular
                v-if="!lgAndUp && showExportLoadingById.indexOf('csv') > -1"
                class="ml-2 mr-3"
                size="19"
                width="2"
                color="accent"
                indeterminate
              />

              <v-tooltip
                v-if="!lgAndUp && showExportLoadingById.indexOf('json') === -1"
                open-delay="500"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    color="accent"
                    v-on="on"
                    @click="
                      exportBlockData(
                        selectedFlashLog.flashlog_id,
                        '',
                        false,
                        'json'
                      )
                    "
                    >mdi-download</v-icon
                  >
                </template>
                <span>{{ $t('Export_as_json') }}</span>
              </v-tooltip>

              <v-progress-circular
                v-if="!lgAndUp && showExportLoadingById.indexOf('json') > -1"
                class="ml-1"
                size="19"
                width="2"
                color="accent"
                indeterminate
              />
            </div>
          </div>

          <div class="rounded-border primary-border">
            <v-data-table
              :headers="logDataHeaders"
              :items="selectedFlashLog.log"
              :item-class="rowClassLogData"
              :no-data-text="$t('no_data')"
              :no-results-text="$t('no_results')"
              multi-sort
              class="elevation-0"
            >
              <template v-slot:[`item.data_imported`]="{ item }">
                <v-icon v-if="item.data_imported" class="green--text"
                  >mdi-checkbox-marked-circle</v-icon
                >
              </template>

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
                  v-text="$t('Matches_found')"
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

              <template v-slot:[`item.missing_data`]="{ item }">
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
                  v-if="selectedFlashLog !== null"
                  :to="{
                    name: `flashlog`,
                    params: { id: selectedFlashLog.flashlog_id },
                    query: { blockId: item.block },
                  }"
                >
                  <v-btn
                    small
                    tile
                    outlined
                    class="mr-1 mb-1"
                    :color="item.matches === undefined ? 'grey' : 'accent'"
                  >
                    <v-icon left>mdi-chart-line</v-icon>
                    {{ $t('View_data') }}
                  </v-btn>
                </router-link>
                <v-btn
                  v-if="
                    selectedFlashLog !== null &&
                      selectedFlashLog.persisted_block_ids_array !==
                        undefined &&
                      selectedFlashLog.persisted_block_ids_array.indexOf(
                        item.block
                      ) > -1
                  "
                  tile
                  small
                  outlined
                  color="red"
                  class="mb-1"
                  :disabled="showUndoLoadingIconById.indexOf(item.block) > -1"
                  @click="
                    confirmUndoBlockImport(
                      selectedFlashLog.flashlog_id,
                      item.block
                    )
                  "
                >
                  <v-progress-circular
                    v-if="showUndoLoadingIconById.indexOf(item.block) > -1"
                    class="ml-n1 mr-2"
                    size="18"
                    width="2"
                    color="disabled"
                    indeterminate
                  />
                  <v-icon
                    v-if="
                      // eslint-disable vue/comma-dangle
                      showUndoLoadingIconById.indexOf(item.block) === -1
                    "
                    left
                    >mdi-refresh</v-icon
                  >
                  {{ $t('undo_import') }}</v-btn
                >
              </template>

              <template v-slot:[`item.export`]="{ item }">
                <v-tooltip
                  v-if="
                    selectedFlashLog !== null &&
                      showExportLoadingById.indexOf('csv-' + item.block) === -1
                  "
                  open-delay="500"
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon
                      dark
                      color="accent"
                      class="mr-2"
                      v-on="on"
                      @click="
                        exportBlockData(
                          selectedFlashLog.flashlog_id,
                          item.block,
                          true,
                          'csv-' + item.block
                        )
                      "
                      >mdi-file-export</v-icon
                    >
                  </template>
                  <span>{{ $t('Export_as_csv') }}</span>
                </v-tooltip>

                <v-progress-circular
                  v-if="
                    selectedFlashLog !== null &&
                      showExportLoadingById.indexOf('csv-' + item.block) > -1
                  "
                  class="mr-3"
                  size="19"
                  width="2"
                  color="accent"
                  indeterminate
                />

                <v-tooltip
                  v-if="
                    selectedFlashLog !== null &&
                      showExportLoadingById.indexOf('json-' + item.block) === -1
                  "
                  open-delay="500"
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon
                      dark
                      color="accent"
                      v-on="on"
                      @click="
                        exportBlockData(
                          selectedFlashLog.flashlog_id,
                          item.block,
                          false,
                          'json-' + item.block
                        )
                      "
                      >mdi-download</v-icon
                    >
                  </template>
                  <span>{{ $t('Export_as_json') }}</span>
                </v-tooltip>

                <v-progress-circular
                  v-if="
                    selectedFlashLog !== null &&
                      showExportLoadingById.indexOf('json-' + item.block) > -1
                  "
                  class="ml-1"
                  size="19"
                  width="2"
                  color="accent"
                  indeterminate
                />
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
import { momentDurationDays, momentify } from '@mixins/momentMixin'
import { readApiariesAndGroupsIfNotPresent } from '@mixins/methodsMixin'

export default {
  components: {
    Confirm,
    Layout,
  },
  mixins: [momentDurationDays, momentify, readApiariesAndGroupsIfNotPresent],
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
      successMessage: null,
      showSuccessMessage: false,
      undoMessage: null,
      dateFormat: 'YYYY-MM-DD',
      dateFormatLong: 'YYYY-MM-DD HH:mm:ss',
      showLoadingIconById: [],
      showUndoLoadingIconById: [],
      showExportLoadingById: [],
      ready: false,
      flashLogs: [],
      showInfo: false,
      matchProps: 9,
      fromCache: true,
      matchesOverlay: null,
      baseApiUrl:
        process.env.VUE_APP_BASE_API_URL ||
        process.env.VUE_APP_BASE_API_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('auth', ['userIsAdmin']),
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
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp
    },
    locale() {
      return this.$i18n.locale
    },
    logDataHeaders() {
      return [
        { text: this.$i18n.t('Block'), value: 'block' },
        {
          text: this.$i18n.t('Data_imported'),
          value: 'data_imported',
        },
        { text: this.$i18n.tc('Match', 2), value: 'matches' },
        {
          text: this.$i18n.t('Size'),
          value: 'duration_hours',
        },
        {
          text: this.$i18n.t('Missing_data'),
          value: 'missing_data',
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
        { text: this.$i18n.tc('Action', 2), sortable: false, value: 'actions' },
        { text: this.$i18n.t('Export'), sortable: false, value: 'export' },
      ]
    },
    logFileHeaders() {
      return [
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
          text: this.$i18n.t('Memory_erased'),
          value: 'log_erased',
        },
        {
          text: this.$i18n.t('File_size'),
          value: 'bytes_received',
        },
        { text: this.$i18n.tc('Action', 2), sortable: false, value: 'actions' },
      ]
    },
    logFileHeadersAdmin() {
      const userNameColumn = {
        text: this.$i18n.t('username'),
        value: 'user_name',
      }
      const newHeaderArray = this.logFileHeaders.slice()
      newHeaderArray.splice(4, 0, userNameColumn)
      return newHeaderArray
    },
    logSearch: {
      get() {
        return this.$store.getters['devices/logSearch']
      },
      set(value) {
        this.$store.commit('devices/setData', {
          prop: 'logSearch',
          value,
        })
      },
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
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
            this.selectedFlashLog.device_name +
            ', Time: ' +
            this.selectedFlashLog.time_percentage +
            ', Weight: ' +
            this.selectedFlashLog.weight_percentage +
            ', Blocks: ' +
            this.selectedFlashLog.log.length +
            ', Lines: ' +
            this.selectedFlashLog.lines_received +
            ', Messages: ' +
            this.selectedFlashLog.records_flashlog
        : ''
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    undoSentence() {
      var stringifiedMessage = JSON.stringify(this.undoMessage)
      return this.undoMessage !== null && this.undoMessage.data_deleted
        ? this.$i18n.t('data_deleted') +
            '. ' +
            this.$i18n.t('deleted_measurements') +
            ': ' +
            this.undoMessage.deleted_measurements +
            ', ' +
            this.$i18n.t('deleted_days') +
            ': ' +
            this.undoMessage.deleted_days
        : this.$i18n.t('data_not_deleted') +
            '. ' +
            stringifiedMessage.substr(0, 1000) +
            (stringifiedMessage.length > 1000 ? ' ... ' : '')
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
          if (this.importMessage !== null) {
            this.logSearch = this.importMessage.flashlog_id.toString() // make persisted log item remain on top of table
            this.reCheckFlashLog(this.importMessage.flashlog_id)
          }
          this.selectedFlashLog = null
        }
        this.ready = true
      })
    })
  },
  methods: {
    async exportBlockData(
      flashLogId,
      blockId = '',
      csvFormat = false,
      loadingId
    ) {
      this.clearMessages()
      this.showExportLoadingById.push(loadingId)
      try {
        const response = await Api.readRequest(
          '/flashlogs/' +
            flashLogId +
            '?block_id=' +
            blockId +
            (csvFormat ? '&csv=1' : '&json=1')
        )
        if (response.status === -1) {
          this.errorMessage = this.$i18n.t('too_much_data')
        }

        var link = document.createElement('a')
        var fileName =
          'beep-base-log-export-user-' +
          this.selectedFlashLog.user_id +
          '-' +
          this.selectedFlashLog.device_name +
          '-log-file-' +
          flashLogId +
          (blockId === '' ? '-all-data' : '-block-' + blockId)
        fileName = fileName.replace(' ', '')

        if (csvFormat) {
          var hrefStr = 'data:text/csv;charset=utf-8,' + response.data
        } else {
          hrefStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(response.data))
        }

        link.setAttribute('target', '_blank')
        link.setAttribute('href', hrefStr)
        link.setAttribute('download', fileName + (csvFormat ? '.csv' : '.json'))
        document.body.appendChild(link)
        link.click()

        this.showExportLoadingById.splice(
          this.showExportLoadingById.indexOf(loadingId),
          1
        )

        if (response.status === 200) {
          this.successMessage = this.$i18n.t('Export_file_being_saved')
          this.showSuccessMessage = true
          setTimeout(() => {
            this.showSuccessMessage = false
          }, 5000) // wait for file to be saved by user
        }
        return response
      } catch (error) {
        this.showExportLoadingById.splice(
          this.showExportLoadingById.indexOf(loadingId),
          1
        )
        console.log('Error: ', error)
        this.errorMessage = this.$i18n.t('no_data')
      }
    },
    async undoBlockImport(flashLogId, blockId) {
      this.clearMessages()
      this.showUndoLoadingIconById.push(blockId)
      try {
        const response = await Api.deleteRequest(
          '/flashlogs/' + flashLogId + '?block_id=',
          blockId
        )
        this.undoMessage = response.data
        this.showUndoLoadingIconById.splice(
          this.showUndoLoadingIconById.indexOf(blockId),
          1
        )
        this.reCheckFlashLog(flashLogId)
      } catch (error) {
        this.showUndoLoadingIconById.splice(
          this.showUndoLoadingIconById.indexOf(blockId),
          1
        )
        if (error.response) {
          console.log(error.response)
          this.errorMessage = this.$i18n.t(error.response.data.error)
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
      }
    },
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
    async checkFlashLog(flashLogId, keepMessages = false) {
      if (!keepMessages) {
        this.clearMessages()
      }
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
          this.selectedFlashLog.log.map((item) => {
            // set extra properties here to enable column sort for these columns
            item.data_imported =
              this.selectedFlashLog.persisted_block_ids_array !== undefined &&
              this.selectedFlashLog.persisted_block_ids_array.indexOf(
                item.block
              ) > -1
            item.missing_data = this.percentageNotInDB(item)
          })
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
    confirmUndoBlockImport(flashLogId, blockId) {
      this.$refs.confirm
        .open(
          this.$i18n.t('undo_import'),
          this.$i18n.t('Block') +
            ' ' +
            blockId +
            ' - ' +
            this.$i18n.t('undo_block_import_exp'),
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.undoBlockImport(flashLogId, blockId)
        })
        .catch((reject) => {
          return true
        })
    },
    confirmDeleteFlashLog(flashLog) {
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_log_file') + ' - ' + flashLog.hive_name,
          this.$i18n.t('delete_log_file') +
            ' "' +
            flashLog.hive_name +
            ' - ' +
            this.momentify(flashLog.created_at, true, this.dateFormatLong) +
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
      this.undoMessage = null
      this.errorMessage = null
      this.successMessage = null
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
      var nrOfMatches = Object.keys(log.matches.matches).length
      return (
        this.$i18n.t('Matches_found') +
        ': ' +
        nrOfMatches +
        ' (Log ' +
        this.selectedFlashLog.flashlog_id +
        ', ' +
        this.$i18n.t('Block') +
        ' ' +
        log.block +
        ')'
      )
    },
    missingDataText(log) {
      var ptNotInDb = this.percentageNotInDB(log)
      return (
        this.momentDurationDays(
          log.duration_hours * (ptNotInDb / 100),
          'hours'
        ) +
        '<br>(' +
        ptNotInDb +
        '% ' +
        this.$i18n.t('not_yet_in_db') +
        ')'
      )
    },
    percentageNotInDB(log) {
      if (
        log.dbCount !== undefined &&
        log.dbCount !== null &&
        log.setCount !== undefined &&
        log.setCount !== null
      ) {
        var ptNotInDb = (100 * (1 - log.dbCount / log.setCount)).toFixed(1)
        // ptNotinDb can be max 100 and min 0
        if (ptNotInDb > 100) ptNotInDb = 100
        if (ptNotInDb < 0) ptNotInDb = 0
        return ptNotInDb
      } else {
        return null
      }
    },
    periodText(log) {
      return (
        this.momentify(log.time_start, true, this.dateFormat) +
        ' - ' +
        this.momentify(log.time_end, true, this.dateFormat)
      )
    },
    reCheckFlashLog(flashLogId) {
      // check flashlog after (undo) importing data again to display correct values in the table
      setTimeout(() => {
        this.readFlashLogs()
        this.checkFlashLog(flashLogId, true)
      }, 500)
    },
    rowClassLogData(item) {
      return item.matches === undefined
        ? 'no-match-block'
        : 'match-block ' +
            (this.percentageNotInDB(item) < 50 ? 'green--text' : 'red--text')
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
        this.momentDurationDays(
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
