/*
 * BEEP - Translations - VUE app v3 (Q4 2021)
 * Author: Julia BD (julia@beep.nl) & Tomas Sykora
 *
 */
const translations = {
  /* Date picker */
  monthsFull: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec',
  ],
  monthsShort: [
    'Led',
    'Úno',
    'Bře',
    'Dub',
    'Kvě',
    'Čen',
    'Čec',
    'Srp',
    'Zář',
    'Říj',
    'Lis',
    'Pro',
  ],
  Close: 'Zavřít',

  /* main */
  Website: 'Webová stránka',
  menu: 'Menu',
  weather: 'Počasí',
  sensors: 'Zařízení',

  Delete: 'Smazat',
  Search: 'Hledat...',

  /* user error messages */
  User_data: 'Uživatelská data',
  user_data: 'uživatelská data',
  updated: 'aktualizováno',
  delete_complete_account:
    'Jste si jisti, že chcete smazat celý svůj účet, včetně všech včelínů, úlů a kontrol? Data budou nevratně smazána.',
  username_is_required: 'Zadejte prosím uživatelské jméno',
  username_already_exists: 'Uživatelské jméno již existuje',
  password_is_required: 'Prosím, vložte heslo',
  email_is_required: 'Prosím zadejte emailovou adresu',
  email_already_exists: 'E-mailová adresa se již používá',
  policy_accepted_is_required:
    'Chcete-li se zaregistrovat, musíte přijmout podmínky služby',

  already_registered: 'Jsem již registrován',
  invalid_user: 'Neznámý uživatel nebo špatné heslo',
  no_password_match: 'Hesla se neshodují',
  invalid_token: 'Neplatný kód',

  no_valid_email: 'Neplatná emailová adresa',

  empty_fields: 'Prosím vyplňte všechna políčka',
  match_passwords: 'Hesla se neshodují',

  succesfully_registered: 'Jste úspěšně zaregistrováni.',
  authentication_failed: 'Ověření se nezdařilo',

  remove_apiary: 'Odstranit včelín',
  remove_hive: 'Odstranit úl',
  remove_inspection: 'Odstranit kontrolu',

  Error: 'Error | Errors',
  first_remove_hives:
    'Pozor: na tomto včelíně jsou ještě úly. Konkrétní úly (a jejich kontroly) můžete uložit tak, že je nejprve přesunete na jiný včelín. Pokud budete v mazání pokračovat, smažete VŠECHNY úly a kontroly přítomné na tomto místě.',

  Date: 'Datum',
  ok: 'Ok',
  prev: 'Předchozí',
  next: 'Další',
  add: 'Přidat',
  Cancel: 'Zrušit',

  /* login */
  login_title: 'Přihlásit se',
  login: 'Jméno',
  forgot_password: 'Zapomněli jste heslo?',

  username: 'Uživatelské jméno',
  password: 'Heslo',
  confirm_password: 'Potvrďte heslo',
  email: 'E-mail',

  create_login_question:
    'Ještě nemáte účet? Zaregistrujte se jako nový uživatel',
  create_login: 'Zaregistrujte se jako nový uživatel',
  create_login_summary: 'Vytvořit nový uživatelský účet',
  save: 'Uložit',

  logout: 'Odhlásit se',

  /* password recovery */
  password_recovery_title: 'Zapomněli jste heslo?',
  password_recovery_remembered: 'Aha, teď jsem si znovu vzpomněl na své heslo!',
  password_recovery_send_mail: 'Odeslat ověřovací kód',
  password_recovery_code_not_received: 'Neobdrželi jste kód do 5 minut?',
  password_recovery_enter_code: 'Už máte ověřovací kód? Zadejte jej zde',
  password_recovery_reset_password: 'Změnit heslo',
  password_recovery_reminder_success:
    'E-mail byl odeslán. Kliknutím na odkaz ve vašem e-mailu obnovíte heslo k tomuto účtu.',

  password_recovery_reset_success:
    'Vaše heslo bylo úspěšně změněno a jste přihlášeni.',

  new_password: 'Nové heslo',
  confirm_new_password: 'Potvrďte nové heslo',

  go_to_dashboard: 'Přejít na hlavní stránku',
  color: 'Barva',

  /* hives */
  Hive: 'Úl | Úly',
  hive: 'úl | úly',
  Location: 'Včelín | Včelíny',
  location: 'včelín | včelíny',
  Name: 'Název',
  name: 'název',
  Type: 'Druh',
  type: 'druh',
  inspection: 'kontrola | kontroly',
  Inspection: 'Kontrola | Kontroly',
  New_inspection: 'Nová kontrola',
  Edit_inspection: 'Upravit kontrolu',
  Action: 'Zásah | Zásahy',
  edit: 'Upravit',
  Bee_race: 'Včelí plemeno',
  Birth_date: 'Datum vylíhnutí',
  Queen_colored: 'Barva matky',
  Queen_clipped: 'Zastřižení křídel',
  Queen_fertilized: 'Inseminovaná matka',
  Age: 'Věk',
  years_old: 'let stará',

  /* Hive check items */
  Date_of_inspection: 'Datum kontroly',
  reminder: 'Připomenout',
  remind_date: 'Datum připomenutí',
  overall: 'Závěr',
  positive_impression: 'Celkový dojem',
  needs_attention: 'Vyžaduje pozornost',
  notes: 'Poznámky',
  notes_for_next_inspection:
    'Krátká poznámka pro příští kontrolu (viditelné v přehledu)',
  Not_implemented_yet: 'Tato položka zatím není implementována',

  /* dashboard */
  last_measurement: 'Poslední měření',
  no_data: 'Nejsou k dispozici žádné údaje',
  no_chart_data: 'Žádná data pro vybrané období',

  /* settings */
  General: 'Všeobecné',
  Place: 'Umístění',
  Country: 'Země',
  City: 'Město',
  Address: 'Adresa',
  latitude: 'Zeměpisná šířka',
  Longitude: 'Zeměpisná délka',
  Street: 'Ulice',
  Number: 'č.p.',
  Postal_code: 'PSČ',
  Description: 'Popis',
  Hive_amount: 'Počet úlů',
  Hive_prefix: 'Předpona jména úlu (před číslem)',
  Hive_number_offset: 'Startovní číslo úlu',
  Hive_type: 'Typ úlu',
  Hive_layers: 'Vrstvy úlu',
  Hive_frames: 'Počet rámků v nástavku',
  Hive_color: 'Barva úlu',
  Queen: 'Královka',
  queen: 'královna',

  settings_title: 'Nastavení',
  Settings: 'Nastavení',
  settings: 'nastavení',

  Select: 'Vybrat',
  Poor: 'Chudý',
  Fair: 'Akorát',
  Average: 'Průměrný',
  Average_slider: 'Průměr',
  Good: 'Dobrý',
  Excellent: 'Výborný',
  Low: 'Malý',
  Medium: 'Střední',
  High: 'Vysoký',
  Extreme: 'Extrémní',

  /* colors */
  select_color: 'Vyberte barvu',
  advanced: 'Pokročilý',

  /* sensors */
  Select_sensor: 'Vyberte senzor',
  temperature: 'Teplota',
  t: 'Teplota',
  t_0: 'Teplota 1',
  t_1: 'Teplota 2',
  t_2: 'Teplota 3',
  t_3: 'Teplota 4',
  t_4: 'Teplota 5',
  t_5: 'Teplota 6',
  t_6: 'Teplota 7',
  t_7: 'Teplota 8',
  t_8: 'Teplota 9',
  t_9: 'Teplota 10',
  light: 'Sluneční světlo',
  l: 'Sluneční světlo',
  water: 'Voda',
  w: 'Hmotnost (stará)',
  humidity: 'Vlhkost',
  h: 'Vlhkost',
  air_pressure: 'Tlak',
  p: 'Tlak',
  weight: 'Hmotnost',
  w_v: 'Snímač hmotnosti - všechny snímače',
  w_fl: 'Snímač hmotnosti - levý přední',
  w_fr: 'Snímač hmotnosti - pravý přední',
  w_bl: 'Snímač hmotnosti - levý zadní',
  w_br: 'Snímač hmotnosti - pravý zadní',
  weight_kg: 'Hmotnost',
  weight_kg_corrected: 'Hmotnost (upravená)',
  weight_combined_kg: 'Hmotnost kombinovaná',
  bat_volt: 'Baterie',
  bv: 'Napětí baterie',
  sound_fanning_4days: 'Zvuk včel 4 dny',
  s_fan_4: 'Fan 4d bees',
  sound_fanning_6days: 'Zvuk včel 6 dní',
  s_fan_6: 'Fan 6d bees',
  sound_fanning_9days: 'Zvuk včel 9 dní',
  s_fan_9: 'Fan 9d bees',
  sound_flying_adult: 'Létající včely',
  s_fly_a: 'Létající včely',
  sound_total: 'Celkový zvuk',
  s_tot: 'Celkový zvuk',
  s_spl: 'Hladina akustického tlaku',
  bee_count_in: 'Počítadlo včel - dovnitř',
  bc_i: 'Počítadlo včel - dovnitř',
  bee_count_out: 'Počítadlo včel - ven',
  bc_o: 'Počítadlo včel - ven',
  t_i: 'Teplota uvnitř',
  rssi: 'Síla signálu',
  snr: 'Signální šum',
  lat: 'zeměpisná šířka',
  lon: 'Zeměpisná délka',
  Sound_measurements: 'Měření zvuku',
  Sensor_info: 'Informace o senzoru',
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
  icon: 'Ikona',
  precipIntensity: 'Dešťové srážky',
  precipProbability: 'Pravděpodobnost deště',
  precipType: 'Typ deště',
  outsideTemperature: 'Venkovní teplota',
  apparentTemperature: 'Zdánlivá teplota',
  dewPoint: 'Rosný bod',
  pressure: 'Tlak vzduchu',
  windSpeed: 'Rychlost větru',
  windGust: 'Poryv větru',
  windBearing: 'Větrno',
  cloudCover: 'Oblačno',
  uvIndex: 'UV index',
  visibility: 'Viditelnost',
  ozone: 'Ozón',

  /* Measurements */
  Hour: 'Hodina',
  hour: 'hodina | hodin',
  day: 'den | dny',
  week: 'Týden',
  month: 'Měsíc',
  year: 'Rok',

  /* settings */
  offline: 'Žádné připojení',
  yes: 'Ano',
  no: 'Ne',

  Checklist: 'Kontrolní seznam | Kontrolní seznamy',
  checklist: 'kontrolní seznam | kontrolní seznamy',
  Checklist_items: 'Položky kontrolního seznamu',

  /* user */
  Data_export: 'Export dat',
  Export_your_data:
    'Exportujte všechna data, která jsou na vašem BEEP účtu, a odešlete e-mail obsahující data ve formě Excel souboru NEBO si soubor Excel stáhněte zde. Soubor Excel má různé karty obsahující Vaše osobní data, údaje o úlech, umístění a kontrolách.',
  Email_export: 'Poslat CSV e-mailem',
  Download_csv: 'Stáhnout CSV',
  Open_csv: 'Otevřít CSV',
  Include_group_data: 'Přidat související data skupiny k exportu',
  Include_sensor_data: 'Přidat odkazy na soubory naměřených dat k exportu',

  accept_policy:
    'Přijímám podmínky služby BEEP, které jsou kompatibilní s novým evropským zákonem na ochranu soukromí',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',

  /* General items */
  server_down:
    'Aplikace je nedostupná z důvodu údržby, zkuste to znovu později',
  add_to_calendar: 'Přidat do kalendáře',
  Whats_new: 'Novinka!',
  Site_title: 'BEEP | Bee monitor',
  email_verified: 'Vaše e-mailová adresa byla ověřena.',
  email_not_verified: 'Vaše e-mailová adresa dosud nebyla ověřena.',
  email_new_verification:
    'Kliknutím na tento odkaz odešlete nový ověřovací e-mail.',
  email_verification_sent:
    'Na Vaši e-mailovou adresu byla odeslána zpráva s ověřovacím odkazem. Kliknutím na odkaz v e-mailu aktivujte svůj účet a přihlaste se.',
  email_verification_resent:
    'Na vaši e-mailovou adresu byla odeslána nová zpráva s ověřovacím odkazem. Kliknutím na odkaz v e-mailu aktivujte svůj účet a přihlaste se.',

  not_filled: 'je vyžanováno, ale nebylo vyplněno',
  cannot_deselect:
    'Tuto položku nelze odebrat, protože obsahuje požadovanou položku',
  Undelete: 'Vrátit smazání zpět',
  the_field: 'Údaj',
  is_required: 'je povinný',

  not_available_yet:
    'ještě není dostupný. Kliknutím na tlačítko v pravém horním rohu jeden přidáte.',
  member: 'člen | členové',
  Member: 'Člen skupiny | Členové skupiny',
  Invited: 'Pozván',
  Invitation: 'Pozvánka | Pozvánky',
  Admin: 'Administrátor',
  Creator: 'Vlastník skupiny',
  Group: 'Spolupracující skupina | Spolupracující skupiny',
  group: 'spolupracující skupina | spolupracující skupiny',
  group_short: 'skupina | skupiny',
  to_share:
    'pro sdílení s touto skupinou. 1 kliknutí = členové skupiny mohou pouze prohlížet, 2 kliknutí = členové skupiny mohou upravovat',
  Invitation_accepted: 'Pozvánka přijata',
  Accept: 'Příjmout',
  My_shared: 'Moje sdílené',
  invitee_name: 'Jméno pozvaného',
  Remove_group:
    'Opravdu chcete tuto sdílenou skupinu úplně odstranit pro všechny její členy?',
  Detach_from_group: 'Odebrat mě a mé úly z této skupiny',
  my_hive: 'Mlj úl',
  created: 'vytvořené',
  group_detached: 'Úspěšně jste opustili skupinu',
  group_activated: 'Pozvánka do skupiny byla přijata',
  group_declined: 'Pozvánka do skupiny byla odmítnuta',

  /* New translations v2.2.0 */
  roofed: 'Má včelín střechu?',
  info: 'Info',

  research: 'Výzkum',
  start_date: 'Datum zahájení',
  end_date: 'Datum ukončení',
  institution: 'Výzkumná instituce',
  type_of_data_used: 'Využití dat',
  link: 'Odkaz',
  Consent: 'Souhlas',
  history: 'historie',
  Current_consent: 'Aktuální souhlas',
  consent_yes: 'Souhlasím se sdílením mých dat',
  consent_no: 'NEDÁVÁM souhlas se sdílením mých dat',
  my_beep_data: 'Moje vlastní BEEP data',
  Consent_can_only_be_set: 'Souhlas lze pouze upravit',
  earlier: 'dřívější',
  later: 'pozdější',

  new_apiary_explanation: 'Vytvořte nový včelín ve 4 krocích',
  start_here: 'Začněte kliknutím zde',
  optional: 'volitelný',
  dimensions: 'rozměry',
  details: 'detaily',
  configuration: 'nastavení',
  adjustments: 'úpravy',
  changes_queen_color: 'úprava změní barvu',

  Brood_box_and_frame: 'Nástavek a rámeček',
  Hive_order: 'Objednávka úlu na včelnici',
  bb_width_cm: 'Šířka nástavku (cm)',
  bb_height_cm: 'Výška nástavku (cm)',
  bb_depth_cm: 'Hloubka nástavku (cm)',
  fr_width_cm: 'Šířka rámečku (cm)',
  fr_height_cm: 'Výška rámečku (cm)',
  queen_line: 'linie',
  queen_tree: 'rodokmen',
  queen_description: 'poznámky',
  Hive_short: 'ÚL | Úly',

  Image: 'Obrázek | Obrázky',
  preview: 'náhled',

  Inside: 'Vnitřní míry',
  Offset: 'Offset',
  Multiplier: 'Multiplikátor',
  Input: 'Vstup',
  Output: 'Výstup',
  Last: 'Poslední',

  Export_sensor_data:
    "Exportujte všechna data na zařízení v nejvyšším možném rozlišení jako soubor .csv, který můžete otevřít v Excelu nebo SPSS. Poznámka: Údaje data a času ve sloupci 'čas' jsou v čase GMT, formátovaném podle standardu RFC 3339 datum-čas.",
  CSV_export_separator: 'Oddělovač sloupců dat CSV',
  Sensor_measurements: 'Senzorová měření',
  too_much_data:
    'Příliš mnoho dat ke zpracování, vyberte prosím méně měření nebo zkraťte časové rozpětí mezi počátečním a koncovým datem.',

  beep_base_explanation:
    "Pokud máte základnu BEEP (zobrazeno na obrázku výše), použijte k nastavení komunikace s touto aplikací základní aplikaci BEEP (iOS a Android). Pokud ještě nemáte základnu BEEP, klikněte prosím na položku nabídky 'webová stránka BEEP' pro aktualizace, jak získat základnu BEEP. Pokud máte vlastní měřicí zařízení a chtěli byste vidět data v aplikaci BEEP, pošlete nám prosím zprávu a požádejte o připojení k naší komunitě Slack a můžete získat přístup k popisu API.",

  sample_code_hive: 'Nejprve vyberte úl, abyste vygenerovali jedinečný kód',
  sample_code_generate: 'Vygenerujte jedinečný kód',
  sample_code_delete: 'Smazat jedinečný kód',

  measurement_interval: 'interval',
  from_weather_service: 'z meteorologické služby',

  /* New translations v3 */
  last_visit: 'Poslední návštěva',
  diary: 'Deník',
  data: 'Data',
  photo: 'fotka | fotky',
  add_checklist: 'Přidat kontrolní seznam',
  add_hive: 'Přidat úl',
  edit_apiary: 'Upravit včelín',
  new_apiary: 'Nový včelín',
  edit_group: 'Upravit skupinu pro spolupráci',
  new_group: 'Nová skupina pro spolupráci',
  verification_code: 'ověřovací kód',
  confirm_email_title: 'potvrďte svůj e-mail',
  confirm_email_summary:
    'Na váš e-mail jste obdrželi ověřovací kód. Zadejte jej níže pro ověření vaší e-mailové adresy',
  confirm: 'Potvrdit',
  Profile: 'Profil',
  Checklist_template:
    'Šablona kontrolního seznamu | Šablony kontrolního seznamu',
  Help: 'Help',
  FAQ: 'FAQ',
  Support: 'Podpora',
  no_inspections: 'Přidejte první kontrolu',
  no_results: 'Žádné výsledky',
  Hive_brood_layer: 'Plodiště | Plodiště',
  Hive_honey_layer: 'Medník | Medník',
  Hive_queen_excluder_layer: 'Mateří mřížka | Mateří mřížky',
  Hive_feeding_box_layer: 'Krmítko | Krmítka',
  overrides_layer_colors: 'přepíše barvy vrstev',
  drag_layers: 'Přetažením vrstev nakonfigurujte úl',
  page: 'strana | stránky',
  Page: 'Strana | Stránky',
  not_found: 'nenalezeno',
  sorry: 'Pardon',
  delete_layer: 'Smazat vrstvu',
  not_saved_error: 'Data se nepodařilo uložit',
  something_wrong: 'Něco se pokazilo',
  not_editable: 'nelze upravovat',
  unsaved_changes: 'Neuložené změny',
  save_changes:
    'Opravdu chcete opustit tuto stránku? Všechny neuložené změny budou ztraceny.',
  no_apiaries_yet: 'Zatím nemáte žádné včelíny',
  need_help: 'Potřebujete pomoc?',
  Apiary_color: 'Barva včelínu',
  Set_notification_date: 'Nastavte datum oznámení',
  remove_image: 'Odebrat obrázek',
  Total_colony_size: 'Celková velikost kolonie',
  bee: 'včela | včely',
  change_checklist_confirm:
    'Opravdu chcete vybrat jiný kontrolní seznam? Hodnoty již vyplněných polí zůstanou zachovány.',
  view: 'Zobrazit',
  remove_queen: 'Odebrat královnu',
  remove_group_short: 'Odebrat skupinu pro spolupráci',
  device: 'Zařízení | Zařízení',
  click_date_to_edit: 'Klikněte na datum pro úpravu.',
  accept_policy_1: 'Přijímám BEEP ',
  accept_policy_2:
    ', které jsou kompatibilní s novým evropským právem na ochranu soukromí',
  terms_of_use: 'podmínky užití',
  invalid_password:
    'Heslo musí obsahovat alespoň 8 znaků, jedno malé písmeno, jedno velké písmeno, jedno číslo a jeden speciální znak (\\]{}()?\\-"!@#%&/\\,><\':; |_~`)',
  sensor_definition: 'definice senzoru | definice senzorů',
  measurement: 'měření | měření',
  remove_device: 'Odebrat zařízení',
  last_message_received: 'Poslední přijatá zpráva',
  transmission_ratio: 'Převodový poměr',
  period: 'Období',
  download: 'Stáhnout',
  different_end_start: 'Datum ukončení a zahájení se musí lišit',
  later_end_start: 'Datum zahájení musí být dřívější než datum ukončení',
  new_email_verification_sent:
    'Na vaši novou e-mailovou adresu byla odeslána zpráva s ověřovacím odkazem. Kliknutím na odkaz v e-mailu potvrďte svou novou e-mailovou adresu a přihlaste se.',
  sensordef_info:
    "Definice senzoru je určena k převodu hodnoty senzoru z příchozí „surové“ hodnoty senzoru na hodnotu podle fyzikální veličiny a jednotky (např. w_v = 1098273 => hmotnost_kg = 62 400 kg) nebo ke kalibraci senzoru (např. t_0 = 15,3 °C => t_0 = 15,8 °C). To lze provést nastavením „offsetu“ a „multiplikátoru“. Vstupní a výstupní hodnota zůstává stejná, pokud je nastaven offset '0' a multiplikátor '1'. Základní aplikace BEEP (z App Store) vám poskytne správné definice senzorů při počátečním nastavení vaší základny BEEP.",
  or: 'nebo',
  select_all_hives: 'Vybrat všechny úly',
  select_all_editable_hives: 'Vybrat všechny upravitelné úly',
  Alert: 'Upozornění | Upozornění',
  alert: 'upozornění | upozornění',
  remove_alert: 'Odebrat upozornění',
  alerts_enabled: 'Upozornění povoleno',
  alerts_disabled: 'Upozornšní zakázáno',
  edit_checklist_confirm:
    'Opravdu chcete upravit kontrolní seznam? Jakékoli neuložené změny vaší kontroly budou ztraceny.',
  edit_checklist_confirm_deselectedhives:
    'Opravdu chcete upravit kontrolní seznam? Jakékoli neuložené změny vaší kontroly a vašeho výběru úlu budou ztraceny.',
  user_not_edited:
    'Údaje o uživateli nebyly upraveny. Údaje o uživateli jsou možná totožné s údaji o uživateli, které jsou již v databázi, nebo jedno nebo více polí není správně vyplněno. Zkontrolujte prosím svá data a zkuste to znovu.',
  user_not_deleted: 'Něco se pokazilo, uživatel nebyl smazán.',
  edit_hive_checklist_no_touch:
    'Chcete-li přidat/odebrat položky z kontrolního seznamu úlu, zaškrtněte/zrušte zaškrtnutí políček v seznamu níže. Položky můžete také rozložit/složit a přetáhnout/upustit, abyste je seřadili podle svého vlastního stylu (pozn. toto není možné na zařízení s dotykovou obrazovkou).',
  edit_hive_checklist_touch:
    'Chcete-li přidat/odebrat položky z kontrolního seznamu úlu, zaškrtněte/zrušte zaškrtnutí políček v seznamu níže. Změna pořadí položek je možná pouze na stolním počítači.',
  input_not_possible_for_bulkinspection:
    'Tato položka není dostupná, pokud je pro kontrolu vybráno více úlů, protože ji lze vyplnit pouze pro jednotlivé úly. Tuto položku pro jeden úl je možné vyplnit později úpravou kontroly pro tento úl.',
  save_bulkinspection_confirm:
    'Jste si jisti, že chcete uložit tuto kontrolu pro více včelstev současně?',
  deleted_but_not_saved_devices_warning:
    'N.B. zařízení budou odstraněna pouze po kliknutí na tlačítko „Uložit a odstranit“ v pravém horním rohu.',
  no_alerts: 'Žádná nová upozornění',
  alertrule: 'pravidlo výstrahy | pravidla výstrah',
  Alertrule: 'Pravidlo výstrahy | Pravidla výstrah',
  Measurement: 'Měření | Měření',
  Calculation: 'Výpočet',
  calculation: 'výpočet',
  Direct: 'Přímo',
  After: 'Po ',
  times: ' časy',
  Comparator: 'Komparátor',
  comparator: 'komparátor',
  Comparison: 'Srovnání',
  comparison: 'srovnání',
  Threshold_value: 'Prahová hodnota',
  Minimum: 'Minimum',
  Maximum: 'Maximum',
  Derivative: 'Derivát (zvýšení nebo snížení)',
  Count: 'Počet',
  Value: 'Hodnota',
  Difference: 'Rozdíl',
  Absolute_value: 'Absolutní hodnota',
  Absolute_value_of_dif_explanation: '**Absolutní hodnota rozdílu',
  Exclude_months:
    '<strong>Deaktivujte</strong> toto upozornění během následujících měsíců:',
  Exclude_hours:
    '<strong>Deaktivujte</strong> toto upozornění během následujících hodin:',
  Exclude_hives:
    '<strong>Deaktivujte</strong> toto upozornění pro následující úly:',
  Exclude_hives_details:
    'N.B. Ve výchozím nastavení se toto upozornění provede pro všechna včelstva s měřicím zařízením.',
  months: 'měsíce',
  hours: 'hodiny',
  delete_alertrule: 'Smazat pravidlo upozornění',
  Active: 'Aktivní',
  Alert_via_email: 'Upozornění e-mailem',
  this_field: 'Toto pole',
  alertrule_default: 'Výchozí pravidlo výstrahy | Výchozí pravidla výstrahy',
  copy: 'Kopírovat',
  Home: 'Domů',
  Select_default_alertrule: 'Kopírovat výchozí pravidlo výstrahy',
  /* below, please keep all terms between [] as is: */
  alertrule_main_sentence:
    'Chtěl bych obdržet upozornění, pokud [calculation] [comparison] z [measurement_quantity] [comparator] [threshold_value][measurement_unit]. Tento výpočet bude proveden [calculation_minutes]',
  alertrule_occurences_direct_sentence:
    ', a rád bych upozornění dostával přímo. ',
  alertrule_exclude_months_sentence:
    'Toto upozornění bude deaktivováno během následujících měsíců: [exclude_months]. ',
  alertrule_exclude_hours_sentence:
    'Toto upozornění bude deaktivováno během následujících hodin: [exclude_hours]. ',
  alertrule_exclude_hives_sentence:
    'Toto upozornění bude deaktivováno pro následující úly: [exclude_hive_ids].',
  min: 'minimum',
  max: 'maximum',
  ave: 'průměr',
  der: 'derivát',
  cnt: 'počet',
  equal_to: 'je rovný',
  less_than: 'je méně než',
  greater_than: 'je větší než',
  less_than_or_equal: 'je menší nebo rovno',
  greater_than_or_equal: 'je větší nebo rovno',
  alertrule_not_active:
    "Toto upozornění bylo deaktivováno. Můžete jej aktivovat zaškrtnutím políčka 'Aktivní' a uložením tohoto pravidla upozornění.",
  export_email_sent: 'E-mail se souborem Excel byl odeslán',
  excel_file_saved: 'Soubor Excel byl uložen do složky Stažené soubory',
  Updated_at: 'Aktualizováno na',
  Not_yet_saved: 'Dosud neuloženo',
  add_own_device: 'Přidat vlastní zařízení',
  devices_info_text:
    'Poznámka: vlastníte základnu BEEP? Pomocí základní aplikace BEEP přidejte své zařízení. Poté se automaticky objeví v seznamu níže.',
  devices_url_text: 'Zde najdete další informace o základní aplikaci BEEP.',
  alert_explanation_1:
    'Pokud vlastníte základnu BEEP nebo jiné zařízení, můžete si nastavit upozornění tak, že obdržíte upozornění, když naměřená data splní určité požadavky. Například náhlý pokles hmotnosti v důsledku rojení. Upozornění se zobrazí v této aplikaci, můžete si vybrat, zda je chcete dostávat také e-mailem.',
  alert_explanation_2:
    'Chcete-li začít, existuje několik výchozích pravidel výstrah, která můžete použít (a přizpůsobit svým vlastním potřebám). Kromě toho si můžete vytvořit vlastní pravidla výstrah.',
  alertrules_url_text:
    'Přejděte na „Nastavení upozornění“ a vytvořte své první pravidlo upozornění',
  Explanation: 'Explanation',
  db_influx: 'Influx Database',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',

  Apiary_management: 'Správa včelína',
  Move: 'Přesunout',
  Current_apiary: 'Současný včelín',
  sensor_key: 'Jedinečný identifikátor zařízení',
  disabled_settings: 'Ruční úprava těchto nastavení je zakázána.',
  Address_placeholder: 'Číslo, Název ulice, Město',
  first_create_apiary: 'Nejprve vytvořte včelín',
  Unknown: 'Neznámý',
  unknown: 'neznámý',
  research_warning:
    'Upozornění: Pokud jste neobdrželi pozvánku k účasti, není nutné udělit souhlas se sdílením vašich údajů, protože vaše údaje nebudou v takovém případě použity.',
  research_explanation_p1:
    'Platforma BEEP se používá ve výzkumných projektech, které jsou uvedeny níže. Poté, co jste pozváni k účasti na výzkumném projektu, musíte dát výzkumníkům souhlas s přístupem k vašim údajům o včelách.',
  research_explanation_p2:
    'Svůj souhlas můžete kdykoli odvolat. Od tohoto okamžiku nebudou sdílena žádná nová data. Údaje, které jste sdíleli v období, na které jste dali souhlas, zůstanou k dispozici pro výzkum. V případě dotazů je prosím směřujte na kontaktní osobu vašeho výzkumného projektu.',
  research_info:
    'Před udělením souhlasu si prosím přečtěte popis výzkumu poskytnutý prostřednictvím níže uvedeného odkazu a v případě potřeby si vyžádejte další podrobnosti.',
  save_and_delete: 'Uložit a smazat',
  drag_layers_info_text:
    'Přetáhněte vrstvy z levé strany do požadované pozice v úlu na pravé straně. Smažte vrstvu z úlu kliknutím na ni a poté kliknutím na ikonu červeného koše. V úlu lze vrstvy přetahovat a upravovat polohu, barvu vrstvy lze upravit kliknutím na vrstvu.',
  New_hive: 'Nový úl',
  New_alertrule: 'Nové pravidlo upozornění',
  Add_alertrule: 'Přidat pravidlo upozornění',
  Add_apiary: 'Přidat včelín',
  Add_sensor_definition: 'Přidejte definici senzoru',
  Add_member: 'Přidat člena',

  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. definice senzorů budou uloženy nebo přidány pouze po kliknutí na zelenou ikonu zaškrtnutí na konci řádku definice senzoru v tabulce.',
  delete_sensordef: 'Smazat definici senzoru',
  delete_all_alerts: 'Smazat všechna upozornění',
  delete_all_alerts_warning:
    'Opravdu chcete smazat všechna upozornění? Nelze vrátit zpět.',
  delete_all_alerts_warning_filter_active:
    'Opravdu chcete smazat všechna upozornění? Upozornění, která neodpovídají vašemu hledanému výrazu, budou také smazána. Nelze vrátit zpět.',
  delete_selected_alert:
    'Smazat vybrané upozornění | Smazat vybraná upozornění',
  delete_selected_alerts_warning:
    'Opravdu chcete smazat vybrané upozornění? Nelze vrátit zpět. | Opravdu chcete smazat vybraná upozornění? Nelze vrátit zpět.',
  delete_selected_alerts_invisible_checked_warning:
    'Upozornění: vybrané upozornění neodpovídá vašemu hledanému výrazu. | Poznámka: Existují vybraná upozornění, která neodpovídají vašemu hledanému výrazu, budou také smazána.',
  already_verified:
    'Ověřil jsem svou e-mailovou adresu a chtěl bych se přihlásit',
  password_recovery_resend_mail: 'Odeslat nový ověřovací kód',
  alert_rule_created: 'Bylo vytvořeno nové pravidlo výstrahy',
  alert_rule_deleted: 'Pravidlo upozornění bylo smazáno',
  deactivate_for_all_hives: 'Deaktivujte upozornění pro všechny úly',
  select_all: 'Vybrat vše',
  During: 'Během',
  Every: 'Každý ', // context: how often would you like the alert rule calculation to be performed? -> every 15 min, ..., every 24 hours etc.
  Calculation_minutes: 'Jak často chcete výpočet provádět?',
  Calculation_minutes_short: 'Jak často se má počítat?', // for alert rule overview table header
  Disable_alert_for_this_hive: 'Zakázat upozornění pro tento úl',
  Alert_disabled_for_this_hive: 'Upozornění je pro tento úl zakázáno',
  disabled_for_hive: 'byl deaktivován pro úl', // [alert] has been disabled for the following hive
  Alert_disabled: 'Upozornění zakázáno',

  Log_data_import: 'Importujte data záznamu',
  Log_files: 'Soubory záznamů', // Flashlogs
  Upload_date: 'Datum nahrání',
  Messages: 'Zprávy',
  Log_time: 'Zaznamenaný čas',
  File_size: 'Velikost souboru',
  check_log_data: 'Zkontrolujte data záznamu', // Check_flashlog
  delete_log_file: 'Smazat soubor záznamu', // Delete_flashlog
  commit_log_data_short: 'Importujte data záznamu', // commit_flashlog_short
  commit_log_data: 'Importujte data z tohoto souboru záznamu do aplikace BEEP:', // commit_flashlog
  // flashlog_explanation
  import_log_data_explanation:
    'V základní aplikaci BEEP si můžete stáhnout data záznamu z vnitřní paměti základny BEEP. Pokaždé, když stáhnete data záznamu, vnitřní paměť se vymaže a data se načtou do aplikace BEEP. Níže je uveden seznam stažených dat záznamu. Data protokolu můžete zobrazit kliknutím na tlačítko „Zkontrolovat data záznamu“. V důsledku této kontroly uvidíte bloky dat, které mohou nebo nemusí obsahovat shodu s daty databáze. Pro každý blok, který obsahuje shody, můžete zobrazit data záznamu a data databáze v grafu a zvolit doplnění dat v databázi daty záznamu.',
  // flashlog_url_text
  import_log_data_url_text:
    'Zde najdete článek podpory o stahování dat záznamu pomocí základní aplikace BEEP.',
  // flashlog_support_url
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000697129-download-beep-base-data-through-bluetooth',

  Immediately: 'Ihned',
  alertrule_active_no_email_sentence:
    ', a otevřu aplikaci BEEP, abych viděl upozornění.',
  alertrule_active_email_sentence:
    ', a dostávám upozornění e-mailem. Kromě toho vidím upozornění v aplikaci BEEP.',
  First_occurence: 'První',
  Last_occurence: 'Poslední',
  // default alert rule names:
  Hive_stability_and_theft: 'Stabilita úlu a krádež',
  Temperature_sensor_defect: 'Porucha snímače teploty',
  Battery_low: 'Nízké napětí baterie',
  Honey_harvest: 'Sklizeň medu',
  Hive_temperature: 'Nízká teplota úlu',
  Brood_temperature: 'Nízká teplota plodiště',
  No_measurements: 'Žádná měření',
  Swarm: 'Roj',
  Food_supply_low: 'Malá zásoba stravy',
  // default alert rule descriptions:
  Weight_drop_is_above_a_set_value:
    'Pokles hmotnosti úlu je nad nastavenou hodnotou',
  Temperature_sensor_malfunctions: 'Porucha snímače teploty',
  Battery_voltage_is_below_a_set_value:
    'Napětí baterie zařízení je pod nastavenou hodnotou',
  Weight_increase_due_to_nectar_collection_comes_to_a_halt:
    'Nárůst hmotnosti v důsledku sběru nektaru se zastaví',
  Hive_temperature_drops_below_a_set_value:
    'Teplota úlu klesla pod nastavenou hodnotu',
  Temperature_in_the_brood_below_a_set_value:
    'Teplota v plodišti klesla pod nastavenou hodnotu',
  No_measurement_data_received_in_a_set_time_period:
    'Během nastaveného časového období nebyla přijata žádná naměřená data',
  Sudden_weight_drop_triggers_alert_immediately:
    'Náhlý pokles hmotnosti úlu okamžitě spustí výstrahu. N.B. je založeno na intervalu přenosu dat 15 minut. Pokud má vaše zařízení jiný interval přenosu dat, měli byste odpovídajícím způsobem upravit prahovou hodnotu.',
  The_hive_weight_is_below_a_set_value:
    'Hmotnost úlu je pod nastavenou hodnotou',

  minute: 'minuta | minuty',
  upload_interval_warning_single_interval:
    'N.B. interval přenosu dat vašeho zařízení je | N.B. interval přenosu dat vašich zařízení je', // f.e.: ... 15 minutes
  upload_interval_warning_interval_range:
    'N.B. intervaly přenosu dat vašich zařízení se liší ', // f.e. ... 5 - 15 minutes
  not_relevant_for_immediate_calculation:
    'Není relevantní pro okamžitý výpočet',
  Increase: 'Zvýšit',
  Decrease: 'Snížit',
  Every_hour: 'Každou hodinu',
  every_hour: 'každou hodinu',
  Absolute_value_of_dif: 'Rozdíl', // context: 'Change' is an easier to understand word than 'the absolute value of the difference' between 2 values.
  In_case_of_good_connection_warning:
    '*Ihned po přijetí měření. To závisí na intervalu přenosu dat a spolehlivosti datového spojení.',
  Alertrule_summary_title: 'Souhrn',
  Alertrule_settings_title: 'Nastavení pravidel upozornění',
  Alertrule_exclude_title: 'Vyloučit období a úly',
  of: 'z',

  alerts_url_text: 'Přečtěte si článek podpory o upozorněních',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-alerts',

  /* New translations v3.0.74 */
  Decline: 'Pokles',
  Decline_invitation: 'Odmítnout pozvání',
  Decline_invitation_sure: 'Opravdu chcete odmítnout pozvání do skupiny?',
  selection: 'výběr',
  selection_placeholder: 'Vyberte období',
  data_zoom: 'Datový zoom',
  data_zoom_ok: 'Chcete přiblížit údaje o ',
  data_zoom_out_ok: 'Chcete oddálit údaje o ',

  Length: 'Délka: ',
  match: 'shoda | shody',
  Matches_found: 'Shody nalezeny',
  Firmware_version: 'Verze firmwaru',
  Interval: 'Interval',
  View_data: 'Zobrazit data',
  show_all: 'Zobrazit vše',
  only_active_if_measurement_present:
    '*N.B. pravidlo výstrahy bude aktivní pouze v případě, že je zvolené měření měřeno vaší základnou / zařízením BEEP. Základny BEEP neměří údaje o počasí.',
  Relative_startpoint: 'Relativní',

  Log_data: 'Data záznamu',
  Flashlog: 'Záznam',
  Block: 'Blokovat',
  Nr_of_match_props: 'Počet identických hodnot pro shodu',
  no_admin: 'Chcete-li zobrazit tuto stránku, musíte být správcem',

  import_block_data_short: 'Importujte data bloku',
  no_flashlog_data: 'Žádná data záznamu',
  no_flashlog_file: 'Žádný soubor záznamu',
  no_device: 'Žádné zařízení',
  data_not_stored: 'Data nejsou uložena',
  no_flashlog_found: 'Nebyl nalezen žádný soubor záznamu',
  Size: 'Velikost',
  Match: 'Shoda | Shody',
  Missing_data: 'Chybějící data',
  not_yet_in_db: 'ještě není v databázi',
  From_cache: 'Z mezipaměti',
  Time_diff: 'ΔČasu',
  seconds_short: 'sekunda',
  commit_block_data:
    'Doplňte data aplikace BEEP daty z tohoto bloku dat záznamu: ',
  persisted_measurements: 'Probíhající měření',
  persisted_days: 'Probíhající dny',
  no_data_stored: 'Nejsou uložena žádná data',
  data_stored_for_log: 'Data uložená pro záznam ',
  Fill_holes: 'Vyplnit bílá místa (propojte všechny datové body)',

  Data_imported: 'Data importována',
  undo_import: 'Zrušit import',
  undo_block_import_exp:
    'Opravdu chcete smazat dříve importovaná data z tohoto bloku z databáze?',
  data_deleted: 'Data smazána',
  data_not_deleted: 'Data nebyla smazána',
  deleted_measurements: 'Smazaná měření',
  deleted_days: 'smazané dny',
  Memory_erased: 'Paměť základby BEEP vyprázdněna',
  Export: 'Exportovat',
  Export_as_json: 'Exportovat jako data JSON',
  Export_as_csv: 'Exportovat jako soubor .csv',
  Export_full_json: 'Exportovat celý JSON',
  Export_full_csv: 'Exportovat celý .csv',
  Export_file_being_saved:
    'Exportovaný soubor bude uložen do vaší složky Stažené soubory – chvíli prosím počkejte',
  no_data_deleted_because_no_matches_found:
    'Žádná data nebyla smazána, protože nebyly nalezeny žádné shody',
  nr_of_measurements: 'počet měření',

  Now: 'Nyní',
  input_only_possible_when_date_present:
    "Nejprve prosím vyberte 'datum kontroly' (výše), abyste aktivovali kontrolní formulář. Kliknutím na 'Nyní' vyplňte aktuální datum a čas.",
  select_inspection_date: 'Vyberte datum kontroly',
  View_inspection_confirm: 'Chcete se podívat na kontrolu: ',

  /* Translations page */
  Translations: 'Překlady',
  translation_exp:
    'Chcete-li se stát překladatelem, požádejte o účet překladatele na adrese support@beep.nl. Pokud byste chtěli aktualizovat překlady, stáhněte si níže soubor .js a aktualizovaný soubor zašlete e-mailem na adresu support@beep.nl. Děkuji za snahu!',
  unpublished_exp: 'Překlady, které dosud nebyly publikovány:',
  as_plain_text: 'jako prostý text',

  /* Checklists page */
  new_checklist: 'Nový kontrolní seznam',
  duplicate: 'Duplikovat',
  delete_checklist: 'Smazat kontrolní seznam',
  delete_checklist_confirm:
    'Opravdu chcete tento kontrolní seznam smazat? Nelze vrátit zpět. Kontrolní seznam: "',

  /* Menu items */
  View_measurements: 'Zobrazit měření',
  View_inspection: 'Zobrazit kontrolu | Zobrazit kontroly',
  View_alert: 'Zobrazit upozornění | Zobrazit upozornění',

  Edit_alertrule: 'Upravit pravidlo upozornění',
  Edit_hive: 'Upravit úl',
  Edit_queen: 'Upravit královnu',
  Edit_apiary: 'Upravit včelín',
  Edit_group: 'Upravit skupinu pro spolupráci',
  Edit_group_short: 'Upravit skupinu',
  Edit_checklist: 'Upravit kontrolní seznam',
  Edit_devices: 'Upravit zařízení',
  Edit_consent: 'Upravit souhlas',
  Edit_hivetag: 'Upravit identifikátor úlu',

  Hivetag: 'Identifikátor úlu | Identifikátory úlů',
  Hivetag_exp_1:
    '‘Identifikátory úlů’ jsou QR kódy, které můžete připojit k úlu a u kterých můžete nastavit akci, která bude provedena, jakmile naskenujete identifikátor úlu. „Akce“ označuje akce v aplikaci BEEP, jako je vytvoření nové inspekce pro příslušný úl. Jakmile je štítek úlu nastaven, stačí naskenovat QR kód pomocí smartphonu a automaticky se vytvoří nová kontrola. Štítky úlu si můžete vytisknout sami ',
  Hivetag_download_text: 'stažení tohoto pdf.',
  Hivetag_exp_2:
    ' Chcete-li začít, stačí naskenovat identifikátor úlu. Pokud ještě nebyla nastavena žádná akce, budete automaticky přesměrováni na stránku nastavení.',
  qrcode: 'QR kód | QR kódy',
  Qrcode_exp1: "Propojit identifikátor úlu s číslem '",
  Qrcode_exp2: "' do úlu.",
  Qrcode_note:
    'Vezměte prosím na vědomí: výše uvedený QR kód není skutečnou značkou úlu, je myšlen pouze jako příklad.',
  Download_hivetags: 'Stáhnout pdf s identifikátory úlu',
  Delete_hivetag: 'Smazat identifikátor úlu',
  for_hive: 'pro úl "',
  Add_hivetag: 'Přidat identifikátor úlu',
  Select_hivetag_number: 'Vybrat číslo identifikátoru úlu',
  Select_hive: 'Vybrat úl | Vybrat úly',
  Select_hive_for_hivetag_exp:
    'Pro který úl chcete akci provést? Vyberte jeden úl.',
  Select_hivetag_action: 'Vyberte akci',
  Select_hivetag_action_exp:
    'Jakou akci chcete provést po naskenování QR kódu?',
  Hivetag_hive_in_overview: 'Zobrazit úl v přehledu úlů',
  Hivetag_new_inspection: 'Vytvořte novou kontrolu',
  Hivetag_edit_hive: 'Upravit konfiguraci úlu',
  Hivetag_view_inspections: 'Zobrazit kontroly',
  No_hivetags_left:
    'Všechny identifikátory úlu se v současné době používají. Odeberte existující identifikátor úlu, abyste mohli přidat nový nebo jej upravit.',

  Select_hives_for_consent: 'Vybrat úly pro souhlas',
  Select_hives_for_consent_exp:
    'Vyberte úly, jejichž data chcete sdílet s tímto výzkumem',
  View_alert_confirm: 'Chcete zobrazit upozornění "',

  /* iOS device prompt for adding BEEP app to home screen */
  pwa_title: 'Použít BEEP jako aplikaci?',
  pwa_body:
    'Přidejte BEEP na domovskou obrazovku, abyste ji mohli používat jako webovou aplikaci a v režimu celé obrazovky. Po jednom přihlášení zůstanete přihlášeni.',
  pwa_share_button_label: '1. Klepněte na ikonu sdílení na liště nabídky níže.',
  pwa_addhome_button_label: "2. Klikněte na 'Přidat na domovovskou stránku'.",

  Colony: 'Kolonie | Kolonie',
  Dashboard: 'Dashboard | Dashboards',
  Last_check: 'Poslední kontrola',
  Note: 'Poznámka',
  no_chart_data_hive: 'Pro tento úl nejsou k dispozici žádná data',

  Code: 'Kód',

  Dashboard_exp:
    'Vytvořte dashboard pomocí tlačítka „New dashboard“ vpravo nahoře. Poté můžete vybrat úly, které chcete zobrazit na veřejném řídicím panelu, který je přístupný na samostatné adrese URL (pro každého, kdo má kód). Úly (a jejich měření + poslední kontrola) se zobrazí po jednom.',
  create_dashboard_question:
    'Ještě nemáte dashboard? Vytvořte si jej pomocí aplikace BEEP',
  New_dashboard: 'Nový dashboard',
  Edit_dashboard: 'Upravit dashboard',
  Delete_dashboard: 'Smazat dashboard',
  Logout_dashboard: 'Odhlásit se',
  Logout_dashboard_check: 'Opravdu se chcete odhlásit / přepnout řídicí panel?',
  weight_example_chart_1: 'Včely sbírají nektar',
  weight_example_chart_2: 'Včely využívají své zásoby potravy',
  weight_example_chart_3: 'Roj!',
  weight_example_chart_4: 'Úl byl zvětšen',
  t_example_chart_1: '34°C: zdravý plod',
  t_example_chart_2: '< 33°C: žádný plod',
  Select_hives_for_dashboard_exp:
    'Které úly byste chtěli zobrazit na tomto panelu? Pro optimální efekt vyberte více úlů (až 12). U úlů se zařízením se zobrazí údaje o teplotě a hmotnosti (pokud jsou k dispozici). Lze vybrat pouze vlastněná včelstva.',
  Max_hives_warning: 'Bylo dosaženo maximálního počtu včelstev',
  Title: 'Název',
  Dashboard_title_exp: "Výchozí název je 'Dashboard' (pokud není uveden).",
  Dashboard_description_exp:
    'Poznámka: Tento popis se na dashboardu nezobrazí. Lze jej použít k uložení dalších informací, např. pro koho je tento dashboard určen',
  Pace: 'Interval (sekundy)',
  Dashboard_pace_exp: 'Interval, jakým je každý úl zobrazen (při rotaci)',
  Dashboard_interval_exp:
    'Zobrazit data měření za předchozí hodinu/den/týden/měsíc/rok nebo vlastní období',
  Show_inspections: 'Zobrazit kontroly',
  Show_inspections_exp:
    'Zobrazit poslední kontrolu (datum, celkový dojem a poznámka).',
  Show_all_hives: 'Show details for all hives',
  Show_all_hives_exp:
    'Zobrazit podrobnosti (umístění, poslední kontrola, údaje z měření) pro všechny vybrané úly (ANO), nebo pouze pro úly se zařízením (NE, doporučená možnost)',
  Preview_share: 'Náhled a sdílení',
  Copy_url: 'Kopírovat url',
  /* offline inspection sheet */
  Hour_short: 'Hod | Hod',
  Day: 'Den | Dny',
  Minute: 'Minuta | Minuty',
  Percentage_exp: 'Procento mezi 0 a 100',
  Grade_exp_1: 'Známka mezi 1 a 10',
  Grade_exp_2: '(1 = Špatný, 10 = Vynikající)',
  Degrees_exp_1: 'Počet stupňů mezi',
  Degrees_exp_2: '-180° and 180°',
  Negative_exp: 'Záporné číslo (pod 0)',
  Too_many_items_exp_1: 'Možností je příliš mnoho',
  Too_many_items_exp_2: 'vytisknout, vyplnit vlastní odpověď',
  Image_placeholder_1: 'Tento obrázek lze přidat později',
  Image_placeholder_2: 'prostřednictvím aplikace BEEP (volitelné)',
  Too_long_list_present:
    'Seznam možností je příliš dlouhý na to, aby se zobrazil v offline kontrolním seznamu pro položku:',
  Too_long_list_present_fix_1: 'Pokud je to možné, snižte počet možností na',
  Too_long_list_present_fix_2:
    "nebo méně, pomocí tlačítka 'Upravit kontrolní seznam'. Nebo doplňte správnou odpověď ručně.",

  Print: 'Tisk',
  Print_checklist: 'Tisk kontrolního seznamu',
  Print_checklist_exp:
    'Ujistěte se, že používáte následující nastavení tiskárny:',
  Print_checklist_exp_1: 'Formát papíru: A4',
  Print_checklist_exp_2: 'Žádné okraje',
  Print_checklist_exp_3: 'Černobíle',
  Print_checklist_exp_4: 'Jednostranný',

  /* inspection modes */
  Offline_inspection: 'Kontrola papíru',
  Offline_inspection_exp:
    'Vytiskněte kontrolní seznam, vyplňte jej ručně. Nahrajte fotografie svých kontrolních listů později pomocí tlačítka „Nahrát kontrolu papíru“. Fotografie budou poté automaticky analyzovány a mohou být ověřeny a uloženy jako běžná (digitální / online) kontrola.',
  Online_inspection: 'Digitální kontrola',
  Online_inspection_exp:
    'Vyplňte svůj kontrolní seznam digitálně (online) prostřednictvím počítače, tabletu nebo chytrého telefonu, jak jste zvyklí',
  Upload_inspection: 'Nahrát papírovou kontrolu',
  Upload_inspection_exp:
    'Pokud jste absolvovali papírovou kontrolu, můžete sem nahrát fotografie vašich kontrolních archů. Poté budou automaticky analyzovány a lze je ověřit a uložit jako normální (digitální / online) kontrola.',
  Select_inspection_mode: 'Vyberte režim kontroly',
  Send_pictures: 'Poslat obrázky',
  svg_checklist: 'vytištěný kontrolní seznam | vytištěné kontrolní seznamy',
  Select_input_language:
    'Vyberte jazyk, ve kterém byl vyplněn kontrolní seznam',
  Upload_images: 'Nahrajte obrázky',
  Upload_images_exp: 'Při fotografování dbejte na následující:',
  Upload_images_exp_1:
    'Je ID tisku každé stránky stejné jako ID tisku výše vybraného vytištěného kontrolního seznamu?',
  Upload_images_exp_2: 'Jsou vidět všechny 4 černé čtverečky?',
  Upload_images_exp_3: 'Je papír dobře osvětlený a leží na rovném povrchu?',
  Upload_images_exp_4: 'TODO: použít skener obrázků?',
  Uploading_images_be_patient:
    'Počkejte prosím chvíli, vaše obrázky se analyzují. To může trvat několik minut. Toto okno prosím nezavírejte.',
  Generating_svg_be_patient:
    'Please wait a moment, your printable checklist is being generated. This may take a little while. Please do not close this window.', // To be translated
  Parsed_pages: 'Analyzované stránky',
  Number_of_processed_pages: 'Počet analyzovaných stránek: ',
  Incorrectly_uploaded_pages: 'Nesprávně nahraná čísla stránek: ',
  Missing_page: 'Chybí číslo stránky | Chybí čísla stránek',
  Check_svg_id_for_page:
    'Zkontrolujte ID tisku pro číslo stránky | Zkontrolujte ID tisku pro čísla stránek',
  correct_svg_id: 'správné ID tisku',
  Svg_id_exp:
    'ID tisku lze nalézt v pravé horní části stránky vlevo od čísla stránky. Znovu nahrajte kontrolu papíru se správnými stránkami a/nebo vyberte správný vytištěný kontrolní seznam',
  All_svg_ids_correct: 'Byl vybrán správně vytištěný kontrolní seznam',
  All_svg_ids_incorrect: 'Byl vybrán nesprávně vytištěný kontrolní seznam',
  No_checklist_svg: 'Dosud nebyly vytištěny žádné kontrolní seznamy',
  No_checklist_svg_exp:
    'Před nahráním kontroly papíru je třeba nejprve vytisknout (a vyplnit) kontrolní seznam. Přejděte na „Kontrola papíru“ a vytiskněte si svůj kontrolní seznam, nebo místo toho odešlete kompletně digitální kontrolu prostřednictvím „Digitální kontroly“.',
  checklist_svg_exp:
    'Níže vyberte tištěný kontrolní seznam. Ujistěte se, že ID tisku (a tedy název) se rovná ID tisku (a názvu) vaší kontroly papíru. ID tisku najdete v pravém horním rohu každé stránky, název je vytištěn v levém horním rohu. Vezměte prosím na vědomí: Digitální kontrolní seznam lze uložit jako „tištěný kontrolní seznam“ pod různými ID tisku, pokud byl mezi tiskem změněn jakýkoli jeho obsah. Úpravy digitálního kontrolního seznamu se proto projeví v tištěném kontrolním seznamu pouze v případě, že byl kontrolní seznam vytištěn po provedení změn. Datum (a čas) za názvem označuje, kdy byla konkrétní verze kontrolního seznamu vytištěna poprvé.',

  /* Compare module */
  Load: 'Načíst',
  Compare: 'Porovnat',
  Select_hives_for_compare: 'Vyberte úly k porovnání',
  Select_hives_for_compare_exp: 'Vyberte úly, se kterými chcete data porovnat',
  mean_weight_kg: 'Průměrná hmotnost',
  mean_net_weight_kg: 'Průměrná čistá hmotnost',
  net_weight_kg: 'Čistá hmotnost',
  overall_intake_loss: 'Celkový příjem/ztráta',
  Compare_hives: 'Porovnat úly',
  compare_hives_exp:
    'Zjistěte, jak se vyvíjí hmotnost vašeho úlu ve srovnání s ostatními vašimi úly v okolí. ',
  compare_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000921124-compare-hives-option',
  compare_url_text: 'Zde najdete další informace o funkci Porovnat',
  selected_hive: 'vybraný úl | vybrané úly',

  /* below, please keep [pagenr] as is, it will be replaced by the pagenumber to be uploaded */
  Upload_pagenr: 'Nahrát stránku [pagenr] sem',
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
