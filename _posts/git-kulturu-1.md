---
title: 'Git Kulturu * 1'
excerpt: 'Genelde bu ve benzeri başlıklarla açılan sayfalarda teknik olarak kaynak kontrolünü nasıl yapacağınız anlatılır. Ben daha çok bunu değil, sosyal olarak ne kattığına dair kafa yoruyorum. Geliştirici dediğiniz kişi sosyal bir hayvansa, eylemi de sosyal olmak zorunda ya da onu sosyalleştirmek zorunda.'
coverImage: '/assets/blog/authors/hwclass.png'
date: '2016-10-04'
author:
  name: Baris Guler
  picture: '/assets/blog/authors/hwclass.png'
ogImage:
  url: '/assets/blog/authors/hwclass.png'
---

Genelde bu ve benzeri başlıklarla açılan sayfalarda teknik olarak kaynak kontrolünü nasıl yapacağınız anlatılır. Ben daha çok bunu değil, sosyal olarak ne kattığına dair kafa yoruyorum. Geliştirici dediğiniz kişi sosyal bir hayvansa, eylemi de sosyal olmak zorunda ya da onu sosyalleştirmek zorunda.

Markafoni’ye ilk geldiğimde git’i hiç kullanmamıştım, daha çok SVN ve TFS gibileriyle zaman geçirmiştim. SVN ve TFS gibi araçlar ile uğraşmıştım ki bunlar da Java community’sinin aşina olduğu şeyler (hala da öyle) ve az çok bir fikrim varsa da bile merakımı gideremiyordum. Siyah ekrana alışmam zamanımı almadı ve giderek aslında çok geç kalınmış bir aydınlanma olduğu fikrine vardım.

Bu kısa zamanda aklımda kalanlar, bir kaynak kontrolünden ziyade aşağıdaki gibi bir iletişim ve basit bir iç sorgulama süreci oldu. Umarım denk düşeriz…

```sh
git status # Neydim, ne oldum!
```

Günde en az 30 kez tok karna alınması gerekir. Son anda nerede bulunduğunuzu, kısaca durumunuzu size verir. Dürüsttür.

```sh
git checkout someBranch # Abi hiç uğraştırma beni!
```

Çalışma arkadaşınızın sizinle olan sorumluluğuna işarettir; kendileri yanılmaz bir doğruluk neferidir. Alın, vazgeçemeyeceksiniz.

```sh
git fetch # Biri bana mı seslendi?
```

Toparlanmanın ilk adımı, soluklanırken sorumluluklarınızı düşündürtür.

```sh
git pull origin master # Başkan, ben yokken neler yapmışsınız öyle?!
```

Poker masasındaki bütün pulları toplatır. Artık sizdedir ve kendinizi bir tüy gibi hafif hissettirir.

```sh
git pull --rebase origin master # Çok merak ettim, artık kaldığım yerden devam etmek istiyorum ama hep birlikte!
```

Dünya değişiyor, devinimin tek sabiti, kendisi. O halde neler değişmiş, değişime ulaşalım, değişimin kendisi olalım.

```sh
git rebase —-continue # Abi, bir bakar mısın; hangisi güncel?
```

Evrildikçe gelişen organizmalar gibiyiz. Haydi bir diğeri gelsin…

```sh
git stash pop # İşte gizli hazinem!
```

Sakladığınız yerden çıkan havlu kenarı oyasıdır. Paylaşımın gizini barındırır.

```sh
git add --all # Bunları gördüklerine sevinecekler ;)
```

Çantamıza koyduklarımız kadarız. Sıkı durun!

```sh
git commit -am ‘Çok iyi oldu, güzel de oldu fixes #123’
```

Sorumluluğun maddi temelinin ilk fişeğini yaktık, geliyorlar.

```sh
git log # Ahh abi, o değildi ya :/ Olsun, bakalım bir çaresine…
```

İnsan, tür olarak hatalar mahsülüdür. Hata yaptıkça daha da güzelleşir. Sevgi Duvarı gibi: “Ne kadar rezil olursak o kadar iyi…”. Korkmayın!

```sh
git reset 0d1d7fc32e5a947fbd92ee598033d85bfc445a50 # Vazgeçtim, bir daha deneyeceğim!
```

İşte o hatanın en umutsuz anından, sabahın en karanlık noktasından sıcak güneş ışınlarına verdik kendimizi.

```sh
git push origin someBranch # Arkadaşlar, bu da benim katkım; mümkün olduğunca…
```

Artık kolektif bir varlık olduğunuzun farkındasınız. O kültür sizde de var.

Bu satırları okurken içinizde az da olsa bir heyecan ışıldadıysa siz de o kültürdensiniz.

Ama unutmamalı: her geliştirici de bir insandır ve insanlar hata yapar.

Not: git blame bana göre değil ;) Düzenin jurnal kültürüne daha yatkın bireyler çok sever. Ben özellikle kullanmam, kendim fix’lerim ya da takımca fix’lenir.

Bir duayenden sonsöz:

> Böyle, bakınca ip gibi olacak!

Şair burada master’dan çıkan dalın tutarlılığından dem vuruyor ve git kültürü, sosyal bir araçtır. Akşamları yalnız içtiğiniz biraya ortak(lar) bile çıkartır, paylaşmaktan sarhoş olursunuz.

Kalın sağlıcakla.