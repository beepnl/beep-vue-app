<template>
  <div>
    <v-slider
      v-if="item.input === 'score_amount'"
      v-model="object[item.id]"
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

    <v-slider
      v-if="item.input === 'number_percentage'"
      class="slider-percentage"
      :value="getPercentage(item.id)"
      thumb-label="always"
      track-color="#b0b0b0"
      :thumb-size="28"
      min="-1"
      max="100"
      step="1"
      @change="updatePercentage($event, item.id)"
    >
      <template v-slot:thumb-label="props">
        {{ props.value + '%' }}
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
    getPercentage(id) {
      const value = this.object[id]
      if (value === null || value === -1) {
        return -1
      }
    },
    updatePercentage(value, property) {
      if (value === -1) {
        value = null
      }
      this.object[property] = value
    },
  },
}
</script>

<style lang="scss"></style>
