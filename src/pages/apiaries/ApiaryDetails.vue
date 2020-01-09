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
          :src="
            apiary.photo
              ? `https://picsum.photos/500/300?image=${apiary.id * 5 + 10}`
              : ''
          "
          :lazy-src="
            apiary.photo
              ? `https://picsum.photos/10/6?image=${apiary.id * 5 + 10}`
              : ''
          "
        >
          <template v-if="apiary.photo" v-slot:placeholder>
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
              <v-col grow />
              <v-col v-if="apiary.warning">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon large v-on="on" class="notification --warning">
                      mdi-alert-circle
                    </v-icon>
                  </template>
                  <span>This apiary has issues</span>
                </v-tooltip>
              </v-col>
              <v-col v-if="apiary.shared">
                <v-tooltip left>
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
                <HiveIcons editable :apiary="apiary"></HiveIcons>
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
import { mapState, mapActions } from 'vuex'
import HiveIcons from '@/components/HiveIcons'

export default {
  components: {
    HiveIcons,
  },
  props: {
    id: {
      type: [String, Number],
    },
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
    }
  },
  computed: {
    ...mapState('apiaries', { apiary: 'selectedApiary' }),
    menuItems: function() {
      let items = [
        {
          title: 'Add hive',
          action: 'apiaries/addHive',
        },
        {
          title: 'Delete selected hive',
          action: 'apiaries/deleteHive',
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
      ]
      return items
    },
  },
  methods: {
    ...mapActions('apiaries', ['addHive', 'selectHive']),
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
