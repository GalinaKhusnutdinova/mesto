// Функция, которая добавляет класс с ошибкой
function showInputError(
  { errorClass, inputErrorClass },
  form,
  input,
  errorMessage
) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
}
// Функция, которая удаляет класс с ошибкой
function hideInputError({ errorClass, inputErrorClass }, form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(errorClass);
  errorElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}
// Функция, которая проверяет валидность поля
function checkInputValidity(rest, form, input) {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(rest, form, input, input.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(rest, form, input);
  }
}

function setEventListeners(
  { inputSelector, submitButtonSelector, ...rest },
  form
) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(rest, inputList, button);

  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(rest, form, input);

      // чтобы проверять его при изменении любого из полей
      toggleButtonState(rest, inputList, button);
    });
  });
}

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
    setEventListeners(rest, form);
  });
}

// enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState({ inactiveButtonClass }, inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.setAttribute("disabled", "");
    button.classList.add(inactiveButtonClass);
  } else {
    button.removeAttribute("disabled");
    button.classList.remove(inactiveButtonClass);
  }
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__message_active",
  errorClass: "popup__item_error",
});
