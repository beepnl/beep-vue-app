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
