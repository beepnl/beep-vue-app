/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 * Translator : Marc Hillen
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  Close: 'Steng',

  /* main */
  Website: 'Nettside',
  menu: 'Meny',
  weather: 'Været',
  sensors: 'Sensor',

  Delete: 'Slett',
  Search: 'Søk...',

  /* user error messages */
  User_data: 'Bruker data',
  user_data: 'bruker data',
  updated: 'oppdatert',
  delete_complete_account:
    'Er du sikker på at du vil slette hele kontoen din, inkludert alle bigårder, bikuber og inspeksjoner? Det er uopprettelig.',
  username_is_required: 'Vennligst skriv inn brukernavnet',
  username_already_exists: 'Brukernavn finnes allerede',
  password_is_required: 'Vennligst skriv inn ett passord',
  email_is_required: 'Vennligst oppgi en e-postadresse',
  email_already_exists: 'e-postadressen er allerede i bruk',
  policy_accepted_is_required:
    'Du må godta vilkårene for bruk for å registrere deg',

  already_registered: 'Jeg er allerede registrert',
  invalid_user: 'Ukjent bruker, eller feil passord',
  no_password_match: 'Passordene stemmer ikke',
  invalid_token: 'Ugyldig kode',

  no_valid_email: 'ugyldig e-postadresse',

  empty_fields: 'Vennligst fyll inn alle feltene',
  match_passwords: 'passordene er ikke like',

  succesfully_registered: 'du er vellykket registrert.',
  authentication_failed: 'Kunne ikke autentisere',

  remove_apiary: 'Fjern bigård',
  remove_hive: 'Fjern bikube',
  remove_inspection: 'Fjern inspeksjon',

  Error: 'Feil | Feil',
  first_remove_hives:
    'OBS: det er fortsatt bikuber i denne bigården. Du kan lagre spesifikke bikuber (og deres inspeksjoner) ved først å flytte dem til en annen bigård. Hvis du fortsetter med slettingen, vil du slette ALLE bikuber og inspeksjoner som finnes på dette stedet.',

  Date: 'Dato',
  ok: 'Ok',
  add: 'Legg til ',
  create_new: 'Opprett ny',

  Cancel: 'Avbryt',

  /* login */
  login_title: 'Logg Inn',
  login: 'Logg inn',
  forgot_password: 'Glemt passordet?',

  username: 'Brukernavn',
  password: 'Passord',
  confirm_password: 'Bekreft passord',
  email: 'E-post',

  create_login_question: 'Ingen konto ennå? Registrer deg som ny bruker',
  create_login: 'Registrer deg som ny bruker',
  create_login_summary: 'Opprett en ny brukerkonto',
  save: 'Lagre',

  logout: 'Logg ut',

  /* password recovery */
  password_recovery_title: 'Glemt passordet?',
  password_recovery_remembered: 'Å, nå husket jeg passordet mitt igjen!',
  password_recovery_send_mail: 'Send bekreftelseskode',
  password_recovery_code_not_received: 'Koden ikke mottatt innen 5 minutter?',
  password_recovery_enter_code:
    'Har du allerede en bekreftelseskode? Skriv det inn her',
  password_recovery_reset_password: 'Endre passord',
  password_recovery_reminder_success:
    'En e-post er sendt. Klikk på koblingen i e-posten for å tilbakestille passordet for denne kontoen.',

  password_recovery_reset_success:
    'Passordet ditt er endret, og du er logget på.',

  new_password: 'Nytt passord',
  confirm_new_password: 'Bekreft ny passord',

  go_to_dashboard: 'Gå til dashbordet mitt',
  color: 'Farge',

  /* hives */
  Hive: 'Kube | kuber',
  hive: 'kube | kuber',
  Location: 'Bigård | Bigårder',
  location: 'bigård | bigården',
  Name: 'Navn',
  name: 'navn',
  Type: 'Type',
  type: 'type',
  inspection: 'inspeksjon | inspeksjoner',
  Inspection: 'Inspeksjon | Inspeksjoner',
  New_inspection: 'Ny inspeksjon',
  Edit_inspection: 'Rediger inspeksjon',
  Actions: 'Handlinger',
  edit: 'Rediger',
  Bee_race: 'Bi rase',
  Birth_date: 'Fødselsdato',
  Queen_colored: 'Dronning merket',
  Queen_clipped: 'Dronning klippet',
  Queen_fertilized: 'Dronning befruktet',
  Age: 'Alder',
  years_old: 'år gammel',

  /* Hive check items */
  Date_of_inspection: 'Dato for inspeksjon',
  reminder: 'Huske',
  remind_date: 'Påminnelse dato',
  overall: 'Alt i alt',
  positive_impression: 'Total inntrykk',
  needs_attention: 'Trenger oppmerksomhet',
  notes: 'Notater',
  notes_for_next_inspection:
    'Kort notat for neste inspeksjon (synlig på oversikt)',
  Not_implemented_yet: 'Dette elementet er ikke implementert ennå',

  /* dashboard */
  last_measurement: 'Siste måling',
  no_data: 'Ingen data tilgjengelig',
  no_chart_data: 'Ingen diagramdata for den valgte perioden',

  /* settings */
  General: 'Generell',
  Place: 'plassering',
  Country: 'Land',
  City: 'By',
  Address: 'Address',
  Lattitude: 'Breddegrad',
  Longitude: 'Lengdegrad',
  Street: 'Gate',
  Number: 'Nr.',
  Postal_code: 'Postnummer',
  Description: 'Beskrivelse',
  Hive_amount: 'Antall kuber',
  Hive_prefix: 'Kube-navnprefiks (før nummer)',
  Hive_number_offset: 'Startnummer bikuber',
  Hive_type: 'Bikube type',
  Hive_layers: 'Bikube lag',
  Hive_frames: 'Rammer per lag',
  Hive_color: 'Bikube farge',
  Queen: 'Dronning',
  queen: 'dronning',

  settings_title: 'Innstillinger',
  Settings: 'Innstillinger',
  settings: 'innstillinger',

  Select: 'velg',
  Poor: 'Dårlig',
  Fair: 'Ganske bra',
  Average: 'Middels',
  Average_slider: 'Gjennomsnitt',
  Good: 'Bra',
  Excellent: 'Utmerket',
  Low: 'Lav',
  Medium: 'Medium',
  High: 'Høy',
  Extreme: 'Ekstrem',

  /* colors */
  select_color: 'Velg en farge',
  advanced: 'Avansert',

  /* sensors */
  Select_sensor: 'Velg en sensor',
  temperature: 'Temperatur',
  t: 'Temperatur',
  t_0: 'Temperatur 1',
  t_1: 'Temperatur 2',
  t_2: 'Temperatur 3',
  t_3: 'Temperatur 4',
  t_4: 'Temperatur 5',
  t_5: 'Temperatur 6',
  t_6: 'Temperatur 7',
  t_7: 'Temperatur 8',
  t_8: 'Temperatur 9',
  t_9: 'Temperatur 10',
  light: 'Sollys',
  l: 'Sollys',
  water: 'Vann',
  w: 'Vekt (gammel)',
  humidity: 'Luftfuktighet',
  h: 'Luftfuktighet',
  air_pressure: 'Lufttrykk',
  p: 'Lufttrykk',
  weight: 'Vekt',
  w_v: 'Vekt sensor verdi alle sensorer',
  w_fl: 'Vekt sensorverdi foran venstre',
  w_fr: 'Vekt sensorverdi foran høyre',
  w_bl: 'Vekt sensorverdi bak venstre',
  w_br: 'Vekt sensorverdi bak høyre',
  weight_kg: 'Vekt',
  weight_kg_corrected: 'Vekt (korr)',
  weight_combined_kg: 'Vekt kombi',
  bat_volt: 'Batteri',
  bv: 'Batteri Spenning',
  sound_fanning_4days: 'Fan 4d bier',
  s_fan_4: 'Fan 4d bier',
  sound_fanning_6days: 'Fan 6d bier',
  s_fan_6: 'Fan 6d bier',
  sound_fanning_9days: 'Fan 9d bier',
  s_fan_9: 'Fan 9d bier',
  sound_flying_adult: 'Flyvende bier',
  s_fly_a: 'Flyvende bier',
  sound_total: 'Total lyd',
  s_tot: 'Total lyd',
  s_spl: 'Lydtrykknivå',
  bee_count_in: 'Antall bier inn',
  bc_i: 'Antall bier inn',
  bee_count_out: 'Antall bier ut',
  bc_o: 'Antall bier ut',
  t_i: 'Temp. På innsiden',
  rssi: 'Signal styrke',
  snr: 'Signal bråk',
  lat: 'Breddegrad',
  lon: 'Lengdegrad',
  Sound_measurements: 'Lyd målinger',
  Sensor_info: 'Sensor info',
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
  icon: 'Ikon',
  precipIntensity: 'Regn',
  precipProbability: 'Sannsynlighet for regn',
  precipType: 'Regn type',
  outsideTemperature: 'Utetemperatur',
  apparentTemperature: 'Tilsynelatende temperatur',
  dewPoint: 'duggpunkt',
  pressure: 'lufttrykk',
  windSpeed: 'Vindhastighet',
  windGust: 'Vindkast',
  windBearing: 'Vindretning',
  cloudCover: 'Skydekke',
  uvIndex: 'UV indeks',
  visibility: 'sikt',
  ozone: 'ozon',

  /* Measurements */
  Hour: 'Time',
  hour: 'time | timer',
  day: 'dag | dager',
  week: 'Uke',
  month: 'Måned',
  year: 'År',

  /* settings */
  offline: 'Ingen forbindelse',
  yes: 'Ja',
  no: 'Nei',

  Checklist: 'Sjekkliste | Sjekklister',
  checklist: 'sjekkliste | sjekklister',
  Checklist_items: 'Sjekkliste elementer',

  /* user */
  Data_export: 'Data eksport',
  Export_your_data:
    'Eksporter alle data som er i BEEP-kontoen din og send en e-post som inneholder dataene som en Excel-fil. Excel-filen har forskjellige faner som inneholder dine personlige data, bikube, plassering og inspeksjons data.',

  accept_policy:
    'Jeg godtar BEEP-vilkårene for bruk, som er kompatible med den nye europeiske personvernloven',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',

  /* General items */
  server_down:
    'Appen er utilgjengelig på grunn av vedlikeholdsarbeid, prøv igjen senere',
  add_to_calendar: 'Legg til i kalenderen',
  Whats_new: 'Ny!',
  Site_title: 'BEEP | Bie monitor',
  email_verified: 'E-postadressen din er bekreftet.',
  email_not_verified: 'E-postadressen din er ennå ikke bekreftet.',
  email_new_verification:
    'Klikk på denne lenken for å sende en ny bekreftelses-e-post.',
  email_verification_sent:
    'En melding med en bekreftelselenke er sendt til e-postadressen din. Klikk på koblingen i e-posten for å aktivere kontoen din og logge på.',
  email_verification_resent:
    'En ny melding med en bekreftelselenke er sendt til e-postadressen din. Klikk på koblingen i e-posten for å aktivere kontoen din og logge på.',

  not_filled: 'er påkrevd, men ikke fylt ut',
  cannot_deselect:
    'Kan ikke fjerne dette elementet, fordi det inneholder et obligatorisk element',
  Undelete: 'Angre sletting',
  the_field: 'De',
  is_required: 'er nødvendig',

  not_available_yet:
    'ikke tilgjengelig enda. Klikk på knappen i øvre høyre hjørne for å legge til en.',
  member: 'medlem | medlemmer',
  Member: 'Gruppe medlem | Gruppe medlemmer',
  Invited: 'Invitert',
  Invitation: 'Invitasjon | Invitasjoner',
  Admin: 'Administrator',
  Creator: 'Gruppe eier',
  Group: 'Samarbeidsgruppe | Samarbeidsgrupper',
  group: 'samarbeidsgruppe | samarbeidsgrupper',
  group_short: 'gruppe | grupper',
  to_share:
    'å dele med denne gruppen. 1 klikk = gruppemedlemmer kan kun se, 2 klikk = gruppemedlemmer kan redigere',
  Invitation_accepted: 'Invitasjon akseptert',
  Accept: 'Aksepterer',
  My_shared: 'Min delte',
  invitee_name: 'Navn på den inviterte',
  Remove_group:
    'Er du sikker på at du vil fjerne denne delte gruppen fullstendig for alle dens medlemmer',
  Detach_from_group: 'Fjern meg og bikubene mine fra denne gruppen',
  my_hive: 'Min bikube',
  created: 'opprettet',
  group_detached: 'Forlot gruppen',
  group_activated: 'Gruppe innvitasjon godtatt',
  group_declined: 'Gruppe innvitasjonen ble avslått',

  /* New translations v2.2.0 */
  roofed: 'Har bigården tak?',
  info: 'Info',

  research: 'Forskning',
  start_date: 'Start dato',
  end_date: 'Slutt dato',
  institution: 'Forsknings institusjon',
  type_of_data_used: 'Data bruk',
  link: 'Link',
  Consent: 'Samtykke',
  history: 'historie',
  Current_consent: 'Gjeldende samtykke',
  consent_yes: 'Jeg samtykker til å dele dataene mine',
  consent_no: 'Jeg samtykker IKKE til å dele dataene mine',
  my_beep_data: 'Mine egne BEEP-data',
  Consent_can_only_be_set: 'Samtykke kan kun justeres til',
  earlier: 'enn tidligere',
  later: 'enn senere',

  new_apiary_explanation: 'Lag en ny bigård i 4 trinn',
  start_here: 'Klikk her for å starte',
  optional: 'valgfri',
  dimensions: 'dimensjoner',
  details: 'detaljer',
  configuration: 'konfigurasjon',
  adjustments: 'justeringer',
  changes_queen_color: 'redigering endrer fargen',

  Brood_box_and_frame: 'Yngelkasse og ramme',
  Hive_order: 'Bikube rekkefølgen i bigården',
  bb_width_cm: 'Yngelkasse bredde (cm)',
  bb_height_cm: 'Yngelkasse høyde (cm)',
  bb_depth_cm: 'Yngelkasse lengde (cm)',
  fr_width_cm: 'Ramme bredde(cm)',
  fr_height_cm: 'Ramme høyde (cm)',
  queen_line: 'linje',
  queen_tree: 'stamtavle',
  queen_description: 'notat',
  Hive_short: 'bikube | bikuber',

  Image: 'Bilde | Bilder',
  preview: 'forhåndsvisning',

  Inside: 'Mål innvendig',
  Offset: 'Offset',
  Multiplier: 'Multiplikator',
  Input: 'Inndata',
  Output: 'Utdata',
  Last: 'Sist',

  Export_sensor_data:
    "Eksporter alle data per enhet i høyest mulig oppløsning som en .csv-fil som du kan åpne i Excel, eller SPSS. NB: Dato-klokkeslettdataene i 'klokkeslett'-kolonnen er i GMT-tid, formatert av RFC 3339 dato- og klokkesletttandarden.",
  CSV_export_separator: 'CSV-datakolonneskiller',
  Sensor_measurements: 'Sensormålinger',
  too_much_data:
    'For mye data å behandle, velg færre sensormålinger, eller reduser tidsrommet mellom start- og sluttdato.',

  beep_base_explanation:
    "Hvis du har en BEEP-base (vist på bildet ovenfor), vennligst bruk BEEP-base-appen (iOS og Android) for å sette opp kommunikasjonen med denne appen. Hvis du ikke har en BEEP-base ennå, vennligst klikk på menypunktet 'BEEP-nettsted' for oppdateringer om hvordan du får en BEEP-base. Hvis du har din egen måleenhet og ønsker å se dataene i BEEP-appen, send oss en melding for å be om å bli med i Slack-fellesskapet vårt, og du kan få tilgang til API-beskrivelsen.",

  sample_code_hive: 'Velg først en bikube for å generere en unik prøvekode',
  sample_code_generate: 'Generer unik eksempelkode',
  sample_code_delete: 'Slett den unike prøvekoden',

  measurement_interval: 'intervall',
  from_weather_service: 'fra værtjenesten',

  /* New translations v3 */
  last_visit: 'Siste besøk',
  diary: 'Dagbok',
  data: 'Data',
  photo: 'bilde | bilder',
  add_checklist: 'Legg til sjekkliste',
  add_hive: 'Legg til bikube',
  edit_apiary: 'Rediger bigård',
  new_apiary: 'Ny bigård',
  edit_group: 'Rediger samarbeidsgruppe',
  new_group: 'Ny samarbeidsgruppe',
  verification_code: 'bekreftelseskode',
  confirm_email_title: 'Bekreft e-posten din',
  confirm_email_summary:
    'Du har mottatt en bekrefteleskode i e-posten din. Skriv den inn nedenfor for å bekrefte e-postadressen din',
  confirm: 'Bekreft',
  Profile: 'Profil',
  Checklist_template: 'Sjekklistemal | Sjekklistemaler',
  Help: 'Hjelp',
  FAQ: 'FAQ',
  Support: 'Brukerstøtte',
  no_inspections: 'Legg til første inspeksjon',
  no_results: 'Ingen resultater',
  Hive_brood_layer: 'Yngelrom | Yngelrom',
  Hive_honey_layer: 'Skattekasse | Skattekasse ',
  Hive_queen_excluder_layer: 'Dronninggitter | Dronninggittere',
  Hive_feeding_box_layer: 'Forkar | Forkar',
  drag_layers: 'Dra lagene for å konfigurere bikuben',
  page: 'side | sider',
  Page: 'Side | Sider',
  not_found: 'ikke funnet',
  sorry: 'Sorry',
  delete_layer: 'Slett kubedel',
  not_saved_error: 'Data kunne ikke lagres',
  something_wrong: 'Noe gikk galt',
  not_editable: 'ikke redigerbar',
  unsaved_changes: 'Ulagrede endringer',
  save_changes:
    'Er du sikker på at du vil forlate denne siden? Eventuelle ulagrede endringer vil gå tapt.',
  no_apiaries_yet: 'Du har ingen bigårder ennå',
  need_help: 'Trenger hjelp?',
  Apiary_color: 'Bigårdsfarge',
  Set_notification_date: 'Angi varslingsdato',
  remove_image: 'Fjern bilde',
  Total_colony_size: 'Total kolonistørrelse',
  bee: 'bie | bier',
  change_checklist_confirm:
    'Er du sikker på at du vil velge en annen sjekkliste? Verdier for allerede utfylte felter beholdes.',
  view: 'Se',
  remove_queen: 'Fjern dronning',
  remove_group_short: 'Fjern samarbeidsgruppe',
  device: 'Enhet | Enheter',
  click_date_to_edit: 'Klikk på dato for å redigere.',
  accept_policy_1: 'Jeg godtar BEEP ',
  accept_policy_2: ', som er kompatible med den nye europeiske personvernloven',
  terms_of_use: 'vilkår for bruk',
  invalid_password:
    'Passord må inneholde minst 8 tegn, en liten bokstav, en stor bokstav, ett tall og ett spesialtegn (\\]{}()?\\-"!@#%&/\\,><\':; |_~`)',
  sensor_definition: 'sensordefinisjon | sensordefinisjoner',
  measurement: 'måling | målinger',
  remove_device: 'Fjern enheten',
  last_message_received: 'Siste melding mottatt',
  transmission_ratio: 'Overføringsforhold',
  period: 'Periode',
  download: 'Nedlasting',
  different_end_start: 'Slutt- og startdato må avvike',
  later_end_start: 'Startdatoen må være tidligere enn sluttdatoen',
  new_email_verification_sent:
    'En melding med en bekreftelselenke er sendt til den nye e-postadressen din. Klikk på koblingen i e-posten for å bekrefte din nye e-postadresse og logge på.',
  sensordef_info:
    "En sensordefinisjon er ment å konvertere en sensorverdi fra en innkommende 'rå' sensorverdi til en verdi i henhold til en fysisk mengde og enhet (f.eks. w_v = 1098273 => weight_kg = 62.400 kg) eller å kalibrere en sensor (f.eks. t_0 = 15,3 °C => t_0 = 15,8 °C). Dette kan gjøres ved å sette en 'offset' og en 'multiplikator'. Inn- og utgangsverdien forblir den samme hvis offset '0' og multiplikator '1' er satt. BEEP base-appen (fra App Store) vil gi deg de riktige sensordefinisjonene ved første oppsett av BEEP-basen.",
  or: 'eller',
  select_all_hives: 'Velg alle bikuber',
  select_all_editable_hives: 'Velg alle redigerbare bikuber',
  Alert: 'Varsel | Varsler',
  alert: 'varsel | varsler',
  remove_alert: 'Fjern varsel',
  alerts_enabled: 'Varsler aktivert',
  alerts_disabled: 'Varsler deaktivert',
  edit_checklist_confirm:
    'Er du sikker på at du vil redigere sjekklisten? Eventuelle ulagrede endringer i inspeksjonen din vil gå tapt.',
  edit_checklist_confirm_deselectedhives:
    'Er du sikker på at du vil redigere sjekklisten? Eventuelle ulagrede endringer i inspeksjonen og utvalget av bikube vil gå tapt.',
  user_not_edited:
    'Brukerdata er ikke redigert. Muligens er brukerdataene identiske med brukerdataene som allerede er i databasen, eller ett eller flere felt er ikke riktig utfylt. Vennligst sjekk dataene dine og prøv igjen.',
  user_not_deleted: 'Noe gikk galt, brukeren er ikke slettet.',
  edit_hive_checklist_no_touch:
    'Kryss av/fjern merket for boksene i listen nedenfor for å legge til/fjerne elementer fra sjekklisten din. Du kan også brette ut/folde og dra/slippe elementene for å omorganisere dem til din egen stil (NB: dette er ikke mulig på en berøringsskjermenhet).',
  edit_hive_checklist_touch:
    'Kryss av/fjern merket for boksene i listen nedenfor for å legge til/fjerne elementer fra sjekklisten din. Det er kun mulig å endre rekkefølgen på elementer på en stasjonær datamaskin.',
  input_not_possible_for_bulkinspection:
    'Denne varen er ikke tilgjengelig når flere bikuber er valgt for en inspeksjon, da den kun kan fylles ut per individuell bikube. Det er mulig å fylle ut dette elementet for en enkelt bikube på et senere tidspunkt, ved å redigere inspeksjonen for den bikuben.',
  save_bulkinspection_confirm:
    'Er du sikker på at du vil lagre denne inspeksjonen for flere bikuber samtidig?',
  deleted_but_not_saved_devices_warning:
    "N.B. enheter vil bare bli fjernet etter å ha klikket på 'Lagre og slett'-knappen øverst til høyre.",
  no_alerts: 'Ingen nye varsler',
  alertrule: 'varslingsregel | varslingsregler',
  alertrule_pagetitle: 'Varslingsinnstillinger',
  Measurement: 'Måling | Målinger',
  Calculation: 'Beregning',
  calculation: 'beregning',
  Direct: 'Direkte',
  After: 'Etter ',
  times: ' ganger',
  Comparator: 'Komparator',
  comparator: 'Komparator',
  Comparison: 'Sammenligning',
  comparison: 'Sammenligning',
  Threshold_value: 'Grenseverdi',
  Minimum: 'Minimum',
  Maximum: 'Maksimum',
  Derivative: 'Derivat (øke eller redusere)',
  Count: 'Telle',
  Value: 'Verdi',
  Difference: 'Forskjell',
  Absolute_value: 'Absolutt verdi',
  Absolute_value_of_dif_explanation: '**Absolutt verdi av differansen',
  Exclude_months:
    '<strong>Deactivate</strong> dette varselet i løpet av de påfølgende månedene:',
  Exclude_hours:
    '<strong>Deactivate</strong> dette varselet i løpet av de følgende timene:',
  Exclude_hives:
    '<strong>Deactivate</strong> dette varselet for følgende bikuber:',
  Exclude_hives_details:
    'N.B. Som standard vil dette varselet bli utført for alle bikuber med en måleenhet.',
  months: 'måneder',
  hours: 'timer',
  delete_alertrule: 'Slett varslingsregel',
  Active: 'Aktiv',
  Alert_via_email: 'Varsling via e-post',
  this_field: 'Dette Felt',
  alertrule_default: 'Standard varslingsregel | Standard varslingsregler',
  copy: 'Kopiere',
  Home: 'Hjem',
  Select_default_alertrule: 'Kopier standard varslingsregel',
  /* below, please keep all terms between [] as is: */
  alertrule_main_sentence:
    'Jeg vil gjerne motta et varsel hvis [calculation] [comparison] av [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Denne beregningen vil bli utført [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', og jeg vil gjerne motta varselet direkte. ',
  alertrule_exclude_months_sentence:
    'Dette varselet vil bli deaktivert i løpet av de påfølgende månedene: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Dette varselet vil bli deaktivert i løpet av de følgende timene: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Dette varselet vil bli deaktivert for følgende bikuber: [exclude_hive_ids].',
  min: 'minimum',
  max: 'maksimum',
  ave: 'gjennomsnitt',
  der: 'derivat',
  cnt: 'telle',
  equal_to: 'er lik',
  less_than: 'er mindre enn',
  greater_than: 'er større enn',
  less_than_or_equal: 'er mindre enn eller lik',
  greater_than_or_equal: 'er større enn eller lik',
  alertrule_not_active:
    "Dette varselet er deaktivert. Du kan aktivere den ved å merke av i 'Aktiv'-boksen og lagre denne varslingsregelen.",
  export_email_sent: 'E-post med Excel-fil er sendt',
  export_file_saved: 'Excel-filen er lagret i nedlastingsmappen',
  Updated_at: 'Oppdatert kl.',
  Not_yet_saved: 'Ikke lagret ennå',
  add_own_device: 'legge til egen enhet',
  devices_info_text:
    'Vennligst merk: eier du en BEEP-base? Bruk BEEP base-appen for å legge til enheten din. Den vil da automatisk vises i listen nedenfor.',
  devices_url_text: 'Her kan du finne mer informasjon om BEEP base-appen.',
  alert_explanation_1:
    'Hvis du eier en BEEP-base eller en annen enhet, kan du angi varsler, slik at du vil motta et varsel når måledataene oppfyller visse krav. For eksempel en plutselig vektnedgang på grunn av sverming. Varsler vil vises i denne appen, du kan velge å motta dem via e-post også.',
  alert_explanation_2:
    'For å komme i gang er det noen få standard varslingsregler du kan bruke (og tilpasse til dine egne behov). I tillegg kan du lage dine egne varslingsregler.',
  alertrules_url_text:
    "Gå til 'Varslingsinnstillinger' for å lage din første varslingsregel",
  Apiary_management: 'Bigårdsdrift',
  Move: 'flytt',
  Current_apiary: 'Nåværende bigård',
  sensor_key: 'Unik identifikator for enheten',
  disabled_settings:
    'Manuell redigering av disse innstillingene er deaktivert.',
  Address_placeholder: 'Nummer, gatenavn, by',
  first_create_apiary: 'Først lager du en bigård',
  Unknown: 'Ukjent',
  unknown: 'ukjent',
  research_warning:
    'Vennligst merk: hvis du ikke har mottatt en invitasjon til å delta, er det ikke nødvendig å gi samtykke til å dele dataene dine, da dataene dine ikke vil bli brukt i så fall.',
  research_explanation_p1:
    'BEEP-plattformen brukes i forskningsprosjektene som er listet opp nedenfor. Etter at du er invitert til å delta i et forskningsprosjekt, må du gi samtykke for at forskerne skal få tilgang til biedataene dine.',
  research_explanation_p2:
    'Du kan når som helst trekke tilbake samtykket ditt. Fra det øyeblikket og utover vil ingen nye data bli delt. Dataene du delte i perioden du ga samtykke til, vil forbli tilgjengelig for forskningen. Ved spørsmål, vennligst rett disse til kontaktpersonen for ditt forskningsprosjekt.',
  research_info:
    'Før du samtykker, vennligst se gjennom forskningsbeskrivelsen gitt via lenken nedenfor og be om ytterligere detaljer om nødvendig.',
  save_and_delete: 'Lagre og slett',
  drag_layers_info_text:
    'Dra lag fra venstre side til ønsket posisjon i bikuben på høyre side. Slett et lag fra bikuben ved å klikke på det og deretter klikke på det røde søppelikonet. Innenfor bikuben kan lag også dras for å redigere posisjonen, lagfarge kan redigeres ved å klikke på laget.',
  New_hive: 'Ny bikube',
  New_alertrule: 'Ny varslingsregel',
  Add_alertrule: 'Legg til varslingsregel',
  Add_apiary: 'Legg til bigård',
  Add_sensor_definition: 'Legg til sensordefinisjon',
  Add_member: 'Legg til medlem',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. sensordefinisjoner vil bare bli lagret eller lagt til etter å ha klikket på det grønne hakeikonet på slutten av sensordefinisjonsraden i tabellen.',
  delete_sensordef: 'Slett sensordefinisjon',
  delete_all_alerts: 'Slett alle varsler',
  delete_all_alerts_warning:
    'Er du sikker på at du vil slette alle varsler? Dette kan ikke angres.',
  delete_all_alerts_warning_filter_active:
    'Er du sikker på at du vil slette alle varsler? Varsler som ikke samsvarer med søkeordet ditt vil også bli slettet. Dette kan ikke angres.',
  already_verified:
    'Jeg har bekreftet e-postadressen min og vil gjerne logge inn',
  password_recovery_resend_mail: 'Send ny bekreftelseskode',
  alert_rule_created: 'Ny varslingsregel er opprettet',
  alert_rule_deleted: 'Varslingsregel er slettet',
  deactivate_for_all_hives: 'Deaktiver varsling for alle bikuber',
  select_all: 'Velg alle',
  During: 'mens',
  Every: 'Hver ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  Calculation_minutes: 'Hvor ofte vil du at beregningen skal utføres?',
  Calculation_minutes_short: 'Hvor ofte beregnes det?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Deaktiver varsling for denne bikuben',
  Alert_disabled_for_this_hive: 'Varsling er deaktivert for denne bikuben',
  disabled_for_hive: 'har blitt deaktivert for bikube', // [alert] has been disabled for the following hive
  Alert_disabled: 'Alarm deaktivert',

  Log_data_import: 'Importer loggdata',
  Log_files: 'Log files', // Flashlogs
  Upload_date: 'opplastnings dato',
  Messages: 'Meldinger',
  Log_time: 'Tid logget',
  File_size: 'Filstørrelse',
  check_log_data: 'Sjekk loggdata', // Check_flashlog
  delete_log_file: 'Slett loggfil', // Delete_flashlog
  commit_log_data_short: 'Importer loggdata', // commit_flashlog_short
  commit_log_data: 'Importer data fra denne loggfilen til BEEP-appen: ', // commit_flashlog
  // flashlog_explanation
  import_log_data_explanation:
    "I BEEP base-appen kan du laste ned loggdata fra internminnet til BEEP-basen. Hver gang du laster ned loggdata, tømmes internminnet og dataene lastes opp til BEEP-appen. Nedenfor er listen over dine nedlastede loggdata. Du kan se loggdataene ved å klikke på knappen 'Sjekk loggdata'. Som et resultat av denne kontrollen vil du se blokker med data som kanskje inneholder samsvar med databasedataene. For hver blokk som inneholder treff kan du se loggdata og databasedata i et diagram, og velge å supplere dataene i databasen med loggdata.",
  // flashlog_url_text
  import_log_data_url_text:
    'Her finner du støtteartikkelen om nedlasting av loggdata med BEEP base-appen.',
  // flashlog_support_url
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000697129-download-beep-base-data-through-bluetooth',

  Immediately: 'Umiddelbart',
  alertrule_active_no_email_sentence:
    ', og jeg åpner BEEP-appen for å se varslene.',
  alertrule_active_email_sentence:
    ', og jeg mottar varsler via e-post. I tillegg kan jeg se varslene i BEEP-appen.',
  First_occurence: 'Først',
  Last_occurence: 'Sist',
  // default alert rule names:
  Hive_stability_and_theft: 'Kube stabilitet og tyveri',
  Temperature_sensor_defect: 'Temperaturføler defekt',
  Battery_low: 'Lav batterispenning',
  Honey_harvest: 'Honninghøst',
  Hive_temperature: 'Bikubetemperatur lav',
  Brood_temperature: 'Yngel temperatur lav',
  No_measurements: 'Ingen målinger',
  Swarm: 'Sverm',
  Food_supply_low: 'Mattilgang lav',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Vektfallet av bikuben er over en fastsatt verdi',
  Temperature_sensor_malfunctions: 'Feil på temperatursensoren',
  Battery_voltage_is_below_a_set_value:
    'Batterispenningen til enheten er under en innstilt verdi',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Vektøkning på grunn av nektarinnsamling stopper opp',
  Hive_temperature_drops_below_a_set_value:
    'Bikubetemperaturen synker under en innstilt verdi',
  Temperature_in_the_brood_below_a_set_value:
    'Temperaturen i yngelen har sunket under en innstilt verdi',
  No_measurement_data_received_in_a_set_time_period:
    'Ingen måledata mottatt i løpet av en bestemt tidsperiode',
  Sudden_weight_drop_triggers_alert_immediately:
    'Plutselig vektreduksjon av bikuben utløser et varsel umiddelbart. N.B. dette er basert på et dataoverføringsintervall på 15 minutter. Hvis enheten din har et annet dataoverføringsintervall, bør du justere terskelverdien tilsvarende.',
  The_hive_weight_is_below_a_set_value:
    'Bikubevekten er under en fastsatt verdi',

  minute: 'minutt | minutter',
  upload_interval_warning_single_interval:
    'N.B. dataoverføringsintervallet til enheten din er | N.B. dataoverføringsintervallet til enhetene dine er', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'N.B. dataoverføringsintervallene til enhetene dine varierer mellom ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Ikke relevant for umiddelbar beregning',
  Increase: 'Øke',
  Decrease: 'Avta',
  Every_hour: 'Hver time',
  every_hour: 'hver time',
  Absolute_value_of_dif: 'Endring', // context: 'Change' is an easier to understand word than 'the absolute value of the difference' between 2 values.
  In_case_of_good_connection_warning:
    '*Umiddelbart etter at en måling er mottatt. Dette er avhengig av dataoverføringsintervallet og påliteligheten til dataforbindelsen.',
  Alertrule_summary_title: 'Sammendrag',
  Alertrule_settings_title: 'Innstillinger for varselregel',
  Alertrule_exclude_title: 'Utelukk perioder og bikuber',
  of: 'of',

  alerts_url_text: 'Les støtteartikkelen om varsler',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-alerts',

  /* New translations v3.0.74 */
  Decline: 'Avslå',
  Decline_invitation: 'Avslå invitasjonen',
  Decline_invitation_sure:
    'Er du sikker på at du vil avslå gruppeinvitasjonen?',
  selection: 'utvalg',
  selection_placeholder: 'Velg en periode',
  data_zoom: 'Datazoom',
  data_zoom_ok: 'Ønsker du å zoome inn på dataene til ',
  data_zoom_out_ok: 'Ønsker du å zoome ut til dataene til ',

  Length: 'Lengde: ',
  match: 'match | matches',
  Matches_found: 'Matcher funnet',
  Firmware_version: 'Fastvareversjon',
  Interval: 'Intervall',
  View_data: 'Se data',
  show_all: 'Vis alle',
  only_active_if_measurement_present:
    '*NB. varselregelen vil bare være aktiv hvis den valgte målingen er målt av din BEEP-base/enhet. BEEP-baser måler ikke værdata.',
  Relative_startpoint: 'Relativ',

  Log_data: 'Loggdata',
  Flashlog: 'Logg',
  Block: 'Blokkere',
  Nr_of_match_props: 'Antall identiske verdier per treff',
  no_admin: 'Du må være administrator for å se denne siden',
  next_week: 'Neste uke',
  prev_week: 'Forrige uke',
  import_block_data_short: 'Importer blokkdata',
  no_flashlog_data: 'Ingen loggdata',
  no_flashlog_file: 'Ingen loggfil',
  no_device: 'Ingen enhet',
  data_not_stored: 'Data ikke lagret',
  no_flashlog_found: 'Ingen loggfil funnet',
  Size: 'Størrelse',
  Match: 'Treff | Treffer',
  Missing_data: 'Manglende data',
  not_yet_in_db: 'ennå ikke i DB',
  From_cache: 'Fra cache',
  Time_diff: 'ΔTid',
  seconds_short: 'sec',
  commit_block_data: 'Suppler BEEP-appdata med data fra denne loggdatablokken:',
  persisted_measurements: 'Vedvarende målinger',
  persisted_days: 'Vedvarte dager',
  no_data_stored: 'Ingen data lagret',
  data_stored_for_log: 'Data lagret for Log ',
  Fill_holes: 'Fyll hull (koble til alle datapunkter)',

  Data_imported: 'Data importert',
  undo_import: 'Angre import',
  undo_block_import_exp:
    'Er du sikker på at du vil slette tidligere importerte data fra denne blokken fra databasen?',
  data_deleted: 'Data slettet',
  data_not_deleted: 'Data ikke slettet',
  deleted_measurements: 'Slettede målinger',
  deleted_days: 'slettede dager',
  Memory_erased: 'BEEP baseminne tømt',
  Export: 'Eksport',
  Export_as_json: 'Eksporter som JSON-data',
  Export_as_csv: 'Eksporter som .csv-fil',
  Export_full_json: 'Eksporter full JSON',
  Export_full_csv: 'Eksporter full .csv',

  Now: 'Now',
  input_only_possible_when_date_present:
    "Please select a 'date of inspection' first (above), to enable the inspection form. Click 'Now' to fill in the current date and time.",
  select_inspection_date: 'Select date of inspection',
  View_inspection_confirm: 'Would you like to view the inspection of: ',

  /* Translations page */
  Translations: 'Translations',
  translation_exp:
    'To become a translator, please request a translator account via support@beep.nl. If you would like to update translations, please download the .js file below and email the updated file to support@beep.nl. Thank you for your effort!',
  unpublished_exp: 'Translations that are yet unpublished:',
  as_plain_text: 'as plain text',
}

export default translations
