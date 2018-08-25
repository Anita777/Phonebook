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
        users: [],
        lastMessages: [],
        selectedUser: {},
        sortedUsers: []
      },
      locals: {
        forms: {
          input: ''
        }
      }/**/
    };
    this.ui = {
      contacts: new Contacts(this.state),
      keypad: new Keypad(),
      editUser: new EditUser(this.state),
      user: new User(this.state),
      addUser: new AddUser(this.state)
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
        if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === 'contacts.html') {
          this.render();
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
    api.requestUser().then(data => {
      this.state.db.users = data;
      this.ui.contacts.render();
      let footer = document.querySelector('.footer');
      footer.style.display="block";
      this.router();
    });

  } 
}
let main = new Main();
main.render();

export default main;
