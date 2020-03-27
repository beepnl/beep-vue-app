export function highestHive(state) {
  // returns the highest hive across all apiaries
  return Math.max(
    ...state.apiaries.map((apiary) =>
      Math.max(...apiary.hives.map((hive) => hive.honey + hive.brood))
    )
  )
}

export function widestApiary(state) {
  // returns the widest apiary (most total frames)
  return Math.max(
    ...state.apiaries.map((apiary) =>
      apiary.hives.reduce((frames, hive) => frames + hive.frames, 0)
    )
  )
}
export function selectedHives(state) {
  // returns an Array of currently selected hives
  const hiveIndexes = state.apiary.hives.reduce((hiveIndexes, hive, i) => {
    if (hive.selected) {
      hiveIndexes.push(i + 1)
    }
    return hiveIndexes
  }, [])
  return hiveIndexes
}
export function inspectionsForApiary(state) {
  return state.inspections.inspections.filter(
    (i) => i.apiary === state.apiary.title
  )
}
export function filteredInspections(_, getters) {
  if (!getters.selectedHives.length) {
    // show every hive in apiary
    return getters.inspectionsForApiary
  }
  return getters.inspectionsForApiary.filter((inspection) => {
    return (
      !inspection.hive || getters.selectedHives.indexOf(inspection.hive) !== -1
    )
  })
}
