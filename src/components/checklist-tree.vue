<template>
  <v-card class="pa-3" outlined>
    <v-text-field
      v-model="filterText"
      :label="`${$t('Search')}`"
      :class="
        `${
          filterText !== '' ? 'v-input--is-focused primary--text' : ''
        } filter-text-field mb-3`
      "
      height="36px"
      clearable
      outlined
      dense
      hide-details
    ></v-text-field>

    <el-tree
      ref="tree"
      class="filter-tree"
      :data="items"
      show-checkbox
      check-strictly
      :default-checked-keys="selected"
      node-key="id"
      :default-expanded-keys="selected"
      expand-on-click-node
      highlight-current
      :props="defaultProps"
      draggable
      :allow-drop="allowDrop"
      :filter-node-method="filterNode"
      @node-drop="handleDrop"
      @check-change="updateCategories"
    >
    </el-tree>

    <div class="buttons mt-4">
      <v-btn class="mr-1" tile @click="getCheckedKeys">get by key</v-btn>
      <v-btn tile @click="resetChecked">reset</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      filterText: '',
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.parent.id === dropNode.parent.id) {
        return type !== 'inner'
      } else {
        return false
      }
    },
    checkChildren(node, selected) {
      node.children.map((child) => {
        this.$refs.tree.setChecked(child.id, selected)
        if (child.children !== null) {
          this.checkChildren(child, selected)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.text.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType)
      // this.setChecked(draggingNode.data, true, true)
      // this.updateCategories()
      // TODO: update taxonomy!
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    updateCategories(node, selected, subtree) {
      this.checkChildren(node, selected)
      const categoryIds = this.$refs.tree.getCheckedKeys()
      this.$emit('update-categories', categoryIds)
    },
  },
}
</script>
