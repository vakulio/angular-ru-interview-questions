## Resolution modifiers в Angular

Resolution modifiers (модификаторы разрешения) в Angular - это специальные символы, которые можно использовать при определении зависимостей при инъекции, чтобы изменить способ разрешения этих зависимостей. Эти модификаторы предоставляют дополнительные возможности для настройки инъекции зависимостей и контроля над тем, как Angular находит и предоставляет нужные объекты.

Существует несколько различных модификаторов разрешения, которые можно использовать в Angular:

1. `@Self()`:
   Модификатор `@Self()` указывает Angular использовать только ту зависимость, которая является непосредственно связанной с элементом, в котором происходит инъекция. Если зависимость не может быть найдена в текущем элементе, Angular выдаст ошибку `NullInjectorError`. Это полезно, когда требуется получить только зависимость, которая явно определена в текущем элементе.

Пример использования `@Self()`:

```typescript
import { Component, Self } from '@angular/core'

class DataService {}

@Component({
	selector: 'app-child',
	template: ` <p>{{ data }}</p> `,
	providers: [DataService]
})
class ChildComponent {
	constructor(@Self() private dataService: DataService) {}
}
```

2. `@Optional()`:
   Модификатор `@Optional()` указывает Angular не генерировать ошибку, если зависимость не может быть найдена. Вместо этого, в случае отсутствия зависимости, будет использовано значение по умолчанию (`null`). Это полезно, когда зависимость может быть опциональной и ее отсутствие не должно вызывать ошибку.

Пример использования `@Optional()`:

```typescript
import { Component, Optional } from '@angular/core'

class LoggerService {}

@Component({
	selector: 'app-child',
	template: ` <p>{{ log }}</p> `
})
class ChildComponent {
	constructor(@Optional() private logger: LoggerService) {
		if (this.logger) {
			this.logger.log('Some log message')
		}
	}
}
```

3. `@SkipSelf()`:
   Модификатор `@SkipSelf()` указывает Angular пропустить текущий элемент и искать зависимость в родительских элементах. Это полезно, когда требуется обойти текущий элемент и получить зависимость из более высокого уровня иерархии.

Пример использования `@SkipSelf()`:

```typescript
import { Component, SkipSelf, Injector } from '@angular/core'

class ConfigService {}

@Component({
	selector: 'app-child',
	template: ` <p>{{ config }}</p> `,
	providers: [ConfigService]
})
class ChildComponent {
	constructor(@SkipSelf() private configService: ConfigService, private injector: Injector) {
		const parentConfigService = this.injector.get(ConfigService)
		console.log(parentConfigService === this.configService) // Выведет true
	}
}
```

Комбинируя эти модификаторы разрешения, можно точно настраивать инъекцию зависимостей в Angular и контролировать область видимости и доступность этих зависимостей в приложении.