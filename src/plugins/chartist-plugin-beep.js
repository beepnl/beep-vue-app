/**
 * Chartist.js plugin to color lines made by Healthy Climate Solutions (2021)
 */
;(function(root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('chartist'))
  } else {
    root['Chartist.plugins.beep'] = factory(root.Chartist)
  }
})(this, function(Chartist) {
  'use strict'

  var defaultOptions = {
    onClick: null,
  }

  Chartist.plugins = Chartist.plugins || {}
  Chartist.plugins.beep = function(options) {
    options = Chartist.extend({}, defaultOptions, options)

    return function beep(chart) {
      chart.on('draw', function(data) {
        if (data.type === 'point') {
          data.element._node.onclick = function() {
            var date = data.axisX.options.ticks[data.index]
            options.onClick(date)
          }
          data.element.attr({
            style: 'stroke: ' + data.series.color + ';',
          })
        } else if (data.type === 'line') {
          data.element.attr({
            style: 'stroke: ' + data.series.color + ';',
          })
        }
      })
    }
  }
  return Chartist.plugins.beep
})
