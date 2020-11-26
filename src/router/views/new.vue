<template>
  <Layout :title="$t('Whats_new')">
    <v-container>
      <div class="overline mb-1"
        ><span class="lowercase">v</span>2.2.1 (15-07-2020) - Current
        version</div
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
}
</script>
