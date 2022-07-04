<template>
  <LineChart
    ref="line"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :plugins="plugins"
    :class="'chartjs-wrapper'"
  />
</template>

<script>
import { Line as LineChart } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeSeriesScale,
  Legend,
  Tooltip,
  ChartDataLabels,
  annotationPlugin
)

export default {
  components: { LineChart },
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    chartId: {
      type: String,
      default: '',
    },
    inspectionsForCharts: {
      type: Array,
      default: () => [],
      required: false,
    },
    interval: {
      default: 'day',
      type: String,
    },
    startTime: {
      type: Object,
      default: () => {},
    },
    endTime: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fontSizeMob: 10,
      fontSize: 12,
      chartParseFmt: 'YYYY-MM-DD[T]HH:mm:ssZ',
      tooltipFormat: 'llll',
      displayFormats: {
        day: 'D MMM',
        hour: 'ddd H[u]',
        minute: 'LT',
      },
      intervalToUnit: {
        year: null,
        selection: null,
        research: null,
        month: 'day',
        week: 'hour',
        day: 'hour',
        hour: 'minute',
      },
      hoverInspection: 0,
    }
  },
  computed: {
    chartOptions() {
      const self = this
      return {
        // responsive: true,
        maintainAspectRatio: false,
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        scales: {
          x: {
            type: 'time',
            display: true,
            suggestedMin: this.startTime,
            suggestedMax: this.endTime,
            ticks: {
              color: '#242424',
              source: 'auto',
              autoSkip: true,
              fontSize: this.mobile ? this.fontSizeMob : this.fontSize,
            },
            time: {
              unit: this.intervalToUnit[this.interval],
              round: false,
              parser: this.chartParseFmt,
              tooltipFormat: this.tooltipFormat,
              displayFormats: this.displayFormats,
            },
          },
          y: {
            ticks: {
              color: '#242424',
              fontSize: this.mobile ? this.fontSizeMob : this.fontSize,
            },
          },
          title: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: this.mobile ? 0.5 : 1,
            borderWidth: this.mobile ? 0 : 2,
            pointHoverBorderWidth: 2,
          },
          line: { borderWidth: this.mobile ? 2 : 3 },
        },
        animation: {
          colors: {
            type: 'color',
            duration: 200,
            from: 'transparent',
          },
        },
        plugins: {
          annotation: {
            drawTime: 'beforeDatasetsDraw',
            annotations: this.inspectionsForLineCharts,
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: function(value, context) {
              return value.y.toFixed(1) + ' ' + context.dataset.unit
            },
            display: function(context) {
              return context.dataIndex === context.dataset.data.length - 1
            },
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 11,
              boxHeight: 11,
              fillStyle: '#242424',
              fullWidth: !this.mobile,
              color: '#242424',
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            padding: 8,
            displayColors: false,
            backgroundColor: 'rgba(242, 145, 0, 0.87)',
            titleColor: '#242424',
            bodyColor: '#242424',
            bodyFont: {
              weight: 'bold',
            },
            callbacks: {
              label: function(context) {
                const name = context.dataset.name || ''
                const unit = context.dataset.unit || ''
                var label = ''

                if (context.parsed.y !== null) {
                  label =
                    name + ': ' + self.roundDec(context.parsed.y, 1) + unit
                }
                return label
              },
            },
          },
        },
        onClick: function(event, chartElement) {
          if (chartElement.length > 0) {
            const item = chartElement[0]
            self.setPeriodToDate(item.element.$context.raw.x)
          }
        },
        onHover: (event, chartElement) => {
          if (event.native.target.style !== undefined) {
            event.native.target.style.cursor = chartElement[0]
              ? self.interval === 'hour'
                ? 'zoom-out'
                : 'zoom-in'
              : self.hoverInspection === 0
              ? 'default'
              : 'pointer'
          }
        },
      }
    },
    inspectionsForLineCharts() {
      const self = this

      var inspectionsForLineCharts = {}

      this.inspectionsForCharts.map((inspection, index) => {
        var chartjsDate = this.$moment(inspection.xValue).format(
          this.chartParseFmt
        )

        inspectionsForLineCharts['inspection' + index] = {
          type: 'line',
          mode: 'vertical',
          xMin: chartjsDate,
          xMax: chartjsDate,
          borderColor: '#f29100',
          borderWidth: 2,
          borderDash: [6, 4],
          label: {
            content:
              inspection.text !== null && inspection.text.length > 25
                ? inspection.text.substring(0, 25) + '...'
                : inspection.text,
            enabled: false,
            backgroundColor: 'rgba(242, 145, 0, 0.87)',
            drawTime: 'afterDatasetsDraw',
            borderRadius: 4,
            color: '#242424',
            position: 'start',
          },
          enter({ chart, element }, event) {
            element.options.label.enabled = true
            chart.draw()
            self.hoverInspection++
          },
          leave({ chart, element }, event) {
            element.options.label.enabled = false
            chart.draw()
            self.hoverInspection--
          },
          click({ chart, element }, event) {
            self.confirmViewInspection(inspection.id, inspection.date)
          },
        }
      })

      return inspectionsForLineCharts
    },
    locale() {
      return this.$i18n.locale
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
    confirmViewInspection(id, date) {
      this.$emit('confirm-view-inspection', { id, date })
    },
    roundDec(num, dec) {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
    },
    setPeriodToDate(date) {
      this.$emit('set-period-to-date', date)
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
</style>
