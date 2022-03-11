import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
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
const popupCloseButtonAddPhoto = document.querySelector(
  ".popup__close-button_add-photo"
);
const formAddPhoto = document.querySelector(".popup__form_add-photo");
const elements = document.querySelector(".elements");
const popupCloseButtonLoockPhoto = document.querySelector(
  ".popup__button-image_loock-photo"
);
const popupImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupFigureLoockPhoto = document.querySelector(".popup_type_loock-photo");

const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__message_active",
  errorClass: "popup__item_error",
};

const editProfileValidator = new FormValidator(
  enableValidation,
  formProfilEdit
);
const AddPhotoValidator = new FormValidator(enableValidation, formAddPhoto);

editProfileValidator.enableValidation();
AddPhotoValidator.enableValidation();

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupOverleyer);
}

function closePopupEsc(event) {
  if (event.key == "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupOverleyer(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupOverleyer);
}

function openPopupProfileEdit() {
  editProfileValidator.resetErrors();
  openPopup(popupProfileEdit);
  insertInputsValuePopupProfileEdit();
}

function closePopupProfileEdit() {
  closePopup(popupProfileEdit);
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
popupCloseButton.addEventListener("click", closePopupProfileEdit);
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

function renderCreateCard(item) {
  const card = new Card(item, ".elements__template", openPopupFigureloock);
  const cardElement = card.createCard();

  renderCard(cardElement, elements);
}

render();

function openPopupAddPhoto() {
  AddPhotoValidator.resetErrors();
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
  nameImgInput.value = "";
  linkImgInput.value = "";

  const button = popupTypeAddPhoto.querySelector(".popup__save-button");
  button.setAttribute("disabled", "");
  button.classList.add("popup__save-button_inactive");
}

function closePopupFigureloock() {
  closePopup(popupFigureLoockPhoto);
}

popupCloseButtonLoockPhoto.addEventListener("click", closePopupFigureloock);
profileAddButton.addEventListener("click", openPopupAddPhoto);
popupCloseButtonAddPhoto.addEventListener("click", closePopupAddPhoto);
formAddPhoto.addEventListener("submit", handleCardFormSubmit);
