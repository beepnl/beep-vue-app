<template>
  <v-list two-line>
    <v-list-item v-for="(item, i) in apiaries" :key="i">
      <v-list-item-avatar :style="{ 'border-radius': '5px' }">
        <v-icon small color="error">
          mdi-alert-circle
        </v-icon>
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
      { title: 'Backyard', hives: 9 },
      { title: 'Garden', hives: 5 },
      { title: 'Mountain', hives: 6 },
      { title: 'Lakeside', hives: 1 },
    ],
  }),
  methods: {},
}
</script>

<style lang="scss" scoped></style>
