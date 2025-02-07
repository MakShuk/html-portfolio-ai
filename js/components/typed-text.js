function initTypedText() {
    const typedElement = document.querySelector('.typed-text-output');
    if (!typedElement) return;

    // Настройки для анимации печатающегося текста
    const options = {
        strings: [
            'Веб-разработчик',
            'Frontend Developer',
            'UI/UX Энтузиаст',
            'JavaScript Специалист'
        ],
        typeSpeed: 50, // Скорость печати
        backSpeed: 30, // Скорость удаления
        backDelay: 2000, // Задержка перед удалением
        startDelay: 500, // Начальная задержка
        loop: true, // Бесконечный цикл
        cursorChar: '|', // Символ курсора
        smartBackspace: true, // Умное удаление
        autoInsertCss: true, // Автоматическая вставка CSS
        fadeOut: true, // Плавное исчезновение
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500, // Задержка исчезновения
        onBegin: (self) => {
            // Добавляем класс для анимации появления
            typedElement.classList.add('typing');
        },
        onComplete: (self) => {
            // Добавляем класс для индикации завершения
            typedElement.classList.add('typed-done');
        },
        preStringTyped: (arrayPos, self) => {
            // Сбрасываем классы перед началом нового текста
            typedElement.classList.remove('typed-done');
        },
        onStringTyped: (arrayPos, self) => {
            // Добавляем эффект подсветки после завершения строки
            typedElement.classList.add('highlight');
            setTimeout(() => {
                typedElement.classList.remove('highlight');
            }, 500);
        }
    };

    // Инициализация Typed.js
    try {
        const typed = new Typed(typedElement, options);

        // Добавляем обработчик для перезапуска анимации при видимости элемента
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typed.reset();
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(typedElement);

    } catch (error) {
        console.error('Ошибка инициализации Typed.js:', error);
        // Fallback на статический текст
        typedElement.textContent = 'Веб-разработчик';
    }
}