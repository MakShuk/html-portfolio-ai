function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbar) return;

    // Обработка прокрутки
    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Добавляем класс scrolled при прокрутке
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Скрываем/показываем навбар при прокрутке вверх/вниз
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
            // Прокрутка вниз
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll;
    }

    // Активация пунктов меню при прокрутке
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            const currentScroll = window.pageYOffset;

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (targetLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрываем мобильное меню
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Плавная прокрутка с учетом высоты навбара
                const targetPosition = targetSection.offsetTop - navbar.offsetHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Обновляем URL
                history.pushState(null, '', targetId);
            }
        });
    });

    // Анимация гамбургер-меню
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            navbarToggler.classList.toggle('active');
        });
    }

    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navbar.contains(e.target);
        
        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Обработка изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Если окно большое и меню открыто, закрываем его
            if (window.innerWidth > 991 && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }, 250);
    });

    // Анимация индикатора активного пункта меню
    function createNavIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        navbar.appendChild(indicator);

        function updateIndicator(link) {
            const rect = link.getBoundingClientRect();
            indicator.style.width = `${rect.width}px`;
            indicator.style.left = `${rect.left}px`;
        }

        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                updateIndicator(link);
            }

            link.addEventListener('mouseenter', () => {
                updateIndicator(link);
            });

            link.addEventListener('mouseleave', () => {
                const activeLink = document.querySelector('.nav-link.active');
                if (activeLink) {
                    updateIndicator(activeLink);
                }
            });
        });
    }

    // Инициализация индикатора после загрузки страницы
    if (window.innerWidth > 991) {
        createNavIndicator();
    }
}

// Добавляем стили для гамбургер-меню
const style = document.createElement('style');
style.textContent = `
    .navbar-toggler.active .navbar-toggler-icon {
        background: transparent;
    }

    .navbar-toggler.active .navbar-toggler-icon::before {
        transform: rotate(45deg);
        top: 0;
    }

    .navbar-toggler.active .navbar-toggler-icon::after {
        transform: rotate(-45deg);
        bottom: 0;
    }

    .navbar-toggler .navbar-toggler-icon,
    .navbar-toggler .navbar-toggler-icon::before,
    .navbar-toggler .navbar-toggler-icon::after {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);