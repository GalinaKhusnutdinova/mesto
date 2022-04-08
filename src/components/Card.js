export default class Card {
  constructor(
    item,
    userId,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._elementsTemplate =
      document.querySelector(cardTemplateSelector).content;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._userId = userId;
    this._ownerId = item.owner._id;

    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  isLiked() {
    const userCardLike = this._likes.find((user) => user._id === this._userId);

    return userCardLike;
  }

  deleteElement = () => {
    this._newItem.remove();
    this._newItem = null;
  };

  setLikes(newLikes) {
    this._likes = newLikes;

    this._likeNumberElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._addLikeElement();
    } else {
      this._removeLikeElement();
    }
  }

  _addLikeElement = () => {
    this._likeButton.classList.add("elements__group_active");
  };

  _removeLikeElement = () => {
    this._likeButton.classList.remove("elements__group_active");
  };

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._id)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _addDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._newItem.querySelector(".popup__delete-button").style.display =
        "none";
    }
  }

  createCard() {
    //нашли
    this._newItem = this._elementsTemplate
      .querySelector(".elements__element")
      .cloneNode(true);
    this._cardImage = this._newItem.querySelector(".elements__image");
    this._likeButton = this._newItem.querySelector(".elements__group");
    this._deleteButton = this._newItem.querySelector(".popup__delete-button");
    this._likeNumberElement = this._newItem.querySelector(
      ".elements__like-number"
    );
    //заполнили
    this._cardImage.src = this._link;
    this._newItem.querySelector(".elements__title").textContent = this._name;
    this._cardImage.alt = this._name;

    //подписались
    this._setEventListeners();

    this.setLikes(this._likes);

    this._addDeleteButton();

    return this._newItem;
  }
}
