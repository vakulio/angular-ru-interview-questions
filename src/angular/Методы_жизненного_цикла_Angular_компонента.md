## Методы жизненного цикла Angular компонента?

Angular предоставляет набор методов жизненного цикла компонента, которые вызываются в различные моменты его жизни, начиная от создания и инициализации, до удаления и уничтожения. Эти методы позволяют разработчику выполнять определенные действия на каждом этапе жизненного цикла компонента.

Вот основные методы жизненного цикла Angular компонента:

1. **constructor**: Это первый метод, который вызывается при создании экземпляра компонента. В нём обычно выполняется инициализация свойств компонента и внедрение зависимостей. Пример:

```typescript
import { Component } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: '...'
})
export class MyComponent {
	constructor() {
		console.log('Constructor called')
	}
}
```

2. **ngOnChanges**: Этот метод вызывается, когда компонент получает новые значения входных свойств (`@Input`). Он позволяет реагировать на изменения и выполнить определенные действия при каждом изменении свойств. Пример:

```typescript
import { Component, Input, SimpleChanges } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: '...'
})
export class MyComponent {
	@Input() name: string

	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges called')
		console.log(changes)
	}
}
```

3. **ngOnInit**: Этот метод вызывается после того, как компонент и его привязки инициализированы. Он является идеальным местом для выполнения инициализации данных или получения данных через сервисы. Пример:

```typescript
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: '...'
})
export class MyComponent implements OnInit {
	ngOnInit() {
		console.log('ngOnInit called')
		// Инициализация данных или вызов сервисов
	}
}
```

4. **ngDoCheck**: Этот метод вызывается при каждой проверке изменений в компоненте и его дочерних компонентах. Он позволяет обнаруживать и реагировать на изменения, которые не были замечены автоматическим механизмом обнаружения изменений Angular. Пример:

```typescript
import { Component, DoCheck } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: '...'
})
export class MyComponent implements DoCheck {
	ngDoCheck() {
		console.log('ngDoCheck called')
		// Обнаружение и реагирование на изменения
	}
}
```

5. **ngAfterViewInit**: Этот метод вызывается после инициализации представления компонента и его дочерних представлений. Он используется для выполнения операций, которые требуют доступа к DOM-элементам или инициализации сторонних библиотек. Пример:

```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: '<div #myDiv></div>'
})
export class MyComponent implements AfterViewInit {
	@ViewChild('myDiv') myDiv: ElementRef

	ngAfterViewInit() {
		console.log('ngAfterViewInit called')
		console.log(this.myDiv.nativeElement)
		// Доступ к DOM-элементам или инициализация сторонних библиотек
	}
}
```

6. **ngOnDestroy**: Этот метод вызывается перед уничтожением компонента. Он используется для выполнения очистки ресурсов, отписки от подписок, отмены таймеров и других операций, связанных с завершением работы компонента. Пример:

```typescript
import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-my-component',
	template: '...'
})
export class MyComponent implements OnDestroy {
	private subscription: Subscription

	ngOnDestroy() {
		console.log('ngOnDestroy called')
		this.subscription.unsubscribe()
		// Очистка ресурсов и отмена подписок
	}
}
```

Методы жизненного цикла Angular компонента позволяют разработчикам контролировать поведение компонентов на различных этапах и выполнять действия, необходимые для их правильной и эффективной работы.