## Когда нужно использовать `ngrx/store`?

`ngrx/store` - это библиотека для управления состоянием приложения в Angular с использованием паттерна Redux. Она предоставляет предсказуемый и неизменяемый поток данных в приложении, что упрощает разработку, отладку и тестирование. Рассмотрим ситуации, когда стоит использовать `ngrx/store`:

1. Крупное приложение с сложным состоянием:
   Если ваше приложение имеет сложное состояние с большим количеством данных, которые должны быть доступны в разных частях приложения, `ngrx/store` может помочь в управлении этим состоянием. Он позволяет хранить все данные приложения в едином хранилище (store) и обновлять состояние приложения через неизменяемые действия (actions). Это способствует поддержанию централизованного и предсказуемого состояния приложения.

2. Необходимость отслеживания истории изменений:
   Если вам необходимо отслеживать историю изменений состояния вашего приложения или реализовать отмену и повторение действий, `ngrx/store` предоставляет такую функциональность из коробки. Вы можете легко восстанавливать предыдущие состояния приложения и повторять ранее выполненные действия.

3. Синхронизация состояния между компонентами:
   Если вам нужно обновлять состояние приложения из разных компонентов и обеспечивать синхронизацию изменений между ними, `ngrx/store` может помочь в управлении этой сложностью. Он предоставляет подписку на изменения состояния и автоматически обновляет компоненты при изменении состояния.

4. Удобное тестирование:
   Использование `ngrx/store` упрощает тестирование вашего приложения. Вы можете легко создавать и проверять действия и редюсеры, а также проверять изменения состояния приложения после выполнения действий.

Вот пример использования `ngrx/store` для управления состоянием в Angular:

1. Установите необходимые пакеты:

   ```shell
   npm install @ngrx/store
   ```

2. Создайте действия (actions) для определения различных действий в вашем приложении:

   ```typescript
   import { createAction, props } from '@ngrx/store'

   export const increment = createAction('[Counter] Increment')
   export const decrement = createAction('[Counter] Decrement')
   export const reset = createAction('[Counter] Reset')
   ```

3. Создайте редюсер (reducer) для обработки действий и обновления состояния:

   ```typescript
   import { createReducer, on } from '@ngrx/store'
   import { increment, decrement, reset } from './counter.actions'

   export const initialState = 0

   export const counterReducer = createReducer(
   	initialState,
   	on(increment, (state) => state + 1),
   	on(decrement, (state) => state - 1),
   	on(reset, () => initialState)
   )
   ```

4. Создайте хранилище (store) и подключите редюсеры:

   ```typescript
   import { StoreModule } from '@ngrx/store'
   import { counterReducer } from './counter.reducer'

   @NgModule({
   	imports: [StoreModule.forRoot({ count: counterReducer })]
   })
   export class AppModule {}
   ```

5. В компонентах приложения вы можете подписываться на изменения состояния и диспатчировать действия:

   ```typescript
   import { Component } from '@angular/core'
   import { Store } from '@ngrx/store'
   import { increment, decrement, reset } from './counter.actions'

   @Component({
   	selector: 'app-counter',
   	template: `
   		<button (click)="increment()">Increment</button>
   		<div>Count: {{ count$ | async }}</div>
   		<button (click)="decrement()">Decrement</button>
   		<button (click)="reset()">Reset</button>
   	`
   })
   export class CounterComponent {
   	count$ = this.store.select('count')

   	constructor(private store: Store) {}

   	increment() {
   		this.store.dispatch(increment())
   	}

   	decrement() {
   		this.store.dispatch(decrement())
   	}

   	reset() {
   		this.store.dispatch(reset())
   	}
   }
   ```

Это лишь пример, и использование `ngrx/store` может быть более сложным и гибким в зависимости от требований вашего приложения. Однако, в основе его лежит идея централизованного хранения состояния и предсказуемого потока данных. Выбор использования `ngrx/store` зависит от конкретных потребностей и сложности вашего приложения.
