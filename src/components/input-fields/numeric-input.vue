<template>
  <div>
    <ElInput
      v-if="!useVModel"
      ref="el"
      :model-value="
        object === null || object[property] === null
          ? undefined
          : !isFloat
          ? object[property]
          : parseFloat(object[property])
      "
      :class="'beep-number-input --' + size"
      :style="`width: ${size === 'small' ? '120' : '150'}px`"
      :min="min"
      :max="max"
      :step="step"
      size="small"
      :formatter="(value) => value.replace(/,/g, '.')"
      :disabled="disabled"
      @update:model-value="updateNumber($event)"
      @focus="selectAll('el')"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-minus"
          variant="plain"
          class="color-black"
          :density="size === 'small' ? 'compact' : 'default'"
          :disabled="numberIsMin"
          size="x-small"
          @click="changeNumber('minus')"
        ></v-btn>
      </template>
      <template v-slot:append>
        <v-btn
          icon="mdi-plus"
          variant="plain"
          class="color-black"
          :density="size === 'small' ? 'compact' : 'default'"
          :disabled="numberIsMax"
          size="x-small"
          @click="changeNumber('plus')"
        ></v-btn>
      </template>
    </ElInput>

    <ElInput
      v-else-if="useVModel"
      ref="el"
      v-model="object[property]"
      :class="'beep-number-input --' + size"
      :style="`width: ${size === 'small' ? '120' : '150'}px`"
      :min="min"
      :max="max"
      :step="step"
      size="small"
      :formatter="(value) => value.replace(/,/g, '.')"
      :disabled="disabled"
      @change="setEdited(true)"
      @update:model-value="updateNumber($event)"
      @focus="selectAll('el')"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-minus"
          variant="plain"
          class="color-black"
          :density="size === 'small' ? 'compact' : 'default'"
          :disabled="numberIsMin"
          size="x-small"
          @click="changeNumber('minus')"
        ></v-btn>
      </template>
      <template v-slot:append>
        <v-btn
          icon="mdi-plus"
          variant="plain"
          class="color-black"
          :density="size === 'small' ? 'compact' : 'default'"
          :disabled="numberIsMax"
          size="x-small"
          @click="changeNumber('plus')"
        ></v-btn>
      </template>
    </ElInput>
  </div>
</template>

<script>
import { ElInput } from 'element-plus'

export default {
  components: {
    ElInput,
  },
  props: {
    object: {
      type: Object,
      default: null,
      required: true,
    },
    property: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    min: {
      type: Number,
      default: -Infinity,
      required: false,
    },
    max: {
      type: Number,
      default: Infinity,
      required: false,
    },
    step: {
      type: Number,
      default: 1,
      required: false,
    },
    stepStrictly: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      default: 'default',
      required: false,
    },
    useVModel: {
      type: Boolean,
      default: false,
      required: false,
    },
    isFloat: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['update-number', 'set-edited'],
  computed: {
    numberIsMin() {
      return (
        this.object[this.property] !== null &&
        !isNaN(this.object[this.property]) &&
        this.object[this.property] <= this.min
      )
    },
    numberIsMax() {
      return (
        this.object[this.property] !== null &&
        !isNaN(this.object[this.property]) &&
        this.object[this.property] >= this.max
      )
    },
    precision() {
      return this.getPrecision(this.step)
    },
  },
  methods: {
    changeNumber(sign = 'plus') {
      const val = this.object[this.property]
      const nr =
        val === null || val === ''
          ? 0
          : isNaN(val) || typeof val === 'string'
          ? parseFloat(val)
          : val

      let newValue =
        sign === 'plus'
          ? nr + this.step
          : sign === 'minus'
          ? nr - this.step
          : nr
      newValue = parseFloat(newValue.toFixed(this.precision))
      if (newValue < this.min) {
        newValue = this.min
      } else if (newValue > this.max) {
        newValue = this.max
      }

      this.object[this.property] = newValue
      this.$emit('update-number', newValue)
      this.setEdited()
    },
    getPrecision(number) {
      const n = number.toString().split('.')
      return n.length > 1 ? n[1].length : 0
    },
    selectAll(refName) {
      this.$refs[refName].select()
    },
    setEdited() {
      this.$emit('set-edited')
    },
    updateNumber(value) {
      let val = value
      if (value === '') {
        val = null
      } else if (this.stepStrictly) {
        val = parseFloat(parseFloat(value).toFixed(this.precision))
        if (val < this.min) {
          val = this.min
        } else if (val > this.max) {
          val = this.max
        }
        this.object[this.property] = val
      }
      this.$emit('update-number', val)
      this.setEdited()
    },
  },
}
</script>
