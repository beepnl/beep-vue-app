<template>
  <div>
    <div class="beep-label">
      {{ $t(label) }}
      <a v-if="description !== null"
        ><v-icon
          class="mdi mdi-information ml-1 icon-info"
          dark
          small
          color="primary"
          @click="showDescription = !showDescription"
        ></v-icon
      ></a>
    </div>

    <p v-if="description" class="inspection-item-description">
      <em v-if="description !== null && showDescription"
        >{{ description }}<br
      /></em>
    </p>

    <div class="star-wrapper d-flex flex-row flex-wrap hide-on-mobile">
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
    description: {
      type: String,
      required: false,
      default: null,
    },
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
  data: function() {
    return {
      showDescription: false,
    }
  },
  methods: {
    updateObject(value, property) {
      console.log(value, property)
      if (this.object[property] === value) {
        this.object[property] = null // allow to toggle if value has been set already
      } else {
        this.object[property] = value
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
