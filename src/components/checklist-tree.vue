<template>
  <v-card class="pa-3">
    <v-text-field
      v-model="filterText"
      :label="`${$t('Search')}`"
      :class="
        `${
          filterText !== '' ? 'v-input--is-focused text-primary' : ''
        } beep-search-field mb-3`
      "
      :style="'height: 36px;'"
      color="accent"
      clearable
      :clear-icon="'mdi-close'"
      persistent-clear
      variant="outlined"
      density="compact"
      hide-details
    ></v-text-field>

    <ElForm :disabled="disabled">
      <ElFormItem>
        <ElTree
          ref="tree"
          class="filter-tree"
          :data="items"
          show-checkbox
          check-strictly
          :default-checked-keys="selected"
          node-key="id"
          render-after-expand
          expand-on-click-node
          highlight-current
          :props="defaultProps"
          draggable
          :allow-drop="allowDrop"
          :filter-node-method="filterNode"
          @check-change="updateCategories"
          @node-drop="nodeDrop"
          @node-drag-start="nodeDragStart"
        >
        </ElTree>
      </ElFormItem>
    </ElForm>
  </v-card>
</template>

<script>
import { ElForm, ElFormItem, ElTree } from 'element-plus'
import 'element-plus/es/components/tree/style/css'

export default {
  components: {
    ElForm,
    ElFormItem,
    ElTree,
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
  },
  emits: ['update-categories'],
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      filterText: '',
      categoryIds: [],
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
      if (!this.disabled && draggingNode.parent.id === dropNode.parent.id) {
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
        return child
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.text.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    nodeDragStart(dragNode, event) {
      // get categoryIds array when dragging started
      this.categoryIds = this.$refs.tree.getCheckedKeys()
    },
    nodeDrop(dragNode, dropNode, dropType, event) {
      // select correct nodes (long version: set categoryIds array like when dragging started (if not, dragged node will be deselected), then automatically the order of ids in the array will correspond to new ('after drag') node order)
      this.$refs.tree.setCheckedKeys(this.categoryIds)
      // get re-ordered array of selected nodes (in correct 'after drop' order) and update it
      this.categoryIds = this.$refs.tree.getCheckedKeys()
      this.$emit('update-categories', this.categoryIds)
    },
    updateCategories(node, selected, subtree) {
      this.checkChildren(node, selected)
      this.categoryIds = this.$refs.tree.getCheckedKeys()
      this.$emit('update-categories', this.categoryIds)
    },
  },
}
</script>
