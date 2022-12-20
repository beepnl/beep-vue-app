<!-- eslint-disable vue/comma-dangle -->
<template>
  <Layout
    v-if="activeHive"
    :title="`${$tc('Inspection', 2)} ${activeHive.name}`"
    :query="passOnQuery"
  >
    <div class="filter-bar-wrapper filter-bar-inspections">
      <v-container class="filter-container">
        <v-row
          class="filter-bar d-flex flex-row justify-space-between align-center"
        >
          <div
            class="filter-buttons filter-buttons--has-max d-flex flex-row justify-flex-start align-center"
          >
            <v-col class="pa-3 pr-1 pr-sm-2">
              <v-text-field
                v-model="search"
                :label="`${$t('Search')}`"
                :class="
                  `${
                    search !== null ? 'v-input--is-focused primary--text' : ''
                  } filter-text-field`
                "
                :height="smallScreen ? '30px' : '36px'"
                clearable
                outlined
                dense
                hide-details
                :append-outer-icon="search ? 'mdi-magnify' : ''"
                clear-icon="mdi-close"
                type="text"
                @click:append-outer="readInspectionsForHiveId"
                @click:clear="clearSearch"
                @keydown.enter.prevent="readInspectionsForHiveId"
              ></v-text-field>
            </v-col>
            <v-card-actions class="pl-0">
              <v-icon
                :class="
                  `${
                    filterByAttention ? 'red--text' : 'color-grey-filter'
                  } mr-2`
                "
                @click="toggleFilterByAttention"
              >
                mdi-clipboard-alert-outline
              </v-icon>
              <v-icon
                :class="
                  `${filterByReminder ? 'red--text' : 'color-grey-filter'} mr-2`
                "
                @click="toggleFilterByReminder"
              >
                mdi-calendar-clock
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(3)
                      ? 'green--text'
                      : 'color-grey-filter'
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
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="updateFilterByImpression(2)"
              >
                mdi-emoticon-neutral
              </v-icon>
              <v-icon
                :class="
                  `${
                    filterByImpression.includes(1)
                      ? 'red--text'
                      : 'color-grey-filter'
                  } mr-2`
                "
                @click="updateFilterByImpression(1)"
              >
                mdi-emoticon-sad
              </v-icon>

              <div
                v-if="hasPages"
                class="d-flex align-center mr-3 ml-n2 ml-sm-0"
              >
                <v-icon
                  :class="
                    isFirstPage ? 'color-transparent' : 'color-grey-filter'
                  "
                  :disabled="isFirstPage"
                  size="26"
                  @click="setPageIndex(-1)"
                >
                  mdi-chevron-left
                </v-icon>
                <span class="pagination-text" v-text="paginationText"></span>
                <v-icon
                  v-if="!isLastPage"
                  class="color-grey-filter"
                  size="26"
                  @click="setPageIndex(1)"
                >
                  mdi-chevron-right
                </v-icon>
              </div>
            </v-card-actions>
          </div>

          <v-card-actions v-if="activeHive.editable || activeHive.owner">
            <v-btn
              v-if="!smallScreen"
              :to="{ name: 'inspect', query: { hiveId: id } }"
              tile
              outlined
              color="black"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ $t('New_inspection') }}
            </v-btn>
            <router-link
              v-if="smallScreen"
              :to="{ name: 'inspect', query: { hiveId: id } }"
            >
              <v-icon dark color="accent">mdi-plus-circle</v-icon></router-link
            >
          </v-card-actions>
        </v-row>
      </v-container>
    </div>

    <v-container
      v-if="!ready || loadingInspections"
      class="hive-inspections-content"
    >
      <div class="loading">
        <v-progress-circular size="50" color="primary" indeterminate />
      </div>
    </v-container>

    <div v-if="ready && !loadingInspections" class="hive-inspections-content">
      <div
        v-if="
          !noResults &&
            inspections.inspections !== undefined &&
            inspectionsData.length
        "
        class="hive-inspections-view-box"
      >
        <div class="table-responsive">
          <table>
            <thead>
              <tr class="trh">
                <th class="tdr"
                  ><strong>{{ $tc('Inspection', 2) }}</strong></th
                >
                <th
                  v-for="(inspection, a) in inspectionsData"
                  :key="a"
                  class="tdc"
                >
                  <div
                    v-if="inspection.owner || activeHive.owner"
                    class="inspection-actions d-flex justify-center"
                  >
                    <router-link
                      :to="{
                        name: 'hive-inspect-edit',
                        params: { id: id, inspection: inspection.id },
                      }"
                      class="icon-button"
                    >
                      <v-icon small class="color-grey-medium"
                        >mdi-pencil</v-icon
                      >
                    </router-link>
                    <a
                      class="icon-button delete"
                      @click="confirmDeleteInspection(inspection)"
                    >
                      <v-icon small class="color-grey-medium"
                        >mdi-delete</v-icon
                      >
                    </a>
                  </div>
                  <strong class="d-flex justify-center">{{
                    smallScreen
                      ? momentFormat(inspection.created_at, 'll')
                      : momentify(inspection.created_at)
                  }}</strong>
                </th>
                <th class="filler"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="tdr">{{ $t('positive_impression') }}</td>
                <td
                  v-for="(inspection, b) in inspectionsData"
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
                <td class="filler"></td>
              </tr>
              <tr>
                <td class="tdr">{{ $t('needs_attention') }}</td>
                <td
                  v-for="(inspection, c) in inspectionsData"
                  :key="c"
                  class="tdc"
                >
                  <div
                    v-if="
                      inspection.attention !== null && inspection.attention > -1
                    "
                  >
                    <v-icon v-if="inspection.attention === 1" class="red--text"
                      >mdi-clipboard-alert-outline</v-icon
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
                  v-for="(inspection, d) in inspectionsData"
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
                  v-for="(inspection, e) in inspectionsData"
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
                          class="add-to-calendar accent--text"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ $t('add_to_calendar').toUpperCase() }}
                        </span>
                      </template>
                      <v-list dense>
                        <template v-for="(calendarItem, index) in calendars">
                          <AddToCalendar
                            :key="index"
                            :title="
                              `BEEP ${$t('reminder')} ${
                                inspection.reminder !== null
                                  ? ': ' + inspection.reminder
                                  : ''
                              }`
                            "
                            :location="
                              `${activeHive.location} - ${activeHive.name}`
                            "
                            :start="
                              new Date(
                                inspection.reminder_date.replace(/-/g, '/')
                              )
                            "
                            :end="
                              getNextHour(
                                inspection.reminder_date.replace(/-/g, '/')
                              )
                            "
                            :details="
                              `BEEP app ${$tc('Inspection', 1)} @ ${momentify(
                                inspection.created_at
                              )}`
                            "
                            :calendar="calendarItem"
                          ></AddToCalendar>
                        </template>
                      </v-list>
                    </v-menu>
                  </div>
                </td>
                <td class="filler"></td>
              </tr>

              <tr>
                <td class="tdr">{{ $t('remind_date') }}</td>
                <td
                  v-for="(inspection, f) in inspectionsData"
                  :key="f"
                  class="tdc"
                >
                  <div class="d-flex justify-center">
                    <span
                      v-if="inspection.reminder_date !== null"
                      :title="inspection.reminder_date"
                      :class="
                        `d-flex justify-center reminder-date ${
                          $moment(inspection.reminder_date).isBefore()
                            ? 'red--text'
                            : 'green--text'
                        }`
                      "
                      v-text="
                        smallScreen
                          ? momentFormat(inspection.reminder_date, 'll')
                          : momentify(inspection.reminder_date)
                      "
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
                  :colspan="inspectionsData.length + 1"
                  class="header expandable-header"
                  @click="toggleCategory(itemByDate.name)"
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
                  <span v-if="item.type === 'text'" class="notes">{{
                    item.val
                  }}</span>

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
                    <div class="d-flex flex-row justify-center flex-wrap"
                      ><v-icon
                        v-for="star in [0, 1, 2, 3, 4]"
                        :key="star + 1"
                        :x-small="smallScreen"
                        :class="
                          star < item.val
                            ? 'color-accent'
                            : smallScreen
                            ? 'd-none'
                            : 'color-grey-medium'
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
                      :src="getFullUrl(item.val)"
                      class="grey lighten-2 image-thumb"
                      @click="activeImage = item.val"
                    >
                    </v-img>
                    <imageOverlay
                      :thumburl="item.val"
                      :overlay="
                        activeImage !== null && activeImage === item.val
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
          </table>
        </div>
      </div>
      <v-container v-if="noResults">
        <v-row>
          <v-col sm="auto" :cols="12">
            {{
              show500Response
                ? $t('something_wrong')
                : noInspections
                ? $tc('Inspection', 2) + ' ' + $t('not_available_yet')
                : $t('no_results')
            }}
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="accent" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import imageOverlay from '@components/image-overlay.vue'
// import { ScaleTransition } from 'vue2-transitions'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import {
  readApiariesAndGroups,
  readGeneralInspections,
} from '@mixins/methodsMixin'
import { momentify, momentFormat } from '@mixins/momentMixin'
import AddToCalendar from '@components/add-to-calendar.vue'

export default {
  components: {
    imageOverlay,
    Confirm,
    // ScaleTransition,
    AddToCalendar,
    Layout,
  },
  mixins: [
    momentify,
    momentFormat,
    readApiariesAndGroups,
    readGeneralInspections,
  ],
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      inspections: [],
      filterByAttention: false,
      filterByImpression: [],
      filterByReminder: false,
      search: null,
      hiddenCategories: [],
      images: null,
      activeImage: null,
      calendars: ['Google', 'Microsoft', 'Office365'],
      ready: false,
      show500Response: false,
      baseApiUrl:
        process.env.VUE_APP_BASE_API_URL ||
        process.env.VUE_APP_BASE_API_URL_FALLBACK,
      pageIndex: 1,
      searchPageIndex: 1,
      loadingInspections: false,
    }
  },
  computed: {
    ...mapGetters('hives', ['activeHive']),
    id() {
      return parseInt(this.$route.params.id)
    },
    inspectionsData() {
      return this.inspections.inspections !== undefined
        ? this.inspections.inspections.data
        : []
    },
    filters() {
      if (
        this.filterByAttention ||
        this.filterByReminder ||
        this.filterByImpression.length > 0
      ) {
        var parameters = [
          this.filterByAttention ? 'attention=1' : null,
          this.filterByReminder ? 'reminder=1' : null,
          this.filterByImpression.length > 0
            ? 'impression=' + this.filterByImpression
            : null,
        ]
        return (
          (this.search !== null ? '&' : '?') +
          parameters
            .filter((p) => {
              return p !== null
            })
            .join('&')
        )
      } else {
        return null
      }
    },
    hasPages() {
      return (
        this.inspections.inspections !== undefined &&
        this.inspections.inspections.total > 1
      )
    },
    isFirstPage() {
      return this.searchOrFilter
        ? this.searchPageIndex === 1
        : this.pageIndex === 1
    },
    isLastPage() {
      return (
        this.inspectionsData.length > 0 &&
        (this.searchOrFilter
          ? this.searchPageIndex === this.lastPage
          : this.pageIndex === this.lastPage)
      )
    },
    lastPage() {
      return this.inspectionsData.length > 0
        ? this.inspections.inspections.last_page
        : null
    },
    locale() {
      return this.$i18n.locale
    },
    matchedItemsByDate() {
      var matchedItemsByDate = []
      matchedItemsByDate = this.inspections.items_by_date
        .reduce((acc, itemByDate) => {
          if (
            itemByDate.anc === null ||
            this.hiddenCategories.length === 0 ||
            !this.hiddenCategories.includes(itemByDate.anc.split(' >')[0])
          ) {
            acc.push(itemByDate)
          }
          return acc
        }, [])
        .map((itemByDate) => {
          if (itemByDate.items !== null) {
            return {
              ...itemByDate,
              items: itemByDate.items.reduce((acc, item) => {
                if (typeof item === 'object') {
                  acc.push(item)
                } else {
                  acc.push('')
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
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    noInspections() {
      return (
        (this.activeHive.editable || this.activeHive.owner) &&
        !this.searchOrFilter &&
        this.inspections.inspections !== undefined &&
        this.inspections.inspections.data.length === 0
      )
    },
    noResults() {
      return (
        this.noInspections ||
        (this.searchOrFilter && this.inspectionsData.length === 0) ||
        this.show500Response
      )
    },
    paginationText() {
      return (
        (!this.mobile ? this.$i18n.tc('Page', 1) + ' ' : '') +
        (this.searchOrFilter ? this.searchPageIndex : this.pageIndex) +
        (!this.mobile ? ' ' + this.$i18n.t('of') + ' ' + this.lastPage : '')
      )
    },
    passOnQuery() {
      var queries = this.$route.query
      if ('interval' in queries) {
        return queries
      } else {
        return null
      }
    },
    searchOrFilter() {
      return this.search !== null || this.filters !== null
    },
    smallScreen() {
      return this.$vuetify.breakpoint.width < 700
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
  watch: {
    locale() {
      this.readInspectionsForHiveId()
    },
  },
  created() {
    this.search = this.$route.query.search || null
    this.getActiveHive(this.id).then((hive) => {
      this.$store.commit('hives/setActiveHive', hive)
    })
    this.readInspectionsForHiveId().then(() => {
      this.ready = true
    })
  },
  methods: {
    async deleteInspection(id) {
      try {
        const response = await Api.deleteRequest('/inspections/', id)
        if (!response) {
          this.snackbar.text = this.$i18n.t('something_wrong')
          this.snackbar.show = true
        }
        this.readInspectionsForHiveId()
        this.readGeneralInspections() // update generalInspections in store for diary-list
        this.readApiariesAndGroups() // update apiaries and groups so the latest inspection will be displayed at apiary-list
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
          const msg = error.response.data.message
          this.snackbar.text = msg
        } else {
          console.log('Error: ', error)
          this.snackbar.text = this.$i18n.t('something_wrong')
        }
        this.snackbar.show = true
      }
    },
    async getActiveHive(id) {
      try {
        const response = await Api.readRequest('/hives/', id)
        if (response.data.length === 0) {
          this.$router.push({ name: '404', params: { resource: 'hive' } })
        }
        const hive = response.data.hives[0]
        return hive
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
        this.$router.push({ name: '404', params: { resource: 'hive' } })
      }
    },
    async readInspectionsForHiveId() {
      this.loadingInspections = true
      this.show500Response = false

      var searchSpecific =
        this.search !== null && this.search.indexOf('=') > -1
          ? this.search
          : null
      try {
        const response = await Api.readRequest(
          '/inspections/hive/' +
            this.id +
            (this.searchOrFilter
              ? (searchSpecific !== null
                  ? '?' + searchSpecific
                  : this.search
                  ? '?search=' + this.search
                  : '') +
                (this.filters ? this.filters : '') +
                (this.searchPageIndex !== 1
                  ? '&page=' + this.searchPageIndex
                  : '')
              : '?page=' + this.pageIndex)
        )
        this.inspections = response.data
        this.loadingInspections = false
        return true
      } catch (error) {
        this.loadingInspections = false
        if (error.response) {
          console.log('Error: ', error.response)
          if (error.response.status === 500) {
            this.show500Response = true
          }
        } else {
          console.log('Error: ', error)
        }
      }
    },
    clearSearch() {
      this.search = null
      this.searchPageIndex = 1
      this.readInspectionsForHiveId()
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
    getFullUrl(val) {
      return val.indexOf('https://') > -1 ? val : this.baseApiUrl + val
    },
    getNextHour(date) {
      var today = new Date(date)
      var nextHour = new Date(today.setHours(today.getHours() + 1))
      return nextHour
    },
    gradeColor(value) {
      if (value === 0) return '#CCC'
      if (value < 4) return '#8F1619'
      if (value < 6) return '#5F3F90'
      if (value < 8) return '#243D80'
      if (value < 11) return '#069518'
      return '#F8B133'
    },
    toggleCategory(string) {
      if (this.hiddenCategories.includes(string)) {
        this.hiddenCategories.splice(this.hiddenCategories.indexOf(string), 1)
      } else {
        this.hiddenCategories.push(string)
      }
    },
    toggleFilterByAttention() {
      this.filterByAttention = !this.filterByAttention
      this.readInspectionsForHiveId()
    },
    toggleFilterByReminder() {
      this.filterByReminder = !this.filterByReminder
      this.readInspectionsForHiveId()
    },
    scoreAmountColor(value) {
      if (value === '0') return '#CCC'
      if (value === '1') return '#069518'
      if (value === '2') return '#243D80'
      if (value === '3') return '#5F3F90'
      if (value === '4') return '#8F1619'
      return '#F8B133'
    },
    scoreQualityColor(value) {
      if (value === '0') return '#CCC'
      if (value === '1') return '#8F1619'
      if (value === '2') return '#5F3F90'
      if (value === '3') return '#243D80'
      if (value === '4') return '#069518'
      return '#F8B133'
    },
    setPageIndex(value) {
      if (!this.searchOrFilter) {
        this.pageIndex += value
      } else {
        this.searchPageIndex += value
      }
      this.readInspectionsForHiveId()
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
      this.readInspectionsForHiveId()
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-bar-inspections {
  top: 52px;
  max-width: 100vw;
}

.pagination-text {
  font-size: 13px;
  margin-bottom: 2px;
  @include for-phone-only {
    font-size: 15px;
    margin-bottom: 0px;
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

.hive-inspections-view-box {
  width: 100%;
  height: auto;
  overflow: auto;
}

.table-responsive {
  overflow-x: auto;

  table {
    width: 100%;
    max-width: 100%;
    margin-top: -1px;
    font-size: 13px;
    thead {
      display: block;
      overflow: visible;
    }
    tbody {
      display: block;
      max-height: calc(100vh - 190px);
      overflow-x: visible;
      // overflow-y: auto;
      @include for-phone-only {
        max-height: calc(100vh - 160px);
      }
    }

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
      font-size: 11px;
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
      padding: 2px 4px 0 4px !important;
      font-size: 11px;
      font-weight: 600;
      line-height: 1rem;
      color: $color-red;
      text-align: center;
      white-space: nowrap;
      white-space: pre-wrap;
      border: 1px solid $color-red;
      border-radius: 5px;
      @include for-phone-only {
        max-width: 80px;
      }
      &.green--text {
        border-color: $color-green;
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

  .tdr {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    padding: 0 8px;
    text-align: right !important;
    white-space: inherit;
    @include for-phone-only {
      min-width: 150px;
      max-width: 150px;
      font-size: 12px;
    }
    &.header {
      padding: 8px 8px;
      &.expandable-header {
        cursor: pointer;
      }
    }
    .toggle-icon {
      float: left;
    }
  }

  tr {
    height: 42px;
    @include for-phone-only {
      height: 35px;
    }
  }

  .trh {
    height: 56px;
    background-color: $color-orange-medium !important;
    @include for-phone-only {
      height: 50px;
    }
    .tdr {
      font-size: 13px;
      @include for-phone-only {
        font-size: 12px;
      }
    }
  }

  .tdc {
    min-width: 200px;
    max-width: 200px;
    padding: 4px;
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
    &.expandable-header {
      cursor: pointer;
    }
  }

  tr:nth-child(even) {
    background-color: #f7f7f7;
  }
}
</style>
