<template>
  <Layout
    :title="
      `${
        checklistsPage
          ? this.$i18n.tc('Checklist_template', 2)
          : $t('edit') + ' ' + $tc('checklist', 1)
      }`
    "
    :edited="checklistEdited"
  >
    <h1
      v-if="activeChecklist && !activeChecklist.owner && !checklistsPage"
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('checklist', 1) +
          ' "' +
          activeChecklist.name +
          '" ' +
          $t('not_editable')
      }}
    </h1>

    <v-form
      v-if="(activeChecklist && activeChecklist.owner) || checklistsPage"
      ref="form"
      v-model="valid"
      @submit.prevent="saveChecklist"
    >
      <v-toolbar class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          tile
          outlined
          color="black"
          class="mr-1 save-button-mobile-wide"
          type="submit"
          :disabled="
            !valid ||
              (activeChecklist && !activeChecklist.owner) ||
              showLoadingIcon
          "
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-toolbar>

      <v-container v-if="!ready">
        <div class="loading">
          <v-progress-circular size="50" color="primary" indeterminate />
        </div>
      </v-container>

      <v-container
        v-if="
          ready &&
            ((activeChecklist && activeChecklist.owner) || checklistsPage)
        "
        class="content-container"
      >
        <v-row>
          <v-col v-if="errorMessage" cols="12">
            <v-alert type="error" text prominent dense color="red">
              {{ errorMessage }}
            </v-alert>
          </v-col>
          <v-col
            v-if="
              checklistsPage && checklists !== null && checklists.length > 1
            "
            class="d-flex"
            cols="12"
            sm="4"
          >
            <v-select
              v-model="selectedChecklistId"
              class="select-checklist"
              :items="checklists"
              :item-text="getText"
              item-value="id"
              hide-details
              :label="`${$t('Select') + ' ' + $tc('checklist', 1)}`"
              @input="readChecklistAndTaxonomy($event)"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-if="activeChecklist && !retrievingChecklist"
              v-model="activeChecklist.name"
              :label="`${$t('Name')}`"
              :placeholder="`${$t('Name')}`"
              class="checklist-name"
              counter="50"
              :disabled="!activeChecklist.owner"
              @input="validateText($event, 'name', 50)"
            >
            </v-text-field>
          </v-col>
          <v-col v-if="retrievingChecklist" cols="12">
            <div class="loading">
              <v-progress-circular size="50" color="primary" indeterminate />
            </div>
          </v-col>
          <v-col v-if="!retrievingChecklist" cols="12">
            <p
              v-if="activeChecklist && !activeChecklist.owner"
              class="description"
              >{{
                $t('sorry') +
                  ', ' +
                  $tc('checklist', 1) +
                  ' "' +
                  activeChecklist.name +
                  '" ' +
                  $t('not_editable')
              }}</p
            >
            <div class="beep-label" v-text="`${$t('Checklist_items')}`"></div>
            <p
              v-if="activeChecklist && activeChecklist.owner"
              class="description"
              >{{
                mobile || touchDevice
                  ? $t('edit_hive_checklist_touch')
                  : $t('edit_hive_checklist_no_touch')
              }}</p
            >
            <checklistTree
              v-if="activeChecklist && activeChecklistTaxonomy"
              :items="activeChecklistTaxonomy"
              :selected="activeChecklist.category_ids"
              :disabled="!activeChecklist.owner"
              @update-categories="updateCategoryIds($event)"
            ></checklistTree>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import checklistTree from '@components/checklist-tree.vue'

export default {
  components: {
    Confirm,
    Layout,
    checklistTree,
  },
  data: function() {
    return {
      activeChecklist: null,
      activeChecklistTaxonomy: null,
      errorMessage: null,
      checklistEdited: false,
      valid: false,
      showLoadingIcon: false,
      selectedChecklistId: null,
      ready: false,
      retrievingChecklist: false,
    }
  },
  computed: {
    ...mapGetters('inspections', ['checklist', 'checklists']),
    apiaryId() {
      return parseInt(this.$route.query.apiaryId) || null
    },
    checklistsPage() {
      return this.$route.name === 'checklists'
    },
    groupId() {
      return parseInt(this.$route.query.groupId) || null
    },
    hiveId() {
      return parseInt(this.$route.query.hiveId) || null
    },
    id() {
      if (this.checklistsPage) {
        return this.selectedChecklistId
      } else {
        return parseInt(this.$route.params.id)
      }
    },
    inspectionEdit() {
      return parseInt(this.$route.query.inspectionId) || null
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    locale() {
      this.readChecklistAndTaxonomy(this.id)
    },
  },
  created() {
    if (this.checklistsPage) {
      this.readChecklistsIfNotPresent().then(() => {
        this.selectedChecklistId = this.checklist.id
        this.readChecklistAndTaxonomy(this.selectedChecklistId)
        this.ready = true
      })
    } else {
      this.readChecklistAndTaxonomy(this.id)
      this.ready = true
    }
  },
  methods: {
    async readChecklists() {
      try {
        const response = await Api.readRequest('/inspections/lists')
        this.$store.commit(
          'inspections/setChecklists',
          response.data.checklists
        )
        this.$store.commit('inspections/setChecklist', response.data.checklist)
        return response
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readChecklistAndTaxonomy(id) {
      this.retrievingChecklist = true
      try {
        const response = await Api.readRequest('/checklists/', id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'checklist' } })
        }
        this.activeChecklist = response.data
        this.activeChecklistTaxonomy = response.data.taxonomy
        this.retrievingChecklist = false
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          if (error.response.status === 404) {
            this.$router.push({
              name: '404',
              params: { resource: 'checklist' },
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
    async saveChecklist() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        var categoryIds = null
        if (this.activeChecklist.category_ids.length > 0) {
          categoryIds = this.activeChecklist.category_ids.join(',')
        }
        var checklistUpdate = {
          id: this.activeChecklist.id,
          name: this.activeChecklist.name,
          categories: categoryIds,
        }
        try {
          const response = await Api.updateRequest(
            '/checklists/',
            this.activeChecklist.id,
            checklistUpdate
          )
          if (!response) {
            this.errorMessage = this.$i18n.tc('Error', 1)
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            this.readChecklists().then(() => {
              // update checklists and checklist in store when checklist is edited
              if (this.hiveId !== null && this.inspectionEdit !== null) {
                return this.$router.push({
                  name: 'hive-inspect-edit',
                  params: {
                    id: this.hiveId,
                    inspection: this.inspectionEdit,
                  },
                  query: { checklistId: this.id },
                })
              } else if (this.hiveId || this.apiaryId || this.groupId) {
                return this.$router.push({
                  name: 'inspect',
                  query: {
                    checklistId: this.id,
                    hiveId: this.hiveId,
                    apiaryId: this.apiaryId,
                    groupId: this.groupId,
                  },
                })
              } else {
                this.$router.go(-1).catch((error) => {
                  if (error.name === 'NavigationDuplicated') {
                    this.readChecklistAndTaxonomy(this.id)
                    this.showLoadingIcon = false
                  }
                })
              }
            })
          }, 200)
        } catch (error) {
          this.showLoadingIcon = false
          if (error.response) {
            console.log(error.response)
            const msg = error.response.data.message
            this.errorMessage = this.$i18n.t(msg)
          } else {
            console.log(error)
            this.errorMessage = this.$i18n.tc('Error', 1)
          }
        }
      }
    },
    checkIfItemIsNotOwned(item) {
      return item.owner === false
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
    updateCategoryIds(event) {
      this.checklistEdited = true
      this.activeChecklist.category_ids = event
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeChecklist[property] = value
      }
    },
  },
}
</script>
