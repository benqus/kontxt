# kontxt

Minimal multi-state (context) management tool.

## Motivation

---
The main idea behind kontxt is to provide some simple state management for [`lit-html`](https://lit-html.polymer-project.org/guide) between renders. All `kontxt` updates are executed on the same execution frame but listener invokation is scheduled to the next available execution frame thus preventing unnecessary re-renders. You can update as many contexts as many times you like within an execution frame.

This way `lit-html` & `kontxt` can provide a React Function Component/Hooks-like development experience but in a simpler, cleaner way (no context providers/consumers, reducers, etc...).

However, `kontxt` isn't bound to the DOM or `lit-html` so it can be used for anything.

### Example

---
Template (or function component if you will)

> `Counter.ts`

```ts
import { html } from 'lit-html';
import { createContext } from 'kontxt';

const Count = createContext<number>(0);

export function Counter() {
  const count: number = Count(); // read value

  return html`
    <span>${count}</span>
    <button @click=${() => Count.set(Count() + 1) /* set value */}></button>
  `;
}
```

> `index.ts`

```ts
import { html, render } from 'lit-html';
import Counter from './Counter';

const $root: Element = document.getElementById('root');

const updateDOM = addListener(function () {
  render(Counter(), $root)
});
updateDOM();

```

### Creating a context

---
Value of a context can be of any data type.

```ts
// create context with default value
const Hello = createContext('World');
```

### Using a context

---
Contexts are simple functions, no dark-magic, just call them when you want to retrieve the latest value.

```ts
console.log(Hello());
```

### Subscribing and Unsusbscribing to/from context changes

---
Any context update will update the listeners

```js
import { addListener, removeListener } from 'kontxt';

// adding a listener
const listener = addListener(() => {
  // TODO something
});

// removing the listener
removeListener(listener);
```

### Updating a context

---
Simple update:

You can update the context by passing the desired value as the argument. The internal value will be updated immediately and listener invokaction will be scheduled to the next available execution frame.

```ts
Hello('World!');
```

---

You may also want to use objects as context values and update their property individually - you can do that with updater functions:

```ts
const User = createContext({
  firstName: 'John',
  lastName: 'Doe',
})

// set user details - replace/set value
User.set({
  firstName: 'Jane',
});

// merge user details - partial update value - only for objects!
User.merge({
  firstName: 'Jane',
});
```

> `async` / `await` - context updates are treaded as non-async functions. Do not do asynchronous operations from a context updater function - do it before updating.
