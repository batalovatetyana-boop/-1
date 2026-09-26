/**
 * Тест у Google Формах для учнів з будь-яких акаунтів (без входу).
 * Створює форму-тест і таблицю результатів з аркушем «Оцінки».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script і запускайте функцію createNuclearTest.
 */

var CONTROL_TITLE = 'Контрольна робота. Ядерна фізика (9 клас)';

function createNuclearTest() {
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

  addQ_(form, 'Що показав дослід Резерфорда?',
    ['Атом — суцільна позитивна куля з електронами всередині', 'Атом неподільний', 'Електрони розташовані в центрі атома', 'Майже вся маса атома зосереджена в крихітному позитивному ядрі'], 3);
  addQ_(form, 'Що стверджує перший постулат Бора?',
    ['Електрон завжди випромінює енергію', 'Електрон може рухатися будь-якою орбітою', 'На стаціонарних орбітах електрон не випромінює енергію', 'Електрони знаходяться в ядрі'], 2);
  addQ_(form, 'Скільки нейтронів у ядрі ²³₁₁Na?',
    ['11', '12', '34', '23'], 1);
  addQ_(form, 'Що таке ізотопи?',
    ['Атоми з різною кількістю протонів', 'Атоми одного елемента з різною кількістю нейтронів', 'Атоми з різною кількістю електронів', 'Атоми різних елементів з однаковою масою'], 1);
  addQ_(form, 'Як виникає рентгенівське випромінювання в трубці?',
    ['Швидкі електрони різко гальмують на аноді', 'Електрони повільно рухаються в дроті', 'Ядра урану діляться', 'Анод нагрівається від полум\'я'], 0);
  addQ_(form, 'Чому на рентгенівському знімку кістки світлі?',
    ['Кістки світяться самі', 'Кістки відбивають світло лампи', 'Кістки сильніше поглинають рентгенівські промені', 'Кістки пропускають промені краще за м\'язи'], 2);
  addQ_(form, 'Хто відкрив радіоактивність?',
    ['Нільс Бор', 'Анрі Беккерель', 'Альберт Ейнштейн', 'Вільгельм Рентген'], 1);
  addQ_(form, 'Що таке α-частинка?',
    ['Нейтрон', 'Електромагнітна хвиля', 'Електрон', 'Ядро Гелію ⁴₂He'], 3);
  addQ_(form, 'Яке випромінювання має найбільшу проникну здатність?',
    ['β-випромінювання', 'α-випромінювання', 'Усі однакову', 'γ-випромінювання'], 3);
  addQ_(form, 'Що затримує α-випромінювання?',
    ['Аркуш паперу', 'Нічого не затримує', 'Лише шар бетону в 1 м', 'Лише товстий шар свинцю'], 0);
  addQ_(form, 'Як змінюються A і Z ядра під час α-розпаду?',
    ['A і Z не змінюються', 'A збільшується на 4, Z — на 2', 'A зменшується на 4, Z — на 2', 'A не змінюється, Z збільшується на 1'], 2);
  addQ_(form, 'Як змінюються A і Z ядра під час β-розпаду?',
    ['A зменшується на 1, Z не змінюється', 'A зменшується на 4, Z — на 2', 'A і Z не змінюються', 'A не змінюється, Z збільшується на 1'], 3);
  addQ_(form, 'Яке ядро утворюється: ²²⁶₈₈Ra → ? + ⁴₂He?',
    ['²²⁶₈₉Ac', '²²²₈₆Rn', '²²²₉₀Th', '²³⁰₉₀Th'], 1);
  addQ_(form, 'Що таке період піврозпаду?',
    ['Половина часу існування елемента', 'Час одного розпаду', 'Час, за який розпадаються всі ядра', 'Час, за який розпадається половина радіоактивних ядер'], 3);
  addQ_(form, 'Було 1600 ядер, T½ = 1 год. Скільки залишиться через 3 год?',
    ['200', '533', '400', '800'], 0);
  addQ_(form, 'У якій одиниці вимірюють активність радіоактивного джерела?',
    ['Беккерель (Бк)', 'Джоуль (Дж)', 'Ом (Ом)', 'Ньютон (Н)'], 0);
  addQ_(form, 'Яка частинка утворюється в реакції ⁹₄Be + ⁴₂He → ¹²₆C + ?',
    ['Протон', 'Нейтрон', 'α-частинка', 'Електрон'], 1);
  addQ_(form, 'Які величини зберігаються в ядерній реакції?',
    ['Кількість атомів кожного елемента', 'Лише кількість протонів', 'Масове число і заряд', 'Лише маса ядер'], 2);
  addQ_(form, 'Що відбувається під час поділу ядра Урану-235?',
    ['Ядро ділиться на два уламки, вилітають 2–3 нейтрони, виділяється енергія', 'Ядро перетворюється на Гелій', 'Ядро зливається з іншим ядром', 'Ядро випромінює лише електрон'], 0);
  addQ_(form, 'Навіщо в ядерному реакторі керувальні стрижні?',
    ['Виробляють уран', 'Сповільнюють турбіну', 'Поглинають нейтрони і керують швидкістю реакції', 'Нагрівають воду'], 2);
  addQ_(form, 'Що таке термоядерна реакція?',
    ['Злиття легких ядер за надвисокої температури', 'Горіння урану в кисні', 'Поділ важких ядер нейтронами', 'Розпад ядра з випромінюванням електрона'], 0);
  addQ_(form, 'Яке джерело енергії Сонця?',
    ['Хімічні реакції з киснем', 'Поділ ядер урану', 'Горіння вугілля', 'Термоядерний синтез водню в гелій'], 3);
  addQ_(form, 'Коли сталася аварія на Чорнобильській АЕС?',
    ['11 березня 2011 року', '26 квітня 1996 року', '26 квітня 1986 року', '6 серпня 1945 року'], 2);
  addQ_(form, 'Яка АЕС є найбільшою в Європі?',
    ['Хмельницька', 'Запорізька', 'Рівненська', 'Південноукраїнська'], 1);

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
    if (t.getHandlerFunction() === 'onNuclearSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onNuclearSubmit').forForm(form).onFormSubmit().create();

  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

function onNuclearSubmit(e) {
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
