<template>
  <div>
    <BackBar :menu-items="menuItems" title="Apiary details"></BackBar>
    <v-content>
      <v-card>
        <v-img
          v-if="apiary"
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
              <v-col v-if="apiary.hives">
                <draggable
                  v-model="apiary.hives"
                  class="d-flex align-end apiary-line"
                >
                  <v-sheet
                    v-for="(hive, j) in apiary.hives"
                    :class="
                      `hive-mini d-flex justify-center align-end white--text text--small mr-1 ${
                        hive.selected ? '--selected' : ''
                      }`
                    "
                    :key="`${j}`"
                    :height="`${getHeight(hive)}%`"
                    :width="`${getWidth(hive)}%`"
                    :color="hive.color"
                    @click="selectHive(hive)"
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
                </draggable>
              </v-col>
              <v-col v-else>
                <v-card>
                  <v-card-text class="title text-center primary--text">
                    Your apiary needs a hive
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="addHive">
                      Add hive
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
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
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    draggable,
  },
  props: {
    id: {
      type: [String, Number],
    },
  },
  data: function() {
    return {
      menuItems: [
        {
          title: 'Add hive',
          action: 'apiaries/addHive',
        },
        {
          title: 'Share Apiary&hellip;',
          route: '',
        },
        {
          title: 'Delete Apiary',
          route: '',
        },
        {
          divider: true,
        },
        {
          title: 'Settings',
          route: 'settings',
        },
      ],
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
    }
  },
  computed: {
    ...mapState('apiaries', { apiary: 'selectedApiary' }),
    maxHeight() {
      return Math.max(...this.apiary.hives.map(hive => hive.honey + hive.brood))
    },
    maxWidth() {
      return this.apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
    },
  },
  methods: {
    ...mapActions('apiaries', {
      selectHive: 'selectHive',
    }),
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
</style>
<style lang="scss">
.apiary-line {
  height: 30px;
  border-bottom: 1px solid green;
  .hive-mini {
    position: relative;
    .honey-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.--selected {
      box-shadow: 0 0 0 2px yellow;
    }
  }
  .hive-number {
    z-index: 1;
  }
}
</style>
