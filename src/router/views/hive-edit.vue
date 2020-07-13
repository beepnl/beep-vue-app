<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`">
    <v-toolbar dense light>
      <v-spacer></v-spacer>
      <v-btn icon dark color="red" @click="deleteHive">
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon dark color="primary" @click="saveHiveSettings">
        <v-icon dark>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container v-if="activeHive">
      <v-form ref="form">
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="hiveName"
                  hide-details
                  class="hive-edit-name"
                >
                </v-text-field>
              </v-col>

              <!-- <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="activeHiveLocation"
                  :items="apiaryNames"
                  :label="`${$tc('Location', 1)}*`"
                ></v-select>
              </v-col> -->

              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-if="activeHive && activeHive.type"
                  v-model="hiveType"
                  :items="hiveTypes"
                  :item-text="`trans.${locale}`"
                  item-value="id"
                  :label="`${$t('Type', 1)}*`"
                >
                </v-select>
              </v-col>

              <v-col cols="6" md="3">
                <div
                  class="hive-edit-caption"
                  v-text="`${$t('Hive_frames')}*`"
                ></div>
                <VueNumberInput
                  v-if="activeHive && activeHive.layers"
                  v-model="hiveFrames"
                  class="hive-number-frame-input"
                  :min="1"
                  :max="20"
                  inline
                  controls
                  rounded
                ></VueNumberInput>
              </v-col>
              <v-col cols="6" md="3">
                <div
                  class="hive-edit-caption"
                  v-text="
                    `${$t('Hive_color')} (${$t('overrides_layer_colors')})`
                  "
                ></div>
                <v-sheet
                  class="hive-color"
                  dark
                  :color="activeHive.color"
                  @click="overlay = !overlay"
                ></v-sheet>
                <v-overlay :value="overlay">
                  <v-toolbar class="hive-color-picker-toolbar" dense light>
                    <div v-text="`${$t('Hive_color')}`"></div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-icon
                        class="mr-1"
                        color="primary"
                        @click="updateHiveColor"
                        >mdi-check</v-icon
                      >
                      <v-icon @click="cancelColorPicker">mdi-close</v-icon>
                    </v-toolbar-items>
                  </v-toolbar>

                  <v-color-picker
                    v-model="colorPicker"
                    class="hive-color-picker"
                    :swatches="swatches"
                    show-swatches
                    hide-canvas
                    light
                  >
                  </v-color-picker>
                </v-overlay>
              </v-col>
            </v-row>

            <HiveFactory
              v-if="activeHive && activeHive.layers"
              :hive="activeHive"
              :color-preview="colorPreview"
              :color-picker-value="colorPickerValue"
            ></HiveFactory>
          </v-card-text>
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
import HiveFactory from '@components/hive-factory.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import VueNumberInput from '@chenfengyuan/vue-number-input'
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Confirm,
    HiveFactory,
    Layout,
    VueNumberInput,
    // Treeselect,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },

      swatches: [
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
      overlay: false,
      colorPreview: false,
      colorPickerValue: '',
    }
  },
  computed: {
    ...mapGetters('hives', ['activeHive']),
    ...mapGetters('taxonomy', ['hiveTypes']),
    locale() {
      return this.$i18n.locale
    },
    hiveName: {
      get() {
        if (this.activeHive) {
          return this.activeHive.name // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveName', value)
      },
    },
    // hiveColor: {
    //   get() {
    //     if (this.activeHive) {
    //       return this.activeHive.color // $store.state.hives.hive.name
    //     } else {
    //       return ''
    //     }
    //   },
    //   set(value) {
    //     this.$store.commit('hives/updateHiveColor', value)
    //   },
    // },
    colorPicker: {
      get() {
        if (this.activeHive) {
          return this.activeHive.color
        } else {
          return ''
        }
      },
      set(value) {
        this.colorPreview = true
        this.colorPickerValue = value
      },
    },
    hiveFrames: {
      get() {
        if (this.activeHive.layers) {
          return this.activeHive.layers[0].framecount // $store.state.hives.hive.name
        } else {
          return 10
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveFrames', parseInt(value))
      },
    },
    hiveType: {
      get() {
        if (this.activeHive) {
          return this.activeHive.hive_type_id // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveType', value)
      },
    },
    // hiveLocation: {
    //   get() {
    //     if (this.activeHive) {
    //       return this.activeHive.location // $store.state.hives.hive.location
    //     } else {
    //       return ''
    //     }
    //   },
    //   set(value) {
    //     this.$store.commit('hives/updateHiveLocation', value)
    //   },
    // },
    id() {
      return parseInt(this.$route.params.id)
    },
    nestedHiveTypes() {
      var allLanguages = []
      this.hiveTypes.map((hiveType) =>
        allLanguages.push(...Object.keys(hiveType.group))
      )
      const languages = allLanguages.filter((v, i, a) => a.indexOf(v) === i)
      var nestedHiveTypes = {}
      languages.map((language) => {
        var result = this.hiveTypes.reduce(function(r, a) {
          r[a.group[language]] = r[a.group[language]] || []
          r[a.group[language]].push(a)
          return r
        }, {})
        nestedHiveTypes[language] = result
      })
      return nestedHiveTypes
      // TODO: make into format suitable for vue-treeselect (id/label/children)
    },

    // hive() {
    //   return this.hives.find((hive) => hive.id === this.id)
    // },
    // apiaryNames() {
    //   return (
    //     (this.apiaries &&
    //       this.apiaries.reduce((names, apiary) => {
    //         names.push(apiary.name)
    //         return names
    //       }, [])) ||
    //     []
    //   )
    // },
  },
  created() {
    this.$store.dispatch('hives/findById', this.id)
    this.$store.dispatch('taxonomy/index')
  },
  methods: {
    updateHiveColor() {
      this.$store.commit('hives/updateHiveColor', this.colorPickerValue)
      this.cancelColorPicker()
    },
    cancelColorPicker() {
      this.colorPreview = false
      this.overlay = false
    },
    saveHiveSettings() {
      this.$store
        .dispatch('hives/saveHiveSettings', this.activeHive) // this.activeHive
        .then(() =>
          this.$router.push({
            name: 'home',
          })
        )
        .catch((error) => {
          console.log(error)
        })
    },
    deleteHive() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('remove_hive') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.$store
            .dispatch('hives/deleteHive', this.activeHive.id) // this.activeHive
            .then(() =>
              this.$router.push({
                name: 'home',
              })
            )
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
  },
}
</script>

<style lang="scss">
.hive-edit-name {
  font-size: 2rem;
  @include for-phone-only {
    padding-top: 0;
  }

  input {
    margin-bottom: 4px;
  }
}

.hive-edit-caption {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: 0.0333333333em !important;
}

.hive-color {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
}

.hive-color-picker-toolbar {
  border-radius: 4px;
}

.hive-color-picker {
  margin-top: -10px;
}

.hive-number-frame-input {
  max-width: 130px;
  input {
    font-size: 14px;
  }
  button.number-input__button {
    font-size: 24px;
    &::before {
      position: relative;
      top: 0;
      left: 0;
      height: 0;
      margin-left: 2px;
      font-family: 'Material Design Icons';
      background: none !important;
      background-color: transparent;
      transform: none;
    }
    &--plus::before {
      content: '\F0415';
    }
    &--plus::after {
      height: 0;
    }
    &--minus::before {
      content: '\F0374';
    }
    &:hover {
      &::before {
        color: $color-primary;
      }
    }
  }
}
</style>
