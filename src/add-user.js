
import main from './main.js'
import api  from './api.service.js'
class AddUser {
  constructor() {
    this.addUser = {};
    this.mainInfo = ['name', 'lastname', 'company'];
    this.editInfo = ['phone', 'email', 'address', 'birthday', 'social profile', 'field'];
  }
  createHeader() {
    return `<header class="header">
        <div class="container top-radius">
          <nav class="user-top-line">
            <a href="user.html" id = "cancel">Cancel</a>
              <button class="done-btn" id = "done">Done</button>
          </nav>
        </div>
    </header>`;
  }
  transferNumber(value) {
    return value.replace(/(\d{1})(\d{2})(\d{2})(\d{2})/, '($1$2)-$3-$4-');
  }
  createMain() {
  return `<main class="main"><div class="container">
			<div class="edit-main-info">${this.createPhoto()}${this.createMainInfo()}</div>${this.createEditInfo()}
			</div>
		</main>`
  }
  createPhoto() {
    return  `<div class="edit-foto">
      <button class="add-foto-btn"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <span>add foto</span></button>
          </div>`;
  }
  createMainInfo() {
    let mainInfo = '';
    mainInfo += `<div class="main-info-holder">`;
    this.mainInfo.forEach(elem => {
    mainInfo += `<div class="edit-field">
      <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
      <label class="sr-only" for="${elem}">${elem}</label>
      <input type="text" class="add-btn" id="${elem}" placeholder="${elem}">
   </div>`   
    });
    return mainInfo += '</div>'
  }
  createEditInfo() {
    let editInfo = '';
    this.editInfo.forEach(elem => {
       editInfo +=	`<div class="edit-field">
       <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
       <label class="sr-only" for="${elem}">${elem}</label>
        <input type="text" class="add-btn" id="${elem}" placeholder="${elem}">
      </div>`  
    });
    editInfo += `<div class="edit-field"><button href="#" class="delete-contact">delete contact</button>
    </div></div></div>`;
    return editInfo;
  }
  events () {
  	this.main = document.querySelector('main');
  	this.btnDone = document.getElementById('done');
    this.input = this.main.getElementsByTagName('input');
    this.cancel = document.getElementById('cancel');

    this.btnDone.addEventListener('click', e => {
      [...this.input].forEach(inp => {
        if (inp.id === 'phone') {
          this.addUser[inp.id] =  this.transferNumber(inp.value)
        } else {
          this.addUser[inp.id] = inp.value;
        } 
      });
      this.addUser.fullName = `${this.addUser.name} ${this.addUser.lastname}`
      delete this.addUser.name;
      delete this.addUser.lastname;
      api.requestPost(this.addUser);

    });

    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      main.ui.contacts.requestData();
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
export default AddUser


