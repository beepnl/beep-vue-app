<!-- eslint-disable vue/v-slot-style -->
<template>
  <div class="d-flex justify-flex-start align-center">
    <v-icon dark :color="dateInput !== null ? 'primary' : ''" class="mr-2"
      >mdi-calendar-edit</v-icon
    >
    <div>
      <labelWithDescription
        :item="item"
        :parse-mode="parseMode"
        :parsed-date="parseMode"
        :parsed-images="parsedImages"
        :parsed-items="parsedItems"
        :check-answer="checkAnswer"
      ></labelWithDescription>

      <VueDatePicker
        v-if="item.input === 'date'"
        :format="datePickerFormat"
        :model-value="dateInput"
        model-type="format"
        time-picker
        :is-24="true"
        :teleport="true"
        class="text-accent"
        :placeholder="`${$t('Select')} ${$t('Date').toLocaleLowerCase()}`"
        :locale="locale"
        :select-text="$t('ok')"
        :cancel-text="$t('Cancel')"
        @update:model-value="datePickerUpdate"
      >
        <template #clear-icon="{ clear }">
          <span class="description clear-icon" @click="clearDate(item.id)">
            <v-icon color="accent">mdi-close</v-icon></span
          >
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script>
import labelWithDescription from '@components/input-fields/label-with-description.vue'

export default {
  components: {
    labelWithDescription,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    parsedItems: {
      type: Array,
      default: () => [],
      required: false,
    },
    parsedImages: {
      type: Array,
      default: () => [],
      required: false,
    },
    parseMode: {
      type: Boolean,
      default: false,
      required: false,
    },
    checkAnswer: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      datePickerFormat: 'yyyy-MM-dd HH:mm:ss',
    }
  },
  computed: {
    dateInput: {
      get() {
        if (
          this.item.input === 'date' &&
          this.object[this.item.id] &&
          this.object[this.item.id] !== null
        ) {
          return this.object[this.item.id]
        } else {
          return null
        }
      },
      set(value) {
        if (value !== '' && value !== null) {
          this.object[this.item.id] = value
          this.setInspectionEdited(true)
        } else {
          this.object[this.item.id] = null
        }
      },
    },
  },
  methods: {
    clearDate(id) {
      this.object[id] = null
    },
    datePickerUpdate(e) {
      this.dateInput = e
    },
    setInspectionEdited(bool) {
      this.$store.commit('inspections/setInspectionEdited', bool)
    },
  },
}
</script>

<style lang="scss" scoped>
.clear-icon {
  cursor: pointer;
}
</style>
