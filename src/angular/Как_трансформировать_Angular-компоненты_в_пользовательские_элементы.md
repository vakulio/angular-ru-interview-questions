## Как трансформировать Angular-компоненты в пользовательские элементы?

Для трансформации Angular-компонентов в пользовательские элементы (Custom Elements) вам понадобятся следующие шаги:

1. Установка необходимых зависимостей:

   - Убедитесь, что у вас установлена актуальная версия Angular CLI и Node.js.
   - Создайте новый проект Angular с помощью Angular CLI или используйте существующий проект.

2. Создание Angular-компонента:

   - Создайте компонент с помощью Angular CLI или используйте уже существующий компонент в вашем проекте.
   - Компонент должен иметь логику и представление, которые вы хотите превратить в пользовательский элемент.

3. Добавление Angular-компонента в пользовательский элемент:
   - Создайте новый класс пользовательского элемента, который наследуется от `HTMLElement`.
   - В этом классе вы будете добавлять ваш Angular-компонент в пользовательский элемент.

```typescript
import { ComponentRef, Injector, ViewEncapsulation } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { MyComponent } from './my-component.component'

class MyCustomElement extends HTMLElement {
	componentRef: ComponentRef<MyComponent>

	constructor(private injector: Injector) {
		super()
	}

	connectedCallback() {
		const component = createCustomElement(MyComponent, { injector: this.injector })
		this.componentRef = component(this)
	}

	disconnectedCallback() {
		this.componentRef?.destroy()
	}
}
```

4. Регистрация пользовательского элемента:
   - Включите ваш пользовательский элемент в модуль приложения.
   - Зарегистрируйте ваш пользовательский элемент с помощью `customElements.define()`.

```typescript
import { NgModule, Injector } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { createCustomElement } from '@angular/elements'
import { MyComponent } from './my-component.component'
import { MyCustomElement } from './my-custom-element'

@NgModule({
	imports: [BrowserModule],
	declarations: [MyComponent, MyCustomElement],
	entryComponents: [MyComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
		const element = createCustomElement(MyCustomElement, { injector: this.injector })
		customElements.define('my-custom-element', element)
	}

	ngDoBootstrap() {}
}
```

5. Обновление конфигурации сборки:
   - Обновите файл `angular.json` вашего проекта, чтобы Angular CLI включил пользовательские элементы при сборке проекта.

```json
{
	"projects": {
		"your-project": {
			"architect": {
				"build": {
					"options": {
						"scripts": [
							{
								"input": "node_modules/@webcomponents/custom-elements/custom-elements.min.js"
							}
						]
					}
				}
			}
		}
	}
}
```

После завершения этих шагов ваш Angular-компонент будет доступен как пользовательский элемент `<my-custom-element>`. Вы сможете использовать его в любом HTML-документе, независимо от наличия Angular-приложения.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Custom Element Example</title>
	</head>
	<body>
		<my-custom-element></my-custom-element>

		<script src="runtime.js"></script>
		<script src="polyfills.js"></script>
		<script src="styles.js"></script>
		<script src="vendor.js"></script>
		<script src="main.js"></script>
	</body>
</html>
```

Теперь ваш Angular-компонент будет работать как пользовательский элемент в любом окружении, поддерживающем стандарт веб-компонентов.