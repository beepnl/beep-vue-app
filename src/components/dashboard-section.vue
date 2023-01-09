<template>
  <div class="dashboard-section">
    <div
      v-if="!landscapeMode"
      class="text-h4 text-md-h2 dashboard-section-title"
      v-text="title"
    ></div>
    <div class="d-flex flex-column align-center mt-2 dashboard-section-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
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
  methods: {
    getMap(callback) {
      const parent = this.$parent
      function checkForMap() {
        if (parent.ready && parent.map) callback(parent.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-section {
  text-align: center;
  margin-bottom: 20px;
  @include for-desktop-up {
    margin-bottom: 40px;
  }
  @include for-tablet-landscape-up {
    margin-bottom: 30px;
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
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.4),
      rgba(36, 36, 36, 1)
    );
    // background: linear-gradient(to right, #fff, rgba(242, 145, 0, 0.7));
    margin-right: 12px;
    @include for-tablet-landscape-up {
      margin-right: 24px;
    }
  }

  &::after {
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.4),
      rgba(36, 36, 36, 1)
    );
    // background: linear-gradient(to left, #fff, rgba(242, 145, 0, 0.7));
    margin-left: 12px;
    @include for-tablet-landscape-up {
      margin-left: 24px;
    }
  }
}

.dashboard-section-content {
  overflow: hidden;
  width: 100%;
}
</style>
