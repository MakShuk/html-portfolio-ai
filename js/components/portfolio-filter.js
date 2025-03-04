function initPortfolioFilter() {
  const filterContainer = document.querySelector('.portfolio-filters');
  const portfolioContainer = document.querySelector('.portfolio-container');
    
  if (!filterContainer || !portfolioContainer) return;

  // Получаем все кнопки фильтров
  const filterBtns = filterContainer.querySelectorAll('button');
    
  // Добавляем обработчики для кнопок
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Удаляем активный класс у всех кнопок
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
            
      // Получаем категорию из data-атрибута
      const filterValue = this.getAttribute('data-filter');
            
      // Фильтруем проекты
      filterProjects(filterValue);
    });
  });

  // Функция фильтрации проектов
  function filterProjects(category) {
    const projects = portfolioContainer.querySelectorAll('.portfolio-item');
        
    // Добавляем класс для анимации контейнера
    portfolioContainer.classList.add('filtering');
        
    // Задержка для анимации исчезновения
    setTimeout(() => {
      projects.forEach(project => {
        // Если выбраны все проекты или проект соответствует категории
        if (category === '*' || project.classList.contains(category.substring(1))) {
          // Показываем проект
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Скрываем проект
          project.style.opacity = '0';
          project.style.transform = 'scale(0.8)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
            
      // Убираем класс анимации
      setTimeout(() => {
        portfolioContainer.classList.remove('filtering');
      }, 300);
    }, 300);
  }
}

// Функция для открытия модального окна с деталями проекта
function openProjectModal(projectId) {
  const project = document.querySelector(`[data-project-id="${projectId}"]`);
  if (!project) return;

  const modalHtml = `
        <div class="modal fade" id="projectModal${projectId}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${project.dataset.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="project-details">
                            <img src="${project.dataset.image}" class="img-fluid rounded mb-4" alt="${project.dataset.title}">
                            <div class="project-info">
                                <h6>Описание проекта:</h6>
                                <p>${project.dataset.description}</p>
                                <h6>Технологии:</h6>
                                <div class="tech-stack">
                                    ${project.dataset.technologies.split(',').map(tech => 
    `<span class="badge bg-primary">${tech.trim()}</span>`
  ).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ${project.dataset.demoUrl ? 
    `<a href="${project.dataset.demoUrl}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-external-link-alt me-2"></i>Демо
                            </a>` : ''
}
                        ${project.dataset.githubUrl ? 
    `<a href="${project.dataset.githubUrl}" class="btn btn-secondary" target="_blank">
                                <i class="fab fa-github me-2"></i>GitHub
                            </a>` : ''
}
                    </div>
                </div>
            </div>
        </div>
    `;

  // Добавляем модальное окно в DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Инициализируем модальное окно Bootstrap
  const modal = new bootstrap.Modal(document.getElementById(`projectModal${projectId}`));
  modal.show();

  // Удаляем модальное окно после закрытия
  document.getElementById(`projectModal${projectId}`).addEventListener('hidden.bs.modal', function() {
    this.remove();
  });
}