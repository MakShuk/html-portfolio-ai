function initLazyLoading() {
    // Lazy loading для изображений
    setupImageLazyLoading();
    
    // Lazy loading для секций
    setupSectionLazyLoading();
    
    // Оптимизация производительности
    setupPerformanceOptimizations();
}

// Настройка ленивой загрузки изображений
function setupImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(image => {
        imageObserver.observe(image);
    });
}

// Загрузка изображения с эффектом размытия
function loadImage(img) {
    const src = img.getAttribute('data-src');
    
    if (!src) return;

    // Создаем временное изображение для предварительной загрузки
    const tempImage = new Image();
    
    tempImage.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
    };

    tempImage.src = src;
}

// Ленивая загрузка секций
function setupSectionLazyLoading() {
    const sections = document.querySelectorAll('section[data-lazy]');
    
    const sectionOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                loadSection(section);
                observer.unobserve(section);
            }
        });
    }, sectionOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Загрузка содержимого секции
function loadSection(section) {
    const content = section.getAttribute('data-lazy');
    
    if (!content) return;

    // Загружаем контент через AJAX
    fetch(content)
        .then(response => response.text())
        .then(html => {
            section.innerHTML = html;
            section.removeAttribute('data-lazy');
            
            // Инициализируем компоненты в загруженной секции
            initializeLazyLoadedContent(section);
        })
        .catch(error => console.error('Error loading section:', error));
}

// Инициализация компонентов в загруженном контенте
function initializeLazyLoadedContent(section) {
    // Инициализация изображений
    const images = section.querySelectorAll('img[data-src]');
    images.forEach(img => setupImageLazyLoading(img));

    // Инициализация анимаций
    const animatedElements = section.querySelectorAll('[data-aos]');
    AOS.refresh();

    // Инициализация других компонентов
    if (section.classList.contains('portfolio-section')) {
        initPortfolioFilter();
    } else if (section.classList.contains('skills-section')) {
        initSkillsProgress();
    }
}

// Оптимизация производительности
function setupPerformanceOptimizations() {
    // Отложенная загрузка тяжелых скриптов
    function loadDeferredScripts() {
        const deferredScripts = document.querySelectorAll('script[data-defer]');
        
        deferredScripts.forEach(script => {
            const src = script.getAttribute('data-defer');
            if (src) {
                loadScript(src);
            }
        });
    }

    // Загрузка скрипта
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    }

    // Запуск отложенной загрузки после основного контента
    if (document.readyState === 'complete') {
        loadDeferredScripts();
    } else {
        window.addEventListener('load', loadDeferredScripts);
    }

    // Оптимизация событий прокрутки
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                // Обработка событий прокрутки
                AOS.refresh();
            }, 100);
        }
    });

    // Предзагрузка изображений для следующей секции
    function prefetchNextSectionImages() {
        const currentSection = document.querySelector('section.active');
        if (!currentSection) return;

        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            const images = nextSection.querySelectorAll('img[data-src]');
            images.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = src;
                    document.head.appendChild(prefetchLink);
                }
            });
        }
    }

    // Добавляем слушатель для предзагрузки
    document.addEventListener('scrollend', prefetchNextSectionImages);
}

// Добавляем стили для эффекта загрузки
const style = document.createElement('style');
style.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    img.loaded {
        opacity: 1;
    }

    section[data-lazy] {
        min-height: 200px;
        position: relative;
    }

    section[data-lazy]::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        border: 3px solid var(--primary);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        transform: translate(-50%, -50%);
    }

    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initLazyLoading);