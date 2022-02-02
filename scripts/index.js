const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup_type_profil");
const formElement = document.querySelector(".popup__form");
const nameInput = document.getElementById("first-name");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const jobInput = document.getElementById("prof");

function openPopup(event) {
  event.preventDefault();
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

//5 спринт
const profileAddButton = document.querySelector(".profile__add-button");
const linkImgInput = document.getElementById("link-img");
const nameImgInput = document.getElementById("name-img");
const popupTypeAddPhoto = document.querySelector(".popup_type_add-photo");
const popupCloseButtonAddPhoto = document.querySelector(
  ".popup__close-button_add-photo"
);
const formElementAddPhoto = document.querySelector(".popup__form_add-photo");
const initialCards = [
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
const elementsTemplate = document.querySelector(".elements__template").content;
const elements = document.querySelector(".elements");
//let elementsTitle = document.querySelector(".elements__title");
const elementsGroupButton = document.querySelector(".elements__group");
const popupSaveButton = document.querySelector(".popup__save-button");

function render() {
  initialCards.forEach(renderItem);
}

//function createCard(item) {
//const newItem = elementsTemplate.cloneNode(true);

//newItem.querySelector(".elements__image").src = item.link;
//newItem.querySelector(".elements__title").textContent = item.name;
//newItem.querySelector(".elements__image").alt = item.name;

//elementsGroup.addEventListener("click", likeElement);
//popupDeleteButton.addEventListener("click", deliteElement);
//elementsImage.addEventListener("click", openPopupFigureloock);

//return item;
//}
//render();

//function renderItem(data) {
//const item = createCard(data);
//elements.prepend(item);
//}

function renderItem(item) {
  const newItem = elementsTemplate.cloneNode(true);

  newItem.querySelector(".elements__image").src = item.link;
  newItem.querySelector(".elements__title").textContent = item.name;
  newItem.querySelector(".elements__image").alt = item.name;
  newItem
    .querySelector(".elements__group")
    .addEventListener("click", likeElement);
  newItem
    .querySelector(".popup__delete-button")
    .addEventListener("click", deliteElement);
  newItem
    .querySelector(".elements__image")
    .addEventListener("click", (event) => {
      openPopupFigureloock(event, item);
    });

  elements.prepend(newItem);
}

render();

function openPopupAddPhoto(event) {
  event.preventDefault();
  popupTypeAddPhoto.classList.add("popup_opened");
}

function closePopupAddPhoto() {
  popupTypeAddPhoto.classList.remove("popup_opened");
}

function formSubmitHandlerAddPhoto(evt) {
  evt.preventDefault();
  const el = { name: nameImgInput.value, link: linkImgInput.value };
  renderItem(el);

  closePopupAddPhoto();
}

const popupFigureLoockPhoto = document.querySelector(".popup_type_loock-photo");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupImage = document.querySelector(".popup__image");

function openPopupFigureloock(event, item) {
  event.preventDefault();

  popupFigureLoockPhoto.classList.add("popup_opened");

  //const elementsTitle = document.querySelector(".elements__title");
  //const elementsImage = document.querySelector(".elements__image");

  (popupImage.alt = item.name),
    (popupImage.src = item.link),
    (popupFigcaption.textContent = item.name);

  //popupImage.src = elementsImage.src;
  //popupImage.alt = elementsImage.alt;
  //popupFigcaption.textContent = elementsTitle.textContent;
}

const popupCloseButtonLoockPhoto = document.querySelector(
  ".popup__button-image_loock-photo"
);

function closePopupFigureloock() {
  popupFigureLoockPhoto.classList.remove("popup_opened");
}

//const elementsImage = document.querySelector(".elements__image");

//elementsImage.addEventListener("click", openPopupFigureloock);

popupCloseButtonLoockPhoto.addEventListener("click", closePopupFigureloock);
profileAddButton.addEventListener("click", openPopupAddPhoto);
popupCloseButtonAddPhoto.addEventListener("click", closePopupAddPhoto);
formElementAddPhoto.addEventListener("submit", formSubmitHandlerAddPhoto);

//удаление элемента
//const popupDeleteButton = document.querySelector(".popup__delete-button");

function deliteElement(event) {
  event.target.closest(".elements__element").remove();
}

//popupDeleteButton.addEventListener("click", deliteElement);

//настраиваем лайки
const elementsGroup = document.querySelector(".elements__group");

function likeElement(event) {
  event.preventDefault();
  event.target.classList.toggle("elements__group_active");
}

//elementsGroup.addEventListener("click", likeElement);
