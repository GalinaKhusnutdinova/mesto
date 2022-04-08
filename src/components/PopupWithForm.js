import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._formSaveButton = this._popup.querySelector(".popup__save-button");
    this._textButton = this._formSaveButton.textContent;

    this._formInputs = [...this._form.querySelectorAll(".popup__item")];
    this._formValues = {};
  }

  _getInputValues() {
    this._formInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  changeSubmitForm(newFormSubmit) {
    this._callbackSubmitForm = newFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formSaveButton.textContent = "Сохранение...";
    }
  }

  open() {
    super.open();
    this._formSaveButton.textContent = this._textButton;
  }
}
