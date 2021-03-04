<template>
  <div>
    <div>
      <v-btn
        :class="
          `yes-no-button pl-0 ${yesRed ? 'yes-red' : ''} ${
            small ? 'yes-no-button--small pr-0' : 'pr-2'
          }`
        "
        :disabled="disabled"
        text
        @click="updateObject(1, property)"
      >
        <v-icon
          left
          :class="
            object[property] === 1 || object[property] === true
              ? 'green--text'
              : 'color-grey'
          "
          >mdi-check-circle</v-icon
        >
        {{ $t('yes') }}
      </v-btn>
      <v-btn
        :class="
          `yes-no-button ${yesRed ? 'yes-red' : ''} ${
            small ? 'yes-no-button--small px-0' : 'px-2'
          }`
        "
        :disabled="disabled"
        text
        @click="updateObject(0, property)"
      >
        <v-icon
          left
          :class="
            object[property] === 0 || object[property] === false
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    yesRed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    updateObject(value, property) {
      if (this.object[property] === value) {
        this.object[property] = null // allow to toggle if value has been set already
      } else {
        this.object[property] = value
      }
      this.setInspectionEdited(true)
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

  &.yes-no-button--small {
    height: auto !important;
    font-size: 12px !important;
  }
}
</style>
