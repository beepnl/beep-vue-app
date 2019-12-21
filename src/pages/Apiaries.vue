<template>
  <v-list two-line>
    <v-list-item v-for="(item, i) in apiaries" :key="i">
      <v-list-item-avatar :style="{ 'border-radius': '5px' }">
        <v-img
          :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
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

        <template name="notifications">
          <v-sheet class="absolute">
            <slot name="warning">
              <v-icon class="notification --warning" v-if="item.warning">
                mdi-alert-circle
              </v-icon>
            </slot>
            <slot name="shared">
              <v-icon class="notification --shared" v-if="item.shared">
                mdi-account-multiple
              </v-icon>
            </slot>
          </v-sheet>
        </template>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.hives }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon>mdi-message-text</v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    settings: [],
    apiaries: [
      { title: 'Backyard', hives: 9, warning: true },
      { title: 'Garden', hives: 5 },
      { title: 'Mountain', hives: 6, shared: true },
      { title: 'Lakeside', hives: 1, warning: true, shared: true },
    ],
  }),
  methods: {},
}
</script>

<style lang="scss" scoped>
.absolute {
  position: absolute;
  top: -10px;
  border-radius: 100%;
}
.notification {
  position: absolute;
  background: white;
  padding: 2px;
}
.--warning {
  right: 4px;
  color: red;
}
.--shared {
  left: 4px;
  color: gray;
}
</style>
