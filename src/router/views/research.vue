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
                <v-col cols="4">
                  <span
                    ><v-icon>mdi-home-analytics</v-icon>
                    {{ $tc('Location', 2) }}: {{ apiaries.length }}</span
                  >
                </v-col>
                <v-col cols="4">
                  <span
                    ><v-icon>mdi-archive</v-icon> {{ $tc('Hive', 2) }}:
                    {{ hives.length }}</span
                  >
                </v-col>
                <v-col cols="4">
                  <span
                    ><v-icon>mdi-archive</v-icon> {{ $t('sensors') }}:
                    {{ sensors.length }}</span
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
              <div class="d-flex flex-row justify-start align-center">
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
                      class="grey lighten-2 rounded"
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
              <div>
                <span>{{
                  research.consent ? $t('consent_yes') : $t('consent_no')
                }}</span>
                <br />
                <v-btn
                  tile
                  outlined
                  color="primary"
                  @click="consentToggle(research.id, research.consent ? 0 : 1)"
                >
                  {{ research.consent ? $t('consent_no') : $t('consent_yes') }}
                </v-btn>
              </div>
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
import Layout from '@layouts/back.vue'

export default {
  components: { Layout },
  data: function() {
    return {
      researchProjects: [],
      apiaries: [1, 2],
      hives: [1, 2, 3],
      sensors: [1],
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
  },
  methods: {
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
  },
}
</script>

<style lang="scss">
.research-item {
  border-color: $color-primary !important;
}
</style>
