<template>
  <v-list two-line>
    <v-list-item-group>
      <v-list-item
        v-for="(apiary, i) in apiaries"
        :key="i"
        :to="{
          name: `apiary-details`,
          params: { id: apiary.id },
        }"
      >
        <v-list-item-avatar class="rounded">
          <v-img
            v-if="apiary.photo"
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
          </v-img>
          <v-sheet v-else width="100%" height="100%" class="rounded secondary">
            <h1 class="white--text">{{ apiary.title | firstletter }}</h1>
          </v-sheet>

          <template name="notifications">
            <v-sheet class="absolute">
              <slot name="warning">
                <v-icon class="notification --warning" v-if="apiary.warning">
                  mdi-alert-circle
                </v-icon>
              </slot>
              <slot name="shared">
                <v-icon class="notification --shared" v-if="apiary.shared">
                  mdi-account-multiple
                </v-icon>
              </slot>
            </v-sheet>
          </template>
        </v-list-item-avatar>
        <v-container class="pa-0">
          <v-list-item-title>
            {{ apiary.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="d-flex align-end pa-0 apiary-line">
            <v-sheet
              v-for="(hive, j) in apiary.hives"
              :class="
                `hive-mini d-flex justify-center align-end white--text text--small mr-1 ${
                  hive.selected ? '--selected' : ''
                }`
              "
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
          </v-list-item-subtitle>
        </v-container>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    settings: [],
  }),
  computed: {
    maxHeight() {
      // returns the highest hive across all apiaries
      return Math.max(
        ...this.apiaries.map(apiary =>
          Math.max(...apiary.hives.map(hive => hive.honey + hive.brood))
        )
      )
    },
    maxWidth() {
      // returns the widest apiary (most total frames)
      return Math.max(
        ...this.apiaries.map(apiary =>
          apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
        )
      )
    },
    ...mapState('apiaries', ['apiaries']),
  },
  methods: {
    getHeight: function(hive) {
      return ((hive.honey + hive.brood) / this.maxHeight) * 100
    },
    getWidth: function(hive) {
      return (hive.frames / this.maxWidth) * 100
    },
    showApiary: function() {
      console.log(this.apiary)
      //this.$router.push('/apiary/:' + this.apiary)
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
.absolute {
  position: absolute;
  top: -10px;
  border-radius: 100%;
}
.rounded {
  border-radius: 5px;
}
.notification {
  position: absolute;
  background: white;
  padding: 2px;
  &.--warning {
    right: 4px;
    color: red;
  }
  &.--shared {
    left: 4px;
    color: gray;
  }
}
</style>
