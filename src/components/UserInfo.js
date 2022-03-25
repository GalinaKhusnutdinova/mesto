export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }
  // возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
