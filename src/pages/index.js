import "./index.css"; // добавьте импорт главного файла стилей
import {
  profileEditButton,
  nameInput,
  jobInput,
  profileAddButton,
  config,
  formValidators,
  avatarButton,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, card]) => {
    // тут установка данных пользователя
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.addUserAvatar(userData.avatar);
    userId = userData._id;
    // и тут отрисовка карточек
    section.render(card);
  })

  .catch((err) => {
    // тут ловим ошибку
    console.log(err);
  });

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
  editProfilePopup.renderLoading(true);
  api
    .editProfile(name, job)
    .then((res) => {
      userInfo.setUserInfo(name, job);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("Errorr: ", err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(data) {
  const link = data.link;
  addAvatarPopup.renderLoading(true);
  api
    .editAvatarProfile(link)
    .then((res) => {
      userInfo.addUserAvatar(res.avatar);
      addAvatarPopup.close();
    })
    .catch((err) => {
      console.log("Errorr: ", err);
    })
    .finally(() => {
      addAvatarPopup.renderLoading(false);
    });
}

function insertInputsValuePopupProfileEdit() {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
}

// Добавление карточки
const section = new Section({ renderer: renderCreateCard }, ".elements");

const openPopupFigureloock = (name, link) => {
  popupWithImage.open(name, link);
};

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(
    item,
    userId,
    ".elements__template",
    openPopupFigureloock,
    (id) => {
      deletePhototPopup.open();
      deletePhototPopup.changeSubmitForm(() => {
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteElement();
            deletePhototPopup.close();
          })
          .catch((res) => {
            console.log(res);
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  );

  const cardElement = card.createCard();
  return cardElement;
}

function renderCreateCard(item) {
  // функция renderer
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

const handleCardFormSubmit = (data) => {
  addPhototPopup.renderLoading(true);
  api
    .addNewCard(data.name, data.job)
    .then((res) => {
      renderCreateCard({ ...res, userId });
      closePopupAddPhoto();
    })
    .catch((err) => {
      console.log("Errorr: ", err);
    })
    .finally(() => {
      addPhototPopup.renderLoading(false);
    });
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

// Popup удаления фото
const deletePhototPopup = new PopupWithForm(".popup_type_delete-photo");

// Popup редактирования аватара
const addAvatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  handleAvatarFormSubmit
);

addPhototPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
deletePhototPopup.setEventListeners();
addAvatarPopup.setEventListeners();

function openPopupAddPhoto() {
  formValidators["myFormAddPhoto"].resetValidation();
  addPhototPopup.open();
}

function openPopupAvatar() {
  formValidators["myFormAavatar"].resetValidation();
  addAvatarPopup.open();
}

function closePopupAddPhoto() {
  addPhototPopup.close();
}

avatarButton.addEventListener("click", openPopupAvatar);
profileAddButton.addEventListener("click", openPopupAddPhoto);
profileEditButton.addEventListener("click", openPopupProfileEdit);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
