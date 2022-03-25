import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const formInputs = [...this._form.querySelectorAll(".popup__item")];
    const formValues = {};
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", () => {
      this._callbackSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
