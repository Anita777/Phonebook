/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contacts_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_contact_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__keypad_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_user_js__ = __webpack_require__(6);







class Main {
  constructor() {
    this.state = {
      db: {
        users: [],
        lastMessages: [],
        selectedUser: {},
        sortedUsers: []
      },
      locals: {
        forms: {
          input: ''
        } /**/
      } };
    this.ui = {
      contacts: new __WEBPACK_IMPORTED_MODULE_0__contacts_js__["a" /* default */](this.state),
      keypad: new __WEBPACK_IMPORTED_MODULE_4__keypad_js__["a" /* default */](),
      editUser: new __WEBPACK_IMPORTED_MODULE_3__edit_contact_js__["a" /* default */](this.state),
      user: new __WEBPACK_IMPORTED_MODULE_2__user_js__["a" /* default */](this.state),
      addUser: new __WEBPACK_IMPORTED_MODULE_5__add_user_js__["a" /* default */](this.state)
    };
  }
  router() {
    let app = document.getElementById('app');
    let links = [...document.querySelectorAll('.main-nav>a')];
    function updateState(state) {
      app.innerHTML = state;
    }

    links.forEach(link => {
      let href = link.getAttribute('href');
      link.classList.remove('active');
      link.addEventListener('click', event => {
        event.preventDefault();
        updateState(href);
        if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === 'contacts.html') {
          this.render();
        }
        if (link.getAttribute('href') === 'keypad.html') {
          this.ui.keypad.render();
        }
        if (link.getAttribute('href') === 'add-user.html') {
          this.ui.addUser.render();
        }
      });
    });
    window.addEventListener('popstate', event => {
      updateState(event.state);
    });
  }
  render() {
    __WEBPACK_IMPORTED_MODULE_1__api_service_js__["a" /* default */].requestUser().then(data => {
      this.state.db.users = data;
      this.ui.contacts.render();
      let footer = document.querySelector('.footer');
      footer.style.display = "block";
      this.router();
    });
  }
}
let main = new Main();
main.render();

/* harmony default export */ __webpack_exports__["default"] = (main);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


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
      headers: { "Content-Type": "application/json" }
    });
  }
  requestDelete(arg) {
    return fetch(`${this.url}/${arg._id}`, {
      method: 'DELETE'
    });
  }
  requestPatch(arg) {
    return fetch(`${this.url}/${arg._id}`, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: { "Content-Type": "application/json" }
    });
  }
}
let api = new Api();
/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_service_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_js__ = __webpack_require__(0);




class Contacts {
  constructor(appState) {
    this.appState = appState;
    this.tableHeaders = ['Name', 'Last Name', 'Email'];
  }
  createHeader() {
    return `<header class="header"><div class="container top-radius"><h2>Contacts</h2></div></header>`;
  }
  createTableBody(arg) {
    let contacts = arg ? arg : this.appState.db.users;
    contacts.forEach(el => {
      let arr = el.fullName.split(' ');
      el.name = arr[0];
      el.lastname = arr[1];
    });
    let tbody = '<tbody>';
    contacts.forEach(elem => {
      tbody += `<tr><td>${elem.name}</td><td>${elem.lastname}</td><td class = "email">${elem.email}</td></tr>`;
    });
    return tbody += `</tbody>`;
  }

  createTable() {
    let table = `<table class = "table table-hover contacts"><thead><tr>`;
    let tableHeader = '<tr>';
    this.tableHeaders.forEach(elem => {
      tableHeader += `<th>${elem}</th>`;
    });
    tableHeader += '</tr>';
    return table += tableHeader + this.createTableBody() + `</table>`;
  }
  createMain() {
    let main = `<main class ="main app">
      <div class = "container">
        <form class="form-inline search-form">
          <div class="form-group">
            <label class="sr-only" for="search">Search</label>
            <input type="text" class="form-control" id= "search" placeholder="Search">
          </div>
        </form>`;
    return main += this.createTable() + `</div></main>`;
  }
  filterUser(char) {
    return this.appState.db.sortedUsers = this.appState.db.users.filter(elem => {
      if (elem.name.search(`${char}`) != -1 || elem.name.toLowerCase().search(`${char}`) != -1) {
        return elem;
      }
    });
  }
  sortUsers(key) {
    return this.appState.db.sortedUsers = this.appState.db.users.sort((a, b) => a[key] > b[key] ? 1 : -1);
  }
  events() {
    this.tbody = document.querySelector('tbody');
    this.search = document.getElementById('search');
    this.grid = document.querySelector('table');

    this.search.addEventListener('keyup', e => {
      this.tbody.innerHTML = this.createTableBody(this.filterUser(this.search.value));
    });

    this.grid.addEventListener('click', e => {
      if (e.target.tagName != 'TH') {
        let selectUs = this.appState.db.users.filter(el => {
          return el.name === e.target.textContent || el.lastname === e.target.textContent || el.email === e.target.textContent;
        });
        this.appState.db.selectedUser = selectUs[0];
        __WEBPACK_IMPORTED_MODULE_1__main_js__["default"].ui.user.render();
      } else {
        this.sortUsers(e.target.innerHTML.toLowerCase().replace(/\s/ig, ''));
        this.tbody.innerHTML = this.createTableBody();
      }
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
/* harmony default export */ __webpack_exports__["a"] = (Contacts);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service_js__ = __webpack_require__(1);



class User {
  constructor(appState) {
    this.appState = appState;
    this.body = document.body;
    this.optionsLine = {
      message: 'comment',
      call: 'earphone',
      video: 'facetime-video',
      mail: 'envelope'
    };
    this.optionsTable = ['Notes', 'Send message', 'Share contact', 'Add to favorites'];
  }
  createHeader() {
    return `<header class="header">
      <div class="container top-radius">
        <div class="user-top-line">
          <a href ="index.html" id ="backToContacts">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Contacts
          </a>
          <a href ="edit-contact.html" id ="editContact">Edit</a>
        </div>
      </div>
    </header>`;
  }
  createMain() {
    let main = '',
        userName = '',
        options = '';
    for (let key in this.optionsLine) {
      userName += `<div class="${key}">
        <div class= "options-icon"><span class="icon glyphicon glyphicon-${this.optionsLine[key]}" aria-hidden="true"></span></div>
        <span class = "options-text">${key}</span>
       </div>`;
    }
    this.optionsTable.forEach(elem => {
      options += `<div class ="options-item"><a href="#">${elem}</a></div>`;
    });
    let user = this.appState.db.selectedUser;
    main += `<main class="main">
      <div class="container">
        <img src="images/user_male.png" alt="#" class=" user-img img-circle center-block">
          <div class="user-name">${user.fullName}</div>
				<div class="options-line">
				${userName}	
				</div>
				<div class="tel-number">
					<h3>phone</h3>
					<div> ${user.phone} </div>
				</div>
				<div class="tel-number">
					<h3>e-mail</h3>
					<div>${user.email}</div>
				</div>
				<div class="options-table">
				${options}
        	<button id="delete" href="#" class="delete-contact">Delete User</button>
        </div  
			</div>
		</main>`;
    return main;
  }
  events() {
    this.back = document.getElementById('backToContacts');
    this.edit = document.getElementById('editContact');
    this.delete = document.getElementById('delete');

    this.back.addEventListener('click', e => {
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_0__main_js__["default"].render();
    });

    this.edit.addEventListener('click', e => {
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_0__main_js__["default"].ui.editUser.render();
    });
    // to do...
    this.delete.addEventListener('click', e => {
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_1__api_service_js__["a" /* default */].requestDelete(this.appState.db.selectedUser).then(data => {
        __WEBPACK_IMPORTED_MODULE_0__main_js__["default"].render();
      });
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
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_service_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_js__ = __webpack_require__(0);




class EditUser {
  constructor(appState) {
    this.appState = appState;
    this.mainInfo = ['name', 'lastname', 'company'];
    this.editInfo = ['phone', 'email', 'address', 'birthday', 'social profile', 'field'];
  }
  createHeader() {
    return `<header class="header">
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
    return main += `  </div>
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
    });
    return infoM += `</div></div>`;
  }
  createEditInfo() {
    let infoE = `<div class="scroll-holder">
        <div class="edit-info">`;
    this.editInfo.forEach(elem => {
      if (this.appState.db.selectedUser[elem]) {
        //disabled
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
    return infoE += `</div>`;
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
      __WEBPACK_IMPORTED_MODULE_0__api_service_js__["a" /* default */].requestPatch(this.appState.db.selectedUser);
    });

    this.done.addEventListener('click', e => {
      e.preventDefault();
      let inputs = [...this.main.getElementsByTagName('input')];
      inputs.forEach(elem => {
        let key = elem.id;
        if (elem.value) {
          this.appState.db.selectedUser[key] = elem.value;
        }
      });
      if (this.appState.db.selectedUser.name && this.appState.db.selectedUser.lastname) {
        this.appState.db.selectedUser.fullName = `${this.appState.db.selectedUser.name} ${this.appState.db.selectedUser.lastname}`;
        delete this.appState.db.selectedUser.name;
        delete this.appState.db.selectedUser.lastname;
      }
      __WEBPACK_IMPORTED_MODULE_0__api_service_js__["a" /* default */].requestPatch(this.appState.db.selectedUser);
      __WEBPACK_IMPORTED_MODULE_1__main_js__["default"].ui.user.render();
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
/* harmony default export */ __webpack_exports__["a"] = (EditUser);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Keypad {
  constructor() {
    this.body = document.body;
    this.arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'];
  }
  createHeader() {
    return `<header class="header"><div class="container top-radius"><h2>Keypad</h2></div></header>`;
  }
  createMain() {
    let main = `<main class = "main keypad"><div class="container">
      <div class="number">
        <span id = "addUser" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
       <span  class ="numbers"></span>
        <span id = "deleteNumber" class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
      </div>
      <div class="keypad-holder"> `;
    this.arr.forEach(elem => {
      main += `<button class="key">${elem}</button>`;
    });
    return main += `<button class="key"> <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button>
      </div>
    </div>
  </main>`;
  }
  enterNumber(elem, num) {
    if (!elem.textContent) {
      elem.textContent += '(' + num;
    } else if (elem.textContent.length == 4) {
      elem.textContent += ')-' + num;
    } else if (elem.textContent.length == 8 || elem.textContent.length == 11) {
      elem.textContent += '-' + num;
    } else {
      elem.textContent += num;
    }
    localStorage.removeItem("phone");
    localStorage.setItem("phone", elem.textContent);
  }
  delNumber(numb) {
    let length = numb.textContent.length - 1;
    if (length >= 0) {
      numb.textContent = numb.textContent.slice(0, length);
      localStorage.removeItem("phone");
      localStorage.setItem("phone", numb.textContent);
    }
  }
  events() {
    this.numbers = document.querySelector('.numbers');
    this.deleteNumber = document.getElementById('deleteNumber');
    this.buttons = document.querySelector('.keypad-holder');

    this.deleteNumber.addEventListener('click', event => {
      this.delNumber(this.numbers);
    });
    this.body.addEventListener('keydown', event => {
      if (event.key == '*' || event.key == '#' || Number(event.key) >= 0) {
        this.enterNumber(this.numbers, event.key);
      }
      if (event.key == 'Backspace') {
        this.delNumber(this.numbers);
      }
    });
    this.buttons.addEventListener('click', event => {
      if (event.target.classList.contains('key')) {
        this.enterNumber(this.numbers, event.target.textContent);
      }
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
    this.numbers.textContent = localStorage.getItem("phone");
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Keypad);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_service_js__ = __webpack_require__(1);




class AddUser {
  constructor(appState) {
    this.appState = appState;
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
		</main>`;
  }
  createPhoto() {
    return `<div class="edit-foto">
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
   </div>`;
    });
    return mainInfo += '</div>';
  }
  createEditInfo() {
    let editInfo = '';
    this.editInfo.forEach(elem => {
      editInfo += `<div class="edit-field">
       <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
       <label class="sr-only" for="${elem}">${elem}</label>
        <input type="text" class="add-btn" id="${elem}" placeholder="${elem}">
      </div>`;
    });
    return editInfo;
  }
  events() {
    this.main = document.querySelector('main');
    this.btnDone = document.getElementById('done');
    this.input = this.main.getElementsByTagName('input');
    this.cancel = document.getElementById('cancel');

    this.btnDone.addEventListener('click', e => {

      let phone = document.getElementById('phone');
      let email = document.getElementById('email');
      let name = document.getElementById('name');
      let lastname = document.getElementById('lastname');
      this.appState.db.selectedUser[phone.id] = this.transferNumber(phone.value);
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email.value)) this.appState.db.selectedUser[email.id] = email.value;else alert('Введите корректный e-mail');
      this.appState.db.selectedUser[name.id] = name.value;
      this.appState.db.selectedUser[lastname.id] = lastname.value;
      this.appState.db.selectedUser.fullName = `${this.appState.db.selectedUser.name} ${this.appState.db.selectedUser.lastname}`;
      if (this.appState.db.selectedUser.phone !== undefined && this.appState.db.selectedUser.email !== undefined && this.appState.db.selectedUser.fullName !== " ") {
        __WEBPACK_IMPORTED_MODULE_1__api_service_js__["a" /* default */].requestPost(this.appState.db.selectedUser);
        __WEBPACK_IMPORTED_MODULE_0__main_js__["default"].ui.user.render();
      } else alert("Enter value!!");
    });

    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      __WEBPACK_IMPORTED_MODULE_0__main_js__["default"].render();
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
/* harmony default export */ __webpack_exports__["a"] = (AddUser);

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map