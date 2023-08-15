---
title: 'The Children of Redux — Part 2: Feeble, vdux and hyperapp'
excerpt: 'In the first part of these articles, we have discussed about Plait, Dutier and
  dva. After a short investigation, I have found some others...'
coverImage: '/assets/blog/the-children-of-redux-part-2-feeble-vdux-and-hyperapp/cover.webp'
date: '2017-08-12T22:10:50.490Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/the-children-of-redux-part-2-feeble-vdux-and-hyperapp/cover.webp'
---

In [the first part](https://medium.com/@hwclass/the-children-of-redux-part-1-plait-dutier-and-dva-74bca281bc7f) of these articles, we have discussed about [Plait](https://github.com/wildlyinaccurate/plait), [Dutier](https://github.com/luisvinicius167/dutier) and dva. After a short investigation, I have found some others to use in applications especially if you need some quick solutions in prototyping process of your development.

Briefly and without giving any spoiler, Feeble is here for you to use as a different but simpler kind of immutable client state approach, vdux for provide local components states and managing applications like atoms and hyperapp for making development process easier by providing a functionality like Elm architecture as much as functional.

### [Feeble](https://github.com/feeblejs/feeble)

The library contains a structure based on React, Redux and Redux sagas. Simplifies Redux implementation for start easily to prototype something based on a flux implementation or converting/refactoring a codebase into Feeble.

The another reason to use Feeble to get familiar more with some alternative implementations based on react and redux. Like in the first series of this article, you would easily migrate between to each other as well. It also works with React well.

Just before starting, we are adding some dependencies:

```js
import React from 'react'  
import ReactDOM from 'react-dom'  
import feeble, { connect } from 'feeble'
```

Creating an instance from feeble function:

```js
const app = feeble()
```

Generating a model for our counter example mentioned also in the repo’s readme file:

```js
const counter = feeble.model({  
  namespace: 'count',  
  state: 0,  
})
```

Invoking your actions to join with your interactions in user interface:

```js
counter.action('increment')  
counter.action('decrement')
```

And, of course, add a reducer to your model to have those changes happened:

```js
counter.reducer(on => {  
  on(counter.increment, state => state + 1)  
  on(counter.decrement, state => state - 1)  
})
```

At the end, binding your model with your application is enough:

```js
app.model(counter)
```

Struct your view tree by exposing a new instance, for example called “App” :

```js
const App = connect(({ count }) => ({  
  count  
}))(function({ dispatch, count }) {  
  return (  
    <div>  
      <h2>{ count }</h2>  
      <button key="inc" onClick={() => { dispatch(counter.increment()) }}>+</button>  
      <button key="dec" onClick={() => { dispatch(counter.decrement()) }}>-</button>  
    </div>  
  )  
})
```

We’re now mapping the whole data flow, bindings and actions with our view:

```js
const tree = app.mount(<App />)
```

And render your application in DOM:

```js
ReactDOM.render(tree, document.getElementById('app'))
```

If you need some async stuff (who knows not!), you may use effects which are based on [sagas](https://github.com/redux-saga/redux-saga):

```js
model.effect(function* {
  yield* takeEvery(count.increment, function* ({ payload }) {
    yield call(localStorage.setItem, 'count', payload) 
  })
})
```

One of the benefits of using Feeble is [reusable reducers](https://github.com/feeblejs/feeble/blob/master/docs/recipes/ReusableReducer.md) like the following by sending signals to your reducers just-in-place:

```js
model.reducer(on => {  
  on(post.fetch.request, state => ({  
    ...state,  
    loading: true,  
  }))  
  
  on(post.fetch.success, (state, payload) => ({  
    ...state,  
    loading: true,  
    data: payload,  
  }))  
})
```

There is also a [hackernews application](https://github.com/feeblejs/hackernews) here built on this lovely structure.

### [vdux](https://github.com/vdux/vdux)

A connection between redux and DOM as “virtualized”. The creator of the library believes that the state should be component-specific and the global state should be mutated by only applying a server-side rendering approach like the following:

```js
function serverRender () {  
  const {state, html} = yield vdux(<App />)  
  
  this.body = `<html>  
    <head>  
      <script src='/vdux.js'></script>  
      <script src='/app.js'></script>  
      <script>  
        vdux(() => <App />, {  
          initialState: ${JSON.stringify(state),  
          prerendered: true  
        })  
      </script>  
    </head>  
    <body>  
      ${html}  
    </body>  
  </html>`  
}
```

A basic counter example to understand the approach better tells us that it uses the Redux terminology like reducers and actions to trigger in order to update the local state as well:

```js
const TinyComponent = component({  
  render ({state, actions}) {  
    return <div onClick={actions.increment}>Value: {state.value}</div>  
  },  
  
  reducer: {  
    increment: state => ({  
      value: state.value + 1  
    })  
  }  
}
```

You only need two fundamental functionality of the library to generate virtually-generated DOM and manipulate them: component and element:

```js
import {component, element} from 'vdux'
```

Then, it is enough to return our tiny component as a return value of vdux function:

```js
import vdux from 'vdux/dom'  
vdux(() => <TinyComponent />)
```

### [hyperapp](https://github.com/hyperapp/hyperapp)

This library provides another “plug & play” functionality for your evergreen applications which you hope to bring some innovative ideas into the wild! It is already as tiny as 1KB and minimalized as the creator mentioned in the readme file of the repo:

> HyperApp was born out of the attempt to do [more with less](https://en.wikipedia.org/wiki/Worse_is_better).

HyperApp totally inspired by the Elm Architecture and simplicity of doing things with functional programming paradigm as it is mentioned in the same readme file.

Using this library means you may see everything happening in front of your eyes like [actions](https://github.com/hyperapp/hyperapp/blob/master/docs/actions.md), [the actual DOM](https://github.com/hyperapp/hyperapp/blob/master/docs/view.md) of your component and [state](https://github.com/hyperapp/hyperapp/blob/master/docs/state.md). That’s all what we need, right?

```js
app({  
  state: {  
    count: 0  
  },  
  view: (state, actions) =>  
    <main>  
      <h1>{state.count}</h1>  
      <button onclick={actions.down}>ー</button>  
      <button onclick={actions.up}>＋</button>  
    </main>,  
  actions: {  
    down: state => ({ count: state.count - 1 }),  
    up: state => ({ count: state.count + 1 })  
  }  
})
```

You can declare “dumb” components and use whereever you want throughout application structure:

```jsx
const DumbComponent = ({ name, title, url }) =>  
  <h1>  
    <a href={url}>{name}, {title}</a>  
  </h1>
```

Every virtual node created contains three main parts: tag, data, children:

```js
{  
  tag: "div",  
  data: {  
    id: "some"  
  },  
  children: [{  
    tag: "p",  
    data: null,  
    children: ["Some paragraph."]  
  }]  
}
```

And it produces the following. You may also use the [h](https://github.com/hyperapp/hyperapp/blob/master/docs/api.md#h) function to reproduce the virtual DOM like the same:

```html
<div id="some">  
  <p>Some paragraph.</p>  
</div>
```

So, what about the component lifecycle methods? They are all provided by the library to handle the all steps of a component: [load](https://github.com/hyperapp/hyperapp/blob/master/docs/events.md#load) for the initial rendering moment of application, [action](https://github.com/hyperapp/hyperapp/blob/master/docs/events.md#action) for inspecting events just before being called, [resolve](https://github.com/hyperapp/hyperapp/blob/master/docs/events.md#resolve) for validating results of actions, [update](https://github.com/hyperapp/hyperapp/blob/master/docs/events.md#update) for tracking and doing things while changes happening and [render](https://github.com/hyperapp/hyperapp/blob/master/docs/events.md#render) for overriding the view function before it is called.

Here is [the playground](https://codepen.io/hyperapp/pen/zNxZLP?editors=0010) for hyperapp as well.

Hope you like the article! Thanks for reading and see you in the next series.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**