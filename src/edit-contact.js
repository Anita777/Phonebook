
import api  from './api.service.js'
import main from './main.js'

class EditUser {
  constructor(appState) {
    this.appState = appState;
    this.mainInfo = [ 'name', 'lastname', 'company'];
    this.editInfo = ['phone', 'email', 'address', 'birthday', 'social profile', 'field'];
  }
  createHeader() {
    return  `<header class="header">
    <div class="container top-radius">
      <nav class="user-top-line">
        <a href="user.html" id ="cancel">Cancel</a>
        <a href = "index.html" class="done-btn" id ="done">Done</button>
      </nav>
    </div>
  </header>`;
  }
  createMain() {
   let main = '';
    main += `<main class="main edit-contact" id = "main">
    <div class="container">
      <div class="edit-main-info">
        ${this.createPhoto()}
        <div class="main-info-holder">`;
    main += this.createMainInfo();
    main += this.createEditInfo();
    return main +=
      `  </div>
      </div>
    </div>
  </main>`;
  }
  createPhoto() {
    return `<div class="edit-foto"><img src="images/user_male.png" alt="#" class=" user-img img-circle center-block"></div>`;
  }
  createMainInfo() {
    let infoM = '';
    this.mainInfo.forEach(elem => {
      if (this.appState.db.selectedUser[elem]) {
      infoM += `<div class="edit-field">
            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${this.appState.db.selectedUser[elem]}</label>
            <input type="text" class="delete-btn" id="${elem}" value ="${this.appState.db.selectedUser[elem]}">
          </div>`;
      } else {
        infoM += `<div class="edit-field">
            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${elem}</label>
            <input type="text" class="add-btn" id="${elem}" placeholder="${elem}">
          </div>`;
      }
    })
    return infoM += `</div></div>`;
  }
  createEditInfo() {
  	let infoE = `<div class="scroll-holder">
        <div class="edit-info">`;
    this.editInfo.forEach(elem => {
      if (this.appState.db.selectedUser[elem]) { //disabled
        infoE += `<div class="edit-field">
            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${this.appState.db.selectedUser[elem]}</label>
            <input type="text" class="delete-btn" id="${elem}" value ="${this.appState.db.selectedUser[elem]}">
          </div>`;
      } else {
        infoE += `<div class="edit-field">
            <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${elem}</label>
            <input type="text" class="add-btn" id="${elem}" placeholder="${elem}">
          </div>`;
      }
    });
    return  infoE += `</div>`
  }
  events() {
    this.cancel = document.getElementById('cancel');
    this.done = document.getElementById('done');
    this.main = document.getElementById('main');
    
    this.main.addEventListener('click', e => {
      e.preventDefault();
    });

    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      api.requestPatch(this.appState.db.selectedUser);
    });

    this.done.addEventListener('click', e => {
      e.preventDefault();
      let inputs = [...this.main.getElementsByTagName('input')];
      inputs.forEach(elem => {
        let key = elem.id;
        if (elem.value) {
          this.appState.db.selectedUser[key]= elem.value;
        }
      });
      if (this.appState.db.selectedUser.name && this.appState.db.selectedUser.lastname) {
        this.appState.db.selectedUser.fullName = `${this.appState.db.selectedUser.name} ${this.appState.db.selectedUser.lastname}`
        delete this.appState.db.selectedUser.name;
        delete this.appState.db.selectedUser.lastname;
      }
      api.requestPatch(this.appState.db.selectedUser);
      main.ui.user.render();
    });  
  }
  render() {
    this.app = document.getElementById('app');
    if (this.app) {
      this.app.innerHTML = this.createHeader() + this.createMain();
      this.events();
    } else {
      this.app = document.createElement('div');
      document.body.prepend(this.app);
      this.app.id = 'app';
      this.app.innerHTML = this.createHeader() + this.createMain();
      this.events();
    }
  }
}
export default EditUser