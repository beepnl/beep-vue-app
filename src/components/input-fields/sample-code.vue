<template>
  <div>
    <v-alert
      v-if="bulkInspection"
      type="error"
      text
      prominent
      dense
      color="red"
    >
      {{ $t('input_not_possible_for_bulkinspection') }}
    </v-alert>
    <v-btn
      v-if="object[item.id] === null || object[item.id] === undefined"
      class="mt-1"
      tile
      outlined
      color="accent"
      :disabled="showLoadingIcon || bulkInspection"
      @click.prevent="requestSampleCode"
    >
      <v-progress-circular
        v-if="showLoadingIcon"
        class="ml-n1 mr-2"
        size="18"
        width="2"
        color="disabled"
        indeterminate
      />
      <v-icon v-if="!showLoadingIcon" left>mdi-qrcode</v-icon>
      {{ $t('sample_code_generate') }}
    </v-btn>

    <div v-if="object[item.id] !== null" class="d-flex align-center mt-1">
      <span
        style=" font-weight: bold;letter-spacing: 2px;"
        v-text="object[item.id]"
        >{{ item.val }}</span
      >
      <div>
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="disabled"
          indeterminate
        />

        <v-tooltip v-if="!showLoadingIcon" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="object[item.id] !== null"
              icon
              color="red"
              v-bind="attrs"
              :disabled="showLoadingIcon || bulkInspection"
              v-on="on"
              @click.prevent="removeSampleCode(object[item.id])"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('sample_code_delete')"> </span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@api/Api'
import { mapGetters } from 'vuex'

export default {
  props: {
    object: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('inspections', ['bulkInspection', 'activeInspectionDate']),
    ...mapGetters('hives', ['activeHive']),
  },
  methods: {
    async removeSampleCode(code) {
      try {
        await Api.deleteRequest('/samplecode', '', {
          sample_code: code,
        })
        this.object[this.item.id] = null
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        }
        this.object[this.item.id] = null
      }
    },
    async requestSampleCode() {
      if (this.activeHive !== null) {
        var hiveId = this.activeHive.id
        var queenId =
          this.activeHive.queen !== null ? this.activeHive.queen.id : ''
        try {
          const response = await Api.postRequest('/samplecode', {
            hive_id: hiveId,
            sample_date: this.activeInspectionDate,
            queen_id: queenId,
          })
          if (!response) {
            this.object[this.item.id] = null
          }
          this.object[this.item.id] = response.data.sample_code
          this.setInspectionEdited(true)
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          }
          this.object[this.item.id] = null
        }
      }
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
  },
}
</script>
