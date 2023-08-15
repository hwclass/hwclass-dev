---
title: 'Öğreten Projeler için Otopsi Raporları'
excerpt: 'Hiç kimse bir nehirde ikinci kez yıkanamaz. İkinci seferde ne o nehir aynı
  nehirdir, ne de o kişi aynı kişidir. — Herakleitos'
coverImage: '/assets/blog/ogreten-projeler-icin-otopsi-raporlari/cover.webp'
date: '2016-12-27T00:56:55.881Z'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/ogreten-projeler-icin-otopsi-raporlari/cover.webp'
---

Gördüğüm (pardon duyduğum) en iyi takım, Beatles ;)

> Hiç kimse bir nehirde ikinci kez yıkanamaz. İkinci seferde ne o nehir aynı nehirdir, ne de o kişi aynı kişidir. — Herakleitos

Bir süre önce zannedersem Adem İlter’in fikri ile ortaya çıkan heyecan verici bir inisiyatif ile karşılaşmıştım: Z-Raporu. Günlük iş/deneyim serüveninizi logladığınız bu basit akışı ilk duyduğumda aslında deneyim paylaşımının insan türü olarak ne kadar elzem bir noktada durduğunu düşündüğümü hatırlarım. Hala devam eden bir tempoda üretilmese de bugün hala Z-Rapor’larını zevkle okuyorum.

Bir süre aklımdakileri de toparladıktan sonra projelerin içeriği ve gerçekleştirilme sağlığı ile ilgili düşündüğümde neden bu tür paylaşımların proje bazlı kaydının tutulmadığını/loglanmadığını düşündüm. Bunu bir süredir yapanlar olduğuna sevindim ve birkaç link taramasından sonra isminin orjinalde “_postmortem report_” olduğunu ancak aslında projenin sonlarında günah-çıkarma seansları gibi uygulandığını öğrendim. Yani genelde posrtmortem report’lar, proje dead-line ya da GA (General-Available) noktasına ulaştığında yapılan rutin bir dizi ya da birkaç toplantıdan ve bu toplantının notlarından oluşuyormuş.

Ancak benim bahsetmek istediğim daha projelere içkin ve projenin geliştirilmesi sırasında ortaya konan bir dinamiği içeriyor.

O halde,

*   Proje geliştirme dönemleri, bilinenin gerçekleştirildiği süreçler olmalarının yanısıra, öğrenme döngüleriyse,
*   Bunun yanısıra, her bir proje için zaman dilimlerini ne kadar doğru yönetip hedefi yakalayabildiğimiz kadar o projenin başarı ya da başarısızlığından söz edebiliyorsak,
*   Her proje bir deneyim ve bu deneyimler bütünü içi boş bir kavramlar toplamı değil, aksine birey ve gruplar arası aktarılması gereken bir potansiyel taşıyorsa,
*   Tekrar karşılaşılan problemlerin çözümü için tekrar ve tekrar uğraşmak, başta bahsettiğimiz zaman yönetimini de sekteye uğratabilirse,
*   Ve bilgi + deneyim / zamanın çıktısı, ancak o parametrelerin değerleri doğru atanabildiyse gerçekten hedef çıktının kendisiyle arasındaki açı daha da daralır; hedeflenene yaklaştırsa,

Bütün bir deneyimi bir yere kaydetmek işlevli olabilir.

> Mürekkep, en iyi hafızadan daha iyidir. — Bir Çin atasözü

Diyelim ki; bir proje sürecinde bir geliştirici bir sorun ve onun çözümü için bir zaman ayırdı. Aynı zaman ve eforu başka bir geliştiricinin de ortaya koyması da tabii ki aynı süre ve efor ile olmayacak; kimi zaman daha uzun ve sancılı, kimi zaman daha kısa ve acısız olacak. Çok spesifik bir problemin çözümü için masa masa gezilecek, birkaç kod denemesi ve birkaç debug hatası sonrası doğru ya da sonuca ulaştıran ve doğru kabul edilen sonuç, problemin çözümü ilan edilecek.

Burada devreye “Otopsi Raporu” girebilir. Hedefi doğru tanımladığımızı düşündüğümüze göre bu rapor temel olarak neleri kapsamalı?

> Otopsi raporu, bir olay kaydıdır.

O zaman örnekleyelim:

**Örnek vaka:** Webpack (beta) 2 sürümü için elimizdeki config dosyasında önceden Webpack’in 1.14.0 versiyonu için eklenen loader tanımlarını update edemiyoruz.

**Gerekçe:** Webpack 2 update’i ile bundling sırasında tree-shaking özelliğini projeye kazandırabileceğiz. Böylece gereksiz koddan, dolayısıyla boyuttan tasarruf edebileceğiz.

Not: Burada gerekçe, örnek vakaya (yani probleme)bağımlı halde. Böylece bu sorun çözülünce bir diğeri de (yani gerekçe de) hallolacak ya da gerçekleşmeye yaklaşacak demiş oluyoruz.

**Çözüm:**

*   1\. Adım : En son webpack 2 (now ) sürümünü indir:

> npm i webpack@2.1.0-beta.25 & npm i webpack-dev-server@2.1.0-beta.10

*   2\. Adım : Gerekli parametreler ile webpack config dosyasını yarat.
*   3\. Adım : Komutu ya çalıştır, ya da bir npm script’i olarak set et:

> webpack -p

Bu deneyim proje reponuzda tutulabilir ve ayrı bir dizinde (örn. _postmortems_, _otopsi_, vb.) markdown dosyalar halinde, (_resolve\_webpack\_2\_update.md_, vb.) muhafaza edilebilir.

> Hata bir felaket değil, bir öğrenme fırsatıdır.

Bunun için bir de standarda ihtiyacımız var. Her gün öyle veya böyle döküman yazan bir geliştiriciyseniz zaten basit başlıkları olan birkaç satırı karalamak yine birkaç dakikanızı almayacaktır.

Bunu da kabaca bir taslağa dökelim dersek, buyrun:

### Title

ex. Resolve how to update Webpack to version 2 with tree-shaking and other new, stunning features.

### Date

ex. 27.12.2016

### Authors

ex. John Doe, Black Magic Woman, Doctor Who

### Impact

ex. With this new update, we have added the tree-shaking feature for removing redundant codes from our bundled source as Javascript.

### Resolution

*   Step 1: Get the latest webpack 2 (now ) by the package manager: npm i webpack@2.1.0-beta.25 & npm i webpack-dev-server@2.1.0-beta.10
*   Step 2: Create a webpack config file with necessarry parameters.
*   Step 3: Run or define it as an npm script : webpack -p

Not: _Yukarıdaki içeriği İngilizce olarak aktarıyorum çünkü deneyim aktarımının sadece tek uluslu ekiplerde değil birçok çokuluslu ekip ile paylaşılması da gerektiği fikrindeyim._

Bir yazıda başlıklar şu şekilde belirlenmiş. Zannımca başlıkların çeşitliliğini genişletmek veya daraltmak tamamen o takımın inisiyatifinde olmalı:

Bütün bir takımın her gün en az bir adet otopsi raporu yazdığını düşünürsek biten bir proje sonrasında ortaya devasa bir otopsi dökümantasyonu çıkacak. Bütün bu veriyi ayrıca takım-içi brown-bag oturumlarına, hackatonlara ve sunumlara konu bile edilecek ölçüde geniş ve devasa bir deneyim kümesi haline çevirmiş olabiliriz. Hatta basit bir içerik yönetim uygulamasıyla daha da basitleştirebilir, daha ulaşılabilir kılabiliriz. Belki bunu bir puan sistemine dökmek isteyen yöneticiler olabilir ancak olmamalı çünkü deneyimin birim değeri yoktur. Bir deneyimin birkaç tecrübeden çok fazla faydası olabilir; bir satır bug düzeltmenin 10 modüllük bir feature’dan çok fazla değeri olabileceğini düşünmeniz gerekiyor.

Örn: Checkout sayfasında yanlış hesaplanan bir convertion değeri (mesela 1.00 mı yoksa 1,00 mı; 45.29 mu yoksa 45.99 mu, vb.), giriş ekranındaki slider’da akana imajların resize edilmesi özelliğinden çok daha değerlidir. Nitekim sermaye bizden görseli değil, işlevli görselliği; bizden görüntüyü değil akan bağlantı sayısı içerisinden kar edecek niteliği alıp götürmek ister. Deneyimleri puanlamak yerine onlara değer verin.

Özetle,

*   Otopsi raporu, bir olay akış dinamiğinin nasıl çözüldüğünün raporlanmasıdır.
*   Otopsi raporu, sadece bir döküman değil, çalışanlar arası bir deneyim aktarım biçimidir.
*   Otopsi raporu, projedeki çözüm yöntemleri kümesidir.

O zaman bence aklınızdaki projenin gerçekten yaşayan bir dinamiği içerisinde barındırması için otopsi raporlarını yazmamız, öğretici yönünü arttıran bir niteliğe kavuşturacaktır.

Örnek repo için: [https://github.com/hwclass/postmortem-template/](https://github.com/hwclass/postmortem-template/)

Son söz niyetine; gördüğüm en iyi takım çalışmalarından bir örnek.

**Kaynaklar:**

*   [https://www.wikiwand.com/en/Project\_Management\_Body\_of\_Knowledge](https://www.wikiwand.com/en/Project_Management_Body_of_Knowledge)
*   [https://www.wikiwand.com/en/Postmortem\_documentation](https://www.wikiwand.com/en/Postmortem_documentation)
*   [https://medium.com/production-ready/writing-your-first-postmortem-8053c678b90f#.mo8hbla26](https://medium.com/production-ready/writing-your-first-postmortem-8053c678b90f#.mo8hbla26)
*   [https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.l648c5aw8](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.l648c5aw8)