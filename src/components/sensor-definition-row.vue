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
      <el-input-number
        v-model="sensorDef.offset"
        :disabled="sensorDef.delete"
        size="small"
        @input.native="
          convertComma($event, sensorDef, 'offset')
          setSensorDefEdited(true)
        "
        @change="setSensorDefEdited(true)"
      ></el-input-number>
    </td>
    <td>
      <el-input-number
        v-model="sensorDef.multiplier"
        :disabled="sensorDef.delete"
        size="small"
        @input.native="
          convertComma($event, sensorDef, 'multiplier'),
            setSensorDefEdited(true)
        "
        @change="setSensorDefEdited(true)"
      ></el-input-number>
    </td>
    <td class="td--small">
      <v-select
        v-model="sensorDef.input_measurement_id"
        :disabled="sensorDef.delete"
        :items="sortedSensorMeasurements"
        item-text="abbreviation"
        item-value="id"
        :label="`${$t('Select')} ${$tc('measurement', 1)} ...`"
        class="mt-2 mb-n5"
        solo
        @input="selectInputMeasurementId(sensorDef, $event)"
      ></v-select>
    </td>
    <td class="td--small">
      <v-select
        v-model="sensorDef.output_measurement_id"
        :disabled="sensorDef.delete"
        :items="sortedSensorMeasurements"
        item-text="abbreviation"
        item-value="id"
        :label="`${$t('Select')} ${$tc('measurement', 1)} ...`"
        class="mt-2 mb-n5"
        solo
        @input="setSensorDefEdited(true)"
      ></v-select>
    </td>
    <td>
      <div
        v-if="sensorDef.updated_at !== null"
        :class="'d-flex flex-column' + (showInfo ? ' my-1' : '')"
      >
        <div class="d-flex align-center">
          <Datetime v-model="updatedDate" type="datetime" class="color-accent">
            <template slot="button-cancel">
              <v-btn text color="accent">{{ $t('Cancel') }}</v-btn>
            </template>
            <template slot="button-confirm">
              <v-btn text color="accent">{{ $t('ok') }}</v-btn>
            </template>
          </Datetime>
          <v-icon
            class="mdi mdi-information ml-1 icon-info cursor-pointer"
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
          <template v-slot:activator="{ on }">
            <v-icon
              dark
              class="mr-3"
              color="green"
              v-on="on"
              @click="updateSensorDef(sensorDef)"
              >mdi-check</v-icon
            >
          </template>
          <span>{{ $t('save') }}</span>
        </v-tooltip>
        <v-tooltip open-delay="500" bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              dark
              color="red"
              v-on="on"
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
import Confirm from '@components/confirm.vue'
import yesNoRating from '@components/input-fields/yes-no-rating.vue'
import { convertComma } from '@mixins/methodsMixin'
import {
  momentFormatUtcToLocal,
  momentFullDateTime,
  momentISO8601,
} from '@mixins/momentMixin'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.min.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    Confirm,
    Datetime,
    yesNoRating,
  },
  props: {
    sensorDef: {
      type: Object,
      default: () => null,
      required: true,
    },
  },
  mixins: [
    convertComma,
    momentFormatUtcToLocal,
    momentISO8601,
    momentFullDateTime,
  ],
  data() {
    return {
      errorMessage: null, // TODO show here?
      showLoadingIcon: false,
      showInfo: false,
      dateZFormat: 'YYYY-MM-DD[T]HH:mm:ss[Z]',
    }
  },
  computed: {
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
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
      // Datetime only can parse the momentISO8601 format and only takes v-model. That is why this entire row is a separate component, to be able to use the get and set version of a computed variable as input for Datetime
      get() {
        if (
          this.sensorDef &&
          typeof this.sensorDef.updated_at !== 'undefined'
        ) {
          const zFormat = this.$moment(this.sensorDef.updated_at).format(
            this.dateZFormat
          )
          return this.momentISO8601(zFormat)
        } else {
          return ''
        }
      },
      set(value) {
        this.sensorDef.updated_at = this.momentFullDateTime(value, true)
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
