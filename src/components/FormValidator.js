export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._button = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(input, errorMessage) {
    const { errorClass, inputErrorClass } = this._settings;

    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(input) {
    const { errorClass, inputErrorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(errorClass);
    errorElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input, input.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    const { inactiveButtonClass } = this._settings;

    if (this._hasInvalidInput()) {
      this._button.setAttribute("disabled", "");
      this._button.classList.add(inactiveButtonClass);
    } else {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);

        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._form.reset();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }
}
