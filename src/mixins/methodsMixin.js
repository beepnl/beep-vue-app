import Api from '@api/Api'
import { mapGetters } from 'vuex'

export const checkAlerts = {
  computed: {
    ...mapGetters('alerts', [
      'alertRules',
      'alertRulesChecked',
      'alerts',
      'alertsChecked',
    ]),
  },
  methods: {
    // only read alert rules when they are either not checked yet, or checked AND present (used for updating alertrules after deleting a hive)
    async checkAlertRules() {
      if (
        !this.alertRulesChecked ||
        (this.alertRulesChecked && this.alertRules.length > 0)
      ) {
        this.readAlertRules()
      }
    },
    // check whether alertrules & alerts have been read, if not do so, then only read alerts if alert rules OR alerts are present
    async checkAlertRulesAndAlerts() {
      this.$store.commit('alerts/setData', {
        prop: 'alertsLoading',
        value: true,
      })
      if (!this.alertRulesChecked) {
        this.readAlertRules().then(() => {
          this.readAlerts().then(() => {
            return true
          })
        })
      } else {
        this.readAlerts().then(() => {
          return true
        })
      }
    },
    async readAlertRules() {
      try {
        this.$store.commit('alerts/setData', {
          prop: 'alertRulesChecked',
          value: true,
        })
        const response = await Api.readRequest('/alert-rules')
        this.$store.commit('alerts/setData', {
          prop: 'alertRules',
          value: response.data.alert_rules,
        })
        return true
      } catch (error) {
        this.$store.commit('alerts/setData', {
          prop: 'alertsLoading',
          value: false,
        })
        if (error.response) {
          console.log('Error: ', error.response)
          if (error.response.status === 404) {
            this.$store.commit('alerts/setData', {
              prop: 'alertRules',
              value: [],
            })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    // only read alerts if alert rules present
    async readAlerts() {
      if (
        (this.alertRulesChecked &&
          (this.alertRules.length > 0 || this.alerts.length > 0)) ||
        !this.alertsChecked
      ) {
        try {
          this.$store.commit('alerts/setData', {
            prop: 'alertsChecked',
            value: true,
          })
          const response = await Api.readRequest('/alerts')
          this.$store.commit('alerts/setData', {
            prop: 'alerts',
            value: response.data.alerts,
          })
          this.$store.commit('alerts/setData', {
            prop: 'alertsLoading',
            value: false,
          })
          return true
        } catch (error) {
          this.$store.commit('alerts/setData', {
            prop: 'alertsLoading',
            value: false,
          })
          if (error.response) {
            console.log('Error: ', error.response)
            if (error.response.status === 404) {
              this.$store.commit('alerts/setData', {
                prop: 'alerts',
                value: [],
              })
            }
          } else {
            console.log('Error: ', error)
          }
        }
      } else {
        this.$store.commit('alerts/setData', {
          prop: 'alertsLoading',
          value: false,
        })
        return true
      }
    },
  },
}

export const readHiveTags = {
  computed: {
    ...mapGetters('hives', ['hiveTags', 'hiveTagsChecked']),
  },
  methods: {
    async readHiveTags() {
      try {
        this.$store.commit('hives/setData', {
          prop: 'hiveTagsChecked',
          value: true,
        })
        const response = await Api.readRequest('/hive-tags')
        this.$store.commit('hives/setData', {
          prop: 'hiveTags',
          value: response.data,
        })
        return response.data
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          if (error.response.status === 404) {
            this.$store.commit('hives/setData', {
              prop: 'hiveTags',
              value: [],
            })
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    // only read hive tags when they are not checked yet
    async readHiveTagsIfNotChecked() {
      if (!this.hiveTagsChecked) {
        try {
          this.$store.commit('hives/setData', {
            prop: 'hiveTagsChecked',
            value: true,
          })
          const response = await Api.readRequest('/hive-tags')
          this.$store.commit('hives/setData', {
            prop: 'hiveTags',
            value: response.data,
          })
          return response.data
        } catch (error) {
          if (error.response) {
            console.log('Error: ', error.response)
            if (error.response.status === 404) {
              this.$store.commit('hives/setData', {
                prop: 'hiveTags',
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

export const convertComma = {
  // method for el-input-number with 1 or more decimals
  methods: {
    convertComma(event, object, property, precision = 1) {
      // console.log('convert comma', event.target.value)
      var value = event.target.value
      // if user inputs a value with a comma followed by at least one decimal, convert it to a dot
      if (value.toString().indexOf(',') > -1) {
        if (
          precision <= 1 &&
          value.length > value.toString().indexOf(',') + precision
        ) {
          this.convert(value, object, property)
        } else if (precision > 1) {
          // wait for user to stop typing if precision > 1
          setTimeout(() => {
            this.convert(value, object, property)
          }, 1200)
        }
      }
    },
    convert(value, object, property) {
      console.log(value, ' convert')
      value = parseFloat(value.toString().replace(',', '.'))
      object[property] = value
      this.checkProperty(value, object, property)
    },
    checkProperty(value, object, property) {
      // always include both lat & lon even when editing only one of them, only for existing apiary (that has id)
      if (object.id !== undefined && property === 'lat') {
        object.coordinate_lat = value
        object.lon = object.coordinate_lon
      } else if (object.id !== undefined && property === 'lon') {
        object.coordinate_lon = value
        object.lat = object.coordinate_lat
      }
    },
  },
}

export const deleteHiveTag = {
  ...mapGetters('hives', ['hiveTagActionDescriptions']),
  methods: {
    async deleteHiveTag(hiveTag) {
      try {
        const response = await Api.deleteRequest('/hive-tags/', hiveTag.tag)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        setTimeout(() => {
          return this.readHiveTags().then(() => {
            if (this.$route.name !== 'hivetags') {
              this.$router.push({
                name: 'hivetags',
              })
            } else {
              if (this.hiveTags.length === 0) {
                this.showExplanation = true
              }
            }
          })
        }, 50) // wait for API to update hive tags
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
    confirmDeleteHiveTag(hiveTag, hiveName) {
      var description = this.hiveTagActionDescriptions[hiveTag.action_id]
      this.$refs.confirm
        .open(
          this.$i18n.t('Delete_hivetag'),
          this.$i18n.t('Delete_hivetag') +
            ' (' +
            hiveTag.tag +
            (description ? ' - ' + this.$i18n.t(description) : '') +
            (hiveName
              ? ' - ' + this.$i18n.t('for_hive') + hiveName + '"'
              : '') +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteHiveTag(hiveTag)
        })
        .catch((reject) => {
          return true
        })
    },
  },
}

export const orderedLayers = {
  methods: {
    orderedLayers: function(hive) {
      // change sorting if hive was created in app v2 to make sure it is being displayed correctly in v3 (honey layers on top of brood layers)
      var v2hive = hive.layers.filter((layer) => layer.order === 0).length > 0 // only v2 hives have at least one layer with order number 0
      if (v2hive) {
        return hive.layers.slice().sort(function(a, b) {
          if (a.type === 'honey' && b.type === 'brood') {
            return -1
          }
          if (b.type === 'honey' && a.type === 'brood') {
            return 1
          }
          if (a.order > b.order) {
            return -1
          }
          if (b.order > a.order) {
            return 1
          }
          return 0
        })
      } else {
        return hive.layers.slice().sort(function(a, b) {
          if (a.type === 'feeding_box') {
            return -1
          }
          if (b.type === 'feeding_box') {
            return 1
          }
          if (a.order > b.order) {
            return -1
          }
          if (b.order > a.order) {
            return 1
          }
          return 0
        })
      }
    },
  },
}

export const readAlertRules = {
  methods: {
    async readAlertRules() {
      try {
        this.$store.commit('alerts/setData', {
          prop: 'alertRulesChecked',
          value: true,
        })
        const response = await Api.readRequest('/alert-rules')
        this.$store.commit('alerts/setData', {
          prop: 'alertRules',
          value: response.data.alert_rules,
        })
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          if (error.response.status === 404) {
            this.$store.commit('alerts/setData', {
              prop: 'alertRules',
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
        this.setHivesObject(
          responseApiaries.data.locations,
          responseGroups.data.groups
        )
        return true
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    setHivesObject(apiaries, groups) {
      const ownHivesArray = []
      apiaries.forEach((apiary) => {
        apiary.hives.forEach((hive) => {
          hive.label = hive.name
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      groups.forEach((group) => {
        group.hives.forEach((hive) => {
          hive.label = hive.name
          hive.group_name = group.name
          sharedHivesArray.push(hive)
        })
      })

      const allHives = ownHivesArray.concat(sharedHivesArray)

      var uniqueHives = {}
      const map = new Map()
      for (const item of allHives) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          uniqueHives[item.id] = item
        }
      }

      this.$store.commit('hives/setData', {
        prop: 'hivesObject',
        value: uniqueHives,
      })
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
          this.setHivesObject(
            responseApiaries.data.locations,
            responseGroups.data.groups
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
    setHivesObject(apiaries, groups) {
      const ownHivesArray = []
      apiaries.forEach((apiary) => {
        apiary.hives.forEach((hive) => {
          hive.label = hive.name
          ownHivesArray.push(hive)
        })
      })

      const sharedHivesArray = []
      groups.forEach((group) => {
        group.hives.forEach((hive) => {
          hive.label = hive.name
          hive.group_name = group.name
          sharedHivesArray.push(hive)
        })
      })

      const allHives = ownHivesArray.concat(sharedHivesArray)

      var uniqueHives = {}
      const map = new Map()
      for (const item of allHives) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          uniqueHives[item.id] = item
        }
      }

      this.$store.commit('hives/setData', {
        prop: 'hivesObject',
        value: uniqueHives,
      })
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
              prop: 'devices',
              value: [],
            })
            this.$store.commit('devices/setData', {
              prop: 'devicesPresent',
              value: false,
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
      const devicesPresent = this.$store.getters['devices/devicesPresent']

      if (devicesPresent && this.devices.length === 0) {
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
                prop: 'devices',
                value: [],
              })
              this.$store.commit('devices/setData', {
                prop: 'devicesPresent',
                value: false,
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

export const readGeneralInspectionsIfNotPresent = {
  methods: {
    async readGeneralInspectionsIfNotPresent() {
      if (this.generalInspections.length === 0) {
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
      } else {
        return true
      }
    },
  },
}

export const readTaxonomy = {
  methods: {
    async readTaxonomy() {
      const beeRacesList = this.$store.getters['taxonomy/beeRacesList']
      if (beeRacesList.length === 0) {
        try {
          const response = await Api.readRequest('/taxonomy/lists')
          this.$store.commit('taxonomy/setData', {
            prop: 'taxonomyLists',
            value: response.data,
          })
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      }
    },
  },
}

export const toggleFilterByGroup = {
  methods: {
    toggleFilterByGroup() {
      switch (this.filterByGroupStatus) {
        case 'off':
          this.filterByGroupStatus = 'group'
          break
        case 'group':
          this.filterByGroupStatus = 'owned'
          break
        case 'owned':
          this.filterByGroupStatus = 'off'
          break
      }
    },
  },
}
