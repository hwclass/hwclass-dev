---
title: "4 Ways of Compiling Rust into WASM including Post-Compilation Tools"
excerpt: "A Brief & Humble Intro for Rust compiled into WASM Modules"
coverImage: '/assets/blog/4-ways-of-compiling-rust-into-wasm-including-post-compilation-tools/cover.png'
date: '2024-10-29'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/4-ways-of-compiling-rust-into-wasm-including-post-compilation-tools/cover.png'
---

## Why a Blog Post about Rust & WASM and a Short Intro

Rust code can be compiled into WebAssembly through several approaches, each serving different use cases and offering varying levels of integration with web technologies. This article explores the three main compilation methods and essential post-compilation optimization tools based on my experiences in the last 4-5 months building a WASM-oriented tooling with Rust helping companies to avoid having bot visits into their applications with a runtime-first approach. During the journey of such an exciting effort, I've learnt several details and wanna share them with you in detail and hope it will also help you to jump into this (sometimes annoying) and ever-growing ecosystem of making software interoperable across platforms, languages and machines in a free fashion.

So we have 4 ways of compiling a Rust code into WASM: Direct, wasm-pack, wasm-bindgen and (not recommended and legacy way of) Emscripten. I've also included an additional section for code optimization as you will not need them if you're using wasm-pack which has all of those within itself. So let's start...

## 1. Direct Compilation

The most straightforward approach uses Rust's built-in WebAssembly target.

```sh
cargo build --target wasm32-unknown-unknown
```

**Technical Implementation:**
- Uses LLVM's WebAssembly backend directly. As a sidenote, what LLVM does is to translate Rust's intermediate representation (IR) into WebAssembly bytecode using its native wasm32 target.
- Generates pure WebAssembly without JavaScript glue code which means the output is raw WebAssembly binary format that follows the official WebAssembly specification.
- Implements linear memory management utilizing ArrayBuffer and uses a single contiguous block of memory that's directly accessible by both WebAssembly and JavaScript.
- Memory is managed through Rust's allocator, typically wee_alloc for size optimization.
- Supports only basic numeric types and pointers, so the support is basically limited to i32, i64, f32, f64, and memory addresses.
- Produces raw .wasm binary format includes `Type`, `Import`, `Function`, `Table`, `Memory`, `Global`, `Export`, `Code`, and `Data`.

**Limitations:**
- No direct DOM access
- Limited to primitive type exchanges
- Manual memory management required
- No automatic JavaScript bindings

**Best For:**
- Pure computational libraries (math, encryption, compression)
- Performance-critical algorithms with minimal JS interaction
- Standalone WebAssembly modules that will be used by other languages
- Systems where you need complete control over memory management

**Real-World Examples:**
- Cryptographic libraries like ring-wasm
- Image processing filters
- Physics engines
- Audio/video codecs

## 2. wasm-pack Workflow

wasm-pack provides an integrated toolchain for building and publishing Rust-generated WebAssembly. I must tell that it is the most efficient method that I've been using recently and the biggest advantage it provides that it is /pkg directory including a fully-fledged interop in between JS and the export WASM file which makes your life easier.

```sh
wasm-pack build --target web
```

**Technical Implementation:**
- Invokes rustc with appropriate target configuration which automatically sets up the correct target triple and compilation flags.
- Generates JavaScript bindings via wasm-bindgen by creating idiomatic JavaScript APIs that wrap the WebAssembly functions.
- Implements TypeScript definitions which means that it generates .d.ts files for type safety in TypeScript projects.
- Handles npm package generation to make your life easier by creation a complete npm package structure with package.json and necessary metadata.
- Manages WebAssembly instantiation lifecycle. This handles module initialization, memory allocation, and cleanup via an additional Javascript file you will need to import on web.
- Implements a virtual function table (vtable) for dynamic dispatch.
- Provides automatic memory management through reference counting between JavaScript and Rust.

**Features:**
- Automated dependency management
- Built-in optimization pipeline
- Development server integration
- Provides testing and debugging infrastructure
- npm registry publishing support
- Implements ES Module and CommonJS module formats
- Handles asynchronous loading and initialization
- Provides development and production build profiles
- Integrates with existing JavaScript bundlers (webpack, rollup, etc.)

**Best For:**
- Web applications requiring tight JavaScript integration
- npm-published WebAssembly modules
- Projects needing TypeScript support
- Full-stack Rust web applications

**Real-World Examples:**
- Interactive web games
- Data visualization libraries
- WebGL/Canvas applications
- React/Vue/Angular/Svelte (whatever) components with Rust backends

## 3. wasm-bindgen Approach

wasm-bindgen provides low-level control over JavaScript interop.

```sh
wasm-bindgen target/wasm32-unknown-unknown/release/example.wasm --out-dir pkg
```

**Technical Implementation:**
- Generates custom sections in WebAssembly binary by adding metadata for JavaScript interop in a custom section named "wasm-bindgen".
- Creates JavaScript/TypeScript binding layer which includes the following steps:
    - Generates proxy functions for each exported Rust function
    - Handles type conversion between Rust and JavaScript types
    - Manages memory allocation and deallocation
- Implements bi-directional type conversion, so it does this by
    - Converting complex Rust types (String, Vec, custom structs) to JavaScript objects
    - Handling ownership and borrowing rules across the boundary
    - Implementing reference counting for shared objects
- Manages object lifetime across language boundary which means:
    - Tracks JavaScript object references in Rust
    - Implements proper cleanup through drop handlers
    - Prevents memory leaks through reference counting
- Handles complex data structure serialization by implementing first, the custom serialization for Rust types, then managing heap allocation for dynamic data and providing zero-copy options for performance.

**Capabilities:**
- Custom type marshalling
- JavaScript class integration
- Async function support
- DOM API access
- Exception handling bridge
- Support for closures and callbacks between languages
- Implements future/promise bridging
- Provides direct access to Web APIs through web-sys
- Handles JavaScript object properties and methods
- Supports inheritance and polymorphism across languages

**Best For:**
- Custom browser APIs integration
- Complex data structure sharing between Rust and JavaScript
- Projects requiring fine-grained control over JS bindings
- Applications with complex async operations

**Real-World Examples:**
- DOM manipulation libraries
- WebGL rendering engines
- Browser extension core functionality
- Web Workers implementation

## 4. Emscripten Toolchain

While somewhat legacy, Emscripten provides unique capabilities for certain use cases.

Setup requirements, if anyone interested here:

```sh
rustup target add wasm32-unknown-emscripten
emsdk install latest
emsdk activate latest
```

And how to compile a Rust file into WASM via Emscripten:

```sh
rustc --target wasm32-unknown-emscripten source.rs
```

**Technical Details:**
- Translates LLVM IR to WebAssembly:
    - Processes LLVM bitcode from Rust compilation
    - Applies Emscripten-specific optimizations
    - Generates both .wasm and JavaScript support code

- Implements POSIX-like runtime:
    - Provides virtual filesystem implementation
    - Emulates system calls in JavaScript
    - Implements pthread emulation for threading

- Provides OpenGL to WebGL translation:
    - Automatically converts OpenGL calls to WebGL
    - Handles shader translation
    - Manages WebGL context and state

- Generates JavaScript runtime environment:
    - Creates necessary JavaScript bindings
    - Implements memory management helpers
    - Provides system function emulation

- Handles C/C++ interoperability:
    - Supports linking with C/C++ libraries
    - Provides C standard library implementation
    - Manages ABI compatibility

**Best For:**
- Porting existing C/C++ codebases that also use Rust
- Applications requiring POSIX-like environment
- OpenGL applications that need WebGL translation
- Legacy code migration projects

**Real-World Examples:**
- Ported desktop applications
- Games using OpenGL
- Scientific computing applications
- Multimedia processing tools

Additionally, while each approach has its specialized use cases, developers often face the challenge of choosing the right compilation method for their specific project. Understanding these use cases is just the first step - the real value comes in knowing how to make the practical decision for your particular situation. Let's break down a systematic approach to choosing the right compilation method based on your project's requirements. So I would like you to check the following practical use case selection (easy) mind-map :)

## Practical Decision Making for Choosing the Right Tooling

If your project:
Is pure **Rust**
Needs **npm** integration
Requires **TypeScript**
→ Choose **wasm-pack**

If your project:
Requires **C/C++ interop**
Uses **OpenGL**
Needs **filesystem** simulation
→ Choose **Emscripten**

If your project:
Is **computation-focused**
Needs **minimal JS** interaction
Requires manual **memory management**
→ Choose **Direct Compilation**

If your project:
Needs custom **DOM interaction**
Has **complex JS** interop requirements
Requires **fine-grained control**
→ Choose **wasm-bindgen**

While each compilation method above produces functional WebAssembly (yes, literally!), the resulting binaries can often be further optimized. Post-compilation tools provide additional optimization passes, size reduction techniques, and compatibility options. These tools are essential for production-ready WebAssembly modules, especially when targeting web browsers with varying capabilities and performance requirements.

## Post-Compilation Tools
The compilation process from Rust to WebAssembly can be further enhanced through post-compilation optimization tools. These tools take the compiled WebAssembly binary and apply various transformations to improve both size and runtime performance.

### wasm-opt Optimizer

wasm-opt is a powerful optimization tool from the Binaryen project that processes WebAssembly binaries through multiple transformation passes. It operates by converting WebAssembly into Binaryen's intermediate representation (IR), applying sophisticated optimization techniques, and then generating an optimized WebAssembly binary. Also used in several tools mentioned above as a component like wasm-pack, emscripten and AssemblyScript.

The optimization process includes:
- Dead code elimination
- Instruction combining
- Constant folding
- Loop optimization
- Function inlining

**How to install:**

### Via npm (Node.js)

```sh
npm install -g wasm-opt
```

### or as a project dependency:
```sh
npm install wasm-opt --save-dev
```

### Via Cargo (Rust)
```sh
cargo install wasm-opt --locked
```

Basic Usage:

```sh
wasm-opt input.wasm -o output.wasm -O3
```

The -O flag accepts different optimization levels (1-4), with higher levels applying more aggressive optimizations. For example, -O3 provides a balanced approach between optimization time and runtime performance, while -O4 focuses on maximum optimization regardless of compilation time.

### Technical Implementation
wasm-opt operates on a lower level than LLVM's optimizations (which are applied during rustc compilation). It specifically targets WebAssembly's binary format, applying transformations that consider WebAssembly's unique characteristics and execution model. The tool performs multiple passes over the binary, with each pass focusing on different aspects of optimization, from basic block analysis to advanced control flow optimizations.
When integrated into a build pipeline, wasm-opt typically achieves a 15-20% reduction in binary size while improving runtime performance through better instruction selection and memory access patterns. These optimizations are particularly effective for computational-heavy WebAssembly modules, where instruction reordering and register allocation can significantly impact performance.

Links
https://github.com/WebAssembly/binaryen
https://rustwasm.github.io/book/reference/tools.html#wasm-opt--a-hrefhttpsgithubcomwebassemblybinaryenrepositorya

### wasm2js Converter

wasm2js is a tool that converts WebAssembly modules into equivalent JavaScript code, providing fallback support for browsers that don't support WebAssembly natively. It's particularly useful for maintaining compatibility with legacy browsers like Internet Explorer.

How to install:

wasm2js is part of the Binaryen toolkit so you can install it through:

### Via Package Managers:
```sh
# On Ubuntu/Debian
apt-get install binaryen

# On macOS
brew install binaryen

# On Windows (using Chocolatey)
choco install binaryen
```

Basic Usage:

```sh
wasm2js input.wasm -o output.js
```

### Technical Implementation

wasm2js performs a sophisticated translation process that:
- Converts WebAssembly's stack machine into JavaScript expressions
- Implements WebAssembly's linear memory using JavaScript TypedArrays
- Emulates WebAssembly's precise integer arithmetic in JavaScript
- Generates optimized JavaScript that can be further processed by JavaScript minifiers

### wasm-gc (Garbage Collector)

wasm-gc is a size optimization tool that performs dead code elimination at the WebAssembly module level. It analyzes the entire module's call graph to identify and remove unused functions and their dependencies.

How to install:

wasm-gc is a Rust tool that can be installed via Cargo. However, it's worth noting that wasm-gc is considered somewhat deprecated as its functionality is now largely covered by wasm-opt and the Rust compiler's built-in dead code elimination.:

```sh
cargo install wasm-gc
```

Basic Usage:

```sh
wasm-gc input.wasm output.wasm
```

### Technical Implementation

The tool performs several optimization passes:

- Builds a complete call graph of the module
- Identifies entry points and reachable functions
- Removes unreachable functions and their types
- Cleans up unused function table entries
- Reindexes remaining functions and types for optimal space usage

### wasm-snip Function Remover

wasm-snip is a specialized tool that replaces specified WebAssembly function bodies with unreachable instructions4. It's particularly useful when you know certain functions won't be called at runtime but can't be proven statically.

Basic Usage:

```sh
wasm-snip input.wasm -o output.wasm function_name
```

### Technical Implementation

The tool operates by:

- Parsing the WebAssembly module's "name" section to identify functions
- Replacing targeted function bodies with a single unreachable instruction
- Preserving function signatures and module structure
- Supporting pattern matching for bulk function removal
- Working particularly well with Rust's panic and formatting infrastructure
- When used in combination with wasm-opt, wasm-snip can trigger additional optimizations as the unreachable functions are removed during dead code elimination, leading to further size reductions in the final binary

Most of these tools are also included automatically when you install wasm-pack, which is the recommended toolchain for Rust WebAssembly projects. If you're using wasm-pack, you don't need to install these tools separately as they'll be available through the wasm-pack workflow. As binaryen which includes all of those mentioned post-compilation tooling goodies and wasm-pack uses bineryen, you will need specific reasons to use them separately. For example, if you're using a different toolchain, you will most probably need binaryen to be installed or you can specifically pick some of those post-compilation tools for making your Rust code dances as WASM binary.

Thanks for reading & hope it works for you, too 🙌