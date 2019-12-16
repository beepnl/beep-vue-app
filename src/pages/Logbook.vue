<template>
  <v-card>
    <v-container fluid>
      <v-treeview
        v-model="selection"
        :items="items"
        selectable
        selected-color="primary"
        return-object
        open-all
      ></v-treeview>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selection: [],
    items: [
      {
        id: 1,
        name: 'Root',
        children: [
          { id: 2, name: 'Child #1' },
          { id: 3, name: 'Child #2' },
          {
            id: 4,
            name: 'Child #3',
            children: [
              { id: 5, name: 'Grandchild #1' },
              { id: 6, name: 'Grandchild #2' },
            ],
          },
        ],
      },
    ],
  }),
  watch: {
    selection: function(cur) {
      console.log(JSON.stringify(cur))
    },
  },
}
</script>

<style lang="scss" scoped></style>
