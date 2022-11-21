<template>
  <v-container class="dashboard-container">
    <v-row>
      <v-col cols="12" class="mb-6">
        <div class="d-flex justify-center align-center dashboard-header">
          <div class="d-flex align-self-center"
            ><img
              class="dashboard-logo"
              :src="assetsUrl + '/img/beep-icon-logo.svg'"
            />
          </div>

          <div
            class="text-h3 text-md-h2 dashboard-title overline roboto-condensed"
            v-text="$t('Dashboard')"
          ></div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Location', 1)"
        ></div>
        <div class="d-flex flex-column align-center mt-2">
          <div id="map" ref="map">
            <MapMarker :lat="lat" :lng="lng" />
          </div>
          <div
            v-if="ready"
            class="text-h4 color-accent overline roboto-condensed mt-1"
            v-text="selectedApiary.name"
          ></div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Colony', 2)"
        ></div>
        <div v-if="ready" class="d-flex flex-column align-center">
          <ApiaryPreviewHiveSelector
            :hives="selectedApiary.hives"
            :hives-selected="selectedHiveIds"
            :dashboard-mode="true"
            @select-hive="selectHive($event)"
          ></ApiaryPreviewHiveSelector>
          <div
            class="text-h4 color-accent overline roboto-condensed mt-2"
            v-text="selectedHive.name"
          ></div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Inspection', 1)"
        ></div>
        <div
          v-if="ready && selectedHive"
          class="dashboard-inspection rounded-border primary-border"
        >
          <v-row v-if="selectedHive.last_inspection_date">
            <v-col cols="5"
              ><span v-text="$t('Last_check') + ' : '"></span
            ></v-col>
            <v-col cols="7"
              ><span
                v-text="momentFromNow(selectedHive.last_inspection_date)"
              ></span
            ></v-col>
          </v-row>
          <v-row v-if="selectedHive.impression">
            <v-col cols="5"
              ><span v-text="$t('positive_impression') + ' : '"></span
            ></v-col>
            <v-col cols="7">
              <v-icon v-if="selectedHive.impression === 1" class="red--text">
                mdi-emoticon-sad
              </v-icon>
              <v-icon v-if="selectedHive.impression === 3" class="green--text">
                mdi-emoticon-happy
              </v-icon>
              <v-icon v-if="selectedHive.impression === 2" class="orange--text">
                mdi-emoticon-neutral
              </v-icon>
            </v-col>
          </v-row>
          <v-row v-if="selectedHive.notes">
            <v-col cols="5"><span v-text="$t('Note') + ' : '"></span></v-col>
            <v-col cols="7"><span v-text="selectedHive.notes"></span></v-col>
          </v-row>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Measurement', 2)"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import MapMarker from '@components/map-marker.vue'
import { mapGetters } from 'vuex'
import { readApiariesAndGroups } from '@mixins/methodsMixin'
import { momentFromNow } from '@mixins/momentMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    MapMarker,
  },
  mixins: [momentFromNow, readApiariesAndGroups],
  data: function() {
    return {
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      ready: false,
      map: null,
      selectedHive: null,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    selectedApiary() {
      return this.apiaries.length > 0 ? this.apiaries[0] : null
    },
    lat() {
      return this.selectedApiary !== null
        ? this.selectedApiary.coordinate_lat
        : -25.344
    },
    lng() {
      return this.selectedApiary !== null
        ? this.selectedApiary.coordinate_lon
        : 131.036
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    selectedHiveIds() {
      return this.selectedHive ? [this.selectedHive.id] : []
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    selectedApiary() {
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        fullscreenControl: false,
        zoom: 9,
      })
    },
  },
  created() {
    this.readApiariesAndGroups().then(() => {
      this.selectedHive = this.selectedApiary.hives[0]
      this.ready = true
    })
  },
  methods: {
    getMap(callback) {
      const self = this
      function checkForMap() {
        if (self.ready && self.map) callback(self.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
    selectHive(id) {
      this.selectedHive = this.selectedApiary.hives.filter(
        (hive) => hive.id === id
      )[0]
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  color: $color-grey-dark;
  margin-top: 20px;
  padding: 20px;

  @include for-tablet-landscape-up {
    margin-top: 60px;
    max-width: 60% !important;
    padding: 12px;
  }
}

.dashboard-header {
  flex-direction: column;
  @include for-tablet-landscape-up {
    flex-direction: row;
  }
}

.dashboard-logo {
  @include for-tablet-landscape-up {
    height: 68px;
    margin-top: -4px;
  }
}

.dashboard-section {
  text-align: center !important;
  margin-bottom: 20px;
  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }
}

.dashboard-section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    min-width: 18vw;
  }

  &::before {
    background: linear-gradient(to right, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to right, #fff, rgba(242, 145, 0, 0.7));
    margin-right: 12px;
    @include for-tablet-landscape-up {
      margin-right: 24px;
    }
  }

  &::after {
    background: linear-gradient(to left, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to left, #fff, rgba(242, 145, 0, 0.7));
    margin-left: 12px;
    @include for-tablet-landscape-up {
      margin-left: 24px;
    }
  }
}

#map {
  margin: 6px 0;
  height: 300px;
  width: 300px;
  background: $color-primary;
  border: 4px solid $color-primary;
}

.dashboard-inspection {
  text-align: left !important;
}
</style>
