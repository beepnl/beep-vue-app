<template>
  <div>
    <div
      v-if="
        category.children.length > 0 &&
          (category.input === 'label' ||
            (category.input !== 'list' &&
              category.input !== 'select' &&
              category.input !== 'options'))
      "
    >
      <div class="overline mb-2"
        >{{ category.trans[locale] || category.name }}
        <a
          v-if="category.description !== null || category.source !== null"
          @click="showDescription = !showDescription"
          ><v-icon
            class="mdi mdi-information ml-1 icon-info"
            dark
            small
            color="primary"
          ></v-icon
        ></a>
      </div>

      <p v-if="showDescription" class="inspection-item-description">
        <em v-if="category.description !== null && showDescription"
          >{{ category.description }}<br
        /></em>
        <a
          v-if="category.source !== null && showDescription"
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
        class="rounded-border"
      >
        <v-row>
          <div
            v-for="(item, index) in category.children"
            :key="index"
            :class="
              item.input === 'label' || item.input === 'text'
                ? 'col-12'
                : 'col-xs-12 col-sm-6 col-md-4 col-lg-3'
            "
          >
            <ChecklistInput
              v-if="item.input !== 'label'"
              :object="object"
              :item="item"
              :locale="locale"
            ></ChecklistInput>
            <ChecklistFieldset
              v-if="item.input === 'label'"
              :object="object"
              :category="item"
            ></ChecklistFieldset>
          </div>
        </v-row>
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
      ></ChecklistInput>
    </div>

    <ChecklistInput
      v-if="
        category.input !== 'label' &&
          (category.children.length === 0 ||
            category.input === 'list' ||
            category.input === 'select' ||
            category.input === 'options')
      "
      :object="object"
      :item="category"
      :locale="locale"
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
  data: function() {
    return {
      showDescription: false,
    }
  },
}
</script>

<style lang="scss"></style>
