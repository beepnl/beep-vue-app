<template>
  <Layout
    :title="`${$t('New_inspection')}`"
    :no-box-shadow="true"
    :edited="inspectionEdited"
  >
    <v-toolbar class="hive-inspect-bar" dense light>
      <v-spacer></v-spacer>
      <v-btn tile outlined color="primary" class="mr-1" @click="saveInspection">
        <v-icon left>mdi-check</v-icon>
        {{ $t('save') + ' ' + $tc('inspection', 1) }}
      </v-btn>
    </v-toolbar>

    <v-container v-if="newInspection" class="hive-inspect-content">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <div class="d-flex justify-flex-start align-center">
            <v-icon dark color="primary" class="mr-2">mdi-calendar-edit</v-icon>
            <div>
              <div
                class="beep-label"
                v-text="`${$t('Date_of_inspection')}`"
              ></div>
              <Datetime
                v-if="newInspection"
                v-model="inspectionDate"
                type="datetime"
              >
                <template slot="button-cancel">
                  <v-btn text color="primary">{{ $t('Cancel') }}</v-btn>
                </template>
                <template slot="button-confirm">
                  <v-btn text color="primary">{{ $t('ok') }}</v-btn>
                </template>
              </Datetime>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-form ref="form">
        <v-card outlined class="mt-3">
          <v-card-title>
            <v-row>
              <v-col cols="12" class="py-0">
                <span>{{ $t('overall') }}</span>
                <div class="float-right">
                  <v-icon
                    :class="
                      `toggle-icon mdi ${
                        showOverall ? 'mdi-minus' : 'mdi-plus'
                      }`
                    "
                    @click="showOverall = !showOverall"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <SlideYUpTransition :duration="100">
            <v-card-text v-if="showOverall">
              <v-row class="sub-inspection-wrapper">
                <v-col cols="12">
                  <div
                    class="overline mb-3"
                    v-text="`${$t('positive_impression')}`"
                  ></div>
                  <div class="sub-inspection-details rounded-border">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <smileRating
                          label="positive_impression"
                          :object-name="newInspection"
                          property="impression"
                          @update-object="
                            updateInspection($event, 'impression')
                          "
                        ></smileRating>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <yesNoRating
                          label="needs_attention"
                          :object-name="newInspection"
                          property="attention"
                          @update-object="updateInspection($event, 'attention')"
                        ></yesNoRating>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-if="newInspection"
                          v-model="newInspection.notes"
                          :label="`${$t('notes')}`"
                          counter="250"
                          rows="1"
                          auto-grow
                          clearable
                          @input="validateText($event, 'notes', 250)"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>

              <v-row class="sub-inspection-wrapper">
                <v-col cols="12">
                  <div class="overline mb-3" v-text="`${$t('reminder')}`"></div>
                  <div class="sub-inspection-details rounded-border">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <div class="d-flex justify-flex-start align-center">
                          <v-icon
                            class="mr-2"
                            :color="reminderDate !== null ? 'primary' : ''"
                            >mdi-calendar</v-icon
                          >
                          <div>
                            <div
                              class="beep-label"
                              v-text="`${$t('remind_date')}`"
                            ></div>
                            <Datetime
                              v-if="newInspection"
                              v-model="reminderDate"
                              :placeholder="`${$t('Set_notification_date')}`"
                              type="datetime"
                            >
                              <template slot="button-cancel">
                                <v-btn text color="primary">{{
                                  $t('Cancel')
                                }}</v-btn>
                              </template>
                              <template slot="button-confirm">
                                <v-btn text color="primary">{{
                                  $t('ok')
                                }}</v-btn>
                              </template>
                            </Datetime>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <v-textarea
                          v-if="newInspection"
                          v-model="newInspection.reminder"
                          :label="`${$t('reminder')}`"
                          :placeholder="`${$t('notes_for_next_inspection')}`"
                          rows="1"
                          auto-grow
                          clearable
                          counter="100"
                          @input="validateText($event, 'reminder', 100)"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>

              <!--
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-flex-end">
                  <v-btn
                    tile
                    outlined
                    color="primary"
                    class="mr-1"
                    @click="saveInspection"
                  >
                    <v-icon left>mdi-check</v-icon>
                    {{ $t('save') + ' ' + $tc('inspection', 1) }}
                  </v-btn>
                </div>
              </v-col>
            </v-row> -->
            </v-card-text>
          </SlideYUpTransition>
        </v-card>
      </v-form>
    </v-container>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'
import smileRating from '@components/input-fields/smile-rating.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
// import { ZoomYTransition } from 'vue2-transitions'
import { SlideYUpTransition } from 'vue2-transitions'
// import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    Confirm,
    Datetime,
    Layout,
    smileRating,
    yesNoRating,
    // ZoomYTransition,
    SlideYUpTransition,
    // VueNumberInput,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      newInspection: null,
      showOverall: true,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    inspectionDate: {
      get() {
        if (this.newInspection) {
          return this.momentISO8601(this.newInspection.date)
        } else {
          return ''
        }
      },
      set(value) {
        this.newInspection.date = this.momentCreatedAt(value)
      },
    },
    inspectionEdited() {
      return (
        this.newInspection.impression !== null ||
        this.newInspection.attention !== null ||
        this.newInspection.reminder !== null ||
        this.newInspection.reminder_date !== null ||
        this.newInspection.reminder !== null ||
        this.newInspection.notes !== null
      )
    },
    inspectionTemplate() {
      return {
        date: this.momentISO8601(new Date()),
        impression: null,
        attention: null,
        notes: null,
        reminder_date: null,
        reminder: null,
        checklist_id: null, // TODO: get checklist id
        hive_id: this.id,
      }
    },
    locale() {
      return this.$i18n.locale
    },
    reminderDate: {
      get() {
        if (this.newInspection && this.newInspection.reminder_date !== null) {
          return this.momentISO8601(this.newInspection.reminder_date)
        } else {
          return null
        }
      },
      set(value) {
        if (value !== '' && value !== null) {
          this.newInspection.reminder_date = this.momentCreatedAt(value)
        } else {
          this.newInspection.reminder_date = null
        }
      },
    },
  },
  created() {
    this.newInspection = {
      date: this.momentISO8601(new Date()),
      impression: null,
      attention: null,
      notes: null,
      reminder_date: null,
      reminder: null,
      checklist_id: null, // TODO: get checklist id
      hive_id: this.id,
    }
  },
  methods: {
    async saveInspection() {
      console.log('saving Inspection...')
      console.log(this.newInspection)
      // try {
      //   const response = await this.$store.dispatch(
      //     'inspections/saveInspection',
      //     this.newInspection
      //   )
      //   if (!response) {
      //     this.snackbar.text = this.$i18n.t('not_saved_error')
      //     this.snackbar.show = true
      //   }
      //   setTimeout(() => {
      //     return this.$router.push({
      //       name: 'hive-inspections',
      //     })
      //   }, 300) // wait for API to update locations/hives
      // } catch (error) {
      //   console.log(error)
      //   this.snackbar.text = this.$i18n.t('not_saved_error')
      //   this.snackbar.show = true
      // }
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.newInspection[property] = value
      }
    },
    updateInspection(value, property) {
      if (this.newInspection[property] === value) {
        this.newInspection[property] = null // allow to toggle if value has been set already
      } else {
        this.newInspection[property] = value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-inspect-bar {
  position: fixed;
  z-index: 2;
  width: 100%;
  background-color: $color-orange-light !important;
  border-bottom: 1px solid #fff5e2 !important;
  box-shadow: none !important;
}
.hive-inspect-content {
  margin-top: 56px;
}
.hide-content {
  display: none;
}
</style>
