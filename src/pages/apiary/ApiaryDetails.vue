<template>
  <div>
    <BackBar title="Apiary overview"></BackBar>
    <v-content>
      <v-card>
        <v-img
          class="white--text align-end"
          height="150px"
          gradient="to bottom, rgba(255,255,255,.5), rgba(255,255,255,.9), rgba(255,255,255,.95)"
          :src="`https://picsum.photos/500/300?image=${apiary.id * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${apiary.id * 5 + 10}`"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <v-container>
            <v-row justify="start" align="start" align-content="start">
              <v-col>
                <span v-text="apiary.title" class="display-2 grey--text" />
              </v-col>
              <v-col />
              <v-col>
                <v-tooltip left v-if="apiary.warning">
                  <template v-slot:activator="{ on }">
                    <v-icon large v-on="on" class="notification --warning">
                      mdi-alert-circle
                    </v-icon>
                  </template>
                  <span v-text="`This apiary has issues`" />
                </v-tooltip>
              </v-col>
              <v-col>
                <v-tooltip left v-if="apiary.shared">
                  <template v-slot:activator="{ on }">
                    <v-icon large v-on="on" class="notification --shared">
                      mdi-account-multiple
                    </v-icon>
                  </template>
                  <span v-text="`This apiary is shared with you`" />
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <draggable v-model="hives" class="d-flex align-end apiary-line">
                  <v-sheet
                    v-for="(hive, j) in hives"
                    class="apiary-icon d-flex justify-center align-end white--text text--small mr-1"
                    :key="j"
                    :height="`${getHeight(hive)}%`"
                    :width="`${getWidth(hive)}%`"
                    :color="hive.color"
                    @click="editHive(j)"
                  >
                    <v-sheet
                      class="honey-layer"
                      tile
                      width="100%"
                      :height="
                        `${(hive.honey / (hive.brood + hive.honey)) * 100}%`
                      "
                    ></v-sheet>
                    <span class="hive-number overline font-weight-black">
                      {{ j + 1 }}
                    </span>
                  </v-sheet>
                  <v-btn icon @click="addHive">
                    <v-icon color="black">
                      mdi-plus-circle
                    </v-icon>
                  </v-btn>
                </draggable>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-card>
      <v-card>
        <v-card-title>chart</v-card-title>
        <v-card-text>
          <chartist
            ratio="ct-major-second"
            type="Line"
            :data="chartData"
            :options="chartOptions"
          ></chartist>
        </v-card-text>
      </v-card>
    </v-content>
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
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
  data() {
    return {
      hives: this.apiary.hives.slice(),
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      chartData: {
        labels: ['A', 'B', 'C'],
        series: [[1, 3, 2], [4, 6, 5]],
      },
      chartOptions: {
        lineSmooth: false,
      },
    }
  },
  computed: {
    maxHeight() {
      return Math.max(...this.apiary.hives.map(hive => hive.honey + hive.brood))
    },
    maxWidth() {
      return this.apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
    },
    ...mapState('apiary', {
      apiaries: state => state.apiaries,
    }),
  },
  watch: {
    hives: function(n, o) {
      console.log(JSON.stringify(n))
    },
  },
  methods: {
    notify: function(text) {
      this.snackbar.text = text
      this.snackbar.show = true
    },
    getHeight: function(hive) {
      return ((hive.honey + hive.brood) / this.maxHeight) * 100
    },
    getWidth: function(hive) {
      return (hive.frames / this.maxWidth) * 90
    },
    addHive: function() {
      this.notify(`add new hive...`)
    },
    editHive: function(idx) {
      this.notify(`edit hive ${idx + 1}...`)
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
.notification {
  position: absolute;
  &.--warning {
    color: red;
  }
  &.--shared {
    color: gray;
  }
}
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
