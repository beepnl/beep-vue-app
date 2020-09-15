<template>
  <div>
    <Treeselect
      v-model="object[item.id]"
      :options="apiaries"
      :normalizer="normalizer"
      :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
      :no-results-text="`${$t('no_results')}`"
      :disable-branch-nodes="true"
      :default-expand-level="1"
      search-nested
    />
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
  },
  data() {
    return {
      apiaries: null,
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.hives,
        }
      },
    }
  },
  created() {
    this.readApiaries()
  },
  methods: {
    async readApiaries() {
      try {
        const response = await this.$store.dispatch('locations/findAll')
        this.apiaries = response.locations
        return true
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
