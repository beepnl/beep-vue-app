<template>
  <Layout :title="`${$t('edit')} ${$tc('checklist', 1)}`" :no-box-shadow="true">
    <h1
      v-if="selectedChecklist && !selectedChecklist.owner"
      class="unauthorized-title"
    >
      {{
        $t('sorry') +
          ', ' +
          $tc('checklist', 1) +
          ' "' +
          selectedChecklist.name +
          '" ' +
          $t('not_editable')
      }}
    </h1>

    <!-- <v-form ref="form" v-model="valid" @submit.prevent="saveInspection">

    </v-form> -->

    <v-container
      v-if="selectedChecklist && selectedChecklist.owner"
      class="checklist-content"
    >
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-if="selectedChecklist"
            v-model="selectedChecklist.name"
            :label="`${$t('Name')}`"
            :placeholder="`${$t('Name')}`"
            class="checklist-name"
            counter="50"
            @input="validateText($event, 'name', 50)"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <nestedTest :items="selectedChecklist.categories"></nestedTest>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import nestedTest from '@components/nested-test.vue'

export default {
  components: {
    Confirm,
    Layout,
    nestedTest,
  },
  data: function() {
    return {
      selectedChecklist: null,
      checklists: null,
      selectedChecklistId: null,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
  },
  created() {
    this.getChecklistById(this.id)
  },
  methods: {
    async getChecklistById(id) {
      try {
        const response = await this.$store.dispatch(
          'inspections/getChecklistById',
          id
        )
        this.selectedChecklist = response.checklist
        this.selectedChecklistId = response.checklist.id
        this.checklists = response.checklists
        return response.checklist
      } catch (e) {
        console.log(e)
      }
    },
    // async saveChecklist() {
    //   if (this.$refs.form.validate()) {
    //     console.log('saving Checklist...')
    //     console.log(this.selectedChecklist)
    //     try {
    //       const response = await this.$store.dispatch(
    //         'inspections/saveChecklist',
    //         this.selectedChecklist
    //       )
    //       // setTimeout(() => {
    //       //   return this.$router.push({
    //       //     name: 'hive-inspect',
    //       //     id: // TODO: redirect with correct hive id if hive_id query is given, otherwise inspection id?
    //       //   })
    //       // }, 300)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.selectedChecklist[property] = value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.unauthorized-title {
  padding-top: 40px;
  text-align: center;
}
</style>
