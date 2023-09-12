<template>
  <v-row :class="printMode ? 'ma-0' : 'mt-3 mx-0'">
    <v-col v-if="waiting || moreWaiting" class="mt-n16" cols="12">
      <v-container>
        <div class="loading">
          <v-progress-circular size="50" color="primary" indeterminate />
          <span
            class="ma-3 font-weight-bold accent--text"
            v-text="$t('Generating_svg_be_patient')"
          ></span>
        </div>
      </v-container>
    </v-col>

    <v-col
      v-if="!(waiting || moreWaiting) && svgWarnings.length > 0 && !printMode"
      cols="12"
    >
      <v-row class="mx-0">
        <v-col cols="12" class="svg-warnings no-print">
          <v-alert
            v-for="(svgWarning, index) in svgWarnings"
            :key="'w-' + index"
            type="error"
            text
            prominent
            dense
            dismissible
            color="red"
            class="mb-2"
          >
            {{ svgWarning.warning }}
          </v-alert>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" :class="!printMode ? '' : 'pa-0'">
      <OfflineInspectionSvg
        v-if="!waiting"
        :selected-checklist="selectedChecklist"
        :checklist-svg-already-saved="checklistSvgAlreadySaved"
        :checklist-svg-different-app-version="checklistSvgDifferentAppVersion"
        :checklist-svg-id="checklistSvgId"
        :new-svg-name="newSvgName"
        :print-mode="printMode"
        :total-pages="totalPages"
        @done-loading="moreWaiting = false"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    OfflineInspectionSvg: () =>
      import('@components/offline-inspection-svg.vue'),
  },
  props: {
    selectedChecklist: {
      type: Object,
      default: null,
      required: true,
    },
    checklistSvgAlreadySaved: {
      type: Object,
      default: null,
      required: false,
    },
    checklistSvgDifferentAppVersion: {
      type: Boolean,
      default: false,
    },
    checklistSvgId: {
      type: Number,
      default: null,
      required: false,
    },
    newSvgName: {
      type: String,
      default: null,
      required: false,
    },
    printMode: {
      type: Boolean,
      default: false,
    },
    totalPages: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  data() {
    return {
      svgLoading: true,
      waiting: true,
      moreWaiting: true, // stop showing loading div only when svg component has been mounted
    }
  },
  computed: {
    ...mapGetters('inspections', ['svgWarnings']),
  },
  watch: {
    moreWaiting() {
      console.log(this.moreWaiting ? 'waiting...' : 'waiting done!')
      this.$emit('svg-ready', !this.moreWaiting)
    },
    selectedChecklist() {
      console.log('checklist changed')
      this.waiting = true
      this.moreWaiting = true

      // this.$store.commit('inspections/resetSvgStates')
      // this.moreWaiting = true
      // setTimeout(() => {
      //   this.waiting = false
      // }, 1000) // wait for svg states to be reset, then allow svg component to re-render

      this.resetSvgStates().then(() => {
        setTimeout(() => {
          this.waiting = false
        }, 400) // timeout not strictly necessary but gives better UI as it is more clear the svg has been updated after the loading icon was shown
      })
    },
  },
  mounted() {
    this.waiting = false // start rendering svg once component is mounted (otherwise component won't be rendered until child svg component is done)
  },
  methods: {
    async resetSvgStates() {
      this.$store.commit('inspections/resetSvgStates')

      await this.$nextTick().then(() => {
        return true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.svg-warnings {
  max-width: 210mm;
  padding: 0;
}
</style>
