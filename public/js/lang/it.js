/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ],
  monthsShort: [
    'Gen',
    'Feb',
    'Mar',
    'Apr',
    'Mag',
    'Giu',
    'Lug',
    'Ago',
    'Set',
    'Ott',
    'Nov',
    'Dic',
  ],
  Today: 'Oggi',
  Clear: 'Cancella',
  Close: 'Chiudi',
  firstDay: 1,
  format: 'dddd d mmmm yyyy',

  /* main */
  Website: 'Sitoweb',
  Feedback: 'Opinione',
  Feedback_mail_header: 'Opinione App BEEP',
  Feedback_mail_body:
    'Cara Fondazione BEEP,%0D%0A%0D%0AEcco la mia opinione sulla App BEEP.%0D%0A%0D%0AHo riscontrato questo:%0D%0A%0D%0AAppena prima che accadesse, ho fatto:%0D%0A%0D%0ALo schermo appariva così (allega una foto dello schermo):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info:
    'Informazione diagnostica (in caso di malfunzionamento):%0D%0A',
  back: 'Indietro',
  menu: 'Menu',
  lighting: 'Luminosità',
  camera: 'Camera',
  weather: 'Meteo',
  sensors: 'Dispositivi',
  no_valid_authentication: 'I dati di autenticazione trasmessi non sono validi',
  succesfully_saved: 'Salvataggio avvenuto',
  switch_language: 'Cambia lingua',
  Delete: 'Cancella',
  Search: 'Cerca...',

  /* user error messages */
  User: 'Utente',
  User_data: 'Dati utente',
  user_data: 'dati utente',
  updated: 'aggiornato',
  delete_complete_account:
    "Sei sicuro di voler cancellare il tuo account, incluso tutti gli apiari, alveari e visite? L'azione è irreversibile.",
  username_is_required: 'Prego, inserisci il nome utente',
  username_already_exists: 'Nome utente già esistente',
  password_is_required: 'Prego inserisci la password',
  email_is_required: 'Prego inserisci un indirizzo email',
  email_already_exists: "L'indirizzo email è già in uso",
  'policy accepted_is_required':
    'Devi accettare i termini di servizio per registrarti',
  already_registered: 'Sono già registrato',
  invalid_user: 'Utente sconosciuto, o password errata',
  no_password_match: 'Le passwords non coincidono',
  invalid_token: 'Codice non valido',
  no_valid_email: 'Indirizzo email non valido',
  empty_fields: 'Prego, compila tutti i campi',
  match_passwords: 'le passwords non coincidono',
  succesfully_registered: 'Sei registrato con successo.',
  authentication_failed: 'Autenticazione fallita',
  no_valid_input_received:
    'I dati non possono essere salvati, i dati immessi non sono validi.',
  remove_all_settings: 'Rimuovi tutte le impostazioni',
  remove_apiary: 'Rimuovi apiario',
  remove_hive: 'Rimuovi alveare',
  remove_inspection: 'Rimuovi visita',
  Error: 'Errore | Errori',
  Warning: 'Attenzione',
  first_remove_hives:
    'Attenzione: ci sono ancora alveari in questo apiario. Puoi salvare alveari specifici (e le loro visita) spostandoli prima in un altro apiario. Se continui, cancellerai TUTTI gli alveari e dati di visite per questa località.',
  Date: 'Data',
  ok: 'Ok',
  prev: 'precedente',
  next: 'Prossimo',
  add: 'Aggiungi',
  Cancel: 'Cancella',

  /* login */
  login_title: 'Accedi',
  login: 'Accedi',
  back_to_login: 'Torna alla pagina di accesso',
  forgot_password: 'Password dimenticata?',
  username: 'Nome Utente',
  password: 'Password',
  confirm_password: 'Conferma password',
  email: 'E-mail',
  token: 'Codice',
  create_login_question: 'Non hai un account? Registrati come nuovo utente',
  create_login: 'Registrati come nuovo utente',
  create_login_summary: 'Crea un account per nuovo utente',
  save: 'Salva',
  save_and_return: 'Salva e torna indietro',
  logout: 'Disconnetti',
  logout_title: 'Disconnetti come',
  logout_now: 'Vuoi disconnetterti ora?',
  member_since: 'utente BEEP dal',

  /* password recovery */
  password_recovery_title: 'Dimenticato la password?',
  password_recovery_remembered: 'Oh, ora mi ricordo la password!',
  password_recovery_user: 'Informazioni utente',
  password_recovery_send_mail: 'Manda codice di verifica',
  password_recovery_code_not_received:
    'Non hai ricevuto il codice entro 5 minuti?',
  password_recovery_enter_code:
    'Ricevuto il codice di verifica? Inseriscilo qui',
  password_recovery_reset_title: 'Inserisci una nuova password',
  password_recovery_reset_password: 'Cambia password',
  password_recovery_reminder_success:
    'Una e-mail è stata inviata. Clicca il link nella tua e-mail per ripristinare la password di questo account.',
  password_recovery_reminder_summary:
    'Inserisci il tuo indirizzo e-mail. Riceverai una e-mail con un link per cambiare la password al prossimo passaggio.',
  password_recovery_reset_summary:
    'Usa il codice che hai ricevuto per impostare una nuova password per il tuo account',
  password_recovery_reset_success:
    "La tua passowrd è stata modificata con successo, ed ora hai eseguito l'accesso.",
  new_password: 'Nuova password',
  confirm_new_password: 'Conferma nuova password',
  go_to_dashboard: 'Vai al mio pannello di controllo',

  /* overview */
  overview_title: 'Panoramica',
  overview: 'Panoramica',
  color: 'Colore',
  state: 'On/off',
  connection_state: 'Stato connessione',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
  Hive: 'Alveare | Alveari',
  hive: 'alveare | alveari',
  Location: 'Apiario | Apiari',
  location: 'apiario | apiari',
  Name: 'Nome',
  name: 'nome',
  Type: 'Tipo',
  type: 'tipo',
  Layer: 'Corpo nido',
  layer: 'corpo nido',
  brood: 'Covata',
  honey: 'Miele',
  inspect: 'Visita',
  inspection: 'visita | visite',
  Inspection: 'Visita | Visite',
  New_inspection: 'Nuova visita',
  Edit_inspection: 'Modifica visita',
  Action: 'Azione | Azioni',
  Conditions: 'Condizioni (visitate)',
  edit: 'Modifica',
  Hive_layer_amount: 'Totale scomparti',
  Bee_race: 'Razza di api',
  Birth_date: 'Data di nascita',
  Color: 'Colore',
  Queen_colored: 'Regina marcata',
  Queen_clipped: 'Regina clippata',
  Queen_fertilized: 'Regina feconda',
  Age: 'Età',
  years_old: 'anni',

  /* Hive check items */
  Date_of_inspection: 'Data di visita',
  action: 'Azione',
  reminder: 'Ricorda',
  remind_date: 'Data di notifica',
  overall: 'Generale',
  positive_impression: 'Impressione totale',
  needs_attention: 'Necessita attenzione',
  notes: 'Note',
  notes_for_next_inspection:
    'Breve nota per prossima visita (visibile nella panoramica)',
  Not_implemented_yet: 'Questo elemento non è ancora stato aggiunto',
  save_input_first: 'Vuoi salvare i dati immessi prima?',

  /* dashboard */
  dashboard_title: 'Pannello di controllo',
  dashboard: 'Pannello di controllo',
  // measurements: 'Misurazioni',
  measurementsError:
    'Non posso caricare le misurazioni, verifica la connessione',
  last_measurement: 'Ultima misurazione',
  at: 'a',
  measurement_system: 'Sistema di misurazioni BEEP',
  no_data: 'Nessun dato disponibile',
  no_chart_data: 'Nessun grafico per il periodo selezionato',

  /* settings */
  General: 'Generale',
  Place: 'Posizione',
  Country: 'Nazione',
  City: 'Città',
  Address: 'Indirizzo',
  latitude: 'Latitudine',
  Longitude: 'Longitudine',
  Street: 'Via',
  Number: 'N.',
  Postal_code: 'CAP',
  Description: 'Descrizione',
  Hive_settings: 'Configurazione alveare',
  Hive_amount: 'Totale alveari in questa località',
  Hive_prefix: 'Prefisso nome alveare (prima del numero)',
  Hive_number_offset: 'Inizia numerazione alveari',
  Hive_type: 'Tipo di alveare',
  Hive_layers: 'n° corpi nido',
  Hive_frames: 'n° favi',
  Hive_color: 'Colore alveare',
  Queen: 'Regina',
  queen: 'regina',
  settings_title: 'Impostazioni',
  settings_description: 'Impostazioni dei sensori',
  settings: 'Impostazioni',
  sensors_title: 'Impostazioni dispositivo',
  sensors_description: 'Stato e registrazione del dispositivo',
  // sensors: 'Dispositivi',
  sensor: 'Dispositivo',
  Select: 'Seleziona',
  Not_selected: 'Non selezionato',
  Poor: 'Scarso',
  Fair: 'Sufficiente',
  Average: 'Media',
  Average_slider: 'Medio',
  Good: 'Buono',
  Excellent: 'Eccellente',
  Low: 'Basso',
  Medium: 'Medio',
  High: 'Alto',
  Extreme: 'Estremo',

  /* colors */
  select_color: 'Seleziona un colore',
  advanced: 'Avanzate',

  /* sensors */
  Select_sensor: 'Seleziona un sensore',
  // temperature: 'Temperatura',
  t: 'Temperatura',
  t_0: 'Temperatura 1',
  t_1: 'Temperatura 2',
  t_2: 'Temperatura 3',
  t_3: 'Temperatura 4',
  t_4: 'Temperatura 5',
  t_5: 'Temperatura 6',
  t_6: 'Temperatura 7',
  t_7: 'Temperatura 8',
  t_8: 'Temperatura 9',
  t_9: 'Temperatura 10',
  light: 'Irraggiamento solare',
  l: 'Irraggiamento solare',
  water: 'Acqua',
  w: 'Peso (vechhio)',
  humidity: 'Umidità',
  h: 'Umidità',
  air_pressure: 'Pressione atmosferica',
  p: 'Pressione atmosferica',
  weight: 'Peso',
  w_v: 'Sensore di peso valore tutti i sensori',
  w_fl: 'Sensore di peso valore anteriore sinistro',
  w_fr: 'Sensore di peso valore anteriore destro',
  w_bl: 'Sensore di peso valore posteriore sinistro',
  w_br: 'Sensore di peso valore posteriore destro',
  weight_kg: 'Peso',
  weight_kg_corrected: 'Peso (corretto)',
  weight_combined_kg: 'Peso combinato',
  bat_volt: 'Batteria',
  bv: 'Batteria',
  sound_fanning_4days: 'Rumore ventilazione api 4gg',
  s_fan_4: 'Rumore ventilazione api 4gg',
  sound_fanning_6days: 'Rumore ventilazione api 6gg',
  s_fan_6: 'Rumore ventilazione api 6gg',
  sound_fanning_9days: 'Rumore ventilazione api 9gg',
  s_fan_9: 'Rumore ventilazione api 9gg',
  sound_flying_adult: 'Api in volo',
  s_fly_a: 'Api in volo',
  sound_total: 'Suono complessivo',
  s_tot: 'Suono complessivo',
  s_spl: 'Livello intensità sonora',
  bee_count_in: 'Conta ape in ingresso',
  bc_i: 'Conta ape in ingresso',
  bee_count_out: 'Conta ape in uscita',
  bc_o: 'Conta ape in uscita',
  t_i: 'Temp. interna',
  rssi: 'Intensità segnale',
  snr: 'Rumore segnale',
  lat: 'Latitudine',
  lon: 'Longitudine',
  Sound_measurements: 'Misurazioni acustiche',
  Sensor_info: 'Info sensore',
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
  icon: 'Icona',
  precipIntensity: 'Pioggia',
  precipProbability: 'Probabilità di pioggia',
  precipType: 'Tipo di pioggia',
  temperature: 'Temperatura esterna',
  apparentTemperature: 'Tempreatura percepita',
  dewPoint: 'Punto di rugiada',
  // humidity: 'Umidità',
  pressure: 'Pressione atmosferica',
  windSpeed: 'Velocità vento',
  windGust: 'Raffica di vento',
  windBearing: 'Direzione vento',
  cloudCover: 'Nuvolosità',
  uvIndex: 'Indice UV',
  visibility: 'Visibilità',
  ozone: 'Ozono',

  /* Measurements */
  Hour: 'Ora',
  hour: 'ora | ore',
  day: 'giorno | giorni',
  week: 'Settimana',
  month: 'Mese',
  year: 'Anno',

  /* settings */
  could_not_load_settings: 'Le impostazioni non possono essere caricate',
  offline: 'Nessuna connessione',
  remote: 'Remoto',
  connected: 'Diretto',
  yes: 'Sì',
  no: 'No',
  footer_text: 'Apicoltura open source',
  beep_foundation: 'la Fondazione BEEP',
  Checklist: 'Lista di controllo | Liste di controllo',
  checklist: 'lista di controllo | liste di controllo',
  Checklist_items: 'Elementi lista di controllo',
  edit_hive_checklist:
    "Seleziona/Deseleziona le caselle nella lista sottostante per aggiungere/togliere l'elemento dalla tua lista di controlli. Puoi anche mostrare/nascondere o trascinare gli elementi per riordinarli secondo il tuo stile.. Consiglio: se inserisci una parola nel campo ricerca, tutti gli elementi contenenti quella parola saranno mostrati ed evidenziati in rosso.",

  /* user */
  Data_export: 'Esporta i dati',
  Export_your_data:
    "Esporta tutti i dati del tuo account BEEP e invia una e-mail con allegati i dati in formato Excel (OR download the Excel file via the 'Download CSV' button). Il file Excel ha vari fogli di lavoro, contenenti i tuoi dati personali, alveari, posizioni e visite.",
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  Terms_of_use: 'Condizioni di servizio',
  accept_policy:
    'Accetto le condizioni di servizio proposte da BEEP, che sono compatibili con la normativa Europea vigente in materia di Privacy',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy: 'Non hai ancora accettato le ultime Condizioni di Servizio.',

  /* General items */
  server_down:
    'La App è al momento non disponibile causa lavori di manutenzione, riprova più tardi',
  add_to_calendar: 'Aggiungi al calendario',
  sort_on: 'ordina',
  Whats_new: 'Nuovo!',
  Manual: 'Manuale',
  Site_title: 'BEEP | Monitoraggio Alveari',
  could_not_create_user:
    "L'utente non può essere creato in questo momento. Ci scusiamo per l'inconveniente, riprova più tardi.",
  email_verified: 'Il tuo indirizzo e-mail è stato verificato.',
  email_not_verified: 'Il tuo indirizzo e-mail non è ancora stato verificato.',
  email_new_verification:
    'Clicca su questo link per inviare una nuova e-mail di verifica.',
  email_verification_sent:
    "Un messaggio con in link di verifica è stato inviato al tuo indirizzo e-mail. Clicca sul link nella email per attivare il tuo account ed eseguire l'accesso.",
  email_verification_resent:
    "Un nuovo messaggio con in link di verifica è stato inviato al tuo indirizzo e-mail. Clicca sul link nella email per attivare il tuo account ed eseguire l'accesso.",

  not_filled: 'è richiesto, ma non compilato',
  cannot_deselect:
    'Impossibile rimuovere questo elemento, perchè contiene informazioni obbligatorie',
  Undelete: 'Non cancellare',
  the_field: 'Il',
  is_required: "E' richiesto",
  No_groups: 'Non ci sono gruppi disponibili',
  not_available_yet:
    'non ancora disponibile. Clicca sul bottone in alto a destra per aggiungerne uno.',
  Users: 'Utenti',
  member: 'membro del gruppo | membri del gruppo',
  Member: 'Membro del gruppo | Membri del gruppo',
  Invite: 'Invita',
  Invited: 'Invitato',
  Invitation: 'Invito | Inviti',
  Admin: 'Amministratore',
  Creator: 'Proprietario del gruppo',
  Group: 'Gruppo di collaborazione | Gruppi di collaborazione',
  group: 'gruppo di collaborazione | gruppi di collaborazione',
  group_short: 'gruppo | gruppi',
  to_share:
    'per condividere con questo gruppo. clicca 1 = i membri del gruppo possono solo vedere, clicca 2 = i membri del gruppo possono modificare',
  Invitation_accepted: 'Invito accettato',
  Accept: 'Accetta',
  My_shared: 'Le mie condivisioni',
  invitee_name: "Nome dell'invitato",
  Remove_group:
    'Sei sicuro di voler completamente rimuovere questo gruppo per tutti i suoi membri?',
  Detach_from_group: 'Rimuovi me ed i miei alveari da questo gruppo',
  my_hive: 'Il mio alveare',
  created: 'creato',
  group_detached: 'Gruppo abbandonato con successo',
  group_activated: 'Invito al gruppo accettato',
  group_declined: 'Invito al gruppo rifiutato',
  group_explanation_1:
    '1. Crea un nuovo gruppo di collaborazione con un nome chiaro, e una (opzionale) descrizione',
  group_explanation_2:
    '2. Invita altri utenti BEEP tramite il loro indirizzo e-mail BEEP',
  group_explanation_3:
    '3. Condividi specifici alveari per essere visti da altri o consentire loro di collaborare',
  Filter_and_sort_on: 'Ordina e filtra:',

  /* New translations v2.2.0 */
  roofed: "L'apiario ha una copertura?",
  info: 'Info',
  research: 'Ricerca',
  start_date: 'Data di inizio',
  end_date: 'Data di fine',
  purpose: 'Scopo della ricerca',
  institution: 'Istituto di ricerca',
  type_of_data_used: 'Utilizzo dei dati',
  link: 'Link',
  Consent: 'Consenti',
  history: 'storia',
  Current_consent: 'Consenso attuale',
  consent_yes: 'Acconsento a condividere i miei dati',
  consent_no: 'NON acconsento a condividere i miei dati',
  my_beep_data: 'I miei dati BEEP',
  Consent_can_only_be_set: 'Il consenso può essere adatto solo a',
  earlier: 'una precedente',
  later: 'una successiva',
  new_apiary_explanation: 'Crea un nuovo apiario in 4 passaggi',
  start_here: 'Clicca qui per iniziare',
  optional: 'opzionale',
  dimensions: 'dimansioni',
  details: 'dettagli',
  configuration: 'configurazione',
  adjustments: 'adattamenti',
  changes_queen_color: 'modifica i cambi di colore',
  Brood_box_and_frame: 'Camera di covata e telai',
  Hive_order: "Ordina gli alveari nell'apiario",
  bb_width_cm: 'Larghezza camera di covata (cm)',
  bb_height_cm: 'Altezza camera di covata (cm)',
  bb_depth_cm: 'Profondità camera di covata (cm)',
  fr_width_cm: 'Larghezza telaio (cm)',
  fr_height_cm: 'Altezza telatio (cm)',
  queen_line: 'linea',
  queen_tree: 'genealogia',
  queen_description: 'note',
  Hive_short: 'Alveare | Alveari',
  Image: 'Immagine | Immagini',
  Size: 'Dimensione',
  preview: 'anteprima',
  Sensor_definitions: 'Definizioni del sensore',
  Inside: 'Misure interne',
  Offset: 'Compensazione',
  Multiplier: 'Moltiplicatore',
  Input: 'Ingresso',
  Output: 'Uscita',
  Last: 'Ultimo',
  Export_sensor_data:
    "Esporta tutti i dati per ogni dispositivo nella massima risoluzione possibile in formato .csv che potrai aprire in Excel, o SPSS. NB: La data e l'orario nella colonna 'time' è mostrato nel fuso di Greenwich (GMT), formattato nello standard RFC 3339.",
  CSV_export_separator: 'separatore di colonne per i dati CSV',
  Selected_date: 'Seleziona un intervallo di tempo',
  Sensor_measurements: 'Misurazioni del sensore',
  too_much_data:
    "Troppi dati da processare, prego seleziona un minor numero di misurazioni del sensore, o riduci l'intervallo di tempo.",
  beep_base_explanation:
    "Se hai un dispositivo BEEP (mostrato nella foto sopra), per favore usa la App BEEP base (iOS e Android) per l'installazione e per impostare la comunicazione con la App. Se ancora non hai un dispositivo BEEP, premi sul menu l'opzione  'sitoweb BEEP' per aggiornamenti su come ottenerne uno. Se hai un tuo dispositivo di rilevazione dati e vuoi importare i dati nella App BEEP, mandaci un messaggio di richiesta per unirti alla nostra communuty su Slack, e potrai avere accesso alle descrizioni API.",
  sample_code_hive:
    'Prima seleziona un alveare, per generare un codice campione univoco',
  sample_code_generate: 'Genera un codice campione univoco',
  sample_code_delete: 'Cancella codice campione univoco',
  measurement_interval: 'intervallo',
  from_weather_service: 'dal servizio meteo',

  /* TO BE TRANSLATED */
  /* New translations v3 */
  click_hives_to_filter: 'Seleziona alveari da filtrare',
  for: 'per',
  last_visit: 'ultima ispezione',
  apiary_details: 'Dettagli apiario',
  group_details: 'Dettagli gruppo',
  diary: 'Diario',
  data: 'Data',
  photo: 'foto',
  add_checklist: 'Aggiungi checklist',
  add_hive: 'Aggiungi alveare',
  delete_apiary: 'Cancella apiario',
  edit_apiary: 'Modifica apiario',
  new_apiary: 'Nuovo apiario',
  delete_group: 'Cancella gruppo',
  edit_group: 'Modifica gruppo',
  new_group: 'Nuovo gruppo',
  verification_code: 'Codice di verifica',
  limit_exceeded: "E' stato raggiunto il limite, riprova più tardi",
  confirm_email_title: 'Conferma la tua email',
  confirm_email_summary:
    'Hai ricevuto un codice di verifica nella tua email. Inseriscilo sotto per validare la tua email',
  confirm: 'Conferma',
  Profile: 'Profilo',
  Checklist_template: 'Modello di Checklist | Modelli di Checklist',
  Help: 'Aiuto',
  Privacy: 'Privacy',
  FAQ: 'FAQ',
  Support: 'Supporto',
  no_inspections: 'Aggiungi la prima ispezione',
  no_results: 'Nessun risultato',
  Hive_brood_layer: 'corpo nido | corpi nido',
  Hive_honey_layer: 'melario | melari',
  Hive_queen_excluder_layer: 'Escludi regina',
  Hive_feeding_box_layer: 'Nutritore | Nutritori',
  overrides_layer_colors: 'annulla i colori degli strati',
  drag_layers: "Trascina i pezzi per configurare l'alveare",
  page: 'pagina | pagine',
  Page: 'Pagina | Pagine',
  not_found: 'non trovato',
  sorry: 'Spiacente',
  delete_layer: 'Cancella strato',
  not_saved_error: 'Il dato non è stato salvato',
  something_wrong: 'Qualcosa non ha funzionato',
  not_editable: 'non modificabile',
  unsaved_changes: 'cambi non salvati',
  save_changes:
    'Sei sicuro di voler abbandonare la pagina? Tutti i cambiamenti non salvati saranno persi.',
  no_apiaries_yet: 'Non hai ancora alcun apiario',
  need_help: 'Serve aiuto?',
  Apiary_color: 'Colore apiario',
  Set_notification_date: 'Aggiungi una data promemoria',
  remove_image: 'Rimuovi immagine',
  Total_colony_size: 'Dimensione totale colonia',
  bee: 'ape | api',
  with_bees: 'con api',
  change_checklist_confirm:
    'Sei sicuro di selezionare una diversa checklist? I valori già inseriti saranno mantenuti.',
  view: 'Visualizza',
  share: 'Condividi',
  edit_details: 'Modifica dettagli',
  remove_queen: 'Rimuovi regina',
  remove_group_short: 'Rimuovi gruppo di collaborazione',
  device: 'Dispositivo | Dispositivi',
  click_date_to_edit: 'Clicca la data per modificare',
  accept_policy_1: 'Accetto BEEP ',
  accept_policy_2: ', che rispettano le nuove leggi Europee sulla privacy',
  terms_of_use: 'termini di servizio',
  invalid_password:
    'La Password deve contenenre almeno 8 caratteri, una minuscola, una maiuscola, un numero e un carattere speciale (\\]{}()?\\-"!@#%&/\\,><\':|_~`)',
  sensor_definition: 'definizione sensore | definizioni sensore',
  measurement: 'misurazione | misurazioni',
  remove_device: 'rimuovi dispositivo',
  last_message_received: 'ultimo messaggio ricevuto',
  transmission_ratio: 'Rapporto Transmissione',
  period: 'Periodo',
  download: 'Download',
  different_end_start: 'Data di inizio e fine devono essere diverse',
  later_end_start: 'Data di inizio deve essere antecedente a quella di fine',
  new_email_verification_sent:
    "Un messaggio con un link di verifica è stato inviato al tuo nuovo indirizzo e-mail. Clicca sul link per confermare la tua e-mail ed eseguire l'accesso.",
  sensordef_info:
    "Una Definizione Sensore serve a convertire il valore 'grezzo' in una quantità fisica misurabile e sua unità di misura (e.g. w_v = 1098273 => weight_kg = 62,400 kg) oppure a calibrare un sensore (e.g. t_0 = 15.3 ° C => t_0 = 15.8 ° C). Questo può essere fatto impostanto un 'valore base' ed un 'coefficiente di moltiplicazione'. I valori 'grezzi' e quelli calcolati non cambiano se il valore di base è '0' ed il moltiplicatore è '1'. La app BEEP (da App Store) ti fornirà le giuste Definizioni Sensore alla prima configurazione della tua base BEEP.",
  or: 'oppure',
  select_all_hives: 'Seleziona tutti gli alveari',
  select_all_editable_hives: 'Seleziona tutti gli alveari modificabili',
  Alert: 'Allerta | Allerte',
  alert: 'allerta | allerte',
  remove_alert: 'Rimuovi i messaggio allerta',
  alerts_enabled: 'Abilita i messaggi di allerta',
  alerts_disabled: 'Disbilita i messaggi di allerta',
  edit_checklist_confirm:
    'Sei sicuro di voler modificare la checklist? Tutte le modifiche non salvate alle tue ispezioni andranno perse.',
  edit_checklist_confirm_deselectedhives:
    'Sei sicuro di voler modificare la checklist? Tutte le modifiche non salvate alle tue ispezioni e alla tua selezione di alveari andranno perse.',
  user_not_edited:
    'Dati utente non modificati. Forse sono i medesimi già presenti nel database, oppure uno o più campi non sono correttamente compilati. Per favore verifica e riprova.',
  user_not_deleted: 'Qualcosa non ha funzionato, utente non eliminato.',
  research_consent: 'Consenso per Ricerca',
  checklist_types: 'Personale, condiviso, ricerca',
  edit_hive_checklist_no_touch:
    'Seleziona/Deseleziona le caselle nella lista sotto per aggiungere/togliere elementi dalla tua checklist. Puoi inoltre aprire/chiudere e trascinare/lasciare gli elementi per riordinarli secondo il tuo stile (N.B. funzione non abilitata su dispositivi touch).',
  edit_hive_checklist_touch:
    "Seleziona/Deseleziona le caselle nella lista sotto per aggiungere/togliere elementi dalla tua checklist. Cambiarne l'ordine è possibile solo da desktop computer.",
  input_not_possible_for_bulkinspection:
    "Questo elemento non è disponibile quando più alveari sono selezionati per l'ispezione, può essere compilato solo per singolo alveare. E' possibile inserire questo elemento in ciascun alveare successivamente, modificando l'ispezione esistente per quell'alveare.",
  save_bulkinspection_confirm:
    'Sicuro di voler salvare questa visita per più alveari contemporaneamente?',
  deleted_but_not_saved_devices_warning:
    "N.B. i dispositivi saranno rimossi solo dopo aver premuto il bottone 'Salva e cancella' in alto a destra.",
  no_alerts: 'Nessun nuovo messaggio di allerta',
  alertrule: 'regola messaggio allerta | regole messaggio di allerta',
  Alertrule: 'Regola messaggio allerta | Regole messaggio di allerta',
  Measurement: 'Misurazione | Misurazioni',
  Calculation: 'Calcolo',
  calculation: 'calcolo',
  Alert_on_occurences: 'Quando vuoi ricevere questo messaggio di allerta?',
  Alert_on_occurences_hint:
    'Direttamente, o solo dopo che si ripete un x numero di volte?',
  Direct: 'Direttamente',
  After: 'Dopo ',
  times: ' volte',
  Comparator: 'Comparatore',
  comparator: 'comparatore',
  Comparison: 'Paragone',
  comparison: 'paragone',
  Threshold_value: 'valore soglia',
  Minimum: 'Minimo',
  Maximum: 'Massimo',
  Derivative: 'Derivata (aumenta o diminuisci)',
  Count: 'Conta',
  Value: 'Valore',
  Difference: 'Differenza',
  Absolute_value: 'Valore assoluto',
  Absolute_value_of_dif_explanation: '**Valore assoluto della differenza',
  Exclude_months:
    '<strong>Disattiva</strong> questo messaggio di allerta per i seguenti mesi:',
  Exclude_hours:
    '<strong>Disattiva</strong> questo messaggio di allerta per le seguenti more:',
  Exclude_hives:
    '<strong>Disattiva</strong> questo messaggio di allerta per i seguenti alveari:',
  Exclude_hives_details:
    'N.B. Come impostazione standard, questo messaggio di allerta sarà associato a tutti gli alveari con dispositivo per misurazioni.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'mesi',
  hours: 'ore',
  delete_alertrule: 'Cancella regola messaggio di allerta',
  create_alertrule: 'Save alert rule',
  Active: 'Attivo',
  Alert_via_email: 'Messaggio di allerta via email',
  this_field: 'Questo campo',
  alertrule_default:
    'Regola di messaggio di allerta predefinita | Regole di messaggio di allerta predefinite',
  copy: 'Copia',
  Home: 'Home',
  Select_default_alertrule: 'Copia regola di messaggio di allerta predefinita',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Vorrei ricevere messaggio di allerta se il [comparison] del [measurement_quantity] [calculation] [comparator] [threshold_value][measurement_unit]. Questo calcolo sarà eseguito [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', e vorrei ricevere messaggio di allerta direttamente. ',
  alertrule_occurences_indirect_sentence:
    ', ma vorrei ricevere messaggio di allerta solo se capita [alert_on_occurences] volte. ',
  alertrule_exclude_months_sentence:
    'Questo messaggio di allerta non sarà attivo nei mesi di: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Questo messaggio di allerta non sarà attivo durante le seguenti ore: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Questo messaggio di allerta non sarà attivo per i seguenti alveari: [exclude_hive_ids].',
  min: 'minimo',
  max: 'massimo',
  ave: 'media',
  der: 'derivata',
  cnt: 'conta',
  equal_to: 'è uguale a',
  less_than: 'è inferiore a',
  greater_than: 'è superiore a',
  less_than_or_equal: 'è inferiore o uguale a',
  greater_than_or_equal: 'è superiore o uguale a',
  alertrule_not_active:
    "Questo messaggio di allerta è disattivato. Puoi attivarlo cliccando la casella 'Attiva' e salvando questa regola messaggio di allerta.",
  export_email_sent: 'è stata inviata Email con file Excel',
  excel_file_saved: 'file Excel è stato salvato nella tua cartella Downloads',
  Updated_at: 'Aggiornato a',
  Not_yet_saved: 'non ancora salvato',
  add_own_device: 'Aggiungere proprio dispositivo',
  devices_info_text:
    "Nota: possiedi una base BEEP? Usa la App BEEP base per aggiungere il tuo dispositivo. Apparirà automaticamente nell'elenco sottostante.",
  devices_url_text: 'Qui puoi trovare più informazioni sulla app BEEP base.',
  alert_explanation_1:
    'Se possiedi una dispositivo BEEP o altro dispositivo puoi impostare messaggi di allerta, così da riceverlo quando le misurazioni raggiungeranno certi criteri. Ad esempio, calo di peso repentino dovuto a sciamatura. Messaggi di allerta saranno mostrati in questa app, puoi scegliere di riceverli anche per Email.',
  alert_explanation_2:
    'Per iniziare ci sono già impostazioni per alcuni messaggi di allerta che puoi usare (e adattare ai tuoi bisogni). In aggiunta, puoi creare le tue regole per nuovi messaggi di allerta.',
  alertrules_url_text:
    "Vai a'Impostazioni messaggi di allerta' per creare la tua prima regola per messaggi di allerta",
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Gestione apiario',
  Move: 'Muovi',
  Current_apiary: 'Apiario attuale',
  sensor_key: 'identificatore unico del dispositivo',
  disabled_settings:
    'La modifica manuale per queste impostazioni è disabilitata.',
  Address_placeholder: 'Numero civico, nome via, città',
  first_create_apiary: "Per prima cosa, crea un'apiario",
  Unknown: 'Sconosciuto',
  unknown: 'sconosciuto',
  research_warning:
    'Nota: se non ricevi un invito a partecipare, non è necessario acconsentire alla condivisione dei tuoi dati, visto che i tuoi dati non saranno utilizzati in questo caso.',
  research_explanation_p1:
    'La piattaforma BEEP è utilizzata nei progetti di ricerca elencati in calce. Dopo che ricevi un invito a partecipare ad un progetto di ricerca, devi fornire il consenso ai ricercatori di accedere ai tuoi dati apistici.',
  research_explanation_p2:
    'Puoi ritirare il consenso fornito quando vuoi. Da quel momento in poi, nessun ultariore dato sarà condiviso. I dati condivisi nel periodo in cui hai prestato il consenso rimarranno disponibili per la ricerca. In caso di dubbi, contatta la persona del tuo progetto di ricerca.',
  research_info:
    'Prima di acconsentire, verifica la descrizione della ricerca disponibile al link sottostante e chiedi ulteriori spiegazioni se ne senti il bisogno.',
  save_and_delete: 'Salva e cancella',
  drag_layers_info_text:
    "Trascina le parti dal lato sinistro alla posizione desiderata sull'alveare posto sulla destra. Cancella un componente cliccandovi sopra e quindi sull'icona con il cestino rosso. Le componenti possono anche essere spostati all'interno dell'alveare stesso, i colori modificati facendo click sul componente",
  New_hive: 'Nuovo alveare',
  New_alertrule: 'Nuova regola messaggio di avviso',
  Add_alertrule: 'Aggiungi regola messaggio di avviso',
  Add_apiary: 'Aggiungi apiario',
  Add_sensor_definition: 'Aggiungi definizione sensore',
  Add_member: 'Aggiungi membro',
  alert_rule_deleted: 'La regola messaggi di allerta è stata cancellata',

  new_or_edited_but_not_saved_sensor_defs_warning:
    "N.B. le definizioni del sensore saranno aggiunti o salvati solo dopo aver premuto l'icona verde in calce alla colonna",
  delete_sensordef: 'Cancella definizione del sensore',
  delete_all_alerts: 'Cancella tutti gli avvisi',
  delete_all_alerts_warning:
    'Sei sicuro di voler cancellare tutti gli avvisi? Questo processo è irreversibile',
  delete_all_alerts_warning_filter_active:
    'Sei sicuro di voler cancellare questo avviso? Gli avvisi che non corrispondono ai tuoi criteri di ricerca saranno anche rimossi. Questo processo è irreversibile',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified: 'Ho verificato il mio indirizzo email e vorrei accedere',
  password_recovery_resend_mail: 'Manda nuovo codice di verifica',
  alert_rule_created: 'Nuova regola per avviso creata',
  select_all: 'Seleziona tutto',
  During: 'Durante', // context: 'During 2 days', or 'During 1 hour', to notify the period during which the same alert has been triggered (each evaluation) in a row
  Calculation_minutes: 'Con che frequenza vuoi che vengano fatti i calcoli',
  Every: 'Ogni ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  Calculation_minutes_short: 'Con che frequenza viene calcolato?', // for alert rule overview table header
  Alert_on_occurences_short: 'Quando ricevi la notifica?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Disabilita notifiche per questo alveare',
  Alert_disabled_for_this_hive: 'Notifiche disabilitate per questo alveare',
  disabled_for_hive: "e' stata disabilitata per alveare", // [alert] has been disabled for the following hive
  Alert_disabled: 'Notifica disabilitata',

  // For import page
  Log_data_import: 'Importa dati di registro',
  Log_files: 'File di registro',
  Upload_date: 'Carica data',
  Messages: 'Messaggi',
  Log_time: 'Orario registrato',
  File_size: 'Dimensione file',
  check_log_data: 'Verifica dati di registro',
  delete_log_file: 'Cancella file di registro',
  commit_log_data_short: 'Importa registro dati',
  commit_log_data: 'Importa nella app BEEP i dati da questo file di registro',
  // import_log_data_explanation:
  //   "Nella app BEEPbase è possibile scaricare i dati di registro dalla memoria interna della base BEEP. Ogni volta che scarichi i dati di registro, la memoria interna viene cancellata e i dati vengono caricati sull'app BEEP. Di seguito è riportato l'elenco dei dati di registro scaricati. È possibile sostituire i dati nel database con i dati all'interno dei file di registro scaricati facendo clic sul pulsante 'Verifica dati di registro'. Questo controllerà prima quanti dati verranno sostituiti all'interno del database e se l'ora dei dati nel file di registro è corretta. Riceverai una finestra di conferma con le informazioni risultanti e la possibilità di procedere o negare la sostituzione.",
  import_log_data_url_text:
    "Qui puoi trovare l'articolo a supporto della procedura di download dei dati diregistro con la app BEEP base",
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/it/support/solutions/articles/60000697129-scarica-i-dati-di-base-beep-tramite-bluetooth',

  Immediately: 'Immediatamente',
  alertrule_active_no_email_sentence:
    ', ed apro la app BEEP per vedere le notifiche.',
  alertrule_active_email_sentence:
    ', e ricevo le notifiche via email. Inoltre, posso vedere le notifiche nella app BEEP.',
  First_occurence: 'Prima',
  Last_occurence: 'Ultima',
  /* default alert rule names: */
  Hive_stability_and_theft: "Stabilità dell' Alveare & Furti",
  Temperature_sensor_defect: 'Problema al sensore di temperatura',
  Battery_low: 'Voltaggio batteria basso',
  Honey_harvest: 'Raccolta miele',
  Hive_temperature: 'Temperatura alveare bassa',
  Brood_temperature: 'Temperatura covata bassa',
  No_measurements: 'Nessuna misurazione',
  Swarm: 'Sciamatura',
  Food_supply_low: 'Quantità di scorte bassa',
  /* default alert rule descriptions: */
  Weight_drop_is_above_a_set_value:
    "Il calo di peso dell'alveare ha superato la soglia impostata",
  Temperature_sensor_malfunctions: 'Malfunzionamento al sensore di temperatura',
  Battery_voltage_is_below_a_set_value:
    'Il voltaggio della batteria del dispositivo è inferiore al valore impostato',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    "L'incremento di peso dovuto al bottinamento si è arrestato",
  Hive_temperature_drops_below_a_set_value:
    "La temperatura dell'alveare è scesa sotto al valore impostato",
  Temperature_in_the_brood_below_a_set_value:
    'La tempertura della covata è scesa sotto al valore impostato',
  No_measurement_data_received_in_a_set_time_period:
    'Nessun dato di misurazione ricevuto durante il periodo impostato',
  Sudden_weight_drop_triggers_alert_immediately:
    "Improvvise perdite di peso attivano immediatamente un allarme. N.B. questo basandosi su un intervallo di trasmissione di 15 minuti. Se il tuo dispositivo è impostato con un differente intervallo di trasmissione dei dati, dovresti correggere di conseguenza il valore soglia collegato all'attivazione dell'allarme.",
  The_hive_weight_is_below_a_set_value:
    "Il peso dell'alveare è inferiore al valore impostato",

  minute: 'minuto | minuti',
  upload_interval_warning_single_interval:
    "N.B. l'intervallo di trasmissione dei dati impostato per il tuo dispositivo è | N.B.  l'intervallo di trasmissione dei dati dei tuoi dispositivi è  ",
  upload_interval_warning_interval_range:
    " N.B.  l'intervallo di trasmissione dei dati dei tuoi dispositivi varia tra ",
  not_relevant_for_immediate_calculation:
    'Non rilevante per il calcolo immediato',
  Increase: 'Aumenta',
  Decrease: 'Diminuzione',
  Every_hour: 'Ogni ora',
  every_hour: 'ogni ora',
  Absolute_value_of_dif: 'Variazione',
  In_case_of_good_connection_warning:
    "*Immediatamente dopo aver ricevuto una misurazione. Questo dipende dall'intervallo di trasmissione dei dati e dall'affidabilità della connessione.",
  Alertrule_summary_title: 'Riepilogo',
  Alertrule_settings_title: 'Impostazioni regole di notifica',
  Alertrule_exclude_title: 'Escludi periodo e alveari',
  of: 'di',

  alerts_url_text: "Leggi l'articolo di supporto sugli avvisi",
  alerts_support_url:
    'https://beepsupport.freshdesk.com/it/support/solutions/articles/60000706484-avvisi',

  /* New translations v3.0.74 */
  Decline: 'Rifiuta',
  Decline_invitation: 'Rifiuta invito',
  Decline_invitation_sure: "Sei sicuro di voler rifiutare l'invito al gruppo?",
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
  View_measurements: 'Visualizza misurazioni',
  View_inspection: 'Visualizza visita | Visualizza visite',
  View_alert: 'Visualizza messaggio allerta | Visualizza messaggi di allerta',

  Edit_alertrule: 'Modifica regola messaggio allerta',
  Edit_hive: 'Modifica alveare',
  Edit_queen: 'Modifica regina',
  Edit_apiary: 'Modifica apiario',
  Edit_group: 'Modifica gruppo di collaborazione',
  Edit_group_short: 'Modifica gruppo',
  Edit_checklist: 'Modifica lista di controllo',
  Edit_devices: 'Modifica dispositivi',
  Edit_consent: 'Modifica consenso',
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
  outsideTemperature: 'Outside temperature',
  /* offline inspection sheet */
  Hour_short: 'Hr | Hrs',
  Day: 'Giorno | Giorni',
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
