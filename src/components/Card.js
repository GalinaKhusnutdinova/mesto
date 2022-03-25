export default class Card {
  constructor(item, cardTemplateSelector, handleCardClick) {
    this._elementsTemplate =
      document.querySelector(cardTemplateSelector).content;
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
  }

  _likeElement = () => {
    this._likeButton.classList.toggle("elements__group_active");
  };

  _deleteElement = () => {
    this._newItem.remove();
    this._newItem = null;
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._likeElement);
    this._deleteButton.addEventListener("click", this._deleteElement);
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  createCard() {
    //нашли
    this._newItem = this._elementsTemplate
      .querySelector(".elements__element")
      .cloneNode(true);
    this._cardImage = this._newItem.querySelector(".elements__image");
    this._likeButton = this._newItem.querySelector(".elements__group");
    this._deleteButton = this._newItem.querySelector(".popup__delete-button");

    //заполнили
    this._cardImage.src = this._link;
    this._newItem.querySelector(".elements__title").textContent = this._name;
    this._cardImage.alt = this._name;

    //подписались
    this._setEventListeners();

    return this._newItem;
  }
}
