<template>
  <Layout :title="inspectionId ? $t('Edit_inspection') : $t('New_inspection')">
    <h1
      v-if="
        inspectionId && activeInspection && activeInspection.owner === false
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

    <v-form
      v-else-if="ready"
      ref="form"
      v-model="valid"
      @submit.prevent="saveInspection"
    >
      <v-toolbar v-if="ready" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="selectedChecklist && selectedChecklist.owner && !mobile"
          tile
          outlined
          class="save-button mr-3"
          :to="checklistLink"
          color="primary"
        >
          <v-icon left>mdi-pencil</v-icon>
          {{ $t('edit') + ' ' + $tc('checklist', 1) }}
        </v-btn>
        <v-btn
          tile
          outlined
          color="primary"
          class="save-button mr-1"
          type="submit"
          :disabled="!valid || (selectedHives && selectedHives.length === 0)"
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
          {{
            $t('save') +
              (selectedHives ? ' ' + selectedHives.length + ' ' : ' ') +
              $tc('inspection', selectedHives ? selectedHives.length : 1)
          }}
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="activeInspection && selectedChecklist !== null && ready"
        class="content-container"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12" sm="7" md="12">
                <div
                  class="beep-label mt-n3 mt-sm-0"
                  v-text="treeselectLabel"
                ></div>
                <Treeselect
                  v-if="sortedHiveSets && sortedHiveSets.length > 0"
                  v-model="selectedHiveSetId"
                  :options="sortedHiveSets"
                  :normalizer="normalizerHiveSets"
                  :placeholder="treeselectLabel"
                  :no-results-text="`${$t('no_results')}`"
                  :disable-branch-nodes="true"
                  :default-expand-level="1"
                  @input="selectHiveSet($event)"
                />
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="12"
                class="py-0 py-sm-3 mb-n4 mb-sm-0 mt-n3 mt-sm-1 mt-md-n4"
              >
                <v-switch
                  v-model="selectAllHives"
                  :label="`${$t('select_all_hives')}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="7">
            <ApiaryPreviewHiveSelector
              v-if="
                selectedHiveSet && editableHives && editableHives.length > 0
              "
              :hives="selectedHiveSet.hives"
              :hives-selected="selectedHives"
              :hives-editable="editableHives"
              :inspection-mode="true"
              @select-hive="selectHive($event)"
            ></ApiaryPreviewHiveSelector>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <div class="d-flex justify-flex-start align-center">
              <v-icon dark color="primary" class="mr-2"
                >mdi-calendar-edit</v-icon
              >
              <div>
                <div
                  class="beep-label"
                  v-text="`${$t('Date_of_inspection')}`"
                ></div>
                <Datetime
                  v-if="activeInspection"
                  v-model="inspectionDate"
                  type="datetime"
                >
                  <template slot="button-cancel">
                    <v-btn text color="primary">{{ $t('Cancel') }}</v-btn>
                  </template>
                  <template slot="button-confirm">
                    <v-btn text color="primary">{{ $t('ok') }}</v-btn>
                  </template>
                </Datetime>
              </div>
            </div>
          </v-col>

          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              v-if="checklists !== null && checklists.length > 1"
              v-model="selectedChecklistId"
              class="select-checklist"
              :items="checklists"
              :item-text="getText"
              item-value="id"
              hide-details
              :label="`${$t('Select') + ' ' + $tc('checklist', 1)}`"
              @input="switchChecklist($event)"
            >
            </v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="4">
            <v-spacer></v-spacer>
            <v-btn
              v-if="selectedChecklist && selectedChecklist.owner && mobile"
              tile
              outlined
              class="save-button"
              :to="checklistLink"
              color="primary"
            >
              <v-icon left>mdi-pencil</v-icon>
              {{ $t('edit') + ' ' + $tc('checklist', 1) }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- Inspection items from checklist -->
        <v-card
          v-for="(mainCategory, index) in selectedChecklist.categories"
          :key="index"
          outlined
          class="mt-3"
        >
          <v-card-title
            :class="
              `hive-inspect-card-title ${
                showCategoriesByIndex[index]
                  ? 'hive-inspect-card-title--border-bottom'
                  : ''
              }`
            "
          >
            <v-row>
              <v-col cols="12" class="py-0">
                <span>{{
                  mainCategory.trans[locale] || mainCategory.name
                }}</span>
                <div class="float-right">
                  <v-icon
                    :class="
                      `toggle-icon mdi ${
                        showCategoriesByIndex[index] ? 'mdi-minus' : 'mdi-plus'
                      }`
                    "
                    @click="toggleCategory(index)"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-title>

          <SlideYUpTransition :duration="150">
            <!-- New dynamic checklist -->
            <v-card-text v-if="showCategoriesByIndex[index] === true">
              <v-row class="sub-inspection-wrapper">
                <v-col
                  v-for="(category, catIndex) in mainCategory.children"
                  :key="catIndex"
                  cols="12"
                >
                  <checklistFieldset
                    v-if="activeInspection"
                    :object="activeInspection.items"
                    :category="category"
                    :locale="locale"
                  ></checklistFieldset>
                </v-col>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>

        <!-- General inspection items -->
        <v-card outlined class="mt-3">
          <v-card-title
            :class="
              `hive-inspect-card-title ${
                showGeneral ? 'hive-inspect-card-title--border-bottom' : ''
              }`
            "
          >
            <v-row>
              <v-col cols="12" class="py-0 mt-n1">
                <span>{{ $t('overall') }}</span>
                <div class="float-right">
                  <v-icon
                    :class="
                      `toggle-icon mdi ${
                        showGeneral ? 'mdi-minus' : 'mdi-plus'
                      }`
                    "
                    @click="showGeneral = !showGeneral"
                  ></v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <SlideYUpTransition :duration="150">
            <v-card-text v-if="showGeneral">
              <v-row class="sub-inspection-wrapper">
                <v-col cols="12">
                  <div
                    class="overline mb-2"
                    v-text="`${$t('positive_impression')}`"
                  ></div>
                  <div class="sub-inspection-details rounded-border">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <div
                          class="beep-label"
                          v-text="`${$t('positive_impression')}`"
                        ></div>
                        <smileRating
                          v-if="activeInspection"
                          :object="activeInspection"
                          property="impression"
                        ></smileRating>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div
                          class="beep-label"
                          v-text="`${$t('needs_attention')}`"
                        ></div>
                        <yesNoRating
                          v-if="activeInspection"
                          :object="activeInspection"
                          property="attention"
                          :yes-red="true"
                        ></yesNoRating>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-if="activeInspection"
                          v-model="activeInspection.notes"
                          :label="`${$t('notes')}`"
                          counter="250"
                          rows="1"
                          auto-grow
                          clearable
                          @input="validateText($event, 'notes', 250)"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>

              <v-row class="sub-inspection-wrapper">
                <v-col cols="12">
                  <div class="overline mb-2" v-text="`${$t('reminder')}`"></div>
                  <div class="sub-inspection-details rounded-border">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <div class="d-flex justify-flex-start align-center">
                          <v-icon
                            class="mr-2"
                            :color="reminderDate !== null ? 'primary' : ''"
                            >mdi-calendar-clock</v-icon
                          >
                          <div>
                            <div
                              class="beep-label"
                              v-text="`${$t('remind_date')}`"
                            ></div>
                            <Datetime
                              v-if="activeInspection"
                              v-model="reminderDate"
                              :placeholder="`${$t('Set_notification_date')}`"
                              type="datetime"
                            >
                              <span
                                v-if="reminderDate !== null"
                                slot="after"
                                class="description clear-icon"
                                @click="clearDate"
                              >
                                <v-icon class="mt-n1" color="primary"
                                  >mdi-close</v-icon
                                ></span
                              >
                              <template slot="button-cancel">
                                <v-btn text color="primary">{{
                                  $t('Cancel')
                                }}</v-btn>
                              </template>
                              <template slot="button-confirm">
                                <v-btn text color="primary">{{
                                  $t('ok')
                                }}</v-btn>
                              </template>
                            </Datetime>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <v-textarea
                          v-if="activeInspection"
                          v-model="activeInspection.reminder"
                          :label="`${$t('reminder')}`"
                          :placeholder="`${$t('notes_for_next_inspection')}`"
                          rows="1"
                          auto-grow
                          clearable
                          counter="100"
                          @input="validateText($event, 'reminder', 100)"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </SlideYUpTransition>
        </v-card>
      </v-container>
    </v-form>

    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

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
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import checklistFieldset from '@components/checklist-fieldset.vue'
import Confirm from '@components/confirm.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { SlideYUpTransition } from 'vue2-transitions'
import smileRating from '@components/input-fields/smile-rating.vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    checklistFieldset,
    Confirm,
    Datetime,
    Layout,
    SlideYUpTransition,
    smileRating,
    yesNoRating,
    Treeselect,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      normalizerHiveSets(node) {
        return {
          id: node.treeselectId,
          label: node.name,
          isDisabled: node.noEditableHives,
        }
      },
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      selectedChecklist: null,
      activeInspection: null,
      selectedChecklistId: null,
      showGeneral: true,
      showCategoriesByIndex: [],
      showLoadingIcon: false,
      valid: false,
      ready: false,
      selectedHiveSetId: null,
      selectedHiveSet: null,
      selectedHives: [],
      editableHives: [],
      activeHive: null,
      hiveNotEditable: false,
    }
  },
  computed: {
    ...mapGetters('inspections', [
      'checklist',
      'checklists',
      'inspectionEdited',
    ]),
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    apiaryId() {
      return this.$route.query.apiaryId || null
    },
    checklistLink() {
      return {
        name: 'checklist',
        params: { id: this.selectedChecklistId },
        query: {
          hiveId: this.hiveId,
          inspectionId: this.inspectionId,
          groupId: this.groupId,
          apiaryId: this.apiaryId,
        },
      }
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
    inspectionId() {
      return parseInt(this.$route.params.inspection) || null
    },
    preSelectedChecklistId() {
      return parseInt(this.$route.query.checklistId) || null
    },
    inspectionDate: {
      get() {
        if (
          this.activeInspection &&
          typeof this.activeInspection.created_at !== 'undefined'
        ) {
          return this.momentISO8601(this.activeInspection.created_at)
        } else if (this.activeInspection) {
          return this.momentISO8601(this.activeInspection.date)
        } else {
          return ''
        }
      },
      set(value) {
        this.activeInspection.date = this.momentCreatedAt(value)
      },
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    reminderDate: {
      get() {
        if (
          this.activeInspection &&
          this.activeInspection.reminder_date !== null
        ) {
          return this.momentISO8601(this.activeInspection.reminder_date)
        } else {
          return null
        }
      },
      set(value) {
        if (value !== '' && value !== null) {
          this.activeInspection.reminder_date = this.momentCreatedAt(value)
          this.setInspectionEdited(true)
        } else {
          this.activeInspection.reminder_date = null
        }
      },
    },
    selectAllHives: {
      get() {
        return this.selectedHives.length === this.editableHives.length
      },
      set(value) {
        if (value === false) {
          this.selectedHives = []
        } else {
          this.selectedHives = this.editableHives
        }
      },
    },
    sortedHiveSets() {
      var treeselectArray = []
      if (this.apiaries && this.apiaries.length > 0) {
        var treeselectApiaries = this.apiaries
        treeselectApiaries.map((apiary) => {
          apiary.treeselectId = parseInt('1' + apiary.id.toString())
        })
        var sortedTreeselectApiaries = treeselectApiaries
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
        var treeselectGroups = this.groups
        treeselectGroups.map((group) => {
          // groups with no editable hives will be disabled in the treeselect component
          group.noEditableHives =
            group.hives.filter((hive) => {
              return hive.editable === true
            }).length === 0
          group.treeselectId = parseInt('2' + group.id.toString())
        })
        var sortedTreeselectGroups = treeselectGroups
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
    treeselectLabel() {
      var label = ''
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
  created() {
    // If hive id is specified, first check if hive is present / accessible and editable
    if (this.hiveId !== null) {
      this.getActiveHive(this.hiveId).then(() => {
        this.getHiveSet()
      })
    } else {
      this.getHiveSet()
    }
    // If hive-inspect-edit route is used, retrieve to-be-edited inspection
    if (this.inspectionId !== null) {
      this.getInspection(this.inspectionId).then((response) => {
        this.activeInspection = response
        this.preSelectedChecklistId
          ? this.getChecklistById(this.preSelectedChecklistId)
          : this.getChecklistById(this.activeInspection.checklist_id)
        this.readChecklistsIfNotPresent()
        this.$store.commit(
          'inspections/setSelectedInspectionId',
          this.inspectionId
        )
      })
      // Else make an empty inspection object
    } else {
      this.activeInspection = {
        date: this.momentISO8601(new Date()),
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
        this.selectedChecklist = this.checklist
        this.preSelectedChecklistId
          ? (this.selectedChecklistId = this.preSelectedChecklistId)
          : (this.selectedChecklistId = this.checklist.id)
        this.activeInspection.checklist_id = this.selectedChecklistId
        var itemsObject = {}
        this.selectedChecklist.category_ids.map((categoryId) => {
          // TODO: what if category ids is empty?
          itemsObject[categoryId] = null
        })
        this.activeInspection.items = itemsObject
      })
    }
    this.setInspectionEdited(false)
    this.ready = true
  },
  methods: {
    async getActiveHive(id) {
      try {
        const response = await Api.readRequest('/hives/', id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        this.activeHive = response.data.hives[0]
        if (!this.activeHive.editable) {
          this.hiveNotEditable = true
        }
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 404) {
            this.$router.push({ name: '404', params: { resource: 'hive' } })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async getChecklistById(id) {
      try {
        const response = await Api.readRequest('/inspections/lists?id=', id)
        this.selectedChecklist = response.data.checklist
        this.selectedChecklistId = response.data.checklist.id

        if (
          this.selectedChecklist !== null &&
          this.selectedChecklist.categories.length > 0
        ) {
          const numberOfCategories = this.selectedChecklist.categories.length
          this.showCategoriesByIndex = []
          for (var i = 0; i < numberOfCategories; i++) {
            this.showCategoriesByIndex.push(false)
          }
        }

        var itemsObject = {}
        this.selectedChecklist.category_ids.map((categoryId) => {
          itemsObject[categoryId] = null
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
              item.type.indexOf('number') > -1 ||
              item.type.indexOf('grade') > -1 ||
              item.type.indexOf('score') > -1 ||
              item.type.indexOf('slider') > -1 ||
              item.type.indexOf('square') > -1
            ) {
              itemsObject[item.category_id] = Number(item.value)
            } else {
              itemsObject[item.category_id] = item.value
            }
          })
          // For a new inspection, transfer values that have been filled in already for the old checklist to the newly selected checklist
        } else {
          Object.entries(this.activeInspection.items).map(([key, value]) => {
            if (value !== null) {
              itemsObject[key] = value
            }
          })
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
              params: { resource: 'inspection' },
            })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        // no placeholder needed when response is empty because this page won't be accesible without any hives
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
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
    async readGeneralInspections() {
      try {
        const response = await Api.readRequest('/inspections')
        this.$store.commit('inspections/setGeneralInspections', response.data)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async saveInspection() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        var inspectionToSave = this.activeInspection
        inspectionToSave.hive_ids = this.selectedHives
        console.log('saving Inspection...')
        console.log(inspectionToSave)
        try {
          await Api.postRequest('/inspections/store', inspectionToSave)
          setTimeout(() => {
            return this.readApiariesAndGroups().then(() => {
              this.readGeneralInspections().then(() => {
                // update generalInspections in store for diary-list
                this.$router.push({
                  name: 'diary',
                })
              })
            })
          }, 50) // wait for API to update inspections
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.message
            console.log('Error: ', error.response)
            this.snackbar.text = msg
          } else {
            console.log('Error: ', error)
            this.snackbar.text = this.$i18n.t('something_wrong')
          }
          this.snackbar.show = true
          this.showLoadingIcon = false
        }
      }
    },
    clearDate() {
      this.activeInspection.reminder_date = null
    },
    getText(item) {
      const name = item.name
      var research = ''
      if (item.researches.length > 0) {
        research =
          ' (' + this.$i18n.t('research') + ': ' + item.researches[0] + ')'
      }
      return name + research
    },
    getHiveSet() {
      if (this.apiaries.length === 0 && this.groups.length === 0) {
        // if apiaries and groups are not in store, in case view is opened directly without loggin in (via localstorage)
        this.readApiariesAndGroups().then(() => {
          this.selectInitialHiveSet()
        })
      } else {
        this.selectInitialHiveSet()
      }
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
        })
        // only when selecting the apiary from the queried hive Id, select just that hive
        if (this.hiveId && apiary.id === this.activeHive.location_id) {
          this.selectedHives = [this.hiveId]
        }
        this.selectedHiveSet = apiary
        // If apiary id doesn't exist return 404
      } else {
        this.$router.push({
          name: '404',
          params: { resource: 'location' },
        })
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
          if (hive.editable) {
            this.selectedHives.push(hive.id)
            this.editableHives.push(hive.id)
          }
        })
        // only when selecting a group containing the queried hive Id, select just that hive
        if (this.hiveId && this.activeHive.group_ids.includes(group.id)) {
          // if hiveId is specified, only select it if editable
          if (this.editableHives.includes(this.hiveId)) {
            this.selectedHives = [this.hiveId]
          }
        }
        this.selectedHiveSet = group
        // If group id doesn't exist return 404
      } else {
        this.$router.push({
          name: '404',
          params: { resource: 'group' },
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
      }
      this.setInspectionEdited(true)
    },
    selectFirstHiveSetFromList() {
      this.selectedHiveSetId = this.sortedHiveSets[0].children[0].treeselectId
      this.selectHiveSet(this.selectedHiveSetId)
    },
    selectHiveSet(id) {
      var stringId = id.toString()
      var isApiary = parseInt(stringId.substring(0, 1)) === 1
      var hiveSetId = parseInt(stringId.substring(1, stringId.length + 1))
      isApiary ? this.selectApiary(hiveSetId) : this.selectGroup(hiveSetId)
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
    switchChecklist(id) {
      if (this.inspectionId !== null || this.inspectionEdited) {
        this.$refs.confirm
          .open(
            this.$i18n.t('Select') + ' ' + this.$i18n.tc('checklist', 1),
            this.$i18n.t('change_checklist_confirm'),
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            this.getChecklistById(id)
          })
          .catch((reject) => {
            return true
          })
      } else {
        this.getChecklistById(id)
      }
    },
    toggleCategory(index) {
      this.$set(
        this.showCategoriesByIndex,
        index,
        !this.showCategoriesByIndex[index]
      )
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
</style>
