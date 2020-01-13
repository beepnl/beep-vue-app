<template>
  <div>
    <BackBar :menu-items="menuItems" title="Apiary details" />
    <v-content>
      <v-card tile class="sticky">
        <v-img
          class="align-end"
          height="150px"
          v-if="apiary"
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
            <v-row class="ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <v-container class="apiary-info">
            <div class="d-flex">
              <span class="display-1" v-text="apiary.title" />
              <v-spacer></v-spacer>
              <v-tooltip left v-if="apiary.warning">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" class="notification --warning">
                    mdi-alert-circle
                  </v-icon>
                </template>
                <span>This apiary has issues</span>
              </v-tooltip>
              <v-tooltip left v-if="apiary.shared">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" class="notification --shared">
                    mdi-account-multiple
                  </v-icon>
                </template>
                <span v-text="`This apiary is shared with you`" />
              </v-tooltip>
            </div>
            <div class="subtitle-1 d-flex">
              {{ apiary.city }}
              <v-spacer></v-spacer>
              <span class="float-right caption grey--text">
                last visit: {{ apiary.lastvisit }}
              </span>
            </div>
            <div class="hives">
              <HiveIcons :disabled="!editing" :apiary="apiary"></HiveIcons>
            </div>
          </v-container>
        </v-img>
      </v-card>
      <v-list>
        <template v-for="item in filteredInspections">
          <v-list-item two-line :key="`i-${item.id}`" class="inspection">
            <v-row ma-0>
              <v-col>
                <v-list-item-title>
                  {{ item.apiary }}
                  <span class="caption grey--text" v-if="item.hive">
                    hive {{ item.hive }}
                  </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.date }}
                </v-list-item-subtitle>
              </v-col>
              <v-col>
                {{ item.note }}
              </v-col>
              <v-col cols="1">
                <v-icon v-if="item.impression < 0" class="red--text">
                  mdi-emoticon-sad-outline
                </v-icon>
                <v-icon v-if="item.impression > 0" class="green--text">
                  mdi-emoticon-happy-outline
                </v-icon>
                <v-icon v-if="item.impression === 0" class="grey--text">
                  mdi-emoticon-neutral-outline
                </v-icon>
              </v-col>
              <v-col cols="1" class="mr-2">
                <v-icon v-if="item.attention" class="red--text">
                  mdi-alert
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider :key="`div-${item.id}`"></v-divider>
        </template>
      </v-list>
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
import { mapState, mapGetters } from 'vuex'
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
    ...mapState('apiaries', ['apiary', 'editing']),
    ...mapGetters('apiaries', ['filteredInspections']),
    menuItems: function() {
      let items = [
        {
          title: 'Share Apiary&hellip;',
        },
        {
          title: 'Delete Apiary',
        },
      ]
      if (this.editing) {
        items.unshift({
          title: 'Add hive',
          action: 'apiaries/addHive',
        })
      } else {
        items.unshift({
          title: 'Edit apiary',
          action: 'apiaries/editOn',
        })
      }
      return items
    },
  },
  mounted() {
    this.$store.dispatch('setMenu', this.menuItems)
  },
  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch('apiaries/editOff')
    next()
  },
  methods: {
    notify: function(text) {
      this.snackbar.text = text
      this.snackbar.show = true
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
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: -45px;
  z-index: 1;
}

.notification {
  &.--warning {
    color: red;
  }
  &.--shared {
    color: gray;
  }
}
</style>
