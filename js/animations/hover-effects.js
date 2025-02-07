function initHoverEffects() {
    // Инициализация всех эффектов
    initButtonHoverEffects();
    initCardHoverEffects();
    initImageHoverEffects();
    initLinkHoverEffects();
    init3DHoverEffects();
}

// Эффекты для кнопок
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn:not(.theme-toggle)');
    
    buttons.forEach(button => {
        // Создаем эффект ряби при клике
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });

        // Эффект свечения при наведении
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Эффекты для карточек
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.portfolio-item, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Добавляем эффект блика
            this.style.setProperty('--shine-x', `${x}px`);
            this.style.setProperty('--shine-y', `${y}px`);
            this.classList.add('card-shine');
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--shine-x', `${x}px`);
            this.style.setProperty('--shine-y', `${y}px`);
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            this.classList.remove('card-shine');
        });
    });
}

// Эффекты для изображений
function initImageHoverEffects() {
    const images = document.querySelectorAll('.about-image img, .portfolio-item img');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        image.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// Эффекты для ссылок
function initLinkHoverEffects() {
    const links = document.querySelectorAll('.nav-link, .social-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// 3D эффект при наведении
function init3DHoverEffects() {
    const elements = document.querySelectorAll('[data-tilt]');
    
    elements.forEach(element => {
        let rect = element.getBoundingClientRect();
        let mouseX = 0;
        let mouseY = 0;
        
        element.addEventListener('mouseenter', function(e) {
            rect = this.getBoundingClientRect();
            this.style.transition = 'none';
        });

        element.addEventListener('mousemove', function(e) {
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            
            const xRotation = ((mouseY - rect.height / 2) / rect.height) * 20;
            const yRotation = ((mouseX - rect.width / 2) / rect.width) * 20;
            
            gsap.to(this, {
                rotationX: -xRotation,
                rotationY: yRotation,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease';
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initHoverEffects);

// Добавляем необходимые стили
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    .card-shine {
        position: relative;
        overflow: hidden;
    }

    .card-shine::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle at var(--shine-x) var(--shine-y),
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
        );
        opacity: 0;
        transition: opacity 0.3s;
    }

    .card-shine:hover::before {
        opacity: 1;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);