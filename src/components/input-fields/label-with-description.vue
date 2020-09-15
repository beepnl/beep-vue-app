<template>
  <div>
    <div class="beep-label">
      {{ label }}
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
  },
  data: function() {
    return {
      showDescription: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.inspection-item-description {
  margin-bottom: 4px;
  font-size: 0.75rem !important;
  line-height: 1.5;
}
</style>
