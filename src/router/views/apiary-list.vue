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
        </v-list-item-avatar>
        <v-icon v-if="apiary.warning" class="notification warning">
          mdi-alert-circle
        </v-icon>
        <v-icon v-if="apiary.shared" class="notification shared">
          mdi-account-multiple
        </v-icon>
        <v-container class="pa-0">
          <v-list-item-title>
            {{ apiary.title }}
            <span class="location caption grey--text">({{ apiary.city }})</span>
            <span class="lastvisit caption grey--text float-right text-right">
              {{ apiary.lastvisit }}
            </span>
          </v-list-item-title>
          <HiveIcons :apiary="apiary"></HiveIcons>
        </v-container>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import HiveIcons from '@components/hive-icons.vue'

export default {
  components: {
    HiveIcons,
  },
  filters: {
    firstletter: function(value) {
      if (!value) return '?'
      value = value.toString()
      return value.charAt(0).toUpperCase()
    },
  },
  data: () => ({
    settings: [],
    menuItems: [{ title: 'Add apiary' }],
  }),
  computed: {
    ...mapState('apiaries', ['apiaries']),
  },
}
</script>

<style lang="sass" scoped>
.rounded
  border-radius: 5px

.notification
  position: absolute
  padding: 1px
  background: white
  border-radius: 100%
  &.warning
    top: 5px
    left: 5px
    color: red

  &.shared
    top: 5px
    left: 40px
    color: gray
</style>
