<script>
export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    marker: null,
  }),
  computed: {
    svgMarker() {
      return {
        path:
          'M12,3L2,12H5V20H19V12H22M9,18H7V12H9M13,18H11V10H13M17,18H15V14H17',
        fillColor: '#f29100',
        fillOpacity: 0.9,
        strokeWeight: 0,
        rotation: 0,
        scale: 3,
        anchor: new window.google.maps.Point(12, 12),
      }
    },
  },
  mounted() {
    this.$parent.getMap((map) => {
      this.marker = new window.google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        icon: this.svgMarker,
        map: map,
      })
    })
  },
  beforeDestroy() {
    this.marker.setMap(null)
    window.google.maps.event.clearInstanceListeners(this.marker)
  },
  render() {
    return null
  },
}
</script>
