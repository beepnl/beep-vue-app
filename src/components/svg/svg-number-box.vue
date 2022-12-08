<template>
  <rect
    :x="x"
    :y="y"
    width="4.7mm"
    height="8mm"
    stroke="black"
    fill="transparent"
    stroke-width="0.5"
  />
</template>

<script>
export default {
  props: {
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
  },
}
</script>
