<template>
  <div>
    <BackBar :title="`${apiary.title} Apiary`"></BackBar>
    <v-content>
      <v-card>
        <v-img
          class="white--text align-end"
          height="50px"
          gradient="to bottom, rgba(255,255,255,.5), rgba(255,255,255,.9), rgba(255,255,255,.95)"
          :src="`https://picsum.photos/500/300?image=${apiary.idx * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${apiary.idx * 5 + 10}`"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <draggable class="d-flex align-end apiary-line">
            <v-sheet
              v-for="(hive, j) in apiary.hives"
              class="apiary-icon d-flex justify-center align-end white--text text--small mr-1"
              :key="j"
              :height="`${getHeight(hive)}%`"
              :width="`${getWidth(hive)}%`"
              :color="hive.color"
            >
              <v-sheet
                class="honey-layer"
                tile
                width="100%"
                :height="`${(hive.honey / (hive.brood + hive.honey)) * 100}%`"
              ></v-sheet>
              <span class="hive-number overline font-weight-black">
                {{ j + 1 }}
              </span>
            </v-sheet>
          </draggable>
        </v-img>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  props: {
    id: { type: String },
    apiary: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function() {
        return {
          idx: 0,
          title: 'Backyard',
          hives: [
            { honey: 4, brood: 2, frames: 10, color: 'red' },
            { honey: 4, brood: 2, frames: 10, color: 'red' },
            { honey: 4, brood: 5, frames: 10, color: 'red' },
            { honey: 4, brood: 2, frames: 10, color: 'red' },
            { honey: 1, brood: 3, frames: 15, color: 'purple' },
            { honey: 1, brood: 3, frames: 15, color: 'purple' },
            { honey: 1, brood: 3, frames: 15, color: 'purple' },
            { honey: 1, brood: 3, frames: 15, color: 'purple' },
          ],
          photo: true,
          warning: true,
        }
      },
    },
  },
  computed: {
    maxHeight() {
      return Math.max(...this.apiary.hives.map(hive => hive.honey + hive.brood))
    },
    maxWidth() {
      return this.apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
    },
  },
  methods: {
    getHeight: function(hive) {
      return ((hive.honey + hive.brood) / this.maxHeight) * 100
    },
    getWidth: function(hive) {
      return (hive.frames / this.maxWidth) * 90
    },
  },
  filters: {
    firstletter: function(value) {
      if (!value) return '?'
      value = value.toString()
      return value.charAt(0).toUpperCase()
    },
  },
}
</script>

<style lang="scss" scoped>
.apiary-line {
  height: 30px;
  border-bottom: 1px solid green;
  .apiary-icon {
    position: relative;
    .honey-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .hive-number {
    z-index: 1;
  }
}
</style>
