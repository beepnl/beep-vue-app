<template>
  <Layout
    v-if="activeHive"
    :title="`${$tc('Inspection', 2)} ${activeHive.name}`"
    :no-box-shadow="true"
  >
    <table class="inspection-list">
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
              class="inspection-actions"
            >
              <a
                :href="`'/hives/'${id}'/inspections/'${inspection.id}`"
                class="icon-button"
                ><i class="fa fa-pencil"></i
              ></a>
              <a
                class="icon-button delete"
                @click="deleteInspection(inspection.id)"
                ><i class="fa fa-trash"></i
              ></a>
            </div>
            <strong class="hide-on-mobile">{{
              momentify(inspection.created_at)
            }}</strong>
            <strong class="show-on-mobile">{{
              momentifyDayMonth(inspection.created_at)
            }}</strong>
          </th>
          <th class="filler"></th>
        </tr>
      </thead>

      <!--	<tbody>
						<tr>
							<td class="tdr">{{lang.positive_impression}}</td>
							<td ng-repeat="ins in inspections track by $index" class="tdc">
								<div ng-if="ins.impression != null && ins.impression > -1" class="fa-stack smile filled">
									<i class="fa fa-circle fa-stack-2x" ng-class="{'frown':ins.impression==1, 'meh':ins.impression==2, 'smile':ins.impression==3}"></i>
									<i class="fa fa-stack-2x face" ng-class="{'fa-frown-o':ins.impression==1, 'fa-meh-o':ins.impression==2, 'fa-smile-o':ins.impression==3}"></i>
								</div>
							</td>
							<td class="filler"></td>
						</tr>
						<tr>
							<td class="tdr">{{lang.needs_attention}}</td>
							<td ng-repeat="ins in inspections track by $index" class="tdc">
								<div ng-if="ins.attention != null && ins.attention > -1" ng-class="{'yes':!parseBool(ins.attention), 'no':parseBool(ins.attention)}" class="inspection-icon">{{ parseBool(ins.attention) ? lang.yes : lang.no}}</div>
							</td>
							<td class="filler"></td>
						</tr>
						<tr>
							<td class="tdr">{{lang.notes}}</td>
							<td ng-repeat="ins in inspections track by $index" class="tdc">
								<span class="notes" ng-class="{'mobile':mobile}" title="{{ ins.notes }}">{{ ins.notes }}</span>
							</td>
							<td class="filler"></td>
						</tr>

						<tr>
							<td class="tdr">{{lang.reminder}}</td>
							<td ng-repeat="ins in inspections track by $index" class="tdc">
								<span class="notes reminder" ng-class="{'mobile':mobile}" title="{{ ins.reminder }}">{{ ins.reminder }}</span>
								<span ng-if="ins.reminder_date">
									<addtocalendar
									    start-date="{{ ins.reminder_date | amDateFormat:'YYYYMMDDTHHmmss' }}"
									    end-date="{{ ins.reminder_date | amAdd : '1' : 'hours' | amDateFormat:'YYYYMMDDTHHmmss' }}"
									    title="Beep {{ lang.reminder }}: {{ ins.reminder }}"
									    location="{{ hive.location }} - {{ hive.name }}"
									    class-name="btn btn-xs btn-default {{ mobile ? 'mobile' : ''}}"
									    use-bootstrap="true"
									    btn-text="{{lang.add_to_calendar}}"
									    description="Beep app {{lang.Inspection}} @ {{ inspection.created_at | amDateFormat:'ddd D MMMM YYYY HH:mm' }}">
									</addtocalendar>
								</span>
							</td>
							<td class="filler"></td>
						</tr>

						<tr>
							<td class="tdr">{{lang.remind_date}}</td>
							<td ng-repeat="ins in inspections track by $index" class="tdc">
								<span class="notes reminder-date" ng-class="{'mobile':mobile}" title="{{ ins.reminder_date }}">{{ ins.reminder_date | amDateFormat:'dd D MMMM YYYY HH:mm' }}</span>
							</td>
							<td class="filler"></td>
						</tr> -->

      <tbody>
        <tr v-for="(items, i) in inspections.items_by_date" :key="i">
          <td v-for="(item, j) in items.items" :key="j">
            <span v-if="item.type === 'slider'">{{ item.val }}</span>

            <span v-if="item.type === 'list'">
              <div
                v-for="(opt, o) in item.val.split(',')"
                :key="o"
                style="margin-bottom: 3px;"
                class="label label-default label-block"
                >{{ opt }}</div
              >
            </span>

            <span v-if="item.type === 'options'">{{ item.val }}</span>
            <span v-if="item.type === 'select'">{{ item.val }}</span>
            <span v-if="item.type === 'text'">{{ item.val }}</span>
            <!-- <span ng-if="item.type == 'sample_code'" style="letter-spacing: 2px; font-weight: bold;">{{ item.val }}</span>
								<span ng-if="item.type == 'date'">{{ item.val | amDateFormat:'dd D MMM YYYY HH:mm' }}</span>
								<span ng-if="item.type.indexOf('number') > -1">{{ item.val }}</span>

								<span ng-if="item.type == 'boolean' || item.type == 'list_item'">
									<div ng-class="{'yes':parseBool(item.value), 'no':!parseBool(item.value)}" class="inspection-icon {{item.name}}">{{ parseBool(item.value) ? lang.yes : lang.no}}</div>
								</span>
								<span ng-if="item.type == 'boolean_yes_red'">
									<div ng-class="{'yes':!parseBool(item.value), 'no':parseBool(item.value)}" class="inspection-icon {{item.name}}">{{ parseBool(item.value) ? lang.yes : lang.no}}</div>
								</span>

								<span ng-if="item.type == 'smileys_3' && item.value != null">
									<div class="fa-stack smile filled">
										<i class="fa fa-circle fa-stack-2x" ng-class="{'frown':item.value==1, 'meh':item.value==2, 'smile':item.value==3}"></i>
										<i class="fa fa-stack-2x face" ng-class="{'fa-frown-o':item.value==1, 'fa-meh-o':item.value==2, 'fa-smile-o':item.value==3}"></i>

									</div>
								</span>
								<span ng-if="item.type == 'score'">
									<ul class="star-rating">
										<li ng-repeat="i in [0,1,2,3,4] track by $index" ng-class="{'filled':i < item.val}" class="star display"><i class="fa fa-star"></i></li>
									</ul>
								</span>

								<span ng-if="item.type == 'grade'" style="color: {{ gradeColor(item.value) }}; font-weight: bold;">{{ item.val }}</span>
						        <span ng-if="item.type == 'score_quality'" style="color: {{ qualityColor(item.value) }};">{{ scoreQualityOptions[item.value] }}</span>
								<span ng-if="item.type == 'score_amount'" style="color: {{ amountColor(item.value) }}; font-weight: bold;">{{ scoreAmountOptions[item.value] }}</span>

								<span ng-if="item.type == 'square_25cm2'">{{ item.val*25 | number : 1 }} cm2 ({{item.val}} sq)</span>
								<span ng-if="item.type == 'select_apiary'">{{item.val}}</span>
								<span ng-if="item.type == 'select_hive'">{{item.val}}</span>
								<span ng-if="item.type == 'select_country'">{{item.val.toUpperCase()}}</span>
								<span ng-if="item.type == 'bee_subspecies'">{{item.val}}</span>
								<span ng-if="item.type == 'select_hive_type'">{{item.val}}</span>
								<span ng-if="item.type == 'image'">
									<img ng-src="{{item.val}}" class="image-thumb" style="max-height: 60px; max-width: 80px" ng-click="setActiveImage(item.val)" data-toggle="modal" data-target="#photo-modal">
								</span>

								<span ng-if="item.unit != null && item.type != 'square_25cm2'">{{item.unit}}</span> -->
          </td>
          <td v-if="items.items !== null" class="filler"></td>
          <!-- <v-list-item :key="`i-${item.id}`" two-line class="inspection-entry">
            <v-row ma-0>
              <v-col>
                <v-list-item-title v-text="momentify(item.created_at)" />
                <v-list-item-subtitle
                  v-if="item.hive"
                  v-text="`hive ${item.hive}`"
                />
              </v-col>
              <v-col>
                {{ item.notes }}
              </v-col>
              <v-col cols="1">
                <v-icon v-if="item.impression === 1" class="red--text">
                  mdi-emoticon-sad-outline
                </v-icon>
                <v-icon v-if="item.impression === 3" class="green--text">
                  mdi-emoticon-happy-outline
                </v-icon>
                <v-icon v-if="item.impression === 2" class="orange--text">
                  mdi-emoticon-neutral-outline
                </v-icon>
              </v-col>
              <v-col cols="1" class="mr-2">
                <v-icon v-if="item.attention" class="red--text">
                  mdi-alert
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider :key="`div-${item.id}`"></v-divider> -->
        </tr>
      </tbody>
    </table>
  </Layout>
</template>

<script>
// import { mapGetters } from 'vuex'
// import HiveIcons from '@components/hive-icons.vue'
// import { ScaleTransition } from 'vue2-transitions'
import Layout from '@layouts/back.vue'
import { momentMixin } from '@mixins/momentMixin'

export default {
  components: {
    // HiveIcons,
    // ScaleTransition,
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
  },
}
</script>

<style lang="scss" scoped>
.inspection-list {
  .hide-on-mobile {
    @include for-phone-only {
      display: none;
    }
  }
  .show-on-mobile {
    display: none;
    @include for-phone-only {
      display: inline;
    }
  }
  .filler {
    width: 100%;
  }
}
</style>
