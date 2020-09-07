<template>
  <div>
    <div class="beep-label" v-text="`${$t(label)}`"></div>

    <div>
      <v-btn class="yes-no-button px-2" text @click="updateObject(1, property)">
        <v-icon
          left
          :class="object[property] === 1 ? 'green--text' : 'color-grey'"
          >mdi-check-circle</v-icon
        >
        {{ $t('yes') }}
      </v-btn>
      <v-btn class="yes-no-button px-2" text @click="updateObject(0, property)">
        <v-icon
          left
          :class="object[property] === 0 ? 'red--text' : 'color-grey'"
          >mdi-close-circle</v-icon
        >
        {{ $t('no') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    property: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    updateObject(value, property) {
      if (this.object[property] === value) {
        this.object[property] = null // allow to toggle if value has been set already
      } else {
        this.object[property] = value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.yes-no-button {
  height: 30px !important;
}
</style>
