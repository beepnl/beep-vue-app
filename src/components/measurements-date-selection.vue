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

        <v-dialog
          v-if="
            interval !== 'year' || (interval === 'year' && !relativeInterval)
          "
          ref="dialog"
          v-model="modal"
          :return-value.sync="selectedDateCopy"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-icon small class="color-grey-light ml-1" v-on="on">
              mdi-pencil
            </v-icon>
          </template>
          <v-date-picker
            v-model="selectedDateCopy"
            :type="
              interval === 'year' || interval === 'month' ? 'month' : 'date'
            "
            :first-day-of-week="1"
            :locale="locale"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="modal = false">
              {{ $t('Cancel') }}
            </v-btn>
            <v-btn
              text
              color="secondary"
              @click="
                $refs.dialog.save(selectedDateCopy),
                  selectDate(selectedDateCopy)
              "
            >
              {{ $t('ok') }}
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-icon
          v-if="timeIndex !== 0"
          class="color-grey-dark"
          @click="setTimeIndex(-1)"
        >
          mdi-chevron-right
        </v-icon>
      </div>
    </v-col>

    <v-col
      v-if="interval === 'selection'"
      cols="12"
      sm="4"
      md="3"
      :class="'mx-auto ' + (sticky || mobile ? 'pa-0' : '')"
    >
      <div
        :class="
          'd-flex align-center justify-center ' +
            (sticky ? 'mt-3' : 'mr-3 mr-sm-0')
        "
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="datesCopy"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              :rules="requiredRules"
              :label="!sticky ? $t('period') : null"
              prepend-icon="mdi-calendar"
              class="date-picker"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="datesCopy"
            :first-day-of-week="1"
            :locale="locale"
            range
            no-title
            scrollable
            @change="checkDateOrder($event), saveDates(datesCopy)"
          >
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="menu = false">
              {{ $t('Cancel') }}
            </v-btn>
            <v-btn
              :disabled="invalidDates(datesCopy)"
              text
              color="secondary"
              @click="$refs.menu.save(datesCopy), loadData()"
            >
              {{ $t('ok') }}
            </v-btn>
          </v-date-picker>
        </v-menu>
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
    timeIndex: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      modal: false,
      menu: false,
      selectedDateCopy: '',
      datesCopy: [],
    }
  },
  computed: {
    ...mapGetters('devices', ['devices']),
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    requiredRules() {
      var laterEndDate = true
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
    checkDateOrder(dates) {
      if (dates[1] < dates[0]) {
        this.datesCopy = [dates[1], dates[0]]
      }
    },
    invalidDates(dates) {
      return (
        (dates.length === 2 && dates[0] > dates[1]) ||
        dates[0] === dates[1] ||
        dates.length === 1
      )
    },
    loadData() {
      this.$emit('load-data')
    },
    saveDates(dates) {
      this.$emit('save-dates', dates)
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

<style lang="scss"></style>
