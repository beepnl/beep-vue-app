/*
 * Beep - Translations
 * Author: Pim van Gennip (pim@iconize.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Janvier ',
    ' Février ',
    ' Mars ',
    ' Avril ',
    ' Mai ',
    ' Juin ',
    ' Juillet ',
    ' Août ',
    ' Septembre ',
    ' Octobre ',
    ' Novembre ',
    ' Décembre ',
  ],
  monthsShort: [
    'Jan ',
    ' Fév ',
    ' Mar ',
    ' Avr ',
    ' Mai ',
    ' Juin ',
    ' Juil ',
    ' Août ',
    ' Sep ',
    ' Oct ',
    ' Nov ',
    ' Dec',
  ],
  weekdaysFull: [
    'Dimanche ',
    ' Lundi ',
    ' Mardi ',
    ' Mercredi ',
    ' Jeudi ',
    ' Vendredi ',
    ' Samedi ',
  ],
  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  Today: "Aujourd'hui",
  Clear: 'Effacer',
  Close: 'Fermer',
  firstDay: 1,
  format: 'jjjj j mmmm aaaa',

  /* main */
  Website: 'Site Web',
  Feedback: 'Avis',
  Feedback_mail_header: "Commentaires de l'application beep",
  Feedback_mail_body:
    "Cher Beep foundation, % 0D % 0A % 0D % 0AVoici mon commentaire sur l'application Beep. % 0D % 0A % 0D % 0AI a découvert ceci : % 0D % 0A % 0D % 0AJuste avant que cela ne se produise, j'ai fait : % 0D % 0A % 0D % 0AL'écran ressemblait (s'il vous plaît inclure une capture d'écran) : % 0D % 0A % 0A % 0D % 0A % 0A % 0A % 0A D % 0A % 0D % 0A",
  Diagnostic_info: 'Informations de diagnostic (en cas de bogue) : % 0D % 0A',
  back: 'Retourner',
  menu: 'Menu',
  lighting: 'Éclairage',
  camera: 'Appareil photo',
  weather: 'Météo',
  sensors: 'Capteurs',
  sensors_na:
    'Des capteurs BEEP pour surveiller à distance votre ruche seront bientôt disponibles..',

  no_valid_authentication:
    "Aucune donnée d'authentification valide n'a été reçue",
  succesfully_saved: 'Sauvegardé avec succès',

  switch_language: 'Changez de langue',
  Delete: 'Supprimer',
  Search: 'Recherche...',

  /* user error messages */
  User: 'Utilisateur',
  User_data: 'Données utilisateur',
  user_data: 'données utilisateur',
  updated: 'mis à jour',
  delete_complete_account:
    "Êtes-vous sûr de vouloir supprimer votre compte complet, y compris tous les ruchers, ruches et inspections ? C'est irréversible.",
  username_is_required: "Veuillez saisir le nom d'utilisateur",
  username_already_exists: "Le nom d'utilisateur existe déjà",
  password_is_required: 'Veuillez saisir un mot de passe',
  email_is_required: 'Veuillez saisir un e-mail',
  email_already_exists: "L'adresse e-mail est déjà utilisée",
  policy_accepted_is_required:
    'Vous devez accepter les conditions de service pour vous inscrire',

  already_registered: 'Je suis déjà inscrit',
  invalid_user: 'Utilisateur inconnu ou mot de passe incorrect',
  no_password_match: 'Les mots de passe ne correspondent pas',
  invalid_token: 'Code non valide',

  no_valid_email: 'Adresse e-mail non valide',

  empty_fields: 'Veuillez remplir tous les champs',
  match_passwords: 'Les mots de passe ne correspondent pas',

  succesfully_registered: 'Vous êtes enregistré avec succès',
  authentication_failed: "Échec de l'authentification",

  no_valid_input_received:
    "Les données n'ont pas pu être enregistrées, aucune entrée valide n'a été reçue",

  remove_all_settings: 'Supprimez tous les paramètres',
  remove_apiary: 'Enlevez le rucher',
  remove_hive: 'Enlevez la ruche',
  remove_inspection: "Retirer l'inspection",

  Error: 'Erreur',
  Warning: 'Attention',
  first_remove_hives:
    "Attention : il y a encore des ruches à ce rucher. Vous pouvez enregistrer des ruches spécifiques (et leurs inspections) en les déplaçant d'abord vers un autre rucher. Si vous continuez à supprimer, vous supprimerez TOUTES les ruches et les inspections présentes à cet emplacement",

  Date: 'Rendez-vous',
  ok: 'Ok',
  previous: 'Précédent',
  prev: 'précédent',
  next: 'Suivant',
  add: 'Ajouter',
  create_new: 'Créer un nouveau',
  New: 'Nouveau',

  warning: 'Attention',

  apply: 'Appliquer',
  Cancel: 'Annuler',
  automatic: 'Automatique',
  manually: 'Manuel',
  on: 'On',
  off: 'Off',

  /* login */
  login_title: 'Connectez-vous',
  login: 'Connectez-vous',
  back_to_login: 'Retour à la connexion',
  forgot_password: 'Vous avez oublié votre mot de passe ?',

  username: "Nom d'utilisateur",
  password: 'Mot de passe',
  confirm_password: 'Confirmez le mot de passe',
  email: 'E-mail',
  token: 'Code',

  create_login_question:
    'Pas encore de compte ? Inscrivez-vous en tant que nouvel utilisateur',
  create_login: 'Inscrivez-vous en tant que nouvel utilisateur',
  create_login_summary: "Créez un nouveau compte d'utilisateur",
  save: 'Sauvegarder et retour',
  save_and_return: 'Sauvegarder et retour',

  logout: 'Se déconnecter',
  logout_title: 'Se déconnecter en tant que',
  logout_now: 'Voulez-vous vraiment vous déconnecter maintenant ?',
  member_since: 'Beep depuis',

  /* password recovery */
  password_recovery_title: 'Vous avez oublié votre mot de passe ?',
  password_recovery_remembered:
    'Oh, maintenant je me suis rappelé mon mot de passe !',
  password_recovery_user: 'Informations utilisateur',
  password_recovery_send_mail: 'Envoyer le code de vérification',
  password_recovery_code_not_received: 'Code non reçu dans les 5 minutes ?',
  password_recovery_enter_code:
    'Vous avez déjà un code de vérification ? Entrez le ici',
  password_recovery_reset_title: 'Entrez un nouveau mot de passe',
  password_recovery_reset_password: 'Changer le mot de passe',
  password_recovery_reminder_success:
    "Un e-mail a été envoyé. Cliquez sur le lien dans l'e-mail pour réinitialiser votre mot de passe pour ce compte",
  password_recovery_reminder_summary:
    "Entrez votre adresse e-mail. Vous recevrez un e-mail avec un lien pour changer votre mot de passe à l'étape suivante",

  password_recovery_reset_summary:
    'Utilisez le code que vous avez reçu pour définir un nouveau mot de passe pour votre compte',
  password_recovery_reset_success:
    'Vous passowrd est modifié avec succès, et vous êtes connecté.',

  new_password: 'Nouveau mot de passe',
  confirm_new_password: 'Confirmez le nouveau mot de passe',

  go_to_dashboard: 'Allez sur mon tableau de bord',

  /* overview */
  overview_title: "Vue d'ensemble",
  overview: "Vue d'ensemble",
  color: 'Couleur',
  state: 'Marche/arrêt',
  connection_state: 'État de la connexion',

  /* hives */
  locations_title: 'Beep',
  hives_title: 'Beep',
  Hive: 'Ruche | Ruches',
  hive: 'ruche | ruches',
  Location: 'Rucher | Ruchers',
  location: 'rucher | ruchers',
  Name: 'Nom',
  name: 'nom',
  Type: 'Tapez',
  type: 'tapez',
  Layer: 'Element',
  layer: 'element',
  brood: 'Couvain',
  honey: 'Miel',
  inspect: 'Inspecter',
  inspection: 'inspection | inspections',
  Inspection: 'Inspection | Inspections',
  New_inspection: 'Nouvelle inspection',
  Edit_inspection: "Modifier l'inspection",
  Actions: 'Actions',
  Conditions: 'Conditions (inspectées)',
  edit: 'Modifier',
  // Hive_brood_layers: 'Cadre de couvain',
  // Hive_honey_layers: 'Cadre de miel',
  Hive_layer_amount: "Quantité d'éléments",
  Bee_race: "Course d'abeilles",
  Birth_date: 'Date de naissance',
  Color: 'Couleur',
  Queen_colored: 'Reine marquée',
  Queen_clipped: 'Reine clipée',
  Queen_fertilized: 'Reine fécondée',
  Age: 'Âge',
  years_old: 'ans',

  /* Hive check items */
  Date_of_inspection: "Date de l'inspection",
  action: 'Action',
  reminder: 'Rappel',
  remind_date: 'Date de rappel',

  overall: "Dans l'ensemble",
  positive_impression: 'Impression totale',
  needs_attention: "Besoin d'attention",
  notes: 'Notes',
  notes_for_next_inspection:
    "Brève note pour la prochaine inspection (visible sur la vue d'ensemble)",
  Not_implemented_yet: "Cet élément n'est pas encore implémenté",
  save_input_first: "Voulez-vous d'abord enregistrer votre saisie ?",

  /* dashboard */
  dashboard_title: 'Tableau de bord',
  dashboard: 'Tableau de bord',
  measurementsError:
    'Impossible de charger les mesures, vérifiez la connexion réseau',
  last_measurement: 'Dernière mesure',
  at: 'à',
  measurement_system: 'Système de mesure Beep',
  no_data: 'Aucune donnée disponible',
  no_chart_data: 'Aucune donnée graphique pour la période sélectionnée',

  /* settings */
  General: 'Général',
  Place: 'Emplacement',
  Country: 'Pays',
  City: 'Ville',
  Address: 'Adresse',
  Lattitude: 'Lattitude',
  Longitude: 'Longitude',
  Street: 'Rue',
  Number: 'Non',
  Postal_code: 'Code postal',
  Description: 'Description',
  Hive_settings: 'Paramètres de la ruche',
  Hive_amount: 'Nombe de ruches à cet emplacement',
  Hive_prefix: 'Nom de la ruche préfixe (avant numéro)',
  Hive_number_offset: 'Début de numérotation',
  Hive_type: 'Type de ruche',
  Hive_layers: 'Element de ruche',
  Hive_frames: 'Cadres par élément',

  Hive_color: 'Couleur ruche',
  Queen: 'Reine',
  queen: 'reine',

  settings_title: 'Paramètres',
  settings_description: 'Réglages des capteurs',
  Settings: 'Paramètres',
  settings: 'paramètres',

  sensors_title: 'Réglages du capteur',
  sensors_description: 'État et enregistrement des capteurs',
  //   sensors: 'Capteurs',
  sensor: 'Capteur',

  Select: 'Sélectionner',
  Not_selected: 'Non sélectionné',
  Poor: 'Pauvre',
  Fair: 'Juste',
  Average: 'Moyenne',
  Good: 'Bon',
  Excellent: 'Très bien',
  Low: 'Faible',
  Medium: 'Moyenne',
  High: 'Elevé',
  Extreme: 'Extrême',

  /* colors */
  select_color: 'Sélectionnez une couleur',
  advanced: 'Avancé',

  /* sensors */
  Select_sensor: 'Sélectionnez un capteur',
  temperature: 'Température',
  t: 'Température',
  t_0: 'Température 1',
  t_1: 'Température 2',
  t_2: 'Température 3',
  t_3: 'Température 4',
  t_4: 'Température 5',
  t_5: 'Température 6',
  t_6: 'Température 7',
  t_7: 'Température 8',
  t_8: 'Température 9',
  t_9: 'Température 10',
  light: 'Lumière du soleil',
  l: 'Lumière du soleil',
  water: 'Eau',
  w: 'Eau',
  humidity: 'Humidité',
  h: 'Humidité',
  air_pressure: "Pression de l'air",
  p: "Pression de l'air",
  weight: 'Poids',
  w_v: 'Valeur du capteur de poids tous les capteurs',
  w_fl: 'Valeur du capteur de poids avant gauche',
  w_fr: 'Valeur du capteur de poids avant droit',
  w_bl: 'Valeur du capteur de poids arrière gauche',
  w_br: 'Valeur du capteur de poids retour à droite',
  weight_kg: 'Poids',
  weight_kg_corrected: 'Poids (corr)',
  weight_combined_kg: 'Poids combiné',
  bat_volt: 'Batterie',
  bv: 'Batterie',
  sound_fanning_4days: 'Fan 4d abeilles',
  s_fan_4: 'Fan 4d abeilles',
  sound_fanning_6days: 'Fan 6d abeilles',
  s_fan_6: 'Fan 6d abeilles',
  sound_fanning_9days: 'Fan 9d abeilles',
  s_fan_9: 'Fan 9d abeilles',
  sound_flying_adult: 'Abeilles volantes',
  s_fly_a: 'Abeilles volantes',
  sound_total: 'Son total',
  s_tot: 'Son total',
  s_spl: 'Son total',
  bee_count_in: 'Comptez les abeilles',
  bc_i: 'Comptez les abeilles',
  bee_count_out: "Comptage d'abeilles sorties",
  bc_o: "Comptage d'abeilles sorties",
  t_i: "Temp. à l'intérieur",
  rssi: 'Force du signal',
  snr: 'Bruit de signal',
  Sound_measurements: 'Mesures sonores',
  Sensor_info: 'Informations sur le capteur',
  s_bin098_146Hz: '098-146Hz',
  s_bin146_195Hz: '146-195 Hz',
  s_bin195_244Hz: '195-244Hz',
  s_bin244_293Hz: '244-293Hz',
  s_bin293_342Hz: '293-342Hz',
  s_bin342_391Hz: '342-391Hz',
  s_bin391_439Hz: '391-439Hz',
  s_bin439_488Hz: '439-488Hz',
  s_bin488_537Hz: '488-537Hz',
  s_bin537_586Hz: '537-586Hz',
  icon: 'Icon',
  precipIntensity: 'Rainfall',
  precipProbability: 'Rain probability',
  precipType: 'Rain type',
  outsideTemperature: 'Outside temperature',
  apparentTemperature: 'Apparent temperature',
  dewPoint: 'Dew point',
  //   humidity: 'Humidity',
  pressure: 'Air pressure',
  windSpeed: 'Wind speed',
  windGust: 'Wind gust',
  windBearing: 'Wind bearing',
  cloudCover: 'Cloud cover',
  uvIndex: 'UV index',
  visibility: 'Visibility',
  ozone: 'Ozone',

  /* Measurements */
  hour: 'Heure',
  day: 'Jour',
  week: 'Semaine',
  month: 'Mois',
  year: 'Année',

  /* settings */
  could_not_load_settings: 'Impossible de charger les paramètres',
  offline: 'Pas de connexion',
  remote: 'À distance',
  connected: 'Direct',

  yes: 'Oui',
  no: 'Non',

  footer_text: 'Apiculture open source',
  beep_foundation: 'la fondation BEEP',

  Checklist: 'Liste de contrôle | Listes de contrôle',
  checklist: 'liste de contrôle | listes de contrôle',
  Checklist_items: 'Éléments de la liste de contrôle',
  edit_hive_checklist:
    'Cochez ou décochez les cases de la liste ci-dessous pour ajouter/supprimer des éléments de votre liste de vérification de la ruche. Vous pouvez également déplier/plier et glisser/déposer les éléments pour les réorganiser à votre propre style.',

  /* user */
  Data_export: 'Exportation de données',
  Export_your_data:
    'Exportez toutes les données qui se trouvent dans votre compte BEEP et envoyez un e-mail contenant les données en tant que fichier Excel 2007',

  Terms_of_use: "Conditions d'utilisation",
  accept_policy:
    "J'accepte les conditions d'utilisation de BEEP, qui sont compatibles avec la nouvelle loi européenne sur la protection de la vie privée",
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy:
    "Vous n'avez pas encore respecté les dernières conditions d'utilisation",

  /* General items */
  server_down:
    "L'application n'est pas disponible en raison  de maintenance. Veuillez réessayer plus tard",
  add_to_calendar: 'Ajouter au calendrier',
  sort_on: 'Trier sur',
  Whats_new: 'Nouveau!',
  Manual: 'Manuel (EN)',

  /* weight calibration settings */
  calibrate_weight: 'Étalonner le poids',
  calibrate_explanation:
    'Réglez le poids des capteurs à 0 en soustrayant la valeur de mesure actuelle',
  set_as_zero_value: 'Définissez ces valeurs en tant que valeurs 0',
  set_weight_factor: 'Définissez le facteur de poids',
  own_weight_kg: 'Quel est votre propre poids en kg ?',
  start_calibration:
    'Maintenant, marchez sur la balance et appuyez sur le bouton ci-dessous pour définir le facteur de poids. Répartissez votre poids également',
  currently_there_is: 'Il y a un poids de',
  nothing: 'rien',
  on_the_scale: 'sur la balance',
  calibration_started:
    "L'étalonnage a commencé... Attendez que la prochaine mesure prenne effet",
  calibration_ended: "L'étalonnage a réussi !",

  Site_title: 'BEEP | Moniteur abeille',

  could_not_create_user:
    "L'utilisateur ne peut pas être créé pour le moment. Désolé pour la gêne occasionnée, veuillez réessayer plus tard",
  email_verified: 'Votre adresse e-mail a été vérifiée',
  email_not_verified: "Votre adresse e-mail n'a pas encore été vérifiée",
  email_new_verification:
    'Cliquez sur ce lien pour envoyer un nouvel e-mail de vérification',
  email_verification_sent:
    "Un message avec un lien de vérification a été envoyé à votre adresse e-mail. Cliquez sur le lien dans l'e-mail pour activer votre compte et vous connecter",

  not_filled: 'non rempli',
  cannot_deselect:
    'Impossible de supprimer cet élément, car il contient un élément requis',
  sensor_key: 'Clé du capteur',
  Undelete: 'Ne pas supprimer',
  the_field: 'Le',
  is_required: 'est obligatoire',

  No_groups: "Aucun groupe n'est disponible",
  not_available_yet:
    "pas encore disponible. S'il vous plaît créer le premier ici.",
  Users: 'Utilisateurs',
  member: 'membre du groupe | membres du groupe',
  Member: 'Membre du groupe',
  Members: 'Membres du groupe',
  Invite: 'Inviter',
  Invited: 'Invité',
  Invitation: 'Invitation | Invitations',
  Admin: 'Administrateur',
  Creator: 'Propriétaire du groupe',
  Collaborate: 'Collaborer',
  Group: 'Groupe de collaboration | Groupes de collaboration',
  group: 'groupe de collaboration | groupes de collaboration',
  group_short: 'groupe | groupes',
  to_share:
    'pour partager avec ce groupe. 1 clic = les membres du groupe peuvent afficher uniquement, 2 clics = les membres du groupe peuvent modifier',
  Invitation_accepted: 'Invitation acceptée',
  Accept: 'Accepter',
  My_shared: 'Mon partage',
  invitee_name: "Nom de l'invité",
  Remove_group:
    'Êtes-vous sûr de vouloir supprimer ce groupe partagé en compétition pour tous ses membres',
  Detach_from_group: 'Retirez moi et mes ruches de ce groupe',
  my_hive: 'Ma ruche',
  created: 'créé',
  group_detached: 'A quitté le groupe avec succès',
  group_activated: 'Invitation de groupe acceptée',
  group_explanation_1:
    '1. Créer un nouveau groupe de coopération avec un titre clair et une description facultative',
  group_explanation_2:
    "2. Inviter d'autres utilisateurs Beep sur leur adresse e-mail Beep",
  group_explanation_3:
    "3. Partager des ruches spécifiques pour être vues par d'autres, pour coopérer",
  Filter_and_sort_on: 'Filtrer et trier sur:',

  /* New translations v2.2.0 */
  roofed: 'Does the apiary have a roof?',
  info: 'Info',

  research: 'Research',
  research_explanation:
    'This screen contains the available researches for which you can opt-in to share your data with. When you consent to share your BEEP account data, you contribute to research to support honeybee health. Before you consent, please review the research description provided through the link below and request for additional details if needed. You can withdraw your consent at any time, no new data will be shared from that moment. The data that your shared in the period that you did consent to will remain available for research. In case of questions, please direct these to the contact person provided.',
  research_info:
    'By sharing your data with researchers, you help them to being able to analyse more data and come to better conclusions for their research.',
  start_date: 'Start date',
  end_date: 'End date',
  purpose: 'Research purpose',
  institution: 'Research institution',
  type_of_data_used: 'Data usage',
  link: 'Link',
  Consent: 'Consent',
  history: 'history',
  Current_consent: 'Current consent',
  consent_yes: 'I consent to share my data',
  consent_no: 'I do NOT consent to share my data',
  my_beep_data: 'My own BEEP data',
  Consent_can_only_be_set: 'Consent can only be adjusted to',
  earlier: 'an earlier',
  later: 'a later',

  new_apiary_explanation: 'Create a new apiary in 4 steps',
  start_here: 'Click here to start',
  optional: 'optional',
  dimensions: 'dimensions',
  details: 'details',
  configuration: 'configuration',
  adjustments: 'adjustments',
  changes_queen_color: 'editing changes the color',

  Brood_box_and_frame: 'Brood box and frame',
  Hive_order: 'Hive order at apiary',
  bb_width_cm: 'Brood box width (cm)',
  bb_height_cm: 'Brood box height (cm)',
  bb_depth_cm: 'Brood box depth (cm)',
  fr_width_cm: 'Frame width (cm)',
  fr_height_cm: 'Frame height (cm)',
  queen_line: 'line',
  queen_tree: 'tree',
  queen_description: 'notes',
  Hive_short: 'Hive | Hives',

  Image: 'Image | Images',
  Size: 'Size',
  preview: 'preview',

  Inside: 'Measures inside',
  Offset: 'Offset',
  Multiplier: 'Multiplier',
  Input: 'Input',
  Output: 'Output',
  Last: 'Last',

  Export_sensor_data:
    "Export all data per device in the highest possible resolution as a .csv file that you can open in Excel, or SPSS. NB: The date time data in the 'time' column is in GMT time, formatted by the RFC 3339 date-time standard.",
  CSV_export_separator: 'CSV data column separator',
  Selected_date: 'Selected time span',
  Sensor_measurements: 'Sensor measurements',
  too_much_data:
    'Too much data to process, please select fewer Sensor measurements, or reduce the timespan between start and end date.',

  beep_base_explanation:
    "If you have a BEEP base (shown in the picture above), please use the native app (iOS and Android) to set-up the communication with this app. If you don't have a BEEP base yet, please click on the menu item 'BEEP website' for updates on how to get a BEEP base. I you have your own measurement device and would like to see the data in the BEEP app, please send us a message to ask for joining our Slack community and you can get access to the API description.",

  sample_code_hive: 'First select a hive, to generate a unique sample code',
  sample_code_generate: 'Generate unique sample code',
  sample_code_delete: 'Delete unique sample code',

  measurement_interval: 'interval',
  from_weather_service: 'from weather service',

  /* New translations v3 */
  click_hives_to_filter: 'Cliquez sur les ruches pour filtrer',
  for: 'pour',
  last_visit: 'Derniere visite',
  apiary_details: 'Détails du rucher',
  group_details: 'Détails du groupe',
  diary: 'Journal',
  data: 'Données',
  photo: 'photo | photos',
  add_checklist: 'Ajouter une liste de contrôle',
  add_hive: 'Ajouter une ruche',
  delete_apiary: 'Supprimer le rucher',
  edit_apiary: 'Modifier le rucher',
  new_apiary: 'Nouveau rucher',
  delete_group: 'Supprimer le groupe',
  edit_group: 'Modifier le groupe',
  new_group: 'Nouveau groupe',
  verification_code: 'code de vérification',

  /* TO BE TRANSLATED */
  limit_exceeded: 'Limit has been reached, try again later',
  confirm_email_title: 'Confirm your email',
  confirm_email_summary:
    "You've received a verification code in your email. Enter it below to verify your email adress",
  confirm: 'Confirm',
  Profile: 'Profile',
  Checklist_template: 'Checklist template | Checklist templates',
  Help: 'Help',
  Privacy: 'Privacy',
  FAQ: 'FAQ',
  Support: 'Support',
  no_inspections: 'No inspections yet',
  no_results: 'No results',
  Hive_brood_layer: 'Brood layer | Brood layers',
  Hive_honey_layer: 'Honey layer | Honey layers',
  Hive_queen_excluder_layer: 'Queen excluder | Queen excluders',
  Hive_feeding_box_layer: 'Feeding box | Feeding boxes',
  overrides_layer_colors: 'overrides layer colors',
  drag_layers: 'Drag layers to configure hive',
  page: 'page | pages',
  not_found: 'not found',
  sorry: 'Sorry',
  delete_layer: 'Delete layer',
  not_saved_error: "Les données n'ont pas pu être enregistrées",
  something_wrong: 'Something went wrong',
  not_editable: 'not editable',
  unsaved_changes: 'Unsaved changes',
  save_changes:
    'Are you sure you want to leave this page? Any unsaved changes will be lost.',
  no_apiaries_yet: "You don't have any apiaries yet",
  need_help: 'Need help?',
  Apiary_color: 'Apiary color',
  Set_notification_date: 'Set notification date',
  remove_image: 'Remove image',
  Total_colony_size: 'Total colony size',
  bee: 'bee | bees',
  with_bees: 'with bees',
  change_checklist_confirm:
    'Are you sure you want to select a different checklist? Values of already filled in fields will be kept.',
  view: 'View',
  share: 'Share',
  edit_details: 'Edit details',
  remove_queen: 'Remove queen',
  remove_group_short: 'Remove collaboration group',
  device: 'Device | Devices',
  click_date_to_edit: 'Click date to edit.',
  accept_policy_1: "J'accepte les ",
  accept_policy_2:
    ' de BEEP, qui sont compatibles avec la nouvelle loi européenne sur la protection de la vie privée',
  terms_of_use: "conditions d'utilisation",
  invalid_password:
    'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number and one special character (\\]{}()?\\-"!@#%&/\\,><\':;|_~`)',
  sensor_definition: 'sensor definition | sensor definitions',
  measurement: 'mesure | mesures',
  remove_device: 'Remove device',
  last_message_received: 'Last message received',
  transmission_ratio: 'Transmission ratio',
  period: 'Période',
  download: 'Download',
  different_end_start: 'End and start date must differ',
  new_email_verification_sent:
    'A message with a verification link has been sent to your new e-mail address. Click the link in the e-mail to confirm your new e-mail address and log in.',
  sensordef_info:
    "A sensor definition is intended to convert a sensor value from an incoming 'raw' sensor value into a value according to a physical quantity and unit (e.g. w_v = 1098273 => weight_kg = 62,400 kg) or to calibrate a sensor (e.g. t_0 = 15.3 ° C => t_0 = 15.8 ° C). This can be done by setting an 'offset' and a 'multiplier'. The input and output value remains the same if offset '0' and multiplier '1' is set. The BEEP base app (from the App Store) will provide you with the right sensor definitions at the initial setup of your BEEP base.",
  or: 'or',
  select_all_hives: 'Select all hives',
  select_all_editable_hives: 'Selecteer alle aanpasbare bijenkasten',
  alert: 'Alert | Alerts',
  remove_alert: 'Remove alert',
  alerts_enabled: 'Alerts enabled',
  alerts_disabled: 'Alerts disabled',
  edit_checklist_confirm:
    'Are you sure you want to edit the checklist? Any unsaved changes to your inspection will be lost.',
  edit_checklist_confirm_deselectedhives:
    'Are you sure you want to edit the checklist? Any unsaved changes to your inspection and your hive selection will be lost.',
  user_not_edited:
    'User data has not been edited. Possibly the user data is identical to the user data already in the database, or one or more fields are not correctly filled in. Please check your data and try again.',
  user_not_deleted: 'Something went wrong, user has not been deleted.',
  research_consent: 'Research consent',
  checklist_types: 'Personal, shared, research',
  edit_hive_checklist_no_touch:
    'Check/unckeck the boxes in the list below to add/remove items from your hive checklist. You can also unfold/fold and drag/drop the items to re-order them to your own style (N.B. this is not possible on a touchscreen device).',
  edit_hive_checklist_touch:
    'Check/unckeck the boxes in the list below to add/remove items from your hive checklist. Changing the order of items is only possible on a desktop computer.',
  input_not_possible_for_bulkinspection:
    'This item is not available when multiple hives are selected for an inspection, as it can only be filled in per individual hive. It is possible to fill in this item for a single hive at a later time, by editing the inspection for that hive.',
  save_bulkinspection_confirm:
    'Are you sure that you want to save this inspection for multiple hives at the same time?',
  deleted_but_not_saved_devices_warning:
    "N.B.: devices will only be removed after clicking the 'Save Devices' button in the top right corner.",
  no_alerts: 'No new alerts',
  alertrule: 'alert rule | alert rules',
  Measurement: 'Measurement | Measurements',
  Calculation: 'Calculation',
  calculation: 'calculation',
  Calculation_minutes: 'Calculate per x number of minutes',
  Alert_on_occurences: 'When would you like to receive this alert?',
  Alert_on_occurences_hint:
    'Directly, or only after it has occurred an x number of times?',
  Direct: 'Directly',
  After: 'After ',
  times: ' times',
  Comparator: 'Comparator',
  comparator: 'comparator',
  Comparison: 'Comparison',
  comparison: 'comparison',
  Threshold_value: 'Threshold value',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  Derivative: 'Derivative (increase or decrease)',
  Count: 'Count',
  Value: 'Value',
  Difference: 'Difference',
  Absolute_value: 'Absolute value',
  Absolute_value_of_dif: 'Absolute value of the difference',
  alertrule_info: 'This will be replaced by some info on alert rules.',
  alertrules_default_url_text:
    'Here you can view the default alert rules and copy them to your own alert rules if you like.',
  Exclude_months:
    'I do NOT want to receive any alerts during the following months:',
  Exclude_hours:
    'I do NOT want to receive any alerts during the following hours:',
  Exclude_hours_details:
    'N.B. During the selected hours no calculations will be performed in order to create any alerts.',
  Exclude_hives: 'I do NOT want to receive any alerts for the following hives:',
  months: 'months',
  hours: 'hours',
  delete_alertrule: 'Delete alert rule',
  Active: 'Active',
  Alert_via_email: 'Alert via email',
  Webhook_url: 'Webhook url',
  this_field: 'This field',
  alertrule_default: 'Default alert rule | Default alert rules',
  copy: 'Copy',
  Home: 'Home',
}

export default translations
