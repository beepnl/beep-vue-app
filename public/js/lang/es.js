/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthsShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  Today: 'Hoy',
  Clear: 'Borrar',
  Close: 'Cerrar',
  firstDay: 1,
  format: 'dddd mmmm aaaa',

  /* main */
  Website: 'Sitio web',
  Feedback: 'Comentarios',
  Feedback_mail_header: 'BEEP app feedback',
  Feedback_mail_body:
    'Querida fundación BEEP,%0D%0A%0D%0A Aquí le envio mis comentarios sobre la aplicación BEEP.%0 D%0A%0D%0AI descubrió esto:%0D%0A%0D%0AJusto antes de que ocurriera, hice:%0D%0A%0D%0ALa pantalla se veía como (por favor incluya una captura de pantalla):%0D%0A%0D%0A%0D%0A%0A%0D%0A',
  Diagnostic_info: 'Información de diagnóstico (en caso de error):%0D%0A',
  back: 'Atrás',
  menu: 'Menu',
  lighting: 'iluminación',
  camera: 'cámara',
  weather: 'tiempo atmosférico',
  sensors: 'sensores',
  no_valid_authentication: ' No se han recibido datos de autenticación válidos',
  succesfully_saved: 'guardado con éxito',
  switch_language: 'Definir idioma',
  Delete: 'Eliminar',
  Search: 'Buscar...',

  /* user error messages */
  User: 'Usuario',
  User_data: 'Datos de usuario',
  user_data: 'datos de usuario',
  updated: 'actualizado',
  delete_complete_account:
    '¿Está seguro de que desea eliminar su cuenta completa, incluyendo todos los apiarios, colmenas e inspecciones? Es irrecuperable',
  username_is_required: 'Por favor, introduzca el nombre de usuario',
  username_already_exists: 'El nombre de usuario ya existe',
  password_is_required: 'Por favor, introduzca una contraseña',
  email_is_required:
    'Por favor, introduzca una dirección de correo electrónico',
  email_already_exists: 'La dirección de correo electrónico ya está en uso',
  policy_accepted_is_required:
    'Es necesario que Usted acepte los términos del servicio para registrarse',
  already_registered: 'Ya estoy registrado',
  invalid_user: 'Usuario desconocido o contraseña incorrecta',
  no_password_match: 'Las contraseñas no coinciden',
  invalid_token: 'Código no válido',
  no_valid_email: 'Dirección de correo electrónico no válida',
  empty_fields: 'Por favor, complete todos los campos',
  match_passwords: 'Las contraseñas no coinciden',
  succesfully_registered: 'Usted está registrado correctamente.',
  authentication_failed: 'No se pudo autenticar',
  no_valid_input_received:
    'No se pudieron guardar los datos, ninguna entrada válida fue recibida.',
  remove_all_settings: 'Eliminar todos los ajustes',
  remove_apiary: 'Eliminar apiario',
  remove_hive: 'Eliminar colmena',
  remove_inspection: 'Eliminar inspección',
  Error: 'Error | Errores',
  Warning: 'Advertencia',
  first_remove_hives:
    'Atención: Aun hay colmenas en este apiario. Usted puede guardar colmenas específicas (y sus inspecciones) trasladándolas primero a otro apiario. Si continúa con la eliminación, eliminará TODAS las colmenas e inspecciones presentes en esta ubicación.',
  Date: 'Fecha',
  ok: 'Ok',
  prev: 'anterior',
  next: 'Siguiente',
  add: 'Agregar',
  Cancel: 'Cancelar',

  /* inicio de sesión */
  login_title: 'Iniciar sesión',
  login: 'Iniciar sesión',
  back_to_login: 'Volver a iniciar sesión',
  forgot_password: '¿Olvidó su contraseña?',
  username: 'Nombre de usuario',
  password: 'Contraseña',
  confirm_password: 'Confirmar contraseña',
  email: ' Correo electrónico ',
  token: 'Código',
  create_login_question: '¿Aún no tiene cuenta? Regístrese como nuevo usuario',
  create_login: 'Registrarse como nuevo usuario',
  create_login_summary: 'Crear una nueva cuenta de usuario',
  save: 'Guardar',
  save_and_return: 'Guardar y volver',
  logout: 'Cerrar sesión',
  logout_title: 'Cerrar sesión como',
  logout_now: '¿Realmente quieres cerrar sesión ahora?',
  member_since: 'BEEPing desde',

  /* Recuperación de contraseñas */
  password_recovery_title: '¿Olvidó su contraseña?',
  password_recovery_remembered: 'Oh, ahora recordé mi contraseña de nuevo!',
  password_recovery_user: 'Información del usuario',
  password_recovery_send_mail: 'Enviar código de verificación',
  password_recovery_code_not_received:
    '¿Código no recibido dentro de 5 minutos?',
  password_recovery_enter_code:
    '¿Ya tiene un código de verificación? Introdúzcalo aquí',
  password_recovery_reset_title: 'Introduzca una nueva contraseña',
  password_recovery_reset_password: 'Cambie contraseña',
  password_recovery_reminder_success:
    'Un correo electrónico se ha enviado. Haga clic en el enlace de su correo electrónico para restablecer la contraseña de esta cuenta.',
  password_recovery_reminder_summary:
    'Introduzca su dirección de correo electrónico. Usted recibirá un correo electrónico con un enlace para cambiar la contraseña en el siguiente paso.',
  password_recovery_reset_summary:
    'Utilice el código que Usted recibió para establecer una nueva contraseña para su cuenta',
  password_recovery_reset_success:
    ' Su contraseña ha sido exitosamente modificada, Usted ha iniciado sesión',
  new_password: 'Nueva contraseña',
  confirm_new_password: 'Confirmar nueva contraseña',
  go_to_dashboard: 'Ir al tablero',

  /* overview */
  overview_title: 'título del resumen',
  overview: 'Resumen',
  color: 'Color',
  state: 'Encendido/Apagado',
  connection_state: 'Estado de conexión',

  /* hives */
  locations_title: 'ubicación de la colmena',
  hives_title: 'título la colmena',
  Hive: 'Colmena | Colmenas',
  hive: 'colmena | colmenas',
  Location: 'Apiario | Apiarios',
  location: 'apiario | apiarios',
  Name: 'Nombre',
  name: 'nombre',
  Type: 'Tipo',
  type: 'tipo',
  Layer: 'Capa',
  layer: 'capa',
  brood: 'Cría',
  honey: 'Miel',
  inspect: 'Inspeccionar',
  inspection: 'inspección | inspecciones',
  Inspection: 'Inspección | Inspecciones',
  New_inspection: 'Nueva Inspección',
  Edit_inspection: 'Editar inspección',
  Action: 'Acción | Acciones',
  Conditions: 'Condiciones (inspeccionado)',
  edit: 'Editar',
  Hive_layer_amount: 'Cantidad de capas en la colmena',
  Bee_race: 'Raza de abeja',
  Birth_date: 'Fecha de nacimiento',
  Color: 'Color',
  Queen_colored: 'Reina marcada',
  Queen_clipped: 'Reina recortada',
  Queen_fertilized: 'Reina fertilizada',
  Age: 'Edad',
  years_old: 'años de edad',

  /* Elementos de verificación de colmena */
  Date_of_inspection: 'Fecha de inspección',
  action: 'Acción',
  reminder: 'Recordatorio',
  remind_date: 'Fecha de recordatorio',
  overall: 'General',
  positive_impression: 'Impresión positiva',
  needs_attention: 'Necesita Atención',
  notes: 'Notas',
  notes_for_next_inspection:
    'Nota corta para la próxima inspección (visible en el resumen)',
  Not_implemented_yet: 'Este elemento aún no se ha implementado',
  save_input_first: '¿Desea guardar primero la entrada?',

  /* tablero */
  dashboard_title: 'Tablero',
  dashboard: 'Tablero',
  measurementsError:
    'No es posible cargar las mediciones, comprobar la conexión de red',
  last_measurement: 'Última medición',
  at: 'en',
  measurement_system: 'Sistema de medición ',
  no_data: 'No hay datos disponibles',
  no_chart_data: 'No hay datos de gráfico para el período seleccionado',

  /* Ajustes */

  /* settings */
  General: 'General',
  Place: 'Ubicación',
  Country: 'País',
  City: 'Ciudad',
  Address: 'Dirección',
  latitude: 'Latitud',
  Longitude: 'Longitud',
  Street: 'Calle',
  Number: 'Nro.',
  Postal_code: 'Código postal',
  Description: 'Descripción',
  Hive_settings: 'Ajustes de la colmena',
  Hive_amount: 'Cantidad de colmenas en esta ubicación',
  Hive_prefix: 'Prefijo del nombre de la colmena (antes del numéro)',
  Hive_number_offset: 'Compensación del número de colmena???',
  Hive_type: 'Tipo de colmena',
  Hive_layers: 'Capas de la colmena',
  Hive_frames: 'Marcos en la colmena',
  Hive_color: 'Color de la colmena',
  Queen: 'Reina',
  queen: 'reina',
  settings_title: 'Ajustes',
  settings_description: 'Configuración de los sensores',
  Settings: 'Configuración',
  settings: 'configuración',
  sensors_title: 'Configuración de los sensores',
  sensors_description: 'Descripción de sensores',
  //   sensors: 'Sensores',
  sensor: 'sensor',
  Select: 'Seleccionar',
  Not_selected: 'No seleccionado',
  Poor: 'Pobre',
  Fair: 'Justo',
  Average: 'Promedio',
  Average_slider: 'Promedio',
  Good: 'Bueno',
  Excellent: 'Excelente',
  Low: 'Bajo',
  Medium: 'Medio',
  High: 'Alto',
  Extreme: 'Extremo',
  /* colores */
  select_color: 'Seleccionar un color',
  advanced: 'Avanzado',

  /* sensores */
  Select_sensor: 'Seleccionar un sensor',
  temperature: 'Temperatura',
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
  light: 'Luz Solar',
  l: 'Luz Solar',
  water: 'Agua',
  w: 'Peso (antiguo)',
  humidity: 'Humedad',
  h: 'Humedad',
  air_pressure: 'Presión de Aire',
  p: 'Presión de Aire',
  weight: 'Peso',
  w_v: 'El sensor de peso valora todos los sensores',
  w_fl: 'Valor del sensor de peso delantero izquierdo',
  w_fr: 'Valor del sensor de peso delantero derecho',
  w_bl: 'Valor del sensor de peso trasero izquierda',
  w_br: 'Valor del sensor de peso trasero derecha',
  weight_kg: 'Peso',
  weight_kg_corrected: 'Peso (corr)',
  weight_combined_kg: 'Peso combi',
  bat_volt: 'Batería',
  bv: 'Batería',
  sound_fanning_4days: 'Fan 4d abejas',
  s_fan_4: 'Fan 4d abejas',
  sound_fanning_6days: 'Fan 6d abejas',
  s_fan_6: 'Fan 6d abejas',
  sound_fanning_9days: 'Fan 9d abejas',
  s_fan_9: 'Fan 9d abejas',
  sound_flying_adult: 'Abejas voladoras',
  s_fly_a: 'Abejas voladoras',
  sound_total: 'Sonido total',
  s_tot: 'Sonido total',
  s_spl: 'Sonido total',
  bee_count_in: 'Cuenta de abejas en el interior',
  bc_i: 'Cuenta de abejas en el interior',
  bee_count_out: 'Cuenta de abejas en el exterior',
  bc_o: 'Cuenta de abejas en el exterior',
  t_i: 'Temp. dentro',
  rssi: 'Fuerza de la señal',
  snr: 'Ruido de la señal',
  lat: 'Latitud',
  lon: 'Longitud',
  Sound_measurements: 'Medidas de sonido?',
  Sensor_info: ' Información del sensor',
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
  precipIntensity: 'Intesidad de precipitación',
  precipProbability: 'Probabilidad de lluvia',
  precipType: 'Tipo de lluvia',
  outsideTemperature: 'Temperatura exterior',
  apparentTemperature: 'Temperatura aparente',
  dewPoint: 'Temperatura de derretimiento???',
  //   humidity: 'Humedad',
  pressure: 'Presión de aire',
  windSpeed: 'Velocidad del viento',
  windGust: 'Ráfaga de viento',
  windBearing: 'Cojinete de viento',
  cloudCover: 'Cubierto de nubes',
  uvIndex: 'índice UV',
  visibility: 'Visibilidad',
  ozone: 'Ozono',

  /* Medidas */
  Hour: 'Horas',
  hour: 'hora | horas',
  day: 'día | días',
  week: 'Semana',
  month: 'Mes',
  year: 'Año',

  /* Ajustes */
  could_not_load_settings: 'No se pudo cargar la configuración',
  offline: 'Sin conexión',
  remote: 'Remoto',
  connected: 'Directo',
  yes: 'Si',
  no: 'No',
  footer_text: 'Apicultura de código abierto',
  beep_foundation: 'la fundación BEEP',
  Checklist: 'Lista de verificación | Listas de verificación',
  checklist: 'lista de verificación | listas de verificación',
  Checklist_items: 'Artículos de la lista de verificación',
  edit_hive_checklist:
    'Marque/desmarque las casillas de la lista anterior para agregar/eliminar elementos de su lista de verificación de la colmena. También puede desplegar/doblar y arrastrar/soltar los elementos para reordenarlos a su propio estilo.',

  /* usuario */
  Data_export: 'Exportación de datos',
  Export_your_data:
    "Exportar todos los datos que se encuentran en su cuenta de BEEP y enviar un correo electrónico que contenga los datos como un archivo de Excel (OR download the Excel file via the 'Download CSV' button). El archivo de Excel tiene diferentes pestañas que contienen sus datos personales, colmena, ubicación y datos de inspección.",
  Terms_of_use: 'Términos del servicio',
  Email_export: 'Email CSV',
  Download_csv: 'Download CSV',
  Open_csv: 'Open CSV',
  Include_group_data: 'Add collaboration group data to export',
  Include_sensor_data: 'Add measurement data file links to export',

  accept_policy:
    'Acepto las condiciones del servicio BEEP, las cuales son compatibles con la nueva ley europea de privacidad',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy: 'Usted aún no ha aceptado los términos del servicio.',

  /* Elementos generales */
  server_down:
    'La aplicación no está disponible debido a trabajos de mantenimiento, por favor inténtelo nuevamente más tarde',
  add_to_calendar: 'Agregar al calendario',
  sort_on: 'Ordenar de acuerdo a',
  Whats_new: 'Nuevo!',
  Manual: 'Manual',
  Site_title: 'BEEP ? Monitor de abejas',
  could_not_create_user:
    'El usuario no se puede crear en este momento. Disculpe, por favor inténtelo nuevamente más tarde.',
  email_verified: 'Su dirección de correo electrónico ha sido verificada.',
  email_not_verified:
    'Su dirección de correo electrónico aún no ha sido verificada.',
  email_new_verification:
    'Haga clic en este enlace para enviar un nuevo correo electrónico de verificación.',
  email_verification_sent:
    'Se ha enviado un mensaje con un enlace de verificación a su dirección de correo electrónico. Haga clic en el enlace del correo electrónico para activar su cuenta e iniciar sesión.',
  email_verification_resent:
    'Se ha enviado un nuevo mensaje con un enlace de verificación a su dirección de correo electrónico. Haga clic en el enlace del correo electrónico para activar su cuenta e iniciar sesión.',

  not_filled: 'no completado',
  cannot_deselect:
    'No se puede quitar este elemento, porque contiene un elemento necesario',
  Undelete: 'No borrar',
  No_groups: 'No hay grupos disponibles',
  not_available_yet: 'todavía no disponible. Por favor, cree el primero aquí.',
  Users: 'Users',
  member: 'miembros del grupo | miembros del grupo',
  Member: 'Miembros del Grupo | Miembros del Grupo',
  Invite: 'Invitar',
  Invited: 'Invitado',
  Invitation: 'Invitación | Invitaciones',
  Admin: 'Administrador',
  Creator: 'Propietario del Grupo',
  Collaborate: 'Colaboración',
  Group: 'Grupo de colaboración | Grupos de colaboración',
  group: 'grupo de colaboración | grupos de colaboración',
  group_short: 'grupo | grupos',
  to_share:
    'para compartir con este grupo. 1 clic= miembros del grupo que solo pueden ver, 2 clics= miembros del grupo que pueden editar',
  Invitation_accepted: 'Invitación aceptada',
  Accept: 'Aceptar',
  My_shared: 'Mi compartido',
  invitee_name: 'Nombre invitado',
  Remove_group:
    '¿Está seguro que desea eliminar completamente este grupo compartido para todos sus miembros',
  Detach_from_group: 'Quita a mí y a mis colmenas de este grupo',
  my_hive: 'Mi colmena',
  created: 'creado',
  group_detached: 'Salió con éxito del grupo',
  group_activated: 'Invitación de grupo aceptada',
  group_declined: 'Invitación de grupo rechazada',

  group_explanation_1:
    '1. Crear un nuevo grupo de cooperación con un título y una descripción opcional',
  group_explanation_2:
    '2. Invitar a otros usuarios de BEEP en su dirección de correo electrónico BEEP',
  group_explanation_3:
    '3. Compartir colmenas específicas para ser vistas por otros, de cooperar en',
  Filter_and_sort_on: 'Filtrar y ordenar:',

  /* TO BE TRANSLATED */
  /* New translations v2.2.0 */
  roofed: '¿El apiario tiene un techo?',
  info: 'Info',
  research: 'Investigación',
  start_date: 'Fecha de inicio',
  end_date: 'Fecha de término',
  purpose: 'Propósito de investigación',
  institution: 'Institución de investigación',
  type_of_data_used: 'Tipo de datos utilizados',
  link: 'Vínculo',
  Consent: 'Consentir',
  history: 'historia',
  Current_consent: 'Consentimiento actual',
  consent_yes: 'Yo consiento a compartir mis datos',
  consent_no: 'Yo no consiento a compartir mis datos',
  my_beep_data: 'Mis propios datos BEEP',
  Consent_can_only_be_set: 'El consentimiento solo se puede ajustar a',
  earlier: 'una anterior',
  later: 'una posterior',
  new_apiary_explanation: 'Crear un nuevo apiario en 4 pasos',
  start_here: 'Haga clik aquí para comenzar',
  optional: 'opcional',
  dimensions: 'dimensiones',
  details: 'detalles',
  configuration: 'configuración',
  adjustments: 'ajustes',
  changes_queen_color: 'La edición cambia el color',
  Brood_box_and_frame: 'Cámara de cría y marcos',
  Hive_order: 'Orden de las colmenas en el apiario',
  bb_width_cm: 'Ancho de la cámara de cría (cm)',
  bb_height_cm: 'Altura de la cámara de cría (cm)',
  bb_depth_cm: 'Profundidad de la cámara de cría (cm)',
  fr_width_cm: 'Amplitud de los marcos (cm)',
  fr_height_cm: 'Altura de los marcos (cm)',
  queen_line: 'línea',
  queen_tree: 'árbol',
  queen_description: 'notas',
  Hive_short: 'Colmena | Colmenas',
  Image: 'Imagen | Imágenes',
  Size: 'Tamaño',
  preview: 'vista previa',
  Inside: 'Medidas al interior',
  Offset: 'Compensación',
  Multiplier: 'Multiplicador',
  Input: 'Entrada',
  Output: 'Salida',
  Last: 'Último',
  Export_sensor_data:
    "Exportar todos los datos por dispostivo en la resolución más alta posible como un archivo .csv file que Usted pueda abrir en Excel, or SPSS. NB: Los datos de tiempo en la columna 'tiempo' se expresan en tiempo GMT, corregidos por los datos de tiempo estandar RFC 3339.",
  CSV_export_separator: 'CSV data column separator',
  Selected_date: 'Fecha seleccionada',
  Sensor_measurements: 'Mediciones de los sensores',
  too_much_data:
    'Demasiados datos para procesar, por favor seleccione menos mediciones de sensores, o reduzca el espacio de tiempo entre la fecha inicial y final.',
  beep_base_explanation:
    "Si Usted tiene una base BEEP (mostrada en la imagen de abajo), por favor utilice la app de la base BEEP (iOS and Android) para establecer comunicación con esta app. Si Usted aun no posee la base BEEP, por favor haga click en el item del menu 'sitio web BEEP' para actualizaciones en cómo obtener una base BEEP. Si Usted tiene su propio dispositivo de medición y le gustaría ver los datos en la app BEEP, por favor envienos un mensaje para solicitar unirse a nuestra comunidad estacionaria y Usted acceder a la descripcion API.",
  sample_code_hive: 'First select a hive, to generate a unique sample code',
  sample_code_generate: 'Generar código de la muestra',
  sample_code_delete: 'Eliminar código de la muestra',
  measurement_interval: 'intervalo de medición',
  from_weather_service: 'desde el servicio de tiempo atmosférico',

  /* New translations v3 */
  click_hives_to_filter: 'haga click en colmenas a filtrar',
  for: 'para',
  last_visit: 'última visita',
  apiary_details: 'detalles del apiario',
  group_details: 'detalles del grupo',
  diary: 'diario',
  data: 'datos',
  photo: 'foto | fotos',
  add_checklist: 'agregar lista de verificación',
  add_hive: 'agregar colmena',
  delete_apiary: 'eliminar apiario',
  edit_apiary: 'editar apiario',
  new_apiary: 'euevo apiario',
  delete_group: 'eliminar grupo',
  edit_group: 'editar grupo',
  new_group: 'nuevo grupo',
  verification_code: 'código de verificación',
  limit_exceeded: 'límite excedido',
  confirm_email_title: 'confirme su dirección de correo electrónico',
  confirm_email_summary:
    'Usted ha recibido un código de verificación en su correo electrónico. Ingréselo abajo para verificar su correo electrónico',
  confirm: 'confirme',
  Profile: 'Perfil',
  Checklist_template: ' Lista de chequeo de moldes',
  Help: 'Ayuda',
  Privacy: 'Privacidad',
  FAQ: 'PMF',
  Support: 'Soporte',
  no_inspections: 'sin inspeccionadas',
  no_results: 'sin resultados',
  Hive_brood_layer: 'Capa de Cría | Capas de Cría',
  Hive_honey_layer: 'Capa de Miel | Capas de Miel',
  Hive_queen_excluder_layer:
    'Excluidor de abeja reina | Excluidores de abejas reinas',
  Hive_feeding_box_layer: 'Capa de alza',
  overrides_layer_colors: 'anula los colores de las capas',
  drag_layers: 'Arrastrar capas para configurar colmenas',
  page: 'page | páginas',
  Page: 'Page | Páginas',
  not_found: 'no encontrado',
  sorry: 'lo siento',
  delete_layer: 'eliminar capa',
  not_saved_error: 'no se guardaron los datos',
  something_wrong: 'algo salió mal',
  not_editable: 'no editable',
  unsaved_changes: 'cambios no guardados',
  save_changes:
    '¿Está seguro que desea abandonar esta página? Cualquier cambio no guardado se perderá',
  no_apiaries_yet: 'Usted no tiene ningún apiario aun',
  need_help: 'Necesita ayuda?',
  Apiary_color: 'Color del apiario',
  Set_notification_date: 'Establecer la fecha de notificación',
  remove_image: 'remover imagen',
  Total_colony_size: 'Tamaño total de la colonia',
  bee: 'abeja | abejas',
  with_bees: 'con abejas',
  change_checklist_confirm:
    'Èstá seguro que desea seleccionar una lista de verificación diferente? Los valores de los campos ya rellenados se mantendrán',
  view: 'ver',
  share: 'compartir',
  edit_details: 'editar detalles',
  remove_queen: 'remover abeja reina',
  remove_group_short: 'remover grupo pequeño',
  device: 'Dispositivo | Dispositivos',
  click_date_to_edit: 'Haga click en fecha para editar.',
  accept_policy_1: 'acepto los',
  accept_policy_2:
    ' BEEP, que son compatibles con la nueva ley europea de privacidad',
  terms_of_use: 'términos del servicio',
  the_field: 'el campo',
  is_required: 'is required',
  invalid_password:
    'La clave debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial (\\]{}()?\\-"!@#%&/\\,><\':;|_~`)',
  sensor_definition: ' definición del sensor | definiciones del sensor',
  measurement: 'medición | mediciones',
  remove_device: 'remover dispositivo',
  last_message_received: 'último mensaje recibido',
  transmission_ratio: ' radio de transmisión',
  period: 'período',
  download: 'descargar',
  different_end_start: 'fin e inicio deben diferir',
  later_end_start: 'fecha de inicio debe ser anterior a la fecha de término',
  new_email_verification_sent:
    'Se ha enviado un mensaje con un enlace de verificación a su nueva dirección de correo electrónico. Haga clic en el enlace del correo electrónico para confirmar su nueva dirección de correo electrónico e iniciar sesión.',

  sensordef_info:
    "Una definición de sensor es destinada a convertir un valor de sensor desde un valor sensor 'crudo' entrante'en un valor de acuerdo a la cantidad física y unidad ((e.g. p_v = 1098273 => peso_kg = 62,400 kg) o calibrar un sensor (e.g. t_0 = 15.3 ° C => t_0 = 15.8 ° C). Lo anterior, puede ser realizado ajustando un 'compensar y un 'multiplicador. Los valores de ingreso y salida permanecen igual si se ha fijado la compensación en 0 y el multiplicador en 1. La app de la base BEEP (a partir del App Store) le proveerá definiciones correctas de los sensores en la instalación(configuración?) inicial de su base BEEP.",
  or: 'o',
  select_all_hives: 'Seleccionar todas las colmenas',
  select_all_editable_hives: 'Seleccionar todas las colmenas editables',
  Alert: 'Alerta | Alertas',
  alert: 'alerta | alertas',
  remove_alert: 'remove alerta',
  alerts_enabled: 'alerta habilitada',
  alerts_disabled: 'alerta deshabilitada',
  edit_checklist_confirm:
    'Está seguro que desea editar la lista de verificación? Datos de su inspección no guardados se perderán',
  edit_checklist_confirm_deselectedhives:
    'Está seguro que desea editar la lista de verificación? Datos de su inspección no guardados y su selección de colmenas se perderán',
  user_not_edited:
    'Datos del usuario no han sido editados. Posiblemente los datos de usuario son idénticos a los actuales datos de usuario, o uno o más campos no han sido completados correctamente. Por favor, revise sus datos y pruebe de nuevo.',
  user_not_deleted: 'Algo salió mal, usuario no ha sido eliminado.',
  research_consent: 'Consentir investigación',
  checklist_types: 'Personal, compartido, investigación',
  edit_hive_checklist_no_touch:
    'Chequear/no chequear las cajas en la lista de abajo para agregar/remover ítems de su lista de verificación de colmenas. Además, Usted puede archivar/des archivar y arrastrar/dejar caer los ítems para re-ordenarlos a su propia manera (N. B. esto no es posible de realizar en un dispositivo pantalla táctil',
  edit_hive_checklist_touch:
    'Chequear/no chequear las cajas en la lista de abajo para agregar/remover ítems de su lista de verificación de colmenas. Es posible cambiar el orden de los ítems solo en un computador de escritorio.',
  input_not_possible_for_bulkinspection:
    'Este ítem no está disponible cuando numerosas colmenas son seleccionadas para una inspección, ya que este solo puede ser completado para una colmena en particular. Es posible completar este ítem para una única colmena a último momento, editando la inspección para aquella colmena.',
  save_bulkinspection_confirm:
    '¿Está seguro que desea guardar esta inspección para numerosas colmenas al mismo tiempo?',
  deleted_but_not_saved_devices_warning:
    "N. B.: dispositivos serán solo removidos luego de hacer en click en el botón 'Guardar y eliminar' en lado superior derecho.",
  no_alerts: 'sin alerta',
  alertrule: 'regla de alerta | reglas de alerta',
  Alertrule: 'Regla de alerta | Reglas de alerta',
  Measurement: 'Medición | Mediciones',
  Calculation: 'Cálculo',
  calculation: 'cálculo',
  Alert_on_occurences: 'Cuando le gustaría recibir esta alerta?',
  Alert_on_occurences_hint:
    'Directamente, o solo después que este haya ocurrido un x número de veces?',
  Direct: 'Directamente',
  After: 'Después',
  times: ' veces',
  Comparator: 'Comparador',
  comparator: 'comparador',
  Comparison: 'Comparación',
  comparison: 'comparación',
  Threshold_value: 'Valor umbral',
  Minimum: 'Mínimo',
  Maximum: 'Máximo',
  Derivative: 'Derivada (aumento o disminución)',
  Count: 'Recuento',
  Value: 'Valor',
  Difference: 'Diferencia',
  Absolute_value: 'Valor absoluto',
  Absolute_value_of_dif_explanation: '**Valor absoluto de la diferencia',
  Exclude_months:
    '<strong>Desactivar</strong> esta alerta durante los siguientes meses:',
  Exclude_hours:
    '<strong>Desactivar</strong> esta alerta durante las siguientes horas:',
  Exclude_hives:
    '<strong>Desactivar</strong> esta alerta para las siguientes colmenas:',
  Exclude_hives_details:
    'N.B. Por defecto, esta alerta será realizada para todas las colmenas con un dispositivo de medición.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
  months: 'meses',
  hours: 'horas',
  delete_alertrule: 'eliminar regla de alerta',
  create_alertrule: 'Save alert rule',
  Active: 'Activo',
  Alert_via_email: 'Alerta via correo electrónico',
  Webhook_url: 'Webhook url',
  this_field: 'Este campo',
  alertrule_default:
    'Regla de alerta por defecto | Reglas de alerta por defecto',
  copy: 'copiar',
  Home: 'Hogar',
  Select_default_alertrule: 'Copiar regla de alerta por defecto',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Me gustaría recibir una alerta si la [calculation] [comparison] de las [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Este cálculo será realizado [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', Y me gustaría recibir la alerta directamente. ',
  alertrule_occurences_indirect_sentence:
    ', pero me gustaría recibir la alerta solo si ocurre [alert_on_occurences] veces. ',
  alertrule_exclude_months_sentence:
    'Esta alerta será desactivada durante los siguientes meses: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Esta alerta será desactivada durante las siguientes horas: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Esta alerta será desactivada para las siguientes colmenas: [exclude_hive_ids].',
  min: 'mínimo',
  max: 'máximo',
  ave: 'promedio',
  der: 'derivada',
  cnt: 'recuento',
  equal_to: 'igual a',
  less_than: 'menor que',
  greater_than: 'mayor que',
  less_than_or_equal: 'menor que o igual a',
  greater_than_or_equal: 'mayor que o igual a',
  alertrule_not_active:
    "Esta alerta ha sido desactivada. Usted puede activarla haciendo click en la caja 'Activa' y guardando esta regla de alerta",
  export_email_sent:
    'un correo electrónico con el archivo Excel ha sido enviado',
  excel_file_saved: 'el archivo Excel ha sido guardado en su carpeta Descargas',
  Updated_at: 'Actualizado en',
  Not_yet_saved: 'No guardado aun',
  add_own_device: 'Agregar su propio dispositivo',
  devices_info_text:
    'Atención: Eres propietario de una base BEEP? Utiliza la app de la base BEEP para agregar tu dispositivo. Este aparecerá luego automáticamente en la lista de abajo',
  devices_url_text:
    'Aquí puedes encontrar mas información sobre la app de la base BEEEP',
  alert_explanation_1:
    'Si posees una base BEEP u otro dispositivo puedes definir alertas, de esa forma recibirás una alerta cuando los datos de medición cumplan ciertos requerimientos. Por ejemplo, una caída repentina en la pérdida de peso debida a enjambrazón. La alerta será mostrada en esta app, tu también puedes escoger recibirlas vía correo electrónico',
  alert_explanation_2:
    'Para empezar hay algunas reglas de alertas que puedes utilizar (y adaptar según tus propias necesidades). Además, puedes crear tus propias reglas de alertas',
  alertrules_url_text:
    'Ir a Ajustes de alerta para crear tu primera regla de alerta',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Manejo de apiario',
  Move: 'Mover',
  Current_apiary: 'Apiario actual',
  sensor_key: 'Identificador de dispositivo único',
  disabled_settings: 'La edición manual de estos ajustes ha sido inhabilitada.',
  Address_placeholder: 'Número, Nombre de calle, Ciudad',
  first_create_apiary: 'primero, crear un apiario',
  Unknown: 'Desconocido',
  unknown: 'desconocido',
  research_warning:
    'Atención: Si Usted no recibió ninguna invitación a participar, no era necesario entregar consentimiento para compartir sus datos, ya que en ese caso sus datos no serán utilizados',
  research_explanation_p1:
    'La plataforma BEEP es utilizada en los proyectos de investigación listados abajo. Luego que Usted sea invitado a participar en un proyecto de investigación, Usted necesita entregar consentimiento a los investigadores para acceder a los datos de sus abejas',
  research_explanation_p2:
    'Usted puede retirar su consentimiento en cualquier momento. A partir de ese momento, ningún dato nuevo será compartido. Los datos que Usted comparta en el periodo para el cual Usted entregó consentimiento permanecerán disponibles para la investigación. En caso de preguntas, por favor dirigirse a la persona contacto de su proyecto de investigación',
  research_info:
    'Antes que Usted consienta, por favor revise la descripción de investigación provista en el vínculo de abajo, si es necesario puede solicitar detalles adicionales',
  save_and_delete: 'Guardar y eliminar',
  drag_layers_info_text:
    'Arrastre capas desde el lado izquierdo a la posición deseada dentro de la colmena en el lado derecho. Elimine una capa de la colmena haciendo clic en ella y luego en el icono de la papelera roja. Dentro de la colmena, las capas también se pueden arrastrar para editar la posición, el color de la capa se puede editar haciendo clic en la capa.',
  New_hive: 'Nueva colmena',
  New_alertrule: 'Nueva regla de alerta',
  Add_alertrule: 'Agregar regla de alerta',
  Add_apiary: 'Agregar apiario',
  Add_sensor_definition: 'Agregar definición de sensor',
  Add_member: 'Agregar miembro',
  alert_rule_deleted: 'La regla de alerta ha sido eliminada',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'Nota: las definiciones de sensor solo serán guardadas o agregadas luego de hacer clic en el icono de verificación verde al final de la fila de definición de sensor en la tabla.',
  delete_sensordef: 'Eliminar la definición del sensor',
  delete_all_alerts: 'Eliminar todas las alertas',
  delete_all_alerts_warning:
    '¿Está seguro que desea borrar todas las alertas? Esto no se puede deshacer.',
  delete_all_alerts_warning_filter_active:
    '¿Está seguro que desea eliminar todas las alertas? También se eliminarán las alertas que no coincidan con su término de búsqueda. Esto no se puede deshacer.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified:
    'Yo he verificado mi dirección de correo electrónico y me gustaría iniciar sesión',
  password_recovery_resend_mail: 'Enviar nuevo código de verificación',
  alert_rule_created: 'Nueba regla de alerta ha sido creada',
  select_all: 'Seleccionar todos',
  During: 'Durante',
  Calculation_minutes:
    '¿Con qué frecuencia le gustaría que el cálculo fuera realizado?',
  Every: 'Cada ',
  Calculation_minutes_short: '¿Con qué frecuencia es calculada?',
  Alert_on_occurences_short: '¿Cuándo recibes la alerta?',
  Disable_alert_for_this_hive: 'Deshabilitar alerta para esta colmena',
  Alert_disabled_for_this_hive: 'Alerta está deshabilitada para esta colmena',
  disabled_for_hive: 'ha sido deshabilitada para la colmena',
  Alert_disabled: 'Alerta deshabilitada',

  /* for import page */
  Log_data_import: 'Importar datos de registro',
  Log_files: 'Archivos de registro',
  Upload_date: 'Actualizar fecha',
  Messages: 'Mensajes',
  Log_time: 'Tiempo registrado',
  File_size: 'Tamaño del archivo',
  check_log_data: 'Chequear datos de registro',
  delete_log_file: 'Eliminar archivo de registro',
  commit_log_data_short: 'Importar datos de registro',
  commit_log_data:
    'Importar datos desde este archivo de registro hacia la aplicación BEEP',
  // import_log_data_explanation:
  //   'En la aplicación de la base BEEP Usted puede descargar datos de registro desde la memoria interna de la base BEEP. Cada vez que Usted descargue datos de registro, la memoria interna es desocupada and los datos son cargados a la aplicación BEEP. Abajo está la lista de su registro de datos descargados. Usted puede reemplazar los datos en la base de datos dentro de los archivos de datos descargados haciendo click en el botón ´Chequear datos de registro`. Esto chequeará cuantos datos serán reeemplazados al interior de la base de datos, y si el tiempo de los datos en archivo registro es correcto. Usted recibirá una carpeta de confirmación con la información resultante, y la posibilidad de aplicar o negar el reemplazo.',
  import_log_data_url_text:
    'Aquí Usted puede encontrar el artículo de apoyo sobre descargar datos de registro con la aplicación de la base BEEP.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/es/support/solutions/articles/60000697129-descargar-datos-de-base-de-beep-a-trav%C3%A9s-de-bluetooth',

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
  Brood_temperature: 'Brood presence',
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
  Absolute_value_of_dif: 'Change',
  In_case_of_good_connection_warning:
    '*Immediately after a measurement is received. This is dependent on the data transmission interval and the reliability of the data connection.',
  Alertrule_summary_title: 'Summary',
  Alertrule_settings_title: 'Alert rule settings',
  Alertrule_exclude_title: 'Exclude periods and hives',
  of: 'de',

  alerts_url_text: 'Lea el artículo de soporte sobre alertas',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/es/support/solutions/articles/60000706484-alertas',

  /* New translations v3.0.74 */
  Decline: 'Rechazar',
  Decline_invitation: 'Rechazar invitación',
  Decline_invitation_sure:
    '¿Estás seguro de que deseas rechazar la invitación grupal?',
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
  View_measurements: 'Ver mediciones',
  View_inspection: 'Ver inspección | Ver inspecciones',
  View_alert: 'Ver alerta | Ver alertas',

  Edit_alertrule: 'Editar regla de alerta',
  Edit_hive: 'Editar colmena',
  Edit_queen: 'Editar reina',
  Edit_apiary: 'Editar apiario',
  Edit_group: 'Editar grupo de colaboración',
  Edit_group_short: 'Editar grupo',
  Edit_checklist: 'Editar lista de verificación',
  Edit_devices: 'Editar dispositivos',
  Edit_consent: 'Editar consentimiento',
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
  Day: 'Día | Días',
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
