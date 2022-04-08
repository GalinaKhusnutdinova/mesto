export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__message_active",
  errorClass: "popup__item_error",
};
export const avatarButton = document.querySelector(".profile__photo");
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const popupProfileEdit = document.querySelector(
  ".popup_type_profil-edit"
);
export const formProfilEdit = document.querySelector(
  ".popup__form_profil-edit"
);
export const nameInput = document.querySelector(".popup__item_name");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const jobInput = document.querySelector(".popup__item_job");
export const profileAddButton = document.querySelector(".profile__add-button");
export const linkImgInput = document.getElementById("link-img");
export const nameImgInput = document.getElementById("name-img");
export const popupTypeAddPhoto = document.querySelector(
  ".popup_type_add-photo"
);
export const formAddPhoto = document.querySelector(".popup__form_add-photo");
export const elements = document.querySelector(".elements");
export const popupImage = document.querySelector(".popup__image");
export const popupFigcaption = document.querySelector(".popup__figcaption");
export const popupFigureLoockPhoto = document.querySelector(
  ".popup_type_loock-photo"
);
export const popups = document.querySelectorAll(".popup");
export const formValidators = {};
