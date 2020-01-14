var Vue = require('vue').default
import inspections from './inspections'

export default {
  namespaced: true,
  modules: {
    inspections,
  },
  state() {
    return {
      apiary: null,
      editing: false,
      apiaries: [
        {
          id: 1,
          title: 'Backyard',
          city: 'Driebergen',
          lastvisit: 'today',
          hives: [
            {
              id: 1,
              honey: 4,
              brood: 2,
              frames: 10,
              color: 'red',
            },
            {
              id: 2,
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
          city: 'Utrecht',
          lastvisit: 'yesterday',
          hives: [
            {
              id: 3,
              honey: 2,
              brood: 2,
              frames: 5,
              color: 'green',
            },
            {
              id: 4,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 5,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 6,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 7,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 8,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 9,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 10,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 11,
              honey: 1,
              brood: 5,
              frames: 15,
              color: 'brown',
            },
            {
              id: 12,
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
          city: 'Madison',
          lastvisit: 'last week',
          hives: [
            {
              id: 13,
              honey: 2,
              brood: 2,
              frames: 10,
              color: 'cyan',
            },
            {
              id: 14,
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
          city: 'Geneva',
          lastvisit: '3 months ago',
          hives: [
            {
              id: 15,
              honey: 2,
              brood: 2,
              frames: 10,
              color: 'orange',
            },
            {
              id: 16,
              honey: 1,
              brood: 3,
              frames: 15,
              color: 'yellow',
            },
            {
              id: 17,
              honey: 2,
              brood: 2,
              frames: 15,
              color: 'yellow',
            },
            {
              id: 18,
              honey: 5,
              brood: 3,
              frames: 10,
              color: 'red',
            },
            {
              id: 19,
              honey: 2,
              brood: 2,
              frames: 15,
              color: 'deep-purple',
            },
            {
              id: 20,
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
    selectedHives: state => {
      // returns an Array of currently selected hives
      let hiveIndexes = state.apiary.hives.reduce((hiveIndexes, hive, i) => {
        if (hive.selected) {
          hiveIndexes.push(i + 1)
        }
        return hiveIndexes
      }, [])
      return hiveIndexes
    },
    inspectionsForApiary: state => {
      return state.inspections.inspections.filter(
        i => i.apiary == state.apiary.title
      )
    },
    filteredInspections: (state, getters) => {
      if (!getters.selectedHives.length) {
        // show every hive in apiary
        return getters.inspectionsForApiary
      }
      return getters.inspectionsForApiary.filter(inspection => {
        return (
          !inspection.hive ||
          getters.selectedHives.indexOf(inspection.hive) != -1
        )
      })
    },
  },

  mutations: {
    setSelectedApiary(state, apiary) {
      state.apiary = apiary
    },
    setEditable(state, editable) {
      state.editing = editable
    },
    selectHive(state, hive) {
      Vue.set(hive, 'selected', !hive.selected)
    },
    unselectHives(state) {
      console.log('unselectHives')
      state.apiary.hives.forEach(hive => Vue.set(hive, 'selected', false))
    },
    addHive(state, { apiary = null, hive = null }) {
      if (!apiary) {
        apiary = state.apiary
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
    editOn({ commit }) {
      return commit('setEditable', true)
    },
    editOff({ commit }) {
      return commit('setEditable', false)
    },
    selectHive({ commit }, payload) {
      return commit('selectHive', payload || {})
    },
    unselectHives({ commit }) {
      return commit('unselectHives')
    },
    addHive({ commit }, payload) {
      return commit('addHive', payload || {})
    },
    createApiary({ commit }) {
      return commit('createApiary')
    },
    updateApiary({ commit }, payload) {
      return commit('updateApiary', payload || {})
    },
    deleteApiary({ commit }, payload) {
      return commit('deleteApiary', payload || {})
    },
  },
}
