<template>
  <Layout :title="$t('Data_import')">
    <v-container v-if="ready">
      <v-row v-if="showSuccessMessage">
        <v-col cols="12">
          <v-alert
            v-model="showSuccessMessage"
            text
            prominent
            dense
            dismissible
            type="success"
            color="green"
          >
            {{ successMessage }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row v-if="errorMessage">
        <v-col cols="12">
          <v-alert text prominent dense type="error" color="red" class="mb-3">
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="overline mt-3 mb-2" v-text="$t('Flash_logs')"></div>

          <div v-if="flashLogs.length > 0" class="rounded-border">
            <v-simple-table class="v-data-table--smallfont" dense>
              <template v-slot>
                <thead>
                  <tr>
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
                      {{ $t('period') }}
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
                    :class="flashLog.delete === true ? 'flashlog-delete' : ''"
                  >
                    <td>
                      <span v-text="flashLog.upload_date"></span>
                    </td>
                    <td>
                      <span v-text="flashLog.device_name"></span>
                    </td>
                    <td>
                      <span v-text="flashLog.hive_name"></span>
                    </td>
                    <td class="td--small">
                      <span v-text="flashLog.messages"></span>
                    </td>
                    <td class="td--small">
                      <span v-text="flashLog.log_time"></span>
                    </td>
                    <td>
                      <span v-text="flashLog.from_to_date"></span>
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
                              showLoadingIconById.indexOf(flashLog.id) === -1
                            "
                            left
                            >mdi-check</v-icon
                          >
                          {{ $t('check_flash_log') }}</v-btn
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
                              @click="deleteFlashLog(flashLog)"
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
                          @click="deleteFlashLog(flashLog)"
                          >mdi-delete</v-icon
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'

export default {
  components: {
    Confirm,
    Layout,
  },
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      showSuccessMessage: false,
      showDataLoadingIcon: false,
      showLoadingIconById: [],
      ready: false,
      flashLogs: [],
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  created() {
    this.readFlashLogs().then(() => {
      this.ready = true
    })
  },
  methods: {
    async readFlashLogs() {
      this.flashLogs = [
        {
          id: 1,
          upload_date: '2021-09-15 11:41:27',
          device_name: 'BEEPBASE-TEST',
          hive_name: 'Testkast',
          messages: '9994',
          log_time: '1',
          from_to_date: '2020-08-01 9:21:22 - 2021-09-15 11:41:27',
        },
        {
          id: 2,
          upload_date: '2021-05-15 15:41:27',
          device_name: 'BEEPBASE-TEST2',
          hive_name: 'Hive 8',
          messages: '336',
          log_time: '0',
          from_to_date: '2019-07-01 7:21:22 - 2021-05-15 15:41:27',
        },
      ]
    },
    checkFlashLog(flashLog) {
      this.showLoadingIconById.push(flashLog.id)
      setTimeout(() => {
        console.log('check flash log ', flashLog.id)

        this.showLoadingIconById.splice(
          this.showLoadingIconById.indexOf(flashLog.id),
          1
        )
      }, 1200)
    },
    deleteFlashLog(flashLog) {
      console.log('delete flash log ', flashLog.id)
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
</style>
