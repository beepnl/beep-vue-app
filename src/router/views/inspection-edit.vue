<!-- eslint-disable vue/v-slot-style -->
<!-- eslint-disable vue/comma-dangle -->
<template>
  <Layout
    :title="editMode ? $t('Edit_inspection') : $t('New_inspection') + modeText"
    :dismiss-changes="offlineMode"
  >
    <h1 v-if="hiveNotEditable" class="unauthorized-title">
      {{
        $t('sorry') +
          ', ' +
          $tc('hive', 1) +
          ' ' +
          activeHive.name +
          ' ' +
          $t('not_editable')
      }}
    </h1>

    <h1
      v-if="
        editMode &&
          activeInspection &&
          activeInspection.owner === false &&
          activeHive.owner === false
      "
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('inspection', 1) +
          ' ' +
          inspectionId +
          ' ' +
          $t('not_editable')
      }}
    </h1>

    <v-form
      v-else-if="ready && !hiveNotEditable"
      ref="form"
      v-model="valid"
      class="no-print"
    >
      <v-toolbar v-if="ready" class="save-bar zindex4" density="compact" light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="
            !uploadMode &&
              selectedChecklist &&
              selectedChecklist.owner &&
              !mobile
          "
          class="mr-3"
          color="accent"
          @click="editChecklist"
        >
          <v-icon start color="accent">mdi-pencil</v-icon>
          {{ $t('Edit_checklist') }}
        </v-btn>
        <v-btn
          v-if="onlineMode"
          color="black"
          class="save-button-mobile-wide mr-1"
          :disabled="
            !valid ||
              (selectedHives && selectedHives.length === 0) ||
              showLoadingIcon ||
              forceInspectionDate ||
              invalidDate ||
              (activeInspection && activeInspection.date === null)
          "
          @click.prevent="confirmSaveInspection"
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
        <v-btn
          v-if="offlineMode"
          color="black"
          class="save-button-mobile-wide mr-1"
          :disabled="!svgReady"
          @click="confirmPrint"
        >
          <v-icon start>mdi-printer</v-icon>
          {{ $t('Print') }}
        </v-btn>
        <v-btn
          v-if="uploadMode"
          color="black"
          class="save-button-mobile-wide mr-1"
          :disabled="
            !selectedChecklistSvg ||
              showLoadingIcon ||
              (uploadInspectionPayload &&
                (uploadInspectionPayload.images.length < 1 ||
                  typeof uploadInspectionPayload['data-user-locale'][0] !==
                    'string'))
          "
          @click="uploadInspection"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" start>mdi-upload</v-icon>
          {{ $t('Send_pictures') }}
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="
          !printMode && activeInspection && selectedChecklist !== null && ready
        "
        class="content-container no-print"
      >
        <!-- <v-overlay
          v-if="offlineMode && !svgReady"
          contained
          :opacity="0.5"
          scrim="white"
          class="d-flex align-center justify-center mt-12"
          z-index="1"
        >
          <div class="loading">
            <v-progress-circular size="50" color="primary" indeterminate />
            <span
              class="ma-3 font-weight-bold text-accent"
              v-text="$t('Generating_svg_be_patient')"
            ></span>
          </div>
        </v-overlay> -->
        <v-row v-if="errorMessage">
          <v-col cols="12">
            <v-alert
              type="error"
              prominent
              closable
              color="red"
              @click:close="errorMessage = null"
            >
              <template v-slot:prepend>
                <v-icon :icon="'mdi-alert'" class="text-red"> </v-icon>
              </template>
              {{ errorMessage }}
              <template v-slot:close>
                <v-icon
                  :icon="'mdi-close'"
                  class="text-red mr-n2 cursor-pointer"
                  @close="errorMessage = null"
                >
                </v-icon>
              </template>
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="onlineMode" class="mb-3 no-print">
          <v-col class="mobile-2" cols="12" md="4">
            <v-row>
              <v-col cols="12" sm="7" md="12">
                <div
                  v-if="!parseMode"
                  class="beep-label mt-n3 mt-sm-0"
                  v-text="treeselectLabel"
                ></div>
                <labelWithDescription
                  v-if="parseMode"
                  :plain-text="treeselectLabel"
                  :parse-mode="true"
                  :check-answer="selectedHiveSetId === null"
                  :parsed-images="parsedImages['location']"
                ></labelWithDescription>
                <Treeselect
                  v-if="sortedHiveSets && sortedHiveSets.length > 0"
                  v-model="selectedHiveSetId"
                  :options="sortedHiveSets"
                  :normalizer="normalizerHiveSets"
                  :placeholder="treeselectLabel"
                  :no-results-text="`${$t('no_results')}`"
                  :disable-branch-nodes="true"
                  :disabled="offlineMode"
                  :default-expand-level="1"
                  :class="
                    parseMode && selectedHiveSetId === null ? 'color-red' : ''
                  "
                  @update:model-value="selectHiveSet($event)"
                />
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="12"
                class="py-0 py-sm-3 mb-n2 mb-sm-0 mt-sm-3 mt-md-0 hives-switch d-flex align-center"
              >
                <v-switch
                  v-if="selectedHiveSet"
                  v-model="allHivesSelected"
                  color="accent"
                  :label="
                    `${
                      selectedHiveSet.users
                        ? $t('select_all_editable_hives')
                        : $t('select_all_hives')
                    }`
                  "
                  :disabled="offlineMode"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="5" class="mobile-3 mb-n3 mb-sm-0">
            <labelWithDescription
              v-if="parseMode"
              :plain-text="$t('Select') + ' ' + $tc('hive', 1)"
              :parse-mode="true"
              :check-answer="selectedHives.length === 0"
              :parsed-images="parsedImages['hive']"
            ></labelWithDescription>
            <ApiaryPreviewHiveSelector
              v-if="
                selectedHiveSet && editableHives && editableHives.length > 0
              "
              :hives="selectedHiveSet.hives"
              :hives-selected="offlineMode ? [] : selectedHives"
              :hives-editable="offlineMode ? [] : editableHives"
              :inspection-mode="true"
              :mark-red="parseMode && selectedHives.length === 0"
              @select-hive="selectHive($event)"
            ></ApiaryPreviewHiveSelector>
          </v-col>

          <v-col class="mobile-1 py-1 py-sm-3" cols="12" md="3">
            <InspectModeSelector
              v-if="
                !editMode &&
                  (permissions.includes('test-offline-input') ||
                    permissions.includes('offline-input'))
              "
              :selected-mode="selectedMode"
              @set-selected-mode="setSelectedMode = $event"
            />
          </v-col>
        </v-row>

        <v-row class="mb-3 no-print">
          <v-col v-if="onlineMode" cols="12" sm="4">
            <div class="d-flex justify-flex-start align-center">
              <v-icon dark color="accent" class="mr-2"
                >mdi-calendar-edit</v-icon
              >
              <div class="inspection-date">
                <div v-if="!parseMode" class="beep-label">
                  <span v-text="$t('Date_of_inspection')"></span>
                  <span
                    v-if="forceInspectionDate || invalidDate"
                    class="ml-3 font-weight-bold text-accent cursor-pointer"
                    @click="inspectionDate = getNow()"
                    v-text="$t('Now')"
                  ></span>
                </div>
                <labelWithDescription
                  v-if="parseMode"
                  :plain-text="$t('Date_of_inspection')"
                  :parsed-date="true"
                  :parse-mode="true"
                  :check-answer="activeInspection.date === null || invalidDate"
                  :parsed-images="parsedImages['date']"
                ></labelWithDescription>

                <VueDatePicker
                  v-if="activeInspection"
                  :format="datePickerText"
                  :model-type="datePickerFormat"
                  :model-value="inspectionDate"
                  hide-input-icon
                  :max-date="endOfToday"
                  :is-24="true"
                  :clearable="false"
                  :disabled="offlineMode"
                  :placeholder="
                    forceInspectionDate || invalidDate
                      ? $t('select_inspection_date')
                      : null
                  "
                  :locale="locale"
                  :select-text="$t('ok')"
                  :cancel-text="$t('Cancel')"
                  class=" text-accent"
                  @update:model-value="datePickerIDUpdate"
                />
              </div>
            </div>
          </v-col>

          <v-col v-if="!uploadMode" cols="12" :sm="offlineMode ? 8 : 4">
            <div
              v-if="checklists !== null && checklists.length > 0"
              class="beep-label mt-n3 mt-sm-0"
              v-text="`${$t('Select') + ' ' + $tc('checklist', 1)}`"
            ></div>
            <Treeselect
              v-if="checklists !== null && checklists.length > 0"
              v-model="selectedChecklistId"
              :options="checklists"
              :normalizer="normalizer"
              :placeholder="`${$t('Select') + ' ' + $tc('checklist', 1)}`"
              :no-results-text="`${$t('no_results')}`"
              @update:model-value="switchChecklist($event)"
            />
          </v-col>

          <v-col v-if="parseMode && onlineMode" cols="12" sm="4">
            <ParsedPages
              :selected-checklist-svg="selectedChecklistSvg"
            ></ParsedPages>
          </v-col>

          <v-col v-if="uploadMode" cols="12" sm="8">
            <div class="d-flex justify-start align-center">
              <div
                class="beep-label mt-n3 mt-sm-0"
                v-text="`${$t('Select') + ' ' + $tc('svg_checklist', 1)}`"
              ></div>
              <v-icon
                class="mdi icon-info cursor-pointer ml-2"
                :size="mobile ? 'x-small' : 'small'"
                :color="showChecklistSvgExp ? 'accent' : 'grey'"
                @click="showChecklistSvgExp = !showChecklistSvgExp"
                >mdi-information</v-icon
              >
            </div>
            <p v-if="showChecklistSvgExp" class="beep-label">
              <em
                >{{
                  $t(
                    (checklistSvgs.length === 0 ? 'No_' : '') +
                      'checklist_svg_exp'
                  )
                }}
              </em>
            </p>
            <Treeselect
              v-model="checklistSvgId"
              :options="checklistSvgs"
              :normalizer="normalizerChecklistSvg"
              :placeholder="`${$t('Select') + ' ' + $tc('svg_checklist', 1)}`"
              :no-results-text="$t('no_results')"
              :no-options-text="$t('No_checklist_svg')"
              @update:model-value="selectChecklistSvg"
            />
          </v-col>

          <v-col v-if="!uploadMode && mobile" class="d-flex" cols="12" sm="4">
            <v-spacer></v-spacer>
            <v-btn
              v-if="selectedChecklist && selectedChecklist.owner"
              class="save-button-mobile-wide"
              color="accent"
              @click="editChecklist"
            >
              <v-icon color="accent" start>mdi-pencil</v-icon>
              {{ $t('Edit_checklist') }}
            </v-btn>
          </v-col>

          <v-col v-if="!onlineMode" cols="12" sm="4">
            <InspectModeSelector
              v-if="
                !editMode &&
                  (permissions.includes('test-offline-input') ||
                    permissions.includes('offline-input'))
              "
              :selected-mode="selectedMode"
              @set-selected-mode="setSelectedMode = $event"
            />
          </v-col>

          <v-col v-if="onlineMode && forceInspectionDate" cols="12">
            <v-alert type="error" prominent color="accent">
              {{ $t('input_only_possible_when_date_present') }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- Inspection items from checklist -->
        <div v-if="onlineMode">
          <v-card
            v-for="(mainCategory, index) in selectedChecklist.categories"
            :key="index"
            class="mt-3"
          >
            <v-card-title
              :class="
                `hive-inspect-card-title ${
                  showCategoriesByIndex[index]
                    ? 'hive-inspect-card-title--border-bottom'
                    : ''
                } cursor-pointer d-flex align-center justify-space-between`
              "
              @click="toggleCategory(index)"
            >
              <span>{{ mainCategory.trans[locale] || mainCategory.name }}</span>
              <v-icon
                :class="
                  `float-right toggle-icon mdi ${
                    showCategoriesByIndex[index] ? 'mdi-minus' : 'mdi-plus'
                  }`
                "
              ></v-icon>
            </v-card-title>

            <v-slide-y-transition>
              <!-- New dynamic checklist -->
              <v-card-text v-if="showCategoriesByIndex[index] === true">
                <v-row class="sub-inspection-wrapper my-0">
                  <v-col
                    v-for="(category, catIndex) in mainCategory.children"
                    :key="catIndex"
                    cols="12"
                  >
                    <ChecklistFieldset
                      v-if="activeInspection"
                      :object="activeInspection.items"
                      :category="category"
                      :parse-mode="parseMode"
                    ></ChecklistFieldset>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-slide-y-transition>
            <v-overlay
              v-model="forceInspectionDate"
              contained
              scrim="white"
              z-index="3"
              class="input-disabled-overlay"
            >
            </v-overlay>
          </v-card>

          <!-- General inspection items -->
          <v-card class="mt-3">
            <v-card-title
              :class="
                `hive-inspect-card-title ${
                  showGeneral ? 'hive-inspect-card-title--border-bottom' : ''
                } d-flex align-center justify-space-between`
              "
            >
              <span>{{ $t('overall') }}</span>
              <v-icon
                :class="
                  `float-right toggle-icon mdi ${
                    showGeneral ? 'mdi-minus' : 'mdi-plus'
                  }`
                "
                @click="showGeneral = !showGeneral"
              ></v-icon>
            </v-card-title>
            <v-slide-y-transition>
              <v-card-text v-if="showGeneral">
                <v-row class="sub-inspection-wrapper my-0">
                  <v-col cols="12">
                    <div
                      class="text-overline mb-2"
                      v-text="`${$t('positive_impression')}`"
                    ></div>
                    <div class="sub-inspection-details rounded-border">
                      <v-row>
                        <v-col cols="12" sm="4">
                          <labelWithDescription
                            :plain-text="$t('positive_impression')"
                            :parse-mode="parseMode"
                            :item="{ input: 'smileys_3' }"
                            :check-answer="activeInspection.impression === null"
                            :parsed-images="parsedImages['impression']"
                          ></labelWithDescription>
                          <smileRating
                            v-if="activeInspection"
                            :object="activeInspection"
                            property="impression"
                          ></smileRating>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <labelWithDescription
                            :plain-text="$t('needs_attention')"
                            :parse-mode="parseMode"
                            :item="{ input: 'boolean' }"
                            :check-answer="activeInspection.attention === null"
                            :parsed-images="parsedImages['attention']"
                          ></labelWithDescription>
                          <yesNoRating
                            v-if="activeInspection"
                            :object="activeInspection"
                            property="attention"
                            :yes-red="true"
                          ></yesNoRating>
                        </v-col>
                        <v-col cols="12">
                          <labelWithDescription
                            :plain-text="$t('notes')"
                            :wide-note="true"
                            :parse-mode="parseMode"
                            :check-answer="activeInspection.notes === null"
                            :parsed-images="parsedImages['notes']"
                          ></labelWithDescription>
                          <v-textarea
                            v-if="activeInspection"
                            v-model="activeInspection.notes"
                            class="pt-0"
                            :placeholder="`${$t('notes')}`"
                            counter="2500"
                            rows="1"
                            auto-grow
                            bg-color="white"
                            clearable
                            @update:model-value="
                              validateText($event, 'notes', 2500)
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-overlay
                    v-model="forceInspectionDate"
                    contained
                    scrim="white"
                    z-index="3"
                    class="input-disabled-overlay"
                  >
                  </v-overlay>
                </v-row>

                <v-row class="sub-inspection-wrapper my-0">
                  <v-col cols="12">
                    <div
                      class="text-overline mb-2"
                      v-text="`${$t('reminder')}`"
                    ></div>
                    <div class="sub-inspection-details rounded-border">
                      <v-row>
                        <v-col cols="12" sm="4">
                          <div class="d-flex justify-flex-start align-center">
                            <v-icon
                              class="mr-2"
                              :color="reminderDate !== null ? 'accent' : ''"
                              >mdi-calendar-clock</v-icon
                            >
                            <div>
                              <labelWithDescription
                                :plain-text="$t('remind_date')"
                                :parsed-date="true"
                                :parse-mode="parseMode"
                                :check-answer="reminderDate === null"
                                :parsed-images="parsedImages['reminder_date']"
                              ></labelWithDescription>
                              <VueDatePicker
                                v-if="activeInspection"
                                :format="datePickerText"
                                :model-type="datePickerFormat"
                                :model-value="reminderDate"
                                hide-input-icon
                                :is-24="true"
                                :teleport="true"
                                :placeholder="$t('Set_notification_date')"
                                class=" text-accent"
                                :locale="locale"
                                :select-text="$t('ok')"
                                :cancel-text="$t('Cancel')"
                                @update:model-value="datePickerRDUpdate"
                              >
                                <template #clear-icon="{ clear }">
                                  <span
                                    class="description clear-icon mr-1"
                                    @click="clearDate"
                                  >
                                    <v-icon color="accent"
                                      >mdi-close</v-icon
                                    ></span
                                  >
                                </template>
                              </VueDatePicker>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <labelWithDescription
                            :plain-text="$t('reminder')"
                            :wide-note="true"
                            :parse-mode="parseMode"
                            :check-answer="
                              activeInspection['reminder'] === null
                            "
                            :parsed-images="parsedImages['reminder']"
                          ></labelWithDescription>
                          <v-textarea
                            v-if="activeInspection"
                            v-model="activeInspection.reminder"
                            class="pt-0"
                            :placeholder="`${$t('notes_for_next_inspection')}`"
                            rows="1"
                            auto-grow
                            clearable
                            counter="100"
                            bg-color="white"
                            @update:model-value="
                              validateText($event, 'reminder', 100)
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </div>
      </v-container>
    </v-form>

    <template v-if="uploadMode">
      <UploadInspection
        v-if="selectedChecklistSvg"
        :selected-checklist-svg="selectedChecklistSvg"
        :loading="showLoadingIcon"
      />
    </template>

    <v-container v-if="!uploadMode && !ready">
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <OfflineInspection
      v-if="offlineMode"
      :selected-checklist="selectedChecklistWithSuffixes"
      :checklist-svg-already-saved="checklistSvgAlreadySaved"
      :checklist-svg-different-app-version="checklistSvgDifferentAppVersion"
      :checklist-svg-id="checklistSvgId"
      :new-svg-name="newSvgName"
      :print-mode="printMode"
      :total-pages="totalPages"
      @svg-ready="svgReady = $event"
    />

    <Confirm ref="confirm" class="no-print"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import _ from 'lodash'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import ChecklistFieldset from '@components/checklist-fieldset.vue'
import Confirm from '@/src/components/confirm-dialog.vue'
// import testOutput from '@components/svg/scan_results.json' // enable for debugging
import InspectModeSelector from '@components/inspect-mode-selector.vue'
import labelWithDescription from '@components/input-fields/label-with-description.vue'
import Layout from '@/src/router/layouts/back-layout.vue'
import { mapGetters } from 'vuex'
import {
  parseDate,
  readApiariesAndGroups,
  readApiariesAndGroupsIfNotPresent,
  readGeneralInspections,
} from '@mixins/methodsMixin'
import { datePickerText } from '@mixins/momentMixin'
import OfflineInspection from '@components/offline-inspection.vue'
import ParsedPages from '@components/parsed-pages.vue'
import smileRating from '@components/input-fields/smile-rating.vue'
import Treeselect from 'vue3-treeselect'
import UploadInspection from '@components/upload-inspection.vue'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    ChecklistFieldset,
    Confirm,
    InspectModeSelector,
    labelWithDescription,
    Layout,
    OfflineInspection,
    ParsedPages,
    smileRating,
    UploadInspection,
    yesNoRating,
    Treeselect,
  },
  mixins: [
    datePickerText,
    parseDate,
    readApiariesAndGroups,
    readApiariesAndGroupsIfNotPresent,
    readGeneralInspections,
  ],
  data: function() {
    return {
      normalizerHiveSets(node) {
        return {
          id: node.treeselectId,
          label: node.name,
          isDisabled: node.noEditableHives,
        }
      },
      normalizer(node) {
        return {
          id: node.id,
          label:
            node.name +
            (node.researches.length > 0
              ? ' (' +
                this.$i18n.t('research') +
                ': ' +
                node.researches[0] +
                ')'
              : ''),
        }
      },
      normalizerChecklistSvg(node) {
        return {
          id: node.id,
          label: node.name + ' (Print ID: ' + node.id + ')',
        }
      },
      selectModes: [
        { id: 'Online', label: this.$i18n.t('Online_inspection') },
        { id: 'Offline', label: this.$i18n.t('Offline_inspection') },
      ],
      selectedMode: 'Online',
      selectedChecklist: null,
      activeInspection: null,
      selectedChecklistId: null,
      showGeneral: true,
      showCategoriesByIndex: [],
      showLoadingIcon: false,
      valid: false,
      ready: false,
      svgReady: false,
      selectedHiveSetId: null,
      selectedHiveSet: null,
      selectedHives: [],
      editableHives: [],
      activeHive: null,
      hiveNotEditable: false,
      isApiary: true,
      hiveSetId: null,
      datePickerFormat: 'yyyy-MM-dd HH:mm:ss',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      dateFormatSimple: 'YYYY-MM-DD HH:mm',
      printMode: false,
      parsedImages: {
        location: [],
        hive: [],
        date: [],
        impression: [],
        attention: [],
        notes: [],
        reminder_date: [],
        reminder: [],
      },
      forceParseMode: false,
      booleanDefault: [1, 0],
      appVersion: process.env.VUE_APP_VERSION,
      checklistSvgId: null,
      newSvgName: null,
      errorMessage: null,
      // testOutput, // enable for debugging
      testOutput: null, // disable for debugging
      enableTestOutput: false, // true for debugging
      showChecklistSvgExp: false,
      printExpBullets: 4,
    }
  },
  computed: {
    ...mapGetters('auth', ['permissions']),
    ...mapGetters('inspections', [
      'bulkInspection',
      'checklist',
      'checklists',
      'checklistSvgs',
      'inspectionEdited',
      'parsedOfflineInput',
      'svgMaxPageNr',
      'svgPageNr',
      'tempSavedInspection',
      'uploadInspectionPayload',
    ]),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    allHivesSelected: {
      get() {
        return this.selectedHives.length === this.editableHives.length
      },
      set(value) {
        if (value === false) {
          this.setBulkInspection(false)
          this.selectedHives = []
        } else {
          this.setBulkInspection(true)
          this.selectedHives = []
          this.selectedHiveSet.hives.map((hive) => {
            if (hive.editable || hive.owner) {
              this.selectedHives.push(hive.id)
            }
            return hive
          })
        }
      },
    },
    apiaryId() {
      return this.$route.query.apiaryId || null
    },
    checklistLink() {
      let query = {}
      // pass current apiary or group id (even if user has switched from initially (pre)selected apiary or group)
      if (!this.offlineMode && this.hiveSetId) {
        query = {
          hiveId: this.hiveId,
          inspectionId: this.inspectionId,
        }
        this.isApiary
          ? (query.apiaryId = this.hiveSetId)
          : (query.groupId = this.hiveSetId)
      }

      if (this.parseMode) {
        query.checklistSvgId = this.checklistSvgId
      }

      return {
        name: 'checklist',
        params: { id: this.selectedChecklistId },
        query,
      }
    },
    checklistSvgAlreadySaved() {
      if (this.checklistSvgs.length > 0) {
        const svgsPresent = this.checklistSvgs.filter(
          (item) => item.checklist_id === this.selectedChecklistId
        )
        if (svgsPresent.length > 0) {
          const svgNewer = svgsPresent.filter(
            (svg) => svg.created_at > this.selectedChecklist.updated_at
          )
          return svgNewer.length > 0 ? svgNewer[svgNewer.length - 1] : null
        } else {
          return null
        }
      } else {
        return null
      }
    },
    checklistSvgDifferentAppVersion() {
      if (this.checklistSvgAlreadySaved) {
        const svgAppVersion =
          this.checklistSvgAlreadySaved.app_version ||
          this.checklistSvgAlreadySaved.name.substring(
            this.checklistSvgAlreadySaved.name.indexOf('(v') + 2,
            this.checklistSvgAlreadySaved.name.lastIndexOf(')')
          ) // TODO remove getting app version from name once app_version prop has been added to the checklist-svg, then replace by 'older' because for older checklist-svgs the app_version prop won't be present but it will always be older
        return svgAppVersion !== this.appVersion // no need to check if appVersion is higher, it will always be higher when it is different, because it only goes up
      } else {
        return false
      }
    },
    editMode() {
      return this.inspectionId !== null
    },
    endOfToday() {
      return this.$moment()
        .endOf('day')
        .format(this.dateFormat)
    },
    forceInspectionDate() {
      return (
        !this.offlineMode &&
        !this.parseMode && // forced inspection date not relevant for offline & parse mode
        this.invalidDate &&
        this.selectedChecklist !== null &&
        this.selectedChecklist.researches !== undefined &&
        (this.selectedChecklist.researches.join().includes('B-GOOD') ||
          this.selectedChecklist.researches.join().includes('BETTER-B'))
      )
    },
    groupId() {
      return this.$route.query.groupId || null
    },
    hiveId() {
      return (
        parseInt(this.$route.query.hiveId) ||
        parseInt(this.$route.params.id) ||
        null
      )
    },
    inspectionDate: {
      get() {
        if (
          this.activeInspection &&
          typeof this.activeInspection.created_at !== 'undefined'
        ) {
          return this.activeInspection.created_at
        } else if (
          this.activeInspection &&
          this.activeInspection.date !== null &&
          this.activeInspection.date !== 'Invalid date'
        ) {
          return this.activeInspection.date
        } else {
          return ''
        }
      },
      set(value) {
        this.setActiveInspectionDate(value)
      },
    },
    inspectionId() {
      return parseInt(this.$route.params.inspection) || null
    },
    invalidDate() {
      return (
        this.inspectionDate === 'Invalid date' || this.inspectionDate === ''
      )
    },
    lastSelectedChecklistId: {
      get() {
        return localStorage.beepLastSelectedChecklistId
      },
      set(value) {
        localStorage.beepLastSelectedChecklistId = value
      },
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.display.xs
    },
    modeText() {
      return this.permissions.includes('test-offline-input') ||
        this.permissions.includes('offline-input')
        ? ' - ' + this.$i18n.t(this.selectedMode + '_inspection')
        : ''
    },
    offlineMode() {
      return this.selectedMode === 'Offline'
    },
    onlineMode() {
      return this.selectedMode === 'Online'
    },
    uploadMode() {
      return this.selectedMode === 'Upload'
    },
    parseMode() {
      return (
        (this.permissions.includes('test-offline-input') ||
          this.permissions.includes('offline-input')) &&
        (this.queriedMode === 'parse' ||
          this.forceParseMode === true ||
          localStorage.beepSelectedInspectionMode === 'Parse') // TODO remove queried parse mode when enableTestOutput is removed
      )
    },
    preSelectedChecklistId() {
      return parseInt(this.$route.query.checklistId) || null
    },
    queriedMode() {
      return this.$route.query.mode
    },
    reminderDate: {
      get() {
        if (
          this.activeInspection &&
          this.activeInspection.reminder_date !== null
        ) {
          return this.activeInspection.reminder_date
        } else {
          return null
        }
      },
      set(value) {
        if (value !== '' && value !== null) {
          this.activeInspection.reminder_date = value
          this.setInspectionEdited(true)
        } else {
          this.activeInspection.reminder_date = null
        }
      },
    },
    selectedChecklistDuplicateNames() {
      const checklist = { ...this.selectedChecklist }
      const flattened = this.flattenItems(checklist.categories) // get array with all category names

      const duplicates = [
        ...new Set(flattened.filter((e, i, a) => a.indexOf(e) !== i)), // get all duplicate category names
      ]

      return duplicates
    },
    selectedChecklistWithSuffixes() {
      // add suffix to each category that has a duplicate name (because aws textract cannot deal with identical names on same page)
      const checklist = { ...this.selectedChecklist }

      // helper when adding suffixes, to keep track of how often a suffix has been used so which number the suffix should be
      const dupeTracker = Object.fromEntries(
        [...this.selectedChecklistDuplicateNames].map((k) => [k, 0])
      )

      checklist.categories.forEach((cat) =>
        this.addSuffix(cat, cat.children, dupeTracker)
      )

      return checklist
    },
    selectedChecklistSvg() {
      const findItem = this.checklistSvgs.filter(
        (item) => item.id === this.checklistSvgId
      )
      return findItem.length > 0 ? findItem[0] : null
    },
    setSelectedMode: {
      get() {
        return this.selectedMode
      },
      set(value) {
        if (value === 'Upload' || value === 'Offline') {
          if (this.checklistSvgs.length === 0) {
            this.readChecklistSvgs()
          }
        }
        this.selectedMode = value
        this.errorMessage = null
      },
    },
    sortedHiveSets() {
      const treeselectArray = []
      if (this.apiaries && this.apiaries.length > 0) {
        const treeselectApiaries = JSON.parse(JSON.stringify(this.apiaries)) // clone without v-bind to avoid vuex warning when mutating
        treeselectApiaries.map((apiary) => {
          apiary.treeselectId = parseInt('1' + apiary.id.toString())
          return apiary
        })
        const sortedTreeselectApiaries = treeselectApiaries
          .slice()
          .sort(function(a, b) {
            if (a.name > b.name) {
              return 1
            }
            if (b.name > a.name) {
              return -1
            }
            return 0
          })

        treeselectArray.push({
          treeselectId: -1,
          name: this.$i18n.tc('Location', 2),
          children: sortedTreeselectApiaries,
        })
      }
      if (this.groups && this.groups.length > 0) {
        const treeselectGroups = JSON.parse(JSON.stringify(this.groups)) // clone without v-bind to avoid vuex warning when mutating
        treeselectGroups.map((group) => {
          // groups with no editable hives will be disabled in the treeselect component
          group.noEditableHives =
            group.hives.filter((hive) => {
              return hive.editable || hive.owner
            }).length === 0
          group.treeselectId = parseInt('2' + group.id.toString())
          return group
        })
        const sortedTreeselectGroups = treeselectGroups
          .slice()
          .sort(function(a, b) {
            if (a.name > b.name) {
              return 1
            }
            if (b.name > a.name) {
              return -1
            }
            return 0
          })

        treeselectArray.push({
          treeselectId: -2,
          name: this.$i18n.tc('Group', 2),
          children: sortedTreeselectGroups,
        })
      }
      return treeselectArray
    },
    totalPages() {
      return this.svgPageNr - (this.svgMaxPageNr === null ? 0 : 1)
    },
    treeselectLabel() {
      let label = ''
      if (this.apiaries.length > 0) {
        label =
          this.$i18n.t('Select') +
          ' ' +
          this.$i18n.tc('location', 1) +
          (this.groups.length > 0
            ? ' ' + this.$i18n.t('or') + ' ' + this.$i18n.tc('group', 1)
            : '')
      } else if (this.groups.length > 0) {
        label = this.$i18n.t('Select') + ' ' + this.$i18n.tc('group', 1)
      }
      return label
    },
  },
  watch: {
    selectedHives() {
      this.setActiveHive()
    },
  },
  mounted() {
    if (localStorage.beepSelectedInspectionMode === 'Offline') {
      this.$store.commit('inspections/resetSvgStates')
      this.setSelectedMode = 'Offline'
      this.storeInspectionMode('')
    }

    // If hive id is specified, first check if hive is present / accessible and editable
    this.getActiveHive(this.hiveId).then(() => {
      this.readApiariesAndGroupsIfNotPresent().then(() => {
        this.selectInitialHiveSet()

        if (
          !this.offlineMode &&
          localStorage.beepPreviousRoute !== undefined &&
          localStorage.beepPreviousRoute === 'checklist' &&
          this.tempSavedInspection !== null
        ) {
          // console.log('temp saved inspection', this.tempSavedInspection)
          this.activeInspection = _.cloneDeep(this.tempSavedInspection)
          this.initInspection()
        } else {
          this.setTempSavedInspection(null)

          // If hive-inspect-edit route is used, retrieve to-be-edited inspection
          if (this.inspectionId !== null) {
            this.getInspection(this.inspectionId).then((response) => {
              this.activeInspection = response
              this.activeInspection.date = this.activeInspection.created_at // if date is empty, inspection cannot be saved. if it is set at another date (date of edit for example) the created_at will be changed after POSTing as well which is not desirable, to change the original inspection date when editing
              this.initInspection()
            })
            // Else make an empty inspection object
          } else {
            this.activeInspection = {
              date: null,
              impression: null,
              attention: null,
              notes: null,
              reminder_date: null,
              reminder: null,
              checklist_id: null,
              hive_ids: this.selectedHives, // TODO: fix for only 1 hiveId
              items: {},
            }

            this.readChecklistsIfNotPresent().then(() => {
              if (this.preSelectedChecklistId !== null) {
                this.getChecklistById(this.preSelectedChecklistId)
              } else if (
                this.lastSelectedChecklistId !== undefined &&
                this.lastSelectedChecklistId !== null
              ) {
                this.getChecklistById(this.lastSelectedChecklistId)
              } else {
                this.setChecklist(this.checklist)
              }
            })
          }
        }

        if (this.parseMode) {
          this.prepParseMode()
        }

        this.setInspectionEdited(false)
        this.setBulkInspection(this.selectedHives.length > 1)
        this.ready = true
      })
    })
  },
  methods: {
    async createChecklistSvg() {
      // only save checklist-svg if there is none already present (which is newer than the latest version of the digital checklist)
      // but always save a new version if the current app version is higher than the one in which the svg was generated, to avoid interpretation issues caused by possible changes in the app / svg generation
      if (
        !this.checklistSvgAlreadySaved ||
        this.checklistSvgDifferentAppVersion
      ) {
        const svg = document.getElementById('checklist-svg').outerHTML
        const now = this.getNow(true)
        // pass new name to svg to make sure printed & saved checklist-svg have the same name
        this.newSvgName =
          this.selectedChecklist.name +
          ' (' +
          now +
          ') (v' +
          this.appVersion +
          ')'
        const payload = {
          checklist_id: this.selectedChecklistId,
          svg,
          pages: this.totalPages,
          name: this.newSvgName,
          last_print: now,
        }
        try {
          const response = await Api.postRequest('/checklist-svg', payload)
          const checklistSvgId = response.data.id
          this.readChecklistSvgs()
          return checklistSvgId
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + error.response.data.message
          } else {
            console.log('Error: ', error)
            this.errorMessage = this.$i18n.t('something_wrong')
          }
        }
      }
    },
    async getActiveHive(id) {
      if (id !== null) {
        try {
          const response = await Api.readRequest('/hives/', id)
          if (response.data.length === 0) {
            this.$router.push({ name: '404', query: { resource: 'hive' } })
            return false
          }
          this.activeHive = response.data.hives[0]
          this.$store.commit('hives/setActiveHive', response.data.hives[0])
          if (!this.activeHive.editable && !this.activeHive.owner) {
            this.hiveNotEditable = true
          }
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
            if (error.response.status === 404) {
              this.$router.push({ name: '404', query: { resource: 'hive' } })
              return false
            }
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    async getChecklistById(id, switchChecklistExistingInspection = false) {
      try {
        const response = await Api.readRequest('/inspections/lists?id=', id)
        this.selectedChecklist = response.data.checklist
        this.selectedChecklistId = response.data.checklist.id
        this.lastSelectedChecklistId = response.data.checklist.id

        if (
          this.selectedChecklist !== null &&
          this.selectedChecklist.categories.length > 0
        ) {
          const numberOfCategories = this.selectedChecklist.categories.length
          this.showCategoriesByIndex = []
          for (let i = 0; i < numberOfCategories; i++) {
            this.showCategoriesByIndex.push(this.parseMode)
          }
        }

        const itemsObject = {}
        this.selectedChecklist.category_ids.map((categoryId) => {
          itemsObject[categoryId] = null
          return categoryId
        })
        // If existing inspection is being edited change its items array into object with category_ids (of the selected checklist) as keys and item values filled in if present
        if (
          this.inspectionId !== null &&
          Array.isArray(this.activeInspection.items)
        ) {
          this.activeInspection.items.map((item) => {
            if (
              item.type.indexOf('boolean') > -1 ||
              item.type.indexOf('smileys') > -1 ||
              // item.type.indexOf('number') > -1 ||
              item.type.indexOf('grade') > -1 ||
              item.type.indexOf('number_degrees') > -1 ||
              item.type.indexOf('number_percentage') > -1 ||
              item.type.indexOf('score') > -1 ||
              item.type.indexOf('slider') > -1
              // item.type.indexOf('square') > -1
            ) {
              itemsObject[item.category_id] = Number(item.value)
            } else {
              itemsObject[item.category_id] = item.value
            }
            return item
          })
          // For a new inspection, transfer values that have been filled in already for the old checklist to the newly selected checklist
          // and set date to current date only if checklist is owned, otherwise trigger forceInspectionDate mode (disable form until inspection date has been actively selected)
        } else {
          Object.entries(this.activeInspection.items).map(([key, value]) => {
            if (value !== null) {
              itemsObject[key] = value
            }
            return [key, value]
          })
          if (
            !switchChecklistExistingInspection &&
            this.tempSavedInspection === null
          ) {
            // force user to actively select inspection date when checklist is not owned and it is not present yet
            if (!this.selectedChecklist.owner) {
              this.activeInspection.date = null
            } else if (
              !this.parseMode &&
              this.selectedChecklist.owner &&
              (this.activeInspection.date === null || this.invalidDate)
            ) {
              this.setActiveInspectionDate()
            }
          }
        }
        this.activeInspection.items = itemsObject
        this.activeInspection.checklist_id = this.selectedChecklistId

        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async getInspection(id) {
      try {
        const response = await Api.readRequest('/inspections/', id)
        return response.data
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 404) {
            this.$router.push({
              name: '404',
              query: { resource: 'inspection' },
            })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readChecklistsIfNotPresent() {
      if (this.checklists.length === 0) {
        try {
          const response = await Api.readRequest('/inspections/lists')
          this.$store.commit(
            'inspections/setChecklists',
            response.data.checklists
          )
          this.$store.commit(
            'inspections/setChecklist',
            response.data.checklist
          )
          return true
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
    async readChecklistSvgs() {
      try {
        const response = await Api.readRequest('/checklist-svg')
        this.$store.commit('inspections/setData', {
          prop: 'checklistSvgs',
          value: response.data,
        })
        this.showChecklistSvgExp = response.data.length === 0
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          this.errorMessage =
            this.$i18n.tc('Error', 1) + ': ' + error.response.data.message
        } else {
          console.log('Error: ', error)
          this.errorMessage = this.$i18n.t('something_wrong')
        }
        this.showLoadingIcon = false
      }
    },
    async saveInspection() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        const inspectionToSave = this.activeInspection
        inspectionToSave.hive_ids = this.selectedHives
        // console.log('saving Inspection...')
        // console.log(inspectionToSave)
        try {
          const response = await Api.postRequest(
            '/inspections/store',
            inspectionToSave
          )
          let searchInspectionId = ''
          if (response.status === 201) {
            searchInspectionId = response.data
          }
          let searchTerm = null
          this.activeHive === null
            ? (searchTerm = this.selectedHiveSet.name)
            : (searchTerm = this.activeHive.location)
          const lastHiveId = this.selectedHives[this.selectedHives.length - 1]
          this.forceParseMode = false
          setTimeout(() => {
            return this.readApiariesAndGroups().then(() => {
              // update generalInspections in store for diary-list
              this.readGeneralInspections().then(() => {
                // if previous page was inspections, return there (with inspection id as search term)
                if (localStorage.beepPreviousRoute === 'hive-inspections') {
                  this.$router.push({
                    name: 'hive-inspections',
                    params: { id: lastHiveId },
                    query: { search: 'id=' + searchInspectionId },
                  })
                  // if previous page was apiary-list, return there (with apiary or hive name as search term, N.B. this wont overwrite any stored hiveSearch terms if present)
                } else if (localStorage.beepPreviousRoute === 'home') {
                  this.$router.push({
                    name: 'home',
                    query: { search: searchTerm },
                  })
                } else {
                  this.clearDiaryFilters()
                  setTimeout(() => {
                    this.$router.push({
                      name: 'diary',
                      query: { search: 'id=' + searchInspectionId },
                    })
                  }, 100) // wait for API to clear filters
                }
              })
            })
          }, 50) // wait for API to update inspections
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
            this.errorMessage =
              this.$i18n.tc('Error', 1) + ': ' + error.response.data.message
          } else {
            console.log('Error: ', error)
            this.errorMessage = this.$i18n.t('something_wrong')
          }
          this.showLoadingIcon = false
        }
      }
    },
    async uploadInspection() {
      this.showLoadingIcon = true
      try {
        const response = await Api.pensoftPostRequest(
          this.uploadInspectionPayload
        )
        const parsedOfflineInput = response.data
        this.$store.commit('inspections/setData', {
          prop: 'parsedOfflineInput',
          value: parsedOfflineInput,
        })
        setTimeout(() => {
          this.errorMessage = null
          this.prepParseMode()
        }, 500)
      } catch (error) {
        let msg = ''
        this.errorMessage = this.$i18n.tc('Error', 1) + ': '
        if (error.response) {
          console.log('Error: ', error.response)
          const e = error.response.data
          msg = e.errors ? e.errors : e.message ? e.message : e
          this.errorMessage += msg
        } else {
          console.log('Error: ', error)
          msg = error.data
            ? error.data.message
              ? error.data.message
              : error.data
            : error
          this.errorMessage += msg // this.$i18n.t('something_wrong')
        }
        this.showLoadingIcon = false
      }
    },
    clearDate() {
      this.activeInspection.reminder_date = null
    },
    clearDiaryFilters() {
      this.$store.commit('inspections/clearFilters')
    },
    confirmSaveInspection() {
      if (this.bulkInspection) {
        this.$refs.confirm
          .open(
            this.$i18n.t('save') + ' ' + this.$i18n.tc('inspection', 1),
            this.$i18n.t('save_bulkinspection_confirm'),
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            this.saveInspection()
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.saveInspection()
      }
    },
    datePickerIDUpdate(e) {
      this.inspectionDate = e
    },
    datePickerRDUpdate(e) {
      this.reminderDate = e
    },
    editChecklist(id) {
      if (this.selectedHiveSetId)
        this.activeInspection.hive_ids = this.selectedHives
      if (this.parseMode) {
        this.storeInspectionMode('Parse')
      } else if (this.onlineMode) {
        this.setTempSavedInspection(this.activeInspection)
      } else if (this.offlineMode) {
        this.storeInspectionMode('Offline')
      }
      this.$router.push(this.checklistLink)
    },
    findHiveSetId(input) {
      if (typeof input === 'string') {
        const value = input.toLowerCase()
        const findApiary = this.apiaries.filter(
          (ap) => ap.name.toLowerCase() === value
        )
        const findGroup = this.groups.filter(
          (gr) => gr.name.toLowerCase() === value
        )

        const id =
          findApiary.length > 0
            ? '1' + findApiary[0].id.toString()
            : findGroup.length > 0
            ? '2' + findGroup[0].id.toString()
            : null
        return id
      } else {
        return null
      }
    },
    findHiveId(input) {
      if (typeof input === 'string' && this.selectedHiveSet) {
        const value = input.toLowerCase()
        const findHive = this.selectedHiveSet.hives.filter(
          (hive) => hive.name.toLowerCase() === value
        )

        const id = findHive.length > 0 ? findHive[0].id : null
        return id
      } else {
        // TODO: add else if for if hiveSet was not found, then first find hive and then select connected hiveSet
        return null
      }
    },
    addSuffix(item, children, dupeTracker) {
      return children.map((child) => {
        if (
          this.selectedChecklistDuplicateNames.includes(child.name) &&
          child.input !== 'label'
        ) {
          dupeTracker[child.name] += 1
          child.suffix = dupeTracker[child.name]
        }

        if (child.children.length > 0) {
          this.addSuffix(child, child.children, dupeTracker)
        }

        return child
      })
    },
    flattenItems(data) {
      return data.reduce((r, { input, children, name }) => {
        if (input !== 'label' && input !== 'list_item') {
          // skip labels because they don't have an svg input field
          r.push(name)
        }

        if (children.length) {
          r.push(...this.flattenItems(children))
        }

        return r
      }, [])
    },
    getNow(simple = false) {
      return this.$moment().format(
        simple ? this.dateFormatSimple : this.dateFormat
      )
    },
    getParsedAnswer(id) {
      const parsedData =
        this.enableTestOutput && this.queriedMode === 'parse' // TODO remove when enableTestOutput is removed
          ? this.testOutput
          : this.parsedOfflineInput
      const items = parsedData.scans.map((el) => {
        return el.scan.filter(
          (answer) =>
            answer.parent_category_id !== undefined &&
            answer.parent_category_id === id
        )
      })
      if (items.length > 0 && items[0].length > 1) {
        // merge items for date type items
        items[0][0].value = items[0][0].value.concat(items[0][1].value)
        items[0][0].image = items[0][0].image.concat(items[0][1].image)
      }
      return items.length > 0 ? items[0][0] : null
    },
    getParsedOverallAnswers() {
      Object.keys(this.parsedImages).map((prop) => {
        const answer = this.getParsedAnswer(prop)
        let value = null
        if (answer && answer.value !== undefined) {
          if (prop === 'impression' || prop === 'attention') {
            const posAnswer = answer.value.filter((el) => el === 1)
            const checkboxIndex = answer.value.findIndex((value) => value === 1)
            value =
              posAnswer.length > 1
                ? null // if multiple checkboxes are parsed as true, do not fill in a value and let user check via red eye
                : prop === 'impression'
                ? checkboxIndex + 1
                : checkboxIndex > -1
                ? this.booleanDefault[checkboxIndex]
                : null
          } else {
            if (prop.indexOf('date') === -1) {
              value = answer.value[0] === '' ? null : answer.value[0]
            } else {
              value = this.parseDate(answer.value[0])
            }
          }
        }

        if (prop !== 'location' && prop !== 'hive') {
          this.activeInspection[prop] = value
        } else if (prop === 'location') {
          const id = this.findHiveSetId(value)
          this.selectHiveSet(id)
          this.selectedHiveSetId = id !== null ? parseInt(id) : null
          this.selectedHives = []
        } else if (prop === 'hive') {
          const hiveId = this.findHiveId(value)

          if (hiveId) {
            this.selectHive(hiveId)
          }
        }

        this.parsedImages[prop] =
          answer && answer.image !== undefined ? answer.image : []

        return prop
      })
    },
    initInspection() {
      this.setActiveInspectionDate(this.activeInspection.date)
      this.preSelectedChecklistId
        ? this.getChecklistById(this.preSelectedChecklistId)
        : this.getChecklistById(this.activeInspection.checklist_id)
      this.readChecklistsIfNotPresent()

      if (
        this.activeInspection.hive_ids !== null &&
        this.activeInspection.hive_ids !== undefined
      ) {
        this.selectedHives = this.activeInspection.hive_ids
      }

      this.$store.commit(
        'inspections/setSelectedInspectionId',
        this.inspectionId
      )
    },
    prepParseMode() {
      if (this.$route.query.checklistSvgId) {
        this.checklistSvgId = !isNaN(parseInt(this.$route.query.checklistSvgId))
          ? parseInt(this.$route.query.checklistSvgId)
          : null
      }
      if (this.checklistSvgs.length === 0) {
        // TODO disable when enableTestOutput is disabled
        this.readChecklistSvgs()
      }
      this.forceParseMode = true // TODO finetune parse mode + where to switch it off?
      this.setSelectedMode = 'Online'
      this.allHivesSelected = false
      this.getParsedOverallAnswers()
      this.showLoadingIcon = false
      if (this.selectedChecklist) {
        this.showCategoriesByIndex = []
        for (let i = 0; i < this.selectedChecklist.categories.length; i++) {
          this.showCategoriesByIndex.push(true)
        }
      }
      if (this.enableTestOutput && this.queriedMode === 'parse') {
        // TODO disable when enableTestOutput is disabled
        this.$store.commit('inspections/setData', {
          prop: 'parsedOfflineInput',
          value: this.testOutput,
        })
      }
      this.storeInspectionMode('')
    },
    confirmPrint() {
      let bullets = ''
      for (let n = 1; n <= this.printExpBullets; n++) {
        bullets += '• ' + this.$i18n.t('Print_checklist_exp_' + n) + '</br>'
      }
      const htmlText =
        '<p>' +
        this.$i18n.t('Print_checklist_exp') +
        '</p><p>' +
        bullets +
        '</p>'

      this.$refs.confirm
        .open(
          this.$i18n.t('Print_checklist'),
          htmlText,
          {
            color: 'red',
          },
          null,
          true
        )
        .then((confirm) => {
          this.print()
        })
        .catch((reject) => {
          return true
        })
    },
    print() {
      this.printMode = true
      setTimeout(() => {
        this.createChecklistSvg().then((id) => {
          this.checklistSvgId = id
          setTimeout(() => {
            window.print()
            this.printMode = false
          }, 500)
        })
      }, 100)
    },
    selectApiary(id) {
      this.selectedHives = []
      this.editableHives = []
      const apiary = this.apiaries.filter((apiary) => {
        return apiary.id === id
      })[0]
      if (apiary) {
        apiary.hives.map((hive) => {
          this.selectedHives.push(hive.id)
          this.editableHives.push(hive.id)
          return hive
        })
        // only when selecting the apiary from the queried hive Id, select just that hive
        if (this.hiveId && apiary.id === this.activeHive.location_id) {
          this.selectedHives = [this.hiveId]
        }
        this.selectedHiveSet = apiary
        this.setBulkInspection(this.selectedHives.length > 1)
        // If apiary id doesn't exist return 404
      } else {
        this.$router.push({
          name: '404',
          query: { resource: 'location' },
        })
      }
    },
    selectChecklistSvg() {
      if (this.selectedChecklistSvg) {
        const checklistId = this.selectedChecklistSvg.checklist_id
        // get digital checklist in order to have it preselected when opening the parsed offline input in onlineMode later
        if (this.selectedChecklistId !== checklistId) {
          this.getChecklistById(checklistId)
        }
      }
    },
    selectGroup(id) {
      this.selectedHives = []
      this.editableHives = []
      const group = this.groups.filter((group) => {
        return group.id === id
      })[0]
      if (group) {
        group.hives.map((hive) => {
          if (hive.editable || hive.owner) {
            this.selectedHives.push(hive.id)
            this.editableHives.push(hive.id)
          }
          return hive
        })
        // only when selecting a group containing the queried hive Id, select just that hive
        if (this.hiveId && this.activeHive.group_ids.includes(group.id)) {
          // if hiveId is specified, only select it if editable
          if (this.editableHives.includes(this.hiveId)) {
            this.selectedHives = [this.hiveId]
          }
        }
        this.selectedHiveSet = group
        this.setBulkInspection(this.selectedHives.length > 1)
        // If group id doesn't exist return 404
      } else {
        this.$router.push({
          name: '404',
          query: { resource: 'group' },
        })
      }
    },
    selectHive(id) {
      if (this.editableHives.includes(id)) {
        if (!this.selectedHives.includes(id)) {
          this.selectedHives.push(id)
        } else {
          this.selectedHives.splice(this.selectedHives.indexOf(id), 1)
        }
        this.setActiveHive() // TODO-VUE3 workaround for watch(selectedHives) is not triggered when single hive is selected
        this.setInspectionEdited(true)
      }
      this.setBulkInspection(this.selectedHives.length > 1)
    },
    selectFirstHiveSetFromList() {
      if (this.sortedHiveSets.length > 0) {
        this.selectedHiveSetId = this.sortedHiveSets[0].children[0].treeselectId
        this.selectHiveSet(this.selectedHiveSetId)
      }
    },
    selectHiveSet(id, loc = false) {
      if (id) {
        const stringId = id.toString()
        this.isApiary = parseInt(stringId.substring(0, 1)) === 1
        this.hiveSetId = parseInt(stringId.substring(1, stringId.length + 1))
        this.isApiary
          ? this.selectApiary(this.hiveSetId)
          : this.selectGroup(this.hiveSetId)
      } else {
        this.selectedHiveSetId = null
        this.selectedHiveSet = null
      }
    },
    selectInitialHiveSet() {
      if (this.apiaryId) {
        this.selectedHiveSetId = parseInt('1' + this.apiaryId) // add '1' to id to distinguish apiaries from groups when id is selected in treeselect component
        this.selectApiary(parseInt(this.apiaryId))
      } else if (this.groupId) {
        this.selectedHiveSetId = parseInt('2' + this.groupId) // add '2' to id to distinguish groups from apiaries when id is selected in treeselect component
        this.selectGroup(parseInt(this.groupId))
      } else if (this.hiveId) {
        // if no apiary or group id is specified, select apiary if owner is true, else select group
        if (this.activeHive.owner) {
          const apiaryId = this.activeHive.location_id
          this.selectedHiveSetId = parseInt('1' + apiaryId) // add '1' to id to distinguish apiaries from groups when id is selected in treeselect component
          this.selectApiary(parseInt(apiaryId))
        } else {
          const groupId = this.activeHive.group_ids[0]
          this.selectedHiveSetId = parseInt('2' + groupId) // add '2' to id to distinguish groups from apiaries when id is selected in treeselect component
          this.selectGroup(parseInt(groupId))
        }
      } else {
        this.selectFirstHiveSetFromList()
      }
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    setActiveHive() {
      if (this.selectedHives.length === 1) {
        this.getActiveHive(this.selectedHives[0])
      } else if (this.activeHive !== null) {
        this.$store.commit('hives/setActiveHive', null)
      }
    },
    setActiveInspectionDate(setDate = null) {
      const date = setDate === null ? this.getNow() : setDate
      this.activeInspection.date = date
      this.$store.commit('inspections/setData', {
        prop: 'activeInspectionDate',
        value: date,
      })
    },
    setBulkInspection(bool) {
      this.$store.commit('inspections/setData', {
        prop: 'bulkInspection',
        value: bool,
      })
    },
    setChecklist(checklist) {
      this.selectedChecklistId = checklist.id
      this.selectedChecklist = checklist
      this.lastSelectedChecklistId = checklist.id
      this.activeInspection.checklist_id = this.selectedChecklistId
      const itemsObject = {}
      this.selectedChecklist.category_ids.map((categoryId) => {
        // TODO: what if category ids is empty?
        itemsObject[categoryId] = null
        return categoryId
      })
      this.activeInspection.items = itemsObject
      if (this.selectedChecklist.owner) {
        this.setActiveInspectionDate()
      }
    },
    setTempSavedInspection(inspection) {
      this.$store.commit('inspections/setData', {
        prop: 'tempSavedInspection',
        value: _.cloneDeep(inspection), // clone to fix vuex errors
      })
    },
    switchChecklist(id) {
      if (this.offlineMode) {
        this.checklistSvgId = null
        this.svgReady = false
      }

      this.$store.commit('inspections/resetSvgStates')

      if (
        !this.offlineMode &&
        (this.inspectionId !== null ||
          this.inspectionEdited ||
          this.tempSavedInspection)
      ) {
        this.$refs.confirm
          .open(
            this.$i18n.t('Select') + ' ' + this.$i18n.tc('checklist', 1),
            this.$i18n.t('change_checklist_confirm'),
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            // do not change date when switching checklist for an existing (temp saved or regular) inspection
            this.getChecklistById(id, true)
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.getChecklistById(id)
      }
    },
    storeInspectionMode(value) {
      localStorage.beepSelectedInspectionMode = value
    },
    toggleCategory(index) {
      this.showCategoriesByIndex[index] = !this.showCategoriesByIndex[index]
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeInspection[property] = value
      }
      this.setInspectionEdited(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.hives-switch {
  .v-input--selection-controls {
    margin-top: 0 !important;
  }
}
.select-checklist {
  margin-top: 1px !important;
}
.clear-icon {
  cursor: pointer;
}
.hive-inspect-card-title {
  line-height: 1.5rem !important;
  background-color: $color-orange-medium;
  &.hive-inspect-card-title--border-bottom {
    border-bottom: 1px solid $color-grey-light;
  }
}

.inspection-date {
  max-width: calc(100% - 24px);
}

$orders: ('1', '2', '3');

@each $o in $orders {
  .mobile-#{$o} {
    @include for-phone-only {
      order: #{$o};
    }
  }
}
</style>
