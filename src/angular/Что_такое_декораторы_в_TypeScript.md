## Что такое декораторы в TypeScript?

В TypeScript декораторы - это специальные функции, которые позволяют добавлять дополнительное поведение или изменять функциональность классов, методов, свойств и других элементов языка на этапе компиляции.

Декораторы используются для добавления аннотаций или метаданных к элементам TypeScript, что позволяет программистам расширять или изменять их поведение. Они представляют собой вызываемые функции или выражения, которые применяются с использованием символа `@` перед целевым элементом.

Примеры декораторов могут включать следующие сценарии:

1. **Декоратор класса**:

```typescript
function logClass(target: any) {
	console.log('Class Decorator')
}

@logClass
class MyClass {
	// Код класса
}
```

В приведенном примере функция-декоратор `logClass` применяется к классу `MyClass` с помощью `@logClass`. При компиляции или выполнении этого кода будет выведено сообщение "Class Decorator".

2. **Декоратор метода**:

```typescript
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	console.log('Method Decorator')
}

class MyClass {
	@logMethod
	myMethod() {
		// Код метода
	}
}
```

В этом примере функция-декоратор `logMethod` применяется к методу `myMethod` класса `MyClass`. При вызове `myMethod` будет выведено сообщение "Method Decorator".

3. **Декоратор свойства**:

```typescript
function logProperty(target: any, propertyKey: string) {
	console.log('Property Decorator')
}

class MyClass {
	@logProperty
	myProperty: string
}
```

Здесь функция-декоратор `logProperty` применяется к свойству `myProperty` класса `MyClass`. При создании экземпляра `MyClass` будет выведено сообщение "Property Decorator".

4. **Декоратор параметра метода**:

```typescript
function logParameter(target: any, propertyKey: string, parameterIndex: number) {
	console.log('Parameter Decorator')
}

class MyClass {
	myMethod(@logParameter param: string) {
		// Код метода
	}
}
```

В этом примере функция-декоратор `logParameter` применяется к параметру `param` метода `myMethod` класса `MyClass`. При вызове `myMethod` будет выведено сообщение "Parameter Decorator".

Декораторы предоставляют мощный инструмент для расширения и изменения функциональности TypeScript. Они широко используются в Angular и других фреймворках для добавления дополнительной логики, метаданных и аспектов в приложениях на основе TypeScript.