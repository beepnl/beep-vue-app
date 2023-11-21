<template>
  <div>
    <v-slider
      v-if="item.input === 'grade'"
      class="slider--default slider--grade"
      :model-value="getValue(item.id, item.input)"
      :ticks="gradeTicks"
      :thumb-label="inputProvided"
      track-color="#b0b0b0"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      min="0"
      max="10"
      step="1"
      show-ticks="always"
      tick-size="4"
      @update:model-value="updateValue($event)"
    >
    </v-slider>

    <v-slider
      v-if="item.input === 'number_degrees'"
      :class="`slider--big-label ${inputProvided ? '' : 'slider--default'}`"
      :model-value="getValue(item.id, item.input)"
      :ticks="numberDegreeTicks"
      :thumb-label="inputProvided"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      track-color="#b0b0b0"
      tick-size="0"
      min="-180"
      max="180"
      step="1"
      @update:model-value="updateValue($event)"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ modelValue + '°' }}
      </template>

      <!-- reset value to null (this way '0' is a valid input) -->
      <template v-slot:append>
        <v-icon
          v-if="inputProvided"
          class="clear-icon"
          color="accent"
          @click="clearValue(item.id)"
          >mdi-close</v-icon
        >
        <v-spacer v-else style="width: 24px;"></v-spacer>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'number_percentage'"
      class="slider--big-label slider--number-percentage"
      :model-value="getValue(item.id, item.input)"
      :ticks="numberPercentageTicks"
      :thumb-label="inputProvided"
      track-color="#b0b0b0"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      tick-size="0"
      min="0"
      max="100"
      step="1"
      @update:model-value="updateValue($event)"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ modelValue + '%' }}
      </template>

      <!-- reset value to null (this way '0' is a valid input) -->
      <template v-slot:append>
        <v-icon
          v-if="inputProvided"
          class="clear-icon"
          color="accent"
          @click="clearValue(item.id)"
          >mdi-close</v-icon
        >
        <v-spacer v-else style="width: 24px;"></v-spacer>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'score_amount'"
      :model-value="getValue(item.id, item.input)"
      class="slider--default slider--score-amount"
      :ticks="scoreAmountTicks"
      track-color="#b0b0b0"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      max="4"
      step="1"
      show-ticks="always"
      tick-size="4"
      @update:model-value="updateValue($event)"
    >
    </v-slider>

    <v-slider
      v-if="item.input === 'score_quality'"
      :model-value="getValue(item.id, item.input)"
      class="slider--default slider--score-quality"
      :ticks="scoreQualityTicks"
      track-color="#b0b0b0"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      max="4"
      step="1"
      show-ticks="always"
      tick-size="4"
      @update:model-value="updateValue($event)"
    >
    </v-slider>

    <v-slider
      v-if="item.input === 'slider'"
      class="slider--big-label slider--number-percentage"
      :model-value="getValue(item.id, item.input)"
      :ticks="sliderTicks"
      :thumb-label="inputProvided"
      track-color="#b0b0b0"
      :color="inputProvided ? '#F8B133' : '#b0b0b0'"
      tick-size="0"
      min="0"
      max="100"
      step="1"
      @update:model-value="updateValue($event)"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ modelValue }}
      </template>

      <!-- reset value to null (this way '0' is a valid input) -->
      <template v-slot:append>
        <v-icon
          v-if="inputProvided"
          class="clear-icon"
          color="accent"
          @click="clearValue(item.id)"
          >mdi-close</v-icon
        >
        <v-spacer v-else style="width: 24px;"></v-spacer>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
  },
  computed: {
    gradeTicks() {
      const ticksObject = {}
      for (let i = 0; i <= 10; i++) {
        if (i === 0) {
          ticksObject[i] = '-'
        } else if (i === 1) {
          ticksObject[i] = this.$i18n.t('Poor')
        } else if (i === 5) {
          ticksObject[i] = this.$i18n.t('Average_slider')
        } else if (i === 10) {
          ticksObject[i] = this.$i18n.t('Excellent')
        } else {
          ticksObject[i] = ''
        }
      }
      return ticksObject
    },
    inputProvided() {
      return this.object[this.item.id] !== null
    },
    numberDegreeTicks() {
      const ticksObject = {}
      for (let i = -180; i <= 180; i++) {
        if (i === 0) {
          ticksObject[i] = '0°'
        } else if (i === -180) {
          ticksObject[i] = '-180°'
        } else if (i === 180) {
          ticksObject[i] = '180°'
        } else {
          ticksObject[i] = ''
        }
      }
      return ticksObject
    },
    numberPercentageTicks() {
      const ticksObject = {}
      for (let i = 0; i <= 100; i++) {
        if (i === 25) {
          ticksObject[i] = '25%'
        } else if (i === 50) {
          ticksObject[i] = '50%'
        } else if (i === 75) {
          ticksObject[i] = '75%'
        } else if (i === 100) {
          ticksObject[i] = '100%'
        } else {
          ticksObject[i] = ''
        }
      }
      return ticksObject
    },
    scoreAmountTicks() {
      return {
        0: '-',
        1: this.$i18n.t('Low'),
        2: this.$i18n.t('Medium'),
        3: this.$i18n.t('High'),
        4: this.$i18n.t('Extreme'),
      }
    },
    scoreQualityTicks() {
      return {
        0: '-',
        1: this.$i18n.t('Poor'),
        2: this.$i18n.t('Fair'),
        3: this.$i18n.t('Good'),
        4: this.$i18n.t('Excellent'),
      }
    },
    sliderTicks() {
      const ticksObject = {}
      for (let i = 0; i <= 100; i++) {
        if (i === 0) {
          ticksObject[i] = '0'
        } else if (i === 100) {
          ticksObject[i] = '100'
        } else {
          ticksObject[i] = ''
        }
      }
      return ticksObject
    },
  },
  methods: {
    clearValue(id) {
      this.object[id] = null
    },
    getValue(id, inputtype) {
      const value = this.object[id]
      if (inputtype === 'number_percentage' || inputtype === 'slider') {
        if (value === null || value === 0) {
          return 0
        }
      } else if (inputtype === 'number_degrees') {
        if (value === null) {
          return null
        }
      } else {
        if (value === null) {
          return 0
        }
      }
      return value
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    updateValue(value) {
      const inputtype = this.item.input
      if (inputtype === 'number_degrees') {
        if (value === null) {
          value = null
        }
      } else if (
        inputtype === 'score_amount' ||
        inputtype === 'score_quality'
      ) {
        if (value === null || value === 0) {
          value = null
        }
      } else {
        if (value === 0) {
          value = null
        }
      }
      this.setInspectionEdited(true)
      this.object[this.item.id] = value
    },
  },
}
</script>

<style lang="scss" scoped>
.clear-icon {
  cursor: pointer;
}
</style>
