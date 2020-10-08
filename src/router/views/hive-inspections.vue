<template>
  <Layout
    v-if="activeHive"
    :title="`${$tc('Inspection', 2)} ${activeHive.name}`"
    :no-box-shadow="true"
  >
    <div class="filter-bar-wrapper">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons d-flex flex-row justify-flex-start align-center"
          >
            <v-col cols="5" class="hide-on-mobile pr-1">
              <v-text-field
                ref="filter"
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field`
                "
                height="36px"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="5" class="show-on-mobile pr-0">
              <v-text-field
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field`
                "
                height="30px"
                clearable
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-icon
                :class="`${filterByReminder ? 'red--text' : 'color-grey'} mr-2`"
                @click="filterByReminder = !filterByReminder"
              >
                mdi-alert-circle
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(3)
                      ? 'green--text'
                      : 'color-grey'
                  } mr-2`
                "
                @click="updateFilterByImpression(3)"
              >
                mdi-emoticon-happy
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(2)
                      ? 'orange--text'
                      : 'color-grey'
                  } mr-2`
                "
                @click="updateFilterByImpression(2)"
              >
                mdi-emoticon-neutral
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(1) ? 'red--text' : 'color-grey'
                  } mr-2`
                "
                @click="updateFilterByImpression(1)"
              >
                mdi-emoticon-sad
              </v-icon>
            </v-card-actions>
          </div>

          <v-card-actions v-if="activeHive.editable || activeHive.owner">
            <v-btn
              class="hide-on-mobile"
              :href="`/hives/${id}/inspect`"
              medium
              tile
              outlined
              color="primary"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ $t('New_inspection') }}
            </v-btn>
            <v-icon
              class="show-on-mobile"
              :href="`/hives/${id}/inspect`"
              dark
              color="primary"
              >mdi-plus-circle</v-icon
            >
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <div class="hive-inspections-content">
      <v-simple-table
        v-if="
          inspections.inspections !== undefined && filteredInspections.length
        "
        light
        class="table-responsive"
      >
        <template v-slot>
          <thead>
            <tr class="trh">
              <th class="tdr"
                ><strong>{{ $tc('Inspection', 2) }}</strong></th
              >
              <th
                v-for="(inspection, a) in filteredInspections"
                :key="a"
                class="tdc"
              >
                <div class="inspection-actions d-flex justify-center">
                  <a
                    v-if="inspection.owner || activeHive.owner"
                    :href="`/hives/${id}/inspections/${inspection.id}`"
                    class="icon-button"
                  >
                    <v-icon small class="color-grey-medium">mdi-pencil</v-icon>
                  </a>
                  <a
                    v-if="inspection.owner || activeHive.owner"
                    class="icon-button delete"
                    @click="confirmDeleteInspection(inspection)"
                  >
                    <v-icon small class="color-grey-medium">mdi-delete</v-icon>
                  </a>
                </div>
                <strong class="d-flex justify-center hide-on-mobile">{{
                  momentify(inspection.created_at)
                }}</strong>
                <strong class="d-flex justify-center show-on-mobile ">{{
                  momentifyDayMonth(inspection.created_at)
                }}</strong>
              </th>
              <th class="filler"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="tdr">{{ $t('positive_impression') }}</td>
              <td
                v-for="(inspection, b) in filteredInspections"
                :key="b"
                class="tdc"
              >
                <div
                  v-if="
                    inspection.impression !== null && inspection.impression > -1
                  "
                >
                  <v-icon v-if="inspection.impression === 3" class="green--text"
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
              <td class="filler"></td>
            </tr>
            <tr>
              <td class="tdr">{{ $t('needs_attention') }}</td>
              <td
                v-for="(inspection, c) in filteredInspections"
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
              <td class="filler"></td>
            </tr>
            <tr>
              <td class="tdr">{{ $t('notes') }}</td>
              <td
                v-for="(inspection, d) in filteredInspections"
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
              <td class="filler"></td>
            </tr>

            <tr>
              <td class="tdr">{{ $t('reminder') }}</td>
              <td
                v-for="(inspection, e) in filteredInspections"
                :key="e"
                class="tdc"
              >
                <span
                  v-if="inspection.reminder !== null"
                  :title="inspection.reminder"
                  :class="`notes ${inspection.reminder_date ? 'pt-2' : ''}`"
                  >{{ inspection.reminder }}</span
                >
                <div v-if="inspection.reminder_date">
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        class="add-to-calendar primary--text"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ $t('add_to_calendar').toUpperCase() }}
                      </span>
                    </template>
                    <v-list dense>
                      <v-list-item
                        v-for="(calendarItem, index) in calendars"
                        :key="index"
                        link
                        dense
                      >
                        <v-list-item-action>
                          <AddToCalendar
                            :title="
                              `Beep ${$t('reminder')} ${
                                inspection.reminder !== null
                                  ? ': ' + inspection.reminder
                                  : ''
                              }`
                            "
                            :location="
                              `${activeHive.location} - ${activeHive.name}`
                            "
                            :start="new Date(inspection.reminder_date)"
                            :end="new Date(inspection.reminder_date + 1)"
                            :details="
                              `Beep app ${$tc('Inspection', 1)} @ ${momentify(
                                // eslint-disable-next-line vue/comma-dangle
                                inspection.created_at
                              )}`
                            "
                            :calendar="calendarItem"
                          ></AddToCalendar>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </td>
              <td class="filler"></td>
            </tr>

            <tr>
              <td class="tdr">{{ $t('remind_date') }}</td>
              <td
                v-for="(inspection, f) in filteredInspections"
                :key="f"
                class="tdc"
              >
                <div class="d-flex justify-center">
                  <span
                    v-if="inspection.reminder_date !== null"
                    :title="inspection.reminder_date"
                    class="hide-on-mobile d-flex justify-center reminder-date"
                    v-text="momentify(inspection.reminder_date)"
                  ></span>
                  <span
                    v-if="inspection.reminder_date !== null"
                    :title="inspection.reminder_date"
                    class="show-on-mobile d-flex justify-center reminder-date"
                    v-text="momentifyDayMonth(inspection.reminder_date)"
                  ></span>
                </div>
              </td>
              <td class="filler"></td>
            </tr>

            <tr v-for="(itemByDate, i) in matchedItemsByDate" :key="i">
              <td
                class="tdr"
                :class="
                  itemByDate.items === null ? 'header expandable-header' : ''
                "
                @click="toggleCategory($event.target.textContent)"
              >
                <v-icon
                  v-if="itemByDate.items === null"
                  :id="`toggle-icon-${itemByDate.name}`"
                  left
                  :class="
                    `toggle-icon mdi ${
                      hiddenCategories.includes(itemByDate.name)
                        ? 'mdi-plus'
                        : 'mdi-minus'
                    }`
                  "
                  @click="toggleCategory(itemByDate.name)"
                ></v-icon>
                <span v-if="itemByDate.items !== null" class="ancestors">{{
                  itemByDate.anc
                }}</span>
                <span :class="itemByDate.items === null ? 'header' : ''">{{
                  itemByDate.name
                }}</span>
              </td>

              <td
                v-if="itemByDate.items === null"
                :colspan="filteredInspections.length + 1"
                class="header"
              ></td>

              <td v-for="(item, j) in itemByDate.items" :key="j" class="tdc">
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
                    item.type !== undefined && item.type.indexOf('number') > -1
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
                    <v-icon v-if="parseInt(item.value) === 1" class="red--text"
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
                        star < item.val ? 'primary--text' : 'color-grey-medium'
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
                <span v-if="item.type === 'select_location'">{{
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
                <span
                  v-if="item.type === 'image'"
                  class="d-flex justify-center py-2"
                >
                  <v-img
                    :src="baseApiUrl + item.val"
                    class="grey lighten-2 image-thumb"
                    @click="setActiveImage(item.val)"
                  >
                  </v-img>
                  <imageOverlay
                    :date="activeImage ? activeImage.date : null"
                    :thumburl="item.val"
                    :overlay="
                      activeImage !== null && activeImage.thumb_url === item.val
                    "
                    @close-overlay="activeImage = null"
                  ></imageOverlay>
                </span>

                <span
                  v-if="item.unit !== null && item.type !== 'square_25cm2'"
                  >{{ item.unit }}</span
                >
              </td>
              <td v-if="itemByDate.items !== null" class="filler"></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-container
        v-if="
          inspections.inspections !== undefined && !filteredInspections.length
        "
      >
        <v-row>
          <v-col sm="auto" :cols="12">
            {{ $t('no_results') }}
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Confirm from '@components/confirm.vue'
import imageOverlay from '@components/image-overlay.vue'
// import { ScaleTransition } from 'vue2-transitions'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import AddToCalendar from '@components/add-to-calendar.vue'

export default {
  components: {
    imageOverlay,
    Confirm,
    // ScaleTransition,
    AddToCalendar,
    Layout,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      inspections: [],
      filterByReminder: false,
      filterByImpression: [],
      search: null,
      hiddenCategories: [],
      images: null,
      activeImage: null,
      calendars: ['Google', 'Microsoft', 'Office365'],
    }
  },
  computed: {
    ...mapGetters('hives', ['activeHive']),
    baseApiUrl() {
      var baseUrl = process.env.VUE_APP_API_URL
      baseUrl = baseUrl.replace('/api/', '')
      return baseUrl
    },
    id() {
      return parseInt(this.$route.params.id)
    },
    filteredInspectionsWithUndefined() {
      var textFilteredInspections = []
      if (this.search === null) {
        textFilteredInspections = this.inspections.inspections
      } else {
        textFilteredInspections = this.inspections.inspections.map(
          (inspection) => {
            const inspectionMatch = Object.entries(inspection).some(
              ([key, value]) => {
                if (
                  value !== null &&
                  typeof value === 'string'
                  // && key !== ('description' || 'type' || 'hex_color' || 'created_at')
                ) {
                  return value.toLowerCase().includes(this.search.toLowerCase())
                } else if (key === 'id') {
                  return value.toString().includes(this.search)
                }
              }
            )
            if (inspectionMatch) {
              return inspection
            }
          }
        )
      }

      var propertyFilteredInspections = textFilteredInspections
        .map((inspection) => {
          if (typeof inspection !== 'undefined' && this.filterByReminder) {
            if (
              inspection.attention === 1 ||
              inspection.reminder !== null ||
              inspection.reminder_date !== null
            ) {
              return inspection
            }
          } else {
            return inspection
          }
        })
        .map((inspection) => {
          if (
            typeof inspection !== 'undefined' &&
            this.filterByImpression.length > 0
          ) {
            if (this.filterByImpression.includes(inspection.impression)) {
              return inspection
            }
          } else {
            return inspection
          }
        })

      return propertyFilteredInspections
    },
    filteredInspections() {
      return this.filteredInspectionsWithUndefined.filter(
        (x) => x !== undefined
      )
    },
    inspectionIndexes() {
      var inspectionIndexes = []
      this.filteredInspectionsWithUndefined.map((inspection, i) => {
        if (inspection !== undefined) {
          inspectionIndexes.push(i)
        }
      })
      return inspectionIndexes
    },
    matchedItemsByDate() {
      var matchedItemsByDate = []
      matchedItemsByDate = this.inspections.items_by_date
        .reduce((acc, itemByDate) => {
          if (
            itemByDate.anc === null ||
            this.hiddenCategories.length === 0 ||
            !this.hiddenCategories.includes(itemByDate.anc.split(' ')[0])
          ) {
            acc.push(itemByDate)
          }
          return acc
        }, [])
        .map((itemByDate) => {
          if (itemByDate.items !== null) {
            return {
              ...itemByDate,
              items: itemByDate.items.reduce((acc, item, index) => {
                if (this.inspectionIndexes.includes(index)) {
                  if (typeof item === 'object') {
                    acc.push(item)
                  } else {
                    acc.push('')
                  }
                }
                return acc
              }, []),
            }
          } else {
            return itemByDate
          }
        })
      return matchedItemsByDate
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
    this.search = this.$route.query.search || null
    this.getActiveHive(this.id).then((hive) => {
      this.$store.commit('hives/setActiveHive', hive)
    })
    this.getAllInspectionsForHiveId()
    this.readImages()
  },
  methods: {
    async deleteInspection(id) {
      try {
        const response = await this.$store.dispatch(
          'inspections/deleteInspection',
          id
        )
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        this.getAllInspectionsForHiveId()
      } catch (error) {
        console.log(error)
        this.snackbar.text = this.$i18n.t('something_wrong')
        this.snackbar.show = true
      }
    },
    async getActiveHive(id) {
      try {
        const response = await this.$store.dispatch('hives/findById', id)
        if (response.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.hives[0]
        return hive
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
    async readImages() {
      try {
        const response = await this.$store.dispatch('images/findAll')
        this.images = response
        return true
      } catch (e) {
        console.log(e)
      }
    },
    confirmDeleteInspection(inspection) {
      this.$refs.confirm
        .open(
          this.$i18n.t('remove_inspection'),
          this.$i18n.t('remove_inspection') +
            ' (' +
            this.$i18n.t('Date').toLocaleLowerCase() +
            ': ' +
            this.momentify(inspection.created_at) +
            ')?',
          {
            color: 'red',
          }
        )
        .then((confirm) => {
          this.deleteInspection(inspection.id)
        })
        .catch((reject) => {
          return true
        })
    },
    getImageUrl(thumburl) {
      var imageUrl = thumburl.replace('thumbs', 'images')
      return imageUrl
    },
    gradeColor(value) {
      if (value === 0) return '#CCC'
      if (value < 4) return '#8F1619'
      if (value < 6) return '#5F3F90'
      if (value < 8) return '#243D80'
      if (value < 11) return '#069518'
      return '#F29100'
    },
    toggleCategory(string) {
      if (this.hiddenCategories.includes(string)) {
        this.hiddenCategories.splice(this.hiddenCategories.indexOf(string), 1)
      } else {
        this.hiddenCategories.push(string)
      }
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
    setActiveImage(thumburl) {
      if (this.images !== null) {
        this.images.forEach((image) => {
          if (image.thumb_url === thumburl) {
            this.activeImage = image
          }
        })
      } else {
        this.activeImage = null
      }
    },
    updateFilterByImpression(number) {
      if (this.filterByImpression.includes(number)) {
        this.filterByImpression.splice(
          this.filterByImpression.indexOf(number),
          1
        )
      } else {
        this.filterByImpression.push(number)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-wrapper {
  position: fixed;
  top: 52px;
  z-index: 1;
  width: 100%;
  max-width: 100vw;
  margin-top: -4px;
  background-color: $color-orange-light;
  border-bottom: 1px solid #fff5e2;
  .filter-container {
    @include for-phone-only {
      padding: 10px;
    }
  }
  .filter-bar {
    margin-top: -10px;
    margin-bottom: -10px;
    @include for-tablet-portrait-up {
      margin-top: -12px;
      margin-bottom: -12px;
    }
    .v-input {
      background-color: $color-white;
      @include for-phone-only {
        max-width: 115px;
      }
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

.hive-inspections-content {
  max-width: 100vw;
  margin-top: 61px;
  overflow: hidden;
  @include for-phone-only {
    margin-top: 55px;
  }
}

.table-responsive {
  overflow: visible;
  font-size: 14px;
  border-top: 1px solid $color-grey-light;
  border-bottom: 1px solid $color-grey-light;
  border-radius: 0;

  @include for-phone-only {
    font-size: 12px;
  }

  .ancestors {
    display: block;
    font-size: 10px;
  }

  .inspection-actions {
    display: block;
    min-width: 67px;
    min-height: 18px;
    a > i {
      min-width: 33px;
      @include for-phone-only {
        min-width: 25px;
      }
    }
  }
  .notes,
  .add-to-calendar {
    display: block;
    display: -webkit-box;
    padding: 0;
    margin-bottom: 0;
    overflow: hidden;
    font-size: 80%;
    font-style: italic;
    line-height: 1.1em;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @include for-phone-only {
      font-size: 10px;
      -webkit-line-clamp: 3;
    }
  }
  .add-to-calendar {
    max-height: none;
    padding: 8px 0;
    font-style: normal;
    font-weight: 600;
    cursor: pointer;
  }
  .reminder-date {
    width: auto;
    max-width: 150px;
    padding: 2px 4px !important;
    font-weight: 600;
    line-height: 1rem;
    color: red;
    text-align: center;
    white-space: nowrap;
    white-space: pre-wrap;
    border: 1px solid red;
    border-radius: 5px;
    @include for-phone-only {
      max-width: 80px;
    }
  }
  .label-inspection {
    display: block;
    padding: 0.3em 0.6em 0.2em;
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
  .image-thumb {
    width: auto;
    max-width: 80px;
    height: auto;
    max-height: 120px;
    cursor: zoom-in;
    border: 1px solid $color-grey;
    border-radius: 4px;
    @include for-phone-only {
      max-width: 100%;
    }
  }
  .filler {
    width: 100%;
  }
}

.trh {
  height: 56px;
  background-color: $color-orange-medium !important;
  @include for-phone-only {
    height: 50px;
  }
  .tdr {
    font-size: 14px;
    @include for-phone-only {
      font-size: 12px;
    }
  }
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
    font-size: 12px;
  }
  &.header {
    padding: 8px 16px;
    &.expandable-header {
      cursor: pointer;
    }
  }
  .toggle-icon {
    float: left;
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
    span {
      display: inline-block;
      font-size: 12px;
      line-height: 1.2em;
    }
  }
}

td.header,
span.header {
  height: 12px;
  font-weight: bold;
  line-height: 24px;
  background-color: $color-orange-medium;
}
</style>
