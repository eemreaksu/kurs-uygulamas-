# 📚 Course App

Modern ve kullanıcı dostu bir **Kurs Yönetim Uygulaması**. Bu proje; kurs ekleme, listeleme ve silme işlemlerini yapabilen, **LocalStorage destekli** ve **Dark Mode** özelliğine sahip bir frontend uygulamasıdır.

---

## 🚀 Özellikler

* ➕ Yeni kurs ekleme (Başlık, Eğitmen, Görsel)
* 🗑️ Kurs silme
* 💾 LocalStorage ile kalıcı veri saklama
* 🌙 Dark / Light Mode geçişi
* 🎨 Modern ve responsive tasarım
* 🧱 ES6 Class yapısı
* ⚡ Bootstrap 4 + Font Awesome ikonlar

---

## 🛠️ Kullanılan Teknolojiler

* **HTML5**
* **CSS3** (Modern UI + Dark Mode)
* **JavaScript (ES6)**
* **Bootstrap 4.1.3**
* **Font Awesome 6**
* **LocalStorage API**

---

## 📁 Proje Dosya Yapısı

```
Course-App/
│
├── index.html        # Ana HTML dosyası
├── styles.css        # Tüm stil ve Dark Mode tanımları
├── appES6.js         # Uygulama mantığı (Course, UI, Storage)
├── darkmode.js       # Dark Mode toggle işlemleri
└── img/              # Kurs görselleri
```

---

## ⚙️ Kurulum ve Çalıştırma

1. Projeyi klonla veya indir
2. Dosyaları aynı klasörde tut
3. `index.html` dosyasını tarayıcıda aç

> ⚠️ Sunucuya ihtiyaç yoktur. Proje tamamen **frontend** çalışır.

---

## 🧠 JavaScript Mimarisi

### 📌 Course Class

Her bir kursu temsil eder.

```js
new Course(title, instructor, image)
```

* `courseId` otomatik üretilir
* Kurs bilgilerini tutar

---

### 📌 UI Class

Kullanıcı arayüzü işlemlerini yönetir:

* Kursu tabloya ekleme
* Kurs silme
* Form temizleme
* Alert mesajları gösterme

---

### 📌 Storage Class

LocalStorage işlemlerini yönetir:

* Kursları kaydetme
* Kursları silme
* Sayfa yenilendiğinde kursları geri yükleme

---

## 🌙 Dark Mode

* Sağ üstteki **Dark Mode** butonu ile açılıp kapanır
* `body.dark-mode` class'ı üzerinden kontrol edilir
* Tema geçişi JavaScript ile yapılır

```js
document.body.classList.toggle("dark-mode");
```

---

## 📸 Ekran Görüntüsü 

> ![alt text](image.png)


---

## ✨ Geliştirme Fikirleri

* ✏️ Kurs düzenleme (Edit)
* 🔍 Arama / Filtreleme
* 🌈 Tema tercihini LocalStorage'da saklama
* 📱 Daha gelişmiş mobil tasarım
* 🧪 Form validasyonlarının artırılması

---

## 👨‍💻 Geliştirici

⭐ Proje Sadık Turan hocanın eğitiminden faydalanılmıstır
