<template>
  <v-card>
    <v-container fluid>
      <v-treeview
        v-model="selection"
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
        selectable
        return-object
        activatable
        shaped
        selected-color="primary"
      >
        <template v-slot:append="{ item }">
          {{ item.category_input_id }}
        </template>
      </v-treeview>
    </v-container>
  </v-card>
</template>

<script>
import jsondata from '@/database/taxonomy.json'
import flat2nested from 'flat-to-nested'
export default {
  mounted() {
    const f2n = new flat2nested({
      id: 'id',
      parent: 'parent_id',
      children: 'children',
    })
    this.nested = f2n.convert(jsondata.items)
    console.log(this.nested)
  },
  data: () => ({
    selection: [],
    nested: [],
    open: [1, 2],
    search: null,
    caseSensitive: false,
  }),
  computed: {
    items() {
      return this.nested.children
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  watch: {
    selection: function(cur) {
      console.log(JSON.stringify(cur))
    },
  },
}
</script>

<style lang="scss" scoped></style>
