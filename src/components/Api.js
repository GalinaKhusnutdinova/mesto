class Api {
  constructor(settings) {
    this._settings = settings;
  }

  getProfile() {
    return fetch(this._settings.baseUrl + "/users/me", {
      headers: this._settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(this._settings.baseUrl + "/cards", {
      headers: this._settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile(name, about) {
    return fetch(this._settings.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._settings.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Errorr: ", err);
      });
  }

  addNewCard(name, link) {
    return fetch(this._settings.baseUrl + "/cards", {
      method: "POST",
      headers: this._settings.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Errorr: ", err);
      });
  }

  deleteCard(id) {
    return fetch(this._settings.baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        console.log(res);
      });
  }

  deleteLike(id) {
    return fetch(this._settings.baseUrl + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this._settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        console.log(res);
      });
  }
  addLike(id) {
    return fetch(this._settings.baseUrl + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this._settings.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        console.log(res);
      });
  }

  editAvatarProfile(link) {
    return fetch(this._settings.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._settings.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Errorr: ", err);
      });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "30d87b7f-295d-4117-804d-85c019cdba1c",
    "Content-Type": "application/json",
  },
});
