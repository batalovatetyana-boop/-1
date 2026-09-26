/**
 * Тест у Google Формах для учнів з будь-яких акаунтів (без входу).
 * Створює форму-тест і таблицю результатів з аркушем «Оцінки».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script і запускайте функцію createReactionsTest.
 */

var CONTROL_TITLE = 'Контрольна робота. Хімічні реакції (8 клас)';

function createReactionsTest() {
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

  addQ_(form, 'Як формулюється закон збереження маси?',
    ['Під час реакції маса речовин зменшується', 'Маса продуктів завжди більша за масу реагентів', 'Маса реагентів дорівнює масі продуктів реакції', 'Маса зберігається лише під час розчинення'], 2);
  addQ_(form, 'Чому свічка під час горіння «легшає»?',
    ['Полум\'я не має маси', 'Речовина свічки зникає', 'Продукти горіння — гази — відлітають у повітря', 'Віск перетворюється на енергію'], 2);
  addQ_(form, '4 г водню повністю прореагували з 32 г кисню. Яка маса утвореної води?',
    ['28 г', '36 г', '32 г', '8 г'], 1);
  addQ_(form, 'Що показує коефіцієнт у записі 3H₂O?',
    ['Валентність Гідрогену', 'Кількість атомів Оксигену в молекулі', 'Масу води', 'Кількість молекул води'], 3);
  addQ_(form, 'Скільки атомів Гідрогену в записі 2H₂O?',
    ['2', '4', '3', '6'], 1);
  addQ_(form, 'Яке рівняння зрівняне правильно?',
    ['H₂ + O₂ → 2H₂O', 'H₂ + O₂ → H₂O', '2H₂ + 2O₂ → 2H₂O', '2H₂ + O₂ → 2H₂O'], 3);
  addQ_(form, 'Який коефіцієнт треба поставити перед Al у рівнянні _Al + 3O₂ → 2Al₂O₃?',
    ['3', '2', '4', '6'], 2);
  addQ_(form, 'Що НЕ можна змінювати, зрівнюючи рівняння?',
    ['Нічого з переліченого', 'Коефіцієнти', 'Індекси у формулах', 'Порядок запису продуктів'], 2);
  addQ_(form, 'До якого типу належить реакція 2Mg + O₂ → 2MgO?',
    ['Сполучення', 'Заміщення', 'Обміну', 'Розкладу'], 0);
  addQ_(form, 'До якого типу належить реакція CaCO₃ → CaO + CO₂?',
    ['Сполучення', 'Розкладу', 'Нейтралізації', 'Горіння'], 1);
  addQ_(form, 'Які речовини утворюються під час розкладу малахіту?',
    ['CuO, H₂O і CO₂', 'CuSO₄ і вода', 'Лише мідь', 'Cu, O₂ і H₂'], 0);
  addQ_(form, 'Як називають реакції, що відбуваються з виділенням теплоти?',
    ['Ендотермічні', 'Оборотні', 'Каталітичні', 'Екзотермічні'], 3);
  addQ_(form, 'Що відбувається під час розчинення аміачної селітри у воді?',
    ['Розчин охолоджується', 'Виділяється газ', 'Утворюється осад', 'Розчин сильно нагрівається'], 0);
  addQ_(form, 'Як правильно розводити сульфатну кислоту?',
    ['Лити воду в кислоту', 'Спочатку нагріти кислоту', 'Лити кислоту у воду тонким струменем', 'Змішувати швидко в будь-якому порядку'], 2);
  addQ_(form, 'Як змінюється швидкість реакції, якщо підвищити температуру на 10 °C?',
    ['Зростає у 2–4 рази', 'Зменшується вдвічі', 'Зростає у 100 разів', 'Не змінюється'], 0);
  addQ_(form, 'Чому порошок крейди реагує з кислотою швидше, ніж шматок?',
    ['Більша площа поверхні контакту', 'Шматок холодніший', 'Порошок легший', 'Порошок має іншу формулу'], 0);
  addQ_(form, 'Що таке каталізатор?',
    ['Речовина, що завжди вибухає', 'Речовина, що прискорює реакцію і не витрачається', 'Речовина, що уповільнює реакцію', 'Продукт реакції'], 1);
  addQ_(form, 'Як довести, що під час розкладу H₂O₂ з MnO₂ виділяється кисень?',
    ['Розчин синіє', 'З\'являється запах', 'Вапняна вода мутніє', 'Тліюча скіпка спалахує'], 3);
  addQ_(form, 'Які три умови потрібні для горіння?',
    ['Вода, кисень, сіль', 'Метал, кислота, вода', 'Світло, вода, вуглекислий газ', 'Горюча речовина, кисень, температура займання'], 3);
  addQ_(form, 'Чим НЕ можна гасити палаючу олію на сковорідці?',
    ['Кришкою', 'Водою', 'Протипожежною ковдрою', 'Піском'], 1);
  addQ_(form, 'Який метал найактивніший?',
    ['Мідь', 'Залізо', 'Золото', 'Калій'], 3);
  addQ_(form, 'Що потрібно одночасно для іржавіння заліза?',
    ['Вода і кисень', 'Лише вода', 'Сіль і світло', 'Лише кисень'], 0);
  addQ_(form, 'Чому піт рук прискорює корозію струн і клапанів?',
    ['Він містить олію', 'Він містить цукор', 'Він містить воду і солі', 'Він холодний'], 2);
  addQ_(form, 'Навіщо змащують оливою помпи мідних духових інструментів?',
    ['Щоб прискорити окиснення', 'Олива ізолює метал від води й кисню та зменшує тертя', 'Щоб метал блищав золотом', 'Щоб інструмент звучав голосніше'], 1);

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
    if (t.getHandlerFunction() === 'onReactionsSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onReactionsSubmit').forForm(form).onFormSubmit().create();

  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

function onReactionsSubmit(e) {
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
