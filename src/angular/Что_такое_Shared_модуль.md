## Что такое Shared модуль?

Shared модуль в Angular - это модуль, который содержит и предоставляет общие компоненты, директивы, пайпы и другие ресурсы, которые могут быть использованы в нескольких модулях приложения. Он служит для группировки и повторного использования кода, который является общим для различных частей приложения.

Создание Shared модуля включает следующие шаги:

Шаг 1: Создание Shared модуля
Создайте новый модуль с помощью Angular CLI команды:

```bash
ng generate module shared
```

Это создаст новый модуль `shared.module.ts` в директории `shared`.

Шаг 2: Определение общих компонентов, директив и пайпов
Добавьте необходимые компоненты, директивы, пайпы и другие ресурсы в файл `shared.module.ts`. Например, добавим простой общий компонент `SharedComponent`:

```typescript
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedComponent } from './shared.component'

@NgModule({
	declarations: [SharedComponent],
	exports: [SharedComponent],
	imports: [CommonModule]
})
export class SharedModule {}
```

В этом примере мы импортируем `CommonModule` из `@angular/common`, чтобы использовать общие директивы, такие как `ngIf` и `ngFor`. Затем мы объявляем `SharedComponent` в свойстве `declarations` и экспортируем его с помощью свойства `exports`. `CommonModule` импортируется в свойстве `imports`.

Шаг 3: Использование Shared модуля в других модулях
Чтобы использовать компоненты, директивы или пайпы из Shared модуля в других модулях, необходимо импортировать Shared модуль в соответствующий модуль и добавить его в свойство `imports`. Например, если мы хотим использовать `SharedComponent` в `AppModule`, добавим его следующим образом:

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		SharedModule // Импорт Shared модуля
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
```

Теперь `SharedComponent` доступен для использования в компонентах, объявленных в `AppModule`.

Shared модуль предоставляет удобный способ группировки общих ресурсов и облегчает повторное использование компонентов, директив и пайпов в различных частях приложения. Он также способствует поддержке чистоты кода и улучшает модульность приложения.