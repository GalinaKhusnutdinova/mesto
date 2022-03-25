export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._popups = document.querySelectorAll(".popup");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupEsc);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupEsc);
  }

  //_handleEscClose
  _closePopupEsc = (event) => {
    if (event.key == "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
