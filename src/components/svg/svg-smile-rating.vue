<template>
  <g :page-y="position.pageY + 'mm'" :data-category-id="position.id">
    <svgLabel :x="x" :y="y" :label="label" />

    <svg
      :x="x + 'mm'"
      :y="y + 2 + 'mm'"
      width="6mm"
      height="6mm"
      viewBox="0 0 24 24"
    >
      <path
        :style="fillColorGrey"
        d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z"
      />
    </svg>
    <svgCheckbox
      :x="x + 1 + 'mm'"
      :y="y + 9 + 'mm'"
      :category-id="'smile'"
      :parent-id="position.id"
    />
    <svg
      :x="x + 8.5 + 'mm'"
      :y="y + 2 + 'mm'"
      width="6mm"
      height="6mm"
      viewBox="0 0 24 24"
    >
      <path
        :style="fillColorGrey"
        d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5M16,14V16H8V14H16Z"
      />
    </svg>
    <svgCheckbox
      :x="x + 9.5 + 'mm'"
      :y="y + 9 + 'mm'"
      :category-id="'smile'"
      :parent-id="position.id"
    />
    <svg
      :x="x + 17 + 'mm'"
      :y="y + 2 + 'mm'"
      width="6mm"
      height="6mm"
      viewBox="0 0 24 24"
    >
      <path
        :style="fillColorGrey"
        d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
      />
    </svg>
    <svgCheckbox
      :x="x + 18 + 'mm'"
      :y="y + 9 + 'mm'"
      :category-id="'smile'"
      :parent-id="position.id"
    />
  </g>
</template>

<script>
import svgCheckbox from '@/src/components/svg/svg-checkbox.vue'
import svgLabel from '@/src/components/svg/svg-label.vue'
import { svgStyles } from '@mixins/svgMixin'

export default {
  components: {
    svgCheckbox,
    svgLabel,
  },
  mixins: [svgStyles],
  props: {
    position: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    x() {
      return this.position ? this.position.x : null
    },
    y() {
      return this.position ? this.position.y : null
    },
  },
}
</script>
