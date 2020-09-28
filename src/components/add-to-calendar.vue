<template>
  <a :href="calendarUrl(calendar)" target="_blank">
    {{ calendar }}
  </a>
</template>

<script>
/**
 * Based on https://github.com/nicolasbeauvais/vue-add-to-calendar
 * integrated as a custom component instead because original plugin is renderless component which cannot be compiled using runtimeCompiler
 */
export default {
  props: {
    /**
     * Event title.
     * @var string
     */
    calendar: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },

    /**
     * Event location.
     * @var string
     */
    location: {
      type: String,
      default: '',
    },

    /**
     * Event details.
     * @var string
     */
    details: {
      type: String,
      default: '',
    },

    /**
     * Event start.
     * @var date
     */
    start: {
      type: Date,
      default: null,
    },

    /**
     * Event end.
     * @var date
     */
    end: {
      type: Date,
      default: null,
    },
  },

  data() {
    return {
      /**
       * Available calendars.
       * @param object
       */
      calendars: {
        Google: {
          url: 'http://www.google.com/calendar/event?action=TEMPLATE&trp=false',
          parameters(title, location, details, start, end) {
            const parameters = {
              text: title,
              location: location,
              details: details,
            }

            if (start && end) {
              parameters.dates = `${start}/${end}`
            }

            return parameters
          },
        },

        Microsoft: {
          url: 'https://outlook.live.com/owa/?rru=addevent',
          parameters(title, location, details, start, end) {
            return {
              subject: title,
              location: location,
              body: details,
              startdt: start,
              enddt: end,
            }
          },
        },

        Office365: {
          url:
            'https://outlook.office.com/owa/?path=/calendar/action/compose&rru=addevent',
          parameters(title, location, details, start, end) {
            return {
              subject: title,
              location: location,
              body: details,
              startdt: start,
              enddt: end,
            }
          },
        },
      },
    }
  },

  methods: {
    /**
     * Returns generated calendar url.
     *
     * @param calendar.
     */
    calendarUrl(calendar) {
      let url = this.calendars[calendar].url
      const parameters = this.calendars[calendar].parameters(
        this.formatString(this.title),
        this.formatString(this.location),
        this.formatString(this.details),
        this.formatDate(this.start),
        this.formatDate(this.end)
      )

      for (const key in parameters) {
        if (parameters[key] && typeof parameters[key] !== 'undefined') {
          url += `&${key}=${parameters[key]}`
        }
      }

      return url
    },

    formatString(string) {
      return encodeURIComponent(string).replace(/%20/g, '+')
    },

    formatDate(date) {
      return date ? date.toISOString().replace(/-|:|\.\d+/g, '') : null
    },
  },
}
</script>
