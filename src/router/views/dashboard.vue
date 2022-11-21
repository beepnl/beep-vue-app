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
        <div class="d-flex flex-column align-center">
          <div
            v-if="ready"
            class="text-h4 color-accent overline roboto-condensed mt-2"
            v-text="selectedApiary.name"
          ></div>
          <div id="map" ref="map">
            <MapMarker :lat="lat" :lng="lng" />
          </div>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Colony', 2)"
        ></div>
        <div v-if="ready" class="d-flex justify-center">
          <ApiaryPreviewHiveSelector
            :hives="selectedApiary.hives"
            @select-hive="selectHive($event)"
          ></ApiaryPreviewHiveSelector>
        </div>
      </v-col>

      <v-col class="dashboard-section" cols="12">
        <div
          class="text-h4 text-md-h2 dashboard-section-title"
          v-text="$tc('Inspection', 1)"
        ></div>
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
import {
  readApiariesAndGroups,
  readGeneralInspections,
} from '@mixins/methodsMixin'
import { momentFromNow } from '@mixins/momentMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    MapMarker,
  },
  mixins: [momentFromNow, readApiariesAndGroups, readGeneralInspections],
  data: function() {
    return {
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      ready: false,
      map: null,
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
      console.log('hive selected', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  color: $color-grey-dark;
  margin-top: 30px;

  @include for-tablet-landscape-up {
    margin-top: 60px;
    max-width: 60% !important;
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
  margin-bottom: 40px;
}

.dashboard-section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

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
</style>
