---
title: 'AWS-rendered React chocolate chips with Dawson— Part 1: A simple service for serving components'
excerpt: 'For a while, I’ve been searching for the alternative methods for having components or page fragments independently from each other.'
coverImage: '/assets/blog/aws-rendered-react-chocolate-chips-with-dawson-part-1/cover.webp'
date: '2017-07-19T17:08:46.924Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/aws-rendered-react-chocolate-chips-with-dawson-part-1/cover.webp'
---

For a while, I’ve been searching for the alternative methods for having components or page fragments independently from each other components. While I was searching, find some solutions for that like using endpoints as absolute components-as-services like front-end architectures like microservices.

I just wondered if it is possible to do it with AWS. Found [Dawson](https://www.dawson.sh). Nearly like the other “serverless” framework called [Serverless](https://serverless.com/) but with an alternative especially for static contents. It communicates automatically to your AWS account and creates a new set of S3 buckets to serve your files. You can use the Dawson’s API middleware stuff to request your component sources.

Dawson is an AWS-oriented framework using Javascript language to communicate with and enable using AWS resources. It works like a middleware to configure your resources, writing server-side APIs running on AWS Lambda, using content from S3 and etc. Here is nearly a completed documentation you can have a look at.

At this very beginning of this series of articles, we will explore the possibilities of serving client-side content as components; sometimes as single components itself, sometimes composed higher-ordered components as well.

So, let’s begin. First, install dawson-cli tool.

```sh
npm init -Y
npm install -g @dawson/dawson-cli
```

After that step, in your package.json file, add the presets for babel:

```json
"babel": {  
    "presets": [
      "env",  
      "dawson",  
      "react"  
    ]  
}
```

Then create a directory with whatever name you like. Let say, “api” directory and within it, create a \*.js file called “api”. This is like a mandatory for Dawson to deploy all the stuff onto a S3 bucket you have created.

Enter your directory and before you begin development, just declare your AWS credentials like the following:

```sh
export AWS_REGION=... AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=...
```

After all, create a directory for your components and put some of them into there. Here is the Header component:

```jsx
// ./components/Header/index.js

import React from 'react'

export const Header = () => <div>This is header component</div>
```

The glorious Footer component:


```jsx
import React from 'react'

export const Footer = () => <div>This is footer component</div>
```

After creating all your needed components in that directory, add the following code into your fresh file, api.js:

```jsx
import React, { Component } from 'react'  
import ReactDOMServer from 'react-dom/server'

import {  
  Header,  
  Content,  
  Footer  
} from './components/'

const source = {  
 'header': Header,  
 'content': Content,  
 'product': Footer  
}
```

Until this part of our code, everything is familiar for you, I suppose. We are mapping the components with components themselves because I do need a name matching exactly the same with the component names like this: “/components/component-name”, not like this: “/components/ComponentName”.

Then, here is our basic api to fetch the source:

```jsx
export function components (event) {  
  const name = event.params.path.name  
  return ReactDOMServer.renderToString(React.createElement(source[name]));  
}
```

Here we are declaring the endpoint as “/components” and parsing the name parameter passed as the name that we have matched in our “source” object. After that, we are setting the endpoint manually:

```jsx
components.api = {  
  path: 'components/{name}'  
}
```

We have completed the part we need first. To run the application in your local, firstly you need to upload the files onto with the following command:

dawson deploy

It will take around one or two minutes to send every files compiled and zipped. Then you can run your local environment and test your component service as well:

```sh
dawson dev --port 8080
```

Then you can hit the following path in the browser address bar:

```sh
localhost:8080/components/header
```

![](https://cdn-images-1.medium.com/max/800/1*3jacrsaaNT2yaSNb7MqsUQ.png)

```sh
localhost:8080/components/content
```

![](https://cdn-images-1.medium.com/max/800/1*hHoyZm-RSZHmTeFKWCM3nw.png)

```sh
localhost:8080/components/footer
```

![](https://cdn-images-1.medium.com/max/800/1*drgOv8kn_VDf7lc3LmNyeg.png)

For every component served, you will catch up the details within your Network tab:

```sh
<div data-reactroot="" data-reactid="1" data-react-checksum="1556027498">This is header component</div>

<div data-reactroot="" data-reactid="1" data-react-checksum="2037389564">This is content component</div>

<div data-reactroot="" data-reactid="1" data-react-checksum="1605179536">This is footer component</div>
```

But what about merging them all together to serve as fragments or sections? Let’s create another service called “fragments” like the same above but with one extra detail: composing the components into one component called “ProductList” from our new “fragments” directory:

```jsx
import { ProductList } from './fragments/'

const source = {  
//...  
 'product-list': ProductList,  
//...  
}

export function fragments (event) {  
  const name = event.params.path.name  
  return ReactDOMServer.renderToString(React.createElement(source[name]));  
}
```

And now, we have our new and shiny component served as a fragment. Go to the browser and hit the following address:

```sh
localhost:8080/fragments/product-list
```

Here we go, we have got the new component with some data. You can populate your data whichever you expect. From a middleware serving data bindings with your remote database system, or from a noSQL DBMS like DynamoDB or whatever.

Now, I am updating the content of ProductList component with some static data added by hand:

```jsx
function ProductList() {  
  const productList = [{  
    id: 1, name: "Some nice t-shirt"  
  }, {  
    id: 2, name: "Another cool scarf"  
  }, , {  
    id: 3, name: "Holy, great trousers!"  
  }]  
  return (  
    <div id="product-list">  
      <h3>Product List</h3>  
      <ul>  
        {productList.map((product) => <li>{product.id} - {product.name}</li>)}  
      </ul>  
    </div>  
  );  
}
```

When you open your Network Tab, you will see the response as this one:

```html
<div id="product-list" data-reactroot="" data-reactid="1" data-react-checksum="735036901"><h3 data-reactid="2">Product List</h3><ul data-reactid="3"><li data-reactid="4"><!-- react-text: 5 -->1<!-- /react-text --><!-- react-text: 6 --> - <!-- /react-text --><!-- react-text: 7 -->Some nice t-shirt<!-- /react-text --></li><li data-reactid="8"><!-- react-text: 9 -->2<!-- /react-text --><!-- react-text: 10 --> - <!-- /react-text --><!-- react-text: 11 -->Another cool scarf<!-- /react-text --></li><li data-reactid="12"><!-- react-text: 13 -->3<!-- /react-text --><!-- react-text: 14 --> - <!-- /react-text --><!-- react-text: 15 -->Holy, great trousers!<!-- /react-text --></li></ul></div>
```

But what about combining all those product lists with a (dumb) Product component? Create a new directory called “Product” within “components” directory and add a file with name “index.js”. Here is the source:

```jsx
import React from 'react'

export const Product = ({ id, name }) => {  
  return (  
    <div class="product">  
      <li>{id} - {name}</li>  
    </div>  
  );  
}
```

Then, import it into your ProductList component:

```jsx
import { Product } from '../../components/'

function ProductList() {  
  const productList = [{  
    id: 1, name: "Some nice t-shirt"  
  }, {  
    id: 2, name: "Another cool scarf"  
  }, , {  
    id: 3, name: "Holy, great trousers!"  
  }]  
  return (  
    <div id="product-list">  
      <h3>Product List</h3>  
      <ul>  
        {productList.map((product) => <Product id={product.id} name={product.name}/>)}  
      </ul>  
    </div>  
  );  
}
```

But not enough, I am just assuming that we need a page rendered from the server-side. So we need another endpoint called “pages” to serve all the content together with a header, footer and content containing our product list higher-order component:

```jsx
export function pages (event) {  
  const name = event.params.path.name  
  return ReactDOMServer.renderToString(React.createElement(source\[name\]));  
}

pages.api = {  
  path: 'pages/{name}'  
}
```

Then, let’s create a directory for our pages and put a folder containing another directory called “Main” and inside of it, a file called “index.js”:

```jsx
import React, { Component } from 'react'

import { Header, Footer } from '../../components/'  
import { ProductList } from '../../fragments/'

function Main() {  
  return (  
    <div id="main">  
      <h3>Welcome to the app</h3>  
      <Header/>

    </div>  
  );  
}

export default Main
```

We are updating the content component:

```jsx
export const Content = ({ children }) => <div><h2>Content</h2> <div>{children}</div></div>
```

And our new Main page becomes like this:

```jsx
function Main() {  
  return (  
    <div id="main">  
      <h3>Welcome to the app</h3>  
      <Header/>  
      <Content>  
        <ProductList/>  
      </Content>  
      <Footer/>  
    </div>  
  );  
}
```

Then, now we need to upload every piece of the files we have created onto AWS:

dawson deploy

It is going to generate a URL endpoint for you. That’s why, you are now able to reach your remotely-living React components as server-side rendered:

[https://d2vlfr5ggyrcpf.cloudfront.net](https://d2vlfr5ggyrcpf.cloudfront.net)/pages/main

![Living components on AWS!](https://cdn-images-1.medium.com/max/800/1*8SucVx3h17r29rDLgvlokQ.png)

Living components on AWS!

Thank you for reading so many steps in this article and keep waiting for the next step. We will be creating a simple microservice just in front of our dawson service to wrap the API easily and customize the needs for an application. Then, this is your part, exactly; we will be implementing Redux and some shiny styles into that lovely tutorial ;)

Have a nice day, mates!

**Note: If you like this post, please** ❤  **_share it on Twitter, or do something! :)_**