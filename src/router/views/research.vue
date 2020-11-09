<template>
  <Layout :title="$t('research')" :no-box-shadow="true">
    <v-container class="mt-2 mt-sm-6">
      <div v-if="researchProjects.length > 0">
        <v-row>
          <v-col cols="12">
            <p>{{ $t('research_explanation') }}</p>
            <p class="mb-0">{{ $t('research_info') }}</p>
          </v-col>
        </v-row>

        <v-row class="mb-4 mb-sm-6">
          <v-col cols="12">
            <div class="overline mb-2 mb-sm-3">{{ $t('my_beep_data') }}</div>
            <div class="rounded-border">
              <v-row>
                <v-col cols="12" sm="4">
                  <span class="d-flex align-center"
                    ><v-icon size="23" class="mr-1">mdi-home-analytics</v-icon>
                    <span
                      >{{ $tc('Location', 2) }}: {{ numberOfApiaries }}</span
                    >
                  </span>
                </v-col>
                <v-col cols="12" sm="4">
                  <span class="d-flex align-center"
                    ><v-icon size="20" class="mr-1">mdi-archive</v-icon>
                    <span>{{ $tc('Hive', 2) }}: {{ numberOfHives }}</span></span
                  >
                </v-col>
                <v-col cols="12" sm="4">
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

        <v-row>
          <v-col
            v-for="research in researchProjects"
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
                      :src="baseApiUrl + research.thumb_url"
                      :lazy-src="baseApiUrl + research.thumb_url"
                      height="80"
                      width="80"
                      aspect-ratio="1"
                      class="grey lighten-2 rounded research-avatar"
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
              <v-row>
                <v-col cols="12" sm="6">
                  <v-row v-if="research.url !== null">
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('link')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <a :href="research.url" target="_blank">{{
                        research.url
                      }}</a>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.institution !== null">
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('institution')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <span>{{ research.institution }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.checklist_names.length > 0">
                    <v-col class="research-item-col pb-1" cols="4">
                      <span
                        class="research-property"
                        v-text="
                          $tc('Checklist', research.checklist_names.length)
                        "
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
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
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('type_of_data_used')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <span>{{ research.type_of_data_used }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.start_date !== null">
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('start_date')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <span>{{ research.start_date }}</span>
                    </v-col>
                  </v-row>
                  <v-row v-if="research.end_date !== null">
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('end_date')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <span>{{ research.end_date }}</span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-4">
                    <v-col class="research-item-col" cols="4">
                      <span
                        class="research-property"
                        v-text="$t('Current_consent')"
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="8">
                      <span>{{
                        research.consent ? $t('consent_yes') : $t('consent_no')
                      }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="research-item-col" cols="12" sm="4">
                      <span
                        class="research-property"
                        v-text="
                          $t('edit') + ' ' + $t('Consent').toLocaleLowerCase()
                        "
                      ></span>
                    </v-col>
                    <v-col class="research-item-col" cols="12" sm="8">
                      <v-btn
                        tile
                        outlined
                        :class="
                          `${research.consent ? 'red--text' : 'green--text'}`
                        "
                        @click="
                          consentToggle(research.id, research.consent ? 0 : 1)
                        "
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
                  sm="6"
                >
                  <v-row>
                    <v-col class="research-item-col" cols="12">
                      <span
                        class="research-property"
                        v-text="$t('Consent') + ' ' + $t('history')"
                      ></span>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      v-for="consentHistory in research.consent_history"
                      :key="consentHistory.id"
                      class="research-item-col"
                      cols="12"
                    >
                      <span>
                        {{ consentHistory.updated_at }}
                        <!-- <Datetime
                          v-model="consentHistory.updated_at"
                          type="datetime"
                        >
                          <template slot="button-cancel">
                            <v-btn text color="primary">{{
                              $t('Cancel')
                            }}</v-btn>
                          </template>
                          <template slot="button-confirm">
                            <v-btn text color="primary">{{ $t('ok') }}</v-btn>
                          </template>
                        </Datetime> -->
                      </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="researchProjects.length === 0">
        <v-col cols="12">
          {{ $t('no_data') }}
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import Api from '@api/Api'
// import { Datetime } from 'vue-datetime'
// import 'vue-datetime/dist/vue-datetime.min.css'
import Layout from '@layouts/back.vue'

export default {
  components: {
    // Datetime,
    Layout,
  },
  data: function() {
    return {
      researchProjects: [],
      numberOfHives: 0,
      numberOfApiaries: 0,
      numberOfDevices: 0,
    }
  },
  computed: {
    baseApiUrl() {
      var baseUrl = process.env.VUE_APP_API_URL
      baseUrl = baseUrl.replace('/api/', '')
      return baseUrl
    },
  },
  created() {
    this.readResearchProjects()
    this.getDevicesLength()
    this.getApiariesAndHivesLength()
  },
  methods: {
    async getDevicesLength() {
      try {
        const response = await Api.readRequest('/devices')
        this.numberOfDevices = response.data.length
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async getApiariesAndHivesLength() {
      try {
        const response = await Api.readRequest('/locations')
        this.numberOfApiaries = response.data.locations.length
        this.numberOfHives = response.data.locations.reduce((acc, location) => {
          acc += location.hives.length
          return acc
        }, 0)
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async readResearchProjects() {
      try {
        const response = await Api.readRequest('/research')
        this.researchProjects = response.data
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async consentToggle(id, consent) {
      try {
        if (consent) {
          await Api.postRequest('research/' + id + '/add_consent')
        } else {
          await Api.postRequest('research/' + id + '/remove_consent')
        }
        this.readResearchProjects()
        return true
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    // momentISO8601(date) {
    //   return this.$moment(date)
    //     .locale(this.$i18n.locale)
    //     .format()
    // },
    // updatedDate(consentHistory) {
    //   return this.momentISO8601(consentHistory.updated_at)
    // },
  },
}
</script>

<style lang="scss">
.research-item {
  padding: 12px;
  border-color: $color-primary !important;
  @include for-phone-only {
    padding: 10px;
  }
}

.research-avatar {
  .v-responsive__content {
    border: 1px solid $color-primary;
    border-radius: 4px;
  }
}

.research-item-col {
  padding: 0 0 8px 12px !important;
}

.research-property {
  font-size: 0.75rem;
  font-weight: 500;
  color: $color-grey-dark;
  letter-spacing: 0.0333333333em !important;
}
</style>
