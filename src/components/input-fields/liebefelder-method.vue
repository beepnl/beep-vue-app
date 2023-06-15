<template>
  <div>
    <v-alert
      v-if="bulkInspection"
      type="error"
      text
      prominent
      dense
      color="red"
    >
      {{ $t('input_not_possible_for_bulkinspection') }}
    </v-alert>
    <v-card outlined class="pa-3">
      <!-- <div class="rounded-border"> -->
      <div class="border-bottom">
        <h4>Liebefeld method explanation (EN)</h4>
        <div style="max-width: 40vw;" class="float-right">
          <img
            :src="assetsUrl + '/img/inspection-lieberfelder-frame-overlay.png'"
            style="width:100%;"
          />
          <p style="font-style: italic; text-align: center;"
            >Figure 1. Scheme of grid for Liebefeld method. Squares should be
            5x5 cm2.</p
          >
        </div>
        <ul>
          <li
            >Colony traits that need to be measured are: colony size (bees),
            capped brood (pupae), open brood (larvae), eggs, drone brood, pollen
            stores, and honey (sealed only). If not present score them as 0.</li
          >
          <li>Open a colony and sequentially remove combs of bees (frames).</li>
          <li
            >Overlay each side of every comb in a hive with a grid pre-marked in
            5x5 cm2 (Figure 1.).</li
          >
          <li>First measure the area covered with bees.</li>
          <li
            >Per frame side, count the total number of squares covered with
            bees. This includes the number of squares fully covered and the ones
            partially covered. The partially covered squares should be estimated
            as fraction covered, up to one decimal.</li
          >
          <li
            >Record the number of squares in the BEEP app for each side of all
            frames in the hive. The BEEP app will automatically calculate the
            sum of bees.</li
          >
          <li
            >Then remove the bees from the frame before counting the other
            targets one by one. Frames do not need to be free of bees
            completely. It is fine if bees stay on the frame as long as the
            brood and/or food reserves are visible and can be estimated.</li
          >
          <li
            >For removing the bees hold a frame above (or half in) the brood
            box, and remove the bees by 1) moving the frame downwards with a
            sudden stop, 2) holding the frame by one ‘ear’ and tapping with your
            free hand on the hand holding the ear (a little rough on the eggs),
            or use a feather or soft brush (not very hygienic).</li
          >
          <li
            >Repeat the counting of squares for the other parameters and record
            the information in the BEEP app.</li
          >
          <li
            >In the BEEP app, please keep the same sequence for all targets, as
            such that in theory we could ‘rebuild’ the colony frame by
            frame.</li
          >
        </ul>
      </div>

      <div v-if="activeHive !== null" class="border-bottom">
        <v-row>
          <v-col cols="12" sm="3" md="2" class="d-flex flex-column justify-end">
            <h4 class="hive-name mb-3" v-text="activeHive.name"></h4>
            <div class="d-flex md-1 mb-sm-6">
              <HiveIcon :hive="activeHive"></HiveIcon>
            </div>
          </v-col>

          <v-col cols="12" sm="9" md="6">
            <v-row>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-col cols="12">
                    <div
                      class="beep-label"
                      v-text="$tc('Hive_honey_layer', 2)"
                    ></div>
                    <el-input-number
                      v-if="activeHive && activeHive.layers"
                      v-model="honeyLayersForCalculation"
                      :min="0"
                      :max="maxHoneyLayers"
                      :precision="0"
                      :disabled="bulkInspection"
                      size="medium"
                      @change="calculateLiebefeldColonySize"
                      @input.native="calculateLiebefeldColonySize"
                    ></el-input-number>
                  </v-col>
                  <v-col cols="12">
                    <div
                      class="beep-label"
                      v-text="$tc('Hive_brood_layer', 2)"
                    ></div>
                    <el-input-number
                      v-if="activeHive && activeHive.layers"
                      v-model="broodLayersForCalculation"
                      :min="0"
                      :max="maxBroodLayers"
                      :precision="0"
                      :disabled="bulkInspection"
                      size="medium"
                      @change="calculateLiebefeldColonySize"
                      @input.native="calculateLiebefeldColonySize"
                    ></el-input-number>
                  </v-col>
                  <v-col cols="12">
                    <div class="beep-label" v-text="$t('Hive_frames')"></div>
                    <el-input-number
                      v-if="activeHive && activeHive.layers"
                      v-model="framesForCalculation"
                      :min="0"
                      :max="maxFrames"
                      :precision="0"
                      :disabled="bulkInspection"
                      size="medium"
                      @change="calculateLiebefeldColonySize"
                      @input.native="calculateLiebefeldColonySize"
                    ></el-input-number>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="6">
                <v-row>
                  <v-col cols="12">
                    <div
                      class="beep-label"
                      v-text="`${$t('Total_colony_size')}`"
                    ></div>
                    <h1 class="mt-2">
                      <span v-if="colonySize"
                        >{{ colonySize }} {{ $tc('bee', 2) }}</span
                      >
                      <span v-if="!colonySize">N/A</span>
                    </h1>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <div v-if="category.children.length > 0">
        <v-row>
          <div
            v-for="(item, index) in sortedChildren"
            :key="index"
            :class="
              (item.input === 'label' &&
                item.name.indexOf('frame') > -1 &&
                parseInt(item.name.split('_')[1]) <=
                  broodLayersForCalculation * framesForCalculation) ||
              (item.input === 'label' &&
                item.name.indexOf('super') > -1 &&
                parseInt(item.name.split('_')[1]) <=
                  honeyLayersForCalculation) ||
              item.input === 'text' ||
              (nested && item.name !== 'colony_size')
                ? 'col-12'
                : ''
            "
          >
            <ChecklistInput
              v-if="item.input !== 'label' && item.name !== 'colony_size'"
              :object="object"
              :item="item"
              :locale="locale"
              :disabled="bulkInspection"
              :parse-mode="parseMode"
              @calculate-liebefeld-colony-size="calculateLiebefeldColonySize"
            ></ChecklistInput>

            <!-- div below is same as checklist-fieldset component but needed to keep the nested checklist-input within this template to catch the @calculate-liebefeld-colony-size emit event -->
            <div v-if="superAndFrameFilter(item)" class="checklist-fieldset">
              <div class="overline mb-2"
                >{{ item.trans[locale] || item.name }}
                <a
                  v-if="item.description !== null || item.source !== null"
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
                <em v-if="item.description !== null && showDescription"
                  >{{ item.description }}<br
                /></em>
                <a
                  v-if="item.source !== null && showDescription"
                  :href="item.source"
                  target="_blank"
                  >{{ item.source }}</a
                >
              </p>

              <div v-if="item.children.length > 0" class="rounded-border">
                <v-row>
                  <div
                    v-for="(item2, i) in item.children"
                    :key="i"
                    class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <ChecklistInput
                      v-if="item2.input !== 'label'"
                      :object="object"
                      :item="item2"
                      :locale="locale"
                      :disabled="bulkInspection"
                      :parse-mode="parseMode"
                      @calculate-liebefeld-colony-size="
                        calculateLiebefeldColonySize
                      "
                    ></ChecklistInput>
                  </div>
                </v-row>
              </div>
            </div>
          </div>
        </v-row>
      </div>
      <v-overlay
        :absolute="true"
        :value="bulkInspection"
        :opacity="0.5"
        color="white"
        z-index="3"
        class="input-disabled-overlay"
      >
      </v-overlay>
      <!-- </div> -->
    </v-card>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import HiveIcon from '@components/hive-icon.vue'
import { mapGetters } from 'vuex'
import { getMaxFramecount } from '@mixins/methodsMixin'

export default {
  components: {
    ChecklistInput,
    HiveIcon,
  },
  mixins: [getMaxFramecount],
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
  data() {
    return {
      colonySize: null,
      maxBroodLayers: 2,
      maxHoneyLayers: 2,
      broodLayersForCalculation: null,
      honeyLayersForCalculation: null,
      maxFrames: 12,
      framesForCalculation: null,
      showDescription: false,
      assetsUrl:
        process.env.VUE_APP_ASSETS_URL ||
        process.env.VUE_APP_ASSETS_URL_FALLBACK,
    }
  },
  computed: {
    ...mapGetters('inspections', ['bulkInspection']),
    ...mapGetters('hives', ['activeHive']),
    sortedChildren() {
      var sortedChildren = this.category.children.slice().sort(function(a, b) {
        if (a.name.indexOf('super') > -1) {
          return -1
        }
        if (a.name.indexOf('frame') > -1) {
          return 1
        }
        return 0
      })
      return sortedChildren
    },
  },
  watch: {
    activeHive() {
      if (this.activeHive !== null) {
        this.setInputNumbers()
      }
    },
  },
  created() {
    if (this.activeHive !== null) {
      this.setInputNumbers()
    }
  },
  methods: {
    calculateLiebefeldColonySize() {
      var beesPerCm2 = 1.25
      var beesSquares25cm2 = 0
      var colonySize = null

      setTimeout(() => {
        this.category.children.map((child) => {
          if (this.superAndFrameFilter(child) && child.children.length > 0) {
            child.children.map((child2) => {
              if (
                typeof child2 !== 'undefined' &&
                child2 !== null &&
                typeof child2.name !== 'undefined' &&
                child2.name === 'bees_squares_25cm2' &&
                parseFloat(this.object[child2.id]) > 0
              ) {
                beesSquares25cm2 += parseFloat(this.object[child2.id])
              }
            })
          }
        })

        var hive = this.activeHive

        if (
          typeof hive === 'undefined' ||
          hive === null ||
          isNaN(beesSquares25cm2) ||
          beesSquares25cm2 === 0
        ) {
          colonySize = null
        } else {
          colonySize = Math.round(beesSquares25cm2 * 25 * beesPerCm2)
        }

        // put value into input element 'colony_size'
        this.category.children.map((child) => {
          if (child.name === 'colony_size') {
            this.object[child.id] = colonySize
          }
        })
        this.colonySize = colonySize
      }, 100) // wait for vue to update input bees_squares_25cm2 values
    },
    countLayers(type) {
      return this.activeHive.layers.filter((layer) => layer.type === type)
        .length
    },
    setInputNumbers() {
      this.broodLayersForCalculation =
        this.countLayers('brood') < 2 ? this.countLayers('brood') : 2
      this.honeyLayersForCalculation =
        this.countLayers('honey') < 2 ? this.countLayers('honey') : 2
      var maxFramecount = this.getMaxFramecount(this.activeHive.layers)
      this.framesForCalculation = maxFramecount < 12 ? maxFramecount : 12
    },
    superAndFrameFilter(item) {
      if (
        item.input === 'label' &&
        item.name.indexOf('frame') > -1 &&
        parseInt(item.name.split('_')[1]) <=
          this.broodLayersForCalculation * this.framesForCalculation
      ) {
        return true
      } else if (
        item.input === 'label' &&
        item.name.indexOf('super') > -1 &&
        parseInt(item.name.split('_')[1]) <= this.honeyLayersForCalculation
      ) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-icon {
  &.has-queen-excluder,
  &.has-feeding-box {
    margin-top: 20px;
  }
}
</style>
