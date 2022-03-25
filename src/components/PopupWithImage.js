import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);

    this._popupImage = document.querySelector(".popup__image");
    this._popupFigcaption = document.querySelector(".popup__figcaption");
  }

  open(name, link) {
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupFigcaption.textContent = name;

    super.open();
  }
}
