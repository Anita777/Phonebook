import main from './main.js'

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
    });
   }
   requestDelete(arg) {
    return fetch(`${this.url}/${arg._id}`, {
      method: 'DELETE'
    })
  }
  requestPatch(arg) {
    return fetch(`${this.url}/${arg._id}`, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: { "Content-Type": "application/json" },
    });
  }
}
let api = new Api();
export default api;
