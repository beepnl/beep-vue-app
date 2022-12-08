<template>
  <rect
    :x="x"
    :y="y"
    width="3.5mm"
    height="3.5mm"
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
