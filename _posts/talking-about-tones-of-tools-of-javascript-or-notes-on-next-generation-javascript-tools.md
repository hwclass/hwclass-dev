---
title: Talking About Tones of Tools of Javascript or Notes on Next-Generation Javascript Tools'
excerpt: 'We never stop, you know! Talking about software engineering and having nice
  opportunities to get advices from software handcrafters should...'
coverImage: '/assets/blog/talking-about-tones-of-tools-of-javascript-or-notes-on-next-generation-javascript-tools/cover.webp'
date: '2014-09-06'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/talking-about-tones-of-tools-of-javascript-or-notes-on-next-generation-javascript-tools/cover.webp'
---

Every tool that a developer use, should be waited to be useful, provide scalable and (recently) modular. They all contain some attitutes to problem-solving solutions and every developer has her/his own style of coding with their tools as well. In fact, the framework side of coding becomes deeper and deeper after a while and specialities among frameworks are determined by their capabilities like data-binding, templating, coding style, etc. During recent years, we all need to verify that tools like frameworks make life of coding easy to reveal useful and eye-catching things.

Especially, in the client-side of development, Angular, Backbone and Knockout have recently been dominating this area. I know also very talented developers using tools like React, CanJS and etc. Every style of problem-solving defines the main “framework” of a tool which has been based on. For example, a developer, who likes stricter way of seperation of concerns, uses Backbone and choices to divide model and view stack wider. She/He doesn’t touch on view-based bindings and choices a way of creating his lego bricks of application with seperated models and views. Backbone also leave developers to create their own style of architecting applications on their own and does not force them anyway. Developers, who are keen on developing applications buy using Knockout, are mostly see their application combined on the view (or markup) side by prefering a style of constructing applications with view-based bindings with “data-bind” attributes within HTML elements. Applications developed with Knockout, have been often developed especially with first-class objects with contructractors. It allows an object-literal method and has an ability as being a underhand tool for writing more vanilla Javascript except new literal things that are invented by many of frameworks, need to be understood after a time of practicing. And, the most popular one, Angular which is developed by Google developers. It is also based on Model-View-Controller structure for creating applications, binding datas, rendering views. It also contains some approaches of software development like dependency injection, etc. One of the disadvantages of this Googlish tool is pushing developers into a line of coding structure a bit more.

After a tiny info for the latest trendies, it is time to tell something about the newer ones. But, wait! Take my pills and bring them with a glass of water! These words are heard if you read a tweet like this: “X.js — The Great, Fantastic and Outstanding Framework!”. As every developer who are interested in developing new toys like frameworks or also who are interested in developing applications with frameworks, after a while, especially if you are a javascript developer, you can get a bit tired about the performance of borning often pouring tools like frameworks. Javascript, because of its popularity, has the same “trendy” current. This is called as YAFS. But, because of our industry, (every kind of) developers are one of the main carriers of the industry of technology and need to improve themselves beyond today and throuh tomorrow by inventing new tons of instruments and using them to invent new things to specify the future of business. By starting the whole article with long three paragraphs may fear readers to avoid following until the end of the lines but here is the end of them and the turn is for the code, new coding style attitudes called Vue, Mithril and Ractive for developers.


### Not Make War, Make Easy : Vue

- authored by a Google worker, Evan You
- defined as “MVVM made simple”
- every object defined within Vue object, has a special HTML element to be initialized
- allows to set custom delimiters
- the framework supplies global instruments to be used for general construction like config as global settings setter, etc.
- choices as instantiation options as creating model and view context are el as the main element of context object, data as the container for configuration informations, methods as wrapper for context-specific procedures to invoke, template as draft for view side, ready as invoked method after the MVVM object.
- instance properties are used to reach ViewModel object’s information like $data as watched and used data and $index as counter-state controlling in loops, etc. There are also instance methods to control ViewModels.
- data-binding directives can be used to define data distributing with a MVVM-style of initializing.
- it also has filters to render information accordingly as filtering data with capitalized letters, ordering by arrays and etc.
- the tool focuses on a more structral development with object literal style
- also emphasis on performance
- plugin alternative connects ViewModels
- it has some examples developed with component and browserify for modularizing


### After Coding Experience : Practice Often, Feel the Easiness of Use and Power

After a while, I have found the Vue example and decided to practice it by myself. I have used component tool to create a simple one page with seperated modules and call them where I expect to and have written some code. During development, it feels like I am really into a decoupled application and think only which component I was working on and what it was aimed to do. If you code a basic HTML content and want it inject only into DOM, just work in a component folder and develop it. If you even want to list a dynamic array, you connect a array variable with a method and then when this method is binded with a DOM element’s event, you have the list just on your view. That’s it. The direction reflects like Vue object -> data -> method -> binding. It makes your development process easy and productive.

Then, at work, we decided to develop some chrome extensions for some e-commerce things. It tooks only time to integrate my app into the chrome application wrapper. After then, the application works kindly with Vue. The performance is the main point of me but never makes trouble. I like it.

If you are familiar with especially Knockout or/and Angular, you will really love Vue, the development machine. It is now in the version 0.10.6 and Evan gets donation by gratipay for Vue.


### Borning From The Ashes of Arrays : Mithril

- created by lhorie and its size is only 3KB
- characterized as lightweight, robust and fast client-side framework
- it supplies a model-view-controller and an extra module attitude
- “m” object is used to create Mithril-based applications
- models as usually, contains data, controllers are the glue between views and models, module initializes the context
- views are taking shape with element names, which are defined as strings, connects inner element strings with their array-like attributes. After a while, coding views
- becomes structuring stairs going right and after that going left through the end of view’s code.
- project structure can be created with one of the usual ways of defining context like first-class objects with constructors or object-literal.
- mithril uses nesting components to modularize apps
- it assures performance with its coding structure and size
- the framework has also routing alternative
- has a good documentation which also tells some tips about differences between other frameworks and libraries
- one of the key striking point of this tool is support till IE6


### After Coding Experience : It is The New Backbone

To start practicing, I choose a basic todo app using also indexedDB. During the development, before some projects, begin to think that there should be an API for complex processes which also seperated from the main application. To make an app decoupled, firstly wrote an indexedDB API to push some data, get and handle information, update and delete which key-value pairs. Then, start coding this tiny app with a model called todo.model, and a todo.controller and todo.view as presentation object. Firstly, I decided to keep two properties as a description of todo item and a done value which keeps if todo item is set or not as boolean. At the end, binded current controller into view with methods and data. Everything is inside a callback-like arrays of arrays into each other. After then, you have a working application as well. This style of writing sometimes makes you begin thinking about coupling and seperation of concerns but when you think its performance advantages and clean writing style, you will keep using this skillful tool, you will never talking about your workmates about coupling and requirements for decoupled apps ll around.

Mithril also has a detailed blog and I recommend if you are into developing things with it, keep on reading since the author often keen on writing much about architectural approaches of this tool. This makes you all get used to this tool.
With its 3KB size, Mithril is the new Backbone with its model-view-controller seperation. If you do not worry much about decupling, use it and fell its joy of coding. Currently, it is under development as open source so there are not so many titles and questions about that framework but it is worth to try.


### Tool of An Age of Frameworks : Ractive

- described as powerful and extensible
- developed by Guardian Development Team
- not have a mission to be a framework but with its modesty cannot curtain its perfectness
- Ractive uses Mustache as templating engine and object literal coding style
- it uses a DOM-like model called Parallel DOM which contains information as up-to-date
- has an option configuration called Adaptors that connects any other tools like Backbone with itself. For example, you can use Backbone Models for Ractive templates
- like Vue, it has also a delimiter setter to use. Anyone who expects to use [[]] delimiters, it can be set by Ractive object’s delimiters property
- has a dependency injection method by direct and indirect dependants
- Componentizing is managed by isolated property to develop custom elements. These are also used directly as elements in DOM
- tries to make developers feel calm and safety. so developers have a challenge page to practice Ractive (learn.ractivejs.org)
- we cannot say that the documentation of the tool is not the avarage, it gives really detailed information, it is good


### After Coding Experience : Feel the Reflective Type of Development

When we firstly develop a chrome app with any other framework, we need to think the main context in the specified framework or library, with Ractive, you can adapt for exmple Backbone into it and use its model structure with it. I did it like this and connect them together. It works well. I only use this tool for view and data implementation; the other processes are developed on Backbone to fetch data and pass it to the framework. It feels like a builder of a building with this combination. You can also see the available adaptors here. If you want to write some kind of things like new adaptor plugins, it is possible with this tool. During development, Ractive is easy to implement to any application. Just you need to think it with its adaptors. So you need to setup an application structure which suits working type of your application. If you use some coupled things, use just big but less files with large controllers, or if you choose a decoupled way, use a mediator object to controller all independent controller objects with this tool. This contains the management of adaptors as well.

To sum up, this tool with version 0.5.6 with the size of 419KB, makes your development processes clean and composable. You will like it.

With these words on the top, prepare yourself for the new development adventures and experiences. But with never forgetting that everyting are developed based on native core. The vanilla Javascript is the king of the future.