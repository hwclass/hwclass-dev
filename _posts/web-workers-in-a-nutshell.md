---
title: 'Web Workers in a Nutshell'
excerpt: 'Web Workers are all about keeping a separate thread on the browser different than the main thread which runs all the rendering efforts of the UI.'
coverImage: '/assets/blog/web-workers-in-a-nutshell/cover.webp'
date: '2022-06-22'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/web-workers-in-a-nutshell/cover.webp'
---

**TL;DR**

Web Workers are all about keeping a separate thread on the browser different than the main thread which runs all the rendering efforts of the UI.

As Web workers are somehow tools which web developers are not so into, not very detailed articles around existing and cannot see detailed discoveries around the web, I thought that it would be nice to dive into the concept and give detailed information as much as I can. So another non-Hype guide for you here. Hope you will like it.

**Intro**
=========

There are some advantages of doing it which I will tell more further in the article, for sure. But before that, let’s dive into the conceptual part of what they actually do well.

Web Workers are basically running things in the background within another thread(s) other than the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread) (where browser gets executes the whole) of the browser itself.

![](https://miro.medium.com/max/1184/1*wD24MXVUC2ap4iVZyiWiJA.png)Credits: [https://blog.jscrambler.com/web-workers-threads-bind-us](https://blog.jscrambler.com/web-workers-threads-bind-us)

They’re for avoiding long-running processes which may block the main thread and slowen the application and UI operations. So it may cause some flagging UI also from the performance perspective, too.

Web Workers are pretty common among browsers and feel free to implement them in your next project once needed. All you need in detail with examples can be also found over [here](https://html.spec.whatwg.org/multipage/workers.html) within the specification.

![](https://miro.medium.com/max/1400/1*oM3lUYUEok8YGkZPml-Hew.png)[https://caniuse.com/webworkers](https://caniuse.com/webworkers)

Before moving forward, let’s clarify what threads are. Threads are mostly about running code in different scopes or contexts (whatever else you can go more abstract) simultaneously.

Threads on the browser are actually tiny executional contexts (or a [child process](https://nodejs.org/api/child_process.html) / [worker threads](https://nodejs.org/api/worker_threads.html) in Node.js — they’re actually also existing the same reason / goal which offers to developers to allot the load into different child processes especially within infrastructures with multiple-core CPUs for horizontally-scaling purposes without getting blocked under heavy loads as it is single-threaded by nature)

![](https://miro.medium.com/max/1400/1*-W26vdtavRUxLBSTMslE5g.jpeg)Credits: [https://soshace.com/advanced-node-js-a-hands-on-guide-to-event-loop-child-process-and-worker-threads-in-node-js/](https://soshace.com/advanced-node-js-a-hands-on-guide-to-event-loop-child-process-and-worker-threads-in-node-js/)

**Web Workers in Detail**
=========================

As Web Workers are in the official Web API specification, we can also see the family tree of the scopes for a web worker are getting inherited like so:

![](https://miro.medium.com/max/1400/1*YIPUCLAmkfwCSYtmLo8XJA.png)self = like window object of the main thread

**self** has one method: **postMessage** which sends a data payload in between the main thread and the other web worker threads. And that method uses an algorithm called the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm). That logic is also used to provide functionality to IndexedDB

Beside that, you can mainly [import scripts](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) within a web worker while you’re rendering the UI without having any interruption in the processing the script or problem in the UI side.

![](https://miro.medium.com/max/1400/1*0WL34UZcpBR3wXT2mQIcdg.png)

Web Workers have 2 (two) types based on how they’re chosen based on their capabilities: **Dedicated** & **Shared** Workers.

**Dedicated Workers**
---------------------

A worker which is only accessible by the code invoking it.

You can see an example [here](https://github.com/mdn/dom-examples/blob/master/web-workers/simple-web-worker/main.js):

![](https://miro.medium.com/max/1400/1*BE56RuBFIOG_ku6JS-tTaA.png)The code running on the browser thread![](https://miro.medium.com/max/1400/1*u_IhKNxuTCSYbzumFB9PIQ.png)The code waits for a message from the main thread

**Shared Workers**
------------------

A worker which is accessible by multiple code (blocks or pieces) or scripts getting used within the main thread. For example, you have different utility functions which does some conversions / calculations on the fly and you’re keeping them in different files within the same project structure.

Once you create a SharedWorker instance within each specific file, you can start using the worker as a shared worker through SharedWorker class.

![](https://miro.medium.com/max/1400/1*l-hVPPuY9ptgge6yidlKAg.png)A "main - worker" thread interaction for having the modulo of a number

That means the worker is also available to be consumed by other contexts like a new tab in a new browser window and iframes and workers.

You can see another & more extensive example [here](https://github.com/mdn/dom-examples/tree/master/web-workers/simple-shared-worker):

![](https://miro.medium.com/max/1400/1*MEsvatEQfJ6bnK6pgMX_Qw.png)Code for sending values to get the square of it from a web worker![](https://miro.medium.com/max/1400/1*iF1ffK6T_p04jJ__uDc5fg.png)We’re multiplying the numbers on the worker thread![](https://miro.medium.com/max/1400/1*EoPDCOPsFOq-fBZ4b3bWLg.png)The point is to use Web Workers for its own purpose: data calculating / transitioning without keeping the browser rendering busy

**Can I use fetch with Web Workers?**
=====================================

Yes, you can. Even alongside many others. There are several & wide range of support on some browser APIs like the following you can directly use within a Web Worker.

*   XMLHttpRequest, String, Array, Date & Math, setTimeout, setInterval
*   Even fetch, Promise, WebGL and WebSocket
*   [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) which actually composes today’s Server-sent Events interface.

You can find the whole list [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers).

**Use Cases**
=============

*   If you do not wanna pollute the main thread with some other actions which can be done concurrently in the background, web workers can easily do some transformations requiring some heavy computation power. For example, as a processing a video getting fetched over the network, worker would be the best place to do it. For audio processing, there is an actual worker type: [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet).
*   You can do whatever you want in terms of communicating through a remote resource like an API, etc. by offloading the effort to another thread but only can get performant results once you wanna do some transformations on the data. Seems like using a fetch with WebWorkers does [not so effective](https://stackoverflow.com/questions/18768452/web-workers-handling-ajax-calls-optimisation-overkill/26219348#26219348) at all.
*   Best performance can be gained by also porting WebAssembly over workers to get near-native or native experience.
*   The state management can also be delegated to a web worker in case there is a need to sync and | or cache the data in between client and the remote.
*   Once there are multiple independent piece of code or apps (eg. microfrontends) working in the same context of a browser, it possible to offload of loading every individual component / app / microfrontend within a web worker’s context.
*   You can provide a transmission layer of events through worker(s) with a publish / subscribe pattern (eg. Client Thread ←→ data ←→ Worker Thread).
*   _WorkerGlobalScope_ which is inherited by _DedicatedWorkerGlobalScope_ also has [caches](https://developer.mozilla.org/en-US/docs/Web/API/caches) property (like how ServiceWorkers have) returning [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) that can give some caching capabilities back like caching static assets and capabilities like caching interaction in between remote resources like edge serves or CDNs.

**Web Workers Today**
=====================

There are some package and libraries for experimentation across the web. One of the is from [developit](https://github.com/developit) called [workerize](https://github.com/developit/workerize) which you can give the [responsibility of a code block](https://github.com/developit/workerize#usage) or a function by transferring the blob data of the code itself into worker’s very own context:

![](https://miro.medium.com/max/1400/1*D7eRrq5bD6hPI4xFTz7HGg.png)

[microbundle](https://github.com/developit/microbundle) takes your modules and bundles them into common js and | or ESM format on the fly (actually within a worker scope).

[greenlet](https://github.com/developit/greenlet) is a library which takes the code and runs in a web worker as async for taking all async operations into a separate worker thread.

![](https://miro.medium.com/max/1400/1*69BliSv1rcqqfDg3T0Ezmw.png)

A library called [partytown](https://partytown.builder.io/) is moving operations of loading all 3rd-party scripts into a web worker for offloading the main thread in script-heavy web apps/sites.

![](https://miro.medium.com/max/1400/1*3l8PdBbumTHG7bYrtdxlsA.png)Credits: [https://user-images.githubusercontent.com/452425/152363590-89d3b9a5-35c7-4c12-8f3e-c8b5ce4bb267.png](https://user-images.githubusercontent.com/452425/152363590-89d3b9a5-35c7-4c12-8f3e-c8b5ce4bb267.png)

And that’s how it does over an [example](https://partytown.builder.io/html) of Google Tag Manager script:

![](https://miro.medium.com/max/1400/1*rHDvPUWggS_DwPlma9o33g.png)No more two different files / blocks.

[web-worker](https://github.com/developit/web-worker) as a universal module to generalize the WebWorker API into both: client and server for compatibility purposes.

One of my favorites here: [comlink](https://github.com/GoogleChromeLabs/comlink). This library is for eliminating postMessage interaction from the surface of the implementation and handles it for you in the background with a nice API:

![](https://miro.medium.com/max/1400/1*2y5f3cRGoJOELHE72-UArQ.png)More readable code with comlink for Web Workers

Even, you can go with hooks style for defining workers with [web-worker-hooks](https://github.com/BlueBlazin/web-worker-hooks):

![](https://miro.medium.com/max/1400/1*C09XgvhuC1AgHSd2SrfNcA.png)Hooks for the universe!

You can also find any other web workers-related projects [here](https://github.com/topics/webworker) as a Github topic.

Why not just using SharedArrayBuffer?
-------------------------------------

There is a disabled/cancelled protocol for communicating with the main thread called [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) (aka. shared memory protocol) because of the [Spectre vulnarability](https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)).

**Tips**
========

**Debugging**

You can write down **chrome://inspect/#workers** on Chrome, click on inspect among the listed workers. Then it opens another DevTools window with the context of the worker. You can either go jump to **Network** to see what’s happened / going on or click on **Inspect** to open a new console for you to start debugging the worker’s code.

![](https://miro.medium.com/max/1400/1*0y_t98HmVFz0Ljn2O4RDoQ.png)You can also watch the values of all here.

It is possible to see the context of the **self** in the DevTools.

![](https://miro.medium.com/max/1400/1*xfqi9iWiOy0XEUW4TtRcJg.png)[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope)

The same can be done via **about:debugging#workers** on Firefox in the address bar. Then you will find it under **Shared Workers** section.

![](https://miro.medium.com/max/1362/1*2yn3Aohhf1XH4ZE5p0-2pw.png)Firefox has a better UI for its own configuration :)![](https://miro.medium.com/max/1400/1*phhJLBkOgBjVGk_3Ks35sg.png)![](https://miro.medium.com/max/1400/1*krE08I1QudWi-vLXFC8MMQ.png)

**Similarities & Differences with Service Workers**
===================================================

*   As service workers are mostly responsible for proxying on static assets and background tasks like caching and offline capabilities
*   They both run an execution in another thread and cannot access to window and document objects as they’re also not able to interact with DOM.
*   A window in browser and | or a page can create multiple web workers, service worker has more to do as it takes the whole responsibility of tabs existing.
*   Once you close a tab and if there is a web worker initialised & associated with that tab, the web worker dies in the background. But if a service worker has been initialised and run, it keeps living until it takes too long and destroyed by the browser independent from either you close the tab or not.
*   Service worker is a great fit for cases with Broadcast API & Background Sync API as they’re not getting destroyed by browser until a serious memory issue happens, and they keep working in the background. That’s a downside for (especially for legacy) mobile devices, just fyi.
*   You can find a nice intro and how Service Workers are working [here](https://web.dev/service-worker-lifecycle/).

![](https://miro.medium.com/max/1400/1*HFK26cOX0SNI1_IhGY5heA.gif)Service Workers to the rescue for caching.

**Summary**

As I am keep investigating and discovering some use cases, most probably, that would be great to see some progress on different types of uses cases implemented via Web Workers more than the ones mentioned above.

In general, there is a tendency for defining workers within the same mental bucket but the reality is not like that. Service Workers are more in the PWA side, Web Workers are more like letting the browser’s UI part which does painting / rendering free. There may also be some opportunities in terms of adapting some real-time use cases like Web Sockets and Server-sent Events through web workers.

But in general, I think that there is a huge opportunity in the field which is still not so common where we see some recent implementations of time consuming tasks to be delegated to web workers and hope that would change in the future unless there will be no any other option to use.

The more web becomes real-time, modularised UI strategies occupy their own place on web and the mindset of how to manage state in the client side transition into more client to remote interaction (not joking, that’s possible!), the more we will see different usage & patterns implemented via Web Workers.

Hope you liked reading and wish to see you in the upcoming reads. Thanks.

**Resources**
-------------

[Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#other_types_of_worker)

[Workers loves ArrayBuffer](https://developer.chrome.com/blog/workers-arraybuffer/)

[Why you should be using Web Workers](https://surma.dev/things/when-workers/index.html)

[Debugging Web Workers](https://lihautan.com/Debugging%20web%20workers/)

[MDN DedicatedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope)

[MDN importScripts](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)

[Using Service Workers](https://googlechrome.github.io/samples/service-worker/basic/)