## Что такое динамические компоненты в Angular?

В Angular динамические компоненты позволяют нам создавать и управлять компонентами программным путем во время выполнения приложения. Это мощная функциональность, которая открывает широкий спектр возможностей, таких как создание модальных окон, динамическое отображение компонентов на основе данных и динамическое изменение пользовательского интерфейса.

Давайте рассмотрим шаги по созданию и использованию динамических компонентов в Angular:

Шаг 1: Создание динамического компонента

1. Создайте компонент, который вы хотите использовать динамически. Для примера давайте создадим компонент `DynamicComponent`, который будет отображать приветствие с именем пользователя:

```typescript
import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-dynamic-component',
	template: '<p>Hello, {{ name }}!</p>'
})
export class DynamicComponent {
	@Input() name: string
}
```

Шаг 2: Создание хост-контейнера

1. Создайте хост-контейнер, который будет содержать динамический компонент. Для этого используйте директиву `ng-container` или добавьте пустой элемент `<div>` в ваш шаблон компонента.

```html
<!-- Шаблон компонента, содержащего динамический компонент -->
<ng-container #container></ng-container>
```

Шаг 3: Доступ к хост-контейнеру в коде компонента

1. Используйте `ViewChild` или `ViewContainerRef` для получения доступа к хост-контейнеру в коде компонента:

```typescript
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core'
import { DynamicComponent } from './dynamic.component'

@Component({
	selector: 'app-container-component',
	template: '<ng-container #container></ng-container>'
})
export class ContainerComponent {
	@ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	// Метод для создания и отображения динамического компонента
	createDynamicComponent(name: string): void {
		// Получаем фабрику компонента
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent)

		// Создаем компонент
		const componentRef = this.container.createComponent(componentFactory)

		// Устанавливаем значения свойств компонента
		componentRef.instance.name = name
	}
}
```

Шаг 4: Использование динамического компонента

1. Теперь вы можете использовать метод `createDynamicComponent` для создания и отображения динамического компонента:

```html
<!-- Шаблон компонента, который использует динамический компонент -->
<button (click)="createDynamicComponent('John')">Create Dynamic Component</button>
```

```typescript
//

 Контроллер компонента
import { Component } from '@angular/core';
import { ContainerComponent } from './container.component';

@Component({
  selector: 'app-main-component',
  template: '<app-container-component></app-container-component>',
})
export class MainComponent {
  constructor(private containerComponent: ContainerComponent) {}

  createDynamicComponent(name: string): void {
    this.containerComponent.createDynamicComponent(name);
  }
}
```

При нажатии на кнопку "Create Dynamic Component" вызывается метод `createDynamicComponent` в контроллере `MainComponent`, который в свою очередь вызывает метод `createDynamicComponent` в компоненте `ContainerComponent`. Это приводит к созданию и отображению динамического компонента `DynamicComponent` с переданным именем.

Таким образом, вы можете динамически создавать и управлять компонентами в Angular, открывая новые возможности для динамического создания пользовательского интерфейса и улучшения пользовательского опыта.