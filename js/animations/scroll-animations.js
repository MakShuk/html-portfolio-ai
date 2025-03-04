function initScrollAnimations() {
  // Настройка анимаций для различных секций
  setupHeroAnimations();
  setupAboutAnimations();
  setupPortfolioAnimations();
  setupExperienceAnimations();
  setupContactAnimations();
}

// Анимации для Hero секции
function setupHeroAnimations() {
  const heroContent = document.querySelector('.hero-section .col-lg-6');
  if (heroContent) {
    heroContent.setAttribute('data-aos', 'fade-right');
    heroContent.setAttribute('data-aos-delay', '200');
    heroContent.setAttribute('data-aos-duration', '1000');
  }
}

// Анимации для секции "Обо мне"
function setupAboutAnimations() {
  // Анимация фото
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    aboutImage.setAttribute('data-aos', 'fade-right');
    aboutImage.setAttribute('data-aos-duration', '1000');
  }

  // Анимация карточек навыков
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', `${index * 100}`);
    card.setAttribute('data-aos-duration', '800');
  });
}

// Анимации для секции портфолио
function setupPortfolioAnimations() {
  // Анимация фильтров
  const filters = document.querySelector('.portfolio-filters');
  if (filters) {
    filters.setAttribute('data-aos', 'fade-down');
    filters.setAttribute('data-aos-duration', '800');
  }

  // Анимация проектов
  const projects = document.querySelectorAll('.portfolio-item');
  projects.forEach((project, index) => {
    project.setAttribute('data-aos', 'fade-up');
    project.setAttribute('data-aos-delay', `${index * 100}`);
    project.setAttribute('data-aos-duration', '800');
  });
}

// Анимации для секции опыта
function setupExperienceAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    const direction = index % 2 === 0 ? 'fade-right' : 'fade-left';
    item.setAttribute('data-aos', direction);
    item.setAttribute('data-aos-duration', '1000');
    item.setAttribute('data-aos-delay', `${index * 150}`);
  });
}

// Анимации для контактной формы
function setupContactAnimations() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.setAttribute('data-aos', 'fade-up');
    contactForm.setAttribute('data-aos-duration', '1000');
  }
}

// Наблюдатель за появлением элементов
function createScrollObserver() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Наблюдаем за всеми элементами с классом fade-up
  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });
}

// Инициализация всех анимаций
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  createScrollObserver();

  // Обновление AOS при динамическом добавлении контента
  const mutationObserver = new MutationObserver(() => {
    AOS.refresh();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
});