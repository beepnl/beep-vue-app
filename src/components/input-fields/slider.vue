<template>
  <div>
    <v-slider
      v-if="item.input === 'grade'"
      class="slider--default slider--grade"
      :value="getValue(item.id, item.input)"
      :tick-labels="gradeTicks"
      track-color="#b0b0b0"
      min="0"
      max="10"
      step="1"
      ticks="always"
      tick-size="4"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        <span dark :color="gradeColors(props.value)">
          {{ props.value }}
        </span>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'number_degrees'"
      :class="
        `slider--big-label ${inputProvided(item.id) ? '' : 'slider--default'}`
      "
      :value="getValue(item.id, item.input)"
      :tick-labels="numberDegreeTicks"
      thumb-label="always"
      :track-color="inputProvided(item.id) ? '#F8B133' : '#b0b0b0'"
      :track-fill-color="inputProvided(item.id) ? '#F8B133' : '#b0b0b0'"
      thumb-size="28"
      tick-size="0"
      min="-180"
      max="180"
      step="1"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        {{ props.value + '°' }}
      </template>

      <!-- reset value to null (this way '0' is a valid input) -->
      <template v-slot:append>
        <v-icon
          v-if="inputProvided(item.id)"
          class="mt-6 clear-icon"
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
      :value="getValue(item.id, item.input)"
      :tick-labels="numberPercentageTicks"
      thumb-label="always"
      track-color="#b0b0b0"
      thumb-size="28"
      tick-size="0"
      min="-1"
      max="100"
      step="1"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        {{ props.value + '%' }}
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'score_amount'"
      :value="getValue(item.id, item.input)"
      class="slider--default slider--score-amount"
      :tick-labels="scoreAmountTicks"
      track-color="#b0b0b0"
      thumb-size="24"
      max="4"
      step="1"
      ticks="always"
      tick-size="4"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        <v-icon dark :color="scoreAmountColors[props.value]">
          {{ scoreAmountIcons[props.value] }}
        </v-icon>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'score_quality'"
      :value="getValue(item.id, item.input)"
      class="slider--default slider--score-quality"
      :tick-labels="scoreQualityTicks"
      track-color="#b0b0b0"
      thumb-size="24"
      max="4"
      step="1"
      ticks="always"
      tick-size="4"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        <v-icon dark :color="scoreQualityColors[props.value]">
          mdi-checkbox-blank-circle
        </v-icon>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'slider'"
      class="slider--big-label slider--number-percentage"
      :value="getValue(item.id, item.input)"
      :tick-labels="sliderTicks"
      thumb-label="always"
      track-color="#b0b0b0"
      thumb-size="28"
      tick-size="0"
      min="-1"
      max="100"
      step="1"
      @change="updateValue($event, item.id, item.input)"
    >
      <template v-slot:thumb-label="props">
        {{ props.value }}
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
  data: () => ({
    scoreAmountIcons: [
      'mdi-minus',
      'mdi-gauge-empty',
      'mdi-gauge-low',
      'mdi-gauge',
      'mdi-gauge-full',
    ],
    scoreAmountColors: ['#b0b0b0', '#069518', '#243D80', '#5F3F90', '#8F1619'],
    scoreQualityColors: ['#b0b0b0', '#8F1619', '#5F3F90', '#243D80', '#069518'],
  }),
  computed: {
    gradeTicks() {
      var ticksArray = []
      for (var i = 0; i <= 10; i++) {
        if (i === 0) {
          ticksArray.push('-')
        } else if (i === 1) {
          ticksArray.push(this.$i18n.t('Poor'))
        } else if (i === 5) {
          ticksArray.push(this.$i18n.t('Average_slider'))
        } else if (i === 10) {
          ticksArray.push(this.$i18n.t('Excellent'))
        } else {
          ticksArray.push('')
        }
      }
      return ticksArray
    },
    numberDegreeTicks() {
      var ticksArray = []
      for (var i = -180; i <= 180; i++) {
        if (i === 0) {
          ticksArray.push('0°')
        } else if (i === -180) {
          ticksArray.push('-180°')
        } else if (i === 180) {
          ticksArray.push('180°')
        } else {
          ticksArray.push('')
        }
      }
      return ticksArray
    },
    numberPercentageTicks() {
      var ticksArray = []
      for (var i = -1; i <= 100; i++) {
        if (i === 25) {
          ticksArray.push('25%')
        } else if (i === 50) {
          ticksArray.push('50%')
        } else if (i === 75) {
          ticksArray.push('75%')
        } else if (i === 100) {
          ticksArray.push('100%')
        } else {
          ticksArray.push('')
        }
      }
      return ticksArray
    },
    scoreAmountTicks() {
      return [
        '-',
        this.$i18n.t('Low'),
        this.$i18n.t('Medium'),
        this.$i18n.t('High'),
        this.$i18n.t('Extreme'),
      ]
    },
    scoreQualityTicks() {
      return [
        '-',
        this.$i18n.t('Poor'),
        this.$i18n.t('Fair'),
        this.$i18n.t('Good'),
        this.$i18n.t('Excellent'),
      ]
    },
    sliderTicks() {
      var ticksArray = []
      for (var i = -1; i <= 100; i++) {
        if (i === 0) {
          ticksArray.push('0')
        } else if (i === 100) {
          ticksArray.push('100')
        } else {
          ticksArray.push('')
        }
      }
      return ticksArray
    },
  },
  methods: {
    clearValue(id) {
      this.object[id] = null
    },
    getValue(id, inputtype) {
      const value = this.object[id]
      if (inputtype === 'number_percentage' || inputtype === 'slider') {
        if (value === null || value === -1) {
          return -1
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
    gradeColors(value) {
      if (value === 0) return '#CCC'
      if (value < 4) return '#8F1619'
      if (value < 6) return '#5F3F90'
      if (value < 8) return '#243D80'
      if (value < 11) return '#069518'
      return '#F8B133'
    },
    inputProvided(id) {
      if (this.object[id] === null) {
        return false
      }
      return true
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    updateValue(value, id, inputtype) {
      if (inputtype === 'number_percentage' || inputtype === 'slider') {
        if (value === -1) {
          value = null
        }
      } else if (inputtype === 'number_degrees') {
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
      this.object[id] = value
    },
  },
}
</script>

<style lang="scss" scoped>
.clear-icon {
  cursor: pointer;
}
</style>
