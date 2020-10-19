<template>
  <Layout :title="`${$t('edit')} ${$tc('location', 1)}`" :no-box-shadow="true">
    <h1
      v-if="
        activeApiary &&
          typeof activeApiary.name !== 'undefined' &&
          !activeApiary.owner
      "
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('location', 1) +
          ' "' +
          activeApiary.name +
          '" ' +
          $t('not_editable')
      }}
    </h1>

    <v-form ref="form" v-model="valid" @submit.prevent="updateApiary">
      <v-toolbar
        v-if="activeApiary && activeApiary.owner"
        class="save-bar"
        dense
        light
      >
        <v-spacer></v-spacer>
        <v-icon
          v-if="activeApiary.owner"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteApiary"
          >mdi-delete</v-icon
        >
        <v-btn class="mr-n2" icon type="submit" :disabled="!valid">
          <v-progress-circular
            v-if="showLoadingIcon"
            class="mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" dark color="primary"
            >mdi-check</v-icon
          >
        </v-btn>
      </v-toolbar>

      <v-container class="apiary-edit content-container">
        <v-row>
          <v-col cols="12">
            <div class="overline mb-3">{{
              $tc('Location', 1) + ' ' + $t('settings')
            }}</div>
            <div class="rounded-border">
              <v-row>
                <v-col cols="12" sm="8" md="6" lg="5">
                  <v-text-field
                    v-if="activeApiary"
                    v-model="activeApiary.name"
                    :label="`${$t('Name')}*`"
                    :placeholder="`${$t('Name')}`"
                    class="apiary-edit-name mb-sm-3"
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
                      v-if="activeApiary"
                      class="apiary-color"
                      dark
                      :color="activeApiary.hex_color"
                      @click="overlay = !overlay"
                    ></v-sheet>
                  </div>

                  <v-overlay :value="overlay">
                    <v-toolbar class="hive-color-picker-toolbar" dense light>
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
                        <v-icon @click="overlay = false">mdi-close</v-icon>
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
                    v-if="activeApiary"
                    v-model="activeApiary.roofed"
                    :label="`${$t('roofed')}`"
                    @change="setApiaryEdited(true)"
                  ></v-switch>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="overline mb-3">
              {{
                $t('Place') + ' ' + $t('details') + ' (' + $t('optional') + ')'
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
                    v-if="activeApiary"
                    v-model="activeApiary.country_code"
                    :country="activeApiary.country_code.toUpperCase()"
                    :usei18n="false"
                    class="country-select"
                    @input="setApiaryEdited(true)"
                  />
                </v-col>
                <v-col cols="6" sm="4">
                  <div class="beep-label" v-text="`${$t('Lattitude')}`"></div>
                  <VueNumberInput
                    v-if="activeApiary"
                    :value="parseFloat(activeApiary.lat)"
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
                  <div class="beep-label" v-text="`${$t('Longitude')}`"></div>
                  <VueNumberInput
                    v-if="activeApiary"
                    :value="parseFloat(activeApiary.lon)"
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
                    v-if="activeApiary"
                    v-model="activeApiary.city"
                    :label="`${$t('City')}`"
                    outlined
                    dense
                    @change="setApiaryEdited(true)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-if="activeApiary"
                    v-model="activeApiary.postal_code"
                    :label="`${$t('Postal_code')}`"
                    outlined
                    dense
                    @change="setApiaryEdited(true)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-if="activeApiary"
                    v-model="activeApiary.street"
                    :label="`${$t('Street')}`"
                    outlined
                    dense
                    @change="setApiaryEdited(true)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-if="activeApiary"
                    v-model="activeApiary.street_no"
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
    </v-form>

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
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    Confirm,
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
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
      overlay: false,
      colorPickerValue: '',
      activeApiary: null,
      valid: false,
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaryEdited']),
    id() {
      return parseInt(this.$route.params.id)
    },
    colorPicker: {
      get() {
        if (this.activeApiary) {
          return this.activeApiary.hex_color
        } else {
          return '#ffa000'
        }
      },
      set(value) {
        this.colorPickerValue = value
      },
    },
    locale() {
      return this.$i18n.locale
    },
    requiredRule: function() {
      return [
        (v) => !!v || this.$i18n.t('Name') + ' ' + this.$i18n.t('is_required'),
      ]
    },
  },
  created() {
    this.getApiary(this.id).then((apiary) => {
      this.activeApiary = apiary
      this.setApiaryEdited(false)
    })
  },
  methods: {
    async deleteApiary() {
      try {
        const response = await Api.deleteRequest(
          '/locations/',
          this.activeApiary.id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.$router.push({
            name: 'home',
          })
        }, 100) // wait for API to update locations/hives
      } catch (error) {
        console.log('Error: ', error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async getApiary(id) {
      try {
        const response = await Api.readRequest('/locations/', id)
        const apiary = response.data.locations[0]
        return apiary
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    async updateApiary() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        try {
          const response = await Api.updateRequest(
            '/locations/',
            this.activeApiary.id,
            this.activeApiary
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
              query: { search: this.activeApiary.name },
            })
          }, 300) // wait for API to update locations/hives
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
        }
      }
    },
    confirmDeleteApiary() {
      const warningMessage =
        this.activeApiary.hives.length > 0
          ? this.$i18n.t('first_remove_hives')
          : null
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_apiary'),
          this.$i18n.t('remove_apiary') + ' "' + this.activeApiary.name + '"?',
          {
            color: 'red',
          },
          warningMessage
        )
        .then((confirm) => {
          this.deleteApiary()
        })
        .catch((reject) => {
          return true
        })
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
      this.activeApiary.country_code = countryCode
      this.activeApiary.lat = addressData.latitude
      this.activeApiary.lon = addressData.longitude
      this.activeApiary.city = addressData.locality
      this.activeApiary.postal_code = addressData.postal_code
      this.activeApiary.street = addressData.route
      this.activeApiary.street_no = addressData.street_number
    },
    setApiaryEdited(bool) {
      this.$store.commit('locations/setApiaryEdited', bool)
    },
    editApiary(value, property) {
      this.activeApiary[property] = value
      if (property === 'hex_color') {
        this.overlay = false
      }
      if (property !== 'lat' && property !== 'lon') {
        // if value is present, vueNumberInput always triggers editApiary method for these properties
        this.setApiaryEdited(true)
      }
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeApiary[property] = value
      }
      this.setApiaryEdited(true)
    },
  },
}
</script>

<style lang="scss">
.apiary-edit {
  .apiary-edit-name {
    padding-top: 12px;
    font-size: 1.6rem;
    @include for-tablet-landscape-up {
      font-size: 2rem;
    }

    &.v-input input {
      min-height: 45px !important;
      max-height: 45px !important;
    }
  }

  .apiary-color {
    width: 35px;
    height: 35px;
    cursor: pointer;
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
}
</style>
