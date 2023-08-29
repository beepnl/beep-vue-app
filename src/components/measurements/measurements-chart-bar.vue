<template>
  <BarChart
    ref="Bar"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :plugins="plugins"
    :class="'chartjs-wrapper' + (size === 'large' ? '--large' : '')"
  />
</template>

<script>
import { Bar as BarChart } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { lightenColor } from '@mixins/methodsMixin'

ChartJS.register(
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
  ChartDataLabels
)

export default {
  components: { BarChart },
  mixins: [lightenColor],
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    chartId: {
      type: String,
      default: '',
    },
    interval: {
      default: 'day',
      type: String,
    },
    location: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fontSizeMob: 11,
      fontSize: 12,
      boxSizeMob: 10,
      boxSize: 11,
      chartParseFmt: 'YYYY-MM-DD[T]HH:mm:ssZ',
      tooltipFormat: 'llll',
      intervalToUnit: {
        year: null,
        selection: null,
        research: null,
        month: 'day',
        week: 'hour',
        day: 'hour',
        hour: 'minute',
      },
    }
  },
  computed: {
    chartOptions() {
      const self = this
      return {
        maintainAspectRatio: false,
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        scales: {
          x: {
            title: {
              display: true,
              // text:
              //   self.$i18n.t('Time_lag') +
              //   ' (' +
              //   self.$i18n.t('minutes_short') +
              //   ')',
            },
            // grid: {
            //   lineWidth: (ctx) => (ctx.tick.label === 0 ? 3 : 1),
            // },
          },
          y: {
            ticks: {
              color: '#242424',
              font: {
                size: this.mobile ? this.fontSizeMob : this.fontSize,
              },
            },
          },
          title: {
            display: false,
          },
        },
        animation: {
          duration: 200,
        },
        animations: {
          colors: {
            type: 'color',
            duration: 200,
            from: 'transparent',
          },
        },
        layout: {
          padding: {
            right: 24,
          },
        },
        plugins: self.pluginsDefault,
      }
    },
    displayFormats() {
      return {
        day: 'D MMM',
        hour: this.location !== 'flashlog' ? 'ddd H:mm' : 'llll',
        minute: 'LT',
      }
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    multipleBars() {
      return this.chartData.datasets.length > 1
    },
    pluginsDefault() {
      const self = this
      return {
        datalabels: {
          align: 'end',
          padding: {
            bottom: 1,
          },
          color: '#242424',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: 4,
          font: {
            size: this.mobile ? this.fontSizeMob : this.fontSize,
          },
          formatter: function(value, context) {
            return value.y !== null && value.y !== undefined
              ? value.y.toFixed(1) + ' ' + context.dataset.unit
              : '-'
          },
          display: function(context) {
            var isFinalValue = false
            // check if datapoint has value, whether all datapoints after that are null
            // in that case current datapoint is the final value and should be displayed as a datalabel
            // (only pushing non-null datapoints to dataset is not an option because spanGaps won't work then)
            if (context.dataset.data[context.dataIndex] !== null) {
              isFinalValue =
                context.dataset.data.filter(
                  (item, index) => index > context.dataIndex && item.y !== null
                ).length === 0
            }

            return self.location !== 'flashlog' && isFinalValue
          },
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: this.mobile ? this.boxSizeMob : this.boxSize,
            boxHeight: this.mobile ? this.boxSizeMob : this.boxSize,
            fillStyle: '#242424',
            fullWidth: !this.mobile,
            color: '#242424',
            font: {
              size: this.mobile ? this.fontSizeMob : this.fontSize,
            },
          },
          onHover: function(e, legendItem, legend) {
            if (this.multipleBars) {
              if (e.native.target.style !== undefined) {
                e.native.target.style.cursor = 'pointer'
              }
            }
          },
          onLeave: function(e, legendItem, legend) {
            if (e.native.target.style !== undefined) {
              e.native.target.style.cursor = 'default'
            }
          },
        },
        tooltip: {
          mode: 'index',
          position: 'nearest',
          padding: 8,
          displayColors: false,
          backgroundColor: 'rgba(255, 231, 191, 0.90)',
          titleColor: '#242424',
          bodyColor: '#242424',
          bodyFont: {
            weight: 'bold',
          },
          callbacks: {
            labelTextColor: function(context) {
              return self.multipleBars
                ? self.lightenColor(context.dataset.backgroundColor, -12, 1)
                : '#242424'
            },
            label: function(context) {
              const name = context.dataset.name || ''
              const unit = context.dataset.unit || ''
              var label = ''

              if (context.parsed.y !== null) {
                label = name + ': ' + self.roundDec(context.parsed.y, 1) + unit
              }
              return label
            },
          },
        },
      }
    },
    touchDevice() {
      return window.matchMedia('(hover: none)').matches
    },
  },
  watch: {
    locale() {
      this.$moment.locale(this.locale)
    },
  },
  created() {
    this.$moment.locale(this.locale)
  },
  methods: {
    roundDec(num, dec) {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
    },
  },
}
</script>

<style lang="scss">
.chartjs-wrapper {
  // max-height: 246px;
  height: 246px;
  width: 100%;
  &.print {
    // max-height: 64mm;
    height: 64mm;
    width: 190mm;
    margin-top: 3mm;
  }
}

.chartjs-wrapper--large {
  // max-height: 246px;
  height: 300px;
  width: 100%;
  &.print {
    // max-height: 64mm;
    height: 84mm;
    width: 190mm;
    margin-top: 3mm;
  }
  @include for-big-desktop-up {
    height: 400px;
  }
  @include for-phone-only {
    height: 500px;
  }
}
</style>
