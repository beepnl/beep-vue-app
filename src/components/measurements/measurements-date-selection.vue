<template>
  <v-row class="my-0">
    <v-col
      v-if="devices.length > 0 && interval !== 'selection'"
      cols="12"
      :class="sticky ? 'pa-0' : ''"
    >
      <div class="d-flex align-center justify-center">
        <v-icon class="color-grey-dark" @click="setTimeIndex(1)">
          mdi-chevron-left
        </v-icon>

        <span class="period-title">{{ periodTitle }}</span>

        <VueDatePicker
          v-if="
            interval !== 'year' || (interval === 'year' && !relativeInterval)
          "
          :format="datePickerFormat"
          :model-value="selectedDateCopy"
          model-type="format"
          :month-picker="interval === 'year' || interval === 'month'"
          hide-input-icon
          :clearable="false"
          :enable-time-picker="false"
          :locale="locale"
          :select-text="$t('ok')"
          :cancel-text="$t('Cancel')"
          class="small-date-picker text-accent"
          @update:model-value="selectDate($event)"
        >
          <template v-slot:trigger>
            <v-icon
              size="small"
              class="cursor-pointer color-grey-light ml-1"
              v-bind="props"
            >
              mdi-pencil
            </v-icon>
          </template>
        </VueDatePicker>

        <v-icon
          :class="timeIndex === 0 ? 'color-transparent' : 'color-grey-dark'"
          :disabled="timeIndex === 0"
          @click="setTimeIndex(-1)"
        >
          mdi-chevron-right
        </v-icon>
      </div>
    </v-col>

    <v-col
      v-if="interval === 'selection'"
      cols="12"
      :sm="showAsColumn > 0 ? showAsColumn : 4"
      :md="showAsColumn > 0 ? showAsColumn : 3"
      :class="
        (showAsColumn > 0 ? '' : 'mx-auto ') + (sticky || mobile ? 'pa-0' : '')
      "
    >
      <div
        :class="
          'd-flex align-center justify-center ' +
            (sticky ? 'mt-0' : 'mr-3 mr-sm-0')
        "
      >
        <div class="d-flex justify-flex-start align-center">
          <v-icon class="mr-2" :color="reminderDate !== null ? 'accent' : ''"
            >mdi-calendar-clock</v-icon
          >
          <div>
            <div class="beep-label">
              <span v-text="!sticky ? $t('period') : null"></span>
            </div>

            <VueDatePicker
              :format="datePickerFormat"
              :model-value="datesCopy"
              model-type="format"
              hide-input-icon
              range
              min-range="1"
              :clearable="false"
              :enable-time-picker="false"
              :placeholder="
                dates.length === 0 ? $t('selection_placeholder') : null
              "
              :locale="locale"
              :select-text="$t('ok')"
              :cancel-text="$t('Cancel')"
              class="data-date-picker text-accent"
              @update:model-value="saveDates($event)"
            />
          </div>
        </div>
      </div>
    </v-col>

    <v-col
      v-if="sticky && interval !== 'selection'"
      cols="12"
      :class="
        'd-flex align-center justify-center pa-0 ' + (mobile ? 'pt-1' : 'pt-2')
      "
    >
      <span class="beep-label mb-0" v-text="selectedDeviceTitle"> </span>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    interval: {
      type: String,
      default: 'day',
      required: true,
    },
    periodTitle: {
      type: String,
      default: '',
      required: false,
    },
    selectedDate: {
      type: String,
      default: '',
      required: false,
    },
    dateRangeText: {
      type: String,
      default: '',
      required: false,
    },
    relativeInterval: {
      type: Boolean,
      default: false,
      required: true,
    },
    sticky: {
      type: Boolean,
      default: false,
      required: false,
    },
    selectedDeviceTitle: {
      type: String,
      default: '',
      required: false,
    },
    dates: {
      type: Array,
      default: () => [],
      required: false,
    },
    showAsColumn: {
      type: Number,
      default: 0,
      required: false,
    },
    timeIndex: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      modal: false,
      menu: false,
      selectedDateCopy: '',
      datesCopy: [],
      datePickerFormat: 'yyyy-MM-dd', // TODO add option to include time 'yyyy-MM-dd HH:mm',
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.display.mobile
    },
    requiredRules() {
      let laterEndDate = true
      this.dates.length === 2 && this.dates[0] > this.dates[1]
        ? (laterEndDate = false)
        : (laterEndDate = true)
      return [
        (v) => laterEndDate || this.$i18n.t('later_end_start'), // don't allow start date later than end date
        (v) =>
          this.dates[0] !== this.dates[1] ||
          this.$i18n.t('different_end_start'), // don't allow end date identical to start date
        (v) =>
          this.dates.length > 1 ||
          this.$i18n.t('end_date') + ' ' + this.$i18n.t('not_filled'), // don't allow start date only
      ]
    },
  },
  created() {
    // use own component data props instead of prop to avoid mutating a prop directly (vuex warning)
    this.selectedDateCopy = this.selectedDate
    this.datesCopy = this.dates
  },
  methods: {
    saveDates(dates) {
      if (dates[1] === null) {
        dates[1] = ''
      }
      console.log(dates)
      this.$emit('save-dates', dates)
      this.$emit('load-data')
    },
    selectDate(date) {
      this.$emit('select-date', date)
    },
    setTimeIndex(offset) {
      this.$emit('set-time-index', offset)
    },
  },
}
</script>

<style lang="scss">
.data-date-picker {
  width: 220px !important;
}
.small-date-picker {
  width: 24px !important;
}
</style>
