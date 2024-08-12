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
  Close: 'Close',

  /* main */
  Website: 'Website',
  menu: 'Menu',
  weather: 'Weather',
  sensors: 'Devices',

  Delete: 'Delete',
  Search: 'Search...',

  /* user error messages */
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

  remove_apiary: 'Remove apiary',
  remove_hive: 'Remove hive',
  remove_inspection: 'Remove inspection',

  Error: 'Error | Errors',
  first_remove_hives:
    'Attention: there are still hives at this apiary. You can save specific hives (and their inspections) by first moving them to another apiary. If you continue with the deletion, you will delete ALL hives and inspections present at this location.',

  Date: 'Date',
  ok: 'Ok',
  prev: 'previous',
  next: 'Next',
  add: 'Add',
  Cancel: 'Cancel',

  /* login */
  login_title: 'Login',
  login: 'Login',
  forgot_password: 'Forgot your password?',

  username: 'Username',
  password: 'Password',
  confirm_password: 'Confirm password',
  email: 'E-mail',

  create_login_question: 'No account yet? Register as a new user',
  create_login: 'Register as a new user',
  create_login_summary: 'Create a new user account',
  save: 'Save',

  logout: 'Log out',

  /* password recovery */
  password_recovery_title: 'Forgot your password?',
  password_recovery_remembered: 'Oh, now I remembered my password again!',
  password_recovery_send_mail: 'Send verification code',
  password_recovery_code_not_received: 'Code not received within 5 minutes?',
  password_recovery_enter_code:
    'Already got a verification code? Enter it here',
  password_recovery_reset_password: 'Change password',
  password_recovery_reminder_success:
    'An email has been sent. Click the link in your email to reset your password for this account.',

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
  inspection: 'inspection | inspections',
  Inspection: 'Inspection | Inspections',
  New_inspection: 'New inspection',
  Edit_inspection: 'Edit inspection',
  Action: 'Action | Actions',
  edit: 'Edit',
  Bee_race: 'Bee race',
  Birth_date: 'Birth date',
  Queen_colored: 'Queen marked',
  Queen_clipped: 'Queen clipped',
  Queen_fertilized: 'Queen fertilized',
  Age: 'Age',
  years_old: 'years old',

  /* Hive check items */
  Date_of_inspection: 'Date of inspection',
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
  no_data: 'No data available',
  no_chart_data: 'No chart data for the selected period',

  /* settings */
  General: 'General',
  Place: 'Location',
  Country: 'Country',
  City: 'City',
  Address: 'Address',
  latitude: 'latitude',
  Longitude: 'Longitude',
  Street: 'Street',
  Number: 'No.',
  Postal_code: 'Postal code',
  Description: 'Description',
  Hive_amount: 'Number of hives',
  Hive_prefix: 'Hive name prefix (before number)',
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

  Select: 'Select',
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
  w: 'Weight (old)',
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
  lat: 'latitude',
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
  day: 'day | days',
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

  /* user */
  Data_export: 'Data export',
  Export_your_data:
    'Export all data that is in your BEEP account and send an email containing the data as an Excel file OR download the Excel file here. The Excel file has different tabs containing your personal, hive, location, and inspection data.',
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  accept_policy:
    'I accept the BEEP terms of service, that are compatible with the new European privacy law',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',

  /* General items */
  server_down:
    'The app is unavailable due to maintenance work, please try again later',
  add_to_calendar: 'Add to calendar',
  Whats_new: 'New!',
  Site_title: 'BEEP | Bee monitor',
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

  not_available_yet:
    'not yet available. Click on the button in the upper right corner to add one.',
  member: 'member | members',
  Member: 'Group member | Group members',
  Invited: 'Invited',
  Invitation: 'Invitation | Invitations',
  Admin: 'Administrator',
  Creator: 'Group owner',
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
  group_declined: 'Group invitation declined',

  /* New translations v2.2.0 */
  roofed: 'Does the apiary have a roof?',
  info: 'Info',

  research: 'Research',
  start_date: 'Start date',
  end_date: 'End date',
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
  last_visit: 'Last visit',
  diary: 'Diary',
  data: 'Data',
  photo: 'photo | photos',
  add_checklist: 'Add checklist',
  add_hive: 'Add hive',
  edit_apiary: 'Edit apiary',
  new_apiary: 'New apiary',
  edit_group: 'Edit collaboration group',
  new_group: 'New collaboration group',
  verification_code: 'verification code',
  confirm_email_title: 'Confirm your email',
  confirm_email_summary:
    "You've received a verification code in your email. Enter it below to verify your email adress",
  confirm: 'Confirm',
  Profile: 'Profile',
  Checklist_template: 'Checklist template | Checklist templates',
  Help: 'Help',
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
  Page: 'Page | Pages',
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
  change_checklist_confirm:
    'Are you sure you want to select a different checklist? Values of already filled in fields will be kept.',
  view: 'View',
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
  Alertrule: 'Alert rule | Alert rules',
  Measurement: 'Measurement | Measurements',
  Calculation: 'Calculation',
  calculation: 'calculation',
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
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'months',
  hours: 'hours',
  delete_alertrule: 'Delete alert rule',
  create_alertrule: 'Save alert rule',
  Active: 'Active',
  Alert_via_email: 'Alert via email',
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
  alertrule_exclude_months_sentence:
    'This alert will be deactivated during the following months: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'This alert will be deactivated during the following hours: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'This alert will be deactivated for the following hives: [exclude_hive_ids].',
  Add_formula: 'Add formula',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',
  Past_minutes: 'over the past [nr_of_minutes]',
  Future_minutes: 'over the next [nr_of_minutes]',
  Zero_period_minutes: 'over the last value only',
  Not_relevant_for_period_zero:
    "Not relevant when running over the last value only (see 'Period')",
  Only_comparison_available_for_source_type:
    "Only available comparison for measurements from this source (see 'Measurement')",
  Period_future: 'in the future',
  Period_past: 'in the past',
  Minutes_calculator: 'Minute calculator',
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
  excel_file_saved: 'Excel file has been saved in your Downloads folder',
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

  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. sensor definitions will only be saved or added after clicking the green check icon at the end of the sensor definition row in the table.',
  delete_sensordef: 'Delete sensor definition',
  delete_all_alerts: 'Delete all alerts',
  delete_all_alerts_warning:
    'Are you sure you want to delete all alerts? This cannot be undone.',
  delete_all_alerts_warning_filter_active:
    'Are you sure you want to delete all alerts? Alerts that do not match your search term will be deleted as well. This cannot be undone.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts',
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.',
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.',
  already_verified: 'I have verified my email address and would like to login',
  password_recovery_resend_mail: 'Send new verification code',
  alert_rule_created: 'New alert rule has been created',
  alert_rule_deleted: 'Alert rule has been deleted',
  deactivate_for_all_hives: 'Deactivate alert for all hives',
  select_all: 'Select all',
  During: 'During',
  Every: 'Every ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  Calculation_minutes:
    'How often would you like the calculation to be performed?',
  Calculation_minutes_short: 'How often is it calculated?', // for alert rule overview table header
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
    "In the BEEP base app you can download log data from the internal memory of the BEEP base. Every time you download log data, the internal memory gets cleared and the data gets uploaded to the BEEP app. Below is the list of your downloaded log data. You can view the log data by clicking the button 'Check log data'. As a result of this check you will see blocks of data that may or may not contain matches with the database data. For each block that contains matches you can view the log data and database data in a chart, and choose to supplement the data in the database with the log data.",
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
  First_occurence: 'First',
  Last_occurence: 'Last',
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
  Size: 'Size',
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
  View_measurements: 'View measurements',
  View_inspection: 'View inspection | View inspections',
  View_alert: 'View alert | View alerts',

  Edit_alertrule: 'Edit alert rule',
  Edit_hive: 'Edit hive',
  Edit_queen: 'Edit queen',
  Edit_apiary: 'Edit apiary',
  Edit_group: 'Edit collaboration group',
  Edit_group_short: 'Edit group',
  Edit_checklist: 'Edit checklist',
  Edit_devices: 'Edit devices',
  Edit_consent: 'Edit consent',
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
  Day: 'Day | Days',
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
