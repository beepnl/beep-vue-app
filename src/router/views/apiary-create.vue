<template>
  <Layout
    :title="`${$t('create_new')} ${$tc('location', 1)}`"
    :no-box-shadow="true"
  >
    <v-tabs
      v-model="activeTab"
      background-color="primary"
      class="elevation-2"
      dense
      dark
      grow
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
        <span v-if="tab.title"
          ><v-icon v-if="tab.icon">{{ tab.icon }}</v-icon
          ><span class="hide-on-mobile">{{ tab.title }}</span
          ><span class="show-on-mobile">{{ tab.title_mobile }}</span></span
        >
      </v-tab>

      <!-- <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="'tab-' + i">
        <v-card flat tile>
          <v-card-text>{{ i }}</v-card-text>
        </v-card>
      </v-tab-item> -->

      <v-tab-item value="tab-0">
        <v-card flat tile>
          <v-card-text>{{ $t('new_apiary_explanation') }}</v-card-text>
        </v-card>
        <a ng-click="setActiveTab(1)" class="btn btn-primary pull-right"
          ><i class="fa fa-2x fa-chevron-right"></i
        ></a>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer>
          <v-icon x-large dark color="primary" @click="setActiveTab(1)"
            >mdi-chevron-right-box</v-icon
          >
        </div>
      </v-tab-item>

      <v-tab-item value="tab-1">
        <v-card flat tile>
          <v-card-text>{{
            $tc('Location', 1) + ' ' + $t('settings')
          }}</v-card-text>
        </v-card>
        <div class="d-flex justify-space-between">
          <v-icon x-large dark color="primary" @click="setActiveTab(0)"
            >mdi-chevron-left-box</v-icon
          >
          <v-icon x-large dark color="primary" @click="setActiveTab(2)"
            >mdi-chevron-right-box</v-icon
          >
        </div>
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-card flat tile>
          <v-card-text>{{ $t('Place') + ' ' + $t('details') }}</v-card-text>
        </v-card>
        <div class="d-flex justify-space-between">
          <v-icon x-large dark color="primary" @click="setActiveTab(1)"
            >mdi-chevron-left-box</v-icon
          >
          <v-icon x-large dark color="primary" @click="setActiveTab(3)"
            >mdi-chevron-right-box</v-icon
          >
        </div>
      </v-tab-item>

      <v-tab-item value="tab-3">
        <v-card flat tile>
          <v-card-text>{{
            $tc('Hive', 1) + ' ' + $t('configuration')
          }}</v-card-text>
        </v-card>
        <div class="d-flex justify-space-between">
          <v-icon x-large dark color="primary" @click="setActiveTab(2)"
            >mdi-chevron-left-box</v-icon
          >
          <v-icon x-large dark color="primary" @click="setActiveTab(4)"
            >mdi-chevron-right-box</v-icon
          >
        </div>
      </v-tab-item>

      <v-tab-item value="tab-4">
        <v-card flat tile>
          <v-card-text>{{ $t('Hive_amount') }}</v-card-text>
        </v-card>
        <div class="d-flex justify-space-between">
          <v-icon x-large dark color="primary" @click="setActiveTab(3)"
            >mdi-chevron-left-box</v-icon
          >
          <v-btn
            tile
            outlined
            color="primary"
            class="mr-1"
            @click="createLocation"
          >
            <v-icon left>mdi-check</v-icon>
            {{ $t('save') }}
          </v-btn>
        </div>
      </v-tab-item>
    </v-tabs>

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
// import HiveFactory from '@components/hive-factory.vue'
import Layout from '@layouts/back.vue'
// import VueNumberInput from '@chenfengyuan/vue-number-input'
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Confirm,
    // HiveFactory,
    Layout,
    // VueNumberInput,
    // Treeselect,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      activeTab: 'tab-0',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  computed: {
    tabs: function() {
      return [
        {
          title: ' ' + this.$i18n.t('New') + ' ' + this.$i18n.tc('location', 1),
          title_mobile: '',
          icon: 'mdi-star',
        },
        {
          title: ' 1. ' + this.$i18n.tc('Location', 1),
          title_mobile: ' 1',
          icon: 'mdi-home-analytics',
        },
        {
          title: ' 2. ' + this.$i18n.t('Place'),
          title_mobile: ' 2',
          icon: 'mdi-map-marker',
        },
        {
          title:
            ' 3. ' +
            this.$i18n.tc('Hive', 1) +
            ' ' +
            this.$i18n.t('configuration'),
          title_mobile: ' 3',
          icon: 'mdi-archive',
        },
        {
          title: ' 4. ' + this.$i18n.t('Hive_amount'),
          title_mobile: ' 4',
          icon: 'mdi-file-chart',
        },
      ]
    },
  },
  methods: {
    createLocation() {
      // console.log(this.hiveLocation.id)
      // console.log(this.hiveLocation)
      console.log('creating new apiary')
    },
    setActiveTab(int) {
      this.activeTab = 'tab-' + int
    },
  },
}
</script>

<style lang="scss" scoped>
.v-tabs--icons-and-text > .v-tabs-bar {
  height: 48px;
}

.v-tabs--icons-and-text > .v-tabs-bar .v-tab {
  font-size: 12px !important;
  text-transform: none !important;
  letter-spacing: 0.075;

  .v-icon {
    font-size: 20px;
    color: $color-white;
    &::before {
      margin-top: -2px;
    }
  }

  .show-on-mobile {
    display: none;
  }

  @media (max-width: 800px) {
    padding: 0 4px;
    .v-icon {
      display: block;
      &::before {
        margin-top: 2px;
      }
    }
  }

  @include for-phone-only {
    min-width: 70px !important;
    font-size: 14px !important;
    .hide-on-mobile {
      display: none;
    }
    .show-on-mobile {
      display: inline;
    }
    .v-icon {
      display: inline;
    }
  }
}
</style>
