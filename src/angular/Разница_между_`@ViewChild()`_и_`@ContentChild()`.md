## Разница между `@ViewChild()` и `@ContentChild()`?

`@ViewChild()` и `@ContentChild()` - это два декоратора в Angular, которые используются для доступа к дочерним элементам в компонентах. Они имеют некоторые различия в том, как они ищут и выбирают элементы. Давайте рассмотрим эти различия подробнее:

1. `@ViewChild()`:
   - Используется для доступа к дочерним элементам, которые являются компонентами или простыми HTML-элементами, например, `<div>`, `<input>`, `<button>`, и т.д.
   - Ищет элементы только в шаблоне текущего компонента.
   - Может быть использован с селекторами, чтобы указать конкретный дочерний элемент, к которому нужно получить доступ.
   - Позволяет получать доступ к экземпляру компонента или элементу DOM, используя переменную-ссылку.

Вот пример использования `@ViewChild()` для доступа к компоненту и элементу DOM:

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core'

@Component({
	selector: 'app-parent',
	template: `
		<app-child></app-child>
		<button #btnRef>Click</button>
	`
})
export class ParentComponent {
	@ViewChild(ChildComponent) childComponent: ChildComponent
	@ViewChild('btnRef') buttonRef: ElementRef

	ngAfterViewInit() {
		this.childComponent.doSomething()
		this.buttonRef.nativeElement.style.backgroundColor = 'red'
	}
}
```

В этом примере мы используем `@ViewChild(ChildComponent)` для получения доступа к экземпляру дочернего компонента `ChildComponent`. Также мы используем `@ViewChild('btnRef')` для получения доступа к элементу `<button>` по селектору `#btnRef`.

2. `@ContentChild()`:
   - Используется для доступа к дочерним элементам, которые включены в контент проекции внутри компонента.
   - Ищет элементы внутри контента проекции компонента, который был включен с помощью `<ng-content>`.
   - Также может быть использован с селекторами, чтобы указать конкретный дочерний элемент, к которому нужно получить доступ.

Вот пример использования `@ContentChild()` для доступа к дочернему элементу, включенному через `<ng-content>`:

```typescript
import { Component, ContentChild } from '@angular/core'

@Component({
	selector: 'app-parent',
	template: `
		<app-child>
			<div #contentRef>Content</div>
		</app-child>
	`
})
export class ParentComponent {
	@ContentChild('contentRef') contentRef

	ngAfterContentInit() {
		console.log(this.contentRef.nativeElement.textContent)
	}
}
```

В этом примере мы используем `@ContentChild('contentRef')` для получения доступа к элементу `<div>` с селектором `#contentRef`, который был включен в контент проекции компонента `ChildComponent` с помощью `<ng-content>`.

В обоих случаях, для успешного использования декораторов `@ViewChild()` и `@ContentChild()`, нужно убедиться, что дочерние элементы уже созданы и доступны во время вызова соответствующего хука жизненного цикла компонента.