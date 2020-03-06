<template>
  <v-dialog v-model="dialog" scrollable fullscreen hide-overlay max-width="90%">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Add checklist</v-btn>
    </template>
    <v-card tile>
      <v-card-title>
        <v-text-field
          v-model="search"
          placeholder="Search for items..."
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-treeview
            v-model="selection"
            :items="items"
            :search="search"
            :filter="filter"
            :open.sync="open"
            selectable
            dense
            hoverable
            shaped
            open-on-click
            selected-color="primary"
          >
            <template v-slot:append="{ item }">
              {{ item.category_input_id }}
            </template>
          </v-treeview>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" dark @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import jsondata from '@/database/db.json'
import flat2nested from 'flat-to-nested'
export default {
  mounted() {
    const f2n = new flat2nested({
      id: 'id',
      parent: 'parent_id',
      children: 'children',
    })
    this.nested = f2n.convert(jsondata.taxonomy)
  },
  data: () => ({
    dialog: false,
    selection: [],
    nested: [],
    open: [],
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
