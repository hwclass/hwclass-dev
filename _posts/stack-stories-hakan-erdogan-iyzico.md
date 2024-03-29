---
title: 'Stack Stories: Hakan Erdoğan, CTO @ iyzico'
excerpt: 'Hello folks! Already started a new article series combined with some ideas
  from pioneering hand-crafters in software industry all over the…'
coverImage: '/assets/blog/stack-stories-hakan-erdogan-iyzico/cover.webp'
date: '2017-11-05T22:48:13.808Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/stack-stories-hakan-erdogan-iyzico/cover.webp'
---

Hello folks! Already started a new article series combined with some ideas from pioneering hand-crafters in software industry all over the world. The importance of managing software architectures become inevitably necessity nowadays, the doers of software architectures like CTOs, architects and leads have already had a concrete place as a constant.

We had the first “questions and answers” session is with [Hakan Erdoğan](https://twitter.com/hakanerdogan) from [iyzico](https://www.iyzico.com/international), Easy Checkout services from Turkey. Hope you will enjoy the article.

![](https://cdn-images-1.medium.com/max/800/1*R6ymAJu382cJamOmkpbcCw.jpeg)

**Q:** How long have you been working in this field and where are you currently working at?

**A:** _I’ve been working more than 12 years in IT & technology sector, and almost 3 years at iyzico as a CTO, and having_ [_management_](https://hackernoon.com/tagged/management) _positions since 2008._

**Q:** Basing on what principle have you formed your teams?

**A:** _The most important thing is the team itself, therefore hiring is critical. There are 3 red lines for hiring: We’re always looking for motivated, disciplined and passionate team players who like agile methodologies and technologies._

**Q:** How do you classify autonomy of the developers within the teams? Do the developers decide on issues concerning their stack together? What are you looking for while choosing your team members?

**A:** _I believe that “you do not have to run the team”. The good strategy is to hire the best people who are smart, self-organize and passionate and empower them so that they can create great products and software._

**Q:** How do the teams within iyzico working with TDD (or other) approach(es) handled it everyday? Have you participated in the configuration process? What are the steps during the development?

**A:** _We use pair programming, code review tools and test automation (unit tests, functional tests, integration tests) as a continuous delivery based on Git SCM and Atlassian tools (jira, confluence, bamboo, crucible,…). SDLC has to be set in the early stages of a company so that that company will scale fast._

_Currently, we have 9 agile/scrum teams having even team member size, most of them are 4 people so that they be pairs. Teams are immutable but pairs are rotatable. We’ve also product owners and agile coach. Agile practices such as TDD, pairing, … are must for us, actually each team member believes the efficiency and fun of agile methodologies. Therefore I do not have to convince people about TDD, agile practices, etc. All of them, including all configurations and SDLC/continuous delivery infrastructure, were set at the beginning with the core team, and while team is scaling newcomers adopted this culture_

**Q:** What are your choices of software architecture? What have you used before and what are you currently using?

**A:** _The great thing is, we decide technology and architecture as all team. What I mean is, we have senior & expert developers/engineers in the team. They like following new technologies, best practices, and success stories. As a monthly basis, we’re coming together to discuss the topics. We like Java & JVM based stack but if we need we also use what it requires, such as Python libraries for machine learning stuff. As a team, we believe micro-services and context-based grouping. What I mean is, when you look at a payment system you’ll see at least 14–15 core modules, such as on-boarding, collection, settlement, invoicing, etc. For example, in collection context, there are payment, refund, cancel services. We believe that all database, service, and configuration have to be context-based, such as collection services have its own configuration & discovery services and database._

**Q:** Do you distinguish the projects as easy or complex? What do you think makes a project complex? Do you also evaluate the complexity of each project within itself?

**A:** _Nope, we classified projects as a big rock or small stones. We may define big rocks as a complex project and they have same characteristics. Generally, as an engineering common sense, they last more than 2 months, affect many modules, or require infrastructure/architecture change._

**Q:** How do you stabilise the versions while working with several different teams and trying to make the versions coherent? And if you are using git, what are the tools you are using with it? What are the difficult parts and advantages of working with small and big (with too many people) teams?

**A:** _We’re using Git and git-flow. We have also many environments such as local, dev, staging-1, staging-2, sandbox, DR and prod. Sometimes 9 different teams are developing the different projects that effect each other. Since we’re running weekly sprints and aligning weekly for all team (scrum of scrum) all conflicts are resolved fast. Mainly conflicts are DB change based, instead of software._

**Q:** Have you encountered any difficulties about microservice infrastructure on your current workplace?

**A:** _Microservices are the new cool buzzword but first, you’ve to discuss whether you need it or what principles you’ll select, otherwise, you’ll face with over-engineering. We decided, not to apply all methodologies with as is, for example, context-based micro-services are great for us. Still, we’re testing it with less risky projects. Latency, multi-level-hop, caching, performance, and famous engineering problem — reusability vs coupling- have to be considered wisely._

**Q:** What takes most of your time? Technical issues or high-level organisational decisions?

**A:** _Of course tech stuff, but it needs some time and investment, therefore it requires top-level management support. You’ve to sell it to your decision makers._

**Q:** How much complex do you think a “todo app” can be made? Can you take a picture of it?

**A:** _Tricky question :) How much money is a car? Which car, Renault or BMW, new one or 2005 model. Of course, it depends on the team, technology, and the requirements. Here is the methodology. Setup a team with 5 people, 4 developers/engineers with pairs and a product owner. Define all PBIs, play poker planning game and determine the total effort, select a smaller PBI and analyze it with detail to understand the PBI effort and its actual time, draw the Product backlog item burn-down chart to follow project deadline. Run weekly or bi-weekly sprint. P.S: do not forget to add %10-%20 for a buffer or not foreseen items._

**Q:** What does object -oriented programming/architecture mean to you?

**A:** _Culture, philosophy, agility, engineering and team quality_

**Q:** What do you think will happen to functional languages in the future? Do you prefer such technologies/platforms/languages to a OOP based language?

**A:** _It’s hard to tell, but they have different goals and provide different solutions for different needs. Therefore I can not tell all programming languages will be OOP based. If you’re working with low-level or machine learning tools, do you need OOP?_

**Q:** What do you think about “serverless” technologies?

**A:** W_ill be de-facto soon. If you’re not working in a regulated environment, please at least try Amazon AWS or equivalents (Google Cloud, Microsoft Azure and etc.)._

**Q:** Would you name 5 (five) of the main features a software architect or engineer should have?

**A:** _Smart, inquisitive, motivated, disciplined and passionate._

**Q:** You should have some favourite moments within your work-life and some moments that you wish to forget. Would you share them with us?

**A:** _Building iyzico’s payment systems from scratch. Setup a team, hire an office, create a product, sell it using my_ [_network_](https://hackernoon.com/tagged/network)_._

Thanks you for your honest answers and hope that iyzico will be going on delivering high-quality services to make life easier.

Hope you like the article! Thanks for reading and see you in the next series.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**