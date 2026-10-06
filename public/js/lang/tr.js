/*
 * BEEP - Translations - Turkish (tr) - VUE app v3
 *
 * Generated from en.js, verified against it key by key.
 *
 * STRUCTURE PRESERVED - the following are byte-identical to en.js on purpose:
 *   - [placeholder] tokens, replaced at runtime by the alert-rule builder
 *   - URLs
 *   - HTML tags
 *   - the "|" plural separator (vue-i18n $tc)
 *   - trailing spaces and trailing quotes on sentence fragments that are
 *     concatenated by the app
 *   - numeric / unit labels (frequency ranges)
 *
 * WHAT IS STILL ENGLISH, AND WHY
 *   Tier 2 (17 keys) - beekeeping terminology left for a domain
 *     reviewer. Translating a wrong term here would mislead a beekeeper
 *     about their hive, so nothing was guessed.
 *   Tier 3 (99 keys) - structural strings that cannot be
 *     translated without editing the Vue components that concatenate them.
 *     Most are the long alert-rule sentences and confirmation dialogs whose
 *     wording depends on the parts the app splices in at runtime.
 *
 * TO FINISH TURKISH SUPPORT YOU ALSO NEED
 *   1. src/assets/js/languages.js   ->  add { lang: 'tr', title: 'Türkçe' }
 *   2. src/assets/img/flags/tr.svg  ->  add the flag
 *   3. src/main.js                  ->  import tr from '@public/js/lang/tr'
 *                                      and add tr to the messages map
 *   4. backend: a row in the languages table with twochar 'tr', otherwise the
 *      API returns English for the selected locale and the UI silently falls back
 */

const translations = {

  /* Date picker */
  monthsFull: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthsShort: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  Close: 'Kapat',

  /* main */
  Website: 'Web sitesi',
  menu: 'Menü',
  weather: 'Hava durumu',
  sensors: 'Cihazlar',
  Delete: 'Sil',
  Search: 'Ara...',

  /* user error messages */
  User_data: 'Kullanıcı verisi',
  user_data: 'kullanıcı verisi',
  updated: 'güncellendi',
  delete_complete_account:
    'Hesabınızı, içindeki tüm arılıklar, kovanlar ve gözlemler dahil, silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
  username_is_required: 'Lütfen kullanıcı adını girin',
  username_already_exists: 'Bu kullanıcı adı zaten kullanılıyor',
  password_is_required: 'Lütfen bir parola girin',
  email_is_required: 'Lütfen bir e-posta adresi girin',
  email_already_exists: 'Bu e-posta adresi zaten kullanımda',
  policy_accepted_is_required:
    'Kaydolmak için hizmet şartlarını kabul etmeniz gerekiyor',
  already_registered: 'Zaten kayıtlıyım',
  invalid_user: 'Bilinmeyen kullanıcı veya yanlış parola',
  no_password_match: 'Parolalar eşleşmiyor',
  invalid_token: 'Geçersiz kod',
  no_valid_email: 'Geçersiz e-posta adresi',
  empty_fields: 'Lütfen tüm alanları doldurun',
  match_passwords: 'Parolalar eşleşmiyor',
  succesfully_registered: 'Kaydınız başarıyla tamamlandı.',
  authentication_failed: 'Kimlik doğrulama başarısız',
  remove_apiary: 'Arılığı kaldır',
  remove_hive: 'Kovanı kaldır',
  remove_inspection: 'Gözlemi kaldır',
  Error: 'Hata | Hatalar',
  Date: 'Tarih',
  ok: 'Tamam',
  prev: 'Önceki',
  next: 'Sonraki',
  add: 'Ekle',
  Cancel: 'İptal',

  /* login */
  login_title: 'Giriş',
  login: 'Giriş',
  forgot_password: 'Parolanızı mı unuttunuz?',
  username: 'Kullanıcı adı',
  password: 'Parola',
  confirm_password: 'Parolayı doğrula',
  email: 'E-posta',
  create_login_question:
    'Henüz hesabınız yok mu? Yeni kullanıcı olarak kaydolun',
  create_login: 'Yeni kullanıcı olarak kaydol',
  create_login_summary: 'Yeni bir kullanıcı hesabı oluştur',
  save: 'Kaydet',
  logout: 'Çıkış yap',

  /* password recovery */
  password_recovery_title: 'Parolanızı mı unuttunuz?',
  password_recovery_remembered: 'Ah, parolamı hatırladım!',
  password_recovery_send_mail: 'Doğrulama kodu gönder',
  password_recovery_code_not_received: '5 dakika içinde kod gelmedi mi?',
  password_recovery_enter_code: 'Doğrulama kodunu aldınız? Buraya girin',
  password_recovery_reset_password: 'Parolayı değiştir',
  password_recovery_reminder_success:
    'Bir e-posta gönderildi. Parolanızı sıfırlamak için e-postadaki bağlantıya tıklayın.',
  password_recovery_reset_success:
    'Parolanız başarıyla değiştirildi ve giriş yaptınız.',
  new_password: 'Yeni parola',
  confirm_new_password: 'Yeni parolayı doğrula',
  go_to_dashboard: 'Panoma git',
  color: 'Renk',

  /* hives */
  Hive: 'Kovan | Kovanlar',
  hive: 'kovan | kovanlar',
  Location: 'Arılık | Arılıklar',
  location: 'arılık | arılıklar',
  Name: 'Ad',
  name: 'ad',
  Type: 'Tür',
  type: 'tür',
  inspection: 'gözlem | gözlemler',
  Inspection: 'Gözlem | Gözlemler',
  New_inspection: 'Yeni gözlem',
  Edit_inspection: 'Gözlemi düzenle',
  Action: 'İşlem | İşlemler',
  edit: 'Düzenle',
  Bee_race: 'Arı ırkı',
  Birth_date: 'Doğum tarihi',
  Queen_colored: 'Ana arı işaretli',
  Queen_clipped: 'Ana arı kırpılmış',
  Queen_fertilized: 'Ana arı döllenmiş',
  Age: 'Yaş',
  years_old: 'yaşında',

  /* Hive check items */
  Date_of_inspection: 'Gözlem tarihi',
  reminder: 'Hatırla',
  remind_date: 'Bildirim tarihi',
  overall: 'Genel',
  positive_impression: 'Toplam izlenim',
  needs_attention: 'Dikkat gerekiyor',
  notes: 'Notlar',
  notes_for_next_inspection:
    'Sonraki gözlem için kısa not (özet ekranında görünür)',
  Not_implemented_yet: 'Bu öğe henüz uygulanmadı',

  /* dashboard */
  last_measurement: 'Son ölçüm',
  no_data: 'Veri yok',
  no_chart_data: 'Seçili dönem için grafik verisi yok',

  /* settings */
  General: 'Genel',
  Place: 'Konum',
  Country: 'Ülke',
  City: 'Şehir',
  Address: 'Adres',
  latitude: 'Enlem',
  Longitude: 'Boylam',
  Street: 'Sokak',
  Number: 'No',
  Postal_code: 'Posta kodu',
  Description: 'Açıklama',
  Hive_amount: 'Kovan sayısı',
  Hive_prefix: 'Kovan adı ön eki (numaradan önce)',
  Hive_number_offset: 'Kovan numarası başlangıcı',
  Hive_type: 'Kovan tipi',
  Hive_layers: 'Kovan katmanları',
  Hive_frames: 'Katman başına çerçeve sayısı',
  Hive_color: 'Kovan rengi',
  Queen: 'Ana arı',
  queen: 'ana arı',
  settings_title: 'Ayarlar',
  Settings: 'Ayarlar',
  settings: 'ayarlar',
  Select: 'Seç',
  Poor: 'Kötü',
  Fair: 'Orta',
  Average: 'Ortalama',
  Average_slider: 'Ortalama',
  Good: 'İyi',
  Excellent: 'Çok iyi',
  Low: 'Düşük',
  Medium: 'Orta',
  High: 'Yüksek',
  Extreme: 'Aşırı',

  /* colors */
  select_color: 'Bir renk seç',
  advanced: 'Gelişmiş',

  /* sensors */
  Select_sensor: 'Bir sensör seç',
  temperature: 'Sıcaklık',
  t: 'Sıcaklık',
  t_0: 'Sıcaklık 1',
  t_1: 'Sıcaklık 2',
  t_2: 'Sıcaklık 3',
  t_3: 'Sıcaklık 4',
  t_4: 'Sıcaklık 5',
  t_5: 'Sıcaklık 6',
  t_6: 'Sıcaklık 7',
  t_7: 'Sıcaklık 8',
  t_8: 'Sıcaklık 9',
  t_9: 'Sıcaklık 10',
  light: 'Güneş ışığı',
  l: 'Güneş ışığı',
  water: 'Su',
  w: 'Ağırlık (eski)',
  humidity: 'Nem',
  h: 'Nem',
  air_pressure: 'Hava basıncı',
  p: 'Hava basıncı',
  weight: 'Ağırlık',
  w_v: 'Tüm sensörlerin ağırlık değeri',
  w_fl: 'Ön sol sensör ağırlık değeri',
  w_fr: 'Ön sağ sensör ağırlık değeri',
  w_bl: 'Arka sol sensör ağırlık değeri',
  w_br: 'Arka sağ sensör ağırlık değeri',
  weight_kg: 'Ağırlık',
  weight_kg_corrected: 'Ağırlık (düzeltilmiş)',
  weight_combined_kg: 'Ağırlık (toplam)',
  bat_volt: 'Pil',
  bv: 'Pil voltajı',
  sound_fanning_4days: 'Fan 4d bees',
  s_fan_4: 'Fan 4d bees',
  sound_fanning_6days: 'Fan 6d bees',
  s_fan_6: 'Fan 6d bees',
  sound_fanning_9days: 'Fan 9d bees',
  s_fan_9: 'Fan 9d bees',
  sound_flying_adult: 'Flying bees',
  s_fly_a: 'Flying bees',
  sound_total: 'Toplam ses',
  s_tot: 'Toplam ses',
  s_spl: 'Ses basıncı seviyesi',
  bee_count_in: 'Kovan içeri giren arı sayısı',
  bc_i: 'Kovan içeri giren arı sayısı',
  bee_count_out: 'Kovan dışarı çıkan arı sayısı',
  bc_o: 'Kovan dışarı çıkan arı sayısı',
  t_i: 'Kovan içi sıcaklık',
  rssi: 'Sinyal gücü',
  snr: 'Sinyal gürültüsü',
  lat: 'Enlem',
  lon: 'Boylam',
  Sound_measurements: 'Ses ölçümleri',
  Sensor_info: 'Sensör bilgisi',
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
  icon: 'Simge',
  precipIntensity: 'Yağış miktarı',
  precipProbability: 'Yağmur olasılığı',
  precipType: 'Yağış türü',
  outsideTemperature: 'Dış sıcaklık',
  apparentTemperature: 'Hissedilen sıcaklık',
  dewPoint: 'Çiy noktası',
  pressure: 'Hava basıncı',
  windSpeed: 'Rüzgar hızı',
  windGust: 'Ani rüzgar',
  windBearing: 'Rüzgar yönü',
  cloudCover: 'Bulutluluk',
  uvIndex: 'UV indeksi',
  visibility: 'Görüş mesafesi',
  ozone: 'Ozon',

  /* Measurements */
  Hour: 'Saat',
  hour: 'saat | saatler',
  day: 'gün | günler',
  week: 'Hafta',
  month: 'Ay',
  year: 'Yıl',

  /* settings */
  offline: 'Bağlantı yok',
  yes: 'Evet',
  no: 'Hayır',
  Checklist: 'Kontrol listesi | Kontrol listeleri',
  checklist: 'kontrol listesi | kontrol listeleri',
  Checklist_items: 'Kontrol listesi öğeleri',

  /* user */
  Data_export: 'Veri dışa aktarma',
  Export_your_data:
    'BEEP hesabınızdaki tüm verileri dışa aktarın; verileri bir Excel dosyası olarak e-postayla gönderin ya da Excel dosyasını buradan indirin. Excel dosyası tüm cihazlarınızın tüm ölçümlerini içerir.',
  Email_export: 'CSV e-posta',
  Download_csv: 'CSV indir',
  Open_csv: 'CSV aç',
  Include_group_data: 'Dışa aktarıma iş birliği grubu verilerini ekle',
  Include_sensor_data: 'Dışa aktarıma ölçüm verisi dosya bağlantılarını ekle',
  accept_policy:
    'BEEP hizmet şartlarını, yeni Avrupa gizlilik yasasıyla uyumlu oldukları için kabul ediyorum',

  /* General items */
  server_down:
    'Uygulama bakım çalışması nedeniyle kullanılamıyor, lütfen daha sonra tekrar deneyin',
  add_to_calendar: 'Takvime ekle',
  Whats_new: 'Yeni!',
  Site_title: 'BEEP | Arı monitörü',
  email_verified: 'E-posta adresiniz doğrulandı.',
  email_not_verified: 'E-posta adresiniz henüz doğrulanmadı.',
  email_new_verification:
    'Yeni bir doğrulama e-postası göndermek için bu bağlantıya tıklayın.',
  email_verification_sent:
    'Doğrulama bağlantısı içeren bir mesaj e-posta adresinize gönderildi. Hesabınızı etkinleştirip giriş yapmak için e-postadaki bağlantıya tıklayın.',
  email_verification_resent:
    'Doğrulama bağlantısı içeren yeni bir mesaj e-posta adresinize gönderildi. Hesabınızı etkinleştirip giriş yapmak için e-postadaki bağlantıya tıklayın.',
  not_filled: 'zorunludur ancak doldurulmamıştır',
  cannot_deselect: 'Bu öğe kaldırılamıyor, çünkü zorunlu bir öğe içeriyor',
  Undelete: 'Silmeyi geri al',
  the_field: 'alanı',
  is_required: 'zorunludur',
  not_available_yet:
    'henüz mevcut değil. Sağ üst köşedeki düğmeye tıklayarak bir tane ekleyin.',
  member: 'üye | üyeler',
  Member: 'Grup üyesi | Grup üyeleri',
  Invited: 'Davet edildi',
  Invitation: 'Davet | Davetler',
  Admin: 'Yönetici',
  Creator: 'Grup sahibi',
  Group: 'İş birliği grubu | İş birliği grupları',
  group: 'iş birliği grubu | iş birliği grupları',
  group_short: 'grup | gruplar',
  Invitation_accepted: 'Davet kabul edildi',
  Accept: 'Kabul et',
  My_shared: 'Paylaştıklarım',
  invitee_name: 'Davet edilen kişinin adı',
  Remove_group:
    'Bu paylaşılan grubu tüm üyeleri için tamamen kaldırmak istediğinizden emin misiniz',
  Detach_from_group: 'Beni ve kovanlarımı bu gruptan çıkar',
  my_hive: 'Kovanım',
  created: 'oluşturuldu',
  group_detached: 'Gruptan başarıyla çıkıldı',
  group_activated: 'Grup daveti kabul edildi',
  group_declined: 'Grup daveti reddedildi',

  /* New translations v2.2.0 */
  roofed: 'Arılığın çatısı var mı?',
  info: 'Bilgi',
  research: 'Araştırma',
  start_date: 'Başlangıç tarihi',
  end_date: 'Bitiş tarihi',
  institution: 'Araştırma kurumu',
  type_of_data_used: 'Veri kullanımı',
  link: 'Bağlantı',
  Consent: 'Onay',
  history: 'geçmiş',
  Current_consent: 'Mevcut onay',
  consent_yes: 'Verilerimi paylaşmayı onaylıyorum',
  consent_no: 'Verilerimi paylaşmayı onaylamıyorum',
  my_beep_data: 'Kendi BEEP verilerim',
  Consent_can_only_be_set: 'Onay yalnızca şu tarihe kadar değiştirilebilir',
  earlier: 'daha eski bir',
  later: 'daha yeni bir',
  new_apiary_explanation: '4 adımda yeni bir arılık oluştur',
  start_here: 'Başlamak için buraya tıklayın',
  optional: 'isteğe bağlı',
  dimensions: 'ölçüler',
  details: 'ayrıntılar',
  configuration: 'yapılandırma',
  adjustments: 'ayarlamalar',
  changes_queen_color: 'düzenleme rengi değiştirir',
  Brood_box_and_frame: 'Yavru kutusu ve çerçeve',
  Hive_order: 'Arılıktaki kovan sırası',
  bb_width_cm: 'Yavru kutusu genişliği (cm)',
  bb_height_cm: 'Yavru kutusu yüksekliği (cm)',
  bb_depth_cm: 'Yavru kutusu derinliği (cm)',
  fr_width_cm: 'Çerçeve genişliği (cm)',
  fr_height_cm: 'Çerçeve yüksekliği (cm)',
  queen_line: 'çizgi',
  queen_tree: 'ağaç',
  queen_description: 'notlar',
  Hive_short: 'Kovan | Kovanlar',
  Image: 'Görsel | Görseller',
  preview: 'önizleme',
  Inside: 'Kovan içi ölçümler',
  Offset: 'Sapma',
  Multiplier: 'Çarpan',
  Input: 'Giriş',
  Output: 'Çıkış',
  Last: 'Son',
  CSV_export_separator: 'CSV veri sütunu ayırıcısı',
  Sensor_measurements: 'Sensör ölçümleri',
  sample_code_hive: 'Benzersiz örnek kod üretmek için önce bir kovan seçin',
  sample_code_generate: 'Benzersiz örnek kod üret',
  sample_code_delete: 'Benzersiz örnek kodu sil',
  measurement_interval: 'aralık',
  from_weather_service: 'hava durumu servisinden',

  /* New translations v3 */
  last_visit: 'Son ziyaret',
  diary: 'Günlük',
  data: 'Veri',
  photo: 'fotoğraf | fotoğraflar',
  add_checklist: 'Kontrol listesi ekle',
  add_hive: 'Kovan ekle',
  edit_apiary: 'Arılığı düzenle',
  new_apiary: 'Yeni arılık',
  edit_group: 'İş birliği grubunu düzenle',
  new_group: 'Yeni iş birliği grubu',
  verification_code: 'doğrulama kodu',
  confirm_email_title: 'E-postanızı doğrulayın',
  confirm_email_summary:
    'E-postanıza bir doğrulama kodu gönderildi. E-posta adresinizi doğrulamak için aşağıya girin',
  confirm: 'Doğrula',
  Profile: 'Profil',
  Checklist_template: 'Kontrol listesi şablonu | Kontrol listesi şablonları',
  Help: 'Yardım',
  FAQ: 'SSS',
  Support: 'Destek',
  no_inspections: 'İlk gözlemi ekleyin',
  no_results: 'Sonuç yok',
  Hive_brood_layer: 'Yavru katmanı | Yavru katmanları',
  Hive_honey_layer: 'Bal katmanı | Bal katmanları',
  Hive_queen_excluder_layer: 'Ana arı ızgarası | Ana arı ızgaraları',
  Hive_feeding_box_layer: 'Besleme kutusu | Besleme kutuları',
  overrides_layer_colors: 'katman renklerini geçersiz kılar',
  drag_layers: 'Kovanı yapılandırmak için katmanları sürükleyin',
  page: 'sayfa | sayfalar',
  Page: 'Sayfa | Sayfalar',
  not_found: 'bulunamadı',
  sorry: 'Üzgünüz',
  delete_layer: 'Katmanı sil',
  not_saved_error: 'Veriler kaydedilemedi',
  something_wrong: 'Bir şeyler ters gitti',
  not_editable: 'düzenlenemez',
  unsaved_changes: 'Kaydedilmemiş değişiklikler',
  save_changes:
    'Bu sayfadan ayrılmak istediğinizden emin misiniz? Kaydedilmemiş tüm değişiklikler kaybolacak.',
  no_apiaries_yet: 'Henüz hiç arılığınız yok',
  need_help: 'Yardıma mı ihtiyacınız var?',
  Apiary_color: 'Arılık rengi',
  Set_notification_date: 'Bildirim tarihini ayarla',
  remove_image: 'Görseli kaldır',
  Total_colony_size: 'Toplam koloni büyüklüğü',
  bee: 'arı | arılar',
  view: 'Görüntüle',
  remove_queen: 'Ana arıyı kaldır',
  remove_group_short: 'İş birliği grubunu kaldır',
  device: 'Cihaz | Cihazlar',
  click_date_to_edit: 'Düzenlemek için tarihe tıklayın.',
  terms_of_use: 'hizmet şartları',
  sensor_definition: 'sensör tanımı | sensör tanımları',
  measurement: 'ölçüm | ölçümler',
  remove_device: 'Cihazı kaldır',
  last_message_received: 'Alınan son mesaj',
  transmission_ratio: 'Veri iletim oranı',
  period: 'Periyot',
  download: 'İndir',
  different_end_start: 'Bitiş ve başlangıç tarihleri farklı olmalı',
  later_end_start: 'Başlangıç tarihi bitiş tarihinden önce olmalı',
  or: 'veya',
  select_all_hives: 'Tüm kovanları seç',
  select_all_editable_hives: 'Düzenlenebilir tüm kovanları seç',
  Alert: 'Uyarı | Uyarılar',
  alert: 'uyarı | uyarılar',
  remove_alert: 'Uyarıyı kaldır',
  alerts_enabled: 'Uyarılar etkin',
  alerts_disabled: 'Uyarılar devre dışı',
  no_alerts: 'Yeni uyarı yok',
  alertrule: 'uyarı kuralı | uyarı kuralları',
  Alertrule: 'Uyarı kuralı | Uyarı kuralları',
  Measurement: 'Ölçüm | Ölçümler',
  Calculation: 'Hesaplama',
  calculation: 'hesaplama',
  Direct: 'Doğrudan',
  After: 'Şu süreden sonra ',
  times: ' kez',
  Comparator: 'Karşılaştırıcı',
  comparator: 'karşılaştırıcı',
  Comparison: 'Karşılaştırma',
  comparison: 'karşılaştırma',
  Threshold_value: 'Eşik değer',
  Minimum: 'En küçük',
  Maximum: 'En büyük',
  Derivative: 'Türev (artış veya azalış)',
  Count: 'Sayı',
  Value: 'Değer',
  Difference: 'Fark',
  Absolute_value: 'Mutlak değer',
  Exclude_months: '<strong>Devre dışı bırak</strong> bu uyarıyı şu aylarda:',
  Exclude_hours: '<strong>Devre dışı bırak</strong> bu uyarıyı şu saatlerde:',
  Exclude_hives:
    '<strong>Devre dışı bırak</strong> bu uyarıyı şu kovanlar için:',
  months: 'ay',
  hours: 'saat',
  delete_alertrule: 'Uyarı kuralını sil',
  create_alertrule: 'Uyarı kuralını kaydet',
  Active: 'Etkin',
  Alert_via_email: 'E-posta ile uyarı',
  this_field: 'Bu alan',
  alertrule_default: 'Varsayılan uyarı kuralı | Varsayılan uyarı kuralları',
  copy: 'Kopyala',
  Home: 'Ana sayfa',
  Select_default_alertrule: 'Varsayılan uyarı kuralını kopyala',
  Add_formula: 'Formül ekle',
  Explanation: 'Açıklama',
  db_influx: 'Influx Veritabanı',
  lambda_model: 'Lambda Model',
  open_weather: 'Open Weather',
  Period_future: 'gelecekte',
  Period_past: 'geçmişte',
  Minutes_calculator: 'Dakika hesaplayıcı',
  min: 'en küçük',
  max: 'en büyük',
  ave: 'ortalama',
  der: 'türev',
  cnt: 'sayı',
  equal_to: 'eşittir',
  less_than: 'küçüktür',
  greater_than: 'büyüktür',
  less_than_or_equal: 'küçük veya eşittir',
  greater_than_or_equal: 'büyük veya eşittir',
  export_email_sent: 'Excel dosyası e-postayla gönderildi',
  excel_file_saved: 'Excel dosyası İndirilenler klasörünüze kaydedildi',
  Updated_at: 'Güncellenme zamani',
  Not_yet_saved: 'Henüz kaydedilmedi',
  add_own_device: 'Kendi cihazını ekle',
  devices_url_text: 'BEEP base uygulaması hakkında daha fazla bilgi burada.',
  Apiary_management: 'Arılık yönetimi',
  Move: 'Taşı',
  Current_apiary: 'Mevcut arılık',
  sensor_key: 'Cihazın tekil tanımlayıcısı',
  disabled_settings: 'Bu ayarların elle düzenlenmesi devre dışı bırakıldı.',
  Address_placeholder: 'No, Sokak adı, Şehir',
  first_create_apiary: 'Önce bir arılık oluşturun',
  Unknown: 'Bilinmiyor',
  unknown: 'bilinmiyor',
  save_and_delete: 'Kaydet ve sil',
  New_hive: 'Yeni kovan',
  New_alertrule: 'Yeni uyarı kuralı',
  Add_alertrule: 'Uyarı kuralı ekle',
  Add_apiary: 'Arılık ekle',
  Add_sensor_definition: 'Sensör tanımı ekle',
  Add_member: 'Üye ekle',
  delete_sensordef: 'Sensör tanımını sil',
  delete_all_alerts: 'Tüm uyarıları sil',
  delete_all_alerts_warning:
    'Tüm uyarıları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
  delete_selected_alert: 'Seçili uyarıyı sil | Seçili uyarıları sil',
  already_verified: 'E-posta adresimi doğruladım ve giriş yapmak istiyorum',
  password_recovery_resend_mail: 'Yeni doğrulama kodu gönder',
  alert_rule_created: 'Yeni uyarı kuralı oluşturuldu',
  alert_rule_deleted: 'Uyarı kuralı silindi',
  deactivate_for_all_hives: 'Uyarıyı tüm kovanlar için devre dışı bırak',
  select_all: 'Tümünü seç',
  During: 'Şu süre boyunca',
  Every: 'Her ',
  Calculation_minutes: 'Hesaplamayı ne sıklıkla yapmamı istersiniz?',
  Calculation_minutes_short: 'Ne sıklıkla hesaplanıyor?',
  Disable_alert_for_this_hive: 'Bu kovan için uyarıyı devre dışı bırak',
  Alert_disabled_for_this_hive: 'Bu kovan için uyarı devre dışı bırakıldı',
  disabled_for_hive: 'kovan için devre dışı bırakıldı',
  Alert_disabled: 'Uyarı devre dışı',
  Log_data_import: 'Günlük verisini içe aktar',
  Log_files: 'Günlük dosyaları',
  Upload_date: 'Yükleme tarihi',
  Messages: 'Mesajlar',
  Log_time: 'Kaydedilme zamanı',
  File_size: 'Dosya boyutu',
  check_log_data: 'Günlük verisini kontrol et',
  delete_log_file: 'Günlük dosyasını sil',
  commit_log_data_short: 'Günlük verisini içe aktar',
  Immediately: 'Hemen',
  First_occurence: 'İlk',
  Last_occurence: 'Son',

  /* default alert rule names: */
  Hive_stability_and_theft: 'Hive stability & Theft',
  Temperature_sensor_defect: 'Temperature sensor defect',
  Battery_low: 'Battery voltage low',
  Honey_harvest: 'Honey harvest',
  Hive_temperature: 'Hive temperature low',
  Brood_temperature: 'Brood temperature low',
  No_measurements: 'No measurements',
  Swarm: 'Swarm',
  Food_supply_low: 'Food supply low',
  minute: 'dakika | dakikalar',
  Increase: 'Artış',
  Decrease: 'Azalış',
  Every_hour: 'Her saat',
  every_hour: 'her saat',
  Absolute_value_of_dif: 'Değişim',
  Alertrule_summary_title: 'Özet',
  Alertrule_settings_title: 'Uyarı kuralı ayarları',
  Alertrule_exclude_title: 'Dönem ve kovan istisnaları',
  of: '/',

  /* New translations v3.0.74 */
  Decline: 'Reddet',
  Decline_invitation: 'Daveti reddet',
  Decline_invitation_sure:
    'Grup davetini reddetmek istediğinizden emin misiniz?',
  selection: 'seçim',
  selection_placeholder: 'Bir dönem seçin',
  data_zoom: 'Veri yakınlaştırma',
  match: 'eşleşme | eşleşme',
  Matches_found: 'Eşleşme bulundu',
  Firmware_version: 'Yazılım sürümü',
  Interval: 'Aralık',
  View_data: 'Verileri görüntüle',
  show_all: 'Tümünü göster',
  Relative_startpoint: 'Göreli',
  Log_data: 'Günlük verisi',
  Flashlog: 'Günlük',
  Block: 'Blok',
  Nr_of_match_props: 'Eşleşme başına aynı değer sayısı',
  no_admin: 'Bu sayfayı görmek için yönetici olmalısınız',
  import_block_data_short: 'Blok verisini içe aktar',
  no_flashlog_data: 'Günlük verisi yok',
  no_flashlog_file: 'Günlük dosyası yok',
  no_device: 'Cihaz yok',
  data_not_stored: 'Veri kaydedilmedi',
  no_flashlog_found: 'Günlük dosyası bulunamadı',
  Size: 'Boyut',
  Match: 'Eşleşme | Eşleşmeler',
  Missing_data: 'Eksik veri',
  not_yet_in_db: 'henüz veritabanında değil',
  From_cache: 'Önbellekten',
  Time_diff: 'ΔSüre',
  seconds_short: 'sn',
  persisted_measurements: 'Kaydedilen ölçümler',
  persisted_days: 'Kaydedilen günler',
  no_data_stored: 'Veri kaydedilmedi',
  Fill_holes: 'Boşlukları doldur (tüm veri noktalarını birleştir)',
  Data_imported: 'Veri içe aktarıldı',
  undo_import: 'İçe aktarmayı geri al',
  data_deleted: 'Veri silindi',
  data_not_deleted: 'Veri silinmedi',
  deleted_measurements: 'Silinen ölçümler',
  deleted_days: 'silinen günler',
  Memory_erased: 'BEEP base belleği boşaltıldı',
  Export: 'Dışa aktar',
  Export_as_json: 'JSON verisi olarak dışa aktar',
  Export_as_csv: '.csv dosyası olarak dışa aktar',
  Export_full_json: 'Tam JSON dışa aktar',
  Export_full_csv: 'Tam .csv dışa aktar',
  Export_file_being_saved:
    'Dışa aktarma dosyası İndirilenler klasörünüze kaydedilecek - lütfen biraz bekleyin',
  no_data_deleted_because_no_matches_found:
    'Eşleşme bulunmadığı için veri silinmedi',
  nr_of_measurements: 'ölçüm sayısı',
  Now: 'Şimdi',
  select_inspection_date: 'Gözlem tarihini seçin',

  /* Translations page */
  Translations: 'Çeviriler',
  translation_exp:
    'Çevirmen olmak için support@beep.nl adresinden bir çevirmen hesabı talep edin. Mevcut çevirileri güncellemek istiyorsanız lütfen destek ile iletişime geçin.',
  unpublished_exp: 'Henüz yayınlanmamış çeviriler:',
  as_plain_text: 'düz metin olarak',

  /* Checklists page */
  new_checklist: 'Yeni kontrol listesi',
  duplicate: 'Çoğalt',
  delete_checklist: 'Kontrol listesini sil',

  /* Menu items */
  View_measurements: 'Ölçümleri görüntüle',
  View_inspection: 'Gözlemi görüntüle | Gözlemleri görüntüle',
  View_alert: 'Uyarıyı görüntüle | Uyarıları görüntüle',
  Edit_alertrule: 'Uyarı kuralını düzenle',
  Edit_hive: 'Kovanı düzenle',
  Edit_queen: 'Ana arıyı düzenle',
  Edit_apiary: 'Arılığı düzenle',
  Edit_group: 'İş birliği grubunu düzenle',
  Edit_group_short: 'Grubu düzenle',
  Edit_checklist: 'Kontrol listesini düzenle',
  Edit_devices: 'Cihazları düzenle',
  Edit_consent: 'Onayı düzenle',
  Edit_hivetag: 'Kovan etiketini düzenle',
  Hivetag: 'Kovan etiketi | Kovan etiketleri',
  qrcode: 'QR kodu | QR kodları',
  Qrcode_note:
    'Lütfen dikkat: yukarıdaki QR kodu gerçek kovan etiketi değildir, yalnızca örnektir.',
  Download_hivetags: 'Kovan etiketi PDF indir',
  Delete_hivetag: 'Kovan etiketini sil',
  for_hive: 'kovan için "',
  Add_hivetag: 'Kovan etiketi ekle',
  Select_hivetag_number: 'Bir kovan etiketi numarası seçin',
  Select_hive: 'Kovan seç | Kovanlar seç',
  Select_hive_for_hivetag_exp:
    'Eylemi hangi kovan için gerçekleştirmek istersiniz? Tek bir kovan seçin.',
  Select_hivetag_action: 'Bir eylem seçin',
  Select_hivetag_action_exp:
    'QR kodu okuttuktan sonra hangi eylemi gerçekleştirmek istersiniz?',
  Hivetag_hive_in_overview: 'Kovanı kovanlar özetinde göster',
  Hivetag_new_inspection: 'Yeni bir gözlem oluştur',
  Hivetag_edit_hive: 'Kovan yapılandırmasını düzenle',
  Hivetag_view_inspections: 'Gözlemleri görüntüle',
  Hivetags_url_text: 'Kovan etiketleri hakkında destek makalesini okuyun',
  No_hivetags_left:
    'Tüm kovan etiketleri şu anda kullanımda. Yeni bir etiket eklemek için mevcut bir etiketi kaldırın veya düzenleyin.',
  Select_hives_for_consent: 'Onay için kovanları seçin',
  Select_hives_for_consent_exp:
    'Bu araştırmayla paylaşmak istediğiniz kovanları seçin',

  /* iOS device prompt for adding BEEP app to home screen */
  pwa_title: 'BEEP uygulama olarak kullanılsın mı?',
  pwa_body:
    "BEEP'i ana ekranınıza ekleyin ve web uygulaması olarak, tam ekran kullanın. Giriş yaptıktan sonra oturumunuz açık kalacak.",
  pwa_share_button_label:
    '1. Alttaki menü çubuğundaki paylaş simgesine dokunun.',
  pwa_addhome_button_label: '2. "Ana ekrana ekle" seçeneğine dokunun.',
  Colony: 'Koloni | Koloniler',
  Dashboard: 'Panel | Paneller',
  Last_check: 'Son kontrol',
  Note: 'Not',
  no_chart_data_hive: 'Bu kovan için grafik verisi yok',
  Code: 'Kod',
  create_dashboard_question:
    'Henüz paneliniz yok mu? BEEP uygulaması üzerinden bir tane oluşturun',
  New_dashboard: 'Yeni panel',
  Edit_dashboard: 'Paneli düzenle',
  Delete_dashboard: 'Paneli sil',
  Logout_dashboard: 'Çıkış yap',
  Logout_dashboard_check:
    'Çıkış yapmak / panel değiştirmek istediğinizden emin misiniz?',
  weight_example_chart_1: 'Arılar nektar topluyor',
  weight_example_chart_2: 'Arılar kendi besin stoklarını kullanıyor',
  weight_example_chart_3: 'Bir arı sürüsü!',
  weight_example_chart_4: 'Kovan genişletildi',
  t_example_chart_1: '34°C: sağlıklı yavru',
  t_example_chart_2: '< 33°C: yavru yok',
  Max_hives_warning: 'Maksimum kovan sayısına ulaşıldı',
  Title: 'Başlık',
  Dashboard_title_exp: 'Varsayılan başlık "Panel"dir (bir başlık girilmezse).',
  Pace: 'Hız (saniye)',
  Dashboard_pace_exp: 'Her kovanın gösterildiği hız (sırayla)',
  Show_inspections: 'Gözlemleri göster',
  Show_inspections_exp: 'En son gözlemi göster (tarih, genel izlenim ve not).',
  Show_all_hives: 'Tüm kovanlar için ayrıntıları göster',
  Preview_share: 'Önizle ve paylaş',
  Copy_url: 'URL kopyala',

  /* offline inspection sheet */
  Hour_short: 'Sa | Saat',
  Day: 'Gün | Günler',
  Minute: 'Dakika | Dakikalar',
  Percentage_exp: '0 ile 100 arasında yüzde',
  Grade_exp_1: '1 ile 10 arası puan',
  Grade_exp_2: '(1 = Kötü, 10 = Çok iyi)',
  Degrees_exp_1: 'Şu değerler arasında derece',
  Degrees_exp_2: '-180° ile 180° arası',
  Negative_exp: 'Negatif sayı (0 altı)',
  Too_many_items_exp_1: 'Bu öğe için seçenek sayısı çok fazla,',
  Too_many_items_exp_2: 'yazdırmak için çok fazla; kendi cevabınızı yazın',
  Image_placeholder_1: 'Bu fotoğraf daha sonra eklenebilir',
  Image_placeholder_2: 'BEEP uygulaması üzerinden (isteğe bağlı)',
  Samplecode_placeholder_1: 'Örnek kod şu durumda oluşturulabilir:',
  Samplecode_placeholder_2: 'BEEP uygulamasında gözlem yüklenirken',
  Too_long_list_present:
    'Aşağıdaki öğe için seçenek listesi çevrimdışı kontrol listesinde gösterilemeyecek kadar uzun:',
  Too_long_list_present_fix_1:
    'Mümkünse seçenek sayısını şu değere veya daha azına',
  Too_long_list_present_fix_2:
    'indirin, "Kontrol listesini düzenle" düğmesiyle. Ya da doğru cevabı elle yazın.',
  Print: 'Yazdır',
  Print_checklist: 'Kontrol listesini yazdır',
  Print_checklist_exp:
    'Lütfen şu yazıcı ayarlarını kullandığınızdan emin olun:',
  Print_checklist_exp_1: 'Kağıt biçimi: A4',
  Print_checklist_exp_2: 'Kenar boşluğu yok',
  Print_checklist_exp_3: 'Siyah beyaz',
  Print_checklist_exp_4: 'Tek taraflı',

  /* inspection modes */
  Offline_inspection: 'Kağıt gözlem',
  Offline_inspection_exp:
    'Kontrol listesini yazdırın ve elle doldurun. Daha sonra "Kağıt gözlemi yükle" seçeneğiyle gözlem sayfalarının fotoğraflarını yükleyin.',
  Online_inspection: 'Dijital gözlem',
  Online_inspection_exp:
    'Kontrol listenizi alışkanlıklarınız olduğu gibi bilgisayarınız, tabletiniz veya akıllı telefonunuzla dijital olarak (çevrimiçi) doldurun',
  Upload_inspection: 'Kağıt gözlemi yükle',
  Upload_inspection_exp:
    'Kağıt gözlemi tamamladıysanız, gözlem sayfalarınızın fotoğraflarını buradan yükleyebilirsiniz. Uygulama bunları tanıyıp kontrol listesine aktaracaktır.',
  Select_inspection_mode: 'Gözlem modunu seçin',
  Send_pictures: 'Fotoğrafları gönder',
  svg_checklist: 'yazdırılmış kontrol listesi | yazdırılmış kontrol listeleri',
  Select_input_language: 'Kontrol listesinin hangi dilde doldurulduğunu seçin',
  Upload_images: 'Görselleri yükle',
  Upload_images_exp: 'Fotoğraf çekerken lütfen şunlara dikkat edin:',
  Upload_images_exp_1:
    'Her sayfanın Baskı Kimliği, yukarıda seçilen yazdırılmış kontrol listesinin Baskı Kimliğiyle aynı mı?',
  Upload_images_exp_2: 'Dört siyah karenin tamamı görünüyor mu?',
  Upload_images_exp_3:
    'Kâğıt düzgün aydınlatılmış ve düz bir yüzey üzerinde mi duruyor?',
  Upload_images_exp_4: 'Görüntü tarayıcısı kullanılsın mı?',
  Uploading_images_be_patient:
    'Lütfen biraz bekleyin, görselleriniz işleniyor. Bu birkaç dakika sürebilir. Lütfen bu pencereyi kapatmayın.',
  Generating_svg_be_patient:
    'Lütfen biraz bekleyin, yazdırılabilir kontrol listeniz oluşturuluyor. Bu biraz zaman alabilir. Lütfen bu pencereyi kapatmayın.',
  Parsed_pages: 'İşlenen sayfalar',
  Number_of_processed_pages: 'İşlenen sayfa sayısı: ',
  Incorrectly_uploaded_pages: 'Hatalı yüklenen sayfa numaraları: ',
  Missing_page: 'Eksik sayfa numarası | Eksik sayfa numaraları',
  Check_svg_id_for_page:
    'Sayfa numarası için Baskı Kimliğini kontrol edin | Sayfa numaraları için Baskı Kimliğini kontrol edin',
  correct_svg_id: 'doğru Baskı Kimliği',
  Svg_id_exp:
    'Baskı Kimliği sayfanın sağ üst köşesinde, sayfa numarasının solunda bulunur. Kağıt gözleminizi yüklerken Baskı Kimliğinin aynı olduğundan emin olun.',
  All_svg_ids_correct: 'Doğru yazdırılmış kontrol listesi seçildi',
  All_svg_ids_incorrect: 'Yanlış yazdırılmış kontrol listesi seçildi',
  No_checklist_svg: 'Henüz hiç kontrol listesi yazdırılmamış',
  No_checklist_svg_exp:
    'Kağıt gözlemi yüklemeden önce bir kontrol listesinin yazdırılıp (ve doldurulup) olması gerekir. "Kağıt gözlem" bölümüne gidin.',
  checklist_svg_exp:
    'Lütfen aşağıdaki yazdırılmış kontrol listesini seçin. Baskı Kimliğinin (ve dolayısıyla adının) Baskı Kimliğiyle aynı olduğundan emin olun.',

  /* Compare module */
  Load: 'Yükle',
  Compare: 'Karşılaştır',
  Select_hives_for_compare: 'Karşılaştırılacak kovanları seçin',
  Select_hives_for_compare_exp:
    'Verileri karşılaştırmak istediğiniz kovanları seçin',
  mean_weight_kg: 'Ortalama ağırlık',
  mean_net_weight_kg: 'Ortalama net ağırlık',
  net_weight_kg: 'Net ağırlık',
  overall_intake_loss: 'Toplam alım/kayıp',
  Compare_hives: 'Kovanları karşılaştır',
  Compare_with_mean:
    'Kovan ağırlığını diğer kovanların ortalama ağırlığıyla karşılaştır',
  compare_url_text: 'Karşılaştırma işlevi hakkında daha fazla bilgi burada',
  selected_hive: 'seçili kovan | seçili kovanlar',
  Multiple_hives_charts: 'Birden fazla kovanı tek grafikte karşılaştır',
  compare_no_chart_data: 'Seçili dönem için karşılaştırma verisi yok',
  multiple_hives_no_chart_data: 'Seçili kovanlar için seçili dönemde veri yok',
  Datetime_of_inspection: 'Gözlem tarihi ve saati',
  remind_datetime: 'Bildirim tarihi ve saati',
  cumulative_daily_weight_anomaly: 'Kümülatif günlük ağırlık anormalliği',
  colony_failure_weight_history:
    'Ağırlık geçmişine dayalı kış başarısızlığı olasılığı',
  more_info: 'daha fazla bilgi',
  api_token: 'API anahtarı',
  save_api: 'API anahtarını kaydet',

  /* TODO-VUE3 refactor into single term with prop */
  Fav_group_exp: 'Bu grubu favorilere ekle',
  Fav_apiary_exp: 'Bu arılığı favorilere ekle',
  Fav_exp: ' - listenin en üstünde gösterilir ve diğerlerinden önce yüklenir',

  /*
   * ------------------------------------------------------------------
   * TIER 2 - beekeeping terminology, awaiting a domain reviewer
   *
   * Left in English on purpose. These names describe hive biology and
   * sensor classes; a wrong Turkish term would misinform a beekeeper
   * about colony state, so no wording was guessed here.
   * ------------------------------------------------------------------
   */
  sound_fanning_4days: 'Fan 4d bees',
  sound_fanning_6days: 'Fan 6d bees',
  sound_fanning_9days: 'Fan 9d bees',
  sound_flying_adult: 'Flying bees',
  s_fan_4: 'Fan 4d bees',
  s_fan_6: 'Fan 6d bees',
  s_fan_9: 'Fan 9d bees',
  s_fly_a: 'Flying bees',
  Hive_stability_and_theft: 'Hive stability & Theft',
  Temperature_sensor_defect: 'Temperature sensor defect',
  Battery_low: 'Battery voltage low',
  Honey_harvest: 'Honey harvest',
  Hive_temperature: 'Hive temperature low',
  Brood_temperature: 'Brood temperature low',
  No_measurements: 'No measurements',
  Swarm: 'Swarm',
  Food_supply_low: 'Food supply low',

  /*
   * ------------------------------------------------------------------
   * TIER 3 - structural strings, intentionally not translated
   *
   * Each of these is assembled at runtime from other translation keys
   * (placeholders, counts, hive names) or is rendered as HTML. Turkish
   * word order cannot be produced by concatenating fragments, so these
   * need the .vue components that build them to be changed first.
   * They fall back to the English text until then.
   * ------------------------------------------------------------------
   */
  first_remove_hives:
    'Attention: there are still hives at this apiary. You can save specific hives (and their inspections) by first moving them to another apiary. If you continue with the deletion, you will delete ALL hives and inspections present at this location.',
  policy_url: 'https://beep.nl/terms-of-service',
  policy_version: 'beep_terms_2018_05_25_avg_v1',
  to_share:
    'to share with this group. 1 click = group members can view only, 2 clicks = group members can edit',
  Export_sensor_data:
    "Export all data per device in the highest possible resolution as a .csv file that you can open in Excel, or SPSS. NB: The date time data in the 'time' column is in GMT time, formatted by the RFC 3339 date-time standard.",
  too_much_data:
    'Too much data to process, please select fewer Sensor measurements, or reduce the timespan between start and end date.',
  beep_base_explanation:
    "If you have a BEEP base (shown in the picture above), please use the BEEP base app (iOS and Android) to set-up the communication with this app. If you don't have a BEEP base yet, please click on the menu item 'BEEP website' for updates on how to get a BEEP base. I you have your own measurement device and would like to see the data in the BEEP app, please send us a message to ask for joining our Slack community and you can get access to the API description.",
  change_checklist_confirm:
    'Are you sure you want to select a different checklist? Values of already filled in fields will be kept.',
  accept_policy_1: 'I accept the BEEP ',
  accept_policy_2: ', that are compatible with the new European privacy law',
  invalid_password:
    "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number and one special character (\\\\]{}()?\\\\-\"!@#%&/\\\\,><':;|_~`)",
  new_email_verification_sent:
    'A message with a verification link has been sent to your new email address. Click the link in the email to confirm your new email address and log in.',
  sensordef_info:
    "A sensor definition is intended to convert a sensor value from an incoming 'raw' sensor value into a value according to a physical quantity and unit (e.g. w_v = 1098273 => weight_kg = 62,400 kg) or to calibrate a sensor (e.g. t_0 = 15.3 ° C => t_0 = 15.8 ° C). This can be done by setting an 'offset' and a 'multiplier'. The input and output value remains the same if offset '0' and multiplier '1' is set. The BEEP base app (from the App Store) will provide you with the right sensor definitions at the initial setup of your BEEP base.",
  sensordef_date_info:
    'This calibration is valid from the set date to now (or another set calibration value)',
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
  Absolute_value_of_dif_explanation: '**Absolute value of the difference',
  Exclude_hives_details:
    'N.B. By default, this alert will be executed for all hives with a measurement device.',
  Exclude_hives_collab_group_exp:
    ' This includes hives from your collaboration group(s). Deactivate hives for which you do not wish to receive this alert.',
  No_hives_excluded_warning:
    "N.B. This alert will be executed for all hives with a measurement device, including hives from your collaboration group(s). You can deactivate hives for which you do not want to receive this notification via 'Exclude periods and hives'.",
  Save_alertrule_ok: 'Would you like to continue saving the alert rule?',
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
  Past_minutes: 'over the past [nr_of_minutes]',
  Future_minutes: 'over the next [nr_of_minutes]',
  Zero_period_minutes: 'over the last value only',
  Not_relevant_for_period_zero:
    "Not relevant when running over the last value only (see 'Period')",
  Only_comparison_available_for_source_type:
    "Only available comparison for measurements from this source (see 'Measurement')",
  alertrule_not_active:
    "This alert has been deactivated. You can activate it by checking the 'Active' box and saving this alert rule.",
  devices_info_text:
    'Please note: do you own a BEEP base? Use the BEEP base app to add your device. It will then automatically appear in the list below.',
  alert_explanation_1:
    'If you own a BEEP base or another device you can set alerts, such that you will receive an alert when the measurement data meets certain requirements. For example, a sudden drop in weight because of swarming. Alerts will be shown in this app, you can choose to receive them via email as well.',
  alert_explanation_2:
    'To get you started there are a few default alert rules you can use (and adapt to your own needs). In addition, you can create your own alert rules.',
  alertrules_url_text: "Go to 'Alert settings' to create your first alert rule",
  research_warning:
    "Please note: if you did not receive an invitation to participate, it is not needed to give consent to share your data, as your data won't be used in that case.",
  research_explanation_p1:
    'The BEEP platform is used in the research projects that are listed below. After you are invited to participate in a research project, you need to give consent for the researchers to access your bee data.',
  research_explanation_p2:
    'You can withdraw your consent at any time. From that moment onwards, no new data will be shared. The data that you shared in the period for which you gave consent will remain available for the research. In case of questions, please direct these to the contact person of your research project.',
  research_info:
    'Before you consent, please review the research description provided through the link below and request for additional details if needed.',
  drag_layers_info_text:
    'Drag layers from the left hand side to the desired position within the hive on the right hand side. Delete a layer from the hive by clicking on it and then clicking on the red bin icon. Within the hive, layers can be dragged as well to edit the position, layer color can be edited by clicking on the layer.',
  new_or_edited_but_not_saved_sensor_defs_warning:
    'N.B. sensor definitions will only be saved or added after clicking the green check icon at the end of the sensor definition row in the table.',
  delete_all_alerts_warning_filter_active:
    'Are you sure you want to delete all alerts? Alerts that do not match your search term will be deleted as well. This cannot be undone.',
  delete_selected_alerts_warning:
    'Are you sure you want to delete the selected alert? This cannot be undone. | Are you sure you want to delete the selected alerts? This cannot be undone.',
  delete_selected_alerts_invisible_checked_warning:
    'Please note: the selected alert does not match your search term. | Please note: there are selected alerts that do not match your search term, those will be deleted as well.',
  commit_log_data: 'Import data from this log file to the BEEP app: ',
  import_log_data_explanation:
    "In the BEEP base app you can download log data from the internal memory of the BEEP base. Every time you download log data, the internal memory gets cleared and the data gets uploaded to the BEEP app. Below is the list of your downloaded log data. You can view the log data by clicking the button 'Check log data'. As a result of this check you will see blocks of data that may or may not contain matches with the database data. For each block that contains matches you can view the log data and database data in a chart, and choose to supplement the data in the database with the log data.",
  import_log_data_url_text:
    'Here you can find the support article on downloading log data with the BEEP base app.',
  import_log_data_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000697129-download-beep-base-data-through-bluetooth',
  alertrule_active_no_email_sentence:
    ', and I open the BEEP app to see the alerts.',
  alertrule_active_email_sentence:
    ', and I receive alerts via email. In addition, I can see the alerts in the BEEP app.',
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
  upload_interval_warning_single_interval:
    'N.B. the data transmission interval of your device is | N.B. the data transmission interval of your devices is',
  upload_interval_warning_interval_range:
    'N.B. the data transmission intervals of your devices vary between ',
  not_relevant_for_immediate_calculation:
    'Not relevant for immediate calculation',
  In_case_of_good_connection_warning:
    '*Immediately after a measurement is received. This is dependent on the data transmission interval and the reliability of the data connection.',
  alerts_url_text: 'Read the support article about alerts',
  alerts_support_url:
    'https://beepsupport.freshdesk.com/nl/support/solutions/articles/60000706484-alerts',
  data_zoom_ok: 'Would you like to zoom in on the data of ',
  data_zoom_out_ok: 'Would you like to zoom out to the data of ',
  Length: 'Length: ',
  only_active_if_measurement_present:
    '*N.B. you will only receive alerts about the selected measurement if it is measured by your BEEP base / device.',
  commit_block_data:
    'Supplement BEEP app data with data from this log data block: ',
  data_stored_for_log: 'Data stored for Log ',
  undo_block_import_exp:
    'Are you sure that you want to delete the previously imported data from this block from the database?',
  input_only_possible_when_date_present:
    "Please select a 'date of inspection' first (above), to enable the inspection form. Click 'Now' to fill in the current date and time.",
  View_inspection_confirm: 'Would you like to view the inspection of: ',
  delete_checklist_confirm:
    'Are you sure you want to delete this checklist? This cannot be undone. Checklist: "',
  Hivetag_exp_1:
    "‘Hive tags’ are QR codes you can attach to a hive, and for which you can set an action that will be performed as soon as you scan the hive tag. An 'action' refers to actions in the BEEP app, such as creating a new inspection for the relevant hive. Once the hive tag has been set up, you only need to scan the QR code with your smartphone, and a new inspection will be automatically created. You can print the hive tags yourself, by ",
  Hivetag_download_text: 'downloading this pdf.',
  Hivetag_exp_2:
    ' Just scan a hive tag to get started, you will be taken to the setup page automatically if no action has been set yet.',
  Qrcode_exp1: "Attach the hive tag with number '",
  Qrcode_exp2: "' to a hive.",
  Hivetag_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000803807-qr-hive-tags',
  View_alert_confirm: 'Would you like to view the alert "',
  Dashboard_exp:
    "Create a dashboard via the 'New dashboard' button at the top right. You can then select hives that you would like to show on a public dashboard that is accessible at a separate url (for anyone with the code). Hives (and their measurements + latest inspection) will be shown one at a time.",
  Select_hives_for_dashboard_exp:
    'Which hives would you like to show in this dashboard? Select multiple hives (up to 12) for optimal effect. For hives with a device, temperature and weight data will be shown (if present). Only owned hives can be selected.',
  Dashboard_description_exp:
    'Please note: this description will not be shown on the dashboard. It can be used to store extra information, f.e. for whom this dashboard is intended',
  Dashboard_interval_exp:
    'Show measurement data from the previous hour/day/week/month/year or a custom period',
  Show_all_hives_exp:
    'Show details (location, last inspection, measurement data) for all selected hives (YES), or only for hives with a device (NO, recommended option)',
  compare_hives_exp:
    'Find out how your hive is developing compared to your other hives in the area. ',
  compare_support_url:
    'https://beepsupport.freshdesk.com/en/support/solutions/articles/60000921124-compare-hives-option',
  compare_chart_exp:
    'Please note: [hivename] will not be included in the mean weight calculation. ',
  Upload_pagenr: 'Upload page [pagenr] here',
}

export default translations
