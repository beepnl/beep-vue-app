<template>
  <div>
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
            v-else-if="item.route"
            :disabled="item.disabled"
            :key="`i-${index}`"
            :to="{ name: item.route }"
          >
            <v-list-item-title v-html="item.title" />
          </v-list-item>
          <v-list-item
            v-else
            :disabled="item.disabled"
            :key="`i-${index}`"
            @click="showDialog(item)"
          >
            <v-list-item-title v-html="item.title" />
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: {
        show: false,
        title: 'Title',
      },
    }
  },
  props: {
    menuItems: {
      type: Array,
      default: () => {
        return [
          {
            title: 'Settings',
            route: 'settings',
          },
        ]
      },
    },
  },
  methods: {
    showDialog: function(item) {
      this.dialog.title = item.title
      this.dialog.show = true
      if (item.event) {
        this.$emit(item.event)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
