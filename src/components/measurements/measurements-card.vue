<template>
  <v-card outlined class="mt-3 mb-6">
    <v-card-title
      :class="
        `measurements-card-title ${
          showCardContent ? 'measurements-card-title--border-bottom' : ''
        }`
      "
    >
      <v-row>
        <v-col cols="12" class="my-0">
          <div class="d-flex justify-space-between align-center">
            <span>{{ !mobile ? title : mobileTitle }}</span>
            <v-spacer></v-spacer>
            <div class="d-flex justify-end align-center">
              <template v-for="(icon, n) in chartColsIcons">
                <v-icon
                  v-if="!mdScreen"
                  :key="'icon' + n"
                  class="mr-2"
                  :color="chartCols === icon.value ? 'primary' : 'grey'"
                  @click="setChartCols = icon.value"
                  >{{ icon.name }}</v-icon
                >
              </template>
              <v-icon
                :class="
                  `toggle-icon mdi ${
                    showCardContent ? 'mdi-minus' : 'mdi-plus'
                  }`
                "
                @click="toggleShowCardContent"
              ></v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-title>

    <SlideYUpTransition :duration="150">
      <v-card-text v-if="showCardContent">
        <slot></slot>
      </v-card-text>
    </SlideYUpTransition>
  </v-card>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    SlideYUpTransition,
  },
  props: {
    localVar: {
      type: String,
      default: '',
      required: false,
    },
    mobileTitle: {
      type: String,
      default: '',
      required: false,
    },
    openByDefault: {
      type: Boolean,
      default: false,
      required: false,
    },
    showChartColsIcons: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      showCardContent: false,
      chartCols: 6,
      chartColsIcons: [
        { value: 12, name: 'mdi-format-align-justify' },
        { value: 6, name: 'mdi-grid-large' },
        { value: 4, name: 'mdi-grid' },
      ],
    }
  },
  computed: {
    mdScreen() {
      return this.$vuetify.breakpoint.width < 960
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    queriedChartCols() {
      var queriedValue = parseInt(this.$route.query.chartCols)
      var valid =
        queriedValue === 12 || queriedValue === 6 || queriedValue === 4
      return valid ? queriedValue : null
    },
    setChartCols: {
      get() {
        return this.chartCols
      },
      set(value) {
        localStorage[this.localVar] = value
        this.chartCols = value
        this.$emit('set-chart-cols', parseInt(value))
      },
    },
  },
  created() {
    if (this.openByDefault) {
      this.showCardContent = true
    }

    if (!this.showChartColsIcons) {
      this.chartColsIcons = []
    } else {
      if (this.queriedChartCols !== null) {
        this.setChartCols = this.queriedChartCols
      } else if (localStorage[this.localVar]) {
        this.setChartCols = parseInt(localStorage[this.localVar])
      }
    }
  },
  methods: {
    toggleShowCardContent() {
      this.showCardContent = !this.showCardContent
      this.$emit('show-card-content', this.showCardContent)
    },
  },
}
</script>
