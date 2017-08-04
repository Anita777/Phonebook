
/*class Header {
  constructor() {

  }
  render() {
    const body = document.body;
    document.querySelector("body").innerHTML = `<header class="header"><div class="container top-radius"><h2>Keypad</h2></div></header>`;
  }
}
var head = new Header();
head.render();
*/

class Keypad {
  constructor() {
    this.body = document.body;
    this.arr =['0','1','2','3','4','5','6','7','8','9','*','#'];
  }
  createHeader() {
    return `<header class="header"><div class="container top-radius"><h2>Keypad</h2></div></header>`;
  }

  createMain() {
    let main = `<main class = "main keypad"><div class="container">
      <div class="number">
        <span id = "addUser" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        <span class ="numbers"></span>
        <span id = "deleteNumber" class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
      </div>
      <div class="keypad-holder"> `;
    this.arr.forEach(elem => {
      main += `<button class="key">${elem}</button>`;
    });
    return main += `<button class="key"> <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button>
      </div>
    </div>
  </main>`
  }
  enterNumber(elem, num) {
    if (elem.textContent.length < 15) {
      if (!elem.textContent) {
        elem.textContent += '(' + num;
      } else if (elem.textContent.length == 4) {
        elem.textContent += ')-' + num;
      } else if (elem.textContent.length == 8 || elem.textContent.length == 11) {
        elem.textContent += '-' + num;
      }
      else {
        elem.textContent += num;
      }
    }
  }
  delNumber (numb) {
    let length = numb.textContent.length - 1;
    if (length >= 0) {
      numb.textContent = numb.textContent.slice(0, length);
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
      if (event.key == '*' || event.key == '#' || Number(event.key) >= 0 ) {
        this.enterNumber(this.numbers, event.key);
      }
      if (event.key == 'Backspace') {
        this.delNumber(this.numbers)
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
  }
}
let keypad = new Keypad();

