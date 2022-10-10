<template>
  <div>
    <v-app-bar
      app
      light
      background-color="#000"
      color="primary"
      dense
      class="zindex4"
    >
      <slot name="icon">
        <v-btn icon @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </slot>
      <slot name="title">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </slot>

      <v-spacer></v-spacer>

      <LocaleChanger></LocaleChanger>

      <v-app-bar-nav-icon
        class="color-black ml-n2"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <NavDrawer
      :menu-items="menuItems"
      :drawer="drawer"
      @update-drawer-value="drawer = $event"
    ></NavDrawer>

    <v-main>
      <slot></slot>
    </v-main>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
import Confirm from '@components/confirm.vue'
import LocaleChanger from '@components/locale-changer.vue'
import { mapGetters } from 'vuex'
import NavDrawer from '@components/nav-drawer.vue'

export default {
  components: {
    Confirm,
    LocaleChanger,
    NavDrawer,
  },
  props: {
    title: {
      type: String,
      default: 'Back',
    },
    edited: {
      type: Boolean,
      default: false,
    },
    warningMessage: {
      type: String,
      default: '',
      required: false,
    },
    query: {
      type: Object,
      default: null,
      required: false,
    },
  },
  data: function() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRuleEdited']),
    ...mapGetters('groups', ['groupEdited']),
    ...mapGetters('hives', ['hiveEdited']),
    ...mapGetters('inspections', ['inspectionEdited']),
    ...mapGetters('locations', ['apiaryEdited']),
    menuItems: function() {
      return [
        {
          icon: 'mdi-home-analytics',
          title: this.$i18n.t('Home'),
          route: 'home',
        },
      ]
    },
  },
  methods: {
    back: function() {
      // remove hive_index query if it was present for the previous route, to prevent endless redirect loop
      if (localStorage.beepPreviousQueryHiveIndex !== 'undefined') {
        this.$router.push({
          name: localStorage.beepPreviousRoute,
        })
      } else {
        if (
          ((this.$route.name === 'apiary-create' ||
            this.$route.name === 'apiary-edit' ||
            this.$route.name === 'apiary-management') &&
            this.apiaryEdited) ||
          ((this.$route.name === 'group-create' ||
            this.$route.name === 'group-edit') &&
            this.groupEdited) ||
          (this.$route.name === 'hive-edit' && this.hiveEdited) ||
          (this.$route.name === 'inspect' && this.inspectionEdited) ||
          (this.$route.name === 'alertrule-edit' && this.alertRuleEdited) ||
          ((this.$route.name === 'checklist' ||
            this.$route.name === 'research' ||
            this.$route.name === 'devices') &&
            this.edited)
        ) {
          this.$refs.confirm
            .open(
              this.$i18n.t('unsaved_changes'),
              this.$i18n.t('save_changes'),
              {
                color: 'red',
              },
              this.warningMessage
            )
            .then((confirm) => {
              this.navigateBackIntuitively()
            })
            .catch((reject) => {
              return true
            })
        } else if (this.$route.name === 'hive-inspections') {
          this.$router.push({
            name: localStorage.beepPreviousTab,
            query: this.query, // forward query if present
          })
        } else {
          this.navigateBackIntuitively()
        }
      }
    },
    navigateBackIntuitively() {
      // if in nav menu page (with depth 1), go back to previous tab that was opened on the home page (1 level up), instead of previous page
      if (
        this.$route.meta.depth === 1 &&
        localStorage.beepPreviousTab !== undefined
      ) {
        this.$router.push({
          name: localStorage.beepPreviousTab,
        })
      } else {
        // if in deeper nested page (with depth 2 or more, or undefined), go back to previous page
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style lang="scss">
header.v-app-bar {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
