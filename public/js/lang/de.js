/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ],
  Today: 'Heute',
  Clear: 'Löschen',
  Close: 'Schließen',
  firstDay: 1,
  format: 'dddd d mmmm yyyy',

  /* main */
  Website: 'Webseite',
  Feedback: 'Feedback',
  Feedback_mail_header: 'BEEP app feedback',
  Feedback_mail_body:
    'Dear BEEP foundation,%0D%0A%0D%0AHereby my feedback about the BEEP app.%0D%0A%0D%0AI discovered this:%0D%0A%0D%0AJust before that happened, i did:%0D%0A%0D%0AThe screen was looking like (please include a screenshot):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info: 'Diagnostic information (in case of a bug):%0D%0A',
  back: 'Zurück',
  menu: 'Menü',
  lighting: 'Beleuchtung',
  camera: 'Kamera',
  weather: 'Wetter',
  sensors: 'Sensoren',
  no_valid_authentication: 'Keine gültigen Authentifizierungsdaten erhalten',
  succesfully_saved: 'Erfolgreich gesichert',
  switch_language: 'Sprache wechseln',
  Delete: 'Löschen',
  Search: 'Suchen...',

  /* user error messages */
  User: 'Benutzer',
  User_data: 'Benutzerdaten',
  user_data: 'Benutzerdaten',
  updated: 'aktualisiert',
  delete_complete_account:
    'Bist Du sicher, dass Du Deinen kompletten Account sämtlich aller Daten löschen möchtest? Es ist unwiderruflich',
  username_is_required: 'Bitte Benutzernamen eingeben',
  username_already_exists: 'Der Benutzername existiert bereits',
  password_is_required: 'Bitte gib ein Passwort ein',
  email_is_required: 'Bitte gib eine Email-Adresse an',
  email_already_exists: 'Die Email-Adresse ist bereits in Verwendung',
  policy_accepted_is_required:
    'Um Dich zu registrieren, musst Du die Benutzungsbedingungen akzeptieren',
  already_registered: 'Ich bin bereits registriert',
  invalid_user: 'Der Benutzer konnte nicht gefunden werden',
  no_password_match: 'Falsches Passwort',
  invalid_token: 'Falscher Code',
  no_valid_email: 'Falsche Emailadresse',
  empty_fields: 'Bitte alle Felder ausfüllen',
  match_passwords: 'Falsches Passwort',
  succesfully_registered: 'Du wurdest erfolgreich registriert',
  authentication_failed: 'Authentifizierung fehlgeschlagen',
  no_valid_input_received:
    'Die Daten konnten nicht gesichert werden- keine gültigen Daten erhalten.',
  remove_all_settings: 'Entferne alle Einstellungen',
  remove_apiary: 'Entferne Bienenstand',
  remove_hive: 'Entferne Beute',
  remove_inspection: 'Entferne Durchsicht',
  Error: 'Fehler | Fehler',
  Warning: 'Warnung',
  first_remove_hives:
    'Da sind bereits Beuten an diesem Ort. Der Ort kann gelöscht werden, wenn alle Beuten an einen anderen Ort transferiert oder gelöscht wurden.',
  Date: 'Datum',
  ok: 'Ok',
  prev: 'vorherige',
  next: 'Nächste',
  add: 'hinzufügen',
  Cancel: 'Abbrechen',

  /* login */
  login_title: 'Login',
  login: 'Login',
  back_to_login: 'Zurück zum Login',
  forgot_password: 'Passwort vergessen?',
  username: 'Benutzername',
  password: 'Passwort',
  confirm_password: 'Password bestätigen',
  email: 'Email',
  token: 'Code',
  create_login_question:
    'Noch keinen Account? Registriere Dich als neuer Benutzer',
  create_login: 'Als neuer Benutzer registrieren',
  create_login_summary: 'Lege einen neuen Benutzer an',
  save: 'Sichern',
  save_and_return: 'speichern und zurück',
  logout: 'Ausloggen',
  logout_title: 'Ausloggen als ',
  logout_now: 'Willst Du Dich jetzt wirklich ausloggen?',
  member_since: 'BEEPler seit',

  /* password recovery */
  password_recovery_title: 'Hast Du Dein Passwort vergessen?',
  password_recovery_remembered:
    'Oh, jetzt erinnere ich mich wieder an mein Passwort!',
  password_recovery_user: 'Benutzer information',
  password_recovery_send_mail: 'Sende Verificationscode',
  password_recovery_code_not_received:
    'Verifikationscode nicht innerhalb von 5 minuten erhalten?',
  password_recovery_enter_code:
    'Verifikationscode bekommen? Bitte hier eingeben',
  password_recovery_reset_title: 'Gib ein neues Passwort an',
  password_recovery_reset_password: 'Passwort ändern',
  password_recovery_reminder_success:
    'Eine Email wurde versendet. Bitte klicke auf den link in Deiner Email um das Passwort für diesen Account zurückzusetzen.',
  password_recovery_reminder_summary:
    'Bitte Email-Addresse eingeben. Du wirst eine Email erhalten mit einem Link um Dein Passwort ändern zu können',
  password_recovery_reset_summary:
    'Bitte benutze den Code den Du erhalten hast um ein neues Passwort für Deinen Account eingeben zu können',
  password_recovery_reset_success:
    'Dein Passwort wurde erfolgreich geändert und Du bist eingeloggt.',
  new_password: 'Neues Passwort',
  confirm_new_password: 'Bestätige das neue Passwort',
  go_to_dashboard: 'Gehe zu meiner Übersichtstabelle',

  /* overview */
  overview_title: 'Übersicht',
  overview: 'Übersicht',
  color: 'Farbe',
  state: 'An/Aus',
  connection_state: 'Status der Verbindung',

  /* hives */
  locations_title: 'Bienenstände',
  hives_title: 'Beuten',
  Hive: 'Beute | Beuten',
  hive: 'Beute | Beuten',
  Location: 'Bienenstand | Bienenstände',
  location: 'Bienenstand | Bienenstände',
  Name: 'Name',
  name: 'Name',
  Type: 'Typ',
  type: 'Typ',
  Layer: 'Zarge',
  layer: 'Zarge',
  brood: 'Brut',
  honey: 'Honig',
  inspect: 'durchsehen',
  inspection: 'Durchsicht | Durchsichten',
  Inspection: 'Durchsicht | Durchsichten',
  New_inspection: 'Neue Durchsicht',
  Edit_inspection: 'Bearbeite Durchsicht',
  Action: 'Bearbeitung | Bearbeitungen',
  Conditions: 'Bedingungen (geprüft)',
  edit: 'Bearbeite',
  Hive_layer_amount: 'Zargenanzahl',
  Bee_race: 'Bienenrasse',
  Birth_date: 'Geburtstag',
  Color: 'Farbe',
  Queen_colored: 'Königin gezeichnet',
  Queen_clipped: 'Flügel beschnitten',
  Queen_fertilized: 'Königin begattet',
  Age: 'Alter',
  years_old: 'Jahre alt',

  /* Hive check items */
  Date_of_inspection: 'Datum der Durchsicht',
  action: 'Aktion',
  reminder: 'Erinnerung',
  remind_date: 'Aufzeichnungsdatum',
  overall: 'Im Ganzen',
  positive_impression: 'Gesamteindruck',
  needs_attention: 'braucht Aufmerksamkeit',
  notes: 'Anmerkungen',
  notes_for_next_inspection:
    'Kurze Anmerkung für die nächste Durchsicht (in der Übersicht zu sehen)',
  Not_implemented_yet: 'Dieser Punkt ist noch nicht implementiert',
  save_input_first: 'Möchtest Du Deine Eingabe erst sichern?',

  /* dashboard */
  dashboard_title: 'Übersichtstabelle',
  dashboard: 'Übersichtstabelle',
  measurementsError:
    'Kann keine Messungen laden, bitte Netzwerkverbindung prüfen',
  last_measurement: 'Letzte aufgezeichnete Messung war',
  at: 'am',
  measurement_system: 'BEEP Meßsystem',
  no_data: 'Kein Data',
  no_chart_data: 'Kein Graph für den gewählten Zeitraum',

  /* settings */
  General: 'Generell',
  Place: 'Standort',
  Country: 'Land',
  City: 'Stadt',
  Address: 'Addresse',
  latitude: 'latitude',
  Longitude: 'Longitude',
  Street: 'Straße',
  Number: 'Hausnummer.',
  Postal_code: 'Postleitzahl',
  Description: 'Beschreibung',
  Hive_settings: 'Beute Einstellung',
  Hive_amount: 'Anzahl der Beuten an diesem Ort',
  Hive_prefix: 'Beutenprefix (vor der Zahl)',
  Hive_number_offset: 'Startnummer Beute',
  Hive_type: 'Beutentyp',
  Hive_layers: 'Zargen',
  Hive_frames: 'Rähmchen per Zarge',
  Hive_color: 'Beutenfarbe',
  Queen: 'Königin',
  queen: 'Königin',
  settings_title: 'Einstellungen',
  settings_description: 'Einstellungen der Sensoren',
  Settings: 'Einstellungen',
  settings: 'Einstellungen',
  sensors_title: 'Sensoreinstellungen',
  sensors_description: 'Sensor Status und Registrierung',
  // sensors : 'Sensoren',
  sensor: 'Device',
  Select: 'Wähle',
  Not_selected: 'Nicht gewählt',
  Poor: 'Arm',
  Fair: 'Fair',
  Average: 'Durchschnitt',
  Average_slider: 'Durchschnitt',
  Good: 'Gut',
  Excellent: 'Excellent',
  Low: 'Tief',
  Medium: 'Mitte',
  High: 'Hoch',
  Extreme: 'Extrem',

  /* colors */
  select_color: 'Wähle eine Farbe',
  advanced: 'Erweitert',

  /* sensors */
  Select_sensor: 'Wähle einen Sensor',
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
  light: 'Sonnenlicht',
  l: 'Sonnenlicht',
  water: 'Wasser',
  w: 'Gewicht (alt)',
  humidity: 'Feuchtigkeit',
  h: 'Feuchtigkeit',
  air_pressure: 'Luftdruck',
  p: 'Luftdruck',
  weight: 'Gewicht',
  w_v: 'Gewichtssensor Wert für alle',
  w_fl: 'Gewichtssensor Wert vorne links',
  w_fr: 'Gewichtssensor Wert vorne rechts',
  w_bl: 'Gewichtssensor Wert hinten links',
  w_br: 'Gewichtssensor Wert hinten rechts',
  weight_kg: 'Gewicht',
  weight_kg_corrected: 'Gewicht (korrigiert)',
  weight_combined_kg: 'Gewicht kombiniert',
  bat_volt: 'Batterie',
  bv: 'Batterie',
  sound_fanning_4days: 'Fan 4d Bienen',
  s_fan_4: 'Fan 4d Bienens',
  sound_fanning_6days: 'Fan 6d Bienen',
  s_fan_6: 'Fan 6d Bienen',
  sound_fanning_9days: 'Fan 9d Bienen',
  s_fan_9: 'Fan 9d Bienen',
  sound_flying_adult: 'Fliegende Bienen',
  s_fly_a: 'Fliegende Bienen',
  sound_total: 'Gesamtgeräusch',
  s_tot: 'Totaler Sound',
  s_spl: 'Totaler Sound',
  bee_count_in: 'Bienenzähler nach innen',
  bc_i: 'Bienenzähler nach innen',
  bee_count_out: 'Bienenzähler nach außen',
  bc_o: 'Bienenzähler nach außen',
  t_i: 'Innentemperatur',
  rssi: 'Signalstärke',
  snr: 'Signalrauschen',
  Sound_measurements: 'Geräuschmessungen',
  Sensor_info: 'Sensorinfo',
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
  precipIntensity: 'Niederschlag',
  precipProbability: 'Regenwahrscheinlichkeit',
  precipType: 'Regentyp',
  outsideTemperature: 'Außentemperatur',
  apparentTemperature: 'Gefühlte Temperatur',
  dewPoint: 'Taupunkt',
  // 'humidity'              : 'Feuchtigkeit',
  pressure: 'Luftdruck',
  windSpeed: 'Windgeschwindigkeit',
  windGust: 'Windböen',
  windBearing: 'Windrichtung',
  cloudCover: 'Wolkendecke',
  uvIndex: 'UV index',
  visibility: 'Sichtweite',
  ozone: 'Ozon',

  /* Measurements */
  Hour: 'Stunde',
  hour: 'Stunde | Stunden',
  day: 'Tag | Tage',
  week: 'Woche',
  month: 'Monat',
  year: 'Jahr',

  /* settings */
  could_not_load_settings: 'Die Einstellungen konnten nicht geladen werden',
  offline: 'Keine Verbindung',
  remote: 'Fernbedienung',
  connected: 'Direkt',
  yes: 'Ja',
  no: 'Nein',
  footer_text: 'Open source Bienenhaltung',
  beep_foundation: 'the BEEP foundation',
  Checklist: 'Stockkarte |  Stockkarten',
  checklist: 'Stockkarte |  Stockkarten',
  Checklist_items: 'Stockkarte Artikel',
  edit_hive_checklist:
    'Aktiviere / deaktiviere die Kästchen in der Liste, um Artikel aus Deiner Stockkarte hinzuzufügen oder zu entfernen. Du kannst die Artikel auch entfalten/falten und ziehen/ablegen, um sie an Deinen eigenen Stil anzupassen.',

  /* user */
  Data_export: 'Daten Export',
  Export_your_data:
    "Exportiere alle Daten aus Deinem Account per Email (Exceldatei) (OR download the Excel file via the 'Download CSV' button).",
  Terms_of_use: 'Nutzungsbedingungen',
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  accept_policy:
    'Ich akzeptiere die BEEP-Nutzungsbedingungen, die mit dem neuen europäischen Datenschutzgesetz vereinbar sind',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy:
    'Du hast die aktuellen Nutzungsbedingungen noch nicht erfüllt.',

  /* weight calibration settings */
  calibrate_weight: 'Kalibriere Gewicht',
  calibrate_explanation:
    'Stelle das Gewicht der Sensoren auf 0 ein, indem Du den aktuellen Messwert subtrahierst.',
  set_as_zero_value: 'Setze diese Werte als 0 Werte',
  set_weight_factor: 'Definiere den Gewichtsfaktor',
  own_weight_kg: 'Wie hoch ist Dein Eigengewicht in kg??',
  start_calibration:
    'Trete nun auf die Waage und drücke die Taste unten, um den Gewichtsfaktor festzulegen. Verteile Dein Gewicht gleichmäßig.',
  currently_there_is: 'Da ist ein Gewicht von',
  nothing: 'nichts',
  on_the_scale: 'auf der Skala',
  calibration_started:
    'Kalibrierung gestartet... Warte auf die nächste Messung.',
  calibration_ended: 'Kalibrierung erfolgreich!',

  /* General items */
  server_down:
    'Die App ist aufgrund von Wartungsarbeiten nicht verfügbar. Bitte versuche es später erneut',
  add_to_calendar: 'Zum Kalender hinzufügen',
  sort_on: 'Sortieren nach',
  Whats_new: 'Neu!',
  Manual: 'Anleitung',
  Site_title: 'BEEP | Bienenmonitor',
  could_not_create_user:
    'Benutzer kann derzeit nicht erstellt werden. Entschuldigen Sie die Unannehmlichkeiten und versuchen Sie es später erneut. ',
  email_verified: 'Ihre E-Mail-Adresse wurde verifiziert.',
  email_not_verified: 'Ihre E-Mail-Adresse wurde noch nicht bestätigt.',
  email_new_verification:
    'Klicken Sie auf diesen Link, um eine neue Bestätigungs-E-Mail zu senden.',
  email_verification_sent:
    'Eine Nachricht mit einem Bestätigungslink wurde an Deine E-Mail-Adresse gesendet. Klicke auf den Link in der E-Mail, um Dein Konto zu aktivieren und anzumelden. ',
  email_verification_resent:
    'Eine neue Nachricht mit einem Bestätigungslink wurde an Deine E-Mail-Adresse gesendet. Klicke auf den Link in der E-Mail, um Dein Konto zu aktivieren und anzumelden. ',

  not_filled: 'ist erforderlich, aber nicht ausgefüllt',
  cannot_deselect:
    'Dieses Objekt kann nicht entfernt werden, da es ein erforderliches Objekt enthält',
  Undelete: 'Nicht löschen',
  the_field: 'The',
  is_required: 'ist erforderlich',
  No_groups: 'Keine Gruppen verfügbar',
  not_available_yet: 'noch nicht verfügbar. Bitte erstelle hier die Erste.',
  Users: 'Benutzer',
  member: 'Gruppenmitglied | Gruppenmitglieder',
  Member: 'Gruppenmitglied',
  Members: 'Gruppenmitglieder',
  Invite: 'Einladen',
  Invited: 'Eingeladen',
  Invitation: 'Einladung | Einladungen',
  Admin: 'Administrator',
  Creator: 'Gruppeninhaber',
  Collaborate: 'Kooperieren',
  Group: 'Kollaborationsgruppe | Kollaborationsgruppen',
  group: 'Kollaborationsgruppe | Kollaborationsgruppen',
  group_short: 'Gruppe | Gruppen',
  to_share:
    'mit dieser Gruppe zu teilen. 1 Klick = Gruppenmitglieder können nur anzeigen, 2 Klicks = Gruppenmitglieder können bearbeiten',
  Invitation_accepted: 'Einladung angenommen',
  Accept: 'Akzeptieren',
  My_shared: 'Mein geteiltes',
  invitee_name: 'Name des eingeladenen Teilnehmers',
  Remove_group:
    'Sind Sie sicher, dass Sie diese freigegebene Gruppe für alle Mitglieder der Gruppe vollständig entfernen möchten?',
  Detach_from_group: 'Entferne mich und meine Bienenstöcke aus dieser Gruppe',
  my_hive: 'Mein Beute',
  created: 'erstellt',
  group_detached: 'Die Gruppe erfolgreich verlassen',
  group_activated: 'Gruppeneinladung angenommen',
  group_declined: 'Gruppeneinladung abgelehnt',
  group_explanation_1:
    '1. Erstellen Sie eine neue Kooperationsgruppe mit einem eindeutigen Titel und einer optionalen Beschreibung.',
  group_explanation_2:
    '2. Laden Sie andere BEEP-Benutzer zu ihrer BEEP-E-Mail-Adresse ein.',
  group_explanation_3:
    '3. Teilen Sie bestimmte Bienenstöcke, die von anderen gesehen werden sollen, oder arbeiten Sie zusammen an',
  Filter_and_sort_on: 'Filtern und sortieren nach:',

  /* TO BE TRANSLATED */
  /* New translations v2.2.0 */
  roofed: 'Hat die Beute ein Dach?',
  info: 'Info',
  research: 'Forschung',
  start_date: 'Startdatum',
  end_date: 'Enddatum',
  purpose: 'Forschungszweck',
  institution: 'Forschungsinstitution',
  type_of_data_used: 'Dataverwendung',
  link: 'Link',
  Consent: 'Genehmigung',
  history: 'Vergangenheit',
  Current_consent: 'Aktuelle Genehmigung',
  consent_yes: 'Ich genehmige das Teilen meiner Daten',
  consent_no: 'Ich genehmige das Teilen meiner Daten nicht',
  my_beep_data: 'Meine BEEP-Daten',
  Consent_can_only_be_set: 'Die Genehmigung kann eingestellt werden für',
  earlier: 'frühere',
  later: 'spätere',
  new_apiary_explanation: 'Lege einen neuen Bienenstand in 4 Schritten an',
  start_here: 'Zum starten hier klicken',
  optional: 'optional',
  dimensions: 'Dimensionen',
  details: 'Details',
  configuration: 'Konfiguration',
  adjustments: 'Einstellungen',
  changes_queen_color: 'Farben einstellen',
  Brood_box_and_frame: 'Brutkasten und Rähmchen',
  Hive_order: 'Beutensortierung am Bienenstand',
  bb_width_cm: 'Brutbox Breite (cm)',
  bb_height_cm: 'Brutbox Höhe (cm)',
  bb_depth_cm: 'Brutbox Tiefe (cm)',
  fr_width_cm: 'Rähmchen Breite (cm)',
  fr_height_cm: 'Rähmchen Höhe (cm)',
  queen_line: 'Linie',
  queen_tree: 'Baum',
  queen_description: 'Anmerkungen',
  Hive_short: 'Beute | Beuten',
  Image: 'Bild | Bilder',
  Size: 'Größe',
  preview: 'Vorschau',
  Input: 'Eingang',
  Output: 'Ausgang',
  Last: 'Letzte',
  Export_sensor_data:
    "Exportiere alle Daten eines Gerätes in der höchstmöglichen Auflösung als .csv-Datei, die Du in Excel oder SPSS öffnen kannst. NB: Die Datumszeitdaten in der Spalte 'Zeit' sind in GMT-Zeit, formatiert nach dem RFC 3339 Datum-Zeit-Standard.",
  CSV_export_separator: 'CSV-Daten-Spaltentrenner',
  Selected_date: 'Selektierter Zeitraum',
  Sensor_measurements: 'Sensor Messungen',
  too_much_data:
    'Zu viele Daten, bitte wählen Sie weniger Sensormessungen aus oder reduzieren Sie die Zeitspanne zwischen Start- und Enddatum.',
  beep_base_explanation:
    "Wenn Du eine BEEP-Basis hast (im Bild oben dargestellt), verwende bitte die BEEP-Basis-App (iOS und Android), um die Kommunikation mit dieser App einzurichten. Wenn Du noch keine BEEP-Basis hast, klicke bitte auf den Menüpunkt 'BEEP-Website' für Updates, wie Du eine BEEP-Basis erhälst. Wenn Du ein eigenes Messgerät hast und die Daten in der BEEP-App sehen möchtest, sende uns bitte eine Nachricht mit der Bitte, unserer Slack-Community beizutreten, damit Du Zugriff auf die API-Beschreibung erhälst.",
  sample_code_hive:
    'Wähle zunächst eine Beute, um einen eindeutigen Beispielcode zu erzeugen',
  sample_code_generate: 'Eindeutigen Beispielcode generieren',
  sample_code_delete: 'Eindeutigen Beispielcode löschen',
  measurement_interval: 'Intervall',
  from_weather_service: 'vom Wetterservice',

  /* New translations v3 */
  click_hives_to_filter: 'Klicke zum Filtern auf Beuten',
  for: 'für',
  last_visit: 'Letzter Besuch',
  apiary_details: 'Details zum Bienenstand',
  group_details: 'Gruppendetails',
  diary: 'Tagebuch',
  data: 'Daten',
  photo: 'Foto | Fotos',
  add_checklist: 'Stockkarte hinzufügen',
  add_hive: 'Beute hinzufügen',
  delete_apiary: 'Bienenstand löschen',
  edit_apiary: 'Bienenstand bearbeiten',
  new_apiary: 'Neuer Bienenstand',
  delete_group: 'Gruppe löschen',
  edit_group: 'Gruppe bearbeiten',
  new_group: 'Neue Gruppe',
  verification_code: 'Verifikationscode',
  limit_exceeded: 'Das Limit wurde erreicht, versuche es später erneut',
  confirm_email_title: 'Bestätige Deine Email',
  confirm_email_summary:
    'Du hast einen Verificationscode per Email erhalten. Gib ihn unten ein, um Deine Email zu verifizieren',
  confirm: 'Betätige',
  Profile: 'Profil',
  Checklist_template: 'Vorlage Checkliste | Vorlagen Checkliste',
  Help: 'Hilfe',
  Privacy: 'Datenschutz',
  FAQ: 'FAQ',
  Support: 'Support',
  no_inspections: 'Keine Durchsichten bisher',
  no_results: 'Keine Ergebnisse',
  Hive_brood_layer: 'Brutzarge | Brutzargen',
  Hive_honey_layer: 'Honigzarge | Honigzargen',
  Hive_queen_excluder_layer:
    'Königinnenabsperrgitter | Königinnenabsperrgitter',
  Hive_feeding_box_layer: 'Futterbox | Futterboxen',
  overrides_layer_colors: 'überschreibt Zargenfarbe',
  drag_layers: 'Zur Konfiguration der Beute - Elemente ziehen',
  page: 'Seite | Seiten',
  Page: 'Seite | Seiten',
  not_found: 'nicht gefunden',
  sorry: 'Entschuldigung',
  delete_layer: 'Lösche Zarge',
  not_saved_error: 'Die Daten konnten nicht gesichert werden',
  something_wrong: 'Irgendetwas lief verkehrt',
  not_editable: 'nicht zu bearbeiten',
  unsaved_changes: 'Ungesicherte Änderungen',
  save_changes:
    'Bist Du sicher, dass Du diese Seite verlassen möchtest? Alle Änderungen werden verloren gehen.',
  no_apiaries_yet: 'Du hast bisher keine Bienenstände',
  need_help: 'Brauchst Du Hilfe?',
  Apiary_color: 'Bienenstandfarbe',
  Set_notification_date: 'Benachrichtigungsdatum festlegen',
  remove_image: 'Lösche Foto',
  Total_colony_size: 'Größe des Bienenvolks',
  bee: 'Biene | Bienen',
  with_bees: 'mit Bienen',
  change_checklist_confirm:
    'Bist Du sicher, dass Du eine andere Checkliste auswählen möchtest? Bereits eingetragene Felder bleiben erhalten.',
  view: 'Ansicht',
  share: 'Teilen',
  edit_details: 'Bearbeite Details',
  remove_queen: 'Entferne die Königin',
  remove_group_short: 'Entferne Arbeitsgruppe',
  device: 'Gerät | Geräte',
  click_date_to_edit: 'Zum Bearbeiten Datum anklicken.',
  accept_policy_1: 'Ich akzeptiere die BEEP-',
  accept_policy_2:
    ', die mit dem neuen europäischen Datenschutzgesetz vereinbar sind',
  terms_of_use: 'Nutzungsbedingungen',
  invalid_password:
    'Das Passwort muss mindestens 8 Zeichen enthalten, einen Kleinbuchstaben, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (\\]{}()?\\-"!@#%&/\\,><\':|_~`)',
  sensor_definition: 'Sensor Definition | Sensor Definitionen',
  measurement: 'Messung | Messungen',
  remove_device: 'Gerät entfernen',
  last_message_received: 'Letzte empfangene Nachricht',
  transmission_ratio: 'Übertragungsrate',
  period: 'Zeitraum',
  download: 'Download',
  different_end_start: 'End- und Startdatum dürfen nicht gleich sein',
  later_end_start: 'Startdatum muss vor dem Enddatum liegen',
  new_email_verification_sent:
    'Es wurde eine Nachricht mit einem Verifizierungslink an Deine neue E-Mail-Adresse gesendet. Klicke auf den Link in der E-Mail, um Deine neue E-Mail-Adresse zu bestätigen und dich anzumelden.',
  sensordef_info:
    "Eine Sensordefinition dient dazu, einen Sensorwert aus einem eingehenden 'rohen' Sensorwert in einen Wert gemäß einer physikalischen Größe und Einheit umzuwandeln (z.B. w_v = 1098273 => Gewicht_kg = 62.400 kg) oder einen Sensor zu kalibrieren (z.B. t_0 = 15,3 ° C => t_0 = 15,8 ° C). Dies kann durch die Einstellung eines 'Offsets' und eines 'Multiplikators' erfolgen. Der Ein- und Ausgangswert bleibt gleich, wenn Offset '0' und Multiplikator '1' eingestellt ist. Die BEEP-Base-App (aus dem App Store) liefert Ihnen bei der Ersteinrichtung Ihrer BEEP-Base die richtigen Sensor-Definitionen.",
  or: 'oder',
  select_all_hives: 'Selektiere alle Beuten',
  select_all_editable_hives: 'Alle bearbeitbaren Beuten auswählen',
  Alert: 'Alarm | Alarme',
  alert: 'Alarm | Alarme',
  remove_alert: 'Entferne Alarme',
  alerts_enabled: 'Alarme aktiviert',
  alerts_disabled: 'Alarme deaktiviert',
  edit_checklist_confirm:
    'Bist Du sicher, dass Du die Checkliste bearbeiten möchtest? Alle nicht gespeicherten Änderungen an Deiner Durschsicht gehen verloren.',
  edit_checklist_confirm_deselectedhives:
    'Bist Du sicher, dass Du die Checkliste bearbeiten möchtest? Alle nicht gespeicherten Änderungen an Deiner Durchsicht und Deiner Beutenauswahl gehen verloren.',
  user_not_edited:
    'Die Benutzerdaten wurden nicht bearbeitet. Möglicherweise sind die Benutzerdaten identisch mit den bereits in der Datenbank vorhandenen Benutzerdaten oder ein oder mehrere Felder sind nicht korrekt ausgefüllt. Bitte überprüfe Deine Daten und versuche es erneut.',
  user_not_deleted:
    'Etwas ist schief gelaufen, der Benutzer wurde nicht gelöscht.',
  research_consent: 'Zustimmung zur Forschung',
  checklist_types: 'Persönlich, Gemeinsam, Forschung',
  edit_hive_checklist_no_touch:
    'Aktiviere/deaktiviere die Kontrollkästchen in der Liste unten, um Elemente zur Beuten-Checkliste hinzuzufügen oder zu entfernen. Du kannst die Elemente auch ausklappen/einfalten und ziehen/ablegen, um sie nach Deinen Vorstellungen neu anzuordnen (Hinweis: Dies ist auf einem Touchscreen-Gerät nicht möglich).',
  edit_hive_checklist_touch:
    'Aktiviere/deaktiviere die Kontrollkästchen in der Liste unten, um Elemente zur Beuten-Checkliste hinzuzufügen oder zu entfernen. Das Ändern der Reihenfolge der Elemente ist nur auf einem Desktop-Computer möglich.',
  input_not_possible_for_bulkinspection:
    'Dieser Punkt ist nicht verfügbar, wenn mehrere Beuten für eine Durchsicht ausgewählt sind, da er nur für einen einzelne Beute ausgefüllt werden kann. Es ist möglich, diesen Punkt für eine einzelne Beute zu einem späteren Zeitpunkt auszufüllen, indem Du die Durschsicht für diese Beute bearbeitest.',
  save_bulkinspection_confirm:
    'Bist Du sicher, dass Du diese Durchsicht für mehrere Bienenstöcke gleichzeitig speichern möchtest?',
  deleted_but_not_saved_devices_warning:
    'Hinweis: Geräte werden erst entfernt, nachdem Du auf die Schaltfläche "Speichern und löschen" in der rechten oberen Ecke geklickt hast.',
  no_alerts: 'Kein neuer Alarm',
  alertrule: 'Alarmregel | Alarmregeln',
  Alertrule: 'Alarmregel | Alarmregeln',
  Measurement: 'Messung | Messungen',
  Calculation: 'Berechnung',
  calculation: 'Berechnung',
  Alert_on_occurences: 'Wann möchtest Du diese Benachrichtigung erhalten?',
  Alert_on_occurences_hint:
    'Direkt, oder erst nachdem es x-mal aufgetreten ist?',
  Direct: 'Direkt',
  After: 'Nach ',
  times: ' mal',
  Comparator: 'Komparator',
  comparator: 'Komparator',
  Comparison: 'Vergleich',
  comparison: 'Vergleich',
  Threshold_value: 'Schwellwert',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  Derivative: 'Derivat (Zunahme oder Abnahme)',
  Count: 'Zähler',
  Value: 'Wert',
  Difference: 'Differenz',
  Absolute_value: 'Absolutwert',
  Absolute_value_of_dif_explanation: '**Absolutwert der Differenz',
  Exclude_months:
    '<strong>Deaktiviere</strong> diesen Alarm während der folgenden Monate:',
  Exclude_hours:
    '<strong>Deaktiviere</strong> diesen Alarm während der folgenden Stunden:',
  Exclude_hives:
    '<strong>Deaktiviere</strong> diesen Alarm für die folgenden Bienenstöcke:',
  Exclude_hives_details:
    'Hinweis: Standardmäßig wird dieser Alarm für alle Bienenstöcke mit einem Messgerät ausgeführt.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'Monate',
  hours: 'Stunden',
  delete_alertrule: 'Lösche Alarmregel',
  create_alertrule: 'Save alert rule',
  Active: 'Aktiv',
  Alert_via_email: 'Alarm via Email',
  Webhook_url: 'Webhook URL',
  this_field: 'Dieses Feld',
  alertrule_default: 'Standard-Alarmregel | Standard-Alarmregeln',
  copy: 'Kopieren',
  Home: 'Home',
  Select_default_alertrule: 'Standard-Alarmregel kopieren',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Ich möchte eine Benachrichtigung erhalten, wenn die [calculation] [comparison] der [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Diese Berechnung wird [calculation_minutes] ausgeführt',
  alertrule_occurences_direct_sentence:
    ', und ich möchte die Benachrichtigung direkt erhalten. ',
  alertrule_occurences_indirect_sentence:
    ', aber ich möchte den Alarm nur erhalten, wenn er [alert_on_occurences] mal auftritt. ',
  alertrule_exclude_months_sentence:
    'Dieser Alarm wird in den folgenden Monaten deaktiviert: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Dieser Alarm wird während der folgenden Stunden deaktiviert: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Dieser Alarm wird für die folgenden Beuten deaktiviert: [exclude_hive_ids].',
  min: 'Minimum',
  max: 'Maximum',
  ave: 'Durschnitt',
  der: 'Ableitung',
  cnt: 'Zählung',
  equal_to: 'ist gleich',
  less_than: 'ist kleiner als',
  greater_than: 'ist größer als',
  less_than_or_equal: 'ist kleiner oder gleich',
  greater_than_or_equal: 'ist größer oder gleich',
  alertrule_not_active:
    'Dieser Alarm wurde deaktiviert. Du kannst ihn aktivieren, indem Du das Kontrollkästchen "Aktiv" aktivierst und diese Alarmregel speicherst.',
  export_email_sent: 'Es wurde eine Email mit Excelfile versandt',
  excel_file_saved:
    'Die Excel-Datei wurde in Deinem Download-Ordner gespeichert',
  Updated_at: 'Upgedatet am',
  Not_yet_saved: 'Bisher nicht gespeichert',
  add_own_device: 'Neues Gerät hinzufügen',
  devices_info_text:
    'Bitte beachte: Besitzst Du eine BEEP-Basis? Verwende die BEEP Base App, um Dein Gerät hinzuzufügen. Es wird dann automatisch in der Liste unten erscheinen.',
  devices_url_text:
    'Hier findest Du weitere Informationen über die BEEP-Basis-App.',
  alert_explanation_1:
    'Wenn Du eine BEEP-Basis oder ein anderes Gerät besitzt, kannst Du Alarme einstellen, so dass Du einen Alarm erhälst, wenn die Messdaten bestimmte Anforderungen erfüllen. Zum Beispiel ein plötzlicher Gewichtsabfall aufgrund von Schwärmen. Alarme werden in dieser App angezeigt, Du kannst auch wählen, ob Du sie per E-Mail erhalten möchtest.',
  alert_explanation_2:
    'Für den Anfang gibt es ein paar Standard-Alarmregeln, die Du verwenden (und an Deine eigenen Bedürfnisse anpassen) kannst. Außerdem kannst Du Deine eigenen Alarmregeln erstellen.',
  alertrules_url_text:
    'Gehe zu "Alarmeinstellungen", um Deine erste Alarmregel anzulegen',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Bienenstand-Verwaltung',
  Move: 'Verschieben',
  Current_apiary: 'Aktueller Bienenstand',
  sensor_key: 'Eindeutige Gerätekennung',
  disabled_settings:
    'Die manuelle Bearbeitung dieser Einstellungen ist deaktiviert.',
  Address_placeholder: 'Nummer, Straßenname, Stadt',
  first_create_apiary: 'Lege zuerst einen Bienenstand an',
  Unknown: 'Unbekannt',
  unknown: 'unbekannt',
  research_warning:
    'Bitte beachte: Wenn Du keine Einladung zur Teilnahme erhalten hast, ist es nicht erforderlich, die Zustimmung zur Weitergabe Deiner Daten zu geben, da Deine Daten in diesem Fall nicht verwendet werden.',
  research_explanation_p1:
    'Die BEEP-Plattform nimmt an den unten aufgeführten Forschungsprojekten teil. Nachdem Du zur Teilnahme an einem Forschungsprojekt eingeladen wurdest, musst Du Dein Einverständnis geben, damit die Forscher auf Deine Bienendaten zugreifen können.',
  research_explanation_p2:
    'Du kannst Deine Einwilligung jederzeit widerrufen. Von diesem Moment an werden keine neuen Daten mehr geteilt. Die Daten, die Du in dem Zeitraum, für den Du Deine Einwilligung gegeben hast, geteilt hast, bleiben für die Forschung verfügbar. Bei Fragen wende Dich sich bitte an die Kontaktperson des Forschungsprojekts.',
  research_info:
    'Bevor Du einwilligst, lies bitte die Forschungsbeschreibung, die Du über den unten stehenden Link erhälst und fordere bei Bedarf zusätzliche Details an.',
  save_and_delete: 'Speichern und löschen',
  drag_layers_info_text:
    'Ziehe die Elemente von der linken Seite an die gewünschte Position innerhalb der Beute auf der rechten Seite. Lösche eine Ebene aus der Beute, indem Du sie anklickst und dann auf das rote Mülltonnensymbol klickst. Innerhalb der Beute können Elemente auch gezogen werden, um die Position zu bearbeiten, die Farbe kann durch Klicken auf das Element bearbeitet werden.',
  New_hive: 'Neue Beute',
  New_alertrule: 'Neue Alarmregel',
  Add_alertrule: 'Füge eine Alarmregel hinzu',
  Add_apiary: 'Füge einen Bienenstand hinzu',
  Add_sensor_definition: 'Füge eine Sensordefinition hinzu',
  Add_member: 'Füge ein Mitglied hinzu',
  alert_rule_deleted: 'Alarmregel wurde gelöscht',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'Hinweis: Sensordefinitionen werden nur gespeichert oder hinzugefügt, wenn Sie auf das grüne Häkchensymbol am Ende der Sensordefinitionszeile in der Tabelle klicken.',
  delete_sensordef: 'Sensordefinition löschen',
  delete_all_alerts: 'Alle Alarme löschen',
  delete_all_alerts_warning:
    'Bist Du sicher, dass Du alle Alarme löschen willst? Dies kann nicht rückgängig gemacht werden.',
  delete_all_alerts_warning_filter_active:
    'Bist Du sicher, dass Du alle Alarme löschen willst? Alarme, die nicht mit Deinem Suchbegriff übereinstimmen, werden ebenfalls gelöscht. Dies kann nicht rückgängig gemacht werden.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified:
    'Ich habe meine E-Mail-Adresse verifiziert und möchte mich anmelden.',
  password_recovery_resend_mail: 'Neuen Verifizierungscode senden',
  alert_rule_created: 'Es wurde eine neue Alarmregel erstellt',
  select_all: 'Alle auswählen',
  During: 'Während',
  Calculation_minutes: 'Wie oft soll die Berechnung durchgeführt werden?',
  Every: 'Alle ',
  Calculation_minutes_short: 'Wie oft wird berechnet?',
  Alert_on_occurences_short: 'Wann erhälst Du Alarmmeldungen?',
  Disable_alert_for_this_hive: 'Alarm für diese Beute deaktivieren',
  Alert_disabled_for_this_hive: 'Alarm ist für diese Beute deaktiviert',
  disabled_for_hive: 'wurde deaktiviert für die Beute',
  Alert_disabled: 'Alarm deaktiviert',

  // For import page
  Log_data_import: 'Importieren von Protokolldaten',
  Log_files: 'Protokolldateien',
  Upload_date: 'Upload-Datum',
  Messages: 'Nachrichten',
  Log_time: 'Protokollierte Zeit',
  File_size: 'Dateiengröße',
  check_log_data: 'Protokolldaten prüfen',
  delete_log_file: 'Protokolldaten löschen',
  commit_log_data_short: 'Protokolldaten importieren',
  commit_log_data:
    'Importiere Daten aus dieser Protokolldatei in die BEEP-App: ',
  // import_log_data_explanation:
  //   "In der BEEP Base App kannst Du Protokolldaten aus dem internen Speicher der BEEP Base herunterladen. Jedes Mal, wenn Du Protokolldaten herunterlädst, wird der interne Speicher geleert und die Daten werden in die BEEP-App hochgeladen. Unten findest Du eine Liste der heruntergeladenen Protokolldaten. Du kannst die Daten in der Datenbank durch die Daten in den heruntergeladenen Protokolldateien ersetzen, indem Du auf die Schaltfläche 'Protokolldaten prüfen' klickst. Dadurch wird zunächst geprüft, wie viele Daten in der Datenbank ersetzt werden und ob die Zeit der Daten in der Protokolldatei korrekt ist. Du erhälst ein Bestätigungsfeld mit den entsprechenden Informationen und der Möglichkeit, die Ersetzung zu bestätigen oder abzulehnen.",
  import_log_data_url_text:
    'Hier findest Du den Support-Artikel zum Herunterladen von Protokolldaten mit der BEEP-Basis-App.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/de/support/solutions/articles/60000697129-laden-sie-die-beep-basisdaten-%C3%BCber-bluetooth-herunter',

  Immediately: 'Sofort',
  alertrule_active_no_email_sentence:
    ', und BEEP-App öffnen, um die Alarme zu sehen.',
  alertrule_active_email_sentence:
    ', und ich erhalte Alarmmeldungen per E-Mail. Außerdem kann ich die Alarme in der BEEP-App sehen.',
  First_occurence: 'Erstes',
  Last_occurence: 'Letztes',
  /* default alert rule names: */
  Hive_stability_and_theft: 'Beutenstabilität & Diebstahl',
  Temperature_sensor_defect: 'Defekt des Temperatursensors',
  Battery_low: 'Batteriespannung zu niedrig',
  Honey_harvest: 'Honigernte',
  Hive_temperature: 'Niedrige Bienenstocktemperatur',
  Brood_temperature: 'Niedrige Bruttemperatur',
  No_measurements: 'Keine Messungen',
  Swarm: 'Schwarm',
  Food_supply_low: 'Wenig Futter',
  /* default alert rule descriptions: */
  Weight_drop_is_above_a_set_value:
    'Der Gewichtsverlust der Beute liegt über einem bestimmten Wert',
  Temperature_sensor_malfunctions: 'Fehlfunktionen des Temperatursensors',
  Battery_voltage_is_below_a_set_value:
    'Die Batteriespannung liegt unter einem bestimmten Wert',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Gewichtszunahme durch Nektareintrag stagniert',
  Hive_temperature_drops_below_a_set_value:
    'Die Temperatur in der Beute fällt unter einen bestimmten Wert',
  Temperature_in_the_brood_below_a_set_value:
    'Die Bruttemperatur fällt unter einen bestimmten Wert',
  No_measurement_data_received_in_a_set_time_period:
    'Keine Messdaten während eines bestimmten Zeitraums empfangen',
  Sudden_weight_drop_triggers_alert_immediately:
    'Ein plötzlicher Gewichtsverlust des Bienenstocks löst sofort einen Alarm aus. N.B. Dies basiert auf einem Datenübertragungsintervall von 15 Minuten. Falls Ihr Gerät ein anderes Datenübertragungsintervall hat, sollten Sie den Schwellenwert entsprechend anpassen.',
  The_hive_weight_is_below_a_set_value:
    'Das Beutengewicht liegt unter einem bestimmten Wert',

  minute: 'Minute | Minuten',
  upload_interval_warning_single_interval:
    'Hinweis: das Datenübertragungsintervall Ihres Geräts ist | Hinweis: das Datenübertragungsintervall Ihrer Geräte ist',
  upload_interval_warning_interval_range:
    'Hinweis: Die Datenübertragungsintervalle Ihrer Geräte variieren zwischen ',
  not_relevant_for_immediate_calculation:
    'Für die unmittelbare Berechnung nicht relevant',
  Increase: 'Erhöhung',
  Decrease: 'Rückgang',
  Every_hour: 'Jede Stunde',
  every_hour: 'jede Stunde',
  Absolute_value_of_dif: 'Differenz',
  In_case_of_good_connection_warning:
    '*Unmittelbar nach dem Empfang einer Messung. Dies ist abhängig vom Datenübertragungsintervall und der Zuverlässigkeit der Datenverbindung.',
  Alertrule_summary_title: 'Zusammenfassung',
  Alertrule_settings_title: 'Einstellungen der Alarmregeln',
  Alertrule_exclude_title: 'Zeitperioden und Beuten ausschließen',
  of: 'von',

  alerts_url_text: 'Lesen Sie den Support-Artikel über Alarme',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/de/support/solutions/articles/60000706484-benachrichtigungen',

  /* New translations v3.0.74 */
  Decline: 'Ablehnen',
  Decline_invitation: 'Einladung ablehnen',
  Decline_invitation_sure:
    'Möchten Sie die Gruppeneinladung wirklich ablehnen?',
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
  View_measurements: 'Messungen ansehen',
  View_inspection: 'Inspektion ansehen | Inspektionen ansehen',
  View_alert: 'Alarm ansehen | Alarme ansehen',

  Edit_alertrule: 'Alarmregel bearbeiten',
  Edit_hive: 'Beute bearbeiten',
  Edit_queen: 'Königin bearbeiten',
  Edit_apiary: 'Bienenstand bearbeiten',
  Edit_group: 'Kollaborationsgruppe bearbeiten',
  Edit_group_short: 'Gruppe bearbeiten',
  Edit_checklist: 'Stockkarte bearbeiten',
  Edit_devices: 'Geräte bearbeiten',
  Edit_consent: 'Genehmigung bearbeiten',
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
  Day: 'Tag | Tage',
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

  /* Compare module */ Load: 'Laden',
  Compare: 'Vergleich',
  Select_hives_for_compare: 'Wähle Beuten für den Vergleich',
  Select_hives_for_compare_exp:
    'Wähle Beuten mit denen du deine Daten vergleichen möchtest',
  mean_weight_kg: 'Durchschnittliches Gewicht',
  mean_net_weight_kg: 'Durchschnittliches Nettogewicht',
  net_weight_kg: 'Nettogewicht',
  overall_intake_loss: 'Gesamtzunahme/ -abnahme',
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
  Upload_pagenr: 'Upload hier pagina [pagenr]',
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
