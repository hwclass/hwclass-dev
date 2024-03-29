---
title: 'Sunucu-taraflı React Component’leri ve Stream’ler'
excerpt: 'For a while, I’ve been searching for the alternative methods for having components or page fragments independently from each other.'
coverImage: '/assets/blog/react-server-componentleri-ve-stream-ler/cover.webp'
date: '2021-01-20'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/react-server-componentleri-ve-stream-ler/cover.webp'
---

Bundan birkaç sene önce component’lerin cloud ortamından servis edilmesine dair bir [yazı](https://codeburst.io/aws-rendered-react-chocolate-chips-with-dawson-part-1-a-simple-service-for-serving-components-2b47a87bebab) üzerinden küçük bir deneme yapmıştım. Temelde lambda fonksiyonları halinde organize edilmiş UI component’lerinin hem bundle cost’unu minimuma çekerek render edebilmek, buradan da cloud’ta decouple edilmiş client işlem parçalarını HTML içeren string’ler olarak farklı uygulamalara embed edebilmekten bahsettiğim yazıda, o zamanlar yeni yeni serpilen IaC (infrastructure as code) aracı olan ve günümüzde [serverless](https://www.serverless.com/)’ın bir muadili olma niyetindeki [dawson](https://github.com/dawson-org) adlı bir library kullanmıştım. Böylece SSR yanında bedava gelen First Contentful Paint ve / veya Largest Contentful Paint gibi parametrelerin sürelerini azaltmak istemiştim.

**[AWS-rendered React chocolate chips with Dawson— Part 1: A simple service for serving components](https://codeburst.io/aws-rendered-react-chocolate-chips-with-dawson-part-1-a-simple-service-for-serving-components-2b47a87bebab)**

Haber uygulamalarındaki anlık widget’ları (dolar kuru, hava durumu, vb.) referans alarak biraz zaman harcamıştım. Aklımdakini tam olarak uygulamış olsam da, bu tür bir metodun client’taki state’in durumunu bozmadan, embed edilen uygulama içerisinde uyumlu şekilde run edilebilmesi işi için component’leri render ederken atanmış event’leri varsa onları korumak ve component’ler arası iletişim üzerine kafa yoramamıştım.

Geçtiğimiz ay, React Server Components üzerine çalışıldığını farkettiğimde acaba ne yapılmak isteniyor diye çok merak ettim ve kod ile günümüz uygulamalarına nasıl entegre edilebileceğini biraz araştırdım. Tanıtım videosu ve demo ile [birkaç](https://ahmadawais.com/react-server-components/) blog [post](https://addyosmani.com/blog/react-server-components/)’ta yaptığım gezinti bana bazı konularda yeni şeyler öğrenmemin de kapısını aralamış oldum ve bunu paylaşmak istedim.

![](https://miro.medium.com/max/1400/1*VoafdxQtOF7dfr1DjGyVKw.png)[https://twitter.com/reactjs/status/1341072021099327489](https://twitter.com/reactjs/status/1341072021099327489)

[reactjs/rfcs](https://github.com/reactjs/rfcs/blob/2b3ab544f46f74b9035d7768c143dc2efbacedb6/text/0000-server-components.md)

Attıkları [tweet](https://twitter.com/reactjs/status/1341072021099327489?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed&ref_url=notion%3A%2F%2Fwww.notion.so%2Fhwclass%2Fcf6b5186782045dc9afcd3732296a766%3Fv%3D410bfc5f8e28423489cb525625d66bac%26p%3D899285bed4f44d9299f9597f65bb85e7) ile duyurdukları [blog post](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)’larında ve [RFC](https://github.com/reactjs/rfcs/blob/2b3ab544f46f74b9035d7768c143dc2efbacedb6/text/0000-server-components.md) üzerinden kabaca bir gözattığımda React component’lerini bir nevi sunucudan servis etmek üzerine kurulu bir stratejisi olduğu anlaşılıyordu. React kodunun sunucuda execute edilip içermek istenilen veri ile istemciye sunulması demek. Temelde ise çözmek istenen sorun, request waterfall problemi. Bunu da birbiri içerisine geçmiş component’lerin bir şekilde bağımlı oldukları veriyi waterfall sırasına client üzerinde sokmadan, client’a sunucundan ilgili React component’in veri ile birlikte HTML çıktısı halinde alabilmeyi amaçlıyor.

Aslında tek çözmek istediği bu değil. İçi içine geçmiş React component’leri aynı zamanda başka destekleyici kütüphanlerdeki işlevleri de içermeleri söz konusu. Bu istemcide yüklenecek olan bundle boyutunun büyümesi demek.

> [Server Components run only on the server and have zero impact on bundle-size. Their code is never downloaded to clients, helping to reduce bundle sizes and improve startup time.](https://github.com/reactjs/rfcs/blob/2b3ab544f46f74b9035d7768c143dc2efbacedb6/text/0000-server-components.md#summary)

React ekibi (anlaşıldığı kadarıyla) Reacti’i ES Modules’e uyumlu hale getirmek yerine, çıktı kodunu küçültecek alternatif bir yol benimseyerek (date picker, date/time conversion ya da uluslararasılaştırma (i18n) veyahut lokalleştirme (l10n) gibi işlevselliklerin çözümünde tercih edilebileceğini düşündüğüm) ek kütüphanelerin kod çıktısında yaratacağı yükü azaltmayı da düşünüyor. Böylece kod direk olarak sunucuda işleneceği ve transpile edilerek belli bir formatta (buna sonra değineceğiz) client’a geri gönderileceğinden sıfır-bağımlılık gibi bir kazancı da sağlaması, kodun browser’da execute edilmesini de hızlandıracağı düşünülmüş. Ek olarak, sunucuda (herhangi bir remote kaynağa) yapılacak bir request’in client’ta yapılacak bir request’ten daha hızlı sonuç vereceği ön kabulünden hareketle istemcide kodun yüklenme süratinden de bir kazanç ortaya çıkacağını düşünebiliriz.

![](https://miro.medium.com/max/1400/1*rEYAa5oRMJjltp3Yb7N8Uw.png)

React Server Components ile kod organizasyonunda da birkaç değişikliğe gidilmesi planlanmış. Buna göre, client’a serve edilecek component’lerin dosya isimleri **ComponentName.client.js**, sunucuda’kilerin ise **ComponentName.server.js** oluyor. Bunların yanı sıra, her iki kısımda da kullanılabilecek ortak/shared component’ler tanımlanabiliyor. Prop’lar üzerinden aralarındaki “_top-to-down_” veri aktarımı ise serializable olan her veri tipi için geçerli, aksi durum networkte macerasına başlayan request’in işlenmesi için mümkün olmayan bir durum, zira videodaki örnekte de (örneğin) bir fonksiyonun prop olarak kullanılamayacağı belirtilmiş. Özetle, HTTP isteğiniz ile response olarak ilgili client component’inize property olarak paslayacağınız her ne ise bu (örneğin) bir javascript fonksiyonu olamıyor:

![](https://miro.medium.com/max/1400/1*zLb_B0E-Jtq51cnVzzbi4A.png)

Bu örneğin karşısına ise, sunucudan geri gönderilen response üzerinde serialize edilebilen JSX’i göndermeyi koymuşlar. Bu da JSX kodunun React Server Component’inin client’a response gönderilmeden önce render edilmesi ve öyle gönderilmesi anlamına geliyor.

Bu noktada, React Server Components aslında JSX’in sunucu-taraflı render edilmesi yerine, daha başka bir formatta, client’taki component ağacını client state’ini bozmadan client’a aktarmayi sağlayan bir ara birime dönüşüyor. Yani bir taraftan client’taki component’leriniz sorunsuz şekilde çalışmaya devam ederken server component’inizden gelecek çıktı ile uygulamanızda browser’ın refresh edilmesi gibi bir sorun olmuyor çünkü sadece sunucudan gelen sonuç (component ve data) ile uygulamanın sadece kısmen güncellenmesi sağlanıyor ve geri kalanı aynı kalabiliyor. Sunum videosunda RSC ile SSR’ın birbirinden ayrı ama birlikte kullanabilecek uyumlu konseptler olduğundan da bahsediliyor. Buna ek olarak, sunucuda varolan bir dosyanın içeriğinin yine sunucuda okunup server component’inin JSX ağacına embed edilerek render edilip client’a gönderilmesi gibi bir use-case de anlatılmış.

Bu fikrin ilginç başka bir yanı ise React Server Component’lerini Next.js ve Nuxt gibi hibrit geliştirme araçlarının temelde yaptığı rehydrating işleminin sadece React kullanılarak (bir nevi farklı bir format ve yöntem kullanarak) ortaya konabilen versiyonları olmaları. Örneğin, Next.js ile sunucudan alınmış bir verinin bütün sayfa yenilenmeden DOM ağacının yenilenerek ve React component’lerinin aynı şekilde işlemeye devam etmesini sağlayabiliyoruz. Buna yardımcı olarak Next’in önemli ölçüde ([getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps) aracılığıyla) client’ta update ettiği ve HTML’e gömülmüş bir karakterize-JSON’dan (stringified ceysın 🔪) faydalanılıyor. Bu da aynı anda, hem sunucunun üzerinde render edilmiş sayfaların SEO ihtiyaçlarının karşılanması söz konusuyken, bir taraftan da istemcideki uygulama akışının da bozulmaması anlamına geliyordu. Bunun yanısıra bu konuda Next.js ile React Server Components’ın ayrıştığı noktaları [şuradan](https://news.ycombinator.com/item?id=25499171) genel olarak öğrenebildim, faydalı oldu ve merakım giderek arttı. Bir göz atmanızı tavsiye ederim.

Bütün bu detaylar ışığında merakım iyice arttı ve kodun içerisine girip daha iyi anlamak istedim. Uygulamaları analiz etmeye çalıştığımda ilk baktığım detay / nokta genelde sunucu ile nasıl iletişime girdiği ve burada nasıl bir yol izlendiği oluyor. Bunun belli başlı sebepleri var ve çok detaya girmeden şunu diyebilirim ki, bir uygulamanın veri alışverişi için sahip olduğu iletişim modeli, o uygulamanın ne için ya da nasıl geliştirildiğini anlattığını düşünüyorum. Anlık ya da değil, event bazlı ya da değil ve daha birçoğu. Burada da değindiğin detay, bir chat ya da notification feature’ı içeren bir uygulamayı tasarlamanız ile statik export ile sadece dinamik routing nitelikleri kazandırmanızın yeterli olduğu uygulamalar arasındaki farklar gibi ve benzeri. Özellikle gün içerisinde işinize odaklanmışken önünüzdeki uygulamayı anlamaya çalışıyorsanız, legacy uygulamaların en leş kısımlarına bug fix yapmanız gerektiyse / gerekiyorsa ya da system design [konularına](https://www.wikiwand.com/en/Back-of-the-envelope_calculation) merakınız varsa, büyük bir ihtimalle sizin de kendinize has yöntemleriniz vardır. Bu da sadece onlardan birisi.

O nedenle, ben de RSC demo uygulamasını lokalde run ettiğimde gidip baktığım ilk yer burasıydı. Uygulama ile girdiğim ilk iletişimde yaptığım bir değişikliğin akabinde sunucu kısmıyla nasıl konuştuğuna bakmakla incelememe başlamıştım. Buna göre; uygulamada sol paneldeki her bir farklı item’ın seçilmesiyle “_/react_” endpoint’ine bir request yapılıyor. O anki state ise bir query string’e populate ediliyordu:

![](https://miro.medium.com/max/1400/1*vU6Kw3r2hFgts6jmDw8erQ.png)

Bu endpoint’e gidip gelen her bir request/response’ta da aşağıdaki gibi bir custom header update oluyor.

```
X-Location: {“selectedId”:4,”isEditing”:false,”searchText”:”a”}
```

API’yi run eden bir [express](https://expressjs.com/) sunucusu ise HTTP endpoint callback’i üzerinden bunu yakalıyor ve request’in içeriğini sendResponse metoduna delege ediyor:

![](https://miro.medium.com/max/1400/1*txmzm3mcxCVA_h_2S07l_w.png)[https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L92](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L92)

Dikkat ederseniz, sendResponse metodunun 3. argümanı null. Normal şartlarda bu argüman “selectedId” olarak set edilmiş biçimde sadece tek bir POST request’inde (/notes) gönderiliyor. Sebebi ise sunucudan React tree’si render edilip geri client’a (id ve chunk url’lerinden oluşan bir JSON map’i olarak) döndürülürken varolan state’i orada da korumak. Bu response alınınca client tarafında bu “selectedId” okunuyor. Detaylar geliyor…

Bütün bunlara ek olarak, uygulamayı browser’da execute edecek kısımları bulmaya çalıştığımda package.json’dan uygulamayı bundle’a export eden [satırlar](https://github.com/reactjs/server-components-demo/blob/main/package.json#L45)ın build.js’i run ettiği yeri buldum. O da entry olarak [index.client.js](https://github.com/reactjs/server-components-demo/blob/main/scripts/build.js#L23)’i işaret ediyor. Ardından dosya içerisine import edilen [Root.client.js](https://github.com/reactjs/server-components-demo/blob/main/src/Root.client.js)’teki [Root component’i](https://github.com/reactjs/server-components-demo/blob/main/src/Root.client.js#L15)ni render ediyor. O da aynı dosyadaki ve LocationContext.Provider ile wrap edilmiş ve Root’un içeriğini update eden [Content component’i](https://github.com/reactjs/server-components-demo/blob/main/src/Root.client.js#L25)ni kullanıyor. Uygulamanın tamamı bu arkadaşın sağladığı içerikten render oluyor diyebiliriz.

![](https://miro.medium.com/max/1400/1*TxMGaQQkdSIV2e7RRpl8YQ.png)[https://github.com/reactjs/server-components-demo/blob/3a505efea0b1191496a832e23f3de46a0db69915/src/Root.client.js#L25](https://github.com/reactjs/server-components-demo/blob/3a505efea0b1191496a832e23f3de46a0db69915/src/Root.client.js#L25)

Şimdi ana akışı bozmadan devam edelim ve sunucu tarafında “/react” endpoint’inde execute edilen [sendResponse](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L79) fonksiyonunu inceleyelim. Bu fonksiyon aslında bir [decorator](https://www.wikiwand.com/en/Decorator_pattern) gibi çalışıyor ve o anda alınan request’in durumuna göre response’un içeriğini “dekore ediyor” / belirliyor. Yukarıda bahsettiğimiz o anki client state’ini location query string’inden alıyor ve response’un header’ındaki X-Location olarak set ediyor. Eğer 3. argüman null değilse selectedId’ye set ediyor ve son aşama olarak renderReactTree metodunu çağırıyor.

![](https://miro.medium.com/max/1400/1*zAK4neejB7cOFrA8kuYZ8Q.png)[https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L79](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L79)

[renderReactTree](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L69) metodu, asenkron [waitForWebpack](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L70) fonksiyonunun sonlanmasını bekleyip en başta run edilen build command’inin export ettiği bir manifest (_./build/react-client-manifest.json_) dosyasındaki içeriği bir değişkene (moduleMap) set ediyor:

![](https://miro.medium.com/max/1400/1*58q4bJYhqah9FxYx7qFj5g.png)[https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L71](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L71)

moduleMap değişkeninin içeriği ise sadece client component’lerinin meta bilgisini içeren bir [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) set’i:

![](https://miro.medium.com/max/1400/1*qwGDDPuA8syNOtEM1OknMw.png)Her bir map kırılımının bir client component’ine denk geldiği gözlerden kaçmadı!

Response’un client’a gönderilmeden önceki aşama ise App.server.js’te oluşturulmuş bütün bir React tree’sinin eski/yeni veya update edilmiş / edilmemiş prop’lar ile manifest’e (moduleMap) göre yeniden oluşturulması aşaması.

![](https://miro.medium.com/max/1400/1*8xYqZs2H4eaaNUbBzC0LYQ.png)[https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/package.json#L28](https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/package.json#L28)

[pipeToNodeWritable](https://github.com/reactjs/server-components-demo/blob/4ecf1f2641ecc822fe8f933ac3cd23f4ed4629d7/server/api.server.js#L25) metodu react-dom-server-webpack package’ının [içerisindeki](https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/package.json#L28) writer alias’ından geliyor. Bu da sunucuda run olan ReactFlightDOMServerNode.js dosyasına refere ediyor. Kaynak koddan görüleceği gibi, pipeToNodeWritable metodu 3 argüman alacak ve herhangi bir dönüş değeri bulunmayacak şekilde organize edilmiş:

![](https://miro.medium.com/max/1400/1*Z8hkZetcur40l_IFN9p3Fg.png)![](https://miro.medium.com/max/1400/1*aAhLSL6z9DR2bcCHLFOMvw.png)[https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/src/ReactFlightServerWebpackBundlerConfig.js](https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/src/ReactFlightServerWebpackBundlerConfig.js)

Görüldüğü üzere, manifest dosyasının içeriği özelde webpack’in bundle edeceği kodu da update edecek bir [referans noktası](https://github.com/facebook/react/blob/master/packages/react-server-dom-webpack/src/ReactFlightServerWebpackBundlerConfig.js).

pipeToNodeWritable’a gönderilen ReactModel, Writable ve BundlerConfig tiplerindeki model, destination ve webpackMap argümanlarıyla bu sefer [createRequest](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L92) (react-server/src/ReactFlightServer.js) çağırılıyor. Bu metod ise kendi içerisinde bu değerleri kullanarak [createSegment](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L183) isimli bir fonksiyonu çağırıyor ve geriye şu aşağıdaki objeyi döndürüyor:

![](https://miro.medium.com/max/1400/1*r8wgzwCTKdZrs0xg7Dhhvg.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L183](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L183)

Manifest dosyası içerisinde yer alan objenin her bir elemanı için, request aşağıdaki gibi bir request değişkenine assign edilerek oluşturuluyor ve pipeToNodeWritable metoduna geri döndürülüyor:

![](https://miro.medium.com/max/1400/1*ZNH7W0OLAgkHPk2RYt2lHQ.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L74](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L74)

Tam da bu noktada ilginç bir hamle geliyor ve pingedSegments dizisine şu şekilde push ediliyor:

![](https://miro.medium.com/max/1400/1*8pS0mUg8SEmJwna0vsYCrA.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L117](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L117)

Yani aslında request.pingedSegments burada Segment tipinde objelerin store edildiği bir dizi:

![](https://miro.medium.com/max/1204/1*o6tdOPZdYR2UFRhnlFGmqw.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L68](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L68)

Her bir createSegment fonksiyon call’u ise pingSegment adında başka bir metod çağırıyor. Bu metod ise o anda henüz içi doldurulmaya başlanmış request objesinin pingedSegments dizisine her yeni gelen segment’leri push ediyor. Segmentlerin tam olarak ne olduklarına az sonra bakacağız:

![](https://miro.medium.com/max/1400/1*IuYMWy0bdOFOgTn85SdC3g.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L175](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L175)

Buradaki [performWork](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L665) fonksiyonuna bir bakmak faydalı olabilir. İçeriğine çok girmeden, bu fonksiyon temelde pingedSegment metodunun populate ettiği pingedSegments array’inin içeriğinin en primitif noktasına denk geliyor. Yani aslında segment’ler, React component’lerinin özel bir notasyonda oluşturulmuş halleri. Aşağıdaki kod bloğundan da görüleceği üzere, önce [retrySegment](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L627) kendisine argüman olarak gönderilmiş segmentin gerçekten bir React component olup olmadığını kontrol ediyor.

![](https://miro.medium.com/max/1400/1*dS-9ClN-qgpC32LnOaxvJg.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L392](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L392)

ve eğer öyleyse bu içeriği processModelChunk’tan dönen sonuç ile completedJSONChunks içerisine push’luyor:

![](https://miro.medium.com/max/1400/1*WieUKhzQMLlk-OWO8KSzCw.png)[https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L650](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L650)

Bütün segment’ler push’landığında eğer request.flowing değeri truthy ise request [flushCompletedChunks](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L686) ile destination olarak isimlendirilmiş response argümanının içeriği stream’de gönderildiklerinde ilk olarak call edilsinler diye writeChunk metodu ile [işleniyor](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactFlightServer.js#L701), ardından completedJSONChunks içeriği işleme alınıyor ve pendingChunks’ın içeriği boşaltılıyor, son olarak da [completeWriting](https://github.com/facebook/react/blob/b99ac3d6dffbe57f94d368cc4f4e0ddf089e4f53/packages/react-server/src/ReactServerStreamConfigNode.js#L53) metodu çağrılarak client’ta geri döndürülecek olan response’un bütün buffer’lanmış data’sı [temizleniyor](https://nodejs.org/api/stream.html#stream_writable_uncork) ve son haline kavuşuyor.

![](https://miro.medium.com/max/1400/1*cBCFdk0OHe2sumy1Qp3gaw.png)

Bütün bu eldeki veri, Transfer-Encoding response header’ı chunked olarak set edilip en başta anlattığımız “/react” endpointinden çağırılan sendResponse, ardından call edilen renderReactTree ve en sonunda bütün bir React tree’sini webpack notasyonunda tekrar stream’e geri döndürülmek üzere execute edilen pipeToNodeWritable çağırılıyor ve client kısımda yapılan ve sunucuyu ping’leyen herhangi bir anda tekrardan build edilip yine bir stream response’u olarak client’a geri döndürülüyor. Chunked’lanmış sunucu cevabımız ise şu şekilde oluyor:

![](https://miro.medium.com/max/1400/1*JdxDdU6jgJT1QX04rpdnMw.png)

Tam da bu noktada değinmek istediğim başka bir konu daha var, o da bütün bu mekanizmanın üzerine kurulduğu HTTP 1.1 ile uygunlamaya [sunulan](https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.6.1) chunk tabanlı veri alışverişini network seviyesine taşıyan stream’ler. Bu konuyu direk olarak [Node.js Streams](https://nodejs.org/api/stream.html#stream_stream) üzerinden anlatmayı tercih ettim, en nihayetinde “kod” dilinde konuşuyoruz. Streams özellikle dosya okuma/yazma, network üzerinden iletişim gibi işlemlerin memory ve performans konusunda yarattıkları sorunlardan muzdarip olanların tercih ettikleri bir Node.js’in feature’ı. Gerçek hayattan bir örnek vermek gerekirse, okunup içeriği üzerinde bir transform işlemi gerçekleştirilecek olan bir dosyanın stream ile açılıp okunması daha efektif çünkü Streams bu data’yı chunk’lar halinde işliyor ve her bir işlem sonrasında hafızadan bir önceki versiyonu/içeriği siliyor. Bunu HTTP protokolüne uyguladığımızda örnek verebileceğim diğer bir durum da video streaming.

Mesela, eğer Youtube üzerinden izlediğiniz bir videonun tamamının yüklenerek gösterildiğini düşünüyorsanız yanılıyorsunuz çünkü bir videonun sayfasına girdiğinizde ilk elden gösterilmeye başlanmasının sebebi, Youtube’un sunucularından video verisinin küçük parçalar halinde client’a servis edilmesi.

![](https://miro.medium.com/max/880/1*CJmPLbrU5Tzs9Dxgwa4X4g.gif)youtube.com -> right click on video -> Stats for nerds -> Network Activity

Konuyu biraz daha özele inerek açalım. [Gulp](https://florian.ec/blog/gulp-js-streams/) ‘ı hemen hemen herkes hatırlıyordur, hatta hala kullanılabilir bir tool olduğunu düşünüyorum. Gulp da bir build tool’u olduğundan aslında arka planda stream’lerle çalışıyor. Hani şu sırasıyla minify edilen bundle’larınız var ya, işte onların hepsi Gulp üzerinde sanal olarak oluşturulmuş [object stream’lere](https://community.risingstack.com/the-definitive-guide-to-object-streams-in-node-js/) yazılıyor ve yeri geldiğinde kullanılıp hafızadan siliniyor. Boyutu büyük olan kod dosyalarınız üzerinde bu işlemler uygulanırken tipki unix pipe (|) operatörü gibi bir readable stream’den sonraki bir writable stream’e geçit açabiliyoruz.

![](https://miro.medium.com/max/1400/1*KrqJ6xk6RdRAMl5rgvx_qg.png)

Stream’ler yine Node.js’in [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class’ından türetilmiş sınıflar ve 4 çeşitten oluşuyor. Verinin yazılabildiği [Writable](https://nodejs.org/api/stream.html#stream_class_stream_writable), okunabildiği [Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable), hem yazılıp hem okunabilen [Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex) ve Duplex stream’leri içerisine hem yazılıp hem okubilen verinin aynı zamanda editlenebildiği [Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform). Örneğin, Node.js’teki [request objesi](https://nodejs.org/api/http.html#http_class_http_incomingmessage) bir okunabilir stream. Aynı zamanda bir stream olan response objesinin kullanımından da görüleceği üzere, sanki event’ler içerisinde işlem yapıyormuşsunuz gibi bir his vermesinin sebebi de tam da bu, yani kendisinin EventEmitter’dan türetilmiş bir Stream olması.

![](https://miro.medium.com/max/1400/1*SPe0qkHkTfvO2gOYcQNvVg.png)

Özellikle asenkron data aktarımı konusunda [yardımcı](https://changelog.com/jsparty/103#transcript-30) bir Node.js feature’ı olan Stream’ler, böylece bir sonraki işleme geçmeden önce mevcut işlemin gerçekleşmesi sırasında durdurulması mümkün oluyor. React Server Components konsepti Stream’lerin üzerine kurulu olduğu iletişim modelinden faydalanıyor. Chunk-tabanlı bir istemci-sunucu networking iletişim niteliği olarak stream ile her bir değişen DOM status’ünü sunucu tarafına gönderip, onu sunucuda anlamlı bir React tree halinde tekrar oluşturup, (örneğin) veritabanında yapılan bir değişiklik ile varolan component ve state yapısını bozmadan bir response’ta geri dönderiyor.

Kaldığımız yerden devam edecek olursak, client’a da bir gözatmamız gerekecek. Backend tarafında dönen bütün bu hadiselerin gelip netleştiği yer client entegrasyonu. /react endpoint’inin call edildiği yer Cache.client.js dosyası. location key’i olmadan request yapılırsa uygulamanın React tree’sini tekrardan update edilecek bir neden yok. Ancak bir location id’si varsa, response react-server-dom-webpack package’i ile işlenip yeni bir bundle üretiliyor, React tree’si update ediliyor.

![](https://miro.medium.com/max/1400/1*qZ53bUy2n4fKbPuhBsJlUw.png)[https://github.com/facebook/react/blob/5fd9db732dff1b99c096bffef9a565b594c788de/packages/react-server-dom-webpack/src/ReactFlightDOMClient.js#L46](https://github.com/facebook/react/blob/5fd9db732dff1b99c096bffef9a565b594c788de/packages/react-server-dom-webpack/src/ReactFlightDOMClient.js#L46)

Response’un doğru bir şekilde okunup uygulamanın update edilmesi için kullanılan readRoot fonksiyonunu sağlayan ise react-server-dom-webpack pluginin [createFromFetch](https://github.com/facebook/react/blob/5fd9db732dff1b99c096bffef9a565b594c788de/packages/react-server-dom-webpack/src/ReactFlightDOMClient.js#L46) fonksiyonu. O da [startReadingFromStream](https://github.com/facebook/react/blob/5fd9db732dff1b99c096bffef9a565b594c788de/packages/react-server-dom-webpack/src/ReactFlightDOMClient.js#L52) isimli başka bir fonksiyonu çağırıyor. Bu fonksiyonun yaptığı ise basitçe bir stream reader oluşturmak ve response’un içeriğini okumak ve çağrıldığı yere geri döndürmek:

![](https://miro.medium.com/max/1400/1*UfjUE8nLGvKJqgQXIQtjeg.png)

Bütün bu döngü, gerisin geriye uygulamayı besliyor ve client tree’si bozulmadan sunucu tarafındaki güncellemeler istemciye sağlanmış oluyor. Kodun kendisi değil, sadece ihtiyaç olunan meta verinin pure kod olarak değil de kendisine özgü bir formatta, bu gibi bir kütüphane niteliği (feature) için HTML’den daha zengin bir içerik sağlanmış oluyor.

Daha birçok örnek verilebilir ve bu gibi bir feature’ın nasıl geliştirildiğine deep-dive yukarıdaki linklerden faydalanarak detaylıca girebilirsiniz. Ne de olsa kod geliştirmenin yazmaktan çok kod okumaktan ibaret olması gibi [bir](https://www.folklore.org/StoryView.py?project=Macintosh&story=Negative_2000_Lines_Of_Code.txt) [durum](https://eksisozluk.com/metreyle-yazilim-satmak--3297121) var. 🤦🏻‍♂️

Özetle, React ekibi stream tabanlı bir web iletişim “modeli” kullanarak sunucu taraflı güncellemeleri client’a ulaştırıp bütün uygulamanın güncellenmesini gerçekleştirmek istemiş. Günümüz server-side rendering’in sağladığı imkanların stream’ler ile “aşılarak” sadece React’e özgü bir çözüm geliştirilmek istenmiş. Henüz deneysel bir çalışma elbette, gelecek güncellemelerle daha robust bir yapıya kavuşturulursa ne gibi imkanlar yaratır diye düşündüğümde şunlar aklıma geliyor:

*   Front-end engineering alanı sunuculara olan ilgisi ile performans ve SEO ihtiyaçları karşılanırken Back-end engineering alanı daha çok GraphQL gibi araçlarla client kısmına daha çok kafa yormalarının önü açıldı. Bu da aklıma geliştiricilerin bir süredir sektördeki gelişmeler ve araçlarla daha çok ‘middle stack’ gibi bir yerde toparlanıyor olmaları detayını getiriyor. Daha computation / algoritma / talep yoğun yazılım geliştirmenin makine öğrenmesi gibi alanlara kaydığı görüşündeyim. React Server Components’ın da bu ‘middle stack’ alanında dolduracağı yer yine sunucu ile istemciyi bir noktada buluşturmak ve sunucu-bazlı etkileşimi yoğun uygulamalar olacak gibi duruyor. Bugün [websocket](https://www.wikiwand.com/en/WebSocket)’lerin kullanıldığı uygulamaların artması buna dair küçük bir detay.
*   Front-end geliştirme çoktan full-stack bir düzeleme çoktan taşınmıştı. Bunu client’tan direk olarak başka kaynaklara direk bağlantı kuran ve böylece daha hızlı uygulama geliştirmeyi sağlayan birçok araç ile deneyimlemiştik / deneyimliyoruz. Bu nedenle bu ivme, React Server Component’leri ile daha da artacak.
*   JAMStack entegrasyonu ile headless CMS’lerden feed edilen verilerin statik uygulamalarda interaktivite oranını yükseltir.
*   Çok fazla API iletişimi olan uygulama ortamlarında client’in stabil kalabilmesiyle statik sayfalar üzerinden kurgulanmış uygulamalarda dinamizm katabilir.
*   Server component’leri üzerinden uygulama ortamlarınndan decouple edilmiş widget’lar mobil uygulamalara embed edilebilir. Performans ve [zero-bundle](https://medium.com/899285bed4f44d9299f9597f65bb85e7#bd6ee58f22204adeaa8a7b7df57af5f5) size bu noktadan da bir kazanç sağlayabilir.
*   Read / Update işlemlerinin çokça client — sunucu arasında iletişimi gerektiren uygulamalarda tek bir component ile en güncel verinin her iki layer’da da güncel kalması sağlanabilir. Örnek, ürünlerin / şirketlerin / toplulukların katılımcı dökümantasyon uygulamaları, e-ticarette ürün detay sayfalarının yorum ve oylama sayfaları, vb. gibi kullanım alanları akla gelebilir.
*   Lazy-loaded component’ler sunucu tarafında code-splitting sağlayabilir.
*   React framework’leri ya da geliştirme araçları için yeni bir gelişme alanı çıkarır. Mesela şu andan Next.js’e bir [entegrasyonun](https://medium.com/899285bed4f44d9299f9597f65bb85e7#d5135598b870470a902efab680d356e5) [geleceğini](https://medium.com/899285bed4f44d9299f9597f65bb85e7#526edb678a3943c397f936174cb65926) tahmin edebiliriz. Zaten [hackernews post’u](https://news.ycombinator.com/item?id=25499171)nda de meta-framework’lerin zaten başardıkları işi daha da iyileştirmek olduğu belirtiliyor.
*   React component’lerinin onceden uygulamalarda paylaştığı roller (datepicker, media, vs.) üzerinden tanımlıyorduk. Şimdi bir de component’lerin server/client versiyonları geliştirilmeye başlanabilir. ‘react-server-neguzeloldu’ ya da ‘react-client-css-animation’ gibi standalone component’lerin npm’e publish edildiğini görebiliriz. [Burada](https://medium.com/899285bed4f44d9299f9597f65bb85e7#45874eb859e04904b862a3e1a41b407e) belirtilmiş mesela. Benim favorilerim [bunlar](https://www.youtube.com/watch?v=PI5wz2pwXIg&ab_channel=JSConf) bu arada 😂

Bütün bunlar bir yana, bu gibi bir feature’ı React gibi kullanım alanı oldukça artmış bir kütüphaneye entegre etmek zaman alacaktır. Umarım gelişmelerin ne olacağı ilerleyen aylarda belli olur, bu alandaki gelişimler diğer kütüphane ya da framework’lere de zaten çoktan ilgisini yeterince çekmiş daha “middle stack” çözümlere yol açar.

Zaman ayırıp okuduğunuz için teşekkürler. Geri bildirimlerinizi sabırsızlıkla bekliyorum. 👋