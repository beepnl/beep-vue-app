<template>
  <Layout :title="getTitle()" :no-box-shadow="true">
    <v-form ref="form" v-model="valid" @submit.prevent="saveGroup">
      <v-toolbar v-if="activeGroup" class="save-bar" dense light>
        <v-spacer></v-spacer>
        <v-btn
          v-if="activeGroup && !createMode"
          tile
          outlined
          color="red"
          class="show-on-desktop save-button mr-3"
          @click="confirmDeleteOrDetachGroup"
        >
          <v-icon left>mdi-delete</v-icon>
          {{
            `${activeGroup.creator ? $t('Delete') : $t('Detach_from_group')}`
          }}
        </v-btn>
        <v-icon
          v-if="activeGroup && !createMode"
          dark
          class="hide-on-desktop mr-4"
          color="red"
          @click="confirmDeleteOrDetachGroup"
          >mdi-delete</v-icon
        >

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
          {{ $t('save') + ' ' + $tc('group_short', 1) }}
        </v-btn>
      </v-toolbar>

      <v-container v-if="activeGroup" class="group-edit content-container">
        <v-row
          v-if="
            (activeGroup && createMode) ||
              (activeGroup &&
                !createMode &&
                (activeGroup.creator || activeGroup.admin))
          "
        >
          <v-col cols="12">
            <div class="overline mb-4">{{
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

        <v-row
          v-if="
            (activeGroup && createMode) ||
              (activeGroup &&
                !createMode &&
                (activeGroup.creator || activeGroup.admin))
          "
        >
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <div class="overline mb-4">{{
                $tc('Member', activeGroup.users.length) +
                  ' (' +
                  activeGroup.users.length +
                  ')'
              }}</div>
              <v-spacer></v-spacer>
              <v-btn
                tile
                outlined
                class="show-on-desktop save-button"
                color="primary"
                @click="addGroupUser"
              >
                <v-icon left>mdi-plus</v-icon>
                {{ $t('add') + ' ' + $tc('member', 1) }}
              </v-btn>
              <v-btn
                tile
                outlined
                class="hide-on-desktop save-button"
                color="primary"
                @click="addGroupUser"
              >
                <v-icon left>mdi-plus</v-icon>
                {{ $t('add') }}
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
                          momentify(user.invited)
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
          <v-col v-if="activeGroup" cols="12">
            <div class="overline mb-4">{{
              $t('My_shared') + ' ' + $tc('hive', 2)
            }}</div>
            <div class="rounded-border">
              <div
                class="beep-label mt-3 mt-sm-1 mb-3 mb-sm-4"
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
                  class="mb-4"
                  :hives="apiary.hives"
                  :hives-selected="activeGroup.hives_selected"
                  :hives-editable="activeGroup.hives_editable"
                  @select-hive="selectHive($event)"
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
import Api from '@api/Api'
import ApiaryPreviewHiveSelector from '@components/apiary-preview-hive-selector.vue'
import Confirm from '@components/confirm.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    ApiaryPreviewHiveSelector,
    Confirm,
    Layout,
  },
  mixins: [momentMixin],
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
      activeGroup: null,
      valid: false,
      showLoadingIcon: false,
      newGroupNumber: 1,
      overlay: false,
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
    requiredRule: function() {
      return [
        (v) => !!v || this.$i18n.t('Name') + ' ' + this.$i18n.t('is_required'),
      ]
    },
  },
  created() {
    this.setGroupEdited(false)
    this.readApiariesAndGroups().then((response) => {
      // If Group-create route is used, make empty Group object
      if (this.createMode) {
        if (this.groups.length > 0) {
          this.newGroupNumber = this.groups.length + 1
        }
        this.activeGroup = {
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
        try {
          const response = await Api.createRequest('/groups', this.activeGroup)
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
              query: { search: this.activeGroup.name },
            })
          }, 300) // wait for API to update locations/Groups
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
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
          return this.$router.push({
            name: 'home',
          })
        }, 100) // wait for API to update groups
      } catch (error) {
        console.log('Error: ', error)
        this.snackbar.text = this.$i18n.t('something_wrong')
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
          return this.$router.push({
            name: 'home',
          })
        }, 100) // wait for API to update groups
      } catch (error) {
        console.log('Error: ', error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
        return true
      } catch (error) {
        console.log('Error: ', error)
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
          // eslint-disable-next-line camelcase
          group.hives_selected = hives_selected
          // eslint-disable-next-line camelcase
          group.hives_editable = hives_editable
        }
        this.activeGroup = group
        return true
      } catch (error) {
        console.log('Error: ', error)
        this.$router.push({ name: '404', params: { resource: 'group' } })
      }
    },
    async updateGroup() {
      if (this.$refs.form.validate()) {
        this.showLoadingIcon = true
        console.log('update Group')
        console.log(this.activeGroup)
        try {
          const response = await Api.updateRequest(
            '/groups/',
            this.activeGroup.id,
            this.activeGroup
          )
          if (!response) {
            this.snackbar.text = this.$i18n.t('not_saved_error')
            this.snackbar.show = true
          }
          setTimeout(() => {
            return this.$router.push({
              name: 'home',
            })
          }, 300) // wait for API to update locations/Groups
        } catch (error) {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('not_saved_error')
          this.snackbar.show = true
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
    margin: 10px 0 16px;
    color: $color-primary;
    border-bottom: 1px solid $color-primary;
    @include for-phone-only {
      padding-bottom: 2px;
      margin: 8px 0 10px;
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
