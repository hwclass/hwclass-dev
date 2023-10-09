---
title: "Pattern Matching in Javascript: What if “if” / “switch” not Exist Anymore?"
excerpt: "Before weeks ago, I’ve firstly announced the mentorship programme I’ve decided to take individuals into a structured career path into, to help them navigate in a huge tech ocean to let them choose what’s best for their very own career."
coverImage: '/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/cover.png'
date: '2023-10-09T17:08:46.924Z'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/cover.png'
---

### Introduction

JavaScript is constantly evolving to meet the demands of postmodern web development. One of the latest innovations that's been making waves in the JavaScript community is the introduction of a new feature called "Pattern Matching." In this blog post, we'll delve into what pattern matching is and how it can revolutionize your code by comparing it to the traditional "if/else" and "switch" statements using feature flags as an example.

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-1.png)

Originally the proposal is recently on the 1st Stage where you can find more details for **[here](https://tc39.es/proposal-pattern-matching/)** and **[here](https://github.com/tc39/proposal-pattern-matching)**.

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/proposal.png)

### The Problem with Traditional Control Structures

Before we dive into pattern matching, let's briefly discuss the limitations of traditional control structures like "if/else" and "switch." in Javascript. While they have served us well for years, they come with their fair share of challenges.

**Lack of Expressiveness:** Traditional control structures often lack expressiveness when it comes to matching complex patterns or conditions. This can lead to verbose and error-prone code.

**Accidental Fallthrough:** In a "switch" statement, if you forget to include a "break" statement, execution can "fall through" to the next case unintentionally, causing unexpected behavior.

**Ambiguous Scoping:** Scoping can be ambiguous in "switch" statements, potentially leading to unintended variable collisions.

### Pattern Matching in Other Languages

**Python**

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-10.png)

**Scala**

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-11.png)

**Elixir**

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-12.png)

**Rust**

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-13.png)

### Pattern Matching: A New Paradigm

Now, let's explore how pattern matching addresses these issues and why it's a game-changer for JavaScript developers.

__1. Pattern Matching Construct:__ Pattern matching is a full conditional logic construct that can do more than just pattern matching. It's a versatile tool that allows you to match values based on complex patterns and conditions, making your code more expressive and readable.

__2. Subsumption of Switch:__ Pattern matching is designed to be easily distinguishable from the traditional "switch" statement, eliminating any syntactic overlap. This ensures that you can transition to pattern matching seamlessly without confusion.

__3. Eliminating Footguns:__ Pattern matching eliminates common pitfalls like accidental fallthrough and ambiguous scoping, making your code more robust and less error-prone.

__4. Expression Semantics:__ Unlike "switch," pattern matching can be used as an expression, allowing you to assign its result to variables or use it directly as a return value. This enhances code clarity and conciseness.

__5. Exhaustiveness and Ordering:__ Pattern matching encourages explicit handling of all possible cases, reducing the chances of runtime errors. Cases are checked in the order they're written, ensuring predictable behavior.

__6. User Extensibility:__ With pattern matching, you can define custom matching semantics for userland objects, giving you more control and flexibility in your code.

### Comparing Pattern Matching to Traditional Control Structures

As a summary and compared to the traditional "if/else" and "switch" versions, the pattern matching code is more concise, expressive, and less error-prone. It allows you to handle complex patterns and conditions with ease, resulting in cleaner and more maintainable code.

Now, let's take a look at how pattern matching can simplify code using a practical example involving feature flags.

### Scenario: Handling Feature Flags

Suppose you have a feature flag system that determines whether a certain feature is enabled or disabled. You want to perform different actions based on the state of this feature flag.

__Pattern Matching Approach:__

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-2.png)

In this pattern matching approach, you can clearly see how the code handles different states of the feature flag. It's concise, expressive, and handles all cases explicitly.

### Traditional "if/else" Approach:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-3.png)

With the "if/else" approach, the code is more verbose and requires multiple conditions. It's easier to miss a state or introduce errors due to typos.

### Traditional "switch" Approach:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-4.png)

The "switch" statement offers a cleaner structure than "if/else," but it still requires "break" statements to prevent fallthrough. Without "break," it could execute unintended cases.

So what happens if we would like to adopt a **[Strategy Pattern](https://refactoring.guru/design-patterns/strategy)** over a feature flag implementation but with Pattern Matching in Javasript? It looks fun like below as you can imagine. Please also consider that we're not using any of an external source of where we may keep the flags but inlined code mostly. Let's define the defaults first:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-5.png)

Then let's define the strategies in detail for each environment we will possibly switch in between:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-6.png)

But how a developer shall decide on which strategy to choose in between the strategies above? Let's create a strategy selector based on strategies but for this step, let's consider the power of pattern matching providing an easy-to-implement & readable nature:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-7.png)

After we're able to choose in between strategies, it's time to inject them directly within a simple DOM to see how it works:

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-8.png)

### Comparison:

__* Pattern Matching:__ Pattern matching provides a clean and expressive way to handle feature flags. It encourages exhaustive handling of all states and eliminates fallthrough issues.

__* Traditional "if/else":__ While functional, it's more verbose and prone to errors if you forget to handle a state or make a typo in a condition.

__* Traditional "switch":__ Cleaner than "if/else" but still susceptible to fallthrough errors if you forget "break" statements. Less expressive compared to pattern matching.

### Similar Functionalities Inspired by / from Different Libraries

There are sevaral premises inspired this approach for making this proposal a reality and here is a short list provided within the proposal's Github repo:

**[Optionals](https://github.com/OliverBrotchie/optionals) —** Rust-like error handling, options and exhaustive pattern matching for TypeScript and Deno.

**[ts-pattern](https://github.com/gvergnaud/ts-pattern) —** Exhaustive Pattern Matching library for TypeScript, with smart type inference.

**[babel-plugin-proposal-pattern-matching](https://github.com/iptop/babel-plugin-proposal-pattern-matching) —** Minimal grammar, high performance JavaScript pattern matching implementation.

**[match-iz](https://github.com/shuckster/match-iz) —** A tiny functional pattern-matching library inspired by the TC39 proposal.

**[patcom](https://github.com/concept-not-found/patcom) —** Feature parity with TC39 proposal without any new syntax

![](/assets/blog/pattern-matching-in-javascript-what-if-if-switch-not-exist-anymore/code-9.png)

In summary, pattern matching shines when dealing with feature flags or any situation requiring handling of multiple states or patterns. It offers a concise and robust solution that makes your code more readable and less error-prone compared to traditional control structures.

### Conclusion

Pattern matching is an exciting addition to JavaScript that brings a new level of expressiveness and clarity to your code. By eliminating common pitfalls and providing a versatile way to handle complex patterns, pattern matching empowers developers to write more robust and readable code.

As JavaScript continues to evolve, embracing features like pattern matching can significantly improve your coding experience and help you stay at the forefront of modern web development. So, give it a try and see how it can simplify your code and enhance your productivity.