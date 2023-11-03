---
title: 'Revolutionizing News Delivery: Building Hearbitz with Google Cloud Platform and Cutting-Edge Technologies'
excerpt: 'Web application code bundlers (Webpack, etc.) are used in almost all web applications we develop today. We owe this to the inability of browser engines to keep up with the advancements in ECMAScript so far.'
coverImage: '/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/cover.png'
date: '2023-11-02'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/cover.png'
---
_TLDR; We're at [WebSummit](https://websummit.com/) 2023 happening on 13th-16th of November. Would like to see you all there_ 🙌

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/websummit.png)
---

**Embarking on a Journey: Building Hearbitz with the Power of Google Cloud Platform and Cutting-Edge Technologies**

In the ever-evolving landscape of news consumption, it's more crucial than ever to stay informed. As the creator of Hearbitz, an innovative news app that harnesses AI-powered summaries in multiple languages, I embarked on a transformative journey to redefine how we connect with the world's stories.

Hearbitz's architecture has evolved, incorporating Google Cloud Platform (GCP) alongside groundbreaking technologies like OpenAI, and a robust CMS, HyGraph. This journey has brought Hearbitz to life, reimagining the way we experience news.

Now, let's take a deeper dive into the architecture and innovations that have breathed life into Hearbitz, including new additions to the tech stack: GCP Cloud Tasks and Cloud Run, enhancing the reliability and robustness of our content retrieval system.

**Crafting the Magic: How Hearbitz (was/is) Working**

Before, we were totally relying on the "scraper" cloud function for hitting to the each news source and gather the content to be passed out as text to be summarised. But we've noticed some certain hickups as some of the functions were throwing errors because of the timeouts during the remote fetching due to the unfortunate depencencies onto the news sources.

This will make us think the whole structure again and decided to move to an another direction for gathering the data from the news sources: Instead of running a serverless function for more than 30 sources, we deployed an API with an endpoint `/scrape` to fetch the sources and send the payloads to `event-summarise-content` PubSub topic.

After switching from (finely-tuned) Cloud Function to Cloud Run endpoint, we are now able to catch all of the news resources content and reliably send them for summarising purposes to OpenAI's API.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/crafting-the-magic-how-hearbitz-was-working.png)

Additional to the new choices applied to the architecture, the whole adventure starts with the "trigger-scrape-content-new" scheduler. The Scheduler plays a vital role in automating content retrieval for Hearbitz. Its precise timing capabilities trigger the process of scraping daily news content from various sources, ensuring users receive the latest and most relevant information in different languages. Recent language support we have is like the list here: "Turkish", "English", "German", "Dutch", "Catalan", "French", "Italian", "Hindi" and "Portuguese" (for Portugal & Brazil, too).

**PubSub Event: event-scrape-content**

The PubSub Event acts as a seamless communication bridge, facilitating the smooth flow of data within Hearbitz. Once the Scheduler triggers the content scraping process, the PubSub Event ensures that the next step within the flow (as the Cloud Run instance) within the app are notified and updated with the fresh data. This real-time event-driven approach enhances the responsiveness and efficiency of Hearbitz.

**Cloud Run API: /scraper**

The API running on Cloud Run, specifically located behind "/scraper," endpoint is the workhorse behind Hearbitz's content aggregation process. It intelligently collects and processes the scraped content referring to the metadata stored within our Firestore instance and organizes. This dynamic functionality ensures that Hearbitz's news snippets are accurate, up-to-date, and tailored to users' preferences.

**Cloud Tasks & the Task Doing the Job: scraper-task**

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/crafting-the-magic-how-hearbitz-is-working.png)

Once the `event-scrape-content` topic is triggered to ping the `/scraper` endpoint, a new task generated within the Cloud Tasks queue to be picked up and run with the logic inherently placed into the `scraper-task` Cloud Function(s). Each news source will be doubled with a cloud task and a scraper-task to be completed with 3 retry attempts as an answer to non-completed / failed tasks and the logging off for keeping the price less. The queue itself has 500 dispatches per second with a 1000 as maximum dispatch value.

**Bringing Summarization to Life: The Process Behind Hearbitz**

Now, let's explore the captivating process that brings concise and insightful summaries to Hearbitz users. Two key players make this magic happen: PubSub Event and the OpenAI API.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/bringing-summarization-to-life-the-process-behind-hearbitz.png)

PubSub Event "event-summarize-content" receives freshly scraped news content from the "scraper" function. As data flows through Hearbitz, this event acts as a pivotal trigger, ensuring the summarization process begins in a timely and efficient manner.

**Cloud Function: summariser**

Meet the "summarizer" - the heartbeat of Hearbitz's summarization engine. As the PubSub Event activates this Cloud Function, it swiftly fetches scraped content from Hearbitz's storage and connects with the OpenAI API. Additionally, we now specify the language for OpenAI API to generate, mapping the language codes from Google Text-to-Speech.

Default languages supported on Hearbitz, too as mentioned above. The OpenAI API masterfully analyzes the content sent by the summarizer, distilling the essence of each news piece with cutting-edge natural language processing capabilities. This dynamic trio - PubSub Event, `summarizer`, and the awe-inspiring OpenAI API - work in perfect harmony to deliver the magic of concise and personalized news snippets right to your fingertips.

**Empowering Transformation: From Text to Audio**

At the heart of this transformation lies the PubSub Event "event-transform-content." This event plays a pivotal role in initiating the journey from written news to engaging audio. When triggered, it propels the process forward, ensuring that the next steps come to life.

**Cloud Function: transformer**

The "transformer" - the genius behind converting written news into delightful audio. As the "event-transform-content" sets the wheels in motion, the transformer seamlessly steps in, leveraging the power of the Google Text-to-Speech API. The very challenge which forces me to use stream.PassThrough() to solve the issue of "not-so-big voice files" (with around 70-80 KB) in an asynchronous way.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/empowering-transformation-from-text-to-audio.png)

Another challenge was the voice type of the news. Originally they are "NEUTRAL", "FEMALE" and "MALE" defined by Google Text-to-Speech API but for example in Turkish, there is only FEMALE supported by the API itself. Still investigating, hope that's just something like a coincidence.

**Cloud Storage: Home of Captivating MP3s**

As the transformer works its magic with the Google Text-to-Speech API, captivating MP3 files are born. These audio gems find their home within Cloud Storage, ready to be served to Hearbitz users, bringing the news to life through their headphones.

This incredible trio - PubSub Event, "transformer", and the Google Text-to-Speech API - showcases the art of transforming written words into immersive audio experiences.
Voice content persistence with Cloud Storage.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/cloud-storage-home-of-captivating-mp3s.png)

**Ensuring Permanence: Your Personalized News Journey - PubSub Events, Cloud Function, and Cloud Firestore**

As Hearbitz continues to serve you captivating news content, the PubSub Event "event-persist-content" takes center stage. This pivotal event sets in motion the process of preserving your personalized news preferences, ensuring that your journey remains tailored and seamless.

**Cloud Function: persister**

Meet the "persister" - the guardian of your personalized news experience. As the PubSub Event activates this Cloud Function, it meticulously gathers and organizes your preferences, ensuring that every click and interaction is thoughtfully captured.

As the persister works its magic with the Google Text-to-Speech API, captivating MP3 files are born and stored in Cloud Storage. But that's not all - we go the extra mile to enhance your experience. Hearbitz also captures vital metadata and stores it securely in Firestore. This valuable data ensures that each audio snippet is enriched with relevant information, such as the source, language, and timestamps.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/cloud-function-persister.png)

Cloud Firestore becomes the home of your personalized Hearbitz experience. Within this powerful NoSQL database, your preferences find a secure abode, ready to be accessed whenever you return. This ensures that Hearbitz understands your taste, delivers relevant content, and makes every visit a delightful one.

**Seamless Delivery: Bringing Audio News to Your Fingertips - Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Artifact Registry**

In this section, we'll unravel the intricate process that ensures a seamless delivery of Hearbitz's captivating voice content. Embrace the power of Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Container Registry as they orchestrate a harmonious symphony, bringing the magic of audio news right to your fingertips.

**Cloud Firestore: The Keeper of Voice Content Records**

Within the vast realm of Cloud Firestore, a treasure trove of voice content records resides. Each snippet of audio news, personalized and enchanting, awaits its moment to shine, ready to be served to the eager ears of Hearbitz users.

**Cloud Media CDN: Fueling Content Delivery**

Embracing the velocity of Cloud Media CDN, Hearbitz ensures a swift and smooth delivery of voice content to users across the globe. With cached MP3s optimized for performance, users experience a delightful streaming experience, free from lags or delays.

**Cloud Build & Container Registry: The Heart of Deployment**

As Hearbitz evolves and refines its features, Cloud Build and Container Registry stand as the beating heart of seamless deployment. With the utmost precision, they orchestrate the release of updates, ensuring that users receive the latest innovations in real-time.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/seamless-delivery-bringing-audio-news-to-your-fingertips-cloud-firestore-cloud-media-cdn-cloud-run-cloud-build-and-artifact-registry.png)

Hearbitz's dynamic web app finds its home in the realm of Cloud Run, where it thrives on serverless architecture and rapid scalability. This powerful platform guarantees a seamless and responsive user interface, elevating the news-listening experience to new heights. So I only pay once the app is used, the remaining times the container goes idle and shut down.

**Seamless Delivery: Bringing Audio News to Your Fingertips - Cloud Firestore, Cloud Media CDN, Cloud Run, Cloud Build, and Artifact Registry**

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/cloud-build-and-container-registry-the-heart-of-deployment.png)

In the exhilarating journey of building Hearbitz, we've witnessed the magic of Google Cloud Platform (GCP) and an ensemble of cutting-edge technologies that bring this revolutionary news app to life. From the seamless content scraping process triggered by the Scheduler and PubSub Event to the artful summarization of news pieces using Cloud Function and the OpenAI API, every step is a symphony of innovation. But Hearbitz doesn't stop there - it goes beyond the written word, transforming content into captivating audio with the help of Cloud Function, Cloud Storage, and the Google Text-to-Speech API. Each audio gem finds a home in Cloud Storage, while vital metadata is preserved in Firestore, ensuring an immersive and comprehensive news-listening experience.

The enchanting journey continues with Hearbitz's commitment to permanence - thanks to PubSub Event, Cloud Function, and Cloud Firestore. The app captures and preserves personalized news preferences, ensuring that every user's journey is uniquely tailored and memorable. Finally, the grand finale unfolds as Cloud Firestore serves as the gatekeeper, delivering voice content records to users through Cloud Media CDN. The dynamic web app, housed in Cloud Run and facilitated by Cloud Build and Artifact Registry, guarantees rapid deployment of updates, keeping users at the forefront of innovation. Together, this symphony of technologies creates a harmonious and immersive news experience, elevating Hearbitz to the forefront of personalized news delivery.

**Summary: Full-stack Experience on Cloud**

Culminating in a full-stack cloud-based architecture, Hearbitz leverages Google Cloud Platform (GCP) alongside cutting-edge technologies to provide users with a personalized and immersive news-listening experience. From content scraping and summarization to audio transformation and seamless delivery, this comprehensive system harmoniously orchestrates the magic of concise, engaging, and accessible news delivery.

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/main-flow.png)

**Extras**

We've removed the emailing scheduler (trigger-beta-invite) but keeping there as we will need to communicate with our users to invite them to WebSummit happening on 13th-16th of November in Lisbon, Portugal.

You can follow up the details mentioned in the previous article here: **[https://hwclass.dev/posts/unveiling-the-ai-magic-building-hearbitz-on-google-cloud-platform](https://hwclass.dev/posts/unveiling-the-ai-magic-building-hearbitz-on-google-cloud-platform)**

---

**Additional Mentions**

__Firebase Auth - Seamlessly Connecting Beta Users__

In our quest to create a truly personalized news-listening experience, we embrace the seamless connectivity of Firebase Auth. By integrating Firebase Authentication into Hearbitz, we empower our beta users to effortlessly log in using their Google accounts. This authentication framework not only ensures a smooth onboarding process but also strengthens the security and trust that underpins our community.

In our relentless pursuit of a secure and robust news-listening platform, we proudly rely on IAM & Admin to ensure granular access permissions and foolproof authorization. By leveraging IAM (Identity and Access Management) and Admin capabilities, we establish a strong fortress that safeguards Hearbitz's invaluable data and resources.

IAM allows us to define precise roles and permissions, tailoring access levels for each team member and service account. This intricate control ensures that the right individuals have access to the right information, elevating data security to new heights.

__Logs Explorer - Illuminating the Path to Perfection__
In our relentless pursuit of excellence, we turn to Logs Explorer as a guiding light, illuminating the path to perfection. As we embrace the power of Cloud Functions to deliver a seamless news-listening experience, Logs Explorer becomes our trusted companion, providing invaluable insights into the workings of our functions and the history of any errors that arise.

__Logs Explorer - Illuminating the Path to Perfection__

At the heart of Hearbitz's unwavering reliability lies Terraform, our secret weapon for crafting a resilient and scalable infrastructure. With Terraform's prowess, we orchestrate a symphony of settings on Cloud Run and finely tune our traffic management, ensuring a seamless and delightful experience for our beta testers.

__The Backbone of Reliability: Terraform - Building a Robust Infrastructure__

When it comes to Cloud Run and Cloud Functions, Terraform takes center stage, shaping our deployment strategies, autoscaling rules, and container configurations. Its versatility allows us to effortlessly adapt to fluctuating demand, ensuring that Hearbitz thrives under any workload.

__Cloud Run and Cloud Functions - Harnessing Performance: Universal App with Preact & Fastify, Server-side Rendering, and Service Workers__

At the heart of Hearbitz's exceptional performance lies Preact & Fastify in combination, a lightweight yet powerful library that fuels our Universal app. By adopting server-side rendering (SSR) alongside client-side hydration, Hearbitz delivers an unparalleled user experience that is both rapid and engaging.

Client-side hydration complements SSR, allowing the app to take over once loaded, offering seamless interactivity and dynamic updates. The combination of SSR and hydration creates a harmonious flow, delighting our beta testers with a smooth and responsive app experience.
In our pursuit of peak performance, we enlisted Service Workers to introduce caching capabilities. These clever workers proactively cache frequently accessed resources, ensuring lightning-fast subsequent visits, even in offline or low-connectivity scenarios. 

With Service Workers in action, Hearbitz remains accessible and functional, regardless of network conditions.

__Achieving Lightning-Fast Builds: Harnessing esbuild__

We have successfully replaced babel with esbuild to significantly accelerate our build process. Previously taking around 10 seconds, the build time has been drastically reduced, aligning with our target of achieving sub-second build times for both server and client-side bundles. Esbuild has played a pivotal role in streamlining development and deployment, ensuring a seamless and efficient experience."

![](/assets/blog/revolutionizing-news-delivery-building-hearbitz-with-google-cloud-platform-and-cutting-edge-technologies/hearbitz-stackshare.png)

---

**Future Improvements**

__Streamlining Voice Generation with GCP Workflows__

**[GCP Workflows](https://cloud.google.com/workflows)** presents a groundbreaking opportunity to organize and streamline the step-by-step voice generation process with effortless ease. Like assembling Lego blocks, we plan & envision a simple configuration that orchestrates the entire audio synthesis journey.

__Embracing Real-Time Flexibility: Firebase Remote Config for Dynamic Feature Control__

In our pursuit of agility and seamless feature deployment, I would like to use Firebase Remote Config as a key enabler. With this powerful tool in our arsenal, I can unlock the ability to switch features on and off in real-time, bringing instant changes to our live product.

Trunk-based development is at the core of our philosophy, and Firebase Remote Config aligns perfectly with this approach. With a dynamic control panel at our fingertips, we can seamlessly enable or disable features, respond to user feedback, and iterate rapidly, all without the need for app updates.

This real-time flexibility becomes our gateway to delivering a personalised and ever-evolving news-listening experience. I can experiment, fine-tune, and optimize features on the fly, ensuring that each user journey is tailored to perfection.

__Addressing iOS Audio Playback Issue: Enhancing User Experience__

One challenge on iOS mobile devices is the initial audio media playback, which requires users to interact with the app before it starts. This behavior, where the audio doesn't play on the first click but expects interaction such as clicks or scrolls, is currently under investigation. We aim to find the best solution that balances both the user experience (UX) and technical requirements to ensure a seamless audio playback experience on iOS.

---

Hope you liked the article and find something interesting to tryout in your next project! 
Please feel free to give a shout-out to me in the following channels and you can check over the StackShare link to see the full picture.

Hearbitz StackShare Stack: [https://stackshare.io/hearbitzapp/hearbitz](https://stackshare.io/hearbitzapp/hearbitz)

Twitter: [https://www.twitter.com/hearbitz_app](https://www.twitter.com/hearbitz_app)

Linkedin: [https://www.linkedin.com/company/hearbitz](https://www.linkedin.com/company/hearbitz)