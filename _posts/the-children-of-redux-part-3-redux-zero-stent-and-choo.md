---
title: 'The Children of Redux — Part 3: redux-zero, stent and choo'
excerpt: 'In the first part and the second part of the series, we talked orderly about
  Plait, Dutier, dva, Feeble, vdux and hyperapp which already...'
coverImage: '/assets/blog/the-children-of-redux-part-3-redux-zero-stent-and-choo/cover.webp'
date: '2017-11-05T21:37:15.708Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/the-children-of-redux-part-3-redux-zero-stent-and-choo/cover.webp'
---

In [the first part](https://medium.com/@hwclass/the-children-of-redux-part-1-plait-dutier-and-dva-74bca281bc7f) and [the second part](https://medium.com/@hwclass/the-children-of-redux-part-2-feeble-vdux-and-hyperapp-d45481665a71) of the series, we talked orderly about [Plait](https://github.com/wildlyinaccurate/plait), [Dutier](https://github.com/luisvinicius167/dutier), [dva](https://github.com/dvajs/dva/), [Feeble](https://github.com/feeblejs/feeble), [vdux](https://github.com/vdux/vdux) and [hyperapp](https://github.com/hyperapp/hyperapp) which already gave a momentum in the community (not as much as Elm but) through unifying to handle state in the client-side of web applications. In the last part of our series contains redux-zero (aka. Redux without too much boilerplate), stent inspired by state machines and choo. Yes, we know that it is not all about [managing state](https://daveceddia.com/what-does-redux-do/?utm_campaign=1025redux1) but beside this, keep in mind that if there is a critical aspect of handling state, it might be data flow.

### [redux-zero](https://github.com/concretesolutions/redux-zero): A lightweight state container based on Redux

When we combine principles contained in this library, it may be defined as single state without reducers which makes it easier to understand with less boilerplate code. Additionally, need to add that it is inspired by [one](https://gist.github.com/developit/55c48d294abab13a146eac236bae3219) of the gists represented on Github by [the creator of Preact](https://github.com/developit). There is also a helper repo to use the library with decorators called [rzero-tools](https://github.com/nyteshade/rzero-tools) if you like to look at.

Import the needed parts:

```js
import createStore from "redux-zero"  
import { Provider, connect } from "redux-zero/react"
```

Then you pass the initial state for the store when the JS is first-loaded:

```js
const counterState = { counter: 0 };  
const store = createStore(counterState);
```

Since it ties to the idea of one-way data binding throughout the application, it needs actions to update state actually. Let’s create an easy-peasy one:

```js
const actions = store => ({  
  up: state => ({ counter: state.counter + 1 }),  
  down: state => ({ counter: state.counter - 1 })  
});
```

To merge every step for updating our simple store, importing the “connect” method from the library itself:

```jsx
import { connect } from "redux-zero/react";
```

In our wrapper component, we declare the joint for props to pass down the values generated and also updated from our store:

```js
const mapToProps = ({ counter }) => ({ counter });
```

After all, just combining our component with our state is enough:

```jsx
export default connect(mapToProps, actions)(({ counter, up, down }) => (  
  <div>  
    <h1>{counter}</h1>  
    <div>  
      <button onClick={up}>Up</button>  
      <button onClick={down}>Down</button>  
    </div>  
  </div>  
));
```

At the end, we’re applying our store and its current state by a wrapper component just before mounting the whole application into DOM:

// Fundamental imports for React  
```jsx
import React from "react";  
import { render } from "react-dom";

// Provider for applying stores from top to toe into children components  
import { Provider } from "redux-zero/react";

// Get the store handling the counter state  
import counterStore from "./counterStore";

// Just assume that our component's name is Counter  
import Counter from "./Counter";

const App = () => (  
  <Provider store={counterStore}>  
    <Counter />  
  </Provider>  
);

// That's it!  
render(<App />, document.querySelector("#root"));
```

To sum up, after battling with so many things related with Redux itself in large codebases, it can get some attraction from developers suffering the same. Here is a simple sandbox [playground](https://codesandbox.io/s/n5orzr5mxj) already added into the readme file by the creator of the library. Hope that people will use this more an more…

### “Stent is combining the ideas of [Redux](http://redux.js.org/) with the concept of [state machines](https://en.wikipedia.org/wiki/Automata_theory).”

There are some approaches for handling data in the client-side since web development gained popularity and like pub/sub mechanism, communicating components of an application over mediator patterns, having state machines across the applications is another way of doing this. MIT [says](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-01sc-introduction-to-electrical-engineering-and-computer-science-i-spring-2011/unit-1-software-engineering/state-machines/) also nearly the same thing. You can also find out [the details](http://krasimirtsonev.com/blog/article/managing-state-in-javascript-with-state-machines-stent) of what the creator of the library thinks about that concern. Stent hasn’t been created not only React and works well with your lovely applications.

The creator tells how easy to create a state machine. Start by importing a builder function:

```js
import { Machine } from 'stent';
```

Then create your custom state machine:

```jsx
const counterMachine = Machine.create('counter-machine', {  
  state: { counter: 'idle', counter: 0 },  
  transitions: {  
    'idle': {  
      'up': function (state) {  
        return {  
          name: 'idle',  
          counter: state.counter + 1  
        };  
      }  
    }  
  }  
});
```

Use it directly within your code:

```jsx
counterMachine.up()  
// counter = 1

counterMachine.down()  
// counter = 0
```

Let’s have a look at the integration with React:

```jsx
import React from 'react';  
import { connect } from 'stent/lib/react';  
  
class Counter extends React.Component {  
  render() {  
    const { isIdle, counter } = this.props;  
    // ...  
  }  
}
  
export default connect(Counter)  
  .with('counter-machine')  
  .map((CounterMachine) => {  
    isIdle: CounterMachine.isIdle,  
    counter: CounterMachine.counter  
  });
```

Since handling state with state machines is a bit new idea for front-end engineering, it could sometimes be a little overhead and abstract for some reasons but when you have a look at [the sample todo application](https://github.com/krasimir/stent/tree/master/examples/todo-app), you will a more descriptive understanding from what the creator tries to tell about managing state.

### [choo](https://choo.io/): Fun functional programming with A `4kb` framework for creating sturdy frontend applications

Not exactly a “child” of Redux but with the acceleration of tools building neat web (single-page) applications using virtual-DOM and with some performance improvements, this kind of libraries will probably take on the stage more in a near future. But actually, choo is using [nanomorph](https://github.com/choojs/nanomorph) working with real DOM with a different diffing alghoritm. However, the readme file of the library says: “we’re using something even better.”.

As the philosophy of the library, the main idea is making programming fun with simple code blocks and easily-managable states.

Import the needed libraries contained by choo:

```js
// This is for rendering real HTML  
var html = require('choo/html')

// The library itself  
var choo = require('choo')
```

Create your app easily by the builder method:

```js
var app = choo()
```

Create your initial store:

```js
const counterStore = (state, emitter) => {  
  state.counter = 0  
  emitter.on('up', function (counter) {  
    state.counter += counter  
    emitter.emit('render')  
  })  
}
```

Then bind your store into our application:

```js
app.use(counterStore)
```

Craete your tiny component to represent within DOM:

```jsx
const CounterView = (state, emit) => {  
  return html`  
    <body>  
      <h1>${state.counter}</h1>  
      <button onclick=${onclick}>Up</button>  
    </body>  
  `  
  
  const onclick = () => {  
    emit('up', 1)  
  }  
}
```

Add a route contained by our “app” builder for the root. By the way, the router in choo supports hashes, query strings and default routes as well:

```js
app.route('/', CounterView)
```

At the end, mount the whole application into DOM:

```js
app.mount('body')
```

That’s all! Here is [a funny playground](https://handbook.choo.io/your-first-choo-app/) to try and see the library in action. Luckily, the library supports server-side-rendering itself with some kind of a usual way of setting the initial data like that:

```html
<!--It is deleted after the page is loaded-->  
<script>window.initialState = { counter: 0 }</script>
```

And `.toString` method does everything needed for SSR with Node.js. When you render the generated htmlStringToRender via your framework in the server-side, it will look like the following as well:

```js
var html = require('choo/html')  
var choo = require('choo')  
  
var app = choo()

app.route('/', function (state, emit) {  
  return html`<div>${state.counter}</div>`  
})
  
var state = { counter: 0 }

var htmlStringToRender = app.toString('/', state)

// '<div>0</div>'
```

Hope you like the article and the series as a whole! Thanks for reading and see you in another series of new topics.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**