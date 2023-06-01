<template>
  <div class="d-flex justify-flex-start align-center">
    <v-icon dark :color="dateInput !== null ? 'primary' : ''" class="mr-2"
      >mdi-calendar-edit</v-icon
    >
    <div>
      <labelWithDescription
        :item="item"
        :locale="locale"
        :parse-mode="parseMode"
        :parsed-date="parseMode"
        :parsed-images="parsedImages"
        :parsed-items="parsedItems"
        :check-answer="checkAnswer"
      ></labelWithDescription>

      <Datetime
        v-if="item.input === 'date'"
        v-model="dateInput"
        :placeholder="`${$t('Select')} ${$t('Date').toLocaleLowerCase()}`"
        type="datetime"
        class="accent--text"
      >
        <span
          v-if="dateInput !== null"
          slot="after"
          class="description clear-icon"
          @click="clearDate(item.id)"
        >
          <v-icon class="mt-n1" color="accent">mdi-close</v-icon></span
        >
        <template slot="button-cancel">
          <v-btn text color="accent">{{ $t('Cancel') }}</v-btn>
        </template>
        <template slot="button-confirm">
          <v-btn text color="accent">{{ $t('ok') }}</v-btn>
        </template>
      </Datetime>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime'
import labelWithDescription from '@components/input-fields/label-with-description.vue'
import { momentFullDateTime, momentISO8601 } from '@mixins/momentMixin'

export default {
  components: {
    Datetime,
    labelWithDescription,
  },
  mixins: [momentFullDateTime, momentISO8601],
  props: {
    item: {
      type: Object,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
      required: false,
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
  computed: {
    dateInput: {
      get() {
        if (
          this.item.input === 'date' &&
          this.object[this.item.id] &&
          this.object[this.item.id] !== null
        ) {
          return this.momentISO8601(this.object[this.item.id])
        } else {
          return null
        }
      },
      set(value) {
        if (value !== '' && value !== null) {
          this.object[this.item.id] = this.momentFullDateTime(value)
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
