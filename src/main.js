import Contacts  from './contacts.js'
import api  from './api.service.js'
import User  from './user.js'
import EditUser  from './edit-contact.js'
import Keypad  from './keypad.js'
import AddUser  from './add-user.js'

 class Main {
  constructor() {
    this.state = {
      db: {
        users: {},
        activeUsers: [],
        lastMessages: []
      }/*,
      locals: {
        forms: {
          input: 'qweqwe'
        }
      }*/
    };
    this.ui = {
      contacts: new Contacts(),
      keypad: new Keypad(),
      editUser: new EditUser(),
      user: new User(),
      addUser: new AddUser()
    }
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
        if (link.getAttribute('href') === 'index.html') {
          this.ui.contacts.requestData();
        }
        if (link.getAttribute('href') === 'keypad.html') {
          this.ui.keypad.render();
        }
        if (link.getAttribute('href') === 'add-user.html') {
          this.ui.addUser.render();
        }
      })
    })
    window.addEventListener('popstate', event => {
      updateState(event.state);
    });
  }
  render() {
    this.ui.contacts.requestData();
    this.ui.keypad.render();
    this.ui.addUser.render();
    this.router();
  } 
}
let main = new Main();
main.render();

export default main;