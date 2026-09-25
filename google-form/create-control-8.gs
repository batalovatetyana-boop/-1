/**
 * Контрольна робота (тест), 8 клас.
 * Теми: Анатомія музики (тіла, методи пізнання, вимірювання, дифузія, атом);
 * а.о.м. і Періодична система; чисті речовини й суміші, розділення, хроматографія;
 * адсорбція; фізичні та хімічні явища.
 *
 * Скрипт створює Google Форму-тест, яку можуть заповнювати учні
 * З БУДЬ-ЯКИХ акаунтів (або взагалі без входу), і таблицю з результатами.
 *
 * Як користуватися: див. google-form/README.md, розділ «Контрольна 8 клас».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script.
 */

var CONTROL_TITLE = 'Контрольна робота. Природничі науки, 8 клас';

function createControlTest() {
  var form = FormApp.create(CONTROL_TITLE);
  form
    .setIsQuiz(true)
    .setDescription('Оберіть одну правильну відповідь у кожному питанні. ' +
      'За кожну правильну відповідь — 1 бал. Оцінка = бали : 2.')
    .setShuffleQuestions(true)
    .setProgressBar(true)
    .setConfirmationMessage('Дякую! Роботу надіслано.');

  // Доступ для учнів з будь-яких акаунтів:
  // не вимагати входу в корпоративний домен, не збирати e-mail,
  // не обмежувати однією відповіддю (це обмеження вимагає входу в акаунт).
  try { form.setRequireLogin(false); } catch (err) { Logger.log('setRequireLogin: ' + err); }
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT);
  } catch (err) {
    form.setCollectEmail(false);
  }
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);

  // Розділ 1: дані учня (не перемішується з питаннями).
  var nameItem = form.addTextItem().setTitle("Прізвище та ім'я").setRequired(true);
  var classItem = form.addTextItem().setTitle('Клас').setRequired(true);
  form.addPageBreakItem().setTitle('Тест');

  // --- Тема 1. Анатомія музики: від макросвіту до мікросвіту ---
  addQ_(form, 'Що з наведеного є фізичним тілом?',
    ['Струна гітари', 'Сталь', 'Залізо', 'Електромагнітне поле'], 0);
  addQ_(form, 'Як називається метод пізнання, коли вчений лише фіксує явища, не втручаючись у них?',
    ['Експеримент', 'Спостереження', 'Моделювання', 'Вимірювання'], 1);
  addQ_(form, 'Вимірювання довжини струни рулеткою — це…',
    ['непряме вимірювання', 'пряме вимірювання', 'моделювання', 'спостереження'], 1);
  addQ_(form, 'Чому глядачі в залі відчувають запах каніфолі?',
    ['Через броунівський рух', 'Через дифузію', 'Через адсорбцію', 'Через хімічну реакцію'], 1);
  addQ_(form, 'З яких частинок складається ядро атома?',
    ['З електронів', 'З протонів і нейтронів', 'З протонів і електронів', 'Лише з нейтронів'], 1);

  // --- Тема 2. Маса атома та Періодична система ---
  addQ_(form, '1 атомна одиниця маси (а.о.м.) дорівнює…',
    ['1/12 маси атома Карбону', 'масі атома Гідрогену', '1 граму', '1/16 маси атома Оксигену'], 0);
  addQ_(form, 'Чому дорівнює відносна атомна маса Оксигену (заокруглена)?',
    ['8', '16', '12', '32'], 1);
  addQ_(form, 'Який хімічний символ має Ферум (Залізо)?',
    ['F', 'Fe', 'Fr', 'Ff'], 1);
  addQ_(form, 'Що показує порядковий номер елемента в Періодичній системі?',
    ['Кількість протонів у ядрі (заряд ядра)', 'Відносну атомну масу', 'Кількість нейтронів', 'Номер групи'], 0);
  addQ_(form, 'Яка з речовин є простою?',
    ['Вода H₂O', 'Кисень O₂', 'Кухонна сіль NaCl', 'Вуглекислий газ CO₂'], 1);

  // --- Тема 3. Чисті речовини, суміші, хроматографія ---
  addQ_(form, 'Що з наведеного є чистою речовиною?',
    ['Морська вода', 'Повітря', 'Дистильована вода', 'Молоко'], 2);
  addQ_(form, 'Яка суміш є однорідною?',
    ['Пісок у воді', 'Розчин цукру у воді', 'Олія у воді', 'Глина у воді'], 1);
  addQ_(form, 'Як відокремити залізні ошурки від піску?',
    ['Фільтруванням', 'Магнітом', 'Випарюванням', 'Дистиляцією'], 1);
  addQ_(form, 'Як добути кухонну сіль з її розчину у воді?',
    ['Фільтруванням', 'Магнітом', 'Випарюванням', 'Відстоюванням'], 2);
  addQ_(form, 'На чому ґрунтується хроматографія?',
    ['На різній швидкості руху компонентів суміші', 'На магнітних властивостях речовин',
      'На різній густині рідин', 'На нагріванні суміші'], 0);

  // --- Тема 4. Адсорбція ---
  addQ_(form, 'Адсорбція — це поглинання речовини…',
    ['усім об\'ємом тіла', 'лише поверхнею твердого тіла або рідини',
      'тільки під час хімічної реакції', 'тільки рідинами'], 1);
  addQ_(form, 'Як називається речовина, яка поглинає інші речовини своєю поверхнею?',
    ['Адсорбат', 'Адсорбент', 'Розчинник', 'Каталізатор'], 1);
  addQ_(form, 'Навіщо пакетики силікагелю кладуть у коробки з взуттям і футляри скрипок?',
    ['Щоб поглинати вологу', 'Для приємного запаху', 'Щоб знищувати бактерії', 'Для ваги'], 0);
  addQ_(form, 'Який адсорбент використовують при отруєннях і в протигазах?',
    ['Силікагель', 'Активоване вугілля', 'Кухонну сіль', 'Пісок'], 1);

  // --- Тема 5. Фізичні та хімічні явища ---
  addQ_(form, 'Яке явище є хімічним?',
    ['Танення льоду', 'Кипіння води', 'Іржавіння заліза', 'Подрібнення крейди'], 2);
  addQ_(form, 'Яке явище є фізичним?',
    ['Горіння свічки', 'Скисання молока', 'Розчинення цукру у воді', 'Гниття листя'], 2);
  addQ_(form, 'Що є ознакою хімічної реакції?',
    ['Зміна форми', 'Виділення газу під час змішування соди з оцтом', 'Подрібнення', 'Плавлення'], 1);
  addQ_(form, 'Яка головна ознака хімічного явища?',
    ['Утворення нової речовини', 'Зміна агрегатного стану', 'Зміна форми', 'Зміна розміру'], 0);
  addQ_(form, 'Який процес є фізичним явищем, хоча в ньому теж з\'являються бульбашки?',
    ['Сода з оцтом', 'Кипіння води', 'Шипуча таблетка у воді', 'Бродіння тіста'], 1);

  var maxPoints = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).length;

  // Таблиця результатів.
  var ss = SpreadsheetApp.create('Результати — ' + CONTROL_TITLE);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  var sheet = ss.insertSheet('Оцінки', 0);
  sheet.appendRow(['Час', "Прізвище та ім'я", 'Клас', 'Бали', 'Максимум', 'Оцінка (12-бальна)']);
  sheet.setFrozenRows(1);
  sheet.getRange('A1:F1').setFontWeight('bold');

  PropertiesService.getScriptProperties().setProperties({
    FORM_ID: form.getId(),
    SHEET_ID: ss.getId(),
    NAME_ID: String(nameItem.getId()),
    CLASS_ID: String(classItem.getId()),
    MAX_POINTS: String(maxPoints)
  });

  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onControlSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onControlSubmit').forForm(form).onFormSubmit().create();

  // Нові форми Google треба «опублікувати», щоб вони приймали відповіді.
  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

/** Запускається автоматично після кожного надсилання форми. */
function onControlSubmit(e) {
  var props = PropertiesService.getScriptProperties().getProperties();
  var response = e.response;

  var total = 0;
  response.getGradableItemResponses().forEach(function (ir) {
    total += Number(ir.getScore()) || 0;
  });

  var name = '';
  var klass = '';
  response.getItemResponses().forEach(function (ir) {
    var id = String(ir.getItem().getId());
    if (id === props.NAME_ID) name = ir.getResponse();
    if (id === props.CLASS_ID) klass = ir.getResponse();
  });

  var max = Number(props.MAX_POINTS);
  var grade12 = Math.max(1, Math.round(total / max * 12));

  SpreadsheetApp.openById(props.SHEET_ID).getSheetByName('Оцінки').appendRow([
    response.getTimestamp(), name, klass, total, max, grade12
  ]);
}

function addQ_(form, title, options, correctIndex) {
  var item = form.addMultipleChoiceItem().setTitle(title).setRequired(true);
  item.setChoices(options.map(function (text, i) {
    return item.createChoice(text, i === correctIndex);
  }));
  item.setPoints(1);
  return item;
}
