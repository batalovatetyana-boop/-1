/**
 * Самостійна робота «Періодичний закон Д. І. Менделєєва».
 *
 * Скрипт створює Google Форму в режимі тесту (з ключем відповідей і балами)
 * та Google Таблицю з результатами.
 *
 * Як користуватися: див. google-form/README.md
 *   1. script.google.com → Новий проєкт → вставити цей код.
 *   2. Вибрати функцію createQuiz → Виконати → надати дозволи.
 *   3. Посилання на форму й таблицю з'являться в «Журналі виконання».
 */

var QUIZ_TITLE = 'Самостійна робота: «Періодичний закон Д. І. Менделєєва»';

// Бали за 12-те питання (відкрита відповідь, перевіряється автоматично).
var Q12_POINTS = 2;

// Правильні відповіді на 12-те питання (після нормалізації: без пробілів,
// надрядкові цифри → звичайні, кирилична «с»/«р» → латинська s/p).
var Q12_ACCEPTED = ['1s22s22p63s23p5', '[ne]3s23p5'];

function createQuiz() {
  var form = FormApp.create(QUIZ_TITLE);
  form
    .setIsQuiz(true)
    .setDescription('Уважно прочитайте кожне питання та оберіть правильну відповідь. ' +
      'Після надсилання форму змінити не можна.')
    .setShuffleQuestions(false)
    .setProgressBar(true)
    .setConfirmationMessage('Дякую! Вашу роботу надіслано.');

  // Збирати e-mail учня (потрібно для імпорту оцінок у Google Клас).
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED);
  } catch (err) {
    form.setCollectEmail(true);
  }
  form.setLimitOneResponsePerUser(true);

  var nameItem = form.addTextItem().setTitle("Прізвище та ім'я").setRequired(true);
  var classItem = form.addTextItem().setTitle('Клас').setRequired(true);

  addChoice_(form, '1. Серед наведених елементів оберіть найбільш активний металічний елемент:',
    ['Натрій', 'Алюміній', 'Сульфур', 'Манган'], 0, 1);

  addChoice_(form, '2. Позначте ряд елементів, в якому наведено тільки елементи другої групи:',
    ['Алюміній, Берилій, Карбон', 'Літій, Нітроген, Флуор',
      'Берилій, Магній, Барій', 'Магній, Стронцій, Нітроген'], 2, 1);

  addChoice_(form, '3. Позначте елемент, що входить до складу головної підгрупи:',
    ['Кальцій', 'Ферум', 'Купрум', 'Меркурій'], 0, 1);

  addChoice_(form, '4. Позначте елемент, що входить до складу побічної підгрупи:',
    ['Натрій', 'Стронцій', 'Аргентум', 'Станум'], 2, 1);

  addChoice_(form, '5. Позначте елемент, що може виявляти валентність IV:',
    ['Сульфур', 'Оксиген', 'Флуор', 'Аргентум'], 0, 1);

  // Питання 6 (відповідність) — чотири окремі питання по 1 балу.
  form.addSectionHeaderItem()
    .setTitle('6. Встановіть відповідність між хімічним елементом та його положенням у Періодичній системі')
    .setHelpText('Для кожного положення оберіть елемент. Один елемент зайвий.');
  var q6Elements = ['K', 'S', 'Se', 'Be', 'Cr'];
  addChoice_(form, '6а) 2 період, група IIA', q6Elements, 3, 1);
  addChoice_(form, '6б) 3 період, група VIA', q6Elements, 1, 1);
  addChoice_(form, '6в) 4 період, група IA', q6Elements, 0, 1);
  addChoice_(form, '6г) 4 період, група VIБ', q6Elements, 4, 1);

  addChoice_(form, '7. Позначте назву елемента, заряд ядра атома якого дорівнює +18:',
    ['Кальцій', 'Флуор', 'Аргон', 'Хлор'], 2, 1);

  addChoice_(form, '8. Позначте назву елемента, ядро якого містить на два протони більше за ядро Магнію:',
    ['Неон', 'Силіцій', 'Берилій', 'Кальцій'], 1, 1);

  addCheckbox_(form, '9. Позначте правильні твердження про нуклід Оксиген-18:',
    ['в ядрі атома цього нукліду міститься 8 протонів',
      'в атомах цього нукліду на 2 електрони менше, ніж протонів',
      'атоми нукліду Оксиген-18 дуже поширені на Землі',
      'в ядрі атома цього нукліду міститься 18 нейтронів'],
    [0], 1, 'Може бути кілька правильних відповідей.');

  addChoice_(form, '10. Вкажіть електронну конфігурацію атома Фосфору:',
    ['1s² 2s² 2p⁶', '1s² 2s² 2p⁶ 3s² 3p³', '1s² 2s² 2p³ 3s² 3p⁵', '1s² 2s² 2p⁶ 3s² 3p⁵'], 1, 1);

  addChoice_(form, '11. Позначте назву елемента, що має електронну конфігурацію 1s² 2s² 2p³:',
    ['Натрій', 'Нітроген', 'Фосфор', 'Літій'], 1, 1);

  var q12 = form.addTextItem()
    .setTitle('12. Розпишіть електронну конфігурацію атома хімічного елемента з порядковим номером 17.')
    .setHelpText('Пишіть так: 1s2 2s2 2p6 … (цифри після букв — кількість електронів).')
    .setPoints(Q12_POINTS)
    .setRequired(true);

  // Максимальна кількість балів.
  var maxPoints = 0;
  form.getItems().forEach(function (item) {
    var points = getPoints_(item);
    if (points) maxPoints += points;
  });

  // Таблиця результатів: аркуш із відповідями + аркуш «Оцінки».
  var ss = SpreadsheetApp.create('Результати — ' + QUIZ_TITLE);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  var gradesSheet = ss.insertSheet('Оцінки', 0);
  gradesSheet.appendRow(['Час', "Прізвище та ім'я", 'Клас', 'E-mail',
    'Бали', 'Максимум', 'Оцінка (12-бальна)', 'Питання 12 (відповідь учня)']);
  gradesSheet.setFrozenRows(1);
  gradesSheet.getRange('A1:H1').setFontWeight('bold');

  PropertiesService.getScriptProperties().setProperties({
    FORM_ID: form.getId(),
    SHEET_ID: ss.getId(),
    NAME_ID: String(nameItem.getId()),
    CLASS_ID: String(classItem.getId()),
    Q12_ID: String(q12.getId()),
    MAX_POINTS: String(maxPoints)
  });

  // Тригер: перевіряє 12-те питання й записує оцінку після кожного надсилання.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onQuizSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onQuizSubmit').forForm(form).onFormSubmit().create();

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Максимум балів: ' + maxPoints);
}

/** Запускається автоматично після кожного надсилання форми. */
function onQuizSubmit(e) {
  var props = PropertiesService.getScriptProperties().getProperties();
  var form = FormApp.openById(props.FORM_ID);
  var response = e.response;

  // Автоперевірка питання 12.
  var q12Answer = '';
  response.getGradableItemResponses().forEach(function (ir) {
    if (String(ir.getItem().getId()) === props.Q12_ID) {
      q12Answer = String(ir.getResponse() || '');
      var ok = Q12_ACCEPTED.indexOf(normalizeConfig_(q12Answer)) !== -1;
      ir.setScore(ok ? Q12_POINTS : 0);
      response.withItemGrade(ir);
    }
  });
  form.submitGrades([response]);
  response = form.getResponse(response.getId());

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
    response.getTimestamp(), name, klass, response.getRespondentEmail(),
    total, max, grade12, q12Answer
  ]);
}

function addChoice_(form, title, options, correctIndex, points) {
  var item = form.addMultipleChoiceItem().setTitle(title).setRequired(true);
  item.setChoices(options.map(function (text, i) {
    return item.createChoice(text, i === correctIndex);
  }));
  item.setPoints(points);
  return item;
}

function addCheckbox_(form, title, options, correctIndexes, points, help) {
  var item = form.addCheckboxItem().setTitle(title).setRequired(true);
  if (help) item.setHelpText(help);
  item.setChoices(options.map(function (text, i) {
    return item.createChoice(text, correctIndexes.indexOf(i) !== -1);
  }));
  item.setPoints(points);
  return item;
}

function getPoints_(item) {
  switch (item.getType()) {
    case FormApp.ItemType.MULTIPLE_CHOICE: return item.asMultipleChoiceItem().getPoints();
    case FormApp.ItemType.CHECKBOX: return item.asCheckboxItem().getPoints();
    case FormApp.ItemType.TEXT: return item.asTextItem().getPoints();
    default: return 0;
  }
}

/** «1s² 2s² 2р⁶ …» → «1s22s22p6…» */
function normalizeConfig_(text) {
  var sup = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  return String(text)
    .toLowerCase()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (c) { return sup[c]; })
    .replace(/с/g, 's')
    .replace(/р/g, 'p')
    .replace(/[\s^,.;+\-]/g, '');
}
