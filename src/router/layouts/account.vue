<template>
  <div>
    <div id="beeBox">
      <div id="bee1"></div>
      <div id="bee2"></div>
      <div id="bee3"></div>
    </div>
    <v-card class="account-card d-flex flex-column align-center">
      <div class="mt-4">
        <a href="/"
          ><img
            v-cloak
            class="account-logo ml-n1"
            src="@assets/img/beep-icon-logo.svg"
        /></a>
      </div>
      <v-card-title class="account-title">{{ title }}</v-card-title>
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
  },
}
</script>

<style lang="scss" scoped>
.account-card {
  width: 90%;
  margin: 50px auto;
  overflow: hidden;
  @include for-tablet-portrait-up {
    width: 380px;
    margin: 10% auto;
  }
}
.account-logo {
  width: 300px;
}
.account-title {
  width: 100%;
  @include for-phone-only {
    font-size: 18px;
  }
}

#beeBox {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vw;
  animation: beeBoxAnimation 20s linear infinite;
}
#bee1,
#bee2,
#bee3 {
  position: absolute;
  width: 20px;
  height: 20px;
  margin: -20px 0 0 -20px;
  background-image: url('~@assets/img/icn_bee_dark.svg');
}
#bee1 {
  top: 50%;
  left: 40%;
  animation: beeAnimation 2.95s cubic-bezier(0.02, 0.01, 0.31, 1) infinite,
    antiRotate 20s linear infinite;
}
#bee2 {
  top: 40%;
  right: 30%;
  animation: beeAnimation 3.2s cubic-bezier(0.02, 0.01, 0.31, 1) infinite;
}
#bee3 {
  top: 10%;
  right: 20%;
  animation: beeAnimation 3.5s cubic-bezier(0.02, 0.01, 0.31, 1) infinite,
    antiRotate 20s linear infinite;
}
#bee::after,
#bee2::after,
#bee3::after {
  animation: spanAnimation 3s cubic-bezier(0.3, 0.27, 0.07, 1.64) infinite;
}

@keyframes beeBoxAnimation {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes antiRotate {
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes beeAnimation {
  50% {
    transform: translateY(-50px);
  }
}
@keyframes spanAnimation {
  50% {
    transform: translateX(-50px);
  }
}
</style>
