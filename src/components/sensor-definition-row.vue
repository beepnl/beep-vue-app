<template>
  <tr :class="sensorDef.delete === true ? 'sensordef-delete' : ''">
    <td class="td--small">
      <v-text-field
        v-model="sensorDef.name"
        :disabled="sensorDef.delete"
        :placeholder="`${$t('Name')}`"
        class="mt-2"
        dense
        @input="setSensorDefEdited(true)"
      ></v-text-field>
    </td>
    <td>
      <yesNoRating
        v-if="sensorDef"
        :object="sensorDef"
        property="inside"
        :disabled="sensorDef.delete"
        :small="true"
        class="device-yes-no mt-n3 mb-n5"
      ></yesNoRating>
    </td>
    <td>
      <ElInputNumber
        :model-value="sensorDef.offset"
        :disabled="sensorDef.delete"
        size="small"
        @update:model-value="
          convertComma($event, sensorDef, 'offset'), setSensorDefEdited(true)
        "
        @change=";(sensorDef.offset = $event), setSensorDefEdited(true)"
      ></ElInputNumber>
    </td>
    <td>
      <ElInputNumber
        :model-value="sensorDef.multiplier"
        :disabled="sensorDef.delete"
        size="small"
        @update:model-value="
          convertComma($event, sensorDef, 'multiplier'),
            setSensorDefEdited(true)
        "
        @change=";(sensorDef.multiplier = $event), setSensorDefEdited(true)"
      ></ElInputNumber>
    </td>
    <td class="td--small">
      <v-select
        v-model="sensorDef.input_measurement_id"
        :disabled="sensorDef.delete"
        :items="sortedSensorMeasurements"
        item-title="abbreviation"
        item-value="id"
        :label="`${$t('Select')} ${$tc('measurement', 1)} ...`"
        class="mt-2 mb-n5"
        solo
        @update:model-value="selectInputMeasurementId(sensorDef, $event)"
      ></v-select>
    </td>
    <td class="td--small">
      <v-select
        v-model="sensorDef.output_measurement_id"
        :disabled="sensorDef.delete"
        :items="sortedSensorMeasurements"
        item-title="abbreviation"
        item-value="id"
        :label="`${$t('Select')} ${$tc('measurement', 1)} ...`"
        class="mt-2 mb-n5"
        solo
        @update:model-value="setSensorDefEdited(true)"
      ></v-select>
    </td>
    <td>
      <div
        v-if="sensorDef.updated_at !== null"
        :class="'d-flex flex-column' + (showInfo ? ' my-1' : '')"
      >
        <div class="d-flex align-center">
          <VueDatePicker
            :format="datePickerText"
            :model-value="updatedDate"
            :model-type="datePickerFormat"
            :locale="locale"
            :select-text="$t('ok')"
            :cancel-text="$t('Cancel')"
            :teleport="true"
            :clearable="false"
            hide-input-icon
            class=" text-accent"
            @update:model-value="datePickerUpdate"
          >
          </VueDatePicker>
          <v-icon
            class="mdi mdi-information ml-4 icon-info cursor-pointer"
            dark
            small
            color="accent"
            @click="showInfo = !showInfo"
          ></v-icon>
        </div>

        <p v-if="showInfo" class="info-text --sensordef">
          <em>{{ $t('sensordef_date_info') }} </em>
        </p>
      </div>
      <span v-else v-text="$t('Not_yet_saved')"></span>
    </td>
    <td>
      <div v-if="errorMessage === null" class="d-flex flex-no-wrap">
        <v-progress-circular
          v-if="showLoadingIcon"
          class="progress-icon mr-3"
          size="18"
          width="2"
          color="green"
          indeterminate
        />
        <v-tooltip v-if="!showLoadingIcon" open-delay="500" bottom>
          <template v-slot:activator="{ props }">
            <v-icon
              dark
              class="mr-3"
              color="green"
              v-bind="props"
              @click="updateSensorDef(sensorDef)"
              >mdi-check</v-icon
            >
          </template>
          <span>{{ $t('save') }}</span>
        </v-tooltip>
        <v-tooltip open-delay="500" bottom>
          <template v-slot:activator="{ props }">
            <v-icon
              dark
              color="red"
              v-bind="props"
              @click="deleteSensorDef(sensorDef)"
              >mdi-delete</v-icon
            >
          </template>
          <span>{{ $t('Delete') }}</span>
        </v-tooltip>
      </div>
      <v-alert
        v-else
        text
        prominent
        dense
        type="error"
        color="red"
        class="my-1"
      >
        {{ errorMessage }}
      </v-alert>
    </td>

    <Confirm ref="confirm"></Confirm>
  </tr>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm-dialog.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import { convertComma } from '@mixins/methodsMixin'
import { datePickerText, momentFormatUtcToLocal } from '@mixins/momentMixin'
import { ElInputNumber } from 'element-plus'
import { mapGetters } from 'vuex'

export default {
  components: {
    Confirm,
    ElInputNumber,
    yesNoRating,
  },
  props: {
    sensorDef: {
      type: Object,
      default: () => null,
      required: true,
    },
  },
  mixins: [convertComma, datePickerText, momentFormatUtcToLocal],
  data() {
    return {
      errorMessage: null, // TODO show here?
      showLoadingIcon: false,
      showInfo: false,
      dateZFormat: 'YYYY-MM-DD[T]HH:mm:ss[Z]',
      datePickerFormat: 'yyyy-MM-dd HH:mm:ss',
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    locale() {
      return this.$i18n.locale
    },
    sortedSensorMeasurements() {
      var sortedSMs = this.sensorMeasurementsList.slice().sort(function(a, b) {
        if (a.abbreviation > b.abbrevation) {
          return 1
        }
        if (b.abbreviation > a.abbreviation) {
          return -1
        }
        return 0
      })
      return sortedSMs
    },
    updatedDate: {
      get() {
        if (
          this.sensorDef &&
          typeof this.sensorDef.updated_at !== 'undefined'
        ) {
          return this.sensorDef.updated_at
        } else {
          return ''
        }
      },
      set(value) {
        this.sensorDef.updated_at = value
        this.setSensorDefEdited(true)
      },
    },
  },
  created() {},
  methods: {
    async updateSensorDef(sensorDef) {
      this.errorMessage = null
      this.showLoadingIcon = true
      var sensorDefId =
        typeof sensorDef.id !== 'undefined' ? sensorDef.id : null
      try {
        var response = false
        if (sensorDef.delete === true) {
          response = await Api.deleteRequest(
            '/sensordefinition/',
            sensorDefId,
            sensorDef
          )
        } else if (sensorDefId !== null) {
          response = await Api.putRequest(
            '/sensordefinition/' + sensorDefId,
            sensorDef
          )
        } else {
          response = await Api.postRequest('/sensordefinition', sensorDef)
        }
        if (!response) {
          this.errorMessage =
            this.$i18n.tc('Error', 1) + ': ' + this.$i18n.t('not_saved_error')
          this.showLoadingIcon = false
        }
        this.setSensorDefEdited(false)
        this.$emit('get-devices-for-list')
        this.showLoadingIcon = false
        // TODO: this.readApiaries() for latest measurement data? Groups as well??
        return true
      } catch (error) {
        this.showLoadingIcon = false
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.errorMessage = this.$i18n.t(msg)
        } else {
          this.errorMessage = this.$i18n.tc('Error', 1)
        }
      }
    },
    datePickerUpdate(e) {
      this.updatedDate = e
    },
    deleteSensorDef(sensorDef) {
      if (typeof sensorDef.id === 'undefined') {
        this.$emit('remove-sensor-def')
      } else {
        sensorDef.delete = !sensorDef.delete
        this.$refs.confirm
          .open(
            this.$i18n.t('delete_sensordef'),
            this.$i18n.t('delete_sensordef') + ' (' + sensorDef.name + ')?',
            {
              color: 'red',
            }
          )
          .then((confirm) => {
            this.updateSensorDef(sensorDef)
          })
          .catch((reject) => {
            sensorDef.delete = !sensorDef.delete
            return true
          })
      }
    },
    selectInputMeasurementId(sensorDef, $event) {
      sensorDef.output_measurement_id = $event
      this.setSensorDefEdited(true)
    },
    setSensorDefEdited(bool) {
      this.$emit('sensor-def-edited', bool)
    },
  },
}
</script>

<style lang="scss" scoped>
.sensordef-delete {
  background-color: rgba(255, 0, 0, 0.2);
}
.info-text.--sensordef {
  max-width: 150px;
}
</style>
