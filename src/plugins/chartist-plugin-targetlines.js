/**
 * Chartist.js plugin to display a target line on a chart.
 * With code from @gionkunz in https://github.com/gionkunz/chartist-js/issues/235
 * and @OscarGodson in https://github.com/gionkunz/chartist-js/issues/491.
 * Based on https://github.com/gionkunz/chartist-plugin-pointlabels
 * modified by Beep.nl (2021)
 */
;(function(root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('chartist'))
  } else {
    root['Chartist.plugins.ctTargetLines'] = factory(root.Chartist)
  }
})(this, function(Chartist) {
  'use strict'

  var defaultOptions = {
    // targetClass: 'ct-target-line ',
    // maxColor: 'red',
    // minColor: 'green',
    // maxValue: null,
    // minValue: null,
    inspectionClass: 'ct-target-line-inspection',
    inspections: [],
    // boundaryUnit: '',
    // boundaryQuantity: '',
    // boundaryType: '',
    onClick: null,
  }

  Chartist.plugins = Chartist.plugins || {}
  Chartist.plugins.ctTargetLines = function(options) {
    options = Chartist.extend({}, defaultOptions, options)

    return function ctTargetLines(chart) {
      // function projectY(chartRect, bounds, value) {
      //   return (
      //     chartRect.padding.top +
      //     (chartRect.height() * Math.abs(bounds.max - value)) / bounds.range
      //   )
      // }

      function projectX(chartRect, maxValue, value) {
        // var position =
        //   (xValue - axisXRange.min) / (axisXRange.max - axisXRange.min)
        // return chartRect.x1 + chartRect.width() * position
        return chartRect.x1 + (chartRect.width() / maxValue) * value
      }

      chart.on('created', function(context) {
        // if (
        //   options.maxValue !== null &&
        //   options.maxValue < context.bounds.max
        // ) {
        //   var targetLineYMax = projectY(
        //     context.chartRect,
        //     context.bounds,
        //     options.maxValue
        //   )

        //   context.svg.elem(
        //     'line',
        //     {
        //       x1: context.chartRect.x1,
        //       x2: context.chartRect.x2,
        //       y1: targetLineYMax,
        //       y2: targetLineYMax,
        //       'ct:meta':
        //         options.boundaryQuantity +
        //         ' max ' +
        //         options.boundaryType +
        //         ':<br>' +
        //         options.maxValue +
        //         options.boundaryUnit,
        //     },
        //     'ct-point ' + options.targetClass + options.maxColor
        //   )
        // }

        if (options.inspections.length > 0) {
          options.inspections.map((inspection) => {
            var targetLineInspection = projectX(
              context.chartRect,
              context.axisX.ticks.length - 1,
              inspection.closestIndex
            )

            var inspectionLine = context.svg.elem(
              'line',
              {
                x1: targetLineInspection,
                x2: targetLineInspection,
                y1: context.chartRect.y1,
                y2: context.chartRect.y2,
                'ct:meta':
                  inspection.date +
                  (inspection.text !== null ? '<br>' + inspection.text : ''),
              },
              'ct-point ' + defaultOptions.inspectionClass
            )

            inspectionLine._node.onclick = function() {
              options.onClick(inspection.id, inspection.date)
            }
          })
        }

        // if (
        //   options.minValue !== null &&
        //   options.minValue > context.bounds.min
        // ) {
        //   var targetLineYMin = projectY(
        //     context.chartRect,
        //     context.bounds,
        //     options.minValue
        //   )

        //   context.svg.elem(
        //     'line',
        //     {
        //       x1: context.chartRect.x1,
        //       x2: context.chartRect.x2,
        //       y1: targetLineYMin,
        //       y2: targetLineYMin,
        //       'ct:meta':
        //         options.boundaryQuantity +
        //         ' min ' +
        //         options.boundaryType +
        //         ':<br>' +
        //         options.minValue +
        //         options.boundaryUnit,
        //     },
        //     'ct-point ' + options.targetClass + options.minColor
        //   )
        // }
      })
    }
  }
  return Chartist.plugins.ctTargetLines
})
