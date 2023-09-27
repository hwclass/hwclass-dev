---
title: "Toogling Features for the Future: OpenFeature"
excerpt: "And introducing OpenFeature, The Open Standard Supported by CNCF."
coverImage: '/assets/blog/toogling-features-for-the-future-openfeature/cover.png'
date: '2023-09-27T17:08:46.924Z'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/toogling-features-for-the-future-openfeature/cover.png'
---

## **History of Feature Toggling**

Feature toggles, which have a history dating back to the 1970s, have seen a substantial surge in adoption, driven by technological advancements and evolving software engineering practices. This journey spans from rudimentary manual approaches to sophisticated automated systems, highlighting their pivotal role in contemporary development processes.

## **Types of Feature Toggles**

**Release toggles, Experiment toggles** for A/B testing, **Ops toggles** to provide controls for operations / infrastructure details, and **Permissioning toggles** for letting users in different segments to see the features enabled etc. They’re sometimes called **Feature Flippler**, **Feature Switch**, **Feature Gates**, or **Conditional Feature** and etc.

## **A General Architectural Overview of Feature Flagging System**

There are actually 2 (two) types of them. One is in Build-time, the other one is Runtime feature flags.

**Build-time Feature Flags:** Compiles the feature flags into a certain format (csv, json, persisted in a database, etc.) and provides them over an API. Mostly used for backoffice applications, dashboard features and so on. That means the feature toggles are not in real-time in reflection within the software system they’re attached to. And every change needs an update in the platform which means it may require deployment in software systems. Examples are like Environment Variables, etc.

**Runtime Feature Flags:** Provides the flags in real-time back to the system they’re constantly fetched over a continuous connection like WebSockets or Server-Sent Events or an API. There is no need to compile the flags and the changes reflect immediately once they’re switched on or off.

It is also preferred to use Key-Value Databases like Redis, [Workers KV](https://workers.cloudflare.com/built-with/projects/two-flags/) or [Upstash](https://upstash.com/blog/feature-flags-with-vercel-and-upstash)  in-memory as a layer which provides the flags back to the products. Most of the outsourced solutions are either within a persisting layer like a database or a 3rd-party service / product.

So let’s have a look how a Runtime-based Feature Flagging architecture looks like.

![](/assets/blog/toogling-features-for-the-future-openfeature/ff-architecture.png)

## **Why Features to be Flagged is Critical**

Especially if your product operates in different regions / countries and for different segment of users. Feature flags should be allowing you granularly switch and transition the experience of the features to be enabled from an authorized dashboard for letting product people to switch on / off.

This will brink back a number of flexibility in terms of what’s to be achieved via Feature Flags / Feature Toggles. For example, a team is planning a launch with the both frontend & backend changes. So having a properly-implemented feature flagging tool in place would help the team to first go live with some low-engagement areas / countries / user pools to tryout and inspect / monitor if everything goes well with the feature and fix the bugs or deficiencies for going full-live.

Feature flags are also a critical tool for applying software practices like [Trunk-based Development](https://trunkbaseddevelopment.com/feature-flags/) which a team of software engineers use a single branch to push the changes behind feature toggles and iteratively go live by checking them on and off. That also improves the DX (Development / Developer experience & satisfaction).

## **Bottlenecks & Best Practices in the industry**

It is always recommended to track down the flags which are redundant and not used anymore. So teams prefer having following-up tickets / branches to remove those iteratively.

Having The fewer feature toggles is usually better for avoiding confusion and “flag hell”. This will also increase the developer engagement to the platforms.

Once you’re done and remove the flag, it is always better to not reuse them back as a best practice with the same naming.

Generally avoiding nesting / nested feature flags is a best practice for avoiding confusion and for the ease-of-management.

Additionally, supporting the flag management with some useful software design patterns like  Strategy Pattern instead of using lots of ifs in the system. I always think that if a feature flagging system is based on if/else switches, it is error-prune. You can find the link as a working example: [https://codesandbox.io/s/distracted-microservice-dprzch?file=/src/index.mjs](https://codesandbox.io/s/distracted-microservice-dprzch?file=/src/index.mjs)

```jsx
const DEFAULTS = { IS_AUTH_ENABLED: false, IS_PRICE_ENABLED: false };

const development = (defaults) => {
  // Flags for development environment
  return { ...defaults, IS_AUTH_ENABLED: true, IS_PRICE_ENABLED: true };
};

const testing = (defaults) => {
  // Flags for testing environment
  return { ...defaults, IS_AUTH_ENABLED: true, IS_PRICE_ENABLED: true };
};

const production = (defaults) => {
  // Flags for production environment
  return { ...defaults, IS_AUTH_ENABLED: false, IS_PRICE_ENABLED: false };
};

const Features = {
  setFeature: function (featureEnvironment) {
      this.activate = featureEnvironment;
      return this.activate();
  }
};

function run() {
  const features = Object.create(Features);

  features.setFeature(development);
  console.log("Development Features: " + JSON.stringify(features.activate(DEFAULTS)));

  features.setFeature(testing);
  console.log("Testing Features: " + JSON.stringify(features.activate(DEFAULTS)));

  features.setFeature(production);
  console.log("Production Features: " + JSON.stringify(features.activate(DEFAULTS)));
}

run();

document.getElementById("app").innerHTML = `
  <h1>Feature Flags with Strategy Pattern</h1>
  <div>
    <h2>Development</h2>
    <p>${JSON.stringify(Features.setFeature(development))}<p>
    <h2>Testing</h2>
    <p>${JSON.stringify(Features.setFeature(testing))}<p>
    <h2>Production</h2>
    <p>${JSON.stringify(Features.setFeature(production))}<p>
  </div>
`;
```

Considering and following a certain naming convention for ramping up the toggles within a system makes always easy to track. eg. ***ENABLE_AUTH.***

If possible, released feature flags should be versioned.

So let’s jump in into an open standard supported by CNCF: OpenFeature.

## What’s OpenFeature?

![](/assets/blog/toogling-features-for-the-future-openfeature/open-feature-logo.svg)

In today's fast-paced software development landscape, the ability to control, test, and release new features with precision is crucial. OpenFeature, an open standard supported by the CNCF (Cloud Native Computing Foundation), is your bridge to effective and vendor-agnostic feature flagging management. Discover the myriad benefits of incorporating OpenFeature into your software development process.

The link to [their website here](https://openfeature.dev/) and you can find all the related SDKs for several programming languages like Go, Javascript, C#, PHP & Java over their [Github Organization page](https://github.com/open-feature).

So what would be the benefits of having a centralized and open source solution for feature toggling in place can be listed as follows:

**1. Vendor-Agnostic Approach:** OpenFeature is a community-driven API designed to work seamlessly with your favorite feature flag management tool, irrespective of the vendor. This means you're not locked into a single provider and can choose the tool that suits your needs best.

**2. Apache 2 License:** OpenFeature is an open source project under the Apache 2 license, ensuring that it remains free, open, and accessible to all. This encourages collaboration and innovation across the software development community.

**3. Versatility:** OpenFeature is tailored to accommodate any feature flag management tool or in-house solution. Its flexibility allows you to effortlessly switch between platforms or consolidate multiple tools, reducing complexity and streamlining your workflow.

**4. Broad Industry Support:** OpenFeature has gained widespread support across the industry. Many top open source and commercial tools have officially-supported providers for OpenFeature, ensuring seamless integration into your existing ecosystem.

**5. Multi-Language Support:** OpenFeature speaks the language of your choice. It supports a wide range of programming languages, including GoLang, JavaScript, C#, Java, and PHP, with more languages continuously added. This diversity ensures that your development team can work with OpenFeature regardless of their preferred language.

**6. Simplified Feature Toggling:** OpenFeature simplifies the process of feature flagging, making it easier to control which features are visible to your users. This precise control allows you to test new functionalities with a select group of users or gradually roll out changes, minimizing risks and enhancing user experience.

**7. A/B Testing Made Easy:** OpenFeature enables efficient A/B testing, helping you gather valuable user feedback and data to make informed decisions about feature improvements or rollbacks.

**8. Improved Collaboration:** Collaborate seamlessly with your development and operations teams. OpenFeature provides a common ground for developers, QA engineers, and product managers to work together in a coherent and efficient manner.

**9. Rapid Development and Deployment:** Accelerate your software development cycles by using OpenFeature to manage feature toggles. This means faster iteration, quicker bug fixes, and enhanced responsiveness to market demands.

**10. Community-Driven Innovation:** As an open source project, OpenFeature benefits from the collective expertise and insights of the software development community. You can actively contribute to its growth and improvement, ensuring it aligns with your evolving needs.

![](/assets/blog/toogling-features-for-the-future-openfeature/tech-beyond-horizon.png)

In conclusion, OpenFeature is your gateway to streamlined feature flagging management that harmonizes your feature flagging tool with your software system. Embrace the power of vendor-agnostic, community-driven open standards to enhance your development process, reduce complexity, and delight your users with new features.

### How can I use it, then?

Here is an example implemented within a Fastify API by using OpenFeature’s in-memory flag provider. You can easily find and use your favorite backend / frontend tool to provide them for your systems.

```jsx
import Fastify from 'fastify';
import { InMemoryProvider } from '@openfeature/in-memory-provider';

// Create the Fastify instance
const fastify = Fastify({
  logger: true,
});

// Feature Flags in place
// which means that the flags are available
// as soon as the API is up & running...
const FLAG_CONFIGURATION = {
	'feature-flag': true,
};

// Create & Set the OpenFeature flag provider
const featureFlagProvider = new InMemoryProvider(FLAG_CONFIGURATION);

OpenFeature.setProvider(featureFlagProvider);

fastify.get('/', async (_, res) => {
  const isFlagEnabled = await featureFlags.getBooleanValue('feature-flag', false); 

   if (isFlagEnabled) {
      res.send({ text: 'Feature is enabled...' });
   } else {
      res.send('Hello, world!');
   }
});

const start = async () => {
  const port = 8080;

  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### **What are the Other Tools, then?**

[LaunchDarkly](https://www.notion.so/Toogling-Features-for-the-Future-OpenFeature-867a1dae9af04e9aac6c73e01d1be475?pvs=21): Provides Server-Sent Events based runtime toggling.

[Vercel - Edge Config](https://vercel.com/docs/storage/edge-config): For A/B testing and redirects on Vercel platform.

[AWS AppConfig](https://aws.amazon.com/blogs/mt/using-aws-appconfig-feature-flags/): Runtime toggling within AWS ecosystem.

[PostHog](https://posthog.com/feature-flags): Build-time feature flags.

## **Conclusion**

As a summary, feature toggles / flags are not as mainstream yet but better to keep eyes on as you will most probably need in a near future as the dynamics of business are increasing more in being more agile / temporary environments which keep changing. User feedback is something crucial for today’s software engineering, so you will most probably be using one of those solutions above.

Hope you liked the article and please do not forget to share it across your netword over the wire. 🙌🏼