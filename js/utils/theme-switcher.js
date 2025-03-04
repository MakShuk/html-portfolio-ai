// Функция для установки темы
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
    
  // Обновление иконки
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
}

// Функция для переключения темы
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);

  // Добавляем класс для анимации
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);
}

// Инициализация темы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem('theme');
    
  // Проверяем системные настройки
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
  // Устанавливаем начальную тему
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);
    
  // Добавляем обработчик для кнопки переключения
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
    
  // Следим за системными настройками
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
});