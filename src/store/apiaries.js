var Vue = require('vue').default

const uuidv5 = require('uuid/v5')
export default {
  namespaced: true,
  state() {
    return {
      selectedApiary: null,
      apiaries: [
        {
          id: 1,
          title: 'Backyard',
          hives: [
            {
              honey: 4,
              brood: 2,
              frames: 10,
              color: 'red',
            },
            {
              honey: 1,
              brood: 3,
              frames: 15,
              color: 'purple',
            },
          ],
          photo: true,
          warning: true,
        },
        {
          id: 2,
          title: 'Garden',
          hives: [
            {
              honey: 2,
              brood: 2,
              frames: 5,
              color: 'green',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
          ],
          photo: true,
        },
        {
          id: 3,
          title: 'Lakeside',
          hives: [
            {
              honey: 2,
              brood: 2,
              frames: 10,
              color: 'cyan',
            },
            {
              honey: 1,
              brood: 3,
              frames: 15,
              color: 'blue',
            },
          ],
          photo: true,
          warning: true,
          shared: true,
        },
        {
          id: 4,
          title: 'Mountain',
          hives: [
            {
              honey: 2,
              brood: 2,
              frames: 10,
              color: 'orange',
            },
            {
              honey: 1,
              brood: 3,
              frames: 15,
              color: 'yellow',
            },
            {
              honey: 2,
              brood: 2,
              frames: 15,
              color: 'yellow',
            },
            {
              honey: 5,
              brood: 3,
              frames: 10,
              color: 'red',
            },
            {
              honey: 2,
              brood: 2,
              frames: 15,
              color: 'deep-purple',
            },
            {
              honey: 5,
              brood: 3,
              frames: 10,
              color: 'red',
            },
          ],
          shared: true,
        },
      ],
    }
  },

  mutations: {
    setSelectedApiary(state, apiary) {
      state.selectedApiary = apiary
    },
    selectHive(state, hive) {
      Vue.set(hive, 'selected', !hive.selected)
    },
    addHive(state, apiary) {
      const defaultHive = {
        brood: 1,
        honey: 1,
        frames: 10,
        color: 'orange',
      }
      apiary.hives.push(defaultHive)
    },
    createApiary(state, apiary) {
      state.apiaries.push(apiary)
    },
    updateApiary(state, apiary) {
      state.apiaries.splice(state.apiaries.indexOf(apiary), 1, apiary)
    },
    deleteApiary(state, apiary) {
      state.apiaries.splice(state.apiaries.indexOf(apiary), 1)
    },
    updateApiaries(state, payload) {
      state.apiaries = payload
    },
  },

  actions: {
    selectApiary({ state, commit }, id) {
      let apiary = state.apiaries.find(apiary => apiary.id == id)
      if (apiary) {
        commit('setSelectedApiary', apiary)
        return apiary
      }
      return false
    },
    selectHive({ commit }, hive) {
      return commit('selectHive', hive)
    },
    addHive({ commit }, apiary) {
      return commit('addHive', apiary)
    },
    createApiary({ commit }, apiary) {
      return commit('createApiary', apiary)
    },
    updateApiary({ commit }, apiary) {
      return commit('updateApiary', apiary)
    },
    deleteApiary({ commit }, apiary) {
      return commit('deleteApiary', apiary)
    },
    updateApiaries({ commit }, payload) {
      return commit('updateApiaries', payload)
    },
  },
}
