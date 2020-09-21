<template>
  <div class="rounded-border">
    <div class="border-bottom">
      <h4>Top Photo Aanalysis protocol (EN)</h4>
      <ol>
        <li>Blow a puff of smoke into the hive from below.</li>
        <li
          >After a minute, remove the lid and take first a high-resolution photo
          from the label of the hive and then of the topside. For the accuracy
          of the photo analysis, take care to include the entire top frame in
          the photo, and use a standard angle (35mm) (Figure 1).</li
        >
      </ol>
      <img
        style="width:100%;"
        src="@assets/img/inspection-top-photo-analysis-explanation.jpg"
      />
      <p style="font-style: italic; text-align: center;"
        >Figure 1. Correct position of hive top in photograph and potential
        mistakes to avoid.</p
      >
    </div>

    <div v-if="activeHive !== null" class="border-bottom">
      <v-row>
        <v-col cols="5" sm="2" md="3">
          <div class="d-flex flex-column align-start">
            <h4 class="hive-name mb-3" v-text="activeHive.name"></h4>
            <HiveIcon :hive="activeHive"></HiveIcon>
          </div>
        </v-col>

        <v-col cols="6" sm="4" md="3">
          <v-row>
            <v-col cols="12">
              <div
                class="beep-label"
                v-text="`${$tc('Hive_brood_layer', 2)} ${$t('with_bees')}`"
              ></div>
              <VueNumberInput
                v-if="activeHive && activeHive.layers"
                v-model="broodLayersForCalculation"
                class="hive-frame-number-input"
                :min="0"
                :max="maxBroodLayers"
                inline
                controls
                rounded
                @change="calculateTpaColonySize"
              ></VueNumberInput>
            </v-col>
            <v-col cols="12">
              <div
                class="beep-label"
                v-text="`${$t('Hive_frames')} ${$t('with_bees')}`"
              ></div>
              <VueNumberInput
                v-if="activeHive && activeHive.layers"
                v-model="framesForCalculation"
                class="hive-frame-number-input"
                :min="1"
                :max="maxFrames"
                inline
                controls
                rounded
                @change="calculateTpaColonySize"
              ></VueNumberInput>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5" sm="3">
          <v-row>
            <v-col cols="12">
              <div class="beep-label" v-text="`${$t('fr_width_cm')}`"></div>
              <p
                v-if="!activeHive.fr_width_cm"
                style=" font-weight: bold;color:red;"
                >{{ $t('fr_width_cm') }} N/A!</p
              >
              <p
                v-if="
                  activeHive.fr_width_cm &&
                    Math.round(activeHive.fr_width_cm) === 0
                "
                style=" font-weight: bold;color:red;"
                >0 cm</p
              >
              <p v-else>{{ activeHive.fr_width_cm }} cm</p>
            </v-col>
            <v-col cols="12">
              <div class="beep-label" v-text="`${$t('fr_height_cm')}`"></div>
              <p
                v-if="!activeHive.fr_height_cm"
                style=" font-weight: bold;color:red;"
                >{{ $t('fr_height_cm') }} N/A!</p
              >
              <p
                v-if="
                  activeHive.fr_height_cm &&
                    Math.round(activeHive.fr_height_cm) === 0
                "
                style=" font-weight: bold;color:red;"
                >0 cm</p
              >
              <p v-else>{{ activeHive.fr_height_cm }} cm</p>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" sm="2" md="3">
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
    </div>

    <div v-if="category.children.length > 0">
      <v-row>
        <div
          v-for="(item, index) in category.children"
          :key="index"
          :class="
            item.input === 'label' || item.input === 'text' || nested
              ? 'col-12'
              : 'col-xs-12 col-sm-6 col-md-3'
          "
        >
          <ChecklistInput
            v-if="item.input !== 'label'"
            :object="object"
            :item="item"
            :locale="locale"
            @calculate-tpa-colony-size="calculateTpaColonySize"
          ></ChecklistInput>
          <ChecklistFieldset
            v-if="item.input === 'label'"
            :object="object"
            :category="item"
            :locale="locale"
          ></ChecklistFieldset>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import ChecklistInput from '@components/checklist-input.vue'
import ChecklistFieldset from '@components/checklist-fieldset.vue'
import HiveIcon from '@components/hive-icon.vue'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    ChecklistInput,
    ChecklistFieldset,
    HiveIcon,
    VueNumberInput,
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
    nested: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      activeHive: null,
      colonySize: null,
      maxBroodLayers: 2,
      broodLayersForCalculation: null,
      maxFrames: 12,
      framesForCalculation: null,
    }
  },
  created() {
    this.activeHive = this.$store.getters['hives/activeHive']
    this.maxBroodLayers = this.countLayers('brood')
    this.broodLayersForCalculation = this.maxBroodLayers
    this.maxFrames = this.activeHive.layers[0].framecount
    this.framesForCalculation = this.maxFrames
  },
  methods: {
    calculateTpaColonySize() {
      var beesPerCm2 = 1.25
      var colonySize = null
      var pixelsTotal = 0
      var pixelsBees = 0

      setTimeout(() => {
        this.category.children.map((child) => {
          if (child.name === 'pixels_with_bees') {
            pixelsBees = parseInt(this.object[child.id])
          } else if (child.name === 'pixels_total_top') {
            pixelsTotal = parseInt(this.object[child.id])
          }
        })

        var hive = this.activeHive
        if (
          pixelsTotal === 0 ||
          typeof hive === 'undefined' ||
          hive === null ||
          isNaN(pixelsBees) ||
          isNaN(pixelsTotal) ||
          hive.fr_width_cm === null ||
          hive.fr_height_cm === null
        ) {
          colonySize = null
        } else {
          // colony_size = ratio occupied * fully occupied frames * 2 * brood layers * bees per cm2
          var ratio = pixelsTotal > pixelsBees ? pixelsBees / pixelsTotal : 1
          colonySize = Math.round(
            ratio *
              (parseFloat(hive.fr_width_cm) *
                parseFloat(hive.fr_height_cm) *
                this.framesForCalculation *
                2 *
                this.broodLayersForCalculation *
                beesPerCm2)
          )
        }

        // put value into input element 'colony_size'
        this.category.children.map((child) => {
          if (child.name === 'colony_size') {
            this.object[child.id] = colonySize
          }
        })
        this.colonySize = colonySize
      }, 100) // wait for vue to update input pixel values
    },
    countLayers(type) {
      return this.activeHive.layers.filter((layer) => layer.type === type)
        .length
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
.hive-frame-number-input {
  max-width: 150px !important;
}
</style>
