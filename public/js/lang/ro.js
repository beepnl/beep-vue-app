/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl) & Alex Giurgiu
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie',
  ],
  monthsShort: [
    'Ian',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Iun',
    'Iul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  Today: 'Astăzi',
  Clear: 'Ștergeți',
  Close: 'închideți',
  firstDay: 1,
  format: 'dddd d mmmm yyyy',

  /* main */
  Website: 'Website',
  Feedback: 'Feedback',
  Feedback_mail_header: 'Feedback aplicație BEEP ',
  Feedback_mail_body:
    'Dragă fundație BEEP,%0D%0A%0D%0APrin prezenta feedbackul meu pentru aplicația BEEP%0D%0A%0D%0AI am descoperit această:%0D%0A%0D%0înainte să apară acest mesaj, am efectuat:%0D%0A%0D%0A Pe ecran a apărut (vă rugăm să includeți o captură de ecran):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info: 'Informații diagnostic (în cazul unei erori):%0D%0A',
  back: 'Înapoi',
  menu: 'Meniu',
  lighting: 'Lumină',
  camera: 'Cameră foto',
  weather: 'Vreme',
  sensors: 'Senzori',
  no_valid_authentication: 'Nu au fost primite date valide de autentificare',
  succesfully_saved: 'Salvat cu succes',
  switch_language: 'Schimbați limba',
  Delete: 'Ștergeți',
  Search: 'Căutare...',

  /* user error messages */
  User: 'Utilizator',
  User_data: 'Datele utilizatorului',
  user_data: 'datele utilizatorului',
  updated: 'actualizare',
  delete_complete_account:
    'Sunteți sigur că doriți să ștergeți complet contul dumneavoastră, inclusiv toate stupinele, stupii și inspecțiile? Datele nu vor putea fi recuperate',
  username_is_required: 'Vă rugăm introduceți numele de utilizator',
  username_already_exists: 'Acest nume de utilizator există deja',
  password_is_required: 'Vă rugăm intorduceți parola',
  email_is_required: 'Vă rugăm introduceți adresa de e-mail',
  email_already_exists: 'Această adresă de  e-mail este deja folosită',
  policy_accepted_is_required:
    'Trebuie să acceptați termenii și condițiile de înregistrare',
  already_registered: 'Sunt deja înregistrat',
  invalid_user: 'Utilizator necunoscut sau parolă greșită',
  no_password_match: 'Parolele nu se potrivesc',
  invalid_token: 'Cod invalid',
  no_valid_email: 'Adresă de e-mail invalidă',
  empty_fields: 'Vă rugăm să completați toate câmpurile',
  match_passwords: 'Parolele nu se potrivesc',
  succesfully_registered: 'Sunteți înregistrat cu succes.',
  authentication_failed: 'Nu sa reușit autentificarea.',
  no_valid_input_received:
    'Datele nu au putut fi salvate, nu au fost primite intrări valide.',
  remove_all_settings: 'Eliminați toate setările',
  remove_apiary: 'Eliminați stupina',
  remove_hive: 'Eliminare stup',
  remove_inspection: 'Eliminați inspecția',
  Error: 'Eroare | Erori',
  Warning: 'Advertisment',
  first_remove_hives:
    'Atenție încă există stupi în această stupină. Puteți salva stupi specifici (și inspecțiile lor) prin mutarea acestora într-o altă stupină. Dacă veți continua cu ștergerea, vor fi șterse toate inspecțiile și toți stupii din prezenta locație.',
  Date: 'Data',
  ok: 'Ok',
  prev: 'anterior',
  next: 'Următorul',
  add: 'Adăugați',
  Cancel: 'Anulați',

  /* login */
  login_title: 'Autentificare',
  login: 'Autentificare',
  back_to_login: 'Înapoi la autentificare',
  forgot_password: 'Ați uitat parola?',
  username: 'Nume utilizator',
  password: 'Parolă',
  confirm_password: 'Confirmare parolă',
  email: 'E-mail',
  token: 'Cod',
  create_login_question:
    'Nu aveți încă un cont? Înregistrați-vă ca utilizator nou',
  create_login: 'Înregistrați-vă ca un utilizator nou',
  create_login_summary: 'Creați un cont de utilizator nou',
  save: 'Salvați',
  save_and_return: 'Salvare și întoarcere.',
  logout: 'Deconectați-vă',
  logout_title: 'Deconectați-vă ca',
  logout_now: 'Doriți să vă deconectați acum?',
  member_since: 'Membru BEEP din',

  /* password recovery */
  password_recovery_title: 'Ați uitat parola?',
  password_recovery_remembered: 'Oh, acum mi-am reamintit parola!',
  password_recovery_user: 'Informații despre utilizator',
  password_recovery_send_mail: 'Trimiteți cod de verificare',
  password_recovery_code_not_received:
    'Codul nu a fost primit în mai puțin de 5 minute?',
  password_recovery_enter_code:
    'Ați primit deja un cod de verificare? Introduceți codul aici',
  password_recovery_reset_title: 'Introduceți o parolă nouă',
  password_recovery_reset_password: 'Schimbarea parolei',
  password_recovery_reminder_success:
    'A fost trimis un  e-mail. Faceți clic pe link-ul din e-mail pentru a vă putea reseta parola pentru acest cont.',
  password_recovery_reminder_summary:
    'Introduceți adresa dvs. de e-mail. Veți primi un e-mail cu un link pentru a vă putea schimba parola în pasul următor.',
  password_recovery_reset_summary:
    'Utilizați codul pe care l-ați primit pentru a seta o nouă parolă pentru contul dvs.',
  password_recovery_reset_success:
    'Parola dvs. a fost modificată cu succes și ați fost logat.',
  new_password: 'Parolă nouă',
  confirm_new_password: 'Confirmare parolă nouă',
  go_to_dashboard: 'Mergeți la panoul de control',

  /* overview */
  overview_title: 'Prezentare generală',
  overview: 'Prezentare generală',
  color: 'Culoare',
  state: 'Pornit/oprit',
  connection_state: 'Starea conexiunii',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
  Hive: 'Stup | Stupi',
  hive: 'stup | stupi',
  Location: 'Stupină | Stupine',
  location: 'stupină | stupine',
  Name: 'Nume',
  name: 'nume',
  Type: 'Tip',
  type: 'tip',
  Layer: 'Strat',
  layer: 'strat',
  brood: 'Puiet',
  honey: 'Miere',
  inspect: 'Inspectați',
  inspection: 'inspecție | inspecții',
  Inspection: 'Inspecție | Inspecții',
  New_inspection: 'Inspecție nouă',
  Edit_inspection: 'Editați inspecția',
  Action: 'Acțiune | Acțiuni',
  Conditions: 'Condiții(inspectate)',
  edit: 'Editare',
  // Hive_brood_layers: 'Straturi cu puiet',
  // Hive_honey_layers: 'Straturi cu miere',
  Hive_layer_amount: 'Numărul de straturi',
  Bee_race: 'Rasa albinelor',
  Birth_date: 'Data nașterii',
  Color: 'Culoare',
  Queen_colored: 'Matcă marcată',
  Queen_clipped: 'Matcă mutilată',
  Queen_fertilized: 'Matcă fertilizată',
  Age: 'Vârstă',
  years_old: 'ani',

  /* Hive check items */
  Date_of_inspection: 'Data inspecției',
  action: 'Acțiune',
  reminder: 'Memento',
  remind_date: 'Data notificării',
  overall: 'În ansamblu',
  positive_impression: 'Impresia generală',
  needs_attention: 'Necesită atenție',
  notes: 'Notițe',
  notes_for_next_inspection:
    'Notă scurtă pentru inspecția următoare (vizibilă în ansamblu)',
  Not_implemented_yet: 'Acest element nu a fost implementat încă',
  save_input_first: 'Doriți să salvați informația introdusă?',

  /* dashboard */
  dashboard_title: 'Tablou de bord',
  dashboard: 'Tablou de bord',
  measurementsError:
    'Măsurătorile nu pot fi încărcate, verificați conexiunea la rețea',
  last_measurement: 'Ultima măsurare',
  at: 'la',
  measurement_system: 'Sistem de măsurare BEEP',
  no_data: 'Nu există date disponibile',
  no_chart_data: 'Nu există date din grafic pentru perioada selectată',

  /* settings */
  General: 'General',
  Place: 'Locație',
  Country: 'Țară',
  City: 'Oraș',
  Address: 'Adresă',
  latitude: 'Latitudine',
  Longitude: 'Longitudine',
  Street: 'Stradă',
  Number: 'Nr.',
  Postal_code: 'Cod poștal',
  Description: 'Descriere',
  Hive_settings: 'Setările stupului',
  Hive_amount: 'Numărul de stupi în această locație',
  Hive_prefix: 'Prefixul stupului (înainte de număr)',
  Hive_number_offset: 'Numărul de pornire al stupilor',
  Hive_type: 'Tipul de stup',
  Hive_layers: 'Straturi stup',
  Hive_frames: 'Rame pe strat',
  Hive_color: 'Culoarea stupului',
  Queen: 'Matcă',
  queen: 'matcă',
  settings_title: 'Setări',
  settings_description: 'Setări ale senzorilor',
  Settings: 'Setări',
  settings: 'setări',
  sensors_title: 'Setările senzorului',
  sensors_description: 'Statusul senzorilor și înregisrtarea',
  //   sensors: 'Senzori',
  sensor: 'Senzor',
  Select: 'Selectați',
  Not_selected: 'Nu a fost selectat',
  Poor: 'Slab',
  Fair: 'Potrivit',
  Average: 'Medie',
  Average_slider: 'Mediu',
  Good: 'Bine',
  Excellent: 'Excelent',
  Low: 'Scăzut',
  Medium: 'Mediu',
  High: 'Ridicat',
  Extreme: 'Extrem',

  /* colors */
  select_color: 'Selectați o culoare',
  advanced: 'Avansat',

  /* sensors */
  Select_sensor: 'Selectați un senzor',
  temperature: 'Temperatură',
  t: 'Temperatură',
  t_0: 'Temperatură 1',
  t_1: 'Temperatură 2',
  t_2: 'Temperatură 3',
  t_3: 'Temperatură 4',
  t_4: 'Temperatură 5',
  t_5: 'Temperatură 6',
  t_6: 'Temperatură 7',
  t_7: 'Temperatură 8',
  t_8: 'Temperatură 9',
  t_9: 'Temperatură 10',
  light: 'Lumina (soarelui)',
  l: 'Lumina (soarelui)',
  water: 'Apă',
  w: 'Greutate (vechi)',
  humidity: 'Umiditate',
  h: 'Umiditate',
  air_pressure: 'Presiune atmosferică',
  p: 'Presiune atmosferică',
  weight: 'Greutate',
  w_v: 'Senzorul de greutate, valoarea tuturor senzorilor',
  w_fl: 'Senzorul de greutate, valorare față stânga',
  w_fr: 'Senzorul de greutate, valoare față dreapta',
  w_bl: 'Senzorul de greutate, valoare spate stânga',
  w_br: 'Senzorul de greutate, valoare spate dreapta',
  weight_kg: 'Greutate',
  weight_kg_corrected: 'Greutate (corecție)',
  weight_combined_kg: 'Greutate, combinată ',
  bat_volt: 'Baterie',
  bv: 'Baterie',
  sound_fanning_4days: 'Ventilație albine 4z',
  s_fan_4: 'Ventilație albine 4z',
  sound_fanning_6days: 'Ventilație albine 6z',
  s_fan_6: 'Ventilație albine 6z',
  sound_fanning_9days: 'Ventilație albine 9z',
  s_fan_9: 'Ventilație albine 9z',
  sound_flying_adult: 'Albine care zboară',
  s_fly_a: 'Albine care zboară',
  sound_total: 'Sunet total',
  s_tot: 'Sunet total',
  s_spl: 'Sunet total',
  bee_count_in: 'Număr albine intrate',
  bc_i: 'Număr albine intrate',
  bee_count_out: 'Număr albine ieșite',
  bc_o: 'Număr albine ieșite',
  t_i: 'Temp. interior',
  rssi: 'Puterea semnalului',
  snr: 'Raport semnal/zgomot',
  lat: 'Latitudine',
  lon: 'Longitudine',
  Sound_measurements: 'Măsurători sunet',
  Sensor_info: 'Informații senzor',
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
  icon: 'Pictogramă',
  precipIntensity: 'Precipitații',
  precipProbability: 'RProbabilitate precipitații',
  precipType: 'Ploaie',
  outsideTemperature: 'Temperatură exterioară',
  apparentTemperature: 'Temperatura resimțită',
  dewPoint: 'Punct de condensare',
  //   humidity: 'Umiditate',
  pressure: 'Presiune atmosferică',
  windSpeed: 'Viteza vântului',
  windGust: 'Rafale de vânt',
  windBearing: 'Direcția vântului',
  cloudCover: 'Nebulozitate',
  uvIndex: 'index UV',
  visibility: 'Vizibilitate',
  ozone: 'Ozon',

  /* Measurements */
  Hour: 'Oră',
  hour: 'oră | ore',
  day: 'zi | zile',
  week: 'Săptămână',
  month: 'Lună',
  year: 'An',

  /* settings */
  could_not_load_settings: 'Setările nu au putut fi încărcate',
  offline: 'Nici o conexiune',
  remote: 'La distanță',
  connected: 'Direct',
  yes: 'Da',
  no: 'Nu',
  footer_text: 'Apicultură cu sursă deschisă',
  beep_foundation: 'fundația BEEP',
  Checklist: 'Listă de verificare | Liste de verificare',
  checklist: 'listă de verificare | liste de verificare',
  Checklist_items: 'Elemente din lista de verificare',
  edit_hive_checklist:
    'Bifați/debifați casetele din lista de mai jos pentru a adăuga/elimina elemente din lista de verificare a stupului. De asemenea, puteți desfășura/acoperi și glisa/fixa elementele pentru a le rearanja stilului dumneavoastră.',

  /* user */
  Data_export: 'Exportarea datelor',
  Export_your_data:
    "Exportați toate datele din contul dvs. BEEP și trimiteți un e-mail care conține datele într-un fișier Excel (OR download the Excel file via the 'Download CSV' button). Fișierul va avea file diferite care conțin datele dvs. personale despre stup, locație și inspecție. ",
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  Terms_of_use: 'Termenii serviciului',
  accept_policy:
    'Accept termenii serviciului BEEP, care sunt compatibili cu noua lege Europeană privind confidențialitatea datelor.',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy:
    'Nu v-ați dat încă acordul pentru ultimii termeni și condiții.',

  /* General items */
  server_down:
    'Aplicația nu este disponibilă din cauza lucrărilor de întreținere, vă rugăm încercați din nou mai târziu.',
  add_to_calendar: 'Adăugați în calendar',
  sort_on: 'Sortează pe',
  Whats_new: 'Noutăți!',
  Manual: 'Manual',
  Site_title: 'BEEP | Bee monitor',
  could_not_create_user:
    'Utilizatorul nu poate fi creat în acest moment. Ne pare rău pentru neplăcerile cauzate, vă rugăm încercați mai târziu.',
  email_verified: 'Adresa dvs. de e-mail a fost verificată.',
  email_not_verified: 'Adresa dvs. de e-mail nu a fost încă verificată',
  email_new_verification:
    'Faceți clic pe acest link pentru a trimite un nou e-mail de verificare.',
  email_verification_sent:
    'Un mesaj cu un link pentru verificare a fost trimis pe adresa dvs. de e-mail. Faceți click pe link-ul din e-mail pentru a vă activa contul și pentru a vă conecta.',
  email_verification_resent:
    'Un mesaj nou cu un link pentru verificare a fost trimis pe adresa dvs. de e-mail. Faceți click pe link-ul din e-mail pentru a vă activa contul și pentru a vă conecta.',

  not_filled: 'este necesar, dar nu a fost completat',
  cannot_deselect:
    'Acest element nu poate fi eliminat, deoarece conține un element obligatoriu',
  Undelete: 'Nu ștergeți',
  the_field: 'Acest câmp',
  is_required: 'este necesar.',
  No_groups: 'Nu există grupuri disponibile',
  not_available_yet: 'Nu este încă disponibil. Vă rugăm să creați primul aici.',
  Users: 'Utilizatori',
  member: 'membrul grupului | membrii grupului',
  Member: 'Membrul grupului | Membrii grupului',
  Invite: 'Invită',
  Invited: 'Invitat',
  Invitation: 'Invitație | Invitații',
  Admin: 'Administrator',
  Creator: 'Proprietarul grupului',
  Collaborate: 'Colabora',
  Group: 'Grup de colaborare | Grupuri de colaborare',
  group: 'grup de colaborare | grupuri de colaborare',
  group_short: 'grup | grupuri',
  to_share:
    'pentru a partaja cu acest grup. 1 click = numai membrii grupului pot vedea, 2 click-uri = membrii grupului pot edita.',
  Invitation_accepted: 'Invitație acceptată',
  Accept: 'Accept',
  My_shared: 'Partajarea mea',
  invitee_name: 'Nume invitat',
  Remove_group:
    'Sigur doriți să eliminați complet acest grup partajat pentru toți membrii acestuia.',
  Detach_from_group: 'Scoateți-mă pe mine și stupii mei din acest grup',
  my_hive: 'Stupul meu',
  created: 'creat',
  group_detached: 'Grupul a fost părăsit cu succes',
  group_activated: 'Invitația în grup a fost acceptată.',
  group_declined: 'Invitația în grup a fost refuzată',
  group_explanation_1:
    '1. Creați un nou grup de colaborare cu un titlu clar și o descriere opțională',
  group_explanation_2:
    '2. Invitați alți utilizatori BEEP adresa lor de e-mail BEEP',
  group_explanation_3:
    '3. Împărtășiți informații specifice despre anumite colonii, care pot fi văzute de alți utilizatori pentru a coopera pe',
  Filter_and_sort_on: 'Filtrați și sortați pe:',

  /* TO BE TRANSLATED */
  /* New translations v2.2.0 */
  roofed: 'Does the apiary have a roof?',
  info: 'Info',
  research: 'Cercetare',
  start_date: 'Data începerii',
  end_date: 'End date',
  purpose: 'Data de încheiere',
  institution: 'Instituția de cercetare',
  type_of_data_used: 'Date utilizate',
  link: 'Link',
  Consent: 'Consimţământ',
  history: 'Istoric',
  Current_consent: 'Consimțământul actual',
  consent_yes: 'Sunt de acord să împărtășesc datele mele',
  consent_no: 'NU SUNT de acord să împărtășesc datele mele',
  my_beep_data: 'Datele mele BEEP',
  Consent_can_only_be_set: 'consimțământul poate fi ajustat la',
  earlier: 'mai devreme',
  later: 'mai tarziu',
  new_apiary_explanation: 'Creați o nouă stupină în 4 pași',
  start_here: 'Click pentru a începe',
  optional: 'optional',
  dimensions: 'dimensiuni',
  details: 'detalii',
  configuration: 'configurație',
  adjustments: 'ajustări',
  changes_queen_color: 'edittarea, schimba culoarea',
  Brood_box_and_frame: 'Ladă cuib și rame',
  Hive_order: 'Ordinul stupului în stupină',
  bb_width_cm: 'Lățime ladă cuib (cm)',
  bb_height_cm: 'Înalțime ladă cuib (cm)',
  bb_depth_cm: 'Ladă cuib adâncime(cm)',
  fr_width_cm: 'Lăţime ramă(cm)',
  fr_height_cm: 'Înalțime ramă (cm)',
  queen_line: 'linie',
  queen_tree: 'arbore',
  queen_description: 'Note',
  Hive_short: 'Stup | Stupi',
  Image: 'Imagine | Imagini',
  Size: 'Marime',
  preview: 'Previzualizare',
  Inside: 'Măsuri în interior',
  Offset: 'Decalaj',
  Multiplier: 'Multiplicator',
  Input: 'Input',
  Output: 'Output',
  Last: 'Ultimul',
  Export_sensor_data:
    'Exportați toate datele/ dispozitiv cu cea mai mare rezoluție posibilă ca fișier .csv pe care îl puteți deschide în Excel sau SPSS. N.B. Datele privind data și ora din coloana „timp” sunt în format GMT, formatat după standardul de dată-oră RFC 3339.',
  CSV_export_separator: 'separator de coloane de date format CSV',
  Selected_date: 'Perioada de timp selectată',
  Sensor_measurements: 'Măsurători senzori',
  too_much_data:
    "Prea multa informa'ie de procesat, Va rugam să selectați mai puține măsuraori ale senzorilor, sau să reduceți perioada selectată.",
  beep_base_explanation:
    "Dacă aveți o bază BEEP (prezentă în poza de deasupra), va rugam utilizați aplicația BEEP base (iOS sau Android) pentru a seta comunicarea cu această aplicație.Dacă nu aveți o baza BEEP încă, dați clic pe elementul din meniu 'Website BEEP' pentru informații actualizate despre cum să obțineți o bază BEEP. Dacă aveți propriul dispozitiv pentru efectuarea măsurătorilor și doriți să vedeți datele în aplicația BEEP, vă rugăm să ne trimiteți un mesaj pentru a solicita să vă alăturați la comunitatea noastră Slack și să primiții acces la descrierea API.",
  sample_code_hive:
    'Mai întâi selectați un stup pentru a genera un cod unic pentru probă',
  sample_code_generate: 'Generați cod unic pentru probă',
  sample_code_delete: 'Ștergeți cod unic probă',
  measurement_interval: 'interval',
  from_weather_service: 'de la serviciul meteo',

  /* New translations v3 */
  click_hives_to_filter: 'Faceți clic pe stupi pentru a filtra',
  for: 'pentru',
  last_visit: 'Ultima vizită',
  apiary_details: 'Detalii Stupine',
  group_details: 'Detalii ale Grupului',
  diary: 'Jurnal',
  data: 'Date',
  photo: 'fotografie | fotografii',
  add_checklist: 'Adăugați lista de verificare',
  add_hive: 'Adăugați stup',
  delete_apiary: 'Ștergeți stupină',
  edit_apiary: 'Editează stupină',
  new_apiary: 'Stupină nouă',
  delete_group: 'Ștergeți grupul',
  edit_group: 'Editează grupul',
  new_group: 'Grup nou',
  verification_code: 'cod de verificare',
  limit_exceeded: 'Limita a fost atinsă, încercați din nou mai târziu',
  confirm_email_title: 'Confirmați adresa de e-mail',
  confirm_email_summary:
    'Ați primit un cod de autentificare pe adresa de e-mail. Introduceți codul aici pentru a confirma adresa de e-mail.',
  confirm: 'Confirmați',
  Profile: 'Profil',
  Checklist_template: 'Șablon lista de verificare | Sablon liste de verificare',
  Help: 'Ajutor',
  Privacy: 'Confidențialitate',
  FAQ: 'FAQ',
  Support: 'Suport',
  no_inspections: 'Nu există încă inspecții',
  no_results: 'Fără rezultate',
  Hive_brood_layer: 'Strat cu puiet | Straturi cu puiet',
  Hive_honey_layer: 'HStrat cu miere | Straturi cu miere',
  Hive_queen_excluder_layer: 'Gratie Hanneman | Gratii Hanneman',
  Hive_feeding_box_layer: 'Cutie pentru hrănire | FCutie pentru hrăniri',
  overrides_layer_colors: 'anulează culorile stratului',
  drag_layers: 'Trageți straturile pentru a configura stupul',
  page: 'pagina | pagini',
  Page: 'Pagina | Pagini',
  not_found: 'nu a fost găsit',
  sorry: 'Ne pare rău.',
  delete_layer: 'Ștergeți strat',
  not_saved_error: 'Datele nu au putut fi salvate',
  something_wrong: 'Ceva n-a mers bine',
  not_editable: 'nu se poate modifica',
  unsaved_changes: 'Modificări nu au fost salvate',
  save_changes:
    'Sigur doriți să părăsiți această pagină? Toate modificările care nu au fost salvate vor fi pierdute.',
  no_apiaries_yet: 'Nu aveți încă stupine',
  need_help: 'Aveți nevoie de ajutor?',
  Apiary_color: 'Culoarea stupinei',
  Set_notification_date: 'Setați data notificării',
  remove_image: 'Eliminați imaginea',
  Total_colony_size: 'Dimensiunea totală a coloniei.',
  bee: 'albină | albine',
  with_bees: 'cu albine',
  change_checklist_confirm:
    'Sigur doriți să selectați o altă listă de verificare? Valorile câmpurilor deja completate vor fi păstrate.',
  view: 'Vizualizați',
  share: 'Distribuiți',
  edit_details: 'Editați detalii',
  remove_queen: 'Înlăturați matcă',
  remove_group_short: 'Înlăturați grup de colaborare',
  device: 'Dispozitiv | Dispozitive',
  click_date_to_edit: 'Faceți clic pe dată pentru a edita.',
  accept_policy_1: 'Accept ',
  accept_policy_2:
    ' termenii BEEP,  sunt compatibili cu noua lege Europeană privind confidențialitatea datelor.',
  terms_of_use: 'termenii serviciului',
  invalid_password:
    'Parola trebuie să conțină cel puțin 8 caractere, o literă mică, o literă mare, un număr și un caracter special (\\]{}()?\\-"!@#%&/\\,><\':|_~`)',
  sensor_definition: 'definirea senzorului| definirea senzorilor',
  measurement: 'măsurare| măsurători',
  remove_device: 'înlăturați dispozitiv',
  last_message_received: 'Ultimul mesaj primit',
  transmission_ratio: 'Raportul de transmisie',
  period: 'Perioada',
  download: 'Descărcați',
  different_end_start: 'Data de început și încheiere trebuie să fie diferită',
  later_end_start:
    'Data de începere trebuie să fie mai devreme decât data de încheiere',
  new_email_verification_sent:
    'Un mesaj nou cu un link de verificare a fost trimis la noua dvs. adresă de e-mail. Faceți clic pe linkul din e-mail pentru a vă confirma noua adresă de e-mail și pentru a vă autentifica',
  sensordef_info:
    'O definiție a senzorului este destinată să convertească o valoare a senzorului dintr-o valoare primară a senzorului „brut” într-o valoare în funcție de o cantitate fizică și o unitate (e.x. w_v = 1098273 => weight_kg = 62,400 kg) sau o calibrare a senzorului (e.x. t_0 = 15.3 ° C => t_0 = 15.8 ° C). Acest lucru se poate face prin setarea unui „offset” și a unui „multiplicator”. Valoarea de intrare și ieșire rămâne aceeași dacă este setat decalajul „0” și multiplicatorul „1”. Aplicația  BEEP base (din App Store) vă va oferi definițiile corecte ale senzorilor la configurarea inițială a bazei dvs. BEEP. ',
  or: 'sau',
  select_all_hives: 'Selectați toți stupii',
  select_all_editable_hives: 'Selectați toate stupii personalizabili',
  Alert: 'Alertă | Alerte',
  alert: 'alertă | alerte',
  remove_alert: 'Înlăturați alertă',
  alerts_enabled: 'Alerte activă',
  alerts_disabled: 'Alerte inactive ',
  edit_checklist_confirm:
    'Sigur doriți să editați lista de verificare? Orice modificare nesalvată a inspecției dvs. se va pierde.',
  edit_checklist_confirm_deselectedhives:
    'Sigur doriți să editați lista de verificare? Orice modificare nesalvată a inspecției și a selecției stupului dvs. se va pierde.',
  user_not_edited:
    'Datele utilizatorului nu au fost editate. Este posibil ca datele utilizatorului să fie identice cu datele utilizatorului aflate deja în baza de date sau este posibil ca unul sau mai multe câmpuri să nu fie completate corect. Vă rugăm să verificați datele și să încercați din nou.',
  user_not_deleted: 'A apărut o eroare, utilizatorul nu a fost șters.',
  research_consent: 'Consimțământ pentru cercetare',
  checklist_types: 'Cercetare personală, distribuită',
  edit_hive_checklist_no_touch:
    'bifați / debifați casetele din lista de mai jos pentru a adăuga / elimina articole din lista de verificare a stupului. Puteți, de asemenea, să derulați / pliați și să glisați / să fixați articolele pentru a le rorganiza în stilul dvs. (N.B. acest lucru nu este posibil pe un dispozitiv cu ecran tactil).',
  edit_hive_checklist_touch:
    'Bifați / debifați casetele din lista de mai jos pentru a adăuga / elimina articole din lista de verificare a stupului. Schimbarea ordinii articolelor este posibilă numai pe un computer desktop.',
  input_not_possible_for_bulkinspection:
    'Acest articol nu este disponibil atunci când sunt selectați mai mulți stupi pentru o inspecție, deoarece poate fi completat doar pentru fiecare stup individual. Este posibil să completați acest element pentru un singur stup ulterior, modificând inspecția pentru acest stup.',
  save_bulkinspection_confirm:
    'Are you sure that you want to save this inspection for multiple hives at the same time?',
  deleted_but_not_saved_devices_warning:
    'N.B. dispozitivele vor fi eliminate numai după ce faceți clic pe butonul „Salvați și ștergeți” din colțul din dreapta sus.',
  no_alerts: 'Nu sunt alerte noi',
  alertrule: 'regulă alertă | reguli alerte',
  Alertrule: 'Regulă alertă | Reguli alerte',
  Measurement: 'Măsurătoare | Măsurători',
  Calculation: 'Calcul',
  calculation: 'calcul',
  Alert_on_occurences: 'Când doriți să primiți această alertă?',
  Alert_on_occurences_hint: 'Direct sau numai după ce a avut loc de x ori?',
  Direct: 'Direct',
  After: 'După ',
  times: ' ori',
  Comparator: 'Comparator',
  comparator: 'comparator',
  Comparison: 'Comparație',
  comparison: 'comparașie',
  Threshold_value: 'Valoarea pragului',
  Minimum: 'Minim',
  Maximum: 'Maxim',
  Derivative: 'Derivat (creștere sau scădere)',
  Count: 'Counăra',
  Value: 'Valoare',
  Difference: 'Diferență',
  Absolute_value: 'Valoare absolută',
  Absolute_value_of_dif_explanation: '**Valoarea absolută a diferenței',
  Exclude_months:
    '<strong>Dezactivați</strong> această alertă în timpul următoarelor luni:',
  Exclude_hours:
    '<strong>Dezactivați</strong> această alertă pe perioada următoarelor ore:',
  Exclude_hives:
    '<strong>Dezactivați</strong> această alertă pentru umătorii stupi:',
  Exclude_hives_details:
    'N.B. În mod implicit, această alertă va fi executată pentru toți stupii cu un dispozitiv de măsurare.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'luni',
  hours: 'ore',
  delete_alertrule: 'Ștergeți regula pentru alertă',
  create_alertrule: 'Save alert rule',
  Active: 'Activați',
  Alert_via_email: 'Alertă prin e-mail',
  Webhook_url: 'Adresa URL webhook',
  this_field: 'Acest câmp',
  alertrule_default: 'Default alert rule | Reguli de alertă implicite',
  copy: 'Copiere',
  Home: 'Acasă',
  Select_default_alertrule: 'Copiați regula de alertă implicită',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Aș dori să primesc o alertă dacă [calculation] [comparison] din [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Acest calcul va fi executat [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', și aș dori să primesc alerta direct. ',
  alertrule_occurences_indirect_sentence:
    ', dar aș dori să primesc alerta numai dacă apare [alert_on_occurences] ori. ',
  alertrule_exclude_months_sentence:
    'Această alertă va fi dezactivată pentru următoarele luni: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Această alertă va fi dezactivată pentru următoarele ore: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Această alertă va fi dezactivată pentru următorii stupi: [exclude_hive_ids].',
  min: 'minim',
  max: 'maxim',
  ave: 'medie',
  der: 'derivat',
  cnt: 'cumărătoare',
  equal_to: 'este egal cu',
  less_than: 'este mai mic ca',
  greater_than: 'este mai mare decât',
  less_than_or_equal: 'este mai mic sau egal cu',
  greater_than_or_equal: 'este mai mare sau egal cu ',
  alertrule_not_active:
    'Această alertă a fost dezactivată. O puteți activa bifând caseta „Activați” și salvând această regulă de alertă.',
  export_email_sent: 'A fost trimis un e-mail cu fișier Excel',
  excel_file_saved: 'Fișierul Excel a fost salvat în folderul Descărcări',
  Updated_at: 'Actualizat la',
  Not_yet_saved: 'Nu a fost încă salvat',
  add_own_device: 'Adăugați propriul dispozitiv',
  devices_info_text:
    'Vă rugăm să rețineți: dețineți o bază BEEP? Utilizați aplicația  BEEP base pentru a vă adăuga dispozitivul. In acest caz aceasta va apărea automat în lista de mai jos.',
  devices_url_text:
    'Aici puteți găsi mai multe informații despre aplicația de BEEP base.',
  alert_explanation_1:
    'Dacă dețineți o bază BEEP sau un alt dispozitiv, puteți seta alerte, astfel încât să primiți o alertă atunci când datele de măsurare îndeplinesc anumite cerințe. De exemplu, o scădere bruscă a greutății din cauza roirii. Alertele vor fi afișate în această aplicație, puteți alege să le primiți și prin e-mail.',
  alert_explanation_2:
    'Pentru a putea începe, există câteva reguli implicite de alertă pe care le puteți utiliza (și adapta la propriile nevoi). În plus, vă puteți crea propriile reguli de alertă.',
  alertrules_url_text:
    'Accesați „Setări de alertă” pentru a crea prima regulă de alertă',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Managementul stupinei',
  Move: 'Mutați',
  Current_apiary: 'Stupina actuală',
  sensor_key: 'Identificator unic al dispozitivului',
  disabled_settings: 'Editarea manuală a acestor setări este dezactivată.',
  Address_placeholder: 'Număr, Nume stradă, Oraș',
  first_create_apiary: 'Mai întâi, creați o stupină',
  Unknown: 'Necunoscut',
  unknown: 'necunoscut',
  research_warning:
    'Vă rugăm să rețineți: dacă nu ați primit o invitație de participare, nu este necesar să vă dați consimțământul pentru a vă partaja datele, deoarece datele dvs. nu vor fi utilizate în acest caz.',
  research_explanation_p1:
    'Platforma BEEP este utilizată în proiectele de cercetare enumerate mai jos. După ce sunteți invitat să participați la un proiect de cercetare, trebuie să dați consimțământul pentru ca cercetătorii să vă acceseze datele despre albine.',
  research_explanation_p2:
    'Vă puteți retrage consimțământul în orice moment. Din acel moment, nu vor mai fi distribuite date noi. Datele pe care le-ați distribuit în perioada pentru care ați dat consimțământul vor rămâne disponibile pentru cercetare. În caz de întrebări, vă rugăm să le adresați persoanei de contact a proiectului dvs. de cercetare.',
  research_info:
    'Înainte de a vă da consimțământul, vă rugăm să consultați descrierea cercetării oferită prin linkul de mai jos și să solicitați detalii suplimentare, dacă considerați necesar.',
  save_and_delete: 'Salvați și ștergeți',
  drag_layers_info_text:
    'Trageți straturile din partea stângă în poziția dorită la stupul din partea dreaptă. Ștergeți un strat din stup făcând clic pe acesta și apoi făcând clic pe pictograma in forma unui coș roșu  . În interiorul stratului dintr-un stup se poate trage și pentru a edita pozițiaacestuia, de asemenea culoarea stratului poate fi editată făcând clic pe strat.',
  New_hive: 'Stup nou',
  New_alertrule: 'Regulă nouă pentru alertă',
  Add_alertrule: 'Adăugați o regulă de alertă',
  Add_apiary: 'Adăugați o stupină',
  Add_sensor_definition: 'Adăugați definiția senzorului',
  Add_member: 'Adăugați un membru',
  alert_rule_deleted: 'Regula de alertă a fost ștearsă',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. Definițiile senzorului vor fi salvate sau adăugate numai după ce faceți clic pe pictograma de verificare verde de la sfârșitul rândului de definiție a senzorului din tabel.',
  delete_sensordef: 'Ștergeți definiția senzorului',
  delete_all_alerts: 'Ștergeți toate alertele',
  delete_all_alerts_warning:
    'Sigur doriți să ștergeți toate alertele? Această modificare nu poate fi anulată',
  delete_all_alerts_warning_filter_active:
    'Sigur doriți să ștergeți toate alertele? Inclusiv alertele care nu corespund termenului  căutarii dvs. vor fi șterse. Acest lucru nu poate fi anulat.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified: 'Am confirmat adresa de e-mail și as dpri să ma autentific',
  password_recovery_resend_mail: 'Trimiteți un nou cod de verificare',
  alert_rule_created: 'Noua regulă de alertă a fost creată',
  select_all: 'Selectați tot',
  During: 'În decurs de',
  Calculation_minutes: 'Cât de des ați dori să se efectueze acest calculul?',
  Every: 'La fiecare ',
  Calculation_minutes_short: 'Cât de des ete calculată?',
  Alert_on_occurences_short: 'Când veți primi alerta?',
  Disable_alert_for_this_hive: 'Dezactivați alerta pentru acest stup',
  Alert_disabled_for_this_hive: 'Alerta afost dezactivată pentru acest stup',
  disabled_for_hive: 'A fost dezactivată pentru stupul ',
  Alert_disabled: 'Alertă dezactivată',

  // For import page
  Log_data_import: 'Importați datele înregistrate',
  Log_files: 'Fișierele cu date inregistrate',
  Upload_date: 'Data de încărcare',
  Messages: 'Mesaje',
  Log_time: 'Timp înregistrat',
  File_size: 'Dimensiunea fișierului',
  check_log_data: 'Verificați datele din jurnal',
  delete_log_file: 'Ștergeți datele din jurnal',
  commit_log_data_short: 'Importați datele înregistrate',
  commit_log_data:
    'Importați datele din acest fișier tip jurnal în aplicația BEEP: ',
  // import_log_data_explanation:
  //   'În aplicația  BEEP puteți descărca datele jurnalului din memoria internă a bazei BEEP. De fiecare dată când descărcați datele jurnalului, memoria internă este ștearsă și datele sunt încărcate în aplicația BEEP. Mai jos este lista datelor de jurnal descărcate. Puteți înlocui datele din baza de date cu datele din fișierele tip jurnal descărcate făcând clic pe butonul „Verificare date jurnal”. Aceasta va verifica mai întâi câte date vor fi înlocuite în baza de date și dacă timpul și datele din fișierul tip jurnal este corect. Veți primi o pictogramă de confirmare cu informațiile rezultate și posibilitatea de a aplica sau de a refuza înlocuirea datelor.',
  import_log_data_url_text:
    'Aici puteți găsi articolul de asistență despre descărcarea datelor jurnalului cu aplicația BEEP.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/ro/support/solutions/articles/60000697129-desc%C4%83rca%C8%9Bi-datele-de-baz%C4%83-beep-prin-bluetooth',

  Immediately: 'Imediat',
  alertrule_active_no_email_sentence:
    ', și deschid aplicația BEEP pentru a vedea alertele.',
  alertrule_active_email_sentence:
    ', și primesc alerte prin e-mail. În plus, pot vedea alertele în aplicația BEEP.',
  First_occurence: 'Prima',
  Last_occurence: 'Ultima',
  /* default alert rule names: */
  Hive_stability_and_theft: 'Stabilitate stup & furt',
  Temperature_sensor_defect: 'Defecțiune la sezorul de temperatură',
  Battery_low: 'Tensiunea bateriei este scăzută ',
  Honey_harvest: 'Recoltă miere',
  Hive_temperature: 'Temperatura stupului este scăzută ',
  Brood_temperature: 'Temperatura puietului este scăzută ',
  No_measurements: 'Nu sunt măsurător',
  Swarm: 'Roire',
  Food_supply_low: 'Rezervă de hrană scăzută',
  /* default alert rule descriptions: */
  Weight_drop_is_above_a_set_value:
    'Scăderea în greutate a stupului depășește valoarea stabilită ',
  Temperature_sensor_malfunctions: 'Defecțiune la senzorul de temperatură',
  Battery_voltage_is_below_a_set_value:
    'Tensiunea la bateria dispozitivului este sub o valoare setată ',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Creșterea în greutate datorită colectării nectarului s-a oprit ',
  Hive_temperature_drops_below_a_set_value:
    'Temperatura stupului a scăzut sub o valoarea setată ',
  Temperature_in_the_brood_below_a_set_value:
    'Temperatura puietului a scăzut sub o valoarea setată',
  No_measurement_data_received_in_a_set_time_period:
    'Nu s-au primit date de măsurare în perioada de timp setată ',
  Sudden_weight_drop_triggers_alert_immediately:
    'Scăderea bruscă a greutății stupului declanșează imediat o alertă. N.B. aceasta se bazează pe un interval de transmitere a datelor de 15 minute. În cazul în care dispozitivul dvs. are un interval diferit de transmitere a datelor, ar trebui să ajustați valoarea pragului în consecință.',
  The_hive_weight_is_below_a_set_value:
    'Greutatea stupului este sub valoarea stabilită',

  minute: 'minut | minute',
  upload_interval_warning_single_interval:
    'N.B. intervalul de transmitere a datelor al dispozitivului dvs. este | NB: intervalul de transmitere a datelor al dispozitivelor dvs. este ', // context: f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'N.B. intervalele de transmitere a datelor ale dispozitivelor dvs. variază între ',
  not_relevant_for_immediate_calculation:
    'Nu este relevant pentru calcularea imediată ',
  Increase: 'Creștere',
  Decrease: 'Scădere',
  Every_hour: 'Fiecare oră',
  every_hour: 'fiecare oră',
  Absolute_value_of_dif: 'Diferență',
  In_case_of_good_connection_warning:
    '*Imediat după primirea unei măsurători. Acest lucru depinde de intervalul de transmitere a datelor și de fiabilitatea conexiunii de date.',
  Alertrule_summary_title: 'Summar',
  Alertrule_settings_title: 'Setările regulii de alertă ',
  Alertrule_exclude_title: 'Excludeți perioade și stupi ',
  of: 'de',

  alerts_url_text: 'Citiți articolul de asistență despre alerte',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/ro/support/solutions/articles/60000706484-alerte',

  /* New translations v3.0.74 */
  Decline: 'Declin',
  Decline_invitation: 'Refuza invitația',
  Decline_invitation_sure: 'Sigur doriți să refuzați invitația în grup?',
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
  View_measurements: 'Vedeți măsurători',
  View_inspection: 'Vizualizați inspecția | Vedeți inspecțiile',
  View_alert: 'Vedeți alerta | Vezi alerte',

  Edit_alertrule: 'Editați regula de alertă',
  Edit_hive: 'Editați stupul',
  Edit_queen: 'Editează matcă',
  Edit_apiary: 'Editați stupina',
  Edit_group: 'Editați grupul de colaborare',
  Edit_group_short: 'Editați grupul',
  Edit_checklist: 'Editați lista de verificare',
  Edit_devices: 'Editați dispozitive',
  Edit_consent: 'Editați consimțământul',
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
  Day: 'Zi | Zile',
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
