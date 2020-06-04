<template>
  <Layout :menu-items="menuItems">
    <v-list two-line>
      <v-list-item-group>
        <v-list-item
          v-for="(apiary, i) in apiaries"
          :key="i"
          :to="{
            name: `apiary-details`,
            params: { id: apiary.id },
          }"
          class="apiary-item"
        >
          <v-list-item-avatar class="rounded">
            <v-img
              v-if="apiary.photo"
              :src="`https://picsum.photos/500/300?image=${apiary.id * 5 + 10}`"
              :lazy-src="
                `https://picsum.photos/10/6?image=${apiary.id * 5 + 10}`
              "
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
            <v-sheet
              v-else
              width="100%"
              height="100%"
              class="rounded secondary"
            >
              <h1 class="white--text">{{ apiary.name | firstletter }}</h1>
            </v-sheet>
          </v-list-item-avatar>
          <v-icon v-if="apiary.warning" class="notification warning">
            mdi-alert-circle
          </v-icon>
          <v-container class="pa-0">
            <v-list-item-title>
              {{ apiary.name }}
              <span v-if="apiary.city" class="location caption grey--text"
                >({{ apiary.city }})</span
              >
              <span class="lastvisit caption grey--text float-right text-right">
                {{ apiary.lastvisit }}
              </span>
            </v-list-item-title>
            <HiveIcons :disabled="true" :apiary="apiary"></HiveIcons>
          </v-container>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list two-line>
      <v-list-item-group>
        <v-list-item
          v-for="(group, i) in groups"
          :key="i"
          :to="{
            name: `group-details`,
            params: { id: group.id },
          }"
          class="apiary-item"
        >
          <v-list-item-avatar class="rounded">
            <v-img
              v-if="group.photo"
              :src="`https://picsum.photos/500/300?image=${group.id * 5 + 10}`"
              :lazy-src="
                `https://picsum.photos/10/6?image=${group.id * 5 + 10}`
              "
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
            <v-sheet
              v-else
              width="100%"
              height="100%"
              class="rounded secondary"
            >
              <h1 class="white--text">{{ group.name | firstletter }}</h1>
            </v-sheet>
          </v-list-item-avatar>
          <v-icon v-if="group.warning" class="notification warning">
            mdi-alert-circle
          </v-icon>
          <v-icon class="notification shared">
            mdi-account-multiple
          </v-icon>
          <v-container class="pa-0">
            <v-list-item-title>
              {{ group.name }}
              <span
                v-if="group.users.length"
                class="location caption grey--text"
                >({{ group.users.length }}
                {{ $tc('member', group.users.length) }})</span
              >
              <span class="lastvisit caption grey--text float-right text-right">
                {{ group.lastvisit }}
              </span>
            </v-list-item-title>
            <HiveIcons :disabled="true" :apiary="group"></HiveIcons>
          </v-container>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import HiveIcons from '@components/hive-icons.vue'
import Layout from '@layouts/main.vue'

export default {
  components: {
    HiveIcons,
    Layout,
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
  }),
  computed: {
    ...mapGetters('locations', ['apiaries']),
    ...mapGetters('groups', ['groups']),
    menuItems: function() {
      const items = [
        { title: this.$i18n.t('new_apiary') },
        { title: this.$i18n.t('new_group') },
      ]
      return items
    },
  },
  created() {
    this.$store.dispatch('locations/findAll')
    this.$store.dispatch('groups/findAll')
  },
}
</script>

<style lang="scss" scoped>
.apiary-item {
  margin-top: 24px;
}

.rounded {
  border-radius: 5px;
}

.notification {
  position: absolute;
  padding: 1px;
  background: white !important;
  border-radius: 100%;
  &.warning {
    top: 20px;
    left: 5px;
    color: red;
  }
  &.shared {
    top: 20px;
    left: 40px;
    color: gray;
  }
}
</style>
