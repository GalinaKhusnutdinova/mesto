export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
