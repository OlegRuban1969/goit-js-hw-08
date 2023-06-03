import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
//ключ для сохранения и извлечения состояние формы из локального хранилища
const formStateKey = 'feedback-form-state';

// Функция для сохранения состояния формы в локальное хранилище
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(formStateKey, JSON.stringify(formState));
}, 500); // Ограничение обновления состояния формы не чаще, чем раз в 500 миллисекунд

// Функция для восстановления состояния формы из локального хранилища
const restoreFormState = () => {
  const savedFormState = localStorage.getItem(formStateKey);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Обработчик события input для отслеживания изменений в полях формы
const handleInputChange = () => {
  saveFormState();
};

// Обработчик события submit для очистки формы и вывода данных в консоль
const handleSubmit = (event) => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log('Form data:', formState);

  // Очистка формы и локального хранилища
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem(formStateKey);
};

// Восстановление состояния формы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  restoreFormState();
});

// Добавление обработчиков событий
emailInput.addEventListener('input', handleInputChange);
messageInput.addEventListener('input', handleInputChange);
form.addEventListener('submit', handleSubmit);

