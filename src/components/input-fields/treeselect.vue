<template>
  <div>
    <Treeselect
      v-if="item.input === 'select' && treeSelectArray !== null"
      v-model="object[item.id]"
      :options="treeSelectArray"
      :placeholder="`${$t('Select') + ' ' + (item.trans[locale] || item.name)}`"
      :no-results-text="`${$t('no_results')}`"
      :default-expand-level="1"
      :disable-branch-nodes="true"
      search-nested
      @input="setInspectionEdited(true)"
    />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'

export default {
  components: { Treeselect },
  props: {
    item: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
  },
  computed: {
    treeSelectArray() {
      var treeselectArray = []
      this.item.children.forEach((item) => {
        const newNode = this.updateNode(item)
        treeselectArray.push(newNode)
      })
      return treeselectArray
    },
  },
  methods: {
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
    updateArray(array) {
      var itemsArray = []
      array.forEach((item) => {
        const newNode = this.updateNode(item)
        itemsArray.push(newNode)
      })
      return itemsArray
    },
    updateNode(item) {
      var newNode = {}
      if (typeof item.children !== 'undefined' && item.children.length > 0) {
        newNode = {
          id: item.id,
          label: item.trans[this.locale],
          children: this.updateArray(item.children),
        }
      } else {
        newNode = {
          id: item.id,
          label: item.trans[this.locale],
        }
      }
      return newNode
    },
  },
}
</script>
