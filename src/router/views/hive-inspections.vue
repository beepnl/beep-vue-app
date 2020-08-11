<template>
  <Layout
    v-if="activeHive"
    :title="`${$tc('Inspection', 2)} ${activeHive.name}`"
    :no-box-shadow="true"
  >
    <v-toolbar class="hive-inspections-bar" dense light>
      <v-spacer></v-spacer>
      <v-btn medium tile outlined color="primary">
        <v-icon left>mdi-plus</v-icon>
        {{ $t('New_inspection') }}
      </v-btn>
    </v-toolbar>

    <v-container class="hive-inspections-content">
      <v-row class="hive-inspections-wrapper">
        <v-simple-table
          v-if="inspections.inspections !== undefined"
          fixed-header
          light
          height="100vh"
          class="table-responsive"
        >
          <template v-slot>
            <thead>
              <tr class="trh">
                <th class="tdr"
                  ><strong>{{ $tc('Inspection', 2) }}</strong></th
                >
                <th
                  v-for="(inspection, a) in inspections.inspections"
                  :key="a"
                  class="tdc"
                >
                  <div
                    v-if="inspection.owner || activeHive.owner"
                    class="inspection-actions d-flex justify-center"
                  >
                    <a
                      :href="`/hive/${id}/inspections/${inspection.id}`"
                      class="icon-button"
                    >
                      <v-icon small class="color-grey-medium"
                        >mdi-pencil</v-icon
                      >
                    </a>
                    <a
                      class="icon-button delete"
                      @click="deleteInspection(inspection.id)"
                    >
                      <v-icon small class="color-grey-medium"
                        >mdi-delete</v-icon
                      >
                    </a>
                  </div>
                  <strong class="d-flex justify-center hide-on-mobile">{{
                    momentify(inspection.created_at)
                  }}</strong>
                  <strong class="d-flex justify-center show-on-mobile ">{{
                    momentifyDayMonth(inspection.created_at)
                  }}</strong>
                </th>
                <!-- <th class="filler"></th> -->
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="tdr">{{ $t('positive_impression') }}</td>
                <td
                  v-for="(inspection, b) in inspections.inspections"
                  :key="b"
                  class="tdc"
                >
                  <div
                    v-if="
                      inspection.impression !== null &&
                        inspection.impression > -1
                    "
                  >
                    <v-icon
                      v-if="inspection.impression === 3"
                      class="green--text"
                      >mdi-emoticon-happy</v-icon
                    >
                    <v-icon
                      v-if="inspection.impression === 2"
                      class="orange--text"
                      >mdi-emoticon-neutral</v-icon
                    >
                    <v-icon v-if="inspection.impression === 1" class="red--text"
                      >mdi-emoticon-sad</v-icon
                    >
                  </div>
                </td>
                <!-- <td class="filler"></td> -->
              </tr>
              <tr>
                <td class="tdr">{{ $t('needs_attention') }}</td>
                <td
                  v-for="(inspection, c) in inspections.inspections"
                  :key="c"
                  class="tdc"
                >
                  <div
                    v-if="
                      inspection.attention !== null && inspection.attention > -1
                    "
                  >
                    <v-icon v-if="inspection.attention === 1" class="red--text"
                      >mdi-alert-circle</v-icon
                    >

                    <v-sheet
                      v-if="inspection.attention === 0"
                      class="beep-icon beep-icon-text color-green"
                    >
                      {{ $t('no') }}
                    </v-sheet>
                  </div>
                </td>
                <!-- <td class="filler"></td> -->
              </tr>
              <tr>
                <td class="tdr">{{ $t('notes') }}</td>
                <td
                  v-for="(inspection, d) in inspections.inspections"
                  :key="d"
                  class="tdc"
                >
                  <span
                    v-if="inspection.notes !== null"
                    :title="inspection.notes"
                    class="notes"
                    >{{ inspection.notes }}</span
                  >
                </td>
                <!-- <td class="filler"></td> -->
              </tr>

              <tr>
                <td class="tdr">{{ $t('reminder') }}</td>
                <td
                  v-for="(inspection, e) in inspections.inspections"
                  :key="e"
                  class="tdc"
                >
                  <span
                    v-if="inspection.reminder !== null"
                    :title="inspection.reminder"
                    class="notes reminder"
                    >{{ inspection.reminder }}</span
                  >
                  <!-- <span v-if="inspection.reminder_date">
                <add-to-calendar
                  :title="`Beep ${$t('reminder')}: ${inspection.reminder}`"
                  :location="`${activeHive.location} - ${activeHive.name}`"
                  :start="new Date(inspection.reminder_date)"
                  :end="new Date(inspection.reminder_date + 1)"
                  :details="
                    `Beep app ${$tc('Inspection', 1)} @ ${momentify(
                      // eslint-disable-next-line vue/comma-dangle
                      inspection.created_at
                    )}`
                  "
                  inline-template
                >
                  <div>
                    <google-calendar id="google-calendar">
                      <i class="fa fa-google"></i> Add to Google calendar
                    </google-calendar>

                    <microsoft-calendar id="microsoft-calendar">
                      <i class="fa fa-windows"></i> Add to Microsoft live
                      calendar
                    </microsoft-calendar>

                    <office365-calendar id="office365-calendar">
                      <i class="fa fa-windows"></i> Add to Office365 outlook
                      calendar
                    </office365-calendar>
                  </div>
                </add-to-calendar>
              </span> -->
                </td>
                <!-- <td class="filler"></td> -->
              </tr>

              <tr>
                <td class="tdr">{{ $t('remind_date') }}</td>
                <td
                  v-for="(inspection, f) in inspections.inspections"
                  :key="f"
                  class="tdc"
                >
                  <span
                    v-if="inspection.reminder_date !== null"
                    :title="inspection.reminder_date"
                    class="reminder-date"
                    >{{ momentify(inspection.reminder_date) }}</span
                  >
                </td>
                <!-- <td class="filler"></td> -->
              </tr>

              <tr v-for="(items, i) in inspections.items_by_date" :key="i">
                <td class="tdr" :class="items.items === null ? 'header' : ''">
                  <span v-if="items.items !== null" class="ancestors">{{
                    items.anc
                  }}</span>
                  <span :class="items.items === null ? 'header' : ''">{{
                    items.name
                  }}</span>
                </td>

                <td
                  v-if="items.items === null"
                  :colspan="inspections.inspections.length + 1"
                  class="header"
                ></td>

                <td v-for="(item, j) in items.items" :key="j" class="tdc">
                  <span v-if="item.type === 'slider'">{{ item.val }}</span>

                  <span v-if="item.type === 'list'">
                    <div
                      v-for="(opt, o) in item.val.split(',')"
                      :key="o"
                      style="margin-bottom: 3px;"
                      class="label-inspection"
                      >{{ opt }}</div
                    >
                  </span>

                  <span v-if="item.type === 'options'">{{ item.val }}</span>
                  <span v-if="item.type === 'select'">{{ item.val }}</span>
                  <span v-if="item.type === 'text'">{{ item.val }}</span>

                  <span
                    v-if="item.type === 'sample_code'"
                    style=" font-weight: bold;letter-spacing: 2px;"
                    >{{ item.val }}</span
                  >
                  <span v-if="item.type === 'date'">{{
                    momentify(item.val)
                  }}</span>
                  <span
                    v-if="
                      item.type !== undefined &&
                        item.type.indexOf('number') > -1
                    "
                    >{{ item.val }}</span
                  >

                  <span
                    v-if="item.type === 'boolean' || item.type === 'list_item'"
                  >
                    <div>
                      <v-sheet
                        v-if="parseInt(item.value) === 1"
                        class="beep-icon beep-icon-text color-green"
                      >
                        {{ $t('yes') }}
                      </v-sheet>
                      <v-sheet
                        v-if="parseInt(item.value) === 0"
                        class="beep-icon beep-icon-text color-red"
                      >
                        {{ $t('no') }}
                      </v-sheet>
                    </div>
                  </span>
                  <span v-if="item.type === 'boolean_yes_red'">
                    <div>
                      <v-sheet
                        v-if="parseInt(item.value) === 1"
                        class="beep-icon beep-icon-text color-red"
                      >
                        {{ $t('yes') }}
                      </v-sheet>
                      <v-sheet
                        v-if="parseInt(item.value) === 0"
                        class="beep-icon beep-icon-text color-green"
                      >
                        {{ $t('no') }}
                      </v-sheet>
                    </div>
                  </span>

                  <span v-if="item.type === 'smileys_3' && item.value !== null">
                    <div>
                      <v-icon
                        v-if="parseInt(item.value) === 3"
                        class="green--text"
                        >mdi-emoticon-happy</v-icon
                      >
                      <v-icon
                        v-if="parseInt(item.value) === 2"
                        class="orange--text"
                        >mdi-emoticon-neutral</v-icon
                      >
                      <v-icon
                        v-if="parseInt(item.value) === 1"
                        class="red--text"
                        >mdi-emoticon-sad</v-icon
                      >
                    </div>
                  </span>
                  <span v-if="item.type === 'score'">
                    <div
                      class="d-flex flex-row justify-center flex-wrap hide-on-mobile"
                      ><v-icon
                        v-for="star in [0, 1, 2, 3, 4]"
                        :key="star + 1"
                        :class="
                          star < item.val
                            ? 'primary--text'
                            : 'color-grey-medium'
                        "
                        >mdi-star</v-icon
                      >
                    </div>
                    <div
                      class="d-flex flex-row justify-center flex-wrap show-on-mobile"
                      ><v-icon
                        v-for="star in [0, 1, 2, 3, 4]"
                        :key="star + 1"
                        x-small
                        :class="
                          star < item.val ? 'primary--text' : 'hide-on-mobile'
                        "
                        >mdi-star</v-icon
                      >
                    </div>
                  </span>

                  <span
                    v-if="item.type === 'grade'"
                    :style="
                      `color: ${gradeColor(item.value)}; font-weight: bold;`
                    "
                    >{{ item.val }}</span
                  >
                  <span
                    v-if="item.type === 'score_quality'"
                    :style="`color: ${scoreQualityColor(item.value)};`"
                    >{{ scoreQualityOptions[item.value] }}</span
                  >
                  <span
                    v-if="item.type === 'score_amount'"
                    :style="
                      `color: ${scoreAmountColor(
                        // eslint-disable-next-line vue/comma-dangle
                        item.value
                      )}; font-weight: bold;`
                    "
                    >{{ scoreAmountOptions[item.value] }}</span
                  >
                  <span v-if="item.type === 'square_25cm2'"
                    >{{ (item.val * 25).toFixed(1) }} cm<sup>2</sup> ({{
                      item.val
                    }}
                    sq)</span
                  >
                  <span v-if="item.type === 'select_apiary'">{{
                    item.val
                  }}</span>
                  <span v-if="item.type === 'select_hive'">{{ item.val }}</span>
                  <span v-if="item.type === 'select_country'">{{
                    item.val.toUpperCase()
                  }}</span>
                  <span v-if="item.type === 'bee_subspecies'">{{
                    item.val
                  }}</span>
                  <span v-if="item.type === 'select_hive_type'">{{
                    item.val
                  }}</span>
                  <span v-if="item.type === 'image'">
                    <img
                      :src="item.val"
                      class="image-thumb"
                      style=" max-width: 80px;max-height: 60px"
                    />
                  </span>

                  <span
                    v-if="item.unit !== null && item.type !== 'square_25cm2'"
                    >{{ item.unit }}</span
                  >
                </td>
                <!-- <td v-if="items.items !== null" class="filler"></td> -->
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
// import { mapGetters } from 'vuex'
// import HiveIcons from '@components/hive-icons.vue'
// import { ScaleTransition } from 'vue2-transitions'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'
// import AddToCalendar from 'vue-add-to-calendar'

export default {
  components: {
    // HiveIcons,
    // ScaleTransition,
    // AddToCalendar,
    Layout,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      checklists: [],
      inspections: [],
      activeHive: null,
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    scoreAmountOptions() {
      return {
        1: this.$i18n.t('Low'),
        2: this.$i18n.t('Medium'),
        3: this.$i18n.t('High'),
        4: this.$i18n.t('Extreme'),
      }
    },
    scoreQualityOptions() {
      return {
        1: this.$i18n.t('Poor'),
        2: this.$i18n.t('Fair'),
        3: this.$i18n.t('Good'),
        4: this.$i18n.t('Excellent'),
      }
    },
  },
  created() {
    this.readHive()
    this.getChecklists()
    this.getAllInspectionsForHiveId()
  },
  methods: {
    async readHive() {
      try {
        const response = await this.$store.dispatch('hives/findById', this.id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.hives[0]
        // if (hive.queen && hive.queen.color && hive.queen.color !== null) {
        //   this.queenHasColor = true
        // } else if (hive.queen === null) {
        //   hive.queen = {
        //     clipped: null,
        //     color: null,
        //     created_at: null,
        //     description: null,
        //     fertilized: null,
        //     name: null,
        //   }
        // }
        this.activeHive = hive
        return true
      } catch (e) {
        console.log(e)
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async getAllInspectionsForHiveId() {
      try {
        const response = await this.$store.dispatch(
          'inspections/getAllInspectionsForHiveId',
          this.id
        )
        this.inspections = response
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async getChecklists() {
      try {
        const response = await this.$store.dispatch('inspections/getChecklists')
        this.checklists = response
        return true
      } catch (e) {
        console.log(e)
      }
    },
    deleteInspection(id) {
      console.log('confirm delete inspection' + id + '?')
    },
    gradeColor(value) {
      if (value === 0) return '#CCC'
      if (value < 4) return '#8F1619'
      if (value < 6) return '#5F3F90'
      if (value < 8) return '#243D80'
      if (value < 11) return '#069518'
      return '#F29100'
    },
    scoreAmountColor(value) {
      if (value === '0') return '#CCC'
      if (value === '1') return '#069518'
      if (value === '2') return '#243D80'
      if (value === '3') return '#5F3F90'
      if (value === '4') return '#8F1619'
      return '#F29100'
    },
    scoreQualityColor(value) {
      if (value === '0') return '#CCC'
      if (value === '1') return '#8F1619'
      if (value === '2') return '#5F3F90'
      if (value === '3') return '#243D80'
      if (value === '4') return '#069518'
      return '#F29100'
    },
  },
}
</script>

<style lang="scss" scoped>
.hive-inspections-bar {
  position: fixed;
  z-index: 2;
  width: 100%;
  background-color: $color-orange-light !important;
  border-bottom: 1px solid #fff5e2 !important;
  box-shadow: none !important;
}

.hive-inspections-content {
  margin-top: 56px;
}

.table-responsive {
  margin-bottom: 24px;
  font-size: 14px;
  border: none;

  @include for-phone-only {
    font-size: 12px;
  }

  .v-data-table__wrapper table {
    border-bottom: 1px solid $color-grey-light !important;
  }

  .ancestors {
    display: block;
    font-size: 10px;
  }

  .inspection-actions {
    display: block;
    min-width: 67px;
    a > i {
      min-width: 33px;
      @include for-phone-only {
        min-width: 25px;
      }
    }
  }

  .hide-on-mobile {
    @include for-phone-only {
      display: none !important;
    }
  }
  .show-on-mobile {
    display: none !important;
    @include for-phone-only {
      display: flex !important;
    }
  }
  .notes {
    display: block;
    display: -webkit-box;
    max-height: 24px;
    margin-bottom: 5px;
    overflow: hidden;
    font-size: 80%;
    font-style: italic;
    line-height: 1.1em;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    @include for-phone-only {
      font-size: 10px;
    }
  }
  .reminder-date {
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
  .label-inspection {
    display: block;
    padding: 0.2em 0.6em 0.3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #444;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: #eee;
    border-radius: 0.25em;
  }
  .filler {
    width: 100%;
  }
}

.trh {
  width: 200px;
  background-color: #ffedc7 !important;
}
.tdr {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  text-align: right !important;
  white-space: inherit;
  @include for-phone-only {
    min-width: 150px;
    max-width: 150px;
  }
}
.tdc {
  min-width: 200px;
  max-width: 200px;
  text-align: center;
  white-space: inherit !important;
  @include for-phone-only {
    min-width: 100px;
    max-width: 100px;
  }
}

td.header,
span.header {
  height: 12px;
  font-weight: bold;
  line-height: 24px;
  background-color: #ffedc7;
}
</style>
