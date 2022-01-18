/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  Today: 'Today',
  Clear: 'Clear',
  Close: 'Close',
  firstDay: 1,

  /* main */
  Website: 'Website',
  Feedback: 'Feedback',
  Feedback_mail_header: 'BEEP app feedback',
  Feedback_mail_body:
    'Dear BEEP foundation,%0D%0A%0D%0AHereby my feedback about the BEEP app.%0D%0A%0D%0AI discovered this:%0D%0A%0D%0AJust before that happened, i did:%0D%0A%0D%0AThe screen was looking like (please include a screenshot):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info: 'Diagnostic information (in case of a bug):%0D%0A',
  back: 'Back',
  menu: 'Menu',
  weather: 'Weather',
  sensors: 'Devices',

  switch_language: 'Switch language',
  Delete: 'Delete',
  Search: 'Search...',

  /* user error messages */
  User: 'User',
  User_data: 'User data',
  user_data: 'user data',
  updated: 'updated',
  delete_complete_account:
    'Are you sure that you want to delete your full account, inluding all apiaries, hives, and inspections? It is unrecoverable.',
  username_is_required: 'Please enter the username',
  username_already_exists: 'Username already exists',
  password_is_required: 'Please enter a password',
  email_is_required: 'Please enter an email address',
  email_already_exists: 'The email address is already in use',
  policy_accepted_is_required:
    'You need to accept the terms of service to register',

  already_registered: 'I am already registered',
  invalid_user: 'Unknown user, or wrong password',
  no_password_match: 'The passwords do not match',
  invalid_token: 'Invalid code',

  no_valid_email: 'Invalid email address',

  empty_fields: 'Please fill in all the fields',
  match_passwords: 'Passwords do not match',

  succesfully_registered: 'You are successfully registered.',
  authentication_failed: 'Failed to authenticate',

  no_valid_input_received: 'Data could not be saved, no valid input received.',

  remove_all_settings: 'Remove all settings',
  remove_apiary: 'Remove apiary',
  remove_hive: 'Remove hive',
  remove_inspection: 'Remove inspection',

  Error: 'Error',
  Warning: 'Warning',
  first_remove_hives:
    'Attention: there are still hives at this apiary. You can save specific hives (and their inspections) by first moving them to another apiary. If you continue with the deletion, you will delete ALL hives and inspections present at this location.',

  Date: 'Date',
  ok: 'Ok',
  previous: 'Previous',
  prev: 'previous',
  next: 'Next',
  add: 'Add',
  create_new: 'Create new',
  New: 'New',

  warning: 'Warning',

  apply: 'Apply',
  Cancel: 'Cancel',
  on: 'On',
  off: 'Off',

  /* login */
  login_title: 'Login',
  login: 'Login',
  back_to_login: 'Back to login',
  forgot_password: 'Forgot your password?',

  username: 'Username',
  password: 'Password',
  confirm_password: 'Confirm password',
  email: 'E-mail',
  token: 'Code',

  create_login_question: 'No account yet? Register as a new user',
  create_login: 'Register as a new user',
  create_login_summary: 'Create a new user account',
  save: 'Save',
  save_and_return: 'Save and return',

  logout: 'Log out',

  /* password recovery */
  password_recovery_title: 'Forgot your password?',
  password_recovery_remembered: 'Oh, now I remembered my password again!',
  password_recovery_user: 'User information',
  password_recovery_send_mail: 'Send verification code',
  password_recovery_code_not_received: 'Code not received within 5 minutes?',
  password_recovery_enter_code:
    'Already got a verification code? Enter it here',
  password_recovery_reset_title: 'Enter a new password',
  password_recovery_reset_password: 'Change password',
  password_recovery_reminder_success:
    'An email has been sent. Click the link in your email to reset your password for this account.',
  password_recovery_reminder_summary:
    'Enter your email address. You will receive an email with a link to change your password in the next step.',

  password_recovery_reset_summary:
    'Use the code that you received to set a new password for your account',
  password_recovery_reset_success:
    'You password is successfully changed, and you are logged in.',

  new_password: 'New password',
  confirm_new_password: 'Confirm new password',

  go_to_dashboard: 'Go to my dashboard',
  color: 'Color',

  /* hives */
  Hive: 'Hive | Hives',
  hive: 'hive | hives',
  Location: 'Apiary | Apiaries',
  location: 'apiary | apiaries',
  Name: 'Name',
  name: 'name',
  Type: 'Type',
  type: 'type',
  Layer: 'Layer',
  layer: 'layer',
  brood: 'Brood',
  honey: 'Honey',
  inspect: 'Inspect',
  inspection: 'inspection | inspections',
  Inspection: 'Inspection | Inspections',
  New_inspection: 'New inspection',
  Edit_inspection: 'Edit inspection',
  Actions: 'Actions',
  edit: 'Edit',
  Hive_layer_amount: 'Number of layers',
  Bee_race: 'Bee race',
  Birth_date: 'Birth date',
  Color: 'Color',
  Queen_colored: 'Queen marked',
  Queen_clipped: 'Queen clipped',
  Queen_fertilized: 'Queen fertilized',
  Age: 'Age',
  years_old: 'years old',

  /* Hive check items */
  Date_of_inspection: 'Date of inspection',
  action: 'Action',
  reminder: 'Remember',
  remind_date: 'Notification date',
  overall: 'Overall',
  positive_impression: 'Total impression',
  needs_attention: 'Needs attention',
  notes: 'Notes',
  notes_for_next_inspection:
    'Short note for next inspection (visible on overview)',
  Not_implemented_yet: 'This item is not implemented yet',

  /* dashboard */
  last_measurement: 'Last measurement',
  at: 'at',
  no_data: 'No data available',
  no_chart_data: 'No chart data for the selected period',

  /* settings */
  General: 'General',
  Place: 'Location',
  Country: 'Country',
  City: 'City',
  Address: 'Address',
  Lattitude: 'Lattitude',
  Longitude: 'Longitude',
  Street: 'Street',
  Number: 'No.',
  Postal_code: 'Postal code',
  Description: 'Description',
  Hive_settings: 'Hive settings',
  Hive_amount: 'Number of hives',
  Hive_prefix: 'Hive name prefix (before numer)',
  Hive_number_offset: 'Start number hives',
  Hive_type: 'Hive type',
  Hive_layers: 'Hive layers',
  Hive_frames: 'Frames per layer',
  Hive_color: 'Hive color',
  Queen: 'Queen',
  queen: 'queen',

  settings_title: 'Settings',
  Settings: 'Settings',
  settings: 'settings',

  sensors_title: 'Device settings',
  sensor: 'Device',

  Select: 'Select',
  Not_selected: 'Not selected',
  Poor: 'Poor',
  Fair: 'Fair',
  Average: 'Average',
  Average_slider: 'Average',
  Good: 'Good',
  Excellent: 'Excellent',
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Extreme: 'Extreme',

  /* colors */
  select_color: 'Select a color',
  advanced: 'Advanced',

  /* sensors */
  Select_sensor: 'Select a sensor',
  temperature: 'Temperature',
  t: 'Temperature',
  t_0: 'Temperature 1',
  t_1: 'Temperature 2',
  t_2: 'Temperature 3',
  t_3: 'Temperature 4',
  t_4: 'Temperature 5',
  t_5: 'Temperature 6',
  t_6: 'Temperature 7',
  t_7: 'Temperature 8',
  t_8: 'Temperature 9',
  t_9: 'Temperature 10',
  light: 'Sunlight',
  l: 'Sunlight',
  water: 'Water',
  w: 'Water',
  humidity: 'Humidity',
  h: 'Humidity',
  air_pressure: 'Air pressure',
  p: 'Air pressure',
  weight: 'Weight',
  w_v: 'Weight sensor value all sensors',
  w_fl: 'Weight sensor value front left',
  w_fr: 'Weight sensor value front right',
  w_bl: 'Weight sensor value back left',
  w_br: 'Weight sensor value back right',
  weight_kg: 'Weight',
  weight_kg_corrected: 'Weight (corr)',
  weight_combined_kg: 'Weight combi',
  bat_volt: 'Battery',
  bv: 'Battery voltage',
  sound_fanning_4days: 'Fan 4d bees',
  s_fan_4: 'Fan 4d bees',
  sound_fanning_6days: 'Fan 6d bees',
  s_fan_6: 'Fan 6d bees',
  sound_fanning_9days: 'Fan 9d bees',
  s_fan_9: 'Fan 9d bees',
  sound_flying_adult: 'Flying bees',
  s_fly_a: 'Flying bees',
  sound_total: 'Total sound',
  s_tot: 'Total sound',
  s_spl: 'Sound pressure level',
  bee_count_in: 'Bee count in',
  bc_i: 'Bee count in',
  bee_count_out: 'Bee count out',
  bc_o: 'Bee count out',
  t_i: 'Temp. inside',
  rssi: 'Signal strength',
  snr: 'Signal noise',
  lat: 'Lattitude',
  lon: 'Longitude',
  Sound_measurements: 'Sound measurements',
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
  precipIntensity: 'Rainfall',
  precipProbability: 'Rain probability',
  precipType: 'Rain type',
  outsideTemperature: 'Outside temperature',
  apparentTemperature: 'Apparent temperature',
  dewPoint: 'Dew point',
  pressure: 'Air pressure',
  windSpeed: 'Wind speed',
  windGust: 'Wind gust',
  windBearing: 'Wind bearing',
  cloudCover: 'Cloud cover',
  uvIndex: 'UV index',
  visibility: 'Visibility',
  ozone: 'Ozone',

  /* Measurements */
  Hour: 'Hour',
  hour: 'hour | hours',
  day: 'Day',
  week: 'Week',
  month: 'Month',
  year: 'Year',

  /* settings */
  offline: 'No connection',
  yes: 'Yes',
  no: 'No',

  Checklist: 'Checklist | Checklists',
  checklist: 'checklist | checklists',
  Checklist_items: 'Checklist items',
  edit_hive_checklist:
    'Check/uncheck the boxes in the list below to add/remove items from your hive checklist. You can also unfold/fold and drag/drop the items to re-order them to your own style.',

  /* user */
  Data_export: 'Data export',
  Export_your_data:
    'Export all data that is in your BEEP account and send an email containing the data as an Excel file. The Excel file has different tabs containing your personal, hive, location, and inspection data.',

  Terms_of_use: 'Terms of service',
  accept_policy:
    'I accept the BEEP terms of service, that are compatible with the new European privacy law',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy: 'You did not yet comply with the latest terms of service.',

  /* General items */
  server_down:
    'The app is unavailable due to maintenance work, please try again later',
  add_to_calendar: 'Add to calendar',
  sort_on: 'Sort on',
  Whats_new: 'New!',
  Manual: 'Manual',
  Site_title: 'BEEP | Bee monitor',
  could_not_create_user:
    'User cannot be created at this moment. Sorry for the inconvenience, please try again later.',
  email_verified: 'Your email address has been verified.',
  email_not_verified: 'Your email address has not yet been verified.',
  email_new_verification:
    'Click on this link to send a new verification email.',
  email_verification_sent:
    'A message with a verification link has been sent to your email address. Click the link in the email to activate your account and log in.',
  email_verification_resent:
    'A new message with a verification link has been sent to your email address. Click the link in the email to activate your account and log in.',

  not_filled: 'is required, but not filled out',
  cannot_deselect:
    'Unable to remove this item, because it contains a required item',
  Undelete: 'Undo delete',
  the_field: 'The',
  is_required: 'is required',

  No_groups: 'No groups available',
  not_available_yet:
    'not yet available. Click on the button in the upper right corner to add one.',
  Users: 'Users',
  member: 'member | members',
  Member: 'Group member | Group members',
  Invite: 'Invite',
  Invited: 'Invited',
  Invitation: 'Invitation | Invitations',
  Admin: 'Administrator',
  Creator: 'Group owner',
  Collaborate: 'Collaborate',
  Group: 'Collaboration group | Collaboration groups',
  group: 'collaboration group | collaboration groups',
  group_short: 'group | groups',
  to_share:
    'to share with this group. 1 click = group members can view only, 2 clicks = group members can edit',
  Invitation_accepted: 'Invitation accepted',
  Accept: 'Accept',
  My_shared: 'My shared',
  invitee_name: 'Invitee name',
  Remove_group:
    "Are you sure you want to competely remove this shared group for all it's members",
  Detach_from_group: 'Remove me and my hives from this group',
  my_hive: 'My hive',
  created: 'created',
  group_detached: 'Successfully left the group',
  group_activated: 'Group invitation accepted',

  /* New translations v2.2.0 */
  roofed: 'Does the apiary have a roof?',
  info: 'Info',

  research: 'Research',
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
    "If you have a BEEP base (shown in the picture above), please use the BEEP base app (iOS and Android) to set-up the communication with this app. If you don't have a BEEP base yet, please click on the menu item 'BEEP website' for updates on how to get a BEEP base. I you have your own measurement device and would like to see the data in the BEEP app, please send us a message to ask for joining our Slack community and you can get access to the API description.",

  sample_code_hive: 'First select a hive, to generate a unique sample code',
  sample_code_generate: 'Generate unique sample code',
  sample_code_delete: 'Delete unique sample code',

  measurement_interval: 'interval',
  from_weather_service: 'from weather service',

  /* New translations v3 */
  click_hives_to_filter: 'Click hives to filter',
  for: 'for',
  last_visit: 'Last visit',
  apiary_details: 'Apiary details',
  group_details: 'Group details',
  diary: 'Diary',
  data: 'Data',
  photo: 'photo | photos',
  add_checklist: 'Add checklist',
  add_hive: 'Add hive',
  delete_apiary: 'Delete apiary',
  edit_apiary: 'Edit apiary',
  new_apiary: 'New apiary',
  delete_group: 'Delete group',
  edit_group: 'Edit group',
  new_group: 'New collaboration group',
  verification_code: 'verification code',
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
  no_inspections: 'Add first inspection',
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
  not_saved_error: 'Data could not be saved',
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
  accept_policy_1: 'I accept the BEEP ',
  accept_policy_2: ', that are compatible with the new European privacy law',
  terms_of_use: 'terms of service',
  invalid_password:
    'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number and one special character (\\]{}()?\\-"!@#%&/\\,><\':;|_~`)',
  sensor_definition: 'sensor definition | sensor definitions',
  measurement: 'measurement | measurements',
  remove_device: 'Remove device',
  last_message_received: 'Last message received',
  transmission_ratio: 'Transmission ratio',
  period: 'Period',
  download: 'Download',
  different_end_start: 'End and start date must differ',
  later_end_start: 'Start date must be earlier than end date',
  new_email_verification_sent:
    'A message with a verification link has been sent to your new email address. Click the link in the email to confirm your new email address and log in.',
  sensordef_info:
    "A sensor definition is intended to convert a sensor value from an incoming 'raw' sensor value into a value according to a physical quantity and unit (e.g. w_v = 1098273 => weight_kg = 62,400 kg) or to calibrate a sensor (e.g. t_0 = 15.3 ° C => t_0 = 15.8 ° C). This can be done by setting an 'offset' and a 'multiplier'. The input and output value remains the same if offset '0' and multiplier '1' is set. The BEEP base app (from the App Store) will provide you with the right sensor definitions at the initial setup of your BEEP base.",
  or: 'or',
  select_all_hives: 'Select all hives',
  select_all_editable_hives: 'Select all editable hives',
  Alert: 'Alert | Alerts',
  alert: 'alert | alerts',
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
    'Check/uncheck the boxes in the list below to add/remove items from your hive checklist. You can also unfold/fold and drag/drop the items to re-order them to your own style (N.B. this is not possible on a touchscreen device).',
  edit_hive_checklist_touch:
    'Check/uncheck the boxes in the list below to add/remove items from your hive checklist. Changing the order of items is only possible on a desktop computer.',
  input_not_possible_for_bulkinspection:
    'This item is not available when multiple hives are selected for an inspection, as it can only be filled in per individual hive. It is possible to fill in this item for a single hive at a later time, by editing the inspection for that hive.',
  save_bulkinspection_confirm:
    'Are you sure that you want to save this inspection for multiple hives at the same time?',
  deleted_but_not_saved_devices_warning:
    "N.B. devices will only be removed after clicking the 'Save and delete' button in the top right corner.",
  no_alerts: 'No new alerts',
  alertrule: 'alert rule | alert rules',
  alertrule_pagetitle: 'Alert settings',
  Measurement: 'Measurement | Measurements',
  Calculation: 'Calculation',
  calculation: 'calculation',
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
  Absolute_value_of_dif_explanation: '**Absolute value of the difference',
  Exclude_months:
    '<strong>Deactivate</strong> this alert during the following months:',
  Exclude_hours:
    '<strong>Deactivate</strong> this alert during the following hours:',
  Exclude_hives:
    '<strong>Deactivate</strong> this alert for the following hives:',
  Exclude_hives_details:
    'N.B. By default, this alert will be executed for all hives with a measurement device.',
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
  Select_default_alertrule: 'Copy default alert rule',
  /* below, please keep all terms between [] as is: */
  alertrule_main_sentence:
    'I would like to receive an alert if the [calculation] [comparison] of the [measurement_quantity] [comparator] [threshold_value][measurement_unit]. This calculation will be executed [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', and I would like to receive the alert directly. ',
  alertrule_occurences_indirect_sentence:
    ', but I would like to receive the alert only if it occurs [alert_on_occurences] times. ',
  alertrule_exclude_months_sentence:
    'This alert will be deactivated during the following months: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'This alert will be deactivated during the following hours: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'This alert will be deactivated for the following hives: [exclude_hive_ids].',
  min: 'minimum',
  max: 'maximum',
  ave: 'average',
  der: 'derivative',
  cnt: 'count',
  equal_to: 'is equal to',
  less_than: 'is less than',
  greater_than: 'is greater than',
  less_than_or_equal: 'is less than or equal to',
  greater_than_or_equal: 'is greater than or equal to',
  alertrule_not_active:
    "This alert has been deactivated. You can activate it by checking the 'Active' box and saving this alert rule.",
  export_email_sent: 'Email with Excel file has been sent',
  export_file_saved: 'Excel file has been saved in your Downloads folder',
  Updated_at: 'Updated at',
  Not_yet_saved: 'Not yet saved',
  add_own_device: 'Add own device',
  devices_info_text:
    'Please note: do you own a BEEP base? Use the BEEP base app to add your device. It will then automatically appear in the list below.',
  devices_url_text: 'Here you can find more information on the BEEP base app.',
  alert_explanation_1:
    'If you own a BEEP base or another device you can set alerts, such that you will receive an alert when the measurement data meets certain requirements. For example, a sudden drop in weight because of swarming. Alerts will be shown in this app, you can choose to receive them via email as well.',
  alert_explanation_2:
    'To get you started there are a few default alert rules you can use (and adapt to your own needs). In addition, you can create your own alert rules.',
  alertrules_url_text: "Go to 'Alert settings' to create your first alert rule",
  Apiary_management: 'Apiary management',
  Move: 'Move',
  Current_apiary: 'Current apiary',
  sensor_key: 'Device unique identifier',
  disabled_settings: 'Manually editing these settings is disabled.',
  Address_placeholder: 'Number, Street name, City',
  first_create_apiary: 'First, create an apiary',
  Unknown: 'Unknown',
  unknown: 'unknown',
  research_warning:
    "Please note: if you did not receive an invitation to participate, it is not needed to give consent to share your data, as your data won't be used in that case.",
  research_explanation_p1:
    'The BEEP platform is used in the research projects that are listed below. After you are invited to participate in a research project, you need to give consent for the researchers to access your bee data.',
  research_explanation_p2:
    'You can withdraw your consent at any time. From that moment onwards, no new data will be shared. The data that you shared in the period for which you gave consent will remain available for the research. In case of questions, please direct these to the contact person of your research project.',
  research_info:
    'Before you consent, please review the research description provided through the link below and request for additional details if needed.',
  save_and_delete: 'Save and delete',
  drag_layers_info_text:
    'Drag layers from the left hand side to the desired position within the hive on the right hand side. Delete a layer from the hive by clicking on it and then clicking on the red bin icon. Within the hive, layers can be dragged as well to edit the position, layer color can be edited by clicking on the layer.',
  New_hive: 'New hive',
  New_alertrule: 'New alert rule',
  Add_alertrule: 'Add alert rule',
  Add_apiary: 'Add apiary',
  Add_sensor_definition: 'Add sensor definition',
  Add_member: 'Add member',

  alert_rule_deleted: 'Alert rule has been deleted',
  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. sensor definitions will only be saved or added after clicking the green check icon at the end of the sensor definition row in the table.',
  delete_sensordef: 'Delete sensor definition',
  delete_all_alerts: 'Delete all alerts',
  delete_all_alerts_warning:
    'Are you sure you want to delete all alerts? This cannot be undone.',
  delete_all_alerts_warning_filter_active:
    'Are you sure you want to delete all alerts? Alerts that do not match your search term will be deleted as well. This cannot be undone.',
  already_verified: 'I have verified my email address and would like to login',
  password_recovery_resend_mail: 'Send new verification code',
  alert_rule_created: 'New alert rule has been created',
  select_all: 'Select all',
  During: 'During',
  Calculation_minutes:
    'How often would you like the calculation to be performed?',
  Every: 'Every ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  every: 'every ',
  Calculation_minutes_short: 'How often is it calculated?', // for alert rule overview table header
  Alert_on_occurences_short: 'When do you receive the alert?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Disable alert for this hive',
  Alert_disabled_for_this_hive: 'Alert is disabled for this hive',
  disabled_for_hive: 'has been disabled for hive', // [alert] has been disabled for the following hive
  Alert_disabled: 'Alert disabled',

  Log_data_import: 'Import log data',
  Log_files: 'Log files', // Flashlogs
  Upload_date: 'Upload date',
  Messages: 'Messages',
  Log_time: 'Time logged',
  File_size: 'File size',
  check_log_data: 'Check log data', // Check_flashlog
  delete_log_file: 'Delete log file', // Delete_flashlog
  commit_log_data_short: 'Import log data', // commit_flashlog_short
  commit_log_data: 'Import data from this log file to the BEEP app: ', // commit_flashlog
  // flashlog_explanation
  import_log_data_explanation:
    "In the BEEP base app you can download log data from the internal memory of the BEEP base. Every time you download log data, the internal memory gets cleared and the data gets uploaded to the BEEP app. Below is the list of your downloaded log data. You can replace the data in the database by the data inside the downloaded log files by clicking the button 'Check log data'. This will first check how much data will be replaced inside the database, and if the time of the data in the log file is correct. You will get a confirmation box with the resulting info, and the possibility to apply or deny the replacement.",
  // flashlog_url_text
  import_log_data_url_text:
    'Here you can find the support article on downloading log data with the BEEP base app.',
  // flashlog_support_url
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000697129-download-beep-base-data-through-bluetooth',

  Immediately: 'Immediately',
  alertrule_active_no_email_sentence:
    ', and I open the BEEP app to see the alerts.',
  alertrule_active_email_sentence:
    ', and I receive alerts via email. In addition, I can see the alerts in the BEEP app.',
  First_occurence: 'First: ',
  Last_occurence: 'Last: ',
  // default alert rule names:
  Hive_stability_and_theft: 'Hive stability & Theft',
  Temperature_sensor_defect: 'Temperature sensor defect',
  Battery_low: 'Battery voltage low',
  Honey_harvest: 'Honey harvest',
  Hive_temperature: 'Hive temperature low',
  Brood_temperature: 'Brood temperature low',
  No_measurements: 'No measurements',
  Swarm: 'Swarm',
  Food_supply_low: 'Food supply low',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Weight drop of the hive is above a set value',
  Temperature_sensor_malfunctions: 'Temperature sensor malfunctions',
  Battery_voltage_is_below_a_set_value:
    'Battery voltage of the device is below a set value',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Weight increase due to nectar collection comes to a halt',
  Hive_temperature_drops_below_a_set_value:
    'Hive temperature drops below a set value',
  Temperature_in_the_brood_below_a_set_value:
    'Temperature in the brood has dropped below a set value',
  No_measurement_data_received_in_a_set_time_period:
    'No measurement data received during a set time period',
  Sudden_weight_drop_triggers_alert_immediately:
    'Sudden weight drop of the hive triggers an alert immediately. N.B. this is based on a data transmission interval of 15 minutes. In case your device has a different data transmission interval, you should adjust the threshold value accordingly.',
  The_hive_weight_is_below_a_set_value: 'Hive weight is below a set value',

  minute: 'minute | minutes',
  upload_interval_warning_single_interval:
    'N.B. the data transmission interval of your device is | N.B. the data transmission interval of your devices is', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'N.B. the data transmission intervals of your devices vary between ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Not relevant for immediate calculation',
  Increase: 'Increase',
  Decrease: 'Decrease',
  Every_hour: 'Every hour',
  every_hour: 'every hour',
  Absolute_value_of_dif: 'Change', // context: 'Change' is an easier to understand word than 'the absolute value of the difference' between 2 values.
  In_case_of_good_connection_warning:
    '*Immediately after a measurement is received. This is dependent on the data transmission interval and the reliability of the data connection.',
  Alertrule_summary_title: 'Summary',
  Alertrule_settings_title: 'Alert rule settings',
  Alertrule_exclude_title: 'Exclude periods and hives',
  of: 'of',

  alerts_url_text: 'Read the support article about alerts',
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
  show_all: 'Show all',
  only_active_if_measurement_present:
    '*N.B. the alert rule will only be active if the selected measurement is measured by your BEEP base / device',
  Relative_startpoint: 'Relative',
}

export default translations
