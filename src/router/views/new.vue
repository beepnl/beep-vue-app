<template>
  <Layout :title="$t('Whats_new')">
    <v-container>
      <div class="overline mb-1"
        ><span class="lowercase">v</span>
        <span v-if="dutch">3.0.7 (12-04-2021) - Huidige versie</span>
        <span v-if="!dutch">3.0.7 (12-04-2021) - Current version</span>
      </div>
      <div class="rounded-border primary-border mb-4">
        <ul>
          <li>
            <strong
              ><router-link :to="{ name: 'home' }">Hives</router-link> -
              Overview of all hives per apiary or collaboration group</strong
            >
            <ul>
              <li
                >Searchable: by name, location, latest inspection notes or
                reminder etc.</li
              >
              <li
                >Filterable: by group - attention needed - reminder present -
                impression (good, neutral, bad) - device (BEEP base or other)
                present - alerts present.<br />
                Please note: depending on screen size some filters may not be
                visible in order to save space. In addition, when no devices
                (BEEP base or other) are present, device and alerts filter won't
                be displayed. Group filter is only present if you are a member
                of at least 1 collaboration groups.</li
              >
              <li
                >Different views: XS (hive + attention and alert icon) - M (hive
                + icons, not possible on mobile) - XL (hive + icons + text)
                )</li
              >
              <li
                >Hive menu: edit and view hive or queen properties and
                inspections by clicking on the hive icon</li
              >
              <li
                >Apiary / group menu: edit and view apiary or group properties
                and inspections by clicking on the settings icon next to the
                apiary / group name</li
              >
              <li
                >Move hives: move multiple hives to another apiary at once by
                clicking on the settings icon next to the apiary name -> 'Move
                hives'</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'diary' }">Inspections</router-link> -
              Overview of all inspections</strong
            >
            <ul>
              <li
                >Searchable: by hive / apiary / group name, notes and reminder
                text</li
              >
              <li
                >Filterable: by group (if any) - attention needed - reminder
                present - impression (good, neutral, bad)</li
              >
              <li
                >Inspection menu: view inspection (in detail), edit or delete
                inspection by clicking on the inspection item</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'diary' }">Inspections</router-link> -
              Overview of all inspections</strong
            >
            <ul>
              <li
                >Searchable: by hive / apiary / group name, notes and reminder
                text</li
              >
              <li
                >Filterable: by group (if any) - attention needed - reminder
                present - impression (good, neutral, bad)</li
              >
              <li
                >Inspection menu: view inspection (in detail), edit or delete
                inspection by clicking on the inspection item</li
              >
              <li
                >Hive actions (changes in hive configuration) are saved as
                inspections and shown here as well.</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'measurements' }">Data</router-link> -
              Overview of measurement data</strong
            >
            <ul>
              <li
                >Heat map: if sound data is present this will be displayed in a
                heatmap. The more sound in a certain frequency band width has
                been recorded, the warmer the color of the corresponding data
                point.</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'alerts' }">Alerts</router-link> -
              Overview of alerts</strong
            ><br />
            If you own a BEEP base or another device you can set alerts, such
            that you will receive an alert when the measurement data meets
            certain requirements. For example, a sudden drop in weight because
            of swarming. Alerts will be shown here and in the
            <router-link :to="{ name: 'home' }">hives</router-link>
            overview, you can choose to receive them via email as well.
            <ul>
              <li
                >Searchable: by hive / apiary / group name, alert rule name,
                function and value</li
              >
              <li
                ><router-link :to="{ name: 'alertrules' }"
                  >Alert settings</router-link
                >
                - To get you started there are a few default alert rules you can
                use (and adapt to your own needs). In addition, you can create
                and edit your own alert rules. Both can be added via the 'add
                alert rule' button. They can be (de)activated via the alert rule
                overview table or the 'alerts enabled' / 'alerts disabled'
                switch at the top.</li
              >
              <li
                >Alert menu: edit alert rule or delete alert by clicking on an
                alert item</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'inspect' }">Inspect</router-link> -
              New inspection</strong
            >
            <ul>
              <li
                >Bulk inspection: inspect multiple hives per apiary / group at
                once by selecting the hive icons you want to include</li
              >
            </ul>
          </li>
          <li>
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
                the desired location in the hive icon.</li
              >
              <li
                >Change layer order: by drag- and dropping within the hive
                icon.</li
              >
              <li>Change individual layer color: by clicking on the layer.</li>
              <li>Delete layer: by clicking on the layer.</li>
            </ul>
          </li>
          <li>
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
                >Sentence at the top 'translates' the rule into plain
                language.</li
              >
              <li
                >By default, an alert rule will apply to all months, hours of
                day and hives (that are connected to a device). The alert rule
                can be deactivated for specified months, hours and hives (see
                bottom three input fields).</li
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
          </li>
          <li>
            <strong>Quick action menu</strong>
            <ul>
              <li
                >Add a new inspection, hive, apiary, group or alert rule by
                clicking the '+' button centered at the top of the
                <router-link :to="{ name: 'home' }">home</router-link>
                navigation bar</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'checklists' }"
                >Checklist templates</router-link
              >
              - View / edit checklist templates</strong
            >
            <ul>
              <li
                >Change item order: drag and drop the item (only possible on a
                desktop computer, if template is editable)</li
              >
              <li
                >Change included items: check and uncheck items to add or remove
                them to/from the template (if template is editable).</li
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
            <a :href="'/export'"
              >ability to also export data of collaboration group hives with
              measurement systems</a
            ></li
          >
          <li
            >Data export:
            <a :href="'/export'"
              >bugfix that prevented from exporting CSV data files from selected
              dates and measurement systems</a
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
            <a :href="'/research'"
              >ability to consent to sharing your data with research</a
            ></li
          >
          <!-- <li>Photos: ability to add images to inspections<a ng-click="switchMenu($event, true, '/images')">and view all images</a></li> -->
          <li
            >Helpdesk:
            <a :href="'/support'"
              >search the knowledge base for help, or file a support ticket
              directly from the app</a
            ></li
          >
          <li
            >Weather:
            <a :href="'/measurements'"
              >See apiary weather info (if lat/lon coordinates have been filled
              and you have installed a BEEP base) powered by Darksky API</a
            ></li
          >
          <li
            >Export:
            <a :href="'/export'"
              >export and download sensor measurements to a CSV file if you have
              installed a BEEP base</a
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
            <a :href="'/groups/create'"
              >ability to share hives, inspections and measurements with other
              BEEP users</a
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
            <a :href="'/devices'"
              >ability to add new sensors for using API data input</a
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
            >Usability: <a :href="'/'">Apiary and hive overview improved</a></li
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
