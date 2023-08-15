---
title: 'JS Levels?'
excerpt: 'Bu listeyi ‘library/kütüphane’ ya da ‘framework/çatı’ kullanımını göz önüne alarak hazırlasaydım çok objektif bir değerlendirme yapamayacaktım. Nitekim hangi dil olursa olsun, çatı ya da kütüphanesi yerine dilin kendi öz niteliklerine hakim olmak, o dili gerçekten kullanıyor olmaktan geçiyor ve ‘uzmanlığı’ o tanımlıyor.'
coverImage: '/assets/blog/js-levels/cover.webp'
date: '2016-10-09T20:40:48.615Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/js-levels/cover.webp'
---

Geçenlerde link takibi ile rastladığım bir [_blog post’unda_](http://www.scala-lang.org/old/node/8610) Scala’nın yaratıcısı Martin Odersky, Scala dili için bir yetkinlik derecelendirmesi yapmış. Kendi içerisinde dilin kendisine has niteliklerini referans alarak bir tablo çıkartmış. Peki bunu Javascript için düşündüğümüzde nasıl bir tablo ile karşılaşırız diye kendime sordum ve aklıma gelenleri aşağıdaki gibi toparladım.

Özellikle günümüzde yapılan işin hemen önüne eklendiğini gördüğüm ‘_senyör_’, ‘_majesteleri_’, ‘_master_’, ‘_üstad_’, ‘_lord_’, ‘_ekspert_’, ‘_küçük enişte_’, ‘_Ziya_’, vb. gibi ön ekleri de düşündüğümde zannedersem aklımdakileri böyle bir şema ile en azından diğer geliştiricilerle tartışarak daha da netleştirebileceğim fikrindeyim. Bazı ayrıntıları kaçırmış olabilirim, mazur görün.

Bu listeyi ‘library/kütüphane’ ya da ‘framework/çatı’ kullanımını göz önüne alarak hazırlasaydım çok objektif bir değerlendirme yapamayacaktım. Nitekim hangi dil olursa olsun, çatı ya da kütüphanesi yerine dilin kendi öz niteliklerine hakim olmak, o dili gerçekten kullanıyor olmaktan geçiyor ve ‘uzmanlığı’ o tanımlıyor. “_Abiii, müthiş React yazıyor!_”, “_üstad, Angular’ı yazanlar bu adamı görünce utandılar, vallaha!_”, “_eleman Backbone’u başka birşeye çevirdi, hala anlamak için kodun başında nöbet tutuyoruz!_”, “_Abi, o adama bulaşma; Node.js’e pull request’i var!, gel biz çay demleyelim, gel…_” gibi şeyler kulağıma çok çalındı; seviyorum sizleri :)

Buyrun listemiz…

**Seviye A1 : Başlangıç Seviyesi Uygulama Geliştirici (aka. Beginner)**

*   **Durumlar (statements) ve ifadeler (expressions):** Operatörler, metod kullanımı, şartlar (if, switch, vb.), döngüler, try/catch kullanımı.
*   **Scope kontrolü (Etki alanı kontrolü):** _this_ ile akrobasi.
*   **Bağlam kontrolü (bind, apply, call, vb.):** _Kim kim için, ne ne için._
*   **Geri-bildirim yönetimi:** Callback’ler.
*   **Nesne-yönelimli ve prototip-tabanlı geliştirme yetkinliği (OOP ve Prototypal inheritance):** Temel nesne tabanlı yaklaşımın JS dilindeki karşılığı ile uygulama geliştirebilme yetisi.
*   JSON veri yapısı
*   **Ek 1:** ES2015 jargonu ile import, export, const, let, arrow metodlar.
*   **Ek 2:** Otomatik task yönetimi (automated task management) işini tool’lar (grunt, gulp, broccoli, vb.)ile yapabilir, 0'dan kurmak için uğraşır.
*   **Ek 2:** Donatım araçlarını (webpack, rollbar) bilir, duymuştur ama çok uğraşmamıştır.
*   **Dipnot:** Stack Overflow addict ;)

**Seviye A2 : Orta Seviye Uygulama Geliştirici (aka. Intermediate)**

*   **Hoisting kontrolü:** _var_ mısın, yok musun?
*   **Closure kullanımı:** Scope kontrolü ile aynı değerlendirilebilir ancak aktif ve doğru kullanımını da içerisine ekleyelim.
*   **Currying:** _topla(1)(2); //logs 3_
*   **Diziler:** Map, filter, reduce ve diğerleri ile dizi kontrolleri
*   **Ek 1:** Asenkron Javascript, ya da Promise’ler ve benzerleri.
*   **Ek 2:** ES2015 jargonu ile sınıf (class) ve kalıtım (inheritance).
*   **Ek 3:** Donatım araçlarını bilir
*   **Dipnot 1:** SO’da soru sorar, cevap alır, cevap yazar.
*   **Dipnot 2:** En az bir adet out-of-work projesi vardır ve gözü gibi bakar.

**Seviye A3 : Uzman Seviye Uygulama Geliştirici (aka. Expert)**

*   **Tasarım kalıpları (aka. Design Patterns):** Temelde _observer_, _mediator_, _pub/sub_, _builder_ ve benzeri kalıplar ile uygulama geliştirme.
*   **Fonksiyonel programlama:** Temel prensipleriyle A2'deki Diziler kısmının daha pratik kullanımı diyebiliriz. İçerisine tekrar-kullanılabilir (_reusable_) ve modüler geliştirme de eklenebilir.
*   **Nesne/Metod kompozisyonu:** “_Object Composition_” olarak nitelendirebilir, temelde yetkinliklerin (ya da metod ve nesnelerin özelliklerinin) mixin’ler gibi harmanlanması diyebiliriz.
*   SOLID ve KISS gibi prensipler, onun için hayatidir.
*   **Ek 1:** async/await Yaklaşımı
*   **Ek 2:** noSQL veritabanı yapısı (JSON/BSON veri yapıları)
*   **Dipnot 1:** Birden fazla projesi ile yine birden fazla geliştiricili projeler geliştirir.
*   **Dipnot 2:** npm’e aşinadır.

**Seviye L1 : Başlangıç Seviyesi Kütüphane/Çatı Geliştirici**

*   View katmanı için kütüphane/çatı geliştirme yetisine sahiptir. Dojo, YUI ya da jQuery istemci temelli kütüphanelerle işe yarar küçük kod parçaları düzenlemiş ve yayınlamıştır. Düzenli katkıya devam eder.
*   Tarayıcıların çalışma mantığı ve yönetimi konusunda yeterince bilgilidir.
*   Kodun her noktasının testini de yazar ve coverage değerleri onun için önemlidir. Bunun için araçlar kullanır.
*   Kodunun performansı için çalışmalar yapar, sürekli okur.

**Seviye L2 : Orta Seviye Geliştirici, Ekosistem Kurucu**

*   Ekosistem yaratır. Tek bir katman için değil, birçok katman için uygulama geliştirir.
*   RFC olarak da bir süredir bilinegelen (ya Node.js’teki addon’lar ya da) FFI’ler ile birden fazla dil kullanımını performans için tercih eder.
*   Sunucu tarafı için geliştirdiği kodu koşturur, performans konusuna dikkat eder ve bunun için bir çalışma programına sahiptir.
*   Kaynağını açacağı kodun yönetimini de kendisi yapabilir. Bunun için konferanslarda konuşmalar yapar, diğer projeleri destekler.

**Seviye L3 : İleri Seviye Geliştirici, Uygulama/Yazılım Mimarı**

*   Yaratılan ekosistemleri hem geliştirir, hem yönetir, hem de genişletebilir. Bunun için birden fazla yöntem ve araç kullanır. Aktif kod katkısı çok sağlamayabilir ancak soru sorduğunuzda mutlaka makul bir cevap alırsınız.
*   Geliştirdiği kütüphane ya da çatıyı (hem istemci hem de sunucu tarafları için, farketmez) sürekli desteklemeye özen gösterir.
*   Bulunduğu çalışma ortamında TDD ve çiftli-programlamaya (pair-programming) teşvik eder.
*   Çok meşgul edilmeye gelmez, hep işi vardır ama sevilir, severiz.

Listeye modern Javascript paradigmalarını da ekleyerek daha geleceğe uyumlu hale getirmek istedim. Bunu yaparken ES2015 ve ES2016 spesifikasyonlarına yapılan önerileri de tekrar okumam gerekti.

Bunların dışında en sevdiğim ÇX kategorisi. “Çaylak-Tanımlanamayan” gibi bir şekilde açıklayabileceğim bu seviye, hem öğrenme hırsı hem de paylaşım isteği ile en sevdiğim ancak yukarıda saydığım kategorilerin bütün hepsini de kapsadığını düşündüğüm bir kategori. “_Beni kategorize etme!_” diye çıkıştığımda (Sezen ablaya selamlar!) ÇX ile susturuyorum kendimi, tavsiye ederim; bütün seviyelere bedeldir; er ya da geç bütün kategorilerin hakimi olur. Sadece öğrenme, okuma ve deneme arzusundan birşey yitirmesin.

Bu arada yazıyı yazarken şu albüm bana çok iyi geldi, özellikle bu nadide toplululuğun ilk 4 albümünü tavsiye ederim.

Ezginin Günlüğü — Bahçedeki Sandal (1988)

Umarım yazıdan da zevk almışsınızdır. Okuduğunuz için teşekkür ederim.

Sevgiyle.