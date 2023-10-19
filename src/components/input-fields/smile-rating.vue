<template>
  <div>
    <div class="smile-wrapper d-flex align-center ml-1">
      <v-icon
        :class="`${object[property] === 1 ? 'red--text' : 'color-grey'} mr-3`"
        @click="updateObject(1, property)"
      >
        mdi-emoticon-sad
      </v-icon>
      <v-icon
        :class="
          `${object[property] === 2 ? 'orange--text' : 'color-grey'} mr-3`
        "
        @click="updateObject(2, property)"
      >
        mdi-emoticon-neutral
      </v-icon>
      <v-icon
        :class="`${object[property] === 3 ? 'green--text' : 'color-grey'} mr-3`"
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
.smile-wrapper {
  height: 30px !important;
}
</style>
