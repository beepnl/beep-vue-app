/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
  Today: 'Idag',
  Clear: 'Rensa',
  Close: 'Stäng',
  firstDay: 1,

  /* main */
  Website: 'Websida',
  Feedback: 'Feedback',
  Feedback_mail_header: 'BEEP app feedback',
  Feedback_mail_body:
    'Kära BEEP foundation,%0D%0A%0D%0AHereby min feedback om the BEEP app.%0D%0A%0D%0AI upptäckte följande:%0D%0A%0D%0APrecis innan det hände, gjorde jag:%0D%0A%0D%0ASkärmen såg ut så                     härlooki(var snäll bifoga kopia på skärmen):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info: 'Diagnostisk info (om det skulle vara en bug):%0D%0A',
  back: 'Tillbaka',
  menu: 'Meny',
  weather: 'Väder',
  sensors: 'Enheter',

  switch_language: 'Byt språk',
  Delete: 'Radera',
  Search: 'Sök...',

  /* user error messages */
  User: 'Användare',
  User_data: 'Användardata',
  user_data: 'användardata',
  updated: 'updaterad',
  delete_complete_account:
    'Är du säker på att du vill radera hela ditt konto, inklusive samtliga bigårdar, kupor, och inspektioner? Det går INTE att återskapa.',
  username_is_required: 'Vänligen fyll i användarnamn',
  username_already_exists: 'Användarnamnet finns redan',
  password_is_required: 'Vänligen fyll i ett lösenord',
  email_is_required: 'Vänligen fyll i email adress',
  email_already_exists: 'Mail adressen används redan',
  policy_accepted_is_required:
    'Du måste godkänna användarvillkoren för att kunna registrera dig',

  already_registered: 'Jag är redan registreradI',
  invalid_user: 'Okänd användare, eller fel lösenord',
  no_password_match: 'Felaktigt lösenord',
  invalid_token: 'Ogiltigt tecken',

  no_valid_email: 'Ogiltig mail adress',

  empty_fields: 'Vänligen fyll i samtliga fält',
  match_passwords: 'Ogiltigt lösenord',

  succesfully_registered: 'Registreringen lyckades',
  authentication_failed: 'Misslyckad verifiering',

  no_valid_input_received: 'Data kunde inte sparas, ingen giltig input.',

  remove_all_settings: 'Ta bort samtliga inställningar',
  remove_apiary: 'Ta bort bigård ',
  remove_hive: 'Ta bort kupa',
  remove_inspection: 'Ta bort inspektion',

  Error: 'Error | Errors',
  Warning: 'Varning',
  first_remove_hives:
    'Obs: Det finns fortfarande kupor I denna bigård. Du kan spara specifika kupor (och deras inspektioner) genom att först flytta dem till en annan bigård. Om du fortsätter radera kommer du att radera samtliga kupor och inspektioner på denna lokal.',

  Date: 'Datum',
  ok: 'Ok',
  prev: 'föregående',
  next: 'Nästa',
  add: 'Lägg till',
  Cancel: 'Upphäv',

  /* login */
  login_title: 'Login',
  login: 'Login',
  back_to_login: 'Tillbaka till login',
  forgot_password: 'Glömt lösenordet?',

  username: 'Användarnamn',
  password: 'Lösenord',
  confirm_password: 'Bekräfta lösenord',
  email: 'E-mail',
  token: 'tecken',

  create_login_question: 'Inget konto ännu? Registrera dig som ny användare',
  create_login: 'Registrering som ny användare',
  create_login_summary: 'Skapa nytt användarkonto',
  save: 'Spara',
  save_and_return: 'Spara och återgå',

  logout: 'Log out',

  /* password recovery */
  password_recovery_title: 'Glömt lösenordet?',
  password_recovery_remembered: 'O,nu kommer jag ihåg lösenordet igen!',
  password_recovery_user: 'Använder info',
  password_recovery_send_mail: 'Skicka verifikations kod',
  password_recovery_code_not_received: 'Kod inte mottagen honom 5 min?',
  password_recovery_enter_code: 'Har du redan fått en kod? Skriv in den här',
  password_recovery_reset_title: 'Skriv in nytt lösenord',
  password_recovery_reset_password: 'Ändra lösenord',
  password_recovery_reminder_success:
    'Ett mail har skickats. Klicka på länken I mailet för att återställa lösenordet för detta användarkonto.',
  password_recovery_reminder_summary:
    'Skriov in dimn mail adress. Du kommer nu få ett mail med en länk för att ändra ditt lösenord.',

  password_recovery_reset_summary:
    'Använd koden du fått för att ställa in ett nytt lösenord för ditt konto',
  password_recovery_reset_success:
    'Ditt lösenord är nu ändrat och du är inloggad.',

  new_password: 'Nytt lösenord',
  confirm_new_password: 'Bekräfta nytt lösenord',

  go_to_dashboard: 'Gå till sammanfattningspanelen/dashboard',
  color: 'Färg',

  /* hives */
  Hive: 'Kupa | Kupor',
  hive: 'kupa | kupor',
  Location: 'Bigård | Bigårdar',
  location: 'bigård | bigårdar',
  Name: 'Namn',
  name: 'namn',
  Type: 'Typ',
  type: 'typ',
  Layer: 'Låda nr',
  layer: 'låda nr',
  brood: 'Yngel',
  honey: 'Honung',
  inspect: 'Inspektera',
  inspection: 'inspektion | inspektioner',
  Inspection: 'Inspektion | Inspektioner',
  New_inspection: 'Ny inspektion',
  Edit_inspection: 'Redigera inspektion',
  Action: 'Handling | Åtgärder',
  edit: 'Redigera',
  Hive_layer_amount: 'Antal lådor',
  Bee_race: 'Biras',
  Birth_date: 'Födelsedatum',
  Color: 'Färg',
  Queen_colored: 'Drottning märkt',
  Queen_clipped: 'Drottning vingklippt',
  Queen_fertilized: 'Drottning parad',
  Age: 'Ålder',
  years_old: 'år gammal',

  /* Hive check items */
  Date_of_inspection: 'Inspektionsdatum',
  action: 'Åtgärd',
  reminder: 'Kom ihåg',
  remind_date: 'Påminnelse daum',
  overall: 'Helhet',
  positive_impression: 'Sammanlagt intryck',
  needs_attention: 'Behöver åtgärd',
  notes: 'Anteckningar',
  notes_for_next_inspection:
    'Korta anteckningar inför nästa inspektion (visas i översikt)',
  Not_implemented_yet: 'Denna punkt är ännu inte implementerad',

  /* dashboard */
  last_measurement: 'Senaste mätning',
  at: 'at',
  no_data: 'Inga data tillgängliga',
  no_chart_data: 'Inga tabelldata för vald period',

  /* settings */
  General: 'Allmänna',
  Place: 'Plats',
  Country: 'Land',
  City: 'Stad',
  Address: 'Adress',
  latitude: 'latitude',
  Longitude: 'Longitude',
  Street: 'gata',
  Number: 'Nr.',
  Postal_code: 'Postnummer',
  Description: 'Beskrivning',
  Hive_settings: 'Kupinställningar',
  Hive_amount: 'Antal kupor',
  Hive_prefix: 'Kupnamn prefix (före nummer)',
  Hive_number_offset: 'Börja numrera kupor',
  Hive_type: 'Kuptyp',
  Hive_layers: 'Antal lådor/lager',
  Hive_frames: 'Ramar per låda',
  Hive_color: 'Kupans färg',
  Queen: 'Drottning',
  queen: 'drottning',

  settings_title: 'Inställningar',
  Settings: 'Inställningar',
  settings: 'inställningars',

  sensors_title: 'Sensor inställningar',
  sensor: 'Sensor',

  Select: 'Välj',
  Not_selected: 'Ej vald',
  Poor: 'Dålig',
  Fair: 'Ok',
  Average: 'Medeltal',
  Average_slider: 'Medeltal',
  Good: 'Bra',
  Excellent: 'Utmärkt',
  Low: 'Låg',
  Medium: 'Medel',
  High: 'Hög',
  Extreme: 'Extrem',

  /* colors */
  select_color: 'Välj en färg',
  advanced: 'Avanserad',

  /* sensors */
  Select_sensor: 'Välj en givare',
  temperature: 'Temperature',
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
  light: 'Solljus',
  l: 'Solljus',
  water: 'Vatten',
  w: 'Vatten',
  humidity: 'Luftfuktighet',
  h: 'Luftfuktighet',
  air_pressure: 'Lufttryck',
  p: 'Lufttryck',
  weight: 'Vikt',
  w_v: 'Viktgivare värde för alla givare',
  w_fl: 'Viktgivarvärde vänster fram',
  w_fr: 'Viktgivarvärde höger fram',
  w_bl: 'Viktgivarvärde vänster bak',
  w_br: 'Viktgivarvärde höger bak',
  weight_kg: 'Vikt',
  weight_kg_corrected: 'Vikt (korr)',
  weight_combined_kg: 'Vikt kombinerad',
  bat_volt: 'Batteri',
  bv: 'Batteri spänning',
  sound_fanning_4days: 'Ljud 4d bin',
  s_fan_4: 'Fläktljud 4d bin',
  sound_fanning_6days: 'Ljud 6d bin',
  s_fan_6: 'Fläktljud 6d bin',
  sound_fanning_9days: 'Ljud 9d bin',
  s_fan_9: 'Fläktljud 9d bin',
  sound_flying_adult: 'Ljud flygande bin',
  s_fly_a: 'Flygande bin',
  sound_total: 'Totalt ljud',
  s_tot: 'Totalt ljud',
  s_spl: 'Ljudtryck nivå',
  bee_count_in: 'Räknat antal bin in',
  bc_i: 'Antal bin in',
  bee_count_out: 'Räknat antal bin ut',
  bc_o: 'Antal bin ut',
  t_i: 'Temp. inuti',
  rssi: 'Signalstyrka',
  snr: 'Signalbrus',
  lat: 'Latitud',
  lon: 'Longitud',
  Sound_measurements: 'Ljudmätningar',
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
  icon: 'Icon',
  precipIntensity: 'Nederbörd/regn',
  precipProbability: 'Sannolikhet för regn',
  precipType: 'Typ av regn',
  outsideTemperature: 'Utetemperatur',
  apparentTemperature: 'Upplevd temperatur',
  dewPoint: 'Daggpunkt',
  pressure: 'Lufttryck',
  windSpeed: 'Vindhastighet',
  windGust: 'Vindbyar',
  windBearing: 'Vindriktning',
  cloudCover: 'Molntäckning',
  uvIndex: 'UV index',
  visibility: 'Sikt',
  ozone: 'Ozone',

  /* Measurements */
  Hour: 'Timme',
  hour: 'timme | timmar',
  day: 'dag | dagar',
  week: 'Vecka',
  month: 'Månad',
  year: 'År',

  /* settings */
  offline: 'Ingen förbindelse',
  yes: 'Ja',
  no: 'Nej',

  Checklist: 'Checklista | Checklistor',
  checklist: 'checklista | checklistor',
  Checklist_items: 'Checkliste variabler',
  edit_hive_checklist:
    'Klicka I boxarna i listan nedan för att lägga till eller ta bort variabler från din checklista. Du kan också dra och släppa de olika variablerna för att ändra ordningen efter dina önskemål/behov.',

  /* user */
  Data_export: 'Data export',
  Export_your_data:
    "Exportera alla data som finns på ditt BEEP konto och skicka ett mail med en Excelfil som innehåller alla data (OR download the Excel file via the 'Download CSV' button). Excelfilen har olika flikar olika för typer av data (personuppgifter, kupa, plats, och inspektionsdata).",
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  Terms_of_use: 'Användaravtal',
  accept_policy:
    'Jag accepterar BEEPs användaravtal som är i överensstämmelse med European privacy law',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep användaravtal_2018_05_25_avg_v1',
  approve_policy: 'Du har ännu inte godkänt användaravtalet',

  /* General items */
  server_down:
    'Appen är inte tillgänglig pga underhållsarbete, försök igen senare',
  add_to_calendar: 'Lägg till I kalendern',
  sort_on: 'Sortera efter',
  Whats_new: 'Ny!',
  Manual: 'Manual',
  Site_title: 'BEEP | Bi monitor',
  could_not_create_user:
    'Ny användare kan inte skapas just nu. Vi ber om ursäkt för det, vänligen försök igen senare.',
  email_verified: ' Din email adress har verifierats.',
  email_not_verified: 'Din email adress har ännu inte verifierats.',
  email_new_verification:
    'Klicka på denna länk för att skicka ett nytt verifikationsmail.',
  email_verification_sent:
    'Ett meddelande med en verifikationslänk har skickats till din email adress. Klicka på länken för att aktivera ditt konto och logga in.',
  email_verification_resent:
    'Ett nytt meddelande med verifikationslänk har skickats till din emailadress. Klicka på på länken för att aktivera ditt konto och logga in.',

  not_filled: 'krävs, men är inte ifyllt',
  cannot_deselect: 'Kan inte ta bort, eftersom det är en nödvändig uppgift',
  Undelete: 'Återställ det raderade',
  the_field: 'Det',
  is_required: 'krävs',

  No_groups: 'Inga grupper tillgängliga',
  not_available_yet:
    'Ännu inte tillgängliga. Klicka på knappen I övre högra hörnet för att lägga till en.',
  Users: 'Användare',
  member: 'medlem | medlemmar',
  Member: 'Grupp medlem | Grupp medlemma',
  Invite: 'Bjud in',
  Invited: 'Inbjudna',
  Invitation: 'Inbjudan | Inbjudningar',
  Admin: 'Administratör',
  Creator: 'Grupp ägare',
  Collaborate: 'Sammarbeta',
  Group: 'Samarbetsgrupp | Samarbetsgrupper',
  group: 'samarbetsgrupp | samarbetsgrupper',
  group_short: 'grupp | grupper',
  to_share:
    'Att dela med denna grupp. 1 klick = grupp medlemmar kan enbart se/läsa, 2 klicks = grupp medlemmar kan redigera',
  Invitation_accepted: 'Inbjudan accepterad',
  Accept: 'Acceptera',
  My_shared: 'Mitt delade',
  invitee_name: 'Den inbjudnes namn',
  Remove_group:
    'Är du säker på att du helt och hållet vill ta bort denna delade grupp för samtliga dess medlemmar',
  Detach_from_group: 'Ta bort mig och mina kupor från denna grupp',
  my_hive: 'Min kupa',
  created: 'skapad',
  group_detached: 'Framgångsrikt lämnat gruppen',
  group_activated: 'Gruppinbjudan accepterad',

  /* New translations v2.2.0 */
  roofed: 'Är det ett tak över bigården?',
  info: 'Info',

  research: 'Forskning',
  start_date: 'Start datum',
  end_date: 'Slutdatum',
  purpose: 'Forskningssyfte',
  institution: 'Forskningsinstutition',
  type_of_data_used: 'Data användning',
  link: 'Länk',
  Consent: 'Samtycke',
  history: 'historia',
  Current_consent: 'Nuvarande samtycke',
  consent_yes: 'Jag samtycker till att dela mina data',
  consent_no: 'Jag samtycker INTE till att dela mina data',
  my_beep_data: 'Mina egna BEEP data',
  Consent_can_only_be_set: 'Samtycke kan endast bli justerat till',
  earlier: 'en tidigare',
  later: 'en senare',

  new_apiary_explanation: 'Skapa ny bigård I fyra steg',
  start_here: 'Klicka här för att börja',
  optional: 'valfri',
  dimensions: 'mått',
  details: 'detaljer',
  configuration: 'konfiguration',
  adjustments: 'justeringar',
  changes_queen_color: 'redigera ändringar färg',

  Brood_box_and_frame: 'Yngelrum och ram',
  Hive_order: 'Kupornas ordning i bigården',
  bb_width_cm: 'Yngelrum bredd (cm)',
  bb_height_cm: 'Yngelrum höjd (cm)',
  bb_depth_cm: 'Yngelrum djup/längd(cm)',
  fr_width_cm: 'Ram bredd (cm)',
  fr_height_cm: 'Ram höjd (cm)',
  queen_line: 'linje',
  queen_tree: 'släktträd',
  queen_description: 'anteckningar',
  Hive_short: 'Kupa | Kupor',

  Image: 'Bild | Bilder',
  Size: 'Storlek',
  preview: 'förhandsvisning',

  Inside: 'Invändiga mått',
  Offset: 'Utjämna',
  Multiplier: 'Multipler',
  Input: 'Inmatning',
  Output: 'Utdata',
  Last: 'Sist',

  Export_sensor_data:
    'Exportera alla data per enhet med högsta möjliga upplösning som en .csv fil som du kan öppna I Excel eller SPSS. NB: Datum och tidsdata i tid kolumnen är GMT tid, formaterad med RFC 3339 datum-tids standard.',
  CSV_export_separator: 'CSV data kolumn separator',
  Selected_date: 'Valt tidsspann',
  Sensor_measurements: 'Givar mätvärden',
  too_much_data:
    'För mycket data att processa, var snäll välj färre givarmätvärden, eller minska tidsspannet.',

  beep_base_explanation:
    'Om du har en BEEP base (som den i bilden ovan), var då snäll och använd BEEP base appen(iOS och Android) för att ställa in kommunikationen med appen.  Om du inte har en BEEP base ännu, klicka i menyn på BEEP website för senaste info om hur du kan få tag i en BEEP base.Om du har en annan datasamlare och skulle vilja se dessa data i BEEP appen, skicka ett meddelande till oss för förfrågan om att ansluta till Slack gruppen så kan du få tillgång till API beskrivningen.',

  sample_code_hive:
    'Välj först en kupa, för att generera en unik kod för stickprovet',
  sample_code_generate: 'Generera unik stickprovskod',
  sample_code_delete: 'Radera unik stickprovskod',

  measurement_interval: 'intervall',
  from_weather_service: 'från väderlekstjänsten',

  /* New translations v3 */
  click_hives_to_filter: 'Klicka på kupor för att filtrera',
  for: 'för',
  last_visit: 'Senaste besök',
  apiary_details: 'Bigårds uppgifter',
  group_details: 'Grupp uppgifter',
  diary: 'Dagbok',
  data: 'Data',
  photo: 'foto | foton',
  add_checklist: 'Lägg till checklista',
  add_hive: 'Lägg till kupa',
  delete_apiary: 'Radera bigård',
  edit_apiary: 'Redigera bigård',
  new_apiary: 'Ny bigård',
  delete_group: 'Radera grupp',
  edit_group: 'Redigera grupp',
  new_group: 'Ny samarbetsgrupp',
  verification_code: 'verifikations kod',
  limit_exceeded: 'Gräns har nåtts, försök igen senare',
  confirm_email_title: 'Bekräfta din email',
  confirm_email_summary:
    'Du har fått en verifikationskod i din email. Knappa in den nedan för att verifiera din emailadress',
  confirm: 'Bekräfta',
  Profile: 'Profil',
  Checklist_template: 'Checkliste mall | Checkliste mallar',
  Help: 'Hjälp',
  Privacy: 'Integritet',
  FAQ: 'FAQ',
  Support: 'Support',
  no_inspections: 'Lägg till första inspektionen',
  no_results: 'Inga resultat',
  Hive_brood_layer: 'Yngellåda | Yngellådor',
  Hive_honey_layer: 'Skattlåda | Skattlådor',
  Hive_queen_excluder_layer: 'Spärrgaller | Spärrgaller',
  Hive_feeding_box_layer: 'Foderlåda| Foderlådor',
  overrides_layer_colors: 'övergripande färg lager',
  drag_layers: 'Dra olika lager/lådor för att konfigurera en kupa',
  page: 'sida | sidor',
  Page: 'Sida | Sidor',
  not_found: 'inte hittad',
  sorry: 'Tyvärr',
  delete_layer: 'Radera låda/lager',
  not_saved_error: 'Data kunde inte sparas',
  something_wrong: 'Något blev fel',
  not_editable: 'går inte att redigera',
  unsaved_changes: 'Icke sparade ändringar',
  save_changes:
    'Är du säker på att du vill lämna denna sida? Allt du inte sparat ner kommer att gå förlorat.',
  no_apiaries_yet: 'Du har ännu inga bigårdar',
  need_help: 'Behöver du hjälp?',
  Apiary_color: 'Bigårdsfärg',
  Set_notification_date: 'Ställ in påminnelsedatum',
  remove_image: 'Ta bort bild',
  Total_colony_size: 'Total storlek på samhället',
  bee: 'bi | bin',
  with_bees: 'med bin',
  change_checklist_confirm:
    'Är du säker på att du vill välja en annan checklista? Redan ifyllda värden kommer att finnas kvar.',
  view: 'Översikt',
  share: 'Dela',
  edit_details: 'Redigera uppgifter',
  remove_queen: 'Ta bort drottningen',
  remove_group_short: 'Ta bort samarbetsgrupp',
  device: 'Enhet | Enheter',
  click_date_to_edit: 'Klicka på datum för att redigera.',
  accept_policy_1: 'Jag accepterar BEEP',
  accept_policy_2:
    ', som är I överensstämmelse med den nya Europeiska privacy law',
  terms_of_use: 'användarvillkor',
  invalid_password:
    'Lösenord måste innehålla minst 8 tecken, en liten bokstav, en stor bokstav, en siffra och ett tecken t.ex. (\\]{}()?\\-"!@#%&/\\,><\':;|_~`)',
  sensor_definition: 'givar definition | givar definitioner',
  measurement: 'mätvärde | mätvärden',
  remove_device: 'Ta bort enhet',
  last_message_received: 'Senast mottagna meddelande',
  transmission_ratio: 'Överförings ratio',
  period: 'Period',
  download: 'Ladda ner',
  different_end_start: 'Start och början måste vara olika',
  later_end_start: 'Start datum måste vara tidigare än slutdatum',
  new_email_verification_sent:
    'Ett meddelande med en verifikationslänk har skickats till din email. Klicka på länken I mailet för att bekräfta din email adress och logga in.',
  sensordef_info:
    "En givar definition har som mål att konvertera inkommande 'råa' givarvärde till ett värde och en enhet eller att kalibrera givaren. Detta kan göras genom att ställa in en òffset` och en `multiplier`. Indata och utdata förblir desamma om offset är 0 och multiplier är 1. BEEP base appen kommer att förse dig med korrekta givardefinitioner när du ställer in den för första gången.",
  or: 'eller',
  select_all_hives: 'Välj samtliga kupor',
  select_all_editable_hives: 'Välj samtliga redigerbara kupor',
  Alert: 'Varning | Varningar',
  alert: 'varning | varningar',
  remove_alert: 'Ta bort varning',
  alerts_enabled: 'Varningar aktiverade',
  alerts_disabled: 'Varningar avaktiverade',
  edit_checklist_confirm:
    'Är du säker på att du vill redigera checklistan? Ändringar I din inspektion som du inte sparat kommer att gå förlorade.',
  edit_checklist_confirm_deselectedhives:
    'Är du säker på att du vill redigera checklistan? Ändringar I din inspektion som du inte sparat kommer att gå förlorade.',
  user_not_edited:
    'Användardata har inte redigerats. Möjligen är användardata identiska med användardata som redan finns I databasen ellr är ett eller flera fält inte korrekt ifyllda. Var snäll och kontrollera dina data och försök igen.',
  user_not_deleted: 'Någonting blev fel, användare har inte raderats.',
  research_consent: 'Forskningssamtycke',
  checklist_types: 'Personligt,deld,forskning',
  edit_hive_checklist_no_touch:
    'Klicka I/klicka bort I boxarna I listan nedan för att lägga till/ta bort variabler från din kup checklista. Du kan också visa/dölja och dra och släppa variabler i checklistan för att få dem i en ordning som som passar dina behov (obs. Funkar inte på enhet med touchscreen).',
  edit_hive_checklist_touch:
    'Klicka I/klicka bort boxarna I listan nedan för att lägga till/ta bort variabler från din kupchecklista. Att ändra ordningen på dina variabler är endast möjligt på en desktop dator.',
  input_not_possible_for_bulkinspection:
    'Denna variabel är inte tillgänglig när man valt flera kupor samtidigt för inspektion, eftersom den kan endast registreras för enskild kupa. Man kan fylla i den variabel vid ett senare tillfälle genom att rtedigera inspektionen för enskild kupa.',
  save_bulkinspection_confirm:
    'Är du säker på att du vill spara denna registrering samtidigt för samtliga valda kupor?',
  deleted_but_not_saved_devices_warning:
    "N.B.: enheter kommer enbart att tas bort efter att man klickat på 'Spara och ta bort' knappen i övre högra hörnet.",
  no_alerts: 'Inga nya varningar',
  alertrule: 'varnings regelalert rule | varnings regler',
  Alertrule: 'Varnings regelalert rule | Varnings regler',
  Measurement: 'Mätning | Mätningar',
  Calculation: 'Beräkning',
  calculation: 'beräkning',
  Alert_on_occurences: 'När vill du få varningen?',
  Alert_on_occurences_hint:
    'Direkt, eller endast när det har inträffat x antal gånger?',
  Direct: 'Direkt',
  After: 'Efter ',
  times: ' gånger',
  Comparator: 'Komparator',
  comparator: 'komparator',
  Comparison: 'Jämförelse',
  comparison: 'jämförelse',
  Threshold_value: 'Gränsvärde',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  Derivative: 'Ökning eller minskning',
  Count: 'Tal',
  Value: 'Värde',
  Difference: 'Skillnad',
  Absolute_value: 'Absolut värde',
  Absolute_value_of_dif_explanation: '**Absolut  för skillnaden',
  Exclude_months:
    '&lt;stark&gt;Deaktivera&lt;/stark&gt; denna varning under följande månader:',
  Exclude_hours:
    '&lt;stark&gt;Deaktivera&lt;/stark&gt; denna varning under följande timmar:',
  Exclude_hives:
    '&lt;stark&gt;Deaktivera&lt;/stark&gt; denna varning för följande kupor:',
  Exclude_hives_details:
    'N.B. Som standard, kommer denna varning att ges för alla kupor med mätenheter.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'månader',
  hours: 'timmar',
  delete_alertrule: 'Radera varnings regel',
  create_alertrule: 'Save alert rule',
  Active: 'Aktiv',
  Alert_via_email: 'Varna via email',
  Webhook_url: 'Webhook url',
  this_field: 'Detta fält',
  alertrule_default: 'Förvald varningsrege | Förvalda varningsregler',
  copy: 'Kopiera',
  Home: 'Hem',
  Select_default_alertrule: 'Kopiera förvald varningsregel',
  /* below, please keep all terms between [] as is: */
  alertrule_main_sentence:
    'Jag vill ha en varning om [calculation] [comparison] av [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Denna beräkning kommer att genomföras [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', och jag vill ha varningen så snart det inträffar. ',
  alertrule_occurences_indirect_sentence:
    ', men jag vill ha varningen endast om det inträffar (återkommande) gånger. ',
  alertrule_exclude_months_sentence:
    'Denna varning deaktiveras under följande månader [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Denna varning kommer att deaktiveras under följande timmar [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Denna varning deaktiveras för följande kupor [exclude_hive_ids].',
  min: 'minimum',
  max: 'maximum',
  ave: 'medeltal',
  der: 'derivative',
  cnt: 'antal',
  equal_to: 'är lika med',
  less_than: 'är mindre än',
  greater_than: 'är större än',
  less_than_or_equal: 'är mindre eller lika med',
  greater_than_or_equal: 'är större än eller lika med',
  alertrule_not_active:
    'Denna varning har deaktiverats. Du kan aktivera den genom att klicka I Aktiv boxen och spara denna varningsregel.',
  export_email_sent: 'Ett email med Excel fil har skickats',
  excel_file_saved: 'En Excel fil har sparats I din download folder',
  Updated_at: 'Uppdaterad vid',
  Not_yet_saved: 'Ännu inte sparad',
  add_own_device: 'Lägg till egen enhet',
  devices_info_text:
    'Observera: har du en BEEP base? Använd BEEP base appen för att lägga till din enhet. Den kommer då automatiskt att visas I listan nedan.',
  devices_url_text: 'Här hittar du mer info om BEEP based appen.',
  alert_explanation_1:
    'Om du har era BEEP base eller annan enhet så kan du ställa in varningar/larm , på ett sätt som gör att du får en varning/larm när vissa värden uppnås. Till exempel en plötslig viktminskning beroende på svärmning. Varningar visas i denna app, men du kan också välja att få dem i din mejl.',
  alert_explanation_2:
    'För att komma igång finns det några förinställda varningsregler som du kan använda (och anpassa till dina behov). Dessutom kan du skapa dina egna varningsregler.',
  alertrules_url_text:
    "Gå till 'Alert settings' för att skapa din första varningsregel",
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Bigårdsskötsel',
  Move: 'Flytta',
  Current_apiary: 'Nuvarande bigård',
  sensor_key: 'Unikt id för enhet',
  disabled_settings: 'Manuell redigering av dessa inställningar är frånslagen.',
  Address_placeholder: 'Nummer, gatunamn, Stad',
  first_create_apiary: 'Först, skapa en bigård',
  Unknown: 'Okänd',
  unknown: 'okänd',
  research_warning:
    'Observera: Om du inte fick en inbjudan att delta, behöver du inte ge medgivande för att dela dina data, eftersom dina data inte kommer att användas i såfall.',
  research_explanation_p1:
    'BEEP plattformen används I de forskningsprojekt som listas nedan. Efter det att du inbjudits att delta I ett forskningsprojekt, då måste du ge ditt medgivande till forskarna att de får tillgång till dina bidata.',
  research_explanation_p2:
    'Du kan närsomhelst dra tillbaka ditt medgivande. Från den tidpunkten och framåt kommer inga nya data att delas med forskarna. De data du red<n delat med forskarna under den period du gett ditt medgivande kommer fortsatt vara tillgängliga för forskningen. Om du har frågor, rikta dem till kontaktpersonen för forskningsprojektet.',
  research_info:
    'Innan du ger ditt medgivande, gå igenom projektbeskrivningen som du hittar om du följer länken nedan, och städ frågor om du behöver ytterligare detaljerad information.',
  save_and_delete: 'Spara och radera',
  drag_layers_info_text:
    'Dra lådor/lager från vänstra sidan till önskad position på den högra sidan. Radera en låda/lager från kupan genom att klicka på den och sen klicka på den röda ikonen. Även inom kupan kan lådor/lager dras till önskad position om man vill justera något. Färgen på era låda/lager kan redigeras genom att kicka på lådan.',
  New_hive: 'Ny kupa',
  New_alertrule: 'Ny varningsregel',
  Add_alertrule: 'Lägg till varningsregel',
  Add_apiary: 'Lägg till bigård',
  Add_sensor_definition: 'Lägg till definition av givare',
  Add_member: 'Lägg till medlem',

  alert_rule_deleted: 'Varningsregel har raderats',
  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B.: givardefinitioner kommer att sparas eller läggas till först efter det att man klickat på den gröna checkikonen i slutet av givardefinitionsraden i tabellen.',
  delete_sensordef: 'Radera givar definition',
  delete_all_alerts: 'Radera alla varningar',
  delete_all_alerts_warning:
    'Är du säker på att du vill radera alla varningar? De kan inte återställas.',
  delete_all_alerts_warning_filter_active:
    'Är du säker på att du vill radera alla varningar? Även varningar som INTE matchar din sökning kommer att raderas. De kan inte återställas.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified:
    'Jag har verifierat min email adress och skulle vilja logga in',
  password_recovery_resend_mail: 'Skicka en ny verifikationskod',
  alert_rule_created: 'Ny varningsregel har skapats',
  select_all: 'Välj alla',
  During: 'Under',
  Calculation_minutes: 'Hur ofta vill du att beräkningen ska göras?',
  Every: 'Varje', // context: how often would you like the alert rule calculation to be performed? -&gt; every 15 min, ..., every 24 hours etc.
  every: 'varje',
  Calculation_minutes_short: 'Hur ofta beräknas det?', // for alert rule overview table header
  Alert_on_occurences_short: 'När får du varningen?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Slå av varning för denna kupa',
  Alert_disabled_for_this_hive: 'Varning för denna kupa är frånslagen',
  disabled_for_hive: 'har slagits från för kupa', // [alert] has been disabled for the following hive
  Alert_disabled: 'Varning frånslagen',

  Log_data_import: 'Import log data',
  Log_files: 'Log filer', // Flashlogs
  Upload_date: 'Ladda upp data',
  Messages: 'Meddelanden',
  Log_time: 'Tid loggad',
  File_size: 'Filstorlek',
  check_log_data: 'Kontrollera loggad data', // Check_flashlog
  delete_log_file: 'Radera log fil', // Delete_flashlog
  commit_log_data_short: 'Importera log data', // commit_flashlog_short
  commit_log_data: 'Importera data från denna logfil till BEEP appen: ', // commit_flashlog
  // flashlog_url_text
  import_log_data_url_text:
    'Här hittar du en hjälpartikel om hur man laddar ner loggad data med BEEP base appen.',
  // flashlog_support_url
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000697129-download-beep-base-data-through-bluetooth',

  Immediately: 'Genast',
  alertrule_active_no_email_sentence:
    ', och jag öppnar BEEP appen för att se varningarna.',
  alertrule_active_email_sentence:
    ', och jag får varningarna via email. Dessutom kan jag se dem I BEEP appen.',
  First_occurence: 'Först:',
  Last_occurence: 'Sist: ',
  // default alert rule names:
  Hive_stability_and_theft: 'Kupstabilitet &amp; Stöld',
  Temperature_sensor_defect: 'Temperatur givare defekt',
  Battery_low: 'Batterispänning låg',
  Honey_harvest: 'Honungsskörd',
  Hive_temperature: 'Kuptemperatur låg',
  Brood_temperature: 'Yngeltemperatur låg',
  No_measurements: 'Inga mätningar',
  Swarm: 'Svärm',
  Food_supply_low: 'Fodertillgång låg',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Viktsförlust för kupan är större än inställt gränsvärde',
  Temperature_sensor_malfunctions: 'Temperaturgivare ur funktion',
  Battery_voltage_is_below_a_set_value: 'Batterispänning under satt gränsvärde',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Viktökning beroende på nektarinsamling avstannar',
  Hive_temperature_drops_below_a_set_value:
    'Kuptemperaturen faller under satt gränsvärde',
  Temperature_in_the_brood_below_a_set_value:
    'Temperaturen I yngelklotet har fallit under satt gränsvärde',
  No_measurement_data_received_in_a_set_time_period:
    'Inga mätdata erhållna under viss bestämd tidsperiod',
  Sudden_weight_drop_triggers_alert_immediately:
    'Plötslig viktförlust för kupan triggar omedelbart en varning. N.B.: detta baseras på dataöverföringsintervall på 15 min. Om din enhet har ett annat dataöverföringsintervall ska du justera gränsvärdet i linje med det.',
  The_hive_weight_is_below_a_set_value: 'Kupvikten är lägre än satt gränsvärde',

  minute: 'minut | minuter',
  upload_interval_warning_single_interval:
    'N.B.: dataöverföringsintervallet för din enhet är | N.B.: datalöverföringsintervallet för dina enheter är', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'N.B.: dataöverföringsintervallen för dina enheter varierar mellan ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Inte relevant för omgående beräkning',
  Increase: 'Öka',
  Decrease: 'Minska',
  Every_hour: 'Varje timma',
  every_hour: 'varje timma',
  Absolute_value_of_dif: 'Change', // context: 'Förändring är ett ord lättare att förstå än `det absoluta värdet av skillnaden mellan 2 värden.
  In_case_of_good_connection_warning:
    '*Omedelbart efter en mätning mottagits. Detta är beroende av dataöverföringsintervallet och data förbindelsens pålitlighet.',
  Alertrule_summary_title: 'Sammanfattning',
  Alertrule_settings_title: 'Inställningar varningsregler',
  Alertrule_exclude_title: 'Uteslut perioder och kupor',
  of: 'från',

  alerts_url_text: 'Läs hjälpartikeln om varningar',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-alerts',

  /* New translations v3.0.74 */
  Decline: 'Decline',
  Decline_invitation: 'Decline invitation',
  Decline_invitation_sure:
    'Are you sure you would like to decline the group invitation?',
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
    '*N.B. you will only receive alerts about the selected measurement if it is measured by your BEEP base / device.',
  Relative_startpoint: 'Relative',

  import_log_data_explanation:
    "In the BEEP base app you can download log data from the internal memory of the BEEP base. Every time you download log data, the internal memory gets cleared and the data gets uploaded to the BEEP app. Below is the list of your downloaded log data. You can view the log data by clicking the button 'Check log data'. As a result of this check you will see blocks of data that may or may not contain matches with the database data. For each block that contains matches you can view the log data and database data in a chart, and choose to supplement the data in the database with the log data.",
  // old translation (slightly different wording) :     "I BEEP appen kan du ladda ner loggad data från det interna minnet I BEEP base. Varje gång du laddar ner loggad data, rensas internminnet och data laddas upp till till BEEP appen. Nedan finns din lista över nedladdad loggad data. Du kan ersätta datan I databasen med data inne I de nedladdade logfilerna genom att klicka på knappen 'Kontrollera loggad data'.  Då kontrolleras först hur mycket data som kommer att ersättas I databasen,och him tiden I logfilen är korrekt. Du får en bekräftelse box med resulterande info, och en möjlighet att applicera eller neka bytet av info.",
  Log_data: 'Log data',
  Flashlog: 'Log',
  Block: 'Block',
  Nr_of_match_props: 'Number of identical values per match',
  no_admin: 'You must be an admin to view this page',

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

  Data_imported: 'Data imported',
  undo_import: 'Undo import',
  undo_block_import_exp:
    'Are you sure that you want to delete the previously imported data from this block from the database?',
  data_deleted: 'Data deleted',
  data_not_deleted: 'Data not deleted',
  deleted_measurements: 'Deleted measurements',
  deleted_days: 'deleted days',
  Memory_erased: 'BEEP base memory emptied',
  Export: 'Export',
  Export_as_json: 'Export as JSON data',
  Export_as_csv: 'Export as .csv file',
  Export_full_json: 'Export full JSON',
  Export_full_csv: 'Export full .csv',
  Export_file_being_saved:
    'Export file will be saved in your Downloads folder - wait a moment please',
  no_data_deleted_because_no_matches_found:
    'No data deleted because no matches were found',
  nr_of_measurements: 'number of measurements',

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

  /* Checklists page */
  new_checklist: 'New checklist',
  duplicate: 'Duplicate',
  delete_checklist: 'Delete checklist',
  delete_checklist_confirm:
    'Are you sure you want to delete this checklist? This cannot be undone. Checklist: "',

  /* Menu items */
  View_measurements: 'Visa mätvärden',
  View_inspection: 'Visa inspektion | Se inspektioner',
  View_alert: 'Visa varning | Visa varningar',

  Edit_alertrule: 'Redigera varningsregel',
  Edit_hive: 'Redigera kupan',
  Edit_queen: 'Redigera drottning',
  Edit_apiary: 'Redigera bigård',
  Edit_group: 'Redigera samarbetsgrupp',
  Edit_group_short: 'Redigera grupp',
  Edit_checklist: 'Redigera checklista',
  Edit_devices: 'Redigera enheter',
  Edit_consent: 'Redigera samtycke',
  Edit_hivetag: 'Edit hive tag',

  Hivetag: 'Hive tag | Hive tags',
  Hivetag_exp_1:
    "‘Hive tags’ are QR codes you can attach to a hive, and for which you can set an action that will be performed as soon as you scan the hive tag. An 'action' refers to actions in the BEEP app, such as creating a new inspection for the relevant hive. Once the hive tag has been set up, you only need to scan the QR code with your smartphone, and a new inspection will be automatically created. You can print the hive tags yourself, by ",
  Hivetag_download_text: 'downloading this pdf.',
  Hivetag_exp_2:
    ' Just scan a hive tag to get started, you will be taken to the setup page automatically if no action has been set yet.',
  qrcode: 'QR Code | QR Codes',
  Qrcode_exp1: "Attach the hive tag with number '",
  Qrcode_exp2: "' to a hive.",
  Qrcode_note:
    'Please note: the above QR code is not the actual hive tag, it is only meant as an example.',
  Download_hivetags: 'Download hive tag pdf',
  Delete_hivetag: 'Delete hive tag',
  for_hive: 'for hive "',
  Add_hivetag: 'Add hive tag',
  Select_hivetag_number: 'Select a hive tag number',
  Select_hive: 'Select a hive | Select hives',
  Select_hive_for_hivetag_exp:
    'For which hive would you like to perform the action? Select one hive.',
  Select_hivetag_action: 'Select an action',
  Select_hivetag_action_exp:
    'Which action would you like to perform, after scanning the QR code?',
  Hivetag_hive_in_overview: 'Show hive in hives overview',
  Hivetag_new_inspection: 'Create a new inspection',
  Hivetag_edit_hive: 'Edit hive configuration',
  Hivetag_view_inspections: 'View inspections',
  No_hivetags_left:
    'All hive tags are currently in use. Remove an existing hive tag in order to add a new one, or modify it.',

  Select_hives_for_consent: 'Select hives for consent',
  Select_hives_for_consent_exp:
    'Select the hives whose data you want to share with this research',
  View_alert_confirm: 'Would you like to view the alert "',

  /* iOS device prompt for adding BEEP app to home screen */
  pwa_title: 'Use BEEP as an app?',
  pwa_body:
    'Add BEEP to your home screen to use it as a web app and in full screen. You will stay signed in after signing in once.',
  pwa_share_button_label: '1. Tap the share icon in the menu bar below.',
  pwa_addhome_button_label: "2. Tap 'Add to home'.",

  Colony: 'Colony | Colonies',
  Dashboard: 'Dashboard | Dashboards',
  Last_check: 'Last check-up',
  Note: 'Note',
  no_chart_data_hive: 'No chart data available for this hive',

  Code: 'Code',

  Dashboard_exp:
    "Create a dashboard via the 'New dashboard' button at the top right. You can then select hives that you would like to show on a public dashboard that is accessible at a separate url (for anyone with the code). Hives (and their measurements + latest inspection) will be shown one at a time.",
  create_dashboard_question: 'No dashboard yet? Create one via the BEEP app',
  New_dashboard: 'New dashboard',
  Edit_dashboard: 'Edit dashboard',
  Delete_dashboard: 'Delete dashboard',
  Logout_dashboard: 'Sign out',
  Logout_dashboard_check:
    'Are you sure you want to sign out / switch dashboard?',
  weight_example_chart_1: 'Bees are collecting nectar',
  weight_example_chart_2: 'Bees use their food supply',
  weight_example_chart_3: 'A swarm!',
  weight_example_chart_4: 'The hive has been enlarged',
  t_example_chart_1: '34°C: healthy brood',
  t_example_chart_2: '< 33°C: no brood',
  Select_hives_for_dashboard_exp:
    'Which hives would you like to show in this dashboard? Select multiple hives (up to 12) for optimal effect. For hives with a device, temperature and weight data will be shown (if present). Only owned hives can be selected.',
  Max_hives_warning: 'The maximum number of hives has been reached',
  Title: 'Title',
  Dashboard_title_exp: "Default title is 'Dashboard' (if none is provided).",
  Dashboard_description_exp:
    'Please note: this description will not be shown on the dashboard. It can be used to store extra information, f.e. for whom this dashboard is intended',
  Pace: 'Pace (seconds)',
  Dashboard_pace_exp: 'Pace at which each hive is shown (on rotation)',
  Dashboard_interval_exp:
    'Show measurement data from the previous hour/day/week/month/year or a custom period',
  Show_inspections: 'Show inspections',
  Show_inspections_exp:
    'Show the most recent inspection (date, overall impression and note).',
  Show_all_hives: 'Show details for all hives',
  Show_all_hives_exp:
    'Show details (location, last inspection, measurement data) for all selected hives (YES), or only for hives with a device (NO, recommended option)',
  Preview_share: 'Preview & share',
  Copy_url: 'Copy url',
  /* offline inspection sheet */
  Hour_short: 'Hr | Hrs',
  Day: 'Dag | Dagar',
  Minute: 'Minute | Minutes',
  Percentage_exp: 'Percentage between 0 and 100',
  Grade_exp_1: 'Grade between 1 and 10',
  Grade_exp_2: '(1 = Poor, 10 = Excellent)',
  Degrees_exp_1: 'Number of degrees between',
  Degrees_exp_2: '-180° and 180°',
  Negative_exp: 'Negative number (below 0)',
  Too_many_items_exp_1: 'There are too many options to',
  Too_many_items_exp_2: 'print, fill in your own answer',
  Image_placeholder_1: 'This picture can be added later',
  Image_placeholder_2: 'via the BEEP app (optional)',
  Samplecode_placeholder_1: 'Sample code can be generated when',
  Samplecode_placeholder_2: 'uploading inspection in BEEP app',
  Too_long_list_present:
    'List of options too long to display on the offline checklist for the item:',
  Too_long_list_present_fix_1: 'If possible, decrease the number of options to',
  Too_long_list_present_fix_2:
    "or less, via the 'Edit checklist' button. Or fill in the correct answer manually.",

  Print: 'Print',
  Print_checklist: 'Print checklist',
  Print_checklist_exp: 'Make sure to use the following printer settings:',
  Print_checklist_exp_1: 'Paper format: A4',
  Print_checklist_exp_2: 'No margins',
  Print_checklist_exp_3: 'Black & white',
  Print_checklist_exp_4: 'Single sided',

  /* inspection modes */
  Offline_inspection: 'Paper inspection',
  Offline_inspection_exp:
    "Print the checklist, fill it in manually. Upload photos of your inspection sheets later via the 'Upload paper inspection' button. The photos will then be automatically parsed and can be verified and saved like a normal (digital / online) inspection.",
  Online_inspection: 'Digital inspection',
  Online_inspection_exp:
    'Fill in your checklist digitally (online) via your computer, tablet or smartphone, like you are used to',
  Upload_inspection: 'Upload paper inspection',
  Upload_inspection_exp:
    'If you have completed a paper inspection, you can upload photos of your inspection sheets here. They will then be automatically parsed and can be verified and saved like a normal (digital / online) inspection.',
  Select_inspection_mode: 'Select inspection mode',
  Send_pictures: 'Send pictures',
  svg_checklist: 'printed checklist | printed checklists',
  Select_input_language:
    'Select language in which checklist has been filled in',
  Upload_images: 'Upload images',
  Upload_images_exp: 'Please take care of the following when taking pictures:',
  Upload_images_exp_1:
    'Is the Print ID of each page equal to the Print ID of the above selected printed checklist?',
  Upload_images_exp_2: 'Are all 4 black squares in view?',
  Upload_images_exp_3: 'Is the paper wel lit and lying on a flat surface?',
  Upload_images_exp_4: 'TODO: use image scanner?',
  Uploading_images_be_patient:
    'Please wait a moment, your images are being parsed. This may take several minutes. Please do not close this window.',
  Generating_svg_be_patient:
    'Please wait a moment, your printable checklist is being generated. This may take a little while. Please do not close this window.',
  Parsed_pages: 'Parsed pages',
  Number_of_processed_pages: 'Number of parsed pages: ',
  Incorrectly_uploaded_pages: 'Incorrectly uploaded page numbers: ',
  Missing_page: 'Missing page number | Missing page numbers',
  Check_svg_id_for_page:
    'Check Print ID for page number | Check Print ID for page numbers',
  correct_svg_id: 'correct Print ID',
  Svg_id_exp:
    'The Print ID can be found at the top right of the page, to the left of the page number. Upload the paper inspection again with the correct pages and/or select the correct printed checklist',
  All_svg_ids_correct: 'Correct printed checklist has been selected',
  All_svg_ids_incorrect: 'Incorrect printed checklist has been selected',
  No_checklist_svg: 'No checklists have been printed yet',
  No_checklist_svg_exp:
    "Before uploading a paper inspection, a checklist should be printed (and filled in) first. Go to 'Paper inspection' to print your checklist, or instead submit a completely digital inspection via 'Digital inspection'.",
  checklist_svg_exp:
    "Please select a printed checklist below. Make sure that the Print ID (and hence the name) is equal to the Print ID (and name) of your paper inspection. You can find the Print ID at the top right corner of each page, the name is printed at the top left corner. Please note: a digital checklist can be saved as a 'printed checklist' under different Print IDs, if any of its content has been changed in between print sessions. Edits to a digital checklist are therefore only reflected in a printed checklist if the checklist was printed after the changes were made. The date (and time) behind the name refer to when a specific version of the checklist was printed for the first time.",

  /* Compare module */
  Load: 'Load',
  Compare: 'Compare',
  Select_hives_for_compare: 'Select hives to compare with',
  Select_hives_for_compare_exp:
    'Select the hives with which you would like to compare the data',
  mean_weight_kg: 'Mean weight',
  mean_net_weight_kg: 'Mean net weight',
  net_weight_kg: 'Net weight',
  overall_intake_loss: 'Overall intake/loss',
  Compare_hives: 'Compare hives',
  Compare_with_mean: 'Compare hive weight with mean weight of other hives',
  compare_hives_exp:
    'Find out how your hive is developing compared to your other hives in the area. ',
  compare_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000921124-compare-hives-option',
  compare_url_text:
    'Here you can find more information on the Compare functionality',
  selected_hive: 'selected hive | selected hives',
  Multiple_hives_charts: 'Compare multiple hives in one chart',
  compare_no_chart_data: 'No compare data for the selected period',
  multiple_hives_no_chart_data:
    'No data for the selected hives for the selected period',
  /* below, please keep [hivename] as is, it will be replaced by the name of the hive you selected in the Data tab */
  compare_chart_exp:
    'Please note: [hivename] will not be included in the mean weight calculation. ',

  /* below, please keep [pagenr] as is, it will be replaced by the pagenumber to be uploaded */
  Upload_pagenr: 'Upload page [pagenr] here',
  Datetime_of_inspection: 'Date & time of inspection',
  remind_datetime: 'Notification date & time',

  cumulative_daily_weight_anomaly: 'Cumulative daily weight anomaly',
  colony_failure_weight_history:
    'Probability of winter failure based on weight history',
  more_info: 'more information',

  api_token: 'Api token',
  save_api: 'Save api token',
}

export default translations
