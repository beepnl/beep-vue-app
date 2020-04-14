---
to: "src/router/layouts/<%= h.changeCase.pascal(name) %>.vue"
---
<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
