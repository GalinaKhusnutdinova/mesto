import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_profil-edit");
const formProfilEdit = document.querySelector(".popup__form_profil-edit");
const nameInput = document.querySelector(".popup__item_name");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const jobInput = document.querySelector(".popup__item_job");
const profileAddButton = document.querySelector(".profile__add-button");
const linkImgInput = document.getElementById("link-img");
const nameImgInput = document.getElementById("name-img");
const popupTypeAddPhoto = document.querySelector(".popup_type_add-photo");
const formAddPhoto = document.querySelector(".popup__form_add-photo");
const elements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupFigureLoockPhoto = document.querySelector(".popup_type_loock-photo");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__message_active",
  errorClass: "popup__item_error",
};

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(event) {
  if (event.key == "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function openPopupProfileEdit() {
  formValidators["myFormProfileEdite"].resetValidation();
  // editProfileValidator.resetValidation();
  openPopup(popupProfileEdit);
  insertInputsValuePopupProfileEdit();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function insertInputsValuePopupProfileEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

profileEditButton.addEventListener("click", openPopupProfileEdit);
formProfilEdit.addEventListener("submit", handleProfileFormSubmit);

function render() {
  initialCards.forEach(renderCreateCard);
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

const openPopupFigureloock = (name, link) => {
  openPopup(popupFigureLoockPhoto);

  popupImage.alt = name;
  popupImage.src = link;
  popupFigcaption.textContent = name;
};

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, ".elements__template", openPopupFigureloock);
  const cardElement = card.createCard();
  return cardElement;
}
function renderCreateCard(item) {
  const cardElement = createCard(item);
  renderCard(cardElement, elements);
}

render();

function openPopupAddPhoto() {
  formValidators["myFormAddPhoto"].resetValidation();
  // addPhotoValidator.resetValidation();
  openPopup(popupTypeAddPhoto);
}

function closePopupAddPhoto() {
  closePopup(popupTypeAddPhoto);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = { name: nameImgInput.value, link: linkImgInput.value };
  renderCreateCard(card);
  closePopupAddPhoto();
  formAddPhoto.reset();
}

profileAddButton.addEventListener("click", openPopupAddPhoto);
formAddPhoto.addEventListener("submit", handleCardFormSubmit);

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
