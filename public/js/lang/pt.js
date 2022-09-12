/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl)
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthsShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  Today: 'Hoje',
  Clear: 'Limpar',
  Close: 'Fechar',
  firstDay: 1,
  format: 'dddd d mmmm yyyy',

  /* main */
  Website: 'Site da internet',
  Feedback: 'Comentários',
  Feedback_mail_header: 'Comentários da aplicação BEEP',
  Feedback_mail_body:
    'Cara fundação BEEP,%0D%0A%0D%0ADeixo abaixo os meus comentários sobre a aplicação BEEP.%0D%0A%0D%0AEncontrei isto:%0D%0A%0D%0AMesmo antes de isto acontecer, fiz o seguinte:%0D%0A%0D%0AO monitor estava assim (por favor inclua uma captura de ecrã):%0D%0A%0D%0A%0D%0A%0D%0A',
  Diagnostic_info:
    'Informação de diagnóstico (no caso de um bug/problema):%0D%0A',
  back: 'Para trás',
  menu: 'Menu',
  lighting: 'Iluminação',
  camera: 'Câmera',
  weather: 'Tempo',
  sensors: 'Sensores',
  no_valid_authentication: 'Nenhuns dados de autenticação recebidos',
  succesfully_saved: 'Salvo com sucesso',

  switch_language: 'Trocar linguagem',
  Delete: 'Apagar',
  Search: 'Procurar...',

  /* user error messages */
  User: 'Utilizador',
  User_data: 'Dados de utilizador',
  user_data: 'dados de utilizador ',
  updated: 'atualizado',
  delete_complete_account:
    'Tem a certeza que quer apagar a sua conta por completo, incluindo todos os apiários, colmeias e inspeções? Esta ação é irrecuperável.',
  username_is_required: 'Por favor introduza o seu nome de usuário',
  username_already_exists: 'Nome de usuário já existe',
  password_is_required: 'Por favor introduza uma senha',
  email_is_required: 'Por favor introduza um email válido',
  email_already_exists: 'Este email já está a ser utilizado',
  policy_accepted_is_required:
    'Precisa de aceitar os termos de serviço para se poder registar',

  already_registered: 'Já estou registado',
  invalid_user: 'Usuário desconhecido ou senha errada',
  no_password_match: 'As senhas não coincidem',
  invalid_token: 'Código inválido',

  no_valid_email: 'Email inválido',

  empty_fields: 'Por favor preencha todos os campos',
  match_passwords: 'As passwords não coincidem',

  succesfully_registered: 'Foi registado com sucesso.',
  authentication_failed: 'Erro de autenticação',

  no_valid_input_received:
    'Os dados não puderam ser salvos, nenhuma entrada válida recebida.',

  remove_all_settings: 'Remover todas as configurações',
  remove_apiary: 'Remover apiário',
  remove_hive: 'Remover colmeia',
  remove_inspection: 'Remover inspeção',

  Error: 'Erro | Erros',
  Warning: 'Aviso',
  first_remove_hives:
    'Atenção: ainda há colmeias neste apiário. Pode salvar colmeias específicas (e suas inspeções) movendo-as primeiro para outro apiário. Se continuar com a eliminação, excluirá TODAS as colmeias e inspeções presentes neste local.',

  Date: 'Data',
  ok: 'Ok',
  prev: 'anterior',
  next: 'Próximo',
  add: 'Adicionar',
  Cancel: 'Cancelar',

  /* login */
  login_title: 'Login',
  login: 'Login',
  back_to_login: 'Regressar ao login',
  forgot_password: 'Esqueceu-se da sua senha?',

  username: 'Nome de usuário',
  password: 'Password',
  confirm_password: 'Confirmar senha',
  email: 'Email',
  token: 'Código',

  create_login_question: 'Ainda não tem conta? Registe-se como novo usuário',
  create_login: 'Registo como novo usuário',
  create_login_summary: 'Criar uma nova conta de usuário',
  save: 'Salvar',
  save_and_return: 'Salvar e regressar',

  logout: 'Sair',
  logout_title: 'Sair como ',
  logout_now: 'Quer mesmo sair agora?',
  member_since: 'A usar o BEEP desde',

  /* password recovery */
  password_recovery_title: ' Esqueceu-se da sua senha?',
  password_recovery_remembered: 'Oh, lembrei-me agora da minha senha!',
  password_recovery_user: 'Informação de usuário',
  password_recovery_send_mail: 'Enviar código de verificação',
  password_recovery_code_not_received:
    'Código de verificação não recebido no espaço de 5 minutos? ',
  password_recovery_enter_code:
    'Já tem um código de verificação? Coloque-o aqui',
  password_recovery_reset_title: 'Insira nova senha',
  password_recovery_reset_password: 'Alterar senha',
  password_recovery_reminder_success:
    ' Foi enviado um email. Clique no link do seu email para redefinir sua senha para esta conta.',
  password_recovery_reminder_summary:
    ' Insira o seu endereço de email. Receberá um email com um link para alterar sua senha na próxima etapa.',

  password_recovery_reset_summary:
    'Use o código que recebeu para definir uma nova senha para a sua conta',
  password_recovery_reset_success:
    'A sua senha foi alterada com sucesso e está logado.',

  new_password: 'Nova senha',
  confirm_new_password: 'Confirmar nova senha',

  go_to_dashboard: 'Ir para o meu painel',

  /* overview */
  overview_title: 'Visão global',
  overview: 'Visão global',
  color: 'Cor',
  state: 'On/off',
  connection_state: 'Estado da conexão',

  /* hives */
  locations_title: 'BEEP',
  hives_title: 'BEEP',
  Hive: 'Colmeia | Colmeias',
  hive: 'colmeia | colmeias',
  Location: 'Apiário | Apiários',
  location: 'apiário | apiários',
  Name: 'Nome',
  name: 'nome',
  Type: 'Tipo',
  type: 'tipo',
  Layer: 'Alça',
  layer: 'alça',
  brood: 'Criação',
  honey: 'Mel',
  inspect: 'Inspecionar',
  inspection: 'inspeção | inspeções',
  Inspection: 'Inspeção | Inspeções',
  New_inspection: 'Nova inspeção',
  Edit_inspection: 'Editar inspeção',
  Action: 'Ação | Ações',
  Conditions: 'Condições (inspecionada)',
  edit: 'Edição',
  Hive_layer_amount: 'Quantidade de alças',
  Bee_race: 'Raça de abelha',
  Birth_date: 'Data de nascimento',
  Color: 'Cor',
  Queen_colored: 'Rainha com cor',
  Queen_clipped: 'Rainha com asa cortada',
  Queen_fertilized: 'Rainha fertilizada',
  Age: 'Idade',
  years_old: 'anos',

  /* Hive check items */
  Date_of_inspection: 'Data de inspeção',
  action: 'Ação',
  reminder: 'Lembrete',
  remind_date: 'Data de notificação',

  overall: 'No geral',
  positive_impression: 'Impressão total',
  needs_attention: 'Precisa de atenção',
  notes: 'Notas',
  notes_for_next_inspection:
    'Nota curta para a próxima inspecção (visível na visão global)',
  Not_implemented_yet: ' Este item ainda não foi implementado',
  save_input_first: ' Deseja salvar a sua entrada primeiro?',

  /* dashboard */
  dashboard_title: 'Painel de controlo',
  dashboard: 'Painel de controlo',
  measurementsError:
    'Não é possível carregar medições, verificar ligação à internet',
  last_measurement: 'Última medição',
  at: 'em',
  measurement_system: 'Sistema de medição BEEP',
  no_data: 'Sem dados disponíveis',
  no_chart_data: 'Nenhum dado do gráfico para o período selecionado',

  /* settings */
  General: 'Geral',
  Place: 'Localização',
  Country: 'País',
  City: 'Cidade',
  Address: 'Morada',
  latitude: 'Latitude',
  Longitude: 'Longitude',
  Street: 'Rua',
  Number: 'Número',
  Postal_code: 'Código Postal',
  Description: 'Descrição',
  Hive_settings: 'Configurações da colmeia',
  Hive_amount: 'Quantidade de colmeias nesta localização',
  Hive_prefix: 'Prefixo do nome da colmeia (antes do número)',
  Hive_number_offset: 'Número de colmeias inciais',
  Hive_type: 'Tipo de colmeias',
  Hive_layers: 'Alças da colmeia',
  Hive_frames: 'Quadros por alça',
  Hive_color: 'Cor da colmeia',
  Queen: 'Rainha',
  queen: 'rainha',

  settings_title: 'Definições',
  settings_description: 'Definições dos sensores',
  Settings: 'Definições',
  settings: 'definições',

  sensors_title: 'Definições do sensor',
  sensors_description: 'Estado dos sensores e registo',
  //   sensors: 'Sensores',
  sensor: 'Device',

  Select: 'Selecionar',
  Not_selected: 'Não selecionado',
  Poor: 'Pobre',
  Fair: 'Razoável',
  Average: 'Média',
  Average_slider: 'Médio',
  Good: 'Bom',
  Excellent: 'Excelente',
  Low: 'Baixo',
  Medium: 'Médio',
  High: 'Alto',
  Extreme: 'Extremo',

  /* colors */
  select_color: 'Selecionar uma cor',
  advanced: 'Avançado',

  /* sensors */
  Select_sensor: 'Selecionar um sensor',
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
  light: 'Luz solar',
  l: 'Luz solar',
  water: 'Água',
  w: 'Peso (antigo)',
  humidity: 'Humidade',
  h: 'Humidade',
  air_pressure: 'Pressão atmosférica',
  p: 'Pressão atmosférica',
  weight: 'Peso',
  w_v: 'Sensor de peso valor de todos os sensores',
  w_fl: 'Sensor de peso valor frente esquerda',
  w_fr: 'Sensor de peso valor frente direita',
  w_bl: 'Sensor de peso valor trás esquerda',
  w_br: 'Sensor de peso valor trás direita',
  weight_kg: 'Peso',
  weight_kg_corrected: 'Peso (corr)',
  weight_combined_kg: 'Peso combi',
  bat_volt: 'Bateria',
  bv: 'Bateria',
  sound_fanning_4days: 'Ventilação 4d abelhas',
  s_fan_4: 'Ventilação 4d abelhas',
  sound_fanning_6days: 'Ventilação 6d abelhas',
  s_fan_6: 'Ventilação 6d abelhas',
  sound_fanning_9days: 'Ventilação 9d abelhas',
  s_fan_9: 'Ventilação 9d abelhas',
  sound_flying_adult: 'Abelhas em voo',
  s_fly_a: 'Abelhas em voo',
  sound_total: 'Som total',
  s_tot: 'Som total',
  s_spl: 'Som total',
  bee_count_in: 'Contagem de abelhas dentro',
  bc_i: 'Contagem de abelhas dentro',
  bee_count_out: 'Contagem de abelhas fora',
  bc_o: 'Contagem de abelhas fora',
  t_i: 'Temp. dentro',
  rssi: 'Força do sinal',
  snr: 'Ruido do sinal',
  lat: 'Latitude',
  lon: 'Longitude',
  Sound_measurements: 'Medições de som',
  Sensor_info: 'Informação do sensor',
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
  Hour: 'Hora',
  hour: 'hora | horas',
  day: 'dia | dias',
  week: 'Semana',
  month: 'Mês',
  year: 'Ano',

  /* settings */
  could_not_load_settings: 'Não foi possível carregar as configurações',
  offline: 'Sem coneção',
  remote: 'Remota',
  connected: 'Direta',

  yes: 'Sim',
  no: 'Não',

  footer_text: 'Apicultura em código aberto',
  beep_foundation: 'A fundação BEEP',

  Checklist: 'Lista de verificação | Listas de verificação',
  checklist: 'lista de verificação | listas de verificação',
  Checklist_items: 'Itens da lista de verificação',
  edit_hive_checklist:
    'Marque/desmarque as caixas na lista abaixo para adicionar/remover itens da sua lista de verificação da colmeia. Também pode desdobrar/dobrar e arrastar/soltar os itens para reordená-los ao seu próprio estilo.',

  /* user */
  Data_export: 'Exportação de dados',
  Export_your_data:
    'Exportar todos os dados que estão na sua conta BEEP e enviar um email contendo os dados como um ficheiro Excel. O ficheiro Excel possui seções diferentes que contêm os seus dados pessoais, das colmeias, de localização e de inspeção.',

  Terms_of_use: 'Termos de serviço',
  accept_policy:
    'Aceito os termos de serviço do BEEP, compatíveis com a nova lei de privacidade europeia',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  approve_policy: 'Você ainda não cumpriu com os últimos termos de serviço.',

  /* General items */
  server_down:
    'A app está indisponível devido a trabalhos de manutenção. Tente novamente mais tarde',
  add_to_calendar: 'Adicionar ao calendário',
  sort_on: 'Classificar em',
  Whats_new: 'Novo!',
  Manual: 'Manual',

  Site_title: 'BEEP | Monitorização de abelhas',

  could_not_create_user:
    'O usuário não pode ser criado neste momento. Desculpe pelo transtorno, tente novamente mais tarde.',
  email_verified: 'O seu endereço de email foi verificado.',
  email_not_verified: 'O seu endereço de email ainda não foi verificado.',
  email_new_verification:
    ' Clique neste link para enviar um novo email de verificação.',
  email_verification_sent:
    'Uma mensagem com um link de verificação foi enviada para o seu endereço de email. Clique no link do email para ativar sua conta e fazer login.',
  email_verification_resent:
    'Uma nova mensagem com um link de verificação foi enviada para o seu endereço de email. Clique no link do email para ativar sua conta e fazer login.',

  not_filled: 'é obrigatório, mas não está preenchido',
  cannot_deselect:
    'Não foi possível remover este item, pois contém um item obrigatório',
  Undelete: 'Não apagar',
  the_field: 'O',
  is_required: 'é obrigatório',

  No_groups: 'Nenhum grupo disponível',
  not_available_yet: 'ainda não disponível. Por favor, crie o primeiro aqui.',
  Users: 'Usuários',
  member: 'membro do grupo | membros do grupo',
  Member: 'Membro do grupo | Membros do grupo',
  Invite: 'Convidar',
  Invited: 'Convidado',
  Invitation: 'Convite | Convites',
  Admin: 'Administrador',
  Creator: 'Proprietário do grupo',
  Collaborate: 'Colaborar',
  Group: 'Grupo de colaboração | Grupos de colaboração',
  group: 'grupo de colaboração | grupos de colaboração',
  group_short: 'grupo | grupos',
  to_share:
    'para partilhar com este grupo. 1 clique = os membros do grupo apenas podem visualizar, 2 cliques = os membros do grupo podem editar',
  Invitation_accepted: 'Convite aceite',
  Accept: 'Aceitar',
  My_shared: 'Minha partilha',
  invitee_name: 'Nome do convidado',
  Remove_group:
    'Tem a certeza de que deseja remover completamente este grupo de partilha para todos os seus membros ',
  Detach_from_group: 'Remova-me e às minhas colmeias deste grupo',
  my_hive: 'Minha colmeia',
  created: 'criada',
  group_detached: 'Deixou o grupo com sucesso',
  group_activated: 'Convite para o grupo aceite',
  group_declined: 'Convite para o grupo recusado',
  group_explanation_1:
    '1. Crie um novo grupo de cooperação com um título claro e uma descrição opcional',
  group_explanation_2:
    '2. Convide outros usuários do BEEP através do seu endereço de email do BEEP',
  group_explanation_3:
    '3. Compartilhar colmeias específicas para serem vistas por outras pessoas, ou para cooperar',
  Filter_and_sort_on: 'Filtrar e classificar:',

  /* TO BE TRANSLATED */
  /* New translations v2.2.0 */
  roofed: 'O apiário tem um telhado?',
  info: 'Info',
  research: 'Investigação',
  start_date: 'Data inicial',
  end_date: 'Data final',
  purpose: 'Objectivo da investigação',
  institution: 'Instituição de investigação',
  type_of_data_used: 'Uso de dados',
  link: 'Ligação',
  Consent: 'Consentimento',
  history: 'história',
  Current_consent: 'Consentimento atual',
  consent_yes: 'Eu aceito partilhar os meus dados',
  consent_no: 'Eu NÃO aceito partilhar os meus dados',
  my_beep_data: 'Os meus dados BEEP',
  Consent_can_only_be_set: 'O consentimento só pode ser ajustado para',
  earlier: 'uma anterior',
  later: 'uma posterior',
  new_apiary_explanation: 'Crie um novo apiário em 4 etapas',
  start_here: 'Clique aqui para começar',
  optional: 'opcional',
  dimensions: 'dimensões',
  details: 'detalhes',
  configuration: 'configuração',
  adjustments: 'ajustes',
  changes_queen_color: 'edição altera a cor',
  Brood_box_and_frame: 'Ninho e quadro',
  Hive_order: 'Ordem das colmeias no apiário',
  bb_width_cm: 'Largura do ninho (cm)',
  bb_height_cm: 'Altura do ninho (cm)',
  bb_depth_cm: 'Profundidade do ninho (cm)',
  fr_width_cm: 'Largura do quadro (cm)',
  fr_height_cm: 'Altura do quadro (cm)',
  queen_line: 'linha',
  queen_tree: 'árvore',
  queen_description: 'notas',
  Hive_short: 'Colmeia | Colmeias',
  Image: 'Imagem | Imagens',
  Size: 'Tamanho',
  preview: 'antevisão',
  Inside: 'Medidas internas',
  Offset: 'Alinhamento',
  Multiplier: 'Multiplicador',
  Input: 'Entrada',
  Output: 'Saída',
  Last: 'Último',
  Export_sensor_data:
    "Exportar todos os dados por dispositivo, como um arquivo .csv na resolução mais alta possível, que pode abrir no Excel ou SPSS. NB: Os dados de data e hora na coluna 'hora' estão em hora GMT, formatados pela data-tempo padrão RFC 3339.",
  CSV_export_separator: 'Separador de coluna de dados CSV',
  Selected_date: 'Intervalo temporal selecionado',
  Sensor_measurements: 'Medições do sensor',
  too_much_data:
    'Demasiados dados para processar, por favor selecione menos medições do Sensor ou reduza o intervalo de tempo entre a data de início e de fim.',
  beep_base_explanation:
    "Se tiver uma base BEEP (conforme imagem acima), por favor use a aplicação da base BEEP (iOS e Android) para configurar a comunicação com esta aplicação. Se ainda não tem uma base BEEP, clique no item de menu 'website BEEP' para atualizações sobre como obter uma base BEEP. Se tiver o seu próprio dispositivo de medição e gostaria de ver os dados na aplicação BEEP, envie-nos uma mensagem pedindo para se juntar à nossa comunidade no Slack e poderá obter acesso à descrição da API.",
  sample_code_hive:
    'Selecione primeiro uma colmeia para gerar um código de amostra único',
  sample_code_generate: 'Gerar um código de amostra único',
  sample_code_delete: 'Apagar Código de amostra único',
  measurement_interval: 'intervalo',
  from_weather_service: 'do serviço meteorológico',

  /* New translations v3 */
  click_hives_to_filter: 'Clique nas seções para filtrar',
  for: 'para',
  last_visit: 'Última visita',
  apiary_details: 'Detalhes do apiário',
  group_details: 'Detalhes do grupo',
  diary: 'Diário',
  data: 'Dados',
  photo: 'foto | fotos',
  add_checklist: 'Adicionar lista de verificação',
  add_hive: 'Adicionar colmeia',
  delete_apiary: 'Excluir apiário',
  edit_apiary: 'Editar apiário',
  new_apiary: 'Novo apiário',
  delete_group: 'Excluir grupo',
  edit_group: 'Editar grupo',
  new_group: 'Novo grupo',
  verification_code: 'código de verificação',
  limit_exceeded: 'O limite foi atingido, tente novamente mais tarde',
  confirm_email_title: 'Confirme o seu email',
  confirm_email_summary:
    'Recebeu um código de verificação no seu email. Digite-o abaixo para verificar o seu endereço de email',
  confirm: 'Confirmar',
  Profile: 'Perfil',
  Checklist_template:
    'Modelo da lista de verificação | Modelos da lista de verificação',
  Help: 'Ajuda',
  Privacy: 'Privacidade',
  FAQ: 'FAQ',
  Support: 'Apoio',
  no_inspections: 'Ainda sem inspeções',
  no_results: 'Sem resultados',
  Hive_brood_layer: 'Alça de criação | Alças de criação',
  Hive_honey_layer: 'Alça de mel | Alças de mel',
  Hive_queen_excluder_layer: 'Excluidora de rainha | Excluidoras de rainha',
  Hive_feeding_box_layer: 'Caixa de alimentação | Caixas de alimentação',
  overrides_layer_colors: 'substitui as cores das camadas',
  drag_layers: 'Arraste as camadas para configurar a colmeia',
  page: 'página | páginas',
  Page: 'Página | Páginas',
  not_found: 'não encontrado',
  sorry: 'Desculpe',
  delete_layer: 'Apagar camada',
  not_saved_error: 'Os dados não puderam ser salvos',
  something_wrong: 'Algo correu mal',
  not_editable: 'não editável',
  unsaved_changes: 'Alterações não guardadas',
  save_changes:
    'Tem a certeza que quer sair desta página? Quaisquer alterações não guardadas serão perdidas.',
  no_apiaries_yet: 'Ainda não tem quaisquer apiários',
  need_help: 'Precisa de ajuda?',
  Apiary_color: 'Cor do apiário',
  Set_notification_date: 'Definir data de notificação',
  remove_image: 'Remover imagem',
  Total_colony_size: 'Tamanho total da colónia',
  bee: 'abelha | abelhas',
  with_bees: 'com abelhas',
  change_checklist_confirm:
    'Tem a certeza que quer selecionar uma lista de verificação diferente? Serão mantidos os valores já inseridos nos campos',
  view: 'Ver',
  share: 'Partilhar',
  edit_details: 'Editar detalhes',
  remove_queen: 'Remover a rainha',
  remove_group_short: 'Remover grupo de colaboração',
  device: 'Aparelho | Aparelhos',
  click_date_to_edit: 'Clicar na data para editar.',
  accept_policy_1: 'Aceito os ',
  accept_policy_2:
    ' do BEEP, compatíveis com a nova lei de privacidade europeia',
  terms_of_use: 'termos de serviço',
  invalid_password:
    'A password deve conter pelo menos 8 caracteres, incluindo pelo menos: uma letra minúscula, uma letra maiúscula, um número e um caracter especial (\\]{}()?\\-"!@#%&/\\,><\':|_~`)',
  sensor_definition: 'definição do sensor | definições do sensor',
  measurement: 'medição | medições',
  remove_device: 'Remover aparelho',
  last_message_received: 'Última mensagem recebida',
  transmission_ratio: 'Taxa de transmissão',
  period: 'Período',
  download: 'Download',
  different_end_start: 'As datas de fim e de início têm de ser diferentes',
  later_end_start: 'A data de início tem de ser anterior à data de fim',
  new_email_verification_sent:
    'Foi enviada para o seu novo endereço de email uma mensagem com uma ligação de verificação. Clique nessa ligação, no email, para confirmar o seu novo endereço de email e conectar-se.',
  sensordef_info:
    "Uma definição de sensor destina-se a converter um valor do sensor, a partir de um valor de entrada 'em bruto' no sensor, num valor de acordo com uma quantidade física e unidade (por exemplo, w_v = 1098273 => peso_kg = 62.400 kg) ou para calibrar um sensor (por exemplo, t_0 = 15,3 ° C => t_0 = 15,8 ° C). Isto pode ser feito definindo um 'alinhamento' e um 'multiplicador'. Os valores de entrada e saída permanecem os mesmos se o alinhamento '0' e o multiplicador '1' forem definidos. A aplicação base BEEP (da App Store) fornecerá as definições de sensor corretas na configuração inicial da sua base BEEP.",
  or: 'ou',
  select_all_hives: 'Selecionar todas as colmeias',
  select_all_editable_hives: 'Selecione todas as colmeias personalizáveis',
  Alert: 'Alerta | Alertas',
  alert: 'alerta | alertas',
  remove_alert: 'Remover alerta',
  alerts_enabled: 'Alerta ativado',
  alerts_disabled: 'Alerta desativado',
  edit_checklist_confirm:
    'Tem a certeza que quer editar a lista de verificação? Quaisquer alterações não guardadas à sua inspeção serão perdidas',
  edit_checklist_confirm_deselectedhives:
    'Tem a certeza que quer editar a lista de verificação? Quaisquer alterações não guardadas à sua inspeção e à sua colmeia serão perdidas',
  user_not_edited:
    'Os dados do utilizador não foram editados. Possivelmente os dados do utilizador são idênticos aos dados do utilizador já existentes no banco de dados, ou um ou mais campos não estão corretamente preenchidos. Verifique seus dados e tente novamente.',
  user_not_deleted: 'Algo correu mal, o utilizador não foi apagado',
  research_consent: 'Consentimento de investigação',
  checklist_types: 'Pessoal, partilhado, investigação',
  edit_hive_checklist_no_touch:
    'Marque/desmarque as caixas na lista abaixo para adicionar/remover itens da lista de verificação da colmeia. Também pode desagrupar/agrupar e arrastar/soltar os itens para reordená-los ao seu próprio estilo (N.B. isso não é possível num dispositivo com tela sensível ao toque).',
  edit_hive_checklist_touch:
    'Marque/desmarque as caixas na lista abaixo para adicionar/remover itens da lista de verificação da colmeia. Alterar a ordem dos itens só é possível num computador.',
  input_not_possible_for_bulkinspection:
    'Este item não está disponível quando várias colmeias são selecionadas para uma inspeção, pois só pode ser preenchido por cada colmeia (individualmente). Posteriormente é possível preencher este item para uma única colmeia, através da edição da inspeção para essa colmeia.',
  save_bulkinspection_confirm:
    'Tem a certeza que quer salvar esta inspeção para múltiplas colmeias ao mesmo tempo?',
  deleted_but_not_saved_devices_warning:
    "N.B. os aparelhos serão apenas removidos após clicar no botão 'Salvar e apagar', no canto superior direito",
  no_alerts: 'Sem novos alertas',
  alertrule: 'regra de alerta | regras de alerta',
  Alertrule: 'Regra de alerta | Regras de alerta',
  Measurement: 'Medição | Medições',
  Calculation: 'Cálculo',
  calculation: 'cálculo',
  Alert_on_occurences: 'Quando quer receber este alerta?',
  Alert_on_occurences_hint:
    'Diretamente ou apenas após ter ocorrido um número x de vezes?',
  Direct: 'Diretamente',
  After: 'Após',
  times: 'vezes',
  Comparator: 'Comparador',
  comparator: 'comparador',
  Comparison: 'Comparação',
  comparison: 'comparação',
  Threshold_value: 'Valor limite',
  Minimum: 'Mínimo',
  Maximum: 'Máximo',
  Derivative: 'Derivado (aumento ou diminuição)',
  Count: 'Contagem',
  Value: 'Valor',
  Difference: 'Diferença',
  Absolute_value: 'Valor absoluto',
  Absolute_value_of_dif_explanation: '**Valor absoluto da diferença',
  Exclude_months:
    '<strong>Desativar</strong> este alerta durante os seguintes meses:',
  Exclude_hours:
    '<strong>Desativar</strong> este alerta durante as seguintes horas:',
  Exclude_hives:
    '<strong>Desativar</strong> este alerta para as seguintes colmeias:',
  Exclude_hives_details:
    'N.B. Por defeito, este alerta será executado para todas as colmeias que tenham um aparelho de medição',
  months: 'meses',
  hours: 'horas',
  delete_alertrule: 'Apagar regra de alerta',
  Active: 'Ativo',
  Alert_via_email: 'Alerta via email',
  Webhook_url: 'url webhook (gancho web)',
  this_field: 'Este campo',
  alertrule_default: 'Regra de alerta padrão | Regras de alerta padrão',
  copy: 'Copiar',
  Home: 'Início',
  Select_default_alertrule: 'Copiar regra de alerta padrão',
  /* below, please keep all terms between [] in english: */
  alertrule_main_sentence:
    'Desejo receber um alerta se [calculation] [comparison] de [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Este cálculo será executado [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', e gostaria de receber o alerta diretamente',
  alertrule_occurences_indirect_sentence:
    ', mas gostaria de receber o alerta apenas se ocorrer [alert_on_occurences] vezes.',
  alertrule_exclude_months_sentence:
    'Este alerta será desativado durante os seguintes meses: [exclude_months].',
  alertrule_exclude_hours_sentence:
    'Este alerta será desativado durante as seguintes horas: [exclude_hours].',
  alertrule_exclude_hives_sentence:
    'Este alerta será desativado para as seguintes colmeias: [exclude_hive_ids].',
  min: 'mínimo',
  max: 'máximo',
  ave: 'média',
  der: 'derivada',
  cnt: 'contagem',
  equal_to: 'é igual a',
  less_than: 'é menor que',
  greater_than: 'é maior que',
  less_than_or_equal: 'é menor que ou igual a',
  greater_than_or_equal: 'é maior que ou igual a',
  alertrule_not_active:
    "Este alerta foi desativado. Pode ativá-lo clicando na caixa 'Ativo', e salvando esta regra de alerta.",
  export_email_sent: 'Foi enviado um email com o ficheiro Excel',
  excel_file_saved: 'O ficheiro Excel foi salvo na sua pasta de Downloads',
  Updated_at: 'Atualizado a',
  Not_yet_saved: 'Ainda não foi salvo',
  add_own_device: 'Adicionar aparelho próprio',
  devices_info_text:
    'Atenção: você possui uma base BEEP? Use a aplicação base BEEP para adicionar o seu aparelho. Ele aparecerá automaticamente na lista abaixo.',
  devices_url_text:
    'Aqui pode encontrar mais informação sobre a aplicação base BEEP',
  alert_explanation_1:
    'Se você possui uma base BEEP ou outro aparelho, pode definir alertas de modo a receber um alerta quando os dados de medição corresponderem a certos requisitos. Por exemplo, uma queda repentina de peso por causa de enxameação. Os alertas serão mostrados nesta aplicação, mas pode optar por recebê-los por email também.',
  alert_explanation_2:
    'Para que possa começar, note que existem algumas regras de alerta padrão que pode usar (e adaptar às suas próprias necessidades). Além disso, pode criar suas próprias regras de alerta.',
  alertrules_url_text:
    "Vá a 'Definições de alerta', para criar a sua primeira regra de alerta",
  Apiary_management: 'Gestão do apiário',
  Move: 'Mover',
  Current_apiary: 'Apiário atual',
  sensor_key: 'Identificador único do aparelho',
  disabled_settings: 'A edição manual destas definições está desativada',
  Address_placeholder: 'Número, Rua, Cidade',
  first_create_apiary: 'Primeiro, crie um apiário',
  Unknown: 'Desconhecido',
  unknown: 'desconhecido',
  research_warning:
    'Atenção: se não recebeu o convite para participar, não é necessário dar consentimento para a partilha dos seus dados, visto que neste caso os seus dados não serão utilizados.',
  research_explanation_p1:
    'A plataforma BEEP é usada nos projetos de investigação listados abaixo. Depois de ser convidado a participar num projeto de investigação, é necessário que dê consentimento para que os investigadores acedam aos seus dados apícolas.',
  research_explanation_p2:
    'Pode retirar seu consentimento a qualquer momento. A partir desse momento, nenhum novo dado será compartilhado. Os dados que você compartilhou no período para o qual deu consentimento permanecerão disponíveis para investigação. Em caso de dúvidas, encaminhe-as para a pessoa de contato do seu projeto de investigação.',
  research_info:
    'Antes de consentir reveja a descrição da investigação, fornecida através do link abaixo, e solicite detalhes adicionais, se necessário.',
  save_and_delete: 'Salvar e apagar',
  drag_layers_info_text:
    'Arraste as camadas do lado esquerdo para a posição desejada dentro da colmeia, no lado direito. Exclua uma camada da seção clicando nela e, em seguida, clicando no ícone de lixo vermelho. Dentro da colmeia, as camadas também podem ser arrastadas para editar a posição a cor da camada pode ser editada clicando na camada.',
  New_hive: 'Nova colmeia',
  New_alertrule: 'Nova regra de alerta',
  Add_alertrule: 'Adicionar regra de alerta',
  Add_apiary: 'Adicionar apiário',
  Add_sensor_definition: 'Adicionar definição de sensor',
  Add_member: 'Adicionar membro',
  alert_rule_deleted: 'Regra de alerta foi eliminada',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'Nota: as definições do sensor só serão guardadas ou adicionadas depois de selecionar o ícone de verificação verde no final da linha de definição do sensor, na tabela.',
  delete_sensordef: 'Eliminar definição do sensor',
  delete_all_alerts: 'Eliminar todos os alertas',
  delete_all_alerts_warning:
    'Tem a certeza que pretende eliminar todos os alertas? Esta ação não poderá ser desfeita.',
  delete_all_alerts_warning_filter_active:
    'Tem a certeza que pretende eliminar todos os alertas? Alertas que não correspondem ao seu termo de pesquisa serão igualmente eliminados. Esta ação não poderá ser desfeita.',
  delete_selected_alert: 'Delete selected alert | Delete selected alerts', // to be translated
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.', // to be translated
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.', // to be translated
  already_verified:
    'Verifiquei o meu endereço de email e gostaria de fazer login',
  password_recovery_resend_mail: 'Enviar novo código de verificação.',
  alert_rule_created: 'Foi criada uma nova regra de alerta',
  select_all: 'Selecionar tudo.',
  During: 'Durante',
  Calculation_minutes:
    'Com que frequência gostaria que o cálculo fosse executado?',
  Every: 'A cada ',
  Calculation_minutes_short: 'Com que frequência é calculado?',
  Alert_on_occurences_short: 'Quando recebe o alerta?',
  Disable_alert_for_this_hive: 'Desativar alerta para esta colmeia.',
  Alert_disabled_for_this_hive: 'Alerta está desativado para esta colmeia.',
  disabled_for_hive: 'foi desativado para a colmeia',
  Alert_disabled: 'Alerta inativo',

  /* For import page */
  Log_data_import: 'Importar dados registados',
  Log_files: 'Ficheiros de registo',
  Upload_date: 'Data do upload',
  Messages: 'Mensagens',
  Log_time: 'Tempo registado',
  File_size: 'Tamanho do ficheiro',
  check_log_data: 'Verificar dados registados',
  delete_log_file: 'Eliminar ficheiro de registo',
  commit_log_data_short: 'Importar dados registados',
  commit_log_data:
    'Importar dados deste ficheiro de registo para a aplicação BEEP',
  // import_log_data_explanation:
  //   "Na aplicação da base BEEP pode fazer download dos dados registados a partir da memória interna da base BEEP. Cada vez que fizer download dos dados registados, a memória interna será apagada e será feito o upload dos dados na aplicação BEEP. Abaixo encontra-se a sua lista de download de dados registados. Pode substituir os dados na base de dados pelos dados contidos nos ficheiros de registo descarregados clicando no botão 'Verificar dados registados'. Isto verificará primeiro a quantidade de dados que será substituída na base de dados, e se a hora dos dados no ficheiro de registo se encontra correto. Receberá uma caixa de confirmação com as informações e a possibilidade de aplicar ou rejeitar a substituição.",
  import_log_data_url_text:
    'Aqui poderá encontrar o artigo de suporte em como fazer download dos dados registados com a aplicação da base BEEP',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/pt-PT/support/solutions/articles/60000697129-baixe-os-dados-da-base-do-beep-por-bluetooth',

  Immediately: 'Imediatamente',
  alertrule_active_no_email_sentence:
    ', e eu inicio a aplicação BEEP para ver os alertas.',
  alertrule_active_email_sentence:
    ', e eu recebo os alertas por e-mail. Adicionalmente, eu posso ver os alertas na aplicação BEEP.',
  First_occurence: 'Primeira',
  Last_occurence: 'Ultima',
  // default alert rule names:
  Hive_stability_and_theft: 'Estabilidade da colmeia e roubos',
  Temperature_sensor_defect: 'Temperature sensor defect',
  Battery_low: 'Baixa voltagem de bateria',
  Honey_harvest: 'Colheitade mel',
  Hive_temperature: 'Baixa temperatura da colmeia',
  Brood_temperature: 'Baixa temperatura do ninho',
  No_measurements: 'Sem medições',
  Swarm: 'Enxameamento',
  Food_supply_low: 'Baixas reservas de comida',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Queda do peso da colmeia acima do valor definido',
  Temperature_sensor_malfunctions: 'Mau funcionamento do sensor de temperatura',
  Battery_voltage_is_below_a_set_value:
    'Voltagem de bateria abaixo do valor definido',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'O aumento do peso relacionado com a colheita de néctar estagnou',
  Hive_temperature_drops_below_a_set_value:
    'Queda da temperatura da colmeia para valor abaixo do definido',
  Temperature_in_the_brood_below_a_set_value:
    'Queda da temperatura do ninho para valor abaixo do definido',
  No_measurement_data_received_in_a_set_time_period:
    'Nenhum dado de medição recebido durante um período de tempo definido',
  Sudden_weight_drop_triggers_alert_immediately:
    'Queda súbita do peso da colmeia ativa imediatamente um alerta. Nota: isto é baseado em intervalos de transmissão de dados de 15 minutos. Caso o seu dispositivo tenha um intervalo de transmissão de dados diferente, deverá ajustar o valor do limite de forma adequada.',
  The_hive_weight_is_below_a_set_value:
    'Peso da colmeia abaixo do valor definido',

  minute: 'minuto | minutos',
  upload_interval_warning_single_interval:
    'Nota: o intervalo de transmissão de dados do seu dispositivo é | Nota: o intervalo de transmissão de dados dos seus dispositivos é', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'Nota: os intervalos de transmissão de dados dos seus dispositivos variam entre ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Não é relevante para cálculo imediato',
  Increase: 'Aumento',
  Decrease: 'Diminuição',
  Every_hour: 'A cada hora',
  every_hour: 'a cada hora',
  Absolute_value_of_dif: 'Diferença',
  In_case_of_good_connection_warning:
    '*Imediatamente após uma medição ser recebida. Isto está dependente do intervalo de transmissão de dados e da fiabilidade da conexão de dados.',
  Alertrule_summary_title: 'Resumo',
  Alertrule_settings_title: 'Definições das regras de alerta',
  Alertrule_exclude_title: 'Excluir períodos e colmeias',
  of: 'de',

  alerts_url_text: 'Leia o artigo de suporte sobre alertas',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/pt-PT/support/solutions/articles/60000706484-alertas',

  /* New translations v3.0.74 */
  Decline: 'Recusar',
  Decline_invitation: 'Recusar convite',
  Decline_invitation_sure:
    'Tem certeza de que deseja recusar o convite para o grupo?',
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
    '*N.B. the alert rule will only be active if the selected measurement is measured by your BEEP base / device. BEEP bases do not measure weather data.',
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
  View_measurements: 'Ver medidas',
  View_inspection: 'Ver inspeção | Ver inspeções',
  View_alert: 'Ver alerta | Ver alertas',

  Edit_alertrule: 'Editar regra de alerta',
  Edit_hive: 'Editar colmeia',
  Edit_queen: 'Editar rainha',
  Edit_apiary: 'Editar apiário',
  Edit_group: 'Editar grupo de colaboração',
  Edit_group_short: 'Editar grupo',
  Edit_checklist: 'Editar lista de verificação',
  Edit_devices: 'Editar aparelhos',
  Edit_consent: 'Editar consentimento',
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
  Select_hive: 'Select a hive',
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

  View_alert_confirm: 'Would you like to view the alert "',
}

export default translations
