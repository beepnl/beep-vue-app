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
      <div
        class="d-flex flex-row justify-space-between align-center"
        style="width:100%;"
      >
        <div
          class="d-flex flex-row justify-start align-center ml-n3"
          style="width: 48%;"
        >
          <slot name="icon">
            <v-btn icon @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </slot>
          <slot name="title">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </slot>
        </div>

        <div class="d-flex justify-center" style="width: 4%">
          <PlusMenu></PlusMenu>
        </div>

        <div class="d-flex justify-end align-center mr-n3" style="width: 48%;">
          <LocaleChanger></LocaleChanger>

          <v-app-bar-nav-icon
            class="ml-n2"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </div>
      </div>
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
import PlusMenu from '@components/plus-menu.vue'

export default {
  components: {
    Confirm,
    LocaleChanger,
    NavDrawer,
    PlusMenu,
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
          authRequired: true,
        },
      ]
    },
  },
  methods: {
    back: function() {
      if (
        ((this.$route.name === 'apiary-create' ||
          this.$route.name === 'apiary-edit') &&
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
            this.$router.go(-1)
          })
          .catch((reject) => {
            return true
          })
      } else {
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
