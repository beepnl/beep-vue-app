<template>
  <div
    v-if="
      category.children.length > 0 &&
        (category.input === 'label' ||
          (category.input !== 'list' &&
            category.input !== 'select' &&
            category.input !== 'options'))
    "
    :class="`col-xs-12 ${category.name}`"
  >
    <div class="beep-label"
      >{{ category.trans[locale] || category.name }}
      <a
        v-if="category.description !== null || category.source !== null"
        @click="category.showInfo = category.showInfo ? false : true"
        ><i
          class="fa fa-info-circle"
          style="margin-left: 10px; font-size: 18px;"
        ></i></a
    ></div>

    <p v-if="category.showInfo">
      <em v-if="category.description !== null"
        >{{ category.description }}<br
      /></em>
      <a
        v-if="category.source !== null"
        :href="category.source"
        target="_blank"
        >{{ category.source }}</a
      >
    </p>
    <!--
	<div ng-include="'/app/views/template/template-inspection-liebefelder_method.html?v=6'" ng-show="category.name == 'liebefelder_method'"></div>
	<div ng-include="'/app/views/template/template-inspection-top_photo_analysis.html?v=6'" ng-show="category.name == 'top_photo_analysis'"></div> -->

    <div
      v-if="
        category.children.length > 0 && category.name !== 'liebefelder_method'
      "
    >
      <div v-for="(item, index) in category.children" :key="index">
        <ChecklistInput
          v-if="item.input !== 'label'"
          :object="object"
          :item="item"
          :locale="locale"
          cols="cols"
        ></ChecklistInput>
        <ChecklistFieldset
          v-if="item.input === 'label'"
          :object="object"
          :category="item"
          cols="cols"
        ></ChecklistFieldset>
      </div>
    </div>

    <!-- <div v-if="category.children.length > 0 && category.name === 'liebefelder_method'" ng-repeat="(i, item) in category.children | filter: super_filter">
    	<checklist-input v-if="item.input !== 'label'" :item="item" cols="cols"></checklist-input>
	    <checklist-fieldset v-if="item.input === 'label'" :category="item" cols="cols"></checklist-fieldset>
    </div>

    <div v-if="category.children.length > 0 && category.name === 'liebefelder_method'" ng-repeat="(i, item) in category.children | filter: frame_filter">
    	<checklist-input v-if="item.input !== 'label'" :item="item" cols="cols"></checklist-input>
	    <checklist-fieldset v-if="item.input === 'label'" :category="item" cols="cols"></checklist-fieldset>
    </div> -->

    <ChecklistInput
      v-if="category.children.length === 0"
      :object="object"
      :item="category"
      :locale="locale"
      cols="cols"
    ></ChecklistInput>
  </div>
</template>

<script>
import ChecklistFieldset from '@components/checklist-fieldset.vue'
import ChecklistInput from '@components/checklist-input.vue'

export default {
  name: 'ChecklistFieldset',
  components: {
    ChecklistFieldset,
    ChecklistInput,
  },
  props: {
    category: {
      type: Object,
      default: null,
      required: true,
    },
    object: {
      type: Object,
      default: null,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
    },
  },
}
</script>

<style lang="scss"></style>
