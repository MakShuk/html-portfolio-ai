function initParallax() {
  // Создаем элементы параллакса для hero секции
  createHeroParallax();
    
  // Инициализируем параллакс эффекты при скролле
  initScrollParallax();
    
  // Инициализируем параллакс при движении мыши
  initMouseParallax();
}

// Создание параллакс элементов для hero секции
function createHeroParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const parallaxContainer = document.createElement('div');
  parallaxContainer.className = 'hero-parallax';

  // Создаем плавающие элементы
  for (let i = 0; i < 5; i++) {
    const item = document.createElement('div');
    item.className = 'parallax-item';
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.width = `${20 + Math.random() * 30}px`;
    item.style.height = item.style.width;
    item.style.opacity = '0.1';
    parallaxContainer.appendChild(item);
  }

  hero.appendChild(parallaxContainer);
}

// Параллакс при скролле
function initScrollParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.parallax) || 0.5;
          const rect = element.getBoundingClientRect();
          const viewHeight = window.innerHeight;
                    
          if (rect.top < viewHeight && rect.bottom > 0) {
            const scrolled = window.pageYOffset;
            const parallaxOffset = scrolled * speed;
            element.style.transform = `translateY(${parallaxOffset}px)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Параллакс при движении мыши
function initMouseParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const parallaxItems = hero.querySelectorAll('.parallax-item');
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    // Плавное движение к позиции мыши
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    parallaxItems.forEach((item, index) => {
      const speed = 1 + index * 0.5;
      const x = currentX * speed * 50;
      const y = currentY * speed * 50;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Параллакс для фона секций
function createSectionParallax() {
  const sections = document.querySelectorAll('section[data-bg-parallax]');
    
  sections.forEach(section => {
    const speed = parseFloat(section.dataset.bgParallax) || 0.3;
        
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rect = section.getBoundingClientRect();
            
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        section.style.backgroundPosition = `50% ${yPos}px`;
      }
    });
  });
}

// Плавающие элементы
function createFloatingElements() {
  const elements = document.querySelectorAll('[data-float]');
    
  elements.forEach(element => {
    const amplitude = parseFloat(element.dataset.floatAmplitude) || 20;
    const period = parseFloat(element.dataset.floatPeriod) || 5;
    const start = Date.now();

    function float() {
      const delta = Date.now() - start;
      const offset = amplitude * Math.sin(delta * 2 * Math.PI / (period * 1000));
      element.style.transform = `translateY(${offset}px)`;
      requestAnimationFrame(float);
    }

    float();
  });
}

// Параллакс для изображений
function initImageParallax() {
  const images = document.querySelectorAll('[data-image-parallax]');
    
  images.forEach(image => {
    const container = document.createElement('div');
    container.className = 'parallax-image-container';
    image.parentNode.insertBefore(container, image);
    container.appendChild(image);

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const speed = parseFloat(image.dataset.imageParallax) || 0.5;
            
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = window.pageYOffset;
        const yPos = (rect.top - window.innerHeight) * speed;
        image.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
}

// Инициализация всех параллакс эффектов
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  createSectionParallax();
  createFloatingElements();
  initImageParallax();

  // Обновление эффектов при изменении размера окна
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initParallax();
    }, 250);
  });
});