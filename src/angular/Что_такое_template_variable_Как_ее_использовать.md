## Что такое template variable? Как ее использовать?

Template variable (переменная шаблона) в Angular - это специальная конструкция, которая позволяет назначить имя элементу DOM или директиве в шаблоне компонента и ссылаться на него внутри шаблона или компонента. Она обеспечивает доступ к этому элементу или директиве и позволяет использовать его свойства и методы.

Давайте рассмотрим, как использовать template variable:

1. Создание template variable:
   - Template variable создается с помощью символа `#` внутри шаблона компонента.
   - Вы можете назначить имя переменной, которое будет использоваться для ссылки на элемент или директиву.
   - Template variable может быть назначен любому элементу DOM или директиве внутри шаблона компонента.

Пример использования template variable с элементом `<input>`:

```html
<input #myInput type="text" />
```

2. Использование template variable в шаблоне:
   - После создания template variable, вы можете использовать его внутри шаблона компонента для получения доступа к элементу или директиве.
   - Template variable может использоваться в связывании данных, обработчиках событий, условных выражениях и других местах в шаблоне.

Пример использования template variable для вывода значения в шаблоне:

```html
<input #myInput type="text" />
<p>Введенное значение: {{ myInput.value }}</p>
```

3. Использование template variable в компоненте:
   - Шаблонные переменные также могут быть использованы внутри кода компонента, например, в обработчиках событий или методах.
   - Для доступа к template variable в компоненте используется `@ViewChild()` или `@ViewChildren()`.

Пример использования template variable в компоненте для обработки события:

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: `
		<input #myInput type="text" />
		<button (click)="onButtonClick()">Кнопка</button>
	`
})
export class MyComponent {
	@ViewChild('myInput') myInput: ElementRef

	onButtonClick() {
		console.log('Введенное значение:', this.myInput.nativeElement.value)
	}
}
```

В этом примере мы создаем template variable `myInput` для элемента `<input>` и используем его в обработчике события `onButtonClick()` для получения значения введенного текста.

Template variable в Angular предоставляет удобный способ получения доступа к элементам DOM или директивам внутри шаблона и позволяет использовать их в различных контекстах шаблона или компонента.