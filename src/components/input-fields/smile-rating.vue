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

    <p class="inspection-item-description">
      <em v-if="description !== null && showDescription"
        >{{ description }}<br
      /></em>
    </p>

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
.smile-wrapper {
  height: 30px !important;
}
</style>
