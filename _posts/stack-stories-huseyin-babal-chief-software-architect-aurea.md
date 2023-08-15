---
title: 'Stack Stories: Hüseyin Babal, Chief Software Architect @ Aurea'
excerpt: 'We never stop, you know! Talking about software engineering and having nice
  opportunities to get advices from software handcrafters should...'
coverImage: '/assets/blog/stack-stories-huseyin-babal-chief-software-architect-aurea/cover.webp'
date: '2017-11-27T06:10:34.718Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/stack-stories-huseyin-babal-chief-software-architect-aurea/cover.webp'
---

We never stop, you know! Talking about software engineering and having nice opportunities to get advices from software handcrafters should make you feel marvelous. Without making you bored, here is the next one.

We had the second session with [Hüseyin Babal](https://twitter.com/huseyinbabal) whom we all know from GDG(s) all around the world from [Aurea Software](https://twitter.com/AureaSoftware), providing cloud, DevOps and microservices transition services and talked on his general software tech and more. Hope you will like this step!

![](https://cdn-images-1.medium.com/max/800/1*tZfMoKDdAozNMJRg4ushmg.jpeg)

**Q:** How long have you been working in this field and where are you currently working at?

**A:** _I spent 10 years on Software Development for freelance + enterprise projects, and now I am working remotely for Aurea Software as Chief Software Architect._

**Q:** Basing on what principle have you formed your teams?

**A:** _I am not managing a team :)_

**Q:** How do you classify autonomy of the developers within the teams? Do the developers decide on issues concerning their stack together?

**A:** _There are lots of teams on my current company and most of the teams depends each others as downstream services. Teams interact between them to handle this issues. Due to this, we are responsible for connected stacks and capable of installing that stack locally or on an experimental environment._

**Q:** Where do you keep containerizing on your daily team work? Do you think it is important? What do you do to scale those containers?

**A:** _We use Docker Swarm, AWS ECS, Kubernetes according to needs. It is very important to have containerized apps for daily works. For Kubernetes, we are already capable of scale according to CPU loads or some custom utilization, but for Docker Swarm and AWS ECS, we have some custom workarounds._

**Q:** How do you work with TDD approach handled it everyday?Have you participated in the configuration process? What were the steps during the setup?

**A:** _We apply TDD daily basis by using supporting tools. Every developer has a company wide configurations like checkstyle, findbugs, etc… Before creating a PR, you need to have all conditions met and reached the Jenkins threshold. Review process done on Github Enterprise._

**Q:** What are your choices of software achitecture? What have you used before and what are you curently using? Do you think Majestic Monolith is the thing?

**A:** _For new projects, I always prefer to use Microservices Architecture with Polygot development. For the existing monoliths, I prefer to split them according to minimal business concept starting from non-critical ones._

**Q:** Do you distinguish the projects as easy or complex? What do you think makes a project complex? Do you also evaluate the complexity of each project within itself?

**A:** _There is no complex project according to me if you are aware of commonly used architectural design patterns. However, If I wanted to group them, I would say “Complex” if it has lots of dependent services. You need to apply mocking strategies to simulate more convenient stack during your daily TDD. If you are using microservices, most probably you cannot measure complexity because of the complexity of other dependent services._

**Q:** How do you stabilise the versions while working with several different teams and trying to make the versions coherent? And if you are using git, what are the tools you are using with it? What are the difficult parts and advantages of working with small and big (with too many people) teams?

**A:** _I believe the power of semantic versioning, and apply it manually or in automated way for some languages. Semantic Release CLI is very handy for Node.js projects, and for other languages, I am controlling versions manually according to semantic versioning rules. Since most of the dependency management tools supports this versioning, you don’t need to take care of which versions to be installed on your project. Small or big teams doesn’t matter, it is always an advantage to have this vision on versioning system._

**Q:** Have you encountered any difficulties about microservices infrastructure on your current workplace?

**A:** _I have gained lots of experiences during microservice transformations on Sony and eBay. This led me to setup a microservices architecture on recent companies. However, the hardest parts were monitoring for apm insights, having a good logging structure with a centralized log management tools, being proactive on outage for lots of microservice instances._

**Q:** What takes most of your time? Technical issues or high-level organisational decisions?

**A:** _High level decisions take too much time than technical issue, because we have lots of teams and the high level decisions needs to be approved in a very careful and controlled way._

**Q:** How much complex do you think a “todo app” can be made? Can you take a picture of it?

**A:** _If you do not separate Frontend-Backend projects and try to render Frontend Frameworks like Angular React on backend side, this can be the most complex todo app. I couldn’t forget the times that developed excel-like UI projects according to business requirements on one of my previous companies. There were 10.000 check box on a standard admin page !_

**Q:** What does object -oriented programming/architecture mean to you?

**A:** _I feel very comfortable during OOP development because we all have been teached by using imperative languages during university and used them on companies. I do use reactive/functional programming with Node.js, Scala but do not change Java with any other languages due to its stability._

**Q:** What do you think will happen to functional languages in the future?Do you prefer such technologies/ platforms/languages to a OOP based language?

**A:** _I like to use them together actually. For example, for big data and high processing operations I use functional languages, and for crud bases systems I use OOP languages. I think they will be used in the future together._

**Q:** Do you think that there are some similarities or differences between Object-oriented approach with component-based/feature-based/microservices-based architectures? Or you think that they’re all in different pages?

**A:** _I divide monolith to microservices by using minimal business concept, that means grouping them with features, or components. However, object oriented approach is different thing, something that is higher level concept._

**Q:** What do you think about “serverless” technologies?

**A:** _Used Firebase for a couple of projects and I think serverless architecture eliminates lots of responsibility for a specific application delivery lifecycle._

**Q:** Have you ever said “if wish we’ve done it differently” when a project was gone live/was finished? If there are some examples, would you share a few of them with us? Were they about the organisational decisions or technical choices or solely personal issues?

**A:** _On some of microservices transformation projects, we have implemented aggregation level applications that communicates with foundation services. It would be better if we use API Gateway technologies like Tyk, Kong to manage the aggregation with this technologies._

**Q:** You sure must have some favourite moments within your work-life and some moments that you wish to forget. Would you share them with us?

**A:** _5 years before, we were using an enterprise CMS application bought from Oracle and this application was deprecated on Oracle Corporation. This has been used to manage content of corporate products. I was the only developer responsible for maintenance of this project. I was mistakenly deleted the war file of this project, and guess what there is no other copy! I somehow found by requesting from IT teams to search from backups. Hopefully, it was used internally only._

**Q:** Let’s assume you were on your holiday and had an idea on a project. What are the fist approaches/ technologies that appear on your mind? Of course most of us have the tendency to use the languages we’re most familiar with; but do you have a “must have” among those choices?

**A:** _Node.js is the most productive language for me to create an MVP as soon as possible. I use Node.js, MongoDB, and Angular for this kind of situation and you can freely serve this project by using Heroku, and MLab for MongoDB. Nowadays, I gave a chance to Golang + Gorilla for REST APIs. I compile Golang projects to binaries to use inside Docker Stratch images. They are very small which are only 2.8 MB!_

**Q:** What does over-engineering mean to you?

**A:** _Trying to use all of the heard technologies in order to satisfy ourselves._

**Q:** Would you share some of the projects that you’ve worked in and enjoyed the most?

**A:** _Real-Time Notification System on eBay Product Pages. It was something like on booking.com and I used Node.js, SocketIO, Apache Kafka and MongoDB._

**Q:** Have you ever felt embarrassed during a code-review session?

**A:** I couldn’t remember such a case.

**Q:** Would you name 5 (five) of the main features a software architect or engineer should have?

**A:** _Enthusiastic, proactive, having good software and DevOps mindset, willing to use non violent communication, hungry for new technologies but stable for current technologies if it is OK._

**Q:** What are you looking for while choosing your team members?

**A:** _Ego free, experienced, have a good context switch property._

**Q:** What are your future prospects of software engineering? You can talk about unikernels, Web Assembly (hype dedected!), side effects of using a system programming language to code a web app, or converting some basic counter applications into a rocket science ;) It is free..

**A:** _I think the feature cannot be thought without the area of Software Engineering. As an example, software courses started to given to students from primary schools nowadays. I think this explains the overall picture. And the good news is we will never be bored because there are lots of area we can apply Software Engineering like AI, IoT, etc…_

Thanks you for your honest answers and hope that you will be going on having so many exciting software development adventures while you are listening to metal music!

![](https://cdn-images-1.medium.com/max/800/1*oIfCVpFmKMgXcq8jSvS4WA.jpeg)

Hope you like the article! Thanks for reading and see you in the next series.

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**