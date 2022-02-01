/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marrakuu',
    'Joulukuu',
  ],
  monthsShort: [
    'Tammi',
    'Helmi',
    'Maalis',
    'Huhti',
    'Touko',
    'Kesä',
    'Heinä',
    'Elo',
    'Syys',
    'Loka',
    'Marras',
    'Joulu',
  ],
  Today: 'Tänään',
  Clear: 'Poista',
  Close: 'Sulje',
  firstDay: 1,
  format: 'pppp p kkkk vvvv',

  /* main */
  Website: 'Verkkosivu',
  Feedback: 'Palaute',
  Feedback_mail_header: 'BEEP app palaute',
  Feedback_mail_body:
    'Hyvä BEEP Säätiö,%0D%0A%0D%0ATässä palautteeni about the BEEP sovelluksesta.%0D%0A%0D%0AHuomasin että:%0D%0A%0D%0AJuuri ennen kuin näin tapahtui, tein:%0D%0A%0D%0ANäyttö näytti tältä (lisää kuvakaappaus):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info: 'Diagnostiikkatiedot (jos kyseessä on bugi):%0D%0A',
  back: 'Takaisin',
  menu: 'Valikko',
  lighting: 'Kirkkaus',
  camera: 'Kamera',
  weather: 'Sää',
  sensors: 'Laitteet',

  no_valid_authentication: 'Todennustietoja ei vastaanotettu',
  succesfully_saved: 'Tallennettu onnistuneesti',

  switch_language: 'Vaihda kieli',
  Delete: 'Poista',
  Search: 'Hae...',

  /* user error messages */
  User: 'Käyttäjä',
  User_data: 'Käyttäjän tiedot',
  user_data: 'käyttäjän tiedot',
  updated: 'päivitetty',
  delete_complete_account:
    'Oletko varma että haluat poistaa koko tilisi mukaanlukien kaikki mehiläistarhat, pesät ja pesätarkastukset? Tietoja ei voi palauttaa.',
  username_is_required: 'Anna käyttäjätunnus',
  username_already_exists: 'Käyttäjätunnus on jo olemassa',
  password_is_required: 'Anna salasana',
  email_is_required: 'Anna sähköpostiosoite',
  email_already_exists: 'Sähköpostiosoite on jo käytössä',
  'policy accepted_is_required': 'Hyväksy käyttöehdot ennen rekisteröintiä',

  already_registered: 'Olen jo rekisteröitynyt',
  invalid_user: 'Käyttäjätunnus tuntematon tai väärä salasana',
  no_password_match: 'Salasanat eivät täsmää',
  invalid_token: 'Virheellinen koodi',

  no_valid_email: 'Virheellinen sähköpostiosoite',

  empty_fields: 'Täytä kaikki kentät',
  match_passwords: 'Salasanat eivät täsmää',

  succesfully_registered: 'Olet rekisteröitynyt onnistuneesti.',
  authentication_failed: 'Tunnistautminen epäonnistui',

  no_valid_input_received:
    'Tietoja ei voitu tallentaa, oikeanlaista tietoa ei vastaanotettu.',

  remove_all_settings: 'Poista kaikki asetukset',
  remove_apiary: 'Poista mehiläistarha',
  remove_hive: 'Poista pesä',
  remove_inspection: 'Poista pesätarkastus',

  Error: 'Virhe',
  Warning: 'Varoitus',
  first_remove_hives:
    'Huomio: tällä tarhalla on vielä pesiä. Voit tallentaa haluamasi pesät (ja niiden tarkastukset) siirtämällä ne ensin toiseen mehiläistarhaan. Jos jatkat poistamista, poistat KAIKKI tämän tarhapaikan pesät ja niiden tarkastukset.',

  Date: 'Päivämäärä',
  ok: 'Ok',
  previous: 'Edellinen',
  prev: 'edellinen',
  next: 'Seuraava',
  add: 'Lisää',
  create_new: 'Lisää uusi',
  New: 'Uusi',

  warning: 'Varoitus',

  apply: 'Ota käyttöön',
  Cancel: 'Peruuta',
  automatic: 'Automaattinen',
  manually: 'Manuaalinen',
  on: 'On',
  off: 'Off',

  /* login */
  login_title: 'Kirjaudu',
  login: 'Kirjaudu',
  back_to_login: 'Takaisin kirjatumiseen',
  forgot_password: 'Unohditko salasanasi?',

  username: 'Käyttäjätunnus',
  password: 'Salasana',
  confirm_password: 'Vahvista salasana',
  email: 'Sähköposti',
  token: 'Koodi',

  create_login_question:
    'Minulla ei ole tiliä. Rekisteröidy uudeksi käyttäjäksi',
  create_login: 'Rekisteröidy uudeksi käyttäjäksi',
  create_login_summary: 'Luo uusi käyttäjätili',
  save: 'Tallenna',
  save_and_return: 'Tallenna ja palaa',

  logout: 'Kirjaudu ulos',
  logout_title: 'Kirjaudu ulos tililtä',
  logout_now: 'Haluatko varmasti kirjautua ulos?',
  member_since: 'Jäsen alkaen',

  /* password recovery */
  password_recovery_title: 'Unohditko salasanasi?',
  password_recovery_remembered: 'Nyt muistin salasanani taas!',
  password_recovery_user: 'Käyttäjän tiedot',
  password_recovery_send_mail: 'Lähetä vahvistuskoodi',
  password_recovery_code_not_received: 'Etkö saanut koodia 5 minuutissa?',
  password_recovery_enter_code:
    'Onko sinulla jo vahvistuskoodi? Kirjoita se tähän',
  password_recovery_reset_title: 'Syötä uusi salasana',
  password_recovery_reset_password: 'Vaihda salasana',
  password_recovery_reminder_success:
    'Sähköposti on lähetetty. Klikkaa sähköpostissa olevaa linkkiä vaihtaaksesi salasanan tälle tilille.',
  password_recovery_reminder_summary:
    'Syötä sähköpostiosoitteesi. Saat sähköpostin, jossa on linkki salasanan vaihtamiseen.',

  password_recovery_reset_summary:
    'Määritä uusi salasana tilillesi saamallasi koodilla',
  password_recovery_reset_success:
    'Salasanasi vaihtaminen onnistui ja olet nyt kirjautunut sisään.',

  new_password: 'Uusi salasana',
  confirm_new_password: 'Vahvista uusi salasana',

  go_to_dashboard: 'Mene hallintapaneeliini',

  /* overview */
  overview_title: 'Yhteenveto',
  overview: 'Yhteenveto',
  color: 'Väri',
  state: 'On/off',
  connection_state: 'Yhteyden tila',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
  Hive: 'Pesä | Pesät',
  hive: 'pesä | pesät',
  Location: 'Mehiläistarha | Mehiläistarhat',
  location: 'mehiläistarha | mehiläistarhat',
  Name: 'Nimi',
  name: 'nimi',
  Type: 'Tyyppi',
  type: 'tyyppi',
  Layer: 'Osasto',
  layer: 'Osasto',
  brood: 'Sikiöt',
  honey: 'Hunaja',
  inspect: 'Tarkasta',
  inspection: 'tarkastus | tarkastukset',
  Inspection: 'Tarkastus | Tarkastukset',
  New_inspection: 'Uusi tarkastus',
  Edit_inspection: 'Muokkaa tarkastusta',
  Actions: 'Toimenpiteet',
  Conditions: 'Olosuhteet (tarkastettu)',
  edit: 'Muokkaa',
  // Hive_brood_layers: 'Sikiö osastot',
  // Hive_honey_layers: 'Hunaja osastot',
  Hive_layer_amount: 'Osastojen määrä',
  Bee_race: 'Mehiläisten rotu',
  Birth_date: 'Syntymäpäivä',
  Color: 'Väri',
  Queen_colored: 'Emo merkattu',
  Queen_clipped: 'Emo siivet typistetty',
  Queen_fertilized: 'Emo pariutunut',
  Age: 'Ikä',
  years_old: 'vuotta vanha',

  /* Hive check items */
  Date_of_inspection: 'Tarkastuspäivämäärä',
  action: 'Toimenpide',
  reminder: 'Muista',
  remind_date: 'Muistutuspäivä',

  overall: 'Yleiskuva',
  positive_impression: 'Yleisarvio',
  needs_attention: 'Tarvitsee lisähuomiota',
  notes: 'Muistiinpanot',
  notes_for_next_inspection:
    'Lyhyt muistiinpano seuraavaa tarkastuskertaa varten (näkyy yleiskatsauksessa)',
  Not_implemented_yet: 'Tätä kohdetta ei ole vielä otettu käyttöön',
  save_input_first: 'Haluatko tallentaa tiedot ensin?',

  /* dashboard */
  dashboard_title: 'Hallintapaneeli',
  dashboard: 'Hallintapaneeli',
  // measurements: 'Mittaukset',
  measurementsError: 'Mittauksia ei voi ladata, tarkista verkkoyhteys',
  last_measurement: 'Viimeisin mittaus',
  at: 'klo',
  measurement_system: 'BEEP mittausjärjestelmä',
  no_data: 'Tietoja ei käytettävissä',
  no_chart_data: 'Ei kaaviotietoja valitulta ajanjaksolta',

  /* settings */
  General: 'Yleisasetukset',
  Place: 'Sijainti',
  Country: 'Maa',
  City: 'Kaupunki',
  Address: 'Osoite',
  Lattitude: 'Leveysaste',
  Longitude: 'Pituusaste',
  Street: 'Katu',
  Number: 'Numero',
  Postal_code: 'Postinumero',
  Description: 'Kuvaus',
  Hive_settings: 'Pesän asetukset',
  Hive_amount: 'Pesien määrä täällä tarhapaikalla',
  Hive_prefix: 'Pesän nimen etuliite (ennen numeroa)',
  Hive_number_offset: 'Pesien alkunumero',
  Hive_type: 'Pesätyyppi',
  Hive_layers: 'Pesän osastot',
  Hive_frames: 'Kehiä per osasto',
  Hive_color: 'Pesän väri',
  Queen: 'Emo',
  queen: 'emo',

  settings_title: 'Asetukset',
  settings_description: 'Anturien asetukset',
  settings: 'asetukset',

  sensors_title: 'Laiteasetukset',
  sensors_description: 'Laitteiden tila ja rekisteröinti',
  // sensors: 'Laitteet',
  sensor: 'laite',

  Select: 'Valitse',
  Not_selected: 'Ei valittu',
  Poor: 'Huono',
  Fair: 'Kohtalainen',
  Average: 'Keskiarvo',
  Average_slider: 'Keskimääräinen',
  Good: 'Hyvä',
  Excellent: 'Erinomainen',
  Low: 'Matala',
  Medium: 'Keskitaso',
  High: 'Korkea',
  Extreme: 'äärimmäinen',

  /* colors */
  select_color: 'Valitse väri',
  advanced: 'Lisäasetukset',

  /* sensors */
  Select_sensor: 'Valitse anturi',
  // temperature: 'Lämpötila',
  t: 'Lämpötila',
  t_0: 'Lämpötila 1',
  t_1: 'Lämpötila 2',
  t_2: 'Lämpötila 3',
  t_3: 'Lämpötila 4',
  t_4: 'Lämpötila 5',
  t_5: 'Lämpötila 6',
  t_6: 'Lämpötila 7',
  t_7: 'Lämpötila 8',
  t_8: 'Lämpötila 9',
  t_9: 'Lämpötila 10',
  light: 'Auringonvalo',
  l: 'Auringonvalo',
  water: 'Vesi',
  w: 'Paino (vanha)',
  humidity: 'Kosteus',
  h: 'Kosteus',
  air_pressure: 'Ilmanpaine',
  p: 'Ilmanpaine',
  weight: 'Paino',
  w_v: 'Painoanturin arvo kaikki anturit',
  w_fl: 'Painoanturin arvo etu vasen',
  w_fr: 'Painoanturin arvo etu oikea',
  w_bl: 'Painoanturin arvo taka vasen',
  w_br: 'Painoanturin arvo taka oikea',
  weight_kg: 'Paino',
  weight_kg_corrected: 'Paino (corr)',
  weight_combined_kg: 'Paino yhdistelmä',
  bat_volt: 'Akku',
  bv: 'Akku',
  sound_fanning_4days: 'Tuuletus 4pv mehiläiset',
  s_fan_4: 'Tuuletus 4pv mehiläiset',
  sound_fanning_6days: 'Tuuletus 6pv mehiläiset',
  s_fan_6: 'Tuuletus 6pv mehiläiset',
  sound_fanning_9days: 'Tuuletus 9pv mehiläiset',
  s_fan_9: 'Tuuletus 9pv mehiläiset',
  sound_flying_adult: 'Lentomehiläiset',
  s_fly_a: 'Lentomehiläiset',
  sound_total: 'ääni yhteensä',
  s_tot: 'ääni yhteensä',
  s_spl: 'äänen painetaso',
  bee_count_in: 'Mehiläisten määrä sisään',
  bc_i: 'Mehiläisten määrä sisään',
  bee_count_out: 'Mehiläisten määrä ulos',
  bc_o: 'Mehiläisten määrä ulos',
  t_i: 'Sisälämpötila',
  rssi: 'Signaalin voimakkuus',
  snr: 'Signaali kohina',
  lat: 'Leveysaste',
  lon: 'Pituusaste',
  Sound_measurements: 'äänen mittaukset',
  Sensor_info: 'Anturin tiedot',
  s_bin098_146Hz: '098-146Hz',
  s_bin146_195Hz: '146-195Hz',
  s_bin195_244Hz: '195-244Hz',
  s_bin244_293Hz: '244-293Hz',
  s_bin293_342Hz: '293-342Hz',
  s_bin342_391Hz: '342-391Hz',
  s_bin391_439Hz: '391-439Hz',
  s_bin439_488Hz: '439-488Hz',
  s_bin488_537Hz: '488-537Hz',
  s_bin537_586Hz: '537-586Hz',
  s_bin_71_122: '071-122Hz',
  s_bin_122_173: '122-173Hz',
  s_bin_173_224: '173-224Hz',
  s_bin_224_276: '224-276Hz',
  s_bin_276_327: '276-327Hz',
  s_bin_327_378: '327-378Hz',
  s_bin_378_429: '378-429Hz',
  s_bin_429_480: '429-480Hz',
  s_bin_480_532: '480-532Hz',
  s_bin_532_583: '532-583Hz',
  s_bin_0_201: '0-201Hz',
  s_bin_201_402: '201-402Hz',
  s_bin_402_602: '402-602Hz',
  s_bin_602_803: '602-803Hz',
  s_bin_803_1004: '803-1004Hz',
  s_bin_1004_1205: '1004-1205Hz',
  s_bin_1205_1406: '1205-1406Hz',
  s_bin_1406_1607: '1406-1607Hz',
  s_bin_1607_1807: '1607-1807Hz',
  s_bin_1807_2008: '1807-2008Hz',
  icon: 'Kuvake',
  precipIntensity: 'Sademäärä',
  precipProbability: 'Sateen todennäköisyys',
  precipType: 'Sade tyyppi',
  temperature: 'Ulkolämpötila',
  apparentTemperature: 'Näkyvä lämpötila',
  dewPoint: 'Kastepiste',
  // humidity: 'Kosteus',
  pressure: 'Ilmanpaine',
  windSpeed: 'Tuulennopeus',
  windGust: 'Tuuli puuskissa',
  windBearing: 'Tuulen suunta',
  cloudCover: 'Pilvisyys',
  uvIndex: 'UV indeksi',
  visibility: 'Näkyvyys',
  ozone: 'Otsoni',

  /* Measurements */
  Hour: 'Tunti',
  hour: 'tunti | tuntia',
  day: 'Päivä',
  week: 'Viikko',
  month: 'Kuukausi',
  year: 'Vuosi',

  /* settings */
  could_not_load_settings: 'Asetuksia ei voitu ladata',
  offline: 'Ei yhteyttä',
  remote: 'Etä',
  connected: 'Suora',

  yes: 'Kyllä',
  no: 'Ei',

  footer_text: 'Avoimen lähdekoodin mehiläistarhausta',
  beep_foundation: 'BEEP säätiö',

  Checklist: 'Tarkistuslista | Tarkistusluettelot',
  checklist: 'tarkistuslista | tarkistusluettelot',
  Checklist_items: 'Tarkistuslistan kohteet',
  edit_hive_checklist:
    'Lisää/poista kohteita pesän tarkastuslistalta valitsemalla ruutu/poistamalla valinta. Voit myös järjestää kohteet haluamaasi järjestykseen vetämällä ja pudottamalla. Vinkki: jos kirjoitat termin hakukenttään, kaikki kyseistä termiä sisältävät kohteet muuttuvat punaisiksi.',

  /* user */
  Data_export: 'Vie tiedot',
  Export_your_data:
    'Vie kaikki BEEP-tililläsi olevat tiedot ja lähetä Excel-tiedostona sähköpostissa. Excel-tiedostossa on oma välilehti henkilökohtaisille, pesän, tarhapaikan ja tarkastusten tiedoille.',

  Terms_of_use: 'Käyttöehdot',
  accept_policy:
    'Hyväksyn BEEP-palveluehdot, jotka ovat uuden eurooppalaisen tietosuojalain mukaiset.',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy: 'Et ole vielä hyväksynyt viimeisimpiä käyttöehtoja',

  /* General items */
  server_down:
    'Sovellus ei ole käytössä huoltotöiden takia. Yritä myöhemmin uudelleen',
  add_to_calendar: 'Lisää kalenteriin',
  sort_on: 'Lajittelu päällä',
  Whats_new: 'Uutta!',
  Manual: 'Ohjeet',

  Site_title: 'BEEP | Mehiläismonitori',

  could_not_create_user:
    'Käyttäjää ei voida luoda tällä hetkellä.Pahoittelemme häiriötä, yritä myöhemmin uudelleen.',
  email_verified: 'Your e-mail address has been verified.',
  email_not_verified: 'Sähköpostiosoitettasi ei ole vielä vahvistettu',
  email_new_verification:
    'Klikkaa tätä linkkiä lähettääksesi uuden vahvistussähköpostin',
  email_verification_sent:
    'Vahvistuslinkillä varustettu viesti on lähetetty sähköpostiosoitteeseesi. Aktivoi tilisi ja kirjaudu sisään napsauttamalla sähköpostissa olevaa linkkiä.',
  email_verification_resent:
    'Uusi vahvistuslinkillä varustettu viesti on lähetetty sähköpostiosoitteeseesi. Aktivoi tilisi ja kirjaudu sisään napsauttamalla sähköpostissa olevaa linkkiä.',

  not_filled: 'Vaaditaan, mutta ei täytetä',
  cannot_deselect:
    'Tätä kohdetta ei voi poistaa, koska se sisältää pakollista tietoa',
  Undelete: 'älä poista',
  the_field: 'Kenttä',
  is_required: 'on pakollinen',

  No_groups: 'Ryhmiä ei ole käytettävissä',
  not_available_yet:
    'Ei vielä käytettävissä. Klikkaa yläkulmassa olevaa painiketta lisätäksesi ryhmän.',
  Users: 'Käyttäjät',
  member: 'ryhmän jäsen | ryhmän jäsenet',
  Member: 'Ryhmän jäsen | Ryhmän jäsenet',
  Invite: 'Kutsu',
  Invited: 'Kutsuttu',
  Invitation: 'Kutsu | Kutsutut',
  Admin: 'Järjestelmänvalvoja',
  Creator: 'Ryhmän omistaja',
  Group: 'Yhteistyöryhmä | Tee yhteistyötä',
  group: 'yhteistyöryhmä | tee yhteistyötä',
  group_short: 'ryhmä | ryhmät',
  to_share:
    'Jaa tämän ryhmän kanssa. 1 napsautus = Ryhmän jäsenillä vain lukuoikeus 2 napsautusta = Ryhmän jäsenet voivat muokata',
  Invitation_accepted: 'Kutsu hyväksytty',
  Accept: 'Hyväksy',
  My_shared: 'Jaetut',
  invitee_name: 'Kutsutun nimi',
  Remove_group:
    'Oletko varma että haluat poistaa tämän ryhmän kokonaan kaikilta sen jäseniltä?',
  Detach_from_group: 'Poista minut ja pesäni tästä ryhmästä',
  my_hive: 'Minun pesäni',
  created: 'Luotu',
  group_detached: 'Poistuit ryhmästä onnistuneesti',
  group_activated: 'Ryhmäkutsu hyväksytty',
  group_declined: 'Ryhmäkutsu hylätty',
  group_explanation_1:
    '1. Luo uusi yhteistyöryhmä, jolla on selkeä otsikko ja valinnainen kuvaus',
  group_explanation_2: '2. Kutsu muita BEEP käyttäjiä sähköpostilla',
  group_explanation_3:
    '3. Jaa tietyt pesät, joita muut voivat tarkastella ja tehdä yhteistyötä',
  Filter_and_sort_on: 'Suodata ja lajittele:',

  /* New translations v2.2.0 */
  roofed: 'Onko mehiläistarhalla katos?',
  info: 'Info',

  research: 'Tutkimus',
  start_date: 'Aloituspäivämäärä',
  end_date: 'Päättymispäivämäärä',
  purpose: 'Tutkimuksen tarkoitus',
  institution: 'Tutkimuslaitos',
  type_of_data_used: 'Datan käyttö',
  link: 'Linkki',
  Consent: 'Suostumus',
  history: 'Historia',
  Current_consent: 'Nykyinen suostumus',
  consent_yes: 'Suostun jakamaan tietoni',
  consent_no: 'EN suostu jakamaan tietojani',
  my_beep_data: 'Oma BEEP datani',
  Consent_can_only_be_set: 'Suostumus voidaan muuttaa vain',
  earlier: 'aiempi',
  later: 'myöhempi',

  new_apiary_explanation: 'Luo uusi mehiläistarha neljässä vaiheessa',
  start_here: 'Aloita tästä',
  optional: 'valinnainen',
  dimensions: 'Mitat',
  details: 'yksityiskohdat',
  configuration: 'konfiguraatio',
  adjustments: 'säädöt',
  changes_queen_color: 'Muokkaus muuttaa värin',

  Brood_box_and_frame: 'Sikiöosasto ja kehä',
  Hive_order: 'Pesien järjestys tarhapaikalla',
  bb_width_cm: 'Sikiöosaston leveys (cm)',
  bb_height_cm: 'Sikiöosaston korkeus (cm)',
  bb_depth_cm: 'Sikiöosaston syvyys (cm)',
  fr_width_cm: 'Kehän leveys (cm)',
  fr_height_cm: 'Kehän korkeus (cm)',
  queen_line: 'linja',
  queen_tree: 'sukupuu',
  queen_description: 'muistiinpanot',
  Hive_short: 'Pesä | Pesät',

  Image: 'Kuva | Kuvat',
  Size: 'Koko',
  preview: 'esikatsele',

  Sensor_definitions: 'Anturimääritelmät',
  Inside: 'Mittaa sisällä',
  Offset: 'Offset',
  Multiplier: 'Kerroin',
  Input: 'Input',
  Output: 'Output',
  Last: 'Viimeinen',

  Export_sensor_data:
    "Vie kaikki tiedot per laite korkeimmalla mahdollisella resoluutiolla .csv-tiedostona, jonka voit avata Excelissä tai SPSS: ssä. HUOMAUTUS: 'aika ' -sarakkeessa olevat päivämäärän ja kellonajan tiedot ovat GMT-aikaa, muotoillut RFC 3339 -päivämäärä-aika -standardilla.",
  CSV_export_separator: 'CSV-datasarakkeen erotin',
  Selected_date: 'Valittu ajanjakso',
  Sensor_measurements: 'Anturimittaukset',
  too_much_data:
    'Liian paljon käsiteltäviä tietoja, valitse vähemmän anturimittauksia tai lyhennä aikajaksoa aloitus- ja lopetuspäivän välillä',
  sample_code_hive:
    'Valitse ensin pesä, jotta voit luoda yksilöllisen näytekoodin',
  sample_code_generate: 'Luo yksilöllinen näytekoodi',
  sample_code_delete: 'Poista yksilöllinen näytekoodi',

  measurement_interval: 'väli',
  from_weather_service: 'sääpalvelusta',

  /* New translations v3 */
  Collaborate: 'Tehdä yhteistyötä',

  /* TO BE TRANSLATED */
  click_hives_to_filter: 'Suodata napsauttamalla pesää',
  for: 'varten' /* finnish language does not work like this */,
  last_visit: 'Viimeinen vierailu',
  apiary_details: 'Mehiläistarhan teidot',
  group_details: 'Ryhmän tiedot',
  diary: 'Päiväkirja',
  data: 'Data',
  photo: 'kuva | kuvat',
  add_checklist: 'Lisää tarkistuslista',
  add_hive: 'Lisää pesä',
  delete_apiary: 'Poista mehiläistarha',
  edit_apiary: 'Muokkaa mehiläistarhaa',
  new_apiary: 'Uusi mehiläistarha',
  delete_group: 'Poista ryhmä',
  edit_group: 'Muokkaa ryhmää',
  new_group: 'Uusi ryhmä',
  verification_code: 'Vahvistuskoodi',
  limit_exceeded: 'Raja on saavutettu. Yritä myöhemmin uudelleen',
  confirm_email_title: 'Vahvista sähköpostiosoitteesi',
  confirm_email_summary:
    'Olet saanut vahvistuskoodin sähköpostiisi. Kirjoita se alle vahvistaaksesi sähköpostiosoitteesi',
  confirm: 'Vahvista',
  Profile: 'Profiili',
  Checklist_template: 'Tarkistuslistan malli | Tarkistuslistan mallit',
  Help: 'Apua',
  Privacy: 'Yksityisyys',
  FAQ: 'FAQ',
  Support: 'Tuki',
  no_inspections: 'Lisää ensimmäinen tarkastus',
  no_results: 'Ei tuloksia',
  Hive_brood_layer: 'Sikiö osasto | Sikiö osastot',
  Hive_honey_layer: 'Hunaja osasto | Hunaja osastot',
  Hive_queen_excluder_layer: 'Sulkuristikko | Sulkuristikot',
  Hive_feeding_box_layer: 'Syöttölaatikko | Syöttölaatikot',
  overrides_layer_colors: 'Korvaa osastojen värit',
  drag_layers: 'Lisää osastoja vetämällä',
  page: 'sivu | sivut',
  not_found: 'ei löydetty',
  sorry: 'Pahoittelut',
  delete_layer: 'Poista osasto',
  not_saved_error: 'Tietoja ei voitu tallentaa',
  something_wrong: 'Jotain meni pieleen',
  not_editable: 'ei muokattavissa',
  unsaved_changes: 'Tallentamattomat muutokset',
  save_changes:
    'Haluatko varmasti poistua tältä sivulta? Tallentamattomat muutokset menetetään.',
  no_apiaries_yet: 'Sinulla ei ole vielä mehiläistarhaa',
  need_help: 'Tarvitsetko apua?',
  Apiary_color: 'Mehiläistarhan väri',
  Set_notification_date: 'Aseta ilmoituspäivä',
  remove_image: 'Poista kuva',
  Total_colony_size: 'Pesän koko',
  bee: 'mehiläinen | mehiläiset',
  with_bees: 'mehiläisten kanssa',
  change_checklist_confirm:
    'Haluatko varmasti valita toisen tarkistuslistan? Jo täytettyjen kenttien tiedot säilytetään.',
  view: 'Katso',
  share: 'Jaa',
  edit_details: 'Muokkaa tietoja',
  remove_queen: 'Poista emo',
  remove_group_short: 'Poista yhteistyöryhmä',
  device: 'Laite | Laitteet',
  click_date_to_edit: 'Muokkaa päivämäärää napsauttamalla päivämäärää.',
  accept_policy_1: 'Hyväksyn BEEPin',
  accept_policy_2:
    ', jotka ovat sopusoinnussa uuden eurooppalaisen yksityisyydensuojalain kanssa',
  terms_of_use: 'käyttöehdot',
  invalid_password:
    'Salasanassa on oltava vähintään 8 merkkiä, yksi pieni kirjain, yksi iso kirjain, yksi numero ja yksi erikoismerkki (\\]{}()?\\-"!@#%&/\\,><\':;|_~`)',
  sensor_definition: 'anturin määritelmä | anturin määritelmät',
  measurement: 'mittaus | mittaukset',
  remove_device: 'Poista laite',
  last_message_received: 'Viimeisin viesti vastaanotettu',
  transmission_ratio: 'Siirtosuhde',
  period: 'Aika',
  download: 'Lataa',
  different_end_start: 'Loppu- ja aloituspäivämäärän on oltava eri',
  later_end_start: 'Aloituspäivän on oltava aikaisempi kuin lopetuspäivä',
  new_email_verification_sent:
    'Vahvistuslinkillä varustettu viesti on lähetetty uuteen sähköpostiosoitteeseesi. Napsauta sähköpostissa olevaa linkkiä vahvistaaksesi uuden sähköpostiosoitteesi ja kirjautuaksesi sisään.',
  sensordef_info:
    "Anturimäärityksen tarkoituksena on muuntaa anturin arvo saapuvasta \"raaka\" anturiarvosta arvoksi fyysisen määrän ja yksikön mukaan (esim. W_v = 1098273 => paino_kg = 62400 kg) tai kalibroida anturi (esim. T_0 = 15,3 ° C => t_0 = 15,8 ° C). Tämä voidaan tehdä asettamalla 'offset' ja 'kerroin'. Tulo- ja lähtöarvo pysyvät samana, jos offset '0' ja kerroin '1' on asetettu. BEEP-perussovellus (App Storesta) tarjoaa oikeat anturimääritykset BEEP-tukiaseman alkuasetuksissa.",
  or: 'tai',
  select_all_hives: 'Valitse kaikki pesät',
  select_all_editable_hives: 'Valitse kaikki muokattavat pesät',
  Alert: 'Hälytys | Hälytykset',
  alert: 'halytys | hälytykset',
  remove_alert: 'Poista hälytys',
  alerts_enabled: 'Hälytykset käytössä',
  alerts_disabled: 'Hälytykset poistettu käytöstä',
  edit_checklist_confirm:
    'Haluatko varmasti muokata tarkistusluetteloa? Tarkastukseen tallentamattomat muutokset menetetään.',
  edit_checklist_confirm_deselectedhives:
    'Haluatko varmasti muokata tarkistusluetteloa? Tarkastukseen ja pesävalintaan tallentamattomat muutokset menetetään.',
  user_not_edited:
    'Käyttäjätietoja ei ole muokattu. Mahdollisesti käyttäjätiedot ovat identtisiä tietokannassa jo olevien käyttäjätietojen kanssa, tai yhtä tai useampaa kenttää ei ole täytetty oikein. Tarkista tiedot ja yritä uudelleen.',
  user_not_deleted: 'Jotain meni pieleen, käyttäjää ei ole poistettu.',
  research_consent: 'Tutkimuksen suostumus',
  checklist_types: 'Henkilökohtainen, jaettu, tutkimus',
  edit_hive_checklist_no_touch:
    'Lisää / poista kohteita pesän tarkistuslistasta valitsemalla / poistamalla valinta alla olevan luettelon valintaruuduista. Voit myös avata / sulkea ja vetää / pudottaa kohteita järjestääksesi ne uudelleen omaan haluamaasi järjestykseen (Huom. Tämä ei ole mahdollista kosketusnäyttölaitteella).',
  edit_hive_checklist_touch:
    'Lisää / poista kohteita pesän tarkistuslistasta valitsemalla / poistamalla valinta alla olevan luettelon valintaruuduista. Kohteiden järjestyksen muuttaminen on mahdollista vain pöytätietokoneella.',
  input_not_possible_for_bulkinspection:
    'Tämä kohta ei ole käytettävissä, kun tarkastukseen on valittu useita pesiä, koska se voidaan täyttää vain yksittäistä pesää kohti. Tämä kohta on mahdollista täyttää yhden pesän kohdalla myöhemmin muokkaamalla kyseisen pesän tarkastusta.',
  save_bulkinspection_confirm:
    'Oletko varma, että haluat tallentaa tämän tarkastuksen useille pesille samanaikaisesti?',
  deleted_but_not_saved_devices_warning:
    'Huomaa: laitteet poistetaan vasta napsauttamalla Tallenna ja poista -painiketta oikeassa yläkulmassa.',
  no_alerts: 'Ei uusia ilmoituksia',
  alertrule: 'Hälytyssääntö | Hälytyssäännöt',
  alertrule_pagetitle: 'Hälytysasetukset',
  Measurement: 'Mittaus | Mittaukset',
  Calculation: 'Laskeminen',
  calculation: 'laskeminen',
  Alert_on_occurences: 'Milloin haluaisit saada tämän ilmoituksen?',
  Alert_on_occurences_hint:
    'Heti vai vasta sen jälkeen, kun se on tapahtunut x kertaa?',
  Direct: 'Heti',
  After: 'jälkeen ',
  times: ' kertaa',
  Comparator: 'Vertailija',
  comparator: 'vertailija',
  Comparison: 'Vertailu',
  comparison: 'vertailu',
  Threshold_value: 'Kynnysarvo',
  Minimum: 'Minimi',
  Maximum: 'Maksimi',
  Derivative: 'Poikkeama (lisää tai vähennä)',
  Count: 'Laske',
  Value: 'Arvo',
  Difference: 'Ero',
  Absolute_value: 'Absoluuttinen arvo',
  Absolute_value_of_dif_explanation: '**Eron absoluuttinen arvo',
  Exclude_months:
    '<strong>Poista</strong> tämä hälytys käytöstä seuraavien kuukausien aikana:',
  Exclude_hours:
    '<strong>Poista</strong> tämä hälytys käytöstä seuraavien tuntien aikana:',
  Exclude_hives:
    '<strong>Poista</strong> tämä hälytys käytöstä seuraavissa pesissä',
  Exclude_hives_details:
    'HUOM. Tämä hälytys suoritetaan oletusarvoisesti kaikista pesistä, joissa on mittauslaite.',
  months: 'kuukaudet',
  hours: 'tunnit',
  delete_alertrule: 'Poista hälytyssääntö',
  Active: 'Aktiivinen',
  Alert_via_email: 'Ilmoitus sähköpostitse',
  Webhook_url: 'Webhook-URL-osoite',
  this_field: 'Tämä kenttä',
  alertrule_default: 'Oletushälytyssääntö | Oletushälytyssäännöt',
  copy: 'Kopioi',
  Home: 'Koti',
  Select_default_alertrule: 'Kopioi oletushälytyssääntö',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Haluaisin saada ilmoituksen, jos [calculation] [comparison] koskien [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Tämä laskenta suoritetaan [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', ja haluaisin saada ilmoituksen suoraan. ',
  alertrule_occurences_indirect_sentence:
    ', mutta haluaisin saada ilmoituksen vain, jos se tapahtuu [alert_on_occurences] kertaa. ',
  alertrule_exclude_months_sentence:
    'Tämä hälytys poistetaan käytöstä seuraavien kuukausien aikana: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Tämä hälytys poistetaan käytöstä seuraavien tuntien aikana: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Tämä hälytys poistetaan käytöstä seuraavissa pesissä: [exclude_hive_ids].',
  min: 'minimi',
  max: 'maksimi',
  ave: 'keskiarvo',
  der: 'poikkeama',
  cnt: 'Laske',
  equal_to: 'on yhtä suuri kuin',
  less_than: 'on vähemmän kuin',
  greater_than: 'on suurempi kuin',
  less_than_or_equal: 'on pienempi tai yhtä suuri kuin',
  greater_than_or_equal: 'on suurempi tai yhtä suuri kuin',
  alertrule_not_active:
    "Tämä hälytys on poistettu käytöstä. Voit aktivoida sen valitsemalla 'Aktiivinen' -ruudun ja tallentamalla tämän hälytyssäännön.",
  export_email_sent: 'Sähköposti Excel-tiedostolla on lähetetty',
  export_file_saved: 'Excel-tiedosto on tallennettu Lataukset-kansioon',
  Updated_at: 'Päivitetty',
  Not_yet_saved: 'Ei vielä tallennettu',
  beep_base_explanation:
    "Jos sinulla on BEEP alusta (ks. yllä oleva kuva), käytä 'BEEP base app' (iOS ja Android) yhteyden muodostamiseksi tämän sovelluksen kanssa. Jos sinulla ei vielä ole BEEP alustaa, klikkaa valikon kohdasta 'BEEP verkkosivu' saadaksesi lisätietoja BEEP alustan saamisesta. Jos sinulla on oma mittauslaite ja haluat nähdä sen tiedot BEEP-sovelluksessa, lähetä meille viesti ja pyydä liittymistä Slack-yhteisöömme ja saat pääsyn API-kuvaukseen.",
  add_own_device: 'Lisää oma laite',
  devices_info_text:
    'Huomaa: onko sinulla BEEP-vaaka-alusta? Lisää laite BEEP-alustan sovelluksella. Sitten se näkyy automaattisesti alla olevassa luettelossa.',
  devices_url_text: 'Täältä löydät lisätietoja BEEP-alustan sovelluksesta.',
  alert_explanation_1:
    'Jos omistat BEEP-vaaka-alustan tai muun laitteen, voit asettaa hälytyksiä siten, että saat ilmoituksen, kun mittaustiedot täyttävät tietyt vaatimukset. Esimerkiksi äkillinen painonlasku parveilun takia. Hälytykset näkyvät tässä sovelluksessa, voit halutessasi vastaanottaa ne myös sähköpostitse.',
  alert_explanation_2:
    'Voit käyttää valmiita oletusvaroitussääntöjä, ja mukauttaa niitä omiin tarpeisiisi. Lisäksi voit luoda omia hälytyssääntöjä.',
  alertrules_url_text:
    'Luo ensimmäinen hälytyssääntö siirtymällä kohtaan Hälytysasetukset',
  Apiary_management: 'Mehiläistarhan hallinta',
  Move: 'Siirrä',
  Current_apiary: 'Nykyinen mehiläistarha',
  sensor_key: 'Luo yksilöivä tunniste',
  disabled_settings:
    'Näiden asetusten muokkaaminen manuaalisesti on pois käytöstä.',
  Address_placeholder: 'Numero, kadun nimi, kaupunki',
  first_create_apiary: 'Luo ensin mehiläistarha',
  Unknown: 'Tuntematon',
  unknown: 'tuntematon',
  research_warning:
    'Huomaa: jos et saanut kutsua osallistua, sinun ei tarvitse antaa suostumustasi tietojen jakamiseen, koska tietojasi ei käytetä siinä tapauksessa.',
  research_explanation_p1:
    'BEEP-alustaa käytetään alla luetelluissa tutkimushankkeissa. Kun sinut on kutsuttu osallistumaan tutkimusprojektiin, sinun on annettava suostumus tutkijoille pääsy mehiläistietoihisi.',
  research_explanation_p2:
    'Voit peruuttaa suostumuksesi milloin tahansa. Siitä hetkestä lähtien uusia tietoja ei jaeta. Tiedot, jotka olet jakanut sinä aikana, jona annoit suostumuksen, ovat edelleen käytettävissä tutkimukseen. Jos sinulla on kysyttävää, lähetä ne tutkimushankkeen yhteyshenkilölle.',
  research_info:
    'Ennen kuin suostut, tutustu alla olevan linkin kautta annettuun tutkimuskuvaan ja pyydä tarvittaessa lisätietoja.',
  save_and_delete: 'Tallenna ja poista',

  drag_layers_info_text:
    'Vedä kerrokset vasemmalta puolelta haluttuun kohtaan pesässä oikealla puolella. Poista taso pesästä napsauttamalla sitä ja sitten punaista roskakorikuvaketta. Pesässä voi myös vetää kerroksia sijainnin muokkaamiseksi, kerroksen väriä voi muokata napsauttamalla kerrosta.',
  New_hive: 'Uusi pesä',
  New_alertrule: 'Uusi hälytyssääntö',
  Add_alertrule: 'Lisää hälytyssääntö',
  Add_apiary: 'Lisää mehiläistarha',
  Add_sensor_definition: 'Lisää anturin määritelmä',
  Add_member: 'Lisää jäsen',
  alert_rule_deleted: 'Hälytyssääntö on poistettu',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'Huomaa: Anturimääritykset tallennetaan tai lisätään vasta sen jälkeen, kun olet napsauttanut taulukon anturimääritysrivin lopussa olevaa vihreää valintamerkkiä.',
  delete_sensordef: 'Poista anturin määritykset',
  delete_all_alerts: 'Poista kaikki hälytykset',
  delete_all_alerts_warning:
    'Haluatko varmasti poistaa kaikki hälytykset? Tätä ei voi peruuttaa.',
  delete_all_alerts_warning_filter_active:
    'Haluatko varmasti poistaa kaikki hälytykset? Myös hälytykset, jotka eivät vastaa hakutermiäsi, poistetaan. Tätä ei voi peruuttaa.',
  already_verified:
    'Olen vahvistanut sähköpostiosoitteeni ja haluaisin kirjautua sisään',
  password_recovery_resend_mail: 'Lähetä uusi vahvistuskoodi',
  alert_rule_created: 'Uusi hälytyssääntö on luotu',
  select_all: 'Valitse kaikki',
  During: '', // Ajalta but doesn't make sense in Finnish?
  Calculation_minutes: 'Kuinka usein haluat suorittaa laskennan?',
  Every: 'Joka ',
  Calculation_minutes_short: 'Kuinka usein lasketaan?',
  Alert_on_occurences_short: 'Milloin saat hälytyksen?',
  Disable_alert_for_this_hive: 'Poista hälytys tästä pesästä',
  Alert_disabled_for_this_hive: 'Hälytys on poistettu käytöstä tässä pesässä',
  disabled_for_hive: 'on poistettu pesästä',
  Alert_disabled: 'Hälytys poistettu',

  /* For import page */
  Log_data_import: 'Tuo lokitiedot ',
  Log_files: 'Lokitiedostot',
  Upload_date: 'Latauspäivä',
  Messages: 'Viestit',
  Log_time: 'Kirjaamisaika',
  File_size: 'Tiedoston koko',
  check_log_data: 'Tarkista lokitiedot',
  delete_log_file: 'Poista lokitiedosto',
  commit_log_data_short: 'Tuo lokitiedot',
  commit_log_data: 'Tuo tiedot tästä lokitiedostosta BEEP -sovellukseen:',
  // import_log_data_explanation:
  //   'BEEP -alustan sovelluksessa voit ladata lokitietoja BEEP -vaaka-alustan sisäisestä muistista. Aina kun lataat lokitietoja, sisäinen muisti tyhjennetään ja tiedot ladataan BEEP -sovellukseen. Alla on luettelo ladatuista lokitiedoista. Voit korvata tietokannan tiedot ladatuissa lokitiedostoissa olevilla tiedoilla napsauttamalla painiketta Tarkista lokitiedot. Tämä tarkistaa ensin, kuinka paljon tietoja korvataan tietokannan sisällä ja onko lokitiedoston tietojen aika oikea. Saat vahvistusruudun tuloksena tiedoista ja mahdollisuuden vahvistaa tai kieltää korvaaminen.',
  import_log_data_url_text:
    'Täältä löydät tukiartikkelin lokitietojen lataamisesta BEEP -alustan sovelluksen avulla.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/fi/support/solutions/articles/60000697129-lataa-beep-perustiedot-bluetoothin-kautta',

  // TO BE TRANSLATED TERMS
  Immediately: 'Välittömästi',
  alertrule_active_no_email_sentence:
    ', ja avaan BEEp soveluksen nähdäkseni hälytykset.',
  alertrule_active_email_sentence:
    ', ja vastaanotan hälytykset sähköpostiin. Lisäksi näen hälytykset BEEP sovelluksessa.',
  First_occurence: 'Ensimmäinen',
  Last_occurence: 'Viimeinen',
  // default alert rule names:
  Hive_stability_and_theft: 'Pesän vakaus & varkaukden esto',
  Temperature_sensor_defect: 'Lämpötila-anturin vika',
  Battery_low: 'Akun jännite alhainen',
  Honey_harvest: 'Hunaja sato',
  Hive_temperature: 'Pesän lämpötila alhainen',
  Brood_temperature: 'Pesässä sikiöitä',
  No_measurements: 'Ei mittauksia',
  Swarm: 'Parvi',
  Food_supply_low: 'Vähän ruokaa',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Pesän painon pudotus ylittää asetetun arvon',
  Temperature_sensor_malfunctions: 'Lämpötila-anturin toimintahäiriö',
  Battery_voltage_is_below_a_set_value:
    'Laitteen akun jännite on alle asetetun arvon',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Medenkeräyksestä johtuva painonnousu pysähtyy',
  Hive_temperature_drops_below_a_set_value:
    'Pesän lämpötila laskee alle asetetun arvon',
  Temperature_in_the_brood_below_a_set_value:
    'Lämpötila sikiöintialassa on laskenut alle asetetun arvon',
  No_measurement_data_received_in_a_set_time_period:
    'Mittaustietoja ei vastaanotettu määritetyn ajanjakson aikana',
  Sudden_weight_drop_triggers_alert_immediately:
    'Äkillinen pesän painon pudotus laukaisee hälytyksen välittömästi. HUOM: tämä perustuu 15 minuutin tiedonsiirtoväliin. Jos laitteessasi on eri tiedonsiirtoväli, sinun tulee säätää kynnysarvoa vastaavasti.',
  The_hive_weight_is_below_a_set_value: 'Pesän paino on alle asetetun arvon',

  minute: 'minuutti | minuutit',
  upload_interval_warning_single_interval:
    'HUOM: laitteesi tiedonsiirtoväli on | HUOM: laitteidesi tiedonsiirtoväli on', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'HUOM: laitteidesi tiedonsiirtovälit vaihtelevat välillä ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Ei merkitystä välittömässä laskennassa',
  Increase: 'Nousu',
  Decrease: 'Lasku',
  Every_hour: 'Joka tunti',
  every_hour: 'joka tunti',
  Absolute_value_of_dif: 'Muutos',
  In_case_of_good_connection_warning:
    '*Välittömästi mittauksen vastaanottamisen jälkeen. Tämä riippuu tiedonsiirtovälistä ja datayhteyden luotettavuudesta.',
  Alertrule_summary_title: 'Yhteenveto',
  Alertrule_settings_title: 'Hälytysten asetukset',
  Alertrule_exclude_title: 'Sulje pois ajanjaksot ja pesät',
  of: '', // better to omit in Finnish

  alerts_url_text: 'Lue tukiartikkeli hälytyksistä',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/fi/support/solutions/articles/60000706484-h%C3%A4lytykset',

  /* New translations v3.0.74 */
  Decline: 'Hylkää',
  Decline_invitation: 'Hylkää kutsu',
  Decline_invitation_sure: 'Oletko varma, että haluat hylätä ryhmäkutsun?',
  selection: 'selection',
  selection_placeholder: 'Select a period',
  data_zoom: 'Data zoom',
  data_zoom_ok: 'Would you like to zoom in on the data of ',
  data_zoom_out_ok: 'Would you like to zoom out to the data of ',

  Length: 'Length: ',
  match: 'match | matches',
  Matches_found: 'Matches found',
  Firmware_version: 'Firmware version',
  Interval: 'Interval',
  View_data: 'View data',
  show_all: 'Show all',
  only_active_if_measurement_present:
    '*N.B. the alert rule will only be active if the selected measurement is measured by your BEEP base / device',
  Relative_startpoint: 'Relative',

  import_log_data_explanation:
    "In the BEEP base app you can download log data from the internal memory of the BEEP base. Every time you download log data, the internal memory gets cleared and the data gets uploaded to the BEEP app. Below is the list of your downloaded log data. You can view the log data by clicking the button 'Check log data'. As a result of this check you will see blocks of data that may or may not contain matches with the database data. For each block that contains matches you can view the log data and database data in a chart, and choose to supplement the data in the database with the log data.",
  Log_data: 'Log data',
  Flashlog: 'Log',
  Block: 'Block',
  Nr_of_match_props: 'Number of identical values per match',
  no_admin: 'You must be an admin to view this page',
  next_week: 'Next week',
  prev_week: 'Previous week',
  import_block_data_short: 'Import block data',
  no_flashlog_data: 'No log data',
  no_flashlog_file: 'No log file',
  no_device: 'No device',
  data_not_stored: 'Data not stored',
  no_flashlog_found: 'No log file found',
  Match: 'Match | Matches',
  Missing_data: 'Missing data',
  not_yet_in_db: 'not yet in DB',
  From_cache: 'From cache',
  Time_diff: 'ΔTime',
  seconds_short: 'sec',
  commit_block_data:
    'Supplement BEEP app data with data from this log data block: ',
  persisted_measurements: 'Persisted measurements',
  persisted_days: 'Persisted days',
  no_data_stored: 'No data stored',
  data_stored_for_log: 'Data stored for Log ',
  Fill_holes: 'Fill holes (connect all data points)',
}

export default translations
