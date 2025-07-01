// Функционал вертикального слайдера

// Текущий активный слайд (начинаем с 0)
let currentSlide = 0;
// Получаем все элементы слайдов
const slides = document.querySelectorAll('.slide');
// Получаем все точки-индикаторы
const dots = document.querySelectorAll('.slider-dot');

// Функция показа конкретного слайда
function showSlide(n) {
    // Скрываем все слайды (удаляем класс active)
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Удаляем активный класс у всех точек
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Обновляем текущий слайд с проверкой границ
    // (n + slides.length) % slides.length - позволяет "зациклить" слайдер
    currentSlide = (n + slides.length) % slides.length;
    
    // Показываем текущий слайд (добавляем класс active)
    slides[currentSlide].classList.add('active');
    // Активируем соответствующую точку
    dots[currentSlide].classList.add('active');
}

// Автоматическая смена слайдов каждые 5 секунд
setInterval(() => {
    showSlide(currentSlide + 1); // Переход к следующему слайду
}, 5000);

// Обработка кликов по точкам-индикаторам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index); // Показываем слайд, соответствующий точке
    });
});


// Функционал слайдера FAQ (часто задаваемых вопросов)

// Текущий активный слайд FAQ
let currentFaqSlide = 0;
// Все слайды FAQ
const faqSlides = document.querySelectorAll('.faq-slide');
// Все точки-индикаторы FAQ
const faqDots = document.querySelectorAll('.faq-dot');
// Контейнер слайдера FAQ
const faqSlider = document.querySelector('.faq-slider');
    
// Функция показа слайда FAQ
function showFaqSlide(n) {
    // Вычисляем новый индекс слайда с проверкой границ
    currentFaqSlide = (n + faqSlides.length) % faqSlides.length;
    // Сдвигаем слайдер по горизонтали
    faqSlider.style.transform = `translateX(-${currentFaqSlide * 100}%)`;
    
    // Обновляем активные точки-индикаторы
    faqDots.forEach((dot, index) => {
        // Добавляем класс active только текущей точке
        dot.classList.toggle('active', index === currentFaqSlide);
    });
}
    
// Автоматическая смена слайдов FAQ каждые 5 секунд
setInterval(() => {
    showFaqSlide(currentFaqSlide + 1); // Переход к следующему слайду
}, 5000);
    
// Обработка кликов по точкам FAQ
faqDots.forEach(dot => {
    dot.addEventListener('click', () => {
        // Показываем слайд, соответствующий data-атрибуту точки
        showFaqSlide(parseInt(dot.getAttribute('data-slide')));
    });
});

// Функционал гамбургер-меню (для мобильных устройств)

// Получаем элементы меню
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

// Обработчик клика по гамбургеру
hamburger.addEventListener('click', () => {
    // Переключаем класс active у гамбургера и меню
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Блокируем прокрутку страницы при открытом меню
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    });
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    // Если клик был не по меню и не по гамбургеру
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
});

// Кнопка "Наверх"
function initBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализируйте при загрузке страницы
document.addEventListener('DOMContentLoaded', initBackToTopButton);

document.addEventListener('DOMContentLoaded', function() {
            const bookingForm = document.getElementById('bookingForm');
            const confirmationModal = document.getElementById('confirmationModal');
            const modalCloseBtn = document.querySelector('.modal-close');
            const modalConfirmBtn = document.getElementById('modalCloseBtn');
            const destinationSelect = document.getElementById('destination');
            const otherDestinationGroup = document.getElementById('otherDestinationGroup');
            
            // Показ/скрытие поля для другого направления
            destinationSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherDestinationGroup.style.display = 'block';
                } else {
                    otherDestinationGroup.style.display = 'none';
                }
            });
            
            // Обработка отправки формы
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    showConfirmation();
                }
            });
            
            // Закрытие модального окна
            modalCloseBtn.addEventListener('click', closeModal);
            modalConfirmBtn.addEventListener('click', closeModal);
            
            // Закрытие при клике вне модального окна
            confirmationModal.addEventListener('click', function(e) {
                if (e.target === confirmationModal) {
                    closeModal();
                }
            });
            
            // Валидация формы
            function validateForm() {
                let isValid = true;
                const requiredFields = bookingForm.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.style.borderColor = 'red';
                        isValid = false;
                    } else {
                        field.style.borderColor = '#ddd';
                    }
                });
                
                // Проверка email
                const email = document.getElementById('email');
                if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    email.style.borderColor = 'red';
                    isValid = false;
                    alert('Пожалуйста, введите корректный email');
                }
                
                // Проверка телефона
                const phone = document.getElementById('phone');
                if (phone.value && !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(phone.value)) {
                    phone.style.borderColor = 'red';
                    isValid = false;
                    alert('Пожалуйста, введите корректный номер телефона');
                }
                
                // Проверка другого направления
                if (destinationSelect.value === 'other' && !document.getElementById('otherDestination').value.trim()) {
                    document.getElementById('otherDestination').style.borderColor = 'red';
                    isValid = false;
                    alert('Пожалуйста, укажите направление');
                }
                
                return isValid;
            }
            
            // Показать подтверждение
            function showConfirmation() {
                // Получаем данные из формы
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const date = document.getElementById('date').value;
                const duration = document.getElementById('duration').value;
                const people = document.getElementById('people').value;
                const comments = document.getElementById('comments').value;
                
                // Определяем направление
                let destination = destinationSelect.value;
                if (destination === 'other') {
                    destination = document.getElementById('otherDestination').value;
                }
                
                // Форматируем дату
                const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                // Форматируем продолжительность
                let durationText = duration + ' дней';
                if (duration === '1') durationText = '1 день';
                if (duration === '2' || duration === '3' || duration === '4') durationText = duration + ' дня';
                
                // Форматируем количество человек
                let peopleText;
                switch(people) {
                    case '1': peopleText = '1 человек'; break;
                    case '2': peopleText = '2 человека'; break;
                    case '3': peopleText = '3-4 человека'; break;
                    case '5': peopleText = '5-6 человек'; break;
                    case '10': peopleText = '7-10 человек'; break;
                    case 'group': peopleText = 'Группа (10+ человек)'; break;
                    default: peopleText = people;
                }
                
                // Заполняем модальное окно
                document.getElementById('confirmName').textContent = name;
                document.getElementById('confirmDestination').textContent = destination;
                document.getElementById('confirmDate').textContent = formattedDate;
                document.getElementById('confirmDuration').textContent = durationText;
                document.getElementById('confirmPeople').textContent = peopleText;
                document.getElementById('confirmEmail').textContent = email;
                
                if (comments.trim()) {
                    document.getElementById('confirmComments').textContent = 'Ваши пожелания: ' + comments;
                } else {
                    document.getElementById('confirmComments').textContent = '';
                }
                
                // Показываем модальное окно
                confirmationModal.style.display = 'flex';
            }
            
            // Закрыть модальное окно
            function closeModal() {
                confirmationModal.style.display = 'none';
                bookingForm.reset();
                otherDestinationGroup.style.display = 'none';
            }
        });

        // Скрипт для выпадающего меню при наведении
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все пункты меню
    const navItems = document.querySelectorAll('nav ul li');
    
    // Для каждого пункта меню
    navItems.forEach(item => {
        // Проверяем, есть ли у пункта вложенное меню
        const submenu = item.querySelector('ul');
        
        if (submenu) {
            // Добавляем обработчики событий для вложенного меню
            item.addEventListener('mouseenter', function() {
                submenu.style.display = 'block';
            });
            
            item.addEventListener('mouseleave', function() {
                submenu.style.display = 'none';
            });
        }
    });
});

// Анимация иконок контактов
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы иконок
    const phoneIcon = document.querySelector('.contact-item-vertical:nth-child(1) .contact-icon-container');
    const emailIcon = document.querySelector('.contact-item-vertical:nth-child(2) .contact-icon-container');
    
    // Анимация для иконки телефона (покачивание)
    phoneIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(-15deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(15deg)';
        }, 200);
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 400);
    });
    
    // Анимация для иконки email (прыжок)
    emailIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            this.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Дополнительная анимация при клике на телефон
    phoneIcon.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
        
        // Копирование номера телефона в буфер обмена
        const phoneNumber = document.querySelector('.contact-item-vertical:nth-child(1) .contact-text-combined').textContent;
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                const originalText = phoneIcon.innerHTML;
                phoneIcon.innerHTML = '<svg class="contact-icon-large" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
                setTimeout(() => {
                    phoneIcon.innerHTML = originalText;
                }, 1000);
            });
    });
    
    // Дополнительная анимация при клике на email
    emailIcon.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
        
        // Копирование email в буфер обмена
        const email = document.querySelector('.contact-item-vertical:nth-child(2) .contact-text-combined').textContent;
        navigator.clipboard.writeText(email)
            .then(() => {
                const originalText = emailIcon.innerHTML;
                emailIcon.innerHTML = '<svg class="contact-icon-large" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
                setTimeout(() => {
                    emailIcon.innerHTML = originalText;
                }, 1000);
            });
    });
});

// Скрипт для анимации появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScrollElements = document.querySelectorAll(
        '.service-card, .benefit-item, .paradise-content, .why-cyprus-section, .limassol-section, .about-container, .faq-slide'
    );

    // Функция проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Функция анимации
    function animateElements() {
        animateOnScrollElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animate')) {
                el.classList.add('animate');
            }
        });
    }

    // Инициализация - скрываем элементы перед анимацией
    animateOnScrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Запускаем при загрузке и при скролле
    animateElements();
    window.addEventListener('scroll', animateElements);
});

// Интерактивная карта Кипра
document.addEventListener('DOMContentLoaded', function() {
    const cyprusMap = document.querySelector('.cyprus-map-container');
    
    // Создаем карту только если есть контейнер
    if (cyprusMap) {
        // Добавляем SVG карту Кипра
        cyprusMap.innerHTML = `
            <svg class="cyprus-map" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <!-- Контур Кипра -->
                <path class="map-land" d="M100,50 L150,30 L200,40 L250,30 L300,50 L320,100 L300,150 L250,200 L200,220 L150,200 L100,150 Z"/>
                
                <!-- Города (точки) -->
                <circle class="city-point" cx="120" cy="100" data-city="nicosia" r="8"/>
                <circle class="city-point" cx="180" cy="80" data-city="limassol" r="8"/>
                <circle class="city-point" cx="150" cy="150" data-city="larnaka" r="8"/>
                <circle class="city-point" cx="80" cy="120" data-city="paphos" r="8"/>
                
                <!-- Подписи городов (появятся при наведении) -->
                <text class="city-label" x="120" y="90" text-anchor="middle" data-city="nicosia">Nicosia</text>
                <text class="city-label" x="180" y="60" text-anchor="middle" data-city="limassol">Limassol</text>
                <text class="city-label" x="150" y="140" text-anchor="middle" data-city="larnaka">Larnaka</text>
                <text class="city-label" x="80" y="110" text-anchor="middle" data-city="paphos">Paphos</text>
            </svg>
            
            <div class="city-info-box"></div>
        `;

        // Стилизация через JavaScript (можно вынести в CSS)
        const style = document.createElement('style');
        style.textContent = `
            .cyprus-map {
                width: 100%;
                height: auto;
                max-width: 500px;
                margin: 0 auto;
                display: block;
            }
            .map-land {
                fill: #f5f5f5;
                stroke: #ddd;
                stroke-width: 2;
                transition: fill 0.3s;
            }
            .city-point {
                fill: #4a6fa5;
                stroke: #fff;
                stroke-width: 2;
                cursor: pointer;
                transition: all 0.3s;
            }
            .city-point:hover {
                fill: #ff7e5f;
                r: 10;
            }
            .city-label {
                font-size: 12px;
                fill: #333;
                font-weight: bold;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .city-info-box {
                position: absolute;
                background: white;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                max-width: 250px;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);

        // Интерактивность
        const cityPoints = document.querySelectorAll('.city-point');
        const cityLabels = document.querySelectorAll('.city-label');
        const infoBox = document.querySelector('.city-info-box');
        
        // Данные о городах
        const cityData = {
            nicosia: {
                title: "Nicosia",
                description: "Столица Кипра, важный экономический и культурный центр.",
                population: "330,000",
                popular: "Старый город, музеи"
            },
            limassol: {
                title: "Limassol",
                description: "Второй по величине город, известный морским портом и фестивалями.",
                population: "235,000",
                popular: "Марина, винные фестивали"
            },
            larnaka: {
                title: "Larnaka",
                description: "Третий по величине город с международным аэропортом и пляжами.",
                population: "145,000",
                popular: "Соляное озеро, набережная Финикудес"
            },
            paphos: {
                title: "Paphos",
                description: "Курортный город с античными достопримечательностями.",
                population: "35,000",
                popular: "Археологический парк, бухта Афродиты"
            }
        };

        // Обработчики событий
        cityPoints.forEach(point => {
            const city = point.getAttribute('data-city');
            
            point.addEventListener('mouseenter', () => {
                // Подсвечиваем точку
                point.setAttribute('r', '10');
                
                // Показываем подпись
                document.querySelector(`.city-label[data-city="${city}"]`).style.opacity = '1';
                
                // Показываем инфобокс
                infoBox.innerHTML = `
                    <h4>${cityData[city].title}</h4>
                    <p>${cityData[city].description}</p>
                    <p><strong>Население:</strong> ${cityData[city].population}</p>
                    <p><strong>Что посетить:</strong> ${cityData[city].popular}</p>
                `;
                infoBox.style.opacity = '1';
                
                // Позиционируем инфобокс
                const rect = point.getBoundingClientRect();
                infoBox.style.left = `${rect.left + window.scrollX}px`;
                infoBox.style.top = `${rect.top + window.scrollY - 120}px`;
            });
            
            point.addEventListener('mouseleave', () => {
                point.setAttribute('r', '8');
                document.querySelector(`.city-label[data-city="${city}"]`).style.opacity = '0';
                infoBox.style.opacity = '0';
            });
            
            point.addEventListener('click', () => {
                // Можно добавить переход к соответствующему разделу
                alert(`Вы выбрали ${cityData[city].title}!`);
            });
        });
    }
});