<template>
  <Layout :title="$t('alertrules_default')">
    <v-toolbar class="save-bar" dense light>
      <v-spacer></v-spacer>
      <v-btn v-if="mobile" class="mr-n2" icon @click.prevent="copyAlertRules">
        <v-progress-circular
          v-if="showLoadingIcon"
          class="mr-2"
          size="18"
          width="2"
          color="primary"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" dark color="primary">mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-else
        tile
        outlined
        color="primary"
        class="mr-1"
        @click.prevent="copyAlertRules"
      >
        <v-progress-circular
          v-if="showLoadingIcon"
          class="ml-n1 mr-2"
          size="18"
          width="2"
          color="primary"
          indeterminate
        />
        <v-icon v-if="!showLoadingIcon" left>mdi-check</v-icon>
        {{ $t('copy') + ' ' + $tc('alertrule', 1) }}
      </v-btn>
    </v-toolbar>

    <v-container v-if="!ready">
      <div class="loading">
        <Transition appear>
          <v-progress-circular size="50" color="primary" indeterminate />
        </Transition>
      </div>
    </v-container>

    <v-container v-if="ready" class="alerts-content">
      <v-row v-if="alertRulesDefault.length > 0" dense>
        <ScaleTransition
          :duration="500"
          group
          class="alerts-item-transition-wrapper"
        >
          <v-col
            v-for="(alertRuleDefault, j) in alertRulesDefault"
            :key="j"
            sm="auto"
            class="alerts-item"
            dense
          >
            <v-card outlined>
              {{ alertRuleDefault.name }}
            </v-card>
          </v-col>
        </ScaleTransition>
      </v-row>
    </v-container>

    <Confirm ref="confirm"></Confirm>
  </Layout>
</template>

<script>
// import AlertCard from '@components/alert-card.vue'
import Api from '@api/Api'
import Confirm from '@components/confirm.vue'
import Layout from '@layouts/back.vue'
import { mapGetters } from 'vuex'
import { momentMixin } from '@mixins/momentMixin'
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    // AlertCard,
    Confirm,
    Layout,
    ScaleTransition,
  },
  mixins: [momentMixin],
  data: function() {
    return {
      ready: false,
      selectedAlertRules: [],
      showLoadingIcon: false,
    }
  },
  computed: {
    ...mapGetters('alerts', ['alertRulesDefault']),
    ...mapGetters('taxonomy', ['sensorMeasurementsList']),
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },
  created() {
    this.readDefaultAlertRules().then(() => {
      this.readTaxonomy().then(() => {
        this.ready = true
      })
    })
  },
  methods: {
    async copyAlertRules() {
      console.log('copying alertRules...')
      this.selectedAlertRules.map((selectedAlertRule) => {
        selectedAlertRule.default_rule = 0
        console.log(selectedAlertRule)
      })
      // try {
      //   const response = await Api.postRequest('/alert-rules')

      //   return true
      // } catch (error) {
      //   if (error.response) {
      //     console.log('Error: ', error.response)
      //   } else {
      //     console.log('Error: ', error)
      //   }
      // }
    },
    async readDefaultAlertRules() {
      try {
        const response = await Api.readRequest('/alert-rules-default')
        this.$store.commit('alerts/setData', {
          prop: 'alertRulesDefault',
          value: response.data['alert-rules'],
        })
        return true
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response)
        } else {
          console.log('Error: ', error)
        }
      }
    },
    async readTaxonomy() {
      if (this.sensorMeasurementsList.length === 0) {
        try {
          const response = await Api.readRequest('/taxonomy/lists')
          this.$store.commit('taxonomy/setData', {
            prop: 'taxonomyLists',
            value: response.data,
          })
          return true
        } catch (error) {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log('Error: ', error)
          }
        }
      }
    },
    getText(item) {
      return item.abbreviation + ' (' + item.pq_name_unit + ')'
    },
  },
}
</script>

<style lang="scss" scoped>
.alertrules-title-row {
  line-height: 1.2rem !important;
  @include for-phone-only {
    line-height: 1rem !important;
  }
  &--border-bottom {
    border-bottom: 1px solid $color-grey-light;
  }
}

.alertrule-table {
  input {
    font-size: 14px !important;
    @include for-phone-only {
      font-size: 12px !important;
    }
  }
}
</style>
