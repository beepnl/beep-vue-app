<template>
  <div>
    <div>
      <v-btn
        :class="
          `yes-no-button mr-1 pl-0 ${yesRed ? 'yes-red' : ''} ${
            small ? 'yes-no-button--small pr-0' : 'pr-2'
          }`
        "
        :disabled="disabled"
        variant="text"
        @click="updateObject(1)"
      >
        <template v-slot:prepend>
          <v-icon
            end
            :class="
              object[property] === 1 || object[property] === true
                ? 'text-green'
                : 'color-grey'
            "
            >mdi-check-circle</v-icon
          >
        </template>
        {{ $t('yes') }}
      </v-btn>
      <v-btn
        :class="
          `yes-no-button pl-0 ${yesRed ? 'yes-red' : ''} ${
            small ? 'yes-no-button--small pr-0' : 'pr-2'
          }`
        "
        :disabled="disabled"
        variant="text"
        @click="updateObject(0)"
      >
        <template v-slot:prepend>
          <v-icon
            end
            :class="
              object[property] === 0 || object[property] === false
                ? 'text-red'
                : 'color-grey'
            "
            >mdi-close-circle</v-icon
          >
        </template>
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
    updateObject(value) {
      if (this.object[this.property] === value) {
        this.object[this.property] = null // allow to toggle if value has been set already
      } else {
        this.object[this.property] = value
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
    .text-green {
      color: $color-red !important;
    }
    .text-red {
      color: $color-green !important;
    }
  }

  &.yes-no-button--small {
    height: auto !important;
    font-size: 12px !important;
  }
}
</style>
