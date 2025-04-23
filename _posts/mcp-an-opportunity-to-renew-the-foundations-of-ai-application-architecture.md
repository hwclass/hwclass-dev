---
title: "MCP: An Opportunity to Renew the Foundations of AI Application Architecture"
excerpt: "with WASM, EDA, SSE, Serverless"
coverImage: '/assets/blog/mcp-an-opportunity-to-renew-the-foundations-of-ai-application-architecture/cover.png'
date: '2025-04-23'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/mcp-an-opportunity-to-renew-the-foundations-of-ai-application-architecture/cover.png'
  credits: 'https://unsplash.com/@numericcitizen'
---

## Introduction

The emergence of the Model Context Protocol (MCP) represents a transformative opportunity to rethink and renew the foundational architecture of AI applications. As AI systems evolve to become more context-aware and capable of real-time interaction with external data and services, MCP offers a standardized, flexible framework that enables seamless integration between large language models (LLMs) and diverse external tools and data sources.

Basically, what I wanna explore within this article is how embracing MCP can drive a paradigm shift in system design, advocating for event-driven communication, efficient streaming technologies, unified language stacks via WebAssembly, and innovative serverless container deployment models as I think it is valuable to also start rethinking about re-organise our architecture foundations. But long story short, I have a number of contraversial idea on MCPs but still waiting the concept to gain some more traction which will encourage also people to standardize also the anti-patterns alongside the best practices. That was in the history of software development: API first exploded and even people were selling (I guess, they still...) selling the API endpoints based on a subscription or usage-based pricing which takes around 10 years to get established in the industry. Now we're talking about MCPs for just 1-2 months with a huge focus and even have platforms like **[mcp.run](https://www.mcp.run/)** and even a standardization approach protocol documented: **[Model Context Protocol](https://modelcontextprotocol.io/introduction)**.

### Moving Beyond REST: Embracing Event-Driven Architectures

Traditional AI and application systems have largely relied on RESTful APIs characterized by synchronous request-response patterns. While simple, this approach often leads to inefficiencies such as constant polling, increased latency, and tight coupling between services. MCP-enabled AI applications, however, benefit greatly from event-driven architectures (EDA), where communication is asynchronous and based on events that trigger actions or data flows in near real-time.

Event-driven APIs allow AI agents to react promptly to changes, fostering higher engagement, better scalability, and improved resilience. Unlike REST, where clients must repeatedly request updates, event-driven systems push notifications only when relevant events occur, reducing resource consumption and enabling loosely coupled, scalable microservices. This shift aligns perfectly with MCP's goal of dynamic, context-aware AI agents that operate efficiently across distributed systems.

And let's take an example of how EDA may contribute to the recent MCP happenings around the ecosystem as follows.

**Example: Netflix's Finance Tracking**
Netflix transitioned to an event-driven architecture using Apache Kafka to manage content finance data across 180+ million users. Key components included:

**Apache Kafka:** Handled 1.4 million events per second for real-time financial updates.

**Microservices w/ Spring Boot:** Processed events like content licensing costs and royalty payments.

**Schema Registry:** Enforced data contracts across 50+ services to maintain consistency during the pub/sub flow.

**Technical Implementation**
Here how it may look like with MCPs in-between and a sequence diagram for an MCP-enabled inventory system might include:

![](/assets/blog/mcp-an-opportunity-to-renew-the-foundations-of-ai-application-architecture/netflix-finance-tracking-diagram.png)

This may eliminate a constant polling approach, reducing server load by 70% in retail use cases.

Additionally, a direct User <> Event Bus connection is an anti-patter, I feel. If the architecture would go with that direction, it may expose internal infrastructure to clients, increasing attack surfaces, complicates the client logic by requiring clients to directly publish/subscribe to events which is totally redundant (for now - noone knows if there will be an MCP(S) - Model Contect Provider (Real-Time) Socket) and violate encapsulation by mixing user-facing APIs with internal event schemas which is a must-avoid in practice.

In event-driven architectures, the event bus should not be placed between the user and the MCP Server. Instead, it belongs within the backend architecture, connecting the MCP Server to other services. So that's why, instead of letting the users getting in touch with the event bus right after directly, but instead assuming the MCP Server as a "microservice" in distributed computing fashion. It has its own tasks to done and one of them is just to direct the request from the LLM UI through the DB over an MCP => Event Bus => Service/DB.

So in the setup I've diagrammed,

- **The MCP Server** handles client connections, publishes events to the bus,
- **The Event Bus** routes events to subscribed services (e.g., Inventory Service),
- **The (Backend) Service** processes events and return results via the bus.


### Choosing Server-Sent Events (SSE) Over WebSockets for Streaming

For real-time data streaming from servers to clients, MCP architectures favor **[Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)** over WebSockets. SSE provides a simpler, more energy-efficient, and resource-optimized solution for unidirectional streaming of updates such as live analytics, notifications, or status changes.

But SSEs are a bit differently operates over standard HTTP protocols, which makes it firewall- and proxy-friendly, easier to implement, and less demanding on server resources compared to WebSockets. It also includes built-in reconnection and event ID tracking, ensuring robust and continuous data delivery with minimal overhead. While WebSockets offer bidirectional communication suited for interactive applications, SSE's efficiency and simplicity make it ideal for MCP's streaming needs, especially when client-to-server communication is infrequent or non-critical. I am not even mentioning about how a 2-way communication can easily kill your mobile device's battery.

**SSE vs WebSockets: Optimizing Streaming for MCP**

Let's have a look at **[how Microsoft's .NET uses SSE](https://devblogs.microsoft.com/dotnet/build-a-model-context-protocol-mcp-server-in-csharp/#:~:text=MCP%20C%20SDK)** for AI response streaming:

```csharp
app.MapPost("/mcp/chat", async (ChatRequest request) =>  
    => Results.Extensions.Sse(await GetMCPStreamAsync(request)));  
```

And it seems that this approach reduces energy consumption by 40% compared to WebSockets in chatbot applications as it has been mentioned in **[the link](https://devblogs.microsoft.com/dotnet/build-a-model-context-protocol-mcp-server-in-csharp/#:~:text=MCP%20C%20SDK)**.

Another interesting example on the SSE over WebSockets topic is the hyper-mcp project which demonstrates SSE for AI plugin communication, handling 10K+ concurrent streams with 128MB memory usage that also extends the MCP's capabilities by using a plugin system of WASM Modules.

```json
{
  "plugins": [
    {
      "name": "time",
      "path": "oci://ghcr.io/tuananh/time-plugin:latest"
    },
    {
      "name": "qr-code",
      "path": "oci://ghcr.io/tuananh/qrcode-plugin:latest"
    }
    // ...
```

As you may have noticed, once you run **[`hyper-mcp`](https://github.com/tuananh/hyper-mcp)** from your terminal, the MCP server redirects the request directly to the plugin to get the result by utilising the binary format of what WASM provides. So it should be crazy fast (hopefully - there is no 0 (zero) latency at all, right? :))

As we've just jumped in into the world of WASM, let's continue wit it to discuss how it can be instrumentalise for helping getting faster context as possible...

### Unifying Development with WebAssembly

A critical foundation for renewing AI application architecture under MCP is the adoption of a single language stack powered by WebAssembly (Wasm). WebAssembly enables near-native performance by compiling code from multiple languages such as C, C++, Rust, and Go into a compact, portable binary format that runs efficiently across platforms and browsers.

This unified stack may simplify development and deployment by allowing both frontend and backend components to share high-performance modules, reducing latency and improving scalability, as well. WebAssembly's sandboxed environment also enhances security (no access to some certain features of the host until you approve - event this is not there, yet (WIT and WASI, I know - but, yeah...)), a key consideration in MCP systems that interact with multiple external tools and data sources. By standardizing on WebAssembly, organizations can streamline their AI application stacks, improve maintainability, and future-proof their architectures, as we can imagine.

Let's take a case study, then. Let's go back in time and try to write a really simple calculator in C:

```c
double calculate(double a, double b, char op) {  
    switch(op) {  
        case '+': return a + b;  
        case '-': return a - b;  
        case '*': return a * b;  
        case '/': return b != 0 ? a / b : 0;  
        default: return 0;  
    }  
}  
```

Alright, get tight. If you "deploy" (well, run) this (in)to a browser, it may provide a performance back in native-speed execution, like **~2 - 10ms**, I guess. Worth to tryout if you have time and let me know. So maybe we can build the next 0 (zero) worth SaaS with a distributed architecture diagram which would be never used / read at all :). 

Jokes aside, for more, please go check the **[mcp-wasm](https://github.com/beekmarks/mcp-wasm)** project and I am pretty sure it will triggers more interesting ideas on your mind.

Another examples but from real life are like these:

- **Real-Time Image Processing:** WASM modules can process **4K** images in **150ms** vs **600ms** for JavaScript.
- **Edge AI:** TensorFlow Lite models compiled to WASM can run on IoT devices with **300MB** RAM.

And list goes on ...

For more, just check **[this source](https://blog.pixelfreestudio.com/how-to-use-webassembly-for-ai-and-data-science-on-the-web/)**, I am pretty sure you will like it a lot. Why, the reason basically WASM has the biggest potentiality in terms of providing pace, rather than sth. different by just converting any (code) source into a binary representation of that code and make it run natively with just 1 (but huge) addition: What you built will `run everywhere`. Like how Java was promising for back in the days: **[Write once, run everywhere](https://en.wikipedia.org/wiki/Write_once,_run_anywhere)**.

### Innovating Deployment: Short-Living, On-Demand Serverless Containers

Traditional deployment models rely heavily on either fully-fledged containers or serverless functions. However, MCP's dynamic and context-driven nature calls for a hybrid approach: short-living, on-demand serverless containers that combine the best of both worlds. I guess **[Fly Machines](https://fly.io/docs/machines/overview/)** by **[Fly.io](https://fly.io/)** us such a product, also just imagine you combine it with **[Unikernels](http://unikernel.org/)**, which only includes the application code and only host libraries / packages which is needed, that's it. I cannot imagine the latency and / performance aspect of this authentic configuration for having flying serverless(es).

So these lightweight containers can spin up quickly to handle specific tasks or events triggered by MCP clients and shut down immediately after, optimizing resource usage and cost efficiency. Unlike long-running containers or purely function-based serverless models, this approach offers greater flexibility and control, supporting complex workloads while maintaining the scalability and low maintenance benefits of serverless computing. It also facilitates rapid iteration and deployment of MCP servers, critical for evolving AI applications.

And everyone is aware of this: Booting serverless code is faster than spinning up containers, I am still not sure how it would be more performant to spin up a on-deman function (as a serverless function) within a well-controlled container which will die once it does its job. So it is basically running `SIGINT` / `SIGTERM` **[in the function](https://nodejs.org/api/process.html#signal-events)** and run `docker compose down some-serverless-function-container` command, right? As you can also see an example of this in wild world: How to **[delete a machine](https://fly.io/docs/machines/api/machines-resource/#delete-a-machine-permanently)** permanently with Machines API.

### Conclusion: Renewing Foundations for the AI Era

MCP is more than just a protocol—it is an opportunity to fundamentally renew the foundations of AI application architecture. By shifting from REST to event-driven communication, adopting SSE for efficient streaming, unifying development with WebAssembly, and deploying short-lived serverless containers, organizations can build AI systems that are more responsive, scalable, secure, and cost-effective.

This new paradigm supports the creation of intelligent, context-aware AI agents capable of seamless integration with existing business processes and external data sources as MCP gains traction, it promises to catalyze a virtuous cycle of innovation, much like the HTTP protocol did for the web, laying a robust foundation for the next generation of AI-powered applications. But again, there is still time beyond literally for inventing the true value of MCPs. We will not build a rollercoaster with it, instead will provide context in string format. So it should take too much, I guess. So around 6 months - 1 year, I am so sure that people will start talking about re-inventing the API-way of building things with a GraphQL-like DSL.

But in general, here were my architectural renewal positions enterprises to harness AI's full potential, enabling smarter, faster, and more efficient solutions that align with the demands of an increasingly dynamic digital landscape. If you have any other ideas, etc., I would only be more than happy.

Thanks for reading & hope it will contribute to the recent MCP-boom hype 🙌