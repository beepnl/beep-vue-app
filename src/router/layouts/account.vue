<template>
  <div>
    <div id="beeBox">
      <div
        v-for="bee in nrOfBees"
        :id="'bee' + bee"
        :key="'b' + bee"
        :class="(mobile ? 'bee--mobile' : '') + (darkMode ? ' bee--light' : '')"
      ></div>
    </div>
    <v-card class="account-card d-flex flex-column align-center">
      <div v-if="!dashboardMode" class="mt-4">
        <a href="/"
          ><img
            v-cloak
            class="account-logo ml-n1"
            :src="assetsUrl + '/img/beep-icon-logo.svg'"
        /></a>
      </div>

      <div
        v-if="dashboardMode"
        class="my-4 d-flex flex-column align-center justify-center"
      >
        <a href="/"
          ><img
            v-cloak
            class="dashboard-logo ml-n1"
            :src="
              assetsUrl +
                '/img/beep-icon-logo' +
                (darkMode ? '-white-text' : '') +
                '.svg'
            "
        /></a>
        <div
          class="text-h3 overline roboto-condensed font-weight-light"
          v-text="$tc('Dashboard', 1)"
        ></div>
      </div>
      <v-card-title class="account-title mb-n2">{{ title }}</v-card-title>
      <slot></slot>
    </v-card>
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
    dashboardMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
      nrOfBees: 4,
      darkMode: false,
    }
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  created() {
    if (this.dashboardMode) {
      this.darkMode = true
    }
    this.$vuetify.theme.dark = this.darkMode
  },
}
</script>

<style lang="scss" scoped>
.account-card {
  width: 90%;
  margin: 40px auto;
  overflow: hidden;
  @include for-tablet-portrait-up {
    width: 380px;
    margin: 6% auto;
  }
}
.account-logo {
  width: 300px;
}

.dashboard-logo {
  width: 400px;
}

.account-title {
  width: 100%;
  font-size: 18px;
  @include for-phone-only {
    font-size: 16px;
  }
}

#beeBox {
  position: absolute;
  width: 100%;
  height: 100%;
}
#bee1,
#bee2,
#bee3,
#bee4 {
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url($ASSETS+'/img/icons/icn_bee_dark.svg');
  &.bee--light {
    background-image: url($ASSETS+'/img/icons/icn_bee.svg');
  }
}
#bee1 {
  animation: beeAnimation1 11s linear infinite, rotateBee1 11s linear infinite;
  &.bee--mobile {
    animation: beeAnimation1 5s linear infinite, rotateBee1 5s linear infinite;
  }
}
#bee2 {
  width: 27px;
  height: 27px;
  animation: beeAnimation2 8s linear infinite,
    rotateBee2 8s cubic-bezier(0.02, 0.01, 0.31, 1) infinite;
  &.bee--mobile {
    animation: beeAnimation2 3s linear infinite,
      rotateBee2 3s cubic-bezier(0.02, 0.01, 0.31, 1) infinite;
  }
}
#bee3 {
  width: 16px;
  height: 16px;
  animation: beeAnimation3 12s linear infinite, rotateBee3 4s linear infinite;
  &.bee--mobile {
    animation: beeAnimation3 6s linear infinite, rotateBee3 2s linear infinite;
  }
}
#bee4 {
  animation: beeAnimation4 10s linear infinite,
    rotateBee4 5s cubic-bezier(0.02, 0.01, 0.31, 1) infinite;
  &.bee--mobile {
    animation: beeAnimation4 4s linear infinite,
      rotateBee4 2s cubic-bezier(0.02, 0.01, 0.31, 1) infinite;
  }
}

@keyframes beeAnimation1 {
  0% {
    top: 0%;
    left: -5%;
  }
  50% {
    top: 6%;
    left: 55%;
  }
  100% {
    top: 3%;
    left: 110%;
  }
}
@keyframes beeAnimation2 {
  0% {
    top: 20%;
    left: -20%;
  }
  75% {
    top: 45%;
    left: 80%;
  }
  76% {
    top: 45%;
    left: 82%;
  }
  100% {
    top: 35%;
    left: 110%;
  }
}
@keyframes beeAnimation3 {
  0% {
    top: 60%;
    left: -5%;
  }
  100% {
    top: 62%;
    left: 110%;
  }
}
@keyframes beeAnimation4 {
  0% {
    top: 78%;
    left: 105%;
  }
  100% {
    top: 73%;
    left: -10%;
  }
}
@keyframes rotateBee1 {
  0% {
    transform: rotate(63deg);
  }
  50% {
    transform: rotate(40deg);
  }
  100% {
    transform: rotate(35deg);
  }
}
@keyframes rotateBee2 {
  0% {
    transform: rotate(40deg);
  }
  74% {
    transform: rotate(60deg);
  }
  77% {
    transform: rotate(35deg);
  }
  100% {
    transform: rotate(18deg);
  }
}
@keyframes rotateBee3 {
  0% {
    transform: rotate(38deg);
  }
  50% {
    transform: rotate(52deg);
  }
  100% {
    transform: rotate(38deg);
  }
}
@keyframes rotateBee4 {
  0% {
    transform: rotate(228deg);
  }
  60% {
    transform: rotate(236deg);
  }
  100% {
    transform: rotate(228deg);
  }
}
</style>
