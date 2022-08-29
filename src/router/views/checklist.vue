<template>
  <Layout
    :title="
      `${
        checklistsPage
          ? this.$i18n.tc('Checklist_template', 2)
          : $t('Edit_checklist')
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
      @submit.prevent="
        activeChecklist.id !== undefined ? updateChecklist() : createChecklist()
      "
    >
      <v-toolbar class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!mobile && activeChecklist"
          tile
          outlined
          color="primary"
          class="mr-3"
          :small="smAndDown"
          @click="initNewChecklist"
        >
          <v-icon :left="!smallScreen">mdi-plus</v-icon>
          {{ !smallScreen ? $t('new_checklist') : '' }}
        </v-btn>
        <v-btn
          v-if="!mobile && activeChecklist"
          tile
          outlined
          color="primary"
          class="mr-3"
          :small="smAndDown"
          @click="createChecklist(true)"
        >
          <v-icon :left="!smallScreen">mdi-content-copy</v-icon>
          {{ !smallScreen ? $t('duplicate') : '' }}
        </v-btn>
        <v-btn
          v-if="showDeleteButton"
          tile
          outlined
          class="mr-3"
          color="red"
          :disabled="showDeleteLoadingIcon"
          :small="smAndDown"
          @click="confirmDeleteChecklist"
        >
          <v-progress-circular
            v-if="showDeleteLoadingIcon"
            class="mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showDeleteLoadingIcon" :left="!smallScreen"
            >mdi-delete</v-icon
          >
          {{ mobile || !smallScreen ? $t('Delete') : '' }}</v-btn
        >
        <v-btn
          v-if="activeChecklist"
          tile
          outlined
          color="black"
          class="mr-1"
          type="submit"
          :disabled="
            !valid ||
              (activeChecklist && !activeChecklist.owner) ||
              showLoadingIcon
          "
          :small="smAndDown"
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
        <v-btn
          v-if="mobile && activeChecklist"
          tile
          outlined
          small
          color="primary"
          class="save-button-mobile-wide mt-n2 mb-3"
          @click="initNewChecklist"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ $t('new_checklist') }}
        </v-btn>
        <v-btn
          v-if="mobile && activeChecklist"
          tile
          outlined
          small
          color="primary"
          class="save-button-mobile-wide mb-5"
          @click="createChecklist(true)"
        >
          <v-icon left>mdi-content-copy</v-icon>
          {{ $t('duplicate') }}
        </v-btn>
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
          <v-col v-if="!retrievingChecklist && activeChecklist" cols="12">
            <p v-if="!activeChecklist.owner" class="description">{{
              $t('sorry') +
                ', ' +
                $tc('checklist', 1) +
                ' "' +
                activeChecklist.name +
                '" ' +
                $t('not_editable')
            }}</p>
            <div class="beep-label" v-text="`${$t('Checklist_items')}`"></div>
            <p v-if="activeChecklist.owner" class="description">{{
              mobile || touchDevice
                ? $t('edit_hive_checklist_touch')
                : $t('edit_hive_checklist_no_touch')
            }}</p>
            <checklistTree
              v-if="activeChecklistTaxonomy"
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
      showDeleteLoadingIcon: false,
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
      return parseInt(this.$route.params.id)
    },
    inspectionEdit() {
      return parseInt(this.$route.query.inspectionId) || null
    },
    locale() {
      return this.$i18n.locale
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    ownedChecklists() {
      return this.checklists.filter((checklist) => checklist.owner)
    },
    showDeleteButton() {
      return (
        this.activeChecklist &&
        this.activeChecklist.owner &&
        this.ownedChecklists.length > 1 // always keep at least 1 owned checklist
      )
    },
    smallScreen() {
      return this.$vuetify.breakpoint.width < 800
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    locale() {
      if (this.ready) {
        this.readChecklistAndTaxonomy(this.selectedChecklistId)
      }
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
      this.selectedChecklistId = this.id
      this.readChecklistAndTaxonomy(this.id)
      this.ready = true
    }
  },
  methods: {
    async createChecklist(duplicate = false) {
      this.showLoadingIcon = true
      var categoryIds = null
      if (this.activeChecklist.category_ids.length > 0) {
        categoryIds = this.activeChecklist.category_ids.join(',')
      }
      var newChecklist = {
        name: this.activeChecklist.name + (duplicate ? ' (copy)' : ''),
        categories: categoryIds,
        owner: true,
      }
      try {
        const response = await Api.postRequest('/checklists/', newChecklist)
        if (!response) {
          this.errorMessage = this.$i18n.tc('Error', 1)
        }
        this.selectedChecklistId = response.data.checklist_id
        this.readChecklists().then(() => {
          this.readChecklistAndTaxonomy(response.data.checklist_id)
          this.showLoadingIcon = false
        })
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
    },
    async deleteChecklist(id) {
      this.showDeleteLoadingIcon = true
      try {
        const response = await Api.deleteRequest('/checklists/', id)
        if (!response) {
          console.log('Error')
        }
        this.readChecklists().then(() => {
          this.selectedChecklistId = this.checklist.id
          this.readChecklistAndTaxonomy(this.selectedChecklistId)
          this.showDeleteLoadingIcon = false
        })
      } catch (error) {
        this.showDeleteLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
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
    async updateChecklist(newChecklist = false) {
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
                  query: { checklistId: this.selectedChecklistId },
                })
              } else if (this.hiveId || this.apiaryId || this.groupId) {
                return this.$router.push({
                  name: 'inspect',
                  query: {
                    checklistId: this.selectedChecklistId,
                    hiveId: this.hiveId,
                    apiaryId: this.apiaryId,
                    groupId: this.groupId,
                  },
                })
              } else if (!this.checklistsPage) {
                this.$router.go(-1).catch((error) => {
                  if (error.name === 'NavigationDuplicated') {
                    this.readChecklistAndTaxonomy(this.selectedChecklistId)
                    this.showLoadingIcon = false
                  }
                })
              } else if (this.checklistsPage) {
                this.readChecklistAndTaxonomy(this.selectedChecklistId)
                this.showLoadingIcon = false
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
    confirmDeleteChecklist() {
      this.$refs.confirm
        .open(
          this.$i18n.t('delete_checklist'),
          this.$i18n.t('delete_checklist_confirm') +
            this.activeChecklist.name +
            '"',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          if (this.activeChecklist.id === undefined) {
            this.selectedChecklistId = null
            this.activeChecklist = null
          } else {
            this.deleteChecklist(this.activeChecklist.id)
          }
        })
        .catch((reject) => {
          return true
        })
    },
    deselectItems(array) {
      return array.map((item) => {
        item.state.selected = false
        if (item.children !== null && item.children.length > 0) {
          item.children = this.deselectItems(item.children)
        }
        return item
      })
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
    initNewChecklist() {
      this.selectedChecklistId = null
      this.activeChecklistTaxonomy = this.deselectItems(
        this.activeChecklist.taxonomy
      )

      this.activeChecklist = {
        category_ids: [],
        name:
          this.$i18n.tc('Checklist', 1) +
          ' ' +
          (this.ownedChecklists.length + 1),
        owner: true,
      }
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
