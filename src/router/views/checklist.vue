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
          color="primary"
          class="mr-1"
          type="submit"
          :disabled="!valid || (activeChecklist && !activeChecklist.owner)"
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
          {{ $t('save') + ' ' + $tc('checklist', 1) }}
        </v-btn>
      </v-toolbar>

      <v-container v-if="!ready">
        <div class="loading">
          <Transition appear>
            <v-progress-circular size="50" color="primary" indeterminate />
          </Transition>
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
          <v-col cols="12">
            <v-alert
              v-if="errorMessage"
              type="error"
              text
              prominent
              dense
              color="red"
            >
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
              @input="selectChecklist($event)"
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-if="activeChecklist"
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
          <v-col cols="12">
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
              >{{ $t('edit_hive_checklist') }}</p
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
      checklists: null,
      selectedChecklistId: null,
      ready: false,
    }
  },
  computed: {
    id() {
      if (this.checklistsPage) {
        return this.selectedChecklistId
      } else {
        return parseInt(this.$route.params.id)
      }
    },
    hiveId() {
      return parseInt(this.$route.query.hive_id) || null
    },
    inspectionEdit() {
      return parseInt(this.$route.query.inspection_edit) || null
    },
    locale() {
      return this.$i18n.locale
    },
    checklistsPage() {
      return this.$route.name === 'checklists'
    },
  },
  watch: {
    locale() {
      this.getChecklistTaxonomy(this.id)
    },
  },
  created() {
    if (this.checklistsPage) {
      this.getChecklists().then(() => {
        this.getChecklistById(this.selectedChecklistId)
        this.getChecklistTaxonomy(this.selectedChecklistId)
        this.ready = true
      })
    } else {
      this.getChecklistById(this.id)
      this.getChecklistTaxonomy(this.id)
      this.ready = true
    }
  },
  methods: {
    async getChecklists() {
      try {
        const response = await Api.readRequest('/inspections/lists')
        this.checklists = response.data.checklists
        this.selectedChecklistId = response.data.checklist.id
        return response
      } catch (e) {
        console.log(e)
      }
    },
    async getChecklistById(id) {
      try {
        const response = await Api.readRequest('/inspections/lists?id=', id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'checklist' } })
        }
        this.activeChecklist = response.data.checklist
        return response.data.checklist
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'checklist' } })
      }
    },
    async getChecklistTaxonomy(id) {
      try {
        const response = await Api.readRequest('/checklists/', id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'checklist' } })
        }
        this.activeChecklistTaxonomy = response.data.taxonomy
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'checklist' } })
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
            this.errorMessage = this.$i18n.t('Error')
          }
          setTimeout(() => {
            if (this.hiveId !== null && this.inspectionEdit !== null) {
              return this.$router.push({
                name: 'hive-inspect-edit',
                params: {
                  id: this.hiveId,
                  inspection: this.inspectionEdit,
                },
                query: { checklist_id: this.id },
              })
            } else if (this.hiveId !== null) {
              return this.$router.push({
                name: 'hive-inspect',
                params: {
                  id: this.hiveId,
                },
                query: { checklist_id: this.id },
              })
            } else {
              this.$router.push(-1).catch((error) => {
                if (error.name === 'NavigationDuplicated') {
                  if (this.checklistsPage) {
                    this.getChecklists()
                  }
                  this.getChecklistById(this.id)
                  this.getChecklistTaxonomy(this.id)
                  this.showLoadingIcon = false
                }
              })
            }
          }, 200)
        } catch (error) {
          if (error.response) {
            console.log(error.response)
            const msg = error.response.data.message
            this.errorMessage = this.$i18n.t(msg)
          } else {
            this.errorMessage = this.$i18n.t('Error')
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
    selectChecklist(id) {
      this.getChecklistById(id)
      this.getChecklistTaxonomy(id)
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
