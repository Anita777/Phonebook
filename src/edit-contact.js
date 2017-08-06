import api  from './api.service.js'
import main from './main.js'
class EditUser {
  constructor() {
    this.curFilter = {}
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
      `<div class="edit-field">
            <button href="#" class="delete-contact">delete contact</button>
          </div>
        </div>
      </div>
    </div>
  </main>`;
  }
  createPhoto() {
    return `<div class="edit-foto"><img src="images/user-face-mini.png" alt="#" class=" user-img img-circle center-block"></div>`;
  }
  createMainInfo() {
    let infoM = '';
    this.mainInfo.forEach(elem => {
      if (this.curFilter['0'][elem]) {
      infoM += `<div class="edit-field">
            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${this.curFilter[elem]}</label>
            <input type="text" class="delete-btn" id="${elem}" value ="${this.curFilter['0'][elem]}">
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
      if (this.curFilter['0'][elem]) { //disabled
        infoE += `<div class="edit-field">
            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
            <label class="sr-only" for="${elem}">${this.curFilter['0'][elem]}</label>
            <input type="text" class="delete-btn" id="${elem}" value ="${this.curFilter['0'][elem]}">
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
    this.delete = document.querySelector('.delete-contact');
    this.main = document.getElementById('main');
    
    // убрали прежнее событие 
    this.main.addEventListener('click', e => {
      e.preventDefault();
    });

    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      api.requestPatch(this.curFilter['0']);
      main.ui.user.render(this.curFilter);
    });

    this.delete.addEventListener('click', e => {
      e.preventDefault();
      api.requestDelete(this.curFilter['0']);
      main.ui.contacts.requestData();
    })

    this.done.addEventListener('click', e => {
      e.preventDefault();
      let inputs = [...this.main.getElementsByTagName('input')];
      inputs.forEach(elem => {
        let key = elem.id;
        if (elem.value) {
          this.curFilter['0'][key]= elem.value;
        }
      });
      if (this.curFilter['0'].name && this.curFilter['0'].lastname) {
        this.curFilter['0'].fullName = `${this.curFilter['0'].name} ${this.curFilter['0'].lastname}`
        delete this.curFilter['0'].name;
        delete this.curFilter['0'].lastname;
      }
      api.requestPatch(this.curFilter['0']);
    });  
  }
  render(user) {
    this.curFilter = user
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