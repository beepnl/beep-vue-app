<template>
  <div>
    <v-slider
      v-if="item.input === 'grade'"
      class="slider--default"
      :value="getValue(item.id, 'grade')"
      :tick-labels="gradeText"
      track-color="#b0b0b0"
      min="0"
      max="10"
      step="1"
      ticks="always"
      tick-size="4"
      @change="updateValue($event, item.id, 'grade')"
    >
      <template v-slot:thumb-label="props">
        <span dark :color="gradeColors(props.value)">
          {{ props.value }}
        </span>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'number_degrees'"
      :class="`slider--big-label ${inputProvided ? '' : 'slider--default'}`"
      :value="getValue(item.id, 'number_degrees')"
      thumb-label="always"
      track-color="#b0b0b0"
      track-fill-color="#b0b0b0"
      :thumb-size="28"
      min="-180"
      max="180"
      step="1"
      @change="updateValue($event, item.id, 'number_degrees')"
    >
      <template v-slot:thumb-label="props">
        {{ props.value + '°' }}
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'number_percentage'"
      class="slider--big-label slider--number-percentage"
      :value="getValue(item.id, 'number_percentage')"
      thumb-label="always"
      track-color="#b0b0b0"
      :thumb-size="28"
      min="-1"
      max="100"
      step="1"
      @change="updateValue($event, item.id, 'number_percentage')"
    >
      <template v-slot:thumb-label="props">
        {{ props.value + '%' }}
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'score_amount'"
      v-model="object[item.id]"
      class="slider--default"
      :tick-labels="scoreAmountLevels"
      track-color="#b0b0b0"
      :thumb-size="24"
      max="4"
      step="1"
      ticks="always"
      tick-size="4"
    >
      <template v-slot:thumb-label="props">
        <v-icon dark :color="scoreAmountColors[props.value]">
          {{ scoreAmountIcons[props.value] }}
        </v-icon>
      </template>
    </v-slider>

    <v-slider
      v-if="item.input === 'score_quality'"
      v-model="object[item.id]"
      class="slider--default"
      :tick-labels="scoreQualityLevels"
      track-color="#b0b0b0"
      :thumb-size="24"
      max="4"
      step="1"
      ticks="always"
      tick-size="4"
    >
      <template v-slot:thumb-label="props">
        <v-icon dark :color="scoreQualityColors[props.value]">
          mdi-checkbox-blank-circle
        </v-icon>
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
    inputProvided: false,
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
    gradeText() {
      return [
        '-',
        this.$i18n.t('Poor'),
        '',
        '',
        '',
        this.$i18n.t('Average'),
        '',
        '',
        '',
        '',
        this.$i18n.t('Excellent'),
      ]
    },
    scoreAmountLevels() {
      return [
        '-',
        this.$i18n.t('Low'),
        this.$i18n.t('Medium'),
        this.$i18n.t('High'),
        this.$i18n.t('Extreme'),
      ]
    },
    scoreQualityLevels() {
      return [
        '-',
        this.$i18n.t('Poor'),
        this.$i18n.t('Fair'),
        this.$i18n.t('Good'),
        this.$i18n.t('Excellent'),
      ]
    },
  },
  methods: {
    getValue(id, inputtype) {
      const value = this.object[id]
      if (inputtype === 'number_percentage') {
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
      return '#F29100'
    },
    updateValue(value, id, inputtype) {
      if (inputtype === 'number_percentage') {
        if (value === -1) {
          value = null
        }
      } else if (inputtype === 'number_degrees') {
        if (value === null) {
          return null
        } else {
          this.inputProvided = true
        }
      } else {
        if (value === 0) {
          value = null
        }
      }
      this.object[id] = value
    },
  },
}
</script>

<style lang="scss"></style>
