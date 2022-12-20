<template>
  <v-overlay v-if="selectedResearch !== null" :value="overlay">
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
                  selectedResearch.name + ' - ' + $t('Select_hives_for_consent')
                "
              ></div>
              <div class="d-flex justify-end consent-buttons">
                <v-btn
                  light
                  outlined
                  tile
                  :disabled="selectedHiveIds.length === 0"
                  color="accent"
                  @click="submitConsentToggle(selectedResearch.id, 1)"
                  >{{ $t('ok') }}</v-btn
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
                    v-text="$t('Select_hives_for_consent_exp')"
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
                    <div v-for="(apiary, i) in apiaries" :key="i">
                      <div
                        class="hive-set-title d-flex flex-row justify-flex-start align-center"
                        :style="
                          `color: ${
                            apiary.hex_color ? apiary.hex_color : ''
                          }; border-color: ${
                            apiary.hex_color ? apiary.hex_color : ''
                          };`
                        "
                      >
                        <v-icon
                          class="icon-apiary-owned ml-1 mr-2 my-0"
                          :style="
                            `background-color: ${
                              apiary.hex_color ? apiary.hex_color : ''
                            }; border-color: ${
                              apiary.hex_color ? apiary.hex_color : ''
                            };`
                          "
                        >
                          mdi-home-analytics
                        </v-icon>
                        <h4 v-text="apiary.name"></h4>
                      </div>

                      <ApiaryPreviewHiveSelector
                        class="mb-3 mr-3"
                        :hives="apiary.hives"
                        :hives-selected="selectedHiveIds"
                        :hives-editable="getHiveIds(apiary.hives)"
                        :inspection-mode="true"
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
    selectedConsent: {
      type: Object,
      default: () => null,
      required: false,
    },
    selectedResearch: {
      type: Object,
      default: () => null,
      required: true,
    },
  },
  data: function() {
    return {
      selectedHiveIds: [],
    }
  },
  computed: {
    ...mapGetters('locations', ['apiaries']),
    allHiveIds() {
      return this.apiaries.reduce((acc, apiary) => {
        acc = acc.concat(this.getHiveIds(apiary.hives))
        return acc
      }, [])
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
    // selectedConsentId() {
    //   return this.selectedConsent ? this.selectedConsent.id : 99
    // },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  watch: {
    overlay() {
      // TODO: fix first time opening overlay this is not triggered
      // if consent already exists, use consent_hive_ids if present, otherwise all hive ids. For new consent, deselect all hives
      this.selectedHiveIds = this.selectedConsent
        ? this.selectedConsent.consent_hive_ids !== null
          ? this.selectedConsent.consent_hive_ids
              .split(',')
              .map((item) => parseInt(item))
          : [...this.allHiveIds]
        : []
    },
  },
  methods: {
    closeOverlay() {
      this.$emit('close-overlay')
    },
    getHiveIds(hives) {
      return hives.map((hive) => hive.id)
    },
    selectHive(id) {
      if (!this.selectedHiveIds.includes(id)) {
        this.selectedHiveIds.push(id)
      } else {
        this.selectedHiveIds.splice(this.selectedHiveIds.indexOf(id), 1)
      }
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
