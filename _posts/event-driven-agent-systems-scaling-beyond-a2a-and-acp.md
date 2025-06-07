---
title: "Event-Driven Agent Systems: Scaling Beyond A2A and ACP"
excerpt: "Why Agents Should Stop Talking to Each Other (Directly)"
coverImage: '/assets/blog/event-driven-agent-systems-scaling-beyond-a2a-and-acp/cover.png'
date: '2025-06-07'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/event-driven-agent-systems-scaling-beyond-a2a-and-acp/cover.png'
  credits: 'https://unsplash.com/@shannonnicolevandy'
---

# Event-Driven Agent Systems: Scaling Beyond A2A and ACP

## 🧠 TL;DR

Most autonomous agents today communicate like humans on the phone — direct, interruptive, and hard to trace. But in scalable AI systems, agents need walkie-talkies, not phones.

Enter **EVA: Event-driven Agentic Architecture** — a design that replaces direct calls with asynchronous, observable event streams.

But there's more. To ensure these agents can **agree on facts or actions** in this indirect, decoupled world, we need **distributed consensus protocols** — applied intelligently.

---

## 🚫 The Problem With Direct Agent Communication

Many modern agent protocols are built around the assumption that agents should *message each other directly* — like services calling each other’s APIs, or humans texting back and forth.

Protocols like **A2A (Agent-to-Agent)** and **ACP (Agent Communication Protocol)** provide structured ways for agents to say:  
_"Hey, you — here’s a goal, go do it."_

While structured, these patterns fall short for **scalable, autonomous systems**.

### ❌ 1. Tight Coupling (A2A & ACP)

Direct messaging protocols require agents to *know about each other* — their endpoints, their capabilities, their existence. This kills modularity:

- Every new agent means updating old ones.
- You get a spaghetti graph of inter-agent calls.
- Everything breaks if a single peer goes missing.

In contrast, **EVA’s event model** lets agents broadcast events.  
Whoever's listening takes care of it. No hard dependencies.

---

### ❌ 2. Brittle Orchestration (ACP, CNP)

ACP and CNP enable agents to negotiate tasks or initiate request-response chains. But:

- They assume agents are online, cooperative, and in sync.
- Implicit dependencies creep in.
- They crumble in volatile, asynchronous environments.

EVA says: “Just emit an event. Whoever’s available will pick it up.”  
You don’t need to ask who’s free. You don’t even need to know *who*.

---

### ❌ 3. Invisibility and Debugging Hell

When agents communicate directly, you lose traceability:

- What caused agent X to act?
- Why did Y trigger a cascade?
- Who broke everything?

EVA provides a built-in event log.  
You can trace system behavior like a timeline:  
`task.created` → `plan.generated` → `plan.executed`

---

### ❌ 4. No System Memory

In A2A/ACP, once a message is sent, it’s gone.  
No history. No replay. No simulations.

Event buses (like NATS, Kafka) *are memory*.  
Want to test a new agent on last week’s data? Just replay the stream.

---

### ❌ 5. Scaling Issues

As agents grow:

- Direct messaging scales as `O(n²)`
- Who coordinates? Who retries? Who owns what?

Event-driven systems scale as `O(n)`.  
Agents subscribe to what they care about. That’s it.

---

### 🔄 Recap: Why Direct Agent Protocols Break at Scale

![EVA Scaling Recap Table](/assets/blog/event-driven-agent-systems-scaling-beyond-a2a-and-acp/eva_scaling_recaptable_boldheaders.png)

---

## ✅ EVA: Talk in Events, Not Calls

**EVA** proposes a different paradigm:

> 🧠 “Agents don’t talk to each other. They talk to the system. The system is an event bus.”

Each agent:

- **Listens** to topics it cares about.
- **Emits** structured events after acting.
- **Stays independent** from other agents’ logic.

This improves **resilience, observability, and plugability**.  
It turns your agent system into a living, breathing mesh — not a pile of brittle wires.

---

## 🧩 But What About Agreement? Enter Consensus.

Sometimes agents *do* need to agree:

- Was the anomaly real?
- Did enough classifiers see the same object?
- Is the shared memory in sync?

Instead of direct voting or RPCs, EVA leverages **consensus protocols**.

---

## 🧠 Consensus Protocols That Work With EVA

### 1. Event-Triggered Consensus

Only send updates *when things change*.  
No chatter. Just signal on state change.

> ✅ Lightweight  
> ✅ Reactive  
> ✅ Great for swarm behavior and sensor fusion

---

### 2. PBFT (Practical Byzantine Fault Tolerance)

When agreement matters — and some agents might misbehave — use PBFT.

> ✅ Fault-tolerant  
> ✅ Proven in distributed systems  
> ✅ Useful for LLM ensemble voting, system safety checks

---

### 3. Raft (Leader Election)

Sometimes, you need a planner or conductor. Raft lets you elect one safely.

> ✅ Great for coordinating workflows  
> ✅ Leader can emit `task.assigned` events to the swarm

---

## ❌ What Not to Use

### ✋ PoW/PoS

You’re not mining blocks. Your agents are not crypto bros. Avoid.

### ✋ Contract Net Protocol

Structured, yes. But relies on direct negotiation. Which, as we've covered, is *bad*.

---

## 🛠 Building EVA + Consensus

![EVA Comparison Table](/assets/blog/event-driven-agent-systems-scaling-beyond-a2a-and-acp/eva_comparison_table_checkmarks.png)

---

## 📣 Final Pitch

💬 Stop wiring agents like neurons.  
🎛 Start treating them like signals in a cybernetic mesh.  
📡 Give them a protocol that respects autonomy, observability, and trust.  

**That’s EVA — event-driven, consensus-aware, and built for real multi-agent scale.**

---

## 🪄 Want to See It in Action?

- 🔗 GitHub (Coming soon): [github.com/hwclass/eva-protocol](#)
- 🌐 Live demo: agents summarizing real-time news via NATS + SQLite + Astro/Solid
- 📜 Coming soon: `eventagents.dev` – the open protocol spec

---

## 📚 References

- **A2A: Agent-to-Agent Communication Protocol**
  - [GitHub Repository](https://github.com/google-a2a/A2A)
- **ACP: Agent Communication Protocol**
  - [Introduction](https://agentcommunicationprotocol.dev/introduction/welcome)
- **MCP: Model Context Protocol**
  - [Introduction](https://modelcontextprotocol.io/introduction)
- **Event-triggered consensus in multi-agent systems**
  - Meng, X., Li, T., & Ren, W. (2018)
  - [arXiv](https://arxiv.org/abs/1712.00429)
- **Practical Byzantine Fault Tolerance (PBFT)**
  - Castro, M., & Liskov, B. (1999)
  - [OSDI Paper](http://pmg.csail.mit.edu/papers/osdi99.pdf)
- **In Search of an Understandable Consensus Algorithm (Raft)**
  - Ongaro, D., & Ousterhout, J. (2014)
  - [Raft Paper](https://raft.github.io/raft.pdf)
- **The Contract Net Protocol**
  - Smith, R. G. (1980)
  - [DTIC Citation](https://apps.dtic.mil/sti/citations/ADA084087)
- **NATS: A high-performance messaging system**
  - [NATS Website](https://nats.io)
- **Kafka vs NATS: Choosing an Event Bus**
  - [Benthos Guide](https://www.benthos.dev/docs/guides/nats_vs_kafka)
- **awesome-consensus (Hellas AI)**
  - [GitHub Repository](https://github.com/hellas-ai/awesome-consensus)

---

*Thanks for reading. May your agents signal, not shout.*
