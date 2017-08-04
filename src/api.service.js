
class Api {
  constructor() {
    this.url = 'https://easycode-js.herokuapp.com/yoyo/users';
  }
  requestUser() {
    return fetch(this.url).then(data => data.json());
  }
  requestPost(arg) {
    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify(arg),
      headers: { "Content-Type": "application/json" },
    })
    .then(data => {
       main.ui.contacts.requestData();
    })
  }
  requestDelete(arg) {
    fetch(`${this.url}/${arg._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(data => {
       main.ui.contacts.requestData();
    })
  }
  requestPatch(arg) {
    fetch(`${this.url}/${arg._id}`, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: { "Content-Type": "application/json" },
    })
    .then(data => {
       main.ui.contacts.requestData();
    })
  }
}
let api = new Api();
