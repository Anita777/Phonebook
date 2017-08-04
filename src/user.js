class User {
  constructor() {
    this.body = document.body;
    this.optionsLine = {
      message:  'comment',
      call: 'earphone',
      video: 'facetime-video',
      mail: 'envelope'
    };
    this.optionsTable = ['Notes', 'Send message', 'Share contact', 'Add to favorites', 'Share my location', 'Block this caller'];
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
    })
    for(let key in this.curFilter) {
    main += `<main class="main">
      <div class="container">
        <img src="images/user-face.png" alt="#" class=" user-img img-circle center-block">
          <div class="user-name">${this.curFilter[key].fullName}</div>
				<div class="options-line">
				${userName}	
				</div>
				<div class="tel-number">
					<h3>phone</h3>
					<div> ${this.curFilter[key].phone} </div>
				</div>
				<div class="tel-number">
					<h3>e-mail</h3>
					<div>${this.curFilter[key].email}</div>
				</div>
				<div class="options-table">
				${options}	
				</div>
			</div>
		</main>`
    }
		return main;
	}
  events() {
    this.cancel = document.getElementById('backToContacts')
    this.edit = document.getElementById('editContact');
    
    this.cancel.addEventListener('click', e => {
      e.preventDefault();
      main.ui.contacts.requestData();
    });

    this.edit.addEventListener('click', e => {
      e.preventDefault();
      main.ui.editUser.render(this.curFilter);
    });
  }
  render(user) {
    this.curFilter = user;
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
