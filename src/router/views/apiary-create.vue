<template>
  <Layout :title="`${$t('create_new')} ${$tc('location', 1)}`">
    <v-form ref="form" v-model="valid" @submit.prevent="createApiary">
      <v-tabs
        v-model="activeTab"
        class="apiary-create"
        dense
        light
        grow
        background-color="#F8B133"
        color="#000"
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          class="d-flex flex-row apiary-tab"
          :href="`#tab-${i}`"
        >
          <v-icon v-if="tab.title && tab.icon" class="mt-1 mr-1">{{
            tab.icon
          }}</v-icon
          ><span
            v-if="tab.title"
            v-text="mobile ? tab.title_mobile : tab.title"
          ></span>
        </v-tab>

        <v-tab-item value="tab-0">
          <div class="browse-tabs-bar">
            <div class="d-flex justify-space-between">
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <span class="overline mr-3 d-flex align-center"
                  >{{ $t('start_here') + ' '
                  }}<v-icon class="bounce">mdi-arrow-right</v-icon></span
                >
                <v-icon
                  x-large
                  dark
                  color="primary"
                  class="next"
                  @click="setActiveTab(tabIndex + 1)"
                  >mdi-chevron-right</v-icon
                >
              </div>
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="overline mb-4">{{
                  $t('new_apiary_explanation')
                }}</div>
                <v-img
                  class="align-center"
                  max-height="70vh"
                  width="100%"
                  src="~@assets/img/apiary-in-field.jpg"
                >
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="tab-1">
          <div class="browse-tabs-bar">
            <div class="d-flex justify-space-between">
              <v-icon
                x-large
                dark
                color="primary"
                class="prev"
                @click="setActiveTab(tabIndex - 1)"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="primary"
                class="next"
                @click="setActiveTab(tabIndex + 1)"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="overline mb-4">{{
                  $tc('Location', 1) + ' ' + $t('settings')
                }}</div>
                <div class="rounded-border">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.name"
                        :label="`${$t('Name')}*`"
                        :placeholder="`${$t('Name')}`"
                        class="beep--large"
                        counter="30"
                        :rules="requiredRule"
                        required
                        @input="validateText($event, 'name', 30)"
                      >
                      </v-text-field>

                      <div>
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

                      <v-overlay :value="overlay">
                        <v-toolbar
                          class="hive-color-picker-toolbar"
                          dense
                          light
                        >
                          <div
                            class="hive-color-picker-title"
                            v-text="`${$t('Apiary_color')}`"
                          ></div>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-icon
                              class="mr-1"
                              color="primary"
                              @click="editApiary(colorPickerValue, 'hex_color')"
                              >mdi-check</v-icon
                            >
                            <v-icon @click="cancelColorPicker"
                              >mdi-close</v-icon
                            >
                          </v-toolbar-items>
                        </v-toolbar>

                        <v-color-picker
                          v-model="colorPicker"
                          class="hive-color-picker flex-color-picker"
                          :swatches="swatchesApiary"
                          show-swatches
                          hide-canvas
                          light
                          flat
                        >
                        </v-color-picker>
                      </v-overlay>

                      <v-switch
                        v-if="newHive"
                        v-model="newHive.roofed"
                        :label="`${$t('roofed')}`"
                        @change="setApiaryEdited(true)"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="tab-2">
          <div class="browse-tabs-bar">
            <div class="d-flex justify-space-between">
              <v-icon
                x-large
                dark
                color="primary"
                class="prev"
                @click="setActiveTab(tabIndex - 1)"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="primary"
                class="next"
                @click="setActiveTab(tabIndex + 1)"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="overline mb-4">
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
                  <v-row>
                    <v-col cols="12">
                      <div class="beep-label" v-text="`${$t('Address')}`"></div>
                      <VueGoogleAutocomplete
                        id="map"
                        ref="address"
                        classname="autocomplete-field v-input v-input--dense v-text-field v-text-field--outlined"
                        :placeholder="`${$t('Address')}`"
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
                        @input="setApiaryEdited(true)"
                      />
                    </v-col>
                    <v-col cols="6" sm="4">
                      <div
                        class="beep-label"
                        v-text="`${$t('Lattitude')}`"
                      ></div>
                      <VueNumberInput
                        v-if="newHive"
                        :value="parseFloat(newHive.lat)"
                        :step="0.001"
                        :min="-90"
                        :max="90"
                        inline
                        controls
                        @click="setApiaryEdited(true)"
                        @change="editApiary($event, 'lat')"
                      ></VueNumberInput>
                    </v-col>
                    <v-col cols="6" sm="4">
                      <div
                        class="beep-label"
                        v-text="`${$t('Longitude')}`"
                      ></div>
                      <VueNumberInput
                        v-if="newHive"
                        :value="parseFloat(newHive.lon)"
                        :step="0.001"
                        :min="-180"
                        :max="180"
                        inline
                        controls
                        @click="setApiaryEdited(true)"
                        @change="editApiary($event, 'lon')"
                      ></VueNumberInput>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.city"
                        :label="`${$t('City')}`"
                        outlined
                        dense
                        @change="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.postal_code"
                        :label="`${$t('Postal_code')}`"
                        outlined
                        dense
                        @change="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.street"
                        :label="`${$t('Street')}`"
                        outlined
                        dense
                        @change="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-if="newHive"
                        v-model="newHive.street_no"
                        :label="`${$t('Number')}`"
                        outlined
                        dense
                        @change="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="tab-3">
          <div class="browse-tabs-bar">
            <div class="d-flex justify-space-between">
              <v-icon
                x-large
                dark
                color="primary"
                class="prev"
                @click="setActiveTab(tabIndex - 1)"
                >mdi-chevron-left</v-icon
              >
              <v-icon
                x-large
                dark
                color="primary"
                class="next"
                @click="setActiveTab(tabIndex + 1)"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
          <v-container>
            <HiveEditDetails :hive="newHive"></HiveEditDetails>
          </v-container>
        </v-tab-item>

        <v-tab-item value="tab-4">
          <div class="browse-tabs-bar">
            <div class="d-flex align-center justify-space-between">
              <v-icon
                x-large
                dark
                color="primary"
                @click="setActiveTab(tabIndex - 1)"
                >mdi-chevron-left</v-icon
              >
              <v-btn
                tile
                outlined
                color="primary"
                class="mr-3"
                type="submit"
                :disabled="!valid"
              >
                <v-progress-circular
                  v-if="showLoadingIcon"
                  class="ml-n1 mr-2"
                  size="18"
                  width="2"
                  color="primary"
                  indeterminate
                />
                <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
                {{ $t('save') }}
              </v-btn>
            </div>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="overline mb-4">{{
                  $tc('Location', 1) + ' ' + $tc('hive', 2)
                }}</div>
                <div class="rounded-border">
                  <v-row>
                    <v-col cols="12" md="3">
                      <div
                        class="beep-label"
                        v-text="`${$t('Hive_amount')}`"
                      ></div>
                      <VueNumberInput
                        v-if="newHive"
                        v-model="newHive.hive_amount"
                        :min="1"
                        :max="50"
                        inline
                        controls
                        @click="setApiaryEdited(true)"
                      ></VueNumberInput>
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
                        class="prefix-input"
                        outlined
                        dense
                        @change="setApiaryEdited(true)"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                      <div>
                        <div
                          class="beep-label"
                          v-text="`${$t('Hive_number_offset')}`"
                        ></div>
                        <VueNumberInput
                          v-if="newHive"
                          v-model="newHive.offset"
                          :step="1"
                          inline
                          controls
                          @click="setApiaryEdited(true)"
                        ></VueNumberInput>
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <div
                        class="beep-label"
                        v-text="`${$tc('Location', 1)} ${$t('preview')}`"
                      ></div>
                      <ApiaryPreview
                        v-if="newHive"
                        class="mt-10 mb-5"
                        :new-hive="newHive"
                        :number-of-hives="newHive.hive_amount"
                      ></ApiaryPreview>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import ApiaryPreview from '@components/apiary-preview.vue'
import Confirm from '@components/confirm.vue'
import HiveEditDetails from '@components/hive-edit-details.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    ApiaryPreview,
    Confirm,
    HiveEditDetails,
    Layout,
    VueGoogleAutocomplete,
    VueNumberInput,
  },
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
      activeTab: 'tab-0',
      overlay: false,
      colorPickerValue: '',
      newHive: null,
      newApiaryNumber: 0,
      valid: false,
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaryEdited']),
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
      return this.$vuetify.breakpoint.mobile
    },
    requiredRule: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('Naam') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
    tabIndex() {
      return parseInt(this.activeTab[this.activeTab.length - 1])
    },
    tabs: function() {
      return [
        {
          title: ' ' + this.$i18n.t('New') + ' ' + this.$i18n.tc('location', 1),
          title_mobile: '',
          icon: 'mdi-star',
        },
        {
          title: ' 1. ' + this.$i18n.tc('Location', 1),
          title_mobile: ' 1',
          icon: 'mdi-home-analytics',
        },
        {
          title: ' 2. ' + this.$i18n.t('Place'),
          title_mobile: ' 2',
          icon: 'mdi-map-marker',
        },
        {
          title:
            ' 3. ' +
            this.$i18n.tc('Hive', 1) +
            ' ' +
            this.$i18n.t('configuration'),
          title_mobile: ' 3',
          icon: 'mdi-archive',
        },
        {
          title: ' 4. ' + this.$i18n.t('Hive_amount'),
          title_mobile: ' 4',
          icon: 'mdi-file-chart',
        },
      ]
    },
  },
  created() {
    this.readApiaries().then((data) => {
      this.setApiaryEdited(false)
      this.newApiaryNumber = data + 1
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
    consoleLog(blub) {
      console.log(blub)
    },
    async createApiary() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.postRequest('/locations', this.newHive)
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
              query: { search: this.newHive.name },
            })
          }, 300) // wait for API to update locations/hives
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
      }
    },
    async readApiaries() {
      try {
        const response = await Api.readRequest('/locations')
        return response.data.locations.length
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    cancelColorPicker() {
      this.overlay = false
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
    setActiveTab(int) {
      this.activeTab = 'tab-' + int
    },
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    editApiary(value, property) {
      this.newHive[property] = value
      if (property === 'hex_color') {
        this.cancelColorPicker()
      }
      if (property !== 'lat' && property !== 'lon') {
        // if value is present, vueNumberInput always triggers editApiary method for these properties
        this.setApiaryEdited(true)
      }
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
.apiary-create {
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

  .browse-tabs-bar {
    padding: 4px 0;
    background-color: $color-orange-light !important;
    border-bottom: 1px solid #fff5e2 !important;
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
</style>
