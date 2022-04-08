export default class Section {
  constructor({ items, renderer }, selectorConteiner) {
    // items = массив с данными карточек
    // this._initialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorConteiner);
  }

  render(res) {
    res.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
