---
title: 'Web için Non-Hype Rehberi: ES Modules ile Geleceğe Dönüş'
excerpt: 'A wise man said:...'
coverImage: '/assets/blog/web-için-non-hype-rehberi-es-modules-ile-geleceğe-dönüş/cover.webp'
date: '2020-12-17'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/web-için-non-hype-rehberi-es-modules-ile-geleceğe-dönüş/cover.webp'
---

![](https://miro.medium.com/max/1400/1*4pYy_M4kxHhN5pUyjebrew.png)DeLorean Credits: [https://www.pngwing.com/en/free-png-ymhbn](https://www.pngwing.com/en/free-png-ymhbn)

_Hatırlatma:_ _Bu makale size neyi nasıl yapacağınızı değil, web’in kabul gören best practice’leri nasıl değiştirebileceğinizi anlatıyor. Yazının orjinaline_ [_buradan_](https://hwclass.dev/how-buildless-is-possible-today/) _ya da_ [_buradan_](https://dev.to/hwclass/how-buildless-is-possible-today-4ocp) _ulaşabilirsiniz. Bu yazı bir süredir_ [_Kjaer_](https://github.com/Kjaer/) _ile üzerinde kafa patlattığımız build ya da bundle olmaksızın geliştirme yapma fikri üzerine bir detay paylaşımı olarak değerlendirilebilir._

Hatırlatma 2: Geleceğe Dönüş temasını neden seçmemin sebebi, geçmişte web geliştirmenin daha çok HTML_’in içerisinde yapılan geliştirmeden oluşuyordu. Gün geçtikçe ortaya çıkan araçlarla zaman içerisinde değişen paradigmanın yavaş yavaş terkedilip, web’in orjinal yaklaşımına daha çok yaklaşıyoruz._

Gerçekten İstediğimiz Bundler-bağımlı Geliştirme mi?
====================================================

Web uygulama code bundler’ları (Webpack vb.) bugün neredeyse geliştirdiğimiz bütün web uygulamalarında kullanılıyor. Bunu da bugüne kadar ECMAScript’teki gelişmelere tarayıcı engine’lerinin yetişememelerine borçluyuz. Her araç gibi bu ekstra step’in geliştirme yaşam döngüsüne dahil olması beraberinde başka dertleri de beraberinde getirdi. Özetle bu ek adım, bir uygulama geliştirmek istediğinizde, projenizi canlıya almadan önceki geliştirme sürecinize ek bir adim eklemeniz anlamına geliyor: **_build/bundle_** aşaması. Deneyimleri farklı olsa da kullandığımız her bir code bundler’ın geliştirme suresince aldığı kod export’u, yazdığınız kodun [boyut](https://httparchive.org/reports/page-weight#bytesTotal)u büyüdükçe genişliyor, şişiyor. Kaldı ki sorun sadece geliştirme aşamasında değil. Canlıya çıkıldığında eğer doğru bir caching stratejisinden bahsedemiyorsak canlıda bundle’i remote noktadan fetch etmek için harcanan bir de ek [süre](https://httparchive.org/reports/page-weight#reqTotal) söz konusu. Bu da insanı şunu düşünmeye itiyor: nerede kaldı geliştirme/geliştirici deneyimi ya da tatmini?

![](https://miro.medium.com/max/1400/1*A2YzTWjmjVKzzsU2ZKCwHg.png)[https://httparchive.org/reports/page-weight#bytesTotal](https://httparchive.org/reports/page-weight#bytesTotal)![](https://miro.medium.com/max/1400/1*wT2RddWRWb_AyEd2-QRUSg.png)[https://httparchive.org/reports/page-weight#reqTotal](https://httparchive.org/reports/page-weight#reqTotal)

Bugün, web teknolojilerindeki son gelişmeler ışığında, tarayıcılar geliştirici ve|veya geliştirme deneyimini arttırmak için farklı bir yol izlemek zorunda olduğunu bir süre önce anladı. Bu deneyimi kolaylaştırmak ve geliştiricilerin sadece inşa etttikleri ürüne odaklanmalarını sağlamak icin yeni ürünler çıkartıyorlar. Örneğin Vercel, Netlify, Amplify, vb. gibi araçlar bu işi daha kolay hale getirmek, geliştirme döngüsünü (code ⇒ CI/CD ⇒ Live) daha da hızlandırırken bugün geliştiriciler birçok nedenden ötürü bu sürenin giderek uzamasından muzdarip alabiliyor. Bunun birçok sebebi var: kullanılan araçlara (tool) özel konfigürasyon yapmak zorunda kalmak, ek compilation/build/bundle zamanları, ve export edilen kod çıktısına eklenen onca ilave kod nedeniyle runtime’da yaşanan [performans](https://v8.dev/blog/cost-of-javascript-2019) sorunları.

![](https://miro.medium.com/max/1400/1*0k5d3bfK2_yLUOy3JeTwpg.png)Credits: [https://v8.dev/blog/cost-of-javascript-2019](https://v8.dev/blog/cost-of-javascript-2019)

Burada değinmek istediğim konu daha çok code bundle’ları. Web uygulamalarını statik olarak çıktı almanın performans parametrelerine katkısı olduğu gibi, web geliştirmeyi daha rahat ve ağrısız, sızısız yapmanın bir başka yolu bir süredir zaten var; o da bütün uygulamanın bir kod çıktısı olarak bir ya da birden fazla dosyalar halinde build-time sırasında load etmek ya da işlemek yerine, runtime’da başka bir yaklaşıma yaslanmak. Ben buna “buildless” diyorum ama “bundleless”, “bundle-exportless” gibi ifadelerle tanımlamak da mümkün, hatta daha uygun gelebilir. (Ne de olsa bugünlerde bir yaklaşımı _\-less_ ekiyle tanımladığınızda daha çok ilgi görüyor: bkz. _codeless_, _serverless_, vb.)

Neden bundle almayalım ki?
==========================

Çoktandır bir [EcmaScript](https://tc39.es/ecma262/#sec-imports) standardı olan modül sistemi hem [sunucu](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules) hem de istemci tarafında desteklenir hale geldi diyebiliriz. Böylece daha az baş ağrısı ile tutarlı bir geliştirme deneyimi yasayabilirsiniz.

Bircok uygulamaya sıfırdan başlandığı ilk anda başvurduğu hazır boilerplate [üreteçlerinin](https://create-react-app.dev/) ürettiği bundle boyutları düşünüldüğünde konunun ciddiyeti tabii ki daha da artıyor. _node\_modules_ dizininin ünü evrensel bir hale geldigi günümüzde, bu konudaki her gelişmenin bize hem geliştirme zamanı olarak, hem de canlıya çıkma zamanında olarak artısı zaten kaçınılmazdı.

![](https://miro.medium.com/max/1400/1*_idrQTtuzro1xmfoAu3RRg.jpeg)Credits: [https://medium.com/better-programming/npkill-the-easy-solution-to-deleting-node-modules-with-style-1c591126f7a5](https://medium.com/better-programming/npkill-the-easy-solution-to-deleting-node-modules-with-style-1c591126f7a5)

Nitekim aşağıdaki tablo her deploy sonrasında sunucularınızdan tekrar tekrar yüklediğimiz bundle dosyaların yanısıra build sırasında export edilen dosyaların boyutlarına dair bir fikir veriyor.

![](https://miro.medium.com/max/1400/1*P-6xKMmTmKRtGnlQ0s9KUw.png)

Bütün bunlara ek olarak, daha önceleri [BrowserSync](https://www.browsersync.io/) ile aşina olduğumuz Save & Refresh yerini [React.js](https://www.npmjs.com/package/react-hot-loader) ile geliştirme yapılırken ilk kez tanıştığımız [HMR](https://github.com/webpack/docs/wiki/list-of-plugins#hotmodulereplacementplugin)’ye (Hot-Module Reloading) bıraktı. Bu süre genellikle geliştirmenin yarattığı hararetle es geçilen bir detay. Ancak geliştirme esnasında her bir CTRL+S / Bundle Export işleminin aldığı süre göz önüne alındığında geliştiricinin yaşadığı bu muhtemel [zaman kaybının](https://www.reddit.com/r/webpack/comments/apl8w7/how_long_does_your_webpack_take_to_build/) geri dönüşü de ayrıca bir memnuniyetsizlik konusu olabiliyor. [V8](https://v8.dev/features/dynamic-import)'te halihazırda bulunan [Dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_a_module_for_its_side_effects_only) ile bu dert kısmen aşılabiliyor olsa da, her şekilde bir code bundler tool kullanıldığından yine de önümüzde ciddi bir bundle export time gibi bir can sıkıcı parametre duruyor. Her save sonrası bekleme, sonucu görme, kodu update etme ve yeniden aynı döngü. Tabii kodun boyutu büyüdükçe bu zamanın artması da söz konusu.

Bütün bunları düşünürken tabii bir de kullanıcıya bir an önce bir ürün ile ulaşayım derken urunun bağlamından kopup (zaten basta planlama olmak üzere başka bir ton parametreyle uğraşırken bir de) bu tür sadece geliştirme döngüsünde varolan detaylarda boğulmanız ve (varsa) deadline’ınıza yavaş yavaş el sallamaya 👋🏿 başlamanız çok olası. Elbette bu detaylar her uygulama geliştirme surecinin neredeyse bir parçası ama hype anlayışın ya da tool’ların aksine başka bir imkan daha mümkün: **ES Modules**. Bunu bundle almadan geliştirme olarak özetleyebiliriz.

![](https://miro.medium.com/max/1400/1*AP23BJqJqYJ9zuqaVd7TdQ.png)

Ve bu tarz bir modül kullanımı, yani Node.js’in bir suredir stabil [sürümünde](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules) de yer verdigi ES Modules özelliği tarayıcıların önemli bir kısmında bugün aktif ve [kullanılabilir](https://caniuse.com/es6-module) durumda.

![](https://miro.medium.com/max/1400/1*xFqHPFOjcCFkBg7XjJtbag.png)[https://caniuse.com/es6-module](https://caniuse.com/es6-module)

Aynı zamanda halihazırda npm’deki herhangi bir package’ı direk olarak skypack üzerinden JS ya da HTML dosyanıza import ederek [kullanabilirsiniz](https://codepen.io/hwclass/pen/GRjWjJZ?editors=1000):

![](https://miro.medium.com/max/1400/1*5L0l0SdpLGNmRtXMg0RS-Q.png)

Veya direk HTML içerisinden import ettiğiniz package’a ulaşmanız mümkün.

![](https://miro.medium.com/max/1400/1*l8dlIHM4Xmg2Xdoe5xijXQ.png)

**type** attribute’ü “**module**” olan her script tag’i ve import edilen dosyanın icinden export edilmiş entry’niz ile kodunuzu direk HTML dosyanızda run etmeniz mümkün demek, evet, web’de tarihin tekerleğini geriye doğru çevrilmesi gibi gelebilir ama yöntemlerin basitleşmesiyle daha kullanışlı hale gelmeleri hoş bir detay. Hatta terminalinizde npm install’ı run etmenize gerek duymadan!

![](https://miro.medium.com/max/1212/1*_U619I12H83tNRZkMsu3Vw.png)preact’ın skypack package skoru: [https://www.skypack.dev/view/preact](https://www.skypack.dev/view/preact)

Gelin bir de bunu bi gerçel bir use-case uzerinden inceleyelim. Bir çoğumuz cookie set/get islemleri için belli kütüphaneler kullanmıştır. Benim bir süredir tercih ettiğim js-cookie kütüphanesinin readme dosyasından yakaladığım bir [detayı](https://github.com/js-cookie/js-cookie#direct-download) surada paylaşayım:

![](https://miro.medium.com/max/1400/1*6sIrYYjC48V-XrZbUr_yig.png)[https://github.com/js-cookie/js-cookie#direct-download](https://github.com/js-cookie/js-cookie#direct-download)

An itibariyle “_ama biz vanilla javascript_ [_sentaks_](https://en.wiktionary.org/wiki/sentaks)_ını sadece tooling için kullanıyoruz_” denildiğini duyar gibiyim. Malumunuz bir aralar (aslında hala devam eden oranda) jQuery icin [söylenilenleri](https://insights.stackoverflow.com/survey/2020#technology-web-frameworks) bugün yavaş yavaş diğer birçok favori tool icin söylüyoruz. Nitekim kullanım oranları giderek artan [Vue](https://trends.builtwith.com/javascript/Vue), [React](https://trends.builtwith.com/javascript/React/United-States), [Angular](https://trends.builtwith.com/framework/Angular), vb. araçların ES Modules desteklemeye başlamalarının çok uzun zaman almayacağını da belirteyim. Tek ihtiyacımız olan şey ES Modules uyumlu bir entry file’ının çıktı olarak alınmasıydı. (Bu konuda [Vue.js](https://github.com/vuejs/vue/blame/4f81b5db9ab553ca0abe0706ac55ceb861344330/package.json#L6)’i tebrik etmek lazım! 👏🏿) [Hala](https://www.skypack.dev/view/angular) [desteklemeyenler](https://www.skypack.dev/view/react) için [sykpack](https://docs.skypack.dev/#whats-old-is-new-again) gibi package CDN’lerini kullanmanızı tavsiye ederim.

Özetle işin ucu şuraya dayanıyor: paket bağımlılıklarınızı ek olarak iş mantığınızı işleyen koda ekleyip bundle’lar çıkartarak çalışmak yerine, runtime’da geliştirmenizi yapıp, hiç geliştirme ortamınızı terk etmeden aynı ortam ile canlıya çıkmanız da mümkün diyebiliriz. Her gün bir build-time zamanını zaten yeterince bundler tanrılarına kurban ediyoruz; bu sefer de geliştirici deneyimine katkıda bulunan bir özellik ile geliştirme yapmak eminim geliştirme sürecini daha zevkli hale getirecektir. Sadece tarayıcılarda değil, farklı ortam ve platformlarda da çalışan uygulamaları yazdığımız her gün “tek bir yerde (dosyada) yaz, hemen çalıştır” demek (aşağıdaki örnekteki gibi) çok da zor olmamalı, degil mi?

Mesela preact kullanarak ES Modules özelliğinden faydalanarak bir uygulama yazmaya başladınız. Ben [burada](https://blog.logrocket.com/why-and-how-to-use-snowpack-instead-of-webpack/) [snowpack](https://www.snowpack.dev/) [kullanıyorum](https://blog.logrocket.com/snowpack-vs-webpack/), siz aralarından seçtiğiniz ş[u](https://parceljs.org/), ş[u](https://github.com/preactjs/wmr) veya ş[u](https://github.com/vitejs/vite) tool’u tercih ederek geliştirme yapabilirsiniz.

```
npx create-snowpack-app app --template @snowpack/app-template-preact --use-npm && cd ./app && npm start
```![](https://miro.medium.com/max/984/1*s8oJw6O7T5YfT6tUxIpLUg.png)Terminaliniz şu çıktıyı verdiğinde hazırsınız demektir. 👌![](https://miro.medium.com/max/1400/1*ztZ5iIefotFoW7cn4YqkPQ.png)App.js dosyası 👍![](https://miro.medium.com/max/422/1*z9m4iDMfask83YdO50M05Q.png)Tarayıcıdakı sonuç 🎉

**public** dizinindeki index.html’in içeriğine baktığınızda göreceğiniz şu satır ile kodunuz tarayıcıda koşmaya hazır:

```
<script type="module" src="/\_dist\_/index.js"></script>
```

`_dist_`dizini içindeki dosyayi bundle edilmiş kod olarak kabul edebilirsiniz. snowpack'in burada yaptığı şey, geliştirdiğiniz kodu ilgili package'lar ile size browser ortaminda direk run edebileceginiz hale [getirmesi](https://github.com/snowpackjs/snowpack/blob/c929b04a27a73b431aff7bfc707b90a0d5e8945a/snowpack/src/build/file-urls.ts#L8). Farkı, bunu ekstra eklenti olmadan yapıyor olması ve ES Modules-native bir dosya çıkartması. Örneğin, `index.js`dosyasını herhangi bir HTML dosyasında ya da bir JS istediginiz tool'u kullanabilir, hatta hicbir tool'a bagimli olmadan gelistirmenizi [yapabilirsiniz](https://docs.skypack.dev/skypack-cdn/code/javascript#getting-started).

Eğer kodu production’da run edecekseniz skypack’in her package için sunduğu [pinned url’leri](https://docs.skypack.dev/skypack-cdn/api-reference/pinned-urls-optimized) kullanmamız tavsiye ediliyor. Yukarıdaki kodun direk olarak browser’dan çalışan halini merak ediyorsanız, buyrun burada:

![](https://miro.medium.com/max/1400/1*vAF6oWH2peC4SrpukfRX9g.png)meşhur index.html

Ben deployment step’ini [Vercel](https://vercel.com/) uzerinden konfigüre ettim. Yapmanız gereken _Settings_ ⇒ _Build & Development Settings_ kısmına giderek _Build_ **npm run snowpack:build** ile değiştirmeniz. Ardından her bir master’a merge işleminizde deploy ettiginiz kodunuz **public** dizininden canlıya alınacaktır. Eğer custom bir distribution dizininin var ise, onu da _Output Directory_’de belirtebilirsiniz, aksi durumda sorunsuz çalışacaktır.

Geçişi nasıl yapsak?
====================

ES Modules çoktan birçok tarayıcı tarafından desteklendiğinden bundler kullanarak geliştirme yapmaktan uzaklaşıp kodunuzda daha modern bir yaklaşım benimsemek için, kod tabanınızın ihtiyaçlarına uygun olarak bir [strateji](https://jasonformat.com/modern-script-loading/) izleyebilirsiniz. Bu konuda (örn.) Rollup ile [başlayıp](https://bundlers.tooling.report/output-module-formats/es-modules/), kodu küçük islem parçalarına bölüp kucuk migration’lar yapmak her bir feature’ınızı module dönüştürmenizi sağlayabilir. Veya direk olarak kodunuzu ES modules export’u alabileceğiniz herhangi bir tool uzerinden uygulamalarınıza entegre edebilirsiniz.

Geliştirme deneyiminizi böyle arttırırken aynı zamanda domain-specific ürünlerinizi başka uygulamalarınıza kod tabanındaki küçük konfigürasyon değişiklikleriyle ekleyeceğiniz ES Modules desteğiyle entegre edebilirsiniz. Bu konuda şu [örneği](https://github.com/kjartanm/microfrontends/blob/master/packages/home/index.html) verebilirim. Özellikle son zamanlarda framework ve tool’lar arası çakışmaların sadece özel kod çatılarıyla çözülebildiği günümüzde temiz bir entegrasyon sunan ES Modules’ün [microfrontend](https://github.com/rajasegar/awesome-micro-frontends#frameworks) yaklaşımında nasıl yardımcı bir araç haline gelebildiğini göreceksiniz. Eminim _production.like.bla.bla.bla.config.js_ dosyalarından kurtulduğunuza sevinirken, artan geliştirme tatmini ile iş odaklanmanızı saglayabilirsiniz.

Takımca yaptığınız [grooming](http://www.yilmazcihan.com/product-backlog-refinement-grooming-nedir/) oturumlarında, [guild](https://achardypm.medium.com/agile-team-organisation-squads-chapters-tribes-and-guilds-80932ace0fdc) toplantılarında, kahve sohbetlerinizde bu konudan bahsedip arkadaşlarınızın konudan heyecan duymasını saglayabilir, birlikte çeşitli inisiyatifler yaratarak mevcut kod tabanınızı ES Modules üzerinden kolaylıklar yeniden tasarlayabilirsiniz. Böylece belki de _lead-by-example_ için bir konu bulmuşsunuzdur.

Patronu / yöneticinizi [burada](https://web.dev/publish-modern-javascript/) detaylarıyla anlatılan [EStimator](http://estimator.dev/)’dan alacağınız raporu kullanarak bu modern web paradigmasını kullanmak için ikna etmeye başlayabilirsiniz.

![](https://miro.medium.com/max/1400/1*_7zI3FQkgJ1L7AD5QRHJOQ.png)

Bütün bunlara ek olarak, bir sure once [Kjaer](https://github.com/Kjaer/) ile birlikte yayına aldığımız [buildless.site](https://buildless.site/)’a ([awesome-buildless](https://github.com/hwclass/awesome-buildless) üzerinden) göndereceğiniz repo/ornek/makale vb. kaynaklarla destek verebilir, modern web teknolojilerini etrafınıza ve geliştirme dünyasının geri kalanına yaymaya yardımcı olabilirsiniz. Aynı firmada calıştığımız dönemde konu ile ilgili hazırladığımız sunuma da [buradan](https://slides.com/kjaer/deck-7d99d4) ulaşabilirsiniz.

![](https://miro.medium.com/max/1400/1*Q-Mc4pyjt-dU5erG_8m3Cg.png)[

buildless.site
--------------

### A collection of sites, apps, packages, articles and other stuff about ES modules.

buildless.site

](https://buildless.site/)[

hwclass/awesome-buildless
-------------------------

### A collection of sites, apps built based on & packages, articles and other stuff about ES modules …

github.com

](https://github.com/hwclass/awesome-buildless)

Umarım yazılım geliştirme süreçlerinizde size yardımcı olacak bir yaklaşım ile tanıştırmışımdır. Destek ve tartışmayı yaymak icin paylaşabilir, bana [twitter](https://www.twitter.com/hwclass) ya da [linkedin](https://www.linkedin.com/in/hwclass) üzerinden ulaşabilirsiniz. Diğer yazılarıma da [hwclass.dev](https://hwclass.dev)’den okumanız mümkün.

Zaman ayırıp okuduğunuz için teşekkürler. Geri bildirimlerinizi sabırsızlıkla bekliyorum. 👋