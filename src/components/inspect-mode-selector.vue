<template>
  <!-- <div class="d-flex justify-start align-center">
              <div class="d-flex flex-column">
                <div
                  class="beep-label mt-n3 mt-sm-0"
                  v-text="$t('Select_inspection_mode')"
                ></div>
                <Treeselect
                  v-model="setSelectedMode"
                  :options="selectModes"
                  :clearable="false"
                  @input="switchMode($event)"
                />
                <p v-if="offlineMode" class="info-text mt-1">
                  <em>{{ $t('Offline_inspection_exp') }}</em>
                </p>
              </div>
                          </div>
              -->
  <div class="d-flex justify-end">
    <template v-for="(btn, b) in modeButtons">
      <div
        v-if="btn.if"
        :key="'mode-' + b"
        :class="
          'rounded-border primary-border mode-box mb-2 d-flex flex-column align-center cursor-pointer ' +
            (showInfo.length === 0 ? 'justify-center ' : '') +
            btn.class
        "
        @click="setSelectedMode = btn.mode"
      >
        <div class="d-flex align-center">
          <v-icon v-if="mobile" class="mr-2 no-print" color="accent">
            {{ btn.icon }}
          </v-icon>
          <span class="font-xsmall text-center"
            >{{ btn.text
            }}<v-icon
              v-if="touchDevice"
              class="mdi mdi-information ml-1 icon-info"
              dark
              small
              color="accent"
              @click.stop="toggleShowInfo(btn.mode)"
            ></v-icon
          ></span>
        </div>
        <span
          v-if="touchDevice && showInfo.includes(btn.mode)"
          class="font-xsmall text-center mt-1"
          v-text="btn.tooltip"
        ></span>
        <v-tooltip v-if="!mobile" bottom max-width="300px">
          <template v-slot:activator="{ on }">
            <v-icon
              large
              class="ma-2 no-print"
              color="accent"
              v-on="on"
              @click="setSelectedMode = btn.mode"
            >
              {{ btn.icon }}
            </v-icon>
          </template>
          <span class="no-print">{{ btn.tooltip }}</span>
        </v-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    selectedMode: {
      type: String,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      showInfo: [],
    }
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    modeButtons() {
      return [
        {
          if: !this.uploadMode,
          mode: 'Upload',
          text: this.$i18n.t('Upload_inspection'),
          tooltip: this.$i18n.t('Upload_inspection_exp'),
          class: '',
          icon: 'mdi-camera-plus',
        },
        {
          if: !this.onlineMode,
          mode: 'Online',
          text: this.$i18n.t('Online_inspection'),
          tooltip: this.$i18n.t('Online_inspection_exp'),
          class: this.uploadMode ? '' : 'ml-2',
          icon: 'mdi-laptop',
        },
        {
          if: !this.offlineMode,
          mode: 'Offline',
          text: this.$i18n.t('Offline_inspection'),
          tooltip: this.$i18n.t('Offline_inspection_exp'),
          class: 'ml-2',
          icon: 'mdi-printer',
        },
      ]
    },
    offlineMode() {
      return this.selectedMode === 'Offline'
    },
    onlineMode() {
      return this.selectedMode === 'Online'
    },
    setSelectedMode: {
      get() {
        return this.selectedMode
      },
      set(value) {
        this.$emit('set-selected-mode', value)
      },
    },
    touchDevice() {
      return (
        window.matchMedia('(hover: none)').matches ||
        this.$vuetify.breakpoint.mobile
      )
    },
    uploadMode() {
      return this.selectedMode === 'Upload'
    },
  },
  methods: {
    toggleShowInfo(mode) {
      if (!this.showInfo.includes(mode)) {
        this.showInfo.push(mode)
      } else {
        this.showInfo.splice(this.showInfo.indexOf(mode), 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mode-box {
  width: 130px;
  min-height: 90px;
  @include for-phone-only {
    width: calc(50% - 4px);
    min-height: 50px;
  }
}
</style>
