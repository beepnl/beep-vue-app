<template>
  <Layout :title="$t('new_apiary')">
    <v-form ref="form" v-model="valid">
      <v-tabs
        v-model="activeTab"
        class="apiary-tabs"
        density="compact"
        grow
        bg-color="#F8B133"
        color="#000"
      >
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          class="d-flex flex-row apiary-tab"
          :value="i"
        >
          <v-icon
            v-if="tab.title && tab.icon"
            :size="mobile ? 'large' : 'default'"
            :class="
              'mr-1 apiary-tab-icon' +
                (tab.index === activeTab ? '' : ' --inactive')
            "
            >{{ tab.icon }}</v-icon
          ><span
            v-if="tab.title"
            :class="
              'apiary-tab-title' +
                (tab.index === activeTab ? '' : ' --inactive')
            "
            v-text="smallScreen ? tab.title_mobile : tab.title"
          ></span>
        </v-tab>
      </v-tabs>

      <v-window
        v-model="activeTab"
        class="apiary-create"
        :touch="{ left: null, right: null }"
      >
        <v-window-item :value="0">
          <div class="browse-tabs-bar">
            <div
              class="d-flex justify-space-between align-center chevron-wrapper"
            >
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <span class="text-overline mr-3 d-flex align-center"
                  >{{ $t('start_here') + ' '
                  }}<v-icon class="bounce">mdi-arrow-right</v-icon></span
                >
                <v-icon
                  x-large
                  dark
                  color="accent"
                  class="next"
                  @click="activeTab += 1"
                  >mdi-chevron-right</v-icon
                >
              </div>
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="text-overline mb-4">{{
                  $t('new_apiary_explanation')
                }}</div>
                <v-img
                  class="align-center"
                  max-height="70vh"
                  width="100%"
                  :src="assetsUrl + '/img/apiary-in-field.jpg'"
                >
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item :value="1">
          <div class="browse-tabs-bar">
            <div
              class="d-flex justify-space-between align-center chevron-wrapper"
            >
              <v-icon
                x-large
                dark
                color="accent"
                class="prev"
                @click="activeTab -= 1"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="accent"
                class="next"
                @click="activeTab += 1"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="text-overline mb-4">{{
                  $tc('Location', 1) + ' ' + $t('settings')
                }}</div>
                <div class="rounded-border">
                  <v-row class="my-0">
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.name"
                        :label="`${$t('Name')}*`"
                        :placeholder="`${$t('Name')}`"
                        class="large-font mb-sm-3"
                        counter="30"
                        :rules="requiredRule"
                        @update:model-value="validateText($event, 'name', 30)"
                      >
                      </v-text-field>

                      <div class="mb-3">
                        <div
                          class="beep-label"
                          v-text="`${$t('Apiary_color')}`"
                        ></div>
                        <v-sheet
                          v-if="newHive"
                          class="apiary-color cursor-pointer"
                          dark
                          :color="newHive.hex_color"
                          @click="overlay = !overlay"
                        ></v-sheet>
                      </div>

                      <v-overlay
                        v-model="overlay"
                        class="align-center justify-center"
                      >
                        <v-toolbar
                          class="hive-color-picker-toolbar"
                          density="compact"
                          flat
                        >
                          <div
                            class="hive-color-picker-title ml-1"
                            v-text="`${$t('Apiary_color')}`"
                          ></div>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-icon class="mr-1" @click="cancelColorPicker"
                              >mdi-close</v-icon
                            >
                          </v-toolbar-items>
                        </v-toolbar>

                        <v-color-picker
                          v-model="colorPicker"
                          class="hive-color-picker flex-color-picker"
                          position="relative"
                          :swatches="swatchesApiary"
                          show-swatches
                          :modes="['rgb']"
                          :mode="'rgb'"
                          hide-canvas
                        >
                        </v-color-picker>

                        <v-toolbar
                          class="hive-color-picker-footer"
                          density="compact"
                          light
                          flat
                        >
                          <v-spacer></v-spacer>
                          <v-icon
                            class="mr-1"
                            color="accent"
                            @click="editApiary(colorPickerValue, 'hex_color')"
                            >mdi-check</v-icon
                          >
                        </v-toolbar>
                      </v-overlay>

                      <v-switch
                        v-if="newHive"
                        class="ml-1"
                        :model-value="newHive.roofed"
                        :label="$t('roofed')"
                        :true-value="1"
                        :false-value="0"
                        @update:model-value="editApiary($event, 'roofed')"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item :value="2">
          <div class="browse-tabs-bar">
            <div
              class="d-flex justify-space-between align-center chevron-wrapper"
            >
              <v-icon
                x-large
                dark
                color="accent"
                class="prev"
                @click="activeTab -= 1"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="accent"
                class="next"
                @click="activeTab += 1"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="text-overline mb-4">
                  {{
                    $t('Place') +
                      ' ' +
                      $t('details') +
                      ' (' +
                      $t('optional') +
                      ')'
                  }}</div
                >
                <div class="rounded-border">
                  <v-row class="my-0">
                    <v-col cols="12">
                      <div class="beep-label" v-text="`${$t('Address')}`"></div>
                      <VueGoogleAutocomplete
                        id="map"
                        ref="address"
                        classname="autocomplete-field v-input v-input--dense v-text-field v-text-field--outlined"
                        :placeholder="`${$t('Address_placeholder')}`"
                        @placechanged="getAddressData"
                      >
                      </VueGoogleAutocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <div class="beep-label" v-text="`${$t('Country')}`"></div>
                      <country-select
                        v-if="newHive"
                        v-model="newHive.country_code"
                        :country="newHive.country_code.toUpperCase()"
                        :usei18n="false"
                        class="country-select"
                        @update:model-value="setApiaryEdited(true)"
                      />
                    </v-col>
                    <v-col cols="6" sm="4">
                      <div
                        class="beep-label"
                        v-text="`${$t('latitude')}`"
                      ></div>
                      <ElInputNumber
                        v-if="newHive"
                        :model-value="newHive.lat"
                        :min="-90"
                        :max="90"
                        :step="0.001"
                        :precision="3"
                        :step-strictly="true"
                        @change="editApiary($event, 'lat')"
                        @update:model-value="
                          convertComma($event, newHive, 'lat', 3),
                            setApiaryEdited(true)
                        "
                      ></ElInputNumber>
                    </v-col>
                    <v-col cols="6" sm="4">
                      <div
                        class="beep-label"
                        v-text="`${$t('Longitude')}`"
                      ></div>
                      <ElInputNumber
                        v-if="newHive"
                        :model-value="newHive.lon"
                        :min="-180"
                        :max="180"
                        :step="0.001"
                        :precision="3"
                        :step-strictly="true"
                        @change="editApiary($event, 'lon')"
                        @update:model-value="
                          convertComma($event, newHive, 'lon', 3),
                            setApiaryEdited(true)
                        "
                      ></ElInputNumber>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.city"
                        :label="`${$t('City')}`"
                        variant="outlined"
                        density="compact"
                        class="beep-text-field"
                        @update:model-value="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.postal_code"
                        :label="`${$t('Postal_code')}`"
                        variant="outlined"
                        density="compact"
                        class="beep-text-field"
                        @update:model-value="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.street"
                        :label="`${$t('Street')}`"
                        variant="outlined"
                        density="compact"
                        class="beep-text-field"
                        @update:model-value="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.street_no"
                        :label="`${$t('Number')}`"
                        variant="outlined"
                        density="compact"
                        class="beep-text-field"
                        @update:model-value="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item :value="3">
          <div class="browse-tabs-bar">
            <div
              class="d-flex justify-space-between align-center chevron-wrapper"
            >
              <v-icon
                x-large
                dark
                color="accent"
                class="prev"
                @click="activeTab -= 1"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="accent"
                class="next"
                @click="activeTab += 1"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <HiveEditDetails :hive="newHive"></HiveEditDetails>
          </v-container>
        </v-window-item>

        <v-window-item :value="4">
          <div class="browse-tabs-bar">
            <div
              class="d-flex align-center justify-space-between align-center chevron-wrapper"
            >
              <v-icon x-large dark color="accent" @click="activeTab -= 1"
                >mdi-chevron-left</v-icon
              >
              <v-btn
                color="black"
                class="mr-3"
                :disabled="!valid || showLoadingIcon"
                @click.prevent="createApiary"
              >
                <v-progress-circular
                  v-if="showLoadingIcon"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="disabled"
                  indeterminate
                />
                <v-icon v-if="!showLoadingIcon" start>mdi-check</v-icon>
                {{ $t('save') }}
              </v-btn>
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="text-overline mb-4">{{
                  $tc('Location', 1) + ' ' + $tc('hive', 2)
                }}</div>
                <div class="rounded-border">
                  <v-row class="my-0">
                    <v-col cols="12" md="3">
                      <div
                        class="beep-label"
                        v-text="`${$t('Hive_amount')}`"
                      ></div>
                      <ElInputNumber
                        v-if="newHive"
                        v-model="newHive.hive_amount"
                        :min="0"
                        :max="50"
                        :precision="0"
                        :step-strictly="true"
                        @update:model-value="setApiaryEdited(true)"
                      ></ElInputNumber>
                    </v-col>

                    <v-col cols="6" md="4">
                      <div
                        class="beep-label"
                        v-text="`${$t('Hive_prefix')}`"
                      ></div>
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.prefix"
                        :height="36"
                        class="beep-text-field"
                        variant="outlined"
                        density="compact"
                        @update:model-value="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                      <div>
                        <div
                          class="beep-label"
                          v-text="`${$t('Hive_number_offset')}`"
                        ></div>
                        <ElInputNumber
                          v-if="newHive"
                          v-model="newHive.offset"
                          :precision="0"
                          @update:model-value="setApiaryEdited(true)"
                        ></ElInputNumber>
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <div
                        class="beep-label"
                        v-text="`${$tc('Location', 1)} ${$t('preview')}`"
                      ></div>
                      <ApiaryPreview
                        v-if="newHive"
                        class="mt-10"
                        :new-hive="newHive"
                        :number-of-hives="newHive.hive_amount"
                      ></ApiaryPreview>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="accent " variant="text" @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import ApiaryPreview from '@components/apiary-preview.vue'
import Confirm from '@/src/components/confirm-dialog.vue'
import HiveEditDetails from '@components/hive-edit-details.vue'
import Layout from '@/src/router/layouts/back-layout.vue'
import { mapGetters } from 'vuex'
import {
  convertComma,
  readApiariesAndGroupsIfNotPresent,
} from '@mixins/methodsMixin'
import { ElInputNumber } from 'element-plus'

export default {
  components: {
    ApiaryPreview,
    Confirm,
    HiveEditDetails,
    Layout,
    VueGoogleAutocomplete,
    ElInputNumber,
  },
  mixins: [convertComma, readApiariesAndGroupsIfNotPresent],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      swatchesApiary: [
        ['#606060', '#b7701f', '#F8B133'],
        ['#2dbde5', '#094da0', '#27820e'],
        ['#ffe900', '#d80d0d', '#754B1F'],
      ],
      activeTab: 0,
      overlay: false,
      colorPickerValue: '',
      newHive: null,
      newApiaryNumber: 0,
      valid: false,
      showLoadingIcon: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaryEdited', 'apiaries']),
    colorPicker: {
      get() {
        if (this.newHive) {
          return this.newHive.hex_color
        } else {
          return '#F8B133'
        }
      },
      set(value) {
        this.colorPickerValue = value
      },
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.display.xs
    },
    smallScreen() {
      return this.$vuetify.display.width < 751
    },
    requiredRule: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('Name') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
    tabs: function() {
      return [
        {
          index: 0,
          title: ' ' + this.$i18n.t('new_apiary'),
          title_mobile: '',
          icon: 'mdi-star',
        },
        {
          index: 1,
          title: ' 1. ' + this.$i18n.tc('Location', 1),
          title_mobile: ' 1',
          icon: 'mdi-home-analytics',
        },
        {
          index: 2,
          title: ' 2. ' + this.$i18n.t('Place'),
          title_mobile: ' 2',
          icon: 'mdi-map-marker',
        },
        {
          index: 3,
          title:
            ' 3. ' +
            this.$i18n.tc('Hive', 1) +
            ' ' +
            this.$i18n.t('configuration'),
          title_mobile: ' 3',
          icon: 'mdi-archive',
        },
        {
          index: 4,
          title: ' 4. ' + this.$i18n.t('Hive_amount'),
          title_mobile: ' 4',
          icon: 'mdi-file-chart',
        },
      ]
    },
  },
  created() {
    this.readApiariesAndGroupsIfNotPresent().then(() => {
      this.setApiaryEdited(false)
      this.newApiaryNumber = this.apiaries.length + 1
      this.newHive = {
        name: this.$i18n.tc('Location', 1) + ' ' + this.newApiaryNumber,
        color: '#F8B133',
        hex_color: '#F8B133',
        hive_type_id: null,
        hive_amount: 1,
        frames: 10,
        offset: 1,
        prefix: this.$i18n.tc('Hive_short', 1),
        country_code: this.locale,
        city: '',
        postal_code: '',
        street: '',
        street_no: '',
        lat: 52,
        lon: 5,
        bb_width_cm: null,
        bb_depth_cm: null,
        bb_height_cm: null,
        fr_width_cm: null,
        fr_height_cm: null,
        roofed: 0,
        layers: [
          {
            color: '#F8B133',
            type: 'honey',
            order: 3,
            framecount: 10,
            key: 3,
          },
          {
            color: '#F8B133',
            type: 'brood',
            order: 2,
            framecount: 10,
            key: 2,
          },
          {
            color: '#F8B133',
            type: 'brood',
            order: 1,
            framecount: 10,
            key: 1,
          },
        ],
      }
    })
  },
  methods: {
    async createApiary() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest('/locations', this.newHive)
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
            this.showLoadingIcon = false
          }
          this.clearHiveFilters()
          setTimeout(() => {
            return this.readApiaries().then(() => {
              if (this.newHive.hive_amount !== 0) {
                this.$store.commit('locations/setData', {
                  prop: 'hiveSearch',
                  value: this.newHive.name, // set search term via store instead of query to overrule possible stored search terms
                })
              }
              this.$router.push({
                name: 'home',
              })
            })
          }, 50) // wait for API to update locations/hives
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
          this.showLoadingIcon = false
        }
      }
    },
    async readApiaries() {
      try {
        const response = await Api.readRequest('/locations')
        this.$store.commit('locations/setApiaries', response.data.locations)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    cancelColorPicker() {
      this.overlay = false
    },
    clearHiveFilters() {
      this.$store.commit('locations/clearFilters')
    },
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function(addressData, placeResultData, id) {
      const countryCode = placeResultData.address_components.filter(
        (addressComponent) => {
          return addressComponent.types.includes('country')
        }
      )[0].short_name
      this.newHive.country_code = countryCode
      this.newHive.lat = addressData.latitude
      this.newHive.lon = addressData.longitude
      this.newHive.city = addressData.locality
      this.newHive.postal_code = addressData.postal_code
      this.newHive.street = addressData.route
      this.newHive.street_no = addressData.street_number
    },
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    editApiary(value, property) {
      this.newHive[property] = value
      if (property === 'hex_color') {
        this.cancelColorPicker()
      }
      this.setApiaryEdited(true)
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.newHive[property] = value
      }
      this.setApiaryEdited(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-tabs {
  &.v-tabs--icons-and-text > .v-tabs-bar {
    .v-tab {
      .v-icon {
        font-size: 20px;
        &::before {
          margin-top: -2px;
        }
      }

      @media (max-width: 900px) {
        padding: 0 4px;
        font-size: 12px !important;
        .v-icon {
          font-size: 16px;
        }
      }

      @media (max-width: 725px) {
        min-width: 70px !important;
        font-size: 16px !important;
        .v-icon {
          display: inline !important;
          font-size: 24px;
        }
      }
      &.v-tab--active {
        background-color: $color-primary;
        .v-icon {
          &::before {
            color: $color-black;
          }
        }
      }
    }
  }

  .apiary-tab {
    white-space: nowrap;
  }
}

.apiary-create {
  .browse-tabs-bar {
    padding: 4px 0;
    background-color: $color-orange-light !important;
    border-bottom: 1px solid $color-orange-border !important;
    .chevron-wrapper {
      height: 40px;
    }
    @include for-tablet-landscape-up {
      padding: 8px 12px;
    }
  }

  .apiary-color {
    width: 35px;
    height: 35px;
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }

  .country-select,
  .autocomplete-field {
    width: 100%;
    max-width: 100%;
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid $color-grey-light;
    border-radius: 4px;

    &:focus {
      outline-color: $color-primary;
    }
  }

  .bounce {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(18px);
    }
    60% {
      transform: translateX(9px);
    }
  }
}

.apiary-tab-title,
.apiary-tab-icon {
  text-transform: none !important;
  color: $color-black !important;
  &.--inactive {
    color: $color-inactive !important;
  }
}
</style>
