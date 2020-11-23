<template>
  <Layout
    :title="
      inspectionId ? `${$t('Edit_inspection')}` : `${$t('New_inspection')}`
    "
  >
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

    <h1
      v-if="
        inspectionId === null &&
          activeHive &&
          activeHive.editable === false &&
          activeHive.owner === false
      "
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

    <v-form v-else ref="form" v-model="valid" @submit.prevent="saveInspection">
      <v-toolbar class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="selectedChecklist && selectedChecklist.owner"
          tile
          outlined
          class="hide-on-mobile save-button mr-3"
          :href="
            inspectionId
              ? `/checklist/${selectedChecklistId}/edit?hive_id=${id}&inspection_edit=${inspectionId}`
              : `/checklist/${selectedChecklistId}/edit?hive_id=${id}`
          "
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
          {{ $t('save') + ' ' + $tc('inspection', 1) }}
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="activeInspection && selectedChecklist !== null"
        class="content-container"
      >
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
              v-if="selectedChecklist && selectedChecklist.owner"
              tile
              outlined
              class="show-on-mobile save-button"
              :href="
                inspectionId
                  ? `/checklist/${selectedChecklistId}/edit?hive_id=${id}&inspection_edit=${inspectionId}`
                  : `/checklist/${selectedChecklistId}/edit?hive_id=${id}`
              "
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
                            >mdi-calendar</v-icon
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
import checklistFieldset from '@components/checklist-fieldset.vue'
import Confirm from '@components/confirm.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import smileRating from '@components/input-fields/smile-rating.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    checklistFieldset,
    Confirm,
    Datetime,
    Layout,
    smileRating,
    yesNoRating,
    SlideYUpTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      selectedChecklist: null,
      checklists: null,
      activeInspection: null,
      selectedChecklistId: null,
      showGeneral: true,
      showCategoriesByIndex: [],
      showLoadingIcon: false,
      valid: false,
    }
  },
  computed: {
    ...mapGetters('inspections', ['inspectionEdited']),
    ...mapGetters('hives', ['activeHive']),
    id() {
      return parseInt(this.$route.params.id)
    },
    inspectionId() {
      return parseInt(this.$route.params.inspection) || null
    },
    preSelectedChecklistId() {
      return parseInt(this.$route.query.checklist_id) || null
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
  },
  created() {
    // If hive-inspect-edit route is used, retrieve to-be-edited inspection
    if (this.inspectionId !== null) {
      this.getInspection(this.inspectionId).then((response) => {
        this.activeInspection = response
        this.preSelectedChecklistId
          ? this.getChecklistById(this.preSelectedChecklistId)
          : this.getChecklistById(this.activeInspection.checklist_id)
        this.getChecklists()
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
        hive_id: this.id,
        items: {},
      }
      this.getChecklists().then((response) => {
        this.selectedChecklist = response.checklist
        this.preSelectedChecklistId
          ? (this.selectedChecklistId = this.preSelectedChecklistId)
          : (this.selectedChecklistId = response.checklist.id)
        this.activeInspection.checklist_id = this.selectedChecklistId
        var itemsObject = {}
        this.selectedChecklist.category_ids.map((categoryId) => {
          // TODO: what if category ids is empty?
          itemsObject[categoryId] = null
        })
        this.activeInspection.items = itemsObject
      })
    }
    this.getActiveHive(this.id).then((hive) => {
      this.$store.commit('hives/setActiveHive', hive)
    })
    this.$store.commit('inspections/setSelectedInspectionId', this.inspectionId)
    this.setInspectionEdited(false)
  },
  methods: {
    async getActiveHive(id) {
      try {
        const response = await Api.readRequest('/hives/', id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.data.hives[0]
        return hive
      } catch (error) {
        console.log('Error: ', error)
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async getChecklistById(id) {
      try {
        const response = await this.$store.dispatch(
          'inspections/getChecklistById',
          id
        )
        this.selectedChecklist = response.checklist
        this.selectedChecklistId = response.checklist.id

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
        console.log('Error: ', error)
      }
    },
    async getChecklists() {
      try {
        const response = await this.$store.dispatch('inspections/getChecklists')
        this.checklists = response.checklists
        return response
      } catch (e) {
        console.log(e)
      }
    },
    async getInspection(id) {
      try {
        const response = await this.$store.dispatch(
          'inspections/getInspectionById',
          id
        )
        return response
      } catch (error) {
        console.log('Error: ', error)
        this.$router.push({ name: '404', params: { resource: 'inspection' } })
      }
    },
    async saveInspection() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('saving Inspection...')
        console.log(this.activeInspection)
        try {
          await this.$store.dispatch(
            'inspections/saveInspection',
            this.activeInspection
          )
          setTimeout(() => {
            return this.$router.push({
              name: 'hive-inspections',
            })
          }, 300)
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
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
