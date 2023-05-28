## Что такое Angular interceptor(перехватчик)?

Angular interceptor (перехватчик) - это механизм в Angular, который позволяет перехватывать и обрабатывать HTTP-запросы и ответы перед их отправкой или после получения. Интерсепторы в Angular могут быть использованы для различных целей, таких как добавление заголовков, обработка ошибок, авторизация, кэширование и т.д. Они представляют собой классы, реализующие интерфейс `HttpInterceptor`. Давайте разберемся с этим шаг за шагом:

Шаг 1: Создание интерсептора

- Создайте новый класс, который будет служить интерсептором. Он должен реализовывать интерфейс `HttpInterceptor`.
- Пример кода:

```typescript
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class MyInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Добавьте свою логику перехвата и обработки запросов и ответов здесь
		return next.handle(request)
	}
}
```

Шаг 2: Регистрация интерсептора

- Чтобы Angular использовал ваш интерсептор, вы должны зарегистрировать его в провайдере в вашем модуле приложения или в корневом модуле.
- Пример кода:

```typescript
import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { MyInterceptor } from './my-interceptor'

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MyInterceptor,
			multi: true
		}
	]
})
export class AppModule {}
```

Шаг 3: Добавление логики в интерсептор

- В методе `intercept` интерсептора вы можете добавить логику перехвата и обработки запросов и ответов.
- Например, вы можете добавить заголовки к запросу или обрабатывать ошибки.
- Пример кода:

```typescript
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class MyInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Добавление заголовков к запросу
		const modifiedRequest = request.clone({
			setHeaders: {
				Authorization: 'Bearer token'
			}
		})

		// Обработка ошибок
		return next.handle(modifiedRequest).pipe(
			catchError((error) => {
				// Обработка ошибок здесь
				return throwError(error)
			})
		)
	}
}
```

Интерсепторы в Angular предоставляют мощный инструмент для перехвата и обработки HTTP-запросов и ответов. Они позволяют вам добавлять общую функциональность на уровне приложения и избегать дублирования кода в разных компонентах и сервисах.