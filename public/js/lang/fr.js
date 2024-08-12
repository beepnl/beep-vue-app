/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl) & Cyrille Duverne (cyrille.duverne@gmail.com)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthsShort: [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
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
    "Cher BEEP foundation, % 0D % 0A % 0D % 0AVoici mon avis sur l'application BEEP. % 0D % 0A % 0D % 0J'ai découvert ceci : % 0D % 0A % 0D % 0AJuste avant que cela ne se produise, j'ai fait : % 0D % 0A % 0D % 0AL'écran affichait (Merci d'inclure une capture d'écran) : % 0D % 0A % 0A % 0D % 0A % 0A % 0A % 0A D % 0A % 0D % 0A",
  Diagnostic_info: 'Données de diagnostic (en cas de bug) : % 0D % 0A',
  back: 'Précédent',
  menu: 'Menu',
  lighting: 'Éclairage',
  camera: 'Appareil photo',
  weather: 'Météo',
  sensors: 'Capteurs',
  no_valid_authentication:
    "Aucune donnée d'authentification valide n'a été reçue",
  succesfully_saved: 'Sauvegardé avec succès',
  switch_language: 'Changer de langue',
  Delete: 'Supprimer',
  Search: 'Recherche...',

  /* user error messages */
  User: 'Utilisateur',
  User_data: 'Données utilisateur',
  user_data: 'données utilisateur',
  updated: 'mis à jour',
  /* Cyrille - 31/05 : Translation updated */
  delete_complete_account:
    'Êtes-vous sûr de vouloir complètement supprimer votre compte, y compris tous les ruchers, ruches et inspections ? Cette action est irréversible.',
  username_is_required: "Veuillez saisir le nom d'utilisateur",
  username_already_exists: "Ce nom d'utilisateur existe déjà",
  password_is_required: 'Veuillez saisir un mot de passe',
  /* Cyrille - 31/05 : Translation updated */
  email_is_required: 'Veuillez saisir une adresse e-mail',
  /* Cyrille - 31/05 : Translation updated */
  email_already_exists: 'Cette adresse e-mail est déjà utilisée',
  policy_accepted_is_required:
    "Vous devez accepter les conditions d'utilisation pour vous inscrire",
  /* Cyrille - 31/05 : Translation updated */
  already_registered: "J'ai déjà un compte",
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
  remove_all_settings: 'Supprimer tous les paramètres',
  /* Cyrille - 31/05 : Translation updated */
  remove_apiary: 'Supprimer le rucher',
  /* Cyrille - 31/05 : Translation updated */
  remove_hive: 'Supprimer la ruche',
  /* Cyrille - 31/05 : Translation updated */
  remove_inspection: "Supprimer l'inspection",
  Error: 'Erreur | Erreurs',
  Warning: 'Attention',
  /* Cyrille - 31/05 : Translation updated */
  first_remove_hives:
    "Attention : il y a encore des ruches associées à ce rucher. Vous pouvez enregistrer des ruches spécifiques (et leurs inspections) en les déplaçant d'abord vers un autre rucher. Si vous poursuivez, vous supprimerez TOUTES les ruches et les inspections présentes à cet emplacement",
  Date: 'Date',
  ok: 'Ok',
  prev: 'précédent',
  next: 'Suivant',
  add: 'Ajouter',
  Cancel: 'Annuler',

  /* login */
  login_title: 'Connectez-vous',
  login: 'Connectez-vous',
  /* Cyrille - 31/05 : Translation updated */
  back_to_login: "Retour à l'écran de connexion",
  /* Cyrille - 31/05 : Translation updated */
  forgot_password: 'Mot de passe oublié ?',
  username: "Nom d'utilisateur",
  password: 'Mot de passe',
  confirm_password: 'Confirmez le mot de passe',
  email: 'E-mail',
  token: 'Code',
  /* Cyrille - 31/05 : Translation updated */
  create_login_question: 'Pas encore de compte ? Inscrivez vous !',
  create_login: 'Inscrivez-vous',
  /* Cyrille - 31/05 : Translation updated */
  create_login_summary: 'Créer un nouveau compte utilisateur',
  /* Cyrille - 31/05 : Translation updated */
  save: 'Sauvegarder',
  /* Cyrille - 31/05 : Translation updated */
  save_and_return: 'Sauvegarde et retour',
  logout: 'Se déconnecter',
  /* Cyrille - 31/05 : Translation updated */
  logout_title: 'Se déconnecter',
  logout_now: 'Voulez-vous vraiment vous déconnecter maintenant ?',
  member_since: 'BEEP depuis',

  /* password recovery */
  password_recovery_title: 'Vous avez oublié votre mot de passe ?',
  /* Cyrille - 31/05 : Translation updated */
  password_recovery_remembered:
    'Oh, maintenant je me souviens de mon mot de passe !',
  /* Cyrille - 31/05 : Translation updated */
  password_recovery_user: "Nom d'utilisateur",
  password_recovery_send_mail: 'Envoyer le code de vérification',
  password_recovery_code_not_received: 'Code non reçu dans les 5 minutes ?',
  password_recovery_enter_code:
    'Vous avez déjà un code de vérification ? Entrez le ici',
  password_recovery_reset_title: 'Entrez un nouveau mot de passe',
  password_recovery_reset_password: 'Changer le mot de passe',
  /* Cyrille - 31/05 : Translation updated */
  password_recovery_reminder_success:
    "Un e-mail a été envoyé. Cliquez sur le lien dans l'e-mail pour réinitialiser votre mot de passe",
  /* Cyrille - 31/05 : Translation updated */
  password_recovery_reminder_summary:
    'Entrez votre adresse e-mail. Vous recevrez un e-mail avec un lien pour changer votre mot de passe',
  password_recovery_reset_summary:
    'Utilisez le code que vous avez reçu pour définir un nouveau mot de passe pour votre compte',
  /* Cyrille - 31/05 : Translation updated */
  password_recovery_reset_success:
    'Vous passowrd a été modifié avec succès, et vous êtes connecté.',
  new_password: 'Nouveau mot de passe',
  confirm_new_password: 'Confirmez le nouveau mot de passe',
  go_to_dashboard: 'Allez sur mon tableau de bord',

  /* overview */
  overview_title: "Vue d'ensemble",
  overview: "Vue d'ensemble",
  color: 'Couleur',
  /* Cyrille - 31/05 : Translation updated */
  state: 'Marche/Arrêt',
  connection_state: 'État de la connexion',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
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
  Action: 'Action | Actions',
  Conditions: 'Conditions (inspectées)',
  edit: 'Modifier',
  // Hive_brood_layers: 'Corps',
  // Hive_honey_layers: 'Hausse',
  /* Cyrille - 31/05 : Translation updated */
  Hive_layer_amount: "Nombre d'éléments",
  /* Cyrille - 31/05 : Translation updated */
  Bee_race: "Espèce d'abeilles",
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
  positive_impression: 'Impression générale',
  needs_attention: "Besoin d'attention",
  notes: 'Notes',
  notes_for_next_inspection:
    "Brève note pour la prochaine inspection (visible sur la vue d'ensemble)",
  /* Cyrille - 31/05 : Translation updated */
  Not_implemented_yet: "Cet élément n'est pas encore disponible",
  save_input_first: "Voulez-vous d'abord enregistrer votre saisie ?",

  /* dashboard */
  dashboard_title: 'Tableau de bord',
  dashboard: 'Tableau de bord',
  /* Cyrille - 31/05 : Translation updated */
  measurementsError:
    "Impossible d'afficher les mesures, vérifiez la connexion réseau",
  last_measurement: 'Dernière mesure',
  at: 'à',
  measurement_system: 'Système de mesure BEEP',
  no_data: 'Aucune donnée disponible',
  no_chart_data: 'Aucune donnée graphique pour la période sélectionnée',

  /* settings */
  General: 'Général',
  Place: 'Emplacement',
  Country: 'Pays',
  City: 'Ville',
  Address: 'Adresse',
  /* Cyrille - 31/05 : Translation updated */
  latitude: 'Latitude',
  Longitude: 'Longitude',
  Street: 'Rue',
  /* Cyrille - 31/05 : Translation updated */
  Number: 'Numéro',
  Postal_code: 'Code postal',
  Description: 'Description',
  Hive_settings: 'Paramètres de la ruche',
  /* Cyrille - 31/05 : Translation updated */
  Hive_amount: 'Nombre de ruches à cet emplacement',
  /* Cyrille - 31/05 : Translation updated */
  Hive_prefix: 'Préfixe de ruche (avant numéro)',
  Hive_number_offset: 'Début de numérotation',
  Hive_type: 'Type de ruche',
  /* Cyrille - 31/05 : Translation updated */
  Hive_layers: 'Elément de ruche',
  Hive_frames: 'Cadres par élément',
  /* Cyrille - 31/05 : Translation updated */
  Hive_color: 'Couleur de la ruche',
  Queen: 'Reine',
  queen: 'reine',
  settings_title: 'Paramètres',
  settings_description: 'Réglages des capteurs',
  Settings: 'Paramètres',
  settings: 'paramètres',
  sensors_title: 'Réglages du capteur',
  /* Cyrille - 31/05 : Translation updated */
  sensors_description: 'Description des capteurs',
  //   sensors: 'Capteurs',
  sensor: 'Capteur',
  Select: 'Sélectionner',
  Not_selected: 'Non sélectionné',
  /* Cyrille - 31/05 : Translation updated */
  Poor: 'Faible',
  /* Cyrille - 31/05 : Translation updated */
  Fair: 'Suffisante',
  Average: 'Moyenne',
  Average_slider: 'Moyenne',
  /* Cyrille - 31/05 : Translation updated */
  Good: 'Bonne',
  /* Cyrille - 31/05 : Translation updated */
  Excellent: 'Excellente',
  Low: 'Faible',
  Medium: 'Moyenne',
  /* Cyrille - 31/05 : Translation updated */
  High: 'Elevée',
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
  light: 'Ensoleillement',
  l: 'Ensoleillement',
  water: 'Eau',
  w: 'Poids (ancien)',
  humidity: 'Humidité',
  h: 'Humidité',
  air_pressure: 'Pression atmosphérique',
  p: 'Pression atmosphérique',
  weight: 'Poids',
  /* Cyrille - 31/05 : Translation updated */
  w_v: 'Valeur totale des capteurs de poids',
  /* Cyrille - 31/05 : Translation updated */
  w_fl: 'Valeur du capteur de poids avant/gauche',
  /* Cyrille - 31/05 : Translation updated */
  w_fr: 'Valeur du capteur de poids avant/droit',
  /* Cyrille - 31/05 : Translation updated */
  w_bl: 'Valeur du capteur de poids arrière/gauche',
  /* Cyrille - 31/05 : Translation updated */
  w_br: 'Valeur du capteur de poids arrière/droit',
  weight_kg: 'Poids',
  /* Cyrille - 31/05 : Translation updated */
  weight_kg_corrected: 'Poids (corrigé)',
  weight_combined_kg: 'Poids combiné',
  bat_volt: 'Batterie',
  bv: 'Batterie',
  /* Cyrille - 31/05 : Translation updated */
  sound_fanning_4days: 'Ventilation 4d abeilles',
  /* Cyrille - 31/05 : Translation updated */
  s_fan_4: 'Ventilation 4d abeilles',
  /* Cyrille - 31/05 : Translation updated */
  sound_fanning_6days: 'Ventilation 6d abeilles',
  /* Cyrille - 31/05 : Translation updated */
  s_fan_6: 'Ventilation 6d abeilles',
  /* Cyrille - 31/05 : Translation updated */
  sound_fanning_9days: 'Ventilation 9d abeilles',
  /* Cyrille - 31/05 : Translation updated */
  s_fan_9: 'Ventilation 9d abeilles',
  sound_flying_adult: 'Abeilles volantes',
  s_fly_a: 'Abeilles volantes',
  sound_total: 'Son total',
  s_tot: 'Son total',
  s_spl: 'Son total',
  /* Cyrille - 31/05 : Translation updated */
  bee_count_in: "Comptage d'abeilles entrantes",
  /* Cyrille - 31/05 : Translation updated */
  bc_i: "Comptage d'abeilles entrantes",
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
  /* Cyrille - 31/05 : Translation updated */
  icon: 'Icone',
  /* Cyrille - 31/05 : Translation updated */
  precipIntensity: 'Pluie',
  /* Cyrille - 31/05 : Translation updated */
  precipProbability: 'Probabilité de pluie',
  /* Cyrille - 31/05 : Translation updated */
  precipType: 'Type de pluie',
  /* Cyrille - 31/05 : Translation updated */
  outsideTemperature: 'Température extérieure',
  /* Cyrille - 31/05 : Translation updated */
  apparentTemperature: 'Température ressentie',
  /* Cyrille - 31/05 : Translation updated */
  dewPoint: 'Point de rosée',
  //   humidity: 'Humidity',
  /* Cyrille - 31/05 : Translation updated */
  pressure: 'Pression atmosphérique',
  /* Cyrille - 31/05 : Translation updated */
  windSpeed: 'Vitesse du vent',
  /* Cyrille - 31/05 : Translation updated */
  windGust: 'Rafale de vent',
  /* Cyrille - 31/05 : Translation updated, but needs more context */
  windBearing: 'Orientation du vent',
  /* Cyrille - 31/05 : Translation updated */
  cloudCover: 'Couverture nuageuse',
  /* Cyrille - 31/05 : Translation updated */
  uvIndex: 'Index UV',
  /* Cyrille - 31/05 : Translation updated */
  visibility: 'Visibilité',
  ozone: 'Ozone',

  /* Measurements */
  Hour: 'Heure',
  hour: 'heure | heures',
  day: 'jour | jours',
  week: 'Semaine',
  month: 'Mois',
  year: 'Année',

  /* settings */
  could_not_load_settings: 'Impossible de charger les paramètres',
  /* Cyrille - 31/05 : Translation updated */
  offline: 'Hors-connexion',
  remote: 'À distance',
  /* Cyrille - 31/05 : Translation updated */
  connected: 'Connecté',
  yes: 'Oui',
  no: 'Non',
  footer_text: 'Apiculture open source',
  beep_foundation: 'la fondation BEEP',
  Checklist: 'Liste de contrôle | Listes de contrôle',
  checklist: 'liste de contrôle | listes de contrôle',
  Checklist_items: 'Éléments de la liste de contrôle',
  /* Cyrille - 31/05 : Translation updated */
  edit_hive_checklist:
    'Cochez ou décochez les cases de la liste ci-dessous pour ajouter/supprimer des éléments à controler dans la ruche. Vous pouvez également grouper/dégrouper et glisser/déposer les éléments pour les réorganiser à votre guise.',

  /* user */
  /* Cyrille - 31/05 : Translation updated */
  Data_export: 'Exportation des données',
  /* Cyrille - 31/05 : Translation updated */
  Export_your_data:
    "Exporter toutes les données qui se trouvent dans votre compte BEEP et envoyez un e-mail contenant les données en tant que fichier Excel 2007 (OR download the Excel file via the 'Download CSV' button)",
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  Terms_of_use: "Conditions d'utilisation",
  accept_policy:
    "J'accepte les conditions d'utilisation de BEEP, qui sont compatibles avec la nouvelle loi européenne sur la protection de la vie privée",
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  /* Cyrille - 31/05 : Translation updated */
  approve_policy:
    "Vous n'avez pas encore accepté les dernières conditions d'utilisation",

  /* General items */
  /* Cyrille - 31/05 : Translation updated */
  server_down: "L'application est en maintenance. Veuillez réessayer plus tard",
  add_to_calendar: 'Ajouter au calendrier',
  /* Cyrille - 31/05 : Translation updated */
  sort_on: 'Trier par',
  /* Cyrille - 31/05 : Translation updated */
  Whats_new: 'Nouveau!',
  Manual: 'Manuel (EN)',

  Site_title: 'BEEP | Moniteur abeille',
  /* Cyrille - 31/05 : Translation updated */
  could_not_create_user:
    "L'utilisateur ne peut pas être créé pour le moment. Désolé, veuillez réessayer plus tard",
  email_verified: 'Votre adresse e-mail a été vérifiée',
  email_not_verified: "Votre adresse e-mail n'a pas encore été vérifiée",
  email_new_verification:
    'Cliquez sur ce lien pour envoyer un nouvel e-mail de vérification',
  email_verification_sent:
    "Un message avec un lien de vérification a été envoyé à votre adresse e-mail. Cliquez sur le lien dans l'e-mail pour activer votre compte et vous connecter",
  email_verification_resent:
    "Un nouveau message avec un lien de vérification a été envoyé à votre adresse e-mail. Cliquez sur le lien dans l'e-mail pour activer votre compte et vous connecter",

  not_filled: 'non rempli',
  cannot_deselect:
    'Impossible de supprimer cet élément, car il contient un élément requis',
  Undelete: 'Ne pas supprimer',
  /* Cyrille - 31/05 : Translation updated */
  the_field: 'Le champ',
  is_required: 'est obligatoire',
  No_groups: "Aucun groupe n'est disponible",
  /* Cyrille - 31/05 : Translation updated */
  not_available_yet: 'pas encore disponible. Merci de créer le premier ici.',
  Users: 'Utilisateurs',
  member: 'membre du groupe | membres du groupe',
  Member: 'Membre du groupe',
  Members: 'Membres du groupe',
  Invite: 'Inviter',
  Invited: 'Invité',
  Invitation: 'Invitation | Invitations',
  Admin: 'Administrateur',
  Creator: 'Propriétaire du groupe',
  Group: 'Groupe de collaboration | Groupes de collaboration',
  group: 'groupe de collaboration | groupes de collaboration',
  group_short: 'groupe | groupes',
  to_share:
    'pour partager avec ce groupe. 1 clic = les membres du groupe peuvent afficher uniquement, 2 clics = les membres du groupe peuvent modifier',
  Invitation_accepted: 'Invitation acceptée',
  Accept: 'Accepter',
  My_shared: 'Mon partage',
  invitee_name: "Nom de l'invité",
  /* Cyrille - 31/05 : Translation updated */
  Remove_group:
    'Êtes-vous sûr de vouloir supprimer ce groupe partagé pour tous ses membres',
  Detach_from_group: 'Retirez moi et mes ruches de ce groupe',
  my_hive: 'Ma ruche',
  created: 'créé',
  group_detached: 'A quitté le groupe avec succès',
  group_activated: 'Invitation de groupe acceptée',
  group_declined: 'Invitation de groupe refusée',
  /* Cyrille - 31/05 : Translation updated */
  group_explanation_1:
    '1. Créer un nouveau groupe de coopération avec un titre clair et une description',
  /* Cyrille - 31/05 : Translation updated */
  group_explanation_2:
    "2. Inviter d'autres utilisateurs BEEP en utilisant leur adresse email enregistrée dans BEEP",
  group_explanation_3:
    "3. Partager des ruches spécifiques pour être vues par d'autres, pour coopérer",
  Filter_and_sort_on: 'Filtrer et trier par:',

  /* TO BE TRANSLATED */
  /* New translations v2.2.0 */
  roofed: 'Le rucher est-il couvert ?',
  info: 'Info',
  research: 'Recherche',
  start_date: 'Date de début',
  end_date: 'Date de fin',
  purpose: 'But de la recherche',
  institution: 'Organisation Chercheuse',
  type_of_data_used: 'Type de données utilisées',
  link: 'Lien',
  Consent: 'Consentement',
  history: 'historique',
  Current_consent: 'Consentement actuel',
  consent_yes: 'Je consent à partager mes données',
  consent_no: 'Je ne consent pas au partage de mes données',
  my_beep_data: 'Mes données',
  Consent_can_only_be_set: 'Le consentement ne peux être ajusté que pour: ',
  /* Cyrille - 31/05 : This translation needs more context */
  earlier: 'une précédente',
  /* Cyrille - 31/05 : This translation needs more context */
  later: 'une future',

  /* Cyrille - 31/05 : This translation needs more context */
  new_apiary_explanation: 'Créer un nouveau rucher en 4 étapes',
  start_here: 'Cliquer ici pour commencer',
  optional: 'optionnel',
  dimensions: 'dimensions',
  details: 'détails',
  configuration: 'configuration',
  /* Cyrille - 31/05 : This translation needs more context */
  adjustments: 'modifications',
  /* Cyrille - 31/05 : This translation needs more context */
  changes_queen_color: 'Modifier ce paramètre change la couleur de la reine',

  Brood_box_and_frame: 'Corps et cadres de couvain',
  Hive_order: 'Ordre de la ruche dans le rucher',
  bb_width_cm: 'Largeur du corps de la ruche (cm)',
  bb_height_cm: 'Hauteur du corps de la ruche (cm)',
  bb_depth_cm: 'Profondeur du corps de la ruche (cm)',
  fr_width_cm: 'Largeur de cadre (cm)',
  fr_height_cm: 'Hateur de cadre (cm)',
  queen_line: 'lignée',
  queen_tree: 'généalogie',
  queen_description: 'notes',
  Hive_short: 'Ruche | Ruches',
  Image: 'Image | Images',
  Size: 'Taille',
  preview: 'aperçu',
  Inside: 'Mesures internes',
  Offset: 'Décalage',
  Multiplier: 'Multiplicateur',
  /* Cyrille - 31/05 : This translation needs more context */
  Input: 'Entrée',
  /* Cyrille - 31/05 : This translation needs more context */
  Output: 'Sortie',
  /* Cyrille - 31/05 : This translation needs more context */
  Last: 'Dernier',
  Export_sensor_data:
    'Exporter toutes les données avec la résolution maximale, au format CSV. Le fichier peut être ouvert avec Excel ou SPSS. NB: Les données de date sont alignées au temps GMT, en suivant la RFC 3339 du standard de temps.',
  CSV_export_separator: 'Séparateur de colonne dans le fichier CSV',
  Selected_date: 'Intervalle choisi',
  Sensor_measurements: 'Mesures des capteurs',
  too_much_data:
    "Trop de données à compulser. Veuillez choisir moins de mesures ou réduisez l'intervalle de temps choisi.",
  beep_base_explanation:
    "Si vous possédez une base BEEP (Voir photo ci-dessous), Veuillez utiliser l'application BEEP (Pour iOS ou Android) afin d'établir la connexion avec cette applcation.Si vous ne possédez pas de base BEEP, Cliquer sur le bouton 'Site web BEEP' pour connaitre la marche à suivre. Si vous posséder un autre systême de mesure, envoyez nous un message pour nous demander de rejoindre notre communauté Slack et avoir accès á la documentation de nos API.",
  sample_code_hive:
    "Selectionner d'abord une ruche, afin de générer un code unique.",
  sample_code_generate: 'Générer un code unique',
  sample_code_delete: 'Supprimer le code unique',
  measurement_interval: 'intervalle',
  /* Cyrille - 31/05 : This translation needs more context */
  from_weather_service: 'à partir du service météo',

  /* New translations v3 */
  click_hives_to_filter: 'Cliquez sur les ruches pour filtrer',
  for: 'pour',
  last_visit: 'Derniere visite',
  apiary_details: 'Détails du rucher',
  group_details: 'Détails du groupe',
  diary: 'Journal',
  data: 'Données',
  photo: 'photo | photos',
  add_checklist: 'Ajouter une liste de contrôles',
  add_hive: 'Ajouter une ruche',
  delete_apiary: 'Supprimer le rucher',
  edit_apiary: 'Modifier le rucher',
  new_apiary: 'Nouveau rucher',
  delete_group: 'Supprimer le groupe',
  edit_group: 'Modifier le groupe',
  new_group: 'Nouveau groupe',
  verification_code: 'code de vérification',
  limit_exceeded: 'La limite a été atteinte, réessayer plus tard',
  confirm_email_title: 'Confirmer votre adresse email',
  confirm_email_summary:
    'Vous avez recu un code de vérification par email. Entrez le ci-dessous pour vérifier votre adresse email',
  confirm: 'Confirmer',
  Profile: 'Profil',
  Checklist_template:
    'Modèle de liste de controles | Modèles de liste de controles',
  Help: 'Aide',
  Privacy: 'Vie privée',
  FAQ: 'FAQ',
  Support: 'Assistance',
  no_inspections: 'Aucune inspection pour le moment',
  no_results: 'Aucun résultat',
  Hive_brood_layer: 'Cadre de couvain | Cadres de couvain',
  Hive_honey_layer: 'Cadre de miel | Cadres de miel',
  Hive_queen_excluder_layer: 'Grille à reine | Grilles à reine',
  Hive_feeding_box_layer: 'Nourisseur | Nourisseurs',
  overrides_layer_colors: 'Remplacer la couleur des cadres',
  drag_layers: 'Glisser des cadres pour configurer la ruche',
  page: 'page | pages',
  Page: 'Page | Pages',
  not_found: 'introuvable',
  sorry: 'désolé',
  delete_layer: 'Supprimer le cadre',
  not_saved_error: "Les données n'ont pas pu être enregistrées",
  something_wrong: 'Il y a eu un problème',
  /* Cyrille - 31/05 : This translation needs more context */
  not_editable: 'non modifiable',
  unsaved_changes: 'Changements non sauvegardés',
  save_changes:
    'Voulez-vous vraiment quitter cette page ? Tous les changements non-enregistrés seront perdus',
  no_apiaries_yet: "Vous n'avez aucun rucher pour le moment",
  need_help: "Besoin d'aide?",
  Apiary_color: 'Couleur du rucher',
  /* Cyrille - 31/05 : This translation needs more context */
  Set_notification_date: 'Definir la date de notification',
  remove_image: 'Supprimer image',
  Total_colony_size: 'Taille totale de la colonie',
  bee: 'abeille | abeilles',
  /* Cyrille - 31/05 : This translation needs more context */
  with_bees: 'avec abeilles',
  change_checklist_confirm:
    'Etes-vous sûr de vouloir sélectionner une liste différente ? Les valeurs déjà collectées seront conservées.',
  view: 'Voir',
  share: 'Partager',
  edit_details: 'Modifier',
  remove_queen: 'Supprimer la reine',
  remove_group_short: 'Supprimer le groupe',
  device: 'Appareil | Appareils',
  click_date_to_edit: 'Selectionner la date à modifier.',
  accept_policy_1: "J'accepte les ",
  accept_policy_2:
    ' de BEEP, qui sont compatibles avec la nouvelle loi européenne sur la protection de la vie privée',
  terms_of_use: "conditions d'utilisation",
  invalid_password:
    'Le mot de passe doit contenir au moins 8 caratères, dont 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial (\\]{}()?\\-"!@#%&/\\,><\':|_~`)',
  sensor_definition: 'définition du capteur | définitions des capteurs',
  measurement: 'mesure | mesures',
  remove_device: "Supprimer l'appareil",
  last_message_received: 'Dernier message recu',
  /* Cyrille - 31/05 : This translation needs more context */
  transmission_ratio: 'Fréquence de transmission',
  period: 'Période',
  /* Cyrille - 31/05 : This translation needs more context */
  download: 'Téléchargement',
  different_end_start:
    'La date de début et la date de fin doivent être différentes.',
  later_end_start: 'La date de début doit être antérieure à la date de fin',
  new_email_verification_sent:
    'Un mail contenant un lien de vérification a été envoyé. Cliquez sur le lien pour confirmer votre nouvelle adresse email et vous connectez.',
  sensordef_info:
    'Une définition de capteur permet de convertir une valeur brute en valeur physique (ex. w_v = 1098273 => weight_kg = 62,400 kg) ou pour calibrer un capteur (ex. t_0 = 15.3 ° C => t_0 = 15.8 ° C). Ceci peut être accompli grace à un "décalage" et un "multiplicateur". La valeur brute reste inchangée si le décalage est "0" et le multiplicateur "1". L\'application mobile BEEP vous donnera les définitions des capteurs au moment de la configuration initiale.',
  or: 'ou',
  select_all_hives: 'Sélectionner toutes les ruches',
  select_all_editable_hives: 'Selectionner toutes les ruches modifiables',
  Alert: 'Alerte | Alertes',
  alert: 'alerte | alertes',
  remove_alert: 'Supprimer alerte',
  alerts_enabled: 'Alertes activées',
  alerts_disabled: 'Alertes désactivées',
  edit_checklist_confirm:
    'Etes-vous sûr de vouloir modifier la liste de contrôle ? Tout changement non-enregistré sera perdu',
  edit_checklist_confirm_deselectedhives:
    'Etes-vous sûr de vouloir modifier la liste de contrôle ? Tout changement non-enregistré sera perdu',
  user_not_edited:
    "Les données utilisateur n'ont pas été modifiées. Les données sont peut-être identiques à celles présentes dans la base de données, ou un ou plusieurs champs sont mal remplis. Veuillez vérifier vos données et recommencer.",
  user_not_deleted:
    "Il y a eu un problème, l'utilisateur n'a pas été supprimé.",
  research_consent: 'Consentement de recherche',
  checklist_types: 'Personnel, partagé, recherche',
  edit_hive_checklist_no_touch:
    "Cocher/Décocher les cases dans la liste ci-dessous pour ajouter ou supprimer des éléments dans la liste de controle. Vous pouvez aussi grouper les éléments pour changer l'ordre de la liste. (NB: Cette fonctionnalité n'est pas disponible sur les écrans tactiles).",
  edit_hive_checklist_touch:
    "Cocher/Décocher les cases dans la liste ci-dessous pour ajouter ou supprimer des éléments dans la liste de controle. Modifier l'ordre des éléments n'est pas disponible dans l'app",
  input_not_possible_for_bulkinspection:
    "Cet élément n'est pas disponible pour une inspection groupée, car il ne peut être remplis qu'individuellement. Il est possible de remplir ce champ plus tard, en éditant l'inspection de la ruche concernée.",
  save_bulkinspection_confirm:
    "Etes-vous sûr de vouloir sauuvegarder l'inspection pour toutes ces ruches en meme temps?",
  deleted_but_not_saved_devices_warning:
    'N.B. Les appareils seront supprimés après avoir cliqué sur "Sauvergarder et supprimer" dans le coin supérieur droit de l\'écran.',
  no_alerts: 'Pas de nouvelles alertes',
  alertrule: "règle d'alerte | règles d'alerte",
  Alertrule: "Règle d'alerte | Règles d'alerte",
  Measurement: 'Mesure | Mesures',
  /* Cyrille - 31/05 : This translation needs more context */
  Calculation: 'Calcul',
  /* Cyrille - 31/05 : This translation needs more context */
  calculation: 'calcul',
  Alert_on_occurences: 'Quand voulez-vous recevoir les alertes?',
  Alert_on_occurences_hint:
    'Directement, ou uniquement si elles arrivent x fois?',
  Direct: 'Directement',
  After: 'Après ',
  times: ' fois',
  Comparator: 'Comparateur',
  comparator: 'comparateur',
  Comparison: 'Comparaison',
  comparison: 'comparaison',
  Threshold_value: 'Valeur plancher',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  /* Cyrille - 31/05 : This translation needs more context */
  Derivative: 'Tendance (haussière or baissière)',
  /* Cyrille - 31/05 : This translation needs more context */
  Count: 'Nombre',
  Value: 'Valeur',
  Difference: 'Différence',
  Absolute_value: 'Valeur absolue',
  Absolute_value_of_dif_explanation: '**Valeur absolue de la différence',
  Exclude_months:
    '<strong>Désactiver</strong> cette alerte pendant ce nombre de mois:',
  /* Cyrille - 31/05 : This translation needs more context */
  Exclude_hours:
    '<strong>Désactiver</strong> cette alerte pendant les heures suivantes:',
  Exclude_hives:
    '<strong>Désactiver</strong> cette alerte pour les ruches suivantes:',
  Exclude_hives_details:
    "N.B. Par défaut, ces alertes seront éxécutées pour toutes les ruches équipées d'un appareil.",
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'mois',
  hours: 'heures',
  delete_alertrule: "Supprimer la règle d'alerte",
  create_alertrule: 'Save alert rule',
  Active: 'Actif',
  Alert_via_email: 'Alerte par email',
  this_field: 'Ce champ',
  alertrule_default: "Règle d'alerte par défaut | Règles d'alerte par défaut",
  copy: 'Copier',
  Home: "Page d'accueil",
  Select_default_alertrule: "Copier la règle d'alerte par défaut",
  /* below, please keep all terms between [] in english: */
  /* Cyrille - 31/05 : This translation needs more context */
  alertrule_main_sentence:
    'Je veux recevoir une alerte si la [calculation] [comparison] de [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Ce calcul sera éxécuté [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', et je veux recevoir ces alertes directement. ',
  alertrule_occurences_indirect_sentence:
    ', mais je voudrais recevoir ses alertes uniquement si elles se produisent [alert_on_occurences] fois. ',
  alertrule_exclude_months_sentence:
    'Cette alerte sera désactivée pour une durée de: [exclude_months]. ',
  /* Cyrille - 31/05 : This translation needs more context */
  alertrule_exclude_hours_sentence:
    'Cette alerte sera désactivée durant les heures suivantes: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Cette alerte sera désactivée pour les ruches suivantes: [exclude_hive_ids].',
  min: 'minimum',
  max: 'maximum',
  ave: 'moyenne',
  der: 'tendance',
  cnt: 'nombre',
  equal_to: 'est égal à',
  less_than: 'est plus petit que',
  greater_than: 'est plus grand que',
  less_than_or_equal: 'is less than or equal to',
  greater_than_or_equal: 'est plus grand ou égal à',
  alertrule_not_active:
    'Cette alerte a été désactivée. Vous pouvez l\'activer en cochant la case "Actif" et en sauvegardant cette règle.',
  export_email_sent: 'Email avec fichier Excel envoyé',
  excel_file_saved:
    'Le fichier Excel a été sauvegardé dans votre dossier "Téléchargements"',
  Updated_at: 'Mis à jour à',
  Not_yet_saved: 'Pas encore sauvegardé',
  add_own_device: 'Ajouter votre appareil',
  devices_info_text:
    "Note: Vous possédez une base BEEP ? Utilisez l'app pour ajouter votre base. Elle apparaitra ici automatiquement.",
  devices_url_text:
    "Ici, vous pouvez trouver plus d'information sur l'app BEEP.",
  alert_explanation_1:
    "Si vous possédez une base BEEP ou un autre appareil avec lequel vous pouvez définir des alertes, de sorte que vous receviez une notification si certains critères sont atteints. Par exemple, une brusque perte de poids à cause d'un essaimage. Les alertes seront présentées dans l'app, vous pouvez également les recevoir par email.",
  alert_explanation_2:
    'Pour démarrer, vous pouvez utiliser plusieurs alertes préconfigurées (et les adapter à vos besoins). Vous pouvez également créer vos propres alertes.',
  alertrules_url_text:
    'Aller dans "réglages d\'alerte" pour créer votre propre règle',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Gestion du rucher',
  Move: 'Déplacer',
  Current_apiary: 'Rucher actuel',
  sensor_key: "Identifiant unique de l'appareil",
  disabled_settings:
    'La modification manuelle de ces paramètres est désactivée.',
  Address_placeholder: 'Numéro, nom de rue, ville',
  first_create_apiary: "Tour d'abord, créer un rucher",
  /* Cyrille - 31/05 : This translation needs more context */
  Unknown: 'Inconnu',
  /* Cyrille - 31/05 : This translation needs more context */
  unknown: 'Inconnu',
  research_warning:
    "Note: Si vous n'avez pas recu d'invitation à participer, il n'est pas nécessaire de donner votre consentement pour partager vos données, car elles ne seront pas utilisées.",
  research_explanation_p1:
    'La plateforme BEEP est utilisée dans les projets de recherche ci-dessous. Après avoir été invité à participer à un projet, vous devez donner votre consentement pour que les chercheurs puissent accéder aux données de vos abeilles.',
  research_explanation_p2:
    'Vous pouvez retirer votre consentement à tout moment. A partir de ce moment, vos données ne seront plus partagées. Les données envoyées, pendant la période précédent votre retrait, restent disponibles pour les chercheurs. Pour toute question, merci de vous adresser au responsable de votre projet.',
  research_info:
    'Avant de donner votre consentement, merci de revoir la description du projet disponible en suivant le lien ci-dessous et demander toute information complémentaire, si besoin.',
  save_and_delete: 'Sauvegarder et supprimer',
  drag_layers_info_text:
    'Déplacer les cadres à gauche, vers leur position dans la ruche sur le côté droit. Supprimer un cadre de la ruche en cliquant dessus puis sur la poubelle rouge. Dans la ruche, les cadres peuvent être déplacés et leur couleur peut être modifiée en cliquant sur le cadre.',
  New_hive: 'Nouvelle ruche',
  New_alertrule: 'Nouvelle alerte',
  Add_alertrule: 'Ajouter alerte',
  Add_apiary: 'Ajouter rucher',
  Add_sensor_definition: 'Ajouter définition de capteur',
  Add_member: 'Ajouter membre',
  alert_rule_deleted: "La règle d'alerte à été désactivée",

  new_or_edited_but_not_saved_sensor_defs_warning:
    "N.B. : les définitions de capteur ne seront sauvegardées ou ajoutées qu'après avoir cliqué sur l'icone cochée verte au bout de la ligne de définition du capteur.",
  delete_sensordef: 'Supprimer définition de capteur',
  delete_all_alerts: 'Supprimer toutes les alertes',
  delete_all_alerts_warning:
    'Êtes vous sûr de vouloir supprimer toutes les alertes? Cette action est irréversible.',
  delete_all_alerts_warning_filter_active:
    'Êtes vous sûr de vouloir supprimer toutes les alertes? Les alertes, qui ne correspondent pas à votre critère de recherche, seront également supprimées. Cette action est irréversible.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified: "J'ai confirmé mon adresse mail, je veux m'identifier",
  password_recovery_resend_mail: 'Envoyer un nouveau code de vérification',
  alert_rule_created: "La nouvelle règle d'alerte a été créée",
  select_all: 'Tout sélectionner',
  During: 'Pendant',
  Calculation_minutes: 'A quelle fréquence voulez vous éxécuter le calcul ?',
  Every: 'Chaque ',
  Calculation_minutes_short: 'Fréquence de calcul',
  Alert_on_occurences_short: "Quand recevez vous l'alerte ?",
  Disable_alert_for_this_hive: "Désactiver l'alerte pour cette ruche",
  Alert_disabled_for_this_hive: "L'alerte est désactivée pour cette ruche",
  disabled_for_hive: 'a été désactivé pour la ruche suivante',
  Alert_disabled: 'Alerte désactivée',

  /* For import page */
  Log_data_import: 'Importer les données de log',
  Log_files: 'Fichiers de log',
  Upload_date: 'Télécharger les dates',
  Messages: 'Messages',
  Log_time: 'Horaire enregistré',
  File_size: 'Taille du fichier',
  check_log_data: 'Vérification des données de log',
  delete_log_file: 'Supprimer le fichier de log',
  commit_log_data_short: 'Importer les données de log',
  commit_log_data:
    "Importer les données de ce fichier de log vers l'application BEEP",
  // import_log_data_explanation:
  //   "Dans l'application de base BEEP, vous pouvez télécharger les données de log à partir de la mémoire de la base BEEP. Chaque fois que vous téléchargez des données de log, la mémoire interne est effacée et les données sont téléchargées vers l'application BEEP. Vous trouverez ci-dessous la liste de vos données de log téléchargées. Vous pouvez remplacer les données de la base de données par les données contenues dans les fichiers de log téléchargés en cliquant sur le bouton « Vérifier les données de log ». Cela vérifiera d'abord combien de données seront remplacées dans la base de données et si l'heure des données dans le fichier de log est correcte. Vous recevrez une demande de confirmation avec les informations résultantes et la possibilité d'appliquer ou de refuser le remplacement. ",
  import_log_data_url_text:
    "Vous trouverez ici l'explication du téléchargement de données de log vers l'application BEEP.",
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/fr/support/solutions/articles/60000697129-t%C3%A9l%C3%A9charger-les-donn%C3%A9es-de-base-beep-via-bluetooth',

  Immediately: 'Immédiatement',
  alertrule_active_no_email_sentence:
    ", et j'ouvre l'app BEEP pour voir les alertes",
  alertrule_active_email_sentence:
    ", et je reçois les alertes par email. De plus, je peux voir les alertes dans l'app BEEP.",
  First_occurence: 'Premier',
  Last_occurence: 'Dernier',
  /* default alert rule names: */
  Hive_stability_and_theft: 'Stabilité de la ruche et vol',
  Temperature_sensor_defect: 'Defaut de la sonde de température',
  Battery_low: 'Batterie faible',
  Honey_harvest: 'Recolte de miel',
  Hive_temperature: 'Température de la ruche basse',
  Brood_temperature: 'Temperature du couvain basse',
  No_measurements: 'Pas de mesures',
  Swarm: 'Essaimage',
  Food_supply_low: 'Reserves de nourriture faible',
  /* default alert rule descriptions: */
  Weight_drop_is_above_a_set_value:
    'La perte de poids de la ruche est au dessus du seuil',
  Temperature_sensor_malfunctions: 'La sonde de température fonctionne mal',
  Battery_voltage_is_below_a_set_value:
    'La charge de la batterie est en deça de la valeur définie',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    "L'augmentation du poids, dûe à l'entrée de nectar s'est arrêtée",
  Hive_temperature_drops_below_a_set_value:
    'La température de la ruche passe sous la valeur définie',
  Temperature_in_the_brood_below_a_set_value:
    'La température du couvain passe sous la valeur définie',
  No_measurement_data_received_in_a_set_time_period:
    'Aucune mesure reçue pendant la période définie',
  Sudden_weight_drop_triggers_alert_immediately:
    "Une chute soudaine du poids déclenche immédiatement une alerte. N.B. L'alerte est basée sur une transmission de données toutes les 15 minutes. Si votre appareil transmet à un intervalle difféerent, vous devriez ajuster le seuil de déclenchement.",
  The_hive_weight_is_below_a_set_value:
    'Le poids de la ruche est inférieur à la valeur définie.',

  minute: 'minute | minutes',
  upload_interval_warning_single_interval:
    "N.B. L'intervalle de transmission de données est de | N.B. L'intervalle de transmission de votre appareil est de",
  upload_interval_warning_interval_range:
    "N.B. L'intervalle de transmission de vos appareils varie entre ",
  not_relevant_for_immediate_calculation: 'Non pertinent pour calcul immédiat',
  Increase: 'Augmentation',
  Decrease: 'Diminution',
  Every_hour: 'Toutes les heures',
  every_hour: 'toutes les heures',
  Absolute_value_of_dif: 'Changement',
  In_case_of_good_connection_warning:
    "*Immédiatement après qu'une mesure est reçue. Cela dépend de l'intervalle de transmission et de la solidité de la connexion au réseau mobile.",
  Alertrule_summary_title: 'Résumé',
  Alertrule_settings_title: "Paramètre des règles d'alerte",
  Alertrule_exclude_title: 'Exclure périodes et ruches',
  of: 'de',

  alerts_url_text: "Lire l'article d'assistance sur les alertes",
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-alerts',

  /* New translations v3.0.74 */
  Decline: 'Refuser',
  Decline_invitation: "Refuser l'invitation",
  Decline_invitation_sure:
    "Êtes-vous sûr de vouloir refuser l'invitation de groupe ?",
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
  View_measurements: 'Afficher les mesures',
  View_inspection: "Voir l'inspection | Voir les inspections",
  View_alert: "Afficher l'alerte | Afficher les alertes",

  Edit_alertrule: "Modifier la règle d'alerte",
  Edit_hive: 'Modifier la ruche',
  Edit_queen: 'Modifier la reine',
  Edit_apiary: 'Modifier le rucher',
  Edit_group: 'Modifier le groupe de collaboration',
  Edit_group_short: 'Modifier le groupe',
  Edit_checklist: 'Modifier la liste de contrôle',
  Edit_devices: 'Modifier les appareils',
  Edit_consent: 'Modifier le consentement',
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
  Day: 'Jour | Jours',
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
