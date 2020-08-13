<template>
  <Layout :title="`${$t('New_inspection')}`" :no-box-shadow="true">
    <v-container v-if="newInspection" class="hive-inspect-content">
      <v-form ref="form">
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <div>
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="inspectionDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="inspectionDate"
                        :label="`${$t('Date_of_inspection')}`"
                        height="36px"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="inspectionDate"
                      :first-day-of-week="1"
                      :locale="locale"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = !modal">{{
                        $t('Cancel')
                      }}</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="updateInspectionDate"
                        >{{ $t('ok') }}</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  v-if="newInspection"
                  v-model="newInspection.attention"
                  :label="`${$t('needs_attention')}`"
                ></v-switch>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-flex-end">
                  <v-btn
                    tile
                    outlined
                    color="primary"
                    class="mr-1"
                    @click="saveInspection"
                  >
                    <v-icon left>mdi-check</v-icon>
                    {{ $t('save') + ' ' + $tc('inspection', 1) }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </v-container>

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
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
// import VueNumberInput from '@chenfengyuan/vue-number-input'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    Confirm,
    Layout,
    // VueNumberInput,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      newInspection: null,
      changeCounter: 0,
      modal: false,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    inspectionDate: {
      get() {
        if (this.newInspection) {
          return this.momentifyRemoveTime(this.newInspection.date)
        } else {
          return this.momentifyRemoveTime(new Date())
        }
      },
      set(value) {
        this.newInspection.date = value
      },
    },
    inspectionTemplate() {
      return {
        date: new Date(),
        impression: null,
        attention: null,
        notes: null,
        reminder_date: null,
        reminder: null,
        checklist_id: null, // TODO: get checklist id
        hive_id: this.id,
      }
    },
    locale() {
      return this.$i18n.locale
    },
  },
  watch: {
    newInspection: {
      handler: function() {
        if (this.newInspection !== this.inspectionTemplate) {
          if (this.changeCounter > 0) {
            // changeCounter is needed because this watcher detects a change upon instantiation of newInspection which we want to disregard
            this.$store.commit('inspections/setEdited', true)
          }
          this.changeCounter++
        }
      },
      deep: true,
    },
  },
  created() {
    this.$store.commit('inspections/setEdited', false)
    this.newInspection = {
      date: this.momentify(new Date()),
      impression: null,
      attention: null,
      notes: null,
      reminder_date: null,
      reminder: null,
      checklist_id: null, // TODO: get checklist id
      hive_id: this.id,
    }
  },
  methods: {
    async saveInspection() {
      console.log('saving Inspection...')
      console.log(this.newInspection)
      // try {
      //   const response = await this.$store.dispatch(
      //     'inspections/saveInspection',
      //     this.newInspection
      //   )
      //   if (!response) {
      //     this.snackbar.text = this.$i18n.t('not_saved_error')
      //     this.snackbar.show = true
      //   }
      //   setTimeout(() => {
      //     return this.$router.push({
      //       name: 'hive-inspections',
      //     })
      //   }, 300) // wait for API to update locations/hives
      // } catch (error) {
      //   console.log(error)
      //   this.snackbar.text = this.$i18n.t('not_saved_error')
      //   this.snackbar.show = true
      // }
    },
    updateInspectionDate() {
      this.$refs.dialog.save(this.inspectionDate)
    },
  },
}
</script>

<style lang="scss" scoped></style>
