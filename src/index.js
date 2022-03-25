import "./pages/index.css"; // добавьте импорт главного файла стилей
import {
  initialCards,
  profileEditButton,
  popupProfileEdit,
  formProfilEdit,
  nameInput,
  profileTitle,
  profileSubtitle,
  jobInput,
  profileAddButton,
  linkImgInput,
  nameImgInput,
  popupTypeAddPhoto,
  formAddPhoto,
  elements,
  popupImage,
  popupFigcaption,
  popupFigureLoockPhoto,
  popups,
} from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

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

function openPopupProfileEdit() {
  formValidators["myFormProfileEdite"].resetValidation();
  editProfilePopup.open();
  insertInputsValuePopupProfileEdit();
}

function handleProfileFormSubmit(data) {
  const { name, job } = data;
  userInfo.setUserInfo(name, job);
  editProfilePopup.close();
}

function insertInputsValuePopupProfileEdit() {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
}
// Добавление карточки
const element = new Section(
  { items: initialCards, renderer: renderCreateCard },
  ".elements"
);

const openPopupFigureloock = (name, link) => {
  popupWithImage.open(name, link);
};

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, ".elements__template", openPopupFigureloock);

  const cardElement = card.createCard();
  return cardElement;
}

function renderCreateCard(item) {
  // функция renderer
  const cardElement = createCard(item);
  element.addItem(cardElement);
}

element.render();

const handleCardFormSubmit = (data) => {
  renderCreateCard({
    name: data.name,
    link: data.job,
  });
  closePopupAddPhoto();
};

// Popup просмотра карточки
const popupWithImage = new PopupWithImage(".popup_type_loock-photo");

// Popup редактирования профиля
const editProfilePopup = new PopupWithForm(
  ".popup_type_profil-edit",
  handleProfileFormSubmit
);

// Popup добавления карточки
const addPhototPopup = new PopupWithForm(
  ".popup_type_add-photo",
  handleCardFormSubmit
);

addPhototPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();

function openPopupAddPhoto() {
  formValidators["myFormAddPhoto"].resetValidation();
  addPhototPopup.open();
}

function closePopupAddPhoto() {
  addPhototPopup.close();
}

profileAddButton.addEventListener("click", openPopupAddPhoto);
profileEditButton.addEventListener("click", openPopupProfileEdit);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});
