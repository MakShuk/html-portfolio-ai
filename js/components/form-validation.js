function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitButton = form.querySelector('button[type="submit"]');

    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Функция валидации поля
    function validateField(input, validationFn) {
        const field = input.parentElement;
        const feedback = field.querySelector(`.${validationFn(input.value) ? 'valid' : 'invalid'}-feedback`);

        input.classList.remove('is-valid', 'is-invalid');
        input.classList.add(validationFn(input.value) ? 'is-valid' : 'is-invalid');

        // Анимация иконки валидации
        if (feedback) {
            feedback.style.display = 'block';
            feedback.style.animation = 'fadeIn 0.3s ease';
        }
    }

    // Функции проверки для каждого поля
    const validators = {
        name: (value) => value.length >= 2,
        email: (value) => emailRegex.test(value),
        message: (value) => value.length >= 10
    };

    // Сообщения об ошибках
    const errorMessages = {
        name: 'Имя должно содержать минимум 2 символа',
        email: 'Введите корректный email адрес',
        message: 'Сообщение должно содержать минимум 10 символов'
    };

    // Добавление элементов обратной связи
    function addFeedbackElements(input, errorMessage) {
        const field = input.parentElement;
        
        // Создаем элементы обратной связи, если их еще нет
        if (!field.querySelector('.valid-feedback')) {
            const validFeedback = document.createElement('div');
            validFeedback.className = 'valid-feedback';
            validFeedback.textContent = 'Отлично!';
            field.appendChild(validFeedback);
        }
        
        if (!field.querySelector('.invalid-feedback')) {
            const invalidFeedback = document.createElement('div');
            invalidFeedback.className = 'invalid-feedback';
            invalidFeedback.textContent = errorMessage;
            field.appendChild(invalidFeedback);
        }
    }

    // Добавляем элементы обратной связи для каждого поля
    addFeedbackElements(nameInput, errorMessages.name);
    addFeedbackElements(emailInput, errorMessages.email);
    addFeedbackElements(messageInput, errorMessages.message);

    // Валидация в реальном времени
    nameInput.addEventListener('input', () => validateField(nameInput, validators.name));
    emailInput.addEventListener('input', () => validateField(emailInput, validators.email));
    messageInput.addEventListener('input', () => validateField(messageInput, validators.message));

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверяем все поля перед отправкой
        const isNameValid = validators.name(nameInput.value);
        const isEmailValid = validators.email(emailInput.value);
        const isMessageValid = validators.message(messageInput.value);

        validateField(nameInput, validators.name);
        validateField(emailInput, validators.email);
        validateField(messageInput, validators.message);

        // Если все поля валидны
        if (isNameValid && isEmailValid && isMessageValid) {
            submitButton.disabled = true;
            const originalText = submitButton.innerHTML;

            // Анимация загрузки
            submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="ms-2">Отправка...</span>
            `;

            try {
                // Здесь будет логика отправки формы
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Успешная отправка
                submitButton.classList.add('success');
                submitButton.innerHTML = `
                    <i class="fas fa-check me-2"></i>
                    Отправлено!
                `;

                // Анимация успеха
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message mt-3';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle text-success fs-1 mb-2"></i>
                    <p class="mb-0">Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.</p>
                `;
                form.appendChild(successMessage);

                // Очищаем форму
                form.reset();
                document.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });

                // Восстанавливаем кнопку через 3 секунды
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                    submitButton.innerHTML = originalText;
                    successMessage.remove();
                }, 3000);

            } catch (error) {
                // Обработка ошибки
                submitButton.classList.add('error');
                submitButton.innerHTML = `
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Ошибка отправки
                `;

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('error');
                    submitButton.innerHTML = originalText;
                }, 3000);
            }
        }
    });
}