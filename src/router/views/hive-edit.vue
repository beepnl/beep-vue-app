<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`">
    <h1
      v-if="activeHive.name !== undefined && !activeHive.editable"
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('hive', 1) +
          ' "' +
          activeHive.name +
          '" ' +
          $t('not_editable')
      }}
    </h1>

    <v-toolbar
      v-if="activeHive.name !== undefined && activeHive.editable"
      class="hive-edit-bar"
      dense
      light
    >
      <v-spacer></v-spacer>
      <v-icon
        v-if="activeHive.owner"
        dark
        class="mr-2"
        color="red"
        @click="deleteHive"
        >mdi-delete</v-icon
      >
      <v-icon dark color="primary" @click="save">mdi-check</v-icon>
    </v-toolbar>

    <v-container
      v-if="activeHive.name !== undefined && activeHive.editable"
      class="hive-edit-content"
    >
      <v-form ref="form">
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="hiveName"
                  hide-details
                  class="hive-edit-name"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <div class="hive-edit-label" v-text="`${$t('Type', 1)}*`"></div>
                <Treeselect
                  v-model="hiveType"
                  :options="treeselectHiveTypes"
                  :disable-branch-nodes="true"
                  :no-results-text="`${$t('no_results')}`"
                  :default-expand-level="1"
                  search-nested
                />
              </v-col>

              <v-col cols="12" sm="4" md="2">
                <div
                  class="hive-edit-label"
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
              <v-col cols="12" md="4">
                <div
                  class="hive-edit-label"
                  v-text="
                    `${$t('Hive_color')} (${$t('overrides_layer_colors')})`
                  "
                ></div>
                <v-sheet
                  class="hive-color"
                  dark
                  :color="
                    activeHive.color !== null ? activeHive.color : '#ffa000'
                  "
                  @click="overlay = !overlay"
                ></v-sheet>
                <v-overlay :value="overlay">
                  <v-toolbar class="hive-color-picker-toolbar" dense light>
                    <div
                      class="hive-color-picker-title"
                      v-text="`${$t('Hive_color')}`"
                    ></div>
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Confirm,
    HiveFactory,
    Layout,
    VueNumberInput,
    Treeselect,
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
    id() {
      return parseInt(this.$route.params.id)
    },
    locale() {
      return this.$i18n.locale
    },
    hiveTypeLocale() {
      if (this.hiveTypes.length) {
        const locale = this.$i18n.locale
        if (this.hiveTypes[0].trans[locale] === undefined) {
          return 'en'
        } else {
          return locale
        }
      } else {
        return 'en'
      }
    },
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
          return this.activeHive.layers[0].framecount
        } else {
          return 10
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveFrames', parseInt(value))
      },
    },
    hiveName: {
      get() {
        if (this.activeHive) {
          return this.activeHive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveName', value)
      },
    },
    hiveType: {
      get() {
        if (this.activeHive) {
          return this.activeHive.hive_type_id
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveType', value)
      },
    },
    treeselectHiveTypes() {
      if (this.hiveTypes.length) {
        const locale = this.hiveTypeLocale
        var hiveTypePerGroup = this.hiveTypes.reduce(function(r, a) {
          r[a.group[locale]] = r[a.group[locale]] || []
          r[a.group[locale]].push(a)
          return r
        }, {})
        const sortedGroups = Object.keys(hiveTypePerGroup)
          .slice()
          .sort(function(a, b) {
            if (a < b) {
              return -1
            }
            if (a > b) {
              return 1
            }
            return 0
          })
        var treeselectArray = [
          {
            id: -1,
            label: sortedGroups[0],
            children: hiveTypePerGroup[sortedGroups[0]],
          },
          {
            id: -2,
            label: sortedGroups[1],
            children: hiveTypePerGroup[sortedGroups[1]],
          },
          {
            id: -3,
            label: sortedGroups[2],
            children: hiveTypePerGroup[sortedGroups[2]],
          },
        ]
        treeselectArray.map((groupObject) => {
          groupObject.children.map((child) => {
            child.label = child.trans[locale]
          })
          const sortedTreeselectArray = groupObject.children
            .slice()
            .sort(function(a, b) {
              if (a.label < b.label) {
                return -1
              }
              if (a.label > b.label) {
                return 1
              }
              return 0
            })
          groupObject.children = sortedTreeselectArray
        })
        return treeselectArray
      } else {
        return []
      }
    },
  },
  created() {
    this.readHive()
    this.readHiveTypes()
  },
  methods: {
    async readHive() {
      try {
        const response = await this.$store.dispatch('hives/findById', this.id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.hives[0]
        this.$store.commit('hives/setActiveHive', hive)
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async readHiveTypes() {
      try {
        const response = await this.$store.dispatch('taxonomy/index')
        if (response.length === 0) {
          this.$router.push({ name: '404' })
        }
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404' })
      }
    },
    async delete() {
      try {
        const response = await this.$store.dispatch(
          'hives/deleteHive',
          this.activeHive.id
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
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async save() {
      try {
        const response = await this.$store.dispatch(
          'hives/saveHiveSettings',
          this.activeHive
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
    cancelColorPicker() {
      this.colorPreview = false
      this.overlay = false
    },
    deleteHive() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('remove_hive') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.delete()
        })
        .catch((reject) => {
          return true
        })
    },
    updateHiveColor() {
      this.$store.commit('hives/updateHiveColor', this.colorPickerValue)
      this.cancelColorPicker()
    },
  },
}
</script>

<style lang="scss">
.unauthorized-title {
  padding-top: 40px;
  text-align: center;
}

.hive-edit-bar {
  position: fixed;
  top: 56px;
  z-index: 1;
  width: 100%;
}
.hive-edit-content {
  margin-top: 56px;
}
.hive-edit-name {
  font-size: 2rem;
  @include for-phone-only {
    padding-top: 0;
  }
  @include for-tablet-landscape-up {
    max-width: 500px;
  }

  input {
    margin-bottom: 2px;
  }
}

.hive-edit-label {
  margin-bottom: 4px;
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: 0.0333333333em !important;
}

.vue-treeselect__control {
  border-radius: 2px;
}

.vue-treeselect--focused:not(.vue-treeselect--open) .vue-treeselect__control {
  border-color: $color-primary;
  box-shadow: none;
}

.hive-color {
  width: 35px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
}

.hive-color-picker {
  margin-top: -10px;
}

.hive-color-picker-toolbar,
.hive-color-picker-footer {
  border-radius: 4px;
}

.hive-color-picker-title {
  font-weight: 500;
}

.hive-color-picker-footer {
  margin-top: -5px;
  .v-toolbar__content {
    padding: 0 10px;
  }
}

.hive-number-frame-input {
  max-width: 130px;
  input.number-input__input {
    padding-top: 5px;
    padding-right: 3.175rem;
    padding-bottom: 5px;
    padding-left: 3.175rem;
    border-color: $color-grey-light;
    border-radius: 2px;
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
