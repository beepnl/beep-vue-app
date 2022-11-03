<template>
  <LineChart
    ref="line"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :plugins="plugins"
    :class="'chartjs-wrapper' + (size === 'large' ? '--large' : '')"
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
    alertsForCharts: {
      type: Array,
      default: () => [],
      required: false,
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
      hoverInspection: 0,
      hoverAlert: false,
      hoverLine: false,
    }
  },
  computed: {
    alertsForLineCharts() {
      const self = this

      var alertsForLineCharts = {}

      this.alertsForCharts.map((alert, index) => {
        // when alert is triggered at a single moment instead of over a longer period
        // display it as a line instead of box such that the label can be shown as a tooltip on hover, similar to the inspection lines
        var isLine = alert.min === alert.max

        alertsForLineCharts['alert' + index] = {
          type: isLine ? 'line' : 'box',
          xMin: alert.min,
          xMax: alert.max,
          borderWidth: 2,
          backgroundColor: 'rgba(255, 0, 29, 0.05)',
          borderColor: 'rgba(255, 0, 29, 0.5)',
          borderDash: [3, 2],
          drawTime: 'afterDatasetsDraw',

          label: {
            content: alert.alert_rule_name,
            enabled: !isLine,
            drawTime: isLine ? 'afterDatasetsDraw' : 'beforeDatasetsDraw',
            color: isLine ? '#242424' : '#ff001d',
            borderRadius: 4,
            position: 'start',
            backgroundColor: !isLine ? 'transparent' : 'rgba(255, 0, 29, 0.8)',
            font: {
              size: this.mobile ? this.fontSizeMob : this.fontSize,
              weight: isLine ? 600 : 400,
            },
          },
          enter({ chart, element }, event) {
            if (isLine) {
              element.options.label.enabled = true
              chart.draw()
            }
            self.hoverAlert = true
          },
          leave({ chart, element }, event) {
            if (isLine) {
              element.options.label.enabled = false
              chart.draw()
            }
            self.hoverAlert = false
          },
          click({ chart, element }, event) {
            // only fire this if chart line is not hovered (because then zoom action takes prevalence)
            if (!self.hoverLine) {
              self.confirmViewAlert(alert)
            }
          },
        }
      })

      return alertsForLineCharts
    },
    chartOptions() {
      const self = this
      return {
        // responsive: true,
        // clip: 5, enable when using annotation boxes
        maintainAspectRatio: false,
        events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
        scales: {
          x: {
            type: 'time',
            display: true,
            min: this.startTime,
            max: this.endTime,
            ticks: {
              color: '#242424',
              source: 'auto',
              autoSkip: true,
              font: {
                size: this.mobile ? this.fontSizeMob : this.fontSize,
              },
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
              font: {
                size: this.mobile ? this.fontSizeMob : this.fontSize,
              },
            },
          },
          title: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: this.mobile ? 1 : 1.5,
            borderWidth: 2,
            hitRadius: this.touchDevice ? 20 : 3,
            hoverRadius: 5,
          },
          line: {
            borderWidth: this.mobile ? 2 : 2.5,
            borderJoinStyle: 'round',
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
        plugins:
          self.location === 'flashlog'
            ? self.pluginsFlashlog
            : self.pluginsDefault,
        onClick: function(event, chartElement) {
          if (chartElement.length > 0) {
            const item = chartElement[0]
            self.setPeriodToDate(item.element.$context.raw.x)
          }
        },
        onHover: (event, chartElement) => {
          if (
            self.location !== 'flashlog' &&
            event.native.target.style !== undefined
          ) {
            // keep track of whether chart line is hovered, because if that is the case (hoverLine === true) the other click events (confirmViewAlert, confirmViewInspection) should not be fired
            // if line is hovered, just zoom in or out, do not fire other events
            self.hoverLine = chartElement[0]

            event.native.target.style.cursor = chartElement[0]
              ? self.interval === 'hour'
                ? 'zoom-out'
                : 'zoom-in'
              : self.hoverInspection === 0 && !self.hoverAlert
              ? 'default'
              : 'pointer'
          }
        },
      }
    },
    displayFormats() {
      return {
        day: 'D MMM',
        hour: this.location !== 'flashlog' ? 'ddd H:mm' : 'llll',
        minute: 'LT',
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
            // only fire this if chart line is not hovered (because then zoom action takes prevalence)
            if (!self.hoverLine) {
              self.confirmViewInspection(inspection.id, inspection.date)
            }
          },
        }
      })

      return inspectionsForLineCharts
    },
    locale() {
      return this.$i18n.locale
    },
    mobile() {
      return this.$vuetify.breakpoint.mobile
    },
    pluginsDefault() {
      const self = this
      return {
        annotation: {
          drawTime: 'afterDatasetsDraw',
          annotations: Object.assign(
            self.inspectionsForLineCharts,
            self.alertsForLineCharts
          ),
        },
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
            return value.y.toFixed(1) + ' ' + context.dataset.unit
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
          onClick: self.legendClickHandler,
          onHover: function(e, legendItem, legend) {
            const multipleLines = legend.chart.data.datasets.length > 1
            if (multipleLines) {
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
                label = name + ': ' + self.roundDec(context.parsed.y, 1) + unit
              }
              return label
            },
          },
        },
      }
    },
    pluginsFlashlog() {
      // remove annotation plugin for flashlog page as it is not used and causes an issue where multiple charts on one page won't be reactive
      // see to paragraph https://vue-chartjs.org/guide/#chartjs-plugin-annotation (only for Vue 2)
      const plugins = { ...this.pluginsDefault }
      delete plugins.annotation
      return plugins
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
    confirmViewAlert(alert) {
      this.$emit('confirm-view-alert', alert)
    },
    confirmViewInspection(id, date) {
      this.$emit('confirm-view-inspection', { id, date })
    },
    legendClickHandler(e, legendItem, legend) {
      const defaultLegendClickHandler = ChartJS.defaults.plugins.legend.onClick
      const multipleLines = legend.chart.data.datasets.length > 1
      // legend only clickable if chart has multiple lines / datasets
      if (multipleLines) {
        // for regular data charts use default legend click handler
        if (this.location !== 'flashlog') {
          defaultLegendClickHandler(e, legendItem, legend)
          // for flashlog charts use additional custom handler that stores clicked legends across different pages
        } else {
          const hidden = legendItem.hidden
          const dataset = legend.chart.data.datasets[legendItem.datasetIndex]
          const abbr = dataset.abbr
          defaultLegendClickHandler(e, legendItem, legend)
          this.$emit('legend-clicked', { abbr, hidden })
        }
      }
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
