<template>
  <Layout :title="getTitle()">
    <v-form ref="form" v-model="valid" @submit.prevent="saveGroup">
      <v-toolbar v-if="activeGroup" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="activeGroup && !createMode && tabletLandscapeUp"
          tile
          outlined
          color="red"
          class="mr-3"
          @click="confirmDeleteOrDetachGroup"
        >
          <v-icon left>mdi-delete</v-icon>
          {{
            `${activeGroup.creator ? $t('Delete') : $t('Detach_from_group')}`
          }}
        </v-btn>
        <v-icon
          v-if="activeGroup && !createMode && !tabletLandscapeUp"
          dark
          class="mr-4"
          color="red"
          @click="confirmDeleteOrDetachGroup"
          >mdi-delete</v-icon
        >

        <v-btn
          tile
          outlined
          color="black"
          :class="`mr-1 ${createMode ? 'save-button-mobile-wide' : ''}`"
          type="submit"
          :disabled="!valid || showLoadingIcon"
        >
          <v-progress-circular
            v-if="showLoadingIcon"
            class="ml-n1 mr-2"
            size="18"
            width="2"
            color="disabled"
            indeterminate
          />
          <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-toolbar>

      <v-container class="group-edit content-container">
        <v-row v-if="errorMessage">
          <v-col cols="12">
            <v-alert text prominent dense type="error" color="red">
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="showSuccessMessage">
          <v-col cols="12">
            <v-alert
              v-model="showSuccessMessage"
              text
              prominent
              dense
              dismissible
              type="success"
              color="green"
            >
              {{ successMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row
          v-if="
            (showGroupDetails && activeGroup && createMode) ||
              (showGroupDetails &&
                activeGroup &&
                !createMode &&
                (activeGroup.creator || activeGroup.admin))
          "
        >
          <v-col cols="12">
            <div class="overline mb-3">{{
              $tc('Group', 1) + ' ' + $t('settings')
            }}</div>
            <div class="rounded-border">
              <v-row>
                <v-col cols="12" sm="8" md="6" lg="5">
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
                    <v-toolbar
                      class="hive-color-picker-toolbar"
                      dense
                      light
                      flat
                    >
                      <div
                        class="hive-color-picker-title ml-1"
                        v-text="`${$tc('Group', 1) + ' ' + $t('color')}`"
                      ></div>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-icon class="mr-1" @click="overlay = false"
                          >mdi-close</v-icon
                        >
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

                    <v-toolbar
                      class="hive-color-picker-footer"
                      dense
                      light
                      flat
                    >
                      <v-spacer></v-spacer>
                      <v-icon
                        class="mr-1"
                        color="accent"
                        @click="editGroup(colorPickerValue, 'hex_color')"
                        >mdi-check</v-icon
                      >
                    </v-toolbar>
                  </v-overlay>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <v-row
          v-if="
            (showGroupDetails && activeGroup && createMode) ||
              (showGroupDetails &&
                activeGroup &&
                !createMode &&
                (activeGroup.creator || activeGroup.admin))
          "
        >
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <div class="overline mb-3">{{
                $tc('Member', activeGroup.users.length) +
                  ' (' +
                  activeGroup.users.length +
                  ')'
              }}</div>
              <v-spacer></v-spacer>
              <v-btn tile outlined color="accent" @click="addGroupUser">
                <v-icon left>mdi-plus</v-icon>
                {{ tabletLandscapeUp ? $t('Add_member') : $t('add') }}
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
                    <tr
                      v-for="(user, index) in activeGroup.users"
                      :key="index"
                      :class="user.delete === true ? 'user-delete' : ''"
                    >
                      <td>{{ index + 1 }}</td>
                      <td :class="mobile ? 'td--small' : ''">
                        <v-text-field
                          v-model="user.name"
                          :disabled="user.id && user.id !== null"
                          :placeholder="`${$t('invitee_name')}`"
                          class="mt-2"
                          dense
                        ></v-text-field>
                      </td>
                      <td :class="mobile ? 'td--medium' : ''">
                        <v-text-field
                          v-model="user.email"
                          :disabled="user.id && user.id !== null"
                          :placeholder="`${$t('email_is_required')}`"
                          class="mt-2"
                          dense
                        ></v-text-field>
                      </td>
                      <td>
                        <span
                          v-if="
                            user.declined !== undefined &&
                              user.declined === null &&
                              user.invited !== undefined &&
                              user.invited !== null
                          "
                          >{{ momentify(user.invited, true) }}</span
                        >
                        <span
                          v-else-if="
                            user.declined !== undefined &&
                              user.declined !== null &&
                              !user.creator
                          "
                          >{{ $t('group_declined') }}</span
                        >
                      </td>
                      <td>
                        <v-checkbox
                          v-if="!user.creator"
                          v-model="user.admin"
                          color="accent"
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

        <v-row v-if="showGroupDetails && activeGroup">
          <v-col cols="12">
            <div class="overline mb-3">{{
              $t('My_shared') + ' ' + $tc('hive', 2)
            }}</div>
            <div class="rounded-border">
              <div
                v-if="showApiaryPlaceholder"
                class="apiary-placeholder d-flex flex-column align-start"
              >
                <div class="beep-label mt-3 mt-sm-1 mb-3 mb-sm-4">{{
                  $t('no_apiaries_yet')
                }}</div>

                <router-link
                  class="apiary-placeholder-item mb-3"
                  :to="{
                    name: `apiary-create`,
                  }"
                >
                  <div class="color-accent"
                    ><v-icon color="accent" left>mdi-plus-circle</v-icon
                    >{{ $t('Add_apiary') }}</div
                  >
                </router-link>
              </div>
              <div v-if="!showApiaryPlaceholder">
                <div
                  class="beep-label mt-1 mb-3 mb-sm-4"
                  v-text="
                    `${$t('Select') +
                      ' ' +
                      $tc('hive', 2) +
                      ' ' +
                      $t('to_share')}`
                  "
                ></div>
                <div v-for="(apiary, i) in filteredApiaries" :key="i">
                  <div
                    class="apiary-title d-flex flex-row justify-flex-start align-center"
                    :style="
                      `color: ${
                        apiary.hex_color ? apiary.hex_color : ''
                      }; border-color: ${
                        apiary.hex_color ? apiary.hex_color : ''
                      };`
                    "
                  >
                    <v-icon
                      class="icon-apiary-owned ml-1 mr-2 my-0"
                      :style="
                        `background-color: ${
                          apiary.hex_color ? apiary.hex_color : ''
                        }; border-color: ${
                          apiary.hex_color ? apiary.hex_color : ''
                        };`
                      "
                    >
                      mdi-home-analytics
                    </v-icon>
                    <h4 v-text="apiary.name"></h4>
                  </div>

                  <ApiaryPreviewHiveSelector
                    class="mb-3"
                    :hives="apiary.hives"
                    :hives-selected="activeGroup.hives_selected"
                    :hives-editable="activeGroup.hives_editable"
                    :group-mode="true"
                    @select-hive="selectHive($event)"
                  ></ApiaryPreviewHiveSelector>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="accent" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import { momentify } from '@mixins/momentMixin'
import { readApiariesAndGroupsIfNotPresent } from '@mixins/methodsMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
  },
  mixins: [momentify, readApiariesAndGroupsIfNotPresent],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      swatchesGroup: [
        ['#606060', '#b7701f', '#F8B133'],
        ['#2dbde5', '#094da0', '#27820e'],
        ['#ffe900', '#d80d0d', '#754B1F'],
      ],
      colorPickerValue: '',
      activeGroup: null,
      valid: false,
      showLoadingIcon: false,
      newGroupNumber: 1,
      overlay: false,
      showSuccessMessage: false,
      showGroupDetails: false,
      errorMessage: null,
      token: null,
      successMessage: null,
    }
  },
  computed: {
    ...mapGetters('auth', ['userEmail', 'userName']),
    ...mapGetters('groups', ['groupEdited', 'groups']),
    ...mapGetters('locations', ['apiaries']),
    id() {
      return parseInt(this.$route.params.id)
    },
    createMode() {
      return this.$route.name === 'group-create'
    },
    acceptMode() {
      return this.$route.name === 'group-accept'
    },
    colorPicker: {
      get() {
        if (this.activeGroup) {
          return this.activeGroup.hex_color
        } else {
          return '#F8B133'
        }
      },
      set(value) {
        this.colorPickerValue = value
      },
    },
    filteredApiaries() {
      const sortedAndFilledApiaries = this.apiaries
        .slice()
        .sort(function(a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        })
        .filter((x) => x.hives.length > 0)
      return sortedAndFilledApiaries
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    requiredRule: function() {
      return [
        (v) =>
          !!v ||
          this.$i18n.t('the_field') +
            ' "' +
            this.$i18n.t('Name') +
            '" ' +
            this.$i18n.t('is_required'),
      ]
    },
    showApiaryPlaceholder() {
      return this.apiaries.length === 0
    },
    tabletLandscapeUp() {
      return this.$vuetify.breakpoint.mdAndUp
    },
  },
  created() {
    this.readApiariesAndGroupsIfNotPresent().then((response) => {
      // If Group-create route is used, make empty Group object
      if (this.createMode) {
        if (this.groups.length > 0) {
          this.newGroupNumber = this.groups.length + 1
        }
        this.activeGroup = {
          hex_color: '#F8B133',
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
        this.showGroupDetails = true
        // Else retrieve to-be-edited Group
      } else if (this.acceptMode) {
        this.token = this.$route.params.token || null
        if (this.token) {
          this.checkToken(this.token, this.id).then(() => {
            if (this.errorMessage === null) {
              this.readGroup()
              this.showGroupDetails = true
            }
          })
        }
      } else {
        this.readGroup()
        this.showGroupDetails = true
      }
    })
    this.setGroupEdited(false)
  },
  methods: {
    async checkToken(token, groupId) {
      try {
        const response = await Api.postRequest('/groups/checktoken', {
          group_id: groupId,
          token: token,
        })
        if (!response.data.errors) {
          this.successMessage = this.$i18n.t('Invitation_accepted')
          this.showSuccessMessage = true
          this.readGroups().then(() => {
            var group = this.groups.filter((group) => group.id === groupId)[0]
            this.$store.commit('locations/setData', {
              prop: 'hiveSearch',
              value: group.name, // set search term via store instead of query to overrule possible stored search terms
            })
          })
        } else if (response.data.errors.token) {
          this.errorMessage =
            this.$i18n.t('Error') + ': ' + response.data.errors.token
          this.showGroupDetails = false
        } else if (!response) {
          this.$router.push({ name: '404', params: { resource: 'Invitation' } })
        }
        return true
      } catch (error) {
        console.log('Error: ', error)
        this.$router.push({ name: '404', params: { resource: 'Invitation' } })
      }
    },
    async createGroup() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('create Group')
        console.log(this.activeGroup)
        try {
          const response = await Api.postRequest('/groups', this.activeGroup)
          if (!response) {
            this.errorMessage =
              this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
            this.showLoadingIcon = false
          }
          setTimeout(() => {
            return this.readGroups().then(() => {
              this.$store.commit('locations/setData', {
                prop: 'hiveSearch',
                value: this.activeGroup.name, // set search term via store instead of query to overrule possible stored search terms
              })
              this.$router.push({
                name: 'home',
              })
            })
          }, 50) // wait for API to update groups
        } catch (error) {
          this.errorMessage =
            error.status === 422
              ? this.$i18n.t('Error') +
                ': ' +
                Object.values(error.message).join(', ')
              : this.$i18n.t('empty_fields') + '.'
          console.log('Error: ', this.errorMessage)
          this.showLoadingIcon = false
        }
      }
    },
    async deleteGroup() {
      try {
        const response = await Api.deleteRequest(
          '/groups/',
          this.activeGroup.id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.readGroups().then(() => {
            this.$router.push({
              name: 'home',
            })
          })
        }, 50) // wait for API to update groups
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
      }
    },
    async detachGroup() {
      try {
        const response = await Api.deleteRequest(
          '/groups/detach/',
          this.activeGroup.id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.readGroups().then(() => {
            this.$router.push({
              name: 'home',
            })
          })
        }, 50) // wait for API to update groups
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
      }
    },
    async readGroup() {
      try {
        const response = await Api.readRequest('/groups/', this.id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'group' } })
        }
        var group = response.data
        // eslint-disable-next-line camelcase
        var hives_selected = []
        // eslint-disable-next-line camelcase
        var hives_editable = []
        if (typeof group.hives !== 'undefined' && group.hives.length > 0) {
          group.hives.map((hive) => {
            if (hive.editable) {
              hives_editable.push(hive.id)
            }
            hives_selected.push(hive.id)
          })
        }
        // eslint-disable-next-line camelcase
        group.hives_selected = hives_selected
        // eslint-disable-next-line camelcase
        group.hives_editable = hives_editable
        var usersWithDeleteProp = group.users // otherwise Vue can't track the 'delete' property
        usersWithDeleteProp.map((user) => {
          user.delete = false
        })
        group.users = usersWithDeleteProp

        this.activeGroup = group
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
        this.$router.push({ name: '404', params: { resource: 'group' } })
      }
    },
    async readGroups() {
      try {
        const response = await Api.readRequest('/groups')
        this.$store.commit('groups/setGroups', response.data.groups)
        this.$store.commit('groups/setInvitations', response.data.invitations)
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async updateGroup() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('update Group')
        console.log(this.activeGroup)
        var group = {
          description: this.activeGroup.description,
          hex_color: this.activeGroup.hex_color,
          hives_editable: this.activeGroup.hives_editable,
          hives_selected: this.activeGroup.hives_selected,
          name: this.activeGroup.name,
          users: this.activeGroup.users,
        }
        try {
          const response = await Api.updateRequest(
            '/groups/',
            this.activeGroup.id,
            group
          )
          if (!response) {
            this.errorMessage =
              this.$i18n.t('Error') + ': ' + this.$i18n.t('not_saved_error')
          }
          this.successMessage = response.data.message
          this.showSuccessMessage = true
          setTimeout(() => {
            return this.readGroups().then(() => {
              this.$store.commit('locations/setData', {
                prop: 'hiveSearch',
                value: this.activeGroup.name, // set search term via store instead of query to overrule possible stored search terms
              })
              this.showLoadingIcon = false
              this.$router.push({
                name: 'home',
              })
            })
          }, 800) // wait for API to update groups and for user to read success message
        } catch (error) {
          if (error.response) {
            const msg = error.response.data.error
            this.errorMessage = msg
            this.showLoadingIcon = false
            console.log(error.response)
          } else {
            this.errorMessage = this.$i18n.t('empty_fields')
            this.showLoadingIcon = false
            console.log('Error: ', error)
          }
        }
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
    confirmDeleteOrDetachGroup() {
      const title = this.activeGroup.creator
        ? this.$i18n.t('Delete') + ' ' + this.$i18n.tc('group_short', 1)
        : this.$i18n.t('Delete')
      const message = this.activeGroup.creator
        ? this.$i18n.t('Remove_group') + '?'
        : this.$i18n.t('Detach_from_group') + '?'
      this.$refs.confirm
        .open(title, message, {
          color: 'red',
        })
        .then((confirm) => {
          if (this.activeGroup.creator) {
            this.deleteGroup()
          } else {
            this.detachGroup()
          }
        })
        .catch((reject) => {
          return true
        })
    },
    removeGroupUser(index) {
      return typeof this.activeGroup.users[index] !== 'undefined'
        ? this.activeGroup.users.splice(index, 1)
        : null
    },
    deleteGroupUser(index) {
      const user = this.activeGroup.users[index]
      if (typeof user.id === 'undefined') {
        return this.removeGroupUser(index)
      }
      user.delete = !user.delete
    },
    editGroup(value, property) {
      this.activeGroup[property] = value
      if (property === 'hex_color') {
        this.overlay = false
      }
      this.setGroupEdited(true)
    },
    getTitle() {
      var group = this.mobile
        ? this.$i18n.tc('group_short', 1)
        : this.$i18n.tc('group', 1)
      var addName = ''
      if (this.activeGroup && !this.createMode && !this.activeGroup.admin) {
        addName = ' - ' + this.activeGroup.name
      }
      if (this.createMode) {
        return this.$i18n.t('create_new') + ' ' + group
      } else if (this.acceptMode) {
        return this.$i18n.tc('Invitation', 1) + ' ' + group + addName
      } else {
        return this.$i18n.t('edit') + ' ' + group + addName
      }
    },
    saveGroup() {
      if (this.createMode) {
        this.createGroup()
      } else {
        this.updateGroup()
      }
    },
    selectHive(id) {
      if (!this.activeGroup.hives_selected.includes(id)) {
        this.activeGroup.hives_selected.push(id)
      } else if (!this.activeGroup.hives_editable.includes(id)) {
        this.activeGroup.hives_editable.push(id)
      } else if (
        this.activeGroup.hives_selected.includes(id) &&
        this.activeGroup.hives_editable.includes(id)
      ) {
        this.activeGroup.hives_selected.splice(
          this.activeGroup.hives_selected.indexOf(id),
          1
        )
        this.activeGroup.hives_editable.splice(
          this.activeGroup.hives_editable.indexOf(id),
          1
        )
      }
      this.setGroupEdited(true)
    },
    setGroupEdited(bool) {
      this.$store.commit('groups/setGroupEdited', bool)
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
    font-size: 1.6rem;
    @include for-tablet-landscape-up {
      font-size: 2rem;
    }

    &.v-text-field input {
      min-height: 45px !important;
    }
  }
  .apiary-title {
    width: 100%;
    padding-bottom: 4px;
    margin: 6px 0 16px;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
    @include for-phone-only {
      padding-bottom: 2px;
      margin: 4px 0 10px;
    }
  }
  .group-color {
    width: 35px;
    height: 35px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
  .user-label {
    font-size: 14px;
    @include for-phone-only {
      font-size: 12px;
    }
  }
  .user-delete {
    background-color: rgba(255, 0, 0, 0.2);
  }
}
</style>
