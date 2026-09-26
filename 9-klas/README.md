# 9 клас. Ядерна фізика та органічна хімія

Презентації відкриваються за посиланнями (спершу надайте доступ через меню «Поділитися» на сторінці презентації). Практичні та лабораторні роботи — інструкції з відео. Самостійні — завдання для дошки з відповідями. Контрольна — скрипт, що створює Google Форму-тест.

## Ядерна фізика

| Тема (уроків за планом) | Матеріал |
|---|---|
| Будова атома за Резерфордом — Бором (1) | [презентація](https://claude.ai/artifact/JkYuaD5rViUzU4SgDJ8tFY) |
| Рентгенівське випромінювання (1) | [презентація](https://claude.ai/artifact/1opwreHk2QAjZU2rPN657K) |
| Радіоактивність (2) | [урок 1: відкриття і види випромінювання](https://claude.ai/artifact/LqkgpzbS4Q7Vc7psTYwSYZ) · [урок 2: види розпаду і рівняння](https://claude.ai/artifact/44DPQmPeYiMbxpH87zDBtL) |
| Закон радіоактивного розпаду (1) | [презентація](https://claude.ai/artifact/PDmSPCiHrCPrDyRkfRphV5) |
| Ядерні реакції + самостійна (2) | [презентація](https://claude.ai/artifact/5mCJgsATPPq85KBDCFixoo) · [самостійна № 1](samostiyna-1-yaderni-reaktsii.md) |
| Поділ ядер. Ланцюгова реакція (1) | [презентація](https://claude.ai/artifact/3AmUbm6s9j2RJPT3WkKq5g) |
| Синтез ядер. Термоядерні реакції (1) | [презентація](https://claude.ai/artifact/8uddRi3YPcFhPcA6WSpT4F) |
| Атомна енергетика (2) | [урок 1: як працює АЕС](https://claude.ai/artifact/AfjfeGXfH25eqgDY4Z5kFu) · [урок 2: Україна і світ](https://claude.ai/artifact/AiJAFcPL2fjHafAo6yKxky) |
| Самостійна робота (1) | [самостійна № 2](samostiyna-2-yaderna-enerhetyka.md) |
| Практичні роботи (2) | [№ 1 Треки заряджених частинок](praktychna-1-treky.md) · [№ 2 Моделювання радіоактивного розпаду](praktychna-2-rozpad.md) |
| Ядерні процеси в зорях + контрольна (2) | [презентація](https://claude.ai/artifact/HAsCbp2KadJtQH5SjQmzCP) · [скрипт тесту](kontrolna-yaderna-fizyka.gs) — функція `createNuclearTest` |

## Органічна хімія

| Тема (уроків за планом) | Матеріал |
|---|---|
| Карбонові кислоти (2) | [урок 1: будова і властивості](https://claude.ai/artifact/QkpB69nTaiDd4K7erie5Zn) · [урок 2: хімічні властивості оцтової кислоти](https://claude.ai/artifact/AjubynEF4QWw9XzM1YMpnG) |
| Естери. Жири (1) | [презентація](https://claude.ai/artifact/MVAYuQs8FTTSX1aavyb7fG) |
| Вуглеводи (1) | [презентація](https://claude.ai/artifact/HQSeGwLoqRo5s4CbDMffY2) |
| Амінокислоти. Білки (1) | [презентація](https://claude.ai/artifact/CZ6Dj35KBQXrDBFSP24Ka2) |
| Лабораторні роботи (3) | [№ 1 Оцтова кислота](laboratorna-1-otstova-kyslota.md) · [№ 2 Вуглеводи](laboratorna-2-vuhlevody.md) · [№ 3 Білки](laboratorna-3-bilky.md) |

## Як запустити контрольну

1. Відкрийте [script.google.com](https://script.google.com) → **Новий проєкт**.
2. Видаліть усе з редактора і вставте весь код з файлу `kontrolna-yaderna-fizyka.gs`.
3. Збережіть, виберіть функцію `createNuclearTest` → **Виконати** → надайте дозволи.
4. У **Журналі виконання** з'являться: посилання для учнів, посилання для редагування форми і таблиця результатів.
5. Оцінки за 12-бальною шкалою з'являються на аркуші **«Оцінки»** таблиці результатів.

У тесті 24 питання (1 бал за питання), питання перемішуються. Вхід для учнів не вимагається.

Генератор: `python3 tools/make_test.py tools/test-nuclear.json kontrolna-yaderna-fizyka.gs`
