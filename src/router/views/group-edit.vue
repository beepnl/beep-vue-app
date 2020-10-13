<template>
  <Layout
    :title="`${$t('create_new') + ' ' + $tc('group', 1)}`"
    :no-box-shadow="true"
  >
    <h1
      v-if="!activeGroup.creator && !activeGroup.admin"
      class="unauthorized-title"
      v-text="unauthorizedText"
    >
    </h1>

    <v-form ref="form" v-model="valid" @submit.prevent="saveGroup">
      <v-toolbar
        v-if="activeGroup && (activeGroup.creator || activeGroup.admin)"
        class="save-bar"
        dense
        light
      >
        <v-spacer></v-spacer>
        <v-icon
          v-if="activeGroup && activeGroup.creator"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteGroup"
          >mdi-delete</v-icon
        >
        <v-btn class="mr-n2" icon type="submit" :disabled="!valid">
          <v-progress-circular
            v-if="showLoadingIcon"
            class="mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" dark color="primary"
            >mdi-check</v-icon
          >
        </v-btn>
      </v-toolbar>

      <v-container
        v-if="activeGroup && (activeGroup.creator || activeGroup.admin)"
        class="group-edit content-container"
      >
        <v-row>
          <v-col cols="12">
            <div class="overline mb-4">{{
              $tc('Group', 1) + ' ' + $t('settings')
            }}</div>
            <div class="rounded-border">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-if="activeGroup"
                    v-model="activeGroup.name"
                    :label="`${$t('Name')}*`"
                    :placeholder="`${$t('Name')}`"
                    class="group-edit-name"
                    counter="30"
                    :rules="requiredRule"
                    required
                    @input="validateText($event, 'name', 30)"
                  >
                  </v-text-field>

                  <v-textarea
                    v-if="activeGroup"
                    v-model="activeGroup.description"
                    :label="`${$t('Description')}*`"
                    :placeholder="`${$t('Description')}`"
                    class="group-edit-description"
                    counter="250"
                    rows="2"
                    clearable
                    auto-grow
                    @input="validateText($event, 'description', 250)"
                  >
                  </v-textarea>

                  <div>
                    <div
                      class="beep-label"
                      v-text="`${$tc('Group', 1)} ${$t('color')}`"
                    ></div>
                    <v-sheet
                      v-if="activeGroup"
                      class="group-color"
                      dark
                      :color="activeGroup.color"
                      @click="overlay = !overlay"
                    ></v-sheet>
                  </div>

                  <v-overlay :value="overlay">
                    <v-toolbar class="hive-color-picker-toolbar" dense light>
                      <div
                        class="hive-color-picker-title"
                        v-text="`${$t('Group_color')}`"
                      ></div>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-icon
                          class="mr-1"
                          color="primary"
                          @click="editGroup(colorPickerValue, 'color')"
                          >mdi-check</v-icon
                        >
                        <v-icon @click="overlay = false">mdi-close</v-icon>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-color-picker
                      v-model="colorPicker"
                      class="hive-color-picker flex-color-picker"
                      :swatches="swatchesGroup"
                      show-swatches
                      hide-canvas
                      light
                      flat
                    >
                    </v-color-picker>
                  </v-overlay>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'

export default {
  components: {
    Confirm,
    Layout,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      swatchesGroup: [
        ['#b5c4b2', '#F7BE02', '#FFA000'],
        ['#049717', '#1b6308', '#00466b'],
        ['#bca55e', '#754B1F', '#3F3104'],
      ],
      colorPickerValue: '',
      groups: null,
      activeGroup: null,
      valid: false,
      showLoadingIcon: false,
      newGroupNumber: 1,
      overlay: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['userEmail', 'userName']),
    ...mapGetters('Groups', ['groupEdited']),
    id() {
      return parseInt(this.$route.params.id)
    },
    createRoute() {
      return this.$route.name === 'group-create'
    },
    colorPicker: {
      get() {
        if (this.activeGroup) {
          return this.activeGroup.color
        } else {
          return '#ffa000'
        }
      },
      set(value) {
        this.colorPickerValue = value
      },
    },
    requiredRule: function() {
      return [
        (v) => !!v || this.$i18n.t('Name') + ' ' + this.$i18n.t('is_required'),
      ]
    },
  },
  created() {
    this.readGroups().then((response) => {
      // If Group-create route is used, make empty Group object
      if (this.createRoute) {
        if (this.groups.length > 0) {
          this.newGroupNumber = this.groups.length + 1
        }
        this.activeGroup = {
          creator: true,
          color: '#F29100',
          name: this.$i18n.tc('Group', 1) + ' ' + this.newGroupNumber,
          description: '',
          hives_selected: [],
          hives_editable: [],
          users: [
            {
              name: this.userName,
              email: this.userEmail,
              admin: true,
              creator: true,
              invited: null,
            },
          ],
        }
        // Else retrieve to-be-edited Group
      } else {
        this.readGroup()
      }
    })
  },
  methods: {
    async createGroup() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('create Group')
        console.log(this.activeGroup)
        // try {
        //   const response = await this.$store.dispatch(
        //     'groups/createGroup',
        //     this.activeGroup
        //   )
        //   if (!response) {
        //     this.snackbar.text = this.$i18n.t('not_saved_error')
        //     this.snackbar.show = true
        //   }
        //   setTimeout(() => {
        //     return this.$router.push({
        //       name: 'home',
        //     })
        //   }, 300) // wait for API to update locations/Groups
        // } catch (error) {
        //   console.log(error)
        //   this.snackbar.text = this.$i18n.t('not_saved_error')
        //   this.snackbar.show = true
        // }
      }
    },
    async deleteGroup() {
      console.log('delete Group')
      console.log(this.id)
      // try {
      //   const response = await this.$store.dispatch(
      //     'groups/deleteGroup',
      //     this.activeGroup.id
      //   )
      //   if (!response) {
      //     this.snackbar.text = this.$i18n.t('something_wrong')
      //     this.snackbar.show = true
      //   }
      //   setTimeout(() => {
      //     return this.$router.push({
      //       name: 'home',
      //     })
      //   }, 100) // wait for API to update locations/Groups
      // } catch (error) {
      //   console.log(error)
      //   this.snackbar.text = this.$i18n.t('something_wrong')
      //   this.snackbar.show = true
      // }
    },
    async readGroups() {
      try {
        const response = await this.$store.dispatch('groups/findAll')
        this.groups = response.groups
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async readGroup() {
      try {
        const response = await this.$store.dispatch('groups/findById', this.id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'group' } })
        }
        const group = response.groups[0]
        this.activeGroup = group
        this.setGroupEdited(false)
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'group' } })
      }
    },
    async updateGroup() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('update Group')
        console.log(this.activeGroup)
        // try {
        //   const response = await this.$store.dispatch(
        //     'groups/saveGroupSettings',
        //     this.activeGroup
        //   )
        //   if (!response) {
        //     this.snackbar.text = this.$i18n.t('not_saved_error')
        //     this.snackbar.show = true
        //   }
        //   setTimeout(() => {
        //     return this.$router.push({
        //       name: 'home',
        //     })
        //   }, 300) // wait for API to update locations/Groups
        // } catch (error) {
        //   console.log(error)
        //   this.snackbar.text = this.$i18n.t('not_saved_error')
        //   this.snackbar.show = true
        // }
      }
    },
    confirmDeleteGroup() {
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete') + ' ' + this.$i18n.tc('group', 1),
          this.$i18n.t('Remove_group'),
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteGroup()
        })
        .catch((reject) => {
          return true
        })
    },
    saveGroup() {
      if (this.createRoute) {
        this.createGroup()
      } else {
        this.updateGroup()
      }
    },
    setGroupEdited(bool) {
      this.$store.commit('groups/setGroupEdited', bool)
    },
    unauthorizedText() {
      return (
        this.$i18n.t('sorry') +
        ', ' +
        this.$i18n.tc('group', 1) +
        ' "' +
        this.activeGroup.name +
        '" ' +
        this.$i18n.t('not_editable')
      )
    },
    updateGroupProperties(event, property) {
      var value = null
      if (event === null) {
        value = null
      } else if (event.target !== undefined) {
        value = event.target.value
      } else {
        value = event
      }
      this.activeGroup[property] = value
      this.setGroupEdited(true)
    },
    validateText(value, property, maxLength) {
      if (value !== null && value.length > maxLength + 1) {
        value = value.substring(0, maxLength)
        this.activeGroup[property] = value
      }
      this.setGroupEdited(true)
    },
  },
}
</script>

<style lang="scss">
.group-edit {
  .group-edit-name {
    padding-top: 0;
    font-size: 2rem;

    &.v-input input {
      min-height: 45px !important;
      max-height: 45px !important;
    }
  }
  .group-color {
    width: 35px;
    height: 35px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
}
</style>
