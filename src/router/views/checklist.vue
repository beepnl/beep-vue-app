<template>
  <Layout :title="`${$t('edit')} ${$tc('checklist', 1)}`" :no-box-shadow="true">
    <h1
      v-if="activeChecklist && !activeChecklist.owner"
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

    <v-form ref="form" v-model="valid" @submit.prevent="saveChecklist">
      <v-toolbar class="checklist-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          tile
          outlined
          color="primary"
          class="mr-1"
          type="submit"
          :disabled="!valid"
        >
          <v-icon left>mdi-check</v-icon>
          {{ $t('save') + ' ' + $tc('checklist', 1) }}
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="activeChecklist && activeChecklist.owner"
        class="checklist-content"
      >
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-if="activeChecklist"
              v-model="activeChecklist.name"
              :label="`${$t('Name')}`"
              :placeholder="`${$t('Name')}`"
              class="checklist-name"
              counter="50"
              @input="validateText($event, 'name', 50)"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="beep-label" v-text="`${$t('Checklist_items')}`"></div>
            <p class="description">{{ $t('edit_hive_checklist') }}</p>
            <checklistTree
              v-if="activeChecklist && activeChecklistTaxonomy"
              :items="activeChecklistTaxonomy"
              :selected="activeChecklist.category_ids"
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
      activeChecklistId: null,
      activeChecklistTaxonomy: null,
      valid: false,
      hive_id: null,
      inspection_edit: null,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    locale() {
      return this.$i18n.locale
    },
  },
  watch: {
    locale() {
      this.getChecklistTaxonomy(this.id)
    },
  },
  created() {
    this.getChecklistById(this.id)
    this.getChecklistTaxonomy(this.id)
    this.hive_id = this.getURLParameter('hive_id')
    this.inspection_edit = this.getURLParameter('inspection_edit')
  },
  methods: {
    async getChecklistById(id) {
      try {
        const response = await this.$store.dispatch(
          'inspections/getChecklistById',
          id
        )
        this.activeChecklist = response.checklist
        this.activeChecklistId = response.checklist.id
        return response.checklist
      } catch (e) {
        console.log(e)
      }
    },
    async getChecklistTaxonomy(id) {
      try {
        const response = await this.$store.dispatch(
          'checklists/getChecklistTaxonomy',
          id
        )
        this.activeChecklistTaxonomy = response.taxonomy
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async saveChecklist() {
      if (this.$refs.form.validate()) {
        var categoryIds = null
        if (this.activeChecklist.category_ids.length > 0) {
          categoryIds = this.activeChecklist.category_ids.join(',')
        }
        var checklistUpdate = {
          id: this.activeChecklist.id,
          categories: categoryIds,
        }
        try {
          await this.$store.dispatch(
            'checklists/saveChecklist',
            checklistUpdate
          )
          setTimeout(() => {
            if (this.hive_id !== null && this.inspection_edit !== null) {
              return this.$router.push({
                name: 'hive-inspect-edit',
                params: {
                  id: this.hive_id,
                  inspection: this.inspection_edit,
                },
              })
            } else if (this.hive_id !== null) {
              return this.$router.push({
                name: 'hive-inspect',
                params: {
                  id: this.hive_id,
                },
              })
            } else {
              this.$router.push(-1).catch((error) => {
                if (error.name === 'NavigationDuplicated') {
                  // if previous page is identical, do nothing, or page reload? : // this.$router.go('/')
                }
              })
            }
          }, 200)
        } catch (error) {
          console.log(error)
        }
      }
    },
    getURLParameter(param) {
      const urlQuery = window.location.search.substring(1)
      const queryVariables = urlQuery.split('&')

      for (var i = 0; i < queryVariables.length; i++) {
        const parameterName = queryVariables[i].split('=')

        if (parameterName[0] === param) {
          return parameterName[1] === undefined
            ? null
            : decodeURIComponent(parameterName[1])
        }
      }
      return null
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeChecklist[property] = value
      }
    },
    updateCategoryIds(event) {
      this.activeChecklist.category_ids = event
    },
  },
}
</script>

<style lang="scss" scoped>
.unauthorized-title {
  padding-top: 40px;
  text-align: center;
}

.checklist-bar {
  position: fixed;
  z-index: 2;
  width: 100%;
  margin-top: -56px;
  background-color: $color-orange-light !important;
  border-bottom: 1px solid #fff5e2 !important;
  box-shadow: none !important;
}
.checklist-content {
  margin-top: 56px;
}
</style>
