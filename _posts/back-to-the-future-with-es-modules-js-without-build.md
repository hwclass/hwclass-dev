---
title: 'Back to the Future With ES Modules: JS Without Build'
excerpt: 'Web application code bundlers (Webpack, etc.) are used in almost all web applications we develop today. We owe this to the inability of browser engines to keep up with the advancements in ECMAScript so far.'
coverImage: '/assets/blog/back-to-the-future-with-es-modules-js-without-build/cover.webp'
date: '2023-06-28'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/back-to-the-future-with-es-modules-js-without-build/cover.webp'
---

First reminder: This article doesn’t tell you how to do something but rather explains how you can change accepted best practices on the web, referring to the original article published in Turkish before on Medium. You can access the original article here. This article can be considered a detailed look into developing without building or bundling. Kjaer and I have been brainstorming about it for some time.

Second reminder: The reason for choosing the Back to the Future theme is that web development in the past mostly consisted of development within HTML. As time goes by and new tools emerge, we are gradually moving away from the changing paradigm and getting closer to the original approach of the web with ES Modules and other web-native approaches like PWAs, etc.

---

__TL;DR__

*Web should be web-native and we need to get rid of bundles.*

**Do we really want bundler-dependent development?**

Web application code bundlers (Webpack, etc.) are used in almost all web applications we develop today. We owe this to the inability of browser engines to keep up with the advancements in ECMAScript so far. Like any tool, this additional step being included in the development lifecycle brings its own troubles. In summary, this extra step means adding another step to your development process before deploying your project: the build/bundle phase.

While the experiences may vary, the code export performed by each code bundler we use during development expands and inflates as the size of your code grows. And the problem is not only during the development phase. When going live, if we cannot talk about a proper caching strategy, additional time is spent fetching the bundle from a remote location. This leads one to think: where is the development/developer experience or satisfaction in all of this?

Today, in light of the latest developments in web technologies, browsers have realized that they need to take a different approach to enhance developer and/or development experience. They are introducing new products to facilitate this experience and allow developers to focus solely on the products they build.

Tools such as Vercel, Netlify, Amplify, etc., make this process easier, speeding up the development cycle (code ⇒ CI/CD ⇒ Live), while developers can sometimes suffer from the increasing duration of this process for various reasons. Many factors contribute to this: the need to configure specific tools, additional compilation/build/bundle times, and performance issues during runtime due to the additional code added to the exported code output.

The topic I want to address here is code bundling. While generating web applications as static outputs contribute to performance parameters, there has already been another way to make web development easier, smoother, and painless for some time now. It relies on a different approach during runtime instead of loading or processing the entire application as a code output in one or more files during build time. I call it "buildless," but it can also be described as "bundleless" or "bundle-exportless," which might be more appropriate. (After all, these days, when you define an approach with the suffix "-less," it tends to receive more attention: see codeless, serverless, etc.)
What is the current issue with the web?

Web application code bundlers are used in almost all web applications we develop today. Every time you want to develop an application, you must add a step to your development process before deploying the project live: the build/bundle phase. Although the experiences may vary, the code export generated by each bundler we use during the development process increases in size as your written code grows (source). Moreover, the problem is not only during the development stage. If we cannot talk about a proper caching strategy when going live, there is also time spent on fetching the bundle remotely. This leads us to think about the following: where is the development/developer experience or satisfaction in all of this?

**Why not bundle?**
The module system, an ECMAScript standard for a while now, is supported on both the server and client sides. This allows for a more consistent development experience with fewer headaches.

When considering the bundle sizes generated by ready-made boilerplate generators that many applications rely on when starting from scratch, the seriousness of the issue naturally increases. In today's world, where the reputation of the "node_modules" directory has become universal, any progress in this regard is inevitable regarding both development time and deployment time.

Table below provides an idea about the sizes of the files exported during the build process and the bundle files that we repeatedly load from your servers after each deployment.

In addition, the familiar Save and Refresh, which we used to know with BrowserSync, has been replaced by HMR (Hot-Module Reloading) when developing with React for the first time. This process is often overlooked amidst the enthusiasm for development. However, considering the time taken for each CTRL+S / Bundle Export operation during development, the potential time loss experienced by developers becomes an additional source of dissatisfaction.

While this issue can be partially overcome with Dynamic import already present in V8, the presence of a code bundler tool still introduces a bothersome parameter, such as bundle export time. It involves waiting after every save, seeing the result, updating the code, and repeating the same cycle. Of course, as the size of the code increases, this waiting time also increases.

While considering all of these aspects, it is highly likely that while striving to deliver a product to the users as soon as possible, you may become overwhelmed by the details that exist only in the development cycle (especially when dealing with a multitude of parameters from the initial planning stage). You may find yourself slowly waving goodbye to your deadlines. Of course, these details are an integral part of the application development process. However, contrary to the hype and the understanding of tools, there is another possibility: ES Modules. We can summarize this as development without bundling.

```
// Plain import
import { foo } '/modules/my-module.js';

// Dynamic import
(async () => {
 if (true) {
  const { foo } = await import('/modules/my-module.js');
 } 
});
```

And this kind of module usage, namely the ES Modules feature that has been included in the Node.js stable version for a while now, is actively available and usable in many browsers today.

You can directly import any package from npm using skypack in your JS or HTML file.

```html
import dayjs from 'https://cdn.skypack.dev/dayjs';

export const today = () => {
 const today = dayjs(Date.now()).format('DD.MM.YYYY');

 console.log(`today: ${today}`); // today: 27.06.2023

 const textFieldToBeFilledUp = document.querySelector('#app');

 textFieldToBeFilledUp.innerHTML = today;
};
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Back to the Future: The State of ES Modules & JS without Build</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { today } from './app.js';

      today();
    </script>
    <script nomodule src="app-fallback.js"></script>
  </body>
</html>
```

You can also check the full source over here:

Or the other way around, without a *.js file, you can run your code via importing the package eventually:

```html
<script type="module">
 import dayjs from 'https://cdn.skypack.dev/dayjs';
 console.log(dayjs(Date.now()).format('DD.MM.YYYY'));
</script>

<script nomodule src="app-fallback.js"></script>
```

It means it is possible to directly run your code in your HTML file by using script tags with the module type attribute and exporting your entry point from the imported file. Yes, it may seem like turning back the wheel of history on the web, but it's a nice detail that methods become more user-friendly with simplification. You don't need to run npm install in your terminal!

The score of Preact ESM on Skypack: https://www.skypack.dev/view/preactThe score of React ESM on Skypack: https://www.skypack.dev/view/reactLet's examine this through a real use-case scenario. Many of us have used specific libraries for cookie set/get operations. Let me share a detail I came across in the readme file of the js-cookie library, which I have been using for a while:

```html
<!--https://github.com/js-cookie/js-cookie#direct-download-->

<script type="module" src="path/to/js.cookie.mjs"></script>
<script nomodule defer src="path/to/js.cookie.mjs"></script>
<script type="module">
 import Cookies from '/path/to/js.cookie.mjs';

 Cookies.set('foo', 'bar');
</script>
```

At this moment, I can already hear someone saying, "But we only use Vanilla JavaScript syntax for tooling." As you know, we used to say similar things about jQuery in the past (and to some extent, it still continues), and now we are gradually saying it for many other favorite tools. Furthermore, it's worth noting that the increasing popularity of tools like Vue, React, Angular, etc., means it won't take them long to start supporting ES Modules. We only need an entry file compatible with ES Modules as the output. (Kudos to Vue.js on this! 👏🏿) For those who still don't support it, I recommend using package CDNs like Sykpack.

In summary, it all comes down to this: instead of adding your package dependencies alongside the code that handles your business logic and creating bundles, it is possible to develop at runtime and deploy live without ever leaving the development environment. We already sacrifice enough build time every day to the gods of bundlers, but developing with a feature that contributes to the developer experience will undoubtedly make the development process more enjoyable. Saying "write once, run instantly" for applications that run not only in browsers but also on different environments and platforms (as in the example below) shouldn't be too difficult, right?

As well as remembering this quote from Crockford here:

_...the browsers have actually gotten pretty good. The web standards thing have finally worked, and the web API is stable pretty much. Some of it's still pretty stupid, but it works and it's reliable._

Let's build something with ES Modules with proper interaction with the network. Let's find something which doesn't need a build step (sooo buildless). I've checked over UnsuckJS here with a list of full of nice goodies. So, let's go with Preact.

```sh
npm create vite@latest my-esm-app --template preact && cd ./my-esm-app
```

Just install the vite with a template. For now, we're choosing Preact, but we will (of course) not need Preact within the package.json as a dependency, as we will use it in runtime via import maps.

After installing dev dependencies, you will see the app running on a vite server:

```js
// That's the main configuration file
import { defineConfig } from 'vite';
import { importMaps } from 'vite-plugin-import-maps';

export default defineConfig({
 resolve: {
  preserveSymlinks: true,
 },
 esbuild: {
  jsxFactory: 'h',
  jsxFragment: 'Fragment'
 },
 plugins: [
  importMaps([{
   imports: {
    preact: 'https://esm.sh/preact@10.15.1',
    'preact/hooks': 'https://esm.sh/preact@10.15.1/hooks'
   }
  }])
 ]
});
```

```js
// where we introduce the CDN registry links for preact and its hooks.
// Please also consider that we introduced esbuild helpers for preact.
// Believe me, they will help you running…
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import './style.css';

const App = () => {
 const FILMS_URL = 'https://swapi.dev/api/films/';

 const [films, setFilms] = useState([]);

 useEffect(() => {
  async function getFilms() {
   const res = await fetch(FILMS_URL);
   const data = await res.json();
   setFilms(data.results);
  }

  getFilms();
 }, []);

 return (
  <section>
   <h2>Start Wars Episodes</h2>
   <ul>
    {films.length > 0
     ? films.map((film) => <li>{film.title}</li>)
     : "To be continued..."}
   </ul>
  </section>
 )
};

render(<App/>, document.getElementById('app'));

//And at the end, here is our file including the fetching of the films
// and presenting them on the page.
```


That's what it looks like. Working like a charm ;)Just see where the dependency comes from ;)As we've also introduced a vite plugin to enable the import maps usage, you will notice this is injected after you run the app.

Note: If you run the code in production, it is recommended to use the pinned URLs provided by Skypack for each package.

Second note: As Vite cannot unresolve bare moduleId, the plugin uses a prefix like /`@import-maps/<library-name>` which causes an error during the build. I hope it will be resolved soon or planned to be solved. If not, don't worry. That's not the end of the story at all 😉.

**How can we make the transition?**
Since many browsers already support ES Modules, you can adopt a more modern approach to your codebase by moving away from development with bundlers. Depending on the needs of your codebase, you can follow a strategy such as starting with Rollup and gradually splitting your code into smaller modules, enabling you to transform each feature into a module. Alternatively, you can directly integrate your code into your applications using any tool to export ES Modules.

While enhancing your development experience, you can integrate your domain-specific products into other applications using ES Modules support, with small configuration changes in your codebase. Here's an example to illustrate this. Particularly in today's landscape, where conflicts between frameworks and tools can only be resolved with custom code structures, you'll see how ES Modules, with its clean integration, become a helpful tool in the microfrontend approach. By getting rid of cumbersome 'production.like.bla.bla.bla.config.js' files, you can focus on your work with increased development satisfaction.
You can also choose some of the buildless approaches over UnsuckJS. You can either choose totally build-free options like Strawberry or reken or any other in the list and start building your next amazing project!

Additionally, during your team grooming sessions, guild meetings, or coffee chats, you can talk about this topic and get your colleagues excited. You can create various initiatives to easily redesign your existing codebase using ES Modules. In doing so, you may have found a topic that will help you lead by example.

We are excited to let you know about buildless.site (via awesome-buildless), our recent platform launch with Kjaer. There, we share repositories, examples, and articles on modern web technologies. So, let's spread knowledge to your colleagues and development community.

Also, here's our presentation. It summarises our platform's benefits in one place.

In the following article, you can see how we discovered the possibilities of a buildless paradigm:

[How Buildless is Possible Today](https://hwclass.dev/how-buildless-is-possible-today/)

Thank you for taking the time to read. I look forward to your feedback.