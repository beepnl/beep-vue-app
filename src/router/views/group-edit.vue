<template>
  <Layout :title="getTitle()" :no-box-shadow="true">
    <h1
      v-if="activeGroup && !activeGroup.creator && !activeGroup.admin"
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
        <v-btn
          v-if="activeGroup && activeGroup.creator && !createMode"
          tile
          outlined
          color="red"
          class="save-button mr-3"
          @click="confirmDeleteGroup"
        >
          <v-icon v-if="!showLoadingIcon" left>mdi-delete</v-icon>
          {{ $t('Delete') }}
        </v-btn>

        <v-btn
          v-if="activeGroup && !activeGroup.creator && !createMode"
          tile
          outlined
          color="red"
          class="save-button mr-3"
          @click="confirmDetachGroup"
        >
          <v-icon v-if="!showLoadingIcon" left>mdi-delete</v-icon>
          {{ $t('Detach_from_group') }}
        </v-btn>

        <v-btn
          tile
          outlined
          color="primary"
          class="save-button mr-1"
          type="submit"
          :disabled="!valid"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="primary"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') + ' ' + $tc('group', 1) }}
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
                <v-col cols="12" sm="6" md="5">
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
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-if="activeGroup"
                    v-model="activeGroup.description"
                    :label="`${$t('Description')}`"
                    :placeholder="`${$t('Description')}`"
                    class="group-edit-description"
                    counter="250"
                    rows="1"
                    clearable
                    auto-grow
                    @input="validateText($event, 'description', 250)"
                  >
                  </v-textarea>
                </v-col>

                <v-col cols="12">
                  <div>
                    <div
                      class="beep-label"
                      v-text="`${$tc('Group', 1)} ${$t('color')}`"
                    ></div>
                    <v-sheet
                      v-if="activeGroup"
                      class="group-color"
                      dark
                      :color="activeGroup.hex_color"
                      @click="overlay = !overlay"
                    ></v-sheet>
                  </div>

                  <v-overlay :value="overlay">
                    <v-toolbar class="hive-color-picker-toolbar" dense light>
                      <div
                        class="hive-color-picker-title"
                        v-text="`${$tc('Group', 1) + ' ' + $t('color')}`"
                      ></div>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-icon
                          class="mr-1"
                          color="primary"
                          @click="editGroup(colorPickerValue, 'hex_color')"
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

        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <div class="overline mb-4">{{
                $tc('Member', 1) + ' (' + activeGroup.users.length + ')'
              }}</div>
              <v-spacer></v-spacer>
              <v-btn
                tile
                outlined
                class="save-button"
                color="primary"
                @click="addGroupUser"
              >
                <v-icon left>mdi-plus</v-icon>
                {{ $t('add') + ' ' + $tc('member', 1) }}
              </v-btn>
            </div>
            <div class="rounded-border">
              <v-simple-table dense>
                <template v-slot>
                  <thead>
                    <tr>
                      <th class="text-left">
                        #
                      </th>
                      <th class="text-left">
                        {{ $t('Name') }}
                      </th>
                      <th class="text-left">
                        {{ $t('email') }}
                      </th>
                      <th class="text-left">
                        {{ $t('Invited') }}
                      </th>
                      <th class="text-left">
                        {{ $t('Type') }} {{ $tc('member', 1) }}
                      </th>
                      <th class="text-center">
                        {{ $t('Actions') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in activeGroup.users" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <v-text-field
                          v-model="user.name"
                          :disabled="user.id && user.id !== null"
                          :placeholder="`${$t('invitee_name')}`"
                          class="user-input mt-2 mb-n5"
                          solo
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="user.email"
                          :disabled="user.id && user.id !== null"
                          :placeholder="`${$t('email_is_required')}`"
                          class="user-input mt-2 mb-n5"
                          solo
                        ></v-text-field>
                      </td>
                      <td>
                        <span v-if="user.accepted === null">{{
                          user.invited
                        }}</span>
                      </td>
                      <td>
                        <v-checkbox
                          v-if="!user.creator"
                          v-model="user.admin"
                          color="primary"
                          class="mt-0"
                          :disabled="user.delete"
                          hide-details
                          :ripple="false"
                        >
                          <template v-slot:label>
                            <span class="user-label">{{ $t('Admin') }}</span>
                          </template>
                        </v-checkbox>
                        <span v-if="user.creator">{{ $t('Creator') }}</span>
                      </td>
                      <td class="text-center">
                        <v-icon
                          v-if="!user.creator"
                          dark
                          color="red"
                          @click="deleteGroupUser(index)"
                          >mdi-delete</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="overline mb-4">{{ $tc('Hive', 2) }}</div>
            <div class="rounded-border">
              <div v-for="(apiary, i) in apiaries" :key="i">
                <span>{{ apiary.name }}</span>
                <ApiaryPreviewHiveSelector
                  class="mt-4 mb-4"
                  :hives="apiary.hives"
                ></ApiaryPreviewHiveSelector>
              </div>
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
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'

export default {
  components: {
    ApiaryPreviewHiveSelector,
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
      apiaries: null,
      activeGroup: null,
      valid: false,
      showLoadingIcon: false,
      newGroupNumber: 1,
      overlay: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['userEmail', 'userName']),
    ...mapGetters('groups', ['groupEdited']),
    id() {
      return parseInt(this.$route.params.id)
    },
    createMode() {
      return this.$route.name === 'group-create'
    },
    colorPicker: {
      get() {
        if (this.activeGroup) {
          return this.activeGroup.hex_color
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
    this.readApiariesAndGroups().then((response) => {
      // If Group-create route is used, make empty Group object
      if (this.createMode) {
        if (this.groups.length > 0) {
          this.newGroupNumber = this.groups.length + 1
        }
        this.activeGroup = {
          creator: true,
          hex_color: '#F29100',
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
    async detachGroup() {
      console.log('detach Group')
      console.log(this.id)
      // TODO: fix
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await this.$store.dispatch('locations/findAll')
        const responseGroups = await this.$store.dispatch('groups/findAll')
        this.groups = responseGroups.groups
        this.apiaries = responseApiaries.locations
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async readGroup() {
      try {
        const response = await this.$store.dispatch('groups/findById', this.id)
        if (response === null) {
          this.$router.push({ name: '404', params: { resource: 'group' } })
        }
        this.activeGroup = response
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
    addGroupUser() {
      this.activeGroup.users.push({
        name: '',
        email: '',
        admin: false,
        creator: false,
      })
    },
    confirmDeleteGroup() {
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete') + ' ' + this.$i18n.tc('group', 1),
          this.$i18n.t('Remove_group') + '?',
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
    confirmDetachGroup() {
      this.$refs.confirm
        .open(this.$i18n.t('Delete'), this.$i18n.t('Detach_from_group') + '?', {
          color: 'red',
        })
        .then((confirm) => {
          this.detachGroup()
        })
        .catch((reject) => {
          return true
        })
    },
    deleteGroupUser(index) {
      return typeof this.activeGroup.users[index] !== 'undefined'
        ? this.activeGroup.users.splice(index, 1)
        : null
    },
    editGroup(value, property) {
      this.activeGroup[property] = value
      if (property === 'hex_color') {
        this.overlay = false
      }
      this.setGroupEdited(true)
    },
    getTitle() {
      if (this.createMode) {
        return this.$i18n.t('create_new') + ' ' + this.$i18n.tc('group', 1)
      } else {
        return this.$i18n.t('edit') + ' ' + this.$i18n.tc('group', 1)
      }
    },
    saveGroup() {
      if (this.createMode) {
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
    padding-top: 12px;
    font-size: 2rem;
    @include for-phone-only {
      font-size: 1.6rem;
    }

    &.v-text-field input {
      min-height: 45px !important;
    }
  }
  .user-input.v-text-field.v-text-field--solo .v-input__control {
    min-width: 160px !important;
  }

  .group-color {
    width: 35px;
    height: 35px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
  .user-label {
    font-size: 14px;
  }
}
</style>
