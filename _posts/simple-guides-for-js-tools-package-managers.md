---
title: 'Simple Guides for JS Tools: Package Managers'
excerpt: 'One day, you will begin developing on not a greenfield or from-the-scratch
  project and this time will be the moment you are going to start…'
coverImage: '/assets/blog/authors/hwclass.png'
date: '2017-06-09T14:26:08.050Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/authors/hwclass.png'
---

One day, you will begin developing on not a greenfield or from-the-scratch project and this time will be the moment you are going to start looking at the conversions between package managers.

Let’s assume that you develop sth. on a system established between bower packages and your boss expects from you to update more efficient and performant way. This time will be the time to choose the best for your and your team. Here are the first part of Simple Guide for JS Tools series: Package Managers.

[**npm**](https://www.npmjs.com/)

Comes with your local Node.js installation. Nearly every packages are here and stored for your first fetch.

**Check the version:** `npm -v`

**Create package:** `npm init`

**Install package:** `npm i PACKAGE-NAME or npm i PACKAGE-NAME@PACKAGE-VERSION eg. npm i somePackage or npm i somePackage@1.1.3`

**Install all local packages:** `npm i_ or npm install`

**Add yourself within the package as the author:** `npm adduser (prompts user name and password) or npm login_ will work the same.`

**Check if the credentials are there:** `npm config ls`

**Send your package to npm:** `npm publish`

**After changes you do:** `npm version <major.minor.patch> .eg npm version 1.1.3`

**Update local packages:** `npm update`

**Remove dependency:** `npm uninstall PACKAGE-NAME`

**The reference page of that PACKAGE-NAME is here:** [www.npmjs.org/package/package-name](http://www.npmjs.org/package/package-name)

[**yarn**](https://yarnpkg.com/lang/en/)

**Install yarn:** `_brew install yarn`

**Add yarn into your local profile:** `export PATH=”$PATH:/opt/yarn-[version]/bin”`

**create package:** `yarn init`

**install package:** `yarn addPACKAGE-NAME`

**Install all local packages:** `yarn_ or yarn install`

**Add yourself within the package as the author:** `npm adduser_ (prompts user name and password) or npm login_ will work the same.`

**Check if the credentials are there:** `yarn config list`

**Login into yarn:** `yarn login`

**Send your package to npm:** `yarn publish`

**After changes you do:** `yarn version <major.minor.patch> #.eg yarn version 1.1.3`

**Update local packages:** `yarn upgrade PACKAGE-NAME or yarn upgrade PACKAGE-NAME@<version-number>`

**Remove dependency:** `yarn remove PACKAGE-NAME`

**The reference page of that PACKAGE-NAME is [here](**[https://yarnpkg.com/en/package/](https://yarnpkg.com/en/package/react)PACKAGE-NAME**).**

[**pnpm**](https://pnpm.js.org/)

**Install:** `npm i pnpm -g`

pnpm is like a custom npm with a performant way of storing packages. If you have a number of copies of modules on disk, it uses symlinks into your node\_modules directory to have the package used from only one version.

It uses npm api also and override npm install_ and some other commands for performance gain. You may ask now why pnpm almost uses the “node\_modules” directory if everything is global. Just look at \[here\]([https://github.com/pnpm/pnpm#frequently-asked-questions](https://github.com/pnpm/pnpm#frequently-asked-questions)).

**Install pnpm:** `npm i pnpm -g`

**Install package:** `pnpm install PACKAGE-NAME`

[**ied**](https://github.com/alexanderGugel/ied)

Another competitor for npm.

**Install ied:** `npm i ied -g`

**Check the version:** `ied -v`

**Create package:** `ied init`

**Install package:** `ied installPACKAGE-NAME or ied i PACKAGE-NAME@PACKAGE-VERSION eg. ied install somePackage or ied install somePackage@1.1.3`

**Install all local packages:** `ied install`

Other commands may be used via npm.

**The commands reference page is here:** [https://github.com/alexanderGugel/ied/blob/master/USAGE.txt](https://github.com/alexanderGugel/ied/blob/master/USAGE.txt)

[**bower**](https://bower.io/)

The old boy for Javascript world ;)

**Install bower:** `npm i bower -g`

**Check the version:** `bower -v`

**Login into bower:** `bower login`

**Create package:** `bower init`

**Install package:** `bower installPACKAGE-NAME eg. bower install somePackage`

**Register packages with git repos (Pushing sources to the remote):** `bower register PACKAGE-NAME GITHUB-REPO-URL`

**Search for packages:** `bower search PACKAGE-NAME`

The commands reference page is [here](https://bower.io/docs/api/).

The next part of the series will be about task managers/runners.