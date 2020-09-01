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
              v-if="categoryIds && activeChecklistTaxonomy"
              :items="activeChecklistTaxonomy"
              :selected="categoryIds"
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
      categoryIds: null,
      valid: false,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
  },
  created() {
    this.getChecklistById(this.id)
    this.getChecklistTaxonomy(this.id)
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
        this.categoryIds = response.checklist.category_ids
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
        console.log('saving Checklist with Ids...')
        console.log(this.categoryIds)
        //   try {
        //     const response = await this.$store.dispatch(
        //       'inspections/saveChecklist',
        //       this.activeChecklist
        //     )
        //     // setTimeout(() => {
        //     //   return this.$router.push({
        //     //     name: 'hive-inspect',
        //     //     id: // TODO: redirect with correct hive id if hive_id query is given, otherwise inspection id?
        //     //   })
        //     // }, 300)
        //   } catch (error) {
        //     console.log(error)
        //   }
      }
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeChecklist[property] = value
      }
    },
    updateCategoryIds(event) {
      this.categoryIds = event
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
