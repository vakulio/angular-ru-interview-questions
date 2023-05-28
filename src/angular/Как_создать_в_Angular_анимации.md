## Как создать в Angular анимации?

Для создания анимаций в Angular используется Angular Animation API, которая предоставляет мощный и гибкий способ добавления анимаций к элементам вашего приложения. Давайте рассмотрим шаги по созданию анимации в Angular:

Шаг 1: Установка и импорт BrowserAnimationsModule

- Убедитесь, что у вас установлен пакет `@angular/animations`. Если нет, выполните команду:
  ```
  npm install @angular/animations
  ```
- Включите анимации, импортировав BrowserAnimationsModule в вашем главном модуле (обычно `app.module.ts`):

  ```typescript
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
  // ...

  @NgModule({
  	imports: [
  		BrowserAnimationsModule
  		// ...
  	]
  	// ...
  })
  export class AppModule {}
  ```

Шаг 2: Создание анимации с использованием Angular Animation API

- Angular Animation API предлагает различные методы для создания анимаций, включая `trigger`, `state`, `style`, `transition` и другие.
- Используйте `@Component` декоратор для определения анимаций внутри компонента.
- Создайте `trigger`, который будет идентифицировать вашу анимацию, и определите его внутри `@Component` декоратора:

  ```typescript
  import { Component, OnInit } from '@angular/core'
  import { trigger, style, transition, animate } from '@angular/animations'

  @Component({
  	selector: 'app-my-component',
  	templateUrl: 'my-component.component.html',
  	styleUrls: ['my-component.component.css'],
  	animations: [
  		trigger('myAnimation', [
  			// определение анимации здесь
  		])
  	]
  })
  export class MyComponent implements OnInit {
  	// ...
  }
  ```

Шаг 3: Определение состояний и переходов

- Внутри `trigger` определите состояния, стили и переходы для вашей анимации.
- Используйте методы `state` и `style` для определения состояний и стилей элемента до и после анимации:
  ```typescript
  trigger('myAnimation', [
  	state(
  		'inactive',
  		style({
  			opacity: 0,
  			transform: 'scale(0.8)'
  		})
  	),
  	state(
  		'active',
  		style({
  			opacity: 1,
  			transform: 'scale(1)'
  		})
  	)
  	// ...
  ])
  ```
- Используйте метод `transition` для определения переходов между состояниями:
  ```typescript
  transition('inactive => active', animate('300ms ease-in')),
  transition('active => inactive', animate('300ms ease-out')),
  // ...
  ```

Шаг 4: Применение анимации к элементу

- В шаблоне компонента добавьте анимацию к элементу с помощью директивы `[@имя_триггера]`:

```html
<div [@myAnimation]="animationState">Animated</div>
```

- `animationState` представляет состояние анимации, которое может быть изменено в коде компонента.

Шаг 5: Изменение состояния анимации

- В вашем компоненте вы можете изменять состояние анимации путем изменения значения `animationState`.
- Например, при нажатии кнопки вы можете изменить состояние на "active":

  ```typescript
  import { Component } from '@angular/core'

  @Component({
  	selector: 'app-my-component',
  	templateUrl: 'my-component.component.html',
  	styleUrls: ['my-component.component.css'],
  	animations: [
  		trigger('myAnimation', [
  			// определение анимации здесь
  		])
  	]
  })
  export class MyComponent {
  	animationState: string = 'inactive'

  	toggleAnimation() {
  		this.animationState = this.animationState === 'inactive' ? 'active' : 'inactive'
  	}
  }
  ```

Это основные шаги по созданию анимации в Angular с использованием Angular Animation API. Вы можете определить различные состояния, стили и переходы, чтобы создать более сложные анимации.