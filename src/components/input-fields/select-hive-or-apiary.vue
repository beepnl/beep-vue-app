<template>
  <div>
    <Treeselect
      v-if="item.input === 'select_hive'"
      v-model="object[item.id]"
      :options="apiaries"
      :normalizer="normalizerIncludeHives"
      :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
      :no-results-text="`${$t('no_results')}`"
      :disable-branch-nodes="true"
      :default-expand-level="1"
      search-nested
    />
    <Treeselect
      v-if="item.input === 'select_location'"
      v-model="object[item.id]"
      :options="apiaries"
      :normalizer="normalizerApiary"
      :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
      :no-results-text="`${$t('no_results')}`"
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
      normalizerApiary(node) {
        return {
          id: node.id,
          label: node.name,
        }
      },
      normalizerIncludeHives(node) {
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
