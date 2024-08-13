/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ],
  monthsShort: [
    'jan',
    'feb',
    'maa',
    'apr',
    'mei',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'dec',
  ],
  Close: 'Sluiten',

  /* main */
  Website: 'Website',
  menu: 'Menu',
  lighting: 'Sfeerverlichting',
  camera: 'Camera',
  weather: 'Weer',
  sensors: 'Sensoren',
  Delete: 'Verwijderen',
  Search: 'Zoeken...',

  /* user error messages */
  User_data: 'Gebruikersgegevens',
  user_data: 'gebruikersgegevens',
  updated: 'aangepast',
  delete_complete_account:
    'Weet je zeker dat je je volledige account, inclusief alle bijenstaden, kasten en inspecties wilt verwijderen? Dit is niet terug te draaien.',
  username_is_required: 'Vul een gebruikersnaam in.',
  username_already_exists: 'De gebruikersnaam is al in gebruik',
  password_is_required: 'Vul een wachtwoord in.',
  email_is_required: 'Vul een e-mailadres in',
  email_already_exists: 'Het e-mailadres is al in gebruik',
  policy_accepted_is_required:
    'Om te registreren, dien je de Servicevoorwaarden te accepteren',

  already_registered: 'Ik heb al een account',
  invalid_user: 'Gebruikersnaam of wachtwoord incorrect',
  no_password_match: 'De wachtwoorden komen niet overeen',
  invalid_token: 'Ongeldige code',

  no_valid_email: 'Ongeldig e-mailadres',

  empty_fields: 'U heeft niet alle velden goed ingevuld.',
  match_passwords: 'De wachtwoorden komen niet overeen.',

  succesfully_registered: 'Je bent succesvol geregistreerd.',
  authentication_failed: 'Inloggen niet gelukt',

  remove_apiary: 'Verwijder bijenstand',
  remove_hive: 'Verwijder kast',
  remove_inspection: 'Verwijder inspectie',

  Error: 'Fout | Fouten',
  first_remove_hives:
    'Let op: er zijn nog kasten op deze bijenstand aanwezig. U kunt specifieke kasten (en hun inspecties) bewaren door ze eerst te verplaatsen naar een andere bijenstand. Als u doorgaat met verwijderen, verwijdert u ALLE kasten en inspecties die op deze locatie aanwezig zijn.',

  Date: 'Datum',
  ok: 'Ok',
  prev: 'vorige',
  next: 'volgende',
  add: 'Toevoegen',
  Cancel: 'Annuleren',

  /* login */
  login_title: 'Inloggen',
  login: 'Aanmelden',
  forgot_password: 'Wachtwoord vergeten?',

  username: 'Gebruikersnaam',
  password: 'Wachtwoord',
  confirm_password: 'Bevestig wachtwoord',
  email: 'E-mail',

  create_login_question:
    'Nog geen account? Registreer als een nieuwe gebruiker',
  create_login: 'Registreer als een nieuwe gebruiker',
  create_login_summary: 'Creëer een nieuw account',
  save: 'Opslaan',

  logout: 'Uitloggen',
  logout_title: 'Uitloggen als ',
  logout_now: 'Weet je zeker dat je wil uitloggen?',
  member_since: 'BEEPt sinds',

  /* password recovery */
  password_recovery_title: 'Wachtwoord vergeten?',
  password_recovery_remembered: 'Oh wacht, ik weet mijn wachtwoord weer!',
  password_recovery_send_mail: 'Verstuur code',
  password_recovery_code_not_received: 'Code niet ontvangen binnen 5 minuten?',
  password_recovery_enter_code: 'Voer de ontvangen code in',
  password_recovery_reset_password: 'Verander wachtwoord',
  password_recovery_reminder_success:
    'Er is een e-mail verstuurd, klik op de link in de e-mail om uw wachtwoord opnieuw in te stellen.',

  password_recovery_reset_success:
    'Je wachtwoord is succesvol aangepast, je bent nu ingelogd.',

  new_password: 'Nieuw wachtwoord',
  confirm_new_password: 'Bevestig nieuw wachtwoord',

  go_to_dashboard: 'Ga direct naar het overzicht',

  /* overview */
  overview_title: 'Overzicht',
  overview: 'Overzicht',
  color: 'Kleur',
  state: 'Stand',
  climate: 'Klimaatregeling',
  plant_state: 'Status planten',
  connection_state: 'Status verbinding',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
  Hive: 'Kast | Bijenkasten',
  hive: 'kast | bijenkasten',
  Location: 'Bijenstand | Bijenstanden',
  location: 'bijenstand | bijenstanden',
  Name: 'Naam',
  name: 'naam',
  Type: 'Type',
  type: 'type',
  inspection: 'inspectie | inspecties',
  Inspection: 'Inspectie | Inspecties',
  New_inspection: 'Nieuwe inspectie',
  Edit_inspection: 'Inspectie aanpassen',
  Action: 'Actie | Acties',
  Conditions: 'Bevindingen (geïnspecteerd)',
  edit: 'Aanpassen',
  Bee_race: 'Bijenras',
  Birth_date: 'Geboortedatum',
  Queen_colored: 'Moer gemerkt',
  Queen_clipped: 'Moer geknipt',
  Queen_fertilized: 'Moer bevrucht',
  Age: 'Leeftijd',
  years_old: 'jaar oud',

  /* Hive check items */
  Date_of_inspection: 'Inspectiedatum',
  reminder: 'Herinnering',
  remind_date: 'Herinneringsdatum',
  condition: 'Inspectie',
  overall: 'Algemeen',
  positive_impression: 'Totaalindruk',
  needs_attention: 'Extra aandacht nodig',
  notes: 'Notities',
  notes_for_next_inspection:
    'Korte notitie voor volgende inspectie (zichtbaar in overzicht)',
  Not_implemented_yet: 'Dit item is nog niet geïmplementeerd',
  save_input_first: 'Wil je je ingevoerde gegevens eerst opslaan?',

  /* dashboard */
  last_measurement: 'Laatste meetwaarde',
  measurement_system: 'BEEP meetsysteem',
  no_data: 'Geen data beschikbaar',
  no_chart_data: 'Geen sensordata beschikbaar voor de geselecteerde periode',

  /* settings */
  General: 'Algemeen',
  Place: 'Locatie',
  Country: 'Land',
  City: 'Stad',
  Address: 'Adres',
  latitude: 'Breedtegraad',
  Longitude: 'Lengtegraad',
  Street: 'Straat',
  Number: 'Nr.',
  Postal_code: 'Postcode',
  Description: 'Beschrijving',
  Hive_amount: 'Aantal kasten',
  Hive_prefix: 'Kastnaam voorvoegsel (vòòr nummer)',
  Hive_number_offset: 'Startnummer kasten',
  Hive_type: 'Kasttype',
  Hive_layers: 'Kamers per kast',
  Hive_frames: 'Ramen per kamer',
  Hive_color: 'Kastkleur',
  Queen: 'Moer',
  queen: 'moer',

  settings_title: 'Instellingen overzicht',
  Settings: 'Instellingen',
  settings: 'instellingen',

  Select: 'Selecteer',
  Not_selected: 'Niet geselecteerd',
  Poor: 'Slecht',
  Fair: 'Matig',
  Average: 'Gemiddelde',
  Average_slider: 'Gemiddeld',
  Good: 'Goed',
  Excellent: 'Zeer goed',
  Low: 'Laag',
  Medium: 'Gemiddeld',
  High: 'Hoog',
  Extreme: 'Extreem',

  /* colors */
  select_color: 'Selecteer een kleur',
  advanced: 'Geavanceerd',

  /* sensors */
  Select_sensor: 'Selecteer een sensor',
  t: 'Temperatuur',
  t_0: 'Temperatuur 1',
  t_1: 'Temperatuur 2',
  t_2: 'Temperatuur 3',
  t_3: 'Temperatuur 4',
  t_4: 'Temperatuur 5',
  t_5: 'Temperatuur 6',
  t_6: 'Temperatuur 7',
  t_7: 'Temperatuur 8',
  t_8: 'Temperatuur 9',
  t_9: 'Temperatuur 10',
  //   temperature: 'Temperatuur',
  l: 'Zonlicht',
  light: 'Zonlicht',
  water: 'Water',
  w: 'Gewicht (oud)',
  humidity: 'Luchtvochtigheid',
  h: 'Luchtvochtigheid',
  air_pressure: 'Luchtdruk',
  p: 'Luchtdruk',
  weight: 'Gewicht',
  w_v: 'Gewicht sensorwaarde gecombineerd',
  w_fl: 'Gewicht sensorwaarde links voor',
  w_fr: 'Gewicht sensorwaarde rechts voor',
  w_bl: 'Gewicht sensorwaarde links achter',
  w_br: 'Gewicht sensorwaarde rechts achter',
  weight_kg: 'Gewicht',
  weight_kg_corrected: 'Gewicht (corr)',
  weight_combined_kg: 'Gewicht combi',
  bat_volt: 'Batterij',
  bv: 'Batterij voltage',
  sound_fanning_4days: 'Vent 4d bijen',
  s_fan_4: 'Vent 4d bijen',
  sound_fanning_6days: 'Vent 6d bijen',
  s_fan_6: 'Vent 6d bijen',
  sound_fanning_9days: 'Vent 9d bijen',
  s_fan_9: 'Vent 9d bijen',
  sound_flying_adult: 'Vlieggeluid',
  s_fly_a: 'Vlieggeluid',
  sound_total: 'Totaal geluid',
  s_tot: 'Totaal geluid',
  s_spl: 'Geluidsdruk',
  bee_count_in: 'Bijen naar binnen',
  bc_i: 'Bijen naar binnen',
  bee_count_out: 'Bijen naar buiten',
  bc_o: 'Bijen naar buiten',
  t_i: 'Temp. in kast',
  rssi: 'Zendsterkte',
  snr: 'Zendruis',
  lat: 'Noorderbreedte',
  lon: 'Oosterlengte',
  Sound_measurements: 'Geluidsmetingen',
  Sensor_info: 'Sensorinformatie',
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
  icon: 'Icoon',
  precipIntensity: 'Regenval',
  precipProbability: 'Kans op regen',
  precipType: 'Soort regen',
  temperature: 'Buitentemperatuur',
  apparentTemperature: 'Schijnbare temperatuur',
  dewPoint: 'Douwpunt',
  //   humidity: 'Luchtvochtigheid',
  pressure: 'Luchtdruk',
  windSpeed: 'Windsnelheid',
  windGust: 'Windstoten',
  windBearing: 'Windrichting',
  cloudCover: 'Bewolking',
  uvIndex: 'UV index',
  visibility: 'Zicht',
  ozone: 'Ozon',

  /* Measurements */
  Hour: 'Uur',
  hour: 'uur | uur',
  day: 'dag | dagen',
  week: 'Week',
  month: 'Maand',
  year: 'Jaar',

  /* settings */
  offline: 'Geen verbinding',
  yes: 'Ja',
  no: 'Nee',

  Checklist: 'Kastkaart | Kastkaarten',
  checklist: 'kastkaart | kastkaarten',
  Checklist_items: 'Kastkaartelementen',

  /* user */
  Data_export: 'Data exporteren',
  Export_your_data:
    'Exporteer alle data die is opgeslagen in je BEEP account en verstuur deze in een e-mail met als bijlage een Excel (.xslx) bestand OF download dit bestand hier. Het bestand heeft meerdere tabbladen met daarop je persoonlijke-, bijenstand-, kast- en inspectiegegevens.',
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Voeg samenwerkingsgroepsdata toe aan export',
  Include_sensor_data:
    'Voeg links naar bestanden met sensordata toe aan export',

  accept_policy:
    'Ik accepteer de BEEP servicevoorwaarden, die in lijn zijn met de nieuwe Europese privacywetgeving',
  policy_url: 'https://beep.nl/servicevoorwaarden',
  policy_version: 'beep_terms_2018_05_25_avg_v1',

  /* General items */
  server_down:
    'De app is tijdelijk niet beschikbaar door onderhoud, probeer het later opnieuw',
  add_to_calendar: 'Zet in agenda',
  Whats_new: 'Nieuw!',
  Site_title: 'BEEP | Bijenmonitor',
  email_verified: 'Je e-mail adres is gevalideerd.',
  email_not_verified: 'Je e-mail adres is nog niet gevalideerd.',
  email_new_verification:
    'Klik op deze link om een nieuwe validatie e-mail te versturen.',
  email_verification_sent:
    'Er is een bericht met een validatie-link naar je e-mail adres gestuurd. Klik op de link in de e-mail om je account te activeren en in te loggen.',
  email_verification_resent:
    'Er is een nieuw bericht met een validatie-link naar je e-mail adres gestuurd. Klik op de link in de e-mail om je account te activeren en in te loggen.',

  not_filled: 'is verplicht, maar niet ingevuld',
  cannot_deselect:
    'Dit item kan niet worden verwijderd, omdat het een verplicht item bevat',
  Undelete: 'Toch niet verwijderen',
  the_field: 'Het veld',
  is_required: 'is verplicht',

  not_available_yet:
    'nog niet beschikbaar. Maak de eerste aan door op de knop in de rechter bovenhoek te drukken.',
  member: 'groepslid | groepsleden',
  Member: 'Groepslid | Groepsleden',
  Invited: 'Uitgenodigd',
  Invitation: 'Uitnodiging | Uitnodigingen',
  Admin: 'Beheerder',
  Creator: 'Groep eigenaar',
  Group: 'Samenwerkingsgroep | Samenwerkingsgroepen',
  group: 'samenwerkingsgroep | samenwerkingsgroepen',
  group_short: 'groep | groepen',
  to_share:
    'om te delen met de groep. 1x klikken = delen om te bekijken, 2x klikken is delen met aanpassingsmogelijkheid',
  Invitation_accepted: 'Uitnodiging geaccepteerd',
  Accept: 'Accepteer',
  My_shared: 'Mijn gedeelde',
  invitee_name: 'Naam genodigde',
  Remove_group:
    'Weet u zeker dat u deze gedeelde groep voor alle leden wilt verwijderen',
  Detach_from_group: 'Verwijder mij en mijn kasten uit deze groep',
  my_hive: 'Mijn kast',
  created: 'aangemakt',
  group_detached: 'Succesvol uit de groep gestapt',
  group_activated: 'Groepsuitnodiging geaccepteerd',
  group_declined: 'Groupsuitnodiging afgewezen',
  group_explanation_1:
    '1. Maak een nieuwe samenwerkingsgroep aan met een duidelijke titel en evt. beschrijving',
  group_explanation_2:
    '2. Nodig andere BEEP gebruikers uit op hun BEEP e-mail adres',
  group_explanation_3:
    '3. Deel specifieke kasten om te bekijken, of om samen aan te werken',
  Filter_and_sort_on: 'Filter en sorteer op:',

  /* New translations v2.2.0 */
  info: 'Info',
  research: 'Onderzoek',
  roofed: 'Heeft de bijenstand een dak?',
  start_date: 'Startdatum',
  end_date: 'Einddatum',
  institution: 'Onderzoeksinstituut',
  type_of_data_used: 'Gebruik data',
  link: 'Link',
  Consent: 'Toestemming',
  history: 'geschiedenis',
  Current_consent: 'Huidige toestemming',
  consent_yes: 'Ik sta toe mijn data te gebruiken',
  consent_no: 'Ik sta NIET toe mijn data te gebruiken',
  my_beep_data: 'Mijn eigen BEEP gegevens',
  Consent_can_only_be_set: 'Toestemming kan alleen aangepast worden naar',
  earlier: 'een eerdere',
  later: 'een latere',

  new_apiary_explanation: 'Maak een nieuwe bijenstand in 4 stappen',
  start_here: 'Begin hier',
  optional: 'optioneel',
  dimensions: 'afmetingen',
  details: 'details',
  configuration: 'configuratie',
  adjustments: 'aanpassingen',
  changes_queen_color: 'wijzigen past de kleur aan',

  Brood_box_and_frame: 'Broedkamer- en raam',
  Hive_order: 'Kastvolgorde op bijenstand',
  bb_width_cm: 'Broedkamerbreedte (cm)',
  bb_height_cm: 'Broedkamerhoogte (cm)',
  bb_depth_cm: 'Broedkamerdiepte (cm)',
  fr_width_cm: 'Raambreedte (cm)',
  fr_height_cm: 'Raamhoogte (cm)',
  queen_line: 'lijn',
  queen_tree: 'stamboom',
  queen_description: 'notitie',
  Hive_short: 'Kast | Kasten',

  Image: 'Afbeelding | Afbeeldingen',
  preview: 'voorbeeld',

  Inside: 'Meet binnen',
  Offset: 'Offset',
  Multiplier: 'Multiplier',
  Input: 'Input',
  Output: 'Output',
  Last: 'Laatste',

  Export_sensor_data:
    "Exporteer alle sensordata in de hoogst beschikbare resolutie per meetapparaat in een .csv bestand dat je in Excel of SPSS kunt openen. Let op dat de datum/tijdaanduiding in de 'time' kolom altijd in GMT tijd is, opgemaakt volgens de RFC 3339 standaard.",
  CSV_export_separator: 'CSV data kolomscheidingsteken',
  Sensor_measurements: 'Sensormetingen',
  too_much_data:
    'Te veel data om te exporteren. Selecteer minder Sensormetingen en/of beperk de tijdspanne tussen start en einddatum.',

  beep_base_explanation:
    "Als je een BEEP-base hebt (zoals getoond in het bovenstaande afbeelding), gebruik dan de BEEP base app (iOS en Android) om de communicatie met deze app in te stellen. Als je nog geen BEEP-base hebt, klik dan op het menu item 'BEEP website' voor updates over hoe je aan een BEEP-base kunt komen. Als je je eigen meetapparaat hebt en de gegevens graag in de BEEP-app wilt zien, stuur ons dan een bericht met het verzoek om lid te worden van onze Slack-community en je krijgt toegang tot de API-beschrijving.",

  sample_code_hive:
    'Selecteer eerst een kast om een unieke sample code te kunnen genereren',
  sample_code_generate: 'Genereer een unieke sample code',
  sample_code_delete: 'Verwijder deze unieke sample code',

  measurement_interval: 'interval',
  from_weather_service: 'van nabij weerstation',

  /* New translations v3 */
  last_visit: 'Laatste bezoek',
  diary: 'Logboek',
  data: 'Data',
  photo: "foto | foto's",
  add_checklist: 'Voeg kastkaart toe',
  add_hive: 'Voeg kast toe',
  edit_apiary: 'Aanpassen bijenstand',
  new_apiary: 'Nieuwe bijenstand',
  edit_group: 'Aanpassen samenwerkingsgroep',
  new_group: 'Nieuwe samenwerkingsgroep',
  verification_code: 'verificatiecode',
  confirm_email_title: 'Bevestig e-mailadres',
  confirm_email_summary:
    'U heeft een e-mail met een verificatiecode ontvangen. Vul deze hieronder in om uw e-mailadres te verifiëren',
  confirm: 'Bevestig',
  Profile: 'Profiel',
  Checklist_template: 'Kastkaart template | Kastkaart templates',
  Help: 'Help',
  FAQ: 'Veelgestelde vragen',
  Support: 'Support',
  no_inspections: 'Voer eerste inspectie in',
  no_results: 'Geen resultaten',
  Hive_brood_layer: 'Broedkamer | Broedkamers',
  Hive_honey_layer: 'Honingkamer | Honingkamers',
  Hive_queen_excluder_layer: 'Koninginnenrooster | Koninginnenroosters',
  Hive_feeding_box_layer: 'Voederbak | Voederbakken',
  overrides_layer_colors: 'overschrijft kamerkleuren',
  drag_layers: 'Versleep kamers om bijenkast te configureren',
  page: "pagina | pagina's",
  Page: "Pagina | Pagina's",
  not_found: 'niet gevonden',
  sorry: 'Sorry',
  delete_layer: 'Verwijder laag',
  not_saved_error: 'Data kon niet worden opgeslagen',
  something_wrong: 'Er is iets misgegaan',
  not_editable: 'niet aanpasbaar',
  unsaved_changes: 'Niet opgeslagen aanpassingen',
  save_changes:
    'Weet je zeker dat je deze pagina wilt verlaten? Niet opgeslagen aanpassingen zullen verloren gaan.',
  no_apiaries_yet: 'Je hebt nog geen bijenstanden',
  need_help: 'Hulp nodig?',
  Apiary_color: 'Bijenstand kleur',
  Set_notification_date: 'Stel herinneringsdatum in',
  remove_image: 'Verwijder afbeelding',
  Total_colony_size: 'Totale grootte bijenvolk',
  bee: 'bij | bijen',
  change_checklist_confirm:
    'Weet je zeker dat je een andere kastkaart wilt selecteren? Waardes van reeds ingevulde velden zullen behouden blijven.',
  view: 'Bekijk',
  remove_queen: 'Verwijder koningin',
  remove_group_short: 'Verwijder samenwerkingsgroep',
  device: 'Meetsysteem | Meetsystemen',
  click_date_to_edit: 'Klik op de datum om deze aan te passen.',
  accept_policy_1: 'Ik accepteer de BEEP ',
  accept_policy_2: ', die in lijn zijn met de nieuwe Europese privacywetgeving',
  terms_of_use: 'servicevoorwaarden',
  invalid_password:
    'Wachtwoord moet minimaal 8 tekens, een kleine letter, een hoofdletter, een cijfer en een bijzonder teken (\\]{}()?\\-"!@#%&/\\,><\':;|_~`) bevatten',
  sensor_definition: 'sensor definitie | sensor definities',
  measurement: 'meting | metingen',
  remove_device: 'Verwijder meetsysteem',
  last_message_received: 'Laatste bericht ontvangen',
  transmission_ratio: 'Transmissieratio',
  period: 'Periode',
  download: 'Download',
  different_end_start: 'Eind- en startdatum moeten verschillen',
  later_end_start: 'Startdatum moet eerder zijn dan dan de einddatum',
  new_email_verification_sent:
    'Er is een bericht met een validatie-link naar je nieuwe e-mail adres gestuurd. Klik op de link in de e-mail om je nieuwe e-mail adres te bevestigen en opnieuw in te loggen.',
  sensordef_info:
    "Een sensordefinitie is bedoeld om de sensorwaarde van een inkomende 'ruwe' sensorwaarde om te zetten in een waarde volgens een grootheid en eenheid (bijv. w_v = 1098273 => weight_kg = 62,400 kg) of om een sensor te calibreren (bijv. t_0 = 15.3 °C => t_0 = 15.8 °C). Dit kan worden gedaan door een 'offset' en een 'multiplier' in te stellen. De in- en uitgaande waarde blijft gelijk als als offset '0' en als multiplier '1' wordt ingesteld. De BEEP base app (uit de App Store) zal deze correct voor je instellen als je de BEEP base voor het eerst configureert.",
  or: 'of',
  select_all_hives: 'Selecteer alle bijenkasten',
  select_all_editable_hives: 'Selecteer alle aanpasbare bijenkasten',
  Alert: 'Notificatie | Notificaties',
  alert: 'notificatie | notificaties',
  remove_alert: 'Verwijder notificatie',
  alerts_enabled: 'Notificaties ingeschakeld',
  alerts_disabled: 'Notificaties uitgeschakeld',
  edit_checklist_confirm:
    'Weet je zeker dat je de kastkaart wilt aanpassen? Niet opgeslagen aanpassingen aan je inspectie zullen verloren gaan.',
  edit_checklist_confirm_deselectedhives:
    'Weet je zeker dat je de kastkaart wilt aanpassen? Niet opgeslagen aanpassingen aan je inspectie en je hiveselectie zullen verloren gaan.',
  user_not_edited:
    'Gebruikersgegevens zijn niet aangepast. Wellicht zijn de gebruikersgegevens identiek aan de gegevens die al in de database aanwezig zijn, of één of meer velden zijn niet correct ingevuld. Controleer uw gegevens en probeer opnieuw.',
  user_not_deleted: 'Er is iets misgegaan, de gebruiker is niet verwijderd.',
  edit_hive_checklist_no_touch:
    'Vink items in de onderstaande lijst van beschikbare kastkaartitems aan/uit om ze aan je eigen kastkaart toe te voegen/te verwijderen. Voor meer overzicht, kun je de categorieën in- en uitklappen. Ook kun je ze naar boven/beneden slepen om de volgorde van jouw kastkaart te bepalen (N.B. dit is alleen mogelijk m.b.v. een muis).',
  edit_hive_checklist_touch:
    'Vink items in de onderstaande lijst van beschikbare kastkaartitems aan/uit om ze aan je eigen kastkaart toe te voegen/te verwijderen. Voor meer overzicht, kun je de categorieën in- en uitklappen. Het veranderen van de volgorde van items is alleen op een desktop computer mogelijk.',
  input_not_possible_for_bulkinspection:
    'Dit item is niet beschikbaar wanneer meerdere bijenkasten zijn geselecteerd voor een inspectie, omdat het per bijenkast apart moet worden ingevuld. Het is wel mogelijk om dit item later in te vullen voor een individuele kast, door de inspectie voor die kast te bewerken.',
  save_bulkinspection_confirm:
    'Weet je zeker dat je deze inspectie voor meerdere kasten tegelijk wilt opslaan?',
  deleted_but_not_saved_devices_warning:
    "Let op: meetsystemen worden pas definitief verwijderd wanneer je op de 'Opslaan en verwijderen' knop klikt, rechtsboven.",
  no_alerts: 'Geen nieuwe notificaties',
  alertrule: 'notificatie-instelling | notificatie-instellingen',
  Alertrule: 'Notificatie-instelling | Notificatie-instellingen',
  Measurement: 'Meting | Metingen',
  Calculation: 'Berekening',
  calculation: 'berekening',
  Direct: 'Direct',
  After: 'Na ',
  times: ' keer',
  Comparator: 'Comparator',
  comparator: 'comparator',
  Comparison: 'Vergelijking',
  comparison: 'vergelijking',
  Threshold_value: 'Drempelwaarde',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  Derivative: 'Afgeleide (stijging of daling)',
  Count: 'Aantal keer',
  Value: 'Waarde',
  Difference: 'Verschil',
  Absolute_value: 'Absolute waarde',
  Absolute_value_of_dif: 'Verandering',
  Absolute_value_of_dif_explanation: '**Absolute waarde van het verschil',
  Exclude_months:
    'Deze notificatie <strong>deactiveren</strong> gedurende de volgende maanden:',
  Exclude_hours:
    'Deze notificatie <strong>deactiveren</strong> tijdens de volgende uren:',
  Exclude_hives:
    'Deze notificatie <strong>deactiveren</strong> voor de volgende bijenkasten:',
  Exclude_hives_details:
    'N.B. De notificatie wordt standaard voor alle bijenkasten met een meetsysteem uitgevoerd.',
  Exclude_hives_collab_group_exp:
    ' Dit geldt ook voor bijenkasten die onderdeel zijn van een samenwerkingsgroep waar je lid van bent. Deactiveer de kasten waarvoor je deze notificatie niet wilt ontvangen.',
  No_hives_excluded_warning:
    "N.B. Deze notificatie wordt uitgevoerd voor alle bijenkasten met een meetsysteem, ook voor bijenkasten uit je samenwerkingsgroep(en). Bijenkasten waarvoor je deze notificatie niet wilt ontvangen kan je deactiveren via 'Periodes en bijenkasten uitzonderen'.",
  Save_alertrule_ok:
    'Wilt u doorgaan met opslaan van de notificatie-instelling?',
  months: 'maanden',
  hours: 'uren',
  delete_alertrule: 'Verwijder notificatie-instelling',
  create_alertrule: 'Opslaan notificatie-instelling',
  Active: 'Actief',
  Alert_via_email: 'Notificatie via email',
  this_field: 'Dit veld',
  alertrule_default:
    'Standaard notificatie-instelling | Standaard notificatie-instellingen',
  copy: 'Kopieer',
  Home: 'Home',
  Select_default_alertrule: 'Kopieer standaardinstelling',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Ik wil een notificatie ontvangen als [calculation] [measurement_quantity] [comparison] [comparator] [threshold_value][measurement_unit]. Deze berekening wordt [calculation_minutes] uitgevoerd',
  alertrule_active_no_email_sentence:
    ', en ik open de BEEP app om de notificaties te zien.',
  alertrule_active_email_sentence:
    ', en ik ontvang een notificatie email. Daarnaast zie ik de notificaties in de BEEP app.',
  alertrule_occurences_direct_sentence:
    ', en ik ontvang hier direct een notificatie van. ',
  alertrule_exclude_months_sentence:
    'Deze notificatie is uitgeschakeld in de maanden: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Deze notificatie is uitgeschakeld tijdens de uren: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Deze notificatie is uitgeschakeld voor deze bijenkasten: [exclude_hive_ids].',
  min: 'minimum',
  max: 'maximum',
  ave: 'gemiddelde',
  der: 'de afgeleide van',
  cnt: 'het aantal keer voorkomen van',
  equal_to: 'gelijk is aan',
  less_than: 'minder is dan',
  greater_than: 'meer is dan',
  less_than_or_equal: 'minder dan of gelijk is aan',
  greater_than_or_equal: 'meer dan of gelijk is aan',
  alertrule_not_active:
    "Deze notificatie is uitgeschakeld. Je kunt deze weer activeren door 'Actief' aan te vinken en de notificatie-instelling op te slaan.",
  export_email_sent: 'E-mail met Excel bestand is verzonden',
  excel_file_saved: 'Excel bestand is opgeslagen in je Downloads map',
  Updated_at: 'Aangepast op',
  Not_yet_saved: 'Nog niet opgeslagen',
  add_own_device: 'Voeg eigen meetsysteem toe',
  devices_info_text:
    'Let op: heb je een BEEP base? Gebruik dan de BEEP base app om je meetsysteem toe te voegen. Deze zal daarna automatisch in onderstaande lijst verschijnen. ',
  devices_url_text: 'Lees hier meer uitleg over de BEEP base app.',
  alert_explanation_1:
    'Wanneer je een BEEP base of een ander meetsysteem gebruikt kan je hiervoor notificaties instellen, zodat je een notificatie ontvangt wanneer de meetgegevens aan bepaalde voorwaarden voldoen. Denk hierbij bijvoorbeeld aan een plotselinge gewichtsafname vanwege een zwerm. Deze notificaties ontvang je in de app, daarnaast kan je ervoor kiezen om ze per e-mail te ontvangen.',
  alert_explanation_2:
    'Om je op weg te helpen zijn er een aantal standaardinstellingen die je kan gebruiken (en aanpassen naar eigen behoefte). Je kan ook zelf een nieuwe notificatie-instelling maken.',
  alertrules_url_text:
    "Ga naar 'notificaties beheren' om je eerste notificatie in te stellen",
  Explanation: 'Uitleg',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Bijenstand management',
  Move: 'Verplaats',
  Current_apiary: 'Huidige bijenstand',
  sensor_key: 'Identificatiecode uniek voor meetsysteem',
  disabled_settings: 'Je kunt deze instellingen niet handmatig aanpassen.',
  Address_placeholder: 'Straatnaam huisnummer, Stad',
  first_create_apiary: 'Maak eerst een bijenstand',
  Unknown: 'Onbekend',
  unknown: 'onbekend',
  research_warning:
    'N.B. Wanneer je geen uitnodiging hebt ontvangen voor onderzoeksdeelname is het niet nodig om je gegevens te delen, hier zal dan niks mee gedaan worden.',
  research_explanation_p1:
    'Het BEEP platform wordt gebruikt in onderstaande onderzoeken. Wanneer je een uitnodiging ontvangt om deel te nemen aan een onderzoek, is het nodig om toestemming te geven om je bijendata te delen met de onderzoekers. Dit gaat om de gegevens die je in de BEEP app bijhoudt. Met jouw bijendata kun je dan bijdragen aan onderzoek ter ondersteuning van de gezondheid van honingbijen.',
  research_explanation_p2:
    'Je kunt je toestemming te allen tijde intrekken. Vanaf dat moment worden er geen nieuwe gegevens gedeeld. De gegevens die je hebt gedeeld in de periode waarvoor je toestemming hebt gegeven, blijven beschikbaar voor onderzoek. Neem bij vragen contact op met de daarvoor bestemde contactpersoon.',
  research_info:
    'Lees voordat je toestemming geeft de onderzoeksbeschrijving via de onderstaande link en vraag indien nodig om aanvullende informatie.',
  save_and_delete: 'Opslaan en verwijderen',
  drag_layers_info_text:
    'Versleep kamers van links naar de gewenste positie in de kast aan de rechterkant. Verwijder een kamer uit de kast door erop te klikken en dan op het prullenbakicoon te klikken. Binnen de kast kunnen kamers ook versleept worden om de positie te wijzigen, en de kleur kan aangepast worden door erop te klikken.',
  New_hive: 'Nieuwe kast',
  New_alertrule: 'Nieuwe notificatie-instelling',
  Add_alertrule: 'Toevoegen notificatie-instelling',
  Add_apiary: 'Toevoegen bijenstand',
  Add_sensor_definition: 'Toevoegen sensordefinitie',
  Add_member: 'Toevoegen groepslid',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'Let op: sensor definities worden pas opgeslagen of definitief toegevoegd wanneer je op het groene vink icoon klikt, aan het einde van de sensor definitie rij in de tabel.',
  delete_sensordef: 'Verwijder sensordefinitie',
  delete_all_alerts: 'Verwijder alle notificaties',
  delete_all_alerts_warning:
    'Weet u zeker dat u alle notificaties wilt verwijderen? Dit kan niet ongedaan gemaakt worden.',
  delete_all_alerts_warning_filter_active:
    'Weet u zeker dat u alle notificaties wilt verwijderen? Ook notificaties die niet aan je zoekterm voldoen zullen verwijderd worden. Dit kan niet ongedaan gemaakt worden.',
  delete_selected_alert:
    'Wis geselecteerde notificatie | Wis geselecteerde notificaties',
  delete_selected_alerts_warning:
    'Weet u zeker dat u de geselecteerde notificatie wilt verwijderen? Dit kan niet ongedaan gemaakt worden. | Weet u zeker dat u de geselecteerde notificaties wilt verwijderen? Dit kan niet ongedaan gemaakt worden.',
  delete_selected_alerts_invisible_checked_warning:
    'N.B.: de geselecteerde notificatie voldoet niet aan je zoekterm. | N.B.: er zijn geselecteerde notificaties die niet aan je zoekterm voldoen, deze zullen ook verwijderd worden.',
  already_verified: 'Ik heb mijn e-mailadres gevalideerd en wil graag inloggen',
  password_recovery_resend_mail: 'Verstuur code opnieuw',
  alert_rule_created: 'Nieuwe notificatie ingesteld',
  alert_rule_deleted: 'Notificatie-instelling verwijderd',
  deactivate_for_all_hives: 'Deactiveer notificatie voor alle bijenkasten',
  select_all: 'Selecteer alle',
  During: 'Gedurende',
  Every: 'Elke ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  Calculation_minutes: 'Hoe vaak wil je de berekening uit laten voeren?',
  Calculation_minutes_short: 'Hoe vaak berekend?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Deactiveer notificatie voor deze kast',
  Alert_disabled_for_this_hive: 'Notificatie gedeactiveerd voor deze kast',
  disabled_for_hive: 'gedeactiveerd voor kast', // [alert] has been disabled for the following hive
  Alert_disabled: 'Notificatie gedeactiveerd',

  Log_data_import: 'Log data importeren',
  Log_files: 'Logbestanden',
  Upload_date: 'Upload datum',
  Messages: 'Berichten',
  Log_time: 'Tijd gelogd',
  File_size: 'Bestandsgrootte',
  check_log_data: 'Check log data',
  delete_log_file: 'Verwijder logbestand',
  commit_log_data_short: 'Importeer log data',
  commit_log_data: 'Importeer data van dit logbestand naar de BEEP app: ',
  import_log_data_explanation:
    "In de BEEP base app kan je log data downloaden van het interne geheugen van de BEEP base. Steeds als je log data downloadt, wordt het interne geheugen gewist en de data geüpload naar de BEEP app. Hieronder vind je de lijst met jouw gedownloade log data. Je kan de log data bekijken door op de knop 'Check log data' te klikken. Als resultaat van de check zie je dan blokken data die al dan niet matches hebben opgeleverd met de data in de database. Per blok met matches kan je de log data en de database data onder elkaar in een grafiek bekijken, en ervoor kiezen om de data in de database aan te vullen met die uit het logbestand.",
  import_log_data_url_text:
    'Lees hier het support artikel over het downloaden van log data m.b.v. de BEEP base app.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000697129-beep-base-data-downloaden-met-bluetooth',

  Immediately: 'Direct',
  In_case_of_good_connection_warning:
    '*Direct nadat een meting ontvangen is. Dit is afhankelijk van het datatransmissie interval en de betrouwbaarheid van de dataconnectie.',
  First_occurence: 'Eerste',
  Last_occurence: 'Laatste',
  // default alert rule names:
  Hive_stability_and_theft: 'Kast stabiliteit & diefstal',
  Temperature_sensor_defect: 'Temperatuursensor defect',
  Battery_low: 'Batterijspanning laag',
  Honey_harvest: 'Honingoogst',
  Hive_temperature: 'Kasttemperatuur laag',
  Brood_temperature: 'Broedtemperatuur laag',
  No_measurements: 'Geen metingen',
  Swarm: 'Zwerm',
  Food_supply_low: 'Winter voedselvoorraad laag',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Gewichtsafname van de kast is boven een bepaalde waarde',
  Temperature_sensor_malfunctions: 'Temperatuursensor storingen',
  Battery_voltage_is_below_a_set_value:
    'Batterij voltage van het meetsysteem is lager dan een bepaalde waarde',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Gewichtstoename vanwege nectarverzameling is gestopt',
  Hive_temperature_drops_below_a_set_value:
    'Kasttemperatuur daalt tot onder een bepaalde waarde',
  Temperature_in_the_brood_below_a_set_value:
    'Broedtemperatuur daalt tot onder een bepaalde waarde',
  No_measurement_data_received_in_a_set_time_period:
    'Geen metingen ontvangen gedurende een bepaalde periode',
  Sudden_weight_drop_triggers_alert_immediately:
    'Plotselinge gewichtsafname van de kast triggert direct een notificatie. Let op: hierbij is uitgegaan van een datatransmissie interval van 15 minuten. Wanneer jouw meetsysteem een ander datatransmissie interval heeft dien je de drempelwaarde daarop aan te passen.',
  The_hive_weight_is_below_a_set_value:
    'Gewicht van de kast is lager dan een bepaalde waarde',

  minute: 'minuut | minuten',
  upload_interval_warning_single_interval:
    'Let op: het datatransmissie interval van je meetsysteem is | Let op: het datatransmissie interval van je meetsystemen is',
  upload_interval_warning_interval_range:
    'Let op: de datatransmissie intervallen van je meetsystemen variëren tussen de ',
  not_relevant_for_immediate_calculation: 'Niet relevant bij direct uitvoeren',
  Increase: 'Stijging',
  Decrease: 'Daling',
  Every_hour: 'Elk uur',
  every_hour: 'elk uur',
  Alertrule_summary_title: 'Samenvatting',
  Alertrule_settings_title: 'Notificatie instellingen',
  Alertrule_exclude_title: 'Periodes en bijenkasten uitzonderen',
  of: 'van',

  alerts_url_text:
    'Lees hier het support artikel over het instellen van alerts',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-notificaties',

  /* New translations v3.0.74 */
  Decline: 'Afwijzen',
  Decline_invitation: 'Uitnodiging afwijzen',
  Decline_invitation_sure: 'Weet je zeker dat je de uitnodiging wilt afwijzen?',
  selection: 'Selectie',
  selection_placeholder: 'Selecteer een periode',
  data_zoom: 'Data inzoomen',
  data_zoom_ok: 'Wil je inzoomen naar de data van ',
  Length: 'Lengte: ',
  match: 'match | matches',
  Matches_found: 'Matches gevonden',
  Firmware_version: 'Firmware versie',
  Interval: 'Interval',
  View_data: 'Bekijk data',
  data_zoom_out_ok: 'Wil je uitzoomen naar de data van ',
  show_all: 'Toon alle',
  only_active_if_measurement_present:
    '*N.B. Je kan alleen notificaties ontvangen over de geselecteerde meting wanneer deze door je BEEP base / meetsysteem gemeten wordt.',
  Relative_startpoint: 'Relatief',

  Log_data: 'Log data',
  Flashlog: 'Log',
  Block: 'Blok',
  Nr_of_match_props: 'Aantal gelijke waardes per match',
  no_admin: 'Je moet beheerder zijn om deze pagina te kunnen bekijken',
  import_block_data_short: 'Importeer blok data',
  no_flashlog_data: 'Geen log data',
  no_flashlog_file: 'Geen logbestand',
  no_device: 'Geen meetsysteem',
  data_not_stored: 'Data niet opgeslagen',
  no_flashlog_found: 'Geen logbestand gevonden',
  Size: 'Grootte',
  Match: 'Match | Matches',
  Missing_data: 'Ontbrekende data',
  not_yet_in_db: 'nog niet in DB',
  From_cache: 'Gebruik cache',
  Time_diff: 'ΔTijd',
  seconds_short: 'sec',
  commit_block_data:
    'Vul data in de BEEP app aan met data uit dit blok van de log data: ',
  persisted_measurements: 'Aangevulde metingen',
  persisted_days: 'Aangevulde dagen',
  no_data_stored: 'Geen data opgeslagen',
  data_stored_for_log: 'Data opgeslagen voor Log ',
  Fill_holes: 'Vul gaten (verbind alle punten in de grafiek)',

  Data_imported: 'Data geïmporteerd',
  undo_import: 'Importeren ongedaan maken',
  undo_block_import_exp:
    'Weet je zeker dat je de eerder geïmporteerde data van dit blok uit de database wil verwijderen?',
  data_deleted: 'Data verwijderd',
  data_not_deleted: 'Data niet verwijderd',
  deleted_measurements: 'Verwijderde metingen',
  deleted_days: 'verwijderde dagen',
  Memory_erased: 'Geheugen BEEP base geleegd',
  Export: 'Export',
  Export_as_json: 'Exporteer als JSON data',
  Export_as_csv: 'Exporteer als .csv bestand',
  Export_full_json: 'Exporteer volledige JSON',
  Export_full_csv: 'Exporteer volledige .csv',
  Export_file_being_saved:
    'Export bestand wordt opgeslagen in je Downloads map - een moment geduld a.u.b.',
  no_data_deleted_because_no_matches_found:
    'Geen data verwijderd omdat er geen matches gevonden zijn',
  nr_of_measurements: 'aantal metingen',

  Now: 'Nu',
  input_only_possible_when_date_present:
    "Vul a.u.b. een inspectiedatum in (hierboven), om het inspectieformulier te activeren. Klik op 'Nu' om de huidige datum en tijd in te vullen.",
  select_inspection_date: 'Selecteer inspectiedatum',
  View_inspection_confirm: 'Wil je de inspectie bekijken van: ',

  /* Translations page */
  Translations: 'Vertalingen',
  translation_exp:
    'Vraag een vertaler account aan via support@beep.nl om een vertaler te worden. Als je een vertaling wilt updaten, download dan hieronder het betreffende .js bestand en mail het geüpdatete bestand naar support@beep.nl. Bedankt voor de moeite!',
  unpublished_exp: 'Vertalingen die nog ongepubliceerd zijn:',
  as_plain_text: 'als platte tekst',

  /* Checklists page */
  new_checklist: 'Nieuwe kastkaart',
  duplicate: 'Dupliceer',
  delete_checklist: 'Verwijder kastkaart',
  delete_checklist_confirm:
    'Weet je zeker dat je deze kastkaart wilt verwijderen? Dit kan niet ongedaan gemaakt worden. Kastkaart: "',

  /* Menu items */
  View_measurements: 'Bekijk metingen',
  View_inspection: 'Bekijk inspectie | Bekijk inspecties',
  View_alert: 'Bekijk notificatie | Bekijk notificaties',

  Edit_alertrule: 'Aanpassen notificatie-instelling',
  Edit_hive: 'Aanpassen kast',
  Edit_queen: 'Aanpassen moer',
  Edit_apiary: 'Aanpassen bijenstand',
  Edit_group: 'Aanpassen samenwerkingsgroep',
  Edit_group_short: 'Aanpassen groep',
  Edit_checklist: 'Aanpassen kastkaart',
  Edit_devices: 'Aanpassen meetsystemen',
  Edit_consent: 'Aanpassen toestemming',
  Edit_hivetag: 'Aanpassen hive tag',

  Hivetag: 'Hive tag | Hive tags',
  Hivetag_exp_1:
    "'Hive tags' zijn QR codes die je op een bijenkast kan plakken, en waarvoor je een actie kunt instellen die uitgevoerd wordt zodra je de hive tag scant. Met 'actie' worden handelingen in de BEEP app bedoeld, zoals bijvoorbeeld het aanmaken van een nieuwe inspectie voor de betreffende kast. Zodra de hive tag is ingesteld, hoef je in het vervolg alleen de QR code te scannen met je smartphone, en dan zal er automatisch een nieuwe inspectie worden aangemaakt. De hive tags kan je zelf printen, door ",
  Hivetag_download_text: 'deze pdf te downloaden.',
  Hivetag_exp_2:
    ' Scan een hive tag om aan de slag te gaan, er zal automatisch een pagina openen waar je de actie in kunt stellen indien dat nog niet gebeurd is.',
  qrcode: 'QR Code | QR Codes',
  Qrcode_exp1: "Plak de hive tag met nummer '",
  Qrcode_exp2: "' op een bijenkast.",
  Qrcode_note:
    'N.B. Bovenstaande QR code komt niet overeen met de daadwerkelijke hive tag, deze is slechts als voorbeeld bedoeld.',
  Download_hivetags: 'Download hive tags pdf',
  Delete_hivetag: 'Verwijder hive tag',
  for_hive: 'voor bijenkast "',
  Select_hivetag_number: 'Selecteer een hive tag nummer',
  Add_hivetag: 'Voeg hive tag toe',
  Select_hive: 'Selecteer een bijenkast | Selecteer bijenkasten',
  Select_hive_for_hivetag_exp:
    'Voor welke bijenkast wil je de actie uitvoeren? Selecteer één bijenkast.',
  Select_hivetag_action: 'Selecteer een actie',
  Select_hivetag_action_exp:
    'Welke actie wil je uitvoeren wanneer je de hive tag scant?',
  Hivetag_hive_in_overview: 'Toon bijenkast in het kastenoverzicht',
  Hivetag_new_inspection: 'Maak een nieuwe inspectie aan',
  Hivetag_edit_hive: 'Pas kastconfiguratie aan',
  Hivetag_view_inspections: 'Bekijk inspecties',
  No_hivetags_left:
    'Alle hive tags zijn momenteel in gebruik. Verwijder een bestaande hive tag om een nieuwe toe te kunnen voegen, of pas deze aan.',

  Select_hives_for_consent: 'Selecteer bijenkasten voor toestemming',
  Select_hives_for_consent_exp:
    'Selecteer de bijenkasten waarvan je de data wilt delen met dit onderzoek',
  View_alert_confirm: 'Wil je de notificatie bekijken "',

  /* iOS device prompt for adding BEEP app to home screen */
  pwa_title: 'BEEP als app gebruiken?',
  pwa_body:
    'Voeg BEEP toe aan je beginscherm om het als web app en op volledig scherm te gebruiken. Je blijft dan ingelogd na de eerste keer inloggen.',
  pwa_share_button_label: '1. Tik op het deel-icoon in de menubalk onderin.',
  pwa_addhome_button_label: "2. Tik op 'Zet op beginscherm'",

  Colony: 'Volk | Volken',
  Dashboard: 'Dashboard | Dashboards',
  Last_check: 'Laatste controle',
  Note: 'Notitie',
  no_chart_data_hive: 'Geen sensordata beschikbaar voor deze bijenkast',
  outsideTemperature: 'Buitentemperatuur',

  Code: 'Code',

  Dashboard_exp:
    "Creëer een dashboard via de 'Nieuw dashboard' knop rechtsboven. U kunt vervolgens bijenkasten selecteren die u wilt tonen op een publiek dashboard dat via een aparte url (voor iedereen met de code) toegankelijk is. Bijenkasten (en hun metingen en/of laatste inspectie) worden één voor één getoond.",
  create_dashboard_question:
    'Nog geen dashboard? Creëer een dashboard via de BEEP app',
  New_dashboard: 'Nieuw dashboard',
  Edit_dashboard: 'Edit dashboard',
  Delete_dashboard: 'Verwijder dashboard',
  Logout_dashboard: 'Uitloggen',
  Logout_dashboard_check:
    'Weet je zeker dat je wilt uitloggen / van dashboard wilt veranderen?',

  weight_example_chart_1: 'Bijen verzamelen nectar',
  weight_example_chart_2: 'Bijen gebruiken hun voedselvoorrad',
  weight_example_chart_3: 'Een zwerm!',
  weight_example_chart_4: 'De kast is vergroot',
  t_example_chart_1: '34°C: gezond broednest',
  t_example_chart_2: '< 33°C: geen broednest',
  Select_hives_for_dashboard_exp:
    'Welke bijenkasten wil je tonen in dit dashboard? Selecteer meerdere kasten (maximaal 12) voor het beste resultaat. Bij kasten met een meetsysteem zal ook temperatuur- en gewichtsdata worden weergegeven, indien aanwezig. Alleen eigen kasten kunnen geselecteerd worden.',
  Max_hives_warning: 'Het maximum aantal bijenkasten is bereikt',
  Title: 'Titel',
  Dashboard_title_exp:
    "Standaard is 'Dashboard' (als dit veld leeg wordt gelaten).",
  Dashboard_description_exp:
    'N.B. Deze beschrijving zal niet getoond worden op het dashboard. Hier kan je extra informatie kwijt, bijv. waarvoor dit dashboard bestemd is.',
  Pace: 'Snelheid (sec)',
  Dashboard_pace_exp: 'Aantal seconden dat elke bijenkast getoond wordt',
  Dashboard_interval_exp:
    'Toon metingen van de/het afgelopen uur/dag/week/maand/jaar of een zelfgekozen periode',
  Show_inspections: 'Toon inspecties',
  Show_inspections_exp:
    'Toon per bijenkast de laatste inspectie (datum, totaalindruk en notitie).',
  Show_all_hives: 'Toon details van alle bijenkasten',
  Show_all_hives_exp:
    'Toon details (locatie, laatste inspectie, metingen) van alle geselecteerde bijenkasten (JA), of alleen van bijenkasten met meetsysteem (NEE, aanbevolen optie)',
  Preview_share: 'Preview & deel',
  Copy_url: 'Kopieer url',
  /* offline inspection sheet */
  Hour_short: 'Uur | Uur',
  Day: 'Dag | Dagen',
  Minute: 'Minuut | Minuten',
  Percentage_exp: 'Percentage tussen 0 en 100',
  Grade_exp_1: 'Cijfer tussen 1 en 10',
  Grade_exp_2: '(1 = Slecht, 10 = Uitstekend)',
  Degrees_exp_1: 'Aantal graden tussen',
  Degrees_exp_2: '-180° en 180°',
  Negative_exp: 'Negatief getal (lager dan 0)',
  Too_many_items_exp_1: 'Er zijn teveel opties om te printen,',
  Too_many_items_exp_2: 'vul hier je eigen antwoord in',
  Image_placeholder_1: 'Foto kan later toegevoegd worden',
  Image_placeholder_2: 'via de BEEP app (optioneel)',
  Samplecode_placeholder_1: 'Sample code kan gegenereerd worden',
  Samplecode_placeholder_2: 'bij uploaden inspectie in BEEP app',
  Too_long_list_present:
    'Lijst van opties te lang om weer te geven in de offline kastkaart voor het item:',
  Too_long_list_present_fix_1:
    'Indien mogelijk, verminder het aantal keuzemogelijkheden tot maximaal',
  Too_long_list_present_fix_2:
    "via de 'Aanpassen kastkaart' knop. Of vul het juiste antwoord handmatig in.",

  /* offline inspection page */
  Print: 'Print',
  Print_checklist: 'Print kastkaart',
  Print_checklist_exp: 'Zorg voor de volgende printerinstellingen:',
  Print_checklist_exp_1: 'Papierformaat: A4',
  Print_checklist_exp_2: 'Zonder marges',
  Print_checklist_exp_3: 'Zwart/wit',
  Print_checklist_exp_4: 'Enkelzijdig',
  Offline_inspection: 'Papieren inspectie',
  Offline_inspection_exp:
    "Print de kastkaart, vul deze handmatig in. Upload foto's hiervan op een later moment via de 'Upload papieren inspectie' knop. De foto's worden vervolgens automatisch uitgelezen en het resultaat kan dan worden geverifiëerd en opgeslagen als een normale (digitale / online) inspectie.",
  Online_inspection: 'Digitale inspectie',
  Online_inspection_exp:
    'Vul de kastkaart digitaal (online) in via uw computer, tablet of smartphone, zoals u gewend bent',
  Upload_inspection: 'Upload papieren inspectie',
  Upload_inspection_exp:
    "Wanneer u een papieren inspectie heeft gedaan, kunt u hier foto's daarvan uploaden. Deze worden vervolgens automatisch uitgelezen en het resultaat kan dan worden geverifiëerd en opgeslagen als een normale (digitale / online) inspectie.",

  Select_inspection_mode: 'Selecteer inspectiemodus',
  Send_pictures: "Foto's opsturen",
  svg_checklist: 'geprinte kastkaart | geprinte kastkaarten',
  Select_input_language: 'Selecteer taal waarin kastkaart is ingevuld',
  Upload_images: 'Upload afbeeldingen',
  Upload_images_exp: "Let bij het maken van de foto's op het volgende:",
  Upload_images_exp_1:
    'Komt de Print ID van elke pagina overeen met de Print ID van de hierboven geselecteerde geprinte kastkaart?',
  Upload_images_exp_2: 'Zijn alle 4 de zwarte vierkanten in beeld?',
  Upload_images_exp_3:
    'Ligt het papier op een vlakke ondergrond en is het goed verlicht?',
  Upload_images_exp_4: 'TODO: use image scanner?',
  Uploading_images_be_patient:
    'Even geduld a.u.b., uw afbeeldingen worden geanalyseerd. Dit kan enkele minuten duren. Sluit dit venster niet.',
  Generating_svg_be_patient:
    'Even geduld a.u.b., de printbare kastkaart wordt gegenereerd. Dit kan even duren. Sluit dit venster niet.',
  Parsed_pages: "Verwerkte pagina's",
  Number_of_processed_pages: "Aantal verwerkte pagina's: ",
  Incorrectly_uploaded_pages: 'Incorrect geuploade paginanummers: ',
  Missing_page: 'Ontbrekend paginanummer | Ontbrekende paginanummers',
  Check_svg_id_for_page:
    'Controleer Print ID voor paginanummer | Controleer Print ID voor paginanummers',
  correct_svg_id: 'juiste Print ID',
  Svg_id_exp:
    "Het Print ID vind je rechts bovenaan de pagina, links van het paginanummer. Upload de papieren inspectie opnieuw met de juiste pagina's en/of de juiste geprinte kastkaart geselecteerd.",
  All_svg_ids_correct: 'Juiste geprinte kastkaart geselecteerd',
  All_svg_ids_incorrect: 'Verkeerde geprinte kastkaart geselecteerd',
  No_checklist_svg: 'Nog geen kastkaarten geprint',
  No_checklist_svg_exp:
    "Voordat je een papieren inspectie kan uploaden, moet je eerst een kastkaart printen (en invullen). Ga daarom eerst naar 'Papieren inspectie', of doe de inspectie volledig digitaal via 'Digitale inspectie'.",
  checklist_svg_exp:
    "Selecteer hieronder een geprinte kastkaart. Let daarbij op dat de Print ID (en daarmee ook de naam) overeenkomt met de Print ID (en naam) van jouw papieren inspectie. De Print ID vind je rechtsboven elke bladzijde, de naam linksboven. N.B. Een digitale kastkaart kan onder verschillende Print IDs opgeslagen zijn als 'geprinte kastkaart', wanneer de inhoud gewijzigd is op het moment van printen (ten opzichte van de vorige printsessie). Aanpassingen aan een digitale kastkaart zijn dus alleen terug te zien in een geprinte kastkaart wanneer de kastkaart na de wijzigingen geprint is. De datum (+ het tijdstip) achter de naam duidt aan wanneer een bepaalde versie van de kastkaart voor het eerst geprint is.",

  /* Compare module */
  Load: 'Laden',
  Compare: 'Vergelijk',
  Select_hives_for_compare: 'Selecteer bijenkasten om mee te vergelijken',
  Select_hives_for_compare_exp:
    'Selecteer de bijenkasten waarmee je de data wilt vergelijken',
  mean_weight_kg: 'Gemiddeld gewicht',
  mean_net_weight_kg: 'Gemiddeld netto gewicht',
  net_weight_kg: 'Netto gewicht',
  overall_intake_loss: 'Totale stijging/daling',
  Compare_hives: 'Vergelijk bijenkasten',
  Compare_with_mean:
    'Vergelijk gewicht bijenkast met gemiddelde van andere kasten',
  compare_hives_exp:
    'Bekijk hoe je bijenkast zich ontwikkelt, vergeleken met andere bijenkasten in de omgeving. ',
  compare_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000921124-compare-hives-option',
  compare_url_text: 'Lees hier meer uitleg over de Vergelijk functionaliteit',
  selected_hive: 'geselecteerde kast | geselecteerde kasten',
  Multiple_hives_charts: 'Vergelijk meerdere bijenkasten in één grafiek',
  compare_no_chart_data:
    'Geen vergelijkingsdata beschikbaar voor de geselecteerde periode',
  multiple_hives_no_chart_data:
    'Geen data beschikbaar voor de geselecteerde bijenkasten voor de geselecteerde periode',
  /* below, please keep [hivename] as is, it will be replaced by the name of the hive you selected in the Data tab */
  compare_chart_exp:
    'Let op: [hivename] wordt niet meegenomen in de berekening van het gemiddelde gewicht. ',

  /* below, please keep [pagenr] as is, it will be replaced by the pagenumber to be uploaded */
  Upload_pagenr: 'Upload hier pagina [pagenr]',
  Datetime_of_inspection: 'Inspectiedatum en -tijd',
  remind_datetime: 'Herinneringsdatum en -tijd',

  cumulative_daily_weight_anomaly: 'Cumulatieve dagelijkse gewichtsafwijking',
  colony_failure_weight_history:
    'Kans op winterfalen gebaseerd op gewichtshistorie',
  more_info: 'meer informatie',

  api_token: 'Api token',
  save_api: 'Api token opslaan',
}

export default translations
