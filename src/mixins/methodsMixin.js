import Api from '@api/Api'

export const readAlerts = {
  methods: {
    async readAlerts() {
      try {
        const response = await Api.readRequest('/alerts')
        this.$store.commit('alerts/setData', {
          prop: 'alerts',
          value: response.data.alerts,
        })
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
  },
}

export const readApiariesAndGroups = {
  methods: {
    async readApiariesAndGroups() {
      try {
        const responseApiaries = await Api.readRequest('/locations')
        const responseGroups = await Api.readRequest('/groups')
        this.$store.commit(
          'locations/setApiaries',
          responseApiaries.data.locations
        )
        this.$store.commit('groups/setGroups', responseGroups.data.groups)
        this.$store.commit(
          'groups/setInvitations',
          responseGroups.data.invitations
        )
        // activate Hives & Diary group filter by default if user only has groups and no apiaries
        if (
          responseApiaries.data.locations.length === 0 &&
          responseGroups.data.groups.length > 0
        ) {
          this.$store.commit('locations/setData', {
            prop: 'hiveFilterByGroup',
            value: true,
          })
          this.$store.commit('inspections/setFilter', {
            filter: 'diaryFilterByGroup',
            value: true,
          })
        }
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
  },
}

export const readApiariesAndGroupsIfNotPresent = {
  methods: {
    async readApiariesAndGroupsIfNotPresent() {
      if (this.apiaries.length === 0 && this.groups.length === 0) {
        // in case view is opened directly without loggin in (via localstorage) or in case of hard refresh
        try {
          const responseApiaries = await Api.readRequest('/locations')
          const responseGroups = await Api.readRequest('/groups')
          this.$store.commit(
            'locations/setApiaries',
            responseApiaries.data.locations
          )
          this.$store.commit('groups/setGroups', responseGroups.data.groups)
          this.$store.commit(
            'groups/setInvitations',
            responseGroups.data.invitations
          )
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
  },
}

export const readDevices = {
  methods: {
    async readDevices() {
      // devicesPresent boolean prevents unnecessary API calls to read devices when user has none
      try {
        const response = await Api.readRequest('/devices')
        const devicesPresent = response.data.length > 0
        this.$store.commit('devices/setData', {
          prop: 'devices',
          value: response.data,
        })
        this.$store.commit('devices/setData', {
          prop: 'devicesPresent',
          value: devicesPresent,
        })
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
          if (error.response.data === 'no_devices_found') {
            this.$store.commit('devices/setData', {
              prop: 'devicesPresent',
              value: false,
            })
            this.$store.commit('devices/setData', {
              prop: 'devices',
              value: [],
            })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
  },
}

export const readDevicesIfNotPresent = {
  methods: {
    async readDevicesIfNotPresent() {
      // devicesPresent boolean prevents unnecessary API calls to read devices when user has none
      if (this.devicesPresent && this.devices.length === 0) {
        try {
          const response = await Api.readRequest('/devices')
          const devicesPresent = response.data.length > 0
          this.$store.commit('devices/setData', {
            prop: 'devices',
            value: response.data,
          })
          this.$store.commit('devices/setData', {
            prop: 'devicesPresent',
            value: devicesPresent,
          })
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
            if (error.response.data === 'no_devices_found') {
              this.$store.commit('devices/setData', {
                prop: 'devicesPresent',
                value: false,
              })
              this.$store.commit('devices/setData', {
                prop: 'devices',
                value: [],
              })
            }
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        return true
      }
    },
  },
}

export const readGeneralInspections = {
  methods: {
    async readGeneralInspections() {
      try {
        const response = await Api.readRequest('/inspections')
        this.$store.commit('inspections/setGeneralInspections', response.data)
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
  },
}
