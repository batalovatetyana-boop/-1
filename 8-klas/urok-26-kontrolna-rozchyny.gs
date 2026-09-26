/**
 * Тест у Google Формах для учнів з будь-яких акаунтів (без входу).
 * Створює форму-тест і таблицю результатів з аркушем «Оцінки».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script і запускайте функцію createSolutionsTest.
 */

var CONTROL_TITLE = 'Контрольна робота. Розчини та дисперсні системи (8 клас)';

function createSolutionsTest() {
  var form = FormApp.create(CONTROL_TITLE);
  form
    .setIsQuiz(true)
    .setDescription('Оберіть одну правильну відповідь у кожному питанні. ' +
      'За кожну правильну відповідь — 1 бал. Оцінку за 12-бальною шкалою буде пораховано автоматично.')
    .setShuffleQuestions(true)
    .setProgressBar(true)
    .setConfirmationMessage('Дякую! Роботу надіслано.');

  try { form.setRequireLogin(false); } catch (err) { Logger.log('setRequireLogin: ' + err); }
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.DO_NOT_COLLECT);
  } catch (err) {
    form.setCollectEmail(false);
  }
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);

  var nameItem = form.addTextItem().setTitle("Прізвище та ім'я").setRequired(true);
  var classItem = form.addTextItem().setTitle('Клас').setRequired(true);
  form.addPageBreakItem().setTitle('Тест');

  addQ_(form, 'З чого складається розчин?',
    ['З води і повітря', 'З розчинника і розчиненої речовини', 'Лише з води', 'З двох твердих речовин'], 1);
  addQ_(form, 'З яких атомів складається молекула води?',
    ['2 атоми Оксигену і 1 атом Гідрогену', '1 атом Оксигену і 1 атом Гідрогену', '2 атоми Оксигену і 2 атоми Гідрогену', '1 атом Оксигену і 2 атоми Гідрогену'], 3);
  addQ_(form, 'Яку речовину вода НЕ розчиняє?',
    ['Кухонну сіль', 'Олію', 'Цукор', 'Спирт'], 1);
  addQ_(form, 'Що таке розчинність?',
    ['Об\'єм води в розчині', 'Маса всього розчину', 'Швидкість, з якою речовина розчиняється', 'Найбільша маса речовини, що розчиняється в 100 г води за певної температури'], 3);
  addQ_(form, 'Як називають розчин, у якому речовина за цієї температури більше не розчиняється?',
    ['Насичений', 'Розбавлений', 'Колоїдний', 'Ненасичений'], 0);
  addQ_(form, 'Як змінюється розчинність газів у воді під час нагрівання?',
    ['Спочатку зростає, потім падає до нуля', 'Збільшується', 'Зменшується', 'Не змінюється'], 2);
  addQ_(form, 'Яка формула масової частки розчиненої речовини?',
    ['w = m(води) : m(розчину)', 'w = m(речовини) : m(води)', 'w = m(речовини) : m(розчину)', 'w = m(розчину) : m(речовини)'], 2);
  addQ_(form, 'У 90 г води розчинили 10 г солі. Яка масова частка солі?',
    ['90 %', '9 %', '11 %', '10 %'], 3);
  addQ_(form, 'Скільки грамів солі міститься в 200 г розчину з масовою часткою 5 %?',
    ['20 г', '10 г', '190 г', '5 г'], 1);
  addQ_(form, 'До 100 г розчину з w = 10 % долили 100 г води. Якою стала масова частка?',
    ['10 %', '1 %', '5 %', '20 %'], 2);
  addQ_(form, 'Який об\'єм має 1 г води?',
    ['10 мл', '1 л', '1 мл', '100 мл'], 2);
  addQ_(form, 'До якого виду дисперсних систем належить молоко?',
    ['Емульсія', 'Суспензія', 'Справжній розчин', 'Аерозоль'], 0);
  addQ_(form, 'До якого виду дисперсних систем належить туман?',
    ['Аерозоль', 'Піна', 'Суспензія', 'Гель'], 0);
  addQ_(form, 'Як відрізнити колоїдний розчин від справжнього?',
    ['За запахом', 'За кольором', 'За смаком', 'За ефектом Тіндаля: у колоїді видно промінь світла'], 3);
  addQ_(form, 'Політура — це розчин шелаку в…',
    ['спирті', 'олії', 'бензині', 'воді'], 0);
  addQ_(form, 'Чому скрипкові майстри клеять інструменти столярним клеєм?',
    ['Він найдешевший', 'Він оборотний: шов можна розкрити для ремонту', 'Він не боїться води', 'Він прозорий'], 1);
  addQ_(form, 'З чого одержують каніфоль?',
    ['З нафти', 'З кам\'яного вугілля', 'З молока', 'З живиці сосни'], 3);
  addQ_(form, 'Навіщо натирати смичок каніфоллю?',
    ['Щоб смичок гарно пах', 'Щоб захистити смичок від вологи', 'Щоб збільшити тертя між волосом і струною', 'Щоб смичок блищав'], 2);
  addQ_(form, 'Чим НЕ можна протирати скрипку зі спиртовим лаком?',
    ['Сухою мікрофіброю', 'Спиртовою серветкою', 'М\'якою сухою ганчіркою', 'Спеціальною поліроллю для інструментів'], 1);
  addQ_(form, 'Яке головне правило вибору очисника для інструмента?',
    ['Обирати найдешевший засіб', 'Що сильніший засіб, то краще', 'Він має розчиняти бруд, але не розчиняти покриття', 'Завжди використовувати ацетон'], 2);
  addQ_(form, 'Яка частина всієї води на Землі прісна?',
    ['Близько 3 %', 'Близько 50 %', 'Близько 71 %', 'Близько 97 %'], 0);
  addQ_(form, 'Як піт охолоджує тіло?',
    ['Вода з поту випаровується і забирає тепло', 'Солі в поті охолоджують шкіру', 'Піт завжди холодний', 'Піт відбиває сонячне світло'], 0);
  addQ_(form, 'Що таке мінералізація води?',
    ['Кількість мікробів у воді', 'Прозорість води', 'Температура води', 'Загальна маса солей, розчинених в 1 л води'], 3);
  addQ_(form, 'Який перший етап очищення стічних вод?',
    ['Хлорування', 'Механічне очищення: решітки й відстоювання', 'Біологічне очищення', 'Кип\'ятіння'], 1);

  var maxPoints = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).length;

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
    if (t.getHandlerFunction() === 'onSolutionsSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onSolutionsSubmit').forForm(form).onFormSubmit().create();

  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

function onSolutionsSubmit(e) {
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
