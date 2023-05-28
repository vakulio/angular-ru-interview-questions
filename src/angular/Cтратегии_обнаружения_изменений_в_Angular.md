## Cтратегии обнаружения изменений в Angular?

В Angular есть несколько стратегий обнаружения изменений (change detection strategies), которые определяют, как и когда будет выполняться механизм Change Detection. Выбор правильной стратегии обнаружения изменений может повлиять на производительность и отзывчивость приложения.

Вот четыре стратегии обнаружения изменений в Angular:

1. **Default (Default)**: Это стратегия по умолчанию. В этой стратегии Angular проверяет все компоненты на каждый цикл обнаружения изменений. Это означает, что даже если значение свойства компонента не изменилось, все равно будет выполнена проверка Change Detection. Эта стратегия проста в использовании, но может быть неэффективной при работе с большими компонентами или данными, которые редко изменяются.

2. **OnPush (На основе событий)**: В этой стратегии Angular выполняет Change Detection только для тех компонентов, у которых изменены входные свойства (inputs) или есть события, инициирующие обнаружение изменений (например, пользовательские события). Это позволяет снизить нагрузку на обнаружение изменений и повысить производительность приложения. Чтобы использовать стратегию OnPush, необходимо установить декоратор `ChangeDetectionStrategy.OnPush` на компонент.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: ` <!-- Код шаблона компонента --> `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
	// Код компонента
}
```

3. **Observable (Observable)**: Эта стратегия предназначена для работы с асинхронными данными, основанными на `Observable`. Angular будет выполнять Change Detection только при получении новых значений от `Observable`, игнорируя другие изменения данных. Это особенно полезно, когда значения изменяются с высокой частотой, и нам не требуется реагировать на каждое изменение. Чтобы использовать стратегию Observable, необходимо установить декоратор `ChangeDetectionStrategy.OnPush` на компонент и использовать асинхронный `Observable` для предоставления данных.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-my-component',
	template: ` <!-- Код шаблона компонента --> `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
	data$: Observable<any>

	// Код компонента
}
```

4. **Detached (Отключенная)**: Эта стратегия полностью отключает Change Detection для компонента и его дочерних компонентов. В этом случае, вы должны явно вызывать метод `detectChanges()` для запуска Change Detection вручную. Это может быть полезно в определенных случаях, например, когда вы хотите полностью контролировать выполнение обнаружения изменений.

```typescript
import { Component, ChangeDetectorRef } from '@angular/core'

@Component({
	selector: 'app-my-component',
	template: ` <!-- Код шаблона компонента --> `
})
export class MyComponent {
	constructor(private cdr: ChangeDetectorRef) {}

	someMethod() {
		// Код метода
		this.cdr.detectChanges() // Запуск Change Detection
	}
}
```

Выбор стратегии обнаружения изменений зависит от конкретных потребностей приложения. Стратегия OnPush является наиболее рекомендуемой, так как она может значительно повысить производительность, особенно для компонентов с большими объемами данных. Однако, следует тщательно оценить требования приложения и выбрать наиболее подходящую стратегию.