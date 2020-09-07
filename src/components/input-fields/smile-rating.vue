<template>
  <div>
    <div class="beep-label" v-text="`${$t(label)}`"></div>
    <div class="smile-wrapper d-flex align-center">
      <v-icon
        :class="`${object[property] === 1 ? 'red--text' : 'color-grey'} mr-2`"
        @click="updateObject(1, property)"
      >
        mdi-emoticon-sad
      </v-icon>
      <v-icon
        :class="
          `${object[property] === 2 ? 'orange--text' : 'color-grey'} mr-2`
        "
        @click="updateObject(2, property)"
      >
        mdi-emoticon-neutral
      </v-icon>
      <v-icon
        :class="`${object[property] === 3 ? 'green--text' : 'color-grey'} mr-2`"
        @click="updateObject(3, property)"
      >
        mdi-emoticon-happy
      </v-icon>
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

<style lang="scss" scoped>
.smile-wrapper {
  height: 30px !important;
}
</style>
