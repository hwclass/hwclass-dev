---
title: 'Unveiling the AI Magic: Building Hearbitz on Google Cloud Platform'
excerpt: 'Web application code bundlers (Webpack, etc.) are used in almost all web applications we develop today. We owe this to the inability of browser engines to keep up with the advancements in ECMAScript so far.'
coverImage: '/assets/blog/unveiling-the-ai-magic-building-hearbitz-on-google-cloud-platform/cover.webp'
date: '2023-07-27'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/unveiling-the-ai-magic-building-hearbitz-on-google-cloud-platform/cover.webp'
---

---

**Embarking on a Journey: Building Hearbitz with the Power of Google Cloud Platform and Cutting-Edge Technologies**

In the rapidly evolving world of news consumption, staying informed has never been more critical. As the creator of Hearbitz, a revolutionary news app designed to deliver AI-powered summaries in multiple languages, I embarked on a transformative journey to shape the future of news.

Leveraging the unparalleled capabilities of Google Cloud Platform (GCP) alongside innovative technologies like OpenAI, and a very capable CMS, HyGraph, I've built an experience that redefines how we connect with the world's stories.

As I am unveiling the behind-the-scenes magic of Hearbitz and the incredible tools that 
fueled its creation - Cloud Scheduler, PubSub, Cloud Functions, Cloud Storage, and Firestore, get ready for an exhilarating ride through the architecture, innovations, and aspirations that brought Hearbitz to life. So, let's dive in!

**Building the Engine - A Closer Look at Hearbitz's Core Process Units**

The Scheduler plays a crucial role in automating content retrieval for Hearbitz. With its precise timing capabilities, it triggers the process of scraping fresh news content from various sources. This ensures that users receive the latest and most relevant information.

**PubSub Event: event-scrape-content**

The PubSub Event acts as a seamless communication bridge, facilitating the smooth flow of data within Hearbitz. Once the Scheduler triggers the content scraping process, the PubSub Event ensures that all relevant components within the app are notified and updated with the fresh data. This real-time event-driven approach enhances the responsiveness and efficiency of Hearbitz.

**Cloud Function: scraper**

The Cloud Function, aptly named "scraper," is the workhorse behind Hearbitz's content aggregation process. It intelligently collects and processes the scraped content and organizes. This dynamic functionality ensures that Hearbitz's news snippets are accurate, up-to-date, and tailored to users' preferences.

**Crafting the Summarisation Magic - The Role of PubSub Events and OpenAI API**

In this section, we'll explore the captivating process that brings concise and insightful summaries to Hearbitz users. Two key players make this magic happen: PubSub Event and the powerful OpenAI API.

The PubSub Event "event-summarise-content" receives the freshly scraped news content from the previous function "scraper." As the data flows seamlessly through Hearbitz, this event acts as a pivotal trigger, ensuring that the summarisation process is initiated in a timely and efficient manner.

**Cloud Function: summariser**

Meet the "summariser" - the heartbeat of Hearbitz's summarisation engine. As the PubSub Event activates this Cloud Function, it leaps into action, swiftly fetching the scraped content from Hearbitz's storage and seamlessly connecting with the powerful OpenAI API. Additionally, as we need to let OpenAI API know about which language to be generated, we're mapping the Google Text-to-Speech supported language codes.

Default languages supported on Hearbitz.Embodying the art of summarisation, the OpenAI API masterfully analyses the content sent by the summariser. With cutting-edge natural language processing capabilities, it distills the essence of each news piece, crafting concise and engaging summaries that captivate Hearbitz users.

Together, this dynamic trio - PubSub Event, summariser, and the awe-inspiring OpenAI API - work in perfect harmony to deliver the magic of concise and personalised news snippets right to your fingertips.

**Unleashing the Power of Transformation - PubSub Events, Cloud Function, and Google Text-to-Speech API**

At the heart of this transformation lies the PubSub Event "event-transform-content." This event plays a pivotal role in initiating the journey from written news to engaging audio. When triggered, it propels the process forward, ensuring that the next steps come to life.

**Cloud Function: transformer**

The "transformer" - the genius behind converting written news into delightful audio. As the "event-transform-content" sets the wheels in motion, the transformer seamlessly steps in, leveraging the power of the Google Text-to-Speech API. The very challenge which forces me to use stream.PassThrough() to solve the issue of "big voice files" in an asynchronous way.

Another challenge was the voice type of the news. Originally they are "NEUTRAL", "FEMALE" and "MALE" defined by Google Text-to-Speech API but for example in Turkish, there is only FEMALE supported by the API itself. Still investigating, hope that's just something like a coincidence.

**Cloud Storage: Home of Captivating MP3s**

As the transformer works its magic with the Google Text-to-Speech API, captivating MP3 files are born. These audio gems find their home within Cloud Storage, ready to be served to Hearbitz users, bringing the news to life through their headphones.

This incredible trio - PubSub Event, "transformer", and the Google Text-to-Speech API - showcases the art of transforming written words into immersive audio experiences.
Voice content persistence with Cloud Storage

**Empowering Permanence - PubSub Events, Cloud Function, and Cloud Firestore**

As Hearbitz continues to serve you captivating news content, the PubSub Event "event-persist-content" takes center stage. This pivotal event sets in motion the process of preserving your personalized news preferences, ensuring that your journey remains tailored and seamless.

**Cloud Function: persister**

Meet the "persister" - the guardian of your personalized news experience. As the PubSub Event activates this Cloud Function, it meticulously gathers and organizes your preferences, ensuring that every click and interaction is thoughtfully captured.

As the persister works its magic with the Google Text-to-Speech API, captivating MP3 files are born and stored in Cloud Storage. But that's not all - we go the extra mile to enhance your experience. Hearbitz also captures vital metadata and stores it securely in Firestore. This valuable data ensures that each audio snippet is enriched with relevant information, such as the source, language, and timestamps.

Cloud Firestore becomes the home of your personalized Hearbitz experience. Within this powerful NoSQL database, your preferences find a secure abode, ready to be accessed whenever you return. This ensures that Hearbitz understands your taste, delivers relevant content, and makes every visit a delightful one.

**Seamless Delivery - Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Artifact Registry**

In this section, we'll unravel the intricate process that ensures a seamless delivery of Hearbitz's captivating voice content. Embrace the power of Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Artifact Registry as they orchestrate a harmonious symphony, bringing the magic of audio news right to your fingertips.

**Cloud Firestore: The Keeper of Voice Content Records**

Within the vast realm of Cloud Firestore, a treasure trove of voice content records resides. Each snippet of audio news, personalized and enchanting, awaits its moment to shine, ready to be served to the eager ears of Hearbitz users.

**Cloud Media CDN: Fueling Content Delivery**

Embracing the velocity of Cloud Media CDN, Hearbitz ensures a swift and smooth delivery of voice content to users across the globe. With cached MP3s optimized for performance, users experience a delightful streaming experience, free from lags or delays.

**Cloud Build & Artifact Registry: The Heart of Deployment**

As Hearbitz evolves and refines its features, Cloud Build and Artifact Registry stand as the beating heart of seamless deployment. With the utmost precision, they orchestrate the release of updates, ensuring that users receive the latest innovations in real-time.

Hearbitz's dynamic web app finds its home in the realm of Cloud Run, where it thrives on serverless architecture and rapid scalability. This powerful platform guarantees a seamless and responsive user interface, elevating the news-listening experience to new heights. So I only pay once the app is used, the remaining times the container goes idle and shut down.

**Seamless Delivery - Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Artifact RegistrySummary: Full-stack Experience on Cloud**

In the exhilarating journey of building Hearbitz, we've witnessed the magic of Google Cloud Platform (GCP) and an ensemble of cutting-edge technologies that bring this revolutionary news app to life. From the seamless content scraping process triggered by the Scheduler and PubSub Event to the artful summarization of news pieces using Cloud Function and the OpenAI API, every step is a symphony of innovation. But Hearbitz doesn't stop there - it goes beyond the written word, transforming content into captivating audio with the help of Cloud Function, Cloud Storage, and the Google Text-to-Speech API. Each audio gem finds a home in Cloud Storage, while vital metadata is preserved in Firestore, ensuring an immersive and comprehensive news-listening experience.

The enchanting journey continues with Hearbitz's commitment to permanence - thanks to PubSub Event, Cloud Function, and Cloud Firestore. The app captures and preserves personalized news preferences, ensuring that every user's journey is uniquely tailored and memorable. Finally, the grand finale unfolds as Cloud Firestore serves as the gatekeeper, delivering voice content records to users through Cloud Media CDN. The dynamic web app, housed in Cloud Run and facilitated by Cloud Build and Artifact Registry, guarantees rapid deployment of updates, keeping users at the forefront of innovation. Together, this symphony of technologies creates a harmonious and immersive news experience, elevating Hearbitz to the forefront of personalized news delivery.

**Summary: Full-stack Experience on Cloud**

---

**Extras**

__Emailing Flow:Connecting with Our Beta Testers - Scheduler, PubSub, Cloud Function, HyGraph, Cloud Tasks, and Cloud Function__

In the heartbeat of our beta program lies a seamless and efficient emailing flow, ensuring that our valued beta testers receive exclusive invitations with warmth and precision. Let's take a closer look at the interconnected steps that keep our community engaged.

__Scheduler: trigger-beta-invite__

The Scheduler takes the stage, orchestrating the perfect timing to send out beta invitations. With its impeccable sense of timing, it ensures that each beta tester receives the invitation at the right moment, sparking excitement for their journey with Hearbitz.

__PubSub: event-invite-beta__

As the Scheduler sets the tempo, the PubSub event "event-invite-beta" springs into action, fueling the flow of communication. This event acts as a powerful messenger, bridging the gap between the Scheduler and the Cloud Function "emailer."

__Cloud Function: emailer__

Meet the "emailer" - the heart and soul of our emailing flow. As the PubSub event "event-invite-beta" activates this Cloud Function, it carefully crafts personalized emails, extending warm invitations to our beta testers, inviting them to embark on this transformative news-listening experience.

__GMail API: Enabling Seamless Communication__

The GMail API adds a touch of magic to our emailing flow, enabling seamless communication between Hearbitz and Gmail accounts. With its capabilities, our emails are sent with precision, ensuring they reach our beta testers' inboxes reliably and securely.
3rd-party: HyGraph

Hearbitz embraces the brilliance of HyGraph, an innovative third-party CMS platform, to optimize the emailing process further as I only expected something to keep some data of beta users, that's all. With its prowess in email data persistence, HyGraph adds a touch of magic to each email data via its native GraphQL API, ensuring they resonate with the needs of information.

__Cloud Tasks: emailTasks__

Efficiency takes center stage with Cloud Tasks. This powerful service ensures that our email sending is reliable, scalable, and delivered with precision. With Cloud Tasks, we can be confident that each beta invitation reaches our testers seamlessly. Otherwise, you can be blocked by the minimum response time by the Cloud Functions specifically which is 60 seconds as default.

__Cloud Function: emailer-task__

Completing the symphony, the Cloud Function "emailer-task" fine-tunes the emailing process, ensuring smooth coordination with Cloud Tasks. Together, they form a dynamic duo, ensuring that our beta testers receive their invitations promptly and with the utmost care.

---

**Additional Mentions**

__Firebase Auth - Seamlessly Connecting Beta Users__

In our quest to create a truly personalized news-listening experience, we embrace the seamless connectivity of Firebase Auth. By integrating Firebase Authentication into Hearbitz, we empower our beta users to effortlessly log in using their Google accounts. This authentication framework not only ensures a smooth onboarding process but also strengthens the security and trust that underpins our community.

In our relentless pursuit of a secure and robust news-listening platform, we proudly rely on IAM & Admin to ensure granular access permissions and foolproof authorization. By leveraging IAM (Identity and Access Management) and Admin capabilities, we establish a strong fortress that safeguards Hearbitz's invaluable data and resources.

IAM allows us to define precise roles and permissions, tailoring access levels for each team member and service account. This intricate control ensures that the right individuals have access to the right information, elevating data security to new heights.

__Logs Explorer - Illuminating the Path to Perfection__
In our relentless pursuit of excellence, we turn to Logs Explorer as a guiding light, illuminating the path to perfection. As we embrace the power of Cloud Functions to deliver a seamless news-listening experience, Logs Explorer becomes our trusted companion, providing invaluable insights into the workings of our functions and the history of any errors that arise.

__Logs Explorer - Illuminating the Path to PerfectionThe Backbone of Reliability: Terraform - Building a Robust Infrastructure__

At the heart of Hearbitz's unwavering reliability lies Terraform, our secret weapon for crafting a resilient and scalable infrastructure. With Terraform's prowess, we orchestrate a symphony of settings on Cloud Run and finely tune our traffic management, ensuring a seamless and delightful experience for our beta testers.

__The Backbone of Reliability: Terraform - Building a Robust Infrastructure__

When it comes to Cloud Run and Cloud Functions, Terraform takes center stage, shaping our deployment strategies, autoscaling rules, and container configurations. Its versatility allows us to effortlessly adapt to fluctuating demand, ensuring that Hearbitz thrives under any workload.

__Cloud Run and Cloud Functions - Harnessing Performance: Universal App with Preact & Fastify, Server-side Rendering, and Service Workers__

At the heart of Hearbitz's exceptional performance lies Preact & Fastify in combination, a lightweight yet powerful library that fuels our Universal app. By adopting server-side rendering (SSR) alongside client-side hydration, Hearbitz delivers an unparalleled user experience that is both rapid and engaging.

Client-side hydration complements SSR, allowing the app to take over once loaded, offering seamless interactivity and dynamic updates. The combination of SSR and hydration creates a harmonious flow, delighting our beta testers with a smooth and responsive app experience.
In our pursuit of peak performance, we enlisted Service Workers to introduce caching capabilities. These clever workers proactively cache frequently accessed resources, ensuring lightning-fast subsequent visits, even in offline or low-connectivity scenarios. 

With Service Workers in action, Hearbitz remains accessible and functional, regardless of network conditions.

---

**Future Improvements**

__Streamlining Voice Generation with GCP Workflows__

GCP Workflows presents a groundbreaking opportunity to organize and streamline the step-by-step voice generation process with effortless ease. Like assembling Lego blocks, we plan & envision a simple configuration that orchestrates the entire audio synthesis journey.

__Embracing Real-Time Flexibility: Firebase Remote Config for Dynamic Feature Control__

In our pursuit of agility and seamless feature deployment, I would like to use Firebase Remote Config as a key enabler. With this powerful tool in our arsenal, I can unlock the ability to switch features on and off in real-time, bringing instant changes to our live product.

Trunk-based development is at the core of our philosophy, and Firebase Remote Config aligns perfectly with this approach. With a dynamic control panel at our fingertips, we can seamlessly enable or disable features, respond to user feedback, and iterate rapidly, all without the need for app updates.

This real-time flexibility becomes our gateway to delivering a personalised and ever-evolving news-listening experience. I can experiment, fine-tune, and optimize features on the fly, ensuring that each user journey is tailored to perfection.

__Accelerating Builds: Embracing esbuild for Lightning-Fast Results__

Replacing babel with esbuild for faster builds. Recently it takes around ~10 seconds to complete a build which is way longer than expected. The goal should be <1 second to have a build in the server and the client-side bundles as a whole.

By replacing babel with esbuild, we will unlock a world of possibilities for our server and client-side bundles. As we set our sights on the goal of sub-second builds, esbuild becomes the catalyst that transforms development and deployment into a seamless experience.

---

Hope you liked the article and find something interesting to tryout in your next project! 
Please feel free to give a shout-out to me in the following channels and you can check over the StackShare link to see the full picture.

Hearbitz StackShare StackTwitter: https://www.twitter.com/hwclass

Linkedin: https://www.linkedin.com/in/hwclass

Hearbitz Linkedin: https://www.linkedin.com/company/98335830/