"""Генерує скрипт Google Apps Script для тесту з файлу питань.

Використання: python3 make_test.py questions.json output.gs
Файл питань: {"title": ..., "func": ..., "trigger": ..., "questions": [[питання, правильна, хибна1, хибна2, хибна3], ...]}
Правильна відповідь потрапляє на різні позиції (детерміновано), щоб не була завжди першою.
"""
import json
import random
import sys


def js(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def main(src, dst):
    data = json.load(open(src, encoding="utf8"))
    rnd = random.Random(data["title"])
    n = len(data["questions"])
    positions = [i % 4 for i in range(n)]
    rnd.shuffle(positions)
    lines = []
    for q, idx in zip(data["questions"], positions):
        text, correct, *wrong = q
        rnd.shuffle(wrong)
        idx = min(idx, len(wrong))
        options = wrong[:idx] + [correct] + wrong[idx:]
        lines.append("  addQ_(form, %s,\n    [%s], %d);" % (js(text), ", ".join(js(o) for o in options), idx))
    body = TEMPLATE.replace("__TITLE__", js(data["title"])).replace("__FUNC__", data["func"]) \
        .replace("__TRIGGER__", data["trigger"]).replace("__QUESTIONS__", "\n".join(lines))
    open(dst, "w", encoding="utf8").write(body)
    print("questions:", len(data["questions"]))


TEMPLATE = """/**
 * Тест у Google Формах для учнів з будь-яких акаунтів (без входу).
 * Створює форму-тест і таблицю результатів з аркушем «Оцінки».
 * ВАЖЛИВО: вставляйте цей код у НОВИЙ проєкт Apps Script і запускайте функцію __FUNC__.
 */

var CONTROL_TITLE = __TITLE__;

function __FUNC__() {
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

__QUESTIONS__

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
    if (t.getHandlerFunction() === '__TRIGGER__') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('__TRIGGER__').forForm(form).onFormSubmit().create();

  try { form.setPublished(true); } catch (err) { Logger.log('setPublished: ' + err); }
  try { form.setAcceptingResponses(true); } catch (err) { Logger.log('setAcceptingResponses: ' + err); }

  Logger.log('Посилання для учнів: ' + form.getPublishedUrl());
  Logger.log('Редагувати форму: ' + form.getEditUrl());
  Logger.log('Таблиця результатів: ' + ss.getUrl());
  Logger.log('Питань: ' + maxPoints);
}

function __TRIGGER__(e) {
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
"""

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
