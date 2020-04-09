import store from '@state/store'

export default function registerModule(path, module, namespaced = true) {
  // mixin to register axios-actions modules dynamically
  module.namespaced = namespaced
  return {
    mounted() {
      store.registerModule(path, module)
    },

    destroyed() {
      store.unregisterModule(path)
    },
  }
}
