<template>
  <v-overlay v-if="showOverlay" :value="overlay">
    <div style="border-radius: 4px">
      <v-container class="select-hives-container">
        <v-row>
          <v-col cols="12">
            <div
              :class="
                'd-flex justify-space-between align-center ' +
                  (mobile ? 'flex-column-reverse mb-1' : 'mb-3')
              "
            >
              <div
                class="overline d-flex mr-3 consent-overline"
                style="width: 100%;"
                v-text="
                  compareMode
                    ? $t('Select_hives_for_compare')
                    : selectedResearch.name +
                      ' - ' +
                      $t('Select_hives_for_consent')
                "
              ></div>
              <v-spacer />
              <div class="d-flex justify-end consent-buttons">
                <v-btn
                  light
                  outlined
                  tile
                  :disabled="selectedHiveIds.length === 0"
                  color="black"
                  @click="
                    researchMode
                      ? submitConsentToggle(selectedResearch.id, 1)
                      : selectHives()
                  "
                >
                  <v-icon left>mdi-check</v-icon>
                  {{ researchMode ? $t('save') : $t('ok') }}</v-btn
                >
                <v-btn
                  class="ml-3"
                  outlined
                  tile
                  color="red"
                  @click="closeOverlay"
                  >{{ $t('Cancel') }}</v-btn
                >
              </div>
            </div>
            <div class="rounded-border apiary-wrapper">
              <div style="height: 100%;">
                <div
                  class="d-flex justify-space-between align-center mb-3 mb-sm-4"
                >
                  <div
                    class="beep-label mt-1 mr-3"
                    v-text="
                      compareMode
                        ? $t('Select_hives_for_compare_exp')
                        : $t('Select_hives_for_consent_exp')
                    "
                  ></div>
                  <v-switch
                    v-model="allHivesSelected"
                    class="mt-0"
                    light
                    :label="$t('select_all')"
                    hide-details
                  />
                </div>
                <div style="height: 100%;">
                  <div class="scroller">
                    <div v-for="(hiveSet, i) in sortedHiveSets" :key="i">
                      <div
                        class="hive-set-title d-flex flex-row justify-flex-start align-center"
                        :style="
                          `color: ${
                            hiveSet.hex_color ? hiveSet.hex_color : ''
                          }; border-color: ${
                            hiveSet.hex_color ? hiveSet.hex_color : ''
                          };`
                        "
                      >
                        <v-icon
                          v-if="hiveSet.users && hiveSet.users.length"
                          class="icon-apiary-shared ml-1 mr-2 my-0"
                          :style="
                            `background-color: ${hiveSet.hex_color}; border-color: ${hiveSet.hex_color};`
                          "
                        >
                          mdi-account-multiple
                        </v-icon>
                        <v-icon
                          v-else
                          class="icon-apiary-owned ml-1 mr-2 my-0"
                          :style="
                            `background-color: ${
                              hiveSet.hex_color ? hiveSet.hex_color : ''
                            }; border-color: ${
                              hiveSet.hex_color ? hiveSet.hex_color : ''
                            };`
                          "
                        >
                          mdi-home-analytics
                        </v-icon>

                        <h4 v-text="hiveSet.name"></h4>
                      </div>

                      <ApiaryPreviewHiveSelector
                        class="mb-3 mr-3"
                        :hives="hiveSet.hives"
                        :hives-selected="selectedHiveIds"
                        :hives-editable="getHiveIds(hiveSet.hives)"
                        :inspection-mode="true"
                        :compare-mode="compareMode"
                        @select-hive="selectHive($event)"
                      ></ApiaryPreviewHiveSelector>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-overlay>
</template>

<script>
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ApiaryPreviewHiveSelector,
  },
  props: {
    overlay: {
      type: Boolean,
      required: true,
    },
    compareMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    includeGroups: {
      type: Boolean,
      required: false,
      default: false,
    },
    selectedConsent: {
      type: Object,
      default: () => null,
      required: false,
    },
    selectedResearch: {
      type: Object,
      default: () => null,
      required: false,
    },
    showOverlay: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: function() {
    return {
      selectedHiveIds: [],
    }
  },
  computed: {
    ...mapGetters('hives', ['hivesObject']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('locations', ['apiaries']),
    allHiveIds() {
      var hiveIds = this.sortedHiveSets.reduce((acc, hiveSet) => {
        acc = acc.concat(this.getHiveIds(hiveSet.hives))
        return acc
      }, [])
      var uniqueHiveIds = [...new Set(hiveIds)] // with both apiaries and groups hive ids can be duplicated
      return uniqueHiveIds
    },
    allHivesSelected: {
      get() {
        return this.selectedHiveIds.length === this.allHiveIds.length
      },
      set(value) {
        if (value === false) {
          this.selectedHiveIds = []
        } else {
          this.selectedHiveIds = [...this.allHiveIds]
        }
      },
    },
    hiveSets() {
      return this.includeGroups
        ? this.apiaries.concat(this.groups)
        : this.apiaries
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    researchMode() {
      return this.selectedResearch !== null
    },
    sortedHiveSets() {
      const sortedHiveSets = this.hiveSets
        .slice()
        .filter((hiveSet) => hiveSet.hives.length > 0)
        .sort(function(a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        })
        .sort(function(a, b) {
          if ('type' in b) {
            return 1
          }
          if ('type' in a) {
            return -1
          }
          return 0
        })
      return sortedHiveSets
    },
  },
  watch: {
    selectedConsent() {
      // update selected hive ids when consent is different
      this.initSelectedHiveIds()
    },
  },
  created() {
    // init selected hive ids the first time overlay is opened
    this.initSelectedHiveIds()
  },
  methods: {
    closeOverlay() {
      this.$emit('close-overlay')
    },
    getHiveIds(hives) {
      return hives
        .filter((hive) => hive.sensors.length > 0 || !this.compareMode)
        .map((hive) => hive.id)
    },
    hiveHasSensors(id) {
      return !!this.hivesObject[id] && this.hivesObject[id].sensors.length > 0
    },
    initSelectedHiveIds() {
      // if consent already exists, use consent_hive_ids if present, otherwise all hive ids. For new consent, deselect all hives
      this.selectedHiveIds = this.selectedConsent
        ? this.selectedConsent.consent_hive_ids !== null
          ? this.selectedConsent.consent_hive_ids
              .split(',')
              .map((item) => parseInt(item))
          : [...this.allHiveIds]
        : []
    },
    selectHive(id) {
      if (!this.compareMode || this.hiveHasSensors(id)) {
        // in compareMode, only hives with sensors are available for comparing measurement data and therefore selectable
        if (!this.selectedHiveIds.includes(id)) {
          this.selectedHiveIds.push(id)
        } else {
          this.selectedHiveIds.splice(this.selectedHiveIds.indexOf(id), 1)
        }
      }
    },
    selectHives() {
      this.$emit('select-hives', this.selectedHiveIds)
      this.closeOverlay()
    },
    submitConsentToggle(id, consent) {
      this.$emit('submit-consent-toggle', {
        id,
        consent,
        hiveIds: this.selectedHiveIds,
      })
    },
  },
}
</script>

<style lang="scss">
.select-hives-container {
  background-color: $color-white;
  color: $color-grey-dark;
  border-radius: 4px;
  max-width: 90vw !important;
  overflow: hidden;
  .apiary-wrapper {
    height: 60vh; // NB max-height looks better for small number of apiaries, but does not work with scroller
    overflow: hidden;
  }
  .scroller {
    overflow: auto;
    height: calc(100% - 44px);
  }
}

.consent-buttons {
  @include for-phone-only {
    width: 100%;
  }
}

.consent-overline {
  line-height: 1.5rem;
  @include for-phone-only {
    margin-bottom: 2px;
    margin-top: 3px;
  }
}
</style>
