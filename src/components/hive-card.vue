<template>
  <v-card
    class="hive-card d-flex flex-column justify-end align-start"
    :style="
      `border-color: ${
        hiveSet.hex_color
          ? hiveSet.hex_color + ' !important'
          : '#ffa000 !important'
      };`
    "
    outlined
  >
    <v-row class="ml-0 mb-3 mr-2">
      <h4
        v-if="gridView"
        class="hive-name"
        v-text="
          `
      ${hive.name.length < 25 ? hive.name : hive.name.substring(0, 25) + '...'}
      `
        "
      >
      </h4>
      <div
        v-if="!gridView && hiveSet.users && hiveSet.users.length"
        class="d-flex flex-row"
      >
        <h4
          class="hive-name"
          v-text="
            `${
              hive.name.length < 35
                ? hive.name
                : hive.name.substring(0, 35) + '...'
            }`
          "
        >
        </h4>
        <pre class="caption hive-name-caption" v-text="` (${hive.location})`">
        </pre>
      </div>
      <h4
        v-if="!gridView && !hiveSet.users"
        class="hive-name"
        v-text="
          `
      ${hive.name.length < 50 ? hive.name : hive.name.substring(0, 50) + '...'}
      `
        "
      >
      </h4>
    </v-row>

    <div class="hive-details d-flex flex-no-wrap justify-flex-start align-end">
      <router-link
        class="hive-edit-link"
        :to="{
          name: `hive-edit`,
          params: { id: hive.id },
        }"
      >
        <HiveIcon :hive="hive"></HiveIcon>
      </router-link>

      <div class="pl-2 pr-0 py-0">
        <div
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <a :href="`/hives/${hive.id}/inspections`">
              <v-icon v-if="hive.impression === 1" class="red--text">
                mdi-emoticon-sad
              </v-icon>
              <v-icon v-if="hive.impression === 3" class="green--text">
                mdi-emoticon-happy
              </v-icon>
              <v-icon v-if="hive.impression === 2" class="orange--text">
                mdi-emoticon-neutral
              </v-icon>
              <v-icon v-if="!hive.impression" class="color-grey">
                mdi-pencil-circle
              </v-icon>
            </a>
          </div>
          <span
            v-if="!gridView"
            :class="
              `${
                hive.last_inspection_date !== null ? '' : 'color-grey'
              } mr-2 last-visit`
            "
            v-text="lastVisit(hive)"
          >
          </span>
        </div>

        <div
          v-if="hive.attention || hive.reminder"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <v-icon v-if="hive.attention || hive.reminder" class="red--text">
              mdi-alert-circle
            </v-icon>
          </div>
          <span
            v-if="hive.reminder_date"
            class="to-do-date mr-2"
            v-text="momentifyDayMonth(hive.reminder_date)"
          >
          </span>
          <span v-if="hive.reminder && !gridView" v-text="hive.reminder">
          </span>
        </div>

        <div
          v-if="hive.queen !== null"
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <v-sheet
              class="beep-icon beep-icon-queen"
              :color="hive.queen.color"
            >
            </v-sheet>
          </div>
          <div v-if="hive.id % 7 === 0 || hive.id === 1" class="mr-2 my-0">
            <v-icon class="red--text">
              mdi-bugle
            </v-icon>
          </div>
          <div v-if="hive.id % 4 === 0 || hive.id === 1" class="mr-2 my-0">
            <v-icon class="red--text">
              mdi-duck
            </v-icon>
          </div>
          <span
            v-if="hive.queen.name && !gridView"
            v-text="hive.queen.name"
          ></span>
        </div>

        <div
          v-if="
            hive.id % 2 === 0 ||
              hive.id % 3 === 0 ||
              hive.id % 5 === 0 ||
              hive.id === 1
          "
          class="hive-details-item d-flex flex-no-wrap justify-flex-start align-center pa-0"
        >
          <div class="mr-2 my-0">
            <v-sheet class="beep-icon beep-icon-sensors"> </v-sheet>
          </div>
          <div class="icon-wrapper d-flex flex-row">
            <div class="mr-1 my-0 icon-wrapper d-flex flex-row align-center">
              <v-icon :class="`${hive.id % 6 === 0 ? 'red--text' : ''}`">
                mdi-weight
              </v-icon>
              <v-icon
                :class="
                  `ml-n1 icon-side-arrow ${
                    hive.id % 6 === 0 ? 'red--text' : ''
                  }`
                "
              >
                mdi-arrow-up-thick
              </v-icon>
            </div>
            <div class="mr-2 my-0 icon-wrapper d-flex flex-row align-center">
              <v-icon :class="`${hive.id === 18 ? 'red--text' : ''}`">
                mdi-thermometer
              </v-icon>
              <v-icon
                v-if="hive.id === 18"
                class="ml-n2 mr-1 icon-side-arrow red--text"
              >
                mdi-arrow-down-thick
              </v-icon>
              <div
                :class="
                  `ml-n1 temp ${hive.id === 18 ? 'red--text' : 'color-grey'}`
                "
                >{{ Math.floor(Math.random() * 6) + 16 + '°C' }}</div
              >
            </div>
            <div class="my-0 icon-wrapper d-flex flex-row">
              <v-icon>
                mdi-volume-low
              </v-icon>
              <div class="sound-chart d-flex justify-center align-end">
                <v-sheet
                  v-for="(volumeBar, i) in volumeBars"
                  :key="i"
                  :height="`${volumeBar.value}%`"
                  :class="`volume-bar ${volumeBar.alarm ? 'alarm' : ''}`"
                >
                </v-sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import HiveIcon from '@components/hive-icon.vue'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    HiveIcon,
  },
  mixins: [momentMixin],
  props: {
    hive: {
      type: Object,
      default: null,
      required: true,
    },
    gridView: {
      type: Boolean,
      default: false,
    },
    hiveSet: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: () => ({
    volumeBars: [
      {
        value: 25,
        alarm: false,
      },
      {
        value: 0,
        alarm: false,
      },
      {
        value: 22,
        alarm: false,
      },
      {
        value: 100,
        alarm: true,
      },
      {
        value: 45,
        alarm: false,
      },
      {
        value: 80,
        alarm: true,
      },
      {
        value: 25,
        alarm: false,
      },
      {
        value: 45,
        alarm: false,
      },
      {
        value: 30,
        alarm: false,
      },
      {
        value: 35,
        alarm: false,
      },
    ],
  }),

  methods: {
    lastVisit(hive) {
      if (hive.last_inspection_date !== null) {
        return this.momentFromNow(hive.last_inspection_date)
      } else {
        return this.$i18n.t('no_inspections')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-card {
  height: 100%;
  padding: 12px;
  font-size: 0.875rem !important;
  @include for-phone-only {
    font-size: 0.8125rem !important;
  }
  @include for-phone-only {
    padding: 10px;
  }
  a {
    text-decoration: none;
  }

  .hive-name {
    line-height: 1rem;
  }

  .hive-name-caption {
    font-weight: 600;
    line-height: 1rem;
  }

  .hive-details {
    .hive-edit-link {
      cursor: pointer;
    }

    .hive-details-item {
      margin-bottom: 8px;
      line-height: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .icon-wrapper {
      display: inline-block;
      white-space: nowrap;
    }
    .last-visit {
      white-space: nowrap;
    }
    .to-do-date {
      width: auto;
      padding: 2px 4px !important;
      font-weight: 600;
      line-height: 1rem;
      color: red;
      text-align: center;
      white-space: nowrap;
      border: 1px solid red;
      border-radius: 5px;
    }
    .beep-icon-sensors {
      background-color: green;
      border-color: green;
    }
    .temp {
      font-weight: 600;
    }
    .sound-chart {
      width: 24px;
      height: 20px;
      margin-left: -3px;
      border-bottom: 1px solid $color-grey;
      .volume-bar {
        width: 2px;
        background-color: $color-grey;
        &.alarm {
          background-color: red;
        }
      }
    }
  }
}
</style>
