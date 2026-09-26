# 8 клас. Уроки 15–38

Презентації відкриваються за посиланнями (спершу надайте доступ через меню «Поділитися» на сторінці презентації). Практичні роботи — інструкції з відео. Контрольні — скрипти, що створюють Google Форму-тест.

## Розділ «Розчини та дисперсні системи»

| Урок | Тема | Матеріал |
|---|---|---|
| 15 | Розчини. Вода — універсальний розчинник | [презентація](https://claude.ai/artifact/RVM374dKEC4G3psdKCcLtu) |
| 16 | Розчинність. Насичені та ненасичені розчини | [презентація](https://claude.ai/artifact/Sm1zExjxt5KTrSCJgJey7K) |
| 17 | Масова частка розчиненої речовини | [презентація](https://claude.ai/artifact/Bai9MkPN7T8ZjdPkfAjrkK) |
| 18 | Задачі на приготування розчинів | [презентація](https://claude.ai/artifact/NfHx4kfQBVED3LFqM2wWBE) |
| 19 | Практична робота № 1 | [інструкція + відео](urok-19-praktychna-1.md) |
| 20 | Дисперсні системи | [презентація](https://claude.ai/artifact/Me42zY9qYPtqVcmmsu2JuH) |
| 21 | Лаки, клеї, олії, політури | [презентація](https://claude.ai/artifact/7TgTmmta6634AQBZUA3YXh) |
| 22 | Каніфоль | [презентація](https://claude.ai/artifact/5Z5MtWhmgsm5aHvdV2ChDy) |
| 23 | Очищення поверхонь, безпечні розчинники | [презентація](https://claude.ai/artifact/8KYbtfv1ErHUcLQwB52SCB) |
| 24 | Значення води і розчинів | [презентація](https://claude.ai/artifact/BHAWLjxFhtnvcGaRsQeQVS) |
| 25 | Розчини в побуті, забруднення і очищення води | [презентація](https://claude.ai/artifact/UGr15wGiR7PJNSoMaxYXpf) |
| 26 | Контрольна «Розчини та дисперсні системи» | [скрипт тесту](urok-26-kontrolna-rozchyny.gs) — функція `createSolutionsTest` |

## Розділ «Хімічні реакції»

| Урок | Тема | Матеріал |
|---|---|---|
| 27 | Хімічні рівняння. Закон збереження маси | [презентація](https://claude.ai/artifact/KCZh998kcqRmhbwxpTVex1) |
| 28 | Добір коефіцієнтів | [презентація](https://claude.ai/artifact/MnkGWasjhxViA8Q7tRbETE) |
| 29 | Реакції сполучення та розкладу | [презентація](https://claude.ai/artifact/6AmS9pZXNWYdgAxzip59vz) |
| 30 | Екзо- та ендотермічні реакції | [презентація](https://claude.ai/artifact/EwzjBrUcM9oeVsz1AxJCeu) |
| 31 | Швидкість хімічної реакції | [презентація](https://claude.ai/artifact/1jkoAspcPwWS2B3nm687yF) |
| 32 | Каталізатори та інгібітори | [презентація](https://claude.ai/artifact/8YepF7DPpAWtvkJQPhkkij) |
| 33 | Окиснення, горіння, пожежна безпека | [презентація](https://claude.ai/artifact/WCUBn38qQA4au6YKfPz2bp) |
| 34 | Метали з киснем і водою. Ряд активності | [презентація](https://claude.ai/artifact/YNjUaHX5sh8uHb2eAG8Anz) |
| 35 | Корозія металів | [презентація](https://claude.ai/artifact/N9SRD13KqY9BqzftGv4tVu) |
| 36 | Захист від корозії | [презентація](https://claude.ai/artifact/3DAALvQ6GMXHChTmb5bABy) |
| 37 | Практична робота № 2 | [інструкція + відео](urok-37-praktychna-2.md) |
| 38 | Контрольна «Хімічні реакції» | [скрипт тесту](urok-38-kontrolna-reaktsii.gs) — функція `createReactionsTest` |

## Як запустити контрольну

1. Відкрийте [script.google.com](https://script.google.com) → **Новий проєкт** (для кожного тесту — окремий новий проєкт).
2. Видаліть усе з редактора і вставте весь код з файлу `.gs`.
3. Збережіть, виберіть функцію (`createSolutionsTest` або `createReactionsTest`) → **Виконати** → надайте дозволи.
4. У **Журналі виконання** з'являться: посилання для учнів, посилання для редагування форми і таблиця результатів.
5. Оцінки за 12-бальною шкалою з'являються на аркуші **«Оцінки»** таблиці результатів.

Учні заходять з будь-якого акаунта: вхід не вимагається, e-mail не збирається. Якщо адміністратор корпоративного домену забороняє доступ ззовні, створіть тест з особистого Gmail.

У кожному тесті 24 питання (1 бал за питання), питання перемішуються.

## Генератор тестів

`tools/make_test.py` створює скрипт тесту з JSON-файлу питань:

```
python3 tools/make_test.py tools/test-38.json urok-38-kontrolna-reaktsii.gs
```
