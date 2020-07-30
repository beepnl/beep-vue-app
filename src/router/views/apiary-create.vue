<template>
  <Layout
    :title="`${$t('create_new')} ${$tc('location', 1)}`"
    :no-box-shadow="true"
  >
    <v-tabs
      v-model="activeTab"
      background-color="primary"
      class="elevation-2"
      dense
      dark
      grow
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
        <span v-if="tab.title"
          ><v-icon v-if="tab.icon">{{ tab.icon }}</v-icon
          ><span class="hide-on-mobile">{{ tab.title }}</span
          ><span class="show-on-mobile">{{ tab.title_mobile }}</span></span
        >
      </v-tab>

      <v-tab-item value="tab-0">
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
          <div class="d-flex justify-space-between">
            <v-spacer></v-spacer>
            <div class="d-flex align-center">
              <span class="overline mr-3"
                >{{ $t('start_here') + ' '
                }}<v-icon class="bounce">mdi-arrow-right</v-icon></span
              >
              <v-icon
                x-large
                dark
                color="primary"
                class="next"
                @click="setActiveTab(1)"
                >mdi-chevron-right-box</v-icon
              >
            </div>
          </div>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-1">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="overline mb-4">{{
                $tc('Location', 1) + ' ' + $t('settings')
              }}</div>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-if="newHive"
                    v-model="newHive.name"
                    :label="`${$t('Name')}*`"
                    :placeholder="`${$t('Name')}`"
                    outlined
                  >
                  </v-text-field>

                  <v-switch
                    v-if="newHive"
                    v-model="newHive.roofed"
                    :label="`${$t('roofed')}`"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between">
            <v-icon
              x-large
              dark
              color="primary"
              class="prev"
              @click="setActiveTab(0)"
              >mdi-chevron-left-box</v-icon
            >
            <v-icon
              x-large
              dark
              color="primary"
              class="next"
              @click="setActiveTab(2)"
              >mdi-chevron-right-box</v-icon
            >
          </div>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-2">
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
              <v-row>
                <v-col cols="12">
                  <!-- <VueGoogleAutocomplete
                id="map"
                ref="address"
                classname="form-control"
                placeholder="Please type your address"
                country="sg"
                @placechanged="getAddressData"
              >
              </VueGoogleAutocomplete> -->
                  <v-text-field
                    v-model="address"
                    color="#ddd"
                    :label="`${$t('Address')}`"
                    outlined
                    dense
                  >
                  </v-text-field>
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
                  />
                </v-col>
                <v-col cols="6" sm="4">
                  <div class="beep-label" v-text="`${$t('Lattitude')}`"></div>
                  <VueNumberInput
                    v-if="newHive"
                    :value="parseFloat(newHive.lat)"
                    :step="0.001"
                    :min="-90"
                    :max="90"
                    inline
                    controls
                    @change="updateHive($event)"
                  ></VueNumberInput>
                </v-col>
                <v-col cols="6" sm="4">
                  <div class="beep-label" v-text="`${$t('Longitude')}`"></div>
                  <VueNumberInput
                    v-if="newHive"
                    :value="parseFloat(newHive.lon)"
                    :step="0.001"
                    :min="-180"
                    :max="180"
                    inline
                    controls
                    @change="updateHive($event)"
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
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between">
            <v-icon
              x-large
              dark
              color="primary"
              class="prev"
              @click="setActiveTab(1)"
              >mdi-chevron-left-box</v-icon
            >
            <v-icon
              x-large
              dark
              color="primary"
              class="next"
              @click="setActiveTab(3)"
              >mdi-chevron-right-box</v-icon
            >
          </div>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-3">
        <v-container>
          <HiveEditDetails :hive="newHive"></HiveEditDetails>

          <div class="d-flex justify-space-between">
            <v-icon
              x-large
              dark
              color="primary"
              class="prev"
              @click="setActiveTab(2)"
              >mdi-chevron-left-box</v-icon
            >
            <v-icon
              x-large
              dark
              color="primary"
              class="next"
              @click="setActiveTab(4)"
              >mdi-chevron-right-box</v-icon
            >
          </div>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-4">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="overline mb-4">{{
                $tc('Location', 1) + ' ' + $tc('hive', 2)
              }}</div>
              <v-row>
                <v-col cols="12" md="3">
                  <div class="beep-label" v-text="`${$t('Hive_amount')}`"></div>
                  <VueNumberInput
                    v-if="newHive"
                    v-model="newHive.hive_amount"
                    :min="1"
                    :max="50"
                    inline
                    controls
                  ></VueNumberInput>
                </v-col>

                <v-col cols="6" md="4">
                  <div class="beep-label" v-text="`${$t('Hive_prefix')}`"></div>
                  <v-text-field
                    v-if="newHive"
                    v-model="newHive.prefix"
                    :height="36"
                    class="prefix-input"
                    outlined
                    dense
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
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between">
            <v-icon x-large dark color="primary" @click="setActiveTab(3)"
              >mdi-chevron-left-box</v-icon
            >
            <v-btn
              tile
              outlined
              color="primary"
              class="mr-1"
              @click="createApiary"
            >
              <v-icon left>mdi-check</v-icon>
              {{ $t('save') }}
            </v-btn>
          </div>
        </v-container>
      </v-tab-item>
    </v-tabs>

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
import ApiaryPreview from '@components/apiary-preview.vue'
import Confirm from '@components/confirm.vue'
import HiveEditDetails from '@components/hive-edit-details.vue'
import Layout from '@layouts/back.vue'
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    ApiaryPreview,
    Confirm,
    HiveEditDetails,
    Layout,
    // VueGoogleAutocomplete,
    VueNumberInput,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      activeTab: 'tab-0',
      address: '',
      newHive: null,
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
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
      this.newHive = {
        name: this.$i18n.tc('Location', 1) + ' ' + (data + 1),
        color: '#F29100',
        hive_type_id: null,
        hive_amount: 1,
        brood_layers: 2, // Needed?
        honey_layers: 1, // Needed?
        frames: 10,
        offset: 1,
        prefix: this.$i18n.t('Hive_short'),
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
            color: '#ffa000',
            type: 'honey',
            order: 3,
            framecount: 10,
            key: 3,
          },
          {
            color: '#ffa000',
            type: 'brood',
            order: 2,
            framecount: 10,
            key: 2,
          },
          {
            color: '#ffa000',
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
      this.newHive.hive_layers = this.newHive.layers // FIXME: rename layers array here now because otherwise hive-factory in hive-edit-details wont work
      console.log('creating new apiary')
      console.log(this.newHive)
      try {
        const response = await this.$store.dispatch(
          'locations/createApiary',
          this.newHive
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.$router.push({
            name: 'home',
          })
        }, 300) // wait for API to update locations/hives
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('not_saved_error')
        this.snackbar.show = true
      }
    },
    async readApiaries() {
      try {
        const response = await this.$store.dispatch('locations/findAll')
        return response.locations.length
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData
    },
    setActiveTab(int) {
      this.activeTab = 'tab-' + int
    },
    updateHive(event) {
      console.log(event) // TODO: update newHive, integrate with autocomplete
    },
  },
}
</script>

<style lang="scss" scoped>
.v-tabs--icons-and-text > .v-tabs-bar {
  height: 48px;
  .v-tab {
    text-transform: none !important;
    letter-spacing: 0.075;

    .v-icon {
      font-size: 20px;
      color: $color-white;
      &::before {
        margin-top: -2px;
      }
    }

    .show-on-mobile {
      display: none;
    }

    @media (max-width: 900px) {
      padding: 0 4px;
      font-size: 12px !important;
      .v-icon {
        font-size: 16px;
      }
      // .v-icon {
      //   display: block;
      //   &::before {
      //     margin-top: 2px;
      //   }
      // }
    }

    @media (max-width: 725px) {
      min-width: 70px !important;
      font-size: 16px !important;
      .hide-on-mobile {
        display: none;
      }
      .show-on-mobile {
        display: inline;
      }
      .v-icon {
        display: inline;
        font-size: 24px;
      }
    }
  }
}

.country-select {
  max-width: 100%;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid $color-grey-light;
  border-radius: 4px;
}

.prefix-input.v-text-field.v-input--dense.v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 36px !important; // FIXME: overridden somewhere?
}

.next {
  margin-right: -6px;
}
.prev {
  margin-left: -6px;
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
</style>
