---
title: 'The Children of Redux — Part 4: react-easy-state, Kea and state management
  with RxJS'
excerpt: 'A wise man said:...'
coverImage: '/assets/blog/the-children-of-redux-part-4-react-easy-state-kea-and-state-management-with-rxjs/cover.webp'
date: '2017-12-01T15:47:22.866Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/the-children-of-redux-part-4-react-easy-state-kea-and-state-management-with-rxjs/cover.webp'
---

A wise man said:

> To be honest, I do not wanna see Elm as a child of Redux. It could be the father of Redux though.

As you noticed from that sincere quote, we will not talk about or describe what exactly Elm does because the title of that series says that we are digging into the libraries inspired by Redux, not inspired Redux. Anyway, I had started this series of articles when I started to think that Redux is maybe not the exact and absolute choice for flow and state management in the client-side. Today, I hope this is the last article about that topic and hope you will probably like it as well.

### [react-easy-state](https://github.com/solkimicreb/react-easy-state): providing a healthy balance of local and global state management in a simple, scalable way.

Two kinds of state-level: easyComp and easyStore. easyComp is for handling state in component level, easyStore does that thing as app-wide. Let see how it works for react components:

```js
import { easyComp } from 'react-easy-state'
```

Then it seems that is enough to create a “store” variable holding the self-contained state within itself.

```js
store = {  
  name: 'World'  
}
```

In an event handler, you can manipulate the state like the following:

```js
handleOnSomethingHappens(name) {  
   this.store.name = name  
}
```

On the render method of your component, you are going to need to decompose the state and put it directly into your JSX code:

```js
const { name } = this.store  
// ...  
return() ( <div>Hello {name}!</div> )
```

But wait, it seems that we have a higher-order component (HoC) provided for wrapping the functionality to provide that data flow injected into the component itself. The reason we are wrapping the components is that to re-render when a store change occurs:

```js
export default easyComp(YourComponent)
```

After you have your application getting bigger and need some general solution for that issue, you will be using “easyStore” for generate one store available across the app.

```js
import { easyComp, easyStore } from 'react-easy-state'
```

The only difference between those, easyComp is an HoC responsible for providing the data flow and easyStore is responsible for hydration and emits the state all over your components you injected.

```js
const store = easyStore({  
  name: 'Some name',  
  setName (name) {  
    this.name = name  
  }  
})
```

For a simple example, you can check [here](https://solkimicreb.github.io/react-easy-state/examples/contacts/dist/), [here](https://github.com/solkimicreb/react-easy-state/tree/master/examples/todoMVC) and [here](https://github.com/solkimicreb/react-easy-state/blob/master/examples/clock/App.jsx) as well. Generally, easy-react-state based on observables came with ES6 proxies used by [observer-util](https://github.com/nx-js/observer-util).

### High level abstraction between React and Redux: [Kea](https://github.com/keajs/kea)

At the readme file, it says first “_Kea is basicly some kind of bird” and “smart architecture for frontend webapps_”. Preferably, as I like [ducks](https://github.com/erikras/ducks-modular-redux) and [re-ducks](https://github.com/alexnm/re-ducks) approaches for Redux providing in-place functionalities and easiness for reaching to the store, Kea is one of them.

When you complete installation,

```sh
npm install kea redux react-redux reselect --save
```

Then, it is the next step to lear the three concepts/functionilities you are not a stranger to: _actions_, _reducers_ and _selectors_. Basically all does their own stuff as they have been named.

```js
import kea from 'kea'

const stateOptions = {  
  actions: () => ({  
    updateName: (name) => ({ name })  
  }),  
  
  reducers: ({ actions }) => ({  
    name: [0, PropTypes.string, {  
      [actions.updateState]: (state, payload) => state + payload.name  
    }]  
  }),  
  
  selectors: ({ selectors }) => ({  
    reverseName: [  
      () => [selectors.name],  
      (name) => name.split("").reverse().join(""),  
      PropTypes.string  
    ]  
  })  
}

kea(stateOptions)
```

In the readme file of this nice repo says that we have 3 (three) ways of dealing with the stuff:

* Kea can give its functionality by wrapping the component:

```js
const withState = kea(stateOptions)  
  
class Name extends Component {  
  render () {  
    const { name, reverseName } = this.props  
    const { updateName } = this.actions  
    return <div>...</div>  
  }  
}  
  
export default withState(Counter)
```

* With decorators:

```js
@kea(stateOptions)  
export default class Name extends Component {  
  render () {  
    return (  
      const { name, reverseName } = this.props  
      const { updateName } = this.actions  
      return <div>...</div>  
     )  
  }  
}
```

* And by keeing the state logic in somewhere else, importing into the component’s file and merge them with decorators again:

```js
// name-state.js  
import { kea } from 'kea'  
import stateOptions from 'store/state-options'  
export default kea(stateOptions)

// in component's file - let's call it index.js  
import nameState from 'name-state'  
@connect({  
  actions: [  
    nameState,  
    ['updateName']  
  ],  
  props: [  
    nameState, ['name']  
  ]  
})  
export default class Name extends Component {  
  render () {  
    return <div>{name}</div>  
  }  
}
```

If you decide to use thunks or sagas, everything becomes more interesting.

```js
import 'kea-thunk'  
import { kea } from 'kea'  
  
const nameState = kea({  
  actions: () => ({  
    updateName: (name) => ({ name })  
  }),  
  reducers: ({ actions }) => ({  
    name: [0, PropTypes.string, {  
      [actions.updateName]: (state, payload) => payload  
    }]  
  }),  
  thunks: ({ actions, dispatch, getState }) => ({  
    updateNameAsync: async (ms) => {  
      await delay(ms)  
      await actions.updateName('some name')  
    }  
  })  
})
```

If you want to have a look at the working examples, [here you go](https://kea.js.org/examples/todos).

**Extra:** [**A simple usage and implementation of RxJs for state management purposes**](https://gist.github.com/ryardley/5b0eb6d2c11af07ab92d1b6b5600a507)

```jsx
import React, { PropTypes } from 'react';  
import ReactDOM from 'react-dom';  
import { Observable, Subject } from 'rxjs/Rx';
```

When we get the stuff we need, create your emitter instance from a reactive subject.

```js
const stateEmitter = new Subject();
```

Wrap it with an observable object to create another but “observable” instance:

```js
const state$ = Observable.from(stateEmitter);
```

Create an event function to emit changes through the listening state:

```js
const sendEvent = (data) => () => {  
  stateEmitter.next({  
    name: data  
  });  
};
```

Now we have the component to attach the data:

```jsx
const Planner = (props) => {  
  const { name } = props;  
  return (  
    <section>  
      <h1>{name}</h1>  
      <button onClick={sendEvent('Fred')}>Fred</button>  
      <button onClick={sendEvent('Harry')}>Harry</button>  
      <button onClick={sendEvent('Mary')}>Mary</button>  
    </section>  
  );  
};

Planner.propTypes = { name: PropTypes.string };
```

All we need is to listen the changes happening in the state by subscribe method after we

```jsx
export default function bootstrap(id) {  
  const container = document.getElementById(id);  
  state$.subscribe((state) => {  
    ReactDOM.render(<Planner {...state} />, container);  
  });  
  stateEmitter.next({    name: 'Fred'  });  
}
```

Thank you for all those who read the series of these articles. If you feel you missed something, here are the previous series you may have a look:

- The Children of Redux — Part 1: Plait, Dutier and dva
[here](/the-children-of-redux-part-1-plait-dutier-and-dva)
[medium](https://medium.com/@hwclass/the-children-of-redux-part-1-plait-dutier-and-dva-74bca281bc7f)

- The Children of Redux — Part 2: Feeble, vdux and hyperapp
[here](/the-children-of-redux-part-2-feeble-vdux-and-hyperapp)
[medium](https://medium.com/@hwclass/the-children-of-redux-part-2-feeble-vdux-and-hyperapp-d45481665a71)

- The Children of Redux — Part 3: redux-zero, stent and choo
[here](/the-children-of-redux-part-4-react-easy-state-kea-and-state-management-with-rxjs)
[medium](https://codeburst.io/the-children-of-redux-part-4-react-easy-state-kea-and-state-management-with-rxjs-81bf2be1f857)

Hope you like the article and the series as a whole! Thanks for reading and see you in another series of new topics.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**