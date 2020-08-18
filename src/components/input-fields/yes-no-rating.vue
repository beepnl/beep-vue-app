<template>
  <div>
    <div class="beep-label" v-text="`${$t(label)}`"></div>
    <div>
      <v-btn class="yes-no-button px-2" text @click="updateObject(1, property)">
        <v-icon
          left
          :class="objectName[property] === 1 ? 'green--text' : 'color-grey'"
          >mdi-check-circle</v-icon
        >
        {{ $t('yes') }}
      </v-btn>
      <v-btn class="yes-no-button px-2" text @click="updateObject(0, property)">
        <v-icon
          left
          :class="objectName[property] === 0 ? 'red--text' : 'color-grey'"
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
    objectName: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
  },

  methods: {
    updateObject: function(value) {
      this.$emit('update-object', value)
    },
  },
}
</script>
