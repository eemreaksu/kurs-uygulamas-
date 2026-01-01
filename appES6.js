/**
 * Course sınıfı - Bir kursu temsil eder.
 * Her kursun benzersiz bir ID'si, başlığı, eğitmeni ve resim dosya adı vardır.
 */
class Course {
    constructor(title, instructor, image) {
        // Rastgele ama yeterince benzersiz bir ID üretir (0-9999 arası)
        this.courseId = Math.floor(Math.random() * 10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

/**
 * UI sınıfı - Kullanıcı arayüzü ile ilgili tüm işlemleri yönetir.
 * Kurs ekleme, silme, form temizleme ve uyarı mesajları gibi görevleri üstlenir.
 */
class UI {
    /**
     * Verilen kurs nesnesini tabloya (course-list) yeni bir satır olarak ekler.
     */
    addCourseToList(course) {
        const list = document.getElementById('course-list');

        const html = `
            <tr>
                <td><img src="img/${course.image}" alt="${course.title}" /></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td>
                    <a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            </tr>
        `;

        list.insertAdjacentHTML('beforeend', html);
    }

    /**
     * Formdaki tüm input alanlarını temizler.
     */
    clearControls() {
        document.getElementById('title').value = '';
        document.getElementById('instructor').value = '';
        document.getElementById('image').value = '';
    }

    /**
     * Tıklanan eleman bir "delete" bağlantısıysa,
     * ilgili tablo satırını DOM'dan kaldırır ve true döner.
     */
    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }
        return false;
    }

    /**
     * Belirtilen mesaj ve tipte (success, warning, danger vb.) bir uyarı gösterir.
     * Uyarı 3 saniye sonra otomatik olarak kaybolur.
     */
    showAlert(message, type) {
        // Önce varsa eski alert'i temizle
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
            </div>
        `;

        const container = document.querySelector('.row');
        container.insertAdjacentHTML('beforebegin', alertHtml);

        // 3 saniye sonra alert'i kaldır
        setTimeout(() => {
            const alertEl = document.querySelector('.alert');
            if (alertEl) alertEl.remove();
        }, 3000);
    }
}

/**
 * Storage sınıfı - localStorage ile kurs verilerinin kalıcı olarak saklanmasını sağlar.
 * Tüm metodlar static olarak tanımlanmıştır çünkü örnek oluşturmaya gerek yoktur.
 */
class Storage {
    /**
     * localStorage'dan kurs listesini alır.
     * Henüz hiç kurs yoksa boş dizi döner.
     */
    static getCourses() {
        const courses = localStorage.getItem('courses');
        return courses ? JSON.parse(courses) : [];
    }

    /**
     * Sayfa yüklendiğinde localStorage'daki tüm kursları UI'ya ekler.
     */
    static displayCourses() {
        const courses = Storage.getCourses();
        const ui = new UI();

        courses.forEach(course => ui.addCourseToList(course));
    }

    /**
     * Yeni bir kursu localStorage'a ekler.
     */
    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    /**
     * Silme bağlantısına tıklanan kursu localStorage'dan kaldırır.
     */
    static deleteCourse(element) {
        if (element.classList.contains('delete')) {
            const id = parseInt(element.getAttribute('data-id'), 10);

            let courses = Storage.getCourses();

            courses = courses.filter(course => course.courseId !== id);

            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }
}

/* ================================================================
   EVENT LISTENER'LAR
   ================================================================ */

// Sayfa tamamen yüklendiğinde localStorage'daki kursları listele
document.addEventListener('DOMContentLoaded', Storage.displayCourses);

// Yeni kurs ekleme formu submit edildiğinde
document.getElementById('new-course').addEventListener('submit', function (e) {
    e.preventDefault();

    // Form alanlarından değerleri al
    const title = document.getElementById('title').value.trim();
    const instructor = document.getElementById('instructor').value.trim();
    const image = document.getElementById('image').value.trim();

    const ui = new UI();

    // Validasyon: Tüm alanlar dolu mu?
    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Lütfen tüm alanları doldurun.', 'warning');
        return;
    }

    // Yeni kurs nesnesi oluştur
    const course = new Course(title, instructor, image);

    // UI'ya ekle
    ui.addCourseToList(course);

    // localStorage'a kaydet
    Storage.addCourse(course);

    // Formu temizle
    ui.clearControls();

    // Başarı mesajı göster
    ui.showAlert('Kurs başarıyla eklendi.', 'success');
});

// Kurs listesinde tıklama (silme işlemi)
document.getElementById('course-list').addEventListener('click', function (e) {
    const ui = new UI();

    // Silme bağlantısına tıklanıp tıklanmadığını kontrol et
    if (ui.deleteCourse(e.target)) {
        // localStorage'dan da sil
        Storage.deleteCourse(e.target);

        ui.showAlert('Kurs silindi.', 'danger');
    }
});