<template>
  <line
    x1="12mm"
    x2="198mm"
    :y1="y + 'mm'"
    :y2="y + 'mm'"
    stroke="black"
    stroke-width="0.5"
  />
</template>

<script>
export default {
  props: {
    y: {
      type: Number,
      required: true,
    },
  },
}
</script>
