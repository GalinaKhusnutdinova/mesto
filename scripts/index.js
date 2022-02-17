const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupProfileEdit = document.querySelector(".popup_type_profil-edit");
const formProfilEdit = document.querySelector(".popup__form_profil-edit");
const nameInput = document.querySelector(".popup__item_name");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const jobInput = document.querySelector(".popup__item_job");
const popupFigureLoockPhoto = document.querySelector(".popup_type_loock-photo");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupImage = document.querySelector(".popup__image");
const profileAddButton = document.querySelector(".profile__add-button");
const linkImgInput = document.getElementById("link-img");
const nameImgInput = document.getElementById("name-img");
const popupTypeAddPhoto = document.querySelector(".popup_type_add-photo");
const popupCloseButtonAddPhoto = document.querySelector(
  ".popup__close-button_add-photo"
);
const formAddPhoto = document.querySelector(".popup__form_add-photo");
const elementsTemplate = document.querySelector(".elements__template").content;
const elements = document.querySelector(".elements");
const popupCloseButtonLoockPhoto = document.querySelector(
  ".popup__button-image_loock-photo"
);

function closePopupOverleyer(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupEsc(event) {
  if (event.key == "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupOverleyer);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupOverleyer);
}

function openPopupProfileEdit() {
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

function renderCard(card, container) {
  container.prepend(card);
}

function createCard(item) {
  const newItem = elementsTemplate.cloneNode(true);
  const cardImage = newItem.querySelector(".elements__image");
  cardImage.src = item.link;
  newItem.querySelector(".elements__title").textContent = item.name;
  cardImage.alt = item.name;
  newItem
    .querySelector(".elements__group")
    .addEventListener("click", likeElement);
  newItem
    .querySelector(".popup__delete-button")
    .addEventListener("click", deleteElement);
  cardImage.addEventListener("click", () => {
    openPopupFigureloock(item);
  });

  return newItem;
}

function renderCreateCard(item) {
  const card = createCard(item);
  renderCard(card, elements);
}

render();

function openPopupAddPhoto() {
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

function openPopupFigureloock(item) {
  openPopup(popupFigureLoockPhoto);
  popupImage.alt = item.name;
  popupImage.src = item.link;
  popupFigcaption.textContent = item.name;
}

function closePopupFigureloock() {
  closePopup(popupFigureLoockPhoto);
}

popupCloseButtonLoockPhoto.addEventListener("click", closePopupFigureloock);
profileAddButton.addEventListener("click", openPopupAddPhoto);
popupCloseButtonAddPhoto.addEventListener("click", closePopupAddPhoto);
formAddPhoto.addEventListener("submit", handleCardFormSubmit);

function deleteElement(event) {
  event.target.closest(".elements__element").remove();
}

function likeElement(event) {
  event.target.classList.toggle("elements__group_active");
}
