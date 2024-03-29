---
title: 'Snowpack 3.x Streaming Imports ile npm’siz Client’lar'
excerpt: 'For a while, I’ve been searching for the alternative methods for having components or page fragments independently from each other.'
coverImage: '/assets/blog/snowpack-3-x-streaming-imports-ile-npmsiz-client-lar/cover.webp'
date: '2021-02-13'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/snowpack-3-x-streaming-imports-ile-npmsiz-client-lar/cover.webp'
---

Bir süredir ES Modules üzerine yazmaya çalışıp meraklılarına yön vermeye gayret gösterdiğim bir dönemin üzerine [buildless.site](https://buildless.site/)’ta 2.x olan Snowpack versiyonunu 3.0 olarak güncellemek, bu yolla da bu versiyonda gelen yeniliklerden bahsetmek istedim.

Bundan önceki bir yazımda uzun uzadıya bahsettiğim bir araç olarak Snowpack, modern web tarayıcılarına çoktan gelmiş ve zamanla tamamen yaygınlaşacak olan ES Modules ile ‘native hisli’ geliştirme yapmanın kapılarını ardına kadar açıyor. Temelde yaptığı ise, yaygın olarak kullanılan build araçlarının devasa bundle’lar alarak yaptığını, unbundled yöntem (ES Modules) ve kaynaklara ([Skypack](https://www.skypack.dev/)) başvurarak yapıyor, böylece hem hızlı bir proje geliştirme deneyimi yaşıyorken aynı zamanda favori araçlarınızı da geliştirme sürecinize dahil etmenize olanak tanıyor. Kısacası deneyiniz…

O zaman ilk olarak Snowpack 3 ile gelen yeni özelliklere hızlıca bakıp, asıl dikkat çekmek istediğim konu olan npm olmadan geliştirme konusuna yani streaming imports olayına geçelim.

Snowpack 3 ile Gelen Özellikler
===============================

_esbuild_ ile gelen built-in (örn. bundling, preloading, minification ve benzeri) kod derleme / toparlama işlevsellikleri
-------------------------------------------------------------------------------------------------------------------------

_Kod bundle’lama işi bir build-sonrası optizasyonudur_ fikriyle Snowpack’in arka planda kullandığı ve webpack ve rollup gibi builder’lardan [daha hızlı](https://www.snowpack.dev/guides/optimize-and-bundle) bir build tool’u olan [esbuild](https://esbuild.github.io/) ile yeni optimizasyon tercihleri [geldi](https://www.snowpack.dev/guides/optimize-and-bundle). Böylece Snowpack, varolan build tool’larından 100x daha hızlı olduğu iddiasında olan esbuild’i kullanarak aşağıdaki işlemleri bu kolaylıkta hallediyor:

![](https://miro.medium.com/max/1380/1*JAca_d1QvKeSiyQo-RcFew.png)

Yeni Snowpack [JS API](https://www.snowpack.dev/reference/javascript-interface)
-------------------------------------------------------------------------------

Snowpack’in client ve server özelliklerine daha kolay ulaşmayı sağlayan arayüz geliştirilmiş.

![](https://miro.medium.com/max/1400/1*mPFLBR1l1BEphXjyWG7nkg.png)

Örnek verilen kodda, yeni runtime ile sunucu tarafında client (örn. react) component’inizin testlerini run edebilir, bir UI component’ini sunucu taraflı render ettirebiliyorsunuz.

![](https://miro.medium.com/max/1400/1*4W4AdPfj1F7wm50Rb0-4ig.png)

Hatta bir adım daha ileri giderek UI component’lerinizi sunucu tarafında test edebileceğiniz bir API’ya dönüştürmüş durumdalar. Biz şimdilik e2e bir çözüm olan [QAWolf](https://www.qawolf.com/) ile devam edeceğiz. [Dökümantasyonundan](http://qawolf.com/docs/create-a-test) da anlaşılacağı üzere, oldukça basit bir arayüz ile e2e testlerdeki DOM operasyonları yapma işini interaktif ve kolay kullanılan bir IDE’nin yardımıyla oldukça basite indirgeyerek çözen bu araç ile hızlıca yazdığım testi de şuraya iliştireyim. Kişisel projeleriniz için ücretsiz olan aracın scheduled test run özelliğiyle belli aralıklarla koşacağınız testlerinizin raporlarını düzenli olarak görebilmeniz de mümkün.

![](https://miro.medium.com/max/1400/1*PqJWVQZusBREXAwOqe-I2w.gif)

Son bir ek not, (Yeni nesil [Sapper](https://sapper.svelte.dev/) olan) [SvelteKit](https://svelte.dev/blog/whats-the-deal-with-sveltekit) ve (Snowpack ile geliştirilmiş bir SSG olan) [Microsite](https://www.npmjs.com/package/microsite) gibi tool’lar şimdiden Snowpack API’ını [arkada](https://www.npmjs.com/package/@sveltejs/kit) [kullanıyor](https://github.com/natemoo-re/microsite/blob/2468a3a7e364ef5b426c23fb8dd972c12e965209/packages/microsite/src/cli/microsite-build.ts#L1) [bile](https://github.com/natemoo-re/microsite/blob/2468a3a7e364ef5b426c23fb8dd972c12e965209/packages/microsite/src/cli/microsite-build.ts#L72).

Yeni Node.js Runtime’ı
----------------------

Snowpack’in elinden geçen herhangi bir ESM formatlı dosyanın Node.js environment’ı içerisine import edilmesi (ESM > CJS) sağlanmış. Sürüm yazısında da belirtildiği gibi, bu gibi bir esnekliğin gerçek [SSR](https://www.snowpack.dev/guides/server-side-render) yapabilmek ve test runner’lar için entegrasyonları burada yapabilmek için bir fırsat olacağı detayına yer verilmiş.

Streaming Imports (aka. npm’siz bağımlılık yönetimi ve | veya kullanımı)
========================================================================

Başlıkta kullandığım ifadeye gelebilecek soruları şimdiden referans alarak açıklık getireyim. Snowpack, bu son 3.x versiyonunda client geliştirme sırasında kullandığımız paket registry’si olarak npm bağımlılığına dair farklı bir yorum getirdi.

Buna göre, Skypack’in yardımıyla _npm install_ ile _node\_modules_ içerisine topladığınız paketlerinizi artık kendi önerdiği bir yöntemle cache’liyor. Böylece client tarafta ihtiyacınız olan paketler için npm install yapmak yerine, **_snowpack add package-name_** yapmanız ve _snowpack.config.js_ dosyasını aşağıdaki şekilde update etmeniz yeterli oluyor. Bunu da direk olarak canlı bir örnek olarak buildless.site üzerinden denemek istedim.

ilk adım olarak kullanılacak package’ların artık node’ten değil, snowpack aracılığıyla skypack’ten gelmesi gerektiğini belirtiyorum:

![](https://miro.medium.com/max/1400/1*-yhhb_X8ZX7dGVphrJk8nQ.png)

**_snowpack add \[package-name\]_** run edildiğinde **snowpack.deps.json** adlı bir dosya üretiliyor. Bu dosya da SemVer version bilgisi ve lockfile bilgisini içeriyor. Böylece snowpack cache’ine aldığınız package’lardan sonra snowpack.deps.json dosyası proje dizininde oluşacak ve şöyle bir şekilde görünecek:

![](https://miro.medium.com/max/1400/1*-DAn-NBGnVcX293gaDwyCA.png)

Böylece kodunuzda hiçbir şekilde CDN URL’ini hatırlamanıza gerek kalmadan aşağıdaki gibi kullanabiliyorsunuz:

![](https://miro.medium.com/max/1400/1*tvfDa77mkA8kzvkdW99Uyg.png)

Kullandığımız package’lardan hızlıca bahsedeyim:

[**_csz_**](https://github.com/lukejacksonn/csz)**_:_** Uygulama tamamen tek bir sayfadan oluştuğundan, ekstra bir build-time kütüphanesi kullanmak yerine runtime’da CSS-in-JS class’larını generate eden bir çözüm kullanmak istedim.

[**_preact_**](https://preactjs.com/)**_:_** Boyut olarak (3KB) React’ten daha küçük boyuta sahip olan, yine JSX yazdığınız bir UI library’si. [Küçük farklar](https://preactjs.com/guide/v8/differences-to-react/) olsa da API’ı da React aynı.

[**_preact-fetch_**](https://github.com/scurker/preact-fetch)**_:_** UI kodu içerisine eklenebilecek muhtemel bir native fetch’i soyutlamak için kullanılabilecek bir utility kütüphanesi. Arkada native fetch [kullanıyor](https://github.com/scurker/preact-fetch/blob/master/src/withFetch.js#L3) ancak direk fetch’den dönen response’u işlemek yerine direk component’lara bind edebiliyorsunuz:

![](https://miro.medium.com/max/1400/1*3gqA2qK7FBVvSGvq9yiHHw.png)

Streaming import detayına tekrar geri gelelim. Snowpack burada bir adım daha ileri gidiyor ve bunları tıpkı bir _node\_modules_ dizininin yaptığını browser’ın niteliklelerini kullanacak biçimde cache’liyor. Chrome kullanıyorsanız, Network tab’ından preact.js dosyasını filter’layıp şunu görmeniz demek, dosyanın artık ilk browser’la yüklenmesi dışında (ve **Cache-Control** response header’ınızdaki max-age’i 0 ile set etmiyorsanız) sürekli cache’ten getirileceği anlamına geliyor:

![](https://miro.medium.com/max/1400/1*VHLmFevl7zPbNAtw1PbDLA.png)

URL’deki kaynağa gittiğimizde aşağıdaki gibi bir kaynak ile karşılaşıyoruz. Sanki preact’i içeren asıl kaynağa bir referans noktasını andıran bu dosyanın içeriği şöyle:

```
export { a as Component, y as Fragment, S as cloneElement, q as createContext, b as createElement, h as createRef, p as default, b as h, O as hydrate, l as isValidElement, n as options, N as render, w as toChildArray } from './common/preact-c0ba709d.js';
```

Evet, tahmin ettiğimiz gibi içeride başka bir path’e bir referans var. Buradan export edilmiş kod parçalarının olduğunu düşünebilirsiniz. Bu da aslında Skypack’ten Snowpack **_cache_** folder’ına indirilmiş preact’ın orjinal ama uglify (çirkinleştirilmiş) edilmiş kodu:

![](https://miro.medium.com/max/1400/1*gfderrA2HybT8BWLImvGJw.png)

buildless.site’taki 3 (üç) bağımlılığı da böylece direk snowpack’in sorumluluk alanına taşıyarak geri kalan diğer bağımlılıklarımız ya sunucu taraflı geliştirme için gereken ya da build-time’da kullandığımız package’lardan ibaret hale geldi. Zaten bir süredir ivmelenen ES Modules ile geliştirme yapmak daha da popülerleştikçe ve bu tür tool’ların artması ve yetkinleşmesiyle giderek bu yönde bir eğilim izliyor olacağız.

buildless.site’ı vercel’in sağladığı built-in API dizininde serverless endpoint’ler deploy edebilme özelliği nedeniyle package.json dosyasına ihtiyacımız var. Böyle bir ihtiyaç olmasaydı, npm kullanmak sadece config/build tool’larının proje context’ine dahil edilmesi için gerekecekti.

Bunların yanısıra, [**_cors_**](https://www.npmjs.com/package/cors) library’sini 2 (iki) endpoint için (/sections ve /tools) preflight request’leri method bazında konfigüre edip sadece GET’e izin vermek için, marked’ı ise github’dan gelen markdown içeriği HTML’e çevirerek jsdom’a aktarıp browser’daymış gibi içeriğe müdahale edebilmek için kullandık.

![](https://miro.medium.com/max/956/1*POxjNrHfW0Hj39UmpwOFhQ.png)[https://github.com/hwclass/buildless-site/blob/master/package.json#L20](https://github.com/hwclass/buildless-site/blob/master/package.json#L20)

Umarım yazıdaki bazı detaylar yapacağınız geliştirmelere katkıda bulunur ufak da olsa ayrıntılar içeriyordur. Son olarak, meraklısına repo’yu public görünüme çekmiş olduk ki her türlü geri bildirim, öneri ve fikrinize ulaşabilelim.

[

hwclass/buildless-site
----------------------

### A collection of sites, apps, packages, articles and other stuff about ES modules. Note: Since everytime when somethinng…

github.com

](https://github.com/hwclass/buildless-site)

Projede eksik gedik çok, zaman buldukça geliştiriyoruz. Gelecek her türlü PR’a şimdiden teşekkürler.

Bundan önce yayınladığım ve güncel olarak bir süredir işlemeye çalıştığım ES Modules yazıma da buradan ulaşabilirsiniz:

[

Web için Non-Hype Rehberi: ES Modules ile Geleceğe Dönüş
--------------------------------------------------------

### Hatırlatma: Bu makale size neyi nasıl yapacağınızı değil, web’in kabul gören best practice’leri nasıl…

hwclass.medium.com

](https://medium.com/web-için-non-hype-rehberi-es-modules-ile-geleceğe-dönüş-5aa4348e3743)

Ayırdığınız zaman için teşekkürler. Soru, görüş ve önerileriniz için hem email yoluyla, hem de isterseniz bi call [isteği](https://superpeer.com/hwclass) açarak yapabilirsiniz.