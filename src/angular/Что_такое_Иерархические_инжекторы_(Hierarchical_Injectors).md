## Что такое Иерархические инжекторы (Hierarchical Injectors)?

Иерархические инжекторы (Hierarchical Injectors) являются важной концепцией в Angular, которая позволяет нам организовывать иерархическую структуру инъекций зависимостей в наших приложениях. Это позволяет нам создавать и переопределять зависимости на разных уровнях приложения, обеспечивая гибкость и модульность.

Иерархические инжекторы в Angular основаны на иерархической структуре компонентов. Каждый компонент имеет свой собственный инжектор, который является потомком инжектора его родительского компонента. Это позволяет компонентам получать зависимости от своего инжектора или от инжекторов родительских компонентов.

Рассмотрим пример:

У нас есть компоненты `AppComponent` и `ChildComponent`, где `ChildComponent` является дочерним компонентом `AppComponent`.

```typescript
import { Component, Injectable, Injector } from '@angular/core'

@Injectable()
class DataService {
	getData(): string {
		return 'Данные из DataService'
	}
}

@Component({
	selector: 'app-child',
	template: ` <p>{{ data }}</p> `,
	providers: [DataService]
})
class ChildComponent {
	constructor(private dataService: DataService) {}

	get data(): string {
		return this.dataService.getData()
	}
}

@Component({
	selector: 'app-root',
	template: `
		<h1>Родительский компонент</h1>
		<app-child></app-child>
	`,
	providers: [DataService]
})
class AppComponent {}

// Создаем инжектор и создаем экземпляр AppComponent
const injector = Injector.create({ providers: [], parent: null })
const appComponent = injector.get(AppComponent)

console.log(appComponent.data) // Выведет: "Данные из DataService"
```

В этом примере у нас есть `DataService`, который предоставляет данные, и два компонента: `AppComponent` и `ChildComponent`. Оба компонента используют `DataService` в качестве зависимости.

В `AppComponent` мы указываем `DataService` в качестве провайдера, и он становится доступным для инжекции в этом компоненте и его потомках, таких как `ChildComponent`. Затем мы создаем экземпляр `AppComponent` с помощью инжектора, и при обращении к свойству `data` в `AppComponent` мы получаем данные из `DataService`.

Важно отметить, что каждый компонент имеет свой собственный инжектор, и если мы определяем провайдер в родительском компоненте, он будет доступен для инжекции во всех его дочерних компонентах, если они не определяют собственный провайдер для этой зависимости.

Иерархические инжекторы позволяют нам создавать модульные и переиспользуемые компоненты, а также контролировать область видимости и жизненный цикл зависимостей внутри нашего приложения. Это важная концепция, которую следует понимать при разработке приложений на Angular.