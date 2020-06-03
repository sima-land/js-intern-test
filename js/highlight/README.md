# Подсветка поискового запроса в тексте.

Требуется реализовать функцию, выделяющую все вхождения поисковой подстроки в строке.

Функция должна принимать три аргумента:
* Текст в котором осуществляется поиск, в виде строки содержащей валидный фрагмент html-разметки.
* Поисковый запрос в виде строки простого текста.
* Функцию, для оборачивания найденных фрагментов в выделяющую разметку. Значение по-умолчанию - функция, оборачивающая найденное вхождение в тег `<b></b>`.

Таким образом интерфейс функции должен быть следующим:
```javascript
/**
* @param {string} text Строка с текстом для поиска входжений подстроки.
* @param {string} substr Подстрока для поиска её вхождений в тексте.
* @param {Function} highlighter Функция с определённым интерфейсом, для выделения найденных вхождений.
* @return {string} Результат выделения подстроки в тексте.
**/
function highlight (text, substr, highlighter = entry => `<b>${entry}</b>`) {};
```
Функция должна возвращать строку с фрагментом валидной html-разметки,
в котором все вхождения подстроки выделены методом,
который задан функцией `highlighter`.

Пример данных:

Текст: 
```html
<p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. <a href="http://google.com">Nemo enim ipsam voluptatem, quia</a> voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, <span style="color:#008000;">adipisci velit</span>, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.</p>
<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui <span style="color:#ff0000;">dolorem</span> eum fugiat, quo voluptas nulla pariatur?</p>
<p>At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
<p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
```
Поисковые строки:
* `Quia voluptas`
* `qui dolor`
* `velit`
* `dolor`

Требования:
* Поиск вхождений подстроки должен быть регистронезависимым.
* HTML-разметка исходного текста должна сохраняться.
* В результате должна возвращаться валидная HTML-разметка.
* Использование готовых библиотек и решений недопустимо.
* Реализация должна иметь минимально возможную цикломатическую сложность,
то есть использовать для реализации функционала минимально-возможное количество циклов и условий.

Для оценки выполнения данного тестового задания,
необходимо оформить pull-request в данный репозиторий с кодом реализованной функции,
размещённым в js-файле в данном разделе.

Unit-тесты на реализованную функцию крайне приветствуются и будут дополнительным плюсом при выполнении задания.
