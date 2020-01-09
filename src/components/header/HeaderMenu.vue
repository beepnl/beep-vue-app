<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <template v-for="(item, index) in menuItems">
        <v-subheader
          v-if="item.header"
          :key="`h-${index}`"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="`d-${index}`"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :disabled="item.disabled"
          :key="`i-${index}`"
          :to="item.route ? { name: item.route } : null"
          @click="item.action ? wrapAction(item.action) : showDialog(item)"
        >
          <v-list-item-title v-html="item.title" />
        </v-list-item>
      </template>
      <v-divider v-if="menuItems.length"></v-divider>
      <v-list-item :to="{ name: 'settings' }">Settings</v-list-item>
      <v-list-item :disabled="!userIsLoggedIn">Log out</v-list-item>
    </v-list>
    <v-dialog v-model="dialog.show">
      <v-card>
        <v-card-title class="headline" v-html="dialog.title" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.show = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data: function() {
    return {
      dialog: {
        show: false,
        title: 'notification',
      },
    }
  },
  computed: {
    ...mapGetters({ userIsLoggedIn: 'auth/userIsLoggedIn' }),
  },
  methods: {
    wrapAction(cb) {
      if (!cb) {
        return
      } else {
        this.$store.dispatch(cb)
      }
    },
    showDialog: function(item) {
      this.dialog.title = item.title
      this.dialog.show = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
