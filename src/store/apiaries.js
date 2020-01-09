var Vue = require('vue').default

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
  getters: {
    highestHive: state => {
      // returns the highest hive across all apiaries
      return Math.max(
        ...state.apiaries.map(apiary =>
          Math.max(...apiary.hives.map(hive => hive.honey + hive.brood))
        )
      )
    },
    widestApiary: state => {
      // returns the widest apiary (most total frames)
      return Math.max(
        ...state.apiaries.map(apiary =>
          apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
        )
      )
    },
  },

  mutations: {
    setSelectedApiary(state, apiary) {
      state.selectedApiary = apiary
    },
    selectHive(state, hive) {
      Vue.set(hive, 'selected', !hive.selected)
    },
    addHive(state, { apiary = null, hive = null }) {
      if (!apiary) {
        apiary = state.selectedApiary
      }
      const defaultHive = {
        brood: 1,
        honey: 1,
        frames: 10,
        color: 'orange',
      }
      if (!hive) {
        hive = { ...defaultHive }
      }
      apiary.hives.push(hive)
    },
    setHives(state, { apiary = null, hives = null }) {
      if (!apiary || !hives) {
        console.log('setHives: apiary or hives not given')
        return
      }
      Vue.set(apiary, 'hives', hives)
    },
    createApiary(state, { apiary = null }) {
      const defaultApiary = {
        id: Math.max(state.apiaries.map(apiary => apiary.id) + 1),
        title: 'New Apiary',
        hives: [].splice(),
      }
      if (!apiary) {
        apiary = defaultApiary
      }
      state.apiaries.push(apiary)
    },
    updateApiary(state, { apiary = null, id = null, update = null }) {
      id = id || apiary.id
      if (!id) {
        console.log('updateApiary: apiary or id not given')
        return
      }
      let index = state.apiaries.map(apiary => apiary.id).indexOf(id)
      if (index > -1) {
        if (update) {
          state.apiaries.splice(index, 1, update)
        } else {
          state.apiaries.splice(index, 1)
        }
      }
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
    selectHive({ commit }, payload) {
      return commit('selectHive', payload)
    },
    addHive({ commit }, payload) {
      return commit('addHive', payload)
    },
    createApiary({ commit }) {
      return commit('createApiary')
    },
    updateApiary({ commit }, payload) {
      return commit('updateApiary', payload)
    },
    deleteApiary({ commit }, payload) {
      return commit('deleteApiary', payload)
    },
  },
}
