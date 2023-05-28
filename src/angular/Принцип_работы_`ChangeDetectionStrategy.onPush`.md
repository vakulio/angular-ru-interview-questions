## Принцип работы `ChangeDetectionStrategy.onPush`?

Принцип работы `ChangeDetectionStrategy.OnPush` в Angular отличается от стандартной стратегии обнаружения изменений (`Default`). `ChangeDetectionStrategy.OnPush` активирует стратегию обнаружения изменений, которая проверяет изменения только в случае, если изменены входные свойства компонента или произошли события, связанные с асинхронными операциями, такими как `Observable` или `Promise`. Это позволяет оптимизировать производительность и уменьшить количество проверок изменений в компонентах.

Давайте рассмотрим принцип работы `ChangeDetectionStrategy.OnPush` более подробно:

1. Компонент с `ChangeDetectionStrategy.OnPush`: Чтобы применить `ChangeDetectionStrategy.OnPush` к компоненту, нужно указать его в декораторе компонента:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
	selector: 'app-example',
	templateUrl: 'example.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
	// Код компонента
}
```

2. Входные свойства (`@Input`): Одна из ключевых особенностей `ChangeDetectionStrategy.OnPush` - это его реакция на изменение входных свойств. Если входные свойства компонента изменяются, Angular запускает обнаружение изменений только для этого компонента и его дочерних компонентов.

```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
	selector: 'app-example',
	templateUrl: 'example.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
	@Input() data: any

	// Код компонента
}
```

3. Асинхронные операции: Когда в компоненте используются асинхронные операции, такие как `Observable` или `Promise`, `ChangeDetectionStrategy.OnPush` активирует обнаружение изменений только при получении новых значений от этих операций.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-example',
	templateUrl: 'example.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
	data$: Observable<any>

	constructor(private dataService: DataService) {
		this.data$ = this.dataService.getData()
	}

	// Код компонента
}
```

4. Ручное обновление состояния: При использовании `ChangeDetectionStrategy.OnPush` обновление состояния компонента должно происходить явным образом с помощью метода `ChangeDetectorRef.markForCheck()`. Это позволяет запустить проверку изменений и обновить представление компонента.

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  changeDetection: ChangeDetectionStrategy.On

Push
})
export class ExampleComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  updateData() {
    // Обновление данных
    this.cdr.markForCheck();
  }

  // Код компонента
}
```

Применение стратегии обнаружения изменений `ChangeDetectionStrategy.OnPush` позволяет уменьшить количество проверок изменений в компонентах и повысить производительность приложения. Однако следует помнить, что использование `ChangeDetectionStrategy.OnPush` требует более внимательного подхода к управлению состоянием и обновлению данных в компонентах.