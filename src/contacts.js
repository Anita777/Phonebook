
import api  from './api.service.js'
import main from './main.js'

class Contacts {
  constructor(appState) {
    this.appState = appState;
    this.tableHeaders = ['Name', 'Last Name', 'Email'];
  }
  createHeader() {
    return `<header class="header"><div class="container top-radius"><h2>Contacts</h2></div></header>`;
  }
  createTableBody(arg) {
    let contacts = (arg) ? arg : this.appState.db.users;
    contacts.forEach(el => {
      let arr = el.fullName.split(' ');
      el.name = arr[0];
      el.lastname = arr[1];
    })
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
   let main =
      `<main class ="main app">
      <div class = "container">
        <form class="form-inline search-form">
          <div class="form-group">
            <label class="sr-only" for="search">Search</label>
            <input type="text" class="form-control" id= "search" placeholder="Search">
          </div>
        </form>`;
    return main += this.createTable() + `</div></main>` ;
  }
  filterUser (char){
    return this.appState.db.sortedUsers = this.appState.db.users.filter(elem => {  
       if (elem.name.search(`${char}`) != -1  || elem.name.toLowerCase().search(`${char}`) != -1) {
        return elem;
       }
    })
  }
  sortUsers(key) {
    return  this.appState.db.sortedUsers = this.appState.db.users.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }
  events() { 
    this.tbody = document.querySelector('tbody');
    this.search = document.getElementById('search');
    this.grid = document.querySelector('table');

    this.search.addEventListener('keyup', e => {
      this.tbody.innerHTML = this.createTableBody(this.filterUser(this.search.value));
    });

    this.grid.addEventListener('click', e => {
      if (e.target.tagName != 'TH')  {
        let selectUs = this.appState.db.users.filter(el => {
           return (el.name === e.target.textContent || el.lastname === e.target.textContent || el.email === e.target.textContent)
        })
         this.appState.db.selectedUser = selectUs[0];
         main.ui.user.render();
      } else {
        this.sortUsers(e.target.innerHTML.toLowerCase().replace(/\s/ig,''));
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
export default Contacts;

