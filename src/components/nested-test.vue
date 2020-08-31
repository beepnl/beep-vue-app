<template>
  <v-treeview
    :active.sync="active"
    :items="items"
    item-key="id"
    item-text="name"
    item-children="children"
    :open.sync="open"
    activatable
    selectable
    dense
    transition
    return-object
  >
    <template v-slot:label="{ item }">
      <draggable
        :id="item.id"
        :list="items"
        group="node"
        @start="checkStart"
        @end="checkEnd"
      >
        <label>
          <i class="fas fa-user mr-3" />
          <span id="item.id">{{ item.name }}</span>
        </label>
      </draggable>
    </template>
  </v-treeview>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'NestedTest',
  components: {
    draggable,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: [],
      open: [],
      selectedItems: [],
    }
  },
  computed: {
    selected() {
      if (!this.active.length) return undefined
      return this.active[0]
    },
  },
  methods: {
    findParent: function(items, id) {
      return true
      // if (!items) {
      //   return
      // }
      // for (var i = 0; i < items.length; i++) {
      //   var item = items[i]
      //   // Test current object
      //   if (item.id === id) {
      //     return item
      //   }
      //   // Test children recursively
      //   const child = this.findTreeItem(item.children, id)
      //   if (child) {
      //     return child
      //   }
      // }
    },
    findTreeItem: function(items, id) {
      if (!items) {
        return
      }
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        // Test current object
        if (item.id === id) {
          return item
        }
        // Test children recursively
        const child = this.findTreeItem(item.children, id)
        if (child) {
          return child
        }
      }
    },
    checkStart: function(evt) {
      var self = this
      self.active = []
      self.active.push(self.findTreeItem(self.items, evt.from.id))
    },
    checkEnd: function(evt) {
      // var self = this
      // var itemSelected = self.active[0]
      // // var fromParent = itemSelected.ParentId ? self.findTreeItem(self.items, itemSelected.ParentId) : null;
      // var toParent = self.findTreeItem(self.items, evt.to.id)
      // var objFrom = self.items
      // objFrom.splice(objFrom.indexOf(itemSelected), 1)
      // toParent.children.push(itemSelected)
      console.log(evt)
      // self.saveUser(itemSelected); TODO: saveChecklist?
      return false
    },
  },
}
</script>
