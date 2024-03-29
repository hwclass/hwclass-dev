---
title: 'The Children of Redux — Extended: zustand, Recoil, immer, Nano Stores & Preact Signals'
excerpt: 'As you noticed from that sincere quote, we will not talk about or describe what exactly Elm does because the title of that series says that we are digging into the libraries inspired by Redux, not inspired Redux.'
coverImage: '/assets/blog/the-children-of-redux-extended-zustand-recoil-immer-nano-stores-preact-signals/cover.webp'
date: '2022-09-07'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/the-children-of-redux-extended-zustand-recoil-immer-nano-stores-preact-signals/cover.webp'
---

![](https://miro.medium.com/max/1400/1*U-CE7VuyZ8Tgi-Zz7aZ3AA.png)

<div id="ritzy-en-content">
A wise man said:

> _To be honest, I do not wanna see Elm as a child of Redux. It could be the father of Redux though._

As you noticed from that sincere quote, we will not talk about or describe what exactly Elm does because the title of that series says that we are digging into the libraries inspired by Redux, not inspired Redux. Anyway, I had started this series of articles when I started to think that Redux is maybe not the exact and absolute choice for flow and state management in the client-side. Today, I hope this is the last article about that topic and hope you will probably like it as well.

[**zustand**](https://zustand-demo.pmnd.rs/)

Actually means “state” in German. For hooked states with readable API for managing your central client state.

![](https://miro.medium.com/max/1400/1*fKV3_Y4usDYZKPsNp1yCvA.png)[https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)

No wrappers for pass down the state, easy to implement. No boilerplate code and avoiding redundant renders. So you do not need Redux at all.

zustand in action

There are some existing tips for how to do several tricks within its repo as follows. Generally they’re covering what you may face during a project development phase.

For example, for doing some atomic-picking based on a certain state, that’s how it can be done:

```
import { useStore } from 'zustand';const veryImportantPropWithinState = useStore(({ someProp }) => someProp)
```

zustand also allows you to decide on the re-renderings based on state picks. You can either do the following on array and|or mapped fashion via shallow:

```
import shallow from ['zustand/shallow'](https://github.com/pmndrs/zustand)// this will trigger a re-rendering once someProp has changed  
const { someProp } = useStore(  
  (state) => ({ someProp: state.someProp }),  
  shallow  
)
```

Async operations are also solved in a relaxed way like the following (you said, redux thunks?):

```
const useStore = create((set) => ({  
  dataFromApi: {},  
  fetchDataFromApi: async (id) => {  
    const response = await fetch(id)  
    set({ dataFromApi: await response.json() })  
  },  
}))const fetchDataFromApi = useStore((state) => state.fetchDataFromApi);const dataFromApi = await fetchDataFromApi(someId);
```

As it allows you to subscribe changes outside of a (React) component, zustand supports vanilla (JS) implementation for any type of project:

```
import store from ['zustand/vanilla'](https://github.com/pmndrs/zustand)const state = create(() => ({ someProps: 'hede' }))const { getState, setState, subscribe, destroy } = stateconst someProps = useStore.getState().someProps
```

The last but not least, zustand has the synchronization within localStorage, sessionStorage, also even for AsyncStorage ([with some care](https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data#Hydration-and-asynchronous-storages)), too.

```
let persistedState = persist(someStore, { someProp: '...' });
```

Here you can find more info within: [https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data](https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data)

Additionally, you can either log all the changes happening within a zustand store or [use](https://github.com/pmndrs/zustand#redux-devtools) Redux DevTools for inspecting the active status of your client state:

```
import { devtools } from ['zustand/middleware'](https://github.com/pmndrs/zustand)// plain  
const useStore = create(devtools(store))// with redux devtools  
const useStore = create(devtools(redux(reducer, initialState)))
```

[**Recoil**](https://recoiljs.org/)

![](https://miro.medium.com/max/1400/1*R3kmllYcE9xFbL5IH4hcZw.png)

A minimal state manager for the client-side, advocating atomic & tamed changes based on pure functions. It also has support for subscriptions basically to get the most updated state to the place where it is listened to.

```
_const_ \[counter, setCounter\] = useRecoilState(counterState);
```

Additionally, you can do time-travelling how you can do with Redux before (if you experience on.) What it encourages is that you should decouple all state needed to be tracked in their own `atom`s introduced by the library itself.

```
_const_ counterState = atom({  
  key: 'hede', _// should be unique key_  
  _default_: '', _// like how you do with this:  
  // const \[_someState_\] = useState('');_  
});// ..._const_ onInputChange = (event) => {  
  setCounter(event.target.value);  
};// JSX  
<input type="text" onChange={onInputChange}/>
```

And here is the critical part comes up. Once you need a state at the tree of the React DOM itself, you can get it via `selector`s:

```
_const_ counterStateInText = selector({  
  key: 'counterStateInText', _// unique id here again..._  
  get: ({get}) => {  
    _const_ text = get(counterState);  
  
    _return_ text + ''; // change the value and return it back.  
  },  
});
```

Recoil itself also provides some synchronisation patterns via some packages for read/write and update operations, like [recoil-sync](https://recoiljs.org/docs/recoil-sync/implement-store/). It basically helps developer to sync the local client-state with the remote state, eg. the state coming from an endpoint.

The same logic applies here: state changes from the URL are considered as `effect`s.

```
_const_ counter  = atom({  
  key: 'counter',  
  _default_: 0,  
  effects: \[  
    syncEffect({ refine: number() }),  
  \],  
});// ...  
// https://example.com/?counter=2_function_ MyApp() {  
  _return_ (  
    <RecoilRoot>  
      <RecoilURLSyncJSON location={{part: 'queryParams'}}>  
        ...  
      </RecoilURLSyncJSON>  
    </RecoilRoot>  
  )  
}// the counter will set to 2 once the URL is hit
```

[**immer**](https://github.com/immerjs/immer)

![](https://miro.medium.com/max/938/1*DJc7g4UB8VF8NF2DDwHaAA.png)

The library itself encourages immutability specifically via `produce` method which executes all the heavy-lifting. For the sake of keeping a clean tree of state, it uses [structural-sharing](https://tkdodo.eu/blog/react-query-render-optimizations#structural-sharing) inherently which is a strategy to keep the references for each of a record within a state saved in an array or object structure. For more detailed information from the engineering perspective, you can go check [here](http://raganwald.com/2019/01/14/structural-sharing-and-copy-on-write.html), a nice read with other copy-on-share patterns, too.

It also allows curried-producers to shorten the state-changing logic into a better readable code.

![](https://miro.medium.com/max/1400/1*VH13lfvMjJ9osLyCO-oMsA.png)

You may prefer using `produce` function in combination with either`useState` or use-immer hook itself from the library itself.

[**Nano Stores**](https://github.com/nanostores/nanostores)

*   Multi-framework/library state management possible. Recently the support for React, Preact, React Native, Vue, Svelte and of course, vanilla JS.
*   Support for Typescript and SSR. Async state updates are a bit tricky but useful at all and working like a charm.
*   You can use [compute](https://github.com/nanostores/nanostores#computed-stores)s for combining multiple stores into filtered values.
*   [Actions](https://github.com/nanostores/nanostores#actions) to be used for updating the states within stores.
*   Things are a bit complicated once you wanna create an object-shaped once they’re created via maps. Map is the one suggested provided by the library for object for modifying the object within a store.
*   Tree-shaking enabled. Just the stores used by a specific component / code block will be included within the chunk.
*   No-defined stores within components. They’re only consumers, all the state is defined within stores.
*   Small by size as it has no dependencies and using [size-limit](https://github.com/ai/size-limit) inherently.

The whole journey of a store update is something like as follows:

First, you need to have the store included within the component you need the state to be played around. Just using the example provided by Astro. Btw, Nano Stores is the official/recommended state management library for the meta-framework:

```
import { isCartOpen, addCartItem } from '../cartStore';
```

Then, here you can assign the event to add the item within the card while setting the open status of the cart there, too:

```
export default function AddToCartForm({ item, children }: Props) {  
  function addToCart(e: SubmitEvent) {  
  e.preventDefault();  
  isCartOpen.set(true);  
  addCartItem(item);  
} return <form onSubmit={addToCart}>{children}</form>;  
}
```

And what we have as a store is like the following within a separate file to be defined:

```
// cardStore.tsimport { atom, map } from 'nanostores';export const isCartOpen = atom(false);export function addCartItem({ id, name, imageSrc }) {  
  const existingEntry = cartItems.get()\[id\];  
  if (existingEntry) {  
    cartItems.setKey(id, {  
      ...existingEntry,  
      quantity: existingEntry.quantity + 1,  
    });  
  } else {  
    cartItems.setKey(id, {  
      id,  
      name,  
      imageSrc,  
      quantity: 1,  
    });  
  }  
}
```

[**Preact Signals**](https://preactjs.com/blog/introducing-signals/)

Preact Signals as new approach for handling state within the core of Preact introduced by its creator, [Jason Miller](https://medium.com/u/30b8f5921914?source=post_page-----a5e08f601e8b--------------------------------), for maximum development ergonomics introduced for specifically a better VDOM performance.

```
import { signal, computed } from "@preact/signals";  
  
const count = signal(0);  
const double = computed(() => count.value \* 2);  
  
function Counter() {  
  return (  
    <button onClick={() => count.value++}>  
      {count} x 2 = {double}  
    </button>  
  );  
}
```

Once projects get more complicated, using hooks and accessing the state from components placed within the depths of the projects gets harder to manage and to follow. With signals, you can reach out to any state at any time you want from any component easily.

Additionally, once the project codebase gets bigger, the acts of updates within the state becomes costy in terms of performance as the modification tree of components grows and takes more calculations to complete updating the state in the respected components / piece of code.

Another problem that signals solve is the state dependency and sharing problem between components. As skipping components which are not dependent on any state makes the rendering more strenuous while the business logic gets huge. You need to deal with subscribers/consumers kinda logic within components and this also makes things a bit messier to manage within the context of a project.

> **Direct access:** Accessing a signal’s value in a component automatically subscribes to updates, without the need for selectors or hooks

With signals, the components are not getting re-rendered but only the value gets updated as components checking the signal itself, not its value.

> When a signal’s value changes, the signal itself stays the same. As a result, signals can be updated without re-rendering the components they’ve been passed through, since components see the signal and not its value.

![](https://miro.medium.com/max/1400/1*-iOzlMItO2wdptFrGOlJDA.png)[https://preactjs.com/blog/introducing-signals/](https://preactjs.com/blog/introducing-signals/)

Hearing about that signals are lazy-by-default which means that unused signals are disconnected / thrown away for performance optimisation purposes.

```
const count = signal(0);  
  
// Instead of this:  
<p>Value: {count.value}</p>  
  
// … we can pass the signal directly into JSX:  
<p>Value: {count}</p>  
  
// … or even passing them as DOM properties:  
<input value={count} />
```

For getting modified / updated versions of a state, it is recommended using _computed:_

```
import { signal, computed } from "@preact/signals";  
  
const todos = signal(\[  
  { text: "Buy groceries", completed: true },  
  { text: "Walk the dog", completed: false },  
\]);  
  
// create a signal computed from other signals  
const completed = computed(() => {  
  // When \`todos\` changes, this re-runs automatically:  
  return todos.value.filter(todo => todo.completed).length;  
});  
  
// Logs: 1, because one todo is marked as being completed  
console.log(completed.value);
```

What’s more is the tip for usign signals for managing global state as follows with a specific note regarding not keeping the _addTodo_ and _removeTodo_ and etc.  outside of the state itself for the sake of walking on the paths of [data-oriented design](https://en.wikipedia.org/wiki/Data-oriented_design):

```
// state.jsfunction createGlobalAppState() {  
  const products = signal(\[\]);const solds = computed(() => {  
  return products.value.filter(product => product.isOutOfStock).length  
});  
  
  return { todos, solds }  
}// app.jsx  
const state = createAppState();  
  
// productList.jsx:  
<Products state={state} />
```

What’s really nice to see that you can avoid passing each state to some components every time manually when it is needed by using Context API:

```
const AppState = createContext();  
  
render(  
  <AppState.Provider value={createGlobalAppState()}>  
    <App />  
  </AppState.Provider>  
);  
//app.jsx  
function App() {  
  const state = useContext(AppState);  
  return <p>{state.completed}</p>;  
}
```

You can find the full documentation here with a couple of nicely-explained examples:

[

Signals - Preact Guide
----------------------

### Signals are reactive primitives for managing application state. What makes Signals unique is that state changes…

preactjs.com

](https://preactjs.com/guide/v10/signals/)

Hope it will have a traction within the community and becomes a mainstream approach for handling state without headache.

Thank you for all those who read the series of these articles. I think now I am done with all the alternatives for Redux which caught my eyes to put onto the stage for the sake of keeping applications simpler than they’re expected to be. If you feel you missed something, here are the previous series you may have a look:

[The Children of Redux — Part 1: Plait, Dutier and dva](https://medium.com/@hwclass/the-children-of-redux-part-1-plait-dutier-and-dva-74bca281bc7f)

[The Children of Redux — Part 2: Feeble, vdux and hyperapp](https://medium.com/@hwclass/the-children-of-redux-part-2-feeble-vdux-and-hyperapp-d45481665a71)

[The Children of Redux — Part 3: redux-zero, stent and choo](https://codeburst.io/the-children-of-redux-part-3-redux-zero-stent-and-choo-81bf2be1f857)

[The Children of Redux — Part 4: react-easy-state, Kea and state management with RxJS](https://medium.com/the-children-of-redux-part-4-react-easy-state-kea-and-state-management-with-rxjs-eab742ea8507)

Hope you like the article and the series as a whole! Thanks for reading and see you in another series of new topics.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**
</div>