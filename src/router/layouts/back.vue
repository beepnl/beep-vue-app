<template>
  <div>
    <v-app-bar
      :no-box-shadow="noBoxShadow"
      :class="noBoxShadow ? 'v-app-bar--no-box-shadow' : ''"
      app
      color="primary"
      dark
      dense
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
      <HeaderMenu v-if="menuItems.length" :menu-items="menuItems"></HeaderMenu>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>

    <Confirm ref="confirm"></Confirm>
  </div>
</template>

<script>
import Confirm from '@components/confirm.vue'
import HeaderMenu from '@components/header-menu.vue'
import LocaleChanger from '@components/locale-changer.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Confirm,
    HeaderMenu,
    LocaleChanger,
  },
  props: {
    title: {
      type: String,
      default: 'Back', // () => this.$i18n.t('back') werkt niet, ook niet via created hook,
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
    noBoxShadow: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('groups', ['groupEdited']),
    ...mapGetters('hives', ['hiveEdited']),
    ...mapGetters('inspections', ['inspectionEdited']),
    ...mapGetters('locations', ['apiaryEdited']),
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
        (this.$route.name === 'hive-inspect' && this.inspectionEdited) ||
        ((this.$route.name === 'checklist' ||
          this.$route.name === 'research') &&
          this.edited)
      ) {
        this.$refs.confirm
          .open(this.$i18n.t('unsaved_changes'), this.$i18n.t('save_changes'), {
            color: 'red',
          })
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
header.v-app-bar--no-box-shadow {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
