<template>
  <Layout :title="$t('Whats_new')">
    <v-container>
      <div class="overline mb-1 primary--text"
        ><span class="lowercase">v</span>
        <span v-if="dutch">3.0.7 (12-04-2021) - Huidige versie</span>
        <span v-if="!dutch">3.0.7 (12-04-2021) - Current version</span>
      </div>
      <div v-if="!dutch" class="rounded-border primary-border mb-4">
        <ul>
          <li>
            <strong
              ><router-link :to="{ name: 'home' }">Hives</router-link> -
              Overview of all hives per apiary or collaboration group</strong
            >
            <ul>
              <li
                >Searchable: by hive / apiary / group / queen name, location
                (address, country code), latest inspection (notes, reminder
                text, reminder date, time ago), hive type and hive id (adding
                'id=', f.e.: 'id=99').</li
              >
              <li
                >Filterable: by group (if any), attention needed, reminder
                present, impression (good, neutral, bad), device (BEEP base or
                other) present, alerts present.<br />
                Please note: depending on screen size some filters may not be
                visible in order to save space. Filters will be remembered
                throughout a browsing session. Clicking the BEEP logo at the top
                left of the screen will clear all filters.</li
              >
              <li
                >Different views: XS (hive + attention and alert icon) - M (hive
                + icons, not possible on mobile) - XL (hive + icons + text).
              </li>
              <li
                >Hive menu: edit hive or queen properties, create an inspection
                or view inspections by clicking on the hive.</li
              >
              <li
                >Apiary / group menu: edit apiary or group properties, create a
                bulk inspection or view inspections by clicking on the settings
                icon next to the apiary / group name.</li
              >
              <li
                >Move hives: move multiple hives to another apiary at once by
                clicking on the settings icon next to the apiary name -> 'Move
                hives'.</li
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
                the desired location in the hive.</li
              >
              <li
                >Change layer order: by drag- and dropping within the hive
                icon.</li
              >
              <li>Change individual layer color: by clicking on the layer.</li>
              <li
                >Delete layer: by clicking on the layer and then clicking the
                bin icon.</li
              >
              <li
                >Edit hive: hives can be edited by clicking on the hive in the
                <router-link :to="{ name: 'home' }">Hives</router-link> overview
                which opens the hive menu -> 'Edit hive'. Please note: only
                owned hives and shared hives that are provided editing rights
                are editable.</li
              >
              <li
                >Edit queen: queens can be edited separately by clicking on the
                queen icon (for M and XL views) or by selecting 'Edit queen'
                from the hive menu (see above).</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'diary' }">Inspections</router-link> -
              Overview of all inspections (short version containing only overall
              impression, attention needed, notes and reminder)</strong
            >
            <ul>
              <li
                >Searchable: by date, time ago, hive / apiary / group name,
                notes, reminder text, reminder date and inspection id (adding
                'id=', f.e.: 'id=99').</li
              >
              <li
                >Filterable: by group (if any), attention needed, reminder
                present, impression (good, neutral, bad).<br />
                Please note: filters will be remembered throughout a browsing
                session.
              </li>
              <li
                >Inspection menu: view inspection (in detail), edit or delete
                inspection by clicking on the inspection item.</li
              >
              <li
                >Hive actions (changes in hive configuration) are saved as
                inspections and shown here as well.</li
              >
            </ul>
          </li>
          <li>
            <strong
              >Inspections overview per hive - Table containing all inspection
              data per hive</strong
            ><br />
            Accessible via hive menu in
            <router-link :to="{ name: 'home' }">Hives</router-link> overview ->
            'View inspections' or inspection menu in
            <router-link :to="{ name: 'diary' }">Inspections</router-link>
            overview -> 'View inspection'.
            <ul>
              <li
                >Searchable: by date, notes, reminder text, reminder date and
                inspection id (adding 'id=', f.e.: 'id=99').</li
              >
              <li
                >Filterable: by attention needed, reminder present, impression
                (good, neutral, bad).
              </li>
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
                once by selecting the hives you want to include.</li
              >
            </ul>
          </li>
          <li>
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
          <li>
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
                >Searchable: by date, time ago, hive / apiary / group name,
                alert rule name, function and value.</li
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
                >. Both can be added via the 'add alert rule' button. They can
                be (de)activated via the alert rule overview table or the
                'alerts enabled' / 'alerts disabled' switch at the top.</li
              >
              <li
                >Alert menu: edit alert rule or delete alert by clicking on an
                alert item.</li
              >
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
            <strong>Where to find? - Menu changes</strong>
            <ul>
              <li
                >Quick action menu - Add a new inspection, hive, apiary, group
                or alert rule by clicking the '+' button centered at the top of
                the
                <router-link :to="{ name: 'home' }">home</router-link>
                navigation bar.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link>,
                <router-link :to="{ name: 'diary' }">Inspections</router-link>,
                <router-link :to="{ name: 'measurements' }">Data</router-link>
                and
                <router-link :to="{ name: 'alerts' }">Alerts</router-link> tabs
                are always visible in the top bar.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link> tab
                contains former Apiaries page and former Hives page in one
                overview.</li
              >
              <li
                >Collaboration groups are now directly visible in the
                <router-link :to="{ name: 'home' }">Hives</router-link> overview
                via the group filter (first in row after search field, only
                visible if you are a member of any collaboration group).</li
              >
              <li
                ><router-link :to="{ name: 'devices' }">Devices</router-link>,
                <router-link :to="{ name: 'export' }">Data export</router-link>,
                <router-link :to="{ name: 'research' }">Research</router-link>,
                <router-link :to="{ name: 'support' }">Helpdesk</router-link>,
                <router-link :to="{ name: 'new' }">New</router-link> and
                <a href="https://beep.nl/home-english" target="_blank"
                  >BEEP website</a
                >
                are moved to the menu at the top right of the screen.</li
              >
            </ul>
          </li>
        </ul>
      </div>

      <div v-if="dutch" class="rounded-border primary-border mb-4">
        <ul>
          <li>
            <strong
              ><router-link :to="{ name: 'home' }">Kasten</router-link> -
              Overzicht van alle kasten per bijenstand of
              samenwerkingsgroep</strong
            >
            <ul>
              <li>
                Zoekbaar: op bijenkast / bijenstand / groep / moer naam, locatie
                (adres, landcode), laatste inspectie (notitie, herinnering,
                herinneringsdatum, tijd geleden), kasttype en kast id (door
                'id=' toe te voegen, bijv: 'id=99').</li
              >
              <li>
                Filterbaar: op groep (als aanwezig), aandacht nodig, herinnering
                aanwezig, totaalindruk (goed, neutraal, slecht), meetsysteem
                (BEEP base of anders) aanwezig, notificaties aanwezig.<br />
                N.B.: afhankelijk van schermgrootte zullen sommige filters niet
                zichtbaar zijn om ruimte te besparen. Filters worden onthouden
                gedurende de browsersessie. Door te klikken op het BEEP logo in
                de linkerbovenhoek van het scherm worden alle filters
                gewist.</li
              >
              <li
                >Verschillende layouts: XS (kast + aandacht en notificatie
                icoon) - M (kast + iconen, niet mogelijk op mobiel) - XL (kast +
                iconen + tekst).
              </li>
              <li
                >Kast menu: pas kast of moer aan, bekijk of maak een inspectie
                door op de kast te klikken.</li
              >
              <li
                >Bijenstand / groep menu: pas bijenstand of groep aan, maak een
                bulk inspectie or bekijk inspecties door op het 'instellingen'
                icoon naast de bijenstand / groep naam te klikken.</li
              >
              <li
                >Verplaats bijenkasten: verplaats meerdere kasten in één keer
                naar een andere bijenstand door op het 'instellingen' icoon
                naast de bijenstand naam te klikken -> 'Verplaats
                bijenkasten'.</li
              >
            </ul>
          </li>
          <li>
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
                het prullenbak icoon te klikken.</li
              >
              <li>
                Pas kast aan: bijenkasten kunnen aangepast worden door op de
                kast te klikken in het
                <router-link :to="{ name: 'home' }">Kasten</router-link>
                overzicht wat het kast menu opent -> 'Aanpassen kast'. N.B.:
                alleen eigen kasten en gedeelde kasten met aanpasrechten zijn
                aanpasbaar.</li
              >
              <li
                >Pas moer aan: moeren kunnen afzonderlijk aangepast worden door
                op het moer icoon te klikken (in de M en XL layout) or door
                'Aanpassen moer' te selecteren in het kast menu (zie boven).</li
              >
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'diary' }">Inspecties</router-link> -
              Overzicht van alle inspecties (korte versie met totaalindruk,
              aandacht nodig, notitie en herinnering)</strong
            >
            <ul>
              <li
                >Zoekbaar: op datum, tijd geleden, kast / bijenstand / groep
                naam, notitie, herinnering, herinneringsdatum en inspectie id
                (door 'id=' toe te voegen, bijv: 'id=99').</li
              >
              <li>
                Filterbaar: op groep (als aanwezig), aandacht nodig, herinnering
                aanwezig, totaalindruk (goed, neutraal, slecht).<br />
                N.B.: Filters worden onthouden gedurende de browsersessie.
              </li>
              <li
                >Inspectie menu: bekijk inspectie (in detail), aanpassen of
                verwijderen inspectie door te klikken op het inspectie item.</li
              >
              <li
                >Kast handelingen (aanpassingen van de kastconfiguratie) worden
                opgeslagen als een inspectie en ook getoond in dit
                overzicht.</li
              >
            </ul>
          </li>
          <li>
            <strong
              >Inspecties per kast - Tabel met alle inspectiedata per
              kast</strong
            ><br />
            Toegankelijk via het kast menu in het
            <router-link :to="{ name: 'home' }">Kasten</router-link> overzicht
            -> 'Bekijk inspecties' of het inspectie menu in het
            <router-link :to="{ name: 'diary' }">Inspecties</router-link>
            overzicht -> 'Bekijk inspectie'.
            <ul>
              <li>
                Zoekbaar: op datum, notitie, herinnering, herinneringsdatum en
                inspectie id (door 'id=' toe te voegen, bijv: 'id=99').</li
              >
              <li
                >Filterbaar: aandacht nodig, herinnering aanwezig, totaalindruk
                (goed, neutraal, slecht).
              </li>
            </ul>
          </li>
          <li>
            <strong
              ><router-link :to="{ name: 'inspect' }">Inspectie</router-link> -
              Nieuwe inspectie</strong
            >
            <ul>
              <li
                >Bulk inspectie: inspecteer meerdere kasten per bijenstand /
                groep in één keer door de kasten te selecten die je mee wilt
                nemen in je inspectie.</li
              >
            </ul>
          </li>
          <li>
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
          <li>
            <strong
              ><router-link :to="{ name: 'alerts' }">Alerts</router-link> -
              Overview of alerts (als er een BEEP base of ander meetsysteem
              aanwezig is)</strong
            ><br />
            If you own a BEEP base or another device you can set alerts, such
            that you will receive an alert when the measurement data meets
            certain requirements. For example, a sudden drop in weight because
            of swarming. Alerts will be shown here and in the
            <router-link :to="{ name: 'home' }">Hives</router-link>
            overview, you can choose to receive them via email as well.
            <ul>
              <li
                >Searchable: by date, time ago, hive / apiary / group name,
                alert rule name, function and value.</li
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
                >. Both can be added via the 'add alert rule' button. They can
                be (de)activated via the alert rule overview table or the
                'alerts enabled' / 'alerts disabled' switch at the top.</li
              >
              <li
                >Alert menu: edit alert rule or delete alert by clicking on an
                alert item.</li
              >
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
            <strong>Where to find? - Menu changes</strong>
            <ul>
              <li
                >Quick action menu - Add a new inspection, hive, apiary, group
                or alert rule by clicking the '+' button centered at the top of
                the
                <router-link :to="{ name: 'home' }">home</router-link>
                navigation bar.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link>,
                <router-link :to="{ name: 'diary' }">Inspections</router-link>,
                <router-link :to="{ name: 'measurements' }">Data</router-link>
                and
                <router-link :to="{ name: 'alerts' }">Alerts</router-link> tabs
                are always visible in the top bar.</li
              >
              <li
                ><router-link :to="{ name: 'home' }">Hives</router-link> tab
                contains former Apiaries page and former Hives page in one
                overview.</li
              >
              <li
                >Collaboration groups are now directly visible in the
                <router-link :to="{ name: 'home' }">Hives</router-link> overview
                via the group filter (first in row after search field, only
                visible if you are a member of any collaboration group).</li
              >
              <li
                ><router-link :to="{ name: 'devices' }">Devices</router-link>,
                <router-link :to="{ name: 'export' }">Data export</router-link>,
                <router-link :to="{ name: 'research' }">Research</router-link>,
                <router-link :to="{ name: 'support' }">Helpdesk</router-link>,
                <router-link :to="{ name: 'new' }">New</router-link> and
                <a href="https://beep.nl/home-english" target="_blank"
                  >BEEP website</a
                >
                are moved to the menu at the top right of the screen.</li
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
            >Helpdesk:
            <router-link :to="{ name: 'support' }">
              search the knowledge base for help, or file a support ticket
              directly from the app</router-link
            ></li
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
