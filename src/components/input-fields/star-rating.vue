<template>
  <div>
    <div class="star-wrapper d-flex flex-row flex-wrap">
      <v-icon
        v-for="star in [0, 1, 2, 3, 4]"
        :key="star + 1"
        :class="star < object[property] ? 'primary--text' : 'color-grey-medium'"
        @click="updateObject(star + 1, property)"
        >mdi-star</v-icon
      >
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

<style lang="scss" scoped></style>
