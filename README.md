# Sprint Challenge: İleri Seviye Web Uygulamaları
Bu challenge'da örnekte verilen mantığı uygulayacaksınız (https://advanced-apps-articles.herokuapp.com/).



## Proje Kurulumu

- Fork, klon, ve `npm install`. Başka kütüphaneye gerek yok
- `npm run dev` le projeyi çalıştırın.
- `http://localhost:3000`.
- Testler için `npm run test -- --watchAll` komutunu kullanmanız gerekmektedir.
- Yerel test dosyaları `codegrade_mvp.test.js` ve `Spinner.test.js`.


## Prototip üzerine çalışmak

Yukarıda bağlantısı verilen canlı prototipi açın ve aşağıdakileri kullanarak işlevselliğini inceleyin 

**Chrome Dev Tools**:
- **Elements tab** kullanıcı arayüzüyle etkileşim kurarken işlenen tam DOM'u gösterir. Metinlere bakın, aynı zamanda class adlarına da bakın.
- **Network tab** HTTP mesajlarını gösterir. "Payload", istemciden gelen istek yükünü (varsa) gösterir ve "Preview", sunucudan gelen yanıt yükünü gösterir.
- **Redux Extension tab** uygulama state'ini ve kullanıcı etkileşiminde tetiklenen eylemleri gösterir. Bu eylemler genellikle payload taşır, ancak her zaman değil.

## API dökümanı

Uç noktaların işlevleri:

- `[POST] http://localhost:9000/api/login`
  - Payloadda şunlara ihtiyaç duyuyor: `username`, `password`
  - Örnek payload: `{ "username": "foo", "password": "12345678" }`
  -  `username` >= 3 karakter, ve `password` >= 8 karakter, trim yapmayı unutmayın
  - Uygun bir isteğe verilen yanıt, "200 OK" ve auth token belirtecini içerir
- `[GET] http://localhost:9000/api/articles`
  - Request headerı `Authorization` değerine auth token'ı göndermeniz lazım
  - Uygun bir isteğe verilen yanıt, "200 OK" ve boş olabilecek makalelerin bir listesini içerir.
- `[POST] http://localhost:9000/api/articles`
  - Request headerı `Authorization` değerine auth token'ı göndermeniz lazım
  - Şu değerleri içeren bir payload: `title`, `text`, `topic`
  - `title` ve `text` >= 1 karakter olmalı, trim yapmayı unutmayın
  - `topic` in şu 3 değerden birine sahip olması lazım: `React`, `JavaScript`, `Node`
  - Örnek payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - Uygun bir isteğe verilen yanıt, "201 Oluşturuldu", bir başarı mesajı ve yeni makaleyi içerir
- `[PUT] http://localhost:9000/api/articles/:article_id`
  - Request headerı `Authorization` değerine auth token'ı göndermeniz lazım
  - Payload içeriği: `title`, `text`, `topic`
  - `title` ve `text` uzunluğu >= 1 olmalı, trimi unutmayın
  -  `topic` şu 3 değerden biri olmalı: `React`, `JavaScript`, `Node`
  - Örnek payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - Uygun bir isteğe verilen yanıt, "200 OK", bir başarı mesajı ve güncellenmiş makaleyi içerir
- `[DELETE] http://localhost:9000/api/articles/:article_id`
  - Request headerı `Authorization` değerine auth token'ı göndermeniz lazım
  - Uygun bir isteğe verilen yanıt, "200 OK" ve bir başarı mesajı içerir

❗ Projeye başlamadan önce tüm bu uç noktaları [Postman](https://www.postman.com/downloads/) ile test edin. (Böylece BAckend'e de girmiş oluyoruz ;) )

## MVP

Bu projeyi tamamlamak için aşağıdaki modülleri düzeltmeniz gerekir:

- [frontend/axios/index.js](frontend/axios/index.js)
- [frontend/components/App.js](frontend/components/App.js)
- [frontend/components/LoginForm.js](frontend/components/LoginForm.js)
- [frontend/components/Articles.js](frontend/components/Articles.js)
- [frontend/components/ArticleForm.js](frontend/components/ArticleForm.js)

Bu modülde Spinner bileşenini de test etmelisiniz:

- [frontend/components/Spinner.test.js](frontend/components/Spinner.test.js)

### NOTLAR

- Yukarıda bağlantısı verilen modüllerin her birinin içindeki özel talimatları ve ipuçlarını bulun.
- DOM'un yapısı prototipinkiyle eşleşmelidir: mevcut class adlarını, idleri vb. kaldırmamaya dikkat edin.
- Bileşenlerin çoğu, hangi propları -ve hangi veri türlerini- beklediklerini açıklamak için en altta bir prop-types bildirimi içerir.
- Karşılanmayan prop-type beklentileri, konsolda propların eksik olduğunu veya yanlış türde veri olduğunu bildiren uyarılara neden olur.
- Uygulamanın işlevselliğini prototipinkine mümkün olduğunca yaklaştırmaya çalışın. Bunların tümü otomatik testlerin kapsamında değildir.

## MVP Kısa Açıklaması

❗ TÜM TESTLER GEÇMELİ
