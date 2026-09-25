/**
 * Контрольна робота (тест), 9 клас: Вуглеводні — алкани, алкени, алкіни.
 * Створює Google Форму-тест для учнів з будь-яких акаунтів (без входу)
 * і таблицю результатів з аркушем «Оцінки».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script.
 */

var CONTROL_TITLE = 'Контрольна робота. Вуглеводні: алкани, алкени, алкіни (9 клас)';

function createHydrocarbonTest() {
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

  // --- Вуглеводні: склад, будова, формули ---
  addQ_(form, 'З атомів яких елементів складаються вуглеводні?',
    ['Карбону і Гідрогену', 'Карбону і Оксигену', 'Карбону, Гідрогену і Оксигену', 'Гідрогену і Нітрогену'], 0);
  addQ_(form, 'Яка валентність Карбону в органічних сполуках?',
    ['II', 'III', 'IV', 'I'], 2);
  addQ_(form, 'Яка загальна формула алканів?',
    ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], 1);
  addQ_(form, 'Яка загальна формула алкенів?',
    ['CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ', 'CₙH₂ₙ₊₁'], 2);
  addQ_(form, 'Яка загальна формула алкінів?',
    ['CₙH₂ₙ₋₂', 'CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₆'], 0);
  addQ_(form, 'Які зв\'язки між атомами Карбону в молекулах алканів?',
    ['Тільки одинарні', 'Один подвійний', 'Один потрійний', 'Подвійні й потрійні'], 0);
  addQ_(form, 'Молекули алкенів містять…',
    ['лише одинарні зв\'язки', 'один подвійний зв\'язок C=C', 'один потрійний зв\'язок C≡C', 'бензенове кільце'], 1);
  addQ_(form, 'Молекули алкінів містять…',
    ['один подвійний зв\'язок C=C', 'лише одинарні зв\'язки', 'один потрійний зв\'язок C≡C', 'два подвійні зв\'язки'], 2);

  // --- Назви та гомологічний ряд алканів ---
  addQ_(form, 'Який суфікс мають назви алканів?',
    ['-ен', '-ан', '-ин', '-ол'], 1);
  addQ_(form, 'Який суфікс мають назви алкенів?',
    ['-ан', '-ин', '-ен', '-ол'], 2);
  addQ_(form, 'Яка формула метану?',
    ['CH₄', 'C₂H₆', 'C₂H₄', 'C₂H₂'], 0);
  addQ_(form, 'Яка формула пропану?',
    ['C₃H₆', 'C₃H₈', 'C₃H₄', 'C₂H₆'], 1);
  addQ_(form, 'Скільки атомів Карбону в молекулі октану?',
    ['6', '8', '10', '4'], 1);
  addQ_(form, 'Який з алканів за звичайних умов є рідиною?',
    ['Метан', 'Пропан', 'Пентан', 'Бутан'], 2);

  // --- Метан, етен, етин ---
  addQ_(form, 'Що є основною складовою природного газу?',
    ['Етан', 'Метан', 'Етен', 'Етин'], 1);
  addQ_(form, 'Чому побутовий газ має запах?',
    ['Метан має різкий запах', 'До нього додають одоранти', 'Через домішки води', 'Через горіння'], 1);
  addQ_(form, 'Яка формула етену (етилену)?',
    ['C₂H₆', 'C₂H₄', 'C₂H₂', 'CH₄'], 1);
  addQ_(form, 'Як інакше називають етин?',
    ['Етилен', 'Ацетилен', 'Метан', 'Пропан'], 1);
  addQ_(form, 'Для чого використовують ацетилен (етин)?',
    ['Для зварювання і різання металів', 'Для виготовлення поліетилену', 'Як ліки', 'Щоб фрукти швидше дозрівали'], 0);
  addQ_(form, 'Що виробляють з етену?',
    ['Поліетилен', 'Скло', 'Сталь', 'Папір'], 0);
  addQ_(form, 'Які вуглеводні знебарвлюють бромну воду?',
    ['Тільки алкани', 'Алкени та алкіни', 'Жодні', 'Тільки метан'], 1);

  // --- Визнач клас за формулою ---
  addQ_(form, 'До якого класу належить вуглеводень C₃H₆?',
    ['Алкани', 'Алкени', 'Алкіни', 'Арени'], 1);
  addQ_(form, 'До якого класу належить вуглеводень C₄H₆?',
    ['Алкани', 'Алкени', 'Алкіни', 'Арени'], 2);
  addQ_(form, 'До якого класу належить вуглеводень C₅H₁₂?',
    ['Алкани', 'Алкени', 'Алкіни', 'Арени'], 0);

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
    if (t.getHandlerFunction() === 'onHydrocarbonSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onHydrocarbonSubmit').forForm(form).onFormSubmit().create();

  // Нові форми Google треба «опублікувати», щоб вони приймали відповіді.
  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

/** Запускається автоматично після кожного надсилання форми. */
function onHydrocarbonSubmit(e) {
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
