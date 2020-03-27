import Vue from 'vue'
export function setSelectedApiary(state, apiary) {
  state.apiary = apiary
}
export function setEditable(state, editable) {
  state.editing = editable
}
export function selectHive(_, hive) {
  Vue.set(hive, 'selected', !hive.selected)
}
export function unselectHives(state) {
  state.apiary.hives.forEach((hive) => Vue.set(hive, 'selected', false))
}
export function addHive(state, { apiary = null, hive = null }) {
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
}
export function setHives(_, { apiary = null, hives = null }) {
  if (!apiary || !hives) {
    return
  }
  Vue.set(apiary, 'hives', hives)
}
export function createApiary(state, { apiary = null }) {
  const defaultApiary = {
    id: Math.max(state.apiaries.map((apiary) => apiary.id) + 1),
    title: 'New Apiary',
    hives: [].splice(),
  }
  if (!apiary) {
    apiary = defaultApiary
  }
  state.apiaries.push(apiary)
}
export function updateApiary(
  state,
  { apiary = null, id = null, update = null }
) {
  id = id || apiary.id
  if (!id) {
    return
  }
  const index = state.apiaries.map((apiary) => apiary.id).indexOf(id)
  if (index > -1) {
    if (update) {
      state.apiaries.splice(index, 1, update)
    } else {
      state.apiaries.splice(index, 1)
    }
  }
}
