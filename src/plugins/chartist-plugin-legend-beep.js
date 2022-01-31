// Internet Systems Consortium license
// ===================================

// Copyright (c) 2016, Code Yellow B.V.
// modified by Beep.nl (2020)

;(function(root, factory) {
  if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('chartist'))
  } else {
    root['Chartist.plugins.legendBeep'] = factory(root.Chartist)
  }
})(this, function(Chartist) {
  /**
   * This Chartist plugin creates a legend to show next to the chart.
   *
   */
  'use strict'

  var defaultOptions = {
    className: '',
    classNames: false,
    removeAll: false,
    legendNames: false,
    clickable: true,
    onClick: null,
    position: 'top',
    simpleToggle: true,
    inactiveByDefault: true,
    dataSet: '',
    // take these as default and update as different measurements are selected (below)
    activeClasses: {
      flashlog: ['t_0', 't_i'],
      database: ['t_0', 't_i'],
    },
  }

  Chartist.plugins = Chartist.plugins || {}

  Chartist.plugins.legendBeep = function(options) {
    function compareNumbers(a, b) {
      return a - b
    }

    // Catch invalid options
    if (options && options.position) {
      if (
        !(
          options.position === 'top' ||
          options.position === 'bottom' ||
          options.position instanceof HTMLElement
        )
      ) {
        throw Error('The position you entered is not a valid position')
      }
      if (options.position instanceof HTMLElement) {
        // Detatch DOM element from options object, because Chartist.extend currently chokes on circular references present in HTMLElements
        var cachedDOMPosition = options.position
        delete options.position
      }
    }

    options = Chartist.extend({}, defaultOptions, options)

    if (cachedDOMPosition) {
      // Reattatch the DOM Element position if it was removed before
      options.position = cachedDOMPosition
    }

    return function legendBeep(chart) {
      var existingLegendElement = chart.container.querySelector('.ct-legend')
      if (existingLegendElement) {
        // Clear legend if already existing.
        existingLegendElement.parentNode.removeChild(existingLegendElement)
      }

      // Set a unique className for each series so that when a series is removed,
      // the other series still have the same color.
      if (options.clickable) {
        var newSeries = chart.data.series.map(function(series, seriesIndex) {
          if (typeof series !== 'object') {
            series = {
              value: series,
            }
          }

          series.className =
            series.className ||
            chart.options.classNames.series +
              '-' +
              Chartist.alphaNumerate(seriesIndex)
          return series
        })
        chart.data.series = newSeries
      }

      var legendElement = document.createElement('ul')
      var isPieChart = chart instanceof Chartist.Pie
      legendElement.className = 'ct-legend'
      if (chart instanceof Chartist.Pie) {
        legendElement.classList.add('ct-legend-inside')
      }
      if (
        typeof options.className === 'string' &&
        options.className.length > 0
      ) {
        legendElement.classList.add(options.className)
      }

      if (chart.options.width) {
        legendElement.style.cssText =
          'width: ' + chart.options.width + 'px;margin: 0 auto;'
      }

      var removedSeries = []
      var originalSeries = chart.data.series.slice(0)

      // Get the right array to use for generating the legend.
      var legendNames = chart.data.series
      var useLabels =
        isPieChart && chart.data.labels && chart.data.labels.length
      if (useLabels) {
        var originalLabels = chart.data.labels.slice(0)
        legendNames = chart.data.labels
      }
      legendNames = options.legendNames || legendNames

      // Check if given class names are viable to append to legends
      var classNamesViable =
        Array.isArray(options.classNames) &&
        options.classNames.length === legendNames.length

      // Loop through all legends to set each name in a list item.
      legendNames.forEach(function(legend, i) {
        var li = document.createElement('li')
        var div = document.createElement('div')
        var span = document.createElement('span')
        li.className = 'ct-series-' + i + ' ' + chart.data.series[i].className
        div.className = 'ct-legend-square'
        // Append specific class to a legend element, if viable classes are given
        if (classNamesViable) {
          li.className += ' ' + options.classNames[i]
        }
        if (chart.data.series.length === 1) {
          li.className += ' ct-legend--no-pointer'
        }

        li.setAttribute('data-legend', i)
        li.setAttribute('style', 'color: ' + legend.color + ';')
        div.setAttribute(
          'style',
          'background-color: ' +
            legend.color +
            '; border-color: ' +
            legend.color +
            ';'
        )

        span.textContent = legend.name || legend
        li.appendChild(div)
        li.appendChild(span)
        legendElement.appendChild(li)
      })

      if (options.inactiveByDefault) {
        var allSeries = Array.prototype.slice.call(legendElement.childNodes)
        allSeries.forEach(function(item) {
          // TODO: add abbr classname to ct-series-i
          var overlap =
            defaultOptions.activeClasses[options.dataSet].length > 0
              ? defaultOptions.activeClasses[options.dataSet].filter(function(
                  e
                ) {
                  return item.classList.value.indexOf(e) > -1
                })
              : []
          if (overlap.length === 0) {
            item.classList.add('inactive')
            removedSeries.push(parseInt(item.getAttribute('data-legend')))
          }
        })

        // Reset the series to original and remove each series that
        // is still removed again, to remain index order.
        var seriesCopy = originalSeries.slice(0)
        if (useLabels) {
          var labelsCopy = originalLabels.slice(0)
        }

        // Reverse sort the removedSeries to prevent removing the wrong index.
        removedSeries.sort(compareNumbers).reverse()

        removedSeries.forEach(function(series) {
          seriesCopy.splice(series, 1)
          if (useLabels) {
            labelsCopy.splice(series, 1)
          }
        })

        chart.data.series = seriesCopy
        if (useLabels) {
          chart.data.labels = labelsCopy
        }
      }

      chart.on('created', function(data) {
        // Append the legend element to the DOM
        if (!(options.position instanceof HTMLElement)) {
          switch (options.position) {
            case 'top':
              chart.container.insertBefore(
                legendElement,
                chart.container.childNodes[0]
              )
              break

            case 'bottom':
              chart.container.insertBefore(legendElement, null)
              break
          }
        } else {
          // Appends the legend element as the last child of a given HTMLElement
          options.position.insertBefore(legendElement, null)
        }
      })

      if (options.clickable) {
        legendElement.addEventListener('click', function(e) {
          var clickedSeries = e.target

          if (clickedSeries.parentNode.getAttribute('data-legend') !== null) {
            clickedSeries = clickedSeries.parentNode
          }

          if (
            clickedSeries.parentNode !== legendElement ||
            !clickedSeries.hasAttribute('data-legend')
          )
            return
          e.preventDefault()

          var clickedSeriesIndex = parseInt(
            clickedSeries.getAttribute('data-legend')
          )

          var removedSeriesIndex = removedSeries.indexOf(clickedSeriesIndex)

          if (!options.simpleToggle) {
            var otherSeries = Array.prototype.slice.call(
              legendElement.childNodes
            )
            otherSeries.splice(clickedSeriesIndex, 1)
            var otherSeriesIndexArray = []
            otherSeries.forEach(function(item) {
              otherSeriesIndexArray.push(
                parseInt(item.getAttribute('data-legend'))
              )
            })

            if (removedSeriesIndex > -1 && removedSeries.length === 1) {
              // if clicked series is the only inactive series, make all series active again
              removedSeries = []
              clickedSeries.classList.remove('inactive')
            } else if (removedSeriesIndex > -1 || removedSeries.length === 0) {
              // if clicked series is inactive, or all series are active
              // make clicked series active and all other series inactive
              removedSeries = otherSeriesIndexArray
              otherSeries.forEach(function(item) {
                item.classList.add('inactive')
              })
              clickedSeries.classList.remove('inactive')
            } else {
              // if clicked series is active, make it inactive and all other series active
              removedSeries = [clickedSeriesIndex]
              clickedSeries.classList.add('inactive')
              otherSeries.forEach(function(item) {
                item.classList.remove('inactive')
              })
            }
          } else if (options.simpleToggle) {
            // for updating activeClasses and keep the rest inactive
            var className = originalSeries[clickedSeriesIndex].className
            // Alternative simple toggle:
            if (removedSeriesIndex > -1) {
              // if clicked series is inactive, make it active
              removedSeries.splice(removedSeriesIndex, 1)
              clickedSeries.classList.remove('inactive')
              // add to activeClasses
              defaultOptions.activeClasses[options.dataSet].push(className)
            } else {
              // if clicked series is active, make it inactive
              removedSeries.push(clickedSeriesIndex)
              clickedSeries.classList.add('inactive')
              // remove from activeClasses
              defaultOptions.activeClasses[options.dataSet].splice(
                defaultOptions.activeClasses[options.dataSet].indexOf(
                  className
                ),
                1
              )
            }
          }

          // Reset the series to original and remove each series that
          // is still removed again, to remain index order.
          var seriesCopy = originalSeries.slice(0)
          if (useLabels) {
            var labelsCopy = originalLabels.slice(0)
          }

          // Reverse sort the removedSeries to prevent removing the wrong index.
          removedSeries.sort(compareNumbers).reverse()

          removedSeries.forEach(function(series) {
            seriesCopy.splice(series, 1)
            if (useLabels) {
              labelsCopy.splice(series, 1)
            }
          })

          if (options.onClick) {
            options.onClick(chart, e)
          }

          chart.data.series = seriesCopy
          if (useLabels) {
            chart.data.labels = labelsCopy
          }

          chart.update()
        })
      }
    }
  }

  return Chartist.plugins.legendBeep
})
