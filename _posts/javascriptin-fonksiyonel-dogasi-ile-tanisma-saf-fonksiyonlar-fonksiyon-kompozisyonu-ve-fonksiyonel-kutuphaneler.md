---
title: "Javascript’in Fonksiyonel Doğası ile Tanışma: Saf Fonksiyonlar, Fonksiyon Kompozisyonu ve Fonksiyonel Kütüphaneler"
excerpt: "Node.js'yi nasıl kuracağımızı, gerekli paketleri eklemek için npm (Node Package Manager) kullanmayı ve yerleşik HTTP paketi ile web sunucusunu nasıl çalıştıracağımızı öğrenerek işe başladık."
coverImage: '/assets/blog/javascriptin-fonksiyonel-dogasi-ile-tanisma-saf-fonksiyonlar-fonksiyon-kompozisyonu-ve-fonksiyonel-kutuphaneler/cover.png'
date: '2023-09-29T17:08:46.924Z'
author:
  name: "Baris Guler"
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/javascriptin-fonksiyonel-dogasi-ile-tanisma-saf-fonksiyonlar-fonksiyon-kompozisyonu-ve-fonksiyonel-kutuphaneler/cover.png'
---

Bu hafta, JavaScript Temelleri kursunun son derslerini tamamladık ve altı haftalık bu harika serüveni noktaladık. Bu iki gün boyunca, temel fonksiyonel programlama kavramlarına derinlemesine daldık. Katılımcılarla birlikte öğrendik ve öğretirken bir yandan kendimi de geliştirme fırsatı buldum.

![](/assets/blog/javascriptin-fonksiyonel-dogasi-ile-tanisma-saf-fonksiyonlar-fonksiyon-kompozisyonu-ve-fonksiyonel-kutuphaneler/course.png)

**Saf Fonksiyonlar (Pure Functions):** İşe temiz başladık. Saf fonksiyonlar, her zaman aynı girdilerle aynı çıktıyı üreten fonksiyonlar. Bu, kodumuzun daha tahmin edilebilir ve hata ayıklamasının daha kolay hale gelmesini sağliyor. Bu açıdan fonksiyonel programlamaya bakmak fayda sağladığından bu konunun katılımcılar tarafından doğru anlaşılmasına özen gösterdim.

**Fonksiyon Kompozisyonu (Function Composition):** Hemen ardından kodu daha okunabilir ve yeniden kullanılabilir hale getiren ve birden fazla fonksiyonu birleştirerek daha büyük ve karmaşık işlemleri gerçekleştirme yeteneğini sağlayan fonksiyon kompoze etme yöntemine değindik.

**State Paylaşımından Kaçınma (Avoiding State Share) ve State Güncellemesinden Kaçınma (Avoiding State Update):** State'in kontrolünü kaybetmemek için bu 2 (iki) kavrama örneklerle gözattık. Bu, uygulamalarımızı daha güvenli ve sürdürülebilir kılması açısından global scope'taki paylaşılmış state'i hiç mutate etmeden jenerik fonksiyonlarla yeni kopyalarını yaratmaya odaklanmamızı sağladı.

![](/assets/blog/javascriptin-fonksiyonel-dogasi-ile-tanisma-saf-fonksiyonlar-fonksiyon-kompozisyonu-ve-fonksiyonel-kutuphaneler/code.png)

**Yan Etkiler (Side Effects):** Yan etkileri anladık ve bunları nasıl azaltabileceğimizi öğrendik. Bu, kodumuzun daha tutarlı hale gelmesine yardımcı olduğundan böylece sürprizsiz yazılım akışlarının nasıl yaratılabileceğine değinmiş olduk.

**Dekleratif ve İmperatif Programlama (Declarative and Imperative Programming):** İki farklı programlama yaklaşımını karşılaştırdık. Deklaratif programlama, daha açık ve anlaşılır kod yazmamıza yardımcı olduğundan ve bir iş mantığının o işi 'nasıl' değil 'ne' ile çözdüğüne olan vurgum oturumlar boyunca devam etti.

**Yüksek Seviye Fonksiyonlar (Higher Order Functions) ve Closure'lar:** Bu güçlü kavramların hangi durumlarda işe yarayacağından ve kodun 'ince ayar' seviyesindeyken bakımının nasıl yapılabileceğinden bahsettim.

![](/assets/blog/javascriptin-fonksiyonel-dogasi-ile-tanisma-saf-fonksiyonlar-fonksiyon-kompozisyonu-ve-fonksiyonel-kutuphaneler/private-scope.png)

Ayrıca, **[Lodash](https://lodash.com/)** ve **[Ramda](https://ramdajs.com/)** gibi iki fonksiyonel kütüphane üzerinde çalışmalar yaptık. Bu kütüphaneler, kodunuzu daha verimli ve hızlı hale getirdiklerinden özellikle spesifik bazı durumlarda kodun daha okunabilir ve dekleratif hale getirmeye yardımcı olabileceklerinden de bahsettik.

Bu altı haftalık serüveni tamamlamaktan büyük keyif aldım ve hem öğrenme hem de öğretme açısından büyük bir ilerleme kaydettiğimi hissediyorum. Bu deneyim, daha fazla öğrenme ve öğretme fırsatlarına açık olduğumun bir göstergesi. Öğrendiklerimizi paylaşmaktan ve bu teknik konuları keşfetmekten de ayrıca büyük mutluluk duyuyorum.

Bu harika yolculuğa katılan herkese teşekkür ederim. İlerleyen dönemlerde araştırdığım ve yıllardır bilgi sahibi olduğum / olacağım konular hakkında daha fazlasını keşfetmek üzere daha da derinleşmek için sabırsızlık duyuyorum. Okuduğunuz için teşekkür ederim!

#JavaScript #FunctionalProgramming #ProgrammingConcepts #WebDevelopment