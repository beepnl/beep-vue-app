<template>
  <Layout :title="$t('research')" :edited="editedCHItems.length > 0">
    <v-container class="mt-2 mt-sm-6">
      <div>
        <v-row>
          <v-col cols="12">
            <p class="text-red">{{ $t('research_warning') }}</p>
            <p>{{ $t('research_explanation_p1') }}</p>
            <p>{{ $t('research_explanation_p2') }}</p>
            <p class="mb-0"
              ><i>{{
                /* eslint-disable vue/comma-dangle */
                $t('research_info')
              }}</i></p
            >
          </v-col>
        </v-row>

        <v-row class="mb-4 mb-sm-6">
          <v-col cols="12">
            <div class="text-overline mb-2 mb-sm-3">{{
              $t('my_beep_data')
            }}</div>
            <div class="rounded-border">
              <v-row>
                <v-col cols="12" md="4">
                  <span class="d-flex align-center"
                    ><v-icon size="23" class="mr-1">mdi-home-analytics</v-icon>
                    <span>{{ $tc('Location', 2) }}: {{ apiaries.length }}</span>
                  </span>
                </v-col>
                <v-col cols="12" md="4">
                  <span class="d-flex align-center"
                    ><v-icon size="20" class="mr-1">mdi-archive</v-icon>
                    <span>{{ $tc('Hive', 2) }}: {{ numberOfHives }}</span></span
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <span class="d-flex align-center">
                    <v-sheet
                      class="beep-icon beep-icon-sensors--no-outline ma-0 mr-1"
                    ></v-sheet>
                    <span
                      >{{ $tc('device', 2) }}: {{ numberOfDevices }}</span
                    ></span
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="researchProjects.length > 0" class="mt-3">
          <v-col
            v-for="research in sortedResearchProjects"
            :key="research.id"
            cols="12"
          >
            <div class="rounded-border research-item">
              <div class="d-flex justify-start align-start">
                <div v-if="research.thumb_url" class="mr-3">
                  <a
                    :href="research.url !== null ? research.url : '#'"
                    target="_blank"
                  >
                    <v-img
                      :src="getFullUrl(research.thumb_url)"
                      :lazy-src="getFullUrl(research.thumb_url)"
                      height="80"
                      width="80"
                      aspect-ratio="1"
                      class="bg-grey-lighten-2 rounded research-avatar"
                    >
                    </v-img>
                  </a>
                </div>
                <div>
                  <h2>
                    {{ research.name }}
                  </h2>
                  <p>
                    {{ research.description }}
                  </p>
                </div>
              </div>
              <v-row class="mb-0 mt-3">
                <v-col cols="12" md="6">
                  <v-row v-if="research.url !== null">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('link')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <a :href="research.url" target="_blank">{{
                        research.url
                      }}</a>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.institution !== null">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('institution')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <span>{{ research.institution }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.checklist_names.length > 0">
                    <v-col class="research-item-col pb-1" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="
                          $tc('Checklist', research.checklist_names.length)
                        "
                      ></span>
                    </v-col>
                    <v-col class="research-item-col pb-1" cols="7" sm="8">
                      <v-chip
                        v-for="checklistName in research.checklist_names"
                        :key="checklistName"
                        class="mr-1 mb-1"
                        small
                        color="primary"
                      >
                        {{ checklistName }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.type_of_data_used !== null">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('type_of_data_used')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <span>{{ research.type_of_data_used }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.start_date !== null">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('start_date')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <span>{{ momentify(research.start_date) }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.end_date !== null">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('end_date')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <span>{{ momentify(research.end_date) }}</span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-4">
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('Current_consent')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <strong>
                        <v-icon>{{
                          research.consent
                            ? 'mdi-check text-green'
                            : 'mdi-close text-red'
                        }}</v-icon>
                      </strong>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="research-item-col" cols="5" sm="4">
                      <span
                        class="research-property"
                        v-text="$t('Edit_consent')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="7" sm="8">
                      <v-btn
                        :size="mdAndDown ? 'small' : 'default'"
                        :class="
                          `${
                            research.consent ? 'text-red' : 'text-green'
                          } research-consent-button`
                        "
                        @click="consentToggle(research, !research.consent)"
                      >
                        <v-progress-circular
                          v-if="showCTLoadingIcon.indexOf(research.id) > -1"
                          :class="`ml-n1 ${mdAndDown ? 'mr-3' : 'mr-2'}`"
                          :size="mdAndDown ? 14 : 18"
                          width="2"
                          indeterminate
                        />
                        <v-icon
                          v-if="showCTLoadingIcon.indexOf(research.id) === -1"
                          start
                          :size="mdAndDown ? 'small' : 'default'"
                          :class="research.consent ? 'text-red' : 'text-green'"
                          >{{
                            research.consent ? 'mdi-close' : 'mdi-check'
                          }}</v-icon
                        >
                        {{
                          research.consent
                            ? $t('consent_no')
                            : $t('consent_yes')
                        }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="research.consent_history.length > 0"
                  cols="12"
                  md="6"
                >
                  <v-row>
                    <v-col class="research-item-col" cols="12">
                      <span
                        class="research-property"
                        v-text="$t('Consent') + ' ' + $t('history')"
                      ></span>
                    </v-col>
                  </v-row>

                  <v-row
                    v-for="(chItem, index) in research.consent_history"
                    :key="chItem.id"
                  >
                    <v-col class="research-item-col" cols="12" md="6" xl="5">
                      <div class="d-flex align-center">
                        <VueDatePicker
                          v-if="
                            interval !== 'year' ||
                              (interval === 'year' && !relativeInterval)
                          "
                          v-model="chItem.updated_at"
                          :format="datePickerFormat"
                          :min-date="
                            chItem.consent === 0 ? chItem.updated_at : null
                          "
                          :max-date="
                            chItem.consent === 1 ? chItem.updated_at : null
                          "
                          model-type="format"
                          :month-picker="
                            interval === 'year' || interval === 'month'
                          "
                          hide-input-icon
                          :clearable="false"
                          :locale="locale"
                          :select-text="$t('ok')"
                          :cancel-text="$t('Cancel')"
                          :class="
                            ` cursor-pointer research-datepicker ${
                              editedCHItems.indexOf(chItem.id) > -1
                                ? 'text-green'
                                : 'text-accent'
                            }`
                          "
                          @update:model-value="checkEditedChItems(chItem.id)"
                        >
                          <template v-slot:trigger>
                            <span v-text="momentify(chItem.updated_at)"></span>
                          </template>
                        </VueDatePicker>
                        <span
                          v-if="editedCHItems.indexOf(chItem.id) > -1"
                          class="ml-1"
                        >
                          <v-btn
                            class="mt-n1 text-green"
                            size="x-small"
                            @click="
                              updateConsentDate(
                                research.id,
                                chItem.id,
                                // eslint-disable-next-line vue/comma-dangle
                                chItem.updated_at
                              )
                            "
                          >
                            <v-progress-circular
                              v-if="showLoadingIcon.indexOf(chItem.id) > -1"
                              class="ml-n1 mr-2"
                              size="12"
                              width="2"
                              indeterminate
                            />
                            <v-icon
                              v-if="showLoadingIcon.indexOf(chItem.id) === -1"
                              start
                              size="small"
                              class="text-green"
                              >mdi-check</v-icon
                            >
                            {{ $t('save') }}</v-btn
                          >
                        </span>

                        <span
                          v-if="editedCHItems.indexOf(chItem.id) === -1"
                          class="description cursor-pointer"
                        >
                          <v-tooltip>
                            <template v-slot:activator="{ props }">
                              <v-icon
                                class="icon-info"
                                size="small"
                                color="accent"
                                v-bind="props"
                                >mdi-information</v-icon
                              >
                            </template>
                            <span
                              >{{ $t('click_date_to_edit') }}
                              {{ $t('Consent_can_only_be_set') }}
                              {{
                                chItem.consent === 1
                                  ? $t('earlier') +
                                    ' ' +
                                    $t('start_date').toLowerCase() +
                                    '.'
                                  : $t('later') +
                                    ' ' +
                                    $t('end_date').toLowerCase() +
                                    '.'
                              }}
                            </span>
                          </v-tooltip>
                        </span>
                      </div>
                    </v-col>
                    <v-col
                      class="research-item-col d-flex align-center"
                      cols="12"
                      md="6"
                      xl="7"
                    >
                      <strong
                        :class="
                          chItem.consent === 1 ? 'text-green' : 'text-red'
                        "
                        >{{
                          chItem.consent ? $t('consent_yes') : $t('consent_no')
                        }}</strong
                      >
                      <v-icon
                        v-if="chItem.consent === 0"
                        class="text-red ml-1 cursor-pointer"
                        size="20"
                        @click="confirmDeleteNoConsent(research.id, chItem)"
                        >mdi-delete</v-icon
                      >
                      <v-icon
                        v-if="chItem.consent === 1 && index === 0"
                        class="text-green ml-1 cursor-pointer"
                        size="20"
                        @click="consentToggle(research, true, chItem)"
                        >mdi-pencil</v-icon
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="ready && researchProjects.length === 0" class="mt-3">
          <v-col cols="12">
            {{ $t('no_data') }}
          </v-col>
        </v-row>
      </div>
    </v-container>

    <SelectHivesOverlay
      v-if="selectedResearch !== null && selectHivesOverlay"
      :selected-research="selectedResearch"
      :selected-consent="selectedConsent"
      @close-overlay="selectHivesOverlay = false"
      @submit-consent-toggle="
        submitConsentToggle($event.id, $event.consent, $event.hiveIds)
      "
    />

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import {
  readApiariesAndGroups,
  readDevicesIfNotChecked,
} from '@mixins/methodsMixin'
import Confirm from '@/src/components/confirm-dialog.vue'
// import { Datetime } from 'vue-datetime' // TODO-VUE3 replace by other date picker compatible with Vue 3
// import 'vue-datetime/dist/vue-datetime.min.css'
import Layout from '@/src/router/layouts/back-layout.vue'
import SelectHivesOverlay from '@components/select-hives-overlay.vue'
import { momentify, momentFullDateTime } from '@mixins/momentMixin'
import { mapGetters } from 'vuex'

export default {
  components: {
    Confirm,
    // Datetime,
    Layout,
    SelectHivesOverlay,
  },
  mixins: [
    momentify,
    momentFullDateTime,
    readApiariesAndGroups,
    readDevicesIfNotChecked,
  ],
  data: function() {
    return {
      researchProjects: [],
      editedCHItems: [],
      ready: false,
      showCTLoadingIcon: [],
      showLoadingIcon: [],
      baseApiUrl:
        process.env.VUE_APP_BASE_API_URL ||
        process.env.VUE_APP_BASE_API_URL_FALLBACK,
      selectHivesOverlay: false,
      selectedConsent: null,
      selectedResearch: null,
      datePickerFormat: 'yyyy-MM-dd HH:mm',
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('devices', ['devices']),
    ...mapGetters('groups', ['groups']),
    locale() {
      return this.$i18n.locale
    },
    mdAndDown() {
      return this.$vuetify.display.mdAndDown
    },
    mobile() {
      return this.$vuetify.display.mobile
    },
    numberOfDevices() {
      return this.devices.length
    },
    numberOfHives() {
      return this.apiaries.reduce((acc, apiary) => {
        acc += apiary.hives.length
        return acc
      }, 0)
    },
    sortedResearchProjects() {
      const sortedRPs = this.researchProjects.slice().sort(function(a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      return sortedRPs
    },
  },
  created() {
    this.readDevicesIfNotChecked()
    if (this.apiaries.length === 0 && this.groups.length === 0) {
      // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
      this.readApiariesAndGroups()
    }
    this.readResearchProjects().then(() => {
      this.ready = true
    })
  },
  methods: {
    async readChecklists() {
      try {
        const response = await Api.readRequest('/inspections/lists')
        this.$store.commit(
          'inspections/setChecklists',
          response.data.checklists
        )
        this.$store.commit('inspections/setChecklist', response.data.checklist)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readResearchProjects() {
      try {
        const response = await Api.readRequest('/research')
        const researchProjects = response.data
        researchProjects.map((researchProject) => {
          if (researchProject.consent_history.length > 0) {
            researchProject.consent_history.map((chItem) => {
              chItem.updated_at = this.momentify(
                // required for datetimepicker v-model to work
                chItem.updated_at,
                true,
                null
              )
              return chItem // TODO-VUE3 check
            })
          }
          return researchProject // TODO-VUE3 check
        })
        this.researchProjects = researchProjects
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async submitConsentToggle(id, consent, hiveIds = null) {
      if (consent === 1) {
        this.selectHivesOverlay = false
      }
      this.setCTLoadingIcon(id, true)
      try {
        if (consent) {
          await Api.postRequest(
            '/research/' + id + '/add_consent',
            hiveIds
              ? {
                  hive_ids: hiveIds,
                }
              : null
          )
        } else {
          await Api.postRequest('/research/' + id + '/remove_consent')
        }
        this.readChecklists() // update checklists with or without research checklists
        this.readResearchProjects().then(() => {
          this.setCTLoadingIcon(id, false)
        })
        return true
      } catch (error) {
        this.setCTLoadingIcon(id, false)
        console.log('Error: ', error)
      }
    },
    async deleteNoConsent(researchId, consentId) {
      try {
        await Api.deleteRequest(
          '/research/' + researchId + '/delete/',
          consentId
        )
        this.readResearchProjects()
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async updateDate(researchId, consentId, date) {
      try {
        await Api.updateRequest(
          '/research/' + researchId + '/edit/',
          consentId,
          { updated_at: date }
        )
        this.readResearchProjects().then(() => {
          this.showLoadingIcon = []
        })
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    checkEditedChItems(itemId) {
      if (this.editedCHItems.indexOf(itemId) === -1)
        this.editedCHItems.push(itemId)
    },
    confirmDeleteNoConsent(researchId, chItem) {
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete') + ' ' + this.$i18n.t('Consent'),
          this.$i18n.t('Delete') +
            ' ' +
            this.$i18n.t('Consent').toLocaleLowerCase() +
            ': ' +
            this.momentify(chItem.updated_at, true) +
            ' "' +
            this.$i18n.t('consent_no') +
            '"?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteNoConsent(researchId, chItem.id)
        })
        .catch((reject) => {
          return true
        })
    },
    consentToggle(research, showSelectHivesOverlay, consent = null) {
      if (research.consent && !showSelectHivesOverlay) {
        // if changing to do NOT consent, simply submit that skipping the hive selection
        this.submitConsentToggle(research.id, 0)
      } else {
        this.selectedResearch = research
        this.selectedConsent = consent
        this.selectHivesOverlay = true
      }
    },
    getFullUrl(thumbUrl) {
      return thumbUrl.indexOf('https://') > -1
        ? thumbUrl
        : this.baseApiUrl + thumbUrl
    },
    setCTLoadingIcon(id, bool) {
      if (!bool) {
        this.showCTLoadingIcon.splice(this.showCTLoadingIcon.indexOf(id), 1)
      } else {
        this.showCTLoadingIcon.push(id)
      }
    },
    updateConsentDate(researchId, consentId, date) {
      this.showLoadingIcon.push(consentId)
      const formattedDate = this.momentFullDateTime(date, true)
      this.editedCHItems.splice(this.editedCHItems.indexOf(consentId), 1)
      console.log('Update consent: ', consentId, formattedDate)
      this.updateDate(researchId, consentId, formattedDate)
    },
  },
}
</script>

<style lang="scss">
.research-item {
  padding: 12px;
  border-color: $color-accent !important;
  @include for-phone-only {
    padding: 10px;
  }
}

.research-avatar {
  border: 1px solid $color-accent !important;
  border-radius: 4px !important;
}

.research-item-col {
  padding: 0 12px 8px 12px !important;
}

.research-datepicker {
  width: 155px !important;
}

.research-property {
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  color: $color-grey-dark !important;
  letter-spacing: 0.0333333333em !important;
}

.research-consent-button {
  display: block;
  word-break: break-word;
  .v-btn__content {
    white-space: normal !important;
  }
  &.v-btn:not(.v-btn--round).v-size--small {
    height: 100% !important;
    min-height: 28px;
    .v-btn__content {
      padding: 2px 0;
      line-height: 18px;
    }
  }
  &.v-btn:not(.v-btn--round).v-size--default {
    height: 100% !important;
    min-height: 36px;
    .v-btn__content {
      padding: 3px 0;
      line-height: 20px;
    }
  }
}
</style>
