let profileEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let popupSaveButton = document.querySelector(".popup__save-button");

function openPopup(event) {
  event.preventDefault();
  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

// Находим форму в DOM
let formElement = document.querySelector(".popup__container");
let nameInput = document.getElementById("first-name");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let jobInput = document.getElementById("prof");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}
console.log(nameInput.value);
formElement.addEventListener("submit", formSubmitHandler);
popupSaveButton.addEventListener("click", closePopup);

popup.addEventListener("click", function (event) {
  if (event.defaultPrevented) {
    closePopup();
  }
});
//popup.addEventListener("click", function (e) {
//  e.preventDefault();
//});
