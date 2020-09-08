<template>
  <div>
    <v-slider
      v-if="item.input === 'score_amount'"
      v-model="object[item.id]"
      :tick-labels="severityLevels"
      track-color="#ccc"
      max="4"
      step="1"
      ticks="always"
      tick-size="4"
    >
      <template v-slot:thumb-label="props">
        <v-icon dark :color="severityColors[props.value]">
          {{ severityIcons[props.value] }}
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
    severityLevels: ['', 'Laag', 'Gemiddeld', 'Hoog', 'Extreem'],
    severityIcons: [
      'mdi-arrow-right',
      'mdi-gauge-empty',
      'mdi-gauge-low',
      'mdi-gauge',
      'mdi-gauge-full',
    ],
    severityColors: ['#CCC', '#069518', '#243D80', '#5F3F90', '#8F1619'],
  }),
}
</script>

<style lang="scss" scoped></style>
