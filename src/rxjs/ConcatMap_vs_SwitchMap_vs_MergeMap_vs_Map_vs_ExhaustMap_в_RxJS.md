## ConcatMap vs SwitchMap vs MergeMap vs Map vs ExhaustMap в RxJS

В RxJS существует несколько операторов для работы с потоками данных, включая `concatMap`, `switchMap`, `mergeMap`, `map` и `exhaustMap`. Давайте рассмотрим каждый из них подробнее:

1. `map`:

   - Оператор `map` применяет функцию трансформации к каждому элементу входного потока и возвращает новый поток с преобразованными значениями.
   - Пример кода:

     ```typescript
     import { from } from 'rxjs'
     import { map } from 'rxjs/operators'

     const source = from([1, 2, 3, 4, 5])

     const mapped = source.pipe(map((value) => value * 2))

     mapped.subscribe((value) => console.log(value))
     ```

     В этом примере оператор `map` умножает каждое значение входного потока на 2 и возвращает новый поток с преобразованными значениями.

2. `concatMap`:

   - Оператор `concatMap` применяет функцию трансформации к каждому элементу входного потока и возвращает новый поток. При этом порядок элементов сохраняется, и каждое новое значение добавляется в конец выходного потока.
   - Пример кода:

     ```typescript
     import { from, interval } from 'rxjs'
     import { concatMap, take } from 'rxjs/operators'

     const source = from([1, 2, 3])
     const intervalSource = interval(1000).pipe(take(3))

     const concatenated = source.pipe(concatMap((value) => intervalSource.pipe(map((innerValue) => `${value}-${innerValue}`))))

     concatenated.subscribe((value) => console.log(value))
     ```

     В этом примере каждое значение входного потока `source` сочетается с значениями потока `intervalSource` с помощью операторов `concatMap` и `map`. Результатом является последовательность значений в формате "значение1-внутреннееЗначение1", "значение1-внутреннееЗначение2" и т.д.

3. `switchMap`:

   - Оператор `switchMap` применяет функцию трансформации к каждому элементу входного потока и возвращает новый поток. При этом, если новое значение приходит до завершения предыдущего внутреннего потока, предыдущий поток отменяется, и новый поток становится активным.
   - Пример кода:

     ```typescript
     import { fromEvent } from 'rxjs'
     import { switchMap } from 'rxjs/operators'

     const button = document.getElementById('myButton')

     const clickStream = fromEvent(button, 'click')

     const switched = clickStream.pipe(switchMap(() => interval(1000)))

     switched.subscribe((value) => console.log(value))
     ```

     В этом примере каждое нажатие на кнопку создает новый поток `interval`, и предыдущий поток

отменяется. Таким образом, на выходе мы получаем значения, соответствующие только последнему активному потоку `interval`.

4. `mergeMap` (также известный как `flatMap`):

   - Оператор `mergeMap` применяет функцию трансформации к каждому элементу входного потока и возвращает новый поток. В отличие от `switchMap`, все внутренние потоки сливаются в один выходной поток без отмены предыдущих потоков.
   - Пример кода:

     ```typescript
     import { from } from 'rxjs'
     import { mergeMap } from 'rxjs/operators'

     const source = from([1, 2, 3])

     const merged = source.pipe(mergeMap((value) => from([value, value * 2])))

     merged.subscribe((value) => console.log(value))
     ```

     В этом примере каждое значение входного потока `source` преобразуется в два значения, умноженные на 1 и 2 соответственно. Все эти значения объединяются в один выходной поток.

5. `exhaustMap`:

   - Оператор `exhaustMap` применяет функцию трансформации к каждому элементу входного потока и возвращает новый поток. При этом, если новое значение приходит до завершения предыдущего внутреннего потока, новое значение игнорируется.
   - Пример кода:

     ```typescript
     import { fromEvent, interval } from 'rxjs'
     import { exhaustMap, take } from 'rxjs/operators'

     const button = document.getElementById('myButton')

     const clickStream = fromEvent(button, 'click')

     const exhausted = clickStream.pipe(exhaustMap(() => interval(1000).pipe(take(3))))

     exhausted.subscribe((value) => console.log(value))
     ```

     В этом примере каждое нажатие на кнопку создает новый поток `interval`, но новые значения игнорируются, если предыдущий поток не завершился. Таким образом, значения будут выводиться только при повторных нажатиях на кнопку после завершения предыдущего потока.

Каждый из этих операторов имеет свои особенности и подходит для разных сценариев использования. Выбор конкретного оператора зависит от требований и логики вашего приложения.