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
        class="rounded-border primary-border mode-box ml-2 mb-2 d-flex flex-column align-center"
        @click="setSelectedMode = btn.mode"
      >
        <span class="font-xsmall mb-2" v-text="btn.text"></span>
        <v-tooltip bottom max-width="300px">
          <template v-slot:activator="{ on }">
            <v-icon
              large
              :class="'no-print ' + btn.class"
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
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
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
          class: '',
          icon: 'mdi-laptop',
        },
        {
          if: !this.offlineMode,
          mode: 'Offline',
          text: this.$i18n.t('Offline_inspection'),
          tooltip: this.$i18n.t('Offline_inspection_exp'),
          class: '',
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
    uploadMode() {
      return this.selectedMode === 'Upload'
    },
  },
}
</script>

<style lang="scss" scoped>
.mode-box {
  width: 120px;
  height: 90px;
}
</style>
