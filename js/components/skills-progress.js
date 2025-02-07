function initSkillsProgress() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    // Данные о навыках
    const skills = [
        { name: 'HTML5/CSS3', level: 95, color: '#e34f26' },
        { name: 'JavaScript', level: 90, color: '#f7df1e' },
        { name: 'React', level: 85, color: '#61dafb' },
        { name: 'Bootstrap', level: 90, color: '#7952b3' },
        { name: 'Node.js', level: 80, color: '#339933' },
        { name: 'Git', level: 85, color: '#f05032' }
    ];

    // Создаем HTML для навыков
    const skillsHTML = skills.map(skill => `
        <div class="skill-card" data-aos="fade-up">
            <div class="skill-info">
                <h5 class="skill-name">${skill.name}</h5>
                <span class="skill-percentage">0%</span>
            </div>
            <div class="progress">
                <div class="progress-bar" 
                     role="progressbar" 
                     style="width: 0%; background-color: ${skill.color}" 
                     data-level="${skill.level}">
                </div>
            </div>
        </div>
    `).join('');

    // Добавляем навыки в контейнер
    skillsContainer.innerHTML = skillsHTML;

    // Анимация прогресс-баров
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const percentages = document.querySelectorAll('.skill-percentage');

        progressBars.forEach((bar, index) => {
            const level = parseInt(bar.getAttribute('data-level'));
            
            // Создаем анимацию с помощью GSAP
            gsap.to(bar, {
                width: `${level}%`,
                duration: 1.5,
                ease: "power2.out",
                delay: index * 0.2,
                onUpdate: function() {
                    // Обновляем процент
                    const progress = Math.round(this.progress() * level);
                    percentages[index].textContent = `${progress}%`;
                }
            });
        });
    }

    // Создаем наблюдатель для запуска анимации при появлении в viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    // Начинаем наблюдение за контейнером навыков
    observer.observe(skillsContainer);

    // Добавляем hover эффекты для карточек
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Добавляем анимацию для прогресс-баров при наведении
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        progress.addEventListener('mouseenter', () => {
            const bar = progress.querySelector('.progress-bar');
            gsap.to(bar, {
                brightness: 1.2,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        progress.addEventListener('mouseleave', () => {
            const bar = progress.querySelector('.progress-bar');
            gsap.to(bar, {
                brightness: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Добавляем стили для карточек навыков
const addSkillStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .skill-card {
            background: white;
            padding: 1.5rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
        }

        .skill-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .skill-name {
            margin: 0;
            font-weight: 600;
        }

        .skill-percentage {
            font-weight: 500;
            color: var(--primary);
        }

        .progress {
            height: 10px;
            background-color: var(--light-bg);
            border-radius: 5px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            border-radius: 5px;
            transition: width 0.3s ease;
        }

        [data-theme="dark"] .skill-card {
            background: var(--dark-bg);
        }

        [data-theme="dark"] .progress {
            background-color: rgba(255,255,255,0.1);
        }
    `;
    document.head.appendChild(style);
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    addSkillStyles();
    initSkillsProgress();
});