<template>
  <div>
    <Treeselect
      v-if="item.input === 'select_hive' && apiaries !== null"
      v-model="object[item.id]"
      :options="apiaries"
      :normalizer="normalizerIncludeHives"
      :placeholder="`${$t('Select')} ${$tc('hive', 1)}`"
      :no-results-text="`${$t('no_results')}`"
      :disable-branch-nodes="true"
      :default-expand-level="1"
      search-nested
      @input="setInspectionEdited(true)"
    />
    <Treeselect
      v-if="item.input === 'select_location' && apiaries !== null"
      v-model="object[item.id]"
      :options="apiaries"
      :normalizer="normalizerApiary"
      :placeholder="`${$t('Select')} ${$tc('location', 1)}`"
      :no-results-text="`${$t('no_results')}`"
      @input="setInspectionEdited(true)"
    />
    <p v-if="apiaries === null">{{ $t('no_apiaries_yet') }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  },
  data() {
    return {
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
  computed: {
    ...mapGetters('locations', ['apiaries']),
  },
  methods: {
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
  },
}
</script>
