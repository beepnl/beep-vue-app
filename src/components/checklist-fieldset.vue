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
      <div class="text-overline mb-2"
        >{{ category.trans[locale] || category.name }}
        <a
          v-if="category.description !== null || category.source !== null"
          @click="showDescription = !showDescription"
          ><v-icon
            class="mdi mdi-information ml-1 icon-info"
            dark
            small
            color="accent"
          ></v-icon
        ></a>
      </div>

      <p v-if="showDescription" class="info-text">
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

      <TopPhotoAnalysis
        v-if="category.name === 'top_photo_analysis'"
        :object="object"
        :category="category"
        :parse-mode="parseMode"
        :nested="nested"
      ></TopPhotoAnalysis>

      <LiebefelderMethod
        v-if="category.name === 'liebefelder_method'"
        :object="object"
        :category="category"
        :parse-mode="parseMode"
        :nested="nested"
      ></LiebefelderMethod>

      <div
        v-if="
          category.children.length > 0 &&
            category.name !== 'liebefelder_method' &&
            category.name !== 'top_photo_analysis'
        "
        class="rounded-border"
      >
        <v-row>
          <div
            v-for="(item, index) in category.children"
            :key="index"
            :class="
              'v-col ' +
                (item.input === 'label' || item.input === 'text' || nested
                  ? 'v-col-12'
                  : 'v-col-xs-12 v-col-sm-6 v-col-md-4 v-col-lg-3')
            "
          >
            <ChecklistInput
              v-if="item.input !== 'label'"
              :object="object"
              :item="item"
              :parse-mode="parseMode"
            ></ChecklistInput>
            <ChecklistFieldset
              v-if="item.input === 'label'"
              :object="object"
              :category="item"
              :parse-mode="parseMode"
            ></ChecklistFieldset>
          </div>
        </v-row>
      </div>

      <ChecklistInput
        v-if="category.children.length === 0"
        :object="object"
        :item="category"
        :parse-mode="parseMode"
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
      :parse-mode="parseMode"
    ></ChecklistInput>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import TopPhotoAnalysis from '@components/input-fields/top-photo-analysis.vue'
import LiebefelderMethod from '@components/input-fields/liebefelder-method.vue'

export default {
  name: 'ChecklistFieldset',
  components: {
    ChecklistFieldset: () => import('@components/checklist-fieldset.vue'), // needed to fix Vue recursive component error
    ChecklistInput,
    LiebefelderMethod,
    TopPhotoAnalysis,
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
    nested: {
      type: Boolean,
      required: false,
      default: false,
    },
    parseMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function() {
    return {
      showDescription: false,
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
  },
}
</script>

<style lang="scss"></style>
