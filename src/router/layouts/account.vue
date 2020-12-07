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
  width: 100%;
  height: 100%;
}
#bee1,
#bee2,
#bee3 {
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url('~@assets/img/icn_bee_dark.svg');
}
#bee1 {
  animation: beeAnimation1 13s linear infinite, rotateBee1 13s linear infinite;
}
#bee2 {
  animation: beeAnimation2 10s linear infinite, rotateBee2 10s linear infinite;
}
#bee3 {
  animation: beeAnimation3 15s linear infinite, rotateBee3 5s linear infinite;
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
    left: -10%;
  }
  100% {
    top: 45%;
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
    transform: rotate(35deg);
  }
  50% {
    transform: rotate(55deg);
  }
  100% {
    transform: rotate(45deg);
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
</style>
