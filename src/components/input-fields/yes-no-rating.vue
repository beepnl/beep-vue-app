<template>
  <div>
    <div>
      <v-btn
        :class="`yes-no-button pr-2 pl-0 ${yesRed ? 'yes-red' : ''}`"
        text
        @click="updateObject(1, property)"
      >
        <v-icon
          left
          :class="
            object[property] === 1 || object[property] === '1'
              ? 'green--text'
              : 'color-grey'
          "
          >mdi-check-circle</v-icon
        >
        {{ $t('yes') }}
      </v-btn>
      <v-btn
        :class="`yes-no-button px-2 ${yesRed ? 'yes-red' : ''}`"
        text
        @click="updateObject(0, property)"
      >
        <v-icon
          left
          :class="
            object[property] === 0 || object[property] === '0'
              ? 'red--text'
              : 'color-grey'
          "
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
    object: {
      type: Object,
      required: true,
    },
    property: {
      type: [String, Number],
      required: true,
    },
    yesRed: {
      type: Boolean,
      required: false,
      default: false,
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

  &.yes-red {
    .green--text {
      color: $color-red !important;
    }
    .red--text {
      color: $color-green !important;
    }
  }
}
</style>
