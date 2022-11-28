<template>
  <rect
    :x="x"
    :y="y"
    width="4mm"
    height="4mm"
    stroke="black"
    fill="transparent"
    stroke-width="2"
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
