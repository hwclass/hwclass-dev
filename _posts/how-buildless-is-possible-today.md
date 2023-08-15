---
title: 'How Buildless is Possible Today'
excerpt: 'Web application bundlers are almost in every app we build today. That means every time you want to develop an application, you need to add an extra step before releasing/publishing projects.'
coverImage: '/assets/blog/how-buildless-is-possible-today/cover.png'
date: '2020-04-05T16:47:48.615Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/how-buildless-is-possible-today/cover.png'
---

Encouraging warning: This article is not telling how to do something, instead telling how to change the paradigm of the current web status-quo.

Web application bundlers are almost in every app we build today. That means every time you want to develop an application, you need to add an extra step before releasing/publishing projects. This takes us to think about the cases we always face: development/developer satisfaction, development experience and going-live time(s).

Today, with the latest improvements in web technologies, browsers follow the same path to make the web development easier and faster. While tools like Zeit Now, Netlify make our continuous deployment processes faster, we still struggle in building the apps because of a number of reasons: tool-specific configuration files, extra haul while waiting for compiling/bundling the web code with tools and performance issues due to the extra code injected into the codebase to make the code browser-friendly.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/15cgqt9856y8p383ellr.png)

(_You prefer less code in your bundle?_)

Exporting web apps "statically" has been making the web better and faster in terms of web performance. There is another possibility of making the web better: buildless approach. I am aware about the hypes around words with "-less" suffix, so no worries, I am not inventing something new, only telling that it is possible today.

### Why to go buildless?

Standardisation of module system in EcmaScript is embraced by both server and client environments (Node.js supports ESM standard with version 13.2.0[*](https://nodejs.org/dist/v13.2.0/docs/api/esm.html) and almost ~90% modern browsers are implemented ESM), while bringing us something less bothering but more convenient.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/qt74lsu7au88clltos1p.png)

As you may get to the point, new ES Modules is the key concept of buildless approach. Standardised module system does not only eliminate the compatibility issues across the browsers and servers, but also eliminates bundling concerns for web apps. Having said that, you don't have to transpile your dependencies or source, because you can now use them straight out of the box and you have extensive environment support.

These improvements are offering a better developer experience. Development experience becomes more and more important than ever. We, as developers are the inventors of languages, compilers and even hardwares supported with tons of functionality blocks like electrical signals that are programmed with memory addresses[*](https://guide.freecodecamp.org/computer-science/assembly-language/). We deserve more, especially on the web which is such a platform where you can delegate your abilities into code and make people's life easier. So why not making our lives, so coding experience better? Let us humbly illustrate this convenience:

```sh
$ npx snowpack
$ npm install --save preact htm
```
package.json:
```
{
   "scripts": {
      "snowpack": "snowpack --clean",
      "postinstall": "npm run snowpack"
   }
}
```

src/app.js:
```js
import { useState, useEffect } from "/web_modules/preact/hooks.js";
import { html } from "/web_modules/htm/preact.js";

const FILMS = 'https://swapi.co/api/films/'

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    function getFilms() {
      fetch(FILMS)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setFilms(data.results);    
        });
    }
    
    getFilms();
  }, []);

  return html`
    <section>
      <ul>
        ${films.map((film) => {
          return html`<li>${film.title}</li>`
        })}
      </ul>
    </section>
  `;
};

export default FilmList;
```

In your root html file:
```
<script type="module" src="/src/app.js"></script>
```

### How and then?
- You may start asking the same question that we asked before: Do we really need a bundler or we're still using because we want to? Probably, you needed to use it, but better to keep in mind that you will not need soon with the usage of ES Modules that spreads across the whole community nowadays. So let's jump on the train to see the possibilities.

- Development experience is a factor to obtain a nice product. So the happier developers are, the faster products go live, or the other-way around. Instead of struggling inside the `production.like.omg.config.js` files, we have the opportunity to have more fun.

- Developers have been the bearer of new things; but sometimes they create complexity for themselves. It is better to question this and start encouraging your workmates into a change- not just for the features/libraries/frameworks you use, but also for your development experience as well.

- You can make the effort to go buildless by publishing repos with examples, releasing apps without bundlers, sending tutorials to engineering blogs, etc. It is all about a couple of minutes to write a basic fetch from a server with this approach.

### So, What's Next?

For helping this paradigm spread across the community, we've created a web app which is also "built" without any code bundlers: [buildless.site](https://buildless.site) and an [awesome repo](https://github.com/hwclass/awesome-buildless) which acts as the actual content of the app itself. We may start publishing blog posts on it, or creating a weekly newsletter, or something else. All ideas, sharings, contributions to make it better are welcomed and appreciated!

To see the example directly go [here](https://glitch.com/~buildless-boilerplate) on Glitch.

More to read:
[caniuse.com - ES Modules Support](https://caniuse.com/#search=es%20modules)
[ES Modules - Cartoon Deep-Dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
[Using ES Modules in Browsers](https://exploringjs.com/es6/ch_modules.html#sec_modules-in-browsers)
