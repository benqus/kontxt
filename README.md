# kontxt

Minimal multi-state (context) management tool.

## Motivation

---
The main idea behind kontxt is to provide some simple state management for [`lit-html`](https://lit-html.polymer-project.org/guide) between renders. All `kontxt` updates are scheduled to the next available execution frame thus preventing unnecessary re-renders.

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
    <button @click=${() => Count(c + 1) /* set value */}></button>
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
Recommended way:

To update a context you will need to pass in a function that receives the previous value and is expected to return the new value. This is due to the asynchronous nature of the tool - all updates are scheduled to the next execution frame.

```ts
Hello(str => str + '!');
```

> `async` / `await` - context updates are treaded as non-async functions. Do not do asynchronous operations from a context updater function - do it before updating.

---

You can also update the context by passing the desired value as the argument.

Please note, that in this case the value is wrapped into a function internally and scheduled just like any other functional update would be.

```ts
Hello('World!'); // not a synchronous update!
```
