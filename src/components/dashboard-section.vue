<template>
  <v-col class="dashboard-section" :cols="cols">
    <div
      class="text-h4 text-md-h2 dashboard-section-title"
      v-text="title"
    ></div>
    <div class="d-flex flex-column align-center mt-2">
      <slot></slot>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    cols: {
      type: Number,
      required: false,
      default: 12,
    },
    landscapeMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-section {
  text-align: center !important;
  margin-bottom: 20px;
  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }
}

.dashboard-section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  @include for-tablet-landscape-up {
    margin-bottom: 40px;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 1px;
    min-width: 18vw;
  }

  &::before {
    background: linear-gradient(to right, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to right, #fff, rgba(242, 145, 0, 0.7));
    margin-right: 12px;
    @include for-tablet-landscape-up {
      margin-right: 24px;
    }
  }

  &::after {
    background: linear-gradient(to left, #fff, rgba(36, 36, 36, 0.7));
    // background: linear-gradient(to left, #fff, rgba(242, 145, 0, 0.7));
    margin-left: 12px;
    @include for-tablet-landscape-up {
      margin-left: 24px;
    }
  }
}
</style>
