<template>
  <Layout :title="$t('Whats_new')">
    <v-container>
      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.98 (12-05-2022) - Current
        version</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.97 (10-05-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Greek (Ελληνικά) language has been added</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.96 (10-05-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.95 (09-05-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Data:
            <router-link :to="{ name: 'measurements' }">
              several improvements</router-link
            >, such as:
            <ul>
              <li
                >Show inspections on charts as vertical lines & view inspection
                when line is clicked</li
              >
              <li>Enable simple on/off toggle when chart has multiple lines</li>
              <li
                >Enable url queries for interval, timeIndex, date, start, end,
                relativeInterval & chartCols</li
              >
              <li
                >Show sticky date selection header when scrolling down to view
                charts</li
              >
              <li
                >Intuitive period browsing: jump to/from the middle of the
                previous interval when selecting a new interval</li
              >
            </ul>
          </li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.94 (02-05-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Norsk bockmål language has been added</li>
          <li
            >Inspect:
            <router-link :to="{ name: 'inspect' }"
              >remember new inspection data while editing checklist</router-link
            ></li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.92 (28-04-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Minor improvements</li>
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.90 (24-03-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>
            Import:
            <router-link :to="{ name: 'import' }">
              several improvements (only for users with a BEEP
              base)</router-link
            >, such as:
            <ul>
              <li
                >Option to export block data as a .csv file or in JSON
                format</li
              >
              <li>Bugfixes: small fixes for issues received as feedback</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.88 (07-03-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>
            Swedish language has been added
          </li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.87 (22-02-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>
            Import:
            <router-link :to="{ name: 'import' }">
              several improvements (only for users with a BEEP
              base)</router-link
            >, such as:
            <ul>
              <li
                >Option to undo imported block data ('undo import' button is
                shown in table (result of 'check log data'), for each block that
                has been imported). This removes imported data from the
                database, for that particular block.</li
              >
              <li
                >Option to 'view data' for each block, even if no matches are
                present</li
              >
              <li>Show all blocks at once instead of paginated per 5</li>
              <li
                >Table tweaks: show 'BEEP base memory emptied' instead of 'Time
                logged' and add 'Data imported' to block data table</li
              >
              <li>In flashlog vs. database comparison view: add pagination</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.86 (22-02-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>Minor improvements</li>
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.82 (08-02-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Hives:
            <router-link :to="{ name: 'home' }">
              show when your BEEP base / device sent its last data</router-link
            >
            in<v-icon class="inline-icon">mdi-size-xl</v-icon>view. Only for
            users with a BEEP base or other device.</li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.80 (27-01-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Import:
            <router-link :to="{ name: 'import' }">
              supplement measurement data with log data downloaded from the
              internal BEEP base memory.</router-link
            >
            Only for users with a BEEP base.</li
          >
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>3.0.79 (27-01-2022)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Data:
            <router-link :to="{ name: 'measurements' }">
              option to select a custom period when viewing your
              data.</router-link
            >
            You can select your own start and end date via the 'selection'
            button in the light yellow top bar.</li
          >
          <li
            >Data:
            <router-link :to="{ name: 'measurements' }">
              option to enable relative data period.</router-link
            >
            By switching on 'Relative' in the light yellow top bar, all periods
            (except custom selection) are shown as relative durations, until
            now/today. F.e. if today is a Tuesday and 'Relative' is enabled
            together with the 'week' interval, this results in viewing data from
            the last 7 days (Tuesday (last week) to Tuesday (today)), whereas
            'Relative' disabled would show data from a default week, Monday to
            Sunday.</li
          >
          <li
            >Data:
            <router-link :to="{ name: 'measurements' }">
              ability to zoom in via data charts.</router-link
            >
            When clicking a data point on a chart, a pop up screen appears
            asking whether you would like to zoom in on the data of that
            particular day or hour (depending on which level you are). When
            clicking 'OK', the data is then reloaded for that day or hour.</li
          >
          <li
            >Alerts:
            <router-link :to="{ name: 'alertrule-create' }">
              option to create alert rules for non-default
              measurements.</router-link
            >
            At the 'Measurement' input field you can now switch on 'Show all' to
            view and select all (non-weather) measurements.</li
          >
          <li
            >Collaborate: option to decline a collaboration group invitation
            when viewing the invite in the BEEP app. Group admins will be able
            to see this in the collaboration group overview.</li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1 primary--text"
        ><span class="lowercase">v</span>
        <span v-if="dutch">3.0.73 (13-12-2021) - Release v3</span>
        <span v-if="!dutch">3.0.73 (13-12-2021) - Release v3</span>
      </div>
      <div v-if="!dutch" class="rounded-border primary-border mb-4">
        <p class="mb-3">
          <a
            href="https://beepsupport.freshdesk.com/en/support/solutions/articles/60000696834-beep-app-v3/"
            target="_blank"
            ><v-icon class="support-icon" small color="accent"
              >mdi-arrow-right</v-icon
            >
            To view the BEEP support article on app v3 (including screenshots)
            click here</a
          >
        </p>
        <ul>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'home' }">Hives</router-link> -
              Overview of all hives per apiary and collaboration group</strong
            >
            <ul>
              <li
                >Searchable: by hive / apiary / collaboration group / queen
                name, location (address, country code), latest inspection
                (notes, reminder text, reminder date, time ago), hive type, hive
                id (adding 'id=', f.e.: 'id=99') and (queen) bee race.</li
              >
              <li
                >Filterable: by
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                collaboration group (if any, toggle between collaboration groups
                <v-icon class="icon-apiary-shared color-primary inline-icon"
                  >mdi-account-multiple</v-icon
                >
                , owned apiaries
                <v-icon class="icon-apiary-owned color-primary inline-icon"
                  >mdi-home-analytics</v-icon
                >
                and all hives
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >),
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                attention needed,
                <v-icon class="color-grey inline-icon"
                  >mdi-calendar-clock</v-icon
                >
                reminder present, impression (<v-icon
                  class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                good,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutral,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                bad),
                <v-sheet class="beep-icon beep-icon-sensors color-grey">
                </v-sheet>
                device (BEEP base or other) present,
                <v-icon class="color-grey inline-icon">mdi-bell</v-icon>
                alerts present.<br />
                Please note: depending on screen size some filters may not be
                visible in order to save space. Filters will be remembered
                throughout a browsing session. Clicking the BEEP logo at the top
                left of the screen will clear all filters.</li
              >
              <li
                >Different views:
                <v-icon class="inline-icon">mdi-size-xs</v-icon> (hive +
                <v-icon small class="red--text inline-icon"
                  >mdi-clipboard-alert-outline</v-icon
                >
                attention and
                <v-icon small class="red--text inline-icon">mdi-bell</v-icon>
                alert icon),
                <v-icon class="inline-icon">mdi-size-m</v-icon> (hive + all
                icons, not possible on mobile),
                <v-icon class="inline-icon">mdi-size-xl</v-icon> (hive + all
                icons + text).
              </li>
              <li
                >Hive menu: click on a hive to edit it, edit the queen, create
                an inspection or view inspections. This menu can also be opened
                via the
                <v-icon small class="inline-icon">mdi-dots-vertical</v-icon>
                icon on each hive card in the
                <v-icon class="inline-icon">mdi-size-m</v-icon> and
                <v-icon class="inline-icon">mdi-size-xl</v-icon> view.</li
              >
              <li
                >Collaboration groups: are shown in the
                <router-link :to="{ name: 'home' }">Hives</router-link>
                overview. By clicking the
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                collaboration group filter at the top bar once
                <em>only</em> collaboration groups will be shown (filter button
                only visible if you are a member of any collaboration group). Or
                start a new collaboration group via the 'Quick action menu' (see
                below).</li
              >
              <li
                >Apiary / collaboration group menu: click on the
                <v-icon small class="color-grey-light inline-icon"
                  >mdi-cog</v-icon
                >
                icon next to the apiary / collaboration group name to edit
                apiary or collaboration group properties (f.e. sharing hives),
                create a bulk inspection or view inspections. And for apiary
                menu only: to add a new hive or move hives (see below).</li
              >
              <li
                >Move hives: move multiple hives to another apiary at once by
                selecting 'Move hives' from the apiary menu (see above).</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'hive-create' }">Hive</router-link> -
              Create / edit hive</strong
            >
            <ul>
              <li
                >New layer types: feeding box (will automatically be placed on
                top) and queen excluder.</li
              >
              <li
                >Add new hive layers: by dragging them from the left stack to
                the desired location in the hive.</li
              >
              <li
                >Change layer order: by drag- and dropping within the hive.</li
              >
              <li>Change individual layer color: by clicking the layer.</li>
              <li
                >Delete layer: by clicking the layer and then clicking the
                <v-icon small class="red--text inline-icon">mdi-delete</v-icon>
                icon.</li
              >
              <li
                >Edit hive: hives can be edited by clicking the hive in the
                <router-link :to="{ name: 'home' }">Hives</router-link> overview
                which opens the hive menu → 'Edit hive'. Please note: only owned
                hives and shared hives that are provided editing rights are
                editable.</li
              >
              <li
                >Edit queen: queens can be edited separately by clicking the
                <v-sheet
                  class="beep-icon beep-icon-queen"
                  color="#4A90E2"
                ></v-sheet>
                icon (for <v-icon class="inline-icon">mdi-size-m</v-icon> and
                <v-icon class="inline-icon">mdi-size-xl</v-icon> views) or by
                selecting 'Edit queen' from the hive menu (see above).</li
              >
              <li
                >Share hive:
                <ul>
                  <li
                    >Either start a new collaboration group via the 'Quick
                    action menu' (see below) -> 'New collaboration group'.</li
                  >
                  <li>
                    Or share a hive with an existing collaboration group (if you
                    have any) via the menu of that particular group.
                    Collaboration groups can be found in the
                    <router-link :to="{ name: 'home' }">Hives</router-link>
                    overview, or shown exclusively by clicking the collaboration
                    group filter (<v-icon class="icon-apiary-shared color-grey"
                      >mdi-account-multiple</v-icon
                    >
                    icon) once. Then click on the
                    <v-icon small class="color-grey-light inline-icon"
                      >mdi-cog</v-icon
                    >
                    icon next to the collaboration group name -> 'Edit
                    collaboration group' to share your hive.</li
                  >
                </ul>
              </li>
              <li
                >Move hive:
                <ul>
                  <li
                    >Move multiple hives to another apiary at once by selecting
                    'Move hives' from the apiary menu (see 'Apiary /
                    collaboration group menu' above).</li
                  >
                  <li
                    >For a single hive: change the apiary and/or order within an
                    apiary by editing your hive (see 'Edit hive' above). Please
                    note that hives without a specified order number will always
                    be shown last.</li
                  >
                </ul>
              </li>
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'diary' }">Inspections</router-link> -
              Overview of all inspections (short version containing only overall
              impression, attention needed, notes and reminder)</strong
            >
            <ul>
              <li
                >Searchable: by date, time ago, hive / apiary / collaboration
                group name, notes, reminder text, reminder date and inspection
                id (adding 'id=', f.e.: 'id=99').</li
              >
              <li
                >Filterable: by
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                collaboration group (if any, toggle between collaboration groups
                <v-icon class="icon-apiary-shared color-primary inline-icon"
                  >mdi-account-multiple</v-icon
                >
                , owned hives
                <v-icon class="icon-apiary-owned color-primary inline-icon"
                  >mdi-home-analytics</v-icon
                >
                and all hives
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >),
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                attention needed,
                <v-icon class="inline-icon">mdi-calendar-clock</v-icon> reminder
                present, impression (<v-icon class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                good,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutral,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                bad).<br />
                Please note: filters will be remembered throughout a browsing
                session.
              </li>
              <li
                >Inspection menu: click on an inspection to view it (in detail),
                to edit or delete it.</li
              >
              <li
                >Hive actions (changes in hive configuration) are saved as
                inspections and shown here as well.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              >Inspections overview per hive - Table containing all inspection
              data per hive</strong
            ><br />
            Accessible via hive menu: click on a hive in the
            <router-link :to="{ name: 'home' }">Hives</router-link> overview →
            'View inspections'. Or via inspection menu: click on an inspection
            in the
            <router-link :to="{ name: 'diary' }">Inspections</router-link>
            overview → 'View inspection'.
            <ul>
              <li
                >Searchable: by date, notes, reminder text, reminder date and
                inspection id (adding 'id=', f.e.: 'id=99').</li
              >
              <li
                >Filterable: by
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                attention needed,
                <v-icon class="inline-icon">mdi-calendar-clock</v-icon> reminder
                present, impression (<v-icon class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                good,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutral,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                bad).
              </li>
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'inspect' }">Inspect</router-link> -
              New inspection</strong
            >
            <ul>
              <li
                >Bulk inspection: inspect multiple hives per apiary /
                collaboration group at once by selecting the hives you want to
                include. The inspection will be saved for each hive
                individually, such that it can later be retrieved (and edited /
                deleted) per hive.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'measurements' }">Data</router-link> -
              Overview of measurement data (if BEEP base or other device is
              present)</strong
            >
            <ul>
              <li
                >Heat map: if sound data is present this will be displayed in a
                heat map. The more often sound in a certain frequency bandwidth
                has been recorded, the warmer the color of the corresponding
                data point.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'alerts' }">Alerts</router-link> -
              Overview of alerts (if BEEP base or other device is
              present)</strong
            ><br />
            If you own a BEEP base or another device you can set alerts, such
            that you will receive an alert when the measurement data meets
            certain requirements. For example, a sudden drop in weight because
            of swarming. Alerts will be shown here and in the
            <router-link :to="{ name: 'home' }">Hives</router-link>
            overview, you can choose to receive them via email as well.
            <ul>
              <li
                >Searchable: by date, time ago, hive / apiary / collaboration
                group name, alert rule name, function and value.</li
              >
              <li
                ><router-link :to="{ name: 'alertrules' }"
                  >Alert settings</router-link
                >
                - To get you started there are a few
                <router-link :to="{ name: 'alertrules-default' }"
                  >default alert rules</router-link
                >
                you can use (and adapt to your own needs). In addition, you can
                <router-link :to="{ name: 'alertrule-create' }"
                  >create and edit your own alert rules</router-link
                >. Both can be added via the 'Add alert rule' button. They can
                be (de)activated via the alert rule overview table or the
                'Alerts enabled' / 'Alerts disabled' switch at the top
                right.</li
              >
              <li
                >Alert menu: click on an alert item to edit alert rule, view the
                associated data, deactivate the alert for the concerned hive, or
                delete the alert.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'alertrule-create' }"
                >Alert rule</router-link
              >
              - Create / edit alert rule</strong
            ><br />
            Set a rule which triggers an alert whenever certain requirements in
            the measurement data are met. For example, a sudden drop in weight
            because of swarming.
            <ul>
              <li
                >Summary at the top 'translates' the rule into plain
                language.</li
              >
              <li
                >By default, an alert rule will apply to all months, hours of
                day and hives (that are connected to a device). The alert rule
                can be deactivated for specified months, hours and hives (see
                bottom section).</li
              >
              <li
                ><router-link :to="{ name: 'alertrules-default' }"
                  >Default alert rules</router-link
                >
                - To get you started there are a few default alert rules you can
                be selected and copied to your own set of rules here. After
                copying, they can be edited to adapt them to your own needs, if
                desired.</li
              >
            </ul>
            <a :href="$t('alerts_support_url')" target="_blank"
              ><v-icon class="support-icon" small color="accent"
                >mdi-arrow-right</v-icon
              >
              BEEP support article on setting alerts</a
            >
          </li>
          <li class="new-block">
            <strong>Where to find? - Menu changes</strong>
            <ul>
              <li
                ><strong>Quick action menu</strong> - Create a new inspection,
                new hive, new apiary, new collaboration group or new alert rule
                by clicking the
                <v-icon class="color-black inline-icon"
                  >mdi-plus-circle-outline</v-icon
                >
                button centered at the top of the
                <router-link :to="{ name: 'home' }">home</router-link>
                navigation bar.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link>,
                <router-link :to="{ name: 'diary' }">Inspections</router-link>,
                <router-link :to="{ name: 'measurements' }">Data</router-link>
                and
                <router-link :to="{ name: 'alerts' }">Alerts</router-link> tabs
                are always visible in the top bar of the
                <router-link :to="{ name: 'home' }">home</router-link> page.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link> tab
                combines former Apiaries page and former Hives page in a single
                overview.</li
              >
              <li
                ><strong>Collaboration groups</strong> are now directly visible
                in the
                <router-link :to="{ name: 'home' }">Hives</router-link>
                overview. Via the collaboration group filter (<v-icon
                  class="icon-apiary-shared color-grey"
                  >mdi-account-multiple</v-icon
                >
                icon) collaboration groups will be shown exclusively (first in
                row after search field, only visible if you are a member of any
                collaboration group).</li
              >
              <li
                ><router-link :to="{ name: 'devices' }">Devices</router-link>,
                <router-link :to="{ name: 'export' }">Data export</router-link>,
                <router-link :to="{ name: 'research' }">Research</router-link>,
                <a
                  href="https://beepsupport.freshdesk.com/en/support/solutions"
                  target="_blank"
                  >Support</a
                >, <router-link :to="{ name: 'new' }">New!</router-link> and
                <a href="https://beep.nl/home-english" target="_blank"
                  >BEEP website</a
                >
                have been moved to the
                <v-icon class="color-black inline-icon">mdi-menu</v-icon> menu
                at the top right of the screen.</li
              >
              <li
                >New in the
                <v-icon class="color-black inline-icon">mdi-menu</v-icon> menu
                (top right):
                <router-link :to="{ name: 'alertrules' }"
                  >Alert settings</router-link
                >
                and
                <router-link :to="{ name: 'checklists' }"
                  >Checklist templates</router-link
                >.</li
              >
            </ul>
          </li>
        </ul>
      </div>

      <div v-if="dutch" class="rounded-border primary-border mb-4">
        <p class="mb-3">
          <a
            href="https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000696834-beep-app-v3/"
            target="_blank"
            ><v-icon class="support-icon" small color="accent"
              >mdi-arrow-right</v-icon
            >
            Bekijk het BEEP support artikel over app v3 (inclusief screenshots)
            hier</a
          >
        </p>
        <ul>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'home' }">Kasten</router-link> -
              Overzicht van alle kasten per bijenstand en
              samenwerkingsgroep</strong
            >
            <ul>
              <li>
                Zoekbaar: op bijenkast / bijenstand / samenwerkingsgroep / moer
                naam, locatie (adres, landcode), laatste inspectie (notitie,
                herinnering, herinneringsdatum, tijd geleden), kasttype, kast id
                (door 'id=' toe te voegen, bijv: 'id=99') en bijenras (als
                gespecificeerd bij de moer, in het Engels).</li
              >
              <li>
                Filterbaar: op
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                samenwerkingsgroep (als aanwezig, switch tussen
                samenwerkingsgroepen
                <v-icon class="icon-apiary-shared color-primary inline-icon"
                  >mdi-account-multiple</v-icon
                >
                , eigen bijenstanden
                <v-icon class="icon-apiary-owned color-primary inline-icon"
                  >mdi-home-analytics</v-icon
                >
                en alle bijenkasten
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >),
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                aandacht nodig,
                <v-icon class="inline-icon">mdi-calendar-clock</v-icon>
                herinnering aanwezig, totaalindruk (<v-icon
                  class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                goed,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutraal,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                slecht),
                <v-sheet class="beep-icon beep-icon-sensors color-grey">
                </v-sheet>
                meetsysteem (BEEP base of anders) aanwezig,
                <v-icon class="color-grey inline-icon">mdi-bell</v-icon>
                notificaties aanwezig.<br />
                N.B. afhankelijk van schermgrootte zullen sommige filters niet
                zichtbaar zijn om ruimte te besparen. Filters worden onthouden
                gedurende de browsersessie. Door te klikken op het BEEP logo in
                de linkerbovenhoek van het scherm worden alle filters
                gewist.</li
              >
              <li
                >Verschillende layouts:
                <v-icon class="inline-icon">mdi-size-xs</v-icon> (kast +
                <v-icon small class="red--text inline-icon"
                  >mdi-clipboard-alert-outline</v-icon
                >
                aandacht en
                <v-icon small class="red--text inline-icon">mdi-bell</v-icon>
                notificatie icoon),
                <v-icon class="inline-icon">mdi-size-m</v-icon> (kast + alle
                iconen, niet mogelijk op mobiel),
                <v-icon class="inline-icon">mdi-size-xl</v-icon> (kast + alle
                iconen + tekst).
              </li>
              <li
                >Kast menu: klik op een kast om deze aan te passen, de moer een
                te passen een inspectie te maken of inspecties te bekijken. Dit
                menu kan ook geopend worden d.m.v. het
                <v-icon small class="inline-icon">mdi-dots-vertical</v-icon>
                icoon in de <v-icon class="inline-icon">mdi-size-m</v-icon> en
                <v-icon class="inline-icon">mdi-size-xl</v-icon> layout.</li
              >
              <li
                >Samenwerkingsgroepen: worden getoond in het
                <router-link :to="{ name: 'home' }">Kasten</router-link>
                overzicht. Klik eenmaal op de
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                samenwerkingsgroepsfilter in de filterbalk bovenaan om
                <em>alleen</em> jouw samenwerkingsgroepen te tonen (de
                samenwerkingsgroepsfilter is alleen zichtbaar als je lid bent
                van tenminste één samenwerkingsgroep). Of start een nieuwe
                samenwerkingsgroep via het 'Snelle actie menu' (zie onder).</li
              >
              <li
                >Bijenstand / samenwerkingsgroep menu: klik op het
                <v-icon small class="color-grey-light inline-icon"
                  >mdi-cog</v-icon
                >
                icoon naast de bijenstand / samenwerkingsgroep naam om deze aan
                te passen, een bulk inspectie te maken of inspecties te
                bekijken. En alleen voor het bijenstand menu: voeg een nieuwe
                kast toe of verplaats kasten (zie onder).</li
              >
              <li
                >Verplaats bijenkasten: verplaats meerdere kasten in één keer
                naar een andere bijenstand door 'Verplaats bijenkasten' te
                selecteren in het bijenstand menu (zie boven).</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'hive-create' }">Kast</router-link> -
              Maak een nieuwe kast / pas een kast aan</strong
            >
            <ul>
              <li
                >Nieuwe kamertypes: voederbak (wordt automatisch bovenop de kast
                geplaatst) en koninginnerooster.</li
              >
              <li
                >Voeg nieuwe kamers toe: door een kamer van de linkerkant naar
                de gewenste locatie in de kast te slepen.</li
              >
              <li
                >Verander kamervolgorde: door kamers binnen de kast te
                verslepen.</li
              >
              <li
                >Pas individuele kamerkleur aan: door op een kamer te
                klikken.</li
              >
              <li>
                Verwijder kamer: door te klikken op de kamer en vervolgens op
                het
                <v-icon small class="red--text inline-icon">mdi-delete</v-icon>
                icoon te klikken.</li
              >
              <li>
                Pas kast aan: bijenkasten kunnen aangepast worden door op de
                kast te klikken in het
                <router-link :to="{ name: 'home' }">Kasten</router-link>
                overzicht wat het kast menu opent → 'Aanpassen kast'. N.B.
                alleen eigen kasten en gedeelde kasten met aanpasrechten zijn
                aanpasbaar.</li
              >
              <li
                >Pas moer aan: moeren kunnen afzonderlijk aangepast worden door
                op het
                <v-sheet
                  class="beep-icon beep-icon-queen"
                  color="#4A90E2"
                ></v-sheet>
                icoon te klikken (in de
                <v-icon class="inline-icon">mdi-size-m</v-icon> en
                <v-icon class="inline-icon">mdi-size-xl</v-icon> layout) of door
                'Aanpassen moer' te selecteren in het kast menu (zie boven).</li
              >
              <li
                >Deel kast:
                <ul>
                  <li
                    >Start een nieuwe samenwerkingsgroep via het 'Snelle actie
                    menu' (zie onder).</li
                  >
                  <li
                    >Of deel een kast met een bestaande samenwerkingsgroep via
                    het menu van de betreffende groep. Samenwerkingsgroepen
                    worden getoond in het
                    <router-link :to="{ name: 'home' }">Kasten</router-link>
                    overzicht, of kunnen <em>exclusief</em> getoond worden door
                    eenmaal de samenwerkingsgroepsfilter aan te klikken (<v-icon
                      class="icon-apiary-shared color-grey"
                      >mdi-account-multiple</v-icon
                    >
                    icoon). Klik dan op het
                    <v-icon small class="color-grey-light inline-icon"
                      >mdi-cog</v-icon
                    >
                    icoon naast de samenwerkingsgroepsnaam -> 'Aanpassen
                    samenwerkingsgroep' om je kast te delen.</li
                  >
                </ul>
              </li>
              <li
                >Verplaats kast:
                <ul>
                  <li
                    >Verplaats meerdere kasten in één keer naar een andere
                    bijenstand door 'Verplaats bijenkasten' te selecteren in het
                    bijenstand menu (zie 'Bijenstand / samenwerkingsgroep menu'
                    boven).</li
                  >
                  <li
                    >Voor een enkele kast: verander de bijenstand en/of volgorde
                    binnen de bijenstand door de kast aan te passen (zie 'Pas
                    kast aan' boven). N.B. kasten zonder een gespecificeerde
                    volgorde zullen als laatste getoond worden.</li
                  >
                </ul>
              </li>
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'diary' }">Inspecties</router-link> -
              Overzicht van alle inspecties (korte versie met totaalindruk,
              aandacht nodig, notitie en herinnering)</strong
            >
            <ul>
              <li
                >Zoekbaar: op datum, tijd geleden, bijenkast / bijenstand /
                samenwerkingsgroep naam, notitie, herinnering, herinneringsdatum
                en inspectie id (door 'id=' toe te voegen, bijv: 'id=99').</li
              >
              <li>
                Filterbaar: op
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >
                samenwerkingsgroep (als aanwezig, switch tussen
                samenwerkingsgroepen
                <v-icon class="icon-apiary-shared color-primary inline-icon"
                  >mdi-account-multiple</v-icon
                >
                , eigen bijenkasten
                <v-icon class="icon-apiary-owned color-primary inline-icon"
                  >mdi-home-analytics</v-icon
                >
                en alle bijenkasten
                <v-icon class="icon-apiary-shared color-grey inline-icon"
                  >mdi-account-multiple</v-icon
                >),
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                aandacht nodig,
                <v-icon class="inline-icon">mdi-calendar-clock</v-icon>
                herinnering aanwezig, totaalindruk (<v-icon
                  class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                goed,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutraal,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                slecht).<br />
                N.B. Filters worden onthouden gedurende de browsersessie.
              </li>
              <li
                >Inspectie menu: klik op een inspectie om deze te bekijken (in
                detail), aan te passen of te verwijderen.</li
              >
              <li
                >Kast handelingen (aanpassingen van de kastconfiguratie) worden
                opgeslagen als een inspectie en ook getoond in dit
                overzicht.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              >Inspecties per kast - Tabel met alle inspectiedata per
              kast</strong
            ><br />
            Toegankelijk via het kast menu: klik op de kast in het
            <router-link :to="{ name: 'home' }">Kasten</router-link> overzicht →
            'Bekijk inspecties'. Of via het inspectie menu: klik op een
            inspectie in het
            <router-link :to="{ name: 'diary' }">Inspecties</router-link>
            overzicht → 'Bekijk inspectie'.
            <ul>
              <li>
                Zoekbaar: op datum, notitie, herinnering, herinneringsdatum en
                inspectie id (door 'id=' toe te voegen, bijv: 'id=99').</li
              >
              <li
                >Filterbaar: op
                <v-icon class="inline-icon">mdi-clipboard-alert-outline</v-icon>
                aandacht nodig,
                <v-icon class="inline-icon">mdi-calendar-clock</v-icon>
                herinnering aanwezig, totaalindruk (<v-icon
                  class="color-grey inline-icon"
                  >mdi-emoticon-happy</v-icon
                >
                goed,
                <v-icon class="color-grey inline-icon"
                  >mdi-emoticon-neutral</v-icon
                >
                neutraal,
                <v-icon class="color-grey inline-icon">mdi-emoticon-sad</v-icon>
                slecht).
              </li>
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'inspect' }">Inspectie</router-link> -
              Nieuwe inspectie</strong
            >
            <ul>
              <li
                >Bulk inspectie: inspecteer meerdere kasten per bijenstand /
                samenwerkingsgroep in één keer door de kasten te selecteren die
                je mee wilt nemen in je inspectie. Per kast wordt de inspectie
                apart opgeslagen, zodat deze later per kast terug te vinden (en
                aanpasbaar / verwijderbaar) is.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'measurements' }">Data</router-link> -
              Overzicht van de metingen (als er een BEEP base of ander
              meetsysteem aanwezig is)</strong
            >
            <ul>
              <li
                >Heat map: als er geluidsdata aanwezig is zal dit getoond worden
                in een z.g.n. <i>heat map</i>. Hoe vaker geluid in een bepaalde
                frequentie bandbreedte gemeten is, hoe warmer de kleur van het
                corresponderende datapunt.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'alerts' }">Notificaties</router-link>
              - Overzicht van notificaties (als er een BEEP base of ander
              meetsysteem aanwezig is)</strong
            ><br />
            Wanneer je een BEEP base of een ander meetsysteem gebruikt kan je
            hiervoor notificaties instellen, zodat je een notificatie ontvangt
            wanneer de meetgegevens aan bepaalde voorwaarden voldoen. Denk
            hierbij bijvoorbeeld aan een plotselinge gewichtsafname vanwege een
            zwerm. Deze notificaties worden hier getoond en in het
            <router-link :to="{ name: 'home' }">Kasten</router-link> overzicht,
            daarnaast kan je ervoor kiezen om ze per e-mail te ontvangen.
            <ul>
              <li>
                Zoekbaar: op datum, tijd geleden, bijenkast / bijenstand /
                samenwerkingsgroep naam, notificatie naam, functie en
                waarde.</li
              >
              <li
                ><router-link :to="{ name: 'alertrules' }"
                  >Notificaties beheren</router-link
                >
                - Om je op weg te helpen zijn er een aantal
                <router-link :to="{ name: 'alertrules-default' }"
                  >standaardinstellingen</router-link
                >
                die je kan gebruiken (en aanpassen naar eigen behoefte). Je kan
                ook zelf een
                <router-link :to="{ name: 'alertrule-create' }"
                  >nieuwe notificatie-instelling maken of aanpassen</router-link
                >. Beiden kunnen toegevoegd worden via de 'Toevoegen
                notificatie-instelling' knop. Ze kunnen ge(de)activeerd worden
                via de tabel met notificatie-instellingen of de 'Notificaties
                ingeschakeld' / 'Notificaties uitgeschakeld' schuifknop
                rechtsboven.</li
              >
              <li
                >Notificatie menu: klik op een notificatie om de
                notificatie-instelling aan te passen, de bijbehorende metingen
                te bekijken, de notificatie te deactiveren voor de betreffende
                kast, of de notificatie te verwijderen.</li
              >
            </ul>
          </li>
          <li class="new-block">
            <strong
              ><router-link :to="{ name: 'alertrule-create' }"
                >Notificatie-instelling</router-link
              >
              - Maak een nieuwe notificatie-instelling of pas deze aan</strong
            ><br />
            Stel een notificatie in, zodat je een melding krijgt wanneer de
            meetgegevens aan bepaalde voorwaarden voldoen. Bijvoorbeeld een
            plotselinge gewichtsafname vanwege een zwerm.
            <ul>
              <li
                >De samenvatting bovenaan 'vertaalt' de instelling naar gewone
                taal.</li
              >
              <li
                >De instelling is standaard van toepassing op alle maanden, uren
                van de dag en kasten (die verbonden zijn met een meetsysteem).
                Je kan deze deactiveren voor bepaalde maanden, uren en kasten
                (zie de laatste sectie van het formulier).</li
              >
              <li
                ><router-link :to="{ name: 'alertrules-default' }"
                  >Standaard notificatie-instellingen</router-link
                >
                - Om je op weg te helpen zijn er een aantal
                standaardinstellingen die je hier kan selecteren en kopiëren
                naar je eigen notificatie-instellingen. Nadat ze gekopieerd
                zijn, kunnen ze naar eigen behoefte aangepast worden.</li
              >
            </ul>
            <a :href="$t('alerts_support_url')" target="_blank"
              ><v-icon class="support-icon" small color="accent"
                >mdi-arrow-right</v-icon
              >
              BEEP support artikel over het instellen van alerts</a
            >
          </li>
          <li class="new-block">
            <strong>Waar is alles te vinden? - Menu aanpassingen</strong>
            <ul>
              <li
                ><strong>Snelle actie menu</strong> - Maak direct een nieuwe
                inspectie, nieuwe kast, nieuwe bijenstand, nieuwe
                samenwerkingsgroep of nieuwe notificatie-instelling door op de
                <v-icon class="color-black inline-icon"
                  >mdi-plus-circle-outline</v-icon
                >
                knop te klikken midden bovenaan de
                <router-link :to="{ name: 'home' }">home</router-link>
                navigatiebalk.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Kasten</router-link>,
                <router-link :to="{ name: 'diary' }">Inspecties</router-link>,
                <router-link :to="{ name: 'measurements' }">Data</router-link>
                en
                <router-link :to="{ name: 'alerts' }">Notificaties</router-link>
                tabs zijn altijd zichtbaar in de bovenste balk van de
                <router-link :to="{ name: 'home' }">home</router-link>
                pagina.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Kasten</router-link> tab
                combineert de voormalige 'Bijenstanden' en 'Bijenkasten'
                pagina's in één overzicht.</li
              >
              <li
                ><strong>Samenwerkingsgroepen</strong> zijn nu direct zichtbaar
                in het
                <router-link :to="{ name: 'home' }">Kasten</router-link>
                overzicht. Via de samenwerkingsgroepsfilter (<v-icon
                  class="icon-apiary-shared color-grey"
                  >mdi-account-multiple</v-icon
                >
                icoon) kunnen samenwerkingsgroepen exclusief getoond worden
                (eerste in de rij na het zoekveld, alleen zichtbaar als je lid
                bent van tenminste één samenwerkingsgroep).</li
              >
              <li
                ><router-link :to="{ name: 'devices' }"
                  >Meetsystemen</router-link
                >,
                <router-link :to="{ name: 'export' }"
                  >Data exporteren</router-link
                >,
                <router-link :to="{ name: 'research' }">Onderzoek</router-link>,
                <a
                  href="https://beepsupport.freshdesk.com/nl/support/solutions"
                  target="_blank"
                  >Support</a
                >, <router-link :to="{ name: 'new' }">Nieuw!</router-link> en
                <a href="https://beep.nl/" target="_blank">BEEP website</a>
                zijn verhuisd naar het
                <v-icon class="color-black inline-icon">mdi-menu</v-icon> menu
                rechtsboven.</li
              >
              <li
                >Nieuw in het
                <v-icon class="color-black inline-icon">mdi-menu</v-icon> menu
                (rechtsboven):
                <router-link :to="{ name: 'alertrules' }"
                  >Notificaties beheren</router-link
                >
                en
                <router-link :to="{ name: 'checklists' }"
                  >Kastkaart templates</router-link
                >.</li
              >
            </ul>
          </li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.2.1 (15-07-2020)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Hive change log: every hive configuration change, or relocation is
            filed as a new inspection, so you can keep track of your historic
            changes</li
          >
          <li
            >Inspection sample code: added (lab) sample code generator as an
            inspection item. It generates a unique sample code that can be put
            on a sample for the lab to register research results</li
          >
          <li
            >Inspection Liebefeld: Added honey super input fields to Liebefeld
            colony size calculation</li
          >
          <li
            >Data export:
            <router-link :to="{ name: 'export' }">
              ability to also export data of collaboration group hives with
              measurement systems</router-link
            ></li
          >
          <li
            >Data export:
            <router-link :to="{ name: 'export' }">
              bugfix that prevented from exporting CSV data files from selected
              dates and measurement systems</router-link
            ></li
          >
          <li
            >BEEP base: support for new iOS and Android app output to configure
            your BEEP base with the native apps</li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.2.0 (25-02-2020)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Create new Apiary wizard, leading you through all the steps in
            ordered sequence</li
          >
          <li
            >New fields in Apiaries and Hives e.g. roofed, hive layer/frame
            dimensions, queen notes, etc.</li
          >
          <li
            >Research:
            <router-link :to="{ name: 'research' }">
              ability to consent to sharing your data with research</router-link
            ></li
          >
          <!-- <li>Photos: ability to add images to inspections<a ng-click="switchMenu($event, true, '/images')">and view all images</a></li> -->
          <li
            >Helpdesk: search the knowledge base for help, or file a support
            ticket directly from the app</li
          >
          <li
            >Weather:
            <router-link :to="{ name: 'measurements' }">
              See apiary weather info (if lat/lon coordinates have been filled
              and you have installed a BEEP base) powered by Darksky
              API</router-link
            ></li
          >
          <li
            >Export:
            <router-link :to="{ name: 'export' }">
              export and download sensor measurements to a CSV file if you have
              installed a BEEP base</router-link
            ></li
          >
          <li
            >{{ $t('Whats_new') }}: this in-app overview of new features with
            links to the features themselves</li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.1.0 (29-05-2019)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Collaborate:
            <router-link :to="{ name: 'group-create' }">
              ability to share hives, inspections and measurements with other
              BEEP users</router-link
            ></li
          >
          <li>Bugfixes: small fixes for issues received as feedback</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.0.3 (30-04-2019)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Measurements: ability to input both
            <a href="https://thethingsnetwork.org" target="_blank">TTN</a> and
            <a href="https://www.simpoint.com/lora/" target="_blank"
              >Simpoint</a
            >
            LoRa data to the API</li
          >
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.0.2 (13-12-2018)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Measurements:
            <router-link :to="{ name: 'devices' }">
              ability to add new sensors for using API data input</router-link
            ></li
          >
          <li
            >Measurements: connect sensor to hive, show last measurement in
            gauge</li
          >
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.0.1 (10-07-2018)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li
            >Usability:
            <router-link :to="{ name: 'home' }"
              >Apiary and hive overview improved</router-link
            ></li
          >
          <li>Inspection: Dynamic inspection list</li>
          <li>Inspection: Create your own inspection list and order</li>
          <li>Measurements: Automatic measurement view improvement</li>
        </ul>
      </div>

      <div class="overline mb-1"
        ><span class="lowercase">v</span>1.1.1 (05-09-2017)</div
      >
      <div class="rounded-border mb-4">
        <ul>
          <li>First official BEEP app release</li>
        </ul>
      </div>
    </v-container>
  </Layout>
</template>

<script>
import Layout from '@layouts/back.vue'

export default {
  components: {
    Layout,
  },
  computed: {
    dutch() {
      return this.$i18n.locale === 'nl'
    },
  },
}
</script>

<style lang="scss" scoped>
.new-block {
  margin-top: 8px;
  margin-bottom: 16px;
}

.inline-icon {
  margin-top: -2px;
}

.support-icon {
  margin: -2px 2px 0 2px;
}
</style>
